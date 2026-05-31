/// FSRS-5 — Free Spaced Repetition Scheduler (v5). Dart-Port von js/util/fsrs.js.
///
/// Modernes, evidenzbasiertes Scheduling, das den klassischen SM-2 deutlich
/// schlägt. Statt eines einzelnen „easiness factor" modelliert FSRS das
/// Gedächtnis über drei Größen:
///   D — Difficulty     (1..10, intrinsische Schwierigkeit)
///   S — Stability      (Tage bis die Erinnerung auf 90 % fällt)
///   R — Retrievability (aktuelle Erinnerungswahrscheinlichkeit, 0..1)
/// und plant das nächste Review so, dass eine Wunsch-Retention exakt getroffen
/// wird. Bewusst REIN (keine Seiteneffekte) — identisch zur Web-Mathematik.
///
/// Vergessenskurve (Potenzfunktion): R(t,S) = (1 + FACTOR·t/S)^DECAY mit
/// DECAY=-0.5 und FACTOR=0.9^(1/DECAY)−1 = 19/81. Daraus folgt R(S,S)=0.9.
library;

import 'dart:math' as math;

const double decay = -0.5;
const double factor = 19 / 81; // ≈ 0.2345679

const double sMin = 0.01; // untere Stabilitäts-Schranke (Tage)
const int maxIntervalDays = 36500; // 100-Jahre-Deckel
const int _dayMs = 86400000;

/// FSRS-5 Default-Gewichte (19 Parameter), sinnvolle Populationswerte.
const List<double> fsrs5DefaultParams = [
  0.40255, 1.18385, 3.173, 15.69105, // w0..w3  Initial-Stabilität A/H/G/E
  7.1949, 0.5345, // w4,w5   Initial-Difficulty
  1.4604, 0.0046, // w6,w7   Difficulty-Delta + Mean-Reversion
  1.54575, 0.1192, 1.01925, // w8..w10 Recall-Stabilität
  1.9395, 0.11, 0.29605, // w11..w13 Forget-Stabilität (Post-Lapse)
  2.2698, 0.2315, // w14,w15 (Forget-Exp, Hard-Penalty)
  2.9898, // w16     Easy-Bonus
  0.51655, 0.6621, // w17,w18 Short-Term (Same-Day)
];

// FSRS-Bewertungen (Grades), vier Stufen wie Anki/FSRS.
const int gradeAgain = 1;
const int gradeHard = 2;
const int gradeGood = 3;
const int gradeEasy = 4;

// Karten-Zustände.
const int stateNew = 0;
const int stateLearning = 1;
const int stateReview = 2;
const int stateRelearning = 3;

double _clampD(double x, double lo, double hi) => math.min(hi, math.max(lo, x));
int _clampI(int x, int lo, int hi) => math.min(hi, math.max(lo, x));
double _fin(double v, double fallback) => v.isFinite ? v : fallback;
double _round4(double v) => double.parse(v.toStringAsFixed(4));

/// Erinnerungswahrscheinlichkeit nach [elapsedDays] Tagen bei Stabilität [stability].
double retrievability(double elapsedDays, double stability) {
  final t = math.max(0.0, _fin(elapsedDays, 0));
  final s = math.max(sMin, _fin(stability, sMin));
  return math.pow(1 + factor * (t / s), decay).toDouble();
}

/// Intervall (Tage), nach dem die Retention auf [desiredRetention] fällt.
double intervalForRetention(double stability, [double desiredRetention = 0.9]) {
  final s = math.max(sMin, _fin(stability, sMin));
  final r = _clampD(_fin(desiredRetention, 0.9), 0.5, 0.999);
  return (s / factor) * (math.pow(r, 1 / decay).toDouble() - 1);
}

/// Gerundetes, gedeckeltes Intervall (mind. 1 Tag).
int _nextInterval(double stability, double desiredRetention, int maximumInterval) {
  final raw = intervalForRetention(stability, desiredRetention);
  return _clampI(raw.round(), 1, maximumInterval > 0 ? maximumInterval : maxIntervalDays);
}

// ── Initialwerte (erstes Review) ───────────────────────────────────────────

double initStability(int grade, [List<double> w = fsrs5DefaultParams]) =>
    math.max(sMin, w[_clampI(grade, 1, 4) - 1]);

double initDifficulty(int grade, [List<double> w = fsrs5DefaultParams]) {
  final d = w[4] - math.exp(w[5] * (_clampI(grade, 1, 4) - 1)) + 1;
  return _clampD(d, 1, 10);
}

// ── Difficulty-Update ────────────────────────────────────────────────────

double nextDifficulty(double difficulty, int grade,
    [List<double> w = fsrs5DefaultParams]) {
  final d = _clampD(_fin(difficulty, 5), 1, 10);
  final deltaD = -w[6] * (grade - 3);
  final damped = d + deltaD * ((10 - d) / 9); // lineare Dämpfung (FSRS-5)
  final reverted = w[7] * initDifficulty(gradeEasy, w) + (1 - w[7]) * damped;
  return _clampD(reverted, 1, 10);
}

// ── Stabilitäts-Update ─────────────────────────────────────────────────────

double nextRecallStability(double difficulty, double stability, double r, int grade,
    [List<double> w = fsrs5DefaultParams]) {
  final d = _clampD(_fin(difficulty, 5), 1, 10);
  final s = math.max(sMin, _fin(stability, sMin));
  final hardPenalty = grade == gradeHard ? w[15] : 1.0;
  final easyBonus = grade == gradeEasy ? w[16] : 1.0;
  final inc = math.exp(w[8]) *
      (11 - d) *
      math.pow(s, -w[9]) *
      (math.exp((1 - r) * w[10]) - 1) *
      hardPenalty *
      easyBonus;
  return math.max(sMin, s * (1 + inc));
}

double nextForgetStability(double difficulty, double stability, double r,
    [List<double> w = fsrs5DefaultParams]) {
  final d = _clampD(_fin(difficulty, 5), 1, 10);
  final s = math.max(sMin, _fin(stability, sMin));
  final sf = w[11] *
      math.pow(d, -w[12]) *
      (math.pow(s + 1, w[13]) - 1) *
      math.exp((1 - r) * w[14]);
  // Nach einem Lapse darf die Stabilität nicht über die alte steigen.
  return _clampD(sf.toDouble(), sMin, s);
}

double nextShortTermStability(double stability, int grade,
    [List<double> w = fsrs5DefaultParams]) {
  final s = math.max(sMin, _fin(stability, sMin));
  return math.max(sMin, s * math.exp(w[17] * (grade - 3 + w[18])));
}

// ── Karte & Scheduler ────────────────────────────────────────────────────

class FsrsCard {
  FsrsCard({
    required this.difficulty,
    required this.stability,
    required this.due,
    required this.lastReview,
    required this.reps,
    required this.lapses,
    required this.state,
    this.elapsedDays = 0,
    this.scheduledDays = 0,
  });

  final double difficulty;
  final double stability;
  final int due; // ms
  final int lastReview; // ms (0 = noch nie)
  final int reps;
  final int lapses;
  final int state;
  final double elapsedDays;
  final int scheduledDays;
}

FsrsCard createEmptyCard(int now) => FsrsCard(
      difficulty: 0,
      stability: 0,
      due: now,
      lastReview: 0,
      reps: 0,
      lapses: 0,
      state: stateNew,
    );

/// Ergebnis einer Bewertung: Karte + Intervall (Tage) + Retrievability beim Review.
class FsrsOutcome {
  const FsrsOutcome({
    required this.interval,
    required this.retrievability,
    required this.card,
  });

  final int interval;
  final double retrievability;
  final FsrsCard card;
}

/// Berechnet die Kartenzustände für ALLE vier Bewertungen (1..4). Nutzbar zum
/// Planen UND für die Intervall-Vorschau auf den Buttons.
Map<int, FsrsOutcome> repeat(
  FsrsCard? card,
  int now, {
  List<double>? params,
  double desiredRetention = 0.9,
  int? maximumInterval,
}) {
  final w = params ?? fsrs5DefaultParams;
  final maxI = (maximumInterval != null && maximumInterval > 0)
      ? maximumInterval
      : maxIntervalDays;

  final prev = card ?? createEmptyCard(now);
  final isNew = prev.state == stateNew || prev.stability == 0;

  double elapsedDays = 0;
  double r = 1;
  if (!isNew && prev.lastReview != 0) {
    elapsedDays = math.max(0.0, (now - prev.lastReview) / _dayMs);
    r = retrievability(elapsedDays, prev.stability);
  }

  final out = <int, FsrsOutcome>{};
  for (var grade = 1; grade <= 4; grade++) {
    double difficulty;
    double stability;
    int state;

    if (isNew) {
      difficulty = initDifficulty(grade, w);
      stability = initStability(grade, w);
      state = grade == gradeAgain ? stateLearning : stateReview;
    } else {
      difficulty = nextDifficulty(prev.difficulty, grade, w);
      if (elapsedDays < 1) {
        // Same-Day: kurzfristige Stabilität, Zustand bleibt.
        stability = nextShortTermStability(prev.stability, grade, w);
        state = prev.state;
      } else if (grade == gradeAgain) {
        stability = nextForgetStability(prev.difficulty, prev.stability, r, w);
        state = stateRelearning;
      } else {
        stability =
            nextRecallStability(prev.difficulty, prev.stability, r, grade, w);
        state = stateReview;
      }
    }

    final interval = _nextInterval(stability, desiredRetention, maxI);
    final lapses = prev.lapses +
        ((grade == gradeAgain && !isNew && elapsedDays >= 1) ? 1 : 0);

    out[grade] = FsrsOutcome(
      interval: interval,
      retrievability: r,
      card: FsrsCard(
        difficulty: _round4(difficulty),
        stability: _round4(stability),
        due: now + interval * _dayMs,
        lastReview: now,
        reps: prev.reps + 1,
        lapses: lapses,
        state: state,
        elapsedDays: _round4(elapsedDays),
        scheduledDays: interval,
      ),
    );
  }
  return out;
}

/// Plant die Karte für eine konkrete Bewertung.
FsrsOutcome schedule(
  FsrsCard? card,
  int grade,
  int now, {
  List<double>? params,
  double desiredRetention = 0.9,
  int? maximumInterval,
}) {
  final g = _clampI(grade, 1, 4);
  return repeat(card, now,
      params: params,
      desiredRetention: desiredRetention,
      maximumInterval: maximumInterval)[g]!;
}

/// Intervall-Vorschau (Tage) je Bewertung — für die Anki-Stil-Buttons.
Map<int, int> previewIntervals(
  FsrsCard? card,
  int now, {
  List<double>? params,
  double desiredRetention = 0.9,
  int? maximumInterval,
}) {
  final all = repeat(card, now,
      params: params,
      desiredRetention: desiredRetention,
      maximumInterval: maximumInterval);
  return {
    1: all[1]!.interval,
    2: all[2]!.interval,
    3: all[3]!.interval,
    4: all[4]!.interval,
  };
}

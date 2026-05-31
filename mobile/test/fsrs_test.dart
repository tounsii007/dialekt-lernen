// FSRS-5 Algorithmus-Tests — Port von tests/fsrs.test.js.
// Verifiziert Vergessenskurve, Initialwerte, Updates und den Scheduler.

import 'dart:math' as math;

import 'package:flutter_test/flutter_test.dart';

import 'package:dialekto/util/fsrs.dart';

const int dayMs = 86400000;

void main() {
  group('FSRS Konstanten', () {
    test('FACTOR = 19/81 (aus DECAY=-0.5 abgeleitet)', () {
      expect(factor, closeTo(19 / 81, 1e-9));
      expect(factor, closeTo(math.pow(0.9, 1 / decay) - 1, 1e-9));
    });
    test('19 Default-Parameter', () {
      expect(fsrs5DefaultParams.length, 19);
    });
  });

  group('Vergessenskurve & Intervall', () {
    test('R(0,S) = 1 (gerade gelernt)', () {
      expect(retrievability(0, 5), closeTo(1, 1e-9));
    });
    test('R(S,S) = 0.9 (Definition der Stabilität)', () {
      for (final s in [0.5, 3.173, 20.0, 365.0]) {
        expect(retrievability(s, s), closeTo(0.9, 1e-4));
      }
    });
    test('R fällt monoton mit der Zeit', () {
      const s = 10.0;
      expect(retrievability(1, s) > retrievability(5, s), isTrue);
      expect(retrievability(5, s) > retrievability(20, s), isTrue);
    });
    test('intervalForRetention(S,0.9) = S', () {
      for (final s in [1.0, 3.173, 50.0, 500.0]) {
        expect(intervalForRetention(s, 0.9), closeTo(s, 1e-3));
      }
    });
    test('höhere Wunsch-Retention → kürzeres Intervall', () {
      const s = 50.0;
      expect(intervalForRetention(s, 0.95) < intervalForRetention(s, 0.85),
          isTrue);
    });
  });

  group('Initialwerte', () {
    test('Initial-Stabilität = Gewicht der Bewertung', () {
      expect(initStability(gradeAgain), closeTo(fsrs5DefaultParams[0], 1e-9));
      expect(initStability(gradeHard), closeTo(fsrs5DefaultParams[1], 1e-9));
      expect(initStability(gradeGood), closeTo(fsrs5DefaultParams[2], 1e-9));
      expect(initStability(gradeEasy), closeTo(fsrs5DefaultParams[3], 1e-9));
    });
    test('Initial-Stabilität steigt mit besserer Bewertung', () {
      expect(initStability(gradeAgain) < initStability(gradeHard), isTrue);
      expect(initStability(gradeHard) < initStability(gradeGood), isTrue);
      expect(initStability(gradeGood) < initStability(gradeEasy), isTrue);
    });
    test('Initial-Difficulty sinkt mit Bewertung, bleibt in [1,10]', () {
      final ds = [1, 2, 3, 4].map((g) => initDifficulty(g)).toList();
      for (final d in ds) {
        expect(d >= 1 && d <= 10, isTrue);
      }
      expect(ds[0] > ds[1] && ds[1] > ds[2] && ds[2] > ds[3], isTrue);
    });
    test('Initial-Difficulty(Good) ≈ 5.283', () {
      expect(initDifficulty(gradeGood), closeTo(5.28263, 1e-3));
    });
  });

  group('Difficulty-Update', () {
    test('Again erhöht Difficulty, Easy senkt sie', () {
      const d = 5.0;
      expect(nextDifficulty(d, gradeAgain) > d, isTrue);
      expect(nextDifficulty(d, gradeEasy) < d, isTrue);
    });
    test('bleibt in [1,10] auch bei Extremen', () {
      expect(nextDifficulty(10, gradeAgain) <= 10, isTrue);
      expect(nextDifficulty(1, gradeEasy) >= 1, isTrue);
    });
  });

  group('Stabilitäts-Update', () {
    test('Recall erhöht Stabilität', () {
      expect(nextRecallStability(5.28, 3.173, 0.9, gradeGood) > 3.173, isTrue);
    });
    test('Easy > Good > Hard', () {
      const s = 10.0, d = 5.0, r = 0.9;
      final sh = nextRecallStability(d, s, r, gradeHard);
      final sg = nextRecallStability(d, s, r, gradeGood);
      final se = nextRecallStability(d, s, r, gradeEasy);
      expect(sh < sg && sg < se, isTrue);
    });
    test('Forget-Stabilität liegt unter der alten', () {
      expect(nextForgetStability(5, 20, 0.9) < 20, isTrue);
    });
    test('niedrigere Retrievability → größerer Stabilitätszuwachs', () {
      const s = 10.0, d = 5.0;
      expect(
        nextRecallStability(d, s, 0.7, gradeGood) >
            nextRecallStability(d, s, 0.95, gradeGood),
        isTrue,
      );
    });
    test('Short-Term: Easy > Good > Again', () {
      const s = 5.0;
      expect(
          nextShortTermStability(s, gradeAgain) <
              nextShortTermStability(s, gradeGood),
          isTrue);
      expect(
          nextShortTermStability(s, gradeGood) <
              nextShortTermStability(s, gradeEasy),
          isTrue);
    });
  });

  group('repeat / schedule', () {
    const now = 1700000000000;

    test('neue Karte: 4 nicht-fallende Intervalle', () {
      final out = repeat(createEmptyCard(now), now, desiredRetention: 0.9);
      expect(out[1]!.interval <= out[2]!.interval, isTrue);
      expect(out[2]!.interval <= out[3]!.interval, isTrue);
      expect(out[3]!.interval <= out[4]!.interval, isTrue);
    });
    test('neue Karte Good: Intervall=3, Review, reps=1', () {
      final r =
          schedule(createEmptyCard(now), gradeGood, now, desiredRetention: 0.9);
      expect(r.interval, 3);
      expect(r.card.state, stateReview);
      expect(r.card.reps, 1);
    });
    test('neue Karte Again → Learning, Intervall 1', () {
      final r = schedule(createEmptyCard(now), gradeAgain, now,
          desiredRetention: 0.9);
      expect(r.interval, 1);
      expect(r.card.state, stateLearning);
    });
    test('due liegt interval Tage in der Zukunft', () {
      final r = schedule(createEmptyCard(now), gradeGood, now);
      expect(r.card.due, now + r.interval * dayMs);
    });
    test('Lapse auf reifer Karte → Relearning, lapses+1, kürzer', () {
      final mature = FsrsCard(
        difficulty: 5,
        stability: 50,
        due: now,
        lastReview: now - 50 * dayMs,
        reps: 5,
        lapses: 0,
        state: stateReview,
      );
      final r = schedule(mature, gradeAgain, now, desiredRetention: 0.9);
      expect(r.card.state, stateRelearning);
      expect(r.card.lapses, 1);
      expect(r.interval < 50, isTrue);
    });
    test('höhere Wunsch-Retention → kürzere Vorschau-Intervalle', () {
      final mature = FsrsCard(
        difficulty: 5,
        stability: 50,
        due: now,
        lastReview: now - 10 * dayMs,
        reps: 5,
        lapses: 0,
        state: stateReview,
      );
      final hi = previewIntervals(mature, now, desiredRetention: 0.95);
      final lo = previewIntervals(mature, now, desiredRetention: 0.85);
      expect(hi[gradeGood]! < lo[gradeGood]!, isTrue);
    });
    test('previewIntervals: vier ganzzahlige Tage >= 1', () {
      final p = previewIntervals(createEmptyCard(now), now);
      for (final g in [1, 2, 3, 4]) {
        expect(p[g]! >= 1, isTrue);
      }
    });
    test('createEmptyCard ist im NEW-Zustand', () {
      expect(createEmptyCard(now).state, stateNew);
    });
  });
}

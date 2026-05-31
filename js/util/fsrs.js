// FSRS-5 — Free Spaced Repetition Scheduler (v5).
//
// Modernes, evidenzbasiertes Scheduling-Modell, das den klassischen SM-2
// (Anki-Default vor FSRS) deutlich schlägt: statt eines einzelnen
// "easiness factor" modelliert FSRS das Gedächtnis über drei Größen
//   D — Difficulty     (1..10, intrinsische Schwierigkeit der Karte)
//   S — Stability       (Tage bis die Erinnerungswahrscheinlichkeit auf 90 % fällt)
//   R — Retrievability  (aktuelle Erinnerungswahrscheinlichkeit, 0..1)
// und plant das nächste Review so, dass eine konfigurierbare Wunsch-Retention
// (z. B. 90 %) exakt getroffen wird.
//
// Dieses Modul ist BEWUSST REIN: kein DOM, kein localStorage, keine
// Seiteneffekte. Dadurch ist es identisch im Web-Store, im SRS-Worker und als
// Referenz für die Flutter-Portierung nutzbar. Die Mathematik folgt der
// offiziellen FSRS-5-Spezifikation (open-spaced-repetition).
//
// Vergessenskurve (Potenzfunktion, nicht exponentiell):
//   R(t, S) = (1 + FACTOR · t / S) ^ DECAY
// mit DECAY = -0.5 und FACTOR = 0.9^(1/DECAY) − 1 = 19/81.
// Aus der Definition folgt die nützliche Invariante R(S, S) = 0.9 und damit
// intervalForRetention(S, 0.9) = S.

export const DECAY = -0.5;
export const FACTOR = 19 / 81; // = 0.9^(1/DECAY) − 1 ≈ 0.2345679

export const S_MIN = 0.01;            // untere Stabilitäts-Schranke (Tage)
export const MAX_INTERVAL = 36_500;   // 100 Jahre Deckel
const DAY_MS = 86_400_000;

// FSRS-5 Default-Gewichte (19 Parameter). Werden vom Optimizer (Iter 4)
// pro Nutzer feinjustiert; ohne Historie sind dies sinnvolle Populationswerte.
export const FSRS5_DEFAULT_PARAMS = Object.freeze([
  0.40255, 1.18385, 3.173, 15.69105, // w0..w3  Initial-Stabilität Again/Hard/Good/Easy
  7.1949, 0.5345,                     // w4,w5   Initial-Difficulty
  1.4604, 0.0046,                     // w6,w7   Difficulty-Delta + Mean-Reversion
  1.54575, 0.1192, 1.01925,           // w8..w10 Recall-Stabilität
  1.9395, 0.11, 0.29605,              // w11..w13 Forget-Stabilität (Post-Lapse)
  2.2698, 0.2315,                     // w14,w15 (w14 Forget-Exp, w15 Hard-Penalty)
  2.9898,                             // w16     Easy-Bonus
  0.51655, 0.6621,                    // w17,w18 Short-Term (Same-Day)
]);

// FSRS-Bewertungen (Grades). Vier Stufen wie in Anki/FSRS:
export const GRADE_AGAIN = 1;
export const GRADE_HARD = 2;
export const GRADE_GOOD = 3;
export const GRADE_EASY = 4;

// Karten-Zustände.
export const STATE_NEW = 0;
export const STATE_LEARNING = 1;
export const STATE_REVIEW = 2;
export const STATE_RELEARNING = 3;

function clamp(x, lo, hi) {
  return Math.min(hi, Math.max(lo, x));
}

function num(v, fallback) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

// Erinnerungswahrscheinlichkeit nach `elapsedDays` Tagen bei Stabilität S.
export function retrievability(elapsedDays, stability) {
  const t = Math.max(0, num(elapsedDays, 0));
  const s = Math.max(S_MIN, num(stability, S_MIN));
  return Math.pow(1 + FACTOR * (t / s), DECAY);
}

// Intervall (Tage), nach dem die Retention auf `desiredRetention` fällt.
// Umkehrung der Vergessenskurve nach t.
export function intervalForRetention(stability, desiredRetention = 0.9) {
  const s = Math.max(S_MIN, num(stability, S_MIN));
  const r = clamp(num(desiredRetention, 0.9), 0.5, 0.999);
  return (s / FACTOR) * (Math.pow(r, 1 / DECAY) - 1);
}

// Auf ganze Tage gerundetes, gedeckeltes Intervall (mind. 1 Tag).
function nextInterval(stability, desiredRetention, maximumInterval) {
  const raw = intervalForRetention(stability, desiredRetention);
  return clamp(Math.round(raw), 1, maximumInterval || MAX_INTERVAL);
}

// ── Initialwerte (erstes Review einer neuen Karte) ────────────────────────

// Initial-Stabilität = Gewicht der gegebenen Bewertung.
export function initStability(grade, w = FSRS5_DEFAULT_PARAMS) {
  return Math.max(S_MIN, w[clamp(grade, 1, 4) - 1]);
}

// Initial-Difficulty (1..10). Bessere Bewertung → niedrigere Schwierigkeit.
export function initDifficulty(grade, w = FSRS5_DEFAULT_PARAMS) {
  const d = w[4] - Math.exp(w[5] * (clamp(grade, 1, 4) - 1)) + 1;
  return clamp(d, 1, 10);
}

// ── Difficulty-Update ─────────────────────────────────────────────────────

// FSRS-5: lineare Dämpfung des Deltas + Mean-Reversion Richtung D0(Easy).
export function nextDifficulty(difficulty, grade, w = FSRS5_DEFAULT_PARAMS) {
  const d = clamp(num(difficulty, 5), 1, 10);
  const deltaD = -w[6] * (grade - 3);
  const damped = d + deltaD * ((10 - d) / 9); // lineare Dämpfung (FSRS-5)
  const reverted = w[7] * initDifficulty(GRADE_EASY, w) + (1 - w[7]) * damped;
  return clamp(reverted, 1, 10);
}

// ── Stabilitäts-Update ──────────────────────────────────────────────────

// Stabilität nach erfolgreichem Recall (Hard/Good/Easy).
export function nextRecallStability(difficulty, stability, r, grade, w = FSRS5_DEFAULT_PARAMS) {
  const d = clamp(num(difficulty, 5), 1, 10);
  const s = Math.max(S_MIN, num(stability, S_MIN));
  const hardPenalty = grade === GRADE_HARD ? w[15] : 1;
  const easyBonus = grade === GRADE_EASY ? w[16] : 1;
  const inc =
    Math.exp(w[8]) *
    (11 - d) *
    Math.pow(s, -w[9]) *
    (Math.exp((1 - r) * w[10]) - 1) *
    hardPenalty *
    easyBonus;
  return Math.max(S_MIN, s * (1 + inc));
}

// Stabilität nach einem Lapse (Again). Liegt typischerweise deutlich unter S.
export function nextForgetStability(difficulty, stability, r, w = FSRS5_DEFAULT_PARAMS) {
  const d = clamp(num(difficulty, 5), 1, 10);
  const s = Math.max(S_MIN, num(stability, S_MIN));
  const sf =
    w[11] *
    Math.pow(d, -w[12]) *
    (Math.pow(s + 1, w[13]) - 1) *
    Math.exp((1 - r) * w[14]);
  // Nach einem Lapse darf die Stabilität nicht über die alte steigen.
  return clamp(sf, S_MIN, s);
}

// Same-Day-Review (Lernschritte am selben Tag): kurzfristige Stabilität.
export function nextShortTermStability(stability, grade, w = FSRS5_DEFAULT_PARAMS) {
  const s = Math.max(S_MIN, num(stability, S_MIN));
  return Math.max(S_MIN, s * Math.exp(w[17] * (grade - 3 + w[18])));
}

// ── Karten-Fabrik ─────────────────────────────────────────────────────────

export function createEmptyCard(now = Date.now()) {
  return {
    difficulty: 0,
    stability: 0,
    due: now,
    lastReview: 0,
    reps: 0,
    lapses: 0,
    state: STATE_NEW,
    elapsedDays: 0,
    scheduledDays: 0,
  };
}

// ── Scheduler ───────────────────────────────────────────────────────────

/**
 * Berechnet die resultierenden Kartenzustände für ALLE vier Bewertungen.
 * Dadurch nutzbar sowohl zum Planen (Grade wählen) als auch für die
 * Intervall-Vorschau auf den Bewertungs-Buttons (Anki-Stil).
 *
 * @param {object|null} card  voriger FSRS-Record (oder null/leere Karte)
 * @param {number} now        aktueller Zeitstempel (ms)
 * @param {object} [opts]
 * @param {number[]} [opts.params]            19 FSRS-Gewichte
 * @param {number}   [opts.desiredRetention]  Wunsch-Retention (0.5..0.999)
 * @param {number}   [opts.maximumInterval]   Intervall-Deckel in Tagen
 * @returns {{1:Outcome,2:Outcome,3:Outcome,4:Outcome}}
 *   Outcome = { card, interval (Tage), retrievability }
 */
export function repeat(card, now = Date.now(), opts = {}) {
  const w = opts.params || FSRS5_DEFAULT_PARAMS;
  const dr = opts.desiredRetention ?? 0.9;
  const maxI = opts.maximumInterval || MAX_INTERVAL;

  const prev = card && card.state != null ? card : createEmptyCard(now);
  const isNew = prev.state === STATE_NEW || !prev.stability;

  let elapsedDays = 0;
  let r = 1;
  if (!isNew && prev.lastReview) {
    elapsedDays = Math.max(0, (now - prev.lastReview) / DAY_MS);
    r = retrievability(elapsedDays, prev.stability);
  }

  const out = {};
  for (let grade = 1; grade <= 4; grade++) {
    let difficulty, stability, state;

    if (isNew) {
      difficulty = initDifficulty(grade, w);
      stability = initStability(grade, w);
      state = grade === GRADE_AGAIN ? STATE_LEARNING : STATE_REVIEW;
    } else {
      difficulty = nextDifficulty(prev.difficulty, grade, w);
      if (elapsedDays < 1) {
        // Same-Day: kurzfristige Stabilität, Zustand bleibt erhalten.
        stability = nextShortTermStability(prev.stability, grade, w);
        state = prev.state;
      } else if (grade === GRADE_AGAIN) {
        stability = nextForgetStability(prev.difficulty, prev.stability, r, w);
        state = STATE_RELEARNING;
      } else {
        stability = nextRecallStability(prev.difficulty, prev.stability, r, grade, w);
        state = STATE_REVIEW;
      }
    }

    const interval = nextInterval(stability, dr, maxI);
    const lapses = prev.lapses + (grade === GRADE_AGAIN && !isNew && elapsedDays >= 1 ? 1 : 0);

    out[grade] = {
      interval,
      retrievability: r,
      card: {
        difficulty: Number(difficulty.toFixed(4)),
        stability: Number(stability.toFixed(4)),
        due: now + interval * DAY_MS,
        lastReview: now,
        reps: prev.reps + 1,
        lapses,
        state,
        elapsedDays: Number(elapsedDays.toFixed(4)),
        scheduledDays: interval,
      },
    };
  }
  return out;
}

// Bequemer Einzel-Aufruf: plant die Karte für eine konkrete Bewertung.
export function schedule(card, grade, now = Date.now(), opts = {}) {
  const g = clamp(num(grade, GRADE_GOOD), 1, 4);
  return repeat(card, now, opts)[g];
}

// Intervall-Vorschau (Tage) je Bewertung — für die UI-Buttons.
export function previewIntervals(card, now = Date.now(), opts = {}) {
  const all = repeat(card, now, opts);
  return { 1: all[1].interval, 2: all[2].interval, 3: all[3].interval, 4: all[4].interval };
}

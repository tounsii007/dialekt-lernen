// FSRS-5 — Algorithmus-Tests. Verifiziert die Kern-Invarianten der
// Vergessenskurve, Initialwerte und Stabilitäts-/Difficulty-Updates.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  DECAY,
  FACTOR,
  FSRS5_DEFAULT_PARAMS,
  GRADE_AGAIN,
  GRADE_HARD,
  GRADE_GOOD,
  GRADE_EASY,
  STATE_NEW,
  STATE_REVIEW,
  STATE_RELEARNING,
  retrievability,
  intervalForRetention,
  initStability,
  initDifficulty,
  nextDifficulty,
  nextRecallStability,
  nextForgetStability,
  nextShortTermStability,
  createEmptyCard,
  repeat,
  schedule,
  previewIntervals,
} from '../js/util/fsrs.js';

const DAY_MS = 86_400_000;
const approx = (a, b, eps = 1e-6) => Math.abs(a - b) <= eps;

describe('FSRS Konstanten', () => {
  it('FACTOR = 19/81 (aus DECAY=-0.5 abgeleitet)', () => {
    assert.ok(approx(FACTOR, 19 / 81));
    // FACTOR = 0.9^(1/DECAY) − 1
    assert.ok(approx(FACTOR, Math.pow(0.9, 1 / DECAY) - 1));
  });
  it('19 Default-Parameter', () => {
    assert.equal(FSRS5_DEFAULT_PARAMS.length, 19);
  });
});

describe('Vergessenskurve & Intervall', () => {
  it('R(0, S) = 1 (gerade gelernt)', () => {
    assert.ok(approx(retrievability(0, 5), 1));
  });
  it('R(S, S) = 0.9 (Definition der Stabilität)', () => {
    for (const s of [0.5, 3.173, 20, 365]) {
      assert.ok(approx(retrievability(s, s), 0.9, 1e-4), `S=${s}`);
    }
  });
  it('R fällt monoton mit der Zeit', () => {
    const s = 10;
    assert.ok(retrievability(1, s) > retrievability(5, s));
    assert.ok(retrievability(5, s) > retrievability(20, s));
  });
  it('intervalForRetention(S, 0.9) = S (Invariante)', () => {
    for (const s of [1, 3.173, 50, 500]) {
      assert.ok(approx(intervalForRetention(s, 0.9), s, 1e-4), `S=${s}`);
    }
  });
  it('höhere Wunsch-Retention → kürzeres Intervall', () => {
    const s = 50;
    assert.ok(intervalForRetention(s, 0.95) < intervalForRetention(s, 0.85));
  });
});

describe('Initialwerte', () => {
  it('Initial-Stabilität = Gewicht der Bewertung', () => {
    assert.ok(approx(initStability(GRADE_AGAIN), FSRS5_DEFAULT_PARAMS[0]));
    assert.ok(approx(initStability(GRADE_HARD), FSRS5_DEFAULT_PARAMS[1]));
    assert.ok(approx(initStability(GRADE_GOOD), FSRS5_DEFAULT_PARAMS[2]));
    assert.ok(approx(initStability(GRADE_EASY), FSRS5_DEFAULT_PARAMS[3]));
  });
  it('Initial-Stabilität steigt mit besserer Bewertung', () => {
    assert.ok(
      initStability(GRADE_AGAIN) < initStability(GRADE_HARD) &&
      initStability(GRADE_HARD) < initStability(GRADE_GOOD) &&
      initStability(GRADE_GOOD) < initStability(GRADE_EASY)
    );
  });
  it('Initial-Difficulty sinkt mit besserer Bewertung, bleibt in [1,10]', () => {
    const ds = [1, 2, 3, 4].map((g) => initDifficulty(g));
    for (const d of ds) assert.ok(d >= 1 && d <= 10);
    assert.ok(ds[0] > ds[1] && ds[1] > ds[2] && ds[2] > ds[3]);
  });
  it('Initial-Difficulty(Good) ≈ 5.283', () => {
    assert.ok(approx(initDifficulty(GRADE_GOOD), 5.28263, 1e-3));
  });
});

describe('Difficulty-Update', () => {
  it('Again erhöht Difficulty, Easy senkt sie', () => {
    const d = 5;
    assert.ok(nextDifficulty(d, GRADE_AGAIN) > d);
    assert.ok(nextDifficulty(d, GRADE_EASY) < d);
  });
  it('bleibt in [1,10] auch bei Extremen', () => {
    assert.ok(nextDifficulty(10, GRADE_AGAIN) <= 10);
    assert.ok(nextDifficulty(1, GRADE_EASY) >= 1);
  });
});

describe('Stabilitäts-Update', () => {
  it('Recall erhöht Stabilität', () => {
    const s = 3.173, d = 5.28, r = 0.9;
    assert.ok(nextRecallStability(d, s, r, GRADE_GOOD) > s);
  });
  it('Easy ergibt höhere Stabilität als Good als Hard', () => {
    const s = 10, d = 5, r = 0.9;
    const sh = nextRecallStability(d, s, r, GRADE_HARD);
    const sg = nextRecallStability(d, s, r, GRADE_GOOD);
    const se = nextRecallStability(d, s, r, GRADE_EASY);
    assert.ok(sh < sg && sg < se);
  });
  it('Forget-Stabilität liegt unter der alten Stabilität', () => {
    const s = 20, d = 5, r = 0.9;
    assert.ok(nextForgetStability(d, s, r) < s);
  });
  it('niedrigere Retrievability beim Recall → größerer Stabilitätszuwachs', () => {
    // "desirable difficulty": schweres Abrufen festigt stärker
    const s = 10, d = 5;
    const lowR = nextRecallStability(d, s, 0.7, GRADE_GOOD);
    const highR = nextRecallStability(d, s, 0.95, GRADE_GOOD);
    assert.ok(lowR > highR);
  });
  it('Short-Term: Easy > Good > Again', () => {
    const s = 5;
    assert.ok(
      nextShortTermStability(s, GRADE_AGAIN) < nextShortTermStability(s, GRADE_GOOD) &&
      nextShortTermStability(s, GRADE_GOOD) < nextShortTermStability(s, GRADE_EASY)
    );
  });
});

describe('repeat / schedule', () => {
  it('neue Karte: 4 Outcomes mit nicht-fallenden Intervallen', () => {
    const now = Date.now();
    const out = repeat(createEmptyCard(now), now, { desiredRetention: 0.9 });
    assert.ok(out[1].interval <= out[2].interval);
    assert.ok(out[2].interval <= out[3].interval);
    assert.ok(out[3].interval <= out[4].interval);
  });
  it('neue Karte Good: Intervall ≈ round(initStability(Good)) = 3', () => {
    const now = Date.now();
    const r = schedule(createEmptyCard(now), GRADE_GOOD, now, { desiredRetention: 0.9 });
    assert.equal(r.interval, 3);
    assert.equal(r.card.state, STATE_REVIEW);
    assert.equal(r.card.reps, 1);
  });
  it('neue Karte Again → Learning-State, Intervall 1', () => {
    const now = Date.now();
    const r = schedule(createEmptyCard(now), GRADE_AGAIN, now, { desiredRetention: 0.9 });
    assert.equal(r.interval, 1);
  });
  it('due liegt interval Tage in der Zukunft', () => {
    const now = Date.now();
    const r = schedule(createEmptyCard(now), GRADE_GOOD, now);
    assert.ok(approx(r.card.due, now + r.interval * DAY_MS, 1000));
  });
  it('Lapse auf reifer Karte → Relearning, lapses+1, kürzeres Intervall', () => {
    const now = Date.now();
    // reife Karte simulieren
    const mature = {
      difficulty: 5, stability: 50, due: now, lastReview: now - 50 * DAY_MS,
      reps: 5, lapses: 0, state: STATE_REVIEW, elapsedDays: 50, scheduledDays: 50,
    };
    const r = schedule(mature, GRADE_AGAIN, now, { desiredRetention: 0.9 });
    assert.equal(r.card.state, STATE_RELEARNING);
    assert.equal(r.card.lapses, 1);
    assert.ok(r.interval < 50);
  });
  it('höhere Wunsch-Retention → kürzere Vorschau-Intervalle', () => {
    const now = Date.now();
    const mature = {
      difficulty: 5, stability: 50, due: now, lastReview: now - 10 * DAY_MS,
      reps: 5, lapses: 0, state: STATE_REVIEW, elapsedDays: 10, scheduledDays: 50,
    };
    const hi = previewIntervals(mature, now, { desiredRetention: 0.95 });
    const lo = previewIntervals(mature, now, { desiredRetention: 0.85 });
    assert.ok(hi[GRADE_GOOD] < lo[GRADE_GOOD]);
  });
  it('previewIntervals liefert vier ganzzahlige Tage', () => {
    const now = Date.now();
    const p = previewIntervals(createEmptyCard(now), now);
    for (const g of [1, 2, 3, 4]) {
      assert.ok(Number.isInteger(p[g]) && p[g] >= 1);
    }
  });
  it('createEmptyCard ist im NEW-Zustand', () => {
    assert.equal(createEmptyCard().state, STATE_NEW);
  });
});

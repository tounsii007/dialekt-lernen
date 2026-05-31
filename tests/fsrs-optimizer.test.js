// FSRS-Optimizer — Parameter-Fitting aus Review-Log.
// Pures Modul (kein State); synthetische Logs werden deterministisch erzeugt.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  FSRS_PARAM_BOUNDS,
  clampParams,
  groupReviewsByCard,
  buildSequences,
  evaluateLoss,
  optimize,
} from '../js/util/fsrs-optimizer.js';
import {
  FSRS5_DEFAULT_PARAMS,
  GRADE_GOOD,
  GRADE_AGAIN,
  schedule,
  retrievability,
} from '../js/util/fsrs.js';

const DAY_MS = 86_400_000;

// Kleiner deterministischer PRNG für reproduzierbare Recall-Stichproben.
function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Erzeugt ein Review-Log, das KONSISTENT mit `trueParams` ist: Karten werden
// im Soll-Intervall wiederholt, der Recall wird aus der wahren Retrievability
// gesampelt (recalled → GOOD, sonst → AGAIN).
function genLog(trueParams, { cards = 60, maxReviews = 8, seed = 1, retention = 0.9 } = {}) {
  const rnd = mulberry32(seed);
  const start = Date.UTC(2025, 0, 1);
  const log = [];
  for (let c = 0; c < cards; c++) {
    const key = 'd.c' + c;
    let t = start + c * 1000;
    let grade = GRADE_GOOD;
    let res = schedule(null, grade, t, { params: trueParams, desiredRetention: retention });
    log.push({ key, t, g: grade });
    let card = res.card;
    for (let i = 1; i < maxReviews; i++) {
      t = t + res.interval * DAY_MS;
      const elapsed = (t - card.lastReview) / DAY_MS;
      const R = retrievability(elapsed, card.stability);
      grade = rnd() < R ? GRADE_GOOD : GRADE_AGAIN;
      log.push({ key, t, g: grade });
      res = schedule(card, grade, t, { params: trueParams, desiredRetention: retention });
      card = res.card;
    }
  }
  return log;
}

describe('FSRS_PARAM_BOUNDS', () => {
  it('hat 19 [lo,hi]-Paare mit lo < hi', () => {
    assert.equal(FSRS_PARAM_BOUNDS.length, 19);
    for (const [lo, hi] of FSRS_PARAM_BOUNDS) assert.ok(lo < hi, `${lo} < ${hi}`);
  });

  it('die Default-Gewichte liegen alle innerhalb der Grenzen', () => {
    for (let i = 0; i < 19; i++) {
      const [lo, hi] = FSRS_PARAM_BOUNDS[i];
      const w = FSRS5_DEFAULT_PARAMS[i];
      assert.ok(w >= lo && w <= hi, `w${i}=${w} nicht in [${lo}, ${hi}]`);
    }
  });
});

describe('clampParams', () => {
  it('klemmt Über-/Unterschreitungen in die Grenzen', () => {
    const tooHigh = new Array(19).fill(1e6);
    const tooLow = new Array(19).fill(-1e6);
    const hi = clampParams(tooHigh);
    const lo = clampParams(tooLow);
    for (let i = 0; i < 19; i++) {
      assert.equal(hi[i], FSRS_PARAM_BOUNDS[i][1]);
      assert.equal(lo[i], FSRS_PARAM_BOUNDS[i][0]);
    }
  });

  it('ersetzt korrupte (NaN/undefined) Einträge durch den Default', () => {
    const bad = FSRS5_DEFAULT_PARAMS.slice();
    bad[3] = NaN;
    bad[10] = undefined;
    const out = clampParams(bad);
    assert.equal(out[3], FSRS5_DEFAULT_PARAMS[3]);
    assert.equal(out[10], FSRS5_DEFAULT_PARAMS[10]);
    assert.ok(out.every(Number.isFinite));
  });
});

describe('groupReviewsByCard', () => {
  it('gruppiert nach key und sortiert chronologisch', () => {
    const log = [
      { key: 'a', t: 300, g: 3 },
      { key: 'b', t: 50, g: 1 },
      { key: 'a', t: 100, g: 2 },
    ];
    const by = groupReviewsByCard(log);
    assert.equal(by.size, 2);
    assert.deepEqual(by.get('a').map((r) => r.t), [100, 300]);
    assert.deepEqual(by.get('b').map((r) => r.t), [50]);
  });

  it('verwirft korrupte Einträge (ungültige Zeit/Grade/Key)', () => {
    const log = [
      { key: 'a', t: 1, g: 3 },
      { key: 'a', t: 'x', g: 3 },   // Zeit ungültig
      { key: 'a', t: 2, g: 9 },     // Grade außerhalb 1..4
      { key: '', t: 3, g: 3 },      // leerer Key
      null,                          // kein Objekt
    ];
    const by = groupReviewsByCard(log);
    assert.equal(by.size, 1);
    assert.equal(by.get('a').length, 1);
  });
});

describe('buildSequences', () => {
  it('zählt bewertbare Reviews = Gesamt − Karten (erstes Review je Karte zählt nicht)', () => {
    const log = [
      { key: 'a', t: 0, g: 3 },
      { key: 'a', t: DAY_MS, g: 3 },
      { key: 'a', t: 3 * DAY_MS, g: 1 },
      { key: 'b', t: 0, g: 3 },
      { key: 'b', t: 2 * DAY_MS, g: 3 },
    ];
    const { sequences, scored, cards } = buildSequences(log);
    assert.equal(cards, 2);
    assert.equal(sequences.length, 2);
    assert.equal(scored, 3); // a: 2 bewertbar, b: 1 bewertbar
  });

  it('berechnet verstrichene Tage zwischen Reviews', () => {
    const log = [
      { key: 'a', t: 0, g: 3 },
      { key: 'a', t: 5 * DAY_MS, g: 3 },
    ];
    const { sequences } = buildSequences(log);
    assert.equal(sequences[0].steps[0].elapsed, 0);
    assert.equal(sequences[0].steps[1].elapsed, 5);
  });
});

describe('evaluateLoss', () => {
  it('liefert endlichen, nicht-negativen Loss für valide Sequenzen', () => {
    const log = genLog(FSRS5_DEFAULT_PARAMS, { cards: 20, maxReviews: 6, seed: 7 });
    const { sequences, scored } = buildSequences(log);
    const { loss, n } = evaluateLoss(FSRS5_DEFAULT_PARAMS, sequences);
    assert.equal(n, scored);
    assert.ok(Number.isFinite(loss) && loss >= 0, `loss=${loss}`);
  });

  it('liefert Infinity / n=0 ohne bewertbare Reviews', () => {
    const { sequences } = buildSequences([{ key: 'a', t: 0, g: 3 }]);
    const { loss, n } = evaluateLoss(FSRS5_DEFAULT_PARAMS, sequences);
    assert.equal(n, 0);
    assert.equal(loss, Infinity);
  });
});

describe('optimize — Datenmenge & Validität', () => {
  it('lehnt zu wenig Daten ab (ok:false), gibt geklemmte Default-Parameter zurück', () => {
    const log = genLog(FSRS5_DEFAULT_PARAMS, { cards: 2, maxReviews: 3, seed: 1 });
    const res = optimize(log, { minReviews: 64 });
    assert.equal(res.ok, false);
    assert.equal(res.reason, 'insufficient-data');
    assert.equal(res.params.length, 19);
    assert.ok(res.reviews < 64);
  });

  it('liefert bei genug Daten 19 valide Gewichte innerhalb der Grenzen', () => {
    const log = genLog(FSRS5_DEFAULT_PARAMS, { cards: 60, maxReviews: 8, seed: 3 });
    const res = optimize(log, { maxIters: 20, regularization: 0 });
    assert.equal(res.ok, true);
    assert.equal(res.params.length, 19);
    for (let i = 0; i < 19; i++) {
      const [lo, hi] = FSRS_PARAM_BOUNDS[i];
      assert.ok(res.params[i] >= lo && res.params[i] <= hi, `w${i}=${res.params[i]}`);
      assert.ok(Number.isFinite(res.params[i]));
    }
  });

  it('verschlechtert den Loss nie (best-so-far, reg=0)', () => {
    const log = genLog(FSRS5_DEFAULT_PARAMS, { cards: 50, maxReviews: 7, seed: 11 });
    const res = optimize(log, { maxIters: 25, regularization: 0 });
    assert.ok(res.finalLoss <= res.initialLoss + 1e-9, `final=${res.finalLoss} init=${res.initialLoss}`);
    assert.ok(res.improvement >= -1e-9);
  });

  it('ist deterministisch (gleiches Log → gleiche Parameter)', () => {
    const log = genLog(FSRS5_DEFAULT_PARAMS, { cards: 40, maxReviews: 6, seed: 5 });
    const a = optimize(log, { maxIters: 15 });
    const b = optimize(log, { maxIters: 15 });
    assert.deepEqual(a.params, b.params);
    assert.equal(a.finalLoss, b.finalLoss);
  });
});

describe('optimize — lernt aus fehlangepassten Daten', () => {
  it('senkt den Loss messbar, wenn die Daten von Nicht-Default-Gewichten stammen', () => {
    // „Wahre" Gewichte: deutlich langsameres Stabilitätswachstum (w8 kleiner) →
    // der Nutzer vergisst schneller, als die Default-Gewichte vorhersagen.
    const trueParams = FSRS5_DEFAULT_PARAMS.slice();
    trueParams[8] = 0.4;   // exp(w8) kleiner → geringere Recall-Stabilität
    trueParams[10] = 0.6;  // schwächere R-Abhängigkeit
    const log = genLog(trueParams, { cards: 80, maxReviews: 9, seed: 21 });

    const res = optimize(log, { initialParams: FSRS5_DEFAULT_PARAMS, maxIters: 40, regularization: 0 });
    assert.equal(res.ok, true);
    assert.ok(res.improvement > 1e-4, `improvement=${res.improvement}`);
    assert.ok(res.finalLoss < res.initialLoss, `final=${res.finalLoss} < init=${res.initialLoss}`);
  });
});

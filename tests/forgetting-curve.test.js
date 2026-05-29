// forgetting-curve.js — Ebbinghaus-Retention-Berechnung.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { state } from '../js/store/state.js';
import {
  getCardRetention, getForgettingCurveData,
  getOverallRetention, getCardsAtRisk,
} from '../js/util/forgetting-curve.js';
import { resetState } from './_setup.js';

describe('getCardRetention', () => {
  it('Karte ohne last → retention 0', () => {
    assert.equal(getCardRetention({ ef: 2.5, interval: 1 }), 0);
    assert.equal(getCardRetention({}), 0);
    assert.equal(getCardRetention(null), 0);
  });

  it('Karte gerade gelernt (last = now) → retention ≈ 1', () => {
    const card = { ef: 2.5, interval: 1, last: Date.now() };
    const r = getCardRetention(card);
    assert.ok(r > 0.95, `retention sollte ≈1 sein, war ${r}`);
  });

  it('Karte vor langer Zeit gelernt → retention < 0.5', () => {
    const card = { ef: 2.5, interval: 1, last: Date.now() - 30 * 86_400_000 };
    const r = getCardRetention(card);
    assert.ok(r < 0.5, `retention sollte < 0.5 sein, war ${r}`);
  });

  it('höhere stability → langsamere Vergessenskurve', () => {
    const fresh = Date.now() - 5 * 86_400_000;
    const easy = { ef: 3.0, interval: 30, last: fresh };
    const hard = { ef: 1.3, interval: 1, last: fresh };
    assert.ok(getCardRetention(easy) > getCardRetention(hard));
  });

  it('retention immer in [0, 1]', () => {
    for (const days of [0, 1, 7, 30, 365]) {
      const card = { ef: 2.5, interval: 1, last: Date.now() - days * 86_400_000 };
      const r = getCardRetention(card);
      assert.ok(r >= 0 && r <= 1, `days=${days}: r=${r}`);
    }
  });

  it('akzeptiert "lastReview" (Worker-Format)', () => {
    const card = { ef: 2.5, interval: 1, lastReview: new Date().toISOString() };
    const r = getCardRetention(card);
    assert.ok(r > 0.9);
  });
});

describe('getForgettingCurveData', () => {
  it('leeres Array bei fehlendem last', () => {
    assert.deepEqual(getForgettingCurveData({ ef: 2.5 }), []);
  });

  it('liefert days+1 Punkte', () => {
    const card = { ef: 2.5, interval: 1, last: Date.now() };
    assert.equal(getForgettingCurveData(card, 30).length, 31);
    assert.equal(getForgettingCurveData(card, 7).length, 8);
  });

  it('retention nimmt mit den Tagen ab', () => {
    const card = { ef: 2.5, interval: 1, last: Date.now() };
    const curve = getForgettingCurveData(card, 30);
    for (let i = 1; i < curve.length; i++) {
      assert.ok(curve[i].retention <= curve[i - 1].retention);
    }
  });
});

describe('getOverallRetention', () => {
  beforeEach(resetState);

  it('null bei keinen Karten', () => {
    assert.equal(getOverallRetention(), null);
  });

  it('Durchschnitt mehrerer Karten', () => {
    state.gelernt = {
      'a.1': { ef: 2.5, interval: 1, last: Date.now() },              // ~1
      'a.2': { ef: 2.5, interval: 1, last: Date.now() - 50 * 86_400_000 }, // niedrig
    };
    const r = getOverallRetention();
    assert.ok(r > 0 && r < 1);
  });
});

describe('getCardsAtRisk', () => {
  beforeEach(resetState);

  it('leeres Array bei keinen Karten', () => {
    assert.deepEqual(getCardsAtRisk(), []);
  });

  it('liefert nur Karten unter Threshold', () => {
    state.gelernt = {
      'a.1': { ef: 2.5, interval: 1, last: Date.now() },              // hoch
      'a.2': { ef: 2.5, interval: 1, last: Date.now() - 100 * 86_400_000 }, // niedrig
    };
    const r = getCardsAtRisk(0.5);
    assert.equal(r.length, 1);
    assert.equal(r[0].id, '2');
  });

  it('sortiert nach Retention aufsteigend', () => {
    state.gelernt = {
      'a.1': { ef: 2.5, interval: 1, last: Date.now() - 50 * 86_400_000 },
      'a.2': { ef: 2.5, interval: 1, last: Date.now() - 100 * 86_400_000 },
      'a.3': { ef: 2.5, interval: 1, last: Date.now() - 30 * 86_400_000 },
    };
    const r = getCardsAtRisk(0.9);
    for (let i = 1; i < r.length; i++) {
      assert.ok(r[i - 1].retention <= r[i].retention);
    }
  });

  it('zerlegt Key korrekt in dialektId/id (Punkt-Separator)', () => {
    state.gelernt = {
      'hessisch.h-001': { ef: 2.5, interval: 1, last: Date.now() - 100 * 86_400_000 },
    };
    const r = getCardsAtRisk(1);
    assert.equal(r[0].dialektId, 'hessisch');
    assert.equal(r[0].id, 'h-001');
  });
});

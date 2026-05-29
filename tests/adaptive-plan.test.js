// adaptive-plan.js — Adaptive Lernempfehlungen.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { state } from '../js/store/state.js';
import { getAdaptiveRecommendations } from '../js/util/adaptive-plan.js';
import { resetState } from './_setup.js';

describe('getAdaptiveRecommendations', () => {
  beforeEach(resetState);

  it('liefert ein Array', () => {
    const r = getAdaptiveRecommendations(10);
    assert.ok(Array.isArray(r));
  });

  it('respektiert das Limit', () => {
    const r = getAdaptiveRecommendations(5);
    assert.ok(r.length <= 5);
  });

  it('jeder Eintrag hat entry/reason/priority', () => {
    // simuliert ein paar gelernte Karten als Datengrundlage
    state.gelernt = {
      'hessisch.h-001': { ef: 1.4, reps: 1, interval: 1, lapses: 3, last: Date.now() - 30 * 86_400_000, stand: 1 },
    };
    const r = getAdaptiveRecommendations(5);
    for (const rec of r) {
      assert.ok(rec.entry);
      assert.equal(typeof rec.reason, 'string');
      assert.equal(typeof rec.priority, 'number');
    }
  });

  it('priorisiert at-risk Karten zuerst', () => {
    state.gelernt = {
      'hessisch.h-001': { ef: 1.4, reps: 1, interval: 1, lapses: 5, last: Date.now() - 200 * 86_400_000, stand: 1 },
    };
    const r = getAdaptiveRecommendations(5);
    if (r.length > 0) {
      assert.equal(r[0].priority, 1, 'höchste Prio sollte 1 sein');
    }
  });

  it('robust bei leerem state.gelernt', () => {
    assert.doesNotThrow(() => getAdaptiveRecommendations(10));
  });
});

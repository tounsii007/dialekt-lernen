// Store-Anbindung des FSRS-Optimizers: Log-Kennzahlen + Parameter-Übernahme.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { state } from '../js/store/state.js';
import {
  getSrsLogStats,
  optimizeSrsParams,
  getSrsConfig,
} from '../js/store/srs.js';

function resetSrsState() {
  state.gelernt = {};
  state.xp = { total: 0, log: [] };
  state.goals = { target: 10, progress: {}, reminderShown: {} };
  state.streak = { count: 0, lastDay: null, days: {} };
  state.srs = { scheduler: 'fsrs', retention: 0.9, fuzz: true, params: null };
  state.srsLog = [];
}

// Legt ein synthetisches Review-Log an: `cards` Karten mit je `perCard`
// Reviews im 3-Tage-Abstand. Bewertbare Reviews = cards * (perCard - 1).
function seedLog(cards, perCard, grade = 3) {
  const start = Date.UTC(2025, 0, 1);
  state.srsLog = [];
  for (let c = 0; c < cards; c++) {
    const key = 'd.c' + c;
    for (let i = 0; i < perCard; i++) {
      state.srsLog.push({ key, t: start + c * 100000 + i * 3 * 86_400_000, g: grade });
    }
  }
}

describe('getSrsLogStats', () => {
  beforeEach(resetSrsState);

  it('leeres Log → alles 0', () => {
    assert.deepEqual(getSrsLogStats(), { total: 0, reviewable: 0, cards: 0 });
  });

  it('zählt Roh-Einträge, bewertbare Reviews und Karten', () => {
    seedLog(5, 3); // 5 Karten × 3 Reviews = 15 roh, 5×2 = 10 bewertbar
    const s = getSrsLogStats();
    assert.equal(s.total, 15);
    assert.equal(s.cards, 5);
    assert.equal(s.reviewable, 10);
  });
});

describe('optimizeSrsParams', () => {
  beforeEach(resetSrsState);

  it('zu wenig Daten → ok:false, Parameter werden NICHT übernommen', () => {
    seedLog(3, 2); // nur 3 bewertbare Reviews
    const res = optimizeSrsParams({ minReviews: 64 });
    assert.equal(res.ok, false);
    assert.equal(res.reason, 'insufficient-data');
    assert.equal(getSrsConfig().params, null);
  });

  it('genug Daten → ok:true und 19 Parameter werden persistiert', () => {
    seedLog(70, 2); // 70 bewertbare Reviews
    assert.equal(getSrsConfig().params, null);
    const res = optimizeSrsParams({ maxIters: 8, minReviews: 64 });
    assert.equal(res.ok, true);
    const p = getSrsConfig().params;
    assert.ok(Array.isArray(p));
    assert.equal(p.length, 19);
    assert.ok(p.every(Number.isFinite));
  });

  it('apply:false rechnet nur (Vorschau), ohne zu speichern', () => {
    seedLog(70, 2);
    const res = optimizeSrsParams({ maxIters: 8, minReviews: 64, apply: false });
    assert.equal(res.ok, true);
    assert.equal(res.params.length, 19);
    assert.equal(getSrsConfig().params, null); // nicht übernommen
  });
});

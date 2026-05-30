// Verzahnung Fuzz/Load-Balancing ↔ FSRS-Scheduler im Store.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { state } from '../js/store/state.js';
import {
  reviewCardFsrs,
  getReviewPreview,
  getCardSrs,
  setSrsConfig,
} from '../js/store/srs.js';
import { GRADE_AGAIN, GRADE_EASY } from '../js/util/fsrs.js';
import { fuzzRange } from '../js/util/fsrs-fuzz.js';

const DAY = 86_400_000;

function resetSrsState() {
  state.gelernt = {};
  state.xp = { total: 0, log: [] };
  state.goals = { target: 10, progress: {}, reminderShown: {} };
  state.streak = { count: 0, lastDay: null, days: {} };
  state.srs = { scheduler: 'fsrs', retention: 0.9, fuzz: true, params: null };
  state.srsLog = [];
}

// Füllt einen Zieltag (Offset ab now) mit Dummy-Karten, um Last zu erzeugen.
function seedLoadAtDay(dayOffset, count, now) {
  for (let i = 0; i < count; i++) {
    state.gelernt['load.' + dayOffset + '.' + i] = {
      sched: 'fsrs', difficulty: 5, stability: 10, state: 2,
      reps: 3, lapses: 0, interval: dayOffset, due: now + dayOffset * DAY, last: now,
    };
  }
}

describe('reviewCardFsrs — Fuzz-Verzahnung', () => {
  beforeEach(resetSrsState);

  it('fuzz=false → Intervall ist das unverfälschte FSRS-Intervall', () => {
    setSrsConfig({ scheduler: 'fsrs', fuzz: false });
    const preview = getReviewPreview('d', 'x');
    const ideal = preview[GRADE_EASY];
    const rec = reviewCardFsrs('d', 'x', GRADE_EASY);
    assert.equal(rec.interval, ideal);
  });

  it('fuzz=true, keine Last → Intervall bleibt im Fuzz-Fenster', () => {
    setSrsConfig({ scheduler: 'fsrs', fuzz: true });
    const ideal = getReviewPreview('d', 'x')[GRADE_EASY];
    const { min, max } = fuzzRange(ideal);
    const rec = reviewCardFsrs('d', 'x', GRADE_EASY);
    assert.ok(rec.interval >= min && rec.interval <= max, `${min} <= ${rec.interval} <= ${max}`);
    assert.ok(rec.due > Date.now());
  });

  it('Load-Balancing weicht dem überlasteten Ideal-Tag aus', () => {
    setSrsConfig({ scheduler: 'fsrs', fuzz: true });
    const now = Date.now();
    const ideal = getReviewPreview('probe', 'p', now)[GRADE_EASY];
    // Nur sinnvoll, wenn überhaupt gestreut wird (Mehrtages-Intervall).
    if (ideal < 3) return;
    seedLoadAtDay(ideal, 20, now); // Ideal-Tag massiv überlasten
    const rec = reviewCardFsrs('probe', 'p', GRADE_EASY, now);
    const { min, max } = fuzzRange(ideal);
    assert.ok(rec.interval >= min && rec.interval <= max, `im Fenster [${min},${max}]: ${rec.interval}`);
    assert.notEqual(rec.interval, ideal); // der überlastete Ideal-Tag wird gemieden
  });

  it('Lernschritt (< 2.5 Tage) wird nicht in ein Mehrtages-Intervall gestreut', () => {
    setSrsConfig({ scheduler: 'fsrs', fuzz: true });
    const now = Date.now();
    reviewCardFsrs('d', 'y', GRADE_AGAIN, now);
    const rec = getCardSrs('d', 'y');
    assert.ok(rec.interval < 2.5, `kurzer Lernschritt bleibt kurz: ${rec.interval}`);
    // Fälligkeit bleibt sub-2.5-Tage, nicht auf einen ganzen Tag hochgerundet.
    assert.ok(rec.due - now < 2.5 * DAY, `due bleibt nah: ${(rec.due - now) / DAY} Tage`);
  });
});

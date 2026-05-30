// goals.js — Tagesziele.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { state } from '../js/store/state.js';
import {
  getGoalTarget, setGoalTarget,
  getTodayProgress, incrementGoalProgress,
  isGoalMet, getGoalPct, getGoalOptions,
  getProgressHistory, GOAL_OPTIONS, DEFAULT_GOAL,
} from '../js/store/goals.js';
import { resetState } from './_setup.js';

describe('Konstanten', () => {
  it('GOAL_OPTIONS = [5,10,20,50]', () => {
    assert.deepEqual(GOAL_OPTIONS, [5, 10, 20, 50]);
  });
  it('DEFAULT_GOAL = 10', () => assert.equal(DEFAULT_GOAL, 10));
});

describe('getGoalTarget / setGoalTarget', () => {
  beforeEach(resetState);

  it('Default = 10', () => assert.equal(getGoalTarget(), 10));

  it('akzeptiert nur gültige Optionen', () => {
    setGoalTarget(20);
    assert.equal(getGoalTarget(), 20);
    setGoalTarget(50);
    assert.equal(getGoalTarget(), 50);
  });

  it('fällt bei ungültigem Wert auf Default', () => {
    setGoalTarget(7); // nicht in OPTIONS
    assert.equal(getGoalTarget(), DEFAULT_GOAL);
  });

  it('persistiert in state.goals.target', () => {
    setGoalTarget(20);
    assert.equal(state.goals.target, 20);
  });
});

describe('getTodayProgress / incrementGoalProgress', () => {
  beforeEach(resetState);

  it('Start: 0', () => assert.equal(getTodayProgress(), 0));

  it('Increment um 1', () => {
    incrementGoalProgress();
    assert.equal(getTodayProgress(), 1);
  });

  it('Increment um custom Wert', () => {
    incrementGoalProgress(5);
    assert.equal(getTodayProgress(), 5);
  });

  it('summiert über mehrere Aufrufe', () => {
    incrementGoalProgress(3);
    incrementGoalProgress(2);
    incrementGoalProgress(5);
    assert.equal(getTodayProgress(), 10);
  });
});

describe('incrementGoalProgress — Pruning behält die chronologisch jüngsten 30 Tage', () => {
  beforeEach(resetState);

  // Schlüssel haben das Format YYYY-M-D (nicht null-gepolstert). Ein naiver
  // String-Sort ordnet "2025-1-10" vor "2025-1-9" und "2025-12-1" vor
  // "2025-9-1" — also würden beim Kappen auf 30 die FALSCHEN Tage verworfen.
  // Dieser Test seedet 35 Vergangenheits-Tage über eine Monatsgrenze (inkl.
  // ein-/zweistelliger Tage), triggert einen Increment (= heute, jüngster Tag)
  // und prüft, dass exakt die ältesten Tage gekappt werden.
  function mkKey(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  it('verwirft die ältesten Tage, nicht die lexikografisch kleinsten', () => {
    const seeded = [];
    for (let i = 0; i < 35; i++) {
      const d = new Date(2025, 0, 1 + i); // 2025-1-1 .. 2025-2-4
      const key = mkKey(d);
      seeded.push(key);
      state.goals.progress[key] = i + 1;
    }

    incrementGoalProgress(); // fügt den heutigen (jüngsten) Tag hinzu → 36 Einträge

    const remaining = Object.keys(state.goals.progress);
    assert.equal(remaining.length, 30, 'auf 30 Tage gekappt');

    // Heute (jüngster Tag) bleibt erhalten.
    const today = new Date();
    assert.ok(remaining.includes(mkKey(today)), 'heutiger Tag bleibt');

    // Die 6 chronologisch ältesten seeds (i=0..5) sind verworfen.
    for (let i = 0; i < 6; i++) {
      assert.ok(!remaining.includes(seeded[i]), `ältester Tag ${seeded[i]} verworfen`);
    }
    // Die jüngeren seeds (i>=6) bleiben — inkl. "2025-1-10", das ein naiver
    // String-Sort fälschlich als "alt" einstufen und kappen würde.
    for (let i = 6; i < 35; i++) {
      assert.ok(remaining.includes(seeded[i]), `jüngerer Tag ${seeded[i]} bleibt`);
    }
    assert.ok(remaining.includes('2025-1-10'), 'lexikografisch kleiner, aber chronologisch jung → bleibt');
  });
});

describe('isGoalMet / getGoalPct', () => {
  beforeEach(resetState);

  it('false bei 0%', () => {
    assert.equal(isGoalMet(), false);
    assert.equal(getGoalPct(), 0);
  });

  it('50% bei 5/10', () => {
    for (let i = 0; i < 5; i++) incrementGoalProgress();
    assert.equal(getGoalPct(), 0.5);
    assert.equal(isGoalMet(), false);
  });

  it('100% bei 10/10', () => {
    for (let i = 0; i < 10; i++) incrementGoalProgress();
    assert.equal(getGoalPct(), 1);
    assert.equal(isGoalMet(), true);
  });

  it('clampt auf 1 bei Übererfüllung', () => {
    for (let i = 0; i < 20; i++) incrementGoalProgress();
    assert.equal(getGoalPct(), 1);
    assert.equal(isGoalMet(), true);
  });
});

describe('getProgressHistory', () => {
  beforeEach(resetState);

  it('liefert 14 Tage standardmäßig', () => {
    const h = getProgressHistory();
    assert.equal(h.length, 14);
  });

  it('liefert N Tage mit custom days', () => {
    assert.equal(getProgressHistory(7).length, 7);
    assert.equal(getProgressHistory(30).length, 30);
  });

  it('jeder Eintrag hat date/count/met', () => {
    const h = getProgressHistory(3);
    for (const x of h) {
      assert.ok(x.date instanceof Date);
      assert.equal(typeof x.count, 'number');
      assert.equal(typeof x.met, 'boolean');
    }
  });

  it('zählt heutigen Fortschritt korrekt', () => {
    incrementGoalProgress(7);
    const h = getProgressHistory(1);
    assert.equal(h[0].count, 7);
  });
});

describe('getGoalOptions', () => {
  it('liefert Kopie der OPTIONS', () => {
    const opts = getGoalOptions();
    assert.deepEqual(opts, GOAL_OPTIONS);
  });
});

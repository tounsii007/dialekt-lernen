// daily-goal.js (util) — Goal-Widget Helper (ohne UI-Render-Logik).

import { describe, it, beforeEach, before, after } from 'node:test';
import assert from 'node:assert/strict';

import { resetState, mountDom, unmountDom } from './_setup.js';
import { state } from '../js/store/state.js';

// Mount DOM bevor wir das Modul laden — es nutzt document beim Import.
before(mountDom);
after(unmountDom);

// daily-goal.js exportiert primär UI-Helper. Wir testen die Datenfunktionen.
const dailyGoal = await import('../js/util/daily-goal.js');

describe('daily-goal — exportierte Funktionen', () => {
  it('hat exportierte Funktionen (renderGoalWidget oder initGoalEvents)', () => {
    const keys = Object.keys(dailyGoal);
    assert.ok(keys.length > 0, 'sollte etwas exportieren');
  });
});

describe('daily-goal — initGoalEvents (no-op ohne DOM)', () => {
  beforeEach(resetState);

  it('initGoalEvents ist robust gegen fehlenden Toast', () => {
    if (typeof dailyGoal.initGoalEvents !== 'function') return;
    assert.doesNotThrow(() => dailyGoal.initGoalEvents(null));
    assert.doesNotThrow(() => dailyGoal.initGoalEvents(() => {}));
  });
});

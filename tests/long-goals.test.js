// Long-Goals Tests

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { state } from '../js/store/state.js';
import {
  addLongGoal, getLongGoals, removeLongGoal, clearLongGoals,
} from '../js/store/long-goals.js';

beforeEach(() => { state.longGoals = []; state.gelernt = {}; });

describe('Long-Goals', () => {
  it('addLongGoal mit minimalen Daten', () => {
    const goal = addLongGoal({ label: 'Test', target: 10 });
    assert.ok(goal);
    assert.ok(goal.id);
    const all = getLongGoals();
    assert.equal(all.length, 1);
    assert.equal(all[0].target, 10);
  });

  it('addLongGoal sanitiziert Label-Länge', () => {
    const goal = addLongGoal({ label: 'x'.repeat(200), target: 5 });
    assert.ok(goal.label.length <= 120);
  });

  it('addLongGoal target ≥ 1', () => {
    const goal = addLongGoal({ label: 'T', target: 0 });
    assert.ok(goal.target >= 1);
  });

  it('getLongGoals enthält current + progress', () => {
    addLongGoal({ label: 'T', target: 10 });
    const goal = getLongGoals()[0];
    assert.equal(typeof goal.current, 'number');
    assert.equal(typeof goal.progress, 'number');
    assert.ok(goal.progress >= 0 && goal.progress <= 1);
  });

  it('progress berechnet aus state.gelernt', () => {
    // 2 Karten als gelernt markieren
    state.gelernt['bayerisch.by-001'] = { stand: 3 };
    state.gelernt['bayerisch.by-002'] = { stand: 3 };
    addLongGoal({ label: 'BY', target: 10, scope: { dialektId: 'bayerisch' } });
    const goal = getLongGoals()[0];
    assert.ok(goal.current >= 2);
  });

  it('removeLongGoal entfernt', () => {
    const goal = addLongGoal({ label: 'T', target: 5 });
    removeLongGoal(goal.id);
    assert.equal(getLongGoals().length, 0);
  });

  it('clearLongGoals leert alle', () => {
    addLongGoal({ label: 'A', target: 1 });
    addLongGoal({ label: 'B', target: 2 });
    clearLongGoals();
    assert.equal(getLongGoals().length, 0);
  });

  it('deadline-Format wird gespeichert', () => {
    addLongGoal({ label: 'T', target: 5, deadline: '2026-12-31' });
    const goal = getLongGoals()[0];
    assert.equal(goal.deadline, '2026-12-31');
  });
});

// week-review.js — 7-Tage-Zusammenfassung.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { state } from '../js/store/state.js';
import { getWeekReview } from '../js/util/week-review.js';
import { resetState } from './_setup.js';

describe('getWeekReview', () => {
  beforeEach(resetState);

  it('Default 7 Tage, leerer State', () => {
    const r = getWeekReview();
    assert.equal(r.byDay.length, 7);
    assert.ok(r.totals);
  });

  it('Custom days (30 für Monatsrückblick)', () => {
    const r = getWeekReview(30);
    assert.equal(r.byDay.length, 30);
  });

  it('byDay-Einträge haben date/key/label/activity/xp', () => {
    const r = getWeekReview(3);
    for (const day of r.byDay) {
      assert.ok(day.date instanceof Date);
      assert.equal(typeof day.key, 'string');
      assert.equal(typeof day.label, 'string');
      assert.equal(typeof day.activity, 'number');
      assert.equal(typeof day.xp, 'number');
    }
  });

  it('zählt Streak-Aktivität korrekt', () => {
    const today = new Date();
    const todayKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    state.streak = { count: 1, lastDay: todayKey, days: { [todayKey]: 5 } };
    const r = getWeekReview();
    const todayBucket = r.byDay[r.byDay.length - 1];
    assert.ok(todayBucket.activity >= 5);
  });

  it('zählt XP aus log', () => {
    state.xp = {
      total: 50,
      log: [
        { amount: 10, reason: 'card-learned', ts: Date.now() },
        { amount: 20, reason: 'quiz-correct', ts: Date.now() },
      ],
    };
    const r = getWeekReview();
    assert.ok(r.totals.xp >= 30);
  });

  it('robust gegen leere/fehlende state-Felder', () => {
    delete state.xp;
    delete state.gelernt;
    delete state.streak;
    assert.doesNotThrow(() => getWeekReview());
  });
});

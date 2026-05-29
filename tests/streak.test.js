// streak.js — Konsekutive Lerntage zählen.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { state } from '../js/store/state.js';
import { registerStreak, getStreak, getStreakHeatmap, getActiveDays } from '../js/store/streak.js';
import { resetState } from './_setup.js';

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function dayKey(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

describe('registerStreak — Tag 1', () => {
  beforeEach(resetState);

  it('Erster Aufruf setzt Streak = 1', () => {
    assert.equal(registerStreak(), 1);
    assert.equal(getStreak(), 1);
  });

  it('Mehrfach am selben Tag bleibt bei 1', () => {
    registerStreak();
    registerStreak();
    registerStreak();
    assert.equal(getStreak(), 1);
  });

  it('Tageszähler wird inkrementiert', () => {
    registerStreak();
    registerStreak();
    registerStreak();
    assert.equal(state.streak.days[todayKey()], 3);
  });
});

describe('registerStreak — Konsekutiv', () => {
  beforeEach(resetState);

  it('Gestern + Heute → Streak = 2', () => {
    state.streak.lastDay = dayKey(-1);
    state.streak.count = 1;
    state.streak.days[dayKey(-1)] = 1;
    assert.equal(registerStreak(), 2);
  });

  it('Lücke von 2 Tagen resettet Streak auf 1', () => {
    state.streak.lastDay = dayKey(-3);
    state.streak.count = 5;
    assert.equal(registerStreak(), 1);
  });

  it('30-Tage-Serie zählt korrekt hoch', () => {
    state.streak.lastDay = dayKey(-1);
    state.streak.count = 29;
    assert.equal(registerStreak(), 30);
  });
});

describe('getStreakHeatmap', () => {
  beforeEach(resetState);

  it('liefert 16*7 = 112 Tage standardmäßig', () => {
    const heat = getStreakHeatmap();
    assert.equal(heat.length, 112);
  });

  it('liefert N*7 Tage mit custom weeks', () => {
    const heat = getStreakHeatmap(4);
    assert.equal(heat.length, 28);
  });

  it('jeder Eintrag hat date/key/count', () => {
    const heat = getStreakHeatmap(1);
    for (const h of heat) {
      assert.ok(h.date instanceof Date);
      assert.equal(typeof h.key, 'string');
      assert.equal(typeof h.count, 'number');
    }
  });

  it('chronologisch absteigend bis heute', () => {
    const heat = getStreakHeatmap(2);
    assert.equal(heat[heat.length - 1].key, todayKey());
  });

  it('zählt eingetragene Aktivitäten', () => {
    state.streak.days[todayKey()] = 5;
    const heat = getStreakHeatmap(1);
    assert.equal(heat[heat.length - 1].count, 5);
  });

  it('Keys sind lückenlos aufeinanderfolgende Kalendertage (DST-sicher)', () => {
    const heat = getStreakHeatmap(8);
    const keys = heat.map(h => h.key);
    // Keine Tagesdopplung — ms-Subtraktion vom fixen Anker kann an
    // DST-Übergängen einen Kalendertag doppeln oder überspringen.
    assert.equal(new Set(keys).size, keys.length, 'keine doppelten Tage');
    for (let i = 1; i < keys.length; i++) {
      const [y0, m0, d0] = keys[i - 1].split('-').map(Number);
      const [y1, m1, d1] = keys[i].split('-').map(Number);
      const diffDays = Math.round((new Date(y1, m1 - 1, d1) - new Date(y0, m0 - 1, d0)) / 86_400_000);
      assert.equal(diffDays, 1, `${keys[i - 1]} → ${keys[i]} sollte genau 1 Tag sein`);
    }
  });
});

describe('getActiveDays', () => {
  beforeEach(resetState);

  it('0 bei leerem State', () => {
    assert.equal(getActiveDays(), 0);
  });

  it('zählt unique Tage', () => {
    state.streak.days = { '2026-1-1': 5, '2026-1-2': 3, '2026-2-1': 1 };
    assert.equal(getActiveDays(), 3);
  });
});

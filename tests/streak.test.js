// streak.js — Konsekutive Lerntage zählen.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { state } from '../js/store/state.js';
import {
  registerStreak, getStreak, getStreakHeatmap, getActiveDays,
  getStreakProtection, setWeekendAmulet, canRepairStreak, repairStreak,
  MAX_FREEZES, MAX_REPAIRS, FREEZE_EARN_EVERY, REPAIR_EARN_EVERY, REPAIR_WINDOW_DAYS,
} from '../js/store/streak.js';
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

  it('jeder Eintrag hat date/key/count/frozen', () => {
    const heat = getStreakHeatmap(1);
    for (const h of heat) {
      assert.ok(h.date instanceof Date);
      assert.equal(typeof h.key, 'string');
      assert.equal(typeof h.count, 'number');
      assert.ok(h.frozen === null || typeof h.frozen === 'string');
    }
  });

  it('markiert per Freeze überbrückte Tage', () => {
    state.streak.frozenDays[todayKey()] = 'freeze';
    const heat = getStreakHeatmap(1);
    assert.equal(heat[heat.length - 1].frozen, 'freeze');
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

describe('Streak-Schutz — Belohnungen', () => {
  beforeEach(resetState);

  it('verdient einen Freeze bei Tag 5', () => {
    state.streak.lastDay = dayKey(-1);
    state.streak.count = FREEZE_EARN_EVERY - 1; // 4
    assert.equal(registerStreak(), FREEZE_EARN_EVERY); // 5
    assert.equal(state.streak.freezes, 1);
  });

  it('verdient maximal MAX_FREEZES Freezes', () => {
    state.streak.lastDay = dayKey(-1);
    state.streak.count = 9;
    state.streak.freezes = MAX_FREEZES;     // schon voll
    state.streak.freezeMilestone = 5;       // letzter Meilenstein bei 5
    assert.equal(registerStreak(), 10);
    assert.equal(state.streak.freezes, MAX_FREEZES); // bleibt gedeckelt
  });

  it('verdient ein Reparatur-Token bei Tag 20', () => {
    state.streak.lastDay = dayKey(-1);
    state.streak.count = REPAIR_EARN_EVERY - 1; // 19
    assert.equal(registerStreak(), REPAIR_EARN_EVERY); // 20
    assert.equal(state.streak.repairs, 1);
  });
});

describe('Streak-Schutz — Freeze-Bridging', () => {
  beforeEach(resetState);

  it('ein Freeze überbrückt eine 2-Tage-Lücke', () => {
    state.streak.lastDay = dayKey(-2); // diff 2 → 1 verpasster Tag
    state.streak.count = 5;
    state.streak.freezes = 1;
    state.streak.freezeMilestone = 999; // keine neue Belohnung dazwischen
    assert.equal(registerStreak(), 6);
    assert.equal(state.streak.freezes, 0); // verbraucht
  });

  it('ohne genug Freezes reißt der Streak — Freezes bleiben erhalten', () => {
    state.streak.lastDay = dayKey(-3); // 2 verpasste Tage
    state.streak.count = 5;
    state.streak.freezes = 1; // reicht nicht für 2 Tage
    assert.equal(registerStreak(), 1); // gerissen
    assert.equal(state.streak.freezes, 1); // nicht verbraucht
    assert.equal(state.streak.lastBreak.prevCount, 5);
  });
});

describe('Streak-Schutz — Wochenend-Amulett', () => {
  beforeEach(resetState);

  // Jede 7-Tage-Lücke enthält genau ein Wochenende (Sa + So), unabhängig
  // vom heutigen Wochentag — daher deterministisch testbar.
  it('deckt Wochenenden gratis, Werktage kosten Freezes', () => {
    state.streak.lastDay = dayKey(-8); // 7 verpasste Tage = 2 WE + 5 Werktage
    state.streak.count = 10;
    state.streak.freezes = 5;
    state.streak.weekendAmulet = true;
    state.streak.freezeMilestone = 999;
    state.streak.repairMilestone = 999;
    assert.equal(registerStreak(), 11);
    assert.equal(state.streak.freezes, 0); // 5 Werktage = 5 Freezes
    const tags = Object.values(state.streak.frozenDays);
    assert.equal(tags.filter(v => v === 'amulet').length, 2);
    assert.equal(tags.filter(v => v === 'freeze').length, 5);
  });

  it('ohne Amulett kosten dieselben 7 Tage 7 Freezes (hier zu wenig → Bruch)', () => {
    state.streak.lastDay = dayKey(-8);
    state.streak.count = 10;
    state.streak.freezes = 5;
    state.streak.weekendAmulet = false;
    assert.equal(registerStreak(), 1);
    assert.equal(state.streak.freezes, 5); // nichts verbraucht
  });

  it('setWeekendAmulet schaltet den Zustand um', () => {
    assert.equal(setWeekendAmulet(true), true);
    assert.equal(state.streak.weekendAmulet, true);
    assert.equal(setWeekendAmulet(false), false);
    assert.equal(state.streak.weekendAmulet, false);
  });
});

describe('Streak-Schutz — Reparatur', () => {
  beforeEach(resetState);

  it('canRepairStreak ist false ohne Bruch', () => {
    assert.equal(canRepairStreak(), false);
  });

  it('repariert einen frischen Bruch mit einem Token', () => {
    state.streak.lastBreak = { prevCount: 7, prevLastDay: dayKey(-3), brokenOn: todayKey() };
    state.streak.repairs = 1;
    assert.equal(canRepairStreak(), true);
    assert.equal(repairStreak(), true);
    assert.equal(state.streak.count, 8); // 7 + heutiger Tag
    assert.equal(state.streak.repairs, 0);
    assert.equal(state.streak.lastBreak, null);
  });

  it('keine Reparatur außerhalb des Zeitfensters', () => {
    state.streak.lastBreak = { prevCount: 7, prevLastDay: dayKey(-5), brokenOn: dayKey(-(REPAIR_WINDOW_DAYS + 1)) };
    state.streak.repairs = 1;
    assert.equal(canRepairStreak(), false);
    assert.equal(repairStreak(), false);
  });

  it('keine Reparatur ohne Token', () => {
    state.streak.lastBreak = { prevCount: 7, prevLastDay: dayKey(-3), brokenOn: todayKey() };
    state.streak.repairs = 0;
    assert.equal(canRepairStreak(), false);
  });
});

describe('getStreakProtection', () => {
  beforeEach(resetState);

  it('liefert vollständige Übersicht mit Defaults', () => {
    const p = getStreakProtection();
    assert.equal(p.count, 0);
    assert.equal(p.freezes, 0);
    assert.equal(p.maxFreezes, MAX_FREEZES);
    assert.equal(p.repairs, 0);
    assert.equal(p.maxRepairs, MAX_REPAIRS);
    assert.equal(p.weekendAmulet, false);
    assert.equal(p.canRepair, false);
    assert.equal(p.lastBreak, null);
  });

  it('spiegelt aktuellen Schutz-Zustand', () => {
    state.streak.freezes = 2;
    state.streak.repairs = 1;
    state.streak.weekendAmulet = true;
    const p = getStreakProtection();
    assert.equal(p.freezes, 2);
    assert.equal(p.repairs, 1);
    assert.equal(p.weekendAmulet, true);
  });
});

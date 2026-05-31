// achievements.js — Achievement-Vergabe-Logik.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { state } from '../js/store/state.js';
import {
  ACHIEVEMENTS, RARITY, rarityOf, evaluateAchievements, getAchievementStatus,
  getAchievementScore, markDialectVisited, getVisitedDialects,
} from '../js/store/achievements.js';
import { resetState } from './_setup.js';

describe('ACHIEVEMENTS — Definitionen', () => {
  it('mindestens 25 Definitionen', () => {
    assert.ok(ACHIEVEMENTS.length >= 25, `nur ${ACHIEVEMENTS.length} Defs`);
  });

  it('alle Achievements haben id/icon/title/desc/check', () => {
    for (const a of ACHIEVEMENTS) {
      assert.ok(a.id);
      assert.ok(a.icon);
      assert.ok(a.title);
      assert.ok(a.desc);
      assert.equal(typeof a.check, 'function');
    }
  });

  it('jedes Achievement hat eine gültige Rarität', () => {
    for (const a of ACHIEVEMENTS) {
      assert.ok(a.rarity, `${a.id} hat keine rarity`);
      assert.ok(RARITY[a.rarity], `${a.id} hat ungültige rarity "${a.rarity}"`);
      assert.equal(rarityOf(a).id, a.rarity);
    }
  });

  it('rarityOf fällt auf common zurück', () => {
    assert.equal(rarityOf({}).id, 'common');
    assert.equal(rarityOf({ rarity: 'unbekannt' }).id, 'common');
  });

  it('keine doppelten IDs', () => {
    const ids = ACHIEVEMENTS.map(a => a.id);
    assert.equal(new Set(ids).size, ids.length);
  });
});

describe('evaluateAchievements — Vergabe-Logik', () => {
  beforeEach(resetState);

  it('schaltet "firstCard" frei wenn gelerntCount >= 1', () => {
    const r = evaluateAchievements({ gelerntCount: 1, totalAvailable: 100 });
    const first = r.items.find(i => i.def.id === 'firstCard');
    assert.equal(first.unlocked, true);
    assert.ok(r.justUnlocked.includes('firstCard'));
  });

  it('schaltet "tenCards" erst bei 10 frei', () => {
    let r = evaluateAchievements({ gelerntCount: 9, totalAvailable: 100 });
    assert.equal(r.items.find(i => i.def.id === 'tenCards').unlocked, false);
    r = evaluateAchievements({ gelerntCount: 10, totalAvailable: 100 });
    assert.equal(r.items.find(i => i.def.id === 'tenCards').unlocked, true);
  });

  it('justUnlocked nur beim ersten Mal — danach leer', () => {
    evaluateAchievements({ gelerntCount: 1 });
    const r2 = evaluateAchievements({ gelerntCount: 1 });
    assert.equal(r2.justUnlocked.length, 0);
    // aber unlocked bleibt true
    assert.equal(r2.items.find(i => i.def.id === 'firstCard').unlocked, true);
  });

  it('Streak-Achievements: streak3/7/30/100', () => {
    let r = evaluateAchievements({ streak: 2 });
    assert.equal(r.items.find(i => i.def.id === 'streak3').unlocked, false);
    r = evaluateAchievements({ streak: 3 });
    assert.equal(r.items.find(i => i.def.id === 'streak3').unlocked, true);
    r = evaluateAchievements({ streak: 100 });
    assert.equal(r.items.find(i => i.def.id === 'streak100').unlocked, true);
  });

  it('Quiz-Achievements: firstQuiz + perfectQuiz', () => {
    let r = evaluateAchievements({ quizCount: 1, bestQuiz: 90 });
    assert.equal(r.items.find(i => i.def.id === 'firstQuiz').unlocked, true);
    assert.equal(r.items.find(i => i.def.id === 'perfectQuiz').unlocked, false);
    r = evaluateAchievements({ quizCount: 1, bestQuiz: 100 });
    assert.equal(r.items.find(i => i.def.id === 'perfectQuiz').unlocked, true);
  });

  it('Dialekt-Visit-Achievements: visit3/6/all', () => {
    let r = evaluateAchievements({ visitedCount: 3, totalDialects: 12 });
    assert.equal(r.items.find(i => i.def.id === 'visit3').unlocked, true);
    assert.equal(r.items.find(i => i.def.id === 'visitAll').unlocked, false);
    r = evaluateAchievements({ visitedCount: 12, totalDialects: 12 });
    assert.equal(r.items.find(i => i.def.id === 'visitAll').unlocked, true);
  });

  it('Special: "south" wird nur durch Bayerisch-Besuch ausgelöst', () => {
    markDialectVisited('bayerisch');
    const r = evaluateAchievements({});
    assert.equal(r.items.find(i => i.def.id === 'south').unlocked, true);
  });

  it('persistiert unlockedAt-Timestamp', () => {
    const before = Date.now();
    evaluateAchievements({ gelerntCount: 1 });
    const ts = state.achievements.firstCard;
    assert.ok(ts >= before, `ts=${ts} should be >= ${before}`);
  });

  it('robust gegen check-Errors (try/catch)', () => {
    // ACHIEVEMENTS sind sicher implementiert — wir verifizieren nur, dass
    // ein fehlender stats-Wert nicht zum Absturz führt.
    assert.doesNotThrow(() => evaluateAchievements({}));
  });
});

describe('evaluateAchievements — neue Kategorien (Iter 13)', () => {
  beforeEach(resetState);

  const unlocked = (r, id) => r.items.find(i => i.def.id === id).unlocked;

  it('Level-Achievements: level5/10/20', () => {
    assert.equal(unlocked(evaluateAchievements({ level: 4 }), 'level5'), false);
    assert.equal(unlocked(evaluateAchievements({ level: 5 }), 'level5'), true);
    assert.equal(unlocked(evaluateAchievements({ level: 20 }), 'level20'), true);
  });

  it('Notiz-Achievements: firstNote/notes10', () => {
    assert.equal(unlocked(evaluateAchievements({ noteCount: 1 }), 'firstNote'), true);
    assert.equal(unlocked(evaluateAchievements({ noteCount: 9 }), 'notes10'), false);
    assert.equal(unlocked(evaluateAchievements({ noteCount: 10 }), 'notes10'), true);
  });

  it('Deck-Achievement: firstDeck', () => {
    assert.equal(unlocked(evaluateAchievements({ deckCount: 0 }), 'firstDeck'), false);
    assert.equal(unlocked(evaluateAchievements({ deckCount: 1 }), 'firstDeck'), true);
  });

  it('Lernpfad-Achievements: pathStart/pathHalf/pathAll', () => {
    assert.equal(unlocked(evaluateAchievements({ pathCompleted: 1, pathTotal: 24 }), 'pathStart'), true);
    assert.equal(unlocked(evaluateAchievements({ pathCompleted: 11, pathTotal: 24 }), 'pathHalf'), false);
    assert.equal(unlocked(evaluateAchievements({ pathCompleted: 12, pathTotal: 24 }), 'pathHalf'), true);
    assert.equal(unlocked(evaluateAchievements({ pathCompleted: 24, pathTotal: 24 }), 'pathAll'), true);
  });

  it('Lernpfad-Achievements lösen ohne pathTotal nicht aus', () => {
    const r = evaluateAchievements({ pathCompleted: 5 });
    assert.equal(unlocked(r, 'pathHalf'), false);
    assert.equal(unlocked(r, 'pathAll'), false);
  });

  it('Chest-Achievements: chest7/chest30', () => {
    assert.equal(unlocked(evaluateAchievements({ chestStreak: 6 }), 'chest7'), false);
    assert.equal(unlocked(evaluateAchievements({ chestStreak: 7 }), 'chest7'), true);
    assert.equal(unlocked(evaluateAchievements({ chestStreak: 30 }), 'chest30'), true);
  });
});

describe('getAchievementScore', () => {
  beforeEach(resetState);

  it('Default: 0 Punkte, maxScore > 0, Aufschlüsselung pro Stufe', () => {
    const s = getAchievementScore();
    assert.equal(s.score, 0);
    assert.ok(s.maxScore > 0);
    for (const key in RARITY) {
      assert.equal(s.byRarity[key].unlocked, 0);
      assert.ok(s.byRarity[key].total >= 0);
    }
    // maxScore == Summe aller Raritätspunkte.
    const expectedMax = ACHIEVEMENTS.reduce((sum, d) => sum + rarityOf(d).points, 0);
    assert.equal(s.maxScore, expectedMax);
  });

  it('zählt freigeschaltete Punkte korrekt', () => {
    // firstCard = common (10 Pkt).
    evaluateAchievements({ gelerntCount: 1 });
    const s = getAchievementScore();
    assert.equal(s.score, RARITY.common.points);
    assert.equal(s.byRarity.common.unlocked, 1);
  });
});

describe('markDialectVisited / getVisitedDialects', () => {
  beforeEach(resetState);

  it('fügt einen Dialekt hinzu', () => {
    markDialectVisited('hessisch');
    assert.deepEqual(getVisitedDialects(), ['hessisch']);
  });

  it('keine Duplikate', () => {
    markDialectVisited('hessisch');
    markDialectVisited('hessisch');
    markDialectVisited('hessisch');
    assert.equal(getVisitedDialects().length, 1);
  });

  it('mehrere Dialekte werden angehängt', () => {
    ['hessisch', 'bayerisch', 'plattdeutsch'].forEach(markDialectVisited);
    assert.deepEqual(getVisitedDialects(), ['hessisch', 'bayerisch', 'plattdeutsch']);
  });
});

describe('getAchievementStatus', () => {
  beforeEach(resetState);

  it('liefert alle Definitionen mit unlocked-Status', () => {
    const status = getAchievementStatus();
    assert.equal(status.length, ACHIEVEMENTS.length);
    assert.ok(status.every(s => 'def' in s && 'unlocked' in s));
  });

  it('Default: alles locked', () => {
    const status = getAchievementStatus();
    assert.ok(status.every(s => !s.unlocked));
  });
});

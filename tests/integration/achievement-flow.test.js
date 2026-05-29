// Integration: Achievement-Vergabe durch Lern-Aktionen.
//
// Verifiziert, dass evaluateAchievements() korrekt auf reale Stats reagiert,
// die durch reviewCard/toggleFavorit/markDialectVisited entstehen.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { state } from '../../js/store/state.js';
import { reviewCard, RATING_EASY } from '../../js/store/srs.js';
import { toggleFavorit } from '../../js/store/favorites.js';
import { markDialectVisited, evaluateAchievements } from '../../js/store/achievements.js';
import { getStreak } from '../../js/store/streak.js';
import { getLernStats } from '../../js/store/learning.js';
import { resetState } from '../_setup.js';

function statsForEval(extra = {}) {
  const ls = getLernStats();
  return {
    gelerntCount: ls.gelernt,
    streak: getStreak(),
    quizCount: state.quizHistory.length,
    bestQuiz: state.quizHistory.reduce((m, h) => Math.max(m, Math.round((h.score / h.total) * 100)), 0),
    visitedCount: state.visited.length,
    totalDialects: 13,
    totalAvailable: 100,
    favCount: state.favoriten.length,
    ...extra,
  };
}

describe('Lern-Achievements werden durch reviewCard freigeschaltet', () => {
  beforeEach(resetState);

  it('firstCard nach erstem EASY-Review', () => {
    reviewCard('hessisch', 'h-001', RATING_EASY);
    const r = evaluateAchievements(statsForEval());
    assert.ok(r.justUnlocked.includes('firstCard'));
  });

  it('tenCards nach 10 EASY-Reviews', () => {
    for (let i = 0; i < 10; i++) {
      reviewCard('hessisch', `h-${String(i).padStart(3, '0')}`, RATING_EASY);
    }
    const r = evaluateAchievements(statsForEval());
    assert.ok(r.justUnlocked.includes('firstCard'));
    assert.ok(r.justUnlocked.includes('tenCards'));
  });

  it('Achievements bleiben freigeschaltet (zweiter Eval = leeres justUnlocked)', () => {
    reviewCard('hessisch', 'h-001', RATING_EASY);
    evaluateAchievements(statsForEval());
    const r2 = evaluateAchievements(statsForEval());
    assert.equal(r2.justUnlocked.length, 0);
    assert.ok(r2.items.find(i => i.def.id === 'firstCard').unlocked);
  });
});

describe('Favoriten-Achievements', () => {
  beforeEach(resetState);

  it('fav5 nach 5 toggleFavorit', () => {
    for (let i = 0; i < 5; i++) {
      toggleFavorit('hessisch', `h-${String(i).padStart(3, '0')}`);
    }
    const r = evaluateAchievements(statsForEval());
    assert.ok(r.justUnlocked.includes('fav5'));
  });

  it('toggleFavorit + entfernen reduziert favCount und sperrt nicht rückwirkend', () => {
    for (let i = 0; i < 5; i++) toggleFavorit('hessisch', `h-${i}`);
    evaluateAchievements(statsForEval());
    // Wieder entfernen
    for (let i = 0; i < 5; i++) toggleFavorit('hessisch', `h-${i}`);
    const r = evaluateAchievements(statsForEval());
    // Achievement bleibt freigeschaltet (einmal unlocked = bleibt)
    assert.ok(r.items.find(i => i.def.id === 'fav5').unlocked);
  });
});

describe('Visit-Achievements via markDialectVisited', () => {
  beforeEach(resetState);

  it('visit3 nach 3 markDialectVisited', () => {
    markDialectVisited('hessisch');
    markDialectVisited('bayerisch');
    markDialectVisited('plattdeutsch');
    const r = evaluateAchievements(statsForEval());
    assert.ok(r.justUnlocked.includes('visit3'));
  });

  it('Special-Achievements: south (Bayerisch), north (Plattdeutsch)', () => {
    markDialectVisited('bayerisch');
    markDialectVisited('plattdeutsch');
    const r = evaluateAchievements(statsForEval());
    assert.ok(r.justUnlocked.includes('south'));
    assert.ok(r.justUnlocked.includes('north'));
  });

  it('Special-Achievement swiss nur durch Schwizerdütsch', () => {
    markDialectVisited('bayerisch');
    let r = evaluateAchievements(statsForEval());
    assert.ok(!r.items.find(i => i.def.id === 'swiss').unlocked);

    markDialectVisited('schwizerduetsch');
    r = evaluateAchievements(statsForEval());
    assert.ok(r.items.find(i => i.def.id === 'swiss').unlocked);
  });
});

describe('Streak-Achievements', () => {
  beforeEach(resetState);

  it('streak3 nach 3-Tage-Streak (simuliert)', () => {
    state.streak.count = 3;
    const r = evaluateAchievements(statsForEval());
    assert.ok(r.justUnlocked.includes('streak3'));
  });

  it('streak100 nicht ausgelöst bei 99', () => {
    state.streak.count = 99;
    const r = evaluateAchievements(statsForEval());
    assert.ok(r.items.find(i => i.def.id === 'streak30').unlocked);
    assert.ok(!r.items.find(i => i.def.id === 'streak100').unlocked);
  });
});

describe('Quiz-Achievements', () => {
  beforeEach(resetState);

  it('perfectQuiz nach 100%-Quiz', () => {
    state.quizHistory.push({ date: Date.now(), score: 10, total: 10, source: 'all' });
    const r = evaluateAchievements(statsForEval());
    assert.ok(r.justUnlocked.includes('firstQuiz'));
    assert.ok(r.justUnlocked.includes('perfectQuiz'));
  });

  it('tenQuizzes nach 10 abgeschlossenen Quizzen', () => {
    for (let i = 0; i < 10; i++) {
      state.quizHistory.push({ date: i, score: 5, total: 10, source: 'all' });
    }
    const r = evaluateAchievements(statsForEval());
    assert.ok(r.justUnlocked.includes('tenQuizzes'));
  });
});

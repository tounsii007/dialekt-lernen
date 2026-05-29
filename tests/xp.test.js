// xp.js — XP & Level-System.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { state } from '../js/store/state.js';
import {
  xpForLevel, levelForXp, xpToNextLevel,
  XP, getXp, awardXp, getXpLog, LEVEL_TITLES, getLevelTitle,
} from '../js/store/xp.js';
import { resetState } from './_setup.js';

describe('xpForLevel / levelForXp — Level-Mathematik', () => {
  // Formel: xpForLevel(n) = 50 * n * (n+1)
  it('xpForLevel(1) = 100', () => assert.equal(xpForLevel(1), 100));
  it('xpForLevel(2) = 300', () => assert.equal(xpForLevel(2), 300));
  it('xpForLevel(3) = 600', () => assert.equal(xpForLevel(3), 600));
  it('xpForLevel(4) = 1000', () => assert.equal(xpForLevel(4), 1000));

  // levelForXp: liefert das aktuell ERREICHTE Level.
  // Bereiche: Lv1 = [0,100), Lv2 = [100,300), Lv3 = [300,600), Lv4 = [600,1000).
  it('levelForXp(0) = 1 (Start-Level)', () => assert.equal(levelForXp(0), 1));
  it('levelForXp(99) = 1', () => assert.equal(levelForXp(99), 1));
  it('levelForXp(100) = 2 (Schwelle für Level 2 erreicht)', () => assert.equal(levelForXp(100), 2));
  it('levelForXp(299) = 2', () => assert.equal(levelForXp(299), 2));
  it('levelForXp(300) = 3', () => assert.equal(levelForXp(300), 3));
  it('levelForXp(599) = 3', () => assert.equal(levelForXp(599), 3));
  it('levelForXp(600) = 4', () => assert.equal(levelForXp(600), 4));
});

describe('xpToNextLevel — Progress-Berechnung', () => {
  it('liefert level / current / needed / progress', () => {
    const p = xpToNextLevel(150);
    assert.equal(typeof p.level, 'number');
    assert.equal(typeof p.current, 'number');
    assert.equal(typeof p.needed, 'number');
    assert.equal(typeof p.progress, 'number');
  });

  it('progress immer in [0, 1]', () => {
    for (const xp of [0, 50, 100, 200, 300, 500, 1000, 5000]) {
      const p = xpToNextLevel(xp);
      assert.ok(p.progress >= 0 && p.progress <= 1, `xp=${xp} → progress=${p.progress}`);
    }
  });

  it('Levelanfang (genau auf Schwelle) → current 0, progress 0', () => {
    for (const xp of [0, 100, 300, 600, 1000]) {
      const p = xpToNextLevel(xp);
      assert.equal(p.current, 0, `xp=${xp}`);
      assert.equal(p.progress, 0, `xp=${xp}`);
    }
  });

  it('Levelmitte → progress 0.5', () => {
    assert.equal(xpToNextLevel(50).progress, 0.5);   // Lv1 [0,100)
    assert.equal(xpToNextLevel(200).progress, 0.5);  // Lv2 [100,300)
  });

  it('current liegt stets in [0, needed]', () => {
    for (const xp of [25, 150, 450, 800]) {
      const p = xpToNextLevel(xp);
      assert.ok(p.current >= 0 && p.current <= p.needed, `xp=${xp}: current=${p.current}, needed=${p.needed}`);
    }
  });

  it('level deckt sich mit levelForXp', () => {
    for (const xp of [0, 100, 250, 600, 2000]) {
      assert.equal(xpToNextLevel(xp).level, levelForXp(xp), `xp=${xp}`);
    }
  });
});

describe('XP-Konstanten', () => {
  it('alle Aktionen haben positive Werte', () => {
    for (const [k, v] of Object.entries(XP)) {
      assert.ok(v > 0, `${k} sollte > 0 sein, war ${v}`);
    }
  });

  it('quizPerfect ist größer als quizCorrect', () => {
    assert.ok(XP.quizPerfect > XP.quizCorrect);
  });

  it('achievement ist die höchste Einzelvergabe', () => {
    assert.equal(Math.max(...Object.values(XP)), XP.achievement);
  });
});

describe('awardXp / getXp', () => {
  beforeEach(resetState);

  it('vergibt XP und aktualisiert total', () => {
    awardXp(50, 'test');
    assert.equal(getXp(), 50);
  });

  it('kumuliert XP über mehrere Aufrufe', () => {
    awardXp(20, 'a');
    awardXp(30, 'b');
    awardXp(10, 'c');
    assert.equal(getXp(), 60);
  });

  it('Log enthält letzte Einträge (max 50)', () => {
    for (let i = 0; i < 60; i++) awardXp(1, 'spam');
    assert.equal(state.xp.log.length, 50);
  });

  it('Log ist neueste-zuerst', () => {
    awardXp(10, 'erst');
    awardXp(20, 'dann');
    assert.equal(state.xp.log[0].reason, 'dann');
  });

  it('liefert levelUp=true beim Level-Wechsel', () => {
    // Schwelle zu Level 2 ist 100 XP (xpForLevel(1)).
    const r1 = awardXp(99, 'a');
    assert.equal(r1.levelUp, false);
    const r2 = awardXp(1, 'b');
    assert.equal(r2.levelUp, true);
    assert.equal(r2.level, 2);
  });
});

describe('LEVEL_TITLES / getLevelTitle', () => {
  it('Level 1 → Lehrling', () => assert.equal(getLevelTitle(1), 'Lehrling'));
  it('Level 5 → Sprachforscher', () => assert.equal(getLevelTitle(5), 'Sprachforscher'));
  it('Level >= 10 → Meister der Mundarten', () => {
    assert.equal(getLevelTitle(10), 'Meister der Mundarten');
    assert.equal(getLevelTitle(99), 'Meister der Mundarten');
  });
});

describe('getXpLog', () => {
  beforeEach(resetState);

  it('Default-Limit 10', () => {
    for (let i = 0; i < 15; i++) awardXp(1, 'x');
    assert.equal(getXpLog().length, 10);
  });

  it('Custom-Limit', () => {
    for (let i = 0; i < 15; i++) awardXp(1, 'x');
    assert.equal(getXpLog(5).length, 5);
  });
});

// dialect-progress.js — abgeleiteter Pro-Dialekt-Fortschritt.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { getDialekt } from '../data/dialekte.js';
import { setLernstand, STATUS_MEDIUM, STATUS_LEARNED } from '../js/store/learning.js';
import { getDialectProgress } from '../js/util/dialect-progress.js';
import { resetState } from './_setup.js';

const hessisch = getDialekt('hessisch');

describe('getDialectProgress', () => {
  beforeEach(resetState);

  it('frischer Stand: 0 gelernt, Level 1, 0 XP, 0%', () => {
    const p = getDialectProgress(hessisch);
    assert.equal(p.learned, 0);
    assert.equal(p.started, 0);
    assert.equal(p.level, 1);
    assert.equal(p.xp, 0);
    assert.equal(p.pct, 0);
    assert.equal(p.total, hessisch.ausdruecke.length);
  });

  it('10 gelernte Karten → Level 2, 100 XP', () => {
    hessisch.ausdruecke.slice(0, 10).forEach(a =>
      setLernstand('hessisch', a.id, STATUS_LEARNED));
    const p = getDialectProgress(hessisch);
    assert.equal(p.learned, 10);
    assert.equal(p.level, 2);     // 1 + floor(10/10)
    assert.equal(p.xp, 100);      // 10 * 10
  });

  it('angefangene Karten zählen als "started" und geben je +5 XP', () => {
    hessisch.ausdruecke.slice(0, 3).forEach(a =>
      setLernstand('hessisch', a.id, STATUS_LEARNED));   // 3 * 10 = 30
    hessisch.ausdruecke.slice(3, 5).forEach(a =>
      setLernstand('hessisch', a.id, STATUS_MEDIUM));     // 2 * 5 = 10
    const p = getDialectProgress(hessisch);
    assert.equal(p.learned, 3);
    assert.equal(p.started, 2);
    assert.equal(p.xp, 40);
    assert.equal(p.level, 1);     // floor(3/10) = 0
  });

  it('Prozent rundet learned/total korrekt', () => {
    const n = hessisch.ausdruecke.length;
    hessisch.ausdruecke.forEach(a => setLernstand('hessisch', a.id, STATUS_LEARNED));
    const p = getDialectProgress(hessisch);
    assert.equal(p.learned, n);
    assert.equal(p.pct, 100);
  });

  it('robust bei leerem/ungültigem Dialekt', () => {
    assert.doesNotThrow(() => getDialectProgress({ id: 'x', ausdruecke: [] }));
    const p = getDialectProgress({ id: 'x', ausdruecke: [] });
    assert.deepEqual(p, { total: 0, learned: 0, started: 0, pct: 0, xp: 0, level: 1 });
  });
});

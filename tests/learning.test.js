// learning.js — Lernfortschritt pro Ausdruck (mit SRS).

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { state } from '../js/store/state.js';
import {
  setLernstand, getLernstand, getLernStats,
  STATUS_UNKNOWN, STATUS_HARD, STATUS_MEDIUM, STATUS_LEARNED,
} from '../js/store/learning.js';
import { resetState } from './_setup.js';

describe('STATUS-Konstanten', () => {
  it('UNKNOWN=0, HARD=1, MEDIUM=2, LEARNED=3', () => {
    assert.equal(STATUS_UNKNOWN, 0);
    assert.equal(STATUS_HARD, 1);
    assert.equal(STATUS_MEDIUM, 2);
    assert.equal(STATUS_LEARNED, 3);
  });
});

describe('setLernstand / getLernstand', () => {
  beforeEach(resetState);

  it('Default: STATUS_UNKNOWN', () => {
    assert.equal(getLernstand('hessisch', 'h-001'), STATUS_UNKNOWN);
  });

  it('STATUS_LEARNED setzt Stand auf 3', () => {
    setLernstand('hessisch', 'h-001', STATUS_LEARNED);
    assert.equal(getLernstand('hessisch', 'h-001'), STATUS_LEARNED);
  });

  it('STATUS_MEDIUM persistiert als 2', () => {
    setLernstand('bayerisch', 'by-005', STATUS_MEDIUM);
    assert.equal(getLernstand('bayerisch', 'by-005'), STATUS_MEDIUM);
  });

  it('STATUS_UNKNOWN löscht den Eintrag', () => {
    setLernstand('hessisch', 'h-001', STATUS_LEARNED);
    assert.equal(getLernstand('hessisch', 'h-001'), STATUS_LEARNED);
    setLernstand('hessisch', 'h-001', STATUS_UNKNOWN);
    assert.equal(getLernstand('hessisch', 'h-001'), STATUS_UNKNOWN);
    assert.equal(state.gelernt['hessisch.h-001'], undefined);
  });

  it('triggert SRS-Review (state.gelernt enthält Scheduling-Felder)', () => {
    setLernstand('hessisch', 'h-001', STATUS_LEARNED);
    const rec = state.gelernt['hessisch.h-001'];
    // Scheduler-agnostisch: due + interval sind immer da, plus algorithmus-
    // spezifische Felder (FSRS: stability/difficulty, SM-2: ef).
    assert.ok(rec.due);
    assert.ok(rec.interval !== undefined);
    assert.ok(rec.stability !== undefined || rec.ef !== undefined);
  });
});

describe('getLernStats', () => {
  beforeEach(resetState);

  it('alles 0 bei leerem State', () => {
    const s = getLernStats();
    assert.deepEqual(s, { gelernt: 0, inArbeit: 0, gesamt: 0 });
  });

  it('zählt nach Status', () => {
    setLernstand('hessisch', 'h-001', STATUS_LEARNED);
    setLernstand('hessisch', 'h-002', STATUS_LEARNED);
    setLernstand('hessisch', 'h-003', STATUS_MEDIUM);
    setLernstand('hessisch', 'h-004', STATUS_HARD);
    const s = getLernStats();
    assert.equal(s.gelernt, 2);
    assert.equal(s.inArbeit, 2);
    assert.equal(s.gesamt, 4);
  });

  it('ignoriert korrupte Einträge (null/String/Array) ohne TypeError', () => {
    setLernstand('hessisch', 'h-001', STATUS_LEARNED);
    // Simuliert manipuliertes Backup / direkt editiertes localStorage.
    state.gelernt['kaputt.null'] = null;
    state.gelernt['kaputt.str']  = 'broken';
    state.gelernt['kaputt.arr']  = [1, 2, 3];
    let s;
    assert.doesNotThrow(() => { s = getLernStats(); });
    assert.equal(s.gelernt, 1);
    assert.equal(s.inArbeit, 0);
    assert.equal(s.gesamt, 1); // nur der echte Eintrag zählt
  });
});

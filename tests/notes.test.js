// notes.js — Persönliche Notizen pro Ausdruck.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { state } from '../js/store/state.js';
import { getNote, setNote, countNotes, getAllNotes } from '../js/store/notes.js';
import { resetState } from './_setup.js';

describe('setNote / getNote', () => {
  beforeEach(resetState);

  it('Default: leerer String', () => {
    assert.equal(getNote('hessisch', 'h-001'), '');
  });

  it('speichert + liefert Notiz', () => {
    setNote('hessisch', 'h-001', 'Wichtiger Ausdruck!');
    assert.equal(getNote('hessisch', 'h-001'), 'Wichtiger Ausdruck!');
  });

  it('trimmt Whitespace', () => {
    setNote('hessisch', 'h-001', '   notiz   ');
    assert.equal(getNote('hessisch', 'h-001'), 'notiz');
  });

  it('kürzt auf 280 Zeichen', () => {
    const long = 'x'.repeat(500);
    setNote('hessisch', 'h-001', long);
    assert.equal(getNote('hessisch', 'h-001').length, 280);
  });

  it('löscht bei leerem String', () => {
    setNote('hessisch', 'h-001', 'erst da');
    setNote('hessisch', 'h-001', '');
    assert.equal(getNote('hessisch', 'h-001'), '');
    assert.equal(state.notes['hessisch.h-001'], undefined);
  });

  it('löscht bei null/undefined', () => {
    setNote('hessisch', 'h-001', 'erst da');
    setNote('hessisch', 'h-001', null);
    assert.equal(getNote('hessisch', 'h-001'), '');
  });

  it('mehrere Notizen parallel', () => {
    setNote('hessisch', 'h-001', 'a');
    setNote('bayerisch', 'by-005', 'b');
    setNote('plattdeutsch', 'p-001', 'c');
    assert.equal(getNote('hessisch', 'h-001'), 'a');
    assert.equal(getNote('bayerisch', 'by-005'), 'b');
    assert.equal(getNote('plattdeutsch', 'p-001'), 'c');
  });
});

describe('countNotes', () => {
  beforeEach(resetState);

  it('0 bei keinem Eintrag', () => assert.equal(countNotes(), 0));

  it('zählt korrekt', () => {
    setNote('a', 'b', 'x');
    setNote('c', 'd', 'y');
    assert.equal(countNotes(), 2);
  });

  it('Löschen reduziert count', () => {
    setNote('a', 'b', 'x');
    setNote('c', 'd', 'y');
    setNote('a', 'b', '');
    assert.equal(countNotes(), 1);
  });
});

describe('getAllNotes', () => {
  beforeEach(resetState);

  it('liefert Kopie aller Notizen', () => {
    setNote('a', 'b', 'note1');
    setNote('c', 'd', 'note2');
    const all = getAllNotes();
    assert.equal(all['a.b'], 'note1');
    assert.equal(all['c.d'], 'note2');
  });

  it('Mutation des Returnvalue beeinflusst State nicht', () => {
    setNote('a', 'b', 'orig');
    const all = getAllNotes();
    all['a.b'] = 'tampered';
    assert.equal(getNote('a', 'b'), 'orig');
  });
});

// text.js — normalize() für diakritisch-tolerante Suche.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { normalize } from '../js/util/text.js';

describe('normalize', () => {
  it('lowercase', () => {
    assert.equal(normalize('HELLO'), 'hello');
    assert.equal(normalize('Hallo Welt'), 'hallo welt');
  });

  it('Umlaute werden zu Basis-Vokalen', () => {
    assert.equal(normalize('Ä'), 'a');
    assert.equal(normalize('ö'), 'o');
    assert.equal(normalize('über'), 'uber');
    assert.equal(normalize('Größe'), 'grosse');
  });

  it('ß → ss', () => {
    assert.equal(normalize('Straße'), 'strasse');
    assert.equal(normalize('weiß'), 'weiss');
  });

  it('Französische Akzente', () => {
    assert.equal(normalize('café'), 'cafe');
    assert.equal(normalize('Élève'), 'eleve');
  });

  it('idempotent', () => {
    const s = 'Ein Größeres Wörterbuch';
    assert.equal(normalize(normalize(s)), normalize(s));
  });

  it('robust bei null/undefined', () => {
    assert.equal(normalize(null), 'null');
    assert.equal(normalize(undefined), 'undefined');
    assert.equal(normalize(''), '');
  });

  it('konvertiert Zahlen zu String', () => {
    assert.equal(normalize(42), '42');
  });

  it('typografische Sonderzeichen bleiben', () => {
    assert.equal(normalize('„Hallo"'), '„hallo"');
  });
});

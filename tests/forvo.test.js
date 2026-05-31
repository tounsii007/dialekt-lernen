// Tests für die Forvo-Link-Logik (rein, kein DOM/Netz).

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { forvoUrl, pickForvoWords } from '../js/util/forvo.js';

describe('forvoUrl', () => {
  it('baut eine Such-URL und enkodiert', () => {
    assert.equal(forvoUrl('Mädsche'), 'https://forvo.com/search/M%C3%A4dsche/');
    assert.equal(forvoUrl('Haus'), 'https://forvo.com/search/Haus/');
  });
  it('trimmt Whitespace', () => {
    assert.equal(forvoUrl('  Gass  '), 'https://forvo.com/search/Gass/');
  });
  it('enkodiert Sonderzeichen/Spaces', () => {
    assert.equal(forvoUrl('ei gude'), 'https://forvo.com/search/ei%20gude/');
  });
  it('leere/ungültige Eingabe → ""', () => {
    assert.equal(forvoUrl(''), '');
    assert.equal(forvoUrl('   '), '');
    assert.equal(forvoUrl(null), '');
    assert.equal(forvoUrl(undefined), '');
  });
});

describe('pickForvoWords', () => {
  const pool = [
    { ausdruck: 'Gude' },
    { ausdruck: 'ei gude wie' },   // mehrteilig → raus
    { ausdruck: 'Gude' },          // Dublette → raus
    { ausdruck: 'gude' },          // Dublette (case) → raus
    { ausdruck: 'Schwätzer' },
    { ausdruck: '  ' },            // leer → raus
    { ausdruck: 'Babbeln' },
  ];

  it('nimmt nur Einzelwörter, dedupliziert case-insensitiv', () => {
    const out = pickForvoWords(pool, 12);
    assert.deepEqual(out.map((e) => e.ausdruck), ['Gude', 'Schwätzer', 'Babbeln']);
  });
  it('respektiert count', () => {
    assert.equal(pickForvoWords(pool, 2).length, 2);
    assert.equal(pickForvoWords(pool, 1)[0].ausdruck, 'Gude');
  });
  it('count <= 0 → []', () => {
    assert.deepEqual(pickForvoWords(pool, 0), []);
    assert.deepEqual(pickForvoWords(pool, -3), []);
  });
  it('floored fraktionalen count', () => {
    assert.equal(pickForvoWords(pool, 2.9).length, 2);
  });
  it('keine Liste → []', () => {
    assert.deepEqual(pickForvoWords(null, 5), []);
    assert.deepEqual(pickForvoWords(undefined, 5), []);
  });
  it('ignoriert kaputte Einträge', () => {
    const out = pickForvoWords([null, {}, { ausdruck: 'Haus' }], 12);
    assert.deepEqual(out.map((e) => e.ausdruck), ['Haus']);
  });
  it('behält das Original-Objekt (Referenz)', () => {
    const a = { ausdruck: 'Gude', id: 1 };
    assert.equal(pickForvoWords([a], 12)[0], a);
  });
});

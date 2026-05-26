// Fuzzy-Search-Index — Tests.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { buildIndex, searchIndex } from '../js/util/fuzzy.js';

const records = [
  { id: 1, ausdruck: 'Bassd scho', hochdeutsch: 'Passt schon' },
  { id: 2, ausdruck: 'Servus', hochdeutsch: 'Hallo' },
  { id: 3, ausdruck: 'Moin', hochdeutsch: 'Hallo' },
  { id: 4, ausdruck: 'Grüezi', hochdeutsch: 'Guten Tag' },
  { id: 5, ausdruck: 'Schietwedder', hochdeutsch: 'Mistwetter' },
];

const fields = [
  { key: 'ausdruck', weight: 2 },
  { key: 'hochdeutsch', weight: 1 },
];

describe('searchIndex — Exakte und unscharfe Matches', () => {
  const idx = buildIndex(records, fields);

  it('exakter Match liefert höchsten Score', () => {
    const r = searchIndex(idx, 'Servus');
    assert.ok(r.length > 0);
    assert.equal(r[0].rec.id, 2);
  });

  it('Präfix-Match funktioniert', () => {
    const r = searchIndex(idx, 'Bas');
    assert.equal(r[0].rec.id, 1, 'Bas sollte Bassd scho zuerst finden');
  });

  it('Tippfehler-tolerantes Match (Levenshtein-Fallback)', () => {
    const r = searchIndex(idx, 'Servvus'); // 1 char-extra
    assert.ok(r.some((x) => x.rec.id === 2), 'Tippfehler in Servus sollte trotzdem matchen');
  });

  it('Match in Bedeutungs-Feld funktioniert (lowere Gewichtung)', () => {
    const r = searchIndex(idx, 'Mistwetter');
    assert.equal(r[0].rec.id, 5);
  });

  it('Empty Query liefert leeres Array', () => {
    assert.deepEqual(searchIndex(idx, ''), []);
    assert.deepEqual(searchIndex(idx, '   '), []);
  });

  it('Limit wird respektiert', () => {
    const r = searchIndex(idx, 'Hallo', { limit: 1 });
    assert.equal(r.length, 1);
  });

  it('Threshold filtert irrelevante Treffer', () => {
    const r = searchIndex(idx, 'xzy', { threshold: 0.5 });
    assert.equal(r.length, 0);
  });
});

describe('searchIndex — Mehrere Felder-Gewichtungen', () => {
  it('höher gewichtetes Feld dominiert das Ranking', () => {
    const recs = [
      { id: 'A', ausdruck: 'Hallo', hochdeutsch: 'irrelevant' },
      { id: 'B', ausdruck: 'irrelevant', hochdeutsch: 'Hallo' },
    ];
    const idx = buildIndex(recs, [
      { key: 'ausdruck', weight: 5 },
      { key: 'hochdeutsch', weight: 1 },
    ]);
    const r = searchIndex(idx, 'Hallo');
    assert.equal(r[0].rec.id, 'A', 'Match im stärker gewichteten Feld muss höher ranken');
  });
});

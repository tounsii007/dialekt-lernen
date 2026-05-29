// comparison.js — Dialekt-Vergleich nach gleicher Bedeutung.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { buildComparison, filterByKategorie } from '../js/util/comparison.js';

describe('buildComparison', () => {
  it('liefert Gruppen mit head/items/kategorie', () => {
    const groups = buildComparison({ minSize: 2 });
    assert.ok(groups.length > 0);
    for (const g of groups.slice(0, 5)) {
      assert.ok(typeof g.head === 'string');
      assert.ok(Array.isArray(g.items));
      assert.ok(typeof g.kategorie === 'string');
      assert.ok(g.items.length >= 2);
    }
  });

  it('default minSize=2 — alle Gruppen ≥2 Dialekte', () => {
    const groups = buildComparison();
    assert.ok(groups.every(g => g.items.length >= 2));
  });

  it('mit minSize=5 nur größere Gruppen', () => {
    const groups = buildComparison({ minSize: 5 });
    assert.ok(groups.every(g => g.items.length >= 5));
  });

  it('sortiert nach Größe (descending)', () => {
    const groups = buildComparison({ minSize: 3 });
    for (let i = 1; i < groups.length; i++) {
      assert.ok(groups[i - 1].items.length >= groups[i].items.length);
    }
  });

  it('je Gruppe nur 1 Ausdruck pro Dialekt', () => {
    const groups = buildComparison({ minSize: 2 });
    for (const g of groups.slice(0, 20)) {
      const dialektIds = g.items.map(i => i.dialektId);
      assert.equal(new Set(dialektIds).size, dialektIds.length);
    }
  });
});

describe('filterByKategorie', () => {
  const groups = buildComparison({ minSize: 2 });

  it('"all" liefert alle Gruppen', () => {
    assert.equal(filterByKategorie(groups, 'all').length, groups.length);
  });

  it('null/undefined liefert alle Gruppen', () => {
    assert.equal(filterByKategorie(groups, null).length, groups.length);
    assert.equal(filterByKategorie(groups, undefined).length, groups.length);
  });

  it('Filter nach spezifischer Kategorie', () => {
    const greetings = filterByKategorie(groups, 'begruessung');
    assert.ok(greetings.every(g => g.kategorie === 'begruessung'));
  });
});

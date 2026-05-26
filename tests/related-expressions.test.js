// Related-Expressions Tests

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { findRelatedExpressions, findSameCategoryExpressions } from '../js/util/related-expressions.js';

describe('findRelatedExpressions', () => {
  it('findet semantisch verwandte Ausdrücke', () => {
    const entry = { dialektId: 'bayerisch', id: 'by-001', hochdeutsch: 'Hallo', kategorie: 'begruessung' };
    const result = findRelatedExpressions(entry, 5);
    assert.ok(Array.isArray(result));
    assert.ok(result.length <= 5);
    // jede Ergebnis hat entry + score + reason
    for (const r of result) {
      assert.ok(r.entry);
      assert.equal(typeof r.score, 'number');
      assert.equal(typeof r.reason, 'string');
    }
  });

  it('excludes the entry itself', () => {
    const entry = { dialektId: 'bayerisch', id: 'by-001', hochdeutsch: 'Hallo' };
    const result = findRelatedExpressions(entry, 10);
    for (const r of result) {
      const sameId = r.entry.dialektId === entry.dialektId && r.entry.id === entry.id;
      assert.equal(sameId, false);
    }
  });

  it('leere hochdeutsch → leeres Ergebnis', () => {
    const result = findRelatedExpressions({ dialektId: 'x', id: 'y', hochdeutsch: '' }, 5);
    assert.deepEqual(result, []);
  });
});

describe('findSameCategoryExpressions', () => {
  it('findet Ausdrücke gleicher Kategorie', () => {
    const entry = { dialektId: 'bayerisch', id: 'by-001', kategorie: 'begruessung' };
    const result = findSameCategoryExpressions(entry, 5);
    assert.ok(Array.isArray(result));
    for (const r of result) {
      assert.equal(r.kategorie, 'begruessung');
    }
  });
});

// Tests für die Minimal-Paar-Logik (rein, kein DOM/Audio).

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  phoneticKey,
  phoneticDistance,
  findConfusable,
  buildPairDrills,
  gradePair,
  summarizePairs,
} from '../js/util/minimal-pairs.js';

// Deterministischer RNG (mulberry32) für reproduzierbare Mischungen.
function rngFrom(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

describe('phoneticKey', () => {
  it('normalisiert + faltet Laute', () => {
    // w→v, doppelte Buchstaben kollabieren
    assert.equal(phoneticKey('Wasser'), 'vaser');
    // ß→ss→s, v→f
    assert.equal(phoneticKey('Vater'), 'fater');
  });
  it('robust gegen leer/undefined', () => {
    assert.equal(phoneticKey(''), '');
    assert.equal(phoneticKey(undefined), '');
  });
});

describe('phoneticDistance', () => {
  it('0 wenn lautlich identisch', () => {
    assert.equal(phoneticDistance('Vater', 'Fater'), 0);
    assert.equal(phoneticDistance('Wasser', 'Waser'), 0);
  });
  it('> 0 bei echtem Unterschied', () => {
    assert.ok(phoneticDistance('Haus', 'Maus') >= 1);
  });
  it('symmetrisch', () => {
    assert.equal(phoneticDistance('Gass', 'Gasse'), phoneticDistance('Gasse', 'Gass'));
  });
});

describe('findConfusable', () => {
  const pool = [
    { id: 1, ausdruck: 'Haus', dialektId: 'a' },
    { id: 2, ausdruck: 'Maus', dialektId: 'a' },   // 1 Laut entfernt
    { id: 3, ausdruck: 'Kartoffelsalat', dialektId: 'a' },
    { id: 4, ausdruck: 'Maus', dialektId: 'b' },   // anderer Dialekt → raus
  ];

  it('findet den nächsten verwechselbaren Partner im selben Dialekt', () => {
    const m = findConfusable(pool[0], pool);
    assert.ok(m);
    assert.equal(m.item.id, 2);
    assert.equal(m.distance, 1);
  });
  it('ignoriert andere Dialekte', () => {
    const target = { id: 1, ausdruck: 'Haus', dialektId: 'a' };
    const onlyOtherDialect = [{ id: 9, ausdruck: 'Maus', dialektId: 'b' }];
    assert.equal(findConfusable(target, onlyOtherDialect), null);
  });
  it('ignoriert lautlich identische (Distanz 0)', () => {
    const target = { id: 1, ausdruck: 'Vater', dialektId: 'a' };
    const p = [target, { id: 2, ausdruck: 'Fater', dialektId: 'a' }];
    assert.equal(findConfusable(target, p), null);
  });
  it('respektiert maxDistance', () => {
    const target = { id: 1, ausdruck: 'Haus', dialektId: 'a' };
    const p = [target, { id: 2, ausdruck: 'Kartoffel', dialektId: 'a' }];
    assert.equal(findConfusable(target, p, { maxDistance: 2 }), null);
  });
  it('schließt sich selbst aus (per Referenz und per id)', () => {
    const target = { id: 1, ausdruck: 'Haus', dialektId: 'a' };
    assert.equal(findConfusable(target, [target]), null);
    assert.equal(findConfusable(target, [{ id: 1, ausdruck: 'Haus', dialektId: 'a' }]), null);
  });
  it('null bei zu kurzem Schlüssel oder kaputter Eingabe', () => {
    assert.equal(findConfusable({ ausdruck: 'a' }, [{ ausdruck: 'ab' }]), null);
    assert.equal(findConfusable(null, []), null);
    assert.equal(findConfusable({ ausdruck: 'Haus' }, null), null);
  });
});

describe('buildPairDrills', () => {
  const pool = [
    { id: 1, ausdruck: 'Haus', dialektId: 'a' },
    { id: 2, ausdruck: 'Maus', dialektId: 'a' },
    { id: 3, ausdruck: 'Laus', dialektId: 'a' },
    { id: 4, ausdruck: 'Mann', dialektId: 'a' },
    { id: 5, ausdruck: 'Wann', dialektId: 'a' },
    { id: 6, ausdruck: 'Kartoffelsalat', dialektId: 'a' },  // ohne Partner
  ];

  it('liefert höchstens count Drills', () => {
    assert.ok(buildPairDrills(pool, 2, rngFrom(1)).length <= 2);
  });
  it('count <= 0 → []', () => {
    assert.deepEqual(buildPairDrills(pool, 0, rngFrom(1)), []);
    assert.deepEqual(buildPairDrills(pool, -2, rngFrom(1)), []);
  });
  it('keine Liste → []', () => {
    assert.deepEqual(buildPairDrills(null, 3), []);
  });
  it('jeder Drill hat 2 Optionen und answerId == target', () => {
    const drills = buildPairDrills(pool, 3, rngFrom(7));
    for (const d of drills) {
      assert.equal(d.options.length, 2);
      assert.equal(d.answerId, d.target.id);
      assert.ok(d.options.some((o) => o.id === d.answerId));
      assert.ok(d.options.some((o) => o.id === d.confusable.id));
      assert.ok(d.distance >= 1);
    }
  });
  it('verwendet jeden Ausdruck höchstens einmal', () => {
    const drills = buildPairDrills(pool, 3, rngFrom(3));
    const ids = drills.flatMap((d) => [d.target.id, d.confusable.id]);
    assert.equal(new Set(ids).size, ids.length);
  });
  it('mutiert das Original nicht', () => {
    const copy = pool.slice();
    buildPairDrills(pool, 3, rngFrom(11));
    assert.deepEqual(pool, copy);
  });
  it('gleicher Seed → gleiches Ergebnis', () => {
    const a = buildPairDrills(pool, 3, rngFrom(42)).map((d) => d.answerId);
    const b = buildPairDrills(pool, 3, rngFrom(42)).map((d) => d.answerId);
    assert.deepEqual(a, b);
  });
});

describe('gradePair', () => {
  const drill = { answerId: 7, target: { id: 7 }, confusable: { id: 8 } };
  it('richtig wenn chosenId == answerId', () => {
    assert.deepEqual(gradePair(drill, 7), { correct: true, answerId: 7 });
  });
  it('falsch sonst', () => {
    assert.deepEqual(gradePair(drill, 8), { correct: false, answerId: 7 });
  });
  it('kein Drill → correct false', () => {
    assert.deepEqual(gradePair(null, 7), { correct: false, answerId: null });
  });
});

describe('summarizePairs', () => {
  it('leer → Nullen', () => {
    assert.deepEqual(summarizePairs([]), { count: 0, correct: 0, accuracyPct: 0 });
    assert.deepEqual(summarizePairs(null), { count: 0, correct: 0, accuracyPct: 0 });
  });
  it('zählt korrekte und rundet Prozent', () => {
    const s = summarizePairs([{ correct: true }, { correct: false }, { correct: true }]);
    assert.equal(s.count, 3);
    assert.equal(s.correct, 2);
    assert.equal(s.accuracyPct, 67);
  });
  it('robust gegen kaputte Einträge', () => {
    const s = summarizePairs([null, {}, { correct: true }]);
    assert.equal(s.count, 3);
    assert.equal(s.correct, 1);
  });
});

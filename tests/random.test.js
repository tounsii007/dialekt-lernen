// random.js — Shuffle + Seeded-RNG.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { shuffle, seededRandom, pickSeeded } from '../js/util/random.js';

describe('shuffle', () => {
  it('liefert eine Permutation derselben Länge', () => {
    const arr = [1, 2, 3, 4, 5];
    const s = shuffle(arr);
    assert.equal(s.length, arr.length);
    assert.deepEqual(s.slice().sort(), arr.slice().sort());
  });

  it('mutiert das Original nicht', () => {
    const arr = [1, 2, 3];
    const orig = arr.slice();
    shuffle(arr);
    assert.deepEqual(arr, orig);
  });

  it('deterministisch mit Seeded-RNG', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8];
    const rng1 = seededRandom(42);
    const rng2 = seededRandom(42);
    assert.deepEqual(shuffle(arr, rng1), shuffle(arr, rng2));
  });

  it('verschiedene Seeds liefern verschiedene Ergebnisse', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8];
    const a = shuffle(arr, seededRandom(1));
    const b = shuffle(arr, seededRandom(2));
    assert.notDeepEqual(a, b);
  });

  it('leeres Array bleibt leer', () => {
    assert.deepEqual(shuffle([]), []);
  });

  it('Einzelement bleibt unverändert', () => {
    assert.deepEqual(shuffle([42]), [42]);
  });
});

describe('seededRandom', () => {
  it('liefert Werte in [0, 1)', () => {
    const rng = seededRandom(123);
    for (let i = 0; i < 100; i++) {
      const v = rng();
      assert.ok(v >= 0 && v < 1, `v=${v} außerhalb [0,1)`);
    }
  });

  it('deterministisch: gleiche Seeds → gleiche Sequenzen', () => {
    const a = seededRandom(99);
    const b = seededRandom(99);
    for (let i = 0; i < 20; i++) {
      assert.equal(a(), b());
    }
  });

  it('verschiedene Seeds → unterschiedliche Sequenzen', () => {
    const a = seededRandom(1);
    const b = seededRandom(2);
    assert.notEqual(a(), b());
  });
});

describe('pickSeeded', () => {
  it('liefert ein Element aus dem Array', () => {
    const arr = ['a', 'b', 'c', 'd'];
    const v = pickSeeded(arr, 42);
    assert.ok(arr.includes(v));
  });

  it('deterministisch', () => {
    const arr = ['a', 'b', 'c', 'd'];
    assert.equal(pickSeeded(arr, 42), pickSeeded(arr, 42));
  });

  it('null bei leerem Array', () => {
    assert.equal(pickSeeded([], 1), null);
    assert.equal(pickSeeded(null, 1), null);
    assert.equal(pickSeeded(undefined, 1), null);
  });
});

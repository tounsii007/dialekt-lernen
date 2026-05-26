// daily.js — Deterministische Tages-Seeds.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { getDailySeed } from '../js/store/daily.js';

describe('getDailySeed', () => {
  it('liefert eine Zahl', () => {
    const s = getDailySeed();
    assert.equal(typeof s, 'number');
    assert.ok(Number.isFinite(s));
  });

  it('liefert denselben Wert bei mehreren Aufrufen am selben Tag', () => {
    const a = getDailySeed();
    const b = getDailySeed();
    assert.equal(a, b);
  });
});

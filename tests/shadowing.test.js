// Tests für die reine Shadowing-Logik (kein DOM/Audio nötig).

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  gradeShadow,
  shadowXp,
  summarizeShadow,
  buildShadowQueue,
  SHADOW_THRESHOLDS,
} from '../js/util/shadowing.js';

// Kleiner deterministischer RNG (mulberry32) für reproduzierbare Mischungen.
function rngFrom(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

describe('gradeShadow', () => {
  it('exakt → 3 Sterne, Perfekt!, ok', () => {
    const r = gradeShadow(1);
    assert.equal(r.stars, 3);
    assert.equal(r.label, 'Perfekt!');
    assert.equal(r.ok, true);
  });
  it('0.8 → 2 Sterne, Sehr gut', () => {
    const r = gradeShadow(0.8);
    assert.equal(r.stars, 2);
    assert.equal(r.label, 'Sehr gut');
    assert.equal(r.ok, true);
  });
  it('0.65 → 1 Stern, Fast, ok', () => {
    const r = gradeShadow(0.65);
    assert.equal(r.stars, 1);
    assert.equal(r.label, 'Fast');
    assert.equal(r.ok, true);
  });
  it('0.5 → 0 Sterne, Nochmal, nicht ok', () => {
    const r = gradeShadow(0.5);
    assert.equal(r.stars, 0);
    assert.equal(r.label, 'Nochmal');
    assert.equal(r.ok, false);
  });
  it('klemmt >1 auf 1 und <0 auf 0', () => {
    assert.equal(gradeShadow(2).stars, 3);
    assert.equal(gradeShadow(2).score, 1);
    assert.equal(gradeShadow(-3).stars, 0);
    assert.equal(gradeShadow(-3).score, 0);
  });
  it('NaN/undefined → 0 Sterne, score 0', () => {
    assert.equal(gradeShadow(NaN).stars, 0);
    assert.equal(gradeShadow(undefined).score, 0);
  });
  it('Schwellen-Grenzen sind inklusiv', () => {
    assert.equal(gradeShadow(0.9).stars, 3);
    assert.equal(gradeShadow(0.75).stars, 2);
    assert.equal(gradeShadow(0.6).stars, 1);
  });
});

describe('shadowXp', () => {
  it('Sterne → XP-Tabelle', () => {
    assert.equal(shadowXp(0), 0);
    assert.equal(shadowXp(1), 4);
    assert.equal(shadowXp(2), 7);
    assert.equal(shadowXp(3), 12);
  });
  it('klemmt und rundet', () => {
    assert.equal(shadowXp(5), 12);
    assert.equal(shadowXp(-1), 0);
    assert.equal(shadowXp(2.4), 7);
  });
  it('Nicht-Zahl → 0', () => {
    assert.equal(shadowXp('foo'), 0);
    assert.equal(shadowXp(undefined), 0);
  });
});

describe('summarizeShadow', () => {
  it('leere Liste → Nullen', () => {
    const s = summarizeShadow([]);
    assert.equal(s.count, 0);
    assert.equal(s.stars, 0);
    assert.equal(s.xp, 0);
    assert.equal(s.avgScore, 0);
    assert.equal(s.accuracyPct, 0);
    assert.equal(s.maxStars, 0);
  });
  it('keine Liste → Nullen (kein Absturz)', () => {
    assert.equal(summarizeShadow(undefined).count, 0);
    assert.equal(summarizeShadow(null).accuracyPct, 0);
  });
  it('mischt korrekt: Summen, passed, perfect, maxStars', () => {
    const s = summarizeShadow([
      { score: 1.0, stars: 3, xp: 12 },
      { score: 0.8, stars: 2, xp: 7 },
      { score: 0.5, stars: 0, xp: 0 },
      { score: 0.65, stars: 1, xp: 4 },
    ]);
    assert.equal(s.count, 4);
    assert.equal(s.stars, 6);
    assert.equal(s.xp, 23);
    assert.equal(s.passed, 3);
    assert.equal(s.perfect, 1);
    assert.equal(s.maxStars, 12);
    assert.equal(s.accuracyPct, 75);
    assert.ok(Math.abs(s.avgScore - (1.0 + 0.8 + 0.5 + 0.65) / 4) < 1e-9);
  });
  it('ignoriert kaputte Einträge robust', () => {
    const s = summarizeShadow([
      { stars: 3, xp: 12, score: 1 },
      { stars: 'x', xp: 'y', score: 'z' },
      null,
      {},
    ]);
    assert.equal(s.count, 4);
    assert.equal(s.stars, 3);
    assert.equal(s.xp, 12);
    assert.equal(s.passed, 1);
  });
  it('accuracyPct rundet', () => {
    const s = summarizeShadow([
      { stars: 1, xp: 4, score: 0.7 },
      { stars: 0, xp: 0, score: 0.2 },
      { stars: 0, xp: 0, score: 0.3 },
    ]);
    assert.equal(s.accuracyPct, 33); // 1/3 → 33
  });
});

describe('buildShadowQueue', () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8];

  it('liefert min(count, length) Einträge', () => {
    assert.equal(buildShadowQueue(items, 3, rngFrom(1)).length, 3);
    assert.equal(buildShadowQueue(items, 99, rngFrom(1)).length, items.length);
  });
  it('count <= 0 → []', () => {
    assert.deepEqual(buildShadowQueue(items, 0, rngFrom(1)), []);
    assert.deepEqual(buildShadowQueue(items, -5, rngFrom(1)), []);
  });
  it('keine Liste → []', () => {
    assert.deepEqual(buildShadowQueue(null, 3), []);
    assert.deepEqual(buildShadowQueue(undefined, 3), []);
  });
  it('mutiert das Original nicht', () => {
    const copy = items.slice();
    buildShadowQueue(items, 4, rngFrom(7));
    assert.deepEqual(items, copy);
  });
  it('gleicher Seed → gleiche Reihenfolge (deterministisch)', () => {
    const a = buildShadowQueue(items, 5, rngFrom(42));
    const b = buildShadowQueue(items, 5, rngFrom(42));
    assert.deepEqual(a, b);
  });
  it('ist eine Permutation (keine verlorenen/duplizierten Elemente)', () => {
    const out = buildShadowQueue(items, items.length, rngFrom(99));
    assert.deepEqual(out.slice().sort((x, y) => x - y), items.slice().sort((x, y) => x - y));
  });
  it('floored nicht-ganze count', () => {
    assert.equal(buildShadowQueue(items, 3.9, rngFrom(1)).length, 3);
  });
});

describe('SHADOW_THRESHOLDS', () => {
  it('ist absteigend nach min sortiert und deckt 0 ab', () => {
    for (let i = 1; i < SHADOW_THRESHOLDS.length; i++) {
      assert.ok(SHADOW_THRESHOLDS[i].min < SHADOW_THRESHOLDS[i - 1].min);
    }
    assert.equal(SHADOW_THRESHOLDS[SHADOW_THRESHOLDS.length - 1].min, 0);
  });
});

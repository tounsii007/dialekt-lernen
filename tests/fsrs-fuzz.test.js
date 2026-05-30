// Intervall-Fuzz + Load-Balancing — pures Modul, kein State.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { FUZZ_RANGES, fuzzRange, applyFuzz } from '../js/util/fsrs-fuzz.js';

describe('FUZZ_RANGES', () => {
  it('drei aufsteigende, lückenlose Bereiche mit positivem Faktor', () => {
    assert.equal(FUZZ_RANGES.length, 3);
    assert.equal(FUZZ_RANGES[0].start, 2.5);
    for (let i = 0; i < FUZZ_RANGES.length; i++) {
      assert.ok(FUZZ_RANGES[i].factor > 0);
      if (i > 0) assert.equal(FUZZ_RANGES[i].start, FUZZ_RANGES[i - 1].end);
    }
    assert.equal(FUZZ_RANGES[2].end, Infinity);
  });
});

describe('fuzzRange', () => {
  it('kollabiert unter 2.5 Tagen auf einen einzigen (gerundeten) Tag', () => {
    assert.deepEqual(fuzzRange(1), { min: 1, max: 1 });
    assert.deepEqual(fuzzRange(2), { min: 2, max: 2 });
    assert.deepEqual(fuzzRange(2.4), { min: 2, max: 2 });
  });

  it('berechnet das bekannte Fenster für mittlere Intervalle', () => {
    // ivl=5: delta = 1 + 0.15*(5-2.5) = 1.375 → [round(3.625), round(6.375)]
    assert.deepEqual(fuzzRange(5), { min: 4, max: 6 });
    // ivl=10: delta = 1 + 0.15*4.5 + 0.1*3 = 1.975 → [round(8.025), round(11.975)]
    assert.deepEqual(fuzzRange(10), { min: 8, max: 12 });
  });

  it('Ideal-Intervall liegt im Fenster, min >= 2, Fenster wächst mit dem Intervall', () => {
    const r10 = fuzzRange(10);
    const r60 = fuzzRange(60);
    assert.ok(r10.min >= 2);
    assert.ok(r10.min <= 10 && 10 <= r10.max);
    assert.ok((r60.max - r60.min) > (r10.max - r10.min), 'breiteres Fenster bei größerem Intervall');
  });

  it('robust gegen korrupte Eingaben', () => {
    assert.deepEqual(fuzzRange(NaN), { min: 1, max: 1 });
    assert.deepEqual(fuzzRange(undefined), { min: 1, max: 1 });
  });
});

describe('applyFuzz — Zufallsmodus', () => {
  it('enable:false liefert das gerundete Intervall ohne Streuung', () => {
    assert.equal(applyFuzz(10, { enable: false }), 10);
    assert.equal(applyFuzz(10.4, { enable: false }), 10);
  });

  it('unter der Schwelle (< 2.5) wird nicht gestreut', () => {
    assert.equal(applyFuzz(1), 1);
    assert.equal(applyFuzz(2), 2);
  });

  it('rng=0 → Fenster-Minimum, rng→1 → Fenster-Maximum', () => {
    const { min, max } = fuzzRange(10);
    assert.equal(applyFuzz(10, { rng: () => 0 }), min);
    assert.equal(applyFuzz(10, { rng: () => 0.999999 }), max);
  });

  it('bleibt für beliebige rng-Werte ganzzahlig und im Fenster', () => {
    const { min, max } = fuzzRange(30);
    for (let i = 0; i <= 20; i++) {
      const out = applyFuzz(30, { rng: () => i / 20 });
      assert.ok(Number.isInteger(out), `ganzzahlig: ${out}`);
      assert.ok(out >= min && out <= max, `${min} <= ${out} <= ${max}`);
    }
  });
});

describe('applyFuzz — Load-Balancing', () => {
  it('wählt den am wenigsten ausgelasteten Tag im Fenster', () => {
    // fuzzRange(10) = [8,12]; Tag 10 ist leer → wird gewählt.
    const load = new Map([[8, 5], [9, 5], [10, 0], [11, 2], [12, 3]]);
    assert.equal(applyFuzz(10, { load }), 10);
  });

  it('bevorzugt den leeren Tag auch abseits des Ideals', () => {
    const load = new Map([[8, 0], [9, 3], [10, 1], [11, 2], [12, 4]]);
    assert.equal(applyFuzz(10, { load }), 8);
  });

  it('Gleichstand → Tag am nächsten zum Ideal-Intervall', () => {
    const load = new Map(); // alles 0 → reiner Gleichstand
    assert.equal(applyFuzz(10, { load }), 10); // round(ideal) = 10
  });

  it('ist deterministisch (gleiche Last → gleicher Tag)', () => {
    const load = new Map([[8, 1], [9, 0], [10, 1], [11, 0], [12, 2]]);
    const a = applyFuzz(10, { load });
    const b = applyFuzz(10, { load });
    assert.equal(a, b);
    // Tage 9 und 11 sind beide leer und gleich weit vom Ideal (10) entfernt;
    // bei Gleichstand gewinnt der zuerst geprüfte (frühere) Tag.
    assert.equal(a, 9);
  });
});

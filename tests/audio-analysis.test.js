// Tests für die reine Rhythmus-Analyse-Mathematik (kein DOM/Audio nötig).

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  computeEnvelope,
  normalizeEnvelope,
  resampleEnvelope,
  syllableEnvelope,
  countPeaks,
  meanEnergy,
  scorePronunciation,
} from '../js/util/audio-analysis.js';

describe('computeEnvelope', () => {
  it('leere / fehlende Samples → Nullen in voller Länge', () => {
    assert.deepEqual(computeEnvelope([], 8), new Array(8).fill(0));
    assert.deepEqual(computeEnvelope(null, 4), new Array(4).fill(0));
  });

  it('konstantes Signal → RMS == |Amplitude| pro Eimer', () => {
    const env = computeEnvelope(new Array(100).fill(0.5), 10);
    assert.equal(env.length, 10);
    for (const v of env) assert.ok(Math.abs(v - 0.5) < 1e-9, `erwartet 0.5, war ${v}`);
  });

  it('Stille → alle Eimer 0', () => {
    const env = computeEnvelope(new Array(64).fill(0), 16);
    assert.ok(env.every((v) => v === 0));
  });

  it('buckets <= 0 → leeres bzw. längengetreues Array ohne Absturz', () => {
    assert.deepEqual(computeEnvelope([1, 2, 3], 0), []);
  });

  it('liefert immer genau `buckets` Werte', () => {
    assert.equal(computeEnvelope([0.1, 0.2, 0.3, 0.4, 0.5], 3).length, 3);
    assert.equal(computeEnvelope([0.1, 0.2], 9).length, 9);
  });
});

describe('normalizeEnvelope', () => {
  it('skaliert die Spitze auf 1', () => {
    const out = normalizeEnvelope([0.25, 0.5, 0.1]);
    assert.ok(Math.abs(Math.max(...out) - 1) < 1e-9);
    assert.ok(Math.abs(out[0] - 0.5) < 1e-9);
  });

  it('Stille bleibt Stille — kein NaN', () => {
    const out = normalizeEnvelope([0, 0, 0]);
    assert.ok(out.every((v) => v === 0));
    assert.ok(out.every((v) => !Number.isNaN(v)));
  });
});

describe('resampleEnvelope', () => {
  it('n <= 0 → []', () => {
    assert.deepEqual(resampleEnvelope([1, 2, 3], 0), []);
    assert.deepEqual(resampleEnvelope([1, 2, 3], -5), []);
  });

  it('leere Eingabe → n Nullen', () => {
    assert.deepEqual(resampleEnvelope([], 4), [0, 0, 0, 0]);
  });

  it('gleiche Länge → unveränderte Kopie', () => {
    const src = [0.1, 0.2, 0.3];
    const out = resampleEnvelope(src, 3);
    assert.deepEqual(out, src);
    assert.notEqual(out, src); // Kopie, nicht dieselbe Referenz
  });

  it('n === 1 → erster Wert', () => {
    assert.deepEqual(resampleEnvelope([0.7, 0.2, 0.9], 1), [0.7]);
  });

  it('Hochsampling: Länge stimmt, Endpunkte erhalten', () => {
    const out = resampleEnvelope([0, 1], 5);
    assert.equal(out.length, 5);
    assert.ok(Math.abs(out[0] - 0) < 1e-9);
    assert.ok(Math.abs(out[4] - 1) < 1e-9);
    assert.ok(Math.abs(out[2] - 0.5) < 1e-9); // lineare Mitte
  });
});

describe('syllableEnvelope', () => {
  it('0 Silben → alle Nullen', () => {
    assert.ok(syllableEnvelope(0, 16).every((v) => v === 0));
  });

  it('Spitze erreicht ~1', () => {
    const env = syllableEnvelope(3, 48);
    assert.ok(Math.max(...env) > 0.9);
  });

  it('hat genau `buckets` Werte', () => {
    assert.equal(syllableEnvelope(4, 32).length, 32);
  });

  it('countPeaks(syllableEnvelope(n)) === n (selbst-konsistent)', () => {
    for (const n of [1, 2, 3, 4, 5, 6]) {
      assert.equal(countPeaks(syllableEnvelope(n, 48)), n, `n=${n}`);
    }
  });
});

describe('countPeaks', () => {
  it('flache Stille → 0 Peaks', () => {
    assert.equal(countPeaks(new Array(32).fill(0)), 0);
  });

  it('ein Hügel → 1 Peak', () => {
    const env = [0, 0, 0.2, 0.8, 1, 0.8, 0.2, 0, 0];
    assert.equal(countPeaks(env), 1);
  });

  it('zwei klar getrennte Hügel → 2 Peaks', () => {
    const env = [0, 1, 0, 0, 0, 1, 0];
    assert.equal(countPeaks(env), 2);
  });
});

describe('meanEnergy', () => {
  it('Stille → 0', () => {
    assert.equal(meanEnergy(new Array(16).fill(0)), 0);
  });

  it('liegt für ein Signal in (0, 1]', () => {
    const m = meanEnergy(syllableEnvelope(2, 32));
    assert.ok(m > 0 && m <= 1, `erwartet 0<m<=1, war ${m}`);
  });

  it('leere Eingabe → 0', () => {
    assert.equal(meanEnergy([]), 0);
  });
});

describe('scorePronunciation', () => {
  it('Referenzmuster gegen sich selbst → sehr hoher Score', () => {
    const ref = syllableEnvelope(3, 32);
    const res = scorePronunciation(ref, 3, { buckets: 32 });
    assert.ok(res.score >= 90, `erwartet >=90, war ${res.score}`);
    assert.equal(res.userPeaks, 3);
    assert.equal(res.expectedSyllables, 3);
  });

  it('Stille → Score 0', () => {
    const res = scorePronunciation(new Array(32).fill(0), 3);
    assert.equal(res.score, 0);
  });

  it('fehlende/0 Silbenzahl → mindestens 1 erwartet', () => {
    const res = scorePronunciation([], 0);
    assert.equal(res.expectedSyllables, 1);
  });

  it('shapeSim und peakSim liegen in [0,1]', () => {
    const res = scorePronunciation(syllableEnvelope(2, 32), 4, { buckets: 32 });
    assert.ok(res.shapeSim >= 0 && res.shapeSim <= 1);
    assert.ok(res.peakSim >= 0 && res.peakSim <= 1);
  });

  it('falsche Silbenzahl senkt peakSim', () => {
    const env = syllableEnvelope(2, 32);
    const exact = scorePronunciation(env, 2, { buckets: 32 });
    const wrong = scorePronunciation(env, 5, { buckets: 32 });
    assert.ok(wrong.peakSim < exact.peakSim);
    assert.ok(wrong.score < exact.score);
  });

  it('Score ist immer eine ganze Zahl in [0,100]', () => {
    for (const n of [1, 3, 6]) {
      const res = scorePronunciation(syllableEnvelope(n, 32), n, { buckets: 32 });
      assert.ok(Number.isInteger(res.score));
      assert.ok(res.score >= 0 && res.score <= 100);
    }
  });
});

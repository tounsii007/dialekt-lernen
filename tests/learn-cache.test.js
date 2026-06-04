// learn-cache.js — Epoche-basiertes Memo mit Pro-Tick-Verfall.
//
// Prüft die Cache-Mechanik isoliert (ohne DOM): Caching im selben Tick,
// sofortige Invalidierung via bump(), und automatischer Verfall nach einem
// Microtask (der Backstop, der greift, wenn gar kein Event feuert).

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { memoizePerEpoch, bump, getEpoch } from '../js/util/learn-cache.js';

const microtask = () => Promise.resolve();

describe('learn-cache · memoizePerEpoch', () => {
  it('berechnet nur einmal pro Epoche (zwei Aufrufe → ein compute)', () => {
    let calls = 0;
    const memo = memoizePerEpoch(() => { calls++; return calls; });
    const a = memo();
    const b = memo();
    assert.equal(calls, 1, 'compute darf im selben Tick nur einmal laufen');
    assert.equal(a, b, 'beide Aufrufe liefern dasselbe gemerkte Ergebnis');
  });

  it('bump() invalidiert sofort → nächster Aufruf rechnet neu', () => {
    let calls = 0;
    const memo = memoizePerEpoch(() => { calls++; return calls; });
    memo();                 // calls = 1
    assert.equal(calls, 1);
    bump();                 // Epoche +1 → Cache entwertet
    memo();                 // calls = 2 (Neuberechnung)
    assert.equal(calls, 2, 'nach bump muss neu gerechnet werden');
  });

  it('Pro-Tick-Verfall: nach einem Microtask wird neu gerechnet (Backstop)', async () => {
    let calls = 0;
    const memo = memoizePerEpoch(() => { calls++; return calls; });
    memo();                 // calls = 1, plant Tick-Verfall
    memo();                 // gecacht, calls bleibt 1
    assert.equal(calls, 1);
    await microtask();      // geplanter Verfall feuert → Epoche +1
    memo();                 // calls = 2 (frische Berechnung im neuen Tick)
    assert.equal(calls, 2, 'ohne jedes Event muss spätestens der Tick-Verfall invalidieren');
  });

  it('getEpoch() steigt bei jedem bump streng monoton', () => {
    const e0 = getEpoch();
    bump();
    const e1 = getEpoch();
    bump();
    const e2 = getEpoch();
    assert.ok(e1 > e0 && e2 > e1, 'Epoche muss bei jedem bump wachsen');
  });
});

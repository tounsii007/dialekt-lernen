// recommendations.js — Smart-Empfehlungen.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { state } from '../js/store/state.js';
import {
  getRecommendations, getRecentDialects,
  getActivitySeries, getQuizSparkline,
} from '../js/util/recommendations.js';
import { STATUS_HARD, STATUS_MEDIUM, STATUS_LEARNED } from '../js/store/learning.js';
import { bump } from '../js/util/learn-cache.js';
import { resetState } from './_setup.js';

describe('getRecommendations', () => {
  beforeEach(resetState);

  it('liefert due/hard/almost/fresh-Buckets', () => {
    const r = getRecommendations(5);
    assert.ok(Array.isArray(r.due));
    assert.ok(Array.isArray(r.hard));
    assert.ok(Array.isArray(r.almost));
    assert.ok(Array.isArray(r.fresh));
  });

  it('fresh enthält nur ungelernte Ausdrücke (stand=0)', () => {
    const r = getRecommendations(5);
    assert.ok(r.fresh.every(a => a.stand === 0));
  });

  it('hard enthält Lapses oder STATUS_HARD', () => {
    state.gelernt['hessisch.h-001'] = {
      ef: 1.5, reps: 0, interval: 1, due: 0, lapses: 3, last: 100, stand: STATUS_HARD,
    };
    const r = getRecommendations(5);
    const h = r.hard.find(a => a.dialektId === 'hessisch' && a.id === 'h-001');
    assert.ok(h, 'STATUS_HARD-Karte sollte in hard sein');
  });

  it('almost enthält STATUS_MEDIUM', () => {
    state.gelernt['hessisch.h-002'] = {
      ef: 2.0, reps: 1, interval: 1, due: 0, lapses: 0, last: 100, stand: STATUS_MEDIUM,
    };
    const r = getRecommendations(5);
    assert.ok(r.almost.some(a => a.id === 'h-002'));
  });

  it('respektiert das Limit', () => {
    const r = getRecommendations(3);
    assert.ok(r.due.length <= 3);
    assert.ok(r.hard.length <= 3);
    assert.ok(r.almost.length <= 3);
    assert.ok(r.fresh.length <= 3);
  });

  it('rechnet nach einer Lernstand-Änderung neu (Cache invalidiert)', () => {
    // Frische Sicht: Karte ist noch in keinem Bucket.
    const before = getRecommendations(50);
    assert.ok(!before.hard.some(a => a.id === 'h-001'),
      'h-001 sollte vor der Änderung nicht in hard sein');

    // Lernstand ändern UND das Invalidierungs-Signal feuern (in der App via
    // dialekto:xp; der Cache hört darauf — bump() ist derselbe Handler).
    state.gelernt['hessisch.h-001'] = {
      ef: 1.5, reps: 0, interval: 1, due: 0, lapses: 5, last: 100, stand: STATUS_HARD,
    };
    bump();

    const after = getRecommendations(50);
    assert.ok(after.hard.some(a => a.dialektId === 'hessisch' && a.id === 'h-001'),
      'nach der Änderung + Invalidierung muss h-001 in hard auftauchen');
  });

  it('ohne Invalidierung liefert derselbe Tick das gecachte Ergebnis (kein Re-Compute)', () => {
    // Belegt, dass tatsächlich gecacht wird: zwei Aufrufe ohne bump liefern
    // identische Bucket-Referenzen-Inhalte trotz zwischenzeitlicher (nicht
    // signalisierter) State-Mutation. Die App signalisiert immer via Event;
    // dieser Test prüft nur die Cache-Mechanik im selben Tick.
    const first = getRecommendations(50);
    const firstFreshLen = first.fresh.length;
    // Direkter Schreibzugriff OHNE Signal — darf den Cache im selben Tick NICHT
    // verändern (Invalidierung passiert in der App über das Event / am Tick-Ende).
    state.gelernt['hessisch.h-002'] = {
      ef: 2.0, reps: 1, interval: 1, due: 0, lapses: 0, last: 100, stand: STATUS_MEDIUM,
    };
    const second = getRecommendations(50);
    assert.equal(second.fresh.length, firstFreshLen,
      'ohne bump im selben Tick bleibt das Ergebnis stabil (gecacht)');
  });
});

describe('getRecentDialects', () => {
  beforeEach(resetState);

  it('leeres Array bei keinem visited', () => {
    assert.deepEqual(getRecentDialects(), []);
  });

  it('liefert letzte besuchte Dialekte', () => {
    state.visited = ['hessisch', 'bayerisch'];
    const recent = getRecentDialects(4);
    assert.equal(recent.length, 2);
    assert.equal(recent[0].id, 'bayerisch'); // reverse
    assert.equal(recent[1].id, 'hessisch');
  });

  it('dedupes', () => {
    state.visited = ['hessisch', 'bayerisch', 'hessisch'];
    const recent = getRecentDialects(4);
    assert.equal(recent.length, 2);
  });

  it('Limit', () => {
    state.visited = ['hessisch', 'bayerisch', 'plattdeutsch', 'wienerisch'];
    assert.equal(getRecentDialects(2).length, 2);
  });

  it('ignoriert unbekannte IDs', () => {
    state.visited = ['hessisch', 'xyz', 'bayerisch'];
    const recent = getRecentDialects(4);
    assert.equal(recent.length, 2);
  });
});

describe('getActivitySeries', () => {
  beforeEach(resetState);

  it('liefert 14 Tage standardmäßig', () => {
    assert.equal(getActivitySeries().length, 14);
  });

  it('jeder Eintrag hat date + count', () => {
    for (const x of getActivitySeries(7)) {
      assert.ok(x.date instanceof Date);
      assert.equal(typeof x.count, 'number');
    }
  });

  it('zählt eingetragene Aktivität', () => {
    const today = new Date();
    const key = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    state.streak = { count: 1, lastDay: key, days: { [key]: 7 } };
    const series = getActivitySeries(1);
    assert.equal(series[0].count, 7);
  });
});

describe('getQuizSparkline', () => {
  beforeEach(resetState);

  it('leeres Array ohne Historie', () => {
    assert.deepEqual(getQuizSparkline(), []);
  });

  it('liefert letzte N Quiz-Punkte', () => {
    state.quizHistory = [
      { date: 1, score: 5, total: 10 },
      { date: 2, score: 8, total: 10 },
      { date: 3, score: 10, total: 10 },
    ];
    const s = getQuizSparkline(10);
    assert.equal(s.length, 3);
    assert.equal(s[0].pct, 50);
    assert.equal(s[1].pct, 80);
    assert.equal(s[2].pct, 100);
  });

  it('respektiert Limit', () => {
    state.quizHistory = Array.from({ length: 20 }, (_, i) => ({ date: i, score: i, total: 20 }));
    assert.equal(getQuizSparkline(5).length, 5);
  });
});

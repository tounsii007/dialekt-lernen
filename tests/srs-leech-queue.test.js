// Leech-Erkennung + Retrievability-sortierte Review-Queue (Store-Ebene).

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { state } from '../js/store/state.js';
import {
  getDueCards,
  getSrsStats,
  getLeeches,
  isLeech,
  LEECH_LAPSES,
} from '../js/store/srs.js';

const DAY = 86_400_000;

function resetSrsState() {
  state.gelernt = {};
  state.xp = { total: 0, log: [] };
  state.goals = { target: 10, progress: {}, reminderShown: {} };
  state.streak = { count: 0, lastDay: null, days: {} };
  state.srs = { scheduler: 'fsrs', retention: 0.9, fuzz: true, params: null };
  state.srsLog = [];
}

// Minimaler, fälliger FSRS-Record.
function fsrsCard({ stability, last, lapses = 0, due = Date.now() - 1000 }) {
  return {
    sched: 'fsrs', difficulty: 5, stability, state: 2,
    reps: 3, lapses, interval: Math.round(stability), due, last,
  };
}

describe('isLeech / LEECH_LAPSES', () => {
  it('Schwelle entspricht dem Anki-Default (8)', () => {
    assert.equal(LEECH_LAPSES, 8);
  });

  it('greift ab der Schwelle, nicht davor', () => {
    assert.equal(isLeech({ lapses: 7 }), false);
    assert.equal(isLeech({ lapses: 8 }), true);
    assert.equal(isLeech({ lapses: 12 }), true);
  });

  it('robust gegen null/korrupte Eingaben', () => {
    assert.equal(isLeech(null), false);
    assert.equal(isLeech({}), false);
    assert.equal(isLeech({ lapses: 'viele' }), false);
  });
});

describe('getLeeches / getSrsStats.leeches', () => {
  beforeEach(resetSrsState);

  it('listet nur Leeches, absteigend nach Lapses', () => {
    state.gelernt['d.a'] = fsrsCard({ stability: 10, last: Date.now() - DAY, lapses: 9 });
    state.gelernt['d.b'] = fsrsCard({ stability: 10, last: Date.now() - DAY, lapses: 3 }); // kein Leech
    state.gelernt['d.c'] = fsrsCard({ stability: 10, last: Date.now() - DAY, lapses: 15 });
    const cards = [
      { dialektId: 'd', id: 'a' },
      { dialektId: 'd', id: 'b' },
      { dialektId: 'd', id: 'c' },
    ];
    const leeches = getLeeches(cards);
    assert.deepEqual(leeches.map((l) => l.id), ['c', 'a']);
    assert.equal(leeches[0].lapses, 15);
  });

  it('zählt Leeches in getSrsStats', () => {
    state.gelernt['d.a'] = fsrsCard({ stability: 10, last: Date.now() - DAY, lapses: 9 });
    state.gelernt['d.b'] = fsrsCard({ stability: 10, last: Date.now() - DAY, lapses: 2 });
    const cards = [{ dialektId: 'd', id: 'a' }, { dialektId: 'd', id: 'b' }];
    const stats = getSrsStats(cards);
    assert.equal(stats.leeches, 1);
  });

  it('keine Leeches → leere Liste, Zähler 0', () => {
    state.gelernt['d.a'] = fsrsCard({ stability: 10, last: Date.now() - DAY, lapses: 1 });
    const cards = [{ dialektId: 'd', id: 'a' }];
    assert.equal(getLeeches(cards).length, 0);
    assert.equal(getSrsStats(cards).leeches, 0);
  });
});

describe('getDueCards — Retrievability-Sortierung', () => {
  beforeEach(resetSrsState);

  it('die am stärksten bedrohte Karte (niedrigste R) kommt zuerst', () => {
    const now = Date.now();
    // „safe": hohe Stabilität, gerade erst geübt → R ~0.99.
    state.gelernt['d.safe'] = fsrsCard({ stability: 100, last: now - 1 * DAY, due: now - 1000 });
    // „urgent": niedrige Stabilität, lange her → R deutlich niedriger.
    state.gelernt['d.urgent'] = fsrsCard({ stability: 2, last: now - 10 * DAY, due: now - 1000 });
    const cards = [
      { dialektId: 'd', id: 'safe' },
      { dialektId: 'd', id: 'urgent' },
    ];
    const due = getDueCards(cards);
    assert.equal(due.length, 2);
    assert.equal(due[0].id, 'urgent');
    assert.equal(due[1].id, 'safe');
    assert.ok(due[0]._r < due[1]._r, `${due[0]._r} < ${due[1]._r}`);
  });

  it('filtert nicht-fällige Karten weiterhin heraus', () => {
    const now = Date.now();
    state.gelernt['d.due'] = fsrsCard({ stability: 5, last: now - 5 * DAY, due: now - 1000 });
    state.gelernt['d.future'] = fsrsCard({ stability: 5, last: now, due: now + 5 * DAY });
    const cards = [{ dialektId: 'd', id: 'due' }, { dialektId: 'd', id: 'future' }];
    const due = getDueCards(cards);
    assert.equal(due.length, 1);
    assert.equal(due[0].id, 'due');
  });
});

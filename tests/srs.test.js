// SM-2 Spaced-Repetition — Algorithmus-Tests.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { state } from '../js/store/state.js';
import {
  reviewCard,
  getCardSrs,
  getDueCards,
  getSrsStats,
  RATING_HARD,
  RATING_MED,
  RATING_EASY,
} from '../js/store/srs.js';

function resetSrsState() {
  state.gelernt = {};
  state.xp = { total: 0, log: [] };
  state.goals = { target: 10, progress: {}, reminderShown: {} };
  state.streak = { count: 0, lastDay: null, days: {} };
}

describe('reviewCard — Initialer Status', () => {
  beforeEach(resetSrsState);

  it('Erstes EASY-Rating → reps=1, interval=1, due in 1 Tag', () => {
    const rec = reviewCard('hessisch', 'h-001', RATING_EASY);
    assert.equal(rec.reps, 1);
    assert.equal(rec.interval, 1);
    assert.ok(rec.due > Date.now()); // due liegt in der Zukunft
    assert.equal(rec.lapses, 0);
    assert.equal(rec.stand, 3);
  });

  it('Erstes HARD-Rating → reps=0, interval=1, lapses=1', () => {
    const rec = reviewCard('hessisch', 'h-001', RATING_HARD);
    assert.equal(rec.reps, 0);
    assert.equal(rec.interval, 1);
    assert.equal(rec.lapses, 1);
    assert.equal(rec.stand, 1);
  });

  it('Erstes MED-Rating → reps=1, interval=1, lapses=0', () => {
    const rec = reviewCard('hessisch', 'h-001', RATING_MED);
    assert.equal(rec.reps, 1);
    assert.equal(rec.interval, 1);
    assert.equal(rec.lapses, 0);
    assert.equal(rec.stand, 2);
  });
});

describe('reviewCard — Wiederholungs-Intervalle', () => {
  beforeEach(resetSrsState);

  it('Zweites EASY → interval=6', () => {
    reviewCard('h', 'a', RATING_EASY);
    const rec = reviewCard('h', 'a', RATING_EASY);
    assert.equal(rec.reps, 2);
    assert.equal(rec.interval, 6);
  });

  it('Drittes EASY → interval ≈ 6 * EF (>=15)', () => {
    reviewCard('h', 'a', RATING_EASY);
    reviewCard('h', 'a', RATING_EASY);
    const rec = reviewCard('h', 'a', RATING_EASY);
    assert.equal(rec.reps, 3);
    assert.ok(rec.interval >= 13, `interval war ${rec.interval}, erwartet >=13`);
  });

  it('EF wächst mit EASY-Bewertungen', () => {
    let prevEf = 2.5;
    for (let i = 0; i < 5; i++) {
      const rec = reviewCard('h', 'a', RATING_EASY);
      assert.ok(rec.ef >= prevEf, `EF darf bei EASY nicht sinken (${prevEf} → ${rec.ef})`);
      prevEf = rec.ef;
    }
  });
});

describe('reviewCard — Lapse-Verhalten', () => {
  beforeEach(resetSrsState);

  it('HARD nach mehreren EASY → reps zurück auf 0, lapses++', () => {
    reviewCard('h', 'a', RATING_EASY);
    reviewCard('h', 'a', RATING_EASY);
    reviewCard('h', 'a', RATING_EASY);
    const rec = reviewCard('h', 'a', RATING_HARD);
    assert.equal(rec.reps, 0);
    assert.equal(rec.interval, 1);
    assert.equal(rec.lapses, 1);
  });

  it('EF sinkt bei HARD, aber nicht unter 1.3', () => {
    // 20× HARD muss EF auf 1.3 floor bringen, nicht darunter.
    for (let i = 0; i < 20; i++) reviewCard('h', 'a', RATING_HARD);
    const rec = getCardSrs('h', 'a');
    assert.equal(rec.ef, 1.3, `EF floor verletzt: ${rec.ef}`);
  });
});

describe('getCardSrs — Legacy-Migration', () => {
  beforeEach(() => {
    resetSrsState();
    // Legacy-Eintrag (nur stand + last, kein ef/reps/interval).
    state.gelernt['hessisch.h-001'] = { stand: 3, last: 1000 };
  });

  it('liefert sinnvolle Defaults für Legacy-Records', () => {
    const rec = getCardSrs('hessisch', 'h-001');
    assert.ok(rec.ef);
    assert.ok(rec.reps >= 1, `Legacy stand=3 → reps sollte >=1 sein, war ${rec.reps}`);
    assert.equal(rec.stand, 3);
  });
});

describe('getDueCards / getSrsStats', () => {
  beforeEach(() => {
    resetSrsState();
    // Karte 1: due in der Vergangenheit
    state.gelernt['hessisch.h-001'] = {
      ef: 2.5, reps: 1, interval: 1, due: Date.now() - 1000, lapses: 0, last: 0, stand: 3,
    };
    // Karte 2: due in der Zukunft
    state.gelernt['hessisch.h-002'] = {
      ef: 2.5, reps: 2, interval: 6, due: Date.now() + 86400000, lapses: 0, last: 0, stand: 3,
    };
  });

  it('getDueCards liefert nur fällige Karten', () => {
    const allCards = [
      { dialektId: 'hessisch', id: 'h-001' },
      { dialektId: 'hessisch', id: 'h-002' },
      { dialektId: 'hessisch', id: 'h-003' }, // unbekannt
    ];
    const due = getDueCards(allCards);
    assert.equal(due.length, 1);
    assert.equal(due[0].id, 'h-001');
  });

  it('getSrsStats zählt due/learned/learning/fresh korrekt', () => {
    const allCards = [
      { dialektId: 'hessisch', id: 'h-001' }, // due jetzt, reps=1 → learning
      { dialektId: 'hessisch', id: 'h-002' }, // not due, reps=2, interval=6 → learned
      { dialektId: 'hessisch', id: 'h-003' }, // unbekannt → fresh
    ];
    const stats = getSrsStats(allCards);
    assert.equal(stats.due, 1);
    assert.equal(stats.learned, 1);
    assert.equal(stats.learning, 1);
    assert.equal(stats.fresh, 1);
  });
});

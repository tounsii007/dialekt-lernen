// FSRS-Integration im SRS-Store — Scheduler-Wahl, FSRS-Review, Migration.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { state } from '../js/store/state.js';
import {
  reviewCard,
  reviewCardScheduled,
  reviewCardFsrs,
  getReviewPreview,
  getCardSrs,
  getDueCards,
  getSrsStats,
  getSrsConfig,
  setSrsConfig,
  migrateLegacyEntries,
  RATING_HARD,
  RATING_MED,
  RATING_EASY,
} from '../js/store/srs.js';
import { GRADE_AGAIN, GRADE_GOOD, GRADE_EASY } from '../js/util/fsrs.js';

function resetSrsState() {
  state.gelernt = {};
  state.xp = { total: 0, log: [] };
  state.goals = { target: 10, progress: {}, reminderShown: {} };
  state.streak = { count: 0, lastDay: null, days: {} };
  state.srs = { scheduler: 'fsrs', retention: 0.9, fuzz: true, params: null };
  state.srsLog = [];
}

describe('getSrsConfig / setSrsConfig', () => {
  beforeEach(resetSrsState);

  it('Default: FSRS, Retention 0.9, Fuzz an, keine Parameter', () => {
    const c = getSrsConfig();
    assert.equal(c.scheduler, 'fsrs');
    assert.equal(c.retention, 0.9);
    assert.equal(c.fuzz, true);
    assert.equal(c.params, null);
  });

  it('Retention wird auf 0.7..0.97 geklemmt', () => {
    assert.equal(setSrsConfig({ retention: 0.5 }).retention, 0.7);
    assert.equal(setSrsConfig({ retention: 0.999 }).retention, 0.97);
    assert.equal(setSrsConfig({ retention: 0.85 }).retention, 0.85);
  });

  it('unbekannter Scheduler fällt auf fsrs zurück, sm2 bleibt erhalten', () => {
    assert.equal(setSrsConfig({ scheduler: 'quatsch' }).scheduler, 'fsrs');
    assert.equal(setSrsConfig({ scheduler: 'sm2' }).scheduler, 'sm2');
  });

  it('params nur akzeptiert, wenn exakt 19 Werte', () => {
    assert.equal(setSrsConfig({ params: [1, 2, 3] }).params, null);
    const ok = new Array(19).fill(0.5);
    assert.deepEqual(setSrsConfig({ params: ok }).params, ok);
  });
});

describe('reviewCardScheduled — FSRS-Default-Pfad', () => {
  beforeEach(resetSrsState);

  it('erzeugt einen FSRS-Record (sched/stability/difficulty/state), kein ef', () => {
    const rec = reviewCardScheduled('hessisch', 'h-001', RATING_EASY);
    assert.equal(rec.sched, 'fsrs');
    assert.equal(rec.reps, 1);
    assert.ok(rec.stability > 0);
    assert.ok(rec.difficulty >= 1 && rec.difficulty <= 10);
    assert.ok(rec.due > Date.now());
    assert.ok(rec.interval >= 1);
    assert.equal(rec.ef, undefined); // FSRS speichert kein ef
  });

  it('stand-Mapping: EASY→3, MED→2, HARD→1', () => {
    assert.equal(reviewCardScheduled('d', 'easy', RATING_EASY).stand, 3);
    assert.equal(reviewCardScheduled('d', 'med', RATING_MED).stand, 2);
    assert.equal(reviewCardScheduled('d', 'hard', RATING_HARD).stand, 1);
  });

  it('expliziter grade (4 Knöpfe) überschreibt das rating-Mapping', () => {
    // rating=HARD würde sonst GRADE_AGAIN geben; grade erzwingt GOOD.
    const rec = reviewCardScheduled('d', 'x', RATING_HARD, GRADE_GOOD);
    assert.equal(rec.stand, 2);
  });

  it('löst Seiteneffekte aus (XP + Streak)', () => {
    reviewCardScheduled('d', 'x', RATING_EASY);
    assert.ok(state.xp.total > 0, 'XP sollte vergeben werden');
    assert.ok(state.streak.count >= 1, 'Streak sollte registriert sein');
  });

  it('schreibt einen Review-Log-Eintrag für den Optimizer', () => {
    reviewCardScheduled('d', 'x', RATING_EASY);
    assert.equal(state.srsLog.length, 1);
    const e = state.srsLog[0];
    assert.equal(e.key, 'd.x');
    assert.ok(Number.isFinite(e.t));
    assert.equal(e.g, GRADE_EASY);
    assert.ok(Number.isFinite(e.s) && e.s > 0);
    assert.ok(Number.isFinite(e.d));
  });
});

describe('reviewCardScheduled — SM-2-Pfad (Scheduler umgestellt)', () => {
  beforeEach(() => {
    resetSrsState();
    setSrsConfig({ scheduler: 'sm2' });
  });

  it('erzeugt einen SM-2-Record (ef vorhanden, kein sched)', () => {
    const rec = reviewCardScheduled('hessisch', 'h-001', RATING_EASY);
    assert.ok(rec.ef);
    assert.equal(rec.sched, undefined);
    assert.equal(rec.reps, 1);
    assert.equal(rec.interval, 1);
  });

  it('getReviewPreview liefert im SM-2-Modus null', () => {
    assert.equal(getReviewPreview('d', 'x'), null);
  });
});

describe('getCardSrs — FSRS-Records korrekt zurückgeben', () => {
  beforeEach(resetSrsState);

  it('FSRS-Record landet NICHT im Legacy-Zweig', () => {
    reviewCardFsrs('d', 'x', GRADE_EASY);
    const rec = getCardSrs('d', 'x');
    assert.equal(rec.sched, 'fsrs');
    assert.ok(rec.stability > 0);
    assert.ok(rec.difficulty >= 1);
    assert.equal(rec.ef, 2.5); // INIT_EF-Platzhalter für Legacy-Consumer
  });

  it('coerced korrupte FSRS-Felder auf endliche Werte', () => {
    state.gelernt['d.x'] = {
      sched: 'fsrs', difficulty: NaN, stability: 'bad', state: 'x',
      reps: NaN, interval: 'y', due: 'z', last: undefined, stand: 3,
    };
    const rec = getCardSrs('d', 'x');
    assert.ok(Number.isFinite(rec.difficulty));
    assert.ok(Number.isFinite(rec.stability) && rec.stability > 0);
    assert.ok(Number.isFinite(rec.due));
    assert.equal(rec.reps, 0);
  });
});

describe('migrateLegacyEntries — FSRS-Records bleiben unangetastet', () => {
  beforeEach(resetSrsState);

  it('clobbert eine FSRS-Karte nicht zu einem ef-only-Record', () => {
    reviewCardFsrs('d', 'x', GRADE_GOOD);
    const before = { ...state.gelernt['d.x'] };
    migrateLegacyEntries();
    const after = state.gelernt['d.x'];
    assert.equal(after.sched, 'fsrs');
    assert.equal(after.difficulty, before.difficulty);
    assert.equal(after.stability, before.stability);
    assert.equal(after.ef, undefined);
  });
});

describe('getReviewPreview — Intervall-Vorschau (FSRS)', () => {
  beforeEach(resetSrsState);

  it('liefert vier monoton steigende Intervalle (Again ≤ … ≤ Easy)', () => {
    const p = getReviewPreview('d', 'neu');
    assert.ok(p && typeof p === 'object');
    for (const g of [1, 2, 3, 4]) {
      assert.ok(Number.isFinite(p[g]) && p[g] >= 1, `Intervall für Grade ${g}: ${p[g]}`);
    }
    assert.ok(p[2] >= p[1]);
    assert.ok(p[3] >= p[2]);
    assert.ok(p[4] >= p[3]);
  });
});

describe('SM-2 → FSRS Lazy-Seeding bei Scheduler-Wechsel', () => {
  beforeEach(resetSrsState);

  it('übernimmt Fortschritt statt ihn zu verwerfen', () => {
    // Zwei SM-2-Reviews aufbauen (reps=2, interval=6).
    setSrsConfig({ scheduler: 'sm2' });
    reviewCardScheduled('d', 'x', RATING_EASY);
    const sm = reviewCardScheduled('d', 'x', RATING_EASY);
    assert.equal(sm.reps, 2);
    assert.equal(sm.sched, undefined);

    // Auf FSRS umstellen und erneut reviewen → seedet aus SM-2.
    setSrsConfig({ scheduler: 'fsrs' });
    const fr = reviewCardScheduled('d', 'x', RATING_EASY);
    assert.equal(fr.sched, 'fsrs');
    assert.equal(fr.reps, 3, 'reps läuft aus SM-2 weiter (2 → 3)');
    assert.ok(fr.stability > 0);
  });
});

describe('getDueCards / getSrsStats mit FSRS-Records', () => {
  beforeEach(resetSrsState);

  it('FSRS-Record (due in Vergangenheit) erscheint in getDueCards', () => {
    state.gelernt['d.x'] = {
      sched: 'fsrs', difficulty: 5, stability: 10, state: 2,
      reps: 3, lapses: 0, interval: 10, due: Date.now() - 1000, last: 0, stand: 3,
    };
    const due = getDueCards([{ dialektId: 'd', id: 'x' }]);
    assert.equal(due.length, 1);
    assert.equal(due[0].id, 'x');
  });

  it('getSrsStats zählt einen reifen FSRS-Record als learned', () => {
    state.gelernt['d.x'] = {
      sched: 'fsrs', difficulty: 5, stability: 30, state: 2,
      reps: 4, lapses: 0, interval: 30, due: Date.now() + 86400000, last: 0, stand: 3,
    };
    const stats = getSrsStats([{ dialektId: 'd', id: 'x' }]);
    assert.equal(stats.learned, 1);
    assert.equal(stats.fresh, 0);
  });
});

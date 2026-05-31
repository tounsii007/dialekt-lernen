// Lokale Liga — privacy-preserving Geist-Kohorte. Reines, deterministisches
// Modul: feste Zeitstempel + direkt gesetzte XP machen die Rangliste testbar.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { state } from '../js/store/state.js';
import { currentWeekKey } from '../js/store/challenges.js';
import { resetState } from './_setup.js';
import {
  LEAGUE_TIERS,
  COHORT_SIZE,
  PROMOTE_RANK,
  DEMOTE_RANK,
  weekProgress,
  getWeeklyXp,
  getCohort,
  rollWeek,
  getLeagueSummary,
  getLeagueResult,
  clearLeagueResult,
  resetLeague,
} from '../js/store/league.js';

// Mittwoch 12:00 lokale Zeit (+ weekOffset Wochen) — sicher in der Wochenmitte,
// robust gegen Zeitzonen-Verschiebungen rund um Mitternacht.
function wed(weekOffset = 0) {
  const d = new Date(2026, 0, 7, 12, 0, 0); // Mi, 7. Jan 2026 (lokal)
  d.setDate(d.getDate() + weekOffset * 7);
  return d.getTime();
}
function thisWeek(now) {
  return currentWeekKey(new Date(now));
}
function setLeague(partial) {
  state.league = { tier: 0, week: null, weekStartXp: 0, best: 0, lastResult: null, ...partial };
}

describe('LEAGUE_TIERS', () => {
  it('7 Stufen, base streng aufsteigend', () => {
    assert.equal(LEAGUE_TIERS.length, 7);
    for (let i = 1; i < LEAGUE_TIERS.length; i++) {
      assert.ok(LEAGUE_TIERS[i].base > LEAGUE_TIERS[i - 1].base, `aufsteigend bei ${i}`);
    }
    assert.equal(LEAGUE_TIERS[0].id, 'bronze');
    assert.equal(LEAGUE_TIERS[LEAGUE_TIERS.length - 1].id, 'diamant');
  });
});

describe('weekProgress', () => {
  beforeEach(resetState);
  it('liegt in [0,1] und ist in der Wochenmitte moderat', () => {
    const p = weekProgress(wed(0));
    assert.ok(p >= 0 && p <= 1);
    assert.ok(p > 0.2 && p < 0.7, `Wochenmitte plausibel, war ${p}`);
  });
});

describe('getWeeklyXp', () => {
  beforeEach(resetState);
  it('ist Differenz zum Wochenstart-Snapshot', () => {
    setLeague({ week: thisWeek(wed(0)), weekStartXp: 50 });
    state.xp.total = 200;
    assert.equal(getWeeklyXp(wed(0)), 150);
  });
  it('wird nie negativ (z. B. nach Import mit kleinerem Total)', () => {
    setLeague({ week: thisWeek(wed(0)), weekStartXp: 500 });
    state.xp.total = 100;
    assert.equal(getWeeklyXp(wed(0)), 0);
  });
});

describe('getCohort', () => {
  beforeEach(resetState);

  it('liefert 15 Einträge, genau ein „Du", Ränge 1..15, absteigend sortiert', () => {
    setLeague({ tier: 1, week: thisWeek(wed(0)) });
    state.xp.total = 120;
    const b = getCohort(wed(0));
    assert.equal(b.length, COHORT_SIZE);
    assert.equal(b.filter(e => e.isUser).length, 1);
    assert.deepEqual(b.map(e => e.rank), Array.from({ length: COHORT_SIZE }, (_, i) => i + 1));
    for (let i = 1; i < b.length; i++) assert.ok(b[i - 1].xp >= b[i].xp, 'absteigend');
    assert.equal(b.find(e => e.isUser).xp, 120);
  });

  it('ist deterministisch bei gleichem now', () => {
    setLeague({ tier: 1, week: thisWeek(wed(0)) });
    state.xp.total = 90;
    const a = getCohort(wed(0)).map(e => ({ name: e.name, xp: e.xp, isUser: e.isUser }));
    const b = getCohort(wed(0)).map(e => ({ name: e.name, xp: e.xp, isUser: e.isUser }));
    assert.deepEqual(a, b);
  });

  it('Gleichstand: Nutzer rankt hinter Geistern mit gleicher XP', () => {
    setLeague({ tier: 2, week: thisWeek(wed(0)) });
    state.xp.total = 0;
    const ghost = getCohort(wed(0)).find(e => !e.isUser && e.xp > 0);
    assert.ok(ghost, 'es gibt einen Geist mit XP > 0');
    state.xp.total = ghost.xp; // Nutzer exakt gleichauf
    const board = getCohort(wed(0));
    const me = board.find(e => e.isUser);
    const tied = board.filter(e => e.xp === ghost.xp);
    assert.equal(me.rank, Math.max(...tied.map(e => e.rank)), 'Nutzer steht bei Gleichstand hinten');
  });
});

describe('rollWeek — Wochenwechsel & Auf-/Abstieg', () => {
  beforeEach(resetState);

  it('gleiche Woche: kein Reset des Snapshots', () => {
    const wk = thisWeek(wed(0));
    setLeague({ tier: 2, week: wk, weekStartXp: 50, best: 2 });
    state.xp.total = 200;
    rollWeek(wed(0));
    assert.equal(state.league.week, wk);
    assert.equal(state.league.weekStartXp, 50);
  });

  it('neue Woche ohne Vorgeschichte: setzt Snapshot auf aktuelles Total', () => {
    setLeague({ tier: 0, week: null });
    state.xp.total = 300;
    rollWeek(wed(0));
    assert.equal(state.league.week, thisWeek(wed(0)));
    assert.equal(state.league.weekStartXp, 300);
    assert.equal(getLeagueResult(), null, 'ohne Vorwoche kein Ergebnis');
  });

  it('Aufstieg: Spitzenrang in der Vorwoche → Tier +1', () => {
    setLeague({ tier: 0, week: thisWeek(wed(0)), weekStartXp: 0, best: 0 });
    state.xp.total = 100000; // dominiert die Bronze-Geister
    rollWeek(wed(1));
    assert.equal(state.league.tier, 1);
    assert.equal(state.league.best, 1);
    assert.equal(state.league.weekStartXp, 100000);
    const res = getLeagueResult();
    assert.equal(res.outcome, 'promoted');
    assert.equal(res.rank, 1);
    assert.equal(res.prevTier, 0);
    assert.equal(res.tier, 1);
  });

  it('Abstieg: letzter Platz in der Vorwoche → Tier -1', () => {
    setLeague({ tier: 3, week: thisWeek(wed(0)), weekStartXp: 0, best: 3 });
    state.xp.total = 0; // keine XP → ganz hinten
    rollWeek(wed(1));
    assert.equal(state.league.tier, 2);
    assert.equal(state.league.best, 3, 'best bleibt erhalten');
    assert.equal(getLeagueResult().outcome, 'demoted');
  });

  it('Bronze: kein Abstieg unter die unterste Liga', () => {
    setLeague({ tier: 0, week: thisWeek(wed(0)), weekStartXp: 0, best: 0 });
    state.xp.total = 0;
    rollWeek(wed(1));
    assert.equal(state.league.tier, 0);
    assert.equal(getLeagueResult().outcome, 'held');
  });

  it('Diamant: kein Aufstieg über die oberste Liga', () => {
    const top = LEAGUE_TIERS.length - 1;
    setLeague({ tier: top, week: thisWeek(wed(0)), weekStartXp: 0, best: top });
    state.xp.total = 100000;
    rollWeek(wed(1));
    assert.equal(state.league.tier, top);
    assert.equal(getLeagueResult().outcome, 'held');
  });
});

describe('getLeagueSummary', () => {
  beforeEach(resetState);

  it('füllt Felder und erkennt die Aufstiegszone', () => {
    setLeague({ tier: 2, week: thisWeek(wed(0)) });
    state.xp.total = 100000; // sicher Rang 1
    const s = getLeagueSummary(wed(0));
    assert.equal(s.tier, 2);
    assert.equal(s.tierInfo.id, 'gold');
    assert.equal(s.rank, 1);
    assert.equal(s.zone, 'promotion');
    assert.equal(s.isTopTier, false);
    assert.equal(s.isBottomTier, false);
    assert.equal(s.cohortSize, COHORT_SIZE);
    assert.equal(s.promoteRank, PROMOTE_RANK);
    assert.equal(s.demoteRank, DEMOTE_RANK);
    assert.ok(s.toPromote >= 0);
    assert.ok(s.nextTier && s.nextTier.id === 'saphir');
  });

  it('unterste Liga: keine Abstiegszone trotz letztem Rang', () => {
    setLeague({ tier: 0, week: thisWeek(wed(0)) });
    state.xp.total = 0;
    const s = getLeagueSummary(wed(0));
    assert.equal(s.isBottomTier, true);
    assert.equal(s.demoteRank, 0);
    assert.notEqual(s.zone, 'demotion');
    assert.equal(s.prevTier, null);
  });
});

describe('Ergebnis-Banner & Reset', () => {
  beforeEach(resetState);

  it('getLeagueResult/clearLeagueResult: einmalig konsumierbar', () => {
    setLeague({ tier: 0, week: thisWeek(wed(0)), weekStartXp: 0, best: 0 });
    state.xp.total = 100000;
    rollWeek(wed(1));
    assert.ok(getLeagueResult());
    clearLeagueResult();
    assert.equal(getLeagueResult(), null);
  });

  it('resetLeague setzt alles auf Default', () => {
    setLeague({ tier: 4, week: 'x', weekStartXp: 99, best: 4, lastResult: { a: 1 } });
    resetLeague();
    assert.deepEqual(state.league, { tier: 0, week: null, weekStartXp: 0, best: 0, lastResult: null });
  });
});

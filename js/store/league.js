// Lokale Ligen — wöchentlicher Wettbewerb à la Duolingo, aber 100 % offline
// und ohne echte Mitspieler. Die „Kohorte" besteht aus deterministisch
// erzeugten Geist-Gegnern (synthetisch, kein Netzwerk, keine echten Personen).
// Genau das ist der Vorteil gegenüber Duolingo: der Liga-Ansporn bleibt, der
// Datenschutz-Pfeiler des Projekts (alles lokal) wird nicht angetastet.
//
// Mechanik:
//   - Jede Woche misst die Liga die in dieser Woche verdienten XP (Differenz
//     zum lifetime-Total beim Wochenstart).
//   - 14 Geist-Gegner + Du = Kohorte von 15. Geister haben ein wochen-/tier-
//     deterministisches XP-Ziel und „füllen" es im Laufe der Woche auf.
//   - Wochenende der Woche: Rang 1–5 steigt auf, Rang 11–15 steigt ab.
//
// Persistiert in state.league = { tier, week, weekStartXp, best, lastResult }.

import { state, persist } from './state.js';
import { getXp } from './xp.js';
import { currentWeekKey } from './challenges.js';
import { seededRandom } from '../util/random.js';

// Aufsteigende Liga-Stufen. `base` = typische Wochen-XP, an der die Geister
// dieser Stufe kalibriert werden (höhere Liga ⇒ stärkere Gegner).
export const LEAGUE_TIERS = Object.freeze([
  { id: 'bronze',  name: 'Bronze',  icon: '🥉', base: 150 },
  { id: 'silber',  name: 'Silber',  icon: '🥈', base: 250 },
  { id: 'gold',    name: 'Gold',    icon: '🥇', base: 400 },
  { id: 'saphir',  name: 'Saphir',  icon: '💎', base: 600 },
  { id: 'rubin',   name: 'Rubin',   icon: '🔴', base: 850 },
  { id: 'smaragd', name: 'Smaragd', icon: '🟢', base: 1150 },
  { id: 'diamant', name: 'Diamant', icon: '🔷', base: 1500 },
]);

export const COHORT_SIZE  = 15; // Du + 14 Geister
export const PROMOTE_RANK = 5;  // Rang 1..5 steigt auf
export const DEMOTE_RANK  = 11; // Rang 11..15 steigt ab

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

// Erfundene Spitznamen für die Geist-Gegner — rein synthetisch, keine echten
// Personen, keine Daten von außen.
const NAME_POOL = Object.freeze([
  'Mundart-Mia', 'Dialekt-Domi', 'Schwätzer-Schorsch', 'Plauder-Paula',
  'Babbel-Bea', 'Schnack-Sven', 'Quassel-Quirin', 'Tratsch-Tina',
  'Ratsch-Rudi', 'Klönschnack-Kai', 'Schwafel-Susi', 'Brabbel-Bert',
  'Sabbel-Sina', 'Gosch-Gustl', 'Maul-Moni', 'Schnabbel-Schani',
  'Schmus-Schorschi', 'Labber-Lena', 'Plapper-Pit', 'Sülz-Silke',
  'Schmäh-Schani', 'Mauschel-Max', 'Nuschel-Nora', 'Zungenbrecher-Zeno',
  'Lall-Lutz', 'Flunsch-Fee', 'Grummel-Gerd', 'Schwätz-Wastl',
]);

function seedFromKey(key) {
  let s = 0;
  for (let i = 0; i < key.length; i++) s = (s * 31 + key.charCodeAt(i)) >>> 0;
  return s || 1;
}

// Montag 00:00 (UTC-verankert, wie currentWeekKey) der Woche von `now`.
function weekStartMs(now) {
  const d = new Date(now);
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = (date.getUTCDay() + 6) % 7; // Mo=0 … So=6
  date.setUTCDate(date.getUTCDate() - dayNum);
  return date.getTime();
}

export function weekProgress(now = Date.now()) {
  const elapsed = now - weekStartMs(now);
  return Math.min(1, Math.max(0, elapsed / WEEK_MS));
}

function ensureLeagueState() {
  if (!state.league || typeof state.league !== 'object') {
    state.league = { tier: 0, week: null, weekStartXp: 0, best: 0, lastResult: null };
  }
  const L = state.league;
  if (typeof L.tier !== 'number' || L.tier < 0 || L.tier >= LEAGUE_TIERS.length) L.tier = 0;
  if (typeof L.weekStartXp !== 'number' || L.weekStartXp < 0) L.weekStartXp = 0;
  if (typeof L.best !== 'number' || L.best < 0) L.best = 0;
  return L;
}

// In dieser Liga-Woche verdiente XP (lifetime-Total minus Wochenstart-Snapshot).
export function getWeeklyXp(now = Date.now()) {
  const L = ensureLeagueState();
  return Math.max(0, getXp() - L.weekStartXp);
}

// Deterministische Geist-Kohorte für (Woche, Tier). `progress` skaliert das
// aktuell angezeigte XP der Geister (0 = Wochenstart, 1 = Wochenende).
function makeGhosts(weekKey, tier, progress) {
  const base = LEAGUE_TIERS[tier].base;
  const rng = seededRandom((seedFromKey(weekKey) ^ ((tier + 1) * 0x9e3779b1)) >>> 0);
  // Namen ohne Wiederholung ziehen (seeded Fisher-Yates).
  const names = NAME_POOL.slice();
  for (let i = names.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [names[i], names[j]] = [names[j], names[i]];
  }
  const ghosts = [];
  for (let i = 0; i < COHORT_SIZE - 1; i++) {
    // Wochen-Ziel streut um die Tier-Basis (≈0.45×…1.7×).
    const target = Math.round(base * (0.45 + rng() * 1.25));
    // Tempo: manche Geister legen früh los, andere spät.
    const pace = 0.7 + rng() * 0.6;
    const xp = Math.max(0, Math.round(target * Math.min(1, progress * pace)));
    ghosts.push({ name: names[i] || `Geist ${i + 1}`, xp, isUser: false });
  }
  return ghosts;
}

// Stabile Rangordnung: nach XP absteigend; bei Gleichstand steht der Nutzer
// hinter den Geistern (man muss echt überholen), Geister alphabetisch.
function sortBoard(board) {
  board.sort((a, b) => {
    if (b.xp !== a.xp) return b.xp - a.xp;
    if (a.isUser) return 1;
    if (b.isUser) return -1;
    return a.name.localeCompare(b.name);
  });
  board.forEach((e, i) => { e.rank = i + 1; });
  return board;
}

// Vollständige Rangliste der laufenden Woche (Geister + Du), sortiert + Rang.
export function getCohort(now = Date.now()) {
  const L = ensureLeagueState();
  rollWeek(now);
  const board = makeGhosts(L.week, L.tier, weekProgress(now));
  board.push({ name: 'Du', xp: getWeeklyXp(now), isUser: true });
  return sortBoard(board);
}

function zoneForRank(rank, tier) {
  const isTop = tier >= LEAGUE_TIERS.length - 1;
  const isBottom = tier <= 0;
  if (rank <= PROMOTE_RANK && !isTop) return 'promotion';
  if (rank >= DEMOTE_RANK && !isBottom) return 'demotion';
  return 'hold';
}

// Vorwoche abschließen: Endstand (progress = 1) bestimmt Auf-/Abstieg.
function finalizePreviousWeek(now) {
  const L = state.league;
  const prevWeek = L.week;
  if (!prevWeek) return null;
  const tier = L.tier;
  const weeklyXp = Math.max(0, getXp() - L.weekStartXp);
  const board = makeGhosts(prevWeek, tier, 1);
  board.push({ name: 'Du', xp: weeklyXp, isUser: true });
  sortBoard(board);
  const rank = board.find(e => e.isUser).rank;
  const zone = zoneForRank(rank, tier);
  let newTier = tier;
  if (zone === 'promotion') newTier = Math.min(LEAGUE_TIERS.length - 1, tier + 1);
  else if (zone === 'demotion') newTier = Math.max(0, tier - 1);
  const outcome = newTier > tier ? 'promoted' : newTier < tier ? 'demoted' : 'held';
  return { week: prevWeek, prevTier: tier, tier: newTier, rank, outcome, weeklyXp };
}

export function rollWeek(now = Date.now()) {
  const L = ensureLeagueState();
  const wk = currentWeekKey(new Date(now));
  if (L.week === wk) return wk;
  if (L.week) {
    const result = finalizePreviousWeek(now);
    if (result) {
      L.tier = result.tier;
      if (result.tier > L.best) L.best = result.tier;
      L.lastResult = result;
    }
  }
  L.week = wk;
  L.weekStartXp = getXp();
  persist();
  return wk;
}

// Kompakte Zusammenfassung für die UI.
export function getLeagueSummary(now = Date.now()) {
  const L = ensureLeagueState();
  const board = getCohort(now);
  const me = board.find(e => e.isUser);
  const rank = me ? me.rank : COHORT_SIZE;
  const tier = L.tier;
  const isTop = tier >= LEAGUE_TIERS.length - 1;
  const isBottom = tier <= 0;
  const zone = zoneForRank(rank, tier);
  // „Aufstiegslinie": XP, um den Rang-5-Eintrag knapp zu überholen.
  const promoteLine = board[PROMOTE_RANK - 1] ? board[PROMOTE_RANK - 1].xp : 0;
  const toPromote = isTop ? 0 : Math.max(0, promoteLine + 1 - getWeeklyXp(now));
  return {
    tier,
    tierInfo: LEAGUE_TIERS[tier],
    nextTier: isTop ? null : LEAGUE_TIERS[tier + 1],
    prevTier: isBottom ? null : LEAGUE_TIERS[tier - 1],
    best: L.best,
    bestInfo: LEAGUE_TIERS[Math.min(L.best, LEAGUE_TIERS.length - 1)],
    weeklyXp: getWeeklyXp(now),
    rank,
    cohortSize: COHORT_SIZE,
    promoteRank: isTop ? 0 : PROMOTE_RANK,
    demoteRank: isBottom ? 0 : DEMOTE_RANK,
    zone,
    isTopTier: isTop,
    isBottomTier: isBottom,
    toPromote,
    weekProgress: weekProgress(now),
    week: L.week,
  };
}

// Auf-/Abstiegs-Ergebnis der gerade beendeten Woche (einmalig konsumieren).
export function getLeagueResult() {
  const L = ensureLeagueState();
  return L.lastResult || null;
}

export function clearLeagueResult() {
  const L = ensureLeagueState();
  if (L.lastResult) { L.lastResult = null; persist(); }
}

export function initLeague(now = Date.now()) {
  ensureLeagueState();
  rollWeek(now);
}

export function resetLeague() {
  state.league = { tier: 0, week: null, weekStartXp: 0, best: 0, lastResult: null };
  persist();
}

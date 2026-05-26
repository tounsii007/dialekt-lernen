// Wöchentliche Challenges — kuratierter Pool von Lern-Aufgaben, der jede
// Woche rotiert. Drei Challenges pro Woche sind aktiv, deterministisch per
// Woche (Mo bis So gleiche Auswahl), Fortschritt wird aus dem normalen
// Lern-Flow getrackt (Hörer auf `dialekto:xp` und `setLernstand`).
//
// Scope-Filter:
//   - kategorie     → matched a.kategorie
//   - dialektId     → matched a.dialektId
//   - any           → alle Bewertungen zählen
//
// Persistiert in state.challenges = { week, progress: {id: count}, completed: [ids] }

import { state, persist } from './state.js';
import { ALLE_AUSDRUECKE } from '../../data/dialekte.js';
import { seededRandom } from '../util/random.js';
import { awardXp } from './xp.js';

// ----------------------------------------------------------------------------
// Pool der vorgefertigten Challenges. 10 Stück, querbeet durch Kategorien.
// ----------------------------------------------------------------------------
export const CHALLENGE_POOL = [
  {
    id: 'karneval-5',
    label: '5 Karneval-Ausdrücke lernen',
    hint:  'Aus der Kategorie „Feste & Bräuche".',
    target: 5,
    scope: { kategorie: 'feiern' },
    xp: 100
  },
  {
    id: 'schimpf-3',
    label: '3 Schimpf-Ausdrücke meistern',
    hint:  'Wer schimpfen kann, kann auch lieben.',
    target: 3,
    scope: { kategorie: 'schimpf' },
    xp: 80
  },
  {
    id: 'essen-10',
    label: '10 Ausdrücke rund ums Essen',
    hint:  'Brezn, Currywurst, Kässpätzle.',
    target: 10,
    scope: { kategorie: 'essen' },
    xp: 120
  },
  {
    id: 'gruss-5',
    label: '5 Begrüßungen lernen',
    hint:  'Servus, Moin, Grüezi und mehr.',
    target: 5,
    scope: { kategorie: 'begruessung' },
    xp: 80
  },
  {
    id: 'redensart-7',
    label: '7 Redensarten kennen',
    hint:  'Bildhafte Sprache aus der Region.',
    target: 7,
    scope: { kategorie: 'redensart' },
    xp: 110
  },
  {
    id: 'menschen-8',
    label: '8 Ausdrücke über Menschen',
    hint:  'Bezeichnungen, Typen, Charaktere.',
    target: 8,
    scope: { kategorie: 'menschen' },
    xp: 100
  },
  {
    id: 'bayerisch-10',
    label: '10 bayerische Ausdrücke lernen',
    hint:  'Mia san mia.',
    target: 10,
    scope: { dialektId: 'bayerisch' },
    xp: 120
  },
  {
    id: 'platt-8',
    label: '8 plattdeutsche Ausdrücke lernen',
    hint:  'Moin, Klootschießen, Pannfisch.',
    target: 8,
    scope: { dialektId: 'plattdeutsch' },
    xp: 110
  },
  {
    id: 'gefuehle-5',
    label: '5 Gefühls-Ausrufe meistern',
    hint:  'Wow, Mensch, Ach Du heilige …',
    target: 5,
    scope: { kategorie: 'gefuehle' },
    xp: 90
  },
  {
    id: 'allround-20',
    label: '20 Karten in dieser Woche',
    hint:  'Egal welcher Dialekt — Hauptsache lernen.',
    target: 20,
    scope: { any: true },
    xp: 150
  }
];

// ----------------------------------------------------------------------------
// Woche bestimmen: ISO-ähnliches "YYYY-WW" (Mo als Wochenstart).
// ----------------------------------------------------------------------------
export function currentWeekKey(d = new Date()) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Mo = 1 … So = 7 (ISO 8601)
  const dayNum = (date.getUTCDay() + 6) % 7 + 1;
  // Donnerstag derselben Woche
  date.setUTCDate(date.getUTCDate() - dayNum + 4);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
  return `${date.getUTCFullYear()}-${String(weekNo).padStart(2, '0')}`;
}

function weekSeed(weekKey) {
  // weekKey ist "YYYY-WW" — daraus eine stabile Zahl machen.
  let s = 0;
  for (let i = 0; i < weekKey.length; i++) s = (s * 31 + weekKey.charCodeAt(i)) >>> 0;
  return s || 1;
}

function ensureChallengeState() {
  if (!state.challenges || typeof state.challenges !== 'object') {
    state.challenges = { week: null, progress: {}, completed: [] };
  }
  if (!state.challenges.progress) state.challenges.progress = {};
  if (!Array.isArray(state.challenges.completed)) state.challenges.completed = [];
}

function rollWeek() {
  ensureChallengeState();
  const wk = currentWeekKey();
  if (state.challenges.week !== wk) {
    state.challenges.week = wk;
    state.challenges.progress = {};
    state.challenges.completed = [];
    persist();
  }
  return wk;
}

// ----------------------------------------------------------------------------
// Drei aktive Challenges für die laufende Woche (deterministisch).
// ----------------------------------------------------------------------------
export function getWeeklyChallenges() {
  const wk = rollWeek();
  const rng = seededRandom(weekSeed(wk));
  const pool = CHALLENGE_POOL.slice();
  // Fisher-Yates mit dem seeded RNG
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, 3);
}

export function getChallengeProgress(id) {
  ensureChallengeState();
  const def = CHALLENGE_POOL.find(c => c.id === id);
  if (!def) return { current: 0, target: 0, done: false };
  const current = state.challenges.progress[id] || 0;
  const done = current >= def.target;
  return { current, target: def.target, done };
}

// Prüft, ob ein Ausdruck zum scope einer Challenge passt.
function matchesScope(scope, ctx) {
  if (!scope) return false;
  if (scope.any) return true;
  if (scope.kategorie && ctx.kategorie === scope.kategorie) return true;
  if (scope.dialektId && ctx.dialektId === scope.dialektId) return true;
  return false;
}

// Zentrale Tracking-Funktion: wird vom Listener (xp-Event) ODER explizit von
// setLernstand aufgerufen. Erhöht Counter pro passender aktiver Challenge.
export function trackCardReview(dialektId, ausdruckId, reason) {
  ensureChallengeState();
  rollWeek();
  // Nur "bestandene" Reviews zählen — leichte/mittlere SRS-Bewertungen.
  // Reasons aus xp.js: 'card-learned' (RATING_EASY), 'card-reviewed' (RATING_HARD/MED)
  // Wir zählen beide — Aufgabe ist „lernen", nicht „perfekt erinnern".
  if (reason && reason !== 'card-learned' && reason !== 'card-reviewed') return;

  const card = ALLE_AUSDRUECKE.find(a => a.dialektId === dialektId && a.id === ausdruckId);
  if (!card) return;
  const ctx = { dialektId: card.dialektId, kategorie: card.kategorie };

  const active = getWeeklyChallenges();
  let dirty = false;
  for (const ch of active) {
    if (!matchesScope(ch.scope, ctx)) continue;
    if (state.challenges.completed.includes(ch.id)) continue;
    const prev = state.challenges.progress[ch.id] || 0;
    const next = prev + 1;
    state.challenges.progress[ch.id] = next;
    dirty = true;
    if (next >= ch.target) {
      state.challenges.completed.push(ch.id);
      awardXp(ch.xp, `challenge-${ch.id}`);
      try {
        document.dispatchEvent(new CustomEvent('dialekto:challengeComplete', {
          detail: { id: ch.id, label: ch.label, xp: ch.xp }
        }));
      } catch {}
    }
  }
  if (dirty) persist();
}

// Listener auf XP-Events anbringen — wird einmal beim App-Boot aufgerufen.
let listenerAttached = false;
export function initChallenges() {
  if (listenerAttached) return;
  listenerAttached = true;
  rollWeek();
  if (typeof document === 'undefined') return;
  document.addEventListener('dialekto:xp', (e) => {
    const d = e.detail || {};
    if (d.reason !== 'card-learned' && d.reason !== 'card-reviewed') return;
    // Wir haben hier dialektId/ausdruckId nicht direkt — aber der jüngste
    // gelernt-Eintrag wurde gerade geschrieben. Stattdessen explizit über
    // trackCardReview() aus setLernstand/reviewCard aufrufen wäre sauberer;
    // hier nutzen wir den XP-Hook als Fallback.
  });
}

// Convenience: alle Challenges samt Progress (für UI).
export function getActiveChallengesWithProgress() {
  return getWeeklyChallenges().map(ch => ({
    ...ch,
    ...getChallengeProgress(ch.id)
  }));
}

// Reset (für Tests / manueller Reset).
export function resetChallenges() {
  ensureChallengeState();
  state.challenges.week = null;
  state.challenges.progress = {};
  state.challenges.completed = [];
  persist();
}

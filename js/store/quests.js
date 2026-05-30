// Tägliche Quests — Duolingo-Style. Drei Quests pro Tag, deterministisch per
// Kalendertag rotierend, mit garantiert drei *verschiedenen* Metriken (damit
// sich der Tag abwechslungsreich anfühlt — besser als ein reiner Zufalls-Pick).
// Fortschritt wird aus dem normalen Lern-Flow getrackt: ein Listener auf
// `dialekto:xp` übersetzt XP-Reasons in Quest-Metriken. Wird eine Quest fertig,
// gibt es XP; sind alle Tages-Quests erledigt, einen Abschluss-Bonus.
//
// Metriken:
//   review       → jede Karten-Wiederholung (gelernt ODER wiederholt)
//   learn        → nur neu/leicht gelernte Karten
//   xp           → an diesem Tag gesammelte XP (Summe der Beträge)
//   quiz         → gemeisterte Quiz-Runden (mind. eine richtige Antwort)
//   quizPerfect  → fehlerfreie Quiz-Runden
//   game         → gewonnene Mini-Spiele
//
// Persistiert in state.quests = { day, progress: {id:count}, completed: [ids], allDoneBonus }

import { state, persist } from './state.js';
import { seededRandom } from '../util/random.js';
import { awardXp } from './xp.js';

// ----------------------------------------------------------------------------
// Pool der Tages-Quests. Pro Metrik mehrere Schwierigkeitsgrade.
// ----------------------------------------------------------------------------
export const QUEST_POOL = [
  { id: 'review-10', label: '10 Karten wiederholen',     hint: 'Dranbleiben zahlt sich aus.',          metric: 'review',      target: 10,  xp: 30 },
  { id: 'review-25', label: '25 Karten wiederholen',     hint: 'Ein ordentlicher Lern-Block.',         metric: 'review',      target: 25,  xp: 60 },
  { id: 'learn-5',   label: '5 neue Ausdrücke lernen',   hint: 'Frischer Wortschatz.',                 metric: 'learn',       target: 5,   xp: 40 },
  { id: 'learn-10',  label: '10 neue Ausdrücke lernen',  hint: 'Heute wächst dein Dialekt-Schatz.',    metric: 'learn',       target: 10,  xp: 70 },
  { id: 'xp-100',    label: '100 XP sammeln',            hint: 'Egal womit — Hauptsache fleißig.',     metric: 'xp',          target: 100, xp: 40 },
  { id: 'xp-200',    label: '200 XP sammeln',            hint: 'Ein produktiver Tag.',                 metric: 'xp',          target: 200, xp: 70 },
  { id: 'quiz-1',    label: 'Ein Quiz meistern',         hint: 'Wissen unter Beweis stellen.',         metric: 'quiz',        target: 1,   xp: 30 },
  { id: 'quiz-3',    label: 'Drei Quizze meistern',      hint: 'Quiz-Marathon.',                       metric: 'quiz',        target: 3,   xp: 60 },
  { id: 'perfect-1', label: 'Ein perfektes Quiz',        hint: 'Alle Antworten richtig.',              metric: 'quizPerfect', target: 1,   xp: 50 },
  { id: 'game-1',    label: 'Ein Mini-Spiel gewinnen',   hint: 'Memory & Co.',                         metric: 'game',        target: 1,   xp: 30 },
];

export const DAILY_QUEST_COUNT = 3;
export const ALL_DONE_BONUS_XP = 50;

// ----------------------------------------------------------------------------
// Kalendertag (lokal) als "YYYY-MM-DD".
// ----------------------------------------------------------------------------
export function currentDayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function daySeed(dayKey) {
  let s = 0;
  for (let i = 0; i < dayKey.length; i++) s = (s * 31 + dayKey.charCodeAt(i)) >>> 0;
  return s || 1;
}

function ensureQuestState() {
  if (!state.quests || typeof state.quests !== 'object') {
    state.quests = { day: null, progress: {}, completed: [], allDoneBonus: false };
  }
  if (!state.quests.progress || typeof state.quests.progress !== 'object') state.quests.progress = {};
  if (!Array.isArray(state.quests.completed)) state.quests.completed = [];
  if (typeof state.quests.allDoneBonus !== 'boolean') state.quests.allDoneBonus = false;
}

function rollDay() {
  ensureQuestState();
  const day = currentDayKey();
  if (state.quests.day !== day) {
    state.quests.day = day;
    state.quests.progress = {};
    state.quests.completed = [];
    state.quests.allDoneBonus = false;
    persist();
  }
  return day;
}

// ----------------------------------------------------------------------------
// Drei Tages-Quests (deterministisch), garantiert mit verschiedenen Metriken.
// ----------------------------------------------------------------------------
export function getDailyQuests() {
  const day = rollDay();
  const rng = seededRandom(daySeed(day));

  // 1) Metriken mischen und so viele verschiedene wählen, wie es Quests gibt.
  const metrics = [...new Set(QUEST_POOL.map(q => q.metric))];
  for (let i = metrics.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [metrics[i], metrics[j]] = [metrics[j], metrics[i]];
  }
  const chosenMetrics = metrics.slice(0, Math.min(DAILY_QUEST_COUNT, metrics.length));

  // 2) Pro gewählter Metrik eine konkrete Quest ziehen (seeded).
  const quests = chosenMetrics.map(metric => {
    const variants = QUEST_POOL.filter(q => q.metric === metric);
    return variants[Math.floor(rng() * variants.length)];
  });
  return quests;
}

export function getQuestProgress(id) {
  ensureQuestState();
  const def = QUEST_POOL.find(q => q.id === id);
  if (!def) return { current: 0, target: 0, done: false };
  const current = state.quests.progress[id] || 0;
  return { current: Math.min(current, def.target), target: def.target, done: current >= def.target };
}

// Kern-Tracking: erhöht alle aktiven Quests der gegebenen Metrik. Wird vom
// XP-Listener (siehe initQuests) oder direkt (Tests/explizite Hooks) gerufen.
export function trackQuestMetric(metric, amount = 1) {
  if (!metric || !(amount > 0)) return;
  ensureQuestState();
  rollDay();

  const active = getDailyQuests();
  let dirty = false;
  for (const q of active) {
    if (q.metric !== metric) continue;
    if (state.quests.completed.includes(q.id)) continue;
    const next = (state.quests.progress[q.id] || 0) + amount;
    state.quests.progress[q.id] = next;
    dirty = true;
    if (next >= q.target) {
      state.quests.completed.push(q.id);
      awardXp(q.xp, `quest-${q.id}`);
      try {
        document.dispatchEvent(new CustomEvent('dialekto:questComplete', {
          detail: { id: q.id, label: q.label, xp: q.xp }
        }));
      } catch {}
    }
  }

  // Alle Tages-Quests erledigt → einmaliger Abschluss-Bonus.
  if (!state.quests.allDoneBonus &&
      active.length > 0 &&
      active.every(q => state.quests.completed.includes(q.id))) {
    state.quests.allDoneBonus = true;
    dirty = true;
    awardXp(ALL_DONE_BONUS_XP, 'quest-bonus');
    try {
      document.dispatchEvent(new CustomEvent('dialekto:questsAllDone', {
        detail: { xp: ALL_DONE_BONUS_XP }
      }));
    } catch {}
  }

  if (dirty) persist();
}

// XP-Reason → Quest-Metriken. Eigene Belohnungs-Reasons (quest-*/challenge-*)
// werden ignoriert, damit sich der XP-Zähler nicht selbst hochschaukelt.
export function reasonToMetrics(reason, amount) {
  const out = [];
  if (reason === 'card-learned') { out.push(['learn', 1], ['review', 1]); }
  else if (reason === 'card-reviewed') { out.push(['review', 1]); }
  else if (reason === 'quiz-correct') { out.push(['quiz', 1]); }
  else if (reason === 'quiz-perfect') { out.push(['quizPerfect', 1]); }
  else if (reason === 'memory-win') { out.push(['game', 1]); }

  const r = String(reason || '');
  if (amount > 0 && !r.startsWith('quest-') && !r.startsWith('challenge-')) {
    out.push(['xp', amount]);
  }
  return out;
}

// Listener einmal beim App-Boot anbringen.
let listenerAttached = false;
export function initQuests() {
  if (listenerAttached) return;
  listenerAttached = true;
  rollDay();
  if (typeof document === 'undefined') return;
  document.addEventListener('dialekto:xp', (e) => {
    const d = e.detail || {};
    for (const [metric, amount] of reasonToMetrics(d.reason, d.amount)) {
      trackQuestMetric(metric, amount);
    }
  });
}

// Convenience für die UI: aktive Quests samt Fortschritt.
export function getActiveQuestsWithProgress() {
  return getDailyQuests().map(q => ({ ...q, ...getQuestProgress(q.id) }));
}

// Kompakte Zusammenfassung für Badges/Home.
export function getQuestsSummary() {
  const active = getActiveQuestsWithProgress();
  const done = active.filter(q => q.done).length;
  ensureQuestState();
  return {
    total: active.length,
    done,
    allDone: active.length > 0 && done === active.length,
    bonusClaimed: state.quests.allDoneBonus,
  };
}

// Reset (Tests / manueller Reset).
export function resetQuests() {
  ensureQuestState();
  state.quests.day = null;
  state.quests.progress = {};
  state.quests.completed = [];
  state.quests.allDoneBonus = false;
  persist();
}

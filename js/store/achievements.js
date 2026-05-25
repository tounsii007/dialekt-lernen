// Achievements — abgeleitet aus State, persistiert nur "freigeschaltet seit".
// Definitionen liegen im Code, Status (unlocked, unlockedAt) im localStorage.

import { state, persist } from './state.js';

export const ACHIEVEMENTS = [
  // Lernen
  { id: 'firstCard',    icon: '🌱', title: 'Erste Karte',    desc: 'Du hast deine erste Karte bewertet.',
    check: (s) => s.gelerntCount >= 1 },
  { id: 'tenCards',     icon: '🎯', title: '10 gelernt',     desc: 'Zehn Ausdrücke als gelernt markiert.',
    check: (s) => s.gelerntCount >= 10 },
  { id: 'fiftyCards',   icon: '🚀', title: '50 gelernt',     desc: 'Fünfzig Ausdrücke beherrscht — wow!',
    check: (s) => s.gelerntCount >= 50 },
  { id: 'hundredCards', icon: '👑', title: '100 gelernt',    desc: 'Hundert Ausdrücke! Profi-Liga.',
    check: (s) => s.gelerntCount >= 100 },
  { id: 'twoHundred',  icon: '🏅', title: '200 gelernt',    desc: 'Zweihundert Ausdrücke — Dialektforscher!',
    check: (s) => s.gelerntCount >= 200 },
  { id: 'fiveHundred', icon: '💎', title: '500 gelernt',    desc: 'Fünfhundert Ausdrücke — Mundartmeister!',
    check: (s) => s.gelerntCount >= 500 },
  { id: 'thousand',    icon: '🌟', title: '1000 gelernt',   desc: 'Eintausend Ausdrücke — Dialekt-Legende!',
    check: (s) => s.gelerntCount >= 1000 },
  { id: 'twoThousand', icon: '🎖️', title: '2000 gelernt',   desc: 'Zweitausend Ausdrücke — Mundart-Kenner!',
    check: (s) => s.gelerntCount >= 2000 },
  { id: 'allMaster',   icon: '🏆', title: 'Alle gelernt',    desc: 'Alle verfügbaren Ausdrücke gemeistert — der absolute Wahnsinn!',
    check: (s) => s.totalAvailable > 0 && s.gelerntCount >= s.totalAvailable },

  // Streak
  { id: 'streak3',  icon: '🔥', title: '3-Tage-Streak',  desc: 'Drei Tage in Folge gelernt.',
    check: (s) => s.streak >= 3 },
  { id: 'streak7',  icon: '🌟', title: '7-Tage-Streak',  desc: 'Eine Woche durchgezogen.',
    check: (s) => s.streak >= 7 },
  { id: 'streak30', icon: '⭐', title: '30-Tage-Streak', desc: 'Ein ganzer Monat — Disziplin pur.',
    check: (s) => s.streak >= 30 },
  { id: 'streak100',icon: '🌈', title: '100-Tage-Streak',desc: '100 Tage am Stück — legendär!',
    check: (s) => s.streak >= 100 },

  // Quiz
  { id: 'firstQuiz',    icon: '🎲', title: 'Erstes Quiz',    desc: 'Du hast dein erstes Quiz abgeschlossen.',
    check: (s) => s.quizCount >= 1 },
  { id: 'perfectQuiz',  icon: '🏆', title: 'Perfektes Quiz', desc: 'Ein Quiz mit 100% gelöst.',
    check: (s) => s.bestQuiz >= 100 },
  { id: 'tenQuizzes',   icon: '🎓', title: '10 Quizze',      desc: 'Zehn Quiz-Runden absolviert.',
    check: (s) => s.quizCount >= 10 },
  { id: 'fiftyQuizzes', icon: '🧠', title: '50 Quizze',      desc: 'Fünfzig Quizze — du bist süchtig!',
    check: (s) => s.quizCount >= 50 },

  // Explorer
  { id: 'visit3',    icon: '🗺️', title: 'Entdecker',      desc: 'Drei verschiedene Dialekte angeschaut.',
    check: (s) => s.visitedCount >= 3 },
  { id: 'visit6',    icon: '🧭', title: 'Viel-Reisender', desc: 'Sechs Dialekte besucht.',
    check: (s) => s.visitedCount >= 6 },
  { id: 'visitAll',  icon: '🌍', title: 'Welt-Reisender', desc: 'Alle Dialekte besucht.',
    check: (s) => s.visitedCount >= s.totalDialects && s.totalDialects > 0 },

  // Favoriten
  { id: 'fav5',   icon: '💖', title: '5 Favoriten',  desc: 'Fünf Ausdrücke favorisiert.',
    check: (s) => s.favCount >= 5 },
  { id: 'fav25',  icon: '🌹', title: '25 Favoriten', desc: 'Eine richtige Sammlung.',
    check: (s) => s.favCount >= 25 },
  { id: 'fav100', icon: '💐', title: '100 Favoriten',desc: 'Hundert Lieblingsausdrücke — Sammler!',
    check: (s) => s.favCount >= 100 },

  // Spezial
  { id: 'north',       icon: '⚓',  title: 'Nördlichkeit',  desc: 'Den Plattdeutsch-Dialekt besucht.',
    check: (s) => (s.visitedIds || []).includes('plattdeutsch') },
  { id: 'south',       icon: '🥨',  title: 'Südlichkeit',   desc: 'Den Bayerischen Dialekt besucht.',
    check: (s) => (s.visitedIds || []).includes('bayerisch') },
  { id: 'ruhr',        icon: '⚒️', title: 'Ruhrpottler',   desc: 'Den Ruhrpott-Dialekt entdeckt.',
    check: (s) => (s.visitedIds || []).includes('ruhrdeutsch') },
  { id: 'swiss',       icon: '🏔️', title: 'Eidgenosse',    desc: 'Schwizerdütsch besucht.',
    check: (s) => (s.visitedIds || []).includes('schwizerduetsch') },
  { id: 'fraenkisch',  icon: '🏰',  title: 'Frankenkönig',  desc: 'Den fränkischen Dialekt aus Nürnberg entdeckt.',
    check: (s) => (s.visitedIds || []).includes('fraenkisch') },
  { id: 'alemannisch', icon: '🌲',  title: 'Schwarzwäldler', desc: 'Den alemannischen Dialekt besucht.',
    check: (s) => (s.visitedIds || []).includes('alemannisch') }
];

export function markDialectVisited(id) {
  if (!Array.isArray(state.visited)) state.visited = [];
  if (!state.visited.includes(id)) {
    state.visited.push(id);
    persist();
  }
}

export function getVisitedDialects() {
  return state.visited || [];
}

/**
 * Returns array of { def, unlocked, unlockedAt, justUnlocked } given a stats object.
 * Mutates state.achievements to persist newly-unlocked entries; returns the IDs
 * unlocked in this call so the caller can celebrate.
 */
export function evaluateAchievements(stats) {
  if (!state.achievements || typeof state.achievements !== 'object') state.achievements = {};
  const ach = state.achievements;
  // visitedIds für Spezial-Achievements
  const enriched = {
    ...stats,
    visitedIds: state.visited || []
  };
  const justUnlocked = [];
  const out = ACHIEVEMENTS.map((def) => {
    const wasUnlocked = !!ach[def.id];
    let unlocked = wasUnlocked;
    if (!unlocked) {
      try { unlocked = !!def.check(enriched); } catch {}
    }
    if (!wasUnlocked && unlocked) {
      ach[def.id] = Date.now();
      justUnlocked.push(def.id);
    }
    return {
      def,
      unlocked,
      unlockedAt: ach[def.id] || null,
      justUnlocked: !wasUnlocked && unlocked
    };
  });
  if (justUnlocked.length) persist();
  return { items: out, justUnlocked };
}

/**
 * Listet alle Achievement-Definitionen mit ihrem aktuellen Status.
 * Für das Favoriten-/Statistiken-Dashboard.
 */
export function getAchievementStatus() {
  if (!state.achievements || typeof state.achievements !== 'object') state.achievements = {};
  return ACHIEVEMENTS.map(def => ({
    def,
    unlocked: !!state.achievements[def.id],
    unlockedAt: state.achievements[def.id] || null
  }));
}

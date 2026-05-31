// Achievements — abgeleitet aus State, persistiert nur "freigeschaltet seit".
// Definitionen liegen im Code, Status (unlocked, unlockedAt) im localStorage.

import { state, persist } from './state.js';

// Raritätsstufen — je seltener, desto mehr Punkte fürs Sammler-Konto.
// Reihenfolge (order) steuert die visuelle Gewichtung im UI.
export const RARITY = {
  common:    { id: 'common',    label: 'Häufig',   points: 10,  order: 0 },
  rare:      { id: 'rare',      label: 'Selten',   points: 25,  order: 1 },
  epic:      { id: 'epic',      label: 'Episch',   points: 50,  order: 2 },
  legendary: { id: 'legendary', label: 'Legendär', points: 100, order: 3 },
};

export function rarityOf(def) {
  return RARITY[def && def.rarity] || RARITY.common;
}

export const ACHIEVEMENTS = [
  // Lernen
  { id: 'firstCard',    icon: '🌱', title: 'Erste Karte',    desc: 'Du hast deine erste Karte bewertet.',
    rarity: 'common', check: (s) => s.gelerntCount >= 1 },
  { id: 'tenCards',     icon: '🎯', title: '10 gelernt',     desc: 'Zehn Ausdrücke als gelernt markiert.',
    rarity: 'common', check: (s) => s.gelerntCount >= 10 },
  { id: 'fiftyCards',   icon: '🚀', title: '50 gelernt',     desc: 'Fünfzig Ausdrücke beherrscht — wow!',
    rarity: 'rare', check: (s) => s.gelerntCount >= 50 },
  { id: 'hundredCards', icon: '👑', title: '100 gelernt',    desc: 'Hundert Ausdrücke! Profi-Liga.',
    rarity: 'rare', check: (s) => s.gelerntCount >= 100 },
  { id: 'twoHundred',  icon: '🏅', title: '200 gelernt',    desc: 'Zweihundert Ausdrücke — Dialektforscher!',
    rarity: 'epic', check: (s) => s.gelerntCount >= 200 },
  { id: 'fiveHundred', icon: '💎', title: '500 gelernt',    desc: 'Fünfhundert Ausdrücke — Mundartmeister!',
    rarity: 'epic', check: (s) => s.gelerntCount >= 500 },
  { id: 'thousand',    icon: '🌟', title: '1000 gelernt',   desc: 'Eintausend Ausdrücke — Dialekt-Legende!',
    rarity: 'legendary', check: (s) => s.gelerntCount >= 1000 },
  { id: 'twoThousand', icon: '🎖️', title: '2000 gelernt',   desc: 'Zweitausend Ausdrücke — Mundart-Kenner!',
    rarity: 'legendary', check: (s) => s.gelerntCount >= 2000 },
  { id: 'allMaster',   icon: '🏆', title: 'Alle gelernt',    desc: 'Alle verfügbaren Ausdrücke gemeistert — der absolute Wahnsinn!',
    rarity: 'legendary', check: (s) => s.totalAvailable > 0 && s.gelerntCount >= s.totalAvailable },

  // Streak
  { id: 'streak3',  icon: '🔥', title: '3-Tage-Streak',  desc: 'Drei Tage in Folge gelernt.',
    rarity: 'common', check: (s) => s.streak >= 3 },
  { id: 'streak7',  icon: '🌟', title: '7-Tage-Streak',  desc: 'Eine Woche durchgezogen.',
    rarity: 'rare', check: (s) => s.streak >= 7 },
  { id: 'streak30', icon: '⭐', title: '30-Tage-Streak', desc: 'Ein ganzer Monat — Disziplin pur.',
    rarity: 'epic', check: (s) => s.streak >= 30 },
  { id: 'streak100',icon: '🌈', title: '100-Tage-Streak',desc: '100 Tage am Stück — legendär!',
    rarity: 'legendary', check: (s) => s.streak >= 100 },

  // Quiz
  { id: 'firstQuiz',    icon: '🎲', title: 'Erstes Quiz',    desc: 'Du hast dein erstes Quiz abgeschlossen.',
    rarity: 'common', check: (s) => s.quizCount >= 1 },
  { id: 'perfectQuiz',  icon: '🏆', title: 'Perfektes Quiz', desc: 'Ein Quiz mit 100% gelöst.',
    rarity: 'rare', check: (s) => s.bestQuiz >= 100 },
  { id: 'tenQuizzes',   icon: '🎓', title: '10 Quizze',      desc: 'Zehn Quiz-Runden absolviert.',
    rarity: 'rare', check: (s) => s.quizCount >= 10 },
  { id: 'fiftyQuizzes', icon: '🧠', title: '50 Quizze',      desc: 'Fünfzig Quizze — du bist süchtig!',
    rarity: 'epic', check: (s) => s.quizCount >= 50 },

  // Explorer
  { id: 'visit3',    icon: '🗺️', title: 'Entdecker',      desc: 'Drei verschiedene Dialekte angeschaut.',
    rarity: 'common', check: (s) => s.visitedCount >= 3 },
  { id: 'visit6',    icon: '🧭', title: 'Viel-Reisender', desc: 'Sechs Dialekte besucht.',
    rarity: 'rare', check: (s) => s.visitedCount >= 6 },
  { id: 'visitAll',  icon: '🌍', title: 'Welt-Reisender', desc: 'Alle Dialekte besucht.',
    rarity: 'epic', check: (s) => s.visitedCount >= s.totalDialects && s.totalDialects > 0 },

  // Favoriten
  { id: 'fav5',   icon: '💖', title: '5 Favoriten',  desc: 'Fünf Ausdrücke favorisiert.',
    rarity: 'common', check: (s) => s.favCount >= 5 },
  { id: 'fav25',  icon: '🌹', title: '25 Favoriten', desc: 'Eine richtige Sammlung.',
    rarity: 'rare', check: (s) => s.favCount >= 25 },
  { id: 'fav100', icon: '💐', title: '100 Favoriten',desc: 'Hundert Lieblingsausdrücke — Sammler!',
    rarity: 'epic', check: (s) => s.favCount >= 100 },

  // XP / Level
  { id: 'level5',  icon: '⚡', title: 'Level 5',   desc: 'Level 5 erreicht — du sammelst fleißig XP.',
    rarity: 'rare', check: (s) => (s.level || 0) >= 5 },
  { id: 'level10', icon: '🌠', title: 'Level 10',  desc: 'Level 10 — ein wahrer XP-Magnet.',
    rarity: 'epic', check: (s) => (s.level || 0) >= 10 },
  { id: 'level20', icon: '☄️', title: 'Level 20',  desc: 'Level 20 erreicht — Mundart-Veteran.',
    rarity: 'legendary', check: (s) => (s.level || 0) >= 20 },

  // Notizen
  { id: 'firstNote', icon: '✍️', title: 'Erste Notiz',     desc: 'Eine eigene Notiz zu einem Ausdruck geschrieben.',
    rarity: 'common', check: (s) => (s.noteCount || 0) >= 1 },
  { id: 'notes10',   icon: '📓', title: 'Notizensammler',  desc: 'Zehn eigene Notizen verfasst.',
    rarity: 'rare', check: (s) => (s.noteCount || 0) >= 10 },

  // Eigene Decks
  { id: 'firstDeck', icon: '🗂️', title: 'Deck-Baumeister', desc: 'Dein erstes eigenes Deck erstellt.',
    rarity: 'common', check: (s) => (s.deckCount || 0) >= 1 },

  // Lernpfad
  { id: 'pathStart', icon: '🧗', title: 'Pfad-Pionier',  desc: 'Den ersten Dialekt auf dem Lernpfad gemeistert.',
    rarity: 'rare', check: (s) => (s.pathCompleted || 0) >= 1 },
  { id: 'pathHalf',  icon: '🏞️', title: 'Halbe Strecke',  desc: 'Die Hälfte des Lernpfads gemeistert.',
    rarity: 'epic', check: (s) => s.pathTotal > 0 && (s.pathCompleted || 0) >= Math.ceil(s.pathTotal / 2) },
  { id: 'pathAll',   icon: '🗺️', title: 'Pfad-Meister',   desc: 'Den gesamten Lernpfad abgeschlossen — alle Dialekte gemeistert!',
    rarity: 'legendary', check: (s) => s.pathTotal > 0 && (s.pathCompleted || 0) >= s.pathTotal },

  // Chest
  { id: 'chest7',  icon: '🎁', title: 'Schatzsammler', desc: 'Den Tages-Chest sieben Tage in Folge geöffnet.',
    rarity: 'rare', check: (s) => (s.chestStreak || 0) >= 7 },
  { id: 'chest30', icon: '💰', title: 'Schatzmeister',  desc: 'Dreißig Tages-Chests in Folge geöffnet.',
    rarity: 'legendary', check: (s) => (s.chestStreak || 0) >= 30 },

  // Spezial
  { id: 'north',       icon: '⚓',  title: 'Nördlichkeit',  desc: 'Den Plattdeutsch-Dialekt besucht.',
    rarity: 'common', check: (s) => (s.visitedIds || []).includes('plattdeutsch') },
  { id: 'south',       icon: '🥨',  title: 'Südlichkeit',   desc: 'Den Bayerischen Dialekt besucht.',
    rarity: 'common', check: (s) => (s.visitedIds || []).includes('bayerisch') },
  { id: 'ruhr',        icon: '⚒️', title: 'Ruhrpottler',   desc: 'Den Ruhrpott-Dialekt entdeckt.',
    rarity: 'common', check: (s) => (s.visitedIds || []).includes('ruhrdeutsch') },
  { id: 'swiss',       icon: '🏔️', title: 'Eidgenosse',    desc: 'Schwizerdütsch besucht.',
    rarity: 'common', check: (s) => (s.visitedIds || []).includes('schwizerduetsch') },
  { id: 'fraenkisch',  icon: '🏰',  title: 'Frankenkönig',  desc: 'Den fränkischen Dialekt aus Nürnberg entdeckt.',
    rarity: 'common', check: (s) => (s.visitedIds || []).includes('fraenkisch') },
  { id: 'alemannisch', icon: '🌲',  title: 'Schwarzwäldler', desc: 'Den alemannischen Dialekt besucht.',
    rarity: 'common', check: (s) => (s.visitedIds || []).includes('alemannisch') }
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

/**
 * Sammler-Punktestand: Summe der Raritätspunkte aller freigeschalteten
 * Achievements + die Aufschlüsselung pro Stufe. Fürs Dashboard.
 */
export function getAchievementScore() {
  if (!state.achievements || typeof state.achievements !== 'object') state.achievements = {};
  const byRarity = {};
  for (const key in RARITY) byRarity[key] = { unlocked: 0, total: 0 };
  let score = 0;
  let maxScore = 0;
  for (const def of ACHIEVEMENTS) {
    const r = rarityOf(def);
    byRarity[r.id].total += 1;
    maxScore += r.points;
    if (state.achievements[def.id]) {
      byRarity[r.id].unlocked += 1;
      score += r.points;
    }
  }
  return { score, maxScore, byRarity };
}

// XP & Level-System — Punkte für jede Lernaktion sammeln, Levels aufsteigen.

import { state, persist } from './state.js';

// Kumuliertes XP-Limit je Level: xpForLevel(n) = 50 * n * (n + 1)
// Das ist die XP-Schwelle, ab der Level n abgeschlossen ist (→ Aufstieg zu n+1).
// Level 1 endet bei 100, Level 2 bei 300, Level 3 bei 600, Level 4 bei 1000 …
export function xpForLevel(n) {
  return 50 * n * (n + 1);
}

// Aktuell erreichtes Level. Bereiche: Lv1 = [0,100), Lv2 = [100,300), Lv3 = [300,600) …
export function levelForXp(xp) {
  let lvl = 1;
  while (xp >= xpForLevel(lvl)) lvl++;
  return lvl;
}

export function xpToNextLevel(xp) {
  const lvl    = levelForXp(xp);
  const base   = lvl > 1 ? xpForLevel(lvl - 1) : 0; // XP-Untergrenze des aktuellen Levels
  const needed = xpForLevel(lvl);                   // XP-Schwelle zum nächsten Level
  const span   = needed - base;
  return {
    level:    lvl,
    current:  xp - base,
    needed:   span,
    progress: span > 0 ? Math.min(1, Math.max(0, (xp - base) / span)) : 0
  };
}

// XP-Werte je Aktion
export const XP = {
  cardLearned:    10,
  cardReviewed:    5,
  quizCorrect:     8,
  quizPerfect:    50,
  streakDay:      20,
  achievement:   100,
  dialectVisit:   15,
  noteWritten:     3
};

export function getXp() {
  return (state.xp && typeof state.xp.total === 'number') ? state.xp.total : 0;
}

export function awardXp(amount, reason) {
  if (!state.xp || typeof state.xp !== 'object') state.xp = { total: 0, log: [] };
  const before = state.xp.total;
  state.xp.total = (state.xp.total || 0) + amount;
  // Keep last 50 log entries
  state.xp.log = [{ amount, reason, ts: Date.now() }, ...(state.xp.log || [])].slice(0, 50);
  persist();

  const lvBefore = levelForXp(before);
  const lvAfter  = levelForXp(state.xp.total);
  const levelUp  = lvAfter > lvBefore;

  // Dispatch custom event so the UI can react (XP counter, level-up animation)
  try {
    document.dispatchEvent(new CustomEvent('dialekto:xp', { detail: { amount, reason, total: state.xp.total, levelUp, level: lvAfter } }));
  } catch {}

  return { total: state.xp.total, levelUp, level: lvAfter };
}

export function getXpLog(limit = 10) {
  return ((state.xp && state.xp.log) || []).slice(0, limit);
}

export const LEVEL_TITLES = [
  '',                // 0 — unused
  'Lehrling',       // 1
  'Entdecker',      // 2
  'Mundartfan',     // 3
  'Dialektkenner',  // 4
  'Sprachforscher', // 5
  'Mundartmeister', // 6
  'Dialektprofi',   // 7
  'Sprachgenie',    // 8
  'Dialektlegende', // 9
  'Meister der Mundarten' // 10+
];

export function getLevelTitle(level) {
  return LEVEL_TITLES[Math.min(level, LEVEL_TITLES.length - 1)] || 'Meister der Mundarten';
}

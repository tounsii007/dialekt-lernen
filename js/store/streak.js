// Tages-Streak: konsekutive Lerntage zählen.

import { state, persist } from './state.js';

const DAY_MS = 86_400_000;

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function parseKey(key) {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function dayDiff(a, b) {
  if (!a || !b) return Infinity;
  return Math.round((parseKey(b) - parseKey(a)) / DAY_MS);
}

export function registerStreak() {
  const today = todayKey();
  if (state.streak.lastDay === today) return state.streak.count;

  const diff = dayDiff(state.streak.lastDay, today);
  if (diff === 1)      state.streak.count += 1;
  else if (diff > 1)   state.streak.count  = 1;
  else                 state.streak.count  = state.streak.count || 1;

  state.streak.lastDay = today;
  persist();
  return state.streak.count;
}

export function getStreak() {
  return state.streak.count || 0;
}

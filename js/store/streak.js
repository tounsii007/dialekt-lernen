// Tages-Streak: konsekutive Lerntage zählen.

import { state, persist } from './state.js';

const DAY_MS = 86_400_000;

// Defensiv: stellt sicher, dass state.streak ein gültiges Objekt mit days-Map ist.
function ensureStreak() {
  if (!state.streak || typeof state.streak !== 'object') {
    state.streak = { count: 0, lastDay: null, days: {} };
  }
  if (!state.streak.days || typeof state.streak.days !== 'object') {
    state.streak.days = {};
  }
  return state.streak;
}

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
  const diff = (parseKey(b) - parseKey(a)) / DAY_MS;
  return Number.isFinite(diff) ? Math.round(diff) : Infinity;
}

export function registerStreak() {
  ensureStreak();
  const today = todayKey();
  // Mark today as active (idempotent).
  const wasActive = state.streak.days[today];
  state.streak.days[today] = (state.streak.days[today] || 0) + 1;

  if (state.streak.lastDay === today) {
    if (!wasActive) persist();
    return state.streak.count;
  }

  const diff = dayDiff(state.streak.lastDay, today);
  if (diff === 1)      state.streak.count += 1;
  else if (diff > 1)   state.streak.count  = 1;
  else                 state.streak.count  = state.streak.count || 1;

  state.streak.lastDay = today;
  persist();
  return state.streak.count;
}

export function getStreak() {
  return ensureStreak().count || 0;
}

// Activity counts per day for last `weeks` weeks (default 16), keyed by YYYY-M-D.
export function getStreakHeatmap(weeks = 16) {
  const days = (state.streak && state.streak.days) || {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const total = weeks * 7;
  const out = [];
  for (let i = total - 1; i >= 0; i--) {
    // Kalender-Arithmetik statt ms-Subtraktion — sonst kippt der Tag an
    // DST-Übergängen (z. B. 25h-Tag) auf das falsche Datum.
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    out.push({ date: d, key, count: days[key] || 0 });
  }
  return out;
}

// Total days the user logged in/learned (lifetime).
export function getActiveDays() {
  return Object.keys((state.streak && state.streak.days) || {}).length;
}

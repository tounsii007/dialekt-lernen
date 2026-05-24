// Tägliche Lernziele — User kann ein Tagesziel setzen (5/10/20/50 Karten)
// Fortschritt wird über den Tag getrackt und zurückgesetzt um Mitternacht.

import { state, persist } from './state.js';

const GOAL_OPTIONS = [5, 10, 20, 50];
const DEFAULT_GOAL = 10;

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function ensureGoalState() {
  if (!state.goals || typeof state.goals !== 'object') {
    state.goals = { target: DEFAULT_GOAL, progress: {}, reminderShown: {} };
  }
  if (!state.goals.progress) state.goals.progress = {};
  if (!state.goals.reminderShown) state.goals.reminderShown = {};
}

export function getGoalTarget() {
  ensureGoalState();
  return state.goals.target || DEFAULT_GOAL;
}

export function setGoalTarget(n) {
  ensureGoalState();
  state.goals.target = GOAL_OPTIONS.includes(n) ? n : DEFAULT_GOAL;
  persist();
}

export function getTodayProgress() {
  ensureGoalState();
  return state.goals.progress[todayKey()] || 0;
}

export function incrementGoalProgress(by = 1) {
  ensureGoalState();
  const key = todayKey();
  state.goals.progress[key] = (state.goals.progress[key] || 0) + by;
  // Prune old entries (keep last 30 days)
  const keys = Object.keys(state.goals.progress).sort().reverse();
  if (keys.length > 30) {
    keys.slice(30).forEach(k => delete state.goals.progress[k]);
  }
  persist();
  return state.goals.progress[key];
}

export function isGoalMet() {
  return getTodayProgress() >= getGoalTarget();
}

export function getGoalPct() {
  const progress = getTodayProgress();
  const target = getGoalTarget();
  return Math.min(1, target > 0 ? progress / target : 0);
}

export function getGoalOptions() {
  return GOAL_OPTIONS;
}

export function getProgressHistory(days = 14) {
  ensureGoalState();
  const today = new Date();
  const out = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    out.push({ date: d, count: state.goals.progress[key] || 0, met: (state.goals.progress[key] || 0) >= getGoalTarget() });
  }
  return out;
}

export { GOAL_OPTIONS, DEFAULT_GOAL };

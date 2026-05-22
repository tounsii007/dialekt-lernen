// Theme-Verwaltung (Hell / Dunkel / Auto).

import { state, persist } from './state.js';

const ORDER = ['light', 'dark', 'auto'];

export function getTheme() {
  return state.theme;
}

export function applyTheme() {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', state.theme);
}

export function setTheme(next) {
  state.theme = ORDER.includes(next) ? next : 'auto';
  persist();
  applyTheme();
}

export function cycleTheme() {
  const idx = ORDER.indexOf(state.theme);
  const next = ORDER[(idx + 1) % ORDER.length];
  setTheme(next);
  return next;
}

// Theme-Verwaltung (Hell / Dunkel / Auto)
// + Typografie-Mode (Standard / Dyslexie-freundlich).

import { state, persist } from './state.js';

const ORDER = ['light', 'dark', 'auto'];

// Typografie wird separat von Theme persistiert, damit Benutzer Theme + Font
// (z.B. Dunkel + Dyslexie-Font) frei kombinieren können.
const TYPOGRAPHY_KEY = 'dialekto:typography';
const TYPOGRAPHY_DEFAULT = 'default';
const TYPOGRAPHY_DYSLEXIC = 'dyslexic';

function safeStorage() {
  try {
    if (typeof localStorage === 'undefined') return null;
    return localStorage;
  } catch {
    return null;
  }
}

function readTypography() {
  const store = safeStorage();
  if (!store) return TYPOGRAPHY_DEFAULT;
  try {
    const raw = store.getItem(TYPOGRAPHY_KEY);
    if (raw === TYPOGRAPHY_DYSLEXIC) return TYPOGRAPHY_DYSLEXIC;
  } catch { /* ignore */ }
  return TYPOGRAPHY_DEFAULT;
}

function writeTypography(value) {
  const store = safeStorage();
  if (!store) return;
  try {
    store.setItem(TYPOGRAPHY_KEY, value);
  } catch { /* ignore */ }
}

export function getTheme() {
  return state.theme;
}

export function applyTheme() {
  if (typeof document === 'undefined') return;
  // Migration: der entfernte „Hoher Kontrast"-Modus fällt auf „auto" zurück.
  if (!ORDER.includes(state.theme)) { state.theme = 'auto'; try { persist(); } catch {} }
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

// --- Typografie (Dyslexie-Modus) -------------------------------------------

export function getTypography() {
  return readTypography();
}

export function applyTypography() {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-typography', readTypography());
}

export function setTypography(next) {
  const value = next === TYPOGRAPHY_DYSLEXIC ? TYPOGRAPHY_DYSLEXIC : TYPOGRAPHY_DEFAULT;
  writeTypography(value);
  applyTypography();
}

/**
 * Wechselt zwischen Standard-Font und Dyslexie-Font.
 * Liefert die nun aktive Wahl zurück.
 */
export function toggleDyslexicFont() {
  const next = readTypography() === TYPOGRAPHY_DYSLEXIC
    ? TYPOGRAPHY_DEFAULT
    : TYPOGRAPHY_DYSLEXIC;
  setTypography(next);
  return next;
}

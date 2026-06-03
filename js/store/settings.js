// Nutzer-Einstellungen, die nicht in spezialisierten Stores leben:
//   - animations: Bewegungen/Übergänge global an/aus (ergänzt prefers-reduced-motion)
//   - explanationLang: Sprache, in der Ausdrucks-Erklärungen angezeigt werden
//     (Default 'de' = Original). Wird vom Erklärungs-Lokalisierungs-Feature genutzt.
//
// Persistiert im zentralen State (state.settings).

import { state, persist } from './state.js';

export const EXPLANATION_LANGS = ['de', 'en', 'tr', 'fr', 'es'];

function ensure() {
  if (!state.settings || typeof state.settings !== 'object' || Array.isArray(state.settings)) {
    state.settings = {};
  }
  return state.settings;
}

// --- Animationen -------------------------------------------------------------

/** Default an (true), nur explizit false schaltet ab. */
export function getAnimationsEnabled() {
  const s = ensure();
  return s.animations !== false;
}

export function setAnimationsEnabled(on) {
  ensure().animations = !!on;
  persist();
  applyAnimations();
  return getAnimationsEnabled();
}

/** Setzt `<html data-anim="on|off">` — CSS reduziert bei "off" alle Animationen/Transitions. */
export function applyAnimations() {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.anim = getAnimationsEnabled() ? 'on' : 'off';
}

// --- Erklärungs-Sprache ------------------------------------------------------

export function getExplanationLang() {
  const s = ensure();
  return EXPLANATION_LANGS.includes(s.explanationLang) ? s.explanationLang : 'de';
}

export function setExplanationLang(lang) {
  ensure().explanationLang = EXPLANATION_LANGS.includes(lang) ? lang : 'de';
  persist();
  return getExplanationLang();
}

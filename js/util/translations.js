// Lädt übersetzte Ausdrucks-Erklärungen (bedeutung) für die gewählte
// Erklärungs-Sprache und liefert sie synchron fürs Rendering.
//
// Daten liegen in data/translations/<lang>.js (Key = `<dialektId>.<ausdruckId>`).
// Lazy geladen + gecached. Fehlt ein Key (oder Sprache = de), wird null geliefert
// → der Aufrufer fällt auf die deutsche Original-bedeutung zurück.

import { getExplanationLang } from '../store/settings.js';

let activeLang = 'de';
let activeMap = null;
const cache = { de: null };

export function getActiveExplanationLang() {
  return activeLang;
}

/**
 * (Re)lädt die Übersetzungs-Map passend zur aktuellen Erklärungs-Sprache.
 * Idempotent + gecached. Sollte vor dem (Neu-)Rendern aufgerufen werden.
 */
export async function initTranslations() {
  const lang = getExplanationLang();
  activeLang = lang;
  if (lang === 'de') { activeMap = null; return; }
  if (Object.prototype.hasOwnProperty.call(cache, lang)) {
    activeMap = cache[lang];
    return;
  }
  try {
    const mod = await import(`../../data/translations/${lang}.js`);
    cache[lang] = (mod && mod.default && typeof mod.default === 'object') ? mod.default : {};
  } catch {
    cache[lang] = {}; // Datei fehlt/fehlerhaft → leere Map (Fallback auf Deutsch)
  }
  activeMap = cache[lang];
}

/**
 * Übersetzte bedeutung für einen Ausdruck in der aktiven Sprache — oder null,
 * wenn nicht übersetzt / Sprache = de.
 */
export function translatedBedeutung(dialektId, ausdruckId) {
  if (!activeMap || activeLang === 'de') return null;
  return activeMap[`${dialektId}.${ausdruckId}`] || null;
}

// Korrektur-Vorschläge (lokal): Benutzer können Edit-Vorschläge zu Ausdrücken sammeln.
// Wichtig: Der Datenbestand wird NICHT mutiert — Vorschläge sind nur Drafts.
// Sie können als JSON exportiert und z. B. via GitHub-PR eingereicht werden.

import { state, persist } from './state.js';

const ALLOWED_FIELDS = new Set([
  'ausdruck',
  'hochdeutsch',
  'beispiel',
  'beispiel_hd',
  'bedeutung'
]);

const STATUS_PENDING = 'pending';

function ensure() {
  if (!Array.isArray(state.suggestions)) state.suggestions = [];
  return state.suggestions;
}

function makeId() {
  return 'sug_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

/**
 * addSuggestion — Vorschlag lokal speichern.
 * @param {{ dialektId, id, field, currentValue, proposedValue, note? }} opts
 * @returns {string|null} suggId oder null wenn ungültig.
 */
export function addSuggestion({ dialektId, id, field, currentValue = '', proposedValue, note = '' } = {}) {
  const list = ensure();
  const cleanDialektId = String(dialektId || '').trim();
  const cleanId = String(id || '').trim();
  const cleanField = String(field || '').trim();
  if (!cleanDialektId || !cleanId || !ALLOWED_FIELDS.has(cleanField)) return null;
  if (proposedValue == null) return null;
  const proposed = String(proposedValue);
  // Wenn nichts geändert wurde, kein Vorschlag.
  if (String(currentValue ?? '') === proposed) return null;

  const suggId = makeId();
  list.push({
    suggId,
    dialektId: cleanDialektId,
    id: cleanId,
    field: cleanField,
    currentValue: String(currentValue ?? ''),
    proposedValue: proposed,
    note: String(note || '').slice(0, 500),
    createdAt: Date.now(),
    status: STATUS_PENDING
  });
  persist();
  return suggId;
}

/**
 * getSuggestions — alle Vorschläge (neueste zuerst).
 * @returns {Array<object>}
 */
export function getSuggestions() {
  return ensure().slice().sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

/**
 * getSuggestionsFor — alle Vorschläge für einen bestimmten Ausdruck.
 */
export function getSuggestionsFor(dialektId, ausdruckId) {
  return ensure().filter(s => s.dialektId === dialektId && s.id === ausdruckId);
}

/**
 * removeSuggestion — Vorschlag löschen.
 */
export function removeSuggestion(suggId) {
  const list = ensure();
  const idx = list.findIndex(s => s.suggId === suggId);
  if (idx < 0) return false;
  list.splice(idx, 1);
  persist();
  return true;
}

/**
 * countSuggestions — wie viele Vorschläge?
 */
export function countSuggestions() {
  return ensure().length;
}

/**
 * exportSuggestionsAsJson — alle Vorschläge als JSON-String.
 * Format ist auf Pull-Request-Einreichung optimiert (geöffnet vom User).
 */
export function exportSuggestionsAsJson() {
  const items = getSuggestions().map(s => ({
    dialektId: s.dialektId,
    id: s.id,
    field: s.field,
    currentValue: s.currentValue,
    proposedValue: s.proposedValue,
    note: s.note || undefined,
    createdAt: new Date(s.createdAt || Date.now()).toISOString()
  }));
  const payload = {
    format: 'dialekto-suggestions',
    version: 1,
    exportedAt: new Date().toISOString(),
    count: items.length,
    suggestions: items
  };
  return JSON.stringify(payload, null, 2);
}

// Persönliche Notizen pro Ausdruck.
// Speichert pro Ausdruck einen Text-String — limitiert auf ~280 Zeichen.

import { state, persist, favKey } from './state.js';

const MAX_LEN = 280;

function ensure() {
  if (!state.notes || typeof state.notes !== 'object') state.notes = {};
  return state.notes;
}

export function getNote(dialektId, ausdruckId) {
  return ensure()[favKey(dialektId, ausdruckId)] || '';
}

export function setNote(dialektId, ausdruckId, text) {
  const notes = ensure();
  const k = favKey(dialektId, ausdruckId);
  const v = String(text || '').slice(0, MAX_LEN).trim();
  if (!v) delete notes[k];
  else notes[k] = v;
  persist();
}

export function countNotes() {
  return Object.keys(ensure()).length;
}

export function getAllNotes() {
  return { ...ensure() };
}

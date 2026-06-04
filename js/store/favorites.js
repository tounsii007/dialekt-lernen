// Favoriten: Persistierte Liste von (dialektId, ausdruckId)-Paaren.
// Lokal-first; wenn das Backend verbunden ist, werden Änderungen dorthin
// gespiegelt (write-through) und beim Start von dort gemerged (read-sync).

import { state, persist, favKey } from './state.js';
import { favoriten as apiFavoriten } from '../util/api.js';
import { ALLE_AUSDRUECKE } from '../../data/dialekte.js';

function backendOnline() {
  return !!(globalThis.window && globalThis.window.__dialektoBackend
    && globalThis.window.__dialektoBackend.online);
}

// Lazy-Map ausdruckId → dialektId (Backend kennt nur die ausdruckId).
let _ausdruckDialekt = null;
function dialektOf(ausdruckId) {
  if (!_ausdruckDialekt) {
    _ausdruckDialekt = new Map(ALLE_AUSDRUECKE.map(a => [a.id, a.dialektId]));
  }
  return _ausdruckDialekt.get(ausdruckId) || null;
}

// Bewertung/Favorit ans Backend spiegeln (fire-and-forget, Fehler verschluckt).
function syncToBackend(ausdruckId, added) {
  try {
    if (!backendOnline()) return;
    const p = added ? apiFavoriten.add(ausdruckId) : apiFavoriten.remove(ausdruckId);
    Promise.resolve(p).catch(() => {});
  } catch { /* ignore */ }
}

// Defensiv: liefert immer ein Array, auch wenn state.favoriten korrupt ist.
function favs() {
  if (!Array.isArray(state.favoriten)) state.favoriten = [];
  return state.favoriten;
}

export function isFavorit(dialektId, ausdruckId) {
  if (!dialektId || !ausdruckId) return false;
  return favs().includes(favKey(dialektId, ausdruckId));
}

export function toggleFavorit(dialektId, ausdruckId) {
  if (!dialektId || !ausdruckId) return false;
  const list = favs();
  const key = favKey(dialektId, ausdruckId);
  const idx = list.indexOf(key);
  const added = idx < 0;
  if (added) list.push(key);
  else       list.splice(idx, 1);
  persist();
  syncToBackend(ausdruckId, added);  // write-through (nur wenn Backend online)
  return added;
}

/**
 * Lädt die Favoriten des Nutzers vom Backend und merged sie in den lokalen
 * Store (Union). No-op, wenn das Backend offline ist.
 * @returns {Promise<boolean>} true, wenn lokal etwas ergänzt wurde
 */
export async function syncFavoritenFromBackend() {
  if (!backendOnline()) return false;
  try {
    const remote = await apiFavoriten.list();  // [{ ausdruckId, createdAt }]
    const list = favs();
    let changed = false;
    for (const f of remote) {
      const dialektId = dialektOf(f.ausdruckId);
      if (!dialektId) continue;
      const key = favKey(dialektId, f.ausdruckId);
      if (!list.includes(key)) { list.push(key); changed = true; }
    }
    if (changed) persist();
    return changed;
  } catch {
    return false;
  }
}

export function getFavoriten() {
  return favs().map(key => {
    // Robust gegen Nicht-String-Einträge (z. B. Legacy-Objekte aus Importen).
    const s = String(key);
    const dot = s.indexOf('.');
    if (dot < 0) return { dialektId: s, ausdruckId: '' };
    return { dialektId: s.slice(0, dot), ausdruckId: s.slice(dot + 1) };
  });
}

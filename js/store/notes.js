// Persönliche Notizen pro Ausdruck.
// Speichert pro Ausdruck einen Text-String — limitiert auf ~280 Zeichen.
//
// Persistierung: standardmäßig in `state.notes` (localStorage). Zusätzlich
// schreiben wir Notizen — wenn IndexedDB verfügbar ist — in den
// `notes`-Store unter `dialekto-data`, damit künftige Versionen größere
// Notiz-Mengen oder Anhänge (Audio) effizient speichern können.
//
// Strategie:
//   - getNote(): zuerst IDB versuchen (asynchron, opportunistisch via Cache),
//     synchron immer aus state.notes liefern. Damit bleiben bestehende UI-
//     Aufrufer rückwärtskompatibel.
//   - setNote(): schreibt in state.notes (synchron, persist()) UND in IDB
//     (fire-and-forget).
//   - Beim ersten Aufruf von getNote/setNote läuft `migrateNotesToIDB()`
//     einmalig: alle vorhandenen state.notes werden in IDB gespiegelt und
//     `state.notesIdbMigrated = true` markiert.

import { state, persist, favKey } from './state.js';
import * as idb from '../util/indexed-db.js';

const MAX_LEN = 280;

function ensure() {
  if (!state.notes || typeof state.notes !== 'object') state.notes = {};
  return state.notes;
}

// Synchroner Lese-Cache für IDB-Werte. Wird beim ersten getNote-Aufruf
// pro Schlüssel async gefüllt; nachfolgende Aufrufe profitieren davon
// (z.B. wenn jemand state.notes manuell leert, IDB aber Daten hat).
const idbCache = new Map();
let migrationStarted = false;
let migrationPromise = null;

/**
 * Einmalige Migration: alle Notizen aus localStorage in IDB spiegeln.
 * Idempotent — `state.notesIdbMigrated` verhindert Mehrfach-Läufe.
 * Wenn IDB nicht verfügbar ist, no-op (und Flag bleibt false, damit
 * eine spätere Umgebung erneut migrieren kann).
 */
export async function migrateNotesToIDB() {
  if (state.notesIdbMigrated) return { ok: true, migrated: 0, skipped: true };
  if (!idb.isSupported()) return { ok: false, reason: 'idb-unavailable' };
  try {
    const notes = ensure();
    let count = 0;
    for (const [k, v] of Object.entries(notes)) {
      if (typeof v !== 'string' || !v) continue;
      await idb.put(idb.STORE_NOTES, v, k);
      idbCache.set(k, v);
      count += 1;
    }
    state.notesIdbMigrated = true;
    try { persist(); } catch {}
    return { ok: true, migrated: count };
  } catch (err) {
    return { ok: false, reason: String(err && err.message || err) };
  }
}

function kickMigrationOnce() {
  if (migrationStarted) return migrationPromise;
  migrationStarted = true;
  if (!idb.isSupported()) {
    migrationPromise = Promise.resolve({ ok: false, reason: 'idb-unavailable' });
    return migrationPromise;
  }
  migrationPromise = migrateNotesToIDB().catch((err) => ({ ok: false, reason: String(err) }));
  return migrationPromise;
}

// Opportunistisches Vorladen für einen Schlüssel — füllt den Cache.
function warmIdbCache(k) {
  if (!idb.isSupported()) return;
  if (idbCache.has(k)) return;
  // Fire-and-forget: blockiert getNote nie.
  idb.get(idb.STORE_NOTES, k).then((v) => {
    if (typeof v === 'string') idbCache.set(k, v);
  }).catch(() => {});
}

/**
 * Liefert die Notiz synchron — bevorzugt aus state.notes (rückwärtskompatibel),
 * fällt auf IDB-Cache zurück. Stößt nebenher Migration & IDB-Warmup an.
 */
export function getNote(dialektId, ausdruckId) {
  kickMigrationOnce();
  const k = favKey(dialektId, ausdruckId);
  const fromState = ensure()[k];
  if (typeof fromState === 'string' && fromState) return fromState;
  // Fallback: ggf. aus dem IDB-Cache (kann beim ersten Aufruf leer sein —
  // warmIdbCache füllt ihn asynchron für spätere Aufrufe).
  warmIdbCache(k);
  return idbCache.get(k) || '';
}

/**
 * Async-Variante: liefert IDB-Wert verlässlich (falls vorhanden), sonst
 * state.notes. Nützlich, wenn Caller explizit auf IDB warten möchte.
 */
export async function getNoteAsync(dialektId, ausdruckId) {
  await kickMigrationOnce();
  const k = favKey(dialektId, ausdruckId);
  if (idb.isSupported()) {
    try {
      const v = await idb.get(idb.STORE_NOTES, k);
      if (typeof v === 'string' && v) {
        idbCache.set(k, v);
        return v;
      }
    } catch {}
  }
  return ensure()[k] || '';
}

export function setNote(dialektId, ausdruckId, text) {
  kickMigrationOnce();
  const notes = ensure();
  const k = favKey(dialektId, ausdruckId);
  const v = String(text || '').slice(0, MAX_LEN).trim();
  if (!v) {
    delete notes[k];
    idbCache.delete(k);
    if (idb.isSupported()) idb.del(idb.STORE_NOTES, k).catch(() => {});
  } else {
    notes[k] = v;
    idbCache.set(k, v);
    if (idb.isSupported()) idb.put(idb.STORE_NOTES, v, k).catch(() => {});
  }
  persist();
}

export function countNotes() {
  return Object.keys(ensure()).length;
}

export function getAllNotes() {
  return { ...ensure() };
}

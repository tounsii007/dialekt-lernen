// Host-Wrapper für den SRS-Worker.
// API: reviewCardAsync(card, rating) → Promise<updatedCard>
//
// - Lädt `srs-worker.js` als Module-Worker.
// - Wenn Web Worker nicht unterstützt sind (Node-Tests, alte Browser),
//   fällt die API auf eine synchrone Berechnung via `getSrsAlgorithm()`
//   zurück.
// - Der Wrapper triggert KEINE State-Persistierung. Der Caller ist dafür
//   zuständig, das Ergebnis bei Bedarf via `js/store/srs.js#reviewCard`
//   nachzuziehen (z.B. für XP, Streak, Goals). Diese Trennung ist Absicht:
//   der Worker liefert nur die reine SM-2-Mathematik.

import { getSrsAlgorithm } from '../store/srs.js';

let workerInstance = null;
let pendingId = 0;
const pending = new Map();
let workerSupported = null; // tri-state: null=unknown, true/false

function canUseWorker() {
  if (workerSupported !== null) return workerSupported;
  try {
    workerSupported = typeof Worker !== 'undefined'
      && typeof URL !== 'undefined'
      && typeof URL.prototype === 'object';
    return workerSupported;
  } catch {
    workerSupported = false;
    return false;
  }
}

function getWorker() {
  if (workerInstance) return workerInstance;
  if (!canUseWorker()) return null;
  try {
    workerInstance = new Worker(
      new URL('./srs-worker.js', import.meta.url),
      { type: 'module' }
    );
    workerInstance.addEventListener('message', (e) => {
      const data = e.data || {};
      const entry = pending.get(data.id);
      if (!entry) return;
      pending.delete(data.id);
      if (data.event === 'error') {
        entry.reject(new Error(data.message || 'srs-worker error'));
      } else {
        entry.resolve(data);
      }
    });
    workerInstance.addEventListener('error', (err) => {
      // Bei fatalem Worker-Fehler alle offenen Promises rejecten und Worker verwerfen.
      for (const entry of pending.values()) entry.reject(err);
      pending.clear();
      workerInstance = null;
      workerSupported = false;
    });
    return workerInstance;
  } catch {
    workerSupported = false;
    workerInstance = null;
    return null;
  }
}

function syncReview(card, rating) {
  const algo = getSrsAlgorithm();
  const prev = (card && card._srs) || null;
  const srs = algo.review(prev, rating);
  return { ...(card || {}), _srs: srs };
}

/**
 * Asynchrones SM-2-Update.
 * @param {object} card  Die Karte. Optional mit `_srs`-Feld (voriger Record).
 * @param {1|2|3} rating
 * @returns {Promise<object>} updatedCard mit `_srs`
 */
export function reviewCardAsync(card, rating) {
  const w = getWorker();
  if (!w) {
    // Fallback: synchrone Berechnung in einem aufgelösten Promise.
    try {
      return Promise.resolve(syncReview(card, rating));
    } catch (err) {
      return Promise.reject(err);
    }
  }
  const id = ++pendingId;
  return new Promise((resolve, reject) => {
    pending.set(id, {
      resolve: (data) => resolve(data.updatedCard),
      reject
    });
    try {
      w.postMessage({ event: 'review', card, rating, id });
    } catch (err) {
      pending.delete(id);
      reject(err);
    }
  });
}

/**
 * Beendet den Worker (z.B. für Tests oder Cleanup).
 */
export function terminateSrsWorker() {
  if (workerInstance) {
    try { workerInstance.terminate(); } catch {}
    workerInstance = null;
  }
  pending.clear();
}

/**
 * Nur für Tests / Diagnose: gibt zurück, ob ein Worker läuft.
 */
export function isWorkerActive() {
  return workerInstance != null;
}

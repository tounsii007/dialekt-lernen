// Backend-Sync für den Gamification-Fortschritt (XP/Streak).
//
// XP wird bidirektional gemerged (max), Streak/lastActive werden ans Backend
// gepusht (das Frontend bleibt für die datumsbasierte Streak-Logik führend).
// Der Push läuft event-basiert (dialekto:xp / dialekto:streak) und entkoppelt
// per Debounce — so entsteht kein Import-Zyklus mit xp.js/streak.js.

import { state, persist } from './state.js';
import { getXp } from './xp.js';
import { getStreak } from './streak.js';
import { progress as apiProgress } from '../util/api.js';

function backendOnline() {
  return !!(globalThis.window && globalThis.window.__dialektoBackend
    && globalThis.window.__dialektoBackend.online);
}

function todayIso() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-`
    + `${String(d.getDate()).padStart(2, '0')}`;
}

/** Pusht den aktuellen XP/Streak-Stand ans Backend (fire-and-forget). */
export function pushProgress() {
  try {
    if (!backendOnline()) return;
    Promise.resolve(
      apiProgress.put({ xp: getXp(), streak: getStreak(), lastActive: todayIso() })
    ).catch(() => {});
  } catch { /* ignore */ }
}

let _pushTimer = null;
function schedulePush() {
  if (!backendOnline()) return;
  clearTimeout(_pushTimer);
  _pushTimer = setTimeout(pushProgress, 2000); // Debounce: Schreib-Spam vermeiden
}

/** Hört auf XP-/Streak-Änderungen und pusht sie (entkoppelt). */
export function initProgressSync() {
  document.addEventListener('dialekto:xp', schedulePush);
  document.addEventListener('dialekto:streak', schedulePush);
}

/**
 * Holt den Backend-Stand und merged XP per max() in den lokalen Store.
 * @returns {Promise<boolean>} true, wenn lokal etwas geändert wurde
 */
export async function syncProgressFromBackend() {
  if (!backendOnline()) return false;
  let remote;
  try {
    remote = await apiProgress.get();
  } catch {
    return false;
  }
  if (!remote) return false;
  const remoteXp = Number(remote.xp) || 0;
  if (remoteXp > getXp()) {
    if (!state.xp || typeof state.xp !== 'object') state.xp = { total: 0, log: [] };
    state.xp.total = remoteXp;
    persist();
    return true;
  }
  return false;
}

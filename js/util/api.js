// Dialekto · REST-Client für das Java-Backend.
//
// Identifiziert den Nutzer über eine anonyme Geräte-ID (UUID in localStorage);
// echte Accounts/Login folgen später. Alle Aufrufe haben einen Timeout und
// werfen bei Fehlern — die Aufrufer können so auf die lokalen Daten zurückfallen
// (Offline-/Backend-aus-Fallback), bis die Views vollständig umgestellt sind.

const LS_BASE   = 'dialekto.apiBase';
const LS_DEVICE = 'dialekto.deviceId';
const LS_USER   = 'dialekto.userId';

// Default-Backend-Adresse: im lokalen Dev (Frontend-Server auf :5173) läuft das
// Backend separat auf :8080; im Docker-/Prod-Setup proxyt nginx /api an das
// Backend → dann same-origin (leere Basis). Per localStorage überschreibbar.
function defaultBase() {
  try {
    if (location.port === '5173') return 'http://localhost:8080';
  } catch { /* ignore */ }
  return '';
}

function lsGet(k) { try { return localStorage.getItem(k); } catch { return null; } }
function lsSet(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } }

export function getApiBase() { return lsGet(LS_BASE) || defaultBase(); }
export function setApiBase(url) { lsSet(LS_BASE, url); }

/** Anonyme, stabile Geräte-ID (wird bei Bedarf erzeugt). */
export function getDeviceId() {
  let id = lsGet(LS_DEVICE);
  if (!id) {
    id = (globalThis.crypto && crypto.randomUUID)
      ? crypto.randomUUID()
      : 'dev-' + Date.now().toString(36) + '-' + Math.random().toString(16).slice(2);
    lsSet(LS_DEVICE, id);
  }
  return id;
}

export function getCachedUserId() { return lsGet(LS_USER); }

async function request(path, { method = 'GET', body, timeout = 6000 } = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeout);
  try {
    const res = await fetch(getApiBase() + path, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} bei ${path}`);
    if (res.status === 204) return null;
    const ct = res.headers.get('content-type') || '';
    return ct.includes('application/json') ? res.json() : res.text();
  } finally {
    clearTimeout(timer);
  }
}

export function health() { return request('/actuator/health', { timeout: 3000 }); }

/** Legt den Nutzer zur Geräte-ID an (oder findet ihn) und cached die User-ID. */
export async function registerUser() {
  const data = await request('/api/users', { method: 'POST', body: { deviceId: getDeviceId() } });
  if (data && data.id) lsSet(LS_USER, data.id);
  return data;
}

/** Liefert die User-ID (registriert bei Bedarf). */
export async function ensureUserId() {
  return getCachedUserId() || (await registerUser())?.id;
}

export const dialekte = {
  all: () => request('/api/dialekte'),
  one: (id) => request(`/api/dialekte/${encodeURIComponent(id)}`),
  ausdruecke: (id) => request(`/api/dialekte/${encodeURIComponent(id)}/ausdruecke`),
};

export const ausdruecke = {
  one: (id) => request(`/api/ausdruecke/${encodeURIComponent(id)}`),
  search: (q, page = 0, size = 20) =>
    request(`/api/ausdruecke/search?q=${encodeURIComponent(q)}&page=${page}&size=${size}`),
};

export const favoriten = {
  list:   async () => request(`/api/users/${await ensureUserId()}/favoriten`),
  add:    async (ausdruckId) =>
    request(`/api/users/${await ensureUserId()}/favoriten/${encodeURIComponent(ausdruckId)}`, { method: 'PUT' }),
  remove: async (ausdruckId) =>
    request(`/api/users/${await ensureUserId()}/favoriten/${encodeURIComponent(ausdruckId)}`, { method: 'DELETE' }),
};

export const lernstand = {
  list:    async () => request(`/api/users/${await ensureUserId()}/lernstand`),
  faellig: async (limit = 50) =>
    request(`/api/users/${await ensureUserId()}/lernstand/faellig?limit=${limit}`),
  // rating: 1 = schwer, 2 = mittel, 3 = leicht (wie js/store/srs.js)
  bewerten: async (ausdruckId, rating) =>
    request(`/api/users/${await ensureUserId()}/lernstand/${encodeURIComponent(ausdruckId)}/bewerten`,
      { method: 'POST', body: { rating } }),
};

// Einmaliger Erreichbarkeits-Check (für Fallback-Entscheidungen). Cacht das
// Ergebnis für die Sitzung; mit force=true neu prüfen.
let _available = null;
export async function isBackendAvailable(force = false) {
  if (!force && _available !== null) return _available;
  try { await health(); _available = true; }
  catch { _available = false; }
  return _available;
}

// Import / Export des User-States als JSON.
// Reset-Funktion + Share-Links für Quiz-Resultate.

import { state, persist } from './state.js';

const FORMAT_VERSION = 1;

// Liefert ein JSON-serialisierbares Snapshot mit Metadaten.
export function exportState() {
  return {
    format: 'dialekto',
    version: FORMAT_VERSION,
    exportedAt: new Date().toISOString(),
    data: {
      theme:        state.theme,
      favoriten:    state.favoriten,
      gelernt:      state.gelernt,
      streak:       state.streak,
      quizHistory:  state.quizHistory,
      lernStats:    state.lernStats,
      visited:      state.visited,
      achievements: state.achievements,
      onboarded:    state.onboarded,
      preset:       state.preset,
      notes:        state.notes
    }
  };
}

export function exportStateAsString() {
  return JSON.stringify(exportState(), null, 2);
}

// Triggert einen Datei-Download im Browser.
export function downloadStateFile() {
  const blob = new Blob([exportStateAsString()], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const stamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  a.href = url;
  a.download = `dialekto-backup-${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}

// Validiert und importiert ein Snapshot. Liefert {ok, error?}.
export function importState(jsonOrObject, { strategy = 'replace' } = {}) {
  try {
    const obj = typeof jsonOrObject === 'string' ? JSON.parse(jsonOrObject) : jsonOrObject;
    if (!obj || obj.format !== 'dialekto') {
      return { ok: false, error: 'Format unbekannt (erwartet dialekto-Snapshot).' };
    }
    if (!obj.data || typeof obj.data !== 'object') {
      return { ok: false, error: 'Keine data-Sektion gefunden.' };
    }
    const d = obj.data;

    if (strategy === 'merge') {
      // Merge favoriten (uniq), gelernt (key-wise neueste), quizHistory (chronologisch)
      if (Array.isArray(d.favoriten)) {
        const setKeys = new Set((state.favoriten || []).map(f => `${f.dialektId}.${f.ausdruckId}`));
        for (const f of d.favoriten) {
          const k = `${f.dialektId}.${f.ausdruckId}`;
          if (!setKeys.has(k)) state.favoriten.push(f);
        }
      }
      if (d.gelernt && typeof d.gelernt === 'object') {
        for (const k of Object.keys(d.gelernt)) {
          const existing = state.gelernt[k];
          const incoming = d.gelernt[k];
          if (!existing) state.gelernt[k] = incoming;
          else if ((incoming.last || 0) > (existing.last || 0)) state.gelernt[k] = incoming;
        }
      }
      if (Array.isArray(d.quizHistory)) {
        const seen = new Set(state.quizHistory.map(h => h.date));
        for (const h of d.quizHistory) if (!seen.has(h.date)) state.quizHistory.push(h);
        state.quizHistory.sort((a, b) => (a.date || 0) - (b.date || 0));
      }
      if (Array.isArray(d.visited)) {
        const s = new Set(state.visited || []);
        for (const v of d.visited) s.add(v);
        state.visited = Array.from(s);
      }
      if (d.streak?.days) {
        state.streak = state.streak || { count: 0, lastDay: null, days: {} };
        state.streak.days = state.streak.days || {};
        for (const k of Object.keys(d.streak.days)) {
          state.streak.days[k] = Math.max(state.streak.days[k] || 0, d.streak.days[k] || 0);
        }
      }
      if (d.achievements) state.achievements = { ...d.achievements, ...state.achievements };
    } else {
      // replace
      if (d.theme        != null) state.theme        = d.theme;
      if (Array.isArray(d.favoriten)) state.favoriten = d.favoriten;
      if (d.gelernt)      state.gelernt      = d.gelernt;
      if (d.streak)       state.streak       = d.streak;
      if (Array.isArray(d.quizHistory)) state.quizHistory = d.quizHistory;
      if (d.lernStats)    state.lernStats    = d.lernStats;
      if (Array.isArray(d.visited)) state.visited = d.visited;
      if (d.achievements) state.achievements = d.achievements;
      if (d.onboarded != null) state.onboarded = !!d.onboarded;
      if (d.preset)       state.preset       = d.preset;
      if (d.notes)        state.notes        = d.notes;
    }

    persist();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message || 'Parse-Fehler.' };
  }
}

// Setzt alle persistenten Daten zurück (außer Theme).
export function resetAllData({ keepTheme = true } = {}) {
  const theme = state.theme;
  state.favoriten = [];
  state.gelernt = {};
  state.streak = { count: 0, lastDay: null, days: {} };
  state.quizHistory = [];
  state.lernStats = { total: 0, korrekt: 0 };
  state.visited = [];
  state.achievements = {};
  state.onboarded = false;
  if (keepTheme) state.theme = theme;
  persist();
}

// Encode/decode Quiz-Resultat in einen URL-fragment-Token.
// Format: dialekto.q1.<score>.<total>.<source>
export function encodeQuizShare({ score, total, source = 'all', date = Date.now() }) {
  const payload = {
    s: score,
    t: total,
    d: source,
    ts: Math.floor(date / 1000)
  };
  try {
    // base64-url
    const s = btoa(JSON.stringify(payload))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return `q:${s}`;
  } catch { return null; }
}

export function decodeQuizShare(token) {
  if (!token || !token.startsWith('q:')) return null;
  try {
    const b64 = token.slice(2).replace(/-/g, '+').replace(/_/g, '/');
    const pad = b64.length % 4 ? b64 + '='.repeat(4 - (b64.length % 4)) : b64;
    const obj = JSON.parse(atob(pad));
    return {
      score: Number(obj.s) || 0,
      total: Number(obj.t) || 0,
      source: obj.d || 'all',
      date: (Number(obj.ts) || 0) * 1000
    };
  } catch { return null; }
}

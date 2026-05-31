// Import / Export des User-States als JSON.
// Reset-Funktion + Share-Links für Quiz-Resultate.
// Anki-/CSV-Export der eigenen Favoriten oder aller Ausdrücke.

import { state, persist } from './state.js';

const FORMAT_VERSION = 2; // v2: schließt xp, goals, notes, preset, onboarded ein

// Felder, die vom Snapshot-Lebenszyklus verwaltet werden.
// Wenn hier neue Felder ergänzt werden, MUSS state.js' withDefaults und
// resetAllData unten ebenfalls aktualisiert werden — sonst Daten-Verlust.
const TRANSFER_FIELDS = [
  'theme',
  'favoriten',
  'gelernt',
  'streak',
  'quizHistory',
  'lernStats',
  'visited',
  'achievements',
  'onboarded',
  'preset',
  'notes',
  'xp',
  'goals',
];

// Liefert ein JSON-serialisierbares Snapshot mit Metadaten.
export function exportState() {
  const data = {};
  for (const k of TRANSFER_FIELDS) data[k] = state[k];
  return {
    format: 'dialekto',
    version: FORMAT_VERSION,
    exportedAt: new Date().toISOString(),
    data,
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

// Validierungs-Helfer: prüft, ob ein einzelnes Feld grob den erwarteten Typ hat.
// Wir akzeptieren auch null/undefined — fehlende Felder werden vom Default
// in state.js abgedeckt. Was wir NICHT akzeptieren: falsche Typen, die nach
// dem Merge die App brechen würden (z. B. state.gelernt = "broken").
function isValidShape(d) {
  if (!d || typeof d !== 'object') return false;

  const checks = {
    theme: (v) => v == null || typeof v === 'string',
    favoriten: (v) => v == null || Array.isArray(v),
    gelernt: (v) => v == null || (typeof v === 'object' && !Array.isArray(v)),
    streak: (v) => v == null || (typeof v === 'object' && !Array.isArray(v)),
    quizHistory: (v) => v == null || Array.isArray(v),
    lernStats: (v) => v == null || (typeof v === 'object' && !Array.isArray(v)),
    visited: (v) => v == null || Array.isArray(v),
    achievements: (v) => v == null || (typeof v === 'object' && !Array.isArray(v)),
    onboarded: (v) => v == null || typeof v === 'boolean',
    preset: (v) => v == null || typeof v === 'string',
    notes: (v) => v == null || (typeof v === 'object' && !Array.isArray(v)),
    xp: (v) => v == null || (typeof v === 'object' && !Array.isArray(v)),
    goals: (v) => v == null || (typeof v === 'object' && !Array.isArray(v)),
  };

  for (const [k, ok] of Object.entries(checks)) {
    if (k in d && !ok(d[k])) return false;
  }
  return true;
}

// Behält aus einem Record nur Werte, die echte Objekte sind (kein null,
// String, Array). isValidShape prüft nur die Top-Level-Form von `gelernt`;
// einzelne korrupte Karten-Einträge würden sonst durchrutschen und später
// getLernstand()/reviewCard() mit einem TypeError brechen.
function sanitizeRecord(obj) {
  const out = {};
  if (!obj || typeof obj !== 'object') return out;
  for (const [k, v] of Object.entries(obj)) {
    if (v && typeof v === 'object' && !Array.isArray(v)) out[k] = v;
  }
  return out;
}

// Erzwingt eine endliche Zahl >= min; sonst fallback. Schützt downstream-Mathe
// (XP-Level, Streak-Zähler, Goal-%) vor korrupten Skalaren aus einem
// manipulierten Backup ("abc", -5, NaN, "20"), die isValidShape passieren,
// weil sie nur die Top-Level-Objektform prüft, nicht die inneren Skalare.
function numOr(v, fallback, min = 0) {
  const n = Number(v);
  return Number.isFinite(n) && n >= min ? n : fallback;
}

// Validiert und importiert ein Snapshot. Liefert {ok, error?}.
// strategy:
//   'replace' — überschreibt vorhandene Felder
//   'merge'   — Favoriten/Notes vereinen, gelernt/streak/quizHistory mergen
export function importState(jsonOrObject, { strategy = 'replace' } = {}) {
  try {
    const obj = typeof jsonOrObject === 'string' ? JSON.parse(jsonOrObject) : jsonOrObject;
    if (!obj || obj.format !== 'dialekto') {
      return { ok: false, error: 'Format unbekannt (erwartet dialekto-Snapshot).' };
    }
    if (!obj.data || typeof obj.data !== 'object') {
      return { ok: false, error: 'Keine data-Sektion gefunden.' };
    }
    if (!isValidShape(obj.data)) {
      return { ok: false, error: 'Daten-Schema ungültig — Felder haben falsche Typen.' };
    }

    const version = Number(obj.version) || 1;
    if (version > FORMAT_VERSION) {
      // Neueres Format — versuchen, das Backwards-kompatible Subset zu lesen.
      // Wir warnen aber, damit der User weiß, dass evtl. Daten verloren gehen.
      console.warn(`[Dialekto] Snapshot-Version ${version} ist neuer als ${FORMAT_VERSION} — unbekannte Felder werden ignoriert.`);
    }

    const d = obj.data;

    if (strategy === 'merge') {
      mergeImport(d);
    } else {
      replaceImport(d);
    }

    persist();
    return { ok: true, version, strategy };
  } catch (e) {
    return { ok: false, error: e.message || 'Parse-Fehler.' };
  }
}

function replaceImport(d) {
  // Skalare + reine Datenstrukturen — direkt übernehmen.
  if (d.theme != null) state.theme = d.theme;
  if (Array.isArray(d.favoriten)) state.favoriten = d.favoriten;
  if (d.gelernt && typeof d.gelernt === 'object') state.gelernt = sanitizeRecord(d.gelernt);
  if (d.streak && typeof d.streak === 'object') {
    state.streak = {
      count: 0,
      lastDay: null,
      days: {},
      ...d.streak,
      count: numOr(d.streak.count, 0),
      lastDay: typeof d.streak.lastDay === 'string' ? d.streak.lastDay : null,
      days: (d.streak.days && typeof d.streak.days === 'object') ? d.streak.days : {},
    };
  }
  if (Array.isArray(d.quizHistory)) state.quizHistory = d.quizHistory;
  if (d.lernStats && typeof d.lernStats === 'object') {
    state.lernStats = {
      total: 0,
      korrekt: 0,
      ...d.lernStats,
      total: numOr(d.lernStats.total, 0),
      korrekt: numOr(d.lernStats.korrekt, 0),
    };
  }
  if (Array.isArray(d.visited)) state.visited = d.visited;
  if (d.achievements && typeof d.achievements === 'object') state.achievements = d.achievements;
  if (d.onboarded != null) state.onboarded = !!d.onboarded;
  if (typeof d.preset === 'string') state.preset = d.preset;
  if (d.notes && typeof d.notes === 'object') state.notes = d.notes;
  if (d.xp && typeof d.xp === 'object') {
    state.xp = {
      total: 0,
      log: [],
      ...d.xp,
      total: numOr(d.xp.total, 0),
      log: Array.isArray(d.xp.log) ? d.xp.log : [],
    };
  }
  if (d.goals && typeof d.goals === 'object') {
    state.goals = {
      target: 10,
      progress: {},
      reminderShown: {},
      ...d.goals,
      target: numOr(d.goals.target, 10, 1),
      progress: (d.goals.progress && typeof d.goals.progress === 'object') ? d.goals.progress : {},
      reminderShown: (d.goals.reminderShown && typeof d.goals.reminderShown === 'object') ? d.goals.reminderShown : {},
    };
  }
}

function mergeImport(d) {
  // Favoriten — Set-Union per String-Key. Favoriten sind flache
  // "dialektId.ausdruckId"-Strings (favKey); ältere Backups können sie als
  // Objekte enthalten — beides wird zu Strings normalisiert.
  if (Array.isArray(d.favoriten)) {
    if (!Array.isArray(state.favoriten)) state.favoriten = [];
    const norm = (f) => typeof f === 'string'
      ? f
      : (f && f.dialektId && f.ausdruckId ? `${f.dialektId}.${f.ausdruckId}` : null);
    const seen = new Set(state.favoriten.map(norm).filter(Boolean));
    for (const f of d.favoriten) {
      const k = norm(f);
      if (k && !seen.has(k)) { state.favoriten.push(k); seen.add(k); }
    }
  }

  // gelernt — pro Karte: neueres Review gewinnt
  if (d.gelernt && typeof d.gelernt === 'object') {
    for (const k of Object.keys(d.gelernt)) {
      const incoming = d.gelernt[k];
      // Korrupte Einträge (null, String, Array) überspringen — sonst landen
      // sie in state.gelernt und brechen später getLernstand()/reviewCard().
      if (!incoming || typeof incoming !== 'object' || Array.isArray(incoming)) continue;
      const existing = state.gelernt[k];
      if (!existing) state.gelernt[k] = incoming;
      else if ((incoming.last || 0) > (existing.last || 0)) state.gelernt[k] = incoming;
    }
  }

  // quizHistory — chronologisch, deduped by Datum
  if (Array.isArray(d.quizHistory)) {
    const seen = new Set(state.quizHistory.map((h) => h.date));
    for (const h of d.quizHistory) if (!seen.has(h.date)) state.quizHistory.push(h);
    state.quizHistory.sort((a, b) => (a.date || 0) - (b.date || 0));
  }

  // visited — Set-Union
  if (Array.isArray(d.visited)) {
    const s = new Set(state.visited || []);
    for (const v of d.visited) s.add(v);
    state.visited = Array.from(s);
  }

  // streak.days — Tagesmaximum gewinnt
  if (d.streak?.days) {
    state.streak = state.streak || { count: 0, lastDay: null, days: {} };
    state.streak.days = state.streak.days || {};
    for (const k of Object.keys(d.streak.days)) {
      state.streak.days[k] = Math.max(state.streak.days[k] || 0, d.streak.days[k] || 0);
    }
  }

  // achievements — Union (lokal hat Vorrang bei Konflikten, weil "schon gefeiert")
  if (d.achievements) {
    state.achievements = { ...d.achievements, ...state.achievements };
  }

  // notes — bei Konflikt: lokale Notiz behalten (User hat sie evtl. gerade geschrieben).
  if (d.notes && typeof d.notes === 'object') {
    state.notes = state.notes || {};
    for (const k of Object.keys(d.notes)) {
      if (!state.notes[k]) state.notes[k] = d.notes[k];
    }
  }

  // XP — Maximum gewinnt (Backup von höherem Stand schadet nicht).
  if (d.xp && typeof d.xp === 'object') {
    state.xp = state.xp || { total: 0, log: [] };
    state.xp.total = Math.max(state.xp.total || 0, Number(d.xp.total) || 0);
    // Log mergen (deduped per Timestamp), letzte 50 behalten
    const seenTs = new Set((state.xp.log || []).map((e) => e.ts));
    const merged = [...(state.xp.log || [])];
    for (const e of (d.xp.log || [])) {
      if (!seenTs.has(e.ts)) merged.push(e);
    }
    state.xp.log = merged.sort((a, b) => (b.ts || 0) - (a.ts || 0)).slice(0, 50);
  }

  // Goals — Target wird vom Backup übernommen, Tagesfortschritt: max per Tag.
  if (d.goals && typeof d.goals === 'object') {
    state.goals = state.goals || { target: 10, progress: {}, reminderShown: {} };
    if (typeof d.goals.target === 'number') state.goals.target = d.goals.target;
    if (d.goals.progress) {
      state.goals.progress = state.goals.progress || {};
      for (const k of Object.keys(d.goals.progress)) {
        state.goals.progress[k] = Math.max(state.goals.progress[k] || 0, d.goals.progress[k] || 0);
      }
    }
  }
}

// Setzt alle persistenten Daten zurück.
// keepTheme — Theme bleibt erhalten (Default).
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
  state.preset = 'default';
  state.notes = {};
  state.xp = { total: 0, log: [] };
  state.goals = { target: 10, progress: {}, reminderShown: {} };
  if (Array.isArray(state.decks)) state.decks = [];
  if (Array.isArray(state.suggestions)) state.suggestions = [];
  if (keepTheme) state.theme = theme;
  persist();
}

// Anki-/CSV-Export — eine Karte pro Zeile, Semikolon-getrennt.
// Header: dialekt;ausdruck;hochdeutsch;bedeutung;beispiel;beispiel_hd;kategorie
// Anki: "Import → File", Field separator: Semicolon, Fields mapped to card front/back.
//
// allEntries — wenn true: alle Ausdrücke; sonst nur Favoriten.
export function exportToCsv(allEntries = false, ausdrueckeFromCaller = null, getDialektFromCaller = null) {
  // Daten kommen vom Caller, damit dieses Modul keinen Dependency auf data/ hat.
  if (!ausdrueckeFromCaller || !getDialektFromCaller) {
    throw new Error('exportToCsv: ausdruecke + getDialekt müssen vom Caller übergeben werden.');
  }

  const rows = [];
  if (allEntries) {
    for (const a of ausdrueckeFromCaller) {
      const d = getDialektFromCaller(a.dialektId);
      rows.push(toCsvRow(a, d));
    }
  } else {
    for (const entry of (state.favoriten || [])) {
      // Favoriten sind "dialektId.ausdruckId"-Strings; Legacy-Objekte tolerieren.
      let dialektId, ausdruckId;
      if (entry && typeof entry === 'object') {
        dialektId = entry.dialektId; ausdruckId = entry.ausdruckId;
      } else {
        const s = String(entry);
        const dot = s.indexOf('.');
        dialektId = dot < 0 ? s : s.slice(0, dot);
        ausdruckId = dot < 0 ? '' : s.slice(dot + 1);
      }
      const d = getDialektFromCaller(dialektId);
      const a = d?.ausdruecke?.find((x) => x.id === ausdruckId);
      if (a && d) rows.push(toCsvRow(a, d));
    }
  }
  const header = 'dialekt;ausdruck;hochdeutsch;bedeutung;beispiel;beispiel_hd;kategorie';
  return [header, ...rows].join('\n');
}

function csvEscape(s) {
  if (s == null) return '';
  const str = String(s);
  // Falls Sonderzeichen → in doppelte Quotes, vorhandene Quotes verdoppeln.
  if (/[;"\n\r]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

function toCsvRow(a, d) {
  return [
    csvEscape(d?.name || ''),
    csvEscape(a.ausdruck),
    csvEscape(a.hochdeutsch),
    csvEscape(a.bedeutung),
    csvEscape(a.beispiel),
    csvEscape(a.beispiel_hd),
    csvEscape(a.kategorie),
  ].join(';');
}

export function downloadCsvFile(csvString, filename = null) {
  const blob = new Blob(['﻿' + csvString], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const stamp = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = filename || `dialekto-export-${stamp}.csv`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}

// Encode/decode Quiz-Resultat in einen URL-fragment-Token.
// Format: q:<base64-url(JSON)>
export function encodeQuizShare({ score, total, source = 'all', date = Date.now() }) {
  const payload = {
    s: score,
    t: total,
    d: source,
    ts: Math.floor(date / 1000),
  };
  try {
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
      date: (Number(obj.ts) || 0) * 1000,
    };
  } catch { return null; }
}

// Persistenter Zustand: Laden/Speichern in localStorage mit sicheren Defaults.

const STORAGE_KEY = 'dialekto.v1';

function safeStorage() {
  try {
    if (typeof localStorage === 'undefined') return null;
    return localStorage;
  } catch {
    return null;
  }
}

function loadAll() {
  const store = safeStorage();
  if (!store) return {};
  try {
    const raw = store.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function saveAll(value) {
  const store = safeStorage();
  if (!store) return;
  try {
    store.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Quota oder privacy-mode: stillschweigend ignorieren.
  }
}

function withDefaults(loaded) {
  return {
    theme:        loaded.theme        ?? 'auto',
    favoriten:    Array.isArray(loaded.favoriten) ? loaded.favoriten : [],
    gelernt:      loaded.gelernt      && typeof loaded.gelernt === 'object' ? loaded.gelernt : {},
    streak:       loaded.streak       && typeof loaded.streak === 'object'
                    ? { count: 0, lastDay: null, days: {}, ...loaded.streak,
                        days: (loaded.streak.days && typeof loaded.streak.days === 'object') ? loaded.streak.days : {} }
                    : { count: 0, lastDay: null, days: {} },
    quizHistory:  Array.isArray(loaded.quizHistory) ? loaded.quizHistory : [],
    lernStats:    loaded.lernStats    && typeof loaded.lernStats === 'object'
                    ? { total: 0, korrekt: 0, ...loaded.lernStats }
                    : { total: 0, korrekt: 0 },
    visited:      Array.isArray(loaded.visited) ? loaded.visited : [],
    achievements: loaded.achievements && typeof loaded.achievements === 'object'
                    ? loaded.achievements : {},
    onboarded:    !!loaded.onboarded,
    preset:       typeof loaded.preset === 'string' ? loaded.preset : 'default',
    notes:        loaded.notes && typeof loaded.notes === 'object' ? loaded.notes : {},
    xp:           loaded.xp && typeof loaded.xp === 'object'
                    ? { total: 0, log: [], ...loaded.xp }
                    : { total: 0, log: [] }
  };
}

export const state = withDefaults(loadAll());

export function persist() {
  saveAll(state);
}

export function favKey(dialektId, ausdruckId) {
  return `${dialektId}.${ausdruckId}`;
}

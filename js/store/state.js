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

// Verhindert Toast-Spam: nur einmal pro Sitzung über vollen Speicher warnen.
let storageWarned = false;

function isQuotaError(err) {
  if (!err) return false;
  // Browser melden Quota unterschiedlich: name, code (22 / 1014) oder Botschaft.
  return (
    err.name === 'QuotaExceededError' ||
    err.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
    err.code === 22 ||
    err.code === 1014
  );
}

function saveAll(value) {
  const store = safeStorage();
  if (!store) return;
  try {
    store.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch (err) {
    // Privacy-mode (Schreiben generell blockiert) → still ignorieren.
    // Quota voll → einmalig warnen, damit der User nicht unbemerkt
    // Fortschritt verliert (z. B. via Export ein Backup ziehen kann).
    if (isQuotaError(err) && !storageWarned) {
      storageWarned = true;
      if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
        window.dispatchEvent(new CustomEvent('dialekto:storage-full'));
      }
    }
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
                    : { total: 0, log: [] },
    goals:        loaded.goals && typeof loaded.goals === 'object'
                    ? { target: 10, progress: {}, reminderShown: {}, ...loaded.goals }
                    : { target: 10, progress: {}, reminderShown: {} },
    decks:        Array.isArray(loaded.decks) ? loaded.decks : [],
    suggestions:  Array.isArray(loaded.suggestions) ? loaded.suggestions : [],
    challenges:   loaded.challenges && typeof loaded.challenges === 'object'
                    ? { week: null, progress: {}, completed: [], ...loaded.challenges,
                        progress: (loaded.challenges.progress && typeof loaded.challenges.progress === 'object') ? loaded.challenges.progress : {},
                        completed: Array.isArray(loaded.challenges.completed) ? loaded.challenges.completed : [] }
                    : { week: null, progress: {}, completed: [] },
    longGoals:    Array.isArray(loaded.longGoals) ? loaded.longGoals : [],
    notesIdbMigrated: !!loaded.notesIdbMigrated
  };
}

export const state = withDefaults(loadAll());

export function persist() {
  saveAll(state);
}

export function favKey(dialektId, ausdruckId) {
  return `${dialektId}.${ausdruckId}`;
}

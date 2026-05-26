// Einfache UI-Internationalisierung (DE/EN).
//
// Ansatz: prominente UI-Strings (Navigation, Hauptüberschriften, Buttons,
// Toast-Messages) werden als Key/Value abgelegt. Inhaltliche Texte (Dialekt-
// Erklärungen, Datenbeschreibungen) bleiben deutsch — Dialekto ist eine
// deutsche Dialekt-Lern-App, eine vollständige EN-Übersetzung wäre nicht
// sinnvoll. Der Switch dient als Komfort für nicht-deutsche Lerner, die
// die App-UI auf Englisch bedienen möchten.
//
// API: `t('home.title')` → übersetzt
// Persistenz: `localStorage` als `dialekto:lang`
// Sprache wechseln: `setLang('en')` → erzwingt page reload
// Fallback: wenn Key in der gewählten Sprache fehlt, gibt deutsche Version.

const STORAGE_KEY = 'dialekto:lang';
const DEFAULT_LANG = 'de';
const SUPPORTED = ['de', 'en'];

const STRINGS = {
  de: {
    // Navigation
    'nav.home':       'Start',
    'nav.entdecken':  'Entdecken',
    'nav.lernen':     'Lernen',
    'nav.quiz':       'Quiz',
    'nav.vergleich':  'Vergleich',
    'nav.karte':      'Karte',
    'nav.favoriten':  'Favoriten',

    // Branding
    'brand.name':     'Dialekto',
    'brand.sub':      'Deutsche Dialekte lernen',

    // Hero
    'home.title':                  'Dialekto',
    'home.hero.eyebrow':           'Deutsche Sprachvielfalt entdecken',
    'home.hero.cta.discover':      'Dialekte entdecken',
    'home.hero.cta.learn':         'Karteikarten lernen',
    'home.hero.cta.quiz':          'Quiz starten',

    // Stats
    'stats.dialekte':              'Dialekte',
    'stats.ausdruecke':            'Ausdrücke',
    'stats.gelernt':               'gelernt',
    'stats.streak':                'Tage Streak',

    // Buttons / Aktionen
    'btn.start':                   'Lernen starten',
    'btn.share':                   'Karte teilen',
    'btn.close':                   'Schließen',
    'btn.cancel':                  'Abbrechen',
    'btn.save':                    'Speichern',
    'btn.copy':                    'Kopieren',
    'btn.download':                'Herunterladen',
    'btn.continue':                'Weiter',
    'btn.back':                    'Zurück',

    // Topbar / Toggles
    'topbar.search':               'Suchen oder springen…',
    'topbar.theme':                'Hell/Dunkel umschalten',
    'topbar.palette':              'Farbpalette',
    'topbar.sound':                'Sounds ein/aus',
    'topbar.lang':                 'Sprache wechseln',
    'topbar.dyslexic':             'Dyslexie-freundliche Schrift',

    // Themes / Modi
    'theme.light':                 'Hell',
    'theme.dark':                  'Dunkel',
    'theme.auto':                  'Automatisch',
    'theme.contrast':              'Hoher Kontrast',

    // Toasts
    'toast.sound.on':              'Sounds an',
    'toast.sound.off':             'Sounds aus',
    'toast.lang.changed':          'Sprache geändert',
    'toast.dyslexic.on':           'Dyslexie-Schrift an',
    'toast.dyslexic.off':          'Dyslexie-Schrift aus',
    'toast.copied':                'In die Zwischenablage kopiert',
    'toast.saved':                 'Gespeichert',
    'toast.error':                 'Ein Fehler ist aufgetreten',

    // Sections
    'section.alleDialekte':        'Alle Dialekte',
    'section.dashboard':           'Dein Dashboard',
    'section.heuteFaellig':        'Heute fällig',
    'section.dailyExpr':           'Ausdruck des Tages',
  },

  en: {
    // Navigation
    'nav.home':       'Home',
    'nav.entdecken':  'Discover',
    'nav.lernen':     'Learn',
    'nav.quiz':       'Quiz',
    'nav.vergleich':  'Compare',
    'nav.karte':      'Map',
    'nav.favoriten':  'Favorites',

    // Branding
    'brand.name':     'Dialekto',
    'brand.sub':      'Learn German dialects',

    // Hero
    'home.title':                  'Dialekto',
    'home.hero.eyebrow':           'Discover German linguistic diversity',
    'home.hero.cta.discover':      'Discover dialects',
    'home.hero.cta.learn':         'Study flashcards',
    'home.hero.cta.quiz':          'Start quiz',

    // Stats
    'stats.dialekte':              'Dialects',
    'stats.ausdruecke':            'Expressions',
    'stats.gelernt':               'learned',
    'stats.streak':                'day streak',

    // Buttons / Aktionen
    'btn.start':                   'Start learning',
    'btn.share':                   'Share card',
    'btn.close':                   'Close',
    'btn.cancel':                  'Cancel',
    'btn.save':                    'Save',
    'btn.copy':                    'Copy',
    'btn.download':                'Download',
    'btn.continue':                'Continue',
    'btn.back':                    'Back',

    // Topbar / Toggles
    'topbar.search':               'Search or jump…',
    'topbar.theme':                'Toggle light/dark',
    'topbar.palette':              'Color palette',
    'topbar.sound':                'Toggle sounds',
    'topbar.lang':                 'Change language',
    'topbar.dyslexic':             'Dyslexia-friendly font',

    // Themes / Modi
    'theme.light':                 'Light',
    'theme.dark':                  'Dark',
    'theme.auto':                  'Auto',
    'theme.contrast':              'High contrast',

    // Toasts
    'toast.sound.on':              'Sounds on',
    'toast.sound.off':             'Sounds off',
    'toast.lang.changed':          'Language changed',
    'toast.dyslexic.on':           'Dyslexic font on',
    'toast.dyslexic.off':          'Dyslexic font off',
    'toast.copied':                'Copied to clipboard',
    'toast.saved':                 'Saved',
    'toast.error':                 'An error occurred',

    // Sections
    'section.alleDialekte':        'All dialects',
    'section.dashboard':           'Your dashboard',
    'section.heuteFaellig':        'Due today',
    'section.dailyExpr':           'Expression of the day',
  },
};

function safeStorage() {
  try {
    if (typeof localStorage === 'undefined') return null;
    return localStorage;
  } catch {
    return null;
  }
}

function readLang() {
  const store = safeStorage();
  if (!store) return DEFAULT_LANG;
  try {
    const raw = store.getItem(STORAGE_KEY);
    if (raw && SUPPORTED.includes(raw)) return raw;
  } catch {
    /* ignore */
  }
  return DEFAULT_LANG;
}

let currentLang = readLang();

/** Aktuelle Sprache (`'de'` oder `'en'`). */
export function getLang() {
  return currentLang;
}

/**
 * Übersetzt einen Key.
 * Fällt bei fehlendem Key auf die deutsche Variante zurück, dann auf den Key selbst.
 */
export function t(key) {
  const table = STRINGS[currentLang] || STRINGS[DEFAULT_LANG];
  if (table && Object.prototype.hasOwnProperty.call(table, key)) return table[key];
  const fallback = STRINGS[DEFAULT_LANG];
  if (fallback && Object.prototype.hasOwnProperty.call(fallback, key)) return fallback[key];
  return key;
}

/**
 * Setzt die UI-Sprache und reloaded die Seite, damit alle Views neu rendern.
 * Reload ist die einfachste Lösung — Dialekto rendert Views nur on-route-change,
 * eine selektive Neuzeichnung wäre invasiv.
 */
export function setLang(lang) {
  const next = SUPPORTED.includes(lang) ? lang : DEFAULT_LANG;
  const store = safeStorage();
  if (store) {
    try { store.setItem(STORAGE_KEY, next); } catch { /* ignore */ }
  }
  currentLang = next;
  applyHtmlLangAttr();
  if (typeof location !== 'undefined' && typeof location.reload === 'function') {
    location.reload();
  }
}

/**
 * Zyklus DE → EN → DE.
 */
export function cycleLang() {
  const next = currentLang === 'de' ? 'en' : 'de';
  setLang(next);
  return next;
}

/** Setzt `<html lang>` passend zur aktiven Sprache. */
export function applyHtmlLangAttr() {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('lang', currentLang);
}

/**
 * Bindet den Sprach-Toggle-Button (`#langToggle`) und setzt initiale Attribute.
 * Wird einmal beim App-Start aus `js/theme.js` aufgerufen.
 */
export function initI18n() {
  applyHtmlLangAttr();
  if (typeof document === 'undefined') return;
  const btn = document.getElementById('langToggle');
  if (!btn) return;
  // Aktuellen Code als Label anzeigen (das zukünftige Ziel-Sprachkürzel ist intuitiver)
  syncLangButton(btn);
  btn.addEventListener('click', () => {
    cycleLang(); // löst reload aus
  });
}

function syncLangButton(btn) {
  // Zeigt den *aktuellen* Sprachcode (DE/EN) — Klick wechselt zur anderen
  const label = currentLang.toUpperCase();
  btn.textContent = label;
  btn.setAttribute('aria-label', t('topbar.lang'));
  btn.setAttribute('title', t('topbar.lang') + ` · ${label}`);
}

// Dialekto · Einstiegspunkt
// Initialisiert Theme, Suche, Tastatursteuerung, Streak und Router.

import { $, toast } from './util.js';
import { registerStreak } from './store.js';
import { initTheme } from './theme.js';
import { initSearch } from './search.js';
import { initShortcuts } from './shortcuts.js';
import { initRouter } from './router.js';
import { initNav } from './nav.js';
import { initSpotlight, initScrollProgress, initMagnetic, initTilt } from './util/motion.js';
import { startOnboarding, resetOnboarding } from './util/onboarding.js';
import { isSoundEnabled, setSoundEnabled, sfx } from './util/sounds.js';
import { initPwa } from './util/pwa.js';
import { initXpHud, renderXpBar } from './util/xp-hud.js';
import { getXp } from './store/xp.js';

const ADD_DIALECT_HINT_MS = 4000;
const ADD_DIALECT_HINT_TEXT =
  'Dialekte können einfach in /data/dialekte/ als JS-Datei ergänzt werden — siehe README!';

function initAddDialectHint() {
  $('#addDialectHint')?.addEventListener('click', () => {
    toast(ADD_DIALECT_HINT_TEXT, 'info', ADD_DIALECT_HINT_MS);
  });
}

function initRestartTour() {
  $('#restartTour')?.addEventListener('click', () => {
    resetOnboarding();
    startOnboarding({ force: true });
  });
}

function initSoundToggle() {
  const btn = $('#soundToggle');
  if (!btn) return;
  const sync = () => btn.classList.toggle('is-off', !isSoundEnabled());
  sync();
  btn.addEventListener('click', () => {
    const next = !isSoundEnabled();
    setSoundEnabled(next);
    sync();
    if (next) sfx.toggle();
    toast(next ? 'Sounds an 🔊' : 'Sounds aus 🔇', 'info', 1200);
  });
  // Tastatur: M zum Stummschalten
  document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'm' && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const tag = (e.target?.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || e.target?.isContentEditable) return;
      btn.click();
    }
  });
}

function init() {
  initTheme();
  initSearch();
  initShortcuts();
  initAddDialectHint();
  initRestartTour();
  initSoundToggle();
  registerStreak();
  initScrollProgress();
  initSpotlight();
  initMagnetic();
  initTilt();
  initNav();
  initRouter();
  initPwa(toast);
  initXpHud();
  // XP-Balken in der Topbar befüllen
  const xpSlot = document.getElementById('xpBarSlot');
  if (xpSlot) xpSlot.appendChild(renderXpBar(getXp()));
  // Onboarding-Tour beim ersten Besuch (kleines Delay, damit Layout steht).
  setTimeout(() => startOnboarding(), 800);
  // Console-Helfer + Footer-Link, um die Tour erneut zu starten.
  window.dialektoStartTour = () => { resetOnboarding(); startOnboarding({ force: true }); };
}

init();

// Globaler Error-Handler — fängt unerwartete Fehler und zeigt einen freundlichen Toast,
// anstatt den User auf einer kaputten Seite stehen zu lassen.
window.addEventListener('error', (e) => {
  console.error('[Dialekto]', e.error || e.message);
  toast('Ein unerwarteter Fehler ist aufgetreten — die Seite läuft weiter.', 'info', 2400);
});
window.addEventListener('unhandledrejection', (e) => {
  console.error('[Dialekto] unhandled', e.reason);
});

// Dev-Validator: console.log('dialekto.validate()') oder Ctrl+Shift+V
import('./util/schema.js').then((m) => {
  window.dialektoValidate = m.logValidationReport;
  // Auf Localhost automatisch ein Mini-Report im Log.
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    const { summary } = m.logValidationReport();
    if (summary.errors > 0) {
      toast(`Validator: ${summary.errors} Fehler in den Daten`, 'info', 3500);
    }
  }
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'v') {
      e.preventDefault();
      const r = m.logValidationReport();
      toast(`${r.summary.errors} Fehler · ${r.summary.warnings} Warnungen · ${r.summary.info} Infos`, 'info', 3000);
    }
  });
}).catch(() => {});

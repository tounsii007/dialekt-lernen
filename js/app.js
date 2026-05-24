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

function init() {
  initTheme();
  initSearch();
  initShortcuts();
  initAddDialectHint();
  initRestartTour();
  registerStreak();
  initScrollProgress();
  initSpotlight();
  initMagnetic();
  initTilt();
  initNav();
  initRouter();
  // Onboarding-Tour beim ersten Besuch (kleines Delay, damit Layout steht).
  setTimeout(() => startOnboarding(), 800);
  // Console-Helfer + Footer-Link, um die Tour erneut zu starten.
  window.dialektoStartTour = () => { resetOnboarding(); startOnboarding({ force: true }); };
}

init();

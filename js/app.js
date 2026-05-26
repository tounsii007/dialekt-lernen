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
import { initNotifications } from './store/notifications.js';
import { initXpHud, renderXpBar } from './util/xp-hud.js';
import { getXp } from './store/xp.js';
import { initNetwork } from './util/network.js';
import { initRipple } from './util/ripple.js';
import { initGoalEvents } from './util/daily-goal.js';
import { initShortcutsOverlay } from './util/shortcuts-overlay.js';
import { APP_VERSION_LABEL } from './version.js';
import { DIALEKTE, ALLE_AUSDRUECKE } from '../data/dialekte.js';

const ADD_DIALECT_HINT_MS = 4000;
const SOUND_TOAST_MS = 1200;
const ERROR_TOAST_MS = 2400;
const VALIDATOR_TOAST_MS = 3000;
const VALIDATOR_PROBLEMS_TOAST_MS = 3500;
const ONBOARDING_BOOT_DELAY_MS = 800;

const ADD_DIALECT_HINT_TEXT =
  'Dialekte können einfach in /data/dialekte/ als JS-Datei ergänzt werden — siehe README!';

const TOUCH_QUERY = '(pointer: coarse)';

const isTypingElement = (target) => {
  if (!target) return false;
  const tag = (target.tagName || '').toLowerCase();
  return tag === 'input' || tag === 'textarea' || target.isContentEditable;
};

function initAddDialectHint() {
  $('#addDialectHint')?.addEventListener('click', () => {
    toast(ADD_DIALECT_HINT_TEXT, 'info', ADD_DIALECT_HINT_MS);
  });
}

function initRestartTour() {
  const restartTour = () => {
    resetOnboarding();
    startOnboarding({ force: true });
  };
  $('#restartTour')?.addEventListener('click', restartTour);
  // Console helper for testing the tour without re-clearing localStorage by hand.
  window.dialektoStartTour = restartTour;
}

function initSoundToggle() {
  const btn = $('#soundToggle');
  if (!btn) return;

  const syncIcon = () => btn.classList.toggle('is-off', !isSoundEnabled());
  syncIcon();

  const toggleSound = () => {
    const next = !isSoundEnabled();
    setSoundEnabled(next);
    syncIcon();
    if (next) sfx.toggle();
    toast(next ? 'Sounds an 🔊' : 'Sounds aus 🔇', 'info', SOUND_TOAST_MS);
  };

  btn.addEventListener('click', toggleSound);

  // `M` toggles sound — same guard as the global shortcuts module.
  document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() !== 'm') return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (isTypingElement(e.target)) return;
    btn.click();
  });
}

function detectInputDevice() {
  // body.is-touch lets CSS scale up touch targets adaptively. Toggle on
  // initial state and whenever the input modality changes (e.g. user
  // pairs a Bluetooth mouse with their tablet mid-session).
  const mql = window.matchMedia(TOUCH_QUERY);
  const sync = (matches) => document.body.classList.toggle('is-touch', matches);
  sync(mql.matches);
  mql.addEventListener('change', (e) => sync(e.matches));
}

function initPaletteToggle() {
  const btn = document.getElementById('paletteToggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    import('./theme.js')
      .then((m) => {
        if (typeof m.openThemePicker === 'function') m.openThemePicker();
      })
      .catch(() => {});
  });
}

function mountXpBar() {
  const xpSlot = document.getElementById('xpBarSlot');
  if (xpSlot) xpSlot.appendChild(renderXpBar(getXp()));
}

function mountFooterMeta() {
  const verEl = document.getElementById('appVersionLabel');
  if (verEl) verEl.textContent = APP_VERSION_LABEL;
  const statsEl = document.getElementById('dataStatsLabel');
  if (statsEl) {
    statsEl.textContent = `${DIALEKTE.length} Dialekte · ${ALLE_AUSDRUECKE.length.toLocaleString('de-DE')} Ausdrücke`;
  }
}

function initErrorHandlers() {
  window.addEventListener('error', (e) => {
    console.error('[Dialekto]', e.error || e.message);
    toast(
      'Ein unerwarteter Fehler ist aufgetreten — die Seite läuft weiter.',
      'info',
      ERROR_TOAST_MS,
    );
  });
  window.addEventListener('unhandledrejection', (e) => {
    console.error('[Dialekto] unhandled', e.reason);
  });
}

function initDevValidator() {
  // Console helper: window.dialektoValidate()  OR  Ctrl+Shift+V
  import('./util/schema.js')
    .then((m) => {
      window.dialektoValidate = m.logValidationReport;

      const isLocalhost =
        location.hostname === 'localhost' || location.hostname === '127.0.0.1';
      if (isLocalhost) {
        const { summary } = m.logValidationReport();
        if (summary.errors > 0) {
          toast(
            `Validator: ${summary.errors} Fehler in den Daten`,
            'info',
            VALIDATOR_PROBLEMS_TOAST_MS,
          );
        }
      }

      document.addEventListener('keydown', (e) => {
        if (!e.ctrlKey || !e.shiftKey || e.key.toLowerCase() !== 'v') return;
        e.preventDefault();
        const r = m.logValidationReport();
        toast(
          `${r.summary.errors} Fehler · ${r.summary.warnings} Warnungen · ${r.summary.info} Infos`,
          'info',
          VALIDATOR_TOAST_MS,
        );
      });
    })
    .catch(() => {});
}

function init() {
  // 1. Device + theme baseline before anything else paints
  detectInputDevice();
  initTheme();

  // 2. Persistence + navigation core
  registerStreak();
  initRouter();
  initNav();
  initSearch();
  initShortcuts();
  initShortcutsOverlay();

  // 3. UI buttons and toggles
  initAddDialectHint();
  initRestartTour();
  initSoundToggle();
  initPaletteToggle();

  // 4. Visual effects (run after layout exists)
  initScrollProgress();
  initSpotlight();
  initMagnetic();
  initTilt();
  initRipple();

  // 5. Background services
  initPwa(toast);
  initNotifications();
  initNetwork(toast);
  initXpHud();
  initGoalEvents(toast);
  mountXpBar();
  mountFooterMeta();

  // 6. Onboarding — small delay so the layout has stabilized
  setTimeout(() => startOnboarding(), ONBOARDING_BOOT_DELAY_MS);
}

init();
initErrorHandlers();
initDevValidator();

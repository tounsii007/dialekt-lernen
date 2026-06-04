// Dialekto · Einstiegspunkt
// Initialisiert Theme, Suche, Tastatursteuerung, Streak und Router.

import { $, toast } from './util.js';
import { registerStreak, MAX_FREEZES, MAX_REPAIRS } from './store.js';
import { initTheme } from './theme.js';
import { initSearch } from './search.js';
import { initShortcuts } from './shortcuts.js';
import { initRouter } from './router.js';
import { initNav } from './nav.js';
import { initSpotlight, initScrollProgress, initMagnetic, initTilt } from './util/motion.js';
import { startOnboarding, resetOnboarding } from './util/onboarding.js';
import { resetTips } from './util/progressive-disclosure.js';
import { isSoundEnabled, setSoundEnabled, sfx } from './util/sounds.js';
import { initPwa } from './util/pwa.js';
import { initNotifications } from './store/notifications.js';
import { initXpHud, renderXpBar } from './util/xp-hud.js';
import { initComboHud } from './util/combo-hud.js';
import { getXp } from './store/xp.js';
import { initNetwork } from './util/network.js';
import { initRipple } from './util/ripple.js';
import { initGoalEvents } from './util/daily-goal.js';
import { initChallenges } from './store/challenges.js';
import { initQuests } from './store/quests.js';
import { initLeague, getLeagueResult, clearLeagueResult, LEAGUE_TIERS } from './store/league.js';
import { initShortcutsOverlay } from './util/shortcuts-overlay.js';
import { initSettings } from './views/settings.js';
import { initTranslations } from './util/translations.js';
import { APP_VERSION_LABEL } from './version.js';
import { DIALEKTE, ALLE_AUSDRUECKE } from '../data/dialekte.js';
import * as api from './util/api.js';
import { syncFavoritenFromBackend } from './store/favorites.js';
import { syncLernstandFromBackend } from './store/srs.js';
import { initProgressSync, syncProgressFromBackend } from './store/progress-sync.js';

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
    resetTips(); // kontextuelle Tipps erneut freischalten
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

// „⚙"-Werkzeug-Popover in der Topbar: Toggle + Außenklick/Escape schließen.
// Die enthaltenen Buttons (Palette/Sound/…) behalten ihre eigenen Handler (per ID).
function initToolsMenu() {
  const tools = document.querySelector('.topbar-tools');
  if (!tools) return;
  const btn = document.getElementById('toolsToggle');
  const menu = tools.querySelector('.topbar-tools-menu');
  if (!btn || !menu) return;
  const setOpen = (open) => {
    menu.hidden = !open;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) document.dispatchEvent(new CustomEvent('dialekto:menuOpen', { detail: menu }));
  };
  btn.addEventListener('click', (e) => { e.stopPropagation(); setOpen(menu.hidden); });
  menu.addEventListener('click', () => setOpen(false));
  document.addEventListener('click', (e) => { if (!tools.contains(e.target)) setOpen(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  // Anderes Topbar-Menü öffnet → dieses schließen.
  document.addEventListener('dialekto:menuOpen', (e) => { if (e.detail !== menu) setOpen(false); });
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

// Auf-/Abstieg der Vorwoche einmalig melden (und damit konsumieren).
function notifyLeagueResult(toast) {
  const r = getLeagueResult();
  if (!r || r.outcome === 'held') return;
  const toName = LEAGUE_TIERS[r.tier]?.name || '';
  if (r.outcome === 'promoted') {
    toast(`🎉 Aufgestiegen in die ${toName}-Liga! (Platz ${r.rank})`, 'success', 4000);
  } else {
    toast(`🔽 Abgestiegen in die ${toName}-Liga (Platz ${r.rank})`, 'info', 4000);
  }
  clearLeagueResult();
}

// Streak-Schutz-Ereignisse als Toasts melden. MUSS vor registerStreak()
// registriert werden, da Freeze/Bruch/Verdienst synchron dort gefeuert werden.
function initStreakEvents() {
  document.addEventListener('dialekto:streak', (e) => {
    const d = e.detail || {};
    switch (d.type) {
      case 'earned':
        if (d.item === 'freeze') {
          toast(`❄️ Streak-Freeze verdient! (${d.freezes}/${MAX_FREEZES})`, 'success', 3000);
        } else if (d.item === 'repair') {
          toast(`🔧 Reparatur-Token verdient! (${d.repairs}/${MAX_REPAIRS})`, 'success', 3000);
        }
        break;
      case 'frozen':
        if (d.usedFreezes === 0 && d.weekendCovered > 0) {
          toast('🛡️ Wochenende übersprungen — dein Streak läuft weiter!', 'success', 3200);
        } else {
          toast(`❄️ Streak gerettet — ${d.usedFreezes} Freeze${d.usedFreezes === 1 ? '' : 's'} eingesetzt.`, 'success', 3200);
        }
        break;
      case 'broken':
        if (d.canRepair) {
          toast(`💔 Streak gerissen (war ${d.prevCount}) — du kannst ihn reparieren! Siehe Favoriten.`, 'info', 4200);
        } else {
          toast(`💔 Dein ${d.prevCount}-Tage-Streak ist gerissen. Neuer Anlauf heute!`, 'info', 3600);
        }
        break;
      case 'repaired':
        toast(`🔧 Streak repariert — zurück auf ${d.count} Tage!`, 'success', 2800);
        break;
    }
  });
}

function initStorageWarning() {
  // state.js feuert dies einmalig, wenn localStorage voll ist — sonst gingen
  // Favoriten/Fortschritt/Notizen unbemerkt verloren.
  window.addEventListener('dialekto:storage-full', () => {
    toast(
      'Speicher ist voll — neue Änderungen werden evtl. nicht gesichert. Exportiere ein Backup über die Favoriten-Seite.',
      'error',
      6000,
    );
  });
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
    const reason = e.reason;
    const name = reason?.name || '';
    const msg = String(reason?.message || reason || '');
    // View-Transition-API rejected promises beim schnellen Hash-Wechsel —
    // harmlos und nicht der User-zeigbare Fehler.
    if (
      name === 'InvalidStateError' ||
      name === 'AbortError' ||
      msg.includes('Transition was aborted') ||
      msg.includes('outdated')
    ) {
      e.preventDefault?.();
      return;
    }
    console.error('[Dialekto] unhandled', reason);
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

// Verbindet sich (nicht-blockierend) mit dem Backend: prüft Erreichbarkeit und
// registriert die anonyme Geräte-ID. Ist das Backend aus, läuft die App im
// bisherigen lokalen Modus weiter (Fallback) — kein Fehler für den Nutzer.
async function initBackend() {
  try {
    if (!(await api.isBackendAvailable())) {
      window.__dialektoBackend = { online: false };
      console.info('[Dialekto] Backend offline — lokaler Modus.');
      return;
    }
    const user = await api.registerUser();
    window.__dialektoBackend = { online: true, userId: user?.id, base: api.getApiBase() };
    document.dispatchEvent(new CustomEvent('dialekto:backendReady', { detail: window.__dialektoBackend }));
    console.info('[Dialekto] Backend verbunden:', api.getApiBase(), '· Nutzer', user?.id);
    // Nutzer-State vom Backend mergen (Favoriten + Lernstand) und bei Änderung neu rendern.
    try {
      const [favChanged, srsChanged, xpChanged] = await Promise.all([
        syncFavoritenFromBackend(),
        syncLernstandFromBackend(),
        syncProgressFromBackend(),
      ]);
      if (favChanged || srsChanged || xpChanged) window.dispatchEvent(new Event('dialekto:route'));
    } catch { /* Fallback: lokaler Stand */ }
  } catch (e) {
    window.__dialektoBackend = { online: false };
    console.info('[Dialekto] Backend nicht erreichbar — lokaler Modus.', e?.message || e);
  }
}

async function init() {
  // 1. Device + theme baseline before anything else paints
  detectInputDevice();
  initTheme();

  // 2. Persistence + navigation core
  initStreakEvents(); // vor registerStreak: fängt Freeze/Bruch/Verdienst ab
  registerStreak();
  // Erklärungs-Übersetzungen laden, bevor die erste View synchron rendert.
  await initTranslations();
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
  initSettings();

  // 4. Visual effects (run after layout exists)
  initScrollProgress();
  initSpotlight();
  initMagnetic();
  initTilt();
  initRipple();

  // 5. Background services
  initProgressSync(); // XP/Streak-Änderungen ans Backend pushen (wenn verbunden)
  initBackend(); // nicht-blockierend: Backend verbinden + Geräte-ID registrieren
  initPwa(toast);
  initNotifications();
  initNetwork(toast);
  initXpHud();
  initComboHud();
  initGoalEvents(toast);
  initChallenges();
  document.addEventListener('dialekto:challengeComplete', (e) => {
    const { label, xp } = e.detail || {};
    toast(`🏆 Challenge abgeschlossen: ${label} (+${xp} XP)`, 'success', 3200);
  });
  initQuests();
  document.addEventListener('dialekto:questComplete', (e) => {
    const { label, xp } = e.detail || {};
    toast(`✅ Quest erledigt: ${label} (+${xp} XP)`, 'success', 3000);
  });
  document.addEventListener('dialekto:questsAllDone', (e) => {
    const { xp } = e.detail || {};
    toast(`🎉 Alle Tages-Quests geschafft! Bonus +${xp} XP`, 'success', 3600);
  });
  initLeague();
  notifyLeagueResult(toast);
  mountXpBar();
  mountFooterMeta();

  // 6. Onboarding — small delay so the layout has stabilized
  setTimeout(() => startOnboarding(), ONBOARDING_BOOT_DELAY_MS);
}

// Fehler-Handler + Speicher-Warnung ZUERST registrieren, damit ein Fehler
// während init() bereits abgefangen und dem User gezeigt wird.
initErrorHandlers();
initStorageWarning();
init();
initDevValidator();

// Onboarding-Tour — modern, auf Basis von driver.js (lokal vendored, js/vendor/driver.js).
// Spotlight-Highlights für Erst-Besucher mit Glas-Popover, Spring-Animation und Tastatur-Steuerung.

import { state, persist } from '../store/state.js';
import { driver } from '../vendor/driver.js';

const STEPS = [
  {
    selector: '.brand',
    icon: '👋',
    title: 'Willkommen bei Dialekto',
    body: 'Eine schöne Sammlung deutscher Dialekte — zum Stöbern und Lernen.',
    placement: 'bottom-start'
  },
  {
    selector: '.nav, .nav-link[data-route="entdecken"]',
    icon: '🧭',
    title: 'Navigation',
    body: 'Wechsle zwischen Start, Entdecken, Lernen, Quiz und Favoriten. Auf Mobile gibts die Nav als schwebendes Dock am unteren Rand.',
    placement: 'bottom'
  },
  {
    selector: '.search-trigger, #searchOpen, .searchPill',
    icon: '🔍',
    title: 'Schnellsuche',
    body: 'Drücke S oder klick hier — die Kommando-Palette findet Aktionen, Dialekte und Ausdrücke.',
    placement: 'bottom-end'
  },
  {
    selector: '.daily, .daily-expr',
    icon: '📅',
    title: 'Ausdruck des Tages',
    body: 'Jeden Tag eine neue Redewendung. Tippe auf 🔊 zum Anhören.',
    placement: 'bottom'
  },
  {
    selector: '.dialekt-grid .dialekt-card, .dialekt-card',
    icon: '🗺️',
    title: 'Dialekt-Karten',
    body: 'Tippe eine Karte für alle Ausdrücke einer Region. Bewege die Maus über die Karte — sie kippt in 3D.',
    placement: 'top'
  }
];

let activeDriver = null;

function isOnboarded() {
  return !!state.onboarded;
}

export function markOnboarded() {
  state.onboarded = true;
  persist();
}

function placementToSides(placement) {
  const [side, align] = placement.split('-');
  return { side: side || 'bottom', align: align || 'center' };
}

// Resolve each step against the live DOM; skip steps whose target is absent.
function buildSteps() {
  return STEPS.map((step) => {
    const sel = step.selector
      .split(',')
      .map((s) => s.trim())
      .find((s) => document.querySelector(s));
    if (!sel) return null;
    const { side, align } = placementToSides(step.placement);
    return {
      element: sel,
      popover: {
        title: `<span class="tour-ico" aria-hidden="true">${step.icon || '✨'}</span><span class="tour-ttl">${step.title}</span>`,
        description: step.body,
        side,
        align
      }
    };
  }).filter(Boolean);
}

export function startOnboarding({ force = false } = {}) {
  if (!force && isOnboarded()) return;
  if (activeDriver) return;

  const steps = buildSteps();
  if (!steps.length) return;

  activeDriver = driver({
    steps,
    showProgress: true,
    progressText: 'Schritt {{current}} von {{total}}',
    nextBtnText: 'Weiter →',
    prevBtnText: '← Zurück',
    doneBtnText: 'Loslegen 🚀',
    popoverClass: 'dialekto-tour',
    overlayColor: '#070712',
    overlayOpacity: 0.62,
    stagePadding: 8,
    stageRadius: 18,
    smoothScroll: true,
    allowClose: true,
    disableActiveInteraction: true,
    allowKeyboardControl: true,
    onDestroyed: () => {
      activeDriver = null;
      markOnboarded();
    }
  });

  activeDriver.drive();
}

export function resetOnboarding() {
  state.onboarded = false;
  persist();
}

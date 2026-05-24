// Onboarding-Tour — Spotlight-Highlights für Erst-Besucher.
// Zeigt 3-4 Schritte mit Tooltips und überspringbarem Flow.

import { state, persist } from '../store/state.js';

const STEPS = [
  {
    selector: '.brand',
    title: 'Willkommen bei Dialekto',
    body: 'Eine schöne Sammlung deutscher Dialekte — zum Stöbern und Lernen.',
    placement: 'bottom-start'
  },
  {
    selector: '.nav, .nav-link[data-route="entdecken"]',
    title: 'Navigation',
    body: 'Wechsle zwischen Start, Entdecken, Lernen, Quiz und Favoriten. Auf Mobile gibts die Nav als schwebendes Dock am unteren Rand.',
    placement: 'bottom'
  },
  {
    selector: '.searchPill, #searchOpen',
    title: 'Schnellsuche',
    body: 'Drücke S oder klick hier — die Kommando-Palette findet Aktionen, Dialekte und Ausdrücke.',
    placement: 'bottom-end'
  },
  {
    selector: '.daily, .daily-expr',
    title: 'Ausdruck des Tages',
    body: 'Jeden Tag eine neue Redewendung. Tippe auf 🔊 zum Anhören.',
    placement: 'bottom'
  },
  {
    selector: '.dialekt-grid .dialekt-card, .dialekt-card',
    title: 'Dialekt-Karten',
    body: 'Tippe eine Karte für alle Ausdrücke einer Region. Bewege die Maus über die Karte — sie kippt in 3D.',
    placement: 'top'
  }
];

let activeOverlay = null;
let currentStep = 0;

function isOnboarded() {
  return !!state.onboarded;
}

export function markOnboarded() {
  state.onboarded = true;
  persist();
}

export function startOnboarding({ force = false } = {}) {
  if (!force && isOnboarded()) return;
  if (activeOverlay) return;
  currentStep = 0;
  renderStep();
}

function renderStep() {
  cleanup();
  const step = STEPS[currentStep];
  if (!step) { finish(); return; }
  const target = document.querySelector(step.selector.split(',').map(s => s.trim()).find(s => document.querySelector(s)) || step.selector);
  if (!target) { currentStep++; renderStep(); return; }

  const rect = target.getBoundingClientRect();
  const pad = 10;

  const overlay = document.createElement('div');
  overlay.className = 'onboard-overlay';
  overlay.innerHTML = `
    <div class="onboard-mask"></div>
    <div class="onboard-hole" style="left:${rect.left - pad}px;top:${rect.top - pad}px;width:${rect.width + pad*2}px;height:${rect.height + pad*2}px;"></div>
    <div class="onboard-card" data-placement="${step.placement}">
      <div class="onboard-progress">
        ${STEPS.map((_, i) => `<span class="onboard-pip${i === currentStep ? ' active' : ''}${i < currentStep ? ' done' : ''}"></span>`).join('')}
      </div>
      <h3 class="onboard-title">${step.title}</h3>
      <p class="onboard-body">${step.body}</p>
      <div class="onboard-actions">
        <button class="onboard-btn skip">Tour beenden</button>
        <div class="onboard-nav">
          ${currentStep > 0 ? '<button class="onboard-btn back">← Zurück</button>' : ''}
          <button class="onboard-btn next">${currentStep === STEPS.length - 1 ? 'Loslegen 🚀' : 'Weiter →'}</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  activeOverlay = overlay;

  // Position the card relative to target
  requestAnimationFrame(() => positionCard(overlay, rect, step.placement));

  // Wire actions
  overlay.querySelector('.skip').addEventListener('click', finish);
  overlay.querySelector('.next').addEventListener('click', () => { currentStep++; renderStep(); });
  overlay.querySelector('.back')?.addEventListener('click', () => { currentStep = Math.max(0, currentStep - 1); renderStep(); });
  overlay.addEventListener('keydown', handleKey);
  overlay.tabIndex = -1; overlay.focus();
  document.addEventListener('keydown', handleKey);
  // Highlight pulse on target
  target.classList.add('onboard-target');
}

function positionCard(overlay, rect, placement) {
  const card = overlay.querySelector('.onboard-card');
  const cr = card.getBoundingClientRect();
  const gap = 18;
  const vw = window.innerWidth, vh = window.innerHeight;
  let x, y;
  if (placement.startsWith('bottom')) {
    y = rect.bottom + gap;
    x = placement === 'bottom-end' ? rect.right - cr.width : placement === 'bottom-start' ? rect.left : rect.left + rect.width / 2 - cr.width / 2;
  } else if (placement.startsWith('top')) {
    y = rect.top - cr.height - gap;
    x = rect.left + rect.width / 2 - cr.width / 2;
  } else if (placement === 'left') {
    x = rect.left - cr.width - gap;
    y = rect.top + rect.height / 2 - cr.height / 2;
  } else {
    x = rect.right + gap;
    y = rect.top + rect.height / 2 - cr.height / 2;
  }
  // Clamp
  x = Math.max(12, Math.min(x, vw - cr.width - 12));
  y = Math.max(12, Math.min(y, vh - cr.height - 12));
  card.style.transform = `translate(${x}px, ${y}px)`;
}

function handleKey(e) {
  if (!activeOverlay) return;
  if (e.key === 'Escape') { e.preventDefault(); finish(); }
  else if (e.key === 'ArrowRight' || e.key === 'Enter') { e.preventDefault(); currentStep++; renderStep(); }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); currentStep = Math.max(0, currentStep - 1); renderStep(); }
}

function cleanup() {
  document.querySelectorAll('.onboard-target').forEach((n) => n.classList.remove('onboard-target'));
  if (activeOverlay && activeOverlay.parentNode) activeOverlay.parentNode.removeChild(activeOverlay);
  activeOverlay = null;
  document.removeEventListener('keydown', handleKey);
}

function finish() {
  cleanup();
  markOnboarded();
}

export function resetOnboarding() {
  state.onboarded = false;
  persist();
}

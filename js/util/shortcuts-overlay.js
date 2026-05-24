// Tastenkürzel-Overlay — öffnet sich mit ? und zeigt alle Shortcuts

import { el } from '../util.js';

const GROUPS = [
  {
    title: 'Navigation',
    shortcuts: [
      { key: 'H', desc: 'Startseite' },
      { key: 'E', desc: 'Dialekte entdecken' },
      { key: 'L', desc: 'Karteikarten lernen' },
      { key: 'Q', desc: 'Quiz starten' },
      { key: 'F', desc: 'Favoriten öffnen' },
      { key: 'K', desc: 'Dialekt-Karte' },
    ]
  },
  {
    title: 'Suche',
    shortcuts: [
      { key: 'S', desc: 'Suche / Command-Palette öffnen' },
      { key: 'Esc', desc: 'Suche / Dialog schließen' },
      { key: '↑ ↓', desc: 'In Suchergebnissen navigieren' },
      { key: '↵', desc: 'Auswahl bestätigen' },
    ]
  },
  {
    title: 'Karteikarten',
    shortcuts: [
      { key: '←', desc: 'Vorherige Karte' },
      { key: '→', desc: 'Nächste Karte' },
      { key: 'Leertaste', desc: 'Karte umdrehen' },
      { key: '1', desc: 'Schwer bewerten' },
      { key: '2', desc: 'Mittel bewerten' },
      { key: '3', desc: 'Leicht bewerten' },
    ]
  },
  {
    title: 'Quiz',
    shortcuts: [
      { key: '1–4', desc: 'Antwort A–D auswählen' },
    ]
  },
  {
    title: 'UI',
    shortcuts: [
      { key: 'T', desc: 'Hell / Dunkel umschalten' },
      { key: 'M', desc: 'Sounds ein / aus' },
      { key: 'Ctrl+Shift+V', desc: 'Daten-Validator (Dev)' },
      { key: '?', desc: 'Dieses Cheat-Sheet' },
    ]
  }
];

let overlayEl = null;

function build() {
  const backdrop = el('div', {
    class: 'kbd-overlay-backdrop',
    onClick: (e) => { if (e.target === backdrop) close(); }
  });
  const panel = el('div', { class: 'kbd-overlay-panel', role: 'dialog', ariaLabel: 'Tastenkürzel', ariaModal: 'true' });

  panel.appendChild(el('div', { class: 'kbd-overlay-head' },
    el('h2', {}, '⌨️ Tastenkürzel'),
    el('button', { class: 'kbd-overlay-close', ariaLabel: 'Schließen', onClick: close }, '✕')
  ));

  const body = el('div', { class: 'kbd-overlay-body' });
  GROUPS.forEach(g => {
    const group = el('div', { class: 'kbd-group' },
      el('div', { class: 'kbd-group-title' }, g.title)
    );
    g.shortcuts.forEach(s => {
      group.appendChild(el('div', { class: 'kbd-row' },
        el('kbd', { class: 'kbd kbd-overlay-key' }, s.key),
        el('span', {}, s.desc)
      ));
    });
    body.appendChild(group);
  });
  panel.appendChild(body);
  backdrop.appendChild(panel);
  return backdrop;
}

export function openShortcutsOverlay() {
  if (overlayEl && document.body.contains(overlayEl)) {
    close(); return;
  }
  overlayEl = build();
  document.body.appendChild(overlayEl);
  requestAnimationFrame(() => overlayEl?.classList.add('is-open'));
  // Focus trap
  const firstFocusable = overlayEl.querySelector('button, [tabindex="0"]');
  if (firstFocusable) firstFocusable.focus();
}

function close() {
  if (!overlayEl) return;
  overlayEl.classList.remove('is-open');
  overlayEl.addEventListener('transitionend', () => overlayEl?.remove(), { once: true });
}

export function initShortcutsOverlay() {
  document.addEventListener('keydown', (e) => {
    if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
      const tag = (e.target?.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || e.target?.isContentEditable) return;
      e.preventDefault();
      openShortcutsOverlay();
    }
    if (e.key === 'Escape' && overlayEl && document.body.contains(overlayEl)) {
      close();
    }
  });
}

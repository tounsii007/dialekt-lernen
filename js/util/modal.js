// Wiederverwendbares Modal-Overlay — angelehnt an .kbd-overlay-* Stile.
// API:
//   openModal({ title, content, actions }) → schließt sich bei Klick auf Backdrop, ESC, oder Action.
// Liefert das Backdrop-Element zurück; close() schließt es manuell.

import { el } from './dom.js';

let activeBackdrop = null;
let activePanel = null;
let lastFocused = null;
let activeOnClose = null;

const FOCUSABLE_SEL = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function focusableInPanel() {
  if (!activePanel || typeof activePanel.querySelectorAll !== 'function') return [];
  return Array.from(activePanel.querySelectorAll(FOCUSABLE_SEL));
}

export function closeModal() {
  if (!activeBackdrop) return;
  const b = activeBackdrop;
  const toRestore = lastFocused;
  const cb = activeOnClose;
  activeBackdrop = null;
  activePanel = null;
  lastFocused = null;
  activeOnClose = null;
  b.classList.remove('is-open');
  setTimeout(() => b.remove(), 300);
  document.removeEventListener('keydown', onKeydown);
  // Fokus zurück auf das auslösende Element (vor dem Ausblenden, damit der
  // Nutzer den Kontext nicht verliert).
  if (toRestore && typeof toRestore.focus === 'function') {
    try { toRestore.focus(); } catch { /* Element evtl. nicht mehr im DOM */ }
  }
  // onClose feuert genau einmal bei jedem Schließen (ESC, Backdrop, ×, Action).
  // Aufrufer unterscheiden „bestätigt" vs. „abgebrochen" über ein eigenes Flag.
  if (cb) cb();
}

// ESC schließt; Tab/Shift+Tab bleiben im Panel gefangen (Focus-Trap).
function onKeydown(e) {
  if (e.key === 'Escape') { closeModal(); return; }
  if (e.key !== 'Tab' || !activePanel) return;

  const items = focusableInPanel();
  if (items.length === 0) { e.preventDefault(); return; }

  const first = items[0];
  const last = items[items.length - 1];
  const active = (typeof document !== 'undefined') ? document.activeElement : null;
  const inPanel = !!active && active !== activePanel && activePanel.contains(active);

  if (e.shiftKey) {
    if (!inPanel || active === first) { e.preventDefault(); last.focus(); }
  } else {
    if (!inPanel || active === last) { e.preventDefault(); first.focus(); }
  }
}

/**
 * openModal — generisches Overlay.
 * @param {{
 *   title: string,
 *   content: Node|Node[],
 *   actions?: Array<{ label: string, onClick: () => (void|Promise<void>), variant?: 'primary'|'secondary'|'ghost'|'danger' }>,
 *   onClose?: () => void
 * }} opts
 */
export function openModal({ title, content, actions = [], onClose } = {}) {
  // Falls schon eines offen ist, erst schließen.
  if (activeBackdrop) closeModal();

  // Auslösendes Element merken, um den Fokus beim Schließen wiederherzustellen.
  lastFocused = (typeof document !== 'undefined') ? document.activeElement : null;
  activeOnClose = onClose || null;

  const body = el('div', { class: 'kbd-overlay-body', style: { display: 'block' } });
  const children = Array.isArray(content) ? content : [content];
  children.forEach(c => { if (c) body.appendChild(c); });

  const closeBtn = el('button', {
    class: 'kbd-overlay-close',
    'aria-label': 'Schließen',
    onClick: () => closeModal()
  }, '×');

  const actionRow = el('div', {
    style: { display: 'flex', gap: '8px', padding: '12px 24px 16px', justifyContent: 'flex-end', borderTop: '1px solid var(--border)' }
  });
  actions.forEach(a => {
    const variant = a.variant || 'secondary';
    const cls = variant === 'primary' ? 'btn btn-primary'
      : variant === 'danger' ? 'btn btn-ghost danger-btn'
      : variant === 'ghost' ? 'btn btn-ghost'
      : 'btn btn-secondary';
    const btn = el('button', {
      class: cls,
      onClick: async () => {
        const res = a.onClick ? await a.onClick({ close: closeModal }) : undefined;
        if (res !== false) closeModal();
      }
    }, a.label);
    actionRow.appendChild(btn);
  });

  const panel = el('div', {
    class: 'kbd-overlay-panel',
    role: 'dialog',
    'aria-modal': 'true',
    'aria-label': title || 'Dialog',
    tabindex: '-1',
    onClick: (e) => e.stopPropagation()
  },
    el('div', { class: 'kbd-overlay-head' },
      el('h2', {}, title || ''),
      closeBtn
    ),
    body,
    actions.length ? actionRow : null
  );

  const backdrop = el('div', {
    class: 'kbd-overlay-backdrop',
    onClick: () => closeModal()
  }, panel);

  document.body.appendChild(backdrop);
  // Force reflow für Transition.
  void backdrop.offsetWidth;
  backdrop.classList.add('is-open');

  activeBackdrop = backdrop;
  activePanel = panel;
  document.addEventListener('keydown', onKeydown);

  // Initialfokus in den Dialog setzen (Panel-Container → kündigt aria-label an,
  // ohne versehentlich eine Aktion vorzubelegen).
  try { panel.focus(); } catch { /* FakeDOM: focus() ist No-op */ }

  return backdrop;
}

/**
 * confirmModal — kleines Confirm-Dialog. Liefert ein Promise<boolean>.
 */
export function confirmModal({ title = 'Bestätigen', message, confirmLabel = 'OK', cancelLabel = 'Abbrechen', danger = false } = {}) {
  return new Promise((resolve) => {
    let answered = false;
    openModal({
      title,
      content: el('p', { style: { margin: '12px 0', lineHeight: '1.5' } }, message),
      actions: [
        {
          label: cancelLabel,
          variant: 'ghost',
          onClick: () => { answered = true; resolve(false); }
        },
        {
          label: confirmLabel,
          variant: danger ? 'danger' : 'primary',
          onClick: () => { answered = true; resolve(true); }
        }
      ],
      onClose: () => { if (!answered) resolve(false); }
    });
  });
}

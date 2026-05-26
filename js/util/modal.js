// Wiederverwendbares Modal-Overlay — angelehnt an .kbd-overlay-* Stile.
// API:
//   openModal({ title, content, actions }) → schließt sich bei Klick auf Backdrop, ESC, oder Action.
// Liefert das Backdrop-Element zurück; close() schließt es manuell.

import { el } from './dom.js';

let activeBackdrop = null;

export function closeModal() {
  if (!activeBackdrop) return;
  const b = activeBackdrop;
  activeBackdrop = null;
  b.classList.remove('is-open');
  setTimeout(() => b.remove(), 300);
  document.removeEventListener('keydown', onEsc);
}

function onEsc(e) {
  if (e.key === 'Escape') closeModal();
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

  const body = el('div', { class: 'kbd-overlay-body', style: { display: 'block' } });
  const children = Array.isArray(content) ? content : [content];
  children.forEach(c => { if (c) body.appendChild(c); });

  const closeBtn = el('button', {
    class: 'kbd-overlay-close',
    'aria-label': 'Schließen',
    onClick: () => { closeModal(); if (onClose) onClose(); }
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
    onClick: () => { closeModal(); if (onClose) onClose(); }
  }, panel);

  document.body.appendChild(backdrop);
  // Force reflow für Transition.
  void backdrop.offsetWidth;
  backdrop.classList.add('is-open');

  activeBackdrop = backdrop;
  document.addEventListener('keydown', onEsc);

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

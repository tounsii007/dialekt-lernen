// Zweistufige Inline-Bestätigung als Ersatz für das blockierende, ungestylte
// window.confirm(). Zeigt einen Auslöser-Button; beim Klick verwandelt er sich
// an Ort und Stelle in eine Warnbox mit „Abbrechen" / Bestätigen. Nach einem
// Timeout (Default 6 s) fällt er ohne Aktion in den Ausgangszustand zurück.
//
// App-weit genutzt (Einstellungen-Reset, Favoriten-Reset, …) für eine
// einheitliche, nicht-blockierende Bestätigungs-UX.

import { el } from '../util.js';

export function inlineConfirm({
  label,
  triggerClass = 'btn btn-ghost set-danger',
  message,
  confirmLabel = 'Ja, fortfahren',
  cancelLabel = 'Abbrechen',
  onConfirm,
  timeout = 6000,
}) {
  const wrap = el('div', { class: 'inline-confirm' });
  let revertTimer = null;

  const renderIdle = () => {
    if (revertTimer) { clearTimeout(revertTimer); revertTimer = null; }
    wrap.innerHTML = '';
    wrap.appendChild(el('button', {
      type: 'button', class: triggerClass, onClick: renderConfirm,
    }, label));
  };

  const renderConfirm = () => {
    wrap.innerHTML = '';
    const box = el('div', { class: 'inline-confirm-box' },
      el('div', { class: 'inline-confirm-msg' }, message),
      el('div', { class: 'inline-confirm-actions' },
        el('button', { type: 'button', class: 'btn btn-ghost', onClick: renderIdle }, cancelLabel),
        el('button', {
          type: 'button', class: 'btn inline-confirm-go',
          onClick: () => { try { onConfirm(); } catch {} },
        }, confirmLabel)
      )
    );
    wrap.appendChild(box);
    if (timeout) revertTimer = setTimeout(renderIdle, timeout);
    const cancel = box.querySelector('.btn-ghost');
    if (cancel) cancel.focus();
  };

  renderIdle();
  return wrap;
}

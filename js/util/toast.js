// Toast-Benachrichtigungen.

import { el } from './dom.js';

const DEFAULT_DURATION_MS = 2400;
const LEAVE_ANIMATION_MS = 350;
const CONTAINER_ID = 'toastContainer';

export function toast(message, type = 'info', duration = DEFAULT_DURATION_MS) {
  const container = document.getElementById(CONTAINER_ID);
  if (!container) return null;

  // Rolle je Schweregrad: Fehler/Warnungen assertiv (role=alert) ansagen,
  // sonst höflich (role=status). Der Container ist global aria-live=polite;
  // role=alert hebt das pro Toast auf assertive an.
  const role = (type === 'error' || type === 'warning') ? 'alert' : 'status';
  const node = el('div', { class: `toast ${type}`, role }, message);
  container.appendChild(node);

  setTimeout(() => {
    node.classList.add('is-leaving');
    setTimeout(() => node.remove(), LEAVE_ANIMATION_MS);
  }, duration);

  return node;
}

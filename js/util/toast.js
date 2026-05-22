// Toast-Benachrichtigungen.

import { el } from './dom.js';

const DEFAULT_DURATION_MS = 2400;
const LEAVE_ANIMATION_MS = 350;
const CONTAINER_ID = 'toastContainer';

export function toast(message, type = 'info', duration = DEFAULT_DURATION_MS) {
  const container = document.getElementById(CONTAINER_ID);
  if (!container) return null;

  const node = el('div', { class: `toast ${type}` }, message);
  container.appendChild(node);

  setTimeout(() => {
    node.classList.add('is-leaving');
    setTimeout(() => node.remove(), LEAVE_ANIMATION_MS);
  }, duration);

  return node;
}

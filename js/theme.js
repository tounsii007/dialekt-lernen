// Dialekto · Theme-Umschalter
// Klick-Logik für den Theme-Button (Hell/Dunkel/Auto).

import { $, toast } from './util.js';
import { applyTheme, cycleTheme } from './store.js';

const THEME_LABELS = {
  light: 'Hell',
  dark: 'Dunkel',
  auto: 'Automatisch'
};

const THEME_TOAST_MS = 1200;

export function initTheme() {
  applyTheme();
  const btn = $('#themeToggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const next = cycleTheme();
    toast(`Modus: ${THEME_LABELS[next] ?? next}`, 'info', THEME_TOAST_MS);
  });
}

// Dialekto · Globale Tastatursteuerung
// Reicht Tastenereignisse je nach Kontext an Such-Overlay, Lern- oder Quiz-View weiter.

import { cycleTheme } from './store.js';
import { openSearch, closeSearch, isSearchOpen } from './search.js';

// Lazy-handle: nur falls die Module bereits geladen wurden, sonst no-op.
async function delegateLernKey(e) {
  try {
    const m = await import('./views/lernen.js');
    m.handleLernKey?.(e);
  } catch {}
}
async function delegateQuizKey(e) {
  try {
    const m = await import('./views/quiz.js');
    m.handleQuizKey?.(e);
  } catch {}
}

const SEARCH_KEYS = new Set(['s', 'S', '/']);
const THEME_KEYS = new Set(['t', 'T']);
const TYPING_TAGS = new Set(['INPUT', 'TEXTAREA']);

function isTyping(target) {
  if (!target) return false;
  if (TYPING_TAGS.has(target.tagName)) return true;
  return target.isContentEditable === true;
}

function onKeydown(e) {
  if (e.key === 'Escape' && isSearchOpen()) {
    closeSearch();
    return;
  }
  if (isTyping(e.target)) return;

  if (SEARCH_KEYS.has(e.key)) {
    e.preventDefault();
    openSearch();
    return;
  }
  if (THEME_KEYS.has(e.key)) {
    cycleTheme();
    return;
  }
  // Nur Tasten, die in den Lern-/Quiz-Modus relevant sind, delegieren.
  if (e.key === ' ' || e.key.startsWith('Arrow') || (e.key >= '1' && e.key <= '4')) {
    delegateLernKey(e);
    delegateQuizKey(e);
  }
}

export function initShortcuts() {
  window.addEventListener('keydown', onKeydown);
}

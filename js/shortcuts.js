// Dialekto · Globale Tastatursteuerung
// Reicht Tastenereignisse je nach Kontext an Such-Overlay, Lern- oder Quiz-View weiter.

import { cycleTheme } from './store.js';
import { openSearch, closeSearch, isSearchOpen } from './search.js';
import { handleLernKey } from './views/lernen.js';
import { handleQuizKey } from './views/quiz.js';

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
  handleLernKey(e);
  handleQuizKey(e);
}

export function initShortcuts() {
  window.addEventListener('keydown', onKeydown);
}

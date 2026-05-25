// Dialekto · Globale Tastatursteuerung
// Reicht Tastenereignisse je nach Kontext an Such-Overlay, Lern- oder Quiz-View weiter.

import { cycleTheme } from './store.js';
import { openSearch, closeSearch, isSearchOpen } from './search.js';

const SEARCH_KEYS = new Set(['s', 'S', '/']);
const THEME_KEYS = new Set(['t', 'T']);
const TYPING_TAGS = new Set(['INPUT', 'TEXTAREA']);

/** View-modal keys forwarded to the Lern/Quiz screen when one is mounted. */
function isViewKey(key) {
  if (key === ' ' || key.startsWith('Arrow')) return true;
  return key >= '1' && key <= '4';
}

function isTyping(target) {
  if (!target) return false;
  if (TYPING_TAGS.has(target.tagName)) return true;
  return target.isContentEditable === true;
}

/**
 * Lazy-loaded view-key forwarder. Imports the view module only if it's
 * available — if the view isn't currently mounted (and thus its module
 * hasn't been imported elsewhere), the dynamic import is a no-op and
 * the catch swallows the failure.
 */
async function delegateViewKey(modulePath, handlerName, e) {
  try {
    const m = await import(modulePath);
    m[handlerName]?.(e);
  } catch {
    // View not loaded — nothing to forward to.
  }
}

function onKeydown(e) {
  // Escape closes the search overlay even from inside an input.
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

  if (isViewKey(e.key)) {
    delegateViewKey('./views/lernen.js', 'handleLernKey', e);
    delegateViewKey('./views/quiz.js', 'handleQuizKey', e);
  }
}

export function initShortcuts() {
  window.addEventListener('keydown', onKeydown);
}

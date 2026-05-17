// Dialekto · Hauptmodul
// Router, Theme, Suche und globale Tastatursteuerung

import { $, $$, el, parseHash, go, debounce, normalize, toast } from './util.js';
import { applyTheme, cycleTheme, registerStreak } from './store.js';
import { ALLE_AUSDRUECKE, DIALEKTE } from '../data/dialekte.js';
import { renderHome } from './views/home.js';
import { renderEntdecken } from './views/entdecken.js';
import { renderDialektDetail } from './views/dialektDetail.js';
import { renderLernen, handleLernKey, resetLernSession } from './views/lernen.js';
import { renderQuiz, handleQuizKey, resetQuizSession } from './views/quiz.js';
import { renderFavoriten } from './views/favoriten.js';

const app = $('#app');

// --- Routing ---
function router() {
  const { segs, params } = parseHash();
  const route = segs[0] || 'home';

  // Aktive Nav-Klasse
  $$('.nav-link').forEach(a => {
    a.classList.toggle('is-active', a.dataset.route === (route === '' ? 'home' : route));
  });

  // Lernsession zurücksetzen, wenn man die Seite verlässt
  if (route !== 'lernen') resetLernSession();
  if (route !== 'quiz') resetQuizSession();

  window.scrollTo({ top: 0, behavior: 'smooth' });

  switch (route) {
    case 'home':
    case '':
      return renderHome(app);
    case 'entdecken':
      return renderEntdecken(app);
    case 'dialekt': {
      const id = segs[1];
      return renderDialektDetail(app, id);
    }
    case 'lernen':
      return renderLernen(app, params);
    case 'quiz':
      return renderQuiz(app);
    case 'favoriten':
      return renderFavoriten(app);
    default:
      return renderHome(app);
  }
}

window.addEventListener('hashchange', router);

// --- Theme ---
function initTheme() {
  applyTheme();
  $('#themeToggle').addEventListener('click', () => {
    const next = cycleTheme();
    const label = next === 'light' ? 'Hell' : next === 'dark' ? 'Dunkel' : 'Automatisch';
    toast(`Modus: ${label}`, 'info', 1200);
  });
}

// --- Suche ---
const overlay = $('#searchOverlay');
const searchInput = $('#searchInput');
const results = $('#searchResults');

function openSearch() {
  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
  searchInput.value = '';
  setTimeout(() => searchInput.focus(), 50);
  renderSearchResults('');
}
function closeSearch() {
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
}
function renderSearchResults(query) {
  results.innerHTML = '';
  const n = normalize(query);
  let items;
  if (!n) {
    // Vorschläge: Dialekte
    items = DIALEKTE.slice(0, 6).map(d => ({
      type: 'dialekt',
      label: d.name,
      meta: d.region + ' · ' + d.ausdruecke.length + ' Ausdrücke',
      flag: d.flag,
      onClick: () => { closeSearch(); go(`#/dialekt/${d.id}`); }
    }));
  } else {
    const matches = ALLE_AUSDRUECKE.filter(a =>
      normalize(a.ausdruck).includes(n) ||
      normalize(a.hochdeutsch).includes(n) ||
      normalize(a.bedeutung).includes(n)
    ).slice(0, 20);
    items = matches.map(a => ({
      type: 'ausdruck',
      label: a.ausdruck,
      meta: '↦ ' + a.hochdeutsch + ' · ' + a.dialektName,
      flag: a.dialektFlag,
      onClick: () => { closeSearch(); go(`#/dialekt/${a.dialektId}`); }
    }));
  }
  if (!items.length) {
    results.appendChild(el('div', { class: 'search-empty' }, 'Keine Treffer.'));
    return;
  }
  items.forEach((it, i) => {
    results.appendChild(el('div', {
      class: 'search-result' + (i === 0 ? ' is-active' : ''),
      onClick: it.onClick,
      dataset: { idx: i }
    },
      el('span', { class: 'search-result-flag' }, it.flag),
      el('div', { class: 'search-result-text' },
        el('div', { class: 'search-result-expr' }, it.label),
        el('div', { class: 'search-result-meta' }, it.meta)
      )
    ));
  });
}
const debouncedSearch = debounce(renderSearchResults, 150);

function initSearch() {
  $('#searchOpen').addEventListener('click', openSearch);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeSearch();
  });
  searchInput.addEventListener('input', (e) => debouncedSearch(e.target.value));
  searchInput.addEventListener('keydown', (e) => {
    const items = $$('.search-result');
    const active = $('.search-result.is-active');
    let idx = items.indexOf(active);
    if (e.key === 'Escape') {
      closeSearch();
    } else if (e.key === 'Enter') {
      if (active) active.click();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      idx = Math.min(idx + 1, items.length - 1);
      items.forEach(x => x.classList.remove('is-active'));
      items[idx]?.classList.add('is-active');
      items[idx]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      idx = Math.max(idx - 1, 0);
      items.forEach(x => x.classList.remove('is-active'));
      items[idx]?.classList.add('is-active');
      items[idx]?.scrollIntoView({ block: 'nearest' });
    }
  });
}

// --- Tastatursteuerung ---
function initShortcuts() {
  window.addEventListener('keydown', (e) => {
    const tag = e.target.tagName;
    const isTyping = tag === 'INPUT' || tag === 'TEXTAREA';

    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeSearch();
      return;
    }
    if (isTyping) return;

    if (e.key === 's' || e.key === 'S' || e.key === '/') {
      e.preventDefault();
      openSearch();
    } else if (e.key === 't' || e.key === 'T') {
      cycleTheme();
    } else {
      handleLernKey(e);
      handleQuizKey(e);
    }
  });
}

// --- Init ---
function init() {
  initTheme();
  initSearch();
  initShortcuts();

  $('#addDialectHint').addEventListener('click', () => {
    toast('Dialekte können einfach in /data/dialekte/ als JS-Datei ergänzt werden — siehe README!', 'info', 4000);
  });

  registerStreak();
  router();
}

init();

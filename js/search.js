// Dialekto · Such-Overlay
// Volltextsuche über Dialekte und Ausdrücke mit Tastatursteuerung.

import { $, $$, el, debounce, normalize, go } from './util.js';
import { ALLE_AUSDRUECKE, DIALEKTE } from '../data/dialekte.js';

const MAX_SUGGESTIONS = 6;
const MAX_RESULTS = 20;
const FOCUS_DELAY_MS = 50;
const DEBOUNCE_MS = 150;

let overlay;
let searchInput;
let results;

function buildSuggestions() {
  return DIALEKTE.slice(0, MAX_SUGGESTIONS).map(d => ({
    label: d.name,
    meta: `${d.region} · ${d.ausdruecke.length} Ausdrücke`,
    flag: d.flag,
    onClick: () => { closeSearch(); go(`#/dialekt/${d.id}`); }
  }));
}

function matchAusdruck(needle, a) {
  return normalize(a.ausdruck).includes(needle)
    || normalize(a.hochdeutsch).includes(needle)
    || normalize(a.bedeutung).includes(needle);
}

function buildMatches(needle) {
  return ALLE_AUSDRUECKE
    .filter(a => matchAusdruck(needle, a))
    .slice(0, MAX_RESULTS)
    .map(a => ({
      label: a.ausdruck,
      meta: `↦ ${a.hochdeutsch} · ${a.dialektName}`,
      flag: a.dialektFlag,
      onClick: () => { closeSearch(); go(`#/dialekt/${a.dialektId}`); }
    }));
}

function renderItem(item, idx) {
  return el('div', {
    class: 'search-result' + (idx === 0 ? ' is-active' : ''),
    onClick: item.onClick,
    dataset: { idx }
  },
    el('span', { class: 'search-result-flag' }, item.flag),
    el('div', { class: 'search-result-text' },
      el('div', { class: 'search-result-expr' }, item.label),
      el('div', { class: 'search-result-meta' }, item.meta)
    )
  );
}

function renderSearchResults(query) {
  results.innerHTML = '';
  const needle = normalize(query);
  const items = needle ? buildMatches(needle) : buildSuggestions();

  if (!items.length) {
    results.appendChild(el('div', { class: 'search-empty' }, 'Keine Treffer.'));
    return;
  }
  items.forEach((item, i) => results.appendChild(renderItem(item, i)));
}

function moveActive(delta) {
  const items = $$('.search-result');
  if (!items.length) return;
  const active = $('.search-result.is-active');
  const current = active ? items.indexOf(active) : -1;
  const next = Math.max(0, Math.min(items.length - 1, current + delta));
  items.forEach(x => x.classList.remove('is-active'));
  items[next]?.classList.add('is-active');
  items[next]?.scrollIntoView({ block: 'nearest' });
}

function onKeydown(e) {
  if (e.key === 'Escape') { closeSearch(); return; }
  if (e.key === 'Enter') { $('.search-result.is-active')?.click(); return; }
  if (e.key === 'ArrowDown') { e.preventDefault(); moveActive(1); return; }
  if (e.key === 'ArrowUp')   { e.preventDefault(); moveActive(-1); }
}

export function openSearch() {
  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
  searchInput.value = '';
  setTimeout(() => searchInput.focus(), FOCUS_DELAY_MS);
  renderSearchResults('');
}

export function closeSearch() {
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
}

export function isSearchOpen() {
  return overlay?.classList.contains('is-open') ?? false;
}

export function initSearch() {
  overlay     = $('#searchOverlay');
  searchInput = $('#searchInput');
  results     = $('#searchResults');
  if (!overlay || !searchInput || !results) return;

  const debouncedRender = debounce(renderSearchResults, DEBOUNCE_MS);

  $('#searchOpen')?.addEventListener('click', openSearch);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });
  searchInput.addEventListener('input', e => debouncedRender(e.target.value));
  searchInput.addEventListener('keydown', onKeydown);
}

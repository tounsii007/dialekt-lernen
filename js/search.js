// Dialekto · Command palette
// Categorised commands + dialects + expressions, with recent searches.

import { $, $$, el, debounce, normalize, go } from './util.js';
import { ALLE_AUSDRUECKE, DIALEKTE } from '../data/dialekte.js';
import { icon } from './util/icons.js';
import { fuzzyDialekte, fuzzyAusdruecke } from './util/search-index.js';

const MAX_DIALECTS = 5;
const MAX_AUSDRUECKE = 10;
const FOCUS_DELAY_MS = 50;
const DEBOUNCE_MS = 120;
const RECENT_KEY = 'dialekto:recent-search';
const RECENT_MAX = 5;

// Trending searches shown when palette is empty
const TRENDING = ['Servus', 'Moin', 'Digger', 'Babbel', 'Oida', 'geil', 'Grüß Gott'];

let activeDialektFilter = null;

let overlay;
let searchInput;
let results;
let activeIndex = 0;
let flatItems = [];

function getRecent() {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function pushRecent(query) {
  if (!query || query.length < 2) return;
  try {
    const list = getRecent().filter((q) => q !== query);
    list.unshift(query);
    localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, RECENT_MAX)));
  } catch {}
}

function commands() {
  return [
    { id: 'cmd:lernen',    icon: 'cards',    label: 'Karteikarten starten',      meta: 'Mit Karteikarten lernen', kbd: 'L',
      run: () => go('#/lernen') },
    { id: 'cmd:quiz',      icon: 'target',   label: 'Quiz starten',              meta: 'Multiple-Choice testen',  kbd: 'Q',
      run: () => go('#/quiz') },
    { id: 'cmd:entdecken', icon: 'map',      label: 'Dialekte entdecken',        meta: 'Übersicht aller Dialekte', kbd: 'E',
      run: () => go('#/entdecken') },
    { id: 'cmd:karte',        icon: 'globe',    label: 'Dialekt-Karte öffnen',      meta: 'Geografische Übersicht',   kbd: 'K',
      run: () => go('#/karte') },
    { id: 'cmd:statistiken',  icon: 'zap',      label: 'Statistiken öffnen',         meta: 'Detailliertes Dashboard',
      run: () => go('#/statistiken') },
    { id: 'cmd:vergleich', icon: 'refresh',  label: 'Dialekte vergleichen',      meta: 'Gemeinsamkeiten finden',
      run: () => go('#/vergleich') },
    { id: 'cmd:favoriten', icon: 'heart',    label: 'Favoriten öffnen',          meta: 'Statistiken & Markiertes',  kbd: 'F',
      run: () => go('#/favoriten') },
    { id: 'cmd:theme',     icon: 'sparkles', label: 'Hell / Dunkel umschalten',  meta: 'Theme wechseln',           kbd: 'T',
      run: () => document.getElementById('themeToggle')?.click() },
    { id: 'cmd:random',    icon: 'zap',      label: 'Zufälligen Dialekt öffnen', meta: 'Glücksrad',
      run: () => { const d = DIALEKTE[Math.floor(Math.random() * DIALEKTE.length)]; go(`#/dialekt/${d.id}`); } },
  ];
}

function dialectMatches(query) {
  if (!query) return DIALEKTE.slice(0, MAX_DIALECTS).map(toDialectItem);
  return fuzzyDialekte(query, { limit: MAX_DIALECTS, threshold: 0.25 }).map(toDialectItem);
}

function toDialectItem(d) {
  return {
    id: `d:${d.id}`,
    icon: null,
    flag: d.flag,
    label: d.name,
    meta: `${d.region} · ${d.ausdruecke.length} Ausdrücke`,
    colour: d.farbe,
    run: () => go(`#/dialekt/${d.id}`),
  };
}

function ausdruckMatches(query) {
  if (!query && !activeDialektFilter) return [];
  let results = query
    ? fuzzyAusdruecke(query, { limit: MAX_AUSDRUECKE, threshold: 0.25 })
    : [];
  if (activeDialektFilter) {
    results = results.filter(a => a.dialektId === activeDialektFilter);
    if (!results.length && !query) {
      // Show first 10 from filtered dialect
      const d = DIALEKTE.find(x => x.id === activeDialektFilter);
      if (d) results = d.ausdruecke.slice(0, MAX_AUSDRUECKE).map(a => ({
        ...a, dialektId: d.id, dialektName: d.name, dialektFlag: d.flag, dialektFarbe: d.farbe
      }));
    }
  }
  return results.map((a) => ({
    id: `a:${a.dialektId}:${a.id}`,
    icon: null,
    flag: a.dialektFlag,
    label: a.ausdruck,
    meta: `↦ ${a.hochdeutsch} · ${a.dialektName}`,
    colour: a.dialektFarbe,
    run: () => go(`#/dialekt/${a.dialektId}`),
  }));
}

function trendingItems() {
  return TRENDING.map(q => ({
    id: `trend:${q}`,
    icon: 'flame',
    label: q,
    meta: 'Trend-Suche',
    run: () => { searchInput.value = q; renderSearchResults(q); searchInput.focus(); }
  }));
}

function commandMatches(needle) {
  const all = commands();
  if (!needle) return all;
  return all.filter((c) => normalize(c.label).includes(needle) || normalize(c.meta).includes(needle));
}

function recentMatches() {
  return getRecent().map((q) => ({
    id: `r:${q}`,
    icon: 'refresh',
    label: q,
    meta: 'Zuletzt gesucht',
    run: () => { searchInput.value = q; renderSearchResults(q); searchInput.focus(); },
  }));
}

function renderGroup(title, items) {
  if (!items.length) return null;
  return el('div', { class: 'cmdp-group' },
    el('div', { class: 'cmdp-group-title' }, title),
    el('div', { class: 'cmdp-group-items' },
      ...items.map((item, i) => renderItem(item, i))
    )
  );
}

function renderItem(item) {
  const idx = flatItems.length;
  flatItems.push(item);
  return el('button', {
    class: 'cmdp-item' + (idx === 0 ? ' is-active' : ''),
    dataset: { idx },
    onClick: () => activate(item)
  },
    el('span', { class: 'cmdp-item-leading', style: item.colour ? { '--lc': item.colour } : null },
      item.flag ? el('span', { class: 'cmdp-flag' }, item.flag)
      : item.icon ? icon(item.icon, { size: 18 })
      : null
    ),
    el('span', { class: 'cmdp-item-text' },
      el('span', { class: 'cmdp-item-label' }, item.label),
      el('span', { class: 'cmdp-item-meta' }, item.meta)
    ),
    item.kbd ? el('span', { class: 'cmdp-item-kbd' }, item.kbd) : null,
    el('span', { class: 'cmdp-item-enter', html: '↵' })
  );
}

function activate(item) {
  if (!item) return;
  const q = searchInput.value.trim();
  if (q) pushRecent(q);
  item.run();
  closeSearch();
}

function renderDialektFilterRow() {
  const row = el('div', { class: 'cmdp-filter-row' });
  // "Alle" chip
  const allChip = el('button', {
    class: 'cmdp-filter-chip' + (!activeDialektFilter ? ' is-active' : ''),
    onClick: () => { activeDialektFilter = null; renderDialektFilterRow(); renderSearchResults(searchInput.value); }
  }, 'Alle');
  row.appendChild(allChip);
  DIALEKTE.forEach(d => {
    const chip = el('button', {
      class: 'cmdp-filter-chip' + (activeDialektFilter === d.id ? ' is-active' : ''),
      style: { '--fc': d.farbe },
      onClick: () => { activeDialektFilter = d.id; renderDialektFilterRow(); renderSearchResults(searchInput.value); }
    }, d.flag + ' ' + d.name);
    row.appendChild(chip);
  });
  // Replace or insert
  const existing = results.previousElementSibling?.classList.contains('cmdp-filter-row')
    ? results.previousElementSibling : null;
  if (existing) existing.replaceWith(row);
  else results.insertAdjacentElement('beforebegin', row);
}

function renderSearchResults(query) {
  results.innerHTML = '';
  flatItems = [];
  activeIndex = 0;
  const needle = normalize(query);
  const raw = (query || '').trim();

  renderDialektFilterRow();

  const groups = [];
  if (!needle && !activeDialektFilter) {
    const recent = recentMatches();
    if (recent.length) groups.push(['Zuletzt gesucht', recent]);
    groups.push(['🔥 Trending', trendingItems()]);
  }
  if (!activeDialektFilter) {
    const cmds = commandMatches(needle);
    if (cmds.length) groups.push(['Aktionen', cmds]);
  }
  // Dialekte: ohne Query alle ersten paar; mit Query fuzzy.
  if (!activeDialektFilter) {
    const dials = dialectMatches(raw);
    if (dials.length) groups.push(['Dialekte', dials]);
  }
  const ausds = ausdruckMatches(raw);
  if (ausds.length) groups.push(['Ausdrücke', ausds]);

  if (!groups.length) {
    results.appendChild(el('div', { class: 'cmdp-empty' },
      el('div', { class: 'cmdp-empty-emoji' }, '🤔'),
      el('div', { class: 'cmdp-empty-text' }, 'Keine Treffer für „' + query + '".'),
      el('div', { class: 'cmdp-empty-hint' }, 'Versuche „bayerisch", „hallo" oder „ich".')
    ));
    return;
  }

  groups.forEach(([title, items]) => results.appendChild(renderGroup(title, items)));
}

function syncActive() {
  const items = $$('.cmdp-item', overlay);
  items.forEach((it) => it.classList.remove('is-active'));
  const target = items[activeIndex];
  if (target) {
    target.classList.add('is-active');
    target.scrollIntoView({ block: 'nearest' });
  }
}

function moveActive(delta) {
  if (!flatItems.length) return;
  activeIndex = (activeIndex + delta + flatItems.length) % flatItems.length;
  syncActive();
}

function onKeydown(e) {
  if (e.key === 'Escape') { closeSearch(); return; }
  if (e.key === 'Enter')  { activate(flatItems[activeIndex]); return; }
  if (e.key === 'ArrowDown') { e.preventDefault(); moveActive(1); return; }
  if (e.key === 'ArrowUp')   { e.preventDefault(); moveActive(-1); return; }
  if (e.key === 'Tab')       { e.preventDefault(); moveActive(e.shiftKey ? -1 : 1); }
}

export function openSearch() {
  activeDialektFilter = null;
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

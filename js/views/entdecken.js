import { el } from '../util.js';
import { t } from '../util/i18n.js';
import { DIALEKTE } from '../../data/dialekte.js';
import { renderDialektCard } from './partials.js';
import { emptyIllustration } from '../util/icons.js';
import { fuzzyDialekte } from '../util/search-index.js';

// Sprachraum aus dem Sprachcode des Dialekts ableiten (de-AT → at, de-CH → ch,
// alles andere inkl. nds/Plattdeutsch → de). Keine Länder-Emoji-Flaggen, da
// Windows diese nur als Buchstabenpaare („DE") rendert.
const COUNTRY_OF = (d) => d.lang === 'de-AT' ? 'at' : d.lang === 'de-CH' ? 'ch' : 'de';
const COUNTRIES = [
  { id: 'all', label: 'Alle' },
  { id: 'de',  label: 'Deutschland' },
  { id: 'at',  label: 'Österreich' },
  { id: 'ch',  label: 'Schweiz' },
];

export function renderEntdecken(root) {
  root.innerHTML = '';
  const view = el('div', { class: 'view' });

  view.appendChild(el('section', {},
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, t('view.entdecken.title')),
        el('div', { class: 'lede' }, t('view.entdecken.lede', { n: DIALEKTE.length }))
      )
    )
  ));

  // Suche
  const filterRow = el('div', { class: 'expr-toolbar' });
  const searchWrap = el('div', { class: 'expr-search' },
    el('svg', { viewBox: '0 0 24 24', width: 20, height: 20, fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
      html: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>' }),
    el('input', { type: 'search', placeholder: t('view.entdecken.search'), id: 'discoverSearch' })
  );
  filterRow.appendChild(searchWrap);
  view.appendChild(filterRow);

  let activeCountry = 'all';
  let term = '';

  // Sprachraum-Filter-Chips (mit Anzahl je Sprachraum)
  const chipRow = el('div', { class: 'chip-row' },
    ...COUNTRIES.map(c => {
      const count = c.id === 'all'
        ? DIALEKTE.length
        : DIALEKTE.filter(d => COUNTRY_OF(d) === c.id).length;
      return el('button', {
        class: 'chip' + (c.id === 'all' ? ' is-active' : ''),
        dataset: { country: c.id },
        onClick: () => {
          activeCountry = c.id;
          chipRow.querySelectorAll('.chip').forEach(x =>
            x.classList.toggle('is-active', x.dataset.country === c.id));
          render();
        }
      }, `${t('country.' + c.id)} (${count})`);
    })
  );
  view.appendChild(chipRow);

  const countEl = el('div', { class: 'expr-count', 'aria-live': 'polite' });
  view.appendChild(countEl);

  const grid = el('div', { class: 'dialekt-grid', style: { marginTop: '14px' } });

  function render() {
    grid.innerHTML = '';
    const raw = term.trim();
    let items = raw ? fuzzyDialekte(raw, { threshold: 0.2, limit: 30 }) : DIALEKTE.slice();
    if (activeCountry !== 'all') items = items.filter(d => COUNTRY_OF(d) === activeCountry);

    countEl.textContent = raw
      ? t('count.treffer', { n: items.length })
      : t(items.length === 1 ? 'count.dialekt' : 'count.dialekte', { n: items.length });

    if (!items.length) {
      grid.appendChild(el('div', { class: 'empty-state', style: { gridColumn: '1 / -1' } },
        emptyIllustration('search'),
        el('h3', {}, t('view.entdecken.emptyTitle')),
        el('div', { class: 'empty-meta' }, t('view.entdecken.emptyMeta'))
      ));
      return;
    }
    items.forEach(d => grid.appendChild(renderDialektCard(d)));
  }
  render();

  searchWrap.querySelector('input').addEventListener('input', (e) => { term = e.target.value; render(); });

  view.appendChild(grid);
  root.appendChild(view);
}

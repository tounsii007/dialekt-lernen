import { el, normalize } from '../util.js';
import { DIALEKTE } from '../../data/dialekte.js';
import { renderDialektCard } from './partials.js';
import { emptyIllustration } from '../util/icons.js';
import { fuzzyDialekte } from '../util/search-index.js';

export function renderEntdecken(root) {
  root.innerHTML = '';
  const view = el('div', { class: 'view' });

  view.appendChild(el('section', {},
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, 'Dialekte entdecken'),
        el('div', { class: 'lede' }, `${DIALEKTE.length} Regionen · Filtere nach Bundesland oder suche direkt.`)
      )
    )
  ));

  // Filter
  const filterRow = el('div', { class: 'expr-toolbar' });
  const searchWrap = el('div', { class: 'expr-search' },
    el('svg', { viewBox: '0 0 24 24', width: 20, height: 20, fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
      html: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>' }),
    el('input', { type: 'search', placeholder: 'Dialekt oder Region suchen…', id: 'discoverSearch' })
  );
  filterRow.appendChild(searchWrap);
  view.appendChild(filterRow);

  const grid = el('div', { class: 'dialekt-grid' });
  function render(filter = '') {
    grid.innerHTML = '';
    const raw = (filter || '').trim();
    const items = raw ? fuzzyDialekte(raw, { threshold: 0.2, limit: 30 }) : DIALEKTE;
    if (!items.length) {
      grid.appendChild(el('div', { class: 'empty-state', style: { gridColumn: '1 / -1' } },
        emptyIllustration('search'),
        el('h3', {}, 'Keine Dialekte gefunden'),
        el('div', { class: 'empty-meta' }, 'Probier ein anderes Wort oder leere das Suchfeld.')
      ));
      return;
    }
    items.forEach(d => grid.appendChild(renderDialektCard(d)));
  }
  render();

  searchWrap.querySelector('input').addEventListener('input', (e) => render(e.target.value));

  view.appendChild(grid);
  root.appendChild(view);
}

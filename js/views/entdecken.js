import { el, normalize } from '../util.js';
import { DIALEKTE } from '../../data/dialekte.js';
import { renderDialektCard } from './partials.js';

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
    const n = normalize(filter);
    const items = DIALEKTE.filter(d =>
      !n || normalize(d.name).includes(n) || normalize(d.region).includes(n) || normalize(d.bundesland).includes(n)
    );
    if (!items.length) {
      grid.appendChild(el('div', { class: 'empty-state' },
        el('span', { class: 'emoji' }, '🤔'),
        el('div', {}, 'Keine Dialekte gefunden für „' + filter + '".')
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

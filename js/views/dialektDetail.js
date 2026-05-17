import { el, go, normalize } from '../util.js';
import { getDialekt } from '../../data/dialekte.js';
import { KATEGORIEN } from '../../data/kategorien.js';
import { renderExpressionCard } from './partials.js';

export function renderDialektDetail(root, dialektId) {
  root.innerHTML = '';
  const d = getDialekt(dialektId);
  if (!d) {
    root.appendChild(el('div', { class: 'empty-state' },
      el('span', { class: 'emoji' }, '🚧'),
      el('div', {}, 'Dialekt nicht gefunden.'),
      el('button', { class: 'btn btn-primary', style: { marginTop: '20px' }, onClick: () => go('#/entdecken') }, 'Zurück zur Übersicht')
    ));
    return;
  }

  const view = el('div', { class: 'view' });

  // Header
  view.appendChild(el('section', { class: 'detail-head', style: { '--dc': d.farbe, background: `linear-gradient(135deg, ${d.farbe} 0%, ${d.farbe}dd 100%)` } },
    el('button', { class: 'detail-back', onClick: () => go('#/entdecken') },
      el('span', { html: '←' }), ' Zurück'
    ),
    el('h1', {}, `${d.flag} ${d.name}`),
    el('div', { class: 'detail-region' }, d.region),
    el('div', { class: 'detail-desc' }, d.beschreibung),
    el('div', { class: 'detail-meta' },
      el('div', { class: 'detail-meta-item' }, el('b', {}, d.ausdruecke.length), 'Ausdrücke'),
      el('div', { class: 'detail-meta-item' }, el('b', {}, d.sprecher || '–'), 'Sprecher'),
      el('div', { class: 'detail-meta-item' }, el('b', {}, d.bundesland), 'Region'),
      el('div', { class: 'detail-meta-item' },
        el('button', { class: 'link-btn', style: { color: 'white' }, onClick: () => go(`#/lernen?dialekt=${d.id}`) }, 'Mit Karten lernen →')
      )
    )
  ));

  // Toolbar
  const usedCats = new Set(d.ausdruecke.map(a => a.kategorie));
  const cats = Array.from(usedCats).map(c => KATEGORIEN[c] || { id: c, label: c, icon: '·' });

  const toolbar = el('div', { class: 'expr-toolbar' },
    el('div', { class: 'expr-search' },
      el('svg', { viewBox: '0 0 24 24', width: 20, height: 20, fill: 'none', stroke: 'currentColor', 'stroke-width': 2,
        html: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>' }),
      el('input', { id: 'detSearch', type: 'search', placeholder: 'Im Dialekt suchen…' })
    )
  );

  const chips = el('div', { class: 'chip-row' },
    el('button', { class: 'chip is-active', dataset: { cat: 'all' } }, 'Alle'),
    ...cats.map(c => el('button', { class: 'chip', dataset: { cat: c.id } }, `${c.icon} ${c.label}`))
  );
  view.appendChild(toolbar);
  view.appendChild(chips);

  const grid = el('div', { class: 'expr-grid', style: { marginTop: '20px' } });
  view.appendChild(grid);

  let activeCat = 'all';
  let term = '';

  function render() {
    grid.innerHTML = '';
    const n = normalize(term);
    const items = d.ausdruecke.filter(a => {
      if (activeCat !== 'all' && a.kategorie !== activeCat) return false;
      if (!n) return true;
      return normalize(a.ausdruck).includes(n)
        || normalize(a.hochdeutsch).includes(n)
        || normalize(a.bedeutung).includes(n);
    });
    if (!items.length) {
      grid.appendChild(el('div', { class: 'empty-state' },
        el('span', { class: 'emoji' }, '🔎'),
        el('div', {}, 'Keine Ausdrücke gefunden.')
      ));
      return;
    }
    items.forEach(a => grid.appendChild(renderExpressionCard(a, d)));
  }
  render();

  chips.querySelectorAll('.chip').forEach(c => c.addEventListener('click', () => {
    chips.querySelectorAll('.chip').forEach(x => x.classList.remove('is-active'));
    c.classList.add('is-active');
    activeCat = c.dataset.cat;
    render();
  }));
  toolbar.querySelector('input').addEventListener('input', (e) => { term = e.target.value; render(); });

  root.appendChild(view);
}

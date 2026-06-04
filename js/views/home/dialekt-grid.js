// Startseite · „Alle Dialekte" — Raster aller Regionen, je eine Dialekt-Karte
// (geteiltes Partial). Einstieg in Ausdrücke & Bedeutungen pro Region.

import { el } from '../../util.js';
import { DIALEKTE } from '../../../data/dialekte.js';
import { renderDialektCard } from '../partials.js';

export function renderDialektGrid() {
  const sec = el('section', { class: 'section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, 'Alle Dialekte'),
        el('div', { class: 'lede' }, 'Wähle eine Region, um Ausdrücke und Bedeutungen zu erkunden.')
      )
    )
  );
  const grid = el('div', { class: 'dialekt-grid' });
  DIALEKTE.forEach(d => grid.appendChild(renderDialektCard(d)));
  sec.appendChild(grid);
  return sec;
}

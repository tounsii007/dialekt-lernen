// Startseite · „Alle Dialekte" — Raster aller Regionen, je eine Dialekt-Karte
// (geteiltes Partial). Einstieg in Ausdrücke & Bedeutungen pro Region.

import { el } from '../../util.js';
import { t } from '../../util/i18n.js';
import { DIALEKTE } from '../../../data/dialekte.js';
import { renderDialektCard } from '../partials.js';

export function renderDialektGrid() {
  const sec = el('section', { class: 'section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, t('view.dialekt-grid.title')),
        el('div', { class: 'lede' }, t('view.dialekt-grid.lede'))
      )
    )
  );
  const grid = el('div', { class: 'dialekt-grid' });
  DIALEKTE.forEach(d => grid.appendChild(renderDialektCard(d)));
  sec.appendChild(grid);
  return sec;
}

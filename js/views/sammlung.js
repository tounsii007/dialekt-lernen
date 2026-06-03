// Ausdrücke-Sammlung („Pokédex") — alle Ausdrücke als Karten,
// freigeschaltete sind sichtbar, unbekannte als Silhouette mit „?".

import { el, go, toast, debounce } from '../util.js';
import { DIALEKTE, ALLE_AUSDRUECKE, getDialekt } from '../../data/dialekte.js';
import { getLernstand } from '../store/learning.js';
import { KATEGORIEN, KATEGORIE_LIST } from '../../data/kategorien.js';
import { renderExpressionCard } from './partials.js';
import { emptyIllustration } from '../util/icons.js';

const STATUS_FILTERS = [
  { id: 'alle',     label: 'Alle' },
  { id: 'unlocked', label: 'Freigeschaltet' },
  { id: 'locked',   label: 'Verborgen' }
];

let state = {
  dialektId: 'alle',
  kategorie: 'alle',
  status:    'alle'
};

export function renderSammlung(root) {
  root.innerHTML = '';
  const view = el('div', { class: 'view sammlung-view' });

  view.appendChild(el('div', { class: 'section-head' },
    el('div', {},
      el('h2', {}, '📚 Deine Ausdrücke-Sammlung'),
      el('div', { class: 'lede' },
        'Jeder Ausdruck, den du mindestens einmal lernst, wird hier freigeschaltet. Verborgene Karten geben einen Tipp, was noch fehlt.'
      )
    )
  ));

  // Progress am Anfang
  const progress = computeProgress();
  view.appendChild(renderProgressBar(progress));

  // Filterleiste
  view.appendChild(renderFilters());

  // Grid
  const gridWrap = el('div', { class: 'sammlung-grid-wrap' });
  view.appendChild(gridWrap);

  // Pagination: erst 100 rendern, „mehr laden" für den Rest.
  // Verhindert Long-Task-Block (252ms vorher → ~30ms jetzt).
  const PAGE_SIZE = 100;
  let renderedCount = 0;
  let currentFiltered = [];

  function renderBatch(grid, from, to) {
    const frag = document.createDocumentFragment();
    for (let i = from; i < to && i < currentFiltered.length; i++) {
      frag.appendChild(renderSammlungCard(currentFiltered[i]));
    }
    grid.appendChild(frag);
    renderedCount = Math.min(to, currentFiltered.length);
  }

  function rerenderGrid() {
    currentFiltered = applyFilters(state);
    gridWrap.innerHTML = '';
    if (currentFiltered.length === 0) {
      gridWrap.appendChild(el('div', { class: 'empty-state' },
        emptyIllustration('search'),
        el('h3', {}, 'Keine Ausdrücke gefunden'),
        el('div', { class: 'empty-meta' }, 'Versuche die Filter zu lockern.')
      ));
      return;
    }
    const grid = el('div', { class: 'sammlung-grid' });
    renderedCount = 0;
    renderBatch(grid, 0, PAGE_SIZE);
    gridWrap.appendChild(grid);

    // „Mehr laden"-Button wenn nötig
    if (currentFiltered.length > PAGE_SIZE) {
      const loadMoreBtn = el('button', {
        class: 'btn btn-secondary',
        style: { display: 'block', margin: '24px auto', minWidth: '200px' },
        onClick: () => {
          renderBatch(grid, renderedCount, renderedCount + PAGE_SIZE);
          if (renderedCount >= currentFiltered.length) loadMoreBtn.remove();
          else loadMoreBtn.textContent = `Mehr laden (${currentFiltered.length - renderedCount} verbleiben)`;
        }
      }, `Mehr laden (${currentFiltered.length - renderedCount} verbleiben)`);
      gridWrap.appendChild(loadMoreBtn);
    }

    const meta = view.querySelector('[data-sml-meta]');
    if (meta) meta.textContent = `${currentFiltered.length} Karten gefiltert`;
  }

  // Filter-Events
  view.querySelectorAll('[data-sml-filter]').forEach(sel => {
    sel.addEventListener('change', () => {
      state[sel.dataset.smlFilter] = sel.value;
      rerenderGrid();
    });
  });
  view.querySelectorAll('[data-sml-status]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.status = btn.dataset.smlStatus;
      view.querySelectorAll('[data-sml-status]').forEach(b => b.classList.toggle('is-on', b === btn));
      rerenderGrid();
    });
  });

  rerenderGrid();
  root.appendChild(view);
}

function computeProgress() {
  let unlocked = 0;
  for (const a of ALLE_AUSDRUECKE) {
    if (getLernstand(a.dialektId, a.id) > 0) unlocked += 1;
  }
  return { unlocked, total: ALLE_AUSDRUECKE.length };
}

function renderProgressBar({ unlocked, total }) {
  const pct = total > 0 ? Math.round((unlocked / total) * 100) : 0;
  return el('section', { class: 'section sammlung-progress', dataset: { reveal: '' } },
    el('div', { class: 'sammlung-progress-head' },
      el('div', {},
        el('div', { class: 'sammlung-progress-title' }, 'Sammlungs-Fortschritt'),
        el('div', { class: 'lede', style: { fontSize: '.9rem' } },
          `${unlocked} von ${total} Ausdrücken freigeschaltet (${pct} %)`
        )
      ),
      el('div', { class: 'sammlung-progress-pill' }, `${pct} %`)
    ),
    el('div', { class: 'sammlung-progress-bar', role: 'progressbar',
      ariaValuenow: pct, ariaValuemin: 0, ariaValuemax: 100 },
      el('div', { class: 'sammlung-progress-fill', style: { width: pct + '%' } })
    )
  );
}

function renderFilters() {
  const section = el('section', { class: 'section sammlung-filters', dataset: { reveal: '' } });

  const dialektSel = el('select', { class: 'sammlung-select', dataset: { smlFilter: 'dialektId' } },
    el('option', { value: 'alle' }, '— Alle Dialekte —'),
    ...DIALEKTE.map(d => el('option', { value: d.id, selected: state.dialektId === d.id }, `${d.flag} ${d.name}`))
  );

  const katSel = el('select', { class: 'sammlung-select', dataset: { smlFilter: 'kategorie' } },
    el('option', { value: 'alle' }, '— Alle Kategorien —'),
    ...KATEGORIE_LIST.map(k => el('option', { value: k.id, selected: state.kategorie === k.id }, `${k.icon} ${k.label}`))
  );

  const statusRow = el('div', { class: 'sammlung-status-row' },
    ...STATUS_FILTERS.map(s => el('button', {
      class: 'sammlung-status-btn' + (state.status === s.id ? ' is-on' : ''),
      dataset: { smlStatus: s.id }
    }, s.label))
  );

  section.appendChild(el('div', { class: 'sammlung-filter-row' },
    el('div', { class: 'sammlung-filter-cell' },
      el('label', { class: 'sammlung-filter-label' }, 'Dialekt'),
      dialektSel
    ),
    el('div', { class: 'sammlung-filter-cell' },
      el('label', { class: 'sammlung-filter-label' }, 'Kategorie'),
      katSel
    ),
    el('div', { class: 'sammlung-filter-cell' },
      el('label', { class: 'sammlung-filter-label' }, 'Status'),
      statusRow
    )
  ));
  section.appendChild(el('div', { class: 'sammlung-meta lede', dataset: { smlMeta: '' } }, ''));
  return section;
}

function applyFilters(s) {
  let list = ALLE_AUSDRUECKE;
  if (s.dialektId !== 'alle') {
    list = list.filter(a => a.dialektId === s.dialektId);
  }
  if (s.kategorie !== 'alle') {
    list = list.filter(a => a.kategorie === s.kategorie);
  }
  // Status-Filter erfordert Lookup pro Eintrag
  if (s.status !== 'alle') {
    const wantUnlocked = s.status === 'unlocked';
    list = list.filter(a => {
      const unlocked = getLernstand(a.dialektId, a.id) > 0;
      return wantUnlocked ? unlocked : !unlocked;
    });
  }
  return list;
}

function renderSammlungCard(a) {
  const unlocked = getLernstand(a.dialektId, a.id) > 0;
  const cat = KATEGORIEN[a.kategorie] || { label: a.kategorie || 'Sonstige', icon: '·' };

  if (unlocked) {
    // Sichtbare Karte: aufklappbar zum Ausdruck-Detail
    return el('button', {
      class: 'sammlung-card is-unlocked',
      style: { '--dc': a.dialektFarbe || 'var(--brand)' },
      onClick: () => {
        // Springe zum Dialekt-Detail mit Anker
        go(`#/dialekt/${a.dialektId}`);
      }
    },
      el('div', { class: 'sammlung-card-head' },
        el('span', { class: 'sammlung-card-flag' }, a.dialektFlag || '🗣'),
        el('span', { class: 'sammlung-card-cat' }, `${cat.icon} ${cat.label}`)
      ),
      el('div', { class: 'sammlung-card-text' }, a.ausdruck),
      el('div', { class: 'sammlung-card-hd' }, a.hochdeutsch),
      el('div', { class: 'sammlung-card-foot' },
        el('span', { class: 'region-tag' }, `${a.dialektFlag || ''} ${a.dialektName}`),
        el('span', { class: 'sammlung-card-check' }, '✓')
      )
    );
  }

  // Verborgene Karte — Silhouette
  return el('div', {
    class: 'sammlung-card is-locked',
    title: 'Noch nicht freigeschaltet — übe ihn im Lernen-Modus, um ihn aufzudecken.',
    'aria-label': `Verborgener Ausdruck aus ${a.dialektName}, Kategorie ${cat.label}`,
    onClick: () => {
      toast('Verborgener Ausdruck — übe ihn im Karteikarten-Modus, um ihn freizuschalten!', 'info', 2400);
    }
  },
    el('div', { class: 'sammlung-card-head' },
      el('span', { class: 'sammlung-card-flag' }, a.dialektFlag || '🗣'),
      el('span', { class: 'sammlung-card-cat' }, `${cat.icon} ${cat.label}`)
    ),
    el('div', { class: 'sammlung-card-mystery' }, '?'),
    el('div', { class: 'sammlung-card-hint' }, `${(a.ausdruck || '').length} Zeichen · ${cat.label}`),
    el('div', { class: 'sammlung-card-foot' },
      el('span', { class: 'region-tag' }, `${a.dialektFlag || ''} ${a.dialektName}`),
      el('span', { class: 'sammlung-card-check' }, '🔒')
    )
  );
}

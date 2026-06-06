// Vergleichs-View: zeigt äquivalente Ausdrücke quer über alle Dialekte.
import { el, go, speak } from '../util.js';
import { KATEGORIEN } from '../../data/kategorien.js';
import { buildComparison, filterByKategorie } from '../util/comparison.js';
import { icon, emptyIllustration } from '../util/icons.js';
import { sfx } from '../util/sounds.js';

let cachedGroups = null;

export function renderVergleich(root) {
  root.innerHTML = '';
  if (!cachedGroups) cachedGroups = buildComparison({ minSize: 2 });

  const view = el('div', { class: 'view' });

  view.appendChild(el('section', {},
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, 'Dialekt-Vergleich'),
        el('div', { class: 'lede' }, 'Wie sagt man dasselbe in verschiedenen Regionen? Hier sind Ausdrücke gruppiert nach Bedeutung.')
      )
    )
  ));

  // Kategorie-Chips
  const usedCats = new Set(cachedGroups.map((g) => g.kategorie));
  const cats = [{ id: 'all', label: 'Alle', icon: '🌍' }, ...Array.from(usedCats).map((c) => KATEGORIEN[c]).filter(Boolean)];

  let activeCat = 'all';
  const chipsRow = el('div', { class: 'chip-row', style: { marginBottom: 'var(--sp-5)' } });
  function renderChips() {
    chipsRow.innerHTML = '';
    cats.forEach((c) => {
      chipsRow.appendChild(el('button', {
        class: 'chip' + (activeCat === c.id ? ' is-active' : ''),
        onClick: () => { sfx.click(); activeCat = c.id; renderChips(); renderGroups(); }
      }, c.icon + ' ' + c.label));
    });
  }
  renderChips();
  view.appendChild(chipsRow);

  const list = el('div', { class: 'compare-list' });
  view.appendChild(list);

  function renderGroups() {
    list.innerHTML = '';
    const groups = filterByKategorie(cachedGroups, activeCat);
    if (!groups.length) {
      list.appendChild(el('div', { class: 'empty-state' },
        emptyIllustration('map'),
        el('h3', {}, 'Keine Gruppen in dieser Kategorie'),
        el('div', { class: 'empty-meta' }, 'Wechsle auf „Alle" — die meisten Gruppen entstehen quer über Kategorien hinweg.')
      ));
      return;
    }
    groups.forEach((g, gi) => list.appendChild(renderGroup(g, gi)));
  }

  function renderGroup(g, idx) {
    const cat = KATEGORIEN[g.kategorie] || { label: g.kategorie, icon: '·' };
    return el('article', { class: 'compare-group', dataset: { spotlight: '', reveal: '' }, style: { '--cg-delay': (idx * 30) + 'ms' } },
      el('header', { class: 'compare-group-head' },
        el('div', { class: 'compare-group-meta' },
          el('span', { class: 'compare-group-cat' }, cat.icon + ' ' + cat.label),
          el('span', { class: 'compare-group-count' }, g.items.length + ' Dialekte')
        ),
        el('h3', { class: 'compare-group-title' }, g.head)
      ),
      el('div', { class: 'compare-grid' },
        ...g.items.map((it) => el('div', {
          // role=button statt <button>: die Zelle enthält einen eigenen
          // Speak-<button> — verschachtelte interaktive Buttons sind ungültiges
          // HTML. div + role/tabindex + Tastatur-Handling bewahrt die Semantik.
          class: 'compare-cell',
          role: 'button',
          tabindex: 0,
          style: { '--dc': it.dialektFarbe },
          onClick: () => { sfx.click(); go(`#/dialekt/${it.dialektId}`); },
          onKeydown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              sfx.click();
              go(`#/dialekt/${it.dialektId}`);
            }
          }
        },
          el('span', { class: 'compare-cell-flag' }, it.dialektFlag),
          el('div', { class: 'compare-cell-content' },
            el('div', { class: 'compare-cell-name' }, it.dialektName),
            el('div', { class: 'compare-cell-expr' }, it.ausdruck)
          ),
          el('button', {
            class: 'compare-cell-speak',
            title: 'Anhören',
            onClick: (e) => { e.stopPropagation(); sfx.click(); speak(it.ausdruck, it.dialektLang || 'de-DE', { dialektId: it.dialektId }); }
          }, icon('speaker', { size: 14 }))
        ))
      )
    );
  }

  renderGroups();
  root.appendChild(view);
}

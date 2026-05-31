import { el, go, normalize, debounce } from '../util.js';
import { getDialekt } from '../../data/dialekte.js';
import { KATEGORIEN } from '../../data/kategorien.js';
import { renderExpressionCard } from './partials.js';
import { markDialectVisited } from '../store.js';
import { getLernstand } from '../store/learning.js';
import { icon, emptyIllustration } from '../util/icons.js';
import { buildIndex, searchIndex } from '../util/fuzzy.js';
import { findRelatedExpressions } from '../util/related-expressions.js';
import { extractEtymology, hasEtymology } from '../util/etymology.js';

export function renderDialektDetail(root, dialektId) {
  root.innerHTML = '';
  const d = getDialekt(dialektId);
  if (d) markDialectVisited(d.id);
  if (!d) {
    root.appendChild(el('div', { class: 'empty-state' },
      emptyIllustration('map'),
      el('h3', {}, 'Dialekt nicht gefunden'),
      el('div', { class: 'empty-meta' }, 'Die Adresse zeigt auf einen Dialekt, den es nicht gibt — vielleicht ein Tippfehler?'),
      el('button', { class: 'btn btn-primary', dataset: { magnetic: '12' }, onClick: () => go('#/entdecken') }, 'Zurück zur Übersicht')
    ));
    return;
  }

  const view = el('div', { class: 'view' });

  // Progress ring — % gelernt
  const totalExpr = d.ausdruecke.length;
  let learned = 0, inProgress = 0;
  d.ausdruecke.forEach(a => {
    const s = getLernstand(d.id, a.id);
    if (s >= 3) learned++;
    else if (s > 0) inProgress++;
  });
  const pct = totalExpr > 0 ? Math.round((learned / totalExpr) * 100) : 0;
  const R = 28, C = 2 * Math.PI * R;
  const ringSvg = el('svg', {
    width: 72, height: 72, viewBox: '0 0 72 72',
    class: 'detail-ring',
    html: `
      <circle cx="36" cy="36" r="${R}" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="6"/>
      <circle cx="36" cy="36" r="${R}" fill="none" stroke="white" stroke-width="6"
              stroke-linecap="round" transform="rotate(-90 36 36)"
              stroke-dasharray="${C}" stroke-dashoffset="${C - (pct/100)*C}"/>
    `
  });

  // Header
  view.appendChild(el('section', { class: 'detail-head', style: { '--dc': d.farbe, background: `linear-gradient(135deg, ${d.farbe} 0%, ${d.farbe}dd 100%)` } },
    el('button', { class: 'detail-back', onClick: () => go('#/entdecken') },
      el('span', { html: '←' }), ' Zurück'
    ),
    el('div', { class: 'detail-head-top' },
      el('div', {},
        el('h1', {}, `${d.flag} ${d.name}`),
        el('div', { class: 'detail-region' }, d.region)
      ),
      el('div', { class: 'detail-progress' },
        ringSvg,
        el('div', { class: 'detail-progress-num' },
          el('span', { class: 'dpn-pct' }, pct + '%'),
          el('span', { class: 'dpn-lbl' }, 'gelernt')
        )
      )
    ),
    el('div', { class: 'detail-desc' }, d.beschreibung),
    el('div', { class: 'detail-meta' },
      el('div', { class: 'detail-meta-item' }, el('b', {}, d.ausdruecke.length), 'Ausdrücke'),
      el('div', { class: 'detail-meta-item' }, el('b', {}, learned), 'gelernt'),
      el('div', { class: 'detail-meta-item' }, el('b', {}, inProgress), 'in Arbeit'),
      el('div', { class: 'detail-meta-item' }, el('b', {}, d.sprecher || '–'), 'Sprecher'),
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
  // Lokaler Fuzzy-Index pro Dialekt
  const localIdx = buildIndex(d.ausdruecke, [
    { key: 'ausdruck',    weight: 3.0 },
    { key: 'hochdeutsch', weight: 2.0 },
    { key: 'bedeutung',   weight: 1.0 }
  ]);

  // Lazy-Observer für „verwandte Ausdrücke": findRelatedExpressions scannt
  // ALLE_AUSDRUECKE pro Karte — wir berechnen das erst, wenn die Karte in den
  // Viewport scrollt, statt für jede Karte beim Listen-Render (sonst Long-Task).
  let relatedObserver = null;

  function render() {
    grid.innerHTML = '';
    if (relatedObserver) { relatedObserver.disconnect(); relatedObserver = null; }
    if ('IntersectionObserver' in window) {
      relatedObserver = new IntersectionObserver((entries, obs) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const ph = e.target;
          obs.unobserve(ph);
          const sec = renderRelatedSection(ph._expr, d);
          if (sec) ph.replaceWith(sec); else ph.remove();
        }
      }, { rootMargin: '300px' });
    }
    const raw = term.trim();
    let pool = activeCat === 'all' ? d.ausdruecke : d.ausdruecke.filter(a => a.kategorie === activeCat);
    let items;
    if (!raw) {
      items = pool;
    } else {
      const matches = new Set(searchIndex(localIdx, raw, { threshold: 0.2, limit: 500 }).map(r => r.rec));
      items = pool.filter(a => matches.has(a));
    }
    if (!items.length) {
      grid.appendChild(el('div', { class: 'empty-state' },
        el('span', { class: 'emoji' }, '🔎'),
        el('div', {}, 'Keine Ausdrücke gefunden.')
      ));
      return;
    }
    items.forEach(a => {
      const cardWrap = el('div', { class: 'expr-card-wrap' });
      cardWrap.appendChild(renderExpressionCard(a, d));
      const etym = renderEtymologySection(a);
      if (etym) cardWrap.appendChild(etym);
      if (relatedObserver) {
        const ph = el('div', { class: 'related-placeholder' });
        ph._expr = a;
        cardWrap.appendChild(ph);
        relatedObserver.observe(ph);
      } else {
        const related = renderRelatedSection(a, d);
        if (related) cardWrap.appendChild(related);
      }
      grid.appendChild(cardWrap);
    });
  }
  render();

  chips.querySelectorAll('.chip').forEach(c => c.addEventListener('click', () => {
    chips.querySelectorAll('.chip').forEach(x => x.classList.remove('is-active'));
    c.classList.add('is-active');
    activeCat = c.dataset.cat;
    render();
  }));
  const debouncedRender = debounce(render, 160);
  toolbar.querySelector('input').addEventListener('input', (e) => { term = e.target.value; debouncedRender(); });

  root.appendChild(view);
}

// Cache: findRelatedExpressions scannt ALLE_AUSDRUECKE — pro Ausdruck nur einmal.
const _relatedCache = new Map();

// „Siehe auch": findet bis zu 5 verwandte Ausdrücke aus anderen Dialekten.
function renderRelatedSection(a, dialekt) {
  const cacheKey = `${dialekt.id}.${a.id}`;
  let related = _relatedCache.get(cacheKey);
  if (related === undefined) {
    const entry = {
      dialektId: dialekt.id,
      id: a.id,
      hochdeutsch: a.hochdeutsch,
      kategorie: a.kategorie,
    };
    try {
      related = findRelatedExpressions(entry, 5);
    } catch {
      related = [];
    }
    _relatedCache.set(cacheKey, related);
  }
  if (!related || related.length === 0) return null;

  const sec = el('div', { class: 'related-section', dataset: { reveal: '' } });
  sec.appendChild(el('div', { class: 'related-head' },
    el('span', { class: 'related-icon' }, '🔗'),
    el('span', { class: 'related-title' }, 'Siehe auch')
  ));
  const list = el('div', { class: 'related-list' });
  for (const rel of related) {
    const re = rel.entry;
    if (!re) continue;
    list.appendChild(el('button', {
      class: 'related-chip',
      style: { '--dc': re.dialektFarbe || 'var(--brand)' },
      onClick: () => go(`#/dialekt/${re.dialektId}`),
      title: `${re.dialektFlag || ''} ${re.dialektName || ''} — ${rel.reason}`
    },
      el('span', { class: 'related-flag' }, re.dialektFlag || '🏷️'),
      el('span', { class: 'related-expr' }, re.ausdruck),
      el('span', { class: 'related-hd' }, re.hochdeutsch || ''),
      el('span', { class: 'related-dialect' }, re.dialektName || '')
    ));
  }
  sec.appendChild(list);
  return sec;
}

// Etymologie-Bereich: zeigt extrahierte Wortherkunfts-Sätze aus dem Bedeutungs-Text
// als ausklappbaren Panel unter der Karte. Wird nur gerendert, wenn Etymologie-
// Hinweise gefunden wurden.
function renderEtymologySection(a) {
  if (!hasEtymology(a.bedeutung)) return null;
  const sentences = extractEtymology(a.bedeutung);

  const sec = el('details', { class: 'etymology-section' });
  sec.appendChild(el('summary', { class: 'etymology-summary' },
    el('span', { class: 'etymology-icon' }, '📜'),
    el('span', { class: 'etymology-label' }, 'Etymologie'),
    el('span', { class: 'etymology-count' }, `${sentences.length} Hinweis${sentences.length === 1 ? '' : 'e'}`)
  ));
  const list = el('div', { class: 'etymology-list' });
  sentences.forEach(s => {
    list.appendChild(el('div', { class: 'etymology-item' }, s));
  });
  sec.appendChild(list);
  return sec;
}

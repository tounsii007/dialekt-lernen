// Mini-Lektionen-Übersicht und Detail-Reader.
// Übersicht: Karten pro Lektion mit Emoji, Titel, Summary,
//            Lese-Marker und Kategorie-Tag.
// Detail:    Strukturierter Artikel mit Headlines, Absätzen,
//            Markdown-leichtem Rendering, Related-Expression-Chips.

import { el, go, escapeHtml } from '../util.js';
import { LEKTIONEN, getLektion } from '../data/lektionen.js';
import { getAusdruck, getDialekt } from '../../data/dialekte.js';
import { emptyIllustration } from '../util/icons.js';

const STORAGE_KEY = 'dialekto.lektionen.read';

// ------- Read-State (eigenes leichtes Persistenz-Modul) -------
function loadReadSet() {
  try {
    if (typeof localStorage === 'undefined') return new Set();
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}
function saveReadSet(set) {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch { /* Quota / privacy mode — egal */ }
}
function markRead(id) {
  const s = loadReadSet();
  s.add(id);
  saveReadSet(s);
}
function isRead(id) {
  return loadReadSet().has(id);
}

// ------- Kategorie-Labels -------
const KATEGORIE_LABEL = {
  sprache:    { label: 'Sprache',    icon: '🗣️' },
  geschichte: { label: 'Geschichte', icon: '📚' },
  kultur:     { label: 'Kultur',     icon: '🎭' },
  regionen:   { label: 'Regionen',   icon: '🗺️' },
};

// ------- Lightweight Markdown-Renderer -------
// Unterstützt: ## Headlines, Absätze (Leerzeile), - Listenpunkte,
// **fett**, *kursiv*, einfache Tabellen.
function renderMarkdown(text) {
  const wrap = el('div', { class: 'lektion-content' });
  const blocks = String(text || '').split(/\n\n+/);
  for (const raw of blocks) {
    const block = raw.trim();
    if (!block) continue;

    // Headline (## …)
    if (block.startsWith('## ')) {
      const h = el('h3', { class: 'lektion-h3' });
      h.innerHTML = renderInline(block.slice(3));
      wrap.appendChild(h);
      continue;
    }

    // Tabelle (Block beginnt mit |)
    if (block.startsWith('|') && block.includes('\n|')) {
      const lines = block.split('\n').filter(l => l.trim().startsWith('|'));
      if (lines.length >= 2) {
        const table = renderMarkdownTable(lines);
        wrap.appendChild(table);
        continue;
      }
    }

    // Liste (Block beginnt mit „- " — eine pro Zeile)
    if (/^- /.test(block)) {
      const items = block.split('\n').filter(l => /^- /.test(l)).map(l => l.replace(/^- /, ''));
      const ul = el('ul', { class: 'lektion-list' });
      items.forEach(itm => {
        const li = el('li');
        li.innerHTML = renderInline(itm);
        ul.appendChild(li);
      });
      wrap.appendChild(ul);
      continue;
    }

    // Sonst Absatz
    const p = el('p', { class: 'lektion-p' });
    // Mehrzeilige Absätze: \n innerhalb des Blocks soll Leerzeichen werden,
    // damit man Autorenfreundlich Zeilen umbrechen kann.
    p.innerHTML = renderInline(block.replace(/\n/g, ' '));
    wrap.appendChild(p);
  }
  return wrap;
}

function renderInline(text) {
  // Escape vor Inline-Markdown — anschließend Markdown-Marker als HTML-Tags ersetzen.
  let html = escapeHtml(text);
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Kursiv vorsichtig: nicht in **…** schießen — wir haben oben schon ersetzt.
  html = html.replace(/(^|[^*])\*(?!\*)([^*]+?)\*(?!\*)/g, '$1<em>$2</em>');
  // „inline code" → kursive Hervorhebung
  html = html.replace(/`([^`]+)`/g, '<code class="lektion-code">$1</code>');
  return html;
}

function renderMarkdownTable(lines) {
  // Erste Zeile = Header, zweite Zeile = Separator (---), Rest = Body
  const parseRow = (line) => line.split('|').slice(1, -1).map(c => c.trim());
  const header = parseRow(lines[0]);
  const bodyLines = lines.slice(2); // 1 = separator
  const table = el('div', { class: 'lektion-table-wrap' },
    el('table', { class: 'lektion-table' },
      el('thead', {}, el('tr', {},
        ...header.map(h => {
          const th = el('th');
          th.innerHTML = renderInline(h);
          return th;
        })
      )),
      el('tbody', {}, ...bodyLines.map(line => {
        const cols = parseRow(line);
        return el('tr', {}, ...cols.map(c => {
          const td = el('td');
          td.innerHTML = renderInline(c);
          return td;
        }));
      }))
    )
  );
  return table;
}

// ------- Public Renderer -------
export function renderLektionen(root, params = {}) {
  root.innerHTML = '';
  const view = el('div', { class: 'view lektionen-view' });

  const id = params?.id;
  const lektion = id ? getLektion(id) : null;

  if (!lektion) {
    view.appendChild(renderOverview());
  } else {
    view.appendChild(renderDetail(lektion));
    // Lesemarkierung
    markRead(lektion.id);
  }

  root.appendChild(view);
}

function renderOverview() {
  const wrap = el('div', {});

  wrap.appendChild(el('div', { class: 'section-head' },
    el('div', {},
      el('h2', {}, '📖 Mini-Lektionen'),
      el('div', { class: 'lede' },
        `${LEKTIONEN.length} kurze Lese-Artikel über Sprache, Geschichte und Kultur der Dialekte.`
      )
    )
  ));

  const readSet = loadReadSet();
  const readCount = LEKTIONEN.filter(l => readSet.has(l.id)).length;

  // Fortschritts-Pille
  wrap.appendChild(el('div', { class: 'lektionen-progress' },
    el('div', { class: 'lektionen-progress-bar' },
      el('div', {
        class: 'lektionen-progress-fill',
        style: { width: (LEKTIONEN.length ? Math.round(readCount * 100 / LEKTIONEN.length) : 0) + '%' }
      })
    ),
    el('div', { class: 'lektionen-progress-label' },
      `${readCount} / ${LEKTIONEN.length} gelesen`
    )
  ));

  // Karten-Grid
  const grid = el('div', { class: 'lektionen-grid' });
  LEKTIONEN.forEach(l => grid.appendChild(renderLektionCard(l, readSet.has(l.id))));
  wrap.appendChild(grid);

  return wrap;
}

function renderLektionCard(l, alreadyRead) {
  const kat = KATEGORIE_LABEL[l.kategorie] || { label: l.kategorie, icon: '·' };
  const dialektPills = l.dialekte
    .map(id => getDialekt(id))
    .filter(Boolean)
    .map(d => el('span', { class: 'lektion-card-pill', style: { '--dc': d.farbe } },
      el('span', {}, d.flag), el('span', {}, d.name)
    ));

  return el('button', {
    class: 'lektion-card' + (alreadyRead ? ' is-read' : ''),
    dataset: { tilt: '', tiltMax: '6' },
    onClick: () => go(`#/lektionen?id=${encodeURIComponent(l.id)}`)
  },
    el('div', { class: 'lektion-card-head' },
      el('div', { class: 'lektion-card-emoji' }, l.emoji),
      el('div', { class: 'lektion-card-cat' },
        el('span', {}, kat.icon), el('span', {}, kat.label)
      ),
      alreadyRead ? el('span', { class: 'lektion-card-read-badge', title: 'gelesen' }, '✓') : null
    ),
    el('h3', { class: 'lektion-card-title' }, l.title),
    el('p', { class: 'lektion-card-summary' }, l.summary),
    dialektPills.length ? el('div', { class: 'lektion-card-dialekte' }, ...dialektPills) : null,
    el('div', { class: 'lektion-card-cta' }, alreadyRead ? 'Erneut lesen →' : 'Lesen →')
  );
}

function renderDetail(l) {
  const wrap = el('div', { class: 'lektion-detail' });
  const kat = KATEGORIE_LABEL[l.kategorie] || { label: l.kategorie, icon: '·' };

  // Header
  wrap.appendChild(el('button', { class: 'btn btn-ghost', onClick: () => go('#/lektionen') },
    el('span', { html: '←' }), ' Zurück zur Übersicht'
  ));

  wrap.appendChild(el('header', { class: 'lektion-head' },
    el('div', { class: 'lektion-head-cat' },
      el('span', {}, kat.icon), el('span', {}, kat.label)
    ),
    el('div', { class: 'lektion-head-emoji' }, l.emoji),
    el('h1', { class: 'lektion-head-title' }, l.title),
    el('p', { class: 'lektion-head-summary' }, l.summary)
  ));

  // Body
  wrap.appendChild(renderMarkdown(l.content));

  // Related expressions chips
  const related = (l.relatedExpressions || [])
    .map(ref => {
      const d = getDialekt(ref.dialektId);
      const a = d ? getAusdruck(ref.dialektId, ref.id) : null;
      if (!d || !a) return null;
      return { d, a };
    })
    .filter(Boolean);

  if (related.length) {
    wrap.appendChild(el('section', { class: 'lektion-related' },
      el('h4', {}, 'Im Datensatz nachsehen'),
      el('div', { class: 'lektion-related-chips' },
        ...related.map(({ d, a }) =>
          el('button', {
            class: 'lektion-related-chip',
            style: { '--dc': d.farbe },
            title: `${a.ausdruck} — ${a.hochdeutsch}`,
            onClick: () => go(`#/dialekt/${d.id}`)
          },
            el('span', { class: 'lektion-related-chip-flag' }, d.flag),
            el('span', { class: 'lektion-related-chip-text' }, a.ausdruck),
            el('span', { class: 'lektion-related-chip-arrow' }, '→')
          )
        )
      )
    ));
  }

  // Dialekt-Pille(n) am Ende für direkten Sprung
  const dialekte = l.dialekte.map(id => getDialekt(id)).filter(Boolean);
  if (dialekte.length) {
    wrap.appendChild(el('section', { class: 'lektion-related' },
      el('h4', {}, 'Verwandte Dialekte'),
      el('div', { class: 'lektion-related-chips' },
        ...dialekte.map(d =>
          el('button', {
            class: 'lektion-related-chip',
            style: { '--dc': d.farbe },
            onClick: () => go(`#/dialekt/${d.id}`)
          },
            el('span', { class: 'lektion-related-chip-flag' }, d.flag),
            el('span', { class: 'lektion-related-chip-text' }, d.name),
            el('span', { class: 'lektion-related-chip-arrow' }, '→')
          )
        )
      )
    ));
  }

  if (!related.length && !dialekte.length) {
    // Soft empty hint
    wrap.appendChild(el('div', { class: 'empty-state', style: { marginTop: '24px' } },
      emptyIllustration('sparkles'),
      el('div', { class: 'empty-meta' }, 'Keine verknüpften Ausdrücke — die Lektion steht für sich.')
    ));
  }

  return wrap;
}

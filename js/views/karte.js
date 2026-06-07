// Dialekt-Karte — geografische Übersicht als interaktive Bubble-Map
import { el, go } from '../util.js';
import { DIALEKTE } from '../../data/dialekte.js';
import { getLernStats, getStreak } from '../store.js';
import { getLernstand } from '../store/learning.js';
import { icon } from '../util/icons.js';
import { t } from '../util/i18n.js';

// Geografische Positionen (% left, % top) für jede Dialekt-ID
// Grobverortung auf einer Deutschland/AT/CH-Karte (0,0 = links oben)
const GEO = {
  plattdeutsch:   { x: 42, y: 15, labelKey: 'view.karte.regionNorth' },
  berlinisch:     { x: 65, y: 27, labelKey: 'view.karte.regionNortheast' },
  ruhrdeutsch:    { x: 25, y: 40, labelKey: 'view.karte.regionRuhr' },
  koelsch:        { x: 15, y: 54, labelKey: 'view.karte.regionRhineland' },
  saechsisch:     { x: 68, y: 44, labelKey: 'view.karte.regionEast' },
  hessisch:       { x: 44, y: 51, labelKey: 'view.karte.regionCenter' },
  fraenkisch:     { x: 58, y: 55, labelKey: 'view.karte.regionNorthBavaria' },
  schwaebisch:    { x: 40, y: 67, labelKey: 'view.karte.regionSouthwest' },
  bayerisch:      { x: 60, y: 68, labelKey: 'view.karte.regionSouth' },
  alemannisch:    { x: 26, y: 70, labelKey: 'view.karte.regionUpperRhine' },
  wienerisch:     { x: 82, y: 78, labelKey: 'view.karte.regionAustria' },
  schwizerduetsch:{ x: 29, y: 84, labelKey: 'view.karte.regionSwitzerland' }
};

export function renderKarte(root) {
  root.innerHTML = '';
  const view = el('div', { class: 'view' });

  view.appendChild(el('div', { class: 'section-head' },
    el('div', {},
      el('h2', {}, t('view.karte.title')),
      el('div', { class: 'lede' }, t('view.karte.lede'))
    ),
    el('button', {
      class: 'btn btn-ghost',
      onClick: () => go('#/entdecken')
    }, icon('book'), ' ' + t('view.karte.toList'))
  ));

  const stage = el('div', { class: 'karte-stage' });

  // Hintergrund mit stilisierten Ländergrenzen
  stage.appendChild(buildMapBackground());

  // Verbindungslinien zwischen benachbarten Dialekten
  const svg = buildConnectionLines();
  stage.appendChild(svg);

  // Dialekt-Bubbles
  DIALEKTE.forEach(d => {
    const pos = GEO[d.id];
    if (!pos) return;

    const stats = getDialektProgress(d);
    const bubble = el('button', {
      class: 'karte-bubble',
      style: {
        left: pos.x + '%',
        top: pos.y + '%',
        '--dc': d.farbe
      },
      title: `${d.name} — ${d.region}`,
      'aria-label': `${d.name}, ${t(pos.labelKey)}. ` + (stats.gelernt > 0
        ? t('view.karte.ariaLearned', { n: stats.gelernt, total: d.ausdruecke.length })
        : t('view.karte.ariaExpr', { n: d.ausdruecke.length })),
      onClick: () => go(`#/dialekt/${d.id}`)
    });

    // Pulsierender Ring für aktive Dialekte
    if (stats.progress > 0) {
      const ring = el('div', { class: 'karte-ring' });
      ring.style.setProperty('--ring-progress', stats.progress.toFixed(2));
      bubble.appendChild(ring);
    }

    bubble.appendChild(el('span', { class: 'karte-flag' }, d.flag));
    bubble.appendChild(el('div', { class: 'karte-tooltip' },
      el('div', { class: 'karte-tooltip-name' }, d.name),
      el('div', { class: 'karte-tooltip-region' }, t(pos.labelKey)),
      el('div', { class: 'karte-tooltip-stat' },
        stats.gelernt > 0
          ? t('view.karte.tooltipLearned', { n: stats.gelernt, total: d.ausdruecke.length })
          : t('view.karte.ariaExpr', { n: d.ausdruecke.length })
      )
    ));

    stage.appendChild(bubble);
  });

  // Legende
  stage.appendChild(el('div', { class: 'karte-legend' },
    el('div', { class: 'karte-legend-item' },
      el('span', { class: 'karte-legend-dot karte-legend-new' }),
      t('view.karte.legendNew')
    ),
    el('div', { class: 'karte-legend-item' },
      el('span', { class: 'karte-legend-dot karte-legend-progress' }),
      t('view.karte.legendProgress')
    )
  ));

  view.appendChild(stage);

  // Stats-Zeile
  const allStats = DIALEKTE.map(d => getDialektProgress(d));
  const started = allStats.filter(s => s.gelernt > 0).length;
  view.appendChild(el('div', { class: 'karte-stats-row', dataset: { reveal: '' } },
    el('div', { class: 'karte-stat-card', dataset: { spotlight: '' } },
      el('div', { class: 'karte-stat-num' }, String(DIALEKTE.length)),
      el('div', { class: 'karte-stat-label' }, t('view.karte.statRegions'))
    ),
    el('div', { class: 'karte-stat-card', dataset: { spotlight: '' } },
      el('div', { class: 'karte-stat-num' }, String(started)),
      el('div', { class: 'karte-stat-label' }, t('view.karte.statExplored'))
    ),
    el('div', { class: 'karte-stat-card', dataset: { spotlight: '' } },
      el('div', { class: 'karte-stat-num' }, String(allStats.reduce((s, a) => s + a.gelernt, 0))),
      el('div', { class: 'karte-stat-label' }, t('view.karte.statExprLearned'))
    )
  ));

  root.appendChild(view);
}

function getDialektProgress(d) {
  const total = d.ausdruecke.length;
  const gelernt = d.ausdruecke.filter(a => getLernstand(d.id, a.id) >= 3).length;
  return { gelernt, total, progress: total > 0 ? gelernt / total : 0 };
}

function buildMapBackground() {
  // Vereinfachte, aber erkennbare Umrisse von Deutschland, Österreich und der
  // Schweiz (viewBox 100×105, Norden oben). Geografisch grob projiziert:
  // schmaler Norden (Schleswig-Holstein), breiter Süden mit Bayern; Österreich
  // langgestreckt im Südosten; Schweiz kompakt im Südwesten.
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 100 105');
  svg.setAttribute('class', 'karte-bg-svg');
  svg.setAttribute('aria-hidden', 'true');

  const COUNTRIES = {
    de: 'M31,5 L24,8 L25,13 L18,17 L13,24 L9,33 L6,45 L9,52 L8,58 L13,62 L15,69 L24,76 ' +
        'L33,79 L40,80 L49,81 L57,79 L62,72 L65,64 L70,58 L74,49 L80,46 L77,38 L79,31 ' +
        'L72,24 L74,18 L65,13 L57,11 L49,9 L40,13 L34,8 Z',
    at: 'M36,80 L43,82 L51,82 L58,80 L64,73 L72,72 L80,71 L88,72 L93,76 L91,84 L82,88 ' +
        'L70,90 L58,89 L48,88 L40,85 Z',
    ch: 'M15,79 L23,76 L31,77 L40,81 L43,88 L40,95 L31,98 L21,97 L14,91 L12,84 Z',
  };
  for (const [id, d] of Object.entries(COUNTRIES)) {
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('d', d);
    p.setAttribute('class', 'karte-country ' + id);
    svg.appendChild(p);
  }
  return svg;
}

function buildConnectionLines() {
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 100 105');
  svg.setAttribute('class', 'karte-lines-svg');
  svg.setAttribute('aria-hidden', 'true');

  const connections = [
    ['plattdeutsch', 'berlinisch'],
    ['plattdeutsch', 'ruhrdeutsch'],
    ['berlinisch', 'saechsisch'],
    ['ruhrdeutsch', 'koelsch'],
    ['ruhrdeutsch', 'hessisch'],
    ['saechsisch', 'fraenkisch'],
    ['saechsisch', 'hessisch'],
    ['hessisch', 'koelsch'],
    ['hessisch', 'fraenkisch'],
    ['fraenkisch', 'bayerisch'],
    ['hessisch', 'schwaebisch'],
    ['schwaebisch', 'bayerisch'],
    ['schwaebisch', 'alemannisch'],
    ['alemannisch', 'schwizerduetsch'],
    ['bayerisch', 'wienerisch'],
    ['bayerisch', 'schwizerduetsch']
  ];

  connections.forEach(([a, b]) => {
    const pa = GEO[a], pb = GEO[b];
    if (!pa || !pb) return;
    const line = document.createElementNS(NS, 'line');
    line.setAttribute('x1', pa.x); line.setAttribute('y1', pa.y);
    line.setAttribute('x2', pb.x); line.setAttribute('y2', pb.y);
    line.setAttribute('class', 'karte-line');
    svg.appendChild(line);
  });
  return svg;
}

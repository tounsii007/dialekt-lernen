// Dialekt-Karte — geografische Übersicht als interaktive Bubble-Map
import { el, go } from '../util.js';
import { DIALEKTE } from '../../data/dialekte.js';
import { getLernStats, getStreak } from '../store.js';
import { getLernstand } from '../store/learning.js';
import { icon } from '../util/icons.js';

// Geografische Positionen (% left, % top) für jede Dialekt-ID
// Grobverortung auf einer Deutschland/AT/CH-Karte (0,0 = links oben)
const GEO = {
  plattdeutsch:   { x: 52, y: 10, label: 'Norden' },
  berlinisch:     { x: 76, y: 26, label: 'Nordosten' },
  saechsisch:     { x: 73, y: 44, label: 'Osten' },
  hessisch:       { x: 50, y: 52, label: 'Mitte' },
  koelsch:        { x: 36, y: 46, label: 'Westen' },
  schwaebisch:    { x: 52, y: 72, label: 'Südwesten' },
  bayerisch:      { x: 70, y: 80, label: 'Süden' },
  wienerisch:     { x: 92, y: 84, label: 'Österreich' },
  schwizerduetsch:{ x: 50, y: 94, label: 'Schweiz' }
};

export function renderKarte(root) {
  root.innerHTML = '';
  const view = el('div', { class: 'view' });

  view.appendChild(el('div', { class: 'section-head' },
    el('div', {},
      el('h2', {}, '🗺️ Dialekt-Karte'),
      el('div', { class: 'lede' }, 'Klicke auf eine Region, um ihre Ausdrücke zu entdecken.')
    ),
    el('button', {
      class: 'btn btn-ghost',
      onClick: () => go('#/entdecken')
    }, icon('book'), ' Zur Liste')
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
      el('div', { class: 'karte-tooltip-region' }, pos.label),
      el('div', { class: 'karte-tooltip-stat' },
        stats.gelernt > 0
          ? `${stats.gelernt}/${d.ausdruecke.length} gelernt`
          : `${d.ausdruecke.length} Ausdrücke`
      )
    ));

    stage.appendChild(bubble);
  });

  // Legende
  stage.appendChild(el('div', { class: 'karte-legend' },
    el('div', { class: 'karte-legend-item' },
      el('span', { class: 'karte-legend-dot karte-legend-new' }),
      'Noch nicht begonnen'
    ),
    el('div', { class: 'karte-legend-item' },
      el('span', { class: 'karte-legend-dot karte-legend-progress' }),
      'In Arbeit'
    )
  ));

  view.appendChild(stage);

  // Stats-Zeile
  const allStats = DIALEKTE.map(d => getDialektProgress(d));
  const started = allStats.filter(s => s.gelernt > 0).length;
  view.appendChild(el('div', { class: 'karte-stats-row', dataset: { reveal: '' } },
    el('div', { class: 'karte-stat-card', dataset: { spotlight: '' } },
      el('div', { class: 'karte-stat-num' }, String(DIALEKTE.length)),
      el('div', { class: 'karte-stat-label' }, 'Dialektregionen')
    ),
    el('div', { class: 'karte-stat-card', dataset: { spotlight: '' } },
      el('div', { class: 'karte-stat-num' }, String(started)),
      el('div', { class: 'karte-stat-label' }, 'bereits erkundet')
    ),
    el('div', { class: 'karte-stat-card', dataset: { spotlight: '' } },
      el('div', { class: 'karte-stat-num' }, String(allStats.reduce((s, a) => s + a.gelernt, 0))),
      el('div', { class: 'karte-stat-label' }, 'Ausdrücke gelernt')
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
  // Stilisierte D/AT/CH Silhouette als SVG-Pfad (sehr vereinfacht)
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 100 105');
  svg.setAttribute('class', 'karte-bg-svg');
  svg.setAttribute('aria-hidden', 'true');

  // Ungefähre Umrisse als Polygone (grob vereinfacht)
  const germany = document.createElementNS(NS, 'polygon');
  germany.setAttribute('points',
    '38,2 65,0 82,8 88,18 82,28 92,38 88,54 78,60 82,72 72,88 60,92 48,88 36,94 28,88 22,78 16,68 12,56 18,42 14,30 20,18 28,8'
  );
  germany.setAttribute('class', 'karte-country de');

  const austria = document.createElementNS(NS, 'polygon');
  austria.setAttribute('points', '60,88 72,88 88,80 98,88 96,96 80,98 62,96');
  austria.setAttribute('class', 'karte-country at');

  const swiss = document.createElementNS(NS, 'polygon');
  swiss.setAttribute('points', '34,92 48,88 60,92 58,102 44,104 32,100');
  swiss.setAttribute('class', 'karte-country ch');

  svg.appendChild(germany);
  svg.appendChild(austria);
  svg.appendChild(swiss);
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
    ['berlinisch', 'saechsisch'],
    ['saechsisch', 'hessisch'],
    ['hessisch', 'koelsch'],
    ['hessisch', 'schwaebisch'],
    ['schwaebisch', 'bayerisch'],
    ['bayerisch', 'wienerisch'],
    ['bayerisch', 'schwizerduetsch'],
    ['schwaebisch', 'schwizerduetsch']
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

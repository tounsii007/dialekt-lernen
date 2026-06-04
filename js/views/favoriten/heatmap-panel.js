// Favoriten · Lern-Heatmap — GitHub-Style Aktivitäts-Raster (letzte 16 Wochen).

import { el } from '../../util.js';
import { getStreakHeatmap, getActiveDays } from '../../store.js';

export function renderHeatmap() {
  const days = getStreakHeatmap(16); // 16 weeks
  const maxCount = days.reduce((m, d) => Math.max(m, d.count), 0) || 1;
  const monthLabel = (d) => ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'][d.getMonth()];

  const grid = el('div', { class: 'streak-grid' });
  // Group into weeks (columns)
  for (let w = 0; w < days.length / 7; w++) {
    const col = el('div', { class: 'streak-col' });
    for (let i = 0; i < 7; i++) {
      const d = days[w * 7 + i];
      if (!d) continue;
      const lvl = d.count === 0 ? 0 : Math.min(4, Math.ceil((d.count / maxCount) * 4));
      const cell = el('div', {
        class: `streak-cell lvl-${lvl}`,
        title: `${d.date.toLocaleDateString('de-DE')} — ${d.count} Aktion${d.count===1?'':'en'}`,
        style: { '--cell-delay': `${(w * 7 + i) * 6}ms` }
      });
      col.appendChild(cell);
    }
    grid.appendChild(col);
  }

  return el('div', { class: 'card streak-card', dataset: { spotlight: '', reveal: '' } },
    el('div', { class: 'streak-head' },
      el('div', {},
        el('div', { class: 'card-title' }, 'Lern-Heatmap'),
        el('div', { class: 'lede', style: { fontSize: '.85rem' } },
          `Letzte 16 Wochen · ${getActiveDays()} aktive Tage insgesamt`)
      ),
      el('div', { class: 'streak-legend' },
        el('span', {}, 'weniger'),
        el('span', { class: 'streak-cell lvl-0' }),
        el('span', { class: 'streak-cell lvl-1' }),
        el('span', { class: 'streak-cell lvl-2' }),
        el('span', { class: 'streak-cell lvl-3' }),
        el('span', { class: 'streak-cell lvl-4' }),
        el('span', {}, 'mehr')
      )
    ),
    grid
  );
}

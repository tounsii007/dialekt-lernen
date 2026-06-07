// Favoriten · Lern-Heatmap — GitHub-Style Aktivitäts-Raster (letzte 16 Wochen).

import { el } from '../../util.js';
import { getStreakHeatmap, getActiveDays } from '../../store.js';
import { t, getLang } from '../../util/i18n.js';

export function renderHeatmap() {
  const days = getStreakHeatmap(16); // 16 weeks
  const maxCount = days.reduce((m, d) => Math.max(m, d.count), 0) || 1;

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
        title: t(d.count === 1 ? 'view.heatmap-panel.actionOne' : 'view.heatmap-panel.actionMany', { date: d.date.toLocaleDateString(getLang()), n: d.count }),
        style: { '--cell-delay': `${(w * 7 + i) * 6}ms` }
      });
      col.appendChild(cell);
    }
    grid.appendChild(col);
  }

  return el('div', { class: 'card streak-card', dataset: { spotlight: '', reveal: '' } },
    el('div', { class: 'streak-head' },
      el('div', {},
        el('div', { class: 'card-title' }, t('view.heatmap-panel.title')),
        el('div', { class: 'lede', style: { fontSize: '.85rem' } },
          t('view.heatmap-panel.subtitle', { n: getActiveDays() }))
      ),
      el('div', { class: 'streak-legend' },
        el('span', {}, t('view.heatmap-panel.legendLess')),
        el('span', { class: 'streak-cell lvl-0' }),
        el('span', { class: 'streak-cell lvl-1' }),
        el('span', { class: 'streak-cell lvl-2' }),
        el('span', { class: 'streak-cell lvl-3' }),
        el('span', { class: 'streak-cell lvl-4' }),
        el('span', {}, t('view.heatmap-panel.legendMore'))
      )
    ),
    grid
  );
}

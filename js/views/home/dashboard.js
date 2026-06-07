// Startseite · Persönliches Dashboard — „Heute lernen" (SRS-Empfehlungen nach
// Buckets), „Zuletzt angeschaut" und Aktivitäts-Sparkline, plus das tägliche
// Lernziel-Widget. Wird übersprungen, wenn es für einen frischen Nutzer
// schlicht nichts zu zeigen gibt.

import { el, go } from '../../util.js';
import { t } from '../../util/i18n.js';
import { sparkline } from '../../util/icons.js';
import { getRecommendations, getRecentDialects, getActivitySeries } from '../../util/recommendations.js';
import { renderGoalWidget } from '../../util/daily-goal.js';

export function renderDashboard() {
  const rec = getRecommendations(4);
  const recent = getRecentDialects(4);
  const activity = getActivitySeries(14);
  const totalActivity = activity.reduce((s, d) => s + d.count, 0);

  // Skip rendering when there is genuinely nothing to show (truly fresh user with no history).
  const hasReco = rec.hard.length + rec.almost.length + rec.fresh.length > 0;
  const hasRecent = recent.length > 0;
  if (!hasReco && !hasRecent && totalActivity === 0) return null;

  const buckets = [
    { key: 'due',    title: t('view.dashboard.bucketDueTitle'),    hint: t('view.dashboard.bucketDueHint'),   items: rec.due,    color: 'var(--pink)' },
    { key: 'hard',   title: t('view.dashboard.bucketHardTitle'),     hint: t('view.dashboard.bucketHardHint'),  items: rec.hard,   color: 'var(--warm)' },
    { key: 'almost', title: t('view.dashboard.bucketAlmostTitle'),  hint: t('view.dashboard.bucketAlmostHint'),     items: rec.almost, color: 'var(--brand)' },
    { key: 'fresh',  title: t('view.dashboard.bucketFreshTitle'),   hint: t('view.dashboard.bucketFreshHint'),    items: rec.fresh,  color: 'var(--brand-2)' }
  ].filter(b => b.items.length > 0);

  const section = el('section', { class: 'section dashboard-section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, t('section.dashboard')),
        el('div', { class: 'lede' }, t('home.dashboard.lede'))
      ),
      totalActivity > 0 ? el('div', { class: 'dash-activity' },
        el('div', { class: 'dash-activity-meta' },
          el('span', { class: 'dash-activity-num' }, String(totalActivity)),
          el('span', { class: 'dash-activity-label' }, t('view.dashboard.activityLabel'))
        ),
        sparkline(activity.map(a => a.count), { width: 200, height: 48, color: 'currentColor' })
      ) : null
    )
  );

  const dashGrid = el('div', { class: 'dashboard-grid' });

  buckets.forEach((b) => {
    const card = el('article', { class: 'dash-card', dataset: { spotlight: '' }, style: { '--dc': b.color } },
      el('div', { class: 'dash-card-head' },
        el('div', { class: 'dash-card-title' }, b.title),
        el('span', { class: 'dash-card-count', ariaLabel: t('view.dashboard.exprCount', { n: b.items.length }) }, String(b.items.length))
      ),
      el('div', { class: 'dash-card-hint' }, b.hint),
      el('ul', { class: 'dash-list' },
        ...b.items.slice(0, 3).map((it) => el('li', {},
          el('span', { class: 'dash-item-expr' }, it.ausdruck),
          el('span', { class: 'dash-item-meta' }, `${it.dialektFlag} ${it.dialektName}`)
        ))
      ),
      el('button', {
        class: 'btn btn-secondary dash-card-cta', dataset: { magnetic: '10' },
        onClick: () => go('#/lernen')
      }, t('view.dashboard.learnThese'))
    );
    dashGrid.appendChild(card);
  });

  if (recent.length) {
    const recentCard = el('article', { class: 'dash-card dash-recent', dataset: { spotlight: '' } },
      el('div', { class: 'dash-card-head' },
        el('div', { class: 'dash-card-title' }, t('view.dashboard.recentTitle')),
        el('span', { class: 'dash-card-count', ariaLabel: t('count.dialekte', { n: recent.length }) }, String(recent.length))
      ),
      el('div', { class: 'dash-card-hint' }, t('view.dashboard.recentHint')),
      el('div', { class: 'dash-chips' },
        ...recent.map(d => el('button', {
          class: 'dash-chip',
          style: { '--dc': d.farbe },
          onClick: () => go(`#/dialekt/${d.id}`)
        },
          el('span', { class: 'dash-chip-flag' }, d.flag),
          el('span', { class: 'dash-chip-name' }, d.name)
        ))
      )
    );
    dashGrid.appendChild(recentCard);
  }

  section.appendChild(dashGrid);

  // Tägliches Lernziel-Widget
  const goalSection = el('div', { class: 'section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, t('home.dailyGoal.title')),
        el('div', { class: 'lede' }, t('home.dailyGoal.lede'))
      )
    ),
    renderGoalWidget()
  );
  section.appendChild(goalSection);

  return section;
}

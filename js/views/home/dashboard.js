// Startseite · Persönliches Dashboard — „Heute lernen" (SRS-Empfehlungen nach
// Buckets), „Zuletzt angeschaut" und Aktivitäts-Sparkline, plus das tägliche
// Lernziel-Widget. Wird übersprungen, wenn es für einen frischen Nutzer
// schlicht nichts zu zeigen gibt.

import { el, go } from '../../util.js';
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
    { key: 'due',    title: 'Heute fällig',    hint: 'Spaced-Repetition empfiehlt',   items: rec.due,    color: 'var(--pink)' },
    { key: 'hard',   title: 'Wiederholen',     hint: 'Karten mit häufigen Patzern',  items: rec.hard,   color: 'var(--warm)' },
    { key: 'almost', title: 'Fast geschafft',  hint: 'Mittel — noch eine Runde',     items: rec.almost, color: 'var(--brand)' },
    { key: 'fresh',  title: 'Neu entdecken',   hint: 'Noch unbekannte Ausdrücke',    items: rec.fresh,  color: 'var(--accent)' }
  ].filter(b => b.items.length > 0);

  const section = el('section', { class: 'section dashboard-section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, 'Dein Dashboard'),
        el('div', { class: 'lede' }, 'Personalisierte Empfehlungen basierend auf deinem Lernstand.')
      ),
      totalActivity > 0 ? el('div', { class: 'dash-activity' },
        el('div', { class: 'dash-activity-meta' },
          el('span', { class: 'dash-activity-num' }, String(totalActivity)),
          el('span', { class: 'dash-activity-label' }, 'Aktionen / 14 Tage')
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
        el('span', { class: 'dash-card-count' }, String(b.items.length))
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
      }, 'Diese lernen →')
    );
    dashGrid.appendChild(card);
  });

  if (recent.length) {
    const recentCard = el('article', { class: 'dash-card dash-recent', dataset: { spotlight: '' } },
      el('div', { class: 'dash-card-head' },
        el('div', { class: 'dash-card-title' }, 'Zuletzt angeschaut'),
        el('span', { class: 'dash-card-count' }, String(recent.length))
      ),
      el('div', { class: 'dash-card-hint' }, 'Setze dort fort, wo du warst.'),
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
        el('h2', {}, 'Heutiges Ziel'),
        el('div', { class: 'lede' }, 'Passe dein tägliches Lernpensum an — bleib im Rhythmus!')
      )
    ),
    renderGoalWidget()
  );
  section.appendChild(goalSection);

  return section;
}

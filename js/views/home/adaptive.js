// Startseite · Adaptiver Lernplan — „Heute empfohlen". Personalisierte Karten,
// die jetzt den meisten Lerneffekt bringen; bei fehlenden Daten still nichts.

import { el, go } from '../../util.js';
import { getAdaptiveRecommendations } from '../../util/adaptive-plan.js';
import { t } from '../../util/i18n.js';

export function renderAdaptiveRecommendationsSection() {
  let recs = [];
  try {
    recs = getAdaptiveRecommendations(5);
  } catch {
    recs = [];
  }
  if (!recs || recs.length === 0) return null;

  const section = el('section', { class: 'section adaptive-section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, t('view.adaptive.title')),
        el('div', { class: 'lede' }, t('view.adaptive.lede'))
      ),
      el('button', {
        class: 'btn btn-primary',
        dataset: { magnetic: '10' },
        onClick: () => go('#/lernen?source=recommendations'),
        title: t('view.adaptive.ctaTitle')
      }, t('view.adaptive.cta', { n: recs.length }))
    )
  );

  const grid = el('div', { class: 'adaptive-grid' });
  for (const rec of recs) {
    const a = rec.entry;
    if (!a) continue;
    grid.appendChild(el('button', {
      class: 'adaptive-card',
      style: { '--dc': a.dialektFarbe || 'var(--brand)' },
      dataset: { spotlight: '' },
      onClick: () => go(`#/dialekt/${a.dialektId}`),
      title: `${a.dialektFlag || ''} ${a.dialektName || ''} — ${a.hochdeutsch || ''}`
    },
      el('div', { class: 'adaptive-card-head' },
        el('span', { class: 'adaptive-flag' }, a.dialektFlag || '🃏'),
        el('span', { class: 'adaptive-priority', dataset: { p: String(rec.priority || 4) } },
          rec.priority === 1 ? t('view.adaptive.prio.urgent') :
          rec.priority === 2 ? t('view.adaptive.prio.weak') :
          rec.priority === 3 ? t('view.adaptive.prio.new') : t('view.adaptive.prio.refresh')
        )
      ),
      el('div', { class: 'adaptive-expr' }, a.ausdruck),
      el('div', { class: 'adaptive-hd' }, '↦ ' + (a.hochdeutsch || '')),
      el('div', { class: 'adaptive-reason' }, rec.reason)
    ));
  }
  section.appendChild(grid);
  return section;
}

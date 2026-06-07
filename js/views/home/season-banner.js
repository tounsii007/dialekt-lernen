// Startseite · Saison-Banner (Karneval / Wiesn / Advent)
// Blendet — wenn eine Saison aktiv ist — ganz oben einen Banner mit Gruß,
// Top-Begriffen und CTA zur Saison-Lektion ein.

import { el, go } from '../../util.js';
import { t } from '../../util/i18n.js';
import {
  getSeasonInfo, getSeasonalGreeting,
  getSeasonalExpressions, getSeasonStartHref
} from '../../util/season.js';

export function renderSeasonBanner(seasonId) {
  const info = getSeasonInfo(seasonId);
  if (!info) return el('div');
  const greeting = getSeasonalGreeting();
  const expressions = getSeasonalExpressions(undefined, 5);
  const href = getSeasonStartHref();

  const banner = el('section', { class: `season-banner season-${info.id}`, dataset: { reveal: '' },
    style: { '--season-accent': info.accent } },
    el('div', { class: 'season-banner-head' },
      el('span', { class: 'season-emoji', 'aria-hidden': 'true' }, info.emoji),
      el('div', { class: 'season-meta' },
        el('div', { class: 'season-title' }, info.title),
        el('div', { class: 'season-greeting' }, greeting || info.label)
      ),
      el('button', {
        class: 'btn btn-primary season-cta',
        dataset: { magnetic: '12' },
        onClick: () => go(href)
      }, t('view.season-banner.cta'))
    ),
    expressions.length ? el('div', { class: 'season-list' },
      el('div', { class: 'season-list-title' }, t('view.season-banner.topTerms', { n: expressions.length })),
      el('ul', { class: 'season-chips' },
        ...expressions.map(a => el('li', {},
          el('button', {
            class: 'season-chip',
            onClick: () => go(`#/dialekt/${a.dialektId}`),
            title: `${a.hochdeutsch} — ${a.dialektName}`
          },
            el('span', { class: 'season-chip-expr' }, a.ausdruck),
            el('span', { class: 'season-chip-meta' }, `${a.dialektFlag} ${a.dialektName}`)
          )
        ))
      )
    ) : null
  );
  return banner;
}

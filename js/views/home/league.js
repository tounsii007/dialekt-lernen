// Startseite · Lokale Liga — kompakte Standings-Karte (verlinkt auf die
// Voll-Ansicht). Vollständig offline; bei fehlenden Daten still leer.

import { el, go } from '../../util.js';
import { t } from '../../util/i18n.js';
import { getLeagueSummary } from '../../store/league.js';

const LEAGUE_ZONE_LABEL = {
  promotion: () => t('view.league.zonePromotion'),
  demotion:  () => t('view.league.zoneDemotion'),
  hold:      () => t('view.league.zoneHold'),
};

export function renderLeagueSection() {
  let s;
  try {
    s = getLeagueSummary();
  } catch {
    return el('div');
  }

  const section = el('section', { class: 'section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, t('view.league.title')),
        el('div', { class: 'lede' }, t('view.league.lede'))
      ),
      el('button', {
        class: 'btn btn-ghost',
        onClick: () => go('#/liga')
      }, t('view.league.ranking'))
    )
  );

  const card = el('button', {
    class: 'league-card',
    onClick: () => go('#/liga'),
    title: t('view.league.viewTier', { name: s.tierInfo.name })
  },
    el('span', { class: 'league-card-badge', 'aria-hidden': 'true' }, s.tierInfo.icon),
    el('div', { class: 'league-card-meta' },
      el('div', { class: 'league-card-name' }, t('view.league.tierName', { name: s.tierInfo.name })),
      el('div', { class: 'league-card-sub' },
        t('view.league.rank', { rank: s.rank, total: s.cohortSize }),
        el('span', { class: `league-card-zone league-zone-${s.zone}` }, (LEAGUE_ZONE_LABEL[s.zone] || (() => ''))())
      )
    ),
    el('div', { class: 'league-card-xp' },
      el('span', { class: 'league-card-xp-num' }, String(s.weeklyXp)),
      el('span', { class: 'league-card-xp-label' }, t('view.league.xpPerWeek'))
    )
  );
  section.appendChild(card);
  return section;
}

// Startseite · Lokale Liga — kompakte Standings-Karte (verlinkt auf die
// Voll-Ansicht). Vollständig offline; bei fehlenden Daten still leer.

import { el, go } from '../../util.js';
import { getLeagueSummary } from '../../store/league.js';

const LEAGUE_ZONE_LABEL = {
  promotion: '🔼 Aufstieg',
  demotion:  '🔽 Abstieg',
  hold:      '➖ Gehalten',
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
        el('h2', {}, 'Lokale Liga'),
        el('div', { class: 'lede' }, 'Wettstreit gegen Übungs-Geister — komplett offline.')
      ),
      el('button', {
        class: 'btn btn-ghost',
        onClick: () => go('#/liga')
      }, 'Rangliste →')
    )
  );

  const card = el('button', {
    class: 'league-card',
    onClick: () => go('#/liga'),
    title: `${s.tierInfo.name}-Liga ansehen`
  },
    el('span', { class: 'league-card-badge', 'aria-hidden': 'true' }, s.tierInfo.icon),
    el('div', { class: 'league-card-meta' },
      el('div', { class: 'league-card-name' }, s.tierInfo.name + '-Liga'),
      el('div', { class: 'league-card-sub' },
        `Rang ${s.rank} / ${s.cohortSize}`,
        el('span', { class: `league-card-zone league-zone-${s.zone}` }, LEAGUE_ZONE_LABEL[s.zone])
      )
    ),
    el('div', { class: 'league-card-xp' },
      el('span', { class: 'league-card-xp-num' }, String(s.weeklyXp)),
      el('span', { class: 'league-card-xp-label' }, 'XP / Woche')
    )
  );
  section.appendChild(card);
  return section;
}

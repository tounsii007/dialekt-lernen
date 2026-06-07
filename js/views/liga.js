// Liga-View — vollständige Wochen-Rangliste der lokalen Liga.
// Alle Gegner sind synthetische Geister (lokal & deterministisch erzeugt);
// es verlassen keine Daten das Gerät — der Datenschutz-Pfeiler bleibt intakt.

import { el, go } from '../util.js';
import { t } from '../util/i18n.js';
import {
  LEAGUE_TIERS, PROMOTE_RANK, DEMOTE_RANK,
  getCohort, getLeagueSummary, getLeagueResult, clearLeagueResult,
} from '../store/league.js';

const ZONE_LABEL = {
  promotion: '🔼 ' + t('view.liga.zonePromotion'),
  demotion:  '🔽 ' + t('view.liga.zoneDemotion'),
  hold:      '➖ ' + t('view.liga.zoneHold'),
};

export function renderLiga(root) {
  root.innerHTML = '';
  const view = el('div', { class: 'view liga-view' });

  const s = getLeagueSummary();
  const board = getCohort();
  const result = getLeagueResult();

  // Ergebnis der Vorwoche (einmalig anzeigen, dann konsumieren).
  if (result && result.outcome !== 'held') {
    view.appendChild(renderResultBanner(result));
    clearLeagueResult();
  }

  // Kopf: aktuelle Liga + Rang.
  view.appendChild(el('section', { class: 'section', dataset: { reveal: '' } },
    el('div', { class: 'liga-hero', style: { '--liga-accent': tierAccent(s.tier) } },
      el('div', { class: 'liga-hero-badge', 'aria-hidden': 'true' }, s.tierInfo.icon),
      el('div', { class: 'liga-hero-meta' },
        el('div', { class: 'liga-hero-eyebrow' }, t('view.liga.heroEyebrow')),
        el('h1', { class: 'liga-hero-name' }, t('view.liga.tierLiga', { name: s.tierInfo.name })),
        el('div', { class: 'liga-hero-sub' },
          t('view.liga.rankOf', { rank: s.rank, total: s.cohortSize }),
          el('span', { class: `liga-zone-chip liga-zone-${s.zone}` }, ZONE_LABEL[s.zone])
        )
      ),
      el('div', { class: 'liga-hero-xp' },
        el('div', { class: 'liga-hero-xp-num' }, String(s.weeklyXp)),
        el('div', { class: 'liga-hero-xp-label' }, t('view.liga.xpThisWeek'))
      )
    )
  ));

  // Tier-Leiter — alle Stufen, aktuelle hervorgehoben.
  view.appendChild(renderTierLadder(s));

  // Wochenfortschritt + Erklärung.
  view.appendChild(el('section', { class: 'section', dataset: { reveal: '' } },
    el('div', { class: 'liga-progress-card' },
      el('div', { class: 'liga-progress-head' },
        el('span', {}, t('view.liga.week')),
        el('span', {}, `${Math.round(s.weekProgress * 100)} %`)
      ),
      el('div', { class: 'liga-progress' },
        el('div', { class: 'liga-progress-bar', style: { width: (s.weekProgress * 100).toFixed(0) + '%' } })
      ),
      el('div', { class: 'liga-progress-hint' },
        s.isTopTier
          ? t('view.liga.hintTopTier')
          : s.zone === 'promotion'
            ? t('view.liga.hintInPromo', { n: PROMOTE_RANK })
            : t('view.liga.hintToPromo', { n: PROMOTE_RANK })
              + (s.toPromote > 0 ? t('view.liga.hintToPromoXp', { xp: s.toPromote }) : '')
              + '.'
      )
    )
  ));

  // Rangliste.
  view.appendChild(renderLeaderboard(board, s));

  // Datenschutz-Hinweis — der eigentliche Wettbewerbsvorteil.
  view.appendChild(el('section', { class: 'section', dataset: { reveal: '' } },
    el('div', { class: 'liga-privacy-note' },
      el('span', { 'aria-hidden': 'true' }, '🔒'),
      el('span', {}, t('view.liga.privacyNote'))
    )
  ));

  // Zurück-CTA.
  view.appendChild(el('section', { class: 'section', dataset: { reveal: '' } },
    el('button', { class: 'btn btn-secondary', onClick: () => go('#/') }, '← ' + t('view.liga.backHome'))
  ));

  root.appendChild(view);
}

function tierAccent(tier) {
  const accents = ['#cd7f32', '#9aa6b2', '#e8b923', '#2a9df4', '#e5484d', '#30a46c', '#5b8def'];
  return accents[Math.min(tier, accents.length - 1)] || 'var(--brand)';
}

function renderResultBanner(r) {
  const promoted = r.outcome === 'promoted';
  const fromName = LEAGUE_TIERS[r.prevTier]?.name || '';
  const toName = LEAGUE_TIERS[r.tier]?.name || '';
  return el('section', { class: 'section', dataset: { reveal: '' } },
    el('div', { class: 'liga-result-banner ' + (promoted ? 'is-promoted' : 'is-demoted') },
      el('div', { class: 'liga-result-icon', 'aria-hidden': 'true' }, promoted ? '🎉' : '😮‍💨'),
      el('div', {},
        el('div', { class: 'liga-result-title' },
          promoted ? t('view.liga.promotedTitle', { name: toName }) : t('view.liga.demotedTitle', { name: toName })),
        el('div', { class: 'liga-result-sub' },
          promoted
            ? t('view.liga.promotedSub', { rank: r.rank, name: fromName })
            : t('view.liga.demotedSub', { rank: r.rank, name: fromName }))
      )
    )
  );
}

function renderTierLadder(s) {
  const ladder = el('div', { class: 'liga-ladder' });
  LEAGUE_TIERS.forEach((t, i) => {
    const cls = 'liga-ladder-step'
      + (i === s.tier ? ' is-current' : '')
      + (i < s.tier ? ' is-passed' : '')
      + (i <= s.best ? ' is-unlocked' : '');
    ladder.appendChild(el('div', { class: cls, style: { '--liga-accent': tierAccent(i) }, title: t.name },
      el('span', { class: 'liga-ladder-icon', 'aria-hidden': 'true' }, t.icon),
      el('span', { class: 'liga-ladder-name' }, t.name)
    ));
  });
  return el('section', { class: 'section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, t('view.liga.tiersTitle')),
        el('div', { class: 'lede' }, t('view.liga.bestTier', { tier: `${s.bestInfo.icon} ${s.bestInfo.name}` }))
      )
    ),
    ladder
  );
}

function renderLeaderboard(board, s) {
  const section = el('section', { class: 'section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, t('view.liga.boardTitle')),
        el('div', { class: 'lede' }, t('view.liga.boardLede'))
      )
    )
  );

  const list = el('div', { class: 'liga-board' });
  board.forEach((e, idx) => {
    const rank = idx + 1;
    // Zonen-Trenner einfügen.
    if (!s.isTopTier && rank === 1) {
      list.appendChild(el('div', { class: 'liga-zone-divider is-promote' }, t('view.liga.dividerPromote', { n: PROMOTE_RANK })));
    }
    if (!s.isBottomTier && rank === DEMOTE_RANK) {
      list.appendChild(el('div', { class: 'liga-zone-divider is-demote' }, t('view.liga.dividerDemote')));
    }

    const inPromo = !s.isTopTier && rank <= PROMOTE_RANK;
    const inDemo = !s.isBottomTier && rank >= DEMOTE_RANK;
    const cls = 'liga-row'
      + (e.isUser ? ' is-user' : '')
      + (inPromo ? ' in-promote' : '')
      + (inDemo ? ' in-demote' : '');

    list.appendChild(el('div', { class: cls },
      el('span', { class: 'liga-row-rank' }, medal(rank)),
      el('span', { class: 'liga-row-name' }, e.isUser ? t('view.liga.you') : e.name),
      el('span', { class: 'liga-row-xp' }, `${e.xp} XP`)
    ));
  });
  section.appendChild(list);
  return section;
}

function medal(rank) {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return String(rank);
}

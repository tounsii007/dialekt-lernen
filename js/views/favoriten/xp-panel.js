// Favoriten · XP-Panel — Level, Fortschrittsbalken, letzte XP-Einträge.

import { el } from '../../util.js';
import { getXp, getXpLog, xpToNextLevel, getLevelTitle } from '../../store/xp.js';

export function renderXpCard() {
  const xp = getXp();
  const { level, current, needed, progress } = xpToNextLevel(xp);
  const title = getLevelTitle(level);
  const log = getXpLog(5);
  const pct = Math.round(progress * 100);

  const reasonLabels = {
    'card-learned':   '📗 Karte gelernt',
    'card-reviewed':  '🔄 Karte wiederholt',
    'quiz-correct':   '✅ Quiz korrekt',
    'quiz-perfect':   '🏆 Quiz perfekt',
    'streak-day':     '🔥 Tages-Streak',
    'achievement':    '🏅 Achievement',
    'dialect-visit':  '📍 Dialekt besucht',
    'note-written':   '📝 Notiz geschrieben',
  };

  return el('section', { class: 'section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, 'Dein Fortschritt'),
        el('div', { class: 'lede' }, 'XP sammelst du durch Lernen, Quiz und tägliche Aktivität.')
      )
    ),
    el('div', { class: 'xp-card', dataset: { spotlight: '' } },
      el('div', { class: 'xp-card-head' },
        el('div', { class: 'xp-card-level' }, `${level}`),
        el('div', {},
          el('div', { class: 'xp-card-title' }, title),
          el('div', { class: 'xp-card-title-sub' }, `Level ${level} · ${xp} XP gesamt`)
        )
      ),
      el('div', { class: 'xp-card-bar-row' },
        el('div', { class: 'xp-card-bar', role: 'progressbar', ariaValuenow: pct, ariaValuemin: 0, ariaValuemax: 100 },
          el('div', { class: 'xp-card-bar-fill', style: { width: `${pct}%` } })
        ),
        el('span', { class: 'xp-card-bar-label' }, `${current}/${needed}`)
      ),
      log.length ? el('ul', { class: 'xp-log' },
        ...log.map(e => el('li', { class: 'xp-log-item' },
          el('span', {}, reasonLabels[e.reason] || e.reason),
          el('span', { class: 'xp-log-amount' }, `+${e.amount}`)
        ))
      ) : el('p', { class: 'xp-card-title-sub' }, 'Noch keine XP — lerne deine erste Karte!')
    )
  );
}

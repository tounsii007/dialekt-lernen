// Favoriten · XP-Panel — Level, Fortschrittsbalken, letzte XP-Einträge.

import { el } from '../../util.js';
import { t } from '../../util/i18n.js';
import { getXp, getXpLog, xpToNextLevel, getLevelTitle } from '../../store/xp.js';

export function renderXpCard() {
  const xp = getXp();
  const { level, current, needed, progress } = xpToNextLevel(xp);
  const title = getLevelTitle(level);
  const log = getXpLog(5);
  const pct = Math.round(progress * 100);

  const reasonLabels = {
    'card-learned':   t('view.xp-panel.reasonCardLearned'),
    'card-reviewed':  t('view.xp-panel.reasonCardReviewed'),
    'quiz-correct':   t('view.xp-panel.reasonQuizCorrect'),
    'quiz-perfect':   t('view.xp-panel.reasonQuizPerfect'),
    'streak-day':     t('view.xp-panel.reasonStreakDay'),
    'achievement':    t('view.xp-panel.reasonAchievement'),
    'dialect-visit':  t('view.xp-panel.reasonDialectVisit'),
    'note-written':   t('view.xp-panel.reasonNoteWritten'),
  };

  return el('section', { class: 'section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, t('view.xp-panel.heading')),
        el('div', { class: 'lede' }, t('view.xp-panel.lede'))
      )
    ),
    el('div', { class: 'xp-card', dataset: { spotlight: '' } },
      el('div', { class: 'xp-card-head' },
        el('div', { class: 'xp-card-level' }, `${level}`),
        el('div', {},
          el('div', { class: 'xp-card-title' }, title),
          el('div', { class: 'xp-card-title-sub' }, t('view.xp-panel.levelSub', { level, xp }))
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
      ) : el('p', { class: 'xp-card-title-sub' }, t('view.xp-panel.empty'))
    )
  );
}

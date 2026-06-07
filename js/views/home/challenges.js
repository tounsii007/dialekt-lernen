// Startseite · Wöchentliche Challenges — drei Mini-Challenges, neu jeden Montag.
// Der Section-Kopf trägt zusätzlich den Pomodoro-Umschalter (Picker/Stopp), der
// aus ./pomodoro.js stammt.

import { el } from '../../util.js';
import { getActiveChallengesWithProgress } from '../../store/challenges.js';
import { isPomodoroRunning } from '../../util/pomodoro.js';
import { t } from '../../util/i18n.js';
import { openPomodoroPicker } from './pomodoro.js';

export function renderChallengesSection() {
  const challenges = getActiveChallengesWithProgress();

  const section = el('section', { class: 'section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, t('view.challenges.title')),
        el('div', { class: 'lede' }, t('view.challenges.lede'))
      ),
      el('button', {
        class: 'btn btn-ghost btn-pomodoro-toggle',
        title: t('view.challenges.pomodoroStart'),
        onClick: openPomodoroPicker
      }, isPomodoroRunning() ? t('view.challenges.pomodoroStop') : t('view.challenges.pomodoroToggle'))
    )
  );

  const grid = el('div', { class: 'challenge-grid' });
  for (const c of challenges) {
    grid.appendChild(renderChallengeCard(c));
  }
  section.appendChild(grid);
  return section;
}

function renderChallengeCard(c) {
  const pct = c.target > 0 ? Math.min(1, c.current / c.target) * 100 : 0;
  const card = el('article', { class: 'challenge-card' + (c.done ? ' is-done' : ''), dataset: { spotlight: '' } },
    el('div', { class: 'challenge-card-head' },
      el('div', { class: 'challenge-card-title' }, c.label),
      el('span', { class: 'challenge-card-xp' }, `+${c.xp} XP`)
    ),
    c.hint ? el('div', { class: 'challenge-card-hint' }, c.hint) : null,
    el('div', { class: 'challenge-progress' },
      el('div', {
        class: 'challenge-progress-bar',
        style: { width: pct.toFixed(0) + '%' }
      })
    ),
    el('div', { class: 'challenge-progress-meta' },
      el('span', {}, `${c.current} / ${c.target}`),
      c.done ? el('span', { class: 'challenge-done' }, t('view.challenges.done')) : null
    )
  );
  return card;
}

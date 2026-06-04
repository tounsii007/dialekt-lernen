// Startseite · Tägliche Quests — drei Aufgaben, jeden Tag neu, mit Fortschritt
// und Bonus-Banner, sobald alle erledigt sind.

import { el } from '../../util.js';
import { getActiveQuestsWithProgress, getQuestsSummary, ALL_DONE_BONUS_XP } from '../../store/quests.js';

const QUEST_METRIC_ICON = {
  review: '🔁', learn: '✨', xp: '⚡', quiz: '❓', quizPerfect: '🎯', game: '🎮',
};

export function renderQuestsSection() {
  const quests = getActiveQuestsWithProgress();
  const summary = getQuestsSummary();

  const section = el('section', { class: 'section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, 'Tages-Quests'),
        el('div', { class: 'lede' }, 'Drei Aufgaben — jeden Tag neu.')
      ),
      el('span', {
        class: 'quest-summary-pill' + (summary.allDone ? ' is-done' : ''),
      }, `${summary.done} / ${summary.total}`)
    )
  );

  if (summary.allDone) {
    section.appendChild(el('div', { class: 'quest-alldone-banner' },
      `🎉 Alle Tages-Quests geschafft${summary.bonusClaimed ? ` · Bonus +${ALL_DONE_BONUS_XP} XP` : ''}`
    ));
  }

  const grid = el('div', { class: 'quest-grid' });
  for (const q of quests) grid.appendChild(renderQuestCard(q));
  section.appendChild(grid);
  return section;
}

function renderQuestCard(q) {
  const pct = q.target > 0 ? Math.min(1, q.current / q.target) * 100 : 0;
  return el('article', { class: 'quest-card' + (q.done ? ' is-done' : ''), dataset: { spotlight: '' } },
    el('div', { class: 'quest-card-head' },
      el('span', { class: 'quest-card-icon', 'aria-hidden': 'true' }, QUEST_METRIC_ICON[q.metric] || '⭐'),
      el('div', { class: 'quest-card-title' }, q.label),
      el('span', { class: 'quest-card-xp' }, `+${q.xp} XP`)
    ),
    q.hint ? el('div', { class: 'quest-card-hint' }, q.hint) : null,
    el('div', { class: 'quest-progress' },
      el('div', { class: 'quest-progress-bar', style: { width: pct.toFixed(0) + '%' } })
    ),
    el('div', { class: 'quest-progress-meta' },
      el('span', {}, `${q.current} / ${q.target}`),
      q.done ? el('span', { class: 'quest-done' }, '✓ erledigt') : null
    )
  );
}

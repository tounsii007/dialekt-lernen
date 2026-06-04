// Favoriten · Achievements — Trophäen-Raster nach Rarität, Sammler-Punkte.

import { el } from '../../util.js';
import { evaluateAchievements, getAchievementScore, rarityOf, RARITY } from '../../store.js';
import { icon } from '../../util/icons.js';
import { confettiBurst } from '../../util/motion.js';
import { sfx } from '../../util/sounds.js';

export function renderAchievements(stats) {
  const { items, justUnlocked } = evaluateAchievements(stats);
  const unlockedCount = items.filter(i => i.unlocked).length;
  const score = getAchievementScore();

  // Nach Rarität sortieren (legendär zuerst), damit die wertvollsten Trophäen
  // oben stehen; innerhalb gleicher Stufe bleibt die Definitionsreihenfolge.
  const ordered = items
    .map((it, i) => ({ it, i }))
    .sort((a, b) => (rarityOf(b.it.def).order - rarityOf(a.it.def).order) || (a.i - b.i))
    .map((x) => x.it);

  const grid = el('div', { class: 'achievements-grid' });
  ordered.forEach(({ def, unlocked, justUnlocked: ju }) => {
    const r = rarityOf(def);
    const card = el('div', {
      class: 'achievement rarity-' + r.id + (unlocked ? ' is-unlocked' : ' is-locked') + (ju ? ' is-fresh' : ''),
      title: `${def.desc} · ${r.label} (${r.points} Punkte)`,
      dataset: { spotlight: '' }
    },
      el('div', { class: 'ach-icon' }, def.icon),
      el('div', { class: 'ach-text' },
        el('div', { class: 'ach-title' }, def.title),
        el('div', { class: 'ach-desc' }, def.desc),
        el('div', { class: 'ach-rarity-tag' }, r.label)
      ),
      unlocked ? el('div', { class: 'ach-check' }, icon('zap', { size: 14 })) : null
    );
    grid.appendChild(card);
  });

  // Celebrate any newly-unlocked achievements after a small delay.
  if (justUnlocked.length) {
    setTimeout(() => {
      const first = grid.querySelector('.achievement.is-fresh');
      if (first) confettiBurst(first, { count: 70 });
      sfx.unlock();
    }, 400);
  }

  // Sammler-Punkte-Aufschlüsselung pro Raritätsstufe.
  const legend = el('div', { class: 'ach-rarity-legend' },
    ...Object.keys(RARITY)
      .sort((a, b) => RARITY[a].order - RARITY[b].order)
      .map((k) => el('span', { class: 'ach-rarity-chip rarity-' + k },
        `${RARITY[k].label} ${score.byRarity[k].unlocked}/${score.byRarity[k].total}`))
  );

  return el('section', { class: 'section', dataset: { reveal: '' } },
    el('div', { class: 'section-head ach-head' },
      el('div', {},
        el('h2', {}, 'Achievements'),
        el('div', { class: 'lede' }, `${unlockedCount} von ${items.length} freigeschaltet`)
      ),
      el('div', { class: 'ach-score', title: 'Sammler-Punkte aus allen freigeschalteten Trophäen' },
        el('span', { class: 'ach-score-num', dataset: { count: String(score.score) } }, String(score.score)),
        el('span', { class: 'ach-score-max' }, `/ ${score.maxScore} Punkte`)
      )
    ),
    legend,
    grid
  );
}

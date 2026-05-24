import { el, go } from '../util.js';
import {
  getFavoriten, getLernStats, getQuizGenauigkeit, getStreak, getQuizHistory,
  getStreakHeatmap, getActiveDays, evaluateAchievements, getVisitedDialects
} from '../store.js';
import { DIALEKTE, getDialekt, ALLE_AUSDRUECKE } from '../../data/dialekte.js';
import { renderExpressionCard } from './partials.js';
import { icon, emptyIllustration } from '../util/icons.js';
import { confettiBurst } from '../util/motion.js';

export function renderFavoriten(root) {
  root.innerHTML = '';
  const view = el('div', { class: 'view' });

  view.appendChild(el('div', { class: 'section-head' },
    el('div', {},
      el('h2', {}, '⭐ Deine Favoriten & Statistiken'),
      el('div', { class: 'lede' }, 'Hier findest du markierte Ausdrücke und deinen Lernfortschritt.')
    )
  ));

  // Stats
  const stats = getLernStats();
  const acc = getQuizGenauigkeit();
  const streak = getStreak();
  const favs = getFavoriten();
  const history = getQuizHistory();

  view.appendChild(el('div', { class: 'stat-grid', dataset: { reveal: '' } },
    el('div', { class: 'stat-card', dataset: { spotlight: '' } },
      el('div', { class: 'stat-card-icon' }, icon('target', { size: 22 })),
      el('div', { class: 'stat-card-value', dataset: { count: String(stats.gelernt) } }, String(stats.gelernt)),
      el('div', { class: 'stat-card-label' }, 'Ausdrücke gelernt')
    ),
    el('div', { class: 'stat-card', dataset: { spotlight: '' } },
      el('div', { class: 'stat-card-icon' }, icon('book', { size: 22 })),
      el('div', { class: 'stat-card-value', dataset: { count: String(stats.inArbeit) } }, String(stats.inArbeit)),
      el('div', { class: 'stat-card-label' }, 'In Arbeit')
    ),
    el('div', { class: 'stat-card', dataset: { spotlight: '' } },
      el('div', { class: 'stat-card-icon' }, icon('zap', { size: 22 })),
      el('div', { class: 'stat-card-value', dataset: { count: String(acc), suffix: '%' } }, acc + '%'),
      el('div', { class: 'stat-card-label' }, 'Quiz-Genauigkeit')
    ),
    el('div', { class: 'stat-card', dataset: { spotlight: '' } },
      el('div', { class: 'stat-card-icon' }, icon('flame', { size: 22 })),
      el('div', { class: 'stat-card-value', dataset: { count: String(streak) } }, String(streak)),
      el('div', { class: 'stat-card-label' }, 'Tage in Folge')
    ),
    el('div', { class: 'stat-card', dataset: { spotlight: '' } },
      el('div', { class: 'stat-card-icon' }, icon('heart', { size: 22 })),
      el('div', { class: 'stat-card-value', dataset: { count: String(favs.length) } }, String(favs.length)),
      el('div', { class: 'stat-card-label' }, 'Favoriten')
    )
  ));

  // Streak heatmap — GitHub-style
  view.appendChild(renderHeatmap());

  // Achievements
  const achView = renderAchievements({
    gelerntCount: stats.gelernt,
    streak,
    quizCount: history.length,
    bestQuiz: history.reduce((m, h) => Math.max(m, Math.round((h.score / h.total) * 100)), 0),
    visitedCount: getVisitedDialects().length,
    totalDialects: DIALEKTE.length,
    favCount: favs.length
  });
  view.appendChild(achView);

  // Quiz-Verlauf
  if (history.length) {
    const last5 = history.slice(0, 5);
    view.appendChild(el('div', { class: 'card', style: { marginTop: '24px' } },
      el('div', { class: 'card-title' }, 'Letzte Quiz-Ergebnisse'),
      el('div', { style: { display: 'flex', gap: '12px', flexWrap: 'wrap' } },
        ...last5.map(h => {
          const pct = Math.round((h.score / h.total) * 100);
          const color = pct >= 70 ? 'var(--accent)' : pct >= 50 ? 'var(--warm)' : '#ef476f';
          return el('div', {
            style: { padding: '12px 18px', borderRadius: '12px', background: 'var(--bg-soft)', minWidth: '120px', textAlign: 'center', borderLeft: `4px solid ${color}` }
          },
            el('div', { style: { fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: '700' } }, pct + '%'),
            el('div', { style: { fontSize: '0.8rem', color: 'var(--text-muted)' } }, `${h.score}/${h.total} · ${new Date(h.date).toLocaleDateString('de-DE')}`)
          );
        })
      )
    ));
  }

  // Favoriten
  view.appendChild(el('div', { class: 'section-head', style: { marginTop: '40px' } },
    el('div', {}, el('h2', {}, 'Deine Favoriten'))
  ));

  if (favs.length === 0) {
    view.appendChild(el('div', { class: 'empty-state' },
      emptyIllustration('heart'),
      el('h3', {}, 'Noch keine Favoriten markiert'),
      el('div', { class: 'empty-meta' }, 'Klicke auf das ♡ Symbol bei einem Ausdruck, um ihn hier zu speichern.'),
      el('button', { class: 'btn btn-primary', dataset: { magnetic: '12' }, onClick: () => go('#/entdecken') }, 'Dialekte erkunden')
    ));
  } else {
    const grid = el('div', { class: 'expr-grid' });
    favs.forEach(({ dialektId, ausdruckId }) => {
      const d = getDialekt(dialektId);
      if (!d) return;
      const a = d.ausdruecke.find(x => x.id === ausdruckId);
      if (!a) return;
      grid.appendChild(renderExpressionCard(a, d));
    });
    view.appendChild(grid);
  }

  root.appendChild(view);
}

function renderHeatmap() {
  const days = getStreakHeatmap(16); // 16 weeks
  const maxCount = days.reduce((m, d) => Math.max(m, d.count), 0) || 1;
  const monthLabel = (d) => ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'][d.getMonth()];

  const grid = el('div', { class: 'streak-grid' });
  // Group into weeks (columns)
  for (let w = 0; w < days.length / 7; w++) {
    const col = el('div', { class: 'streak-col' });
    for (let i = 0; i < 7; i++) {
      const d = days[w * 7 + i];
      if (!d) continue;
      const lvl = d.count === 0 ? 0 : Math.min(4, Math.ceil((d.count / maxCount) * 4));
      const cell = el('div', {
        class: `streak-cell lvl-${lvl}`,
        title: `${d.date.toLocaleDateString('de-DE')} — ${d.count} Aktion${d.count===1?'':'en'}`,
        style: { '--cell-delay': `${(w * 7 + i) * 6}ms` }
      });
      col.appendChild(cell);
    }
    grid.appendChild(col);
  }

  return el('div', { class: 'card streak-card', dataset: { spotlight: '', reveal: '' } },
    el('div', { class: 'streak-head' },
      el('div', {},
        el('div', { class: 'card-title' }, 'Lern-Heatmap'),
        el('div', { class: 'lede', style: { fontSize: '.85rem' } },
          `Letzte 16 Wochen · ${getActiveDays()} aktive Tage insgesamt`)
      ),
      el('div', { class: 'streak-legend' },
        el('span', {}, 'weniger'),
        el('span', { class: 'streak-cell lvl-0' }),
        el('span', { class: 'streak-cell lvl-1' }),
        el('span', { class: 'streak-cell lvl-2' }),
        el('span', { class: 'streak-cell lvl-3' }),
        el('span', { class: 'streak-cell lvl-4' }),
        el('span', {}, 'mehr')
      )
    ),
    grid
  );
}

function renderAchievements(stats) {
  const { items, justUnlocked } = evaluateAchievements(stats);
  const unlockedCount = items.filter(i => i.unlocked).length;

  const grid = el('div', { class: 'achievements-grid' });
  items.forEach(({ def, unlocked, justUnlocked: ju }) => {
    const card = el('div', {
      class: 'achievement' + (unlocked ? ' is-unlocked' : ' is-locked') + (ju ? ' is-fresh' : ''),
      title: def.desc,
      dataset: { spotlight: '' }
    },
      el('div', { class: 'ach-icon' }, def.icon),
      el('div', { class: 'ach-text' },
        el('div', { class: 'ach-title' }, def.title),
        el('div', { class: 'ach-desc' }, def.desc)
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
    }, 400);
  }

  return el('section', { class: 'section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, 'Achievements'),
        el('div', { class: 'lede' }, `${unlockedCount} von ${items.length} freigeschaltet`)
      )
    ),
    grid
  );
}

import { el, go } from '../util.js';
import {
  getFavoriten, getLernStats, getQuizGenauigkeit, getStreak, getQuizHistory,
  getStreakHeatmap, getActiveDays, evaluateAchievements, getVisitedDialects
} from '../store.js';
import { DIALEKTE, getDialekt, ALLE_AUSDRUECKE } from '../../data/dialekte.js';
import { renderExpressionCard } from './partials.js';
import { icon, emptyIllustration, sparkline } from '../util/icons.js';
import { getQuizSparkline } from '../util/recommendations.js';
import { confettiBurst } from '../util/motion.js';
import { sfx } from '../util/sounds.js';
import { downloadStateFile, importState, resetAllData, exportStateAsString } from '../store/transfer.js';
import { toast } from '../util.js';
import { getXp, getXpLog, xpToNextLevel, getLevelTitle } from '../store/xp.js';

export function renderFavoriten(root) {
  root.innerHTML = '';
  const view = el('div', { class: 'view' });

  view.appendChild(el('div', { class: 'section-head' },
    el('div', {},
      el('h2', {}, '⭐ Deine Favoriten & Statistiken'),
      el('div', { class: 'lede' }, 'Hier findest du markierte Ausdrücke und deinen Lernfortschritt.')
    )
  ));

  // XP Card
  view.appendChild(renderXpCard());

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

  // Quiz-Verlauf — Sparkline + letzte Ergebnisse
  if (history.length) {
    const sparkData = getQuizSparkline(10);
    const last5 = history.slice(0, 5);
    const trend = sparkData.length >= 2
      ? sparkData[sparkData.length - 1].pct - sparkData[0].pct
      : 0;
    const trendText = trend > 0 ? `▲ +${trend}%` : trend < 0 ? `▼ ${trend}%` : '— stabil';
    const trendCls = trend > 0 ? 'pos' : trend < 0 ? 'neg' : 'neu';

    view.appendChild(el('div', { class: 'card quiz-trend', style: { marginTop: '24px' }, dataset: { spotlight: '', reveal: '' } },
      el('div', { class: 'quiz-trend-head' },
        el('div', {},
          el('div', { class: 'card-title' }, 'Quiz-Trend'),
          el('div', { class: 'lede', style: { fontSize: '.85rem' } }, `Letzte ${sparkData.length} Quizze · ${acc}% Gesamt-Genauigkeit`)
        ),
        el('div', { class: 'quiz-trend-delta ' + trendCls }, trendText)
      ),
      sparkData.length >= 2
        ? sparkline(sparkData.map(s => s.pct), { width: 320, height: 64, color: 'var(--brand)', max: 100 })
        : el('div', { class: 'lede' }, 'Mehr Quizze für eine Trendlinie spielen.'),
      el('div', { class: 'quiz-history-row' },
        ...last5.map(h => {
          const pct = Math.round((h.score / h.total) * 100);
          const tone = pct >= 70 ? 'good' : pct >= 50 ? 'okay' : 'bad';
          return el('div', { class: 'quiz-history-pill tone-' + tone },
            el('div', { class: 'qhp-pct' }, pct + '%'),
            el('div', { class: 'qhp-meta' }, `${h.score}/${h.total} · ${new Date(h.date).toLocaleDateString('de-DE')}`)
          );
        })
      )
    ));
  }

  // Daten-Tools (Export/Import/Reset)
  view.appendChild(renderDataTools());

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

function renderDataTools() {
  const fileInput = el('input', { type: 'file', accept: 'application/json', style: { display: 'none' } });
  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const res = importState(text, { strategy: 'merge' });
    if (res.ok) {
      toast('Daten importiert & gemerged ✓ — Seite wird neu geladen', 'success', 2200);
      setTimeout(() => window.location.reload(), 1100);
    } else {
      toast('Import fehlgeschlagen: ' + res.error, 'info', 3000);
    }
  });

  return el('section', { class: 'section data-tools-section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, 'Daten & Backup'),
        el('div', { class: 'lede' }, 'Sichere deinen Fortschritt oder übertrage ihn auf ein anderes Gerät.')
      )
    ),
    el('div', { class: 'data-tools-row' },
      el('button', {
        class: 'btn btn-primary', dataset: { magnetic: '10' },
        onClick: () => { downloadStateFile(); sfx.click(); toast('Backup-Datei heruntergeladen 💾', 'success', 1600); }
      }, '📥 Exportieren'),
      el('button', {
        class: 'btn btn-secondary', dataset: { magnetic: '10' },
        onClick: () => { sfx.click(); fileInput.click(); }
      }, '📤 Importieren'),
      el('button', {
        class: 'btn btn-secondary', dataset: { magnetic: '10' },
        onClick: () => {
          try {
            navigator.clipboard.writeText(exportStateAsString());
            toast('Backup in die Zwischenablage kopiert 📋', 'success', 1600);
            sfx.click();
          } catch {
            toast('Zwischenablage nicht verfügbar', 'info', 1600);
          }
        }
      }, '📋 In Zwischenablage'),
      el('button', {
        class: 'btn btn-ghost danger-btn',
        onClick: () => {
          if (confirm('Alle Daten wirklich zurücksetzen? Theme bleibt erhalten.')) {
            resetAllData({ keepTheme: true });
            toast('Daten zurückgesetzt — Seite wird neu geladen', 'info', 1600);
            setTimeout(() => window.location.reload(), 900);
          }
        }
      }, '🗑️ Zurücksetzen'),
      fileInput
    )
  );
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
      sfx.unlock();
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


function renderXpCard() {
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

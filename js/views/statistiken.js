// Statistiken-View — detailliertes Analyse-Dashboard für Lernfortschritt
import { el, go } from '../util.js';
import { getLernStats, getQuizGenauigkeit, getStreak, getActiveDays, getQuizHistory, getVisitedDialects } from '../store.js';
import { getLernstand } from '../store/learning.js';
import { DIALEKTE, ALLE_AUSDRUECKE } from '../../data/dialekte.js';
import { icon, sparkline } from '../util/icons.js';
import { getXp, xpToNextLevel, getLevelTitle, getXpLog } from '../store/xp.js';
import { getSrsStats } from '../store/srs.js';
import { getProgressHistory, getGoalTarget, getTodayProgress } from '../store/goals.js';
import { getStreakHeatmap } from '../store/streak.js';
import { getWeekReview } from '../util/week-review.js';
import { KATEGORIEN } from '../../data/kategorien.js';

export function renderStatistiken(root) {
  root.innerHTML = '';
  const view = el('div', { class: 'view stats-view' });

  view.appendChild(el('div', { class: 'section-head' },
    el('div', {},
      el('h2', {}, '📊 Lernstatistiken'),
      el('div', { class: 'lede' }, 'Detaillierter Überblick über deinen gesamten Lernfortschritt.')
    )
  ));

  // ── Overview Cards ──────────────────────────────────────────
  const lernStats = getLernStats();
  const srsStats = getSrsStats(ALLE_AUSDRUECKE);
  const acc = getQuizGenauigkeit();
  const streak = getStreak();
  const activeDays = getActiveDays();
  const visited = getVisitedDialects();
  const xp = getXp();
  const { level, current, needed, progress: xpProgress } = xpToNextLevel(xp);
  const quizHistory = getQuizHistory();

  view.appendChild(el('div', { class: 'stats-overview', dataset: { reveal: '' } },
    statBig('🃏', String(lernStats.gelernt), 'Ausdrücke gelernt', 'var(--brand)'),
    statBig('🎯', String(acc) + '%', 'Quiz-Genauigkeit', acc >= 70 ? 'var(--accent)' : 'var(--warm)'),
    statBig('🔥', String(streak), 'Tage Streak', 'var(--pink)'),
    statBig('⚡', String(xp), 'XP gesamt', 'var(--brand)'),
    statBig('📍', String(visited.length) + '/' + DIALEKTE.length, 'Dialekte besucht', 'var(--accent)'),
    statBig('📅', String(activeDays), 'Aktive Tage', 'var(--warm)')
  ));

  // ── XP & Level ──────────────────────────────────────────────
  view.appendChild(el('section', { class: 'section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' },
      el('h3', {}, 'XP & Level'),
    ),
    el('div', { class: 'stats-xp-row' },
      el('div', { class: 'stats-level-badge' },
        el('div', { class: 'stats-level-num' }, String(level)),
        el('div', { class: 'stats-level-title' }, getLevelTitle(level))
      ),
      el('div', { class: 'stats-xp-bar-col' },
        el('div', { class: 'stats-xp-label' }, `${current} / ${needed} XP bis Level ${level + 1}`),
        el('div', { class: 'stats-xp-bar', role: 'progressbar', ariaValuenow: Math.round(xpProgress * 100), ariaValuemin: 0, ariaValuemax: 100 },
          el('div', { class: 'stats-xp-fill', style: { width: Math.round(xpProgress * 100) + '%' } })
        ),
        el('ul', { class: 'stats-xp-log' },
          ...getXpLog(5).map(e => el('li', {},
            el('span', {}, e.reason.replace(/-/g, ' ')),
            el('span', { class: 'stats-xp-amount' }, `+${e.amount}`)
          ))
        )
      )
    )
  ));

  // ── SRS-Status ──────────────────────────────────────────────
  view.appendChild(el('section', { class: 'section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' }, el('h3', {}, 'Spaced-Repetition-Status')),
    el('div', { class: 'stats-srs-grid' },
      statPill(String(srsStats.due),      'Heute fällig',  'var(--pink)'),
      statPill(String(srsStats.learning), 'Im Lernen',     'var(--warm)'),
      statPill(String(srsStats.learned),  'Gemeistert',    'var(--accent)'),
      statPill(String(srsStats.fresh),    'Noch neu',      'var(--text-muted)')
    )
  ));

  // ── Quiz-Verlauf ─────────────────────────────────────────────
  if (quizHistory.length) {
    const sparkData = quizHistory.slice(0, 20).reverse().map(h => Math.round((h.score / h.total) * 100));
    view.appendChild(el('section', { class: 'section', dataset: { reveal: '' } },
      el('div', { class: 'section-head' }, el('h3', {}, 'Quiz-Verlauf')),
      el('div', { class: 'stats-quiz-chart' },
        sparkline(sparkData, { width: 480, height: 80, color: 'var(--brand)', max: 100 }),
        el('div', { class: 'stats-quiz-meta' },
          el('span', {}, `Ø ${acc}% Genauigkeit`),
          el('span', {}, `${quizHistory.length} Quizze gespielt`)
        )
      )
    ));
  }

  // ── Lernziel-Verlauf ─────────────────────────────────────────
  const goalHist = getProgressHistory(14);
  const goalTarget = getGoalTarget();
  const goalToday = getTodayProgress();
  view.appendChild(el('section', { class: 'section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' }, el('h3', {}, `Tägliches Lernziel (${goalTarget} Karten/Tag)`)),
    el('div', { class: 'stats-goal-chart' },
      ...goalHist.map(h => {
        const pct = Math.min(1, goalTarget > 0 ? h.count / goalTarget : 0);
        const label = h.date.toLocaleDateString('de-DE', { weekday: 'short' });
        return el('div', { class: 'stats-goal-bar-col', title: `${h.count} Karten · ${h.date.toLocaleDateString('de-DE')}` },
          el('div', { class: 'stats-goal-bar-bg' },
            el('div', { class: 'stats-goal-bar-fill' + (h.met ? ' is-met' : ''), style: { height: Math.round(pct * 100) + '%' } })
          ),
          el('div', { class: 'stats-goal-day' }, label)
        );
      })
    )
  ));

  // ── Dialekt-Fortschritt ──────────────────────────────────────
  view.appendChild(el('section', { class: 'section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' }, el('h3', {}, 'Fortschritt je Dialekt')),
    el('div', { class: 'stats-dialect-list' },
      ...DIALEKTE.map(d => {
        const learned = d.ausdruecke.filter(a => getLernstand(d.id, a.id) >= 3).length;
        const pct = d.ausdruecke.length > 0 ? learned / d.ausdruecke.length : 0;
        return el('div', { class: 'stats-dialect-row' },
          el('span', { class: 'stats-dialect-flag' }, d.flag),
          el('span', { class: 'stats-dialect-name' }, d.name),
          el('div', { class: 'stats-dialect-bar' },
            el('div', { class: 'stats-dialect-fill', style: { width: Math.round(pct * 100) + '%' }, dataset: { dc: d.farbe } })
          ),
          el('span', { class: 'stats-dialect-pct' }, `${learned}/${d.ausdruecke.length}`)
        );
      }).filter(Boolean)
    )
  ));

  // ── Wochenrückblick ──────────────────────────────────────────
  view.appendChild(renderWeekReview());

  root.appendChild(view);
}

function renderWeekReview() {
  const r = getWeekReview(7);
  const section = el('div', { class: 'stats-section', dataset: { reveal: '' } });
  section.appendChild(el('h3', {}, '📅 Wochenrückblick'));
  section.appendChild(el('div', { class: 'lede' },
    `Letzte 7 Tage (${r.period.start.label} – ${r.period.end.label})`
  ));

  // KPI-Karten
  const grid = el('div', { class: 'wochenrueckblick-grid' });
  grid.appendChild(wrCard('Aktive Tage', `${r.totals.activeDays}/${r.period.days}`,
    r.totals.activeDays >= 5 ? 'Starke Lernwoche!' : 'Versuche mehr Routine.'));
  grid.appendChild(wrCard('XP gesammelt', `+${r.totals.xp}`,
    r.totals.xp > 0 ? 'Punkte verdient ⚡' : 'Diese Woche ruhig.'));
  grid.appendChild(wrCard('Karten geübt', String(r.totals.cardsReviewed),
    r.totals.cardsReviewed > 20 ? 'Solides Pensum 🃏' : 'Mehr Karteikarten ziehen!'));
  if (r.totals.quizTotal > 0) {
    grid.appendChild(wrCard('Quiz-Trefferquote', `${r.totals.quizAccuracy}%`,
      `${r.totals.quizCorrect}/${r.totals.quizTotal} korrekt`));
  }
  section.appendChild(grid);

  // Tagessparkline (kleines visuelles Element)
  const maxActivity = Math.max(1, ...r.byDay.map(d => d.activity + d.cardsReviewed));
  const sparkRow = el('div', { class: 'wr-spark-row', style: {
    display: 'grid', gridTemplateColumns: `repeat(${r.byDay.length}, 1fr)`,
    gap: '6px', alignItems: 'end', height: '80px', margin: '20px 0'
  } });
  r.byDay.forEach(d => {
    const h = Math.max(4, Math.round((d.activity + d.cardsReviewed) / maxActivity * 70));
    const isToday = d.key === r.period.end.key;
    sparkRow.appendChild(el('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' } },
      el('div', { style: {
        width: '100%', height: h + 'px',
        background: isToday ? 'var(--brand, #8b5cf6)' : 'rgba(139,92,246,0.3)',
        borderRadius: '4px 4px 0 0',
        transition: 'all 0.3s ease',
      }, title: `${d.label}: ${d.activity + d.cardsReviewed} Aktionen` }),
      el('div', { style: { fontSize: '11px', opacity: 0.7 } }, d.label.split(' ')[0])
    ));
  });
  section.appendChild(sparkRow);

  // Top-Dialekte diese Woche
  if (r.topDialekte.length > 0) {
    section.appendChild(el('h4', { style: { marginTop: '20px' } }, 'Top-Dialekte diese Woche'));
    const dialRow = el('div', { style: { display: 'flex', gap: '12px', flexWrap: 'wrap' } });
    r.topDialekte.forEach(d => {
      dialRow.appendChild(el('div', {
        class: 'wr-card',
        style: { '--sc': d.farbe, minWidth: '160px', borderLeft: `4px solid ${d.farbe}` }
      },
        el('div', { class: 'wr-card-label' }, `${d.flag} ${d.name}`),
        el('div', { class: 'wr-card-value' }, String(d.count)),
        el('div', { class: 'wr-card-detail' }, 'Karten geübt')
      ));
    });
    section.appendChild(dialRow);
  }

  // Empfehlungen für die nächste Woche
  if (r.focusSuggestions.length > 0) {
    section.appendChild(el('h4', { style: { marginTop: '20px' } }, '💡 Für die nächste Woche'));
    const sugList = el('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } });
    r.focusSuggestions.forEach(s => {
      sugList.appendChild(el('button', {
        class: 'wr-card',
        style: { textAlign: 'left', cursor: 'pointer', width: '100%' },
        onClick: () => go('#/lernen?kategorie=' + s.kategorie),
      },
        el('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' } },
          el('div', {},
            el('div', { class: 'wr-card-label' }, `${s.icon} ${s.label}`),
            el('div', { class: 'wr-card-detail' }, s.reason)
          ),
          el('span', { class: 'dc-arrow' }, '→')
        )
      ));
    });
    section.appendChild(sugList);
  }

  return section;
}

function wrCard(label, value, detail) {
  return el('div', { class: 'wr-card' },
    el('div', { class: 'wr-card-label' }, label),
    el('div', { class: 'wr-card-value' }, value),
    el('div', { class: 'wr-card-detail' }, detail)
  );
}

function statBig(emoji, value, label, color) {
  return el('div', { class: 'stats-big-card', style: { '--sc': color }, dataset: { spotlight: '' } },
    el('div', { class: 'stats-big-emoji' }, emoji),
    el('div', { class: 'stats-big-value' }, value),
    el('div', { class: 'stats-big-label' }, label)
  );
}

function statPill(value, label, color) {
  return el('div', { class: 'stats-pill', style: { '--sc': color } },
    el('div', { class: 'stats-pill-value' }, value),
    el('div', { class: 'stats-pill-label' }, label)
  );
}

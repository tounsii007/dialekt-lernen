// Statistiken-View — detailliertes Analyse-Dashboard für Lernfortschritt
import { el, go, toast } from '../util.js';
import { t } from '../util/i18n.js';
import { getLernStats, getQuizGenauigkeit, getStreak, getActiveDays, getQuizHistory, getVisitedDialects } from '../store.js';
import { getLernstand } from '../store/learning.js';
import { DIALEKTE, ALLE_AUSDRUECKE, getDialekt } from '../../data/dialekte.js';
import { icon, sparkline } from '../util/icons.js';
import { getXp, xpToNextLevel, getLevelTitle, getXpLog } from '../store/xp.js';
import { getSrsStats, getSrsConfig, setSrsConfig, getSrsLogStats, optimizeSrsParams } from '../store/srs.js';
import { getProgressHistory, getGoalTarget, getTodayProgress } from '../store/goals.js';
import { getStreakHeatmap } from '../store/streak.js';
import { getWeekReview } from '../util/week-review.js';
import { KATEGORIEN } from '../../data/kategorien.js';
import { getOverallRetention, getCardsAtRisk } from '../util/forgetting-curve.js';
import { getTimeHeatmap, describeBestSlot, dayName, hourLabel } from '../util/time-heatmap.js';
import { printStatistiken, canPrint } from '../util/pdf-export.js';

export function renderStatistiken(root) {
  root.innerHTML = '';
  const view = el('div', { class: 'view stats-view' });

  view.appendChild(el('div', { class: 'section-head stats-toolbar' },
    el('div', {},
      el('h2', {}, t('view.statistiken.title')),
      el('div', { class: 'lede' }, t('view.statistiken.lede'))
    ),
    canPrint() ? el('button', {
      class: 'btn btn-secondary stats-print-btn',
      title: t('view.statistiken.printTitle'),
      onClick: () => printStatistiken(),
    }, t('view.statistiken.print')) : null
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
    statBig('🃏', String(lernStats.gelernt), t('view.statistiken.cardExpressions'), 'var(--brand)'),
    statBig('🎯', String(acc) + '%', t('view.statistiken.cardQuizAccuracy'), acc >= 70 ? 'var(--accent)' : 'var(--warm)'),
    statBig('🔥', String(streak), t('stats.streak'), 'var(--pink)'),
    statBig('⚡', String(xp), t('view.statistiken.cardXpTotal'), 'var(--brand)'),
    statBig('📍', String(visited.length) + '/' + DIALEKTE.length, t('view.statistiken.cardDialectsVisited'), 'var(--accent)'),
    statBig('📅', String(activeDays), t('view.statistiken.cardActiveDays'), 'var(--warm)')
  ));

  // ── XP & Level ──────────────────────────────────────────────
  view.appendChild(el('section', { class: 'section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' },
      el('h3', {}, t('view.statistiken.xpLevel')),
    ),
    el('div', { class: 'stats-xp-row' },
      el('div', { class: 'stats-level-badge' },
        el('div', { class: 'stats-level-num' }, String(level)),
        el('div', { class: 'stats-level-title' }, getLevelTitle(level))
      ),
      el('div', { class: 'stats-xp-bar-col' },
        el('div', { class: 'stats-xp-label' }, t('view.statistiken.xpToLevel', { current, needed, level: level + 1 })),
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
  const srsPills = [
    statPill(String(srsStats.due),      t('section.heuteFaellig'),       'var(--pink)'),
    statPill(String(srsStats.learning), t('view.statistiken.srsLearning'), 'var(--warm)'),
    statPill(String(srsStats.learned),  t('view.statistiken.srsLearned'),  'var(--accent)'),
    statPill(String(srsStats.fresh),    t('view.statistiken.srsFresh'),    'var(--text-muted)'),
  ];
  // Problemkarten (Leeches) nur einblenden, wenn welche existieren — sonst
  // wäre eine 0 für die meisten Nutzer nur verwirrendes Rauschen.
  if (srsStats.leeches > 0) {
    srsPills.push(statPill(String(srsStats.leeches), t('view.statistiken.srsLeeches'), 'var(--danger)'));
  }
  view.appendChild(el('section', { class: 'section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' }, el('h3', {}, t('view.statistiken.srsTitle'))),
    el('div', { class: 'stats-srs-grid' }, ...srsPills)
  ));

  // ── SRS-Einstellungen (Scheduler + Wunsch-Retention) ─────────
  view.appendChild(renderSrsSettingsSection());

  // ── Quiz-Verlauf ─────────────────────────────────────────────
  if (quizHistory.length) {
    const sparkData = quizHistory.slice(0, 20).reverse().map(h => Math.round((h.score / h.total) * 100));
    view.appendChild(el('section', { class: 'section', dataset: { reveal: '' } },
      el('div', { class: 'section-head' }, el('h3', {}, t('view.statistiken.quizHistory'))),
      el('div', { class: 'stats-quiz-chart' },
        sparkline(sparkData, { width: 480, height: 80, color: 'var(--brand)', max: 100 }),
        el('div', { class: 'stats-quiz-meta' },
          el('span', {}, t('view.statistiken.quizAvgAccuracy', { acc })),
          el('span', {}, t('view.statistiken.quizPlayed', { n: quizHistory.length }))
        )
      )
    ));
  }

  // ── Lernziel-Verlauf ─────────────────────────────────────────
  const goalHist = getProgressHistory(14);
  const goalTarget = getGoalTarget();
  const goalToday = getTodayProgress();
  view.appendChild(el('section', { class: 'section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' }, el('h3', {}, t('view.statistiken.goalTitle', { n: goalTarget }))),
    el('div', { class: 'stats-goal-chart' },
      ...goalHist.map(h => {
        const pct = Math.min(1, goalTarget > 0 ? h.count / goalTarget : 0);
        const label = h.date.toLocaleDateString('de-DE', { weekday: 'short' });
        return el('div', { class: 'stats-goal-bar-col', title: t('view.statistiken.goalBarTitle', { n: h.count, date: h.date.toLocaleDateString('de-DE') }) },
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
    el('div', { class: 'section-head' }, el('h3', {}, t('view.statistiken.dialectProgress'))),
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

  // ── Vergessenskurve ──────────────────────────────────────────
  view.appendChild(renderForgettingCurveSection());

  // ── Tageszeit-Heatmap ────────────────────────────────────────
  view.appendChild(renderTimeHeatmapSection());

  // ── Wochenrückblick ──────────────────────────────────────────
  view.appendChild(renderWeekReview());

  root.appendChild(view);
}

// ── SRS-Einstellungen: Scheduler-Wahl + Wunsch-Retention ───────
function renderSrsSettingsSection() {
  const section = el('section', { class: 'section stats-srs-settings', dataset: { reveal: '' } });
  section.appendChild(el('div', { class: 'section-head' }, el('h3', {}, t('view.statistiken.srsSettingsTitle'))));

  const body = el('div', { class: 'srs-settings-body' });
  section.appendChild(body);

  // In-place neu zeichnen, damit das Retention-Feld je nach Scheduler erscheint.
  function paint() {
    body.innerHTML = '';
    const cfg = getSrsConfig();

    const mkSeg = (val, title, sub) => el('button', {
      class: 'srs-seg-btn' + (cfg.scheduler === val ? ' is-active' : ''),
      type: 'button',
      'aria-pressed': cfg.scheduler === val,
      onClick: () => { setSrsConfig({ scheduler: val }); paint(); },
    }, el('span', { class: 'srs-seg-title' }, title), el('span', { class: 'srs-seg-sub' }, sub));

    body.appendChild(el('div', { class: 'srs-seg', role: 'group', 'aria-label': t('view.statistiken.schedulerSelect') },
      mkSeg('fsrs', 'FSRS-5', t('view.statistiken.schedulerFsrsSub')),
      mkSeg('sm2', 'SM-2', t('view.statistiken.schedulerSm2Sub'))
    ));

    body.appendChild(el('p', { class: 'lede srs-settings-hint' },
      cfg.scheduler === 'fsrs'
        ? t('view.statistiken.schedulerFsrsHint')
        : t('view.statistiken.schedulerSm2Hint')
    ));

    if (cfg.scheduler === 'fsrs') {
      const pct = Math.round(cfg.retention * 100);
      const pctEl = el('strong', { class: 'srs-retention-pct' }, pct + '%');
      const tradeoffEl = el('div', { class: 'srs-retention-tradeoff lede' }, retentionTradeoff(pct));
      const slider = el('input', {
        type: 'range', min: '70', max: '97', step: '1', value: String(pct),
        class: 'srs-retention-slider',
        'aria-label': t('view.statistiken.retentionAria'),
      });
      slider.addEventListener('input', () => {
        const p = Number(slider.value);
        pctEl.textContent = p + '%';
        tradeoffEl.textContent = retentionTradeoff(p);
      });
      slider.addEventListener('change', () => {
        setSrsConfig({ retention: Number(slider.value) / 100 });
      });
      body.appendChild(el('div', { class: 'srs-retention' },
        el('div', { class: 'srs-retention-label' }, el('span', {}, t('view.statistiken.retentionLabel')), pctEl),
        slider,
        tradeoffEl
      ));

      body.appendChild(renderSrsOptimizer(cfg, paint));
    }
  }
  paint();
  return section;
}

// Personalisierung: lernt die 19 FSRS-Gewichte aus dem Review-Log des Nutzers.
// Genau dieser Schritt schlägt SM-2 — Anki nutzt für alle dieselbe Easiness,
// FSRS justiert das Modell auf das tatsächliche Vergessensverhalten.
const SRS_OPT_MIN_REVIEWS = 64;

function renderSrsOptimizer(cfg, repaint) {
  const stats = getSrsLogStats();
  const personalized = Array.isArray(cfg.params) && cfg.params.length === 19;
  const canOptimize = stats.reviewable >= SRS_OPT_MIN_REVIEWS;

  const badge = el('span', { class: 'srs-opt-badge' + (personalized ? ' is-on' : '') },
    personalized ? t('view.statistiken.optBadgeOn') : t('view.statistiken.optBadgeOff'));

  const info = el('p', { class: 'srs-opt-info lede' }, canOptimize
    ? t('view.statistiken.optInfoReady', { n: stats.reviewable, cards: stats.cards })
    : t('view.statistiken.optInfoCollecting', { n: stats.reviewable, min: SRS_OPT_MIN_REVIEWS })
  );

  const optBtn = el('button', {
    class: 'srs-opt-btn',
    type: 'button',
    onClick: () => {
      optBtn.disabled = true;
      optBtn.classList.add('is-loading');
      optBtn.textContent = t('view.statistiken.optimizing');
      // Kurz an den Browser zurückgeben, damit der Button-Text neu zeichnet,
      // bevor die (synchrone) Optimierung läuft.
      setTimeout(() => {
        const res = optimizeSrsParams({ minReviews: SRS_OPT_MIN_REVIEWS });
        if (res.ok) {
          toast(t('view.statistiken.optToastSuccess', { init: res.initialLoss.toFixed(3), final: res.finalLoss.toFixed(3) }), 'success');
        } else {
          toast(t('view.statistiken.optToastNoData'), 'info');
        }
        repaint();
      }, 30);
    },
  }, personalized ? t('view.statistiken.optBtnReoptimize') : t('view.statistiken.optBtnOptimize'));
  optBtn.disabled = !canOptimize;

  const actions = el('div', { class: 'srs-opt-actions' }, optBtn);

  if (personalized) {
    actions.appendChild(el('button', {
      class: 'srs-opt-reset',
      type: 'button',
      onClick: () => {
        setSrsConfig({ params: null });
        toast(t('view.statistiken.optToastReset'), 'info');
        repaint();
      },
    }, t('view.statistiken.optBtnReset')));
  }

  return el('div', { class: 'srs-optimizer' },
    el('div', { class: 'srs-opt-head' },
      el('span', { class: 'srs-opt-title' }, t('view.statistiken.optTitle')),
      badge
    ),
    info,
    actions
  );
}

function retentionTradeoff(pct) {
  if (pct >= 90) return t('view.statistiken.tradeoffHigh');
  if (pct >= 80) return t('view.statistiken.tradeoffBalanced');
  return t('view.statistiken.tradeoffLow');
}

// ── Sektion A: Vergessenskurve ─────────────────────────────────
function renderForgettingCurveSection() {
  const section = el('section', { class: 'section stats-forgetting', dataset: { reveal: '' } });
  section.appendChild(el('div', { class: 'section-head' }, el('h3', {}, t('view.statistiken.forgettingTitle'))));

  const retention = getOverallRetention();
  const atRisk = getCardsAtRisk(0.5);
  const topRisk = atRisk.slice(0, 5);

  if (retention == null) {
    section.appendChild(el('div', { class: 'lede' },
      t('view.statistiken.forgettingEmpty')
    ));
    return section;
  }

  const pct = Math.round(retention * 100);
  const color =
    pct >= 80 ? 'var(--accent)' :
    pct >= 60 ? 'var(--brand)' :
    pct >= 40 ? 'var(--warm)' : 'var(--pink)';

  const overview = el('div', { class: 'forgetting-overview' },
    statBig('🧠', pct + '%', t('view.statistiken.overallRetention'), color),
    statBig('⏰', String(atRisk.length), t('view.statistiken.cardsNeedReview'), 'var(--warm)')
  );
  section.appendChild(overview);

  if (topRisk.length === 0) {
    section.appendChild(el('div', { class: 'lede', style: { marginTop: '12px' } },
      t('view.statistiken.noRisk')
    ));
    return section;
  }

  section.appendChild(el('h4', { style: { marginTop: '16px' } }, t('view.statistiken.top5Title')));
  const list = el('ul', { class: 'forgetting-list' });
  for (const r of topRisk) {
    const dialekt = getDialekt(r.dialektId);
    const ausdr = dialekt?.ausdruecke?.find(a => a.id === r.id);
    if (!ausdr || !dialekt) continue;
    const retPct = Math.round(r.retention * 100);
    const key = `${r.dialektId}.${r.id}`;
    list.appendChild(el('li', {},
      el('button', {
        class: 'forgetting-row',
        style: { '--dc': dialekt.farbe },
        onClick: () => go('#/lernen?card=' + encodeURIComponent(key)),
        title: t('view.statistiken.forgettingRowTitle', { flag: dialekt.flag, name: dialekt.name, pct: retPct })
      },
        el('span', { class: 'forgetting-flag' }, dialekt.flag),
        el('span', { class: 'forgetting-text' },
          el('span', { class: 'forgetting-expr' }, ausdr.ausdruck),
          el('span', { class: 'forgetting-hd' }, ausdr.hochdeutsch)
        ),
        el('span', { class: 'forgetting-bar' },
          el('span', { class: 'forgetting-bar-fill', style: { width: retPct + '%', background: retPct < 30 ? 'var(--pink)' : 'var(--warm)' } })
        ),
        el('span', { class: 'forgetting-pct' }, retPct + '%')
      )
    ));
  }
  section.appendChild(list);
  return section;
}

// ── Sektion B: Tageszeit-Heatmap ───────────────────────────────
function renderTimeHeatmapSection() {
  const section = el('section', { class: 'section stats-timeheat', dataset: { reveal: '' } });
  section.appendChild(el('div', { class: 'section-head' }, el('h3', {}, t('view.statistiken.timeheatTitle'))));

  const { matrix, maxCount, bestHour, bestDay } = getTimeHeatmap(90);

  if (maxCount === 0) {
    section.appendChild(el('div', { class: 'lede' },
      t('view.statistiken.timeheatEmpty')
    ));
    return section;
  }

  const slot = describeBestSlot(bestHour, bestDay);
  if (slot) {
    section.appendChild(el('div', { class: 'lede', style: { marginBottom: '14px' } },
      t('view.statistiken.topSlot'),
      el('strong', {}, slot),
      ` (${activityCount(maxCount)})`
    ));
  }

  // 7×24-Grid: Spalten = Stunden, Zeilen = Wochentage (Mo zuerst, dann ... So)
  const dayOrder = [1, 2, 3, 4, 5, 6, 0]; // Mo..So
  const grid = el('div', { class: 'timeheat-grid', role: 'img', ariaLabel: t('view.statistiken.timeheatAria') });

  // Top-Label-Zeile (Stunden)
  grid.appendChild(el('div', { class: 'timeheat-corner' }));
  for (let h = 0; h < 24; h++) {
    grid.appendChild(el('div', { class: 'timeheat-h-label' }, (h % 6 === 0) ? String(h).padStart(2, '0') : ''));
  }

  for (const d of dayOrder) {
    grid.appendChild(el('div', { class: 'timeheat-d-label' }, dayName(d)));
    for (let h = 0; h < 24; h++) {
      const count = matrix[d][h];
      const intensity = count > 0 ? Math.max(0.15, count / maxCount) : 0;
      const isPeak = (d === bestDay && h === bestHour);
      grid.appendChild(el('div', {
        class: 'timeheat-cell' + (isPeak ? ' is-peak' : ''),
        style: {
          opacity: intensity > 0 ? String(0.25 + intensity * 0.75) : '0.08',
          background: intensity > 0 ? 'var(--brand)' : 'var(--bg-soft)',
        },
        title: `${dayName(d)} ${hourLabel(h)} — ${activityCount(count)}`
      }));
    }
  }

  section.appendChild(grid);
  return section;
}

function renderWeekReview() {
  const r = getWeekReview(7);
  const section = el('div', { class: 'stats-section', dataset: { reveal: '' } });
  section.appendChild(el('h3', {}, t('view.statistiken.weekTitle')));
  section.appendChild(el('div', { class: 'lede' },
    t('view.statistiken.weekPeriod', { start: r.period.start.label, end: r.period.end.label })
  ));

  // KPI-Karten
  const grid = el('div', { class: 'wochenrueckblick-grid' });
  grid.appendChild(wrCard(t('view.statistiken.wrActiveDays'), `${r.totals.activeDays}/${r.period.days}`,
    r.totals.activeDays >= 5 ? t('view.statistiken.wrActiveDaysStrong') : t('view.statistiken.wrActiveDaysWeak')));
  grid.appendChild(wrCard(t('view.statistiken.wrXp'), `+${r.totals.xp}`,
    r.totals.xp > 0 ? t('view.statistiken.wrXpEarned') : t('view.statistiken.wrXpQuiet')));
  grid.appendChild(wrCard(t('view.statistiken.wrCards'), String(r.totals.cardsReviewed),
    r.totals.cardsReviewed > 20 ? t('view.statistiken.wrCardsStrong') : t('view.statistiken.wrCardsWeak')));
  if (r.totals.quizTotal > 0) {
    grid.appendChild(wrCard(t('view.statistiken.wrQuizAccuracy'), `${r.totals.quizAccuracy}%`,
      t('view.statistiken.wrQuizCorrect', { correct: r.totals.quizCorrect, total: r.totals.quizTotal })));
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
        background: isToday ? 'var(--brand)' : 'color-mix(in oklab, var(--brand) 30%, transparent)',
        borderRadius: '4px 4px 0 0',
        transition: 'all 0.3s ease',
      }, title: t('view.statistiken.wrSparkTitle', { label: d.label, n: d.activity + d.cardsReviewed }) }),
      el('div', { style: { fontSize: '11px', opacity: 0.7 } }, d.label.split(' ')[0])
    ));
  });
  section.appendChild(sparkRow);

  // Top-Dialekte diese Woche
  if (r.topDialekte.length > 0) {
    section.appendChild(el('h4', { style: { marginTop: '20px' } }, t('view.statistiken.wrTopDialects')));
    const dialRow = el('div', { style: { display: 'flex', gap: '12px', flexWrap: 'wrap' } });
    r.topDialekte.forEach(d => {
      dialRow.appendChild(el('div', {
        class: 'wr-card',
        style: { '--sc': d.farbe, minWidth: '160px', borderLeft: `4px solid ${d.farbe}` }
      },
        el('div', { class: 'wr-card-label' }, `${d.flag} ${d.name}`),
        el('div', { class: 'wr-card-value' }, String(d.count)),
        el('div', { class: 'wr-card-detail' }, t('view.statistiken.wrCardsPracticed'))
      ));
    });
    section.appendChild(dialRow);
  }

  // Empfehlungen für die nächste Woche
  if (r.focusSuggestions.length > 0) {
    section.appendChild(el('h4', { style: { marginTop: '20px' } }, t('view.statistiken.wrNextWeek')));
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

// Lokalisierte Mengenangabe „N Aktivität(en)" mit Singular/Plural-Auswahl.
function activityCount(n) {
  return t(n === 1 ? 'view.statistiken.activityCountOne' : 'view.statistiken.activityCountOther', { n });
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

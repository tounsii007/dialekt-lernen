// Statistiken-View — detailliertes Analyse-Dashboard für Lernfortschritt
import { el, go, toast } from '../util.js';
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
      el('h2', {}, '📊 Lernstatistiken'),
      el('div', { class: 'lede' }, 'Detaillierter Überblick über deinen gesamten Lernfortschritt.')
    ),
    canPrint() ? el('button', {
      class: 'btn btn-secondary stats-print-btn',
      title: 'Statistiken als PDF exportieren oder ausdrucken',
      onClick: () => printStatistiken(),
    }, '🖨️ PDF exportieren / drucken') : null
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
  const srsPills = [
    statPill(String(srsStats.due),      'Heute fällig',  'var(--pink)'),
    statPill(String(srsStats.learning), 'Im Lernen',     'var(--warm)'),
    statPill(String(srsStats.learned),  'Gemeistert',    'var(--accent)'),
    statPill(String(srsStats.fresh),    'Noch neu',      'var(--text-muted)'),
  ];
  // Problemkarten (Leeches) nur einblenden, wenn welche existieren — sonst
  // wäre eine 0 für die meisten Nutzer nur verwirrendes Rauschen.
  if (srsStats.leeches > 0) {
    srsPills.push(statPill(String(srsStats.leeches), '⚠️ Problemkarten', 'var(--danger)'));
  }
  view.appendChild(el('section', { class: 'section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' }, el('h3', {}, 'Spaced-Repetition-Status')),
    el('div', { class: 'stats-srs-grid' }, ...srsPills)
  ));

  // ── SRS-Einstellungen (Scheduler + Wunsch-Retention) ─────────
  view.appendChild(renderSrsSettingsSection());

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
  section.appendChild(el('div', { class: 'section-head' }, el('h3', {}, '⚙️ Wiederholungs-Algorithmus')));

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

    body.appendChild(el('div', { class: 'srs-seg', role: 'group', 'aria-label': 'Scheduler-Auswahl' },
      mkSeg('fsrs', 'FSRS-5', 'Modern · empfohlen'),
      mkSeg('sm2', 'SM-2', 'Klassisch (Anki)')
    ));

    body.appendChild(el('p', { class: 'lede srs-settings-hint' },
      cfg.scheduler === 'fsrs'
        ? 'FSRS-5 modelliert dein Gedächtnis über Difficulty, Stability und Retrievability und trifft deine Wunsch-Retention präzise — spürbar effizienter als SM-2.'
        : 'SM-2 ist der klassische Karteikasten-Algorithmus (Anki-Default) mit Easiness-Faktor.'
    ));

    if (cfg.scheduler === 'fsrs') {
      const pct = Math.round(cfg.retention * 100);
      const pctEl = el('strong', { class: 'srs-retention-pct' }, pct + '%');
      const tradeoffEl = el('div', { class: 'srs-retention-tradeoff lede' }, retentionTradeoff(pct));
      const slider = el('input', {
        type: 'range', min: '70', max: '97', step: '1', value: String(pct),
        class: 'srs-retention-slider',
        'aria-label': 'Wunsch-Retention in Prozent',
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
        el('div', { class: 'srs-retention-label' }, el('span', {}, 'Wunsch-Retention'), pctEl),
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
    personalized ? '● Personalisiert' : '○ Standard-Gewichte');

  const info = el('p', { class: 'srs-opt-info lede' }, canOptimize
    ? `${stats.reviewable} bewertbare Reviews über ${stats.cards} Karten — bereit für die Personalisierung.`
    : `${stats.reviewable} von ${SRS_OPT_MIN_REVIEWS} bewertbaren Reviews gesammelt. Lerne weiter, dann lernt FSRS deine Gewichte aus deiner Historie.`
  );

  const optBtn = el('button', {
    class: 'srs-opt-btn',
    type: 'button',
    onClick: () => {
      optBtn.disabled = true;
      optBtn.textContent = 'Optimiere…';
      // Kurz an den Browser zurückgeben, damit der Button-Text neu zeichnet,
      // bevor die (synchrone) Optimierung läuft.
      setTimeout(() => {
        const res = optimizeSrsParams({ minReviews: SRS_OPT_MIN_REVIEWS });
        if (res.ok) {
          toast(`Gewichte personalisiert · Loss ${res.initialLoss.toFixed(3)} → ${res.finalLoss.toFixed(3)}`, 'success');
        } else {
          toast('Noch zu wenig Daten für die Optimierung.', 'info');
        }
        repaint();
      }, 30);
    },
  }, personalized ? 'Neu optimieren' : 'Jetzt optimieren');
  optBtn.disabled = !canOptimize;

  const actions = el('div', { class: 'srs-opt-actions' }, optBtn);

  if (personalized) {
    actions.appendChild(el('button', {
      class: 'srs-opt-reset',
      type: 'button',
      onClick: () => {
        setSrsConfig({ params: null });
        toast('Zurück auf Standard-Gewichte.', 'info');
        repaint();
      },
    }, 'Auf Standard zurücksetzen'));
  }

  return el('div', { class: 'srs-optimizer' },
    el('div', { class: 'srs-opt-head' },
      el('span', { class: 'srs-opt-title' }, 'Deine FSRS-Gewichte'),
      badge
    ),
    info,
    actions
  );
}

function retentionTradeoff(pct) {
  if (pct >= 90) return 'Hohe Retention: weniger Vergessen, dafür häufigere Wiederholungen.';
  if (pct >= 80) return 'Ausgewogen: solides Behalten bei moderater Wiederholungslast.';
  return 'Niedrige Retention: längere Intervalle und weniger Reviews — aber mehr Vergessen.';
}

// ── Sektion A: Vergessenskurve ─────────────────────────────────
function renderForgettingCurveSection() {
  const section = el('section', { class: 'section stats-forgetting', dataset: { reveal: '' } });
  section.appendChild(el('div', { class: 'section-head' }, el('h3', {}, '🧠 Vergessenskurve')));

  const retention = getOverallRetention();
  const atRisk = getCardsAtRisk(0.5);
  const topRisk = atRisk.slice(0, 5);

  if (retention == null) {
    section.appendChild(el('div', { class: 'lede' },
      'Sobald du ein paar Karten mit SRS bewertet hast, erscheint hier deine persönliche Vergessenskurve.'
    ));
    return section;
  }

  const pct = Math.round(retention * 100);
  const color =
    pct >= 80 ? 'var(--accent)' :
    pct >= 60 ? 'var(--brand)' :
    pct >= 40 ? 'var(--warm)' : 'var(--pink)';

  const overview = el('div', { class: 'forgetting-overview' },
    statBig('🧠', pct + '%', 'Gesamt-Retention', color),
    statBig('⏰', String(atRisk.length), 'Karten brauchen bald Wiederholung', 'var(--warm)')
  );
  section.appendChild(overview);

  if (topRisk.length === 0) {
    section.appendChild(el('div', { class: 'lede', style: { marginTop: '12px' } },
      'Super — aktuell ist keine Karte in akuter Vergessensgefahr. Weiter so!'
    ));
    return section;
  }

  section.appendChild(el('h4', { style: { marginTop: '16px' } }, 'Top 5: dringend wiederholen'));
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
        title: `${dialekt.flag} ${dialekt.name} — Retention ${retPct}%`
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
  section.appendChild(el('div', { class: 'section-head' }, el('h3', {}, '📅 Wann lernst du am besten?')));

  const { matrix, maxCount, bestHour, bestDay } = getTimeHeatmap(90);

  if (maxCount === 0) {
    section.appendChild(el('div', { class: 'lede' },
      'Noch zu wenig Daten — sobald du regelmäßig lernst, zeigen wir hier deinen Lern-Rhythmus.'
    ));
    return section;
  }

  const slot = describeBestSlot(bestHour, bestDay);
  if (slot) {
    section.appendChild(el('div', { class: 'lede', style: { marginBottom: '14px' } },
      'Dein Top-Slot: ',
      el('strong', {}, slot),
      ` (${maxCount} Aktivität${maxCount === 1 ? '' : 'en'})`
    ));
  }

  // 7×24-Grid: Spalten = Stunden, Zeilen = Wochentage (Mo zuerst, dann ... So)
  const dayOrder = [1, 2, 3, 4, 5, 6, 0]; // Mo..So
  const grid = el('div', { class: 'timeheat-grid', role: 'img', ariaLabel: 'Tageszeit-Heatmap der Lernaktivität' });

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
        title: `${dayName(d)} ${hourLabel(h)} — ${count} Aktivität${count === 1 ? '' : 'en'}`
      }));
    }
  }

  section.appendChild(grid);
  return section;
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

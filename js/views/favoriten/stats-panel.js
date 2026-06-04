// Favoriten · Statistik-Kacheln + Quiz-Trend.
//   renderStatsCards — 5er-Kachelraster (gelernt / in Arbeit / Genauigkeit / Streak / Favoriten)
//   renderQuizTrend  — Sparkline + letzte Quiz-Ergebnisse (nur wenn Verlauf vorhanden)

import { el } from '../../util.js';
import { icon, sparkline } from '../../util/icons.js';
import { getQuizSparkline } from '../../util/recommendations.js';

// 5er-Kachelraster mit den Kern-Kennzahlen.
export function renderStatsCards({ gelernt, inArbeit, acc, streak, favCount }) {
  return el('div', { class: 'stat-grid', dataset: { reveal: '' } },
    el('div', { class: 'stat-card', dataset: { spotlight: '' } },
      el('div', { class: 'stat-card-icon' }, icon('target', { size: 22 })),
      el('div', { class: 'stat-card-value', dataset: { count: String(gelernt) } }, String(gelernt)),
      el('div', { class: 'stat-card-label' }, 'Ausdrücke gelernt')
    ),
    el('div', { class: 'stat-card', dataset: { spotlight: '' } },
      el('div', { class: 'stat-card-icon' }, icon('book', { size: 22 })),
      el('div', { class: 'stat-card-value', dataset: { count: String(inArbeit) } }, String(inArbeit)),
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
      el('div', { class: 'stat-card-value', dataset: { count: String(favCount) } }, String(favCount)),
      el('div', { class: 'stat-card-label' }, 'Favoriten')
    )
  );
}

// Quiz-Trend — Sparkline + letzte Ergebnisse. Gibt null zurück, wenn kein Verlauf.
export function renderQuizTrend(history, acc) {
  if (!history.length) return null;

  const sparkData = getQuizSparkline(10);
  const last5 = history.slice(0, 5);
  const trend = sparkData.length >= 2
    ? sparkData[sparkData.length - 1].pct - sparkData[0].pct
    : 0;
  const trendText = trend > 0 ? `▲ +${trend}%` : trend < 0 ? `▼ ${trend}%` : '— stabil';
  const trendCls = trend > 0 ? 'pos' : trend < 0 ? 'neg' : 'neu';

  return el('div', { class: 'card quiz-trend', style: { marginTop: '24px' }, dataset: { spotlight: '', reveal: '' } },
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
  );
}

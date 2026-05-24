// Karteikarten-Modus · End-of-Session-Zusammenfassung (verbessert)
import { el, go } from '../../util.js';
import { confettiBurst } from '../../util/motion.js';
import { icon, sparkline } from '../../util/icons.js';
import { sfx } from '../../util/sounds.js';
import { getXp, xpToNextLevel, getLevelTitle } from '../../store/xp.js';
import { getGoalPct, getTodayProgress, getGoalTarget } from '../../store/goals.js';
import { getStreak } from '../../store.js';

export function renderSummary(finished, onRestart) {
  const total = finished.cards.length;
  const { easy, med, hard } = finished.rated;
  const pctEasy = total > 0 ? Math.round((easy / total) * 100) : 0;
  const isGreat = pctEasy >= 70;
  const isFine  = pctEasy >= 40;

  const xp = getXp();
  const { level, progress: xpProgress } = xpToNextLevel(xp);
  const streak = getStreak();
  const goalPct = getGoalPct();
  const goalToday = getTodayProgress();
  const goalTarget = getGoalTarget();

  const CIRCUMFERENCE = 2 * Math.PI * 42;

  const wrap = el('div', { class: 'summary-view' },
    // Header with animated ring
    el('div', { class: 'summary-header', dataset: { reveal: 'zoom' } },
      el('div', { class: 'summary-ring-wrap' },
        buildDonut(pctEasy, isGreat ? 'var(--accent)' : isFine ? 'var(--warm)' : 'hsl(0 70% 60%)', CIRCUMFERENCE),
        el('div', { class: 'summary-ring-inner' },
          el('div', { class: 'summary-ring-pct' }, pctEasy + '%'),
          el('div', { class: 'summary-ring-label' }, 'Leicht')
        )
      ),
      el('div', { class: 'summary-header-text' },
        el('h2', {}, isGreat ? '🎉 Ausgezeichnet!' : isFine ? '👍 Gut gemacht!' : '💪 Weiter üben!'),
        el('p', {}, `${total} Karten aus ${finished.title} — ${easy} leicht, ${med} mittel, ${hard} schwer.`)
      )
    ),

    // XP Bonus earned this session
    (() => {
      const sessionXp = easy * 10 + med * 5 + hard * 5;
      return el('div', { class: 'summary-xp-earned' },
        el('span', { class: 'summary-xp-num' }, '+' + sessionXp),
        el('span', { class: 'summary-xp-unit' }, 'XP verdient'),
        el('div', { class: 'summary-xp-bar' },
          el('div', { class: 'summary-xp-fill', style: { width: Math.round(xpProgress * 100) + '%' } })
        ),
        el('span', { class: 'summary-xp-level' }, `Lv.${level} · ${getLevelTitle(level)}`)
      );
    })(),

    // Quick stats row
    el('div', { class: 'summary-stats' },
      el('div', { class: 'summary-stat' },
        el('div', { class: 'summary-stat-icon' }, icon('flame', { size: 20 })),
        el('div', { class: 'summary-stat-num' }, String(streak)),
        el('div', { class: 'summary-stat-label' }, 'Streak')
      ),
      el('div', { class: 'summary-stat' },
        el('div', { class: 'summary-stat-icon' }, icon('target', { size: 20 })),
        el('div', { class: 'summary-stat-num' }, `${goalToday}/${goalTarget}`),
        el('div', { class: 'summary-stat-label' }, 'Tagesziel')
      ),
      el('div', { class: 'summary-stat' },
        el('div', { class: 'summary-stat-icon' }, icon('cards', { size: 20 })),
        el('div', { class: 'summary-stat-num' }, String(total)),
        el('div', { class: 'summary-stat-label' }, 'Karten heute')
      )
    ),

    // Session rating breakdown
    el('div', { class: 'summary-breakdown' },
      ratingBar('Leicht', easy, total, 'var(--accent)'),
      ratingBar('Mittel', med, total, 'var(--warm)'),
      ratingBar('Schwer', hard, total, 'hsl(0 70% 60%)')
    ),

    // CTA Buttons
    el('div', { class: 'summary-cta' },
      el('button', { class: 'btn btn-primary', dataset: { magnetic: '14' }, onClick: onRestart },
        icon('refresh'), ' Nochmal lernen'
      ),
      el('button', { class: 'btn btn-secondary', onClick: () => go('#/quiz') },
        icon('target'), ' Im Quiz testen'
      ),
      el('button', { class: 'btn btn-ghost', onClick: () => go('#/statistiken') },
        icon('zap'), ' Statistiken'
      )
    )
  );

  // Trigger confetti
  setTimeout(() => {
    const header = wrap.querySelector('.summary-header');
    if (header) confettiBurst(header, { count: isGreat ? 130 : 70 });
    if (isGreat) { sfx.unlock(); } else { sfx.correct(); }
  }, 250);

  return wrap;
}

function buildDonut(pct, color, circumference) {
  const dash = circumference * (pct / 100);
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('class', 'summary-donut');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = `
    <circle cx="50" cy="50" r="42" fill="none" stroke="var(--border)" stroke-width="8"/>
    <circle cx="50" cy="50" r="42" fill="none"
      stroke="${color}" stroke-width="8"
      stroke-linecap="round"
      stroke-dasharray="${dash.toFixed(1)} ${circumference.toFixed(1)}"
      transform="rotate(-90 50 50)"
      style="transition: stroke-dasharray 1s var(--ease-spring)"
    />
  `;
  return svg;
}

function ratingBar(label, count, total, color) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return el('div', { class: 'summary-rating-row' },
    el('span', { class: 'summary-rating-label' }, label),
    el('div', { class: 'summary-rating-bar' },
      el('div', { class: 'summary-rating-fill', style: { width: pct + '%', background: color } })
    ),
    el('span', { class: 'summary-rating-count', style: { color } }, `${count} (${pct}%)`)
  );
}

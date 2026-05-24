// Tägliches Lernziel-Widget — runder Fortschrittsring + Ziel-Selektor

import { el } from '../util.js';
import { getGoalTarget, getTodayProgress, getGoalPct, setGoalTarget, getGoalOptions, getProgressHistory } from '../store/goals.js';
import { confettiBurst } from './motion.js';
import { sfx } from './sounds.js';

export function renderGoalWidget() {
  const target = getGoalTarget();
  const progress = getTodayProgress();
  const pct = getGoalPct();
  const met = progress >= target;
  const RADIUS = 32;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const dash = CIRCUMFERENCE * pct;

  const wrap = el('div', { class: 'goal-widget' + (met ? ' goal-met' : '') });

  // Circular SVG ring
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 80 80');
  svg.setAttribute('class', 'goal-ring-svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = `
    <circle cx="40" cy="40" r="${RADIUS}" fill="none" stroke="var(--border)" stroke-width="6"/>
    <circle cx="40" cy="40" r="${RADIUS}" fill="none"
      stroke="${met ? 'var(--accent)' : 'var(--brand)'}"
      stroke-width="6"
      stroke-linecap="round"
      stroke-dasharray="${dash.toFixed(2)} ${CIRCUMFERENCE.toFixed(2)}"
      transform="rotate(-90 40 40)"
      class="goal-ring-fill"
      style="transition: stroke-dasharray 0.8s var(--ease-spring)"
    />
    <text x="40" y="44" text-anchor="middle" class="goal-ring-text" fill="currentColor">
      ${met ? '✓' : progress}
    </text>
  `;

  const info = el('div', { class: 'goal-info' },
    el('div', { class: 'goal-title' }, met ? '🎉 Tagesziel erreicht!' : 'Tagesziel'),
    el('div', { class: 'goal-progress' }, `${progress} / ${target} Karten`),
    el('div', { class: 'goal-selector', onClick: (e) => e.stopPropagation() },
      ...getGoalOptions().map(n =>
        el('button', {
          class: 'goal-opt' + (n === target ? ' is-active' : ''),
          title: `Ziel: ${n} Karten/Tag`,
          onClick: () => {
            setGoalTarget(n);
            sfx.click();
            // Re-render by replacing the widget
            const parent = wrap.parentNode;
            if (parent) {
              const newWidget = renderGoalWidget();
              parent.replaceChild(newWidget, wrap);
            }
          }
        }, String(n))
      )
    )
  );

  wrap.appendChild(svg);
  wrap.appendChild(info);

  // Progress history mini-bars
  const hist = getProgressHistory(7);
  const histRow = el('div', { class: 'goal-history' },
    ...hist.map(h => {
      const barH = Math.min(1, target > 0 ? h.count / target : 0);
      return el('div', { class: 'goal-hist-col' },
        el('div', { class: 'goal-hist-bar', style: { '--bh': barH.toFixed(2), '--bc': h.met ? 'var(--accent)' : 'var(--brand)' } }),
        el('div', { class: 'goal-hist-day' }, ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'][h.date.getDay()])
      );
    })
  );
  wrap.appendChild(histRow);

  return wrap;
}

export function initGoalEvents(toast) {
  document.addEventListener('dialekto:goalmet', (e) => {
    const { target } = e.detail;
    if (toast) toast(`🎉 Tagesziel erreicht — ${target} Karten heute!`, 'success', 2800);
    sfx.unlock();
    // Confetti on any goal widget on the page
    const w = document.querySelector('.goal-widget');
    if (w) confettiBurst(w, { count: 60 });
    // Re-render goal widget
    const newWidget = renderGoalWidget();
    if (w?.parentNode) w.parentNode.replaceChild(newWidget, w);
  });
}

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
  const isEmpty = progress === 0 && !met;
  const RADIUS = 32;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const dash = CIRCUMFERENCE * pct;

  const wrap = el('div', { class: 'goal-widget' + (met ? ' goal-met' : '') + (isEmpty ? ' goal-empty' : '') });

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
    el('div', { class: 'goal-title' }, met ? '🎉 Tagesziel erreicht!' : (isEmpty ? 'Tagesziel — bereit?' : 'Tagesziel')),
    el('div', { class: 'goal-progress' }, isEmpty ? `Heute noch keine Karte · Ziel: ${target}` : `${progress} / ${target} Karten`),
    isEmpty ? el('div', { class: 'goal-nudge' }, '✨ Leg los — schon eine Karte zählt!') : null,
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

  // Progress history mini-bars (Füllstand pro Tag, „heute" hervorgehoben)
  const hist = getProgressHistory(7);
  const DAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  const histRow = el('div', { class: 'goal-history', role: 'img', ariaLabel: `Aktivität der letzten 7 Tage, Ziel ${target} Karten/Tag` },
    ...hist.map((h, i) => {
      const barH = Math.min(1, target > 0 ? h.count / target : 0);
      const isToday = i === hist.length - 1;
      const dayLabel = DAYS[h.date.getDay()];
      const cardWord = h.count === 1 ? 'Karte' : 'Karten';
      return el('div', { class: 'goal-hist-col' + (isToday ? ' is-today' : '') },
        el('div', {
          class: 'goal-hist-bar',
          title: `${isToday ? 'Heute' : dayLabel}: ${h.count} ${cardWord}${h.met ? ' · Ziel erreicht ✓' : ''}`,
          style: { '--bh': barH.toFixed(2), '--bc': h.met ? 'var(--accent)' : 'var(--brand)' }
        }),
        el('div', { class: 'goal-hist-day' }, dayLabel)
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

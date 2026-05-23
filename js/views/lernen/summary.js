// Karteikarten-Modus · End-of-Session-Zusammenfassung
import { el, go } from '../../util.js';
import { confettiBurst } from '../../util/motion.js';
import { icon } from '../../util/icons.js';

export function renderSummary(finished, onRestart) {
  const total = finished.cards.length;
  const { easy, med, hard } = finished.rated;

  const wrap = el('div', {},
    el('div', { class: 'quiz-result', dataset: { reveal: 'zoom' } },
      el('div', { class: 'celebrate-emoji' }, '🎉'),
      el('h2', {}, 'Session abgeschlossen!'),
      el('p', {}, `Du hast ${total} Karten zu ${finished.title} durchgearbeitet.`),
      el('div', { class: 'stat-grid', style: { marginTop: '24px' } },
        el('div', { class: 'stat-card', dataset: { spotlight: '' } },
          el('div', { class: 'stat-card-icon', style: { background: 'color-mix(in oklab, var(--accent) 18%, transparent)', color: 'var(--accent)' } }, icon('target', { size: 22 })),
          el('div', { class: 'stat-card-value', dataset: { count: String(easy) } }, String(easy)),
          el('div', { class: 'stat-card-label' }, 'Leicht ✓')
        ),
        el('div', { class: 'stat-card', dataset: { spotlight: '' } },
          el('div', { class: 'stat-card-icon', style: { background: 'color-mix(in oklab, var(--warm) 18%, transparent)', color: 'var(--warm)' } }, icon('zap', { size: 22 })),
          el('div', { class: 'stat-card-value', dataset: { count: String(med) } }, String(med)),
          el('div', { class: 'stat-card-label' }, 'Mittel')
        ),
        el('div', { class: 'stat-card', dataset: { spotlight: '' } },
          el('div', { class: 'stat-card-icon', style: { background: 'color-mix(in oklab, hsl(0 80% 60%) 18%, transparent)', color: 'hsl(0 80% 60%)' } }, icon('refresh', { size: 22 })),
          el('div', { class: 'stat-card-value', dataset: { count: String(hard) } }, String(hard)),
          el('div', { class: 'stat-card-label' }, 'Schwer')
        )
      ),
      el('div', { style: { marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' } },
        el('button', { class: 'btn btn-primary', dataset: { magnetic: '14' }, onClick: onRestart }, 'Nochmal lernen'),
        el('button', { class: 'btn btn-secondary', onClick: () => go('#/quiz') }, 'Im Quiz testen')
      )
    )
  );

  // Trigger confetti once layout settles
  setTimeout(() => {
    const ring = wrap.querySelector('.quiz-result');
    confettiBurst(ring, { count: easy >= total * 0.6 ? 110 : 60 });
  }, 220);

  return wrap;
}

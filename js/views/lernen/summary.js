// Karteikarten-Modus · End-of-Session-Zusammenfassung
import { el, go } from '../../util.js';

export function renderSummary(finished, onRestart) {
  const total = finished.cards.length;
  const { easy, med, hard } = finished.rated;

  return el('div', {},
    el('div', { class: 'quiz-result' },
      el('div', { style: { fontSize: '4rem', marginBottom: '16px' } }, '🎉'),
      el('h2', {}, 'Session abgeschlossen!'),
      el('p', {}, `Du hast ${total} Karten zu ${finished.title} durchgearbeitet.`),
      el('div', { class: 'stat-grid', style: { marginTop: '24px' } },
        el('div', { class: 'stat-card' },
          el('div', { class: 'stat-card-value' }, String(easy)),
          el('div', { class: 'stat-card-label' }, 'Leicht ✓')
        ),
        el('div', { class: 'stat-card' },
          el('div', { class: 'stat-card-value' }, String(med)),
          el('div', { class: 'stat-card-label' }, 'Mittel')
        ),
        el('div', { class: 'stat-card' },
          el('div', { class: 'stat-card-value' }, String(hard)),
          el('div', { class: 'stat-card-label' }, 'Schwer')
        )
      ),
      el('div', { style: { marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' } },
        el('button', { class: 'btn btn-primary', onClick: onRestart }, 'Nochmal lernen'),
        el('button', { class: 'btn btn-secondary', onClick: () => go('#/quiz') }, 'Im Quiz testen')
      )
    )
  );
}

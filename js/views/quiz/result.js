// Quiz · Ergebnis-Bildschirm mit Score-Ring
import { el, go } from '../../util.js';
import { saveQuizResult } from '../../store.js';

export function renderQuizResult(finished, { onRetry, onAnother }) {
  const total = finished.questions.length;
  const score = finished.score;
  const pct = Math.round((score / total) * 100);
  saveQuizResult(score, total, finished.source);

  const emoji = pct >= 90 ? '🏆' : pct >= 70 ? '🎉' : pct >= 50 ? '👍' : '💪';
  const headline = pct >= 90 ? 'Hervorragend!' : pct >= 70 ? 'Sehr gut!' : pct >= 50 ? 'Solide Leistung' : 'Übung macht den Meister';

  const r = 60;
  const C = 2 * Math.PI * r;
  const dash = (pct / 100) * C;

  return el('div', { class: 'quiz-stage' },
    el('div', { class: 'quiz-result' },
      el('div', { style: { fontSize: '4rem', marginBottom: '8px' } }, emoji),
      el('div', { class: 'score-ring' },
        el('svg', {
          width: 160, height: 160, viewBox: '0 0 160 160',
          html: `
            <circle cx="80" cy="80" r="${r}" fill="none" stroke="var(--bg-soft)" stroke-width="14"/>
            <circle cx="80" cy="80" r="${r}" fill="none" stroke="url(#g)" stroke-width="14" stroke-linecap="round" stroke-dasharray="${dash} ${C}"/>
            <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8338ec"/><stop offset="100%" stop-color="#06d6a0"/></linearGradient></defs>
          `
        }),
        el('div', { class: 'score-num' }, pct + '%')
      ),
      el('h2', {}, headline),
      el('p', {}, `${score} von ${total} Fragen richtig.`),
      el('div', { style: { display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '24px' } },
        el('button', { class: 'btn btn-primary', onClick: () => onRetry(finished) }, 'Nochmal'),
        el('button', { class: 'btn btn-secondary', onClick: onAnother }, 'Anderes Quiz'),
        el('button', { class: 'btn btn-ghost', onClick: () => go('#/lernen') }, 'Karteikarten lernen')
      )
    )
  );
}

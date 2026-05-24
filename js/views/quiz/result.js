// Quiz · Ergebnis-Bildschirm mit animiertem Score-Ring
import { el, go, toast } from '../../util.js';
import { saveQuizResult, encodeQuizShare } from '../../store.js';
import { confettiBurst, animateCounter } from '../../util/motion.js';
import { sfx } from '../../util/sounds.js';

export function renderQuizResult(finished, { onRetry, onAnother }) {
  const total = finished.questions.length;
  const score = finished.score;
  const pct = Math.round((score / total) * 100);
  saveQuizResult(score, total, finished.source);

  const emoji = pct >= 90 ? '🏆' : pct >= 70 ? '🎉' : pct >= 50 ? '👍' : '💪';
  const headline = pct >= 90 ? 'Hervorragend!' : pct >= 70 ? 'Sehr gut!' : pct >= 50 ? 'Solide Leistung' : 'Übung macht den Meister';
  const tone = pct >= 70 ? 'win' : pct >= 50 ? 'good' : 'try';

  const r = 64;
  const C = 2 * Math.PI * r;
  const dash = (pct / 100) * C;

  const numEl = el('div', { class: 'score-num' }, '0%');

  const wrap = el('div', { class: 'quiz-stage' },
    el('div', { class: 'quiz-result', dataset: { reveal: 'zoom', tone } },
      el('div', { class: 'celebrate-emoji' }, emoji),
      el('div', { class: 'score-ring is-animating' },
        el('svg', {
          width: 170, height: 170, viewBox: '0 0 170 170',
          html: `
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="hsl(258 80% 60%)"/>
                <stop offset="50%" stop-color="hsl(335 85% 65%)"/>
                <stop offset="100%" stop-color="hsl(195 85% 55%)"/>
              </linearGradient>
              <filter id="glow"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            <circle cx="85" cy="85" r="${r}" fill="none" stroke="color-mix(in oklab, var(--bg-soft) 80%, transparent)" stroke-width="14"/>
            <circle class="score-ring-fg" cx="85" cy="85" r="${r}" fill="none" stroke="url(#g)" stroke-width="14" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C}" filter="url(#glow)" transform="rotate(-90 85 85)" style="--ring-len:${dash}px;--ring-tot:${C}px"/>
          `
        }),
        numEl
      ),
      el('h2', {}, headline),
      el('p', {}, `${score} von ${total} Fragen richtig.`),
      el('div', { style: { display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '24px' } },
        el('button', { class: 'btn btn-primary', dataset: { magnetic: '14' }, onClick: () => onRetry(finished) }, 'Nochmal'),
        el('button', { class: 'btn btn-secondary', onClick: onAnother }, 'Anderes Quiz'),
        el('button', { class: 'btn btn-secondary', onClick: () => shareResult(score, total, finished.source) }, '🔗 Teilen'),
        el('button', { class: 'btn btn-ghost', onClick: () => go('#/lernen') }, 'Karteikarten lernen')
      )
    )
  );

  // Animate ring stroke + percentage on next frame
  setTimeout(() => {
    const fg = wrap.querySelector('.score-ring-fg');
    if (fg) fg.style.strokeDashoffset = (C - dash).toFixed(2);
    animateCounter(numEl, pct, { suffix: '%', duration: 1100 });
    if (pct >= 70) confettiBurst(wrap.querySelector('.score-ring'), { count: pct >= 90 ? 140 : 90 });
  }, 200);

  return wrap;
}

function shareResult(score, total, source) {
  sfx.click();
  const token = encodeQuizShare({ score, total, source });
  if (!token) { toast('Share-Link konnte nicht erstellt werden.', 'info', 1600); return; }
  const url = `${window.location.origin}${window.location.pathname}#/share/${token}`;
  if (navigator.share) {
    navigator.share({
      title: 'Mein Dialekto-Quiz-Resultat',
      text: `Ich habe ${score}/${total} im Dialekto-Quiz!`,
      url
    }).catch(() => fallbackClipboard(url));
  } else {
    fallbackClipboard(url);
  }
}

function fallbackClipboard(url) {
  try {
    navigator.clipboard.writeText(url);
    toast('Link kopiert 📋', 'success', 1800);
  } catch {
    toast('Link: ' + url, 'info', 4000);
  }
}

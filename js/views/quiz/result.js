// Quiz · Ergebnis-Bildschirm mit animiertem Score-Ring
import { el, go, toast } from '../../util.js';
import { saveQuizResult, encodeQuizShare } from '../../store.js';
import { confettiBurst, animateCounter } from '../../util/motion.js';
import { sfx } from '../../util/sounds.js';
import { t } from '../../util/i18n.js';

let _resultRingSeq = 0;

export function renderQuizResult(finished, { onRetry, onAnother }) {
  const total = finished.questions.length;
  const score = finished.score;
  const pct = Math.round((score / total) * 100);
  saveQuizResult(score, total, finished.source);

  const emoji = pct >= 90 ? '🏆' : pct >= 70 ? '🎉' : pct >= 50 ? '👍' : '💪';
  const headline = pct >= 90 ? t('view.result.headlineExcellent') : pct >= 70 ? t('view.result.headlineGreat') : pct >= 50 ? t('view.result.headlineSolid') : t('view.result.headlinePractice');
  const tone = pct >= 70 ? 'win' : pct >= 50 ? 'good' : 'try';

  const r = 64;
  const C = 2 * Math.PI * r;
  const dash = (pct / 100) * C;
  // Eindeutige SVG-IDs, damit der generische id="g"/"glow" nicht mit anderen
  // SVGs auf der Seite kollidiert (url(#g) referenziert sonst evtl. das falsche).
  const uid = 'qres' + (++_resultRingSeq);
  const gradId = uid + 'g';
  const glowId = uid + 'glow';

  const numEl = el('div', { class: 'score-num' }, '0%');

  const wrap = el('div', { class: 'quiz-stage' },
    el('div', { class: 'quiz-result', dataset: { reveal: 'zoom', tone } },
      el('div', { class: 'celebrate-emoji' }, emoji),
      el('div', { class: 'score-ring is-animating' },
        el('svg', {
          width: 170, height: 170, viewBox: '0 0 170 170',
          role: 'img', 'aria-label': t('view.result.ringAria', { n: pct }),
          html: `
            <defs>
              <linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="hsl(258 80% 60%)"/>
                <stop offset="50%" stop-color="hsl(335 85% 65%)"/>
                <stop offset="100%" stop-color="hsl(195 85% 55%)"/>
              </linearGradient>
              <filter id="${glowId}"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            <circle cx="85" cy="85" r="${r}" fill="none" stroke="color-mix(in oklab, var(--bg-soft) 80%, transparent)" stroke-width="14"/>
            <circle class="score-ring-fg" cx="85" cy="85" r="${r}" fill="none" stroke="url(#${gradId})" stroke-width="14" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C}" filter="url(#${glowId})" transform="rotate(-90 85 85)" style="--ring-len:${dash}px;--ring-tot:${C}px"/>
          `
        }),
        numEl
      ),
      el('h2', {}, headline),
      el('p', {}, t('view.result.scoreLine', { score, total })),
      el('div', { style: { display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '24px' } },
        el('button', { class: 'btn btn-primary', dataset: { magnetic: '14' }, onClick: () => onRetry(finished) }, t('view.result.retry')),
        el('button', { class: 'btn btn-secondary', onClick: onAnother }, t('view.result.another')),
        el('button', { class: 'btn btn-secondary', onClick: () => shareResult(score, total, finished.source) }, t('view.result.share')),
        el('button', { class: 'btn btn-ghost', onClick: () => go('#/lernen') }, t('home.hero.cta.learn'))
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
  if (!token) { toast(t('view.result.shareLinkError'), 'info', 1600); return; }
  const url = `${window.location.origin}${window.location.pathname}#/share/${token}`;
  if (navigator.share) {
    navigator.share({
      title: t('view.result.shareTitle'),
      text: t('view.result.shareText', { score, total }),
      url
    }).catch(() => fallbackClipboard(url));
  } else {
    fallbackClipboard(url);
  }
}

function fallbackClipboard(url) {
  try {
    navigator.clipboard.writeText(url);
    toast(t('view.result.linkCopied'), 'success', 1800);
  } catch {
    toast(t('view.result.linkFallback', { url }), 'info', 4000);
  }
}

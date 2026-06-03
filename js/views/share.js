// Share-View: zeigt ein Quiz-Resultat aus einem Share-Token.
import { el, go } from '../util.js';
import { decodeQuizShare } from '../store.js';
import { getDialekt } from '../../data/dialekte.js';
import { confettiBurst } from '../util/motion.js';
import { sfx } from '../util/sounds.js';
import { emptyIllustration } from '../util/icons.js';

export function renderShare(root, token) {
  root.innerHTML = '';
  const data = decodeQuizShare('q:' + token);
  if (!data) {
    root.appendChild(el('div', { class: 'empty-state' },
      emptyIllustration('sparkles'),
      el('h3', {}, 'Link nicht lesbar'),
      el('div', { class: 'empty-meta' }, 'Der Share-Link scheint defekt oder veraltet zu sein.'),
      el('button', { class: 'btn btn-primary', onClick: () => go('#/quiz') }, 'Eigenes Quiz starten')
    ));
    return;
  }

  const { score, total, source, date } = data;
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const tone = pct >= 70 ? 'win' : pct >= 50 ? 'good' : 'try';
  const emoji = pct >= 90 ? '🏆' : pct >= 70 ? '🎉' : pct >= 50 ? '👍' : '💪';

  const d = source !== 'all' ? getDialekt(source) : null;
  const label = d ? `${d.flag} ${d.name}` : '🌍 Bunt gemischt';

  const r = 64;
  const C = 2 * Math.PI * r;
  const dash = (pct / 100) * C;

  const view = el('div', { class: 'view share-view' },
    el('div', { class: 'quiz-stage' },
      el('div', { class: 'quiz-result', dataset: { tone, reveal: 'zoom' } },
        el('div', { class: 'share-eyebrow' }, '🔗 Geteiltes Ergebnis'),
        el('div', { class: 'celebrate-emoji' }, emoji),
        el('div', { class: 'score-ring is-animating' },
          el('svg', {
            width: 170, height: 170, viewBox: '0 0 170 170',
            html: `
              <defs>
                <linearGradient id="gs" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="hsl(258 80% 60%)"/>
                  <stop offset="50%" stop-color="hsl(335 85% 65%)"/>
                  <stop offset="100%" stop-color="hsl(195 85% 55%)"/>
                </linearGradient>
              </defs>
              <circle cx="85" cy="85" r="${r}" fill="none" stroke="var(--bg-soft)" stroke-width="14"/>
              <circle cx="85" cy="85" r="${r}" fill="none" stroke="url(#gs)" stroke-width="14"
                      stroke-linecap="round" stroke-dasharray="${dash} ${C}"
                      transform="rotate(-90 85 85)"/>
            `
          }),
          el('div', { class: 'score-num' }, pct + '%')
        ),
        el('h2', {}, `${score} von ${total} Fragen richtig`),
        el('p', {}, `${label} · vom ${new Date(date).toLocaleDateString('de-DE')}`),
        el('div', { style: { display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '24px' } },
          el('button', { class: 'btn btn-primary', dataset: { magnetic: '14' }, onClick: () => go('#/quiz') }, 'Selbst versuchen'),
          el('button', { class: 'btn btn-secondary', onClick: () => go('#/') }, 'Zur Startseite')
        )
      )
    )
  );
  root.appendChild(view);
  if (pct >= 70) setTimeout(() => { sfx.unlock(); confettiBurst(view.querySelector('.score-ring'), { count: pct >= 90 ? 120 : 70 }); }, 400);
}

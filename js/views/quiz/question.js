// Quiz · Aktive Frage
import { el, speak } from '../../util.js';
import { icon } from '../../util/icons.js';
import { sfx } from '../../util/sounds.js';

const TIMER_SECONDS = 20;

export function renderQuizQuestion(quiz, { onAbort, onAnswer }) {
  const q = quiz.questions[quiz.idx];
  const total = quiz.questions.length;
  const progress = ((quiz.idx) / total) * 100;
  const timerEnabled = quiz.timerEnabled !== false;

  const wrap = el('div', { class: 'quiz-stage' });

  // Timer state
  let remaining = TIMER_SECONDS;
  let timerInterval = null;
  let answered = false;

  // Build top bar with timer
  const CIRCUM = 2 * Math.PI * 14; // r=14
  const timerSvg = timerEnabled ? buildTimerSvg(CIRCUM) : null;

  wrap.appendChild(el('div', { class: 'quiz-bar' },
    el('button', { class: 'btn btn-ghost', style: { padding: '8px 16px' }, onClick: () => { stopTimer(); onAbort(); } },
      el('span', { html: '←' }), ' Abbrechen'
    ),
    el('div', { class: 'qb-progress' },
      el('div', { class: 'qb-progress-fill', style: { width: progress + '%' } }),
      el('div', { class: 'qb-progress-glow', style: { left: progress + '%' } })
    ),
    el('div', { class: 'qb-meta' }, `${quiz.idx + 1} / ${total} · ${quiz.score} Punkte`),
    timerSvg || el('span')
  ));

  function stopTimer() {
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
  }

  function startTimer(optsBtns) {
    if (!timerEnabled || !timerSvg) return;
    timerInterval = setInterval(() => {
      remaining--;
      updateTimer(timerSvg, remaining, TIMER_SECONDS, CIRCUM);
      if (remaining <= 5 && remaining > 0) sfx.click(); // tick sound
      if (remaining <= 0) {
        stopTimer();
        if (!answered) {
          answered = true;
          // Auto-trigger wrong answer — pick first non-correct option
          const wrongBtn = Array.from(optsBtns).find(b => b.dataset.isCorrect !== '1');
          if (wrongBtn) {
            sfx.wrong();
            wrongBtn.classList.add('is-wrong');
            optsBtns.forEach(b => { if (b.dataset.isCorrect === '1') b.classList.add('is-correct'); });
            setTimeout(() => { onAnswer(wrongBtn, wrongBtn.dataset.opt, q.correct, { querySelectorAll: () => optsBtns }); }, 800);
          }
        }
      }
    }, 1000);
  }

  wrap.appendChild(el('div', { class: 'quiz-question', dataset: { reveal: 'zoom' } },
    el('div', { class: 'q-label' }, 'Was bedeutet'),
    el('div', { class: 'q-text is-speakable' }, q.prompt),
    el('div', { class: 'q-sub' }, q.sub),
    el('div', { style: { marginTop: '12px' } },
      el('button', {
        class: 'btn btn-ghost fc-speak', style: { padding: '6px 14px' },
        onClick: () => speak(q.item.ausdruck, q.item.dialektLang || 'de-DE')
      },
        el('span', { class: 'speak-icon' }, icon('speaker', { size: 18 })),
        el('span', { class: 'speak-wave', html: '<i></i><i></i><i></i><i></i><i></i>' }),
        el('span', {}, 'Anhören')
      )
    )
  ));

  const opts = el('div', { class: 'quiz-options' });
  q.options.forEach((opt, i) => {
    const btn = el('button', {
      class: 'quiz-option',
      style: { '--delay': (i * 60) + 'ms' },
      dataset: { reveal: '', opt, isCorrect: opt === q.correct ? '1' : '0' },
      onClick: () => {
        if (answered) return;
        answered = true;
        stopTimer();
        onAnswer(btn, opt, q.correct, opts);
      }
    },
      el('span', { class: 'qo-letter' }, String.fromCharCode(65 + i)),
      el('span', {}, opt),
      el('span', { class: 'qo-icon ok' }, icon('target', { size: 16 })),
      el('span', { class: 'qo-icon no' }, icon('refresh', { size: 16 }))
    );
    opts.appendChild(btn);
  });
  wrap.appendChild(opts);

  // Start timer after a short delay so the question can appear first
  setTimeout(() => startTimer(opts.querySelectorAll('.quiz-option')), 400);

  return wrap;
}

function buildTimerSvg(circumference) {
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 36 36');
  svg.setAttribute('class', 'quiz-timer-svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = `
    <circle cx="18" cy="18" r="14" fill="none" stroke="var(--border)" stroke-width="3"/>
    <circle cx="18" cy="18" r="14" fill="none"
      stroke="var(--accent)"
      stroke-width="3"
      stroke-linecap="round"
      stroke-dasharray="${circumference.toFixed(2)} ${circumference.toFixed(2)}"
      transform="rotate(-90 18 18)"
      class="quiz-timer-fill"
    />
    <text x="18" y="22" text-anchor="middle" font-size="10" font-weight="700" fill="currentColor" class="quiz-timer-text">${TIMER_SECONDS}</text>
  `;
  return svg;
}

function updateTimer(svg, remaining, total, circumference) {
  const fill = svg.querySelector('.quiz-timer-fill');
  const text = svg.querySelector('.quiz-timer-text');
  if (!fill || !text) return;
  const pct = remaining / total;
  const dash = circumference * pct;
  fill.setAttribute('stroke-dasharray', `${dash.toFixed(2)} ${circumference.toFixed(2)}`);
  // Color shift: green → yellow → red
  const color = remaining > total * 0.5 ? 'var(--accent)' : remaining > total * 0.25 ? 'var(--warm)' : 'hsl(0 70% 60%)';
  fill.setAttribute('stroke', color);
  text.textContent = String(Math.max(0, remaining));
  text.setAttribute('fill', remaining <= 5 ? 'hsl(0 70% 60%)' : 'currentColor');
}

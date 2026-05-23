// Quiz · Aktive Frage
import { el, speak } from '../../util.js';

export function renderQuizQuestion(quiz, { onAbort, onAnswer }) {
  const q = quiz.questions[quiz.idx];
  const total = quiz.questions.length;
  const progress = ((quiz.idx) / total) * 100;

  const wrap = el('div', { class: 'quiz-stage' });

  wrap.appendChild(el('div', { class: 'quiz-bar' },
    el('button', { class: 'btn btn-ghost', style: { padding: '8px 16px' }, onClick: onAbort },
      el('span', { html: '←' }), ' Abbrechen'
    ),
    el('div', { class: 'qb-progress' }, el('div', { class: 'qb-progress-fill', style: { width: progress + '%' } })),
    el('div', { class: 'qb-meta' }, `${quiz.idx + 1} / ${total} · ${quiz.score} Punkte`)
  ));

  wrap.appendChild(el('div', { class: 'quiz-question' },
    el('div', { class: 'q-label' }, 'Was bedeutet'),
    el('div', { class: 'q-text' }, q.prompt),
    el('div', { class: 'q-sub' }, q.sub),
    el('div', { style: { marginTop: '12px' } },
      el('button', {
        class: 'btn btn-ghost', style: { padding: '6px 14px' },
        onClick: () => speak(q.item.ausdruck)
      }, '🔊 Anhören')
    )
  ));

  const opts = el('div', { class: 'quiz-options' });
  q.options.forEach((opt, i) => {
    const btn = el('button', {
      class: 'quiz-option',
      onClick: () => onAnswer(btn, opt, q.correct, opts)
    },
      el('span', { class: 'qo-letter' }, String.fromCharCode(65 + i)),
      el('span', {}, opt)
    );
    opts.appendChild(btn);
  });
  wrap.appendChild(opts);

  return wrap;
}

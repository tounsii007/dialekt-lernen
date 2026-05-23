// Quiz · Aktive Frage
import { el, speak } from '../../util.js';
import { icon } from '../../util/icons.js';

export function renderQuizQuestion(quiz, { onAbort, onAnswer }) {
  const q = quiz.questions[quiz.idx];
  const total = quiz.questions.length;
  const progress = ((quiz.idx) / total) * 100;

  const wrap = el('div', { class: 'quiz-stage' });

  wrap.appendChild(el('div', { class: 'quiz-bar' },
    el('button', { class: 'btn btn-ghost', style: { padding: '8px 16px' }, onClick: onAbort },
      el('span', { html: '←' }), ' Abbrechen'
    ),
    el('div', { class: 'qb-progress' },
      el('div', { class: 'qb-progress-fill', style: { width: progress + '%' } }),
      el('div', { class: 'qb-progress-glow', style: { left: progress + '%' } })
    ),
    el('div', { class: 'qb-meta' }, `${quiz.idx + 1} / ${total} · ${quiz.score} Punkte`)
  ));

  wrap.appendChild(el('div', { class: 'quiz-question', dataset: { reveal: 'zoom' } },
    el('div', { class: 'q-label' }, 'Was bedeutet'),
    el('div', { class: 'q-text is-speakable' }, q.prompt),
    el('div', { class: 'q-sub' }, q.sub),
    el('div', { style: { marginTop: '12px' } },
      el('button', {
        class: 'btn btn-ghost fc-speak', style: { padding: '6px 14px' },
        onClick: () => speak(q.item.ausdruck)
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
      dataset: { reveal: '' },
      onClick: () => onAnswer(btn, opt, q.correct, opts)
    },
      el('span', { class: 'qo-letter' }, String.fromCharCode(65 + i)),
      el('span', {}, opt),
      el('span', { class: 'qo-icon ok' }, icon('target', { size: 16 })),
      el('span', { class: 'qo-icon no' }, icon('refresh', { size: 16 }))
    );
    opts.appendChild(btn);
  });
  wrap.appendChild(opts);

  return wrap;
}

import { el, go, shuffle, toast, speak } from '../util.js';
import { DIALEKTE, getDialekt, ALLE_AUSDRUECKE } from '../../data/dialekte.js';
import { saveQuizResult, getQuizGenauigkeit } from '../store.js';

let quiz = null;
const QUIZ_LENGTH = 10;

export function renderQuiz(root) {
  root.innerHTML = '';
  const view = el('div', { class: 'view' });

  if (!quiz) {
    view.appendChild(renderQuizSetup());
    root.appendChild(view);
    return;
  }

  if (quiz.idx >= quiz.questions.length) {
    view.appendChild(renderQuizResult());
    root.appendChild(view);
    return;
  }

  view.appendChild(renderQuizQuestion());
  root.appendChild(view);
}

function renderQuizSetup() {
  const c = el('div', {});
  c.appendChild(el('div', { class: 'section-head' },
    el('div', {},
      el('h2', {}, '🎯 Quiz'),
      el('div', { class: 'lede' }, `${QUIZ_LENGTH} Multiple-Choice-Fragen. Genauigkeit gesamt: ${getQuizGenauigkeit()}%`)
    )
  ));

  const grid = el('div', { class: 'dialekt-grid' });

  grid.appendChild(el('button', {
    class: 'dialekt-card',
    style: { '--dc': '#8338ec' },
    onClick: () => startQuiz({ source: 'all', direction: 'dial->hd' })
  },
    el('span', { class: 'dc-flag' }, '🌍'),
    el('div', { class: 'dc-name' }, 'Bunt gemischt'),
    el('div', { class: 'dc-region' }, 'Alle Dialekte'),
    el('div', { class: 'dc-desc' }, 'Was bedeutet der Dialekt-Ausdruck auf Hochdeutsch?'),
    el('div', { class: 'dc-foot' },
      el('span', { class: 'dc-count' }, `${QUIZ_LENGTH} Fragen`),
      el('span', { class: 'dc-arrow' }, el('span', { html: '→' }))
    )
  ));

  grid.appendChild(el('button', {
    class: 'dialekt-card',
    style: { '--dc': '#06d6a0' },
    onClick: () => startQuiz({ source: 'all', direction: 'hd->dial' })
  },
    el('span', { class: 'dc-flag' }, '🔄'),
    el('div', { class: 'dc-name' }, 'Umgekehrt'),
    el('div', { class: 'dc-region' }, 'Hochdeutsch → Dialekt'),
    el('div', { class: 'dc-desc' }, 'Welcher Dialekt-Ausdruck passt zur Hochdeutsch-Bedeutung?'),
    el('div', { class: 'dc-foot' },
      el('span', { class: 'dc-count' }, `${QUIZ_LENGTH} Fragen`),
      el('span', { class: 'dc-arrow' }, el('span', { html: '→' }))
    )
  ));

  grid.appendChild(el('button', {
    class: 'dialekt-card',
    style: { '--dc': '#fb5607' },
    onClick: () => startQuiz({ source: 'all', direction: 'guess-region' })
  },
    el('span', { class: 'dc-flag' }, '🗺️'),
    el('div', { class: 'dc-name' }, 'Wo wird das gesprochen?'),
    el('div', { class: 'dc-region' }, 'Region erraten'),
    el('div', { class: 'dc-desc' }, 'Aus welcher Region stammt dieser Ausdruck?'),
    el('div', { class: 'dc-foot' },
      el('span', { class: 'dc-count' }, `${QUIZ_LENGTH} Fragen`),
      el('span', { class: 'dc-arrow' }, el('span', { html: '→' }))
    )
  ));

  DIALEKTE.forEach(d => {
    grid.appendChild(el('button', {
      class: 'dialekt-card',
      style: { '--dc': d.farbe },
      onClick: () => startQuiz({ source: d.id, direction: 'dial->hd' })
    },
      el('span', { class: 'dc-flag' }, d.flag),
      el('div', { class: 'dc-name' }, d.name),
      el('div', { class: 'dc-region' }, d.region),
      el('div', { class: 'dc-desc' }, `Teste dein ${d.name}-Wissen.`),
      el('div', { class: 'dc-foot' },
        el('span', { class: 'dc-count' }, `${QUIZ_LENGTH} Fragen`),
        el('span', { class: 'dc-arrow' }, el('span', { html: '→' }))
      )
    ));
  });

  c.appendChild(grid);
  return c;
}

function startQuiz({ source, direction }) {
  const pool = source === 'all' ? ALLE_AUSDRUECKE : (getDialekt(source)?.ausdruecke || []).map(a => ({ ...a, dialektId: source, dialektName: getDialekt(source).name, dialektFlag: getDialekt(source).flag, dialektFarbe: getDialekt(source).farbe }));
  if (pool.length < 4) {
    toast('Zu wenige Ausdrücke für ein Quiz.', 'info');
    return;
  }
  const selected = shuffle(pool).slice(0, Math.min(QUIZ_LENGTH, pool.length));
  const questions = selected.map(item => buildQuestion(item, pool, direction));
  quiz = {
    source,
    direction,
    questions,
    idx: 0,
    score: 0,
    history: []
  };
  renderQuiz(document.getElementById('app'));
}

function buildQuestion(item, pool, direction) {
  const wrong = shuffle(pool.filter(p => p.id !== item.id)).slice(0, 3);
  let q = {}, options = [];
  if (direction === 'dial->hd') {
    q = { prompt: item.ausdruck, sub: `${item.dialektFlag} ${item.dialektName}`, correct: item.hochdeutsch };
    options = shuffle([item.hochdeutsch, ...wrong.map(w => w.hochdeutsch)]);
  } else if (direction === 'hd->dial') {
    q = { prompt: item.hochdeutsch, sub: 'Hochdeutsch', correct: item.ausdruck, hint: item.dialektName };
    options = shuffle([item.ausdruck, ...wrong.map(w => w.ausdruck)]);
  } else {
    q = { prompt: item.ausdruck, sub: '↦ ' + item.hochdeutsch, correct: item.dialektName };
    const otherNames = shuffle(DIALEKTE.filter(d => d.id !== item.dialektId)).slice(0, 3).map(d => d.name);
    options = shuffle([item.dialektName, ...otherNames]);
  }
  return { ...q, options, item };
}

function renderQuizQuestion() {
  const q = quiz.questions[quiz.idx];
  const total = quiz.questions.length;
  const progress = ((quiz.idx) / total) * 100;

  const wrap = el('div', { class: 'quiz-stage' });

  wrap.appendChild(el('div', { class: 'quiz-bar' },
    el('button', { class: 'btn btn-ghost', style: { padding: '8px 16px' }, onClick: () => { quiz = null; renderQuiz(document.getElementById('app')); } },
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
      onClick: () => answer(btn, opt, q.correct, opts)
    },
      el('span', { class: 'qo-letter' }, String.fromCharCode(65 + i)),
      el('span', {}, opt)
    );
    opts.appendChild(btn);
  });
  wrap.appendChild(opts);

  return wrap;
}

function answer(btn, chosen, correct, optsEl) {
  optsEl.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);
  const correctBtn = Array.from(optsEl.querySelectorAll('.quiz-option')).find(b =>
    b.textContent.includes(correct)
  );
  if (chosen === correct) {
    btn.classList.add('is-correct');
    quiz.score++;
    quiz.history.push({ correct: true });
  } else {
    btn.classList.add('is-wrong');
    if (correctBtn) correctBtn.classList.add('is-correct');
    quiz.history.push({ correct: false });
  }
  setTimeout(() => {
    quiz.idx++;
    renderQuiz(document.getElementById('app'));
  }, 1000);
}

function renderQuizResult() {
  const total = quiz.questions.length;
  const score = quiz.score;
  const pct = Math.round((score / total) * 100);
  saveQuizResult(score, total, quiz.source);
  const finished = quiz;
  quiz = null;

  const emoji = pct >= 90 ? '🏆' : pct >= 70 ? '🎉' : pct >= 50 ? '👍' : '💪';
  const headline = pct >= 90 ? 'Hervorragend!' : pct >= 70 ? 'Sehr gut!' : pct >= 50 ? 'Solide Leistung' : 'Übung macht den Meister';

  // Score ring (SVG)
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
        el('button', { class: 'btn btn-primary', onClick: () => startQuiz({ source: finished.source, direction: finished.direction }) }, 'Nochmal'),
        el('button', { class: 'btn btn-secondary', onClick: () => renderQuiz(document.getElementById('app')) }, 'Anderes Quiz'),
        el('button', { class: 'btn btn-ghost', onClick: () => go('#/lernen') }, 'Karteikarten lernen')
      )
    )
  );
}

export function handleQuizKey(e) {
  if (!quiz || quiz.idx >= quiz.questions.length) return;
  if (e.key >= '1' && e.key <= '4') {
    const idx = parseInt(e.key) - 1;
    const btns = document.querySelectorAll('.quiz-option');
    if (btns[idx] && !btns[idx].disabled) btns[idx].click();
  }
}

export function resetQuizSession() { quiz = null; }

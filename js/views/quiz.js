// Quiz · Hauptkomponente
// Setup → Frage → Ergebnis. State liegt in ./quiz/state.js.
import { el, shuffle, toast } from '../util.js';
import { getDialekt, ALLE_AUSDRUECKE } from '../../data/dialekte.js';
import { QUIZ_LENGTH } from './quiz/constants.js';
import { getQuiz, setQuiz, clearQuiz } from './quiz/state.js';
import { renderQuizSetup } from './quiz/setup.js';
import { buildQuestion } from './quiz/question-builder.js';
import { renderQuizQuestion } from './quiz/question.js';
import { renderQuizResult } from './quiz/result.js';
import { confettiBurst } from '../util/motion.js';

export function renderQuiz(root) {
  root.innerHTML = '';
  const view = el('div', { class: 'view' });
  const quiz = getQuiz();

  if (!quiz) {
    view.appendChild(renderQuizSetup(startQuiz));
    root.appendChild(view);
    return;
  }

  if (quiz.idx >= quiz.questions.length) {
    const finished = quiz;
    clearQuiz();
    view.appendChild(renderQuizResult(finished, {
      onRetry: (prev) => startQuiz({ source: prev.source, direction: prev.direction }),
      onAnother: () => rerender(),
    }));
    root.appendChild(view);
    return;
  }

  view.appendChild(renderQuizQuestion(quiz, {
    onAbort: () => { clearQuiz(); rerender(); },
    onAnswer: answer,
  }));
  root.appendChild(view);
}

function startQuiz({ source, direction }) {
  const pool = source === 'all'
    ? ALLE_AUSDRUECKE
    : (getDialekt(source)?.ausdruecke || []).map(a => ({
        ...a,
        dialektId: source,
        dialektName: getDialekt(source).name,
        dialektFlag: getDialekt(source).flag,
        dialektFarbe: getDialekt(source).farbe,
      }));
  if (pool.length < 4) {
    toast('Zu wenige Ausdrücke für ein Quiz.', 'info');
    return;
  }
  const selected = shuffle(pool).slice(0, Math.min(QUIZ_LENGTH, pool.length));
  const questions = selected.map(item => buildQuestion(item, pool, direction));
  setQuiz({
    source,
    direction,
    questions,
    idx: 0,
    score: 0,
    history: []
  });
  rerender();
}

function answer(btn, chosen, correct, optsEl) {
  const quiz = getQuiz();
  if (!quiz) return;
  optsEl.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);
  const correctBtn = Array.from(optsEl.querySelectorAll('.quiz-option')).find(b =>
    b.textContent.includes(correct)
  );
  const stage = document.querySelector('.quiz-stage');
  if (chosen === correct) {
    btn.classList.add('is-correct');
    confettiBurst(btn, { count: 70 });
    if (stage) {
      stage.classList.add('is-pulse-correct');
      setTimeout(() => stage.classList.remove('is-pulse-correct'), 800);
    }
    quiz.score++;
    quiz.history.push({ correct: true });
  } else {
    btn.classList.add('is-wrong');
    if (correctBtn) correctBtn.classList.add('is-correct');
    if (stage) {
      stage.classList.add('is-shake');
      setTimeout(() => stage.classList.remove('is-shake'), 600);
    }
    quiz.history.push({ correct: false });
  }
  setTimeout(() => {
    quiz.idx++;
    rerender();
  }, 1100);
}

function rerender() {
  renderQuiz(document.getElementById('app'));
}

export function handleQuizKey(e) {
  const quiz = getQuiz();
  if (!quiz || quiz.idx >= quiz.questions.length) return;
  if (e.key >= '1' && e.key <= '4') {
    const idx = parseInt(e.key) - 1;
    const btns = document.querySelectorAll('.quiz-option');
    if (btns[idx] && !btns[idx].disabled) btns[idx].click();
  }
}

export function resetQuizSession() { clearQuiz(); }

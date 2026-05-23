// Quiz · Session-State
let quiz = null;

export function getQuiz() {
  return quiz;
}

export function setQuiz(next) {
  quiz = next;
}

export function clearQuiz() {
  quiz = null;
}

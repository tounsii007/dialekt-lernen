// Hangman-Spiel-Logik (entkoppelt vom UI).
//
// API:
//   newGame(word, maxMistakes = 6) → GameState
//   guess(state, letter) → GameState (immutable, returns new state)
//   isWon(state), isLost(state)

/**
 * @typedef {Object} HangmanState
 * @property {string} word      — original word (lowercased)
 * @property {Set<string>} guessed — bereits geratene Buchstaben
 * @property {Set<string>} hits  — korrekt geratene Buchstaben
 * @property {number} mistakes
 * @property {number} maxMistakes
 */

export function newGame(word, maxMistakes = 6) {
  return {
    word: String(word || '').toLowerCase(),
    guessed: new Set(),
    hits: new Set(),
    mistakes: 0,
    maxMistakes,
  };
}

export function guess(state, letter) {
  const ltr = String(letter || '').toLowerCase().trim();
  if (!ltr || ltr.length !== 1) return state;
  if (state.guessed.has(ltr)) return state;

  const newGuessed = new Set(state.guessed);
  newGuessed.add(ltr);
  const newState = { ...state, guessed: newGuessed };

  // Hit oder Miss?
  if (state.word.includes(ltr)) {
    const newHits = new Set(state.hits);
    newHits.add(ltr);
    newState.hits = newHits;
  } else {
    newState.mistakes = state.mistakes + 1;
  }
  return newState;
}

export function isWon(state) {
  // Alle Buchstaben des Wortes (außer Leerzeichen/Sonderzeichen) wurden getroffen
  for (const ch of state.word) {
    if (!/[a-zäöüß]/.test(ch)) continue;
    if (!state.hits.has(ch)) return false;
  }
  return true;
}

export function isLost(state) {
  return state.mistakes >= state.maxMistakes;
}

/**
 * Display-String mit Lücken — z.B. „g e _ _ a _" für „gell"
 */
export function display(state) {
  return state.word
    .split('')
    .map(ch => {
      if (!/[a-zäöüß]/.test(ch)) return ch;
      return state.hits.has(ch) ? ch : '_';
    })
    .join(' ');
}

/**
 * Available unsused letters
 */
export function remainingAlphabet(state) {
  const all = 'abcdefghijklmnopqrstuvwxyzäöü'.split('');
  return all.filter(ch => !state.guessed.has(ch));
}

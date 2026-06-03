// Mini-Spiele — Memory: Ausdruck <-> Hochdeutsch zuordnen.
// Wähle Dialekt(e) und Schwierigkeit, decke Paare auf, gewinne XP.

import { el, go, toast, shuffle } from '../util.js';
import { DIALEKTE, ALLE_AUSDRUECKE } from '../../data/dialekte.js';
import { confettiBurst } from '../util/motion.js';
import { sfx } from '../util/sounds.js';
import { awardXp } from '../store/xp.js';

// Persistenz der zuletzt gewählten Optionen (memory-only — kein localStorage nötig).
let lastOptions = { dialektIds: [], difficulty: 4 };
let activeGame = null; // damit Karten-Klicks die Spiel-Instanz erreichen

const DIFFICULTIES = [
  { value: 4, label: '4 × 4', pairs: 8,  description: '8 Paare · entspannt' },
  { value: 6, label: '6 × 6', pairs: 18, description: '18 Paare · Profi' }
];

export function renderSpiele(root) {
  root.innerHTML = '';
  activeGame = null;
  const view = el('div', { class: 'view spiele-view' });

  view.appendChild(el('div', { class: 'section-head' },
    el('div', {},
      el('h2', {}, '🎮 Mini-Spiele'),
      el('div', { class: 'lede' }, 'Memory: Decke gleiche Ausdrucks-Übersetzung-Paare auf. Je weniger Versuche, desto besser.')
    )
  ));

  view.appendChild(renderSetup());
  root.appendChild(view);
}

function renderSetup() {
  const setup = el('section', { class: 'section spiele-setup', dataset: { reveal: '' } });

  setup.appendChild(el('h3', {}, 'Dialekt-Auswahl'));
  setup.appendChild(el('div', { class: 'lede', style: { marginBottom: '12px' } },
    'Lass leer für „alle Dialekte" — sonst klicke einen oder mehrere zum Filtern.'
  ));

  const chips = el('div', { class: 'spiele-dialekt-chips' });
  const selected = new Set(lastOptions.dialektIds);

  DIALEKTE.forEach(d => {
    const chip = el('button', {
      class: 'spiele-chip' + (selected.has(d.id) ? ' is-on' : ''),
      style: { '--dc': d.farbe },
      onClick: () => {
        if (selected.has(d.id)) selected.delete(d.id);
        else selected.add(d.id);
        chip.classList.toggle('is-on');
        sfx.click();
      }
    },
      el('span', { class: 'spiele-chip-flag' }, d.flag),
      el('span', {}, d.name)
    );
    chips.appendChild(chip);
  });
  setup.appendChild(chips);

  setup.appendChild(el('h3', { style: { marginTop: '24px' } }, 'Schwierigkeit'));

  let chosenDifficulty = lastOptions.difficulty;
  const diffRow = el('div', { class: 'spiele-difficulty-row' });
  DIFFICULTIES.forEach(diff => {
    const card = el('button', {
      class: 'spiele-diff-card' + (chosenDifficulty === diff.value ? ' is-on' : ''),
      onClick: () => {
        chosenDifficulty = diff.value;
        diffRow.querySelectorAll('.spiele-diff-card').forEach(c => c.classList.remove('is-on'));
        card.classList.add('is-on');
        sfx.click();
      }
    },
      el('div', { class: 'spiele-diff-label' }, diff.label),
      el('div', { class: 'spiele-diff-desc' }, diff.description)
    );
    diffRow.appendChild(card);
  });
  setup.appendChild(diffRow);

  const startBtn = el('button', {
    class: 'btn btn-primary',
    style: { marginTop: '24px' },
    dataset: { magnetic: '12' },
    onClick: () => {
      const ids = Array.from(selected);
      lastOptions = { dialektIds: ids, difficulty: chosenDifficulty };
      const diff = DIFFICULTIES.find(d => d.value === chosenDifficulty) || DIFFICULTIES[0];
      const pool = buildPool(ids);
      if (pool.length < diff.pairs) {
        toast(`Nicht genug Ausdrücke für ${diff.pairs} Paare. Wähle weniger Filter oder eine kleinere Schwierigkeit.`, 'info', 2800);
        return;
      }
      sfx.open();
      startGame(diff, pool);
    }
  }, '▶ Spiel starten');
  setup.appendChild(startBtn);

  return setup;
}

function buildPool(dialektIds) {
  let source = ALLE_AUSDRUECKE;
  if (dialektIds.length) {
    const set = new Set(dialektIds);
    source = ALLE_AUSDRUECKE.filter(a => set.has(a.dialektId));
  }
  // Sicherstellen, dass die deutschen Übersetzungen einzigartig sind —
  // sonst zeigt das Spiel doppelte Karten mit gleichem Text auf der Front.
  const seenHd = new Set();
  const unique = [];
  for (const a of source) {
    const key = (a.hochdeutsch || '').toLowerCase().trim();
    if (!key || seenHd.has(key)) continue;
    seenHd.add(key);
    unique.push(a);
  }
  return unique;
}

function startGame(difficulty, pool) {
  const root = document.querySelector('.spiele-view');
  if (!root) return;

  // Pool mischen, n Paare ziehen
  const chosen = shuffle(pool).slice(0, difficulty.pairs);

  // Karten bauen: für jedes Ausdruck-Objekt 2 Karten (Ausdruck + Hochdeutsch).
  const cards = [];
  chosen.forEach((a, idx) => {
    const pairId = 'p' + idx;
    cards.push({
      id: pairId + '-a',
      pairId,
      side: 'ausdruck',
      text: a.ausdruck,
      dialektFlag: a.dialektFlag,
      dialektFarbe: a.dialektFarbe,
      dialektName: a.dialektName,
      flipped: false,
      matched: false
    });
    cards.push({
      id: pairId + '-b',
      pairId,
      side: 'hochdeutsch',
      text: a.hochdeutsch,
      dialektFlag: a.dialektFlag,
      dialektFarbe: a.dialektFarbe,
      dialektName: a.dialektName,
      flipped: false,
      matched: false
    });
  });

  const game = {
    cards: shuffle(cards),
    difficulty,
    moves: 0,
    matches: 0,
    locked: false,
    selected: [],   // bis zu zwei aktive Karten
    startTime: Date.now(),
    finished: false,
    timerInterval: null
  };
  activeGame = game;

  root.innerHTML = '';
  root.appendChild(renderGameView(game));

  // Timer aktualisieren — stoppt sich selbst, sobald die Spiel-View weg ist
  // (Router ersetzt #app via innerHTML; sonst liefe das Intervall ewig weiter).
  game.timerInterval = setInterval(() => {
    const el = root.querySelector('[data-mem-timer]');
    if (!el || activeGame !== game) { clearInterval(game.timerInterval); return; }
    el.textContent = formatElapsed(Date.now() - game.startTime);
  }, 500);
}

function renderGameView(game) {
  const wrap = el('div', { class: 'spiele-game' });

  // HUD
  wrap.appendChild(el('div', { class: 'spiele-hud' },
    el('div', { class: 'spiele-hud-stat' },
      el('div', { class: 'spiele-hud-label' }, 'Versuche'),
      el('div', { class: 'spiele-hud-value', dataset: { memMoves: '' } }, '0')
    ),
    el('div', { class: 'spiele-hud-stat' },
      el('div', { class: 'spiele-hud-label' }, 'Paare'),
      el('div', { class: 'spiele-hud-value', dataset: { memMatches: '' } }, `0 / ${game.difficulty.pairs}`)
    ),
    el('div', { class: 'spiele-hud-stat' },
      el('div', { class: 'spiele-hud-label' }, 'Zeit'),
      el('div', { class: 'spiele-hud-value', dataset: { memTimer: '' } }, '00:00')
    ),
    el('button', {
      class: 'btn btn-ghost',
      style: { marginLeft: 'auto' },
      onClick: () => {
        cleanupGame();
        renderSpiele(document.querySelector('#app'));
      }
    }, '↺ Neues Spiel')
  ));

  // Grid
  const cols = game.difficulty.value;
  const grid = el('div', {
    class: 'memory-grid',
    style: { '--mem-cols': String(cols) },
    dataset: { memGrid: '' }
  });
  game.cards.forEach(card => grid.appendChild(renderMemoryCard(card)));
  wrap.appendChild(grid);

  return wrap;
}

function renderMemoryCard(card) {
  const cardEl = el('button', {
    class: 'memory-card',
    dataset: { memCard: card.id },
    style: { '--dc': card.dialektFarbe || 'var(--brand)' },
    'aria-label': 'Memory-Karte umdrehen',
    onClick: () => handleCardClick(card.id)
  },
    el('div', { class: 'memory-card-inner' },
      el('div', { class: 'memory-card-face memory-card-back' },
        el('span', { class: 'memory-card-back-mark' }, '?')
      ),
      el('div', { class: 'memory-card-face memory-card-front', 'aria-hidden': 'true' },
        el('div', { class: 'memory-card-flag' }, card.dialektFlag || ''),
        el('div', { class: 'memory-card-text' }, card.text),
        el('div', { class: 'memory-card-side' },
          card.side === 'ausdruck' ? 'Dialekt' : 'Hochdeutsch'
        )
      )
    )
  );
  return cardEl;
}

function handleCardClick(cardId) {
  const game = activeGame;
  if (!game || game.locked || game.finished) return;
  const card = game.cards.find(c => c.id === cardId);
  if (!card || card.matched || card.flipped) return;

  card.flipped = true;
  setFlipped(cardId, true, 'is-flipped');
  sfx.click();
  game.selected.push(card);

  if (game.selected.length < 2) return;

  // Zweite Karte gewählt — Versuch werten
  game.moves += 1;
  const movesEl = document.querySelector('[data-mem-moves]');
  if (movesEl) movesEl.textContent = String(game.moves);

  const [a, b] = game.selected;
  if (a.pairId === b.pairId) {
    // Match
    a.matched = true;
    b.matched = true;
    game.matches += 1;
    game.selected = [];
    const matchesEl = document.querySelector('[data-mem-matches]');
    if (matchesEl) matchesEl.textContent = `${game.matches} / ${game.difficulty.pairs}`;
    setFlipped(a.id, true, 'is-matched');
    setFlipped(b.id, true, 'is-matched');
    sfx.correct();
    // Confetti am gematchten Paar
    const matchedEl = document.querySelector(`[data-mem-card="${a.id}"]`);
    if (matchedEl) confettiBurst(matchedEl, { count: 32 });

    if (game.matches >= game.difficulty.pairs) {
      finishGame();
    }
  } else {
    // Miss
    game.locked = true;
    setTimeout(() => {
      a.flipped = false;
      b.flipped = false;
      setFlipped(a.id, false, 'is-flipped');
      setFlipped(b.id, false, 'is-flipped');
      game.selected = [];
      game.locked = false;
    }, 900);
  }
}

function setFlipped(cardId, on, cls) {
  const node = document.querySelector(`[data-mem-card="${cardId}"]`);
  if (!node) return;
  node.classList.toggle(cls, on);
  // A11y: eine verdeckte Karte darf ihren Inhalt nicht verraten (sonst könnten
  // Screenreader die Lösung vorlesen). Aufgedeckt/gematcht liest der
  // Screenreader den Text + die Seite statt „umdrehen".
  const front = node.querySelector('.memory-card-front');
  if (on) {
    const card = activeGame?.cards.find(c => c.id === cardId);
    if (card) {
      const seite = card.side === 'ausdruck' ? 'Dialekt' : 'Hochdeutsch';
      node.setAttribute('aria-label', `${card.text}, ${seite}`);
    }
    if (front) front.removeAttribute('aria-hidden');
  } else {
    node.setAttribute('aria-label', 'Memory-Karte umdrehen');
    if (front) front.setAttribute('aria-hidden', 'true');
  }
}

function finishGame() {
  const game = activeGame;
  if (!game || game.finished) return;
  game.finished = true;
  if (game.timerInterval) {
    clearInterval(game.timerInterval);
    game.timerInterval = null;
  }
  const elapsed = Date.now() - game.startTime;

  // XP-Belohnung — etwas mehr für die größere Schwierigkeit.
  const xp = game.difficulty.pairs >= 18 ? 100 : 50;
  awardXp(xp, 'memory-win');
  sfx.unlock();

  const grid = document.querySelector('[data-mem-grid]');
  if (grid) confettiBurst(grid, { count: 120 });

  toast(`🏆 Geschafft in ${game.moves} Versuchen · ${formatElapsed(elapsed)} · +${xp} XP`, 'success', 3600);

  // Abschluss-Overlay
  const view = document.querySelector('.spiele-view');
  if (!view) return;
  const summary = el('div', { class: 'spiele-summary card', dataset: { spotlight: '' } },
    el('h3', {}, '🎉 Alle Paare gefunden!'),
    el('div', { class: 'spiele-summary-row' },
      el('div', {},
        el('div', { class: 'spiele-summary-label' }, 'Versuche'),
        el('div', { class: 'spiele-summary-value' }, String(game.moves))
      ),
      el('div', {},
        el('div', { class: 'spiele-summary-label' }, 'Zeit'),
        el('div', { class: 'spiele-summary-value' }, formatElapsed(elapsed))
      ),
      el('div', {},
        el('div', { class: 'spiele-summary-label' }, 'XP'),
        el('div', { class: 'spiele-summary-value' }, `+${xp}`)
      )
    ),
    el('div', { class: 'spiele-summary-actions' },
      el('button', {
        class: 'btn btn-primary',
        onClick: () => {
          cleanupGame();
          renderSpiele(document.querySelector('#app'));
        }
      }, '↺ Nochmal'),
      el('button', {
        class: 'btn btn-ghost',
        onClick: () => go('#/lernen')
      }, '📗 Weiterlernen')
    )
  );
  view.appendChild(summary);
}

function cleanupGame() {
  if (activeGame?.timerInterval) {
    clearInterval(activeGame.timerInterval);
  }
  activeGame = null;
}

function formatElapsed(ms) {
  const s = Math.floor(ms / 1000);
  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

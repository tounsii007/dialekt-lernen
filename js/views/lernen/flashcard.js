// Karteikarten-Modus · Aktive Karte mit Bewertung
// Drag/swipe: left = schwer, right = leicht, up = mittel.
import { el, speak, toast } from '../../util.js';
import { setLernstand, isFavorit, toggleFavorit } from '../../store.js';
import { confettiBurst } from '../../util/motion.js';
import { icon } from '../../util/icons.js';
import { sfx, vibrate } from '../../util/sounds.js';
import { createWaveform } from '../../util/waveform.js';
import { ALLE_AUSDRUECKE } from '../../../data/dialekte.js';

const SWIPE_THRESHOLD = 110;
const ROTATE_FACTOR = 0.06;

export function renderFlashcard(session, { onPrev, onRate, onAbort, onRerender, onFlip }) {
  const c = session.cards[session.idx];
  const total = session.cards.length;
  const progress = ((session.idx) / total) * 100;
  const fav = isFavorit(c.dialektId, c.id);

  const wrap = el('div', { class: 'flashcard-stage' });

  wrap.appendChild(el('div', { class: 'flashcard-progress' },
    el('button', { class: 'btn btn-ghost', style: { padding: '8px 16px' }, onClick: onAbort },
      el('span', { html: '←' }), ' Auswahl'
    ),
    el('div', { class: 'fc-pbar' },
      el('div', { class: 'fc-pbar-fill', style: { width: progress + '%' } })
    ),
    el('div', { class: 'fc-counter' }, `${session.idx + 1} / ${total}`)
  ));

  const mode = session.mode || 'normal';
  const card = el('div', { class: 'flashcard mode-' + mode + (session.flipped ? ' is-flipped' : '') });
  const inner = el('div', { class: 'flashcard-inner' });

  // Front/Back content variiert nach Modus
  const front = el('div', { class: 'flashcard-face front', onClick: () => onFlip(card) });
  const back = el('div', { class: 'flashcard-face back', onClick: () => onFlip(card), style: { background: `linear-gradient(135deg, ${c.dialektFarbe} 0%, ${c.dialektFarbe}cc 100%)` } });

  if (mode === 'reverse') {
    // Hochdeutsch zuerst, Dialekt-Ausdruck als Antwort
    front.appendChild(el('div', { class: 'fc-label' }, 'Hochdeutsch · ' + c.dialektFlag + ' ' + c.dialektName));
    front.appendChild(el('div', { class: 'fc-expr' }, c.hochdeutsch));
    front.appendChild(el('div', { class: 'fc-hint' }, 'Welcher Ausdruck im Dialekt?'));
    back.appendChild(el('div', { class: 'fc-label' }, 'Antwort'));
    back.appendChild(el('div', { class: 'fc-expr is-speakable' }, c.ausdruck));
    back.appendChild(el('div', { class: 'fc-meaning' }, c.bedeutung));
  } else if (mode === 'audio') {
    // Nur Hören → dann antworten
    front.appendChild(el('div', { class: 'fc-label' }, c.dialektFlag + ' ' + c.dialektName));
    front.appendChild(el('div', { class: 'fc-audio-only' },
      el('button', {
        class: 'fc-big-speak',
        onClick: (e) => { e.stopPropagation(); sfx.click(); speak(c.ausdruck); },
        title: 'Anhören'
      },
        icon('speaker', { size: 48 }),
        el('div', { class: 'fc-big-speak-hint' }, 'Klicken zum Hören')
      )
    ));
    front.appendChild(el('div', { class: 'fc-hint' }, 'Hör genau hin — Karte umdrehen für Auflösung'));
    back.appendChild(el('div', { class: 'fc-label' }, 'Auflösung'));
    back.appendChild(el('div', { class: 'fc-expr' }, c.ausdruck));
    back.appendChild(el('div', { class: 'fc-hd' }, '↦ ' + c.hochdeutsch));
    back.appendChild(el('div', { class: 'fc-meaning' }, c.bedeutung));
    // Auto-play beim Erscheinen
    setTimeout(() => speak(c.ausdruck), 200);
  } else if (mode === 'type') {
    // Tipp-Modus: User tippt die Hochdeutsch-Übersetzung
    front.appendChild(el('div', { class: 'fc-label' }, c.dialektFlag + ' ' + c.dialektName));
    front.appendChild(el('div', { class: 'fc-expr is-speakable' }, c.ausdruck));
    const input = el('input', {
      class: 'fc-type-input',
      type: 'text',
      placeholder: 'Antwort eintippen…',
      autocomplete: 'off',
      spellcheck: 'false'
    });
    const feedback = el('div', { class: 'fc-type-feedback' });
    front.appendChild(el('div', { class: 'fc-type-form', onClick: (e) => e.stopPropagation() },
      input, feedback,
      el('button', {
        class: 'btn btn-primary',
        onClick: () => {
          const ok = checkTypedAnswer(input.value, c.hochdeutsch);
          const distance = levenshteinSimple(normalizeForType(input.value), normalizeForType(c.hochdeutsch));
          feedback.classList.remove('is-ok', 'is-close', 'is-wrong');
          if (ok) feedback.classList.add('is-ok');
          else if (distance <= 2) feedback.classList.add('is-close');
          else feedback.classList.add('is-wrong');
          feedback.textContent = ok ? '✓ Richtig — ' + c.hochdeutsch
            : distance <= 2 ? '◐ Fast — ' + c.hochdeutsch
            : '✗ ' + c.hochdeutsch;
          onFlip(card);
        }
      }, 'Prüfen')
    ));
    setTimeout(() => input.focus(), 80);
    back.appendChild(el('div', { class: 'fc-label' }, 'Lösung'));
    back.appendChild(el('div', { class: 'fc-hd' }, c.hochdeutsch));
    back.appendChild(el('div', { class: 'fc-meaning' }, c.bedeutung));
  } else if (mode === 'mc') {
    // Multiple Choice — 4 Optionen, kein Flip nötig
    front.appendChild(el('div', { class: 'fc-label' }, c.dialektFlag + ' ' + c.dialektName));
    front.appendChild(el('div', { class: 'fc-expr is-speakable' }, c.ausdruck));
    front.appendChild(el('div', { class: 'fc-hint fc-mc-hint' }, 'Wähle die richtige Bedeutung:'));
    const choices = buildMcChoices(c, ALLE_AUSDRUECKE);
    const optRow = el('div', { class: 'fc-mc-options', onClick: (e) => e.stopPropagation() });
    let answered = false;
    choices.forEach((opt) => {
      const btn = el('button', {
        class: 'fc-mc-opt',
        onClick: () => {
          if (answered) return;
          answered = true;
          const correct = opt.hochdeutsch === c.hochdeutsch;
          // Reveal all correct/wrong states
          optRow.querySelectorAll('.fc-mc-opt').forEach(b => {
            if (b.dataset.answer === c.hochdeutsch) b.classList.add('mc-correct');
          });
          btn.classList.add(correct ? 'mc-correct' : 'mc-wrong');
          if (correct) {
            sfx.correct();
            vibrate([10, 30, 10]);
            confettiBurst(btn, { count: 40 });
            setTimeout(() => { rateAndPersist(c, 3, session, onRate); }, 800);
          } else {
            sfx.wrong();
            vibrate([12, 60, 12]);
            setTimeout(() => { rateAndPersist(c, 1, session, onRate); }, 1200);
          }
        }
      }, opt.hochdeutsch);
      btn.dataset.answer = opt.hochdeutsch;
      optRow.appendChild(btn);
    });
    front.appendChild(optRow);
    back.appendChild(el('div', { class: 'fc-label' }, 'Bedeutung'));
    back.appendChild(el('div', { class: 'fc-hd' }, c.hochdeutsch));
    back.appendChild(el('div', { class: 'fc-meaning' }, c.bedeutung));
  } else {
    // Klassisch
    front.appendChild(el('div', { class: 'fc-label' }, c.dialektFlag + ' ' + c.dialektName));
    front.appendChild(el('div', { class: 'fc-expr is-speakable' }, c.ausdruck));
    front.appendChild(el('div', { class: 'fc-hint' }, 'Klicken / Leertaste umdrehen · ziehen zum Bewerten'));
    back.appendChild(el('div', { class: 'fc-label' }, 'Bedeutung'));
    back.appendChild(el('div', { class: 'fc-hd' }, c.hochdeutsch));
    back.appendChild(el('div', { class: 'fc-meaning' }, c.bedeutung));
    back.appendChild(el('div', { class: 'fc-hint' }, 'Wie war\'s? Bewerte unten · oder wische →'));
  }

  inner.appendChild(front);
  inner.appendChild(back);

  card.appendChild(inner);

  // Swipe overlay labels
  card.appendChild(el('div', { class: 'fc-swipe-cue cue-hard' },  'Schwer'));
  card.appendChild(el('div', { class: 'fc-swipe-cue cue-med' },   'Mittel'));
  card.appendChild(el('div', { class: 'fc-swipe-cue cue-easy' },  'Leicht'));

  bindDrag(card, (stand) => {
    rateAndPersist(c, stand, session, onRate);
  });

  wrap.appendChild(card);

  wrap.appendChild(el('div', { class: 'flashcard-controls' },
    el('button', { class: 'fc-btn', onClick: onPrev, disabled: session.idx === 0, title: 'Zurück' },
      el('span', { html: '←' })
    ),
    el('div', { class: 'fc-rating' },
      el('button', { class: 'fc-rate hard', onClick: () => { sfx.rate(1); vibrate(8);  rateAndPersist(c, 1, session, onRate); } }, 'Schwer'),
      el('button', { class: 'fc-rate med',  onClick: () => { sfx.rate(2); vibrate(12); rateAndPersist(c, 2, session, onRate); } }, 'Mittel'),
      el('button', { class: 'fc-rate easy', onClick: (e) => { sfx.rate(3); vibrate([10, 40, 10]); confettiBurst(e.currentTarget, { count: 60 }); rateAndPersist(c, 3, session, onRate); } }, 'Leicht')
    ),
    speakControl(c)
  ));

  wrap.appendChild(el('div', { style: { textAlign: 'center', marginTop: '20px' } },
    el('button', {
      class: 'btn btn-ghost',
      onClick: () => {
        const added = toggleFavorit(c.dialektId, c.id);
        toast(added ? 'Zu Favoriten hinzugefügt ♥' : 'Aus Favoriten entfernt', 'success', 1400);
        onRerender();
      }
    }, fav ? '♥ Aus Favoriten' : '♡ Zu Favoriten')
  ));

  return wrap;
}

function rateAndPersist(card, stand, session, onRate) {
  setLernstand(card.dialektId, card.id, stand);
  onRate(stand);
}

function normalizeForType(s) {
  return String(s || '').toLowerCase()
    .normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ').trim();
}

function levenshteinSimple(a, b) {
  if (a === b) return 0;
  if (!a || !b) return Math.max(a.length, b.length);
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

function checkTypedAnswer(user, expected) {
  const u = normalizeForType(user);
  const e = normalizeForType(expected);
  if (!u) return false;
  if (u === e) return true;
  // Akzeptiere kleine Tippfehler je nach Länge
  const maxDist = e.length <= 5 ? 1 : e.length <= 10 ? 2 : 3;
  return levenshteinSimple(u, e) <= maxDist;
}

function speakControl(c) {
  const canvas = el('canvas', { class: 'fc-speak-canvas' });
  const btn = el('button', {
    class: 'fc-btn fc-speak',
    onClick: () => { sfx.click(); vibrate(6); speak(c.ausdruck); },
    title: 'Anhören'
  },
    el('div', { class: 'speak-icon' }, icon('speaker', { size: 20 })),
    canvas
  );
  // Activate waveform after attach
  setTimeout(() => createWaveform(canvas, { bars: 22, glow: true }), 0);
  return btn;
}

function bindDrag(card, onRate) {
  let startX = 0, startY = 0;
  let dx = 0, dy = 0;
  let dragging = false;
  let pointerId = null;

  const setTransform = (x, y) => {
    const rot = x * ROTATE_FACTOR;
    card.style.setProperty('--drag-x', x.toFixed(1) + 'px');
    card.style.setProperty('--drag-y', y.toFixed(1) + 'px');
    card.style.setProperty('--drag-rot', rot.toFixed(2) + 'deg');
    // Cue opacity
    const absX = Math.abs(x);
    card.classList.toggle('drag-right', x >  SWIPE_THRESHOLD * 0.35);
    card.classList.toggle('drag-left',  x < -SWIPE_THRESHOLD * 0.35);
    card.classList.toggle('drag-up',    y < -SWIPE_THRESHOLD * 0.45 && absX < 60);
  };

  const reset = () => {
    card.classList.remove('is-dragging', 'drag-right', 'drag-left', 'drag-up');
    card.style.setProperty('--drag-x', '0px');
    card.style.setProperty('--drag-y', '0px');
    card.style.setProperty('--drag-rot', '0deg');
  };

  card.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.flashcard-face')?.tagName === 'BUTTON') return;
    dragging = true;
    pointerId = e.pointerId;
    startX = e.clientX; startY = e.clientY;
    dx = dy = 0;
    card.setPointerCapture(pointerId);
    card.classList.add('is-dragging');
  });
  card.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    dx = e.clientX - startX;
    dy = e.clientY - startY;
    setTransform(dx, dy);
  }, { passive: true });
  const finish = (cancel = false) => {
    if (!dragging) return;
    dragging = false;
    if (pointerId != null) {
      try { card.releasePointerCapture(pointerId); } catch {}
      pointerId = null;
    }
    if (cancel) { reset(); return; }
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    let rated = false;
    if (absX > SWIPE_THRESHOLD && absX >= absY) {
      // fly off and rate
      const dir = dx > 0 ? 1 : -1;
      card.classList.add(dir > 0 ? 'is-flying-right' : 'is-flying-left');
      sfx.swipe();
      vibrate(dir > 0 ? [10, 30, 10] : 8);
      setTimeout(() => onRate(dir > 0 ? 3 : 1), 250);
      rated = true;
    } else if (-dy > SWIPE_THRESHOLD * 0.85) {
      card.classList.add('is-flying-up');
      sfx.swipe();
      vibrate(12);
      setTimeout(() => onRate(2), 250);
      rated = true;
    }
    if (!rated) reset();
  };
  card.addEventListener('pointerup', () => finish(false));
  card.addEventListener('pointercancel', () => finish(true));
  card.addEventListener('lostpointercapture', () => finish(true));
}

function buildMcChoices(card, allExpr, count = 4) {
  // Collect distractors: same kategorie preferred, then random
  const same = allExpr.filter(e =>
    e.hochdeutsch !== card.hochdeutsch &&
    e.hochdeutsch &&
    e.id !== card.id &&
    e.kategorie === card.kategorie
  );
  const other = allExpr.filter(e =>
    e.hochdeutsch !== card.hochdeutsch &&
    e.hochdeutsch &&
    e.id !== card.id &&
    e.kategorie !== card.kategorie
  );
  // Shuffle and pick
  const pool = [...shuffleArr(same), ...shuffleArr(other)];
  // Deduplicate by hochdeutsch
  const seen = new Set([card.hochdeutsch]);
  const distractors = [];
  for (const e of pool) {
    if (distractors.length >= count - 1) break;
    if (!seen.has(e.hochdeutsch)) {
      seen.add(e.hochdeutsch);
      distractors.push(e);
    }
  }
  const choices = [card, ...distractors].slice(0, count);
  return shuffleArr(choices);
}

function shuffleArr(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

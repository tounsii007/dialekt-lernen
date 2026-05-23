// Karteikarten-Modus · Aktive Karte mit Bewertung
// Drag/swipe: left = schwer, right = leicht, up = mittel.
import { el, speak, toast } from '../../util.js';
import { setLernstand, isFavorit, toggleFavorit } from '../../store.js';
import { confettiBurst } from '../../util/motion.js';
import { icon } from '../../util/icons.js';

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

  const card = el('div', { class: 'flashcard' + (session.flipped ? ' is-flipped' : '') });
  const inner = el('div', { class: 'flashcard-inner' });

  inner.appendChild(el('div', { class: 'flashcard-face front', onClick: () => onFlip(card) },
    el('div', { class: 'fc-label' }, `${c.dialektFlag} ${c.dialektName}`),
    el('div', { class: 'fc-expr is-speakable' }, c.ausdruck),
    el('div', { class: 'fc-hint' }, 'Klicken / Leertaste umdrehen · ziehen zum Bewerten')
  ));

  inner.appendChild(el('div', { class: 'flashcard-face back', onClick: () => onFlip(card), style: { background: `linear-gradient(135deg, ${c.dialektFarbe} 0%, ${c.dialektFarbe}cc 100%)` } },
    el('div', { class: 'fc-label' }, 'Bedeutung'),
    el('div', { class: 'fc-hd' }, c.hochdeutsch),
    el('div', { class: 'fc-meaning' }, c.bedeutung),
    el('div', { class: 'fc-hint' }, 'Wie war\'s? Bewerte unten · oder wische →')
  ));

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
      el('button', { class: 'fc-rate hard', onClick: () => rateAndPersist(c, 1, session, onRate) }, 'Schwer'),
      el('button', { class: 'fc-rate med',  onClick: () => rateAndPersist(c, 2, session, onRate) }, 'Mittel'),
      el('button', { class: 'fc-rate easy', onClick: (e) => { confettiBurst(e.currentTarget, { count: 60 }); rateAndPersist(c, 3, session, onRate); } }, 'Leicht')
    ),
    el('button', { class: 'fc-btn fc-speak', onClick: () => speak(c.ausdruck), title: 'Anhören' },
      el('div', { class: 'speak-icon' }, icon('speaker', { size: 20 })),
      el('div', { class: 'speak-wave', html: '<i></i><i></i><i></i><i></i><i></i>' })
    )
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
      setTimeout(() => onRate(dir > 0 ? 3 : 1), 250);
      rated = true;
    } else if (-dy > SWIPE_THRESHOLD * 0.85) {
      card.classList.add('is-flying-up');
      setTimeout(() => onRate(2), 250);
      rated = true;
    }
    if (!rated) reset();
  };
  card.addEventListener('pointerup', () => finish(false));
  card.addEventListener('pointercancel', () => finish(true));
  card.addEventListener('lostpointercapture', () => finish(true));
}

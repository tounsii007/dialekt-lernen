// Karteikarten-Modus · Aktive Karte mit Bewertung
import { el, speak, toast } from '../../util.js';
import { setLernstand, isFavorit, toggleFavorit } from '../../store.js';

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
    el('div', { class: 'fc-expr' }, c.ausdruck),
    el('div', { class: 'fc-hint' }, 'Klicken oder Leertaste zum Umdrehen')
  ));

  inner.appendChild(el('div', { class: 'flashcard-face back', onClick: () => onFlip(card), style: { background: `linear-gradient(135deg, ${c.dialektFarbe} 0%, ${c.dialektFarbe}cc 100%)` } },
    el('div', { class: 'fc-label' }, 'Bedeutung'),
    el('div', { class: 'fc-hd' }, c.hochdeutsch),
    el('div', { class: 'fc-meaning' }, c.bedeutung),
    el('div', { class: 'fc-hint' }, 'Wie war\'s? Bewerte unten')
  ));

  card.appendChild(inner);
  wrap.appendChild(card);

  wrap.appendChild(el('div', { class: 'flashcard-controls' },
    el('button', { class: 'fc-btn', onClick: onPrev, disabled: session.idx === 0, title: 'Zurück' },
      el('span', { html: '←' })
    ),
    el('div', { class: 'fc-rating' },
      el('button', { class: 'fc-rate hard', onClick: () => rateAndPersist(c, 1, session, onRate) }, 'Schwer'),
      el('button', { class: 'fc-rate med', onClick: () => rateAndPersist(c, 2, session, onRate) }, 'Mittel'),
      el('button', { class: 'fc-rate easy', onClick: () => rateAndPersist(c, 3, session, onRate) }, 'Leicht')
    ),
    el('button', { class: 'fc-btn', onClick: () => speak(c.ausdruck), title: 'Anhören' },
      el('span', { html: '🔊' })
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

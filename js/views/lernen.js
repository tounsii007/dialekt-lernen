// Karteikarten-Modus
import { el, go, shuffle, speak, toast } from '../util.js';
import { DIALEKTE, getDialekt, ALLE_AUSDRUECKE } from '../../data/dialekte.js';
import { setLernstand, getLernstand, isFavorit, toggleFavorit } from '../store.js';

let session = null;

export function renderLernen(root, params) {
  root.innerHTML = '';
  const view = el('div', { class: 'view' });

  // Setup-Screen
  if (!session) {
    view.appendChild(renderSetup(root, params));
    root.appendChild(view);
    return;
  }

  // Session abgeschlossen
  if (session.idx >= session.cards.length) {
    view.appendChild(renderSummary());
    root.appendChild(view);
    return;
  }

  view.appendChild(renderFlashcard());
  root.appendChild(view);
}

function renderSetup(root, params) {
  const container = el('div', {});

  container.appendChild(el('div', { class: 'section-head' },
    el('div', {},
      el('h2', {}, '🃏 Karteikarten lernen'),
      el('div', { class: 'lede' }, 'Wähle eine Quelle und lerne im eigenen Tempo. Wische, klicke oder nutze die Pfeiltasten.')
    )
  ));

  // Quellen-Auswahl
  const opts = el('div', { class: 'dialekt-grid' });

  const allCard = el('button', {
    class: 'dialekt-card',
    style: { '--dc': '#8338ec' },
    onClick: () => startSession({ source: 'all' })
  },
    el('span', { class: 'dc-flag' }, '🌍'),
    el('div', { class: 'dc-name' }, 'Alle Dialekte'),
    el('div', { class: 'dc-region' }, 'Bunte Mischung'),
    el('div', { class: 'dc-desc' }, 'Lerne quer durch alle Regionen. Ideal zum Auffrischen.'),
    el('div', { class: 'dc-foot' },
      el('span', { class: 'dc-count' }, `${ALLE_AUSDRUECKE.length} Karten`),
      el('span', { class: 'dc-arrow' }, el('span', { html: '→' }))
    )
  );
  opts.appendChild(allCard);

  DIALEKTE.forEach(d => {
    const c = el('button', {
      class: 'dialekt-card',
      style: { '--dc': d.farbe },
      onClick: () => startSession({ source: d.id })
    },
      el('span', { class: 'dc-flag' }, d.flag),
      el('div', { class: 'dc-name' }, d.name),
      el('div', { class: 'dc-region' }, d.region),
      el('div', { class: 'dc-desc' }, `Lerne die wichtigsten Ausdrücke aus ${d.bundesland}.`),
      el('div', { class: 'dc-foot' },
        el('span', { class: 'dc-count' }, `${d.ausdruecke.length} Karten`),
        el('span', { class: 'dc-arrow' }, el('span', { html: '→' }))
      )
    );
    opts.appendChild(c);
  });

  container.appendChild(opts);

  // Auto-start if dialekt param vorhanden
  if (params?.dialekt) {
    setTimeout(() => startSession({ source: params.dialekt }), 50);
  }

  return container;
}

function startSession({ source }) {
  let cards = [];
  let title = '';
  if (source === 'all') {
    cards = ALLE_AUSDRUECKE.slice();
    title = 'Alle Dialekte';
  } else {
    const d = getDialekt(source);
    if (!d) return;
    cards = d.ausdruecke.map(a => ({ ...a, dialektId: d.id, dialektName: d.name, dialektFlag: d.flag, dialektFarbe: d.farbe }));
    title = d.name;
  }
  session = {
    title,
    cards: shuffle(cards),
    idx: 0,
    flipped: false,
    rated: { easy: 0, med: 0, hard: 0 }
  };
  renderLernen(document.getElementById('app'));
}

function renderFlashcard() {
  const c = session.cards[session.idx];
  const total = session.cards.length;
  const progress = ((session.idx) / total) * 100;
  const fav = isFavorit(c.dialektId, c.id);

  const wrap = el('div', { class: 'flashcard-stage' });

  // Header bar
  wrap.appendChild(el('div', { class: 'flashcard-progress' },
    el('button', { class: 'btn btn-ghost', style: { padding: '8px 16px' }, onClick: () => { session = null; renderLernen(document.getElementById('app')); } },
      el('span', { html: '←' }), ' Auswahl'
    ),
    el('div', { class: 'fc-pbar' },
      el('div', { class: 'fc-pbar-fill', style: { width: progress + '%' } })
    ),
    el('div', { class: 'fc-counter' }, `${session.idx + 1} / ${total}`)
  ));

  // Card
  const card = el('div', { class: 'flashcard' + (session.flipped ? ' is-flipped' : '') });
  const inner = el('div', { class: 'flashcard-inner' });

  // Front
  inner.appendChild(el('div', { class: 'flashcard-face front', onClick: () => flip(card) },
    el('div', { class: 'fc-label' }, `${c.dialektFlag} ${c.dialektName}`),
    el('div', { class: 'fc-expr' }, c.ausdruck),
    el('div', { class: 'fc-hint' }, 'Klicken oder Leertaste zum Umdrehen')
  ));

  // Back
  inner.appendChild(el('div', { class: 'flashcard-face back', onClick: () => flip(card), style: { background: `linear-gradient(135deg, ${c.dialektFarbe} 0%, ${c.dialektFarbe}cc 100%)` } },
    el('div', { class: 'fc-label' }, 'Bedeutung'),
    el('div', { class: 'fc-hd' }, c.hochdeutsch),
    el('div', { class: 'fc-meaning' }, c.bedeutung),
    el('div', { class: 'fc-hint' }, 'Wie war\'s? Bewerte unten')
  ));

  card.appendChild(inner);
  wrap.appendChild(card);

  // Controls
  wrap.appendChild(el('div', { class: 'flashcard-controls' },
    el('button', { class: 'fc-btn', onClick: () => prev(), disabled: session.idx === 0, title: 'Zurück' },
      el('span', { html: '←' })
    ),
    el('div', { class: 'fc-rating' },
      el('button', { class: 'fc-rate hard', onClick: () => rate(1) }, 'Schwer'),
      el('button', { class: 'fc-rate med', onClick: () => rate(2) }, 'Mittel'),
      el('button', { class: 'fc-rate easy', onClick: () => rate(3) }, 'Leicht')
    ),
    el('button', { class: 'fc-btn', onClick: () => speak(c.ausdruck), title: 'Anhören' },
      el('span', { html: '🔊' })
    )
  ));

  // Favorite quick action
  wrap.appendChild(el('div', { style: { textAlign: 'center', marginTop: '20px' } },
    el('button', {
      class: 'btn btn-ghost',
      onClick: () => {
        const added = toggleFavorit(c.dialektId, c.id);
        toast(added ? 'Zu Favoriten hinzugefügt ♥' : 'Aus Favoriten entfernt', 'success', 1400);
        renderLernen(document.getElementById('app'));
      }
    }, fav ? '♥ Aus Favoriten' : '♡ Zu Favoriten')
  ));

  return wrap;
}

function flip(cardEl) {
  session.flipped = !session.flipped;
  cardEl.classList.toggle('is-flipped', session.flipped);
}

function prev() {
  if (session.idx > 0) {
    session.idx--;
    session.flipped = false;
    renderLernen(document.getElementById('app'));
  }
}

function rate(stand) {
  const c = session.cards[session.idx];
  setLernstand(c.dialektId, c.id, stand);
  if (stand === 3) session.rated.easy++;
  else if (stand === 2) session.rated.med++;
  else session.rated.hard++;
  session.idx++;
  session.flipped = false;
  renderLernen(document.getElementById('app'));
}

function renderSummary() {
  const total = session.cards.length;
  const { easy, med, hard } = session.rated;
  const finishedSession = session;
  session = null;
  return el('div', {},
    el('div', { class: 'quiz-result' },
      el('div', { style: { fontSize: '4rem', marginBottom: '16px' } }, '🎉'),
      el('h2', {}, 'Session abgeschlossen!'),
      el('p', {}, `Du hast ${total} Karten zu ${finishedSession.title} durchgearbeitet.`),
      el('div', { class: 'stat-grid', style: { marginTop: '24px' } },
        el('div', { class: 'stat-card' },
          el('div', { class: 'stat-card-value' }, String(easy)),
          el('div', { class: 'stat-card-label' }, 'Leicht ✓')
        ),
        el('div', { class: 'stat-card' },
          el('div', { class: 'stat-card-value' }, String(med)),
          el('div', { class: 'stat-card-label' }, 'Mittel')
        ),
        el('div', { class: 'stat-card' },
          el('div', { class: 'stat-card-value' }, String(hard)),
          el('div', { class: 'stat-card-label' }, 'Schwer')
        )
      ),
      el('div', { style: { marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' } },
        el('button', { class: 'btn btn-primary', onClick: () => { go('#/lernen'); renderLernen(document.getElementById('app')); } }, 'Nochmal lernen'),
        el('button', { class: 'btn btn-secondary', onClick: () => go('#/quiz') }, 'Im Quiz testen')
      )
    )
  );
}

// Keyboard shortcuts (vom Router gerufen)
export function handleLernKey(e) {
  if (!session) return;
  if (e.key === ' ') {
    e.preventDefault();
    const card = document.querySelector('.flashcard');
    if (card) flip(card);
  } else if (e.key === 'ArrowRight' && session.flipped) {
    rate(3);
  } else if (e.key === 'ArrowLeft') {
    prev();
  } else if (e.key === '1') rate(1);
  else if (e.key === '2') rate(2);
  else if (e.key === '3') rate(3);
}

export function resetLernSession() { session = null; }

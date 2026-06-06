// Startseite · Hero — Eyebrow/Überschrift/Beschreibung (live rotierend),
// Wort-Karussell und parallaktische Vorschaukarten.
//
// Timer-Lifecycle: Sowohl die Text-Rotation (rotateText) als auch das
// Wort-Karussell (buildWordCarousel) laufen über setInterval. Beide stoppen sich
// SELBST, sobald ihr Host-Element nicht mehr im DOM hängt (`isConnected`-Check im
// Tick) — der Router ersetzt #app via innerHTML, ohne Intervalle zu clearen.
// Dadurch entstehen bei Re-Navigation keine doppelten/leckenden Timer. Diese
// Selbst-Stopp-Logik MUSS erhalten bleiben.

import { el, go, shuffle } from '../../util.js';
import { DIALEKTE, ALLE_AUSDRUECKE } from '../../../data/dialekte.js';

// Variierende Hero-Texte — pro Render zufällig kombiniert, damit die Startseite
// nicht statisch wirkt. Der hervorgehobene `grad`-Teil bleibt der animierte
// Gradient-Span.
const HERO_EYEBROWS = [
  'Deutsche Sprachvielfalt entdecken',
  'Mundart lernen & verstehen',
  'Regionale Ausdrücke entdecken',
  'Dialekte aus dem ganzen Sprachraum',
  'Von „Moin" bis „Servus"'
];
const HERO_HEADLINES = [
  { prefix: 'Lerne Dialekte aus ', grad: 'ganz Deutschland', suffix: '.' },
  { prefix: 'Entdecke Mundart von ', grad: 'Hamburg bis Wien', suffix: '.' },
  { prefix: 'Von der Waterkant bis ', grad: 'in die Alpen', suffix: '.' },
  { prefix: 'Sprich wie ', grad: 'die Einheimischen', suffix: '.' },
  { prefix: 'Tauche ein in ', grad: 'echte regionale Sprache', suffix: '.' }
];
const HERO_LEDES = [
  'Vom Frankfurter „Ei guude" bis zum Wiener „Schmäh": Tauche ein in regionale Ausdrücke, lerne mit Karteikarten und teste dich im Quiz — alles erklärt auf Hochdeutsch.',
  'Über 6700 Ausdrücke aus 24 Regionen: lerne mit Karteikarten, höre die Aussprache und teste dich im Quiz — verständlich auf Hochdeutsch erklärt.',
  'Ob „Moin", „Servus" oder „Grüezi" — entdecke, was die Regionen sprachlich ausmacht, und lerne die schönsten Ausdrücke spielerisch.',
  'Karteikarten, Quiz und Aussprache: Lerne lebendige Mundart aus Deutschland, Österreich und der Schweiz — Schritt für Schritt.'
];
const pickRandom = arr => arr[Math.floor(Math.random() * arr.length)];

// Baut den Inhalt der Hero-Überschrift inkl. hervorgehobenem Gradient-Teil.
// Jede Variante bekommt eine andere Gradient-Startphase (--grad-phase), sodass
// der animierte Farbverlauf bei jedem Wechsel sichtbar anders einsetzt.
function fillHeadline(item, host, step = 0) {
  const grad = el('span', { class: 'grad' }, item.grad);
  grad.style.setProperty('--grad-phase', (step * 37) % 100 + '%');
  host.replaceChildren(
    document.createTextNode(item.prefix),
    grad,
    document.createTextNode(item.suffix)
  );
}

// Lässt den Inhalt von `host` sanft durch `items` rotieren (Fade/Slide), pausiert
// bei Hover, stoppt sich selbst beim View-Wechsel und respektiert reduced-motion.
function rotateText(host, items, renderItem, intervalMs) {
  const order = shuffle(items);
  let idx = 0;
  renderItem(order[0], host, 0);
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || order.length < 2) return;
  let timer = null;
  const tick = () => {
    if (!host.isConnected) { clearInterval(timer); timer = null; return; }
    host.classList.add('is-fading');
    setTimeout(() => {
      idx = (idx + 1) % order.length;
      renderItem(order[idx], host, idx);
      host.classList.remove('is-fading');
    }, 320);
  };
  const start = () => { if (!timer) timer = setInterval(tick, intervalMs); };
  const stop = () => { clearInterval(timer); timer = null; };
  setTimeout(start, intervalMs);
  host.addEventListener('mouseenter', stop);
  host.addEventListener('mouseleave', start);
}

const HERO_FALLBACK_SAMPLES = [
  { dialekt: 'Hessisch',    farbe: '#e63946', ausdruck: 'Ei guude!',  meaning: 'Hallo!' },
  { dialekt: 'Ruhrdeutsch', farbe: '#e36414', ausdruck: 'Glück auf!', meaning: 'Bergmannsgruß' },
  { dialekt: 'Bayerisch',   farbe: '#0077b6', ausdruck: 'Servus',     meaning: 'Hallo / Tschüss' }
];
// Nur die charakteristisch-mundartlichen Kategorien als Aushängeschild zulassen
// (Begrüßungen, Redensarten, Ausrufe) — keine Sachbegriffe/Eigennamen/Abkürzungen.
const HERO_PREVIEW_CATEGORIES = new Set(['begruessung', 'redensart', 'gefuehle']);
const HERO_CARD_FARBE = s => (typeof s.farbe === 'string' && s.farbe.startsWith('#')) ? s.farbe : '#8b5cf6';

// Großer, frisch gemischter Pool kartentauglicher Beispiele (~668 Einträge) —
// kurze, charakteristische Ausdrücke. Wird sowohl für die Erst-Auswahl als auch
// für die laufende Rotation der Vorschaukarten genutzt.
export function buildPreviewPool() {
  const fits = a => HERO_PREVIEW_CATEGORIES.has(a.kategorie)
    && a.ausdruck && a.ausdruck.length >= 2 && a.ausdruck.length <= 17
    && a.hochdeutsch && a.hochdeutsch.length <= 26
    && !/^[A-ZÄÖÜ.]{2,}$/.test(a.ausdruck);  // reine Abkürzungen (z.B. „RVR") ausschließen
  return shuffle(ALLE_AUSDRUECKE.filter(fits)).map(a => ({
    dialekt: a.dialektName,
    farbe: a.dialektFarbe || '#8b5cf6',
    ausdruck: a.ausdruck,
    meaning: a.hochdeutsch
  }));
}

// Wählt n Erst-Beispiele aus möglichst verschiedenen Dialekten aus dem Pool.
function pickDistinct(pool, n) {
  const picked = [], used = new Set();
  for (const s of pool) {
    if (used.has(s.dialekt)) continue;
    used.add(s.dialekt); picked.push(s);
    if (picked.length >= n) break;
  }
  while (picked.length < n) picked.push(HERO_FALLBACK_SAMPLES[picked.length % HERO_FALLBACK_SAMPLES.length]);
  return picked;
}

function applySample(parts, s) {
  const farbe = HERO_CARD_FARBE(s);
  parts.tag.textContent = s.dialekt;
  parts.tag.style.background = farbe + '22';
  parts.tag.style.color = farbe;
  parts.expr.textContent = s.ausdruck;
  parts.meaning.textContent = s.meaning;
  if (parts.card) parts.card.style.setProperty('--card-accent', farbe);
}

// Vorschaukarten: 3 Karten, die fortlaufend durch den 500+-Pool rotieren
// (versetzt, mit sanftem Fade). Selbst-Stopp, sobald die Sektion nicht mehr im
// DOM hängt (View-Wechsel) — analog zu rotateText/buildWordCarousel.
function renderHeroPreview() {
  const pool = buildPreviewPool();
  const initial = pickDistinct(pool, 3);
  const cards = initial.map((s) => {
    const farbe = HERO_CARD_FARBE(s);
    const tag = el('span', { class: 'dialect-tag', style: { background: farbe + '22', color: farbe } }, s.dialekt);
    const expr = el('div', { class: 'expr' }, s.ausdruck);
    const meaning = el('div', { class: 'meaning' }, s.meaning);
    // Innerer Wrapper trägt die Glas-Optik + das dezente Schweben.
    const inner = el('div', { class: 'preview-card-inner' }, tag, expr, meaning);
    const card = el('div', { class: 'preview-card' }, inner);
    card.style.setProperty('--card-accent', farbe);
    return { card, tag, expr, meaning };
  });
  const wrap = el('div', { class: 'hero-preview' }, ...cards.map(c => c.card));

  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && pool.length > 3) {
    let pi = 3; // nächster Pool-Index nach den 3 Erst-Karten
    cards.forEach((parts, i) => {
      let timer = null;
      const swap = () => {
        if (!wrap.isConnected) { clearInterval(timer); timer = null; return; }
        const next = pool[pi % pool.length]; pi++;
        parts.card.classList.add('is-swapping');
        setTimeout(() => {
          applySample(parts, next);
          parts.card.classList.remove('is-swapping');
          parts.card.classList.add('is-swapped');
          setTimeout(() => parts.card.classList.remove('is-swapped'), 460);
        }, 280);
      };
      // Versetzter Start, damit die Karten nicht gleichzeitig umblättern.
      setTimeout(() => { timer = setInterval(swap, 4600); }, 3000 + i * 1500);
    });
  }
  return wrap;
}

// Großer Wort-Pool aus ALLEN Ausdrücken (6700+), pro Render gemischt → echte
// Abwechslung statt einer Handvoll wiederholter Wörter. Filtert nur reine
// Abkürzungen/Codes (z.B. „RVR") und übermäßig lange Phrasen heraus.
const WORD_FALLBACK = [
  { word: 'Servus!', flag: '🥨', name: 'Bayerisch' },
  { word: 'Moin!', flag: '⚓', name: 'Plattdeutsch' }
];
export function buildWordPool() {
  const fits = a => a.ausdruck
    && a.ausdruck.length >= 2 && a.ausdruck.length <= 24
    && !/^[A-ZÄÖÜ.\d]{2,}$/.test(a.ausdruck);
  const pool = shuffle(ALLE_AUSDRUECKE.filter(fits)).map(a => ({
    word: a.ausdruck,
    flag: a.dialektFlag || '🗣️',
    name: a.dialektName
  }));
  return pool.length >= 2 ? pool : WORD_FALLBACK;
}

function buildWordCarousel() {
  // Durchläuft einen frisch gemischten Pool aller Ausdrücke (6700+).
  const WORDS = buildWordPool();

  let idx = 0;
  const wordEl = el('span', { class: 'carousel-word' }, WORDS[0].word);
  const flagEl = el('span', { class: 'carousel-flag' }, WORDS[0].flag);
  const nameEl = el('span', { class: 'carousel-name' }, WORDS[0].name);
  const wrap = el('div', { class: 'word-carousel', ariaLive: 'polite' },
    el('span', { class: 'carousel-prefix' }, 'z.B. '),
    flagEl, wordEl, nameEl
  );

  let interval;
  function advance() {
    // Selbst-Stopp, sobald das Karussell nicht mehr im DOM hängt (View-Wechsel)
    // — der Router ersetzt #app via innerHTML, ohne das Intervall zu clearen.
    if (!wrap.isConnected) { clearInterval(interval); return; }
    wordEl.classList.add('carousel-exit');
    setTimeout(() => {
      idx = (idx + 1) % WORDS.length;
      wordEl.textContent = WORDS[idx].word;
      flagEl.textContent = WORDS[idx].flag;
      nameEl.textContent = WORDS[idx].name;
      wordEl.classList.remove('carousel-exit');
      wordEl.classList.add('carousel-enter');
      setTimeout(() => wordEl.classList.remove('carousel-enter'), 400);
    }, 250);
  }

  // Respektiert reduced-motion (kein automatisches Durchblättern) und vermeidet
  // unnötige Timer bei leerem/winzigem Pool.
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || WORDS.length < 2) return wrap;

  // Start cycling after mount
  setTimeout(() => {
    interval = setInterval(advance, 2800);
  }, 1800);

  // Pause on hover
  wrap.addEventListener('mouseenter', () => clearInterval(interval));
  wrap.addEventListener('mouseleave', () => { interval = setInterval(advance, 2800); });

  return wrap;
}

// Baut die komplette Hero-Sektion und startet die Live-Rotationen.
// `stats`/`streak`/`totalExpr` kommen vom Orchestrator (gelesene Store-Werte),
// damit dieses Modul keine eigenen Store-Reads dupliziert.
export function renderHero({ stats, streak, totalExpr }) {
  // Hero — Eyebrow zufällig; Überschrift & Beschreibung rotieren live durch ihre
  // Varianten (Fade/Slide + wechselnder Farb-Akzent), pausieren bei Hover.
  const heroHeadline = el('h1', { class: 'hero-rotator' });
  const heroLede = el('p', { class: 'hero-rotator' });
  const section = el('section', { class: 'hero' },
    el('div', {},
      el('span', { class: 'hero-eyebrow' },
        el('span', { html: '✨' }),
        pickRandom(HERO_EYEBROWS)
      ),
      heroHeadline,
      buildWordCarousel(),
      heroLede,
      el('div', { class: 'hero-cta' },
        el('button', { class: 'btn btn-primary', dataset: { magnetic: '16' }, onClick: () => go('#/entdecken') },
          'Dialekte entdecken',
          el('span', { html: ' →' })
        ),
        el('button', { class: 'btn btn-secondary', dataset: { magnetic: '10' }, onClick: () => go('#/lernen') },
          'Karteikarten lernen'
        ),
        el('button', { class: 'btn btn-ghost', onClick: () => go('#/quiz') },
          'Quiz starten'
        )
      ),
      el('div', { class: 'hero-stats' },
        el('div', {},
          el('span', { class: 'hero-stat-num', dataset: { count: String(DIALEKTE.length) } }, '0'),
          el('span', { class: 'hero-stat-label' }, 'Dialekte')
        ),
        el('div', {},
          el('span', { class: 'hero-stat-num', dataset: { count: String(totalExpr) } }, '0'),
          el('span', { class: 'hero-stat-label' }, 'Ausdrücke')
        ),
        el('div', {},
          el('span', { class: 'hero-stat-num' + (stats.gelernt === 0 ? ' is-zero' : ''), dataset: { count: String(stats.gelernt) } }, '0'),
          el('span', { class: 'hero-stat-label' }, 'gelernt')
        ),
        streak > 0 ? el('div', {},
          el('span', { class: 'hero-stat-num', dataset: { count: String(streak), suffix: '🔥' } }, '0'),
          el('span', { class: 'hero-stat-label' }, 'Tage Streak')
        ) : null
      )
    ),
    renderHeroPreview()
  );
  // Live-Rotation der Hero-Texte starten (versetzte Intervalle → ruhiger Wechsel).
  // Identisch zur bisherigen Reihenfolge: erst Sektion bauen, dann Rotation
  // anstoßen. Der Selbst-Stopp greift, sobald der Host (über das Anhängen der
  // View an #app durch den Orchestrator) (dis)connected ist.
  rotateText(heroHeadline, HERO_HEADLINES, fillHeadline, 6500);
  rotateText(heroLede, HERO_LEDES, (text, host) => { host.textContent = text; }, 8500);

  return section;
}

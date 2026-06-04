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

function renderHeroPreview() {
  const samples = pickHeroSamples(3);
  return el('div', { class: 'hero-preview', dataset: { pointerParallax: '' } },
    ...samples.map(s => el('div', { class: 'preview-card', dataset: { ppDepth: s.depth } },
      el('span', { class: 'dialect-tag', style: { background: s.farbe + '22', color: s.farbe } }, s.dialekt),
      el('div', { class: 'expr' }, s.ausdruck),
      el('div', { class: 'meaning' }, s.meaning)
    ))
  );
}

// Zieht n knackige Beispiel-Ausdrücke aus möglichst verschiedenen Dialekten —
// bei jedem Render frisch gemischt, damit die Hero-Vorschau nicht statisch wirkt.
const HERO_PREVIEW_DEPTHS = ['1.4', '1.0', '1.7'];
const HERO_FALLBACK_SAMPLES = [
  { dialekt: 'Hessisch',    farbe: '#e63946', ausdruck: 'Ei guude!',  meaning: 'Hallo!' },
  { dialekt: 'Ruhrdeutsch', farbe: '#e36414', ausdruck: 'Glück auf!', meaning: 'Bergmannsgruß' },
  { dialekt: 'Bayerisch',   farbe: '#0077b6', ausdruck: 'Servus',     meaning: 'Hallo / Tschüss' }
];
// Nur die charakteristisch-mundartlichen Kategorien als Aushängeschild zulassen
// (Begrüßungen, Redensarten, Ausrufe) — keine Sachbegriffe/Eigennamen/Abkürzungen.
const HERO_PREVIEW_CATEGORIES = new Set(['begruessung', 'redensart', 'gefuehle']);
function pickHeroSamples(n = 3) {
  const fits = a => HERO_PREVIEW_CATEGORIES.has(a.kategorie)
    && a.ausdruck && a.ausdruck.length >= 2 && a.ausdruck.length <= 17
    && a.hochdeutsch && a.hochdeutsch.length <= 26
    && !/^[A-ZÄÖÜ.]{2,}$/.test(a.ausdruck);  // reine Abkürzungen (z.B. „RVR") ausschließen
  const pool = shuffle(ALLE_AUSDRUECKE.filter(fits));
  const picked = [];
  const usedDialects = new Set();
  for (const a of pool) {
    if (usedDialects.has(a.dialektId)) continue;
    usedDialects.add(a.dialektId);
    picked.push({
      dialekt: a.dialektName,
      farbe: a.dialektFarbe || 'var(--brand)',
      ausdruck: a.ausdruck,
      meaning: a.hochdeutsch,
      depth: HERO_PREVIEW_DEPTHS[picked.length % HERO_PREVIEW_DEPTHS.length]
    });
    if (picked.length >= n) break;
  }
  // Defensive: bei zu kleiner Datenlage auf die kuratierten Beispiele zurückfallen.
  while (picked.length < n) {
    const fb = HERO_FALLBACK_SAMPLES[picked.length % HERO_FALLBACK_SAMPLES.length];
    picked.push({ ...fb, depth: HERO_PREVIEW_DEPTHS[picked.length % HERO_PREVIEW_DEPTHS.length] });
  }
  return picked;
}

function buildWordCarousel() {
  // Sample of expressive dialect words to cycle through — pro Render gemischt,
  // damit nicht immer dasselbe Wort zuerst erscheint.
  const WORDS = shuffle([
    { word: 'Ei guude!',        flag: '🦁', name: 'Hessisch' },
    { word: 'Moin!',            flag: '⚓', name: 'Plattdeutsch' },
    { word: 'Servus!',          flag: '🥨', name: 'Bayerisch' },
    { word: 'Kölle Alaaf!',     flag: '🎭', name: 'Kölsch' },
    { word: 'Icke dit det!',    flag: '🐻', name: 'Berlinisch' },
    { word: 'Leiwand!',         flag: '🎻', name: 'Wienerisch' },
    { word: 'Grüezi mitenand!', flag: '🏔️', name: 'Schwizerdütsch' },
    { word: 'Nu freilich!',     flag: '⚪', name: 'Sächsisch' },
    { word: 'Bassd scho!',      flag: '🦅', name: 'Fränkisch' },
    { word: 'Glück auf!',       flag: '⚒️', name: 'Ruhrdeutsch' },
    { word: 'Heimelig!',        flag: '🌲', name: 'Alemannisch' },
    { word: 'Kehrwoche!',       flag: '🧹', name: 'Schwäbisch' }
  ]);

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
          el('span', { class: 'hero-stat-num', dataset: { count: String(stats.gelernt) } }, '0'),
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

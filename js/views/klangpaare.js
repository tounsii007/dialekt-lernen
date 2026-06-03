// Klangpaare · Minimal-Paar-Hörtrainer · View
//
// Ein Ausdruck wird vorgespielt; der Lernende wählt aus zwei fast gleich
// klingenden Ausdrücken denselben Dialekts den richtigen. Schult das feine
// Hören dialektaler Lautunterschiede. Die testbare Logik (Paar-Findung,
// Mischung, Bewertung) liegt in util/minimal-pairs.js; hier sitzt nur DOM/Audio.
//
// Datenschutz/Offline: rein lokal. Audio kommt aus der Browser-TTS (speak),
// keine Erkennung, kein Netz, kein Tracking.

import { el, go, speak } from '../util.js';
import { DIALEKTE, ALLE_AUSDRUECKE, getDialekt } from '../../data/dialekte.js';
import { icon } from '../util/icons.js';
import { sfx, vibrate } from '../util/sounds.js';
import { confettiBurst } from '../util/motion.js';
import { formatIpa } from '../util/ipa.js';
import { buildPairDrills, gradePair, summarizePairs } from '../util/minimal-pairs.js';
import { awardXp } from '../store/xp.js';
import { registerStreak } from '../store/streak.js';
import { incrementGoalProgress } from '../store/goals.js';
import { getStreak } from '../store.js';

const COUNT_OPTIONS = [10, 15, 25];
const DEFAULT_COUNT = 10;
const XP_PER_CORRECT = 6;

function clampCount(v) {
  const n = Math.floor(Number(v) || 0);
  if (!n) return DEFAULT_COUNT;
  return Math.max(1, Math.min(100, n));
}

// Quelle (Dialekt-id, 'all' oder 'kategorie:x') → Ausdrucks-Pool.
function resolvePool(source) {
  if (!source || source === 'all') return ALLE_AUSDRUECKE;
  if (source.startsWith('kategorie:')) {
    const kat = source.slice('kategorie:'.length);
    return ALLE_AUSDRUECKE.filter(a => a.kategorie === kat);
  }
  const d = getDialekt(source);
  if (!d) return ALLE_AUSDRUECKE;
  return ALLE_AUSDRUECKE.filter(a => a.dialektId === source);
}

export function renderKlangpaare(app, params = {}) {
  app.innerHTML = '';
  const host = el('div', { class: 'view klangpaare-view' });
  app.appendChild(host);

  if (params.source) {
    startSession(host, params.source, clampCount(params.count));
  } else {
    renderSetup(host, params.source);
  }
}

// ---------------------------------------------------------------------------
// Setup-Screen
// ---------------------------------------------------------------------------
function renderSetup(host, preset) {
  host.innerHTML = '';
  let source = preset || 'all';
  let count = DEFAULT_COUNT;

  const select = el('select', { class: 'shadow-select', ariaLabel: 'Dialekt wählen' },
    el('option', { value: 'all' }, '🌍 Alle Dialekte'),
    ...DIALEKTE.map(d => el('option', { value: d.id }, `${d.flag} ${d.name}`))
  );
  select.value = source;
  select.addEventListener('change', () => { source = select.value; });

  const countRow = el('div', { class: 'shadow-count-row' });
  function renderCounts() {
    countRow.innerHTML = '';
    COUNT_OPTIONS.forEach(n => {
      countRow.appendChild(el('button', {
        class: 'shadow-count-chip' + (count === n ? ' is-active' : ''),
        onClick: () => { count = n; renderCounts(); }
      }, String(n)));
    });
  }
  renderCounts();

  host.appendChild(el('div', { class: 'shadow-setup klangpaare-setup' },
    el('div', { class: 'shadow-hero', dataset: { reveal: 'up' } },
      el('div', { class: 'shadow-hero-icon' }, '👂'),
      el('h2', {}, 'Klangpaare'),
      el('p', { class: 'lede' },
        'Zwei Ausdrücke, die fast gleich klingen — welchen hörst du? Trainiert dein ' +
        'Ohr für die feinen Lautunterschiede eines Dialekts.')
    ),
    el('div', { class: 'shadow-setup-card' },
      el('label', { class: 'shadow-field-label' }, 'Dialekt'),
      select,
      el('label', { class: 'shadow-field-label' }, 'Wie viele Paare?'),
      countRow,
      el('button', {
        class: 'btn btn-primary shadow-start-btn',
        dataset: { magnetic: '12' },
        onClick: () => startSession(host, source, count)
      }, '👂 Los geht’s'),
      el('div', { class: 'pron-recog-note' },
        'ⓘ Läuft komplett offline: Die Ausdrücke werden mit der Sprachausgabe deines ' +
        'Geräts vorgelesen — kein Mikrofon, keine Internetverbindung nötig.')
    )
  ));
}

// ---------------------------------------------------------------------------
// Session-Loop
// ---------------------------------------------------------------------------
function startSession(host, source, count) {
  const pool = resolvePool(source);
  const drills = buildPairDrills(pool, count);

  if (!drills.length) {
    host.innerHTML = '';
    host.appendChild(el('div', { class: 'shadow-empty' },
      el('p', {}, 'Für diese Auswahl konnten keine Klangpaare gebildet werden. ' +
        'Versuch einen einzelnen Dialekt mit mehr Ausdrücken.'),
      el('button', { class: 'btn btn-secondary', onClick: () => renderSetup(host, source) }, '← Zurück')
    ));
    return;
  }

  const results = [];
  let idx = 0;

  function next() {
    idx++;
    if (idx >= drills.length) renderSessionSummary(host, results, source, count);
    else renderDrill();
  }

  function record(correct) {
    results.push({ correct });
    if (correct) {
      registerStreak();
      incrementGoalProgress(1);
      awardXp(XP_PER_CORRECT, 'card-reviewed');
    }
  }

  function renderDrill() {
    const drill = drills[idx];
    host.innerHTML = '';

    const correctSoFar = results.reduce((s, r) => s + (r.correct ? 1 : 0), 0);
    const lang = drill.target.dialektLang || 'de-DE';

    const progress = el('div', { class: 'shadow-progress' },
      el('div', { class: 'shadow-progress-text' }, `Paar ${idx + 1} / ${drills.length}`),
      el('div', { class: 'shadow-progress-stars' }, '✓ ' + correctSoFar),
      el('div', { class: 'shadow-progress-bar' },
        el('div', { class: 'shadow-progress-fill', style: { width: Math.round((idx / drills.length) * 100) + '%' } })
      )
    );

    const playNormal = () => { sfx.click(); speak(drill.target.ausdruck, lang); };
    const playSlow = () => { sfx.click(); speak(drill.target.ausdruck, lang, { rate: 0.55 }); };

    const card = el('div', { class: 'klangpaare-card', dataset: { reveal: 'zoom' } },
      el('div', { class: 'klangpaare-card-dialect' }, `${drill.target.dialektFlag} ${drill.target.dialektName}`),
      el('div', { class: 'klangpaare-prompt' }, 'Welchen Ausdruck hörst du?'),
      el('button', { class: 'klangpaare-play-btn', ariaLabel: 'Anhören', onClick: playNormal },
        el('span', { class: 'klangpaare-play-icon' }, '🔊')),
      el('button', { class: 'btn btn-ghost klangpaare-slow-btn', onClick: playSlow }, '🐢 Langsam')
    );

    const optionsWrap = el('div', { class: 'klangpaare-options', role: 'group', 'aria-label': 'Antwortmöglichkeiten' });
    const result = el('div', { class: 'shadow-result klangpaare-result', 'aria-live': 'assertive', 'aria-atomic': 'true' });
    const actionRow = el('div', { class: 'shadow-action-row' });
    let answered = false;

    const optBtns = drill.options.map((opt) => {
      const btn = el('button', { class: 'klangpaare-option' },
        el('span', { class: 'klangpaare-option-text' }, opt.ausdruck),
        el('span', { class: 'klangpaare-option-ipa' }, formatIpa(opt.ausdruck, opt.dialektId))
      );
      btn.addEventListener('click', () => {
        if (answered) { speak(opt.ausdruck, lang); return; }
        answered = true;
        const g = gradePair(drill, opt.id ?? opt.ausdruck);
        record(g.correct);

        optBtns.forEach((b) => b.btn.classList.add('is-locked'));
        if (g.correct) {
          btn.classList.add('is-correct');
          sfx.correct(); vibrate([10, 30, 10]);
          confettiBurst(btn, { count: 14 });
          showVerdict(result, true, drill.target);
        } else {
          btn.classList.add('is-wrong');
          sfx.wrong(); vibrate(40);
          // Den richtigen markieren.
          const right = optBtns.find((b) => (b.opt.id ?? b.opt.ausdruck) === drill.answerId);
          if (right) right.btn.classList.add('is-correct');
          showVerdict(result, false, drill.target);
        }
        lockAndAdvance(actionRow, next);
      });
      return { btn, opt };
    });
    optBtns.forEach(({ btn }) => optionsWrap.appendChild(btn));

    host.appendChild(progress);
    host.appendChild(card);
    host.appendChild(optionsWrap);
    host.appendChild(result);
    host.appendChild(actionRow);

    // Audio automatisch starten — die Übung beginnt mit Hören.
    setTimeout(() => speak(drill.target.ausdruck, lang), 280);
  }

  renderDrill();
}

function showVerdict(result, correct, target) {
  result.className = 'shadow-result klangpaare-result ' + (correct ? 'is-ok' : 'is-miss');
  result.innerHTML = '';
  result.appendChild(el('span', { class: 'shadow-result-label' }, correct ? '✓ Richtig gehört!' : '✗ Knapp daneben'));
  result.appendChild(el('span', { class: 'klangpaare-reveal' },
    el('strong', {}, target.ausdruck), ' ↦ ' + target.hochdeutsch));
}

// Nach der Antwort: „Weiter"-Knopf zeigen + nach kurzer Pause automatisch weiter.
function lockAndAdvance(actionRow, next) {
  let advanced = false;
  const go1 = () => { if (advanced) return; advanced = true; next(); };
  actionRow.innerHTML = '';
  actionRow.appendChild(el('button', { class: 'btn btn-primary shadow-next-btn', dataset: { magnetic: '10' }, onClick: go1 },
    'Weiter →'));
  setTimeout(go1, 1400);
}

// ---------------------------------------------------------------------------
// Session-Zusammenfassung
// ---------------------------------------------------------------------------
function renderSessionSummary(host, results, source, count) {
  host.innerHTML = '';
  const s = summarizePairs(results);
  const pct = s.accuracyPct;
  const isGreat = pct >= 80;
  const isFine = pct >= 50;
  const streak = getStreak();
  const xp = s.correct * XP_PER_CORRECT;

  const CIRC = 2 * Math.PI * 42;
  const dash = CIRC * (pct / 100);
  const color = isGreat ? 'var(--accent)' : isFine ? 'var(--warm)' : 'hsl(0 70% 60%)';
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('class', 'summary-donut');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = `
    <circle cx="50" cy="50" r="42" fill="none" stroke="var(--border)" stroke-width="8"/>
    <circle cx="50" cy="50" r="42" fill="none" stroke="${color}" stroke-width="8"
      stroke-linecap="round" stroke-dasharray="${dash.toFixed(1)} ${CIRC.toFixed(1)}"
      transform="rotate(-90 50 50)" style="transition: stroke-dasharray 1s var(--ease-spring)"/>`;

  const wrap = el('div', { class: 'summary-view shadow-summary' },
    el('div', { class: 'summary-header', dataset: { reveal: 'zoom' } },
      el('div', { class: 'summary-ring-wrap' },
        svg,
        el('div', { class: 'summary-ring-inner' },
          el('div', { class: 'summary-ring-pct' }, pct + '%'),
          el('div', { class: 'summary-ring-label' }, 'gehört')
        )
      ),
      el('div', { class: 'summary-header-text' },
        el('h2', {}, isGreat ? '🎉 Feines Gehör!' : isFine ? '👍 Gut gehört!' : '💪 Weiter trainieren!'),
        el('p', {}, `${s.correct}/${s.count} Klangpaare richtig erkannt.`)
      )
    ),
    el('div', { class: 'summary-xp-earned' },
      el('span', { class: 'summary-xp-num' }, '+' + xp),
      el('span', { class: 'summary-xp-unit' }, 'XP verdient')
    ),
    el('div', { class: 'summary-stats' },
      el('div', { class: 'summary-stat' },
        el('div', { class: 'summary-stat-icon' }, icon('flame', { size: 20 })),
        el('div', { class: 'summary-stat-num' }, String(streak)),
        el('div', { class: 'summary-stat-label' }, 'Streak')
      ),
      el('div', { class: 'summary-stat' },
        el('div', { class: 'summary-stat-icon' }, '🎯'),
        el('div', { class: 'summary-stat-num' }, pct + '%'),
        el('div', { class: 'summary-stat-label' }, 'Treffer')
      ),
      el('div', { class: 'summary-stat' },
        el('div', { class: 'summary-stat-icon' }, '👂'),
        el('div', { class: 'summary-stat-num' }, String(s.count)),
        el('div', { class: 'summary-stat-label' }, 'Paare')
      )
    ),
    el('div', { class: 'summary-cta' },
      el('button', { class: 'btn btn-primary', dataset: { magnetic: '14' }, onClick: () => startSession(host, source, count) },
        icon('refresh'), ' Nochmal'),
      el('button', { class: 'btn btn-secondary', onClick: () => renderSetup(host, source) },
        '👂 Andere Auswahl'),
      el('button', { class: 'btn btn-ghost', onClick: () => go('#/statistiken') },
        icon('zap'), ' Statistiken')
    )
  );

  host.appendChild(wrap);
  setTimeout(() => {
    const header = wrap.querySelector('.summary-header');
    if (header) confettiBurst(header, { count: isGreat ? 130 : 70 });
    if (isGreat) sfx.unlock(); else sfx.correct();
  }, 250);
}

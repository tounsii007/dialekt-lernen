// Shadowing-Trainer · View
//
// Eigener Sprech-Übungsmodus: Ausdruck hören → sofort nachsprechen → Score →
// nächster. Gamifiziert (Sterne, XP, Streak, Konfetti). Die testbare Logik liegt
// in util/shadowing.js; hier sitzt nur DOM/Audio.
//
// Datenschutz: die Worterkennung nutzt die Browser-SpeechRecognition, die je nach
// Browser online sein kann. Deshalb ist sie strikt nutzer-initiiert (Klick auf
// „Nachsprechen") und mit einem transparenten Hinweis versehen. Wo keine
// Erkennung verfügbar ist (oder sie scheitert), gibt es einen manuellen
// „Ich hab's nachgesprochen"-Pfad, damit der Modus offline nutzbar bleibt.

import { el, go, speak, toast } from '../util.js';
import { DIALEKTE, ALLE_AUSDRUECKE, getDialekt } from '../../data/dialekte.js';
import { icon } from '../util/icons.js';
import { sfx, vibrate } from '../util/sounds.js';
import { confettiBurst } from '../util/motion.js';
import { formatIpa } from '../util/ipa.js';
import { isPronunciationSupported, startListening, scoreBestAlternative } from '../util/pronunciation.js';
import { gradeShadow, shadowXp, summarizeShadow, buildShadowQueue } from '../util/shadowing.js';
import { awardXp } from '../store/xp.js';
import { registerStreak } from '../store/streak.js';
import { incrementGoalProgress } from '../store/goals.js';
import { getStreak } from '../store.js';

const COUNT_OPTIONS = [10, 15, 25];
const DEFAULT_COUNT = 10;

// Die aktive Erkennungs-Stop-Funktion — beim Verlassen der View abbrechen,
// damit kein Mikrofon offen bleibt.
let currentStop = null;
function stopActive() {
  if (currentStop) { try { currentStop(); } catch {} currentStop = null; }
}

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

export function renderShadowing(app, params = {}) {
  stopActive();
  app.innerHTML = '';
  const host = el('div', { class: 'view shadowing-view' });
  app.appendChild(host);

  // Beim Wegnavigieren das Mikrofon sicher stoppen.
  window.addEventListener('hashchange', stopActive, { once: true });

  if (params.source) {
    startSession(host, params.source, clampCount(params.count));
  } else {
    renderSetup(host);
  }
}

// ---------------------------------------------------------------------------
// Setup-Screen
// ---------------------------------------------------------------------------
function renderSetup(host) {
  host.innerHTML = '';
  let source = 'all';
  let count = DEFAULT_COUNT;

  const select = el('select', { class: 'shadow-select', ariaLabel: 'Dialekt wählen' },
    el('option', { value: 'all' }, '🌍 Alle Dialekte'),
    ...DIALEKTE.map(d => el('option', { value: d.id }, `${d.flag} ${d.name}`))
  );
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

  const recogOk = isPronunciationSupported();

  host.appendChild(el('div', { class: 'shadow-setup' },
    el('div', { class: 'shadow-hero', dataset: { reveal: 'up' } },
      el('div', { class: 'shadow-hero-icon' }, '🗣️'),
      el('h2', {}, 'Shadowing'),
      el('p', { class: 'lede' },
        'Hören, sofort nachsprechen, Score bekommen. Die schnellste Art, ein ' +
        'Gefühl für Klang und Rhythmus eines Dialekts zu bekommen.')
    ),
    el('div', { class: 'shadow-setup-card' },
      el('label', { class: 'shadow-field-label' }, 'Dialekt'),
      select,
      el('label', { class: 'shadow-field-label' }, 'Wie viele Ausdrücke?'),
      countRow,
      el('button', {
        class: 'btn btn-primary shadow-start-btn',
        dataset: { magnetic: '12' },
        onClick: () => startSession(host, source, count)
      }, icon('speaker'), ' Los geht’s'),
      recogOk
        ? el('div', { class: 'pron-recog-note' },
            'ⓘ Die Aussprache-Bewertung nutzt die Spracherkennung deines Browsers — ' +
            'dabei kann Audio an den Browser-Dienst (ggf. online) gehen. Ohne Erkennung ' +
            'kannst du trotzdem hören und selbst bestätigen.')
        : el('div', { class: 'shadow-note-warn' },
            '⚠️ Dein Browser unterstützt keine Aussprache-Erkennung (versuche Chrome/Edge). ' +
            'Du kannst trotzdem üben: hören und selbst bestätigen.')
    )
  ));
}

// ---------------------------------------------------------------------------
// Session-Loop
// ---------------------------------------------------------------------------
function startSession(host, source, count) {
  stopActive();
  const pool = resolvePool(source);
  const queue = buildShadowQueue(pool, count);

  if (!queue.length) {
    host.innerHTML = '';
    host.appendChild(el('div', { class: 'shadow-empty' },
      el('p', {}, 'Für diese Auswahl gibt es keine Ausdrücke.'),
      el('button', { class: 'btn btn-secondary', onClick: () => renderSetup(host) }, '← Zurück')
    ));
    return;
  }

  const results = [];
  let idx = 0;

  function next() {
    idx++;
    if (idx >= queue.length) renderSessionSummary(host, queue, results, source, count);
    else renderCard();
  }

  function record(stars, score) {
    const xp = shadowXp(stars);
    results.push({ stars, score, xp });
    if (stars >= 1) {
      registerStreak();
      incrementGoalProgress(1);
      if (xp > 0) awardXp(xp, 'card-reviewed');
    }
  }

  function renderCard() {
    stopActive();
    const c = queue[idx];
    host.innerHTML = '';

    const tallyStars = results.reduce((s, r) => s + (r.stars || 0), 0);

    const progress = el('div', { class: 'shadow-progress' },
      el('div', { class: 'shadow-progress-text' }, `Ausdruck ${idx + 1} / ${queue.length}`),
      el('div', { class: 'shadow-progress-stars' }, '⭐ ' + tallyStars),
      el('div', { class: 'shadow-progress-bar' },
        el('div', { class: 'shadow-progress-fill', style: { width: Math.round((idx / queue.length) * 100) + '%' } })
      )
    );

    const lang = c.dialektLang || 'de-DE';
    const playNormal = () => { sfx.click(); speak(c.ausdruck, lang); };
    const playSlow = () => { sfx.click(); speak(c.ausdruck, lang, { rate: 0.55 }); };

    const ipaText = formatIpa(c.ausdruck, c.dialektId).replace(/^\/|\/$/g, '');

    const card = el('div', { class: 'shadow-card', dataset: { reveal: 'zoom' } },
      el('div', { class: 'shadow-card-dialect' }, `${c.dialektFlag} ${c.dialektName}`),
      el('div', { class: 'shadow-card-expr' }, c.ausdruck),
      ipaText ? el('div', { class: 'shadow-card-ipa' }, '/' + ipaText + '/') : null,
      el('div', { class: 'shadow-card-hd' }, '↦ ' + c.hochdeutsch),
      el('div', { class: 'shadow-listen-row' },
        el('button', { class: 'btn btn-secondary shadow-listen-btn', onClick: playNormal }, '🔊 Anhören'),
        el('button', { class: 'btn btn-ghost shadow-slow-btn', onClick: playSlow }, '🐢 Langsam')
      )
    );

    const result = el('div', { class: 'shadow-result', 'aria-live': 'assertive', 'aria-atomic': 'true' });
    const actionRow = el('div', { class: 'shadow-action-row' });

    // Manueller Bestätigungs-Pfad (Fallback ohne Erkennung).
    const manualBtn = el('button', { class: 'btn btn-secondary shadow-manual-btn' },
      '✓ Hab’s nachgesprochen');
    manualBtn.addEventListener('click', () => {
      sfx.correct(); vibrate(8);
      record(1, 0.6);
      showVerdict(result, { stars: 1, label: 'Gut geübt', score: 0.6 }, '');
      lockAndAdvance(actionRow, next);
    });

    const skipBtn = el('button', { class: 'btn btn-ghost shadow-skip-btn', onClick: () => { sfx.click(); record(0, 0); next(); } },
      'Überspringen');

    if (isPronunciationSupported()) {
      const micBtn = el('button', { class: 'shadow-mic-btn', ariaLabel: 'Nachsprechen' },
        icon('speaker', { size: 26 }));
      const micLabel = el('span', { class: 'shadow-mic-label', 'aria-live': 'polite' }, 'Tippe und sprich nach');
      let listening = false, finalShown = false;

      function resetMic() {
        listening = false; currentStop = null;
        micBtn.classList.remove('is-listening');
      }

      micBtn.addEventListener('click', () => {
        if (listening) { stopActive(); return; }
        listening = true; finalShown = false;
        micBtn.classList.add('is-listening');
        micLabel.textContent = 'Höre zu… sprich jetzt';
        result.className = 'shadow-result';
        result.innerHTML = '';
        sfx.click();
        currentStop = startListening({
          lang,
          onPartial: (t) => { micLabel.textContent = '„' + t + '…"'; },
          onResult: ({ transcript, alternatives }) => {
            finalShown = true;
            const best = scoreBestAlternative(c.ausdruck,
              (alternatives && alternatives.length) ? alternatives : [transcript]);
            const g = gradeShadow(best.score);
            record(g.stars, g.score);
            showVerdict(result, g, best.transcript || '');
            if (g.stars >= 1) {
              sfx.correct(); vibrate([10, 30, 10]);
              if (g.stars === 3) confettiBurst(result, { count: 18 });
              lockAndAdvance(actionRow, next);
            } else {
              sfx.wrong();
              micLabel.textContent = 'Nochmal versuchen';
            }
          },
          onError: () => {
            finalShown = true;
            micLabel.textContent = 'Erkennung nicht verfügbar — du kannst selbst bestätigen.';
            result.className = 'shadow-result is-miss';
            result.textContent = 'Mikrofon/Erkennung nicht verfügbar.';
            resetMic();
          },
          onEnd: () => {
            if (!finalShown) micLabel.textContent = 'Nichts gehört — nochmal?';
            resetMic();
          },
        });
      });

      actionRow.appendChild(el('div', { class: 'shadow-mic-wrap' }, micBtn, micLabel));
      actionRow.appendChild(el('div', { class: 'shadow-sub-actions' }, manualBtn, skipBtn));
    } else {
      // Kein Recognition-Support: manueller Pfad als Hauptaktion.
      actionRow.appendChild(el('div', { class: 'shadow-sub-actions' }, manualBtn, skipBtn));
    }

    host.appendChild(progress);
    host.appendChild(card);
    host.appendChild(result);
    host.appendChild(actionRow);
    host.appendChild(el('div', { class: 'pron-recog-note shadow-card-note' },
      'ⓘ Aussprache-Bewertung nutzt die Browser-Spracherkennung (ggf. online).'));

    // Audio automatisch starten — Shadowing beginnt mit Hören.
    setTimeout(() => speak(c.ausdruck, lang), 280);
  }

  renderCard();
}

function showVerdict(result, grade, heard) {
  result.className = 'shadow-result ' + (grade.stars >= 1 ? 'is-ok' : 'is-miss');
  result.innerHTML = '';
  const stars = '★★★'.slice(0, grade.stars) + '☆☆☆'.slice(0, 3 - grade.stars);
  result.appendChild(el('span', { class: 'shadow-result-stars' }, stars));
  result.appendChild(el('span', { class: 'shadow-result-label' }, grade.label));
  if (grade.score != null) {
    result.appendChild(el('span', { class: 'shadow-result-pct' }, Math.round(grade.score * 100) + '%'));
  }
  if (heard) result.appendChild(el('span', { class: 'shadow-result-heard' }, 'gehört: „' + heard + '"'));
}

// Nach einem bestandenen Versuch: „Weiter"-Knopf zeigen + nach kurzer Pause
// automatisch weiterschalten.
function lockAndAdvance(actionRow, next) {
  stopActive();
  let advanced = false;
  const go1 = () => { if (advanced) return; advanced = true; next(); };
  actionRow.innerHTML = '';
  actionRow.appendChild(el('button', { class: 'btn btn-primary shadow-next-btn', dataset: { magnetic: '10' }, onClick: go1 },
    'Weiter →'));
  setTimeout(go1, 1100);
}

// ---------------------------------------------------------------------------
// Session-Zusammenfassung
// ---------------------------------------------------------------------------
function renderSessionSummary(host, queue, results, source, count) {
  stopActive();
  host.innerHTML = '';
  const s = summarizeShadow(results);
  const pct = s.maxStars ? Math.round((s.stars / s.maxStars) * 100) : 0;
  const isGreat = pct >= 80;
  const isFine = pct >= 50;
  const streak = getStreak();

  const CIRC = 2 * Math.PI * 42;
  const dash = CIRC * (pct / 100);
  const color = isGreat ? 'var(--accent)' : isFine ? 'var(--warm)' : 'var(--danger)';
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
          el('div', { class: 'summary-ring-label' }, 'Aussprache')
        )
      ),
      el('div', { class: 'summary-header-text' },
        el('h2', {}, isGreat ? '🎉 Klasse gesprochen!' : isFine ? '👍 Solide!' : '💪 Weiter üben!'),
        el('p', {}, `${s.count} Ausdrücke · ${s.stars}/${s.maxStars} Sterne · ${s.perfect}× perfekt.`)
      )
    ),
    el('div', { class: 'summary-xp-earned' },
      el('span', { class: 'summary-xp-num' }, '+' + s.xp),
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
        el('div', { class: 'summary-stat-num' }, s.accuracyPct + '%'),
        el('div', { class: 'summary-stat-label' }, 'Treffer')
      ),
      el('div', { class: 'summary-stat' },
        el('div', { class: 'summary-stat-icon' }, '🗣️'),
        el('div', { class: 'summary-stat-num' }, String(s.count)),
        el('div', { class: 'summary-stat-label' }, 'Geübt')
      )
    ),
    el('div', { class: 'summary-cta' },
      el('button', { class: 'btn btn-primary', dataset: { magnetic: '14' }, onClick: () => startSession(host, source, count) },
        icon('refresh'), ' Nochmal'),
      el('button', { class: 'btn btn-secondary', onClick: () => renderSetup(host) },
        icon('speaker'), ' Andere Auswahl'),
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

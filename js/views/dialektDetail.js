import { el, go, normalize, speak } from '../util.js';
import { getDialekt } from '../../data/dialekte.js';
import { KATEGORIEN } from '../../data/kategorien.js';
import { renderExpressionCard } from './partials.js';
import { markDialectVisited } from '../store.js';
import { getLernstand } from '../store/learning.js';
import { icon, emptyIllustration } from '../util/icons.js';
import { buildIndex, searchIndex } from '../util/fuzzy.js';
import { findRelatedExpressions } from '../util/related-expressions.js';
import { extractEtymology, hasEtymology } from '../util/etymology.js';
import { formatIpa, splitSyllables } from '../util/ipa.js';
import { sfx } from '../util/sounds.js';
import { confettiBurst } from '../util/motion.js';
import { isRecordingSupported, startRecording } from '../util/recorder.js';
import { syllableEnvelope, scorePronunciation, normalizeEnvelope } from '../util/audio-analysis.js';
import { isPronunciationSupported, startListening, scoreBestAlternative } from '../util/pronunciation.js';

export function renderDialektDetail(root, dialektId) {
  root.innerHTML = '';
  const d = getDialekt(dialektId);
  if (d) markDialectVisited(d.id);
  if (!d) {
    root.appendChild(el('div', { class: 'empty-state' },
      emptyIllustration('map'),
      el('h3', {}, 'Dialekt nicht gefunden'),
      el('div', { class: 'empty-meta' }, 'Die Adresse zeigt auf einen Dialekt, den es nicht gibt — vielleicht ein Tippfehler?'),
      el('button', { class: 'btn btn-primary', dataset: { magnetic: '12' }, onClick: () => go('#/entdecken') }, 'Zurück zur Übersicht')
    ));
    return;
  }

  const view = el('div', { class: 'view' });

  // Progress ring — % gelernt
  const totalExpr = d.ausdruecke.length;
  let learned = 0, inProgress = 0;
  d.ausdruecke.forEach(a => {
    const s = getLernstand(d.id, a.id);
    if (s >= 3) learned++;
    else if (s > 0) inProgress++;
  });
  const pct = totalExpr > 0 ? Math.round((learned / totalExpr) * 100) : 0;
  const R = 28, C = 2 * Math.PI * R;
  const ringSvg = el('svg', {
    width: 72, height: 72, viewBox: '0 0 72 72',
    class: 'detail-ring',
    html: `
      <circle cx="36" cy="36" r="${R}" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="6"/>
      <circle cx="36" cy="36" r="${R}" fill="none" stroke="white" stroke-width="6"
              stroke-linecap="round" transform="rotate(-90 36 36)"
              stroke-dasharray="${C}" stroke-dashoffset="${C - (pct/100)*C}"/>
    `
  });

  // Header
  view.appendChild(el('section', { class: 'detail-head', style: { '--dc': d.farbe, background: `linear-gradient(135deg, ${d.farbe} 0%, ${d.farbe}dd 100%)` } },
    el('button', { class: 'detail-back', onClick: () => go('#/entdecken') },
      el('span', { html: '←' }), ' Zurück'
    ),
    el('div', { class: 'detail-head-top' },
      el('div', {},
        el('h1', {}, `${d.flag} ${d.name}`),
        el('div', { class: 'detail-region' }, d.region)
      ),
      el('div', { class: 'detail-progress' },
        ringSvg,
        el('div', { class: 'detail-progress-num' },
          el('span', { class: 'dpn-pct' }, pct + '%'),
          el('span', { class: 'dpn-lbl' }, 'gelernt')
        )
      )
    ),
    el('div', { class: 'detail-desc' }, d.beschreibung),
    el('div', { class: 'detail-meta' },
      el('div', { class: 'detail-meta-item' }, el('b', {}, d.ausdruecke.length), 'Ausdrücke'),
      el('div', { class: 'detail-meta-item' }, el('b', {}, learned), 'gelernt'),
      el('div', { class: 'detail-meta-item' }, el('b', {}, inProgress), 'in Arbeit'),
      el('div', { class: 'detail-meta-item' }, el('b', {}, d.sprecher || '–'), 'Sprecher'),
      el('div', { class: 'detail-meta-item' },
        el('button', { class: 'link-btn', style: { color: 'white' }, onClick: () => go(`#/lernen?dialekt=${d.id}`) }, 'Mit Karten lernen →')
      )
    )
  ));

  // Toolbar
  const usedCats = new Set(d.ausdruecke.map(a => a.kategorie));
  const cats = Array.from(usedCats).map(c => KATEGORIEN[c] || { id: c, label: c, icon: '·' });

  const toolbar = el('div', { class: 'expr-toolbar' },
    el('div', { class: 'expr-search' },
      el('svg', { viewBox: '0 0 24 24', width: 20, height: 20, fill: 'none', stroke: 'currentColor', 'stroke-width': 2,
        html: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>' }),
      el('input', { id: 'detSearch', type: 'search', placeholder: 'Im Dialekt suchen…' })
    )
  );

  const chips = el('div', { class: 'chip-row' },
    el('button', { class: 'chip is-active', dataset: { cat: 'all' } }, 'Alle'),
    ...cats.map(c => el('button', { class: 'chip', dataset: { cat: c.id } }, `${c.icon} ${c.label}`))
  );
  view.appendChild(toolbar);
  view.appendChild(chips);

  const grid = el('div', { class: 'expr-grid', style: { marginTop: '20px' } });
  view.appendChild(grid);

  let activeCat = 'all';
  let term = '';
  // Lokaler Fuzzy-Index pro Dialekt
  const localIdx = buildIndex(d.ausdruecke, [
    { key: 'ausdruck',    weight: 3.0 },
    { key: 'hochdeutsch', weight: 2.0 },
    { key: 'bedeutung',   weight: 1.0 }
  ]);

  function render() {
    grid.innerHTML = '';
    const raw = term.trim();
    let pool = activeCat === 'all' ? d.ausdruecke : d.ausdruecke.filter(a => a.kategorie === activeCat);
    let items;
    if (!raw) {
      items = pool;
    } else {
      const matches = new Set(searchIndex(localIdx, raw, { threshold: 0.2, limit: 500 }).map(r => r.rec));
      items = pool.filter(a => matches.has(a));
    }
    if (!items.length) {
      grid.appendChild(el('div', { class: 'empty-state' },
        el('span', { class: 'emoji' }, '🔎'),
        el('div', {}, 'Keine Ausdrücke gefunden.')
      ));
      return;
    }
    items.forEach(a => {
      const cardWrap = el('div', { class: 'expr-card-wrap' });
      cardWrap.appendChild(renderExpressionCard(a, d));
      const pron = renderPronunciationSection(a, d);
      if (pron) cardWrap.appendChild(pron);
      const etym = renderEtymologySection(a);
      if (etym) cardWrap.appendChild(etym);
      const related = renderRelatedSection(a, d);
      if (related) cardWrap.appendChild(related);
      grid.appendChild(cardWrap);
    });
  }
  render();

  chips.querySelectorAll('.chip').forEach(c => c.addEventListener('click', () => {
    chips.querySelectorAll('.chip').forEach(x => x.classList.remove('is-active'));
    c.classList.add('is-active');
    activeCat = c.dataset.cat;
    render();
  }));
  toolbar.querySelector('input').addEventListener('input', (e) => { term = e.target.value; render(); });

  root.appendChild(view);
}

// „Siehe auch": findet bis zu 5 verwandte Ausdrücke aus anderen Dialekten.
function renderRelatedSection(a, dialekt) {
  // Wir brauchen ein vollständiges Entry-Objekt mit dialektId/hochdeutsch.
  const entry = {
    dialektId: dialekt.id,
    id: a.id,
    hochdeutsch: a.hochdeutsch,
    kategorie: a.kategorie,
  };
  let related;
  try {
    related = findRelatedExpressions(entry, 5);
  } catch {
    related = [];
  }
  if (!related || related.length === 0) return null;

  const sec = el('div', { class: 'related-section', dataset: { reveal: '' } });
  sec.appendChild(el('div', { class: 'related-head' },
    el('span', { class: 'related-icon' }, '🔗'),
    el('span', { class: 'related-title' }, 'Siehe auch')
  ));
  const list = el('div', { class: 'related-list' });
  for (const rel of related) {
    const re = rel.entry;
    if (!re) continue;
    list.appendChild(el('button', {
      class: 'related-chip',
      style: { '--dc': re.dialektFarbe || 'var(--brand)' },
      onClick: () => go(`#/dialekt/${re.dialektId}`),
      title: `${re.dialektFlag || ''} ${re.dialektName || ''} — ${rel.reason}`
    },
      el('span', { class: 'related-flag' }, re.dialektFlag || '🏷️'),
      el('span', { class: 'related-expr' }, re.ausdruck),
      el('span', { class: 'related-hd' }, re.hochdeutsch || ''),
      el('span', { class: 'related-dialect' }, re.dialektName || '')
    ));
  }
  sec.appendChild(list);
  return sec;
}

// Aussprache-Bereich: IPA-Lautschrift, Silbenzerlegung (klickbar) und
// Wiedergabe in normalem sowie verlangsamtem Tempo (Slow-Mo).
function renderPronunciationSection(a, dialekt) {
  const lang = dialekt.lang || 'de-DE';
  const ipa = formatIpa(a.ausdruck, dialekt.id);
  const syllables = splitSyllables(a.ausdruck);

  const sec = el('details', { class: 'pron-section' });
  sec.appendChild(el('summary', { class: 'pron-summary' },
    el('span', { class: 'pron-icon' }, '🔊'),
    el('span', { class: 'pron-label' }, 'Aussprache'),
    el('span', { class: 'pron-ipa-mini' }, ipa)
  ));

  const body = el('div', { class: 'pron-body' });

  // Große IPA-Zeile
  body.appendChild(el('div', { class: 'pron-ipa' }, ipa));

  // Silben — klickbare Chips, jede einzeln langsam vorgesprochen.
  if (syllables.length) {
    const sylRow = el('div', { class: 'pron-syllables', role: 'group', ariaLabel: 'Silben' });
    syllables.forEach((syl, idx) => {
      if (idx > 0) sylRow.appendChild(el('span', { class: 'pron-syl-sep', ariaHidden: 'true' }, '·'));
      sylRow.appendChild(el('button', {
        class: 'pron-syl',
        title: `„${syl}" langsam anhören`,
        onClick: () => { sfx.click(); speak(syl, lang, { rate: 0.7 }); }
      }, syl));
    });
    body.appendChild(sylRow);
  }

  // Wiedergabe-Buttons: normal + Slow-Mo.
  body.appendChild(el('div', { class: 'pron-buttons' },
    el('button', { class: 'btn btn-secondary pron-play',
      onClick: () => { sfx.click(); speak(a.ausdruck, lang); } }, '▶ Anhören'),
    el('button', { class: 'btn btn-ghost pron-play',
      title: 'Verlangsamt — Silbe für Silbe nachsprechen',
      onClick: () => { sfx.click(); speak(a.ausdruck, lang, { rate: 0.5 }); } }, '🐢 Langsam')
  ));

  // Aussprache-Übung (Mikrofon) erst beim Aufklappen bauen — spart bei großen
  // Dialekten hunderte Canvas-Elemente im DOM. Nur wenn Rhythmus-Aufnahme ODER
  // Worterkennung unterstützt wird.
  if ((isRecordingSupported() || isPronunciationSupported()) && syllables.length) {
    let built = false;
    sec.addEventListener('toggle', () => {
      if (sec.open && !built) {
        built = true;
        body.appendChild(renderPracticeWidget(a, lang, syllables.length));
      }
    });
  }

  sec.appendChild(body);
  return sec;
}

// Zeichnet erwartete (blasse Fläche) und aufgenommene (kräftige Linie) Hüllkurve.
function drawEnvelopes(canvas, refEnv, userEnv) {
  const ctx = canvas.getContext && canvas.getContext('2d');
  if (!ctx) return;
  const W = canvas.width, H = canvas.height, pad = 6;
  let brand = '#7c5cff';
  try {
    const c = getComputedStyle(canvas).getPropertyValue('--brand').trim();
    if (c) brand = c;
  } catch {}
  ctx.clearRect(0, 0, W, H);
  const plot = (env, { stroke, fill, lw } = {}) => {
    if (!env || !env.length) return;
    const n = env.length;
    const x = (i) => pad + (i / Math.max(1, n - 1)) * (W - 2 * pad);
    const y = (v) => H - pad - Math.max(0, Math.min(1, v)) * (H - 2 * pad);
    ctx.beginPath();
    ctx.moveTo(x(0), y(env[0]));
    for (let i = 1; i < n; i++) ctx.lineTo(x(i), y(env[i]));
    if (fill) {
      ctx.lineTo(x(n - 1), H - pad);
      ctx.lineTo(x(0), H - pad);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
    } else {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lw || 2;
      ctx.lineJoin = 'round';
      ctx.stroke();
    }
  };
  plot(refEnv, { fill: 'rgba(124,92,255,.16)' });
  plot(userEnv ? normalizeEnvelope(userEnv) : null, { stroke: brand, lw: 2.5 });
}

// Mikrofon-Übungs-Widget. Zwei Blöcke: (1) Rhythmus-Vergleich (rein lokal, kein
// Audio gespeichert/gesendet, siehe recorder.js) und (2) optionale Worterkennung
// über die Browser-SpeechRecognition (kann online sein → transparenter Hinweis).
// Beide teilen sich einen `mic`-Status, damit sie nicht gleichzeitig aufnehmen.
function renderPracticeWidget(a, lang, sylCount) {
  const wrap = el('div', { class: 'pron-practice' });
  wrap.appendChild(el('div', { class: 'pron-practice-head' },
    el('span', { class: 'pron-practice-icon' }, '🎙️'),
    el('span', { class: 'pron-practice-title' }, 'Aussprache üben'),
    el('span', { class: 'pron-practice-hint' }, `${sylCount} Silbe${sylCount === 1 ? '' : 'n'}`)
  ));
  const mic = { busy: false };
  if (isRecordingSupported()) appendRhythmBlock(wrap, sylCount, mic);
  if (isPronunciationSupported()) appendRecognitionBlock(wrap, a, lang, mic);
  return wrap;
}

// Block 1 — Rhythmus aufnehmen und gegen das erwartete Silbenmuster bewerten.
function appendRhythmBlock(wrap, sylCount, mic) {
  const BUCKETS = 48;
  const refEnv = syllableEnvelope(sylCount, BUCKETS);
  const canvas = el('canvas', { class: 'pron-canvas', width: 480, height: 96, ariaHidden: 'true' });
  const status = el('div', { class: 'pron-practice-status' }, 'Rhythmus: anhören, dann aufnehmen und nachsprechen.');
  const badge = el('div', { class: 'pron-score-badge' });
  const recBtn = el('button', { class: 'btn btn-primary pron-rec' }, '🎙️ Aufnehmen');
  wrap.appendChild(canvas);
  wrap.appendChild(el('div', { class: 'pron-practice-foot' }, recBtn, badge));
  wrap.appendChild(status);
  drawEnvelopes(canvas, refEnv, null);

  let controller = null, recording = false;
  const live = [];

  function showScore({ score, userPeaks, expectedSyllables }) {
    badge.innerHTML = '';
    const tone = score >= 80 ? 'high' : score >= 55 ? 'mid' : 'low';
    badge.className = `pron-score-badge is-shown tone-${tone}`;
    badge.appendChild(el('span', { class: 'pron-score-num' }, score + '%'));
    badge.appendChild(el('span', { class: 'pron-score-sub' }, `${userPeaks}/${expectedSyllables} Silben`));
    status.textContent = score >= 80 ? 'Super Rhythmus! 🎉'
      : score >= 55 ? 'Schon nah dran — versuch es nochmal.'
      : 'Achte auf die Silben-Betonung.';
    if (score >= 80) { sfx.unlock(); confettiBurst(badge, { count: 18 }); }
  }

  async function start() {
    if (mic.busy) { status.textContent = 'Erst die Worterkennung beenden.'; return; }
    mic.busy = true; recording = true;
    live.length = 0;
    badge.classList.remove('is-shown');
    recBtn.classList.add('is-recording');
    recBtn.textContent = '⏹ Stoppen';
    status.textContent = 'Aufnahme läuft… sprich jetzt nach.';
    sfx.click();
    try {
      controller = await startRecording({
        maxMs: Math.min(8000, Math.max(2500, sylCount * 750)),
        onLevel: (lvl) => { live.push(lvl); drawEnvelopes(canvas, refEnv, live); },
        onStop: ({ envelope }) => {
          recording = false; mic.busy = false; controller = null;
          recBtn.classList.remove('is-recording');
          recBtn.textContent = '🎙️ Nochmal';
          drawEnvelopes(canvas, refEnv, envelope);
          showScore(scorePronunciation(envelope, sylCount, { buckets: BUCKETS }));
        },
      });
    } catch {
      recording = false; mic.busy = false;
      recBtn.classList.remove('is-recording');
      recBtn.textContent = '🎙️ Aufnehmen';
      status.textContent = 'Mikrofon nicht verfügbar oder Zugriff verweigert.';
    }
  }

  recBtn.addEventListener('click', () => {
    if (recording) { if (controller) controller.stop(); return; }
    start();
  });
}

// Block 2 — Worterkennung: hört zu und bewertet das Transcript (tolerant, mit
// Laut-Faltung). Nutzt die Browser-SpeechRecognition (kann online sein).
function appendRecognitionBlock(wrap, a, lang, mic) {
  const out = el('div', { class: 'pron-recog-out' }, 'Worterkennung: tippe „Prüfen" und sprich den Ausdruck.');
  const recogBtn = el('button', { class: 'btn btn-secondary pron-recog-btn' }, '🗣️ Aussprache prüfen');
  wrap.appendChild(el('div', { class: 'pron-recog' },
    el('div', { class: 'pron-recog-foot' }, recogBtn, out),
    el('div', { class: 'pron-recog-note' },
      'ⓘ nutzt die Spracherkennung deines Browsers — dabei kann Audio an den Browser-Dienst (ggf. online) gehen.')
  ));

  let listening = false, stop = null, finalShown = false;
  function reset() {
    listening = false; stop = null; mic.busy = false;
    recogBtn.classList.remove('is-listening');
    recogBtn.textContent = '🗣️ Aussprache prüfen';
  }

  recogBtn.addEventListener('click', () => {
    if (listening) { if (stop) stop(); return; }
    if (mic.busy) { out.className = 'pron-recog-out'; out.textContent = 'Erst die Rhythmus-Aufnahme beenden.'; return; }
    listening = true; mic.busy = true; finalShown = false;
    recogBtn.classList.add('is-listening');
    recogBtn.textContent = '⏹ Höre zu…';
    out.className = 'pron-recog-out';
    out.textContent = 'Sprich jetzt…';
    sfx.click();
    stop = startListening({
      lang,
      onPartial: (t) => { out.textContent = '„' + t + '…"'; },
      onResult: ({ transcript, alternatives }) => {
        finalShown = true;
        const best = scoreBestAlternative(a.ausdruck, (alternatives && alternatives.length) ? alternatives : [transcript]);
        const pct = Math.round(best.score * 100);
        out.className = 'pron-recog-out ' + (best.ok ? 'is-ok' : 'is-miss');
        out.innerHTML = '';
        out.appendChild(el('span', { class: 'pron-recog-verdict' }, (best.ok ? '✓ ' : '✗ ') + pct + '%'));
        out.appendChild(el('span', { class: 'pron-recog-heard' }, 'gehört: „' + (best.transcript || '–') + '"'));
        if (best.ok) { sfx.unlock(); if (pct >= 90) confettiBurst(out, { count: 16 }); }
        else sfx.wrong();
      },
      onError: () => {
        finalShown = true;
        out.className = 'pron-recog-out is-miss';
        out.textContent = 'Erkennung nicht verfügbar oder Zugriff verweigert.';
        reset();
      },
      onEnd: () => {
        if (!finalShown) { out.className = 'pron-recog-out'; out.textContent = 'Nichts erkannt — nochmal versuchen.'; }
        reset();
      },
    });
  });
}

// Etymologie-Bereich: zeigt extrahierte Wortherkunfts-Sätze aus dem Bedeutungs-Text
// als ausklappbaren Panel unter der Karte. Wird nur gerendert, wenn Etymologie-
// Hinweise gefunden wurden.
function renderEtymologySection(a) {
  if (!hasEtymology(a.bedeutung)) return null;
  const sentences = extractEtymology(a.bedeutung);

  const sec = el('details', { class: 'etymology-section' });
  sec.appendChild(el('summary', { class: 'etymology-summary' },
    el('span', { class: 'etymology-icon' }, '📜'),
    el('span', { class: 'etymology-label' }, 'Etymologie'),
    el('span', { class: 'etymology-count' }, `${sentences.length} Hinweis${sentences.length === 1 ? '' : 'e'}`)
  ));
  const list = el('div', { class: 'etymology-list' });
  sentences.forEach(s => {
    list.appendChild(el('div', { class: 'etymology-item' }, s));
  });
  sec.appendChild(list);
  return sec;
}

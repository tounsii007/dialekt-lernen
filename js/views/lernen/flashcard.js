// Karteikarten-Modus · Aktive Karte mit Bewertung
// Drag/swipe: left = schwer, right = leicht, up = mittel.
import { el, speak, toast } from '../../util.js';
import { setLernstand, isFavorit, toggleFavorit } from '../../store.js';
import { getReviewPreview } from '../../store/srs.js';
import { confettiBurst } from '../../util/motion.js';
import { icon } from '../../util/icons.js';
import { sfx, vibrate } from '../../util/sounds.js';
import { createWaveform } from '../../util/waveform.js';
import { buildCloze } from '../../util/cloze.js';
import { shareCard } from '../../util/share-card.js';
import { formatIpa } from '../../util/ipa.js';
import { isPronunciationSupported, startListening, scoreBestAlternative } from '../../util/pronunciation.js';
import { ALLE_AUSDRUECKE } from '../../../data/dialekte.js';

const SWIPE_THRESHOLD = 100;
const ROTATE_FACTOR  = 0.06;
const VELOCITY_BOOST = 0.45; // Boost für schnelle Wischgesten (px/ms)

export function renderFlashcard(session, { onPrev, onRate, onAbort, onRerender, onFlip }) {
  const c = session.cards[session.idx];
  const total = session.cards.length;
  const progress = ((session.idx) / total) * 100;
  const fav = isFavorit(c.dialektId, c.id);
  // FSRS-Intervall-Vorschau je Bewertung (null im SM-2-Modus → keine Hints).
  const preview = getReviewPreview(c.dialektId, c.id);

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
        onClick: (e) => { e.stopPropagation(); sfx.click(); speak(c.ausdruck, c.dialektLang || 'de-DE'); },
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
    setTimeout(() => speak(c.ausdruck, c.dialektLang || 'de-DE'), 200);
  } else if (mode === 'cloze') {
    // Lückentext: Beispielsatz mit ausgeschnittenem Ausdruck
    const { before, hidden, after, found } = buildCloze(c.beispiel || '', c.ausdruck);
    const expected = found ? hidden : c.ausdruck;
    front.appendChild(el('div', { class: 'fc-label' }, '✎ Lückentext · ' + c.dialektFlag + ' ' + c.dialektName));
    if (found) {
      const sentence = el('div', { class: 'fc-cloze-sentence' });
      sentence.appendChild(document.createTextNode(before));
      sentence.appendChild(el('span', { class: 'fc-cloze-blank' }, '_____'));
      sentence.appendChild(document.createTextNode(after));
      front.appendChild(sentence);
    } else {
      front.appendChild(el('div', { class: 'fc-cloze-sentence' }, (c.beispiel || '') + ' _____'));
    }
    front.appendChild(el('div', { class: 'fc-hint' }, 'Welches Wort fehlt? (Hochdeutsch: ' + c.hochdeutsch + ')'));
    const clozeInput = el('input', {
      class: 'fc-type-input',
      type: 'text',
      placeholder: 'Wort eingeben…',
      autocomplete: 'off',
      spellcheck: 'false'
    });
    const clozeFeedback = el('div', { class: 'fc-type-feedback' });
    const submitCloze = () => {
      if (clozeFeedback.classList.contains('is-ok') ||
          clozeFeedback.classList.contains('is-close') ||
          clozeFeedback.classList.contains('is-wrong')) return; // schon geprüft
      const ok = checkTypedAnswer(clozeInput.value, expected);
      const distance = levenshteinSimple(normalizeForType(clozeInput.value), normalizeForType(expected));
      clozeFeedback.classList.remove('is-ok', 'is-close', 'is-wrong');
      if (ok) { clozeFeedback.classList.add('is-ok'); clozeFeedback.textContent = '✓ Richtig — ' + expected; sfx.correct(); vibrate([10, 30, 10]); }
      else if (distance <= 2) { clozeFeedback.classList.add('is-close'); clozeFeedback.textContent = '◐ Fast — ' + expected; sfx.rate(2); }
      else { clozeFeedback.classList.add('is-wrong'); clozeFeedback.textContent = '✗ ' + expected; sfx.wrong(); }
      onFlip(card);
    };
    clozeInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); submitCloze(); }
    });
    front.appendChild(el('div', { class: 'fc-type-form', onClick: (e) => e.stopPropagation() },
      clozeInput, clozeFeedback,
      el('button', { class: 'btn btn-primary', onClick: submitCloze }, 'Prüfen ↵')
    ));
    setTimeout(() => clozeInput.focus(), 80);
    back.appendChild(el('div', { class: 'fc-label' }, 'Vollständiger Satz'));
    back.appendChild(el('div', { class: 'fc-cloze-full' }, c.beispiel || ''));
    back.appendChild(el('div', { class: 'fc-hd' }, '↦ ' + (c.beispiel_hd || c.hochdeutsch)));
    back.appendChild(el('div', { class: 'fc-meaning' }, c.bedeutung));
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
    const submitType = () => {
      if (feedback.classList.contains('is-ok') ||
          feedback.classList.contains('is-close') ||
          feedback.classList.contains('is-wrong')) return; // schon geprüft
      const ok = checkTypedAnswer(input.value, c.hochdeutsch);
      const distance = levenshteinSimple(normalizeForType(input.value), normalizeForType(c.hochdeutsch));
      feedback.classList.remove('is-ok', 'is-close', 'is-wrong');
      if (ok) { feedback.classList.add('is-ok'); sfx.correct(); vibrate([10, 30, 10]); }
      else if (distance <= 2) { feedback.classList.add('is-close'); sfx.rate(2); }
      else { feedback.classList.add('is-wrong'); sfx.wrong(); }
      feedback.textContent = ok ? '✓ Richtig — ' + c.hochdeutsch
        : distance <= 2 ? '◐ Fast — ' + c.hochdeutsch
        : '✗ ' + c.hochdeutsch;
      onFlip(card);
    };
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); submitType(); }
    });
    front.appendChild(el('div', { class: 'fc-type-form', onClick: (e) => e.stopPropagation() },
      input, feedback,
      el('button', { class: 'btn btn-primary', onClick: submitType }, 'Prüfen ↵')
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
  } else if (mode === 'diktat') {
    // Diktat: TTS spielt Beispielsatz (Fallback: Ausdruck), User tippt mit
    const dictText = (c.beispiel && c.beispiel.trim()) ? c.beispiel : c.ausdruck;
    const playDict = () => { sfx.click(); speak(dictText, c.dialektLang || 'de-DE'); };
    front.appendChild(el('div', { class: 'fc-label' }, '✍ Diktat · ' + c.dialektFlag + ' ' + c.dialektName));
    front.appendChild(el('div', { class: 'fc-audio-only' },
      el('button', {
        class: 'fc-big-speak',
        onClick: (e) => { e.stopPropagation(); playDict(); },
        title: 'Anhören'
      },
        icon('speaker', { size: 48 }),
        el('div', { class: 'fc-big-speak-hint' }, 'Klicken zum Hören')
      )
    ));
    front.appendChild(el('div', { class: 'fc-hint' }, 'Tippe ein, was du hörst:'));
    const dictInput = el('input', {
      class: 'fc-type-input',
      type: 'text',
      placeholder: 'Mitschreiben…',
      autocomplete: 'off',
      spellcheck: 'false'
    });
    const dictFeedback = el('div', { class: 'fc-type-feedback' });
    const submitDict = () => {
      if (dictFeedback.classList.contains('is-ok') ||
          dictFeedback.classList.contains('is-close') ||
          dictFeedback.classList.contains('is-wrong')) return;
      const ok = checkTypedAnswer(dictInput.value, dictText);
      const distance = levenshteinSimple(normalizeForType(dictInput.value), normalizeForType(dictText));
      const tolerance = Math.max(2, Math.floor(normalizeForType(dictText).length / 6));
      dictFeedback.classList.remove('is-ok', 'is-close', 'is-wrong');
      if (ok) {
        dictFeedback.classList.add('is-ok');
        dictFeedback.textContent = '✓ Richtig — ' + dictText;
        sfx.correct(); vibrate([10, 30, 10]);
      } else if (distance <= tolerance) {
        dictFeedback.classList.add('is-close');
        dictFeedback.textContent = '◐ Fast — ' + dictText;
        sfx.rate(2);
      } else {
        dictFeedback.classList.add('is-wrong');
        dictFeedback.textContent = '✗ ' + dictText;
        sfx.wrong();
      }
      onFlip(card);
    };
    dictInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); submitDict(); }
    });
    front.appendChild(el('div', { class: 'fc-type-form', onClick: (e) => e.stopPropagation() },
      dictInput, dictFeedback,
      el('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } },
        el('button', {
          class: 'btn btn-ghost',
          onClick: (e) => { e.stopPropagation(); playDict(); },
          title: 'Nochmal anhören'
        }, '🔁 Nochmal anhören'),
        el('button', { class: 'btn btn-primary', onClick: submitDict }, 'Prüfen ↵')
      )
    ));
    setTimeout(() => { dictInput.focus(); playDict(); }, 200);
    back.appendChild(el('div', { class: 'fc-label' }, 'Lösung'));
    back.appendChild(el('div', { class: 'fc-expr' }, dictText));
    back.appendChild(el('div', { class: 'fc-hd' }, '↦ ' + (c.beispiel_hd || c.hochdeutsch)));
    back.appendChild(el('div', { class: 'fc-meaning' }, c.bedeutung));
  } else if (mode === 'hoeren') {
    // Hörverständnis: Nur Audio (Ausdruck), 4 Optionen mit Hochdeutsch-Übersetzungen
    front.appendChild(el('div', { class: 'fc-label' }, '👂 Hörverständnis · ' + c.dialektFlag + ' ' + c.dialektName));
    front.appendChild(el('div', { class: 'fc-audio-only' },
      el('button', {
        class: 'fc-big-speak',
        onClick: (e) => { e.stopPropagation(); sfx.click(); speak(c.ausdruck, c.dialektLang || 'de-DE'); },
        title: 'Anhören'
      },
        icon('speaker', { size: 48 }),
        el('div', { class: 'fc-big-speak-hint' }, 'Klicken zum Hören')
      )
    ));
    front.appendChild(el('div', { class: 'fc-hint fc-mc-hint' }, 'Was bedeutet das? Wähle die richtige Übersetzung:'));
    const hChoices = buildMcChoices(c, ALLE_AUSDRUECKE);
    const hRow = el('div', { class: 'fc-mc-options', onClick: (e) => e.stopPropagation() });
    let hAnswered = false;
    hChoices.forEach((opt) => {
      const btn = el('button', {
        class: 'fc-mc-opt',
        onClick: () => {
          if (hAnswered) return;
          hAnswered = true;
          const correct = opt.hochdeutsch === c.hochdeutsch;
          hRow.querySelectorAll('.fc-mc-opt').forEach(b => {
            if (b.dataset.answer === c.hochdeutsch) b.classList.add('mc-correct');
          });
          btn.classList.add(correct ? 'mc-correct' : 'mc-wrong');
          if (correct) {
            sfx.correct(); vibrate([10, 30, 10]);
            confettiBurst(btn, { count: 40 });
            setTimeout(() => { rateAndPersist(c, 3, session, onRate); }, 800);
          } else {
            sfx.wrong(); vibrate([12, 60, 12]);
            setTimeout(() => { rateAndPersist(c, 1, session, onRate); }, 1200);
          }
        }
      }, opt.hochdeutsch);
      btn.dataset.answer = opt.hochdeutsch;
      hRow.appendChild(btn);
    });
    front.appendChild(hRow);
    // Auto-play beim Erscheinen
    setTimeout(() => speak(c.ausdruck, c.dialektLang || 'de-DE'), 200);
    back.appendChild(el('div', { class: 'fc-label' }, 'Auflösung'));
    back.appendChild(el('div', { class: 'fc-expr' }, c.ausdruck));
    back.appendChild(el('div', { class: 'fc-hd' }, '↦ ' + c.hochdeutsch));
    back.appendChild(el('div', { class: 'fc-meaning' }, c.bedeutung));
  } else if (mode === 'voice-quiz') {
    // Voice-Quiz: TTS spielt Hochdeutsch, User wählt passenden Dialekt-Ausdruck
    const playHd = () => { sfx.click(); speak(c.hochdeutsch, 'de-DE'); };
    front.appendChild(el('div', { class: 'fc-label' }, '🔊 Voice-Quiz · ' + c.dialektFlag + ' ' + c.dialektName));
    front.appendChild(el('div', { class: 'fc-audio-only' },
      el('button', {
        class: 'fc-big-speak',
        onClick: (e) => { e.stopPropagation(); playHd(); },
        title: 'Hochdeutsch anhören'
      },
        icon('speaker', { size: 48 }),
        el('div', { class: 'fc-big-speak-hint' }, 'Klicken zum Hören (Hochdeutsch)')
      )
    ));
    front.appendChild(el('div', { class: 'fc-hint fc-mc-hint' }, 'Welcher Dialekt-Ausdruck passt?'));
    const vChoices = buildMcChoices(c, ALLE_AUSDRUECKE);
    const vRow = el('div', { class: 'fc-mc-options', onClick: (e) => e.stopPropagation() });
    let vAnswered = false;
    vChoices.forEach((opt) => {
      const btn = el('button', {
        class: 'fc-mc-opt',
        onClick: () => {
          if (vAnswered) return;
          vAnswered = true;
          const correct = opt.ausdruck === c.ausdruck && opt.id === c.id;
          vRow.querySelectorAll('.fc-mc-opt').forEach(b => {
            if (b.dataset.answer === c.ausdruck) b.classList.add('mc-correct');
          });
          btn.classList.add(correct ? 'mc-correct' : 'mc-wrong');
          if (correct) {
            sfx.correct(); vibrate([10, 30, 10]);
            confettiBurst(btn, { count: 40 });
            // Bonus: nach Auswahl Dialekt-Audio abspielen
            setTimeout(() => speak(c.ausdruck, c.dialektLang || 'de-DE'), 300);
            setTimeout(() => { rateAndPersist(c, 3, session, onRate); }, 1400);
          } else {
            sfx.wrong(); vibrate([12, 60, 12]);
            setTimeout(() => { rateAndPersist(c, 1, session, onRate); }, 1200);
          }
        }
      }, opt.ausdruck);
      btn.dataset.answer = opt.ausdruck;
      vRow.appendChild(btn);
    });
    front.appendChild(vRow);
    // Auto-play Hochdeutsch
    setTimeout(() => speak(c.hochdeutsch, 'de-DE'), 200);
    back.appendChild(el('div', { class: 'fc-label' }, 'Auflösung'));
    back.appendChild(el('div', { class: 'fc-expr' }, c.ausdruck));
    back.appendChild(el('div', { class: 'fc-hd' }, '↦ ' + c.hochdeutsch));
    back.appendChild(el('div', { class: 'fc-meaning' }, c.bedeutung));
  } else if (mode === 'pron') {
    // Aussprache-Check via Web Speech Recognition
    front.appendChild(el('div', { class: 'fc-label' }, '🎤 Aussprache · ' + c.dialektFlag + ' ' + c.dialektName));
    front.appendChild(el('div', { class: 'fc-expr is-speakable' }, c.ausdruck));
    front.appendChild(el('div', { class: 'expr-ipa' }, formatIpa(c.ausdruck, c.dialektId).replace(/^\/|\/$/g, '')));
    if (!isPronunciationSupported()) {
      front.appendChild(el('div', { class: 'fc-hint', style: { color: 'var(--warm, #fb923c)' } },
        'Aussprache-Erkennung wird vom Browser nicht unterstützt. Versuche Chrome/Edge.'));
      back.appendChild(el('div', { class: 'fc-label' }, 'Lösung'));
      back.appendChild(el('div', { class: 'fc-hd' }, c.hochdeutsch));
      back.appendChild(el('div', { class: 'fc-meaning' }, c.bedeutung));
    } else {
      const statusEl = el('div', { class: 'pron-check-status' }, 'Klicke das Mikrofon und sprich den Ausdruck.');
      const micBtn = el('button', {
        class: 'pron-mic-btn',
        title: 'Aufnahme starten/stoppen',
        onClick: (e) => {
          e.stopPropagation();
          if (micBtn.classList.contains('is-recording')) {
            currentStop?.();
            return;
          }
          micBtn.classList.add('is-recording');
          statusEl.classList.remove('is-ok', 'is-wrong');
          statusEl.classList.add('is-listening');
          statusEl.textContent = 'Höre zu… sprich jetzt.';
          let currentStop = startListening({
            lang: c.dialektLang || 'de-DE',
            onPartial: (t) => { statusEl.textContent = '… ' + t; },
            onResult: ({ transcript, alternatives }) => {
              const best = scoreBestAlternative(c.ausdruck,
                (alternatives && alternatives.length) ? alternatives : [transcript]);
              statusEl.classList.remove('is-listening');
              statusEl.classList.add(best.ok ? 'is-ok' : 'is-wrong');
              statusEl.textContent = best.ok
                ? `✓ Gehört: „${best.transcript}" (${Math.round(best.score * 100)}%)`
                : `✗ Gehört: „${best.transcript}" — versuche es nochmal`;
              if (best.ok) {
                sfx.correct(); vibrate([10, 30, 10]);
                setTimeout(() => onFlip(card), 800);
              } else {
                sfx.wrong();
              }
            },
            onError: (err) => {
              statusEl.classList.remove('is-listening');
              statusEl.classList.add('is-wrong');
              statusEl.textContent = 'Fehler: ' + (err.message || err);
              micBtn.classList.remove('is-recording');
            },
            onEnd: () => {
              micBtn.classList.remove('is-recording');
              statusEl.classList.remove('is-listening');
            },
          });
        }
      }, icon('speaker', { size: 22 }));
      front.appendChild(el('div', { class: 'pron-check-row', onClick: (e) => e.stopPropagation() },
        micBtn, statusEl
      ));
      front.appendChild(el('div', { class: 'pron-recog-note' },
        'ⓘ nutzt die Spracherkennung deines Browsers — dabei kann Audio an den Browser-Dienst (ggf. online) gehen.'));
      back.appendChild(el('div', { class: 'fc-label' }, 'Lösung'));
      back.appendChild(el('div', { class: 'fc-hd' }, c.hochdeutsch));
      back.appendChild(el('div', { class: 'fc-meaning' }, c.bedeutung));
    }
  } else {
    // Klassisch
    front.appendChild(el('div', { class: 'fc-label' }, c.dialektFlag + ' ' + c.dialektName));
    front.appendChild(el('div', { class: 'fc-expr is-speakable' }, c.ausdruck));
    front.appendChild(el('div', { class: 'expr-ipa', title: 'Lautschrift (IPA)' }, formatIpa(c.ausdruck, c.dialektId).replace(/^\/|\/$/g, '')));
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
      el('button', { class: 'fc-rate hard', onClick: () => { sfx.rate(1); vibrate(8);  rateAndPersist(c, 1, session, onRate); } },
        el('span', { class: 'fc-rate-label' }, 'Schwer'), ivalHint(preview, 1)),
      el('button', { class: 'fc-rate med',  onClick: () => { sfx.rate(2); vibrate(12); rateAndPersist(c, 2, session, onRate); } },
        el('span', { class: 'fc-rate-label' }, 'Mittel'), ivalHint(preview, 3)),
      el('button', { class: 'fc-rate easy', onClick: (e) => { sfx.rate(3); vibrate([10, 40, 10]); confettiBurst(e.currentTarget, { count: 60 }); rateAndPersist(c, 3, session, onRate); } },
        el('span', { class: 'fc-rate-label' }, 'Leicht'), ivalHint(preview, 4))
    ),
    speakControl(c)
  ));

  wrap.appendChild(el('div', { style: { textAlign: 'center', marginTop: '20px', display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' } },
    el('button', {
      class: 'btn btn-ghost',
      onClick: () => {
        const added = toggleFavorit(c.dialektId, c.id);
        toast(added ? 'Zu Favoriten hinzugefügt ♥' : 'Aus Favoriten entfernt', 'success', 1400);
        onRerender();
      }
    }, fav ? '♥ Aus Favoriten' : '♡ Zu Favoriten'),
    el('button', {
      class: 'btn btn-ghost',
      onClick: async (e) => {
        e.currentTarget.disabled = true;
        try {
          const result = await shareCard(c);
          toast(result === 'shared' ? 'Karte geteilt ✓' : 'Bild heruntergeladen ↓', 'success', 1600);
        } catch (err) {
          toast('Teilen fehlgeschlagen', 'error', 2000);
        } finally {
          e.currentTarget.disabled = false;
        }
      },
      title: 'Karte als Bild teilen'
    }, '📤 Teilen')
  ));

  return wrap;
}

function rateAndPersist(card, stand, session, onRate) {
  setLernstand(card.dialektId, card.id, stand);
  onRate(stand);
}

// Kompakte deutsche Intervall-Beschriftung für die Bewertungs-Buttons.
function fmtInterval(days) {
  const d = Math.round(Number(days) || 0);
  if (d <= 0) return '<1 T';
  if (d === 1) return '1 T';
  if (d < 7) return d + ' T';
  if (d < 30) return Math.round(d / 7) + ' Wo';
  if (d < 365) return Math.round(d / 30) + ' Mt';
  const y = d / 365;
  return (y < 10 ? y.toFixed(1) : String(Math.round(y))) + ' J';
}

// Intervall-Hinweis (oder null im SM-2-Modus, wo es keine Vorschau gibt).
// grade ist ein FSRS-Grade: 1=Again (Schwer), 3=Good (Mittel), 4=Easy (Leicht).
function ivalHint(preview, grade) {
  if (!preview) return null;
  return el('span', { class: 'fc-rate-ival' }, fmtInterval(preview[grade]));
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
    onClick: () => { sfx.click(); vibrate(6); speak(c.ausdruck, c.dialektLang || 'de-DE'); },
    title: 'Anhören',
    'aria-label': `„${c.ausdruck}" anhören`,
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
  let lastMoveTime = 0;
  let lastMoveX = 0, lastMoveY = 0;
  let velX = 0, velY = 0;

  // Adaptiver Threshold: auf kleinen Bildschirmen etwas niedriger
  const threshold = () => Math.min(SWIPE_THRESHOLD, window.innerWidth * 0.27);

  const setTransform = (x, y) => {
    const rot = x * ROTATE_FACTOR;
    card.style.setProperty('--drag-x', x.toFixed(1) + 'px');
    card.style.setProperty('--drag-y', y.toFixed(1) + 'px');
    card.style.setProperty('--drag-rot', rot.toFixed(2) + 'deg');
    const t = threshold();
    card.classList.toggle('drag-right', x >  t * 0.35);
    card.classList.toggle('drag-left',  x < -t * 0.35);
    card.classList.toggle('drag-up',    y < -t * 0.45 && Math.abs(x) < 60);
  };

  const reset = () => {
    card.classList.remove('is-dragging', 'drag-right', 'drag-left', 'drag-up');
    card.style.setProperty('--drag-x', '0px');
    card.style.setProperty('--drag-y', '0px');
    card.style.setProperty('--drag-rot', '0deg');
    card.style.touchAction = '';
  };

  card.addEventListener('pointerdown', (e) => {
    if (e.target.closest('button, input, select, textarea')) return;
    dragging = true;
    pointerId = e.pointerId;
    startX = e.clientX; startY = e.clientY;
    dx = dy = velX = velY = 0;
    lastMoveX = e.clientX; lastMoveY = e.clientY;
    lastMoveTime = e.timeStamp;
    // Wichtig für Mobile: scroll-Konflikte verhindern
    card.style.touchAction = 'none';
    card.setPointerCapture(pointerId);
    card.classList.add('is-dragging');
  });

  card.addEventListener('pointermove', (e) => {
    if (!dragging || e.pointerId !== pointerId) return;
    const now = e.timeStamp;
    const dt = Math.max(1, now - lastMoveTime);
    velX = (e.clientX - lastMoveX) / dt;
    velY = (e.clientY - lastMoveY) / dt;
    lastMoveX = e.clientX;
    lastMoveY = e.clientY;
    lastMoveTime = now;
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

    const t = threshold();
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    // Velocity-Boost: schnelle Wischgeste zählt auch bei kürzerem Weg
    const effectiveDx = dx + velX * (1 / VELOCITY_BOOST) * t;
    const effectiveDy = dy + velY * (1 / VELOCITY_BOOST) * t;
    const effAbsX = Math.abs(effectiveDx);
    const effAbsY = Math.abs(effectiveDy);

    let rated = false;

    if (effAbsX > t && effAbsX >= effAbsY) {
      const dir = effectiveDx > 0 ? 1 : -1;
      card.classList.add(dir > 0 ? 'is-flying-right' : 'is-flying-left');
      sfx.swipe();
      vibrate(dir > 0 ? [10, 30, 10] : 8);
      setTimeout(() => onRate(dir > 0 ? 3 : 1), 250);
      rated = true;
    } else if (-effectiveDy > t * 0.8 && effAbsX < effAbsY) {
      card.classList.add('is-flying-up');
      sfx.swipe();
      vibrate(12);
      setTimeout(() => onRate(2), 250);
      rated = true;
    }

    if (!rated) reset();
  };

  card.addEventListener('pointerup',           () => finish(false));
  card.addEventListener('pointercancel',        () => finish(true));
  card.addEventListener('lostpointercapture',   () => finish(true));
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

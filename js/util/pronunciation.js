// Pronunciation Check via Web Speech API (SpeechRecognition).
//
// API:
//   isPronunciationSupported() → boolean
//   startListening({ lang, onPartial, onResult, onError, onEnd }) → stop()
//   scorePronunciation(expected, transcript) → { ok, score, normalized }
//
// Hinweise:
//   - Web Speech Recognition braucht meist HTTPS und Microphone-Permission.
//   - Funktioniert in Chrome/Edge nativ, Firefox/Safari nur teilweise.
//   - Wir matchen über Levenshtein mit Toleranz — Dialekte sind nicht
//     Standard-Aussprache, der TTS-Service erkennt eh nicht perfekt.

import { normalize } from './text.js';

const SR = typeof window !== 'undefined'
  ? (window.SpeechRecognition || window.webkitSpeechRecognition)
  : null;

export function isPronunciationSupported() {
  return !!SR;
}

/**
 * Startet Mikrofon-Aufnahme + Erkennung.
 * Gibt eine stop()-Funktion zurück, die du jederzeit aufrufen kannst.
 */
export function startListening({ lang = 'de-DE', onPartial, onResult, onError, onEnd, timeoutMs = 8000 } = {}) {
  if (!SR) {
    onError?.(new Error('Speech Recognition not supported'));
    onEnd?.();
    return () => {};
  }
  const rec = new SR();
  rec.lang = lang;
  rec.interimResults = true;
  rec.maxAlternatives = 3;
  rec.continuous = false;

  let stopped = false;
  let bestTranscript = '';

  rec.onresult = (e) => {
    const last = e.results[e.results.length - 1];
    if (!last) return;
    const top = last[0].transcript || '';
    if (!last.isFinal) {
      onPartial?.(top);
    } else {
      bestTranscript = top;
      // Sammle die besten Alternativen (oft sind sie ähnlich)
      const alts = [];
      for (let i = 0; i < last.length; i++) {
        alts.push(last[i].transcript);
      }
      onResult?.({ transcript: top, alternatives: alts });
    }
  };

  rec.onerror = (e) => {
    if (stopped) return;
    onError?.(new Error(e.error || 'unknown'));
  };

  rec.onend = () => {
    if (stopped) return;
    stopped = true;
    onEnd?.(bestTranscript);
  };

  try {
    rec.start();
  } catch (e) {
    onError?.(e);
    onEnd?.();
    return () => {};
  }

  // Auto-Timeout, falls der User nichts sagt
  const timer = setTimeout(() => {
    if (!stopped) {
      stopped = true;
      try { rec.stop(); } catch {}
      onEnd?.(bestTranscript);
    }
  }, timeoutMs);

  return () => {
    if (stopped) return;
    stopped = true;
    clearTimeout(timer);
    try { rec.stop(); } catch {}
  };
}

// Grobe deutsche Laut-Annäherung: faltet Schreibweisen, die gleich (oder fast
// gleich) klingen, auf eine gemeinsame Form. Spracherkenner liefern für Dialekt-
// Wörter oft eine Standard-Schreibweise — diese Faltung macht den Vergleich
// fairer (z. B. „Vadder" ~ „Fatter", „Wasser" ~ „Waser"). Eingabe ist bereits
// normalize()-t (kleingeschrieben, ohne Diakritika, ß→ss).
export function phoneticFold(s) {
  let x = String(s || '');
  x = x
    .replace(/ph/g, 'f')
    .replace(/th/g, 't')
    .replace(/dt/g, 't')
    .replace(/ck/g, 'k')
    .replace(/chs/g, 'ks')
    .replace(/ie/g, 'i')
    .replace(/z/g, 'ts')   // z und tz klingen gleich (Katze ~ Katse)
    .replace(/v/g, 'f')    // Vater ~ Fater
    .replace(/w/g, 'v');   // Wasser ~ Vasser (eigener Laut, nicht zu f)
  // Doppelte Buchstaben kollabieren (Schiff ~ Schif, Mann ~ Man).
  x = x.replace(/(.)\1+/g, '$1');
  return x;
}

function simRatio(a, b) {
  if (!a || !b) return 0;
  const maxLen = Math.max(a.length, b.length);
  return maxLen ? 1 - levenshtein(a, b) / maxLen : 0;
}

/**
 * Vergleicht ein Transcript mit dem erwarteten Ausdruck — toleranter Match,
 * da Web Speech Recognition mit Dialekten oft eigene Schreibweise produziert.
 *
 * @returns { ok: boolean, score: number (0..1), normalized: { expected, got } }
 */
export function scorePronunciation(expected, transcript) {
  const e = normalize(expected || '');
  const t = normalize(transcript || '');
  if (!e || !t) return { ok: false, score: 0, normalized: { expected: e, got: t } };

  // 1) Exakter Match
  if (e === t) return { ok: true, score: 1, normalized: { expected: e, got: t } };

  // 2) Substring (oft enthält das Transcript Füllwörter)
  if (t.includes(e) || e.includes(t)) {
    return { ok: true, score: 0.92, normalized: { expected: e, got: t } };
  }

  // 3) Phonetisch identisch (nach Laut-Faltung) → sehr hoher Score.
  const ef = phoneticFold(e), tf = phoneticFold(t);
  if (ef && ef === tf) {
    return { ok: true, score: 0.9, normalized: { expected: e, got: t } };
  }

  // 4) Levenshtein-Toleranz — besseren Wert aus Roh- und Laut-Vergleich nehmen.
  const score = Math.max(simRatio(e, t), simRatio(ef, tf));

  // Akzeptanz-Schwelle: 70%
  return { ok: score >= 0.7, score, normalized: { expected: e, got: t } };
}

/**
 * Bewertet den Ausdruck gegen mehrere Erkenner-Alternativen und liefert den
 * besten Treffer zurück. Spracherkenner geben oft 1–3 Varianten — die ähnlichste
 * gewinnt. Leere/fehlende Liste → Score 0.
 *
 * @returns { ok, score, transcript, normalized }
 */
export function scoreBestAlternative(expected, alternatives) {
  const list = Array.isArray(alternatives)
    ? alternatives.filter((a) => typeof a === 'string' && a.length)
    : (typeof alternatives === 'string' && alternatives.length ? [alternatives] : []);
  if (!list.length) {
    const n = normalize(expected || '');
    return { ok: false, score: 0, transcript: '', normalized: { expected: n, got: '' } };
  }
  let best = null;
  for (const alt of list) {
    const r = scorePronunciation(expected, alt);
    if (!best || r.score > best.score) best = { ...r, transcript: alt };
  }
  return best;
}

function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a || !b) return Math.max(a.length, b.length);
  const m = a.length, n = b.length;
  const dp = new Array(n + 1);
  for (let j = 0; j <= n; j++) dp[j] = j;
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + cost);
      prev = tmp;
    }
  }
  return dp[n];
}

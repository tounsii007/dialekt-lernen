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

  // 3) Levenshtein-Toleranz
  const dist = levenshtein(e, t);
  const maxLen = Math.max(e.length, t.length);
  const score = maxLen ? 1 - dist / maxLen : 0;

  // Akzeptanz-Schwelle: 70%
  return { ok: score >= 0.7, score, normalized: { expected: e, got: t } };
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

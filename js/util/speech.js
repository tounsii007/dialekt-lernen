// Web Speech API Wrapper — robust gegenüber fehlenden Browser-Features.
//
// Erweiterungen:
//   * lang-Parameter (BCP-47) wird genutzt, um die passende Stimme zu wählen
//     (de-CH für Schwizerdütsch, de-AT für Wienerisch, nds für Plattdeutsch …).
//   * Wenn die exakte Sprache fehlt, fällt das Voice-Matching schrittweise
//     auf das Sprachen-Präfix (z. B. „de") und dann auf irgendeine deutsche
//     Stimme zurück.
//   * Voices werden gecached, sobald sie verfügbar sind (in den meisten
//     Browsern erst nach `voiceschanged`).

const DEFAULT_RATE = 0.92;
const DEFAULT_PITCH = 1;

let cachedVoices = [];

function loadVoices() {
  if (!isSpeechSupported()) return [];
  try {
    cachedVoices = window.speechSynthesis.getVoices() || [];
  } catch {
    cachedVoices = [];
  }
  return cachedVoices;
}

// Browser laden Voices teilweise asynchron — auf voiceschanged hören.
if (typeof window !== 'undefined' && window.speechSynthesis) {
  loadVoices();
  try {
    window.speechSynthesis.addEventListener?.('voiceschanged', loadVoices);
  } catch {
    // Safari / ältere Browser: nicht kritisch — getVoices wird onCall geladen.
  }
}

export function isSpeechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

// Wählt die beste verfügbare Stimme für eine Ziel-Sprache.
// Match-Prioritäten:
//   1) Exakter lang-Match (de-CH = de-CH)
//   2) Sprach-Präfix-Match (de-CH → de-*)
//   3) Default-Voice
export function pickVoice(lang = 'de-DE') {
  const voices = cachedVoices.length ? cachedVoices : loadVoices();
  if (!voices.length) return null;

  // 1) exakt
  const exact = voices.find((v) => v.lang === lang);
  if (exact) return exact;

  // 2) Präfix (z. B. „de" für „de-CH"/„de-DE"/„de-AT")
  const prefix = lang.split('-')[0];
  const prefixMatch = voices.find((v) => v.lang?.toLowerCase().startsWith(prefix.toLowerCase() + '-'));
  if (prefixMatch) return prefixMatch;

  // 3) Default
  return voices.find((v) => v.default) || voices[0] || null;
}

// Liefert echte Sprache der gewählten Stimme — nützlich für UI-Hinweise
// ("Hochdeutsche Stimme — echte Schweizer-Aussprache nicht verfügbar").
export function getSpeechStatus(lang = 'de-DE') {
  if (!isSpeechSupported()) return { available: false, voice: null, exact: false };
  const voice = pickVoice(lang);
  if (!voice) return { available: false, voice: null, exact: false };
  return {
    available: true,
    voice: voice.name,
    voiceLang: voice.lang,
    requested: lang,
    exact: voice.lang === lang,
  };
}

export function speak(text, lang = 'de-DE') {
  if (!isSpeechSupported()) return false;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(String(text));
    utterance.lang = lang;
    utterance.rate = DEFAULT_RATE;
    utterance.pitch = DEFAULT_PITCH;

    const voice = pickVoice(lang);
    if (voice) {
      utterance.voice = voice;
      // utterance.lang wird vom Browser auf die Voice-Sprache normalisiert.
      utterance.lang = voice.lang;
    }

    const setState = (on) => {
      document.documentElement.classList.toggle('is-speaking', on);
    };
    utterance.onstart = () => setState(true);
    utterance.onend = () => setState(false);
    utterance.onerror = () => setState(false);

    // Optimistisches Flag — Safari feuert onstart nicht zuverlässig.
    setState(true);
    window.speechSynthesis.speak(utterance);
    // Hartes Timeout-Fallback, falls onend nie kommt.
    setTimeout(() => setState(false), Math.max(2500, text.length * 90));
    return true;
  } catch {
    return false;
  }
}

// Web Speech API Wrapper — robust gegenüber fehlenden Browser-Features.

const DEFAULT_RATE = 0.95;
const DEFAULT_PITCH = 1;

export function isSpeechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function speak(text, lang = 'de-DE') {
  if (!isSpeechSupported()) return false;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(String(text));
    utterance.lang = lang;
    utterance.rate = DEFAULT_RATE;
    utterance.pitch = DEFAULT_PITCH;
    window.speechSynthesis.speak(utterance);
    return true;
  } catch {
    return false;
  }
}

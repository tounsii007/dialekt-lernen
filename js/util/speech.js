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

    const setState = (on) => {
      document.documentElement.classList.toggle('is-speaking', on);
    };
    utterance.onstart = () => setState(true);
    utterance.onend = () => setState(false);
    utterance.onerror = () => setState(false);

    // Optimistic flag; some browsers (Safari) don't reliably fire onstart.
    setState(true);
    window.speechSynthesis.speak(utterance);
    // Hard timeout fallback in case browser never emits onend.
    setTimeout(() => setState(false), Math.max(2500, text.length * 90));
    return true;
  } catch {
    return false;
  }
}

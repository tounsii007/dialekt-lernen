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
//   * Tempo (rate), Tonhöhe (pitch) und eine bevorzugte Stimme werden
//     persistent im State gespeichert und auf jede Ausgabe angewendet.
//     Eine explizit gewählte Stimme schlägt das Auto-Matching, solange ihr
//     Sprach-Präfix zur angeforderten Sprache passt (alle Inhalte sind
//     deutsche Varianten → die Wunschstimme gilt für alle Dialekte).

import { state, persist } from '../store/state.js';
import { getVoiceProfile, respellForTts, assignVoiceURI } from './voice-profiles.js';

const DEFAULT_RATE = 0.92;
const DEFAULT_PITCH = 1;

// Klemm-Grenzen — außerhalb klingt die Synthese verzerrt/unbrauchbar.
export const RATE_MIN = 0.5;
export const RATE_MAX = 1.6;
export const PITCH_MIN = 0.5;
export const PITCH_MAX = 1.6;

let cachedVoices = [];
const voicesListeners = new Set();

function loadVoices() {
  if (!isSpeechSupported()) return [];
  try {
    cachedVoices = window.speechSynthesis.getVoices() || [];
  } catch {
    cachedVoices = [];
  }
  // Abonnenten (UI-Picker) benachrichtigen — Voices kommen oft asynchron.
  voicesListeners.forEach((fn) => { try { fn(cachedVoices); } catch {} });
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

function clamp(n, lo, hi, fallback) {
  const v = Number(n);
  if (!Number.isFinite(v)) return fallback;
  return Math.min(hi, Math.max(lo, v));
}

// Aktuelle Sprachausgabe-Einstellungen (defensiv — State kann teilweise fehlen).
export function getSpeechSettings() {
  const s = (state && state.speech) || {};
  return {
    rate: clamp(s.rate, RATE_MIN, RATE_MAX, DEFAULT_RATE),
    pitch: clamp(s.pitch, PITCH_MIN, PITCH_MAX, DEFAULT_PITCH),
    voiceURI: typeof s.voiceURI === 'string' && s.voiceURI ? s.voiceURI : null,
    // Eigene Stimme pro Dialekt — standardmäßig an (nur explizit false schaltet ab).
    dialectVoices: s.dialectVoices !== false,
  };
}

// Patch der Einstellungen + Persistenz. Gibt die normalisierten Werte zurück.
export function setSpeechSettings(patch = {}) {
  if (!state.speech || typeof state.speech !== 'object') {
    state.speech = { rate: DEFAULT_RATE, pitch: DEFAULT_PITCH, voiceURI: null, dialectVoices: true };
  }
  if ('rate' in patch) state.speech.rate = clamp(patch.rate, RATE_MIN, RATE_MAX, DEFAULT_RATE);
  if ('pitch' in patch) state.speech.pitch = clamp(patch.pitch, PITCH_MIN, PITCH_MAX, DEFAULT_PITCH);
  if ('voiceURI' in patch) {
    state.speech.voiceURI = (typeof patch.voiceURI === 'string' && patch.voiceURI) ? patch.voiceURI : null;
  }
  if ('dialectVoices' in patch) state.speech.dialectVoices = !!patch.dialectVoices;
  try { persist(); } catch {}
  return getSpeechSettings();
}

// Alle verfügbaren Stimmen (für den UI-Picker). Deutsche zuerst, dann der Rest,
// jeweils alphabetisch. Liefert schlanke Objekte (kein lebendes Voice-Objekt).
export function listVoices() {
  const voices = cachedVoices.length ? cachedVoices : loadVoices();
  return voices
    .map((v) => ({ name: v.name, lang: v.lang, voiceURI: v.voiceURI, default: !!v.default }))
    .sort((a, b) => {
      const ad = (a.lang || '').toLowerCase().startsWith('de');
      const bd = (b.lang || '').toLowerCase().startsWith('de');
      if (ad !== bd) return ad ? -1 : 1;
      return (a.name || '').localeCompare(b.name || '', 'de');
    });
}

// UI darf sich registrieren, um auf nachladende Voices zu reagieren.
export function onVoicesChanged(fn) {
  if (typeof fn !== 'function') return () => {};
  voicesListeners.add(fn);
  return () => voicesListeners.delete(fn);
}

function findByURI(uri) {
  if (!uri) return null;
  const voices = cachedVoices.length ? cachedVoices : loadVoices();
  return voices.find((v) => v.voiceURI === uri) || null;
}

// Wählt die beste verfügbare Stimme für eine Ziel-Sprache.
// Match-Prioritäten:
//   0) Wunschstimme des Nutzers, falls gesetzt und Sprach-Präfix passt
//   1) Exakter lang-Match (de-CH = de-CH)
//   2) Sprach-Präfix-Match (de-CH → de-*)
//   3) Default-Voice
export function pickVoice(lang = 'de-DE', preferredURI = getSpeechSettings().voiceURI) {
  const voices = cachedVoices.length ? cachedVoices : loadVoices();
  if (!voices.length) return null;

  const prefix = (lang.split('-')[0] || '').toLowerCase();

  // 0) Explizite Wunschstimme — nur wenn das Sprach-Präfix zur Anfrage passt,
  //    damit eine deutsche Wunschstimme nicht fälschlich Fremdsprachen liest.
  if (preferredURI) {
    const pref = findByURI(preferredURI);
    if (pref && (pref.lang || '').toLowerCase().startsWith(prefix)) return pref;
  }

  // 1) exakt
  const exact = voices.find((v) => v.lang === lang);
  if (exact) return exact;

  // 2) Präfix (z. B. „de" für „de-CH"/„de-DE"/„de-AT")
  const prefixMatch = voices.find((v) => v.lang?.toLowerCase().startsWith(prefix + '-'));
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
    preferred: !!getSpeechSettings().voiceURI && voice.voiceURI === getSpeechSettings().voiceURI,
  };
}

// Handle des harten onend-Fallback-Timers. Modulweit, damit ein neues speak()
// (oder onend/onerror) den Timer der vorigen Äußerung clearen kann — sonst
// beendet ein veralteter Timer den Sprechzustand einer NEUEN Äußerung zu früh.
let _fallbackTimer = null;

// Sprich `text`. Optionen überschreiben die persistenten Einstellungen
// punktuell (z. B. Slow-Mo-Wiedergabe mit { rate: 0.6 }).
export function speak(text, lang = 'de-DE', opts = {}) {
  if (!isSpeechSupported()) return false;
  try {
    if (_fallbackTimer) { clearTimeout(_fallbackTimer); _fallbackTimer = null; }
    const settings = getSpeechSettings();
    window.speechSynthesis.cancel();

    // Dialekt-Modus: eigenes Stimmprofil + lautnahes Respelling — aktiv, sobald
    // eine dialektId übergeben wurde UND der globale Schalter eingeschaltet ist.
    const useDialect = settings.dialectVoices && !!opts.dialektId;
    const profile = useDialect ? getVoiceProfile(opts.dialektId) : null;

    const spoken = useDialect ? respellForTts(text, opts.dialektId) : String(text);
    const utterance = new SpeechSynthesisUtterance(String(spoken));
    utterance.lang = lang;

    // Profil-Tonhöhe/-Tempo sind Multiplikatoren auf die Basis (bzw. opts-Override,
    // z. B. Slow-Mo) — so bleibt Langsam-Wiedergabe langsam und der Dialekt klingt
    // trotzdem eigen, selbst wenn nur eine Stimme installiert ist.
    const baseRate = opts.rate ?? settings.rate;
    const basePitch = opts.pitch ?? settings.pitch;
    utterance.rate = clamp(profile ? baseRate * profile.rate : baseRate, RATE_MIN, RATE_MAX, DEFAULT_RATE);
    utterance.pitch = clamp(profile ? basePitch * profile.pitch : basePitch, PITCH_MIN, PITCH_MAX, DEFAULT_PITCH);

    // Stimmenwahl: explizite Wunschstimme des Nutzers gewinnt immer; sonst im
    // Dialekt-Modus die dem Dialekt fest zugewiesene Stimme; sonst Auto-Matching.
    let preferredURI = opts.voiceURI ?? settings.voiceURI;
    if (useDialect && !preferredURI) {
      preferredURI = assignVoiceURI(opts.dialektId, lang, cachedVoices.length ? cachedVoices : loadVoices());
    }
    const voice = pickVoice(lang, preferredURI);
    if (voice) {
      utterance.voice = voice;
      // utterance.lang wird vom Browser auf die Voice-Sprache normalisiert.
      utterance.lang = voice.lang;
    }

    const setState = (on) => {
      document.documentElement.classList.toggle('is-speaking', on);
    };
    const finish = () => {
      if (_fallbackTimer) { clearTimeout(_fallbackTimer); _fallbackTimer = null; }
      setState(false);
    };
    utterance.onstart = () => setState(true);
    utterance.onend = finish;
    utterance.onerror = finish;

    // Optimistisches Flag — Safari feuert onstart nicht zuverlässig.
    setState(true);
    window.speechSynthesis.speak(utterance);
    // Hartes Timeout-Fallback, falls onend nie kommt. Langsameres Tempo
    // verlängert die Ausgabe → Timeout ans Tempo koppeln. Wird in finish()/
    // beim nächsten speak() gecleart.
    const ms = Math.max(2500, (String(spoken).length * 90) / Math.max(0.5, utterance.rate));
    _fallbackTimer = setTimeout(() => { _fallbackTimer = null; setState(false); }, ms);
    return true;
  } catch {
    return false;
  }
}

// Barrel-Datei: Re-Exports aller Util-Submodule.
// Bestehende Imports `import { … } from './util.js'` bleiben gültig.

export { $, $$, el, escapeHtml } from './util/dom.js';
export { shuffle, seededRandom, pickSeeded } from './util/random.js';
export { normalize } from './util/text.js';
export { debounce } from './util/timing.js';
export {
  speak, isSpeechSupported, getSpeechSettings, setSpeechSettings,
  listVoices, onVoicesChanged, getSpeechStatus,
  RATE_MIN, RATE_MAX, PITCH_MIN, PITCH_MAX
} from './util/speech.js';
export { parseHash, go, toPublicPath, initLinkInterception, ROUTE_EVENT } from './util/route.js';
export { toast } from './util/toast.js';
export {
  observeReveals, observeCounters, animateCounter,
  initSpotlight, initScrollProgress, confettiBurst,
  initTilt, initMagnetic, initParallax,
  registerParallax
} from './util/motion.js';

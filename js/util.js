// Barrel-Datei: Re-Exports aller Util-Submodule.
// Bestehende Imports `import { … } from './util.js'` bleiben gültig.

export { $, $$, el, escapeHtml } from './util/dom.js';
export { shuffle, seededRandom, pickSeeded } from './util/random.js';
export { normalize } from './util/text.js';
export { debounce } from './util/timing.js';
export { speak, isSpeechSupported } from './util/speech.js';
export { parseHash, go } from './util/route.js';
export { toast } from './util/toast.js';
export {
  observeReveals, observeCounters, animateCounter,
  initSpotlight, initScrollProgress, confettiBurst
} from './util/motion.js';

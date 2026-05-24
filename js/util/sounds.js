// Synthetische UI-Sounds über die Web Audio API. Keine Asset-Dateien.
// Kann global ein-/ausgeschaltet werden; Status liegt in localStorage.

const STORAGE_KEY = 'dialekto.sounds';

let ctx = null;
let masterGain = null;

function isEnabledStored() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === null) return true; // default an
    return v === '1';
  } catch { return true; }
}

let enabled = isEnabledStored();

export function isSoundEnabled() { return enabled; }

export function setSoundEnabled(on) {
  enabled = !!on;
  try { localStorage.setItem(STORAGE_KEY, on ? '1' : '0'); } catch {}
  document.documentElement.classList.toggle('sounds-off', !enabled);
}

function ensureCtx() {
  if (!enabled) return null;
  try {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      masterGain = ctx.createGain();
      masterGain.gain.value = 0.5;
      masterGain.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  } catch { return null; }
}

// Ein-Ton mit Hüllkurve.
function tone({ freq = 440, dur = 0.12, type = 'sine', attack = 0.005, decay = 0.08, gain = 0.25, slide = 0 }) {
  const c = ensureCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  if (slide) osc.frequency.linearRampToValueAtTime(freq + slide, c.currentTime + dur);
  g.gain.value = 0;
  g.gain.linearRampToValueAtTime(gain, c.currentTime + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + attack + decay);
  osc.connect(g);
  g.connect(masterGain);
  osc.start();
  osc.stop(c.currentTime + attack + decay + 0.02);
}

function chord(freqs, opts = {}) {
  freqs.forEach((f, i) => setTimeout(() => tone({ ...opts, freq: f }), i * 35));
}

export const sfx = {
  click()    { tone({ freq: 720, dur: 0.08, type: 'sine', decay: 0.06, gain: 0.12 }); },
  open()     { tone({ freq: 520, dur: 0.18, type: 'triangle', decay: 0.16, gain: 0.18, slide: 240 }); },
  close()    { tone({ freq: 520, dur: 0.14, type: 'triangle', decay: 0.12, gain: 0.16, slide: -200 }); },
  hover()    { tone({ freq: 880, dur: 0.05, type: 'sine', decay: 0.04, gain: 0.06 }); },
  swipe()    { tone({ freq: 380, dur: 0.16, type: 'sawtooth', decay: 0.14, gain: 0.14, slide: 220 }); },
  correct()  { chord([523, 659, 784], { dur: 0.22, type: 'sine', decay: 0.18, gain: 0.2 }); },
  wrong()    { tone({ freq: 220, dur: 0.28, type: 'square', decay: 0.22, gain: 0.18, slide: -80 }); },
  rate(stand){
    if (stand === 3) chord([523, 784], { type: 'triangle', decay: 0.18, gain: 0.18 });
    else if (stand === 2) tone({ freq: 523, dur: 0.18, type: 'triangle', decay: 0.16, gain: 0.18 });
    else tone({ freq: 330, dur: 0.18, type: 'triangle', decay: 0.16, gain: 0.18 });
  },
  unlock()   { chord([523, 659, 784, 1047], { dur: 0.3, type: 'triangle', decay: 0.24, gain: 0.22 }); },
  toggle()   { tone({ freq: 600, dur: 0.06, type: 'sine', decay: 0.05, gain: 0.12 }); }
};

// Vibrate-Helfer (mobile haptik). Safe-call.
export function vibrate(pattern) {
  try {
    if (navigator.vibrate) navigator.vibrate(pattern);
  } catch {}
}

// Initial-Status-Klasse für CSS-Toggle (z.B. Icon-Wechsel).
document.documentElement.classList.toggle('sounds-off', !enabled);

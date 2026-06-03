// Color-Presets — überschreiben Brand-/Accent-CSS-Variablen.
// Werden persistiert in state.preset.

import { state, persist } from './state.js';

export const PRESETS = [
  {
    id: 'default',
    label: 'Original',
    swatch: ['#8b5cf6', '#ec4899', '#22d3ee'],
    vars: {} // benutzt :root-Defaults
  },
  {
    id: 'sunset',
    label: 'Sunset',
    swatch: ['#f97316', '#ec4899', '#facc15'],
    vars: {
      '--brand-h': '24',
      '--brand-s': '95%',
      '--brand-l': '58%',
      '--brand-2': 'hsl(335 90% 60%)',
      '--brand-3': 'hsl(45 95% 60%)',
      '--accent':  'hsl(45 95% 60%)',
      '--accent-2': 'hsl(8 95% 60%)',
      '--pink':    'hsl(345 90% 65%)',
      '--warm':    'hsl(20 95% 60%)'
    }
  },
  {
    id: 'ocean',
    label: 'Ocean',
    swatch: ['#0ea5e9', '#06b6d4', '#3b82f6'],
    vars: {
      '--brand-h': '200',
      '--brand-s': '90%',
      '--brand-l': '52%',
      '--brand-2': 'hsl(190 90% 50%)',
      '--brand-3': 'hsl(225 90% 60%)',
      '--accent':  'hsl(175 80% 50%)',
      '--accent-2': 'hsl(210 90% 60%)',
      '--pink':    'hsl(220 90% 65%)',
      '--warm':    'hsl(35 90% 60%)'
    }
  },
  {
    id: 'forest',
    label: 'Forest',
    swatch: ['#16a34a', '#84cc16', '#14b8a6'],
    vars: {
      '--brand-h': '145',
      '--brand-s': '70%',
      '--brand-l': '45%',
      '--brand-2': 'hsl(165 75% 45%)',
      '--brand-3': 'hsl(95 70% 55%)',
      '--accent':  'hsl(85 75% 55%)',
      '--accent-2': 'hsl(175 75% 50%)',
      '--pink':    'hsl(175 70% 55%)',
      '--warm':    'hsl(45 85% 55%)'
    }
  },
  {
    id: 'mono',
    label: 'Mono',
    swatch: ['#1f2937', '#6b7280', '#9ca3af'],
    vars: {
      '--brand-h': '230',
      '--brand-s': '15%',
      '--brand-l': '40%',
      '--brand-2': 'hsl(230 12% 55%)',
      '--brand-3': 'hsl(230 15% 30%)',
      '--accent':  'hsl(230 15% 50%)',
      '--accent-2': 'hsl(230 12% 65%)',
      '--pink':    'hsl(230 18% 35%)',
      '--warm':    'hsl(35 20% 55%)'
    }
  },
  {
    id: 'cherry',
    label: 'Cherry',
    swatch: ['#dc2626', '#f43f5e', '#fb7185'],
    vars: {
      '--brand-h': '350',
      '--brand-s': '85%',
      '--brand-l': '55%',
      '--brand-2': 'hsl(335 85% 60%)',
      '--brand-3': 'hsl(0 80% 60%)',
      '--accent':  'hsl(15 85% 60%)',
      '--accent-2': 'hsl(350 80% 65%)',
      '--pink':    'hsl(330 85% 60%)',
      '--warm':    'hsl(28 95% 60%)'
    }
  }
];

export function getPreset() {
  return state.preset || 'default';
}

// Ist der effektiv aktive Modus dunkel? (explizit dark, oder auto + System dunkel)
function isDarkActive() {
  const t = document.documentElement.getAttribute('data-theme');
  if (t === 'dark') return true;
  if (t === 'auto') {
    return typeof window !== 'undefined' && window.matchMedia
      && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false; // light, contrast → volle Farben
}

// Dämpft einen Preset-Farbwert für den Dunkelmodus: gesättigte, helle Presets
// (z.B. Sunset) wirken sonst auf dunklem Grund grell. Reduziert Lightness
// (und bei --brand-s die Sättigung) moderat. Wirkt damit app-weit auf jede
// Fläche/jeden Akzent, der die Brand-Variablen nutzt.
const DARK_L_DROP = 8;   // Prozentpunkte Lightness
const DARK_S_DROP = 6;   // Prozentpunkte Sättigung (nur --brand-s)
function dimVarForDark(key, value) {
  const v = String(value).trim();
  if (key === '--brand-l') return Math.max(34, parseFloat(v) - DARK_L_DROP) + '%';
  if (key === '--brand-s') return Math.max(45, parseFloat(v) - DARK_S_DROP) + '%';
  // hsl(H S% L%) — nur die Lightness (dritter Wert) reduzieren.
  const m = v.match(/^hsl\(\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*\)$/i);
  if (m) {
    const l = Math.max(34, parseFloat(m[3]) - DARK_L_DROP);
    return `hsl(${m[1]} ${m[2]}% ${l}%)`;
  }
  return value; // unbekanntes Format → unverändert
}

export function applyPreset(id = getPreset()) {
  const root = document.documentElement;
  // Vorher alle Custom-Vars zurücksetzen, um sauber zu wechseln.
  const allVars = new Set();
  PRESETS.forEach((p) => Object.keys(p.vars).forEach((k) => allVars.add(k)));
  allVars.forEach((k) => root.style.removeProperty(k));

  const preset = PRESETS.find((p) => p.id === id) || PRESETS[0];
  const dark = isDarkActive();
  for (const [k, v] of Object.entries(preset.vars)) {
    root.style.setProperty(k, dark ? dimVarForDark(k, v) : v);
  }
  root.dataset.preset = preset.id;
}

export function setPreset(id) {
  state.preset = PRESETS.some((p) => p.id === id) ? id : 'default';
  persist();
  applyPreset(state.preset);
}

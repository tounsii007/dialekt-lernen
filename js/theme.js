// Dialekto · Theme-Umschalter
// Klick-Logik für den Theme-Button (Hell/Dunkel/Auto/Hoher Kontrast),
// den Dyslexie-Schrift-Toggle und den Sprach-Umschalter.

import { $, toast } from './util.js';
import {
  applyTheme, cycleTheme,
  applyTypography, getTypography, toggleDyslexicFont,
  applyPreset, PRESETS, setPreset, getPreset
} from './store.js';
import { sfx } from './util/sounds.js';
import { initI18n, t } from './util/i18n.js';

const THEME_LABELS_KEYS = {
  light:    'theme.light',
  dark:     'theme.dark',
  auto:     'theme.auto',
  contrast: 'theme.contrast'
};

const THEME_TOAST_MS = 1200;

export function initTheme() {
  applyTheme();
  applyTypography();
  applyPreset();
  // Sprach-Toggle früh initialisieren — er gehört nicht streng zum Theme,
  // teilt sich aber die "UI-Chrome"-Lebenszyklus-Stelle.
  initI18n();

  const btn = $('#themeToggle');
  if (btn) {
    btn.addEventListener('click', () => {
      const next = cycleTheme();
      const label = t(THEME_LABELS_KEYS[next] || next);
      toast(`Modus: ${label}`, 'info', THEME_TOAST_MS);
    });
  }

  initDyslexicToggle();
  initPresetPicker();
}

function initDyslexicToggle() {
  const btn = $('#dyslexicToggle');
  if (!btn) return;
  const syncState = () => {
    const active = getTypography() === 'dyslexic';
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  };
  syncState();
  btn.addEventListener('click', () => {
    const next = toggleDyslexicFont();
    syncState();
    const msg = next === 'dyslexic' ? t('toast.dyslexic.on') : t('toast.dyslexic.off');
    toast(msg, 'info', THEME_TOAST_MS);
  });
}

function initPresetPicker() {
  const trigger = $('#paletteToggle');
  if (!trigger) return;
  const panel = document.createElement('div');
  panel.className = 'palette-panel';
  panel.setAttribute('role', 'dialog');
  panel.innerHTML = `
    <div class="palette-title">Farbpalette</div>
    <div class="palette-grid"></div>
  `;
  document.body.appendChild(panel);
  const grid = panel.querySelector('.palette-grid');

  function rebuild() {
    grid.innerHTML = '';
    PRESETS.forEach((p) => {
      const item = document.createElement('button');
      item.className = 'palette-item' + (getPreset() === p.id ? ' is-active' : '');
      item.title = p.label;
      item.setAttribute('aria-pressed', getPreset() === p.id ? 'true' : 'false');
      item.innerHTML = `
        <span class="palette-swatch">
          ${p.swatch.map(c => `<span style="background:${c}"></span>`).join('')}
        </span>
        <span class="palette-label">${p.label}</span>
      `;
      item.addEventListener('click', () => {
        setPreset(p.id);
        sfx.toggle();
        toast(`Palette: ${p.label}`, 'info', 1200);
        rebuild();
      });
      grid.appendChild(item);
    });
  }
  rebuild();

  function open() {
    const r = trigger.getBoundingClientRect();
    panel.style.top  = (r.bottom + 8) + 'px';
    panel.style.right = (window.innerWidth - r.right) + 'px';
    panel.classList.add('is-open');
    document.addEventListener('click', outsideClick, true);
    document.addEventListener('keydown', escKey, true);
  }
  function close() {
    panel.classList.remove('is-open');
    document.removeEventListener('click', outsideClick, true);
    document.removeEventListener('keydown', escKey, true);
  }
  function outsideClick(e) {
    if (!panel.contains(e.target) && !trigger.contains(e.target)) close();
  }
  function escKey(e) { if (e.key === 'Escape') close(); }

  trigger.addEventListener('click', () => {
    if (panel.classList.contains('is-open')) close(); else open();
  });
}

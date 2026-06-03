// Einstellungen-Drawer — zentrale Stelle, um die App pro Nutzer zu konfigurieren.
// Konsolidiert vorher verstreute Topbar-Toggles (Theme, Palette, Sound, Schrift,
// Sprache) + neue Präferenzen (Animationen, Erklärungs-Sprache, Tagesziel) und
// Datenwerkzeuge (Backup/Reset). Wird über den ⚙-Button der Topbar geöffnet.

import { el, $, toast } from '../util.js';
import {
  getTheme, setTheme, applyTheme,
  getTypography, setTypography,
  PRESETS, getPreset, setPreset,
  downloadStateFile, resetAllData
} from '../store.js';
import { isSoundEnabled, setSoundEnabled, sfx } from '../util/sounds.js';
import { getLang, setLang, SUPPORTED, LANGUAGE_NAMES } from '../util/i18n.js';
import { flagSvg } from '../util/flags.js';
import { initTranslations } from '../util/translations.js';
import { router } from '../router.js';
import {
  getAnimationsEnabled, setAnimationsEnabled, applyAnimations,
  getExplanationLang, setExplanationLang, EXPLANATION_LANGS
} from '../store/settings.js';
import { getGoalTarget, setGoalTarget, getGoalOptions } from '../store/goals.js';
import { APP_VERSION_LABEL, DIALEKT_COUNT, AUSDRUCK_COUNT, REPO_URL } from '../version.js';
import { inlineConfirm } from '../util/inline-confirm.js';

const THEMES = [
  { id: 'light',    label: 'Hell',    icon: '☀️' },
  { id: 'dark',     label: 'Dunkel',  icon: '🌙' },
  { id: 'auto',     label: 'Auto',    icon: '🖥️' },
  { id: 'contrast', label: 'Kontrast', icon: '◐' },
];

let overlay = null;
let lastFocus = null;

// --- kleine Bausteine --------------------------------------------------------

function row(label, control, hint) {
  return el('div', { class: 'set-row' },
    el('div', { class: 'set-row-text' },
      el('div', { class: 'set-row-label' }, label),
      hint ? el('div', { class: 'set-row-hint' }, hint) : null
    ),
    el('div', { class: 'set-row-control' }, control)
  );
}

function section(title, icon, ...children) {
  return el('section', { class: 'set-section' },
    el('h3', { class: 'set-section-title' },
      icon ? el('span', { class: 'set-section-ic', 'aria-hidden': 'true' }, icon) : null,
      el('span', {}, title)
    ),
    ...children
  );
}

// Toggle-Switch (role=switch)
function toggleSwitch(initial, onChange) {
  const btn = el('button', {
    type: 'button',
    class: 'set-switch' + (initial ? ' is-on' : ''),
    role: 'switch',
    'aria-checked': initial ? 'true' : 'false',
    onClick: () => {
      const next = btn.getAttribute('aria-checked') !== 'true';
      btn.classList.toggle('is-on', next);
      btn.setAttribute('aria-checked', next ? 'true' : 'false');
      onChange(next);
    }
  }, el('span', { class: 'set-switch-knob' }));
  return btn;
}

// Segmentierte Auswahl (z.B. Theme)
function segmented(options, current, onPick) {
  const wrap = el('div', { class: 'set-seg' });
  const paint = (active) => {
    wrap.querySelectorAll('.set-seg-btn').forEach(b =>
      b.classList.toggle('is-active', b.dataset.val === active));
  };
  options.forEach(o => {
    wrap.appendChild(el('button', {
      type: 'button',
      class: 'set-seg-btn' + (o.id === current ? ' is-active' : ''),
      dataset: { val: o.id },
      title: o.label,
      onClick: () => { onPick(o.id); paint(o.id); }
    },
      el('span', { class: 'set-seg-ic', 'aria-hidden': 'true' }, o.icon),
      el('span', {}, o.label)
    ));
  });
  return wrap;
}

// Custom-Sprachauswahl mit echten SVG-Flaggen (statt nativem <select>, das auf
// Windows nur Emoji-Buchstaben "DE" statt Flaggen zeigt).
function langSelect(langs, current, onChange) {
  let cur = current;
  const name = (l) => LANGUAGE_NAMES[l] || l.toUpperCase();

  const btn = el('button', {
    type: 'button', class: 'lang-picker-btn',
    'aria-haspopup': 'listbox', 'aria-expanded': 'false'
  });
  const menu = el('div', { class: 'lang-picker-menu', role: 'listbox', hidden: true });
  const wrap = el('div', { class: 'lang-picker' }, btn, menu);

  const paintBtn = () => {
    btn.innerHTML = '';
    btn.append(flagSvg(cur, 16),
      el('span', { class: 'lang-picker-name' }, name(cur)),
      el('span', { class: 'lang-picker-caret', 'aria-hidden': 'true', html: '▾' }));
  };
  paintBtn();

  const onDocClick = (e) => { if (!wrap.contains(e.target)) setOpen(false); };
  function setOpen(open) {
    menu.hidden = !open;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    wrap.classList.toggle('is-open', open);
    if (open) document.addEventListener('click', onDocClick);
    else document.removeEventListener('click', onDocClick);
  }

  langs.forEach((l) => {
    menu.appendChild(el('button', {
      type: 'button', role: 'option', dataset: { l },
      class: 'lang-picker-opt' + (l === cur ? ' is-active' : ''),
      'aria-selected': l === cur ? 'true' : 'false',
      onClick: () => {
        cur = l;
        menu.querySelectorAll('.lang-picker-opt').forEach((o) => {
          const on = o.dataset.l === l;
          o.classList.toggle('is-active', on);
          o.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        paintBtn();
        setOpen(false);
        onChange(l);
      }
    }, flagSvg(l, 16), el('span', {}, name(l))));
  });

  btn.addEventListener('click', (e) => { e.stopPropagation(); setOpen(menu.hidden); });
  return wrap;
}

// --- Drawer ------------------------------------------------------------------

function buildPanel() {
  const panel = el('div', { class: 'settings-panel', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Einstellungen' });

  panel.appendChild(el('div', { class: 'settings-head' },
    el('h2', { class: 'settings-title' }, '⚙️ Einstellungen'),
    el('button', { class: 'settings-close', 'aria-label': 'Schließen', onClick: closeSettings }, '✕')
  ));

  const body = el('div', { class: 'settings-body' });

  // Sprache
  body.appendChild(section('Sprache', '🌐',
    row('App-Sprache', langSelect(SUPPORTED, getLang(), (v) => {
      if (v !== getLang()) setLang(v); // löst Reload aus
    }), 'Sprache der Oberfläche (lädt neu)'),
    row('Erklärungen', langSelect(EXPLANATION_LANGS, getExplanationLang(), (v) => {
      setExplanationLang(v);
      // Übersetzungen laden + aktuelle Ansicht neu rendern (Drawer bleibt offen).
      initTranslations().then(() => { try { router(); } catch {} });
      toast('Erklärungs-Sprache: ' + (LANGUAGE_NAMES[v] || v).toUpperCase(), 'success', 1600);
    }), 'Sprache der Ausdrucks-Erklärungen (sofern übersetzt)')
  ));

  // Darstellung
  body.appendChild(section('Darstellung', '🎨',
    row('Design', segmented(THEMES, getTheme(), (v) => { setTheme(v); applyTheme(); }), 'Hell, dunkel, automatisch oder hoher Kontrast'),
    row('Farbpalette', buildPaletteGrid(), 'Akzentfarben der App'),
    row('Animationen', toggleSwitch(getAnimationsEnabled(), (on) => {
      setAnimationsEnabled(on);
      applyAnimations();
    }), 'Bewegungen & Übergänge'),
    row('Lese-Schrift', toggleSwitch(getTypography() === 'dyslexic', (on) => {
      setTypography(on ? 'dyslexic' : 'default');
    }), 'Legasthenie-freundliche Schriftart')
  ));

  // Audio
  body.appendChild(section('Audio', '🔊',
    row('Sounds', toggleSwitch(isSoundEnabled(), (on) => {
      setSoundEnabled(on);
      if (on) sfx.toggle();
    }), 'UI-Klänge bei Aktionen')
  ));

  // Lernen
  body.appendChild(section('Lernen', '🎯',
    row('Tagesziel', buildGoalControl(), 'Karten pro Tag')
  ));

  // Daten
  body.appendChild(section('Daten', '🗄️',
    el('div', { class: 'set-data-row' },
      el('button', { class: 'btn btn-secondary', onClick: () => { try { downloadStateFile(); toast('Backup heruntergeladen', 'success', 1800); } catch { toast('Export fehlgeschlagen', 'error', 2200); } } }, '⬇ Backup exportieren'),
      inlineConfirm({
        label: '🗑 Alle Daten zurücksetzen',
        message: 'Wirklich ALLE Daten löschen? Fortschritt, XP, Favoriten & Einstellungen gehen unwiderruflich verloren.',
        confirmLabel: 'Ja, alles löschen',
        onConfirm: () => { try { resetAllData(); } catch {} },
      })
    )
  ));

  // Über
  body.appendChild(section('Über', 'ℹ️',
    el('div', { class: 'set-about' },
      el('div', { class: 'set-about-ver' }, 'Dialekto ' + APP_VERSION_LABEL),
      el('div', { class: 'set-about-meta' }, DIALEKT_COUNT + ' Dialekte · ' + AUSDRUCK_COUNT.toLocaleString('de-DE') + ' Ausdrücke'),
      el('a', { class: 'set-about-link', href: REPO_URL, target: '_blank', rel: 'noopener noreferrer' }, 'Quellcode auf GitHub ↗')
    )
  ));

  panel.appendChild(body);
  return panel;
}

function buildPaletteGrid() {
  const grid = el('div', { class: 'set-palette' });
  const paint = () => grid.querySelectorAll('.set-palette-item').forEach(b =>
    b.classList.toggle('is-active', b.dataset.id === getPreset()));
  PRESETS.forEach(p => {
    grid.appendChild(el('button', {
      type: 'button',
      class: 'set-palette-item' + (getPreset() === p.id ? ' is-active' : ''),
      dataset: { id: p.id },
      title: p.label,
      'aria-label': 'Palette ' + p.label,
      onClick: () => { setPreset(p.id); paint(); }
    },
      el('span', { class: 'set-palette-swatch' },
        ...p.swatch.map(c => el('span', { style: { background: c } })))
    ));
  });
  return grid;
}

function buildGoalControl() {
  const wrap = el('div', { class: 'set-goal' });
  const paint = () => wrap.querySelectorAll('.set-goal-btn').forEach(b =>
    b.classList.toggle('is-active', Number(b.dataset.n) === getGoalTarget()));
  getGoalOptions().forEach(n => {
    wrap.appendChild(el('button', {
      type: 'button',
      class: 'set-goal-btn' + (n === getGoalTarget() ? ' is-active' : ''),
      dataset: { n: String(n) },
      onClick: () => { setGoalTarget(n); paint(); }
    }, String(n)));
  });
  return wrap;
}

export function openSettings() {
  if (overlay && document.body.contains(overlay)) { overlay.classList.add('is-open'); return; }
  lastFocus = document.activeElement;
  overlay = el('div', { class: 'settings-overlay', onClick: (e) => { if (e.target === overlay) closeSettings(); } });
  overlay.appendChild(buildPanel());
  document.body.appendChild(overlay);
  // Force reflow → Transition
  requestAnimationFrame(() => overlay.classList.add('is-open'));
  document.addEventListener('keydown', onKey, true);
  const closeBtn = overlay.querySelector('.settings-close');
  if (closeBtn) closeBtn.focus();
}

export function closeSettings() {
  if (!overlay) return;
  overlay.classList.remove('is-open');
  document.removeEventListener('keydown', onKey, true);
  const ov = overlay;
  setTimeout(() => { if (ov && ov.parentNode) ov.parentNode.removeChild(ov); }, 260);
  overlay = null;
  if (lastFocus && typeof lastFocus.focus === 'function') { try { lastFocus.focus(); } catch {} }
}

function onKey(e) {
  if (e.key === 'Escape') { e.stopPropagation(); closeSettings(); return; }
  // Fokus-Falle: Tab zyklisch innerhalb des Drawers halten (Modal-A11y).
  if (e.key === 'Tab' && overlay) {
    const list = [...overlay.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
      .filter(n => !n.disabled && n.offsetParent !== null);
    if (list.length < 2) return;
    const first = list[0], last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
}

/** Einmal beim App-Start: ⚙-Button verdrahten + Animations-Präferenz anwenden. */
export function initSettings() {
  applyAnimations();
  const btn = document.getElementById('toolsToggle');
  if (btn) {
    btn.setAttribute('aria-haspopup', 'dialog');
    btn.setAttribute('aria-label', 'Einstellungen');
    btn.setAttribute('title', 'Einstellungen');
    btn.addEventListener('click', (e) => { e.stopPropagation(); openSettings(); });
  }
}

// XP-HUD: fliegende "+10 XP"-Chips + Level-Up-Overlay

import { xpToNextLevel, getLevelTitle } from '../store/xp.js';
import { confettiBurst } from './motion.js';
import { sfx, vibrate } from './sounds.js';

let hudEl = null;
let liveRegion = null;

function getHud() {
  if (hudEl && document.body.contains(hudEl)) return hudEl;
  hudEl = document.createElement('div');
  hudEl.id = 'xpHud';
  hudEl.className = 'xp-hud';
  hudEl.setAttribute('aria-hidden', 'true'); // rein visuell — SR-Feedback via Live-Region
  document.body.appendChild(hudEl);
  return hudEl;
}

// Unsichtbare Live-Region: gibt XP-/Level-Feedback an Screenreader weiter,
// da die fliegenden Chips/Overlays aria-hidden sind.
function getLiveRegion() {
  if (liveRegion && document.body.contains(liveRegion)) return liveRegion;
  liveRegion = document.createElement('div');
  liveRegion.className = 'sr-only';
  liveRegion.setAttribute('aria-live', 'polite');
  liveRegion.setAttribute('aria-atomic', 'true');
  document.body.appendChild(liveRegion);
  return liveRegion;
}

function announce(message) {
  const region = getLiveRegion();
  // Leeren → setzen, sonst wird identischer Folgetext nicht erneut vorgelesen.
  region.textContent = '';
  setTimeout(() => { region.textContent = message; }, 30);
}

function spawnXpChip(amount, anchor) {
  const chip = document.createElement('div');
  chip.className = 'xp-chip';
  chip.setAttribute('aria-hidden', 'true');
  chip.textContent = `+${amount} XP`;

  // Position near anchor el or topbar
  const ref = anchor || document.querySelector('.topbar-inner') || document.body;
  const r = ref.getBoundingClientRect();
  chip.style.setProperty('--x', `${r.right - 60}px`);
  chip.style.setProperty('--y', `${r.top + 10}px`);

  getHud().appendChild(chip);
  const remove = () => chip.remove();
  chip.addEventListener('animationend', remove, { once: true });
  // Fallback: auch entfernen, falls animationend ausbleibt (animation 1.1s).
  setTimeout(remove, 1500);
}

function showLevelUp(level, title) {
  // Doppel-Overlay vermeiden, falls zwei Level-Ups dicht aufeinander folgen.
  document.querySelector('.xp-levelup')?.remove();

  // Bis Level 10 vergibt jede Stufe einen neuen Rang-Titel.
  const isNewRank = title !== getLevelTitle(level - 1);

  const overlay = document.createElement('div');
  overlay.className = 'xp-levelup';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = `
    <div class="xp-levelup-rays"></div>
    <div class="xp-levelup-inner">
      <div class="xp-levelup-burst"></div>
      <div class="xp-levelup-label">Level Up!</div>
      <div class="xp-levelup-badge">
        <span class="xp-levelup-num">${level}</span>
        <span class="xp-levelup-sparkle s1">✦</span>
        <span class="xp-levelup-sparkle s2">✧</span>
        <span class="xp-levelup-sparkle s3">✦</span>
      </div>
      <div class="xp-levelup-title">${title}</div>
      <div class="xp-levelup-sub">${isNewRank ? '🏅 Neuer Rang freigeschaltet' : 'Bleib dran — der nächste Rang wartet!'}</div>
    </div>
  `;
  document.body.appendChild(overlay);
  confettiBurst(overlay, { count: 70 });
  // Nur das eigene Overlay-Ende zählt — animationend bubblet sonst vom
  // schnelleren Inner-Pop (~0.6s) hoch und entfernt das 2.6s-Overlay zu früh.
  const remove = () => overlay.remove();
  overlay.addEventListener('animationend', (e) => { if (e.target === overlay) remove(); });
  setTimeout(remove, 3200); // Fallback, falls animationend ausbleibt.
}

export function initXpHud() {
  document.addEventListener('dialekto:xp', (e) => {
    const { amount, levelUp, level } = e.detail;
    spawnXpChip(amount);
    if (levelUp) {
      const title = getLevelTitle(level);
      announce(`Level ${level} erreicht: ${title}`);
      try { sfx.levelUp(); } catch {}
      vibrate([0, 45, 35, 80]);
      setTimeout(() => showLevelUp(level, title), 400);
    } else {
      announce(`Plus ${amount} XP`);
    }
    // Aktualisiere XP-Balken in der Topbar, falls vorhanden
    updateXpBar(e.detail.total);
  });
}

export function renderXpBar(total) {
  const { level, current, needed, progress } = xpToNextLevel(total);
  const title = getLevelTitle(level);
  const pct = Math.round(progress * 100);

  const wrap = document.createElement('div');
  wrap.className = 'xp-bar-wrap';
  wrap.title = `Level ${level} · ${title} · ${current}/${needed} XP`;
  wrap.innerHTML = `
    <span class="xp-bar-level">Lv.${level}</span>
    <div class="xp-bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="XP bis Level ${level + 1}">
      <div class="xp-bar-fill" style="width:${pct}%"></div>
    </div>
  `;
  return wrap;
}

function updateXpBar(total) {
  const existing = document.querySelector('.xp-bar-fill');
  if (!existing) return;
  const { progress } = xpToNextLevel(total);
  existing.style.width = `${Math.round(progress * 100)}%`;
  const bar = existing.closest('[role="progressbar"]');
  if (bar) bar.setAttribute('aria-valuenow', Math.round(progress * 100));
}

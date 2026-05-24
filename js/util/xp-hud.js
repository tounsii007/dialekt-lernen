// XP-HUD: fliegende "+10 XP"-Chips + Level-Up-Overlay

import { xpToNextLevel, getLevelTitle } from '../store/xp.js';
import { confettiBurst } from './motion.js';

let hudEl = null;

function getHud() {
  if (hudEl && document.body.contains(hudEl)) return hudEl;
  hudEl = document.createElement('div');
  hudEl.id = 'xpHud';
  hudEl.className = 'xp-hud';
  document.body.appendChild(hudEl);
  return hudEl;
}

function spawnXpChip(amount, anchor) {
  const chip = document.createElement('div');
  chip.className = 'xp-chip';
  chip.textContent = `+${amount} XP`;

  // Position near anchor el or topbar
  const ref = anchor || document.querySelector('.topbar-inner') || document.body;
  const r = ref.getBoundingClientRect();
  chip.style.setProperty('--x', `${r.right - 60}px`);
  chip.style.setProperty('--y', `${r.top + 10}px`);

  getHud().appendChild(chip);
  chip.addEventListener('animationend', () => chip.remove(), { once: true });
}

function showLevelUp(level, title) {
  const overlay = document.createElement('div');
  overlay.className = 'xp-levelup';
  overlay.innerHTML = `
    <div class="xp-levelup-inner">
      <div class="xp-levelup-label">Level Up!</div>
      <div class="xp-levelup-num">${level}</div>
      <div class="xp-levelup-title">${title}</div>
    </div>
  `;
  document.body.appendChild(overlay);
  confettiBurst(overlay, { count: 30 });
  overlay.addEventListener('animationend', () => overlay.remove(), { once: true });
}

export function initXpHud() {
  document.addEventListener('dialekto:xp', (e) => {
    const { amount, levelUp, level } = e.detail;
    spawnXpChip(amount);
    if (levelUp) {
      setTimeout(() => showLevelUp(level, getLevelTitle(level)), 400);
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

// Avatar & Profil-Insignien — User kann ein Profil-Symbol freischalten
// basierend auf besuchten Dialekten + erreichten Levels.
//
// API:
//   getAvatar() → { emoji, label, unlocked: boolean }
//   setAvatar(id) → setzt den aktiven Avatar (wenn freigeschaltet)
//   getAvatarOptions() → alle Optionen mit unlock-Status

import { state, persist } from './state.js';
import { getVisitedDialects } from './achievements.js';
import { getXp, levelForXp } from './xp.js';

// Verfügbare Avatare mit Unlock-Bedingungen
export const AVATARS = [
  { id: 'default', emoji: '🗣️', label: 'Sprachfan',     unlock: () => true },
  { id: 'cards',   emoji: '🃏', label: 'Karteikartensammler', unlock: () => levelForXp(getXp()) >= 2 },
  { id: 'flag',    emoji: '🏁', label: 'Entdecker',     unlock: () => getVisitedDialects().length >= 3 },
  { id: 'crown',   emoji: '👑', label: 'Mundartmeister', unlock: () => levelForXp(getXp()) >= 5 },
  { id: 'pretzel', emoji: '🥨', label: 'Bayerischer Bua', unlock: () => visitedHas('bayerisch') && levelForXp(getXp()) >= 3 },
  { id: 'bear',    emoji: '🐻', label: 'Berliner Bär',  unlock: () => visitedHas('berlinisch') && levelForXp(getXp()) >= 3 },
  { id: 'apple',   emoji: '🍎', label: 'Ebbelwoi-Hesse', unlock: () => visitedHas('hessisch')   && levelForXp(getXp()) >= 3 },
  { id: 'cathedral', emoji: '⛪', label: 'Domstädter',  unlock: () => visitedHas('koelsch')     && levelForXp(getXp()) >= 3 },
  { id: 'mountain', emoji: '⛰️', label: 'Bergler',      unlock: () => visitedHas('schwizerduetsch') && levelForXp(getXp()) >= 3 },
  { id: 'ship',    emoji: '⛵', label: 'Hanseat',       unlock: () => visitedHas('plattdeutsch') && levelForXp(getXp()) >= 3 },
  { id: 'wine',    emoji: '🍷', label: 'Wiener Schmäh', unlock: () => visitedHas('wienerisch')  && levelForXp(getXp()) >= 3 },
  { id: 'mine',    emoji: '⛏️', label: 'Pott-Knappe',   unlock: () => visitedHas('ruhrdeutsch') && levelForXp(getXp()) >= 3 },
  { id: 'star',    emoji: '⭐', label: 'Sprachstern',   unlock: () => levelForXp(getXp()) >= 7 },
  { id: 'trophy',  emoji: '🏆', label: 'Dialektlegende', unlock: () => getVisitedDialects().length >= 10 && levelForXp(getXp()) >= 8 },
  { id: 'rocket',  emoji: '🚀', label: 'Mundart-Pionier', unlock: () => getVisitedDialects().length === 12 },
];

function visitedHas(id) {
  return getVisitedDialects().includes(id);
}

export function getAvatar() {
  const id = (state.avatar && state.avatar.id) || 'default';
  const found = AVATARS.find(a => a.id === id);
  return found || AVATARS[0];
}

export function setAvatar(id) {
  const av = AVATARS.find(a => a.id === id);
  if (!av) return false;
  if (!av.unlock()) return false;
  if (!state.avatar) state.avatar = {};
  state.avatar.id = id;
  persist();
  return true;
}

export function getAvatarOptions() {
  return AVATARS.map(a => ({
    ...a,
    unlocked: a.unlock(),
    isActive: getAvatar().id === a.id,
  }));
}

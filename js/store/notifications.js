// Notification-Einstellungen — Toggle und Uhrzeit für die tägliche Erinnerung.
// Persistiert in localStorage (eigener Key, unabhängig vom Haupt-State).
//
// API:
//   getNotificationSettings()              → { enabled, hour, minute }
//   setNotificationSettings(patch)         → settings (saved + scheduler re-armiert)
//   initNotifications()                    → idempotent — beim App-Start aufrufen
//   getNotificationStatus()                → { supported, permission, settings }

import {
  isPushSupported, getPushPermission, requestPushPermission,
  scheduleDailyReminder, cancelDailyReminder
} from '../util/push.js';

const KEY = 'dialekto.notifications.v1';
const DEFAULTS = { enabled: false, hour: 19, minute: 0 };

function safeLoad() {
  try {
    if (typeof localStorage === 'undefined') return { ...DEFAULTS };
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULTS };
    const parsed = JSON.parse(raw);
    return {
      enabled: !!parsed.enabled,
      hour: Number.isFinite(parsed.hour) ? Math.max(0, Math.min(23, parsed.hour)) : DEFAULTS.hour,
      minute: Number.isFinite(parsed.minute) ? Math.max(0, Math.min(59, parsed.minute)) : DEFAULTS.minute
    };
  } catch {
    return { ...DEFAULTS };
  }
}

function safeSave(value) {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(KEY, JSON.stringify(value));
  } catch {}
}

let settings = safeLoad();
let initialized = false;

export function getNotificationSettings() {
  return { ...settings };
}

export function setNotificationSettings(patch) {
  settings = { ...settings, ...patch };
  // Clamp
  settings.hour = Math.max(0, Math.min(23, Number(settings.hour) || 0));
  settings.minute = Math.max(0, Math.min(59, Number(settings.minute) || 0));
  settings.enabled = !!settings.enabled;
  safeSave(settings);
  applyScheduler();
  return { ...settings };
}

export async function enableNotifications() {
  const perm = await requestPushPermission();
  if (perm !== 'granted') {
    settings = { ...settings, enabled: false };
    safeSave(settings);
    return { ok: false, permission: perm };
  }
  settings = { ...settings, enabled: true };
  safeSave(settings);
  applyScheduler();
  return { ok: true, permission: perm };
}

export function disableNotifications() {
  settings = { ...settings, enabled: false };
  safeSave(settings);
  cancelDailyReminder();
}

function applyScheduler() {
  if (!isPushSupported()) return;
  cancelDailyReminder();
  if (!settings.enabled) return;
  if (getPushPermission() !== 'granted') return;
  scheduleDailyReminder(settings.hour, settings.minute);
}

export function initNotifications() {
  if (initialized) return;
  initialized = true;
  // Falls Permission widerrufen wurde, Toggle implizit ausschalten.
  if (settings.enabled && isPushSupported() && getPushPermission() !== 'granted') {
    settings = { ...settings, enabled: false };
    safeSave(settings);
    return;
  }
  applyScheduler();
}

export function getNotificationStatus() {
  return {
    supported: isPushSupported(),
    permission: getPushPermission(),
    settings: { ...settings }
  };
}

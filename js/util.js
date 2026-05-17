// Hilfsfunktionen

export const $  = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

export function el(tag, attrs = {}, ...children) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') e.className = v;
    else if (k === 'html') e.innerHTML = v;
    else if (k === 'style' && typeof v === 'object') Object.assign(e.style, v);
    else if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === 'dataset') Object.assign(e.dataset, v);
    else if (v === true) e.setAttribute(k, '');
    else if (v !== false && v != null) e.setAttribute(k, v);
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue;
    e.appendChild(c.nodeType ? c : document.createTextNode(String(c)));
  }
  return e;
}

export function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

export function shuffle(arr, rng = Math.random) {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Deterministischer Zufall — gleicher Seed = gleiches Ergebnis (für „Ausdruck des Tages")
export function seededRandom(seed) {
  let s = seed >>> 0;
  return function() {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

export function pickSeeded(arr, seed) {
  if (!arr.length) return null;
  const r = seededRandom(seed);
  return arr[Math.floor(r() * arr.length)];
}

export function normalize(s) {
  return String(s).toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[ß]/g, 'ss');
}

export function debounce(fn, wait = 250) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

// Web Speech API — Ausdrücke vorlesen
export function speak(text, lang = 'de-DE') {
  try {
    if (!('speechSynthesis' in window)) return false;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = 0.95;
    u.pitch = 1;
    window.speechSynthesis.speak(u);
    return true;
  } catch {
    return false;
  }
}

// Hash für Routing-Pfade
export function parseHash() {
  const h = location.hash || '#/';
  const path = h.startsWith('#') ? h.slice(1) : h;
  const [pathOnly, query = ''] = path.split('?');
  const segs = pathOnly.split('/').filter(Boolean);
  const params = Object.fromEntries(new URLSearchParams(query).entries());
  return { segs, params, raw: path };
}

export function go(path) {
  location.hash = path.startsWith('#') ? path : `#${path}`;
}

export function toast(msg, type = 'info', duration = 2400) {
  const cont = document.getElementById('toastContainer');
  if (!cont) return;
  const t = el('div', { class: `toast ${type}` }, msg);
  cont.appendChild(t);
  setTimeout(() => {
    t.classList.add('is-leaving');
    setTimeout(() => t.remove(), 350);
  }, duration);
}

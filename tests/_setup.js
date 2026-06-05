// Gemeinsamer Test-Setup-Helper.
// Bietet:
//   - resetState(): leert den persistenten Store auf saubere Defaults
//   - DOM-Mock: minimales document/Element-Polyfill für Tests, die DOM-Helper nutzen
//   - tick(): hilft bei async fire-and-forget Operationen
//
// Pseudo-DOM ist absichtlich minimal — keine jsdom-Dependency. Wenn ein Test
// echtes DOM-Verhalten braucht, soll er explizit mocken.

import { state } from '../js/store/state.js';
import { resetCombo } from '../js/util/combo.js';

// State-Reset — alle Felder auf saubere Defaults.
export function resetState() {
  // Session-Combo ist modul-lokal (nicht im State) — pro Test zurücksetzen,
  // damit ein Multiplikator aus einem vorherigen Test die XP nicht verfälscht.
  resetCombo();
  state.theme = 'auto';
  state.favoriten = [];
  state.gelernt = {};
  state.streak = { count: 0, lastDay: null, days: {},
                   freezes: 0, repairs: 0, weekendAmulet: false, frozenDays: {},
                   freezeMilestone: 0, repairMilestone: 0, lastBreak: null };
  state.quizHistory = [];
  state.lernStats = { total: 0, korrekt: 0 };
  state.visited = [];
  state.achievements = {};
  state.onboarded = false;
  state.preset = 'default';
  state.notes = {};
  state.xp = { total: 0, log: [] };
  state.goals = { target: 10, progress: {}, reminderShown: {} };
  state.srs = { scheduler: 'fsrs', retention: 0.9, fuzz: true, params: null };
  state.srsLog = [];
  state.league = { tier: 0, week: null, weekStartXp: 0, best: 0, lastResult: null };
  state.chest = { lastDay: null, claimStreak: 0, lastReward: null, totalOpened: 0 };
  state.speech = { rate: 0.92, pitch: 1, voiceURI: null };
  state.settings = {};
}

// Minimaler DOM-Mock — wird global gesetzt, wenn ein Test es braucht.
// Reicht für die meisten Stub-Aufrufe (dispatchEvent, classList, setAttribute).
class FakeClassList {
  constructor() { this._set = new Set(); }
  add(...c) { c.forEach(x => this._set.add(x)); }
  remove(...c) { c.forEach(x => this._set.delete(x)); }
  toggle(c, force) {
    if (force === true)  { this._set.add(c); return true; }
    if (force === false) { this._set.delete(c); return false; }
    if (this._set.has(c)) { this._set.delete(c); return false; }
    this._set.add(c); return true;
  }
  contains(c) { return this._set.has(c); }
  get length() { return this._set.size; }
  toString() { return Array.from(this._set).join(' '); }
}

// Style-Shim — bietet setProperty/removeProperty/getPropertyValue + Index-Set.
function makeFakeStyle() {
  const props = new Map();
  return new Proxy(
    {
      setProperty(name, value) { props.set(name, String(value)); },
      removeProperty(name) {
        const old = props.get(name);
        props.delete(name);
        return old ?? '';
      },
      getPropertyValue(name) { return props.get(name) ?? ''; },
      _props: props,
    },
    {
      set(target, name, value) {
        if (typeof name === 'string' && !(name in target)) {
          props.set(name, String(value));
        } else {
          target[name] = value;
        }
        return true;
      },
      get(target, name) {
        if (name in target) return target[name];
        return props.get(name) ?? '';
      },
    },
  );
}

// ── Minimaler CSS-Selektor-Matcher ───────────────────────────────────────────
// Unterstützt Tag, .class, #id, [attr], [attr=val], Verbund (div.foo#id) und
// Nachfahren-Kombinator (Leerzeichen) sowie Komma-Listen. Reicht, damit Views
// ihre frisch gebauten Teilbäume per querySelector/closest verdrahten können.
function _dataGet(node, k) {
  if (!k.startsWith('data-') || !node.dataset) return undefined;
  const camel = k.slice(5).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  return node.dataset[camel];
}
function _matchCompound(node, sel) {
  if (!node || node.nodeType !== 1) return false;
  const toks = sel.match(/[.#]?[\w-]+|\[[^\]]+\]|\*/g);
  if (!toks) return false;
  for (const t of toks) {
    if (t === '*') continue;
    if (t[0] === '.') { if (!node.classList.contains(t.slice(1))) return false; }
    else if (t[0] === '#') { if ((node._attrs.id ?? node.id) !== t.slice(1)) return false; }
    else if (t[0] === '[') {
      const body = t.slice(1, -1);
      const eq = body.indexOf('=');
      if (eq === -1) {
        if (!(body in node._attrs) && _dataGet(node, body) === undefined) return false;
      } else {
        const k = body.slice(0, eq).trim();
        const v = body.slice(eq + 1).replace(/^["']|["']$/g, '');
        const actual = node._attrs[k] ?? _dataGet(node, k);
        if (String(actual) !== v) return false;
      }
    } else if (node.tagName.toLowerCase() !== t.toLowerCase()) return false;
  }
  return true;
}
function _matchSelector(node, full) {
  const parts = full.trim().split(/\s+/);
  const last = parts.pop();
  if (!_matchCompound(node, last)) return false;
  let anc = node.parentNode;
  for (let i = parts.length - 1; i >= 0; i--) {
    while (anc && !_matchCompound(anc, parts[i])) anc = anc.parentNode;
    if (!anc) return false;
    anc = anc.parentNode;
  }
  return true;
}
function _walk(node, fn) {
  for (const c of node.childNodes) {
    if (fn(c) === true) return true;
    if (_walk(c, fn) === true) return true;
  }
  return false;
}

class FakeNode {
  constructor(tagName = 'div') {
    this.tagName = String(tagName).toUpperCase();
    this.nodeType = tagName === '#text' ? 3 : 1; // 1=Element, 3=Text
    this.childNodes = [];
    this.children = [];
    this.classList = new FakeClassList();
    this._attrs = {};
    this.style = makeFakeStyle();
    this.dataset = {};
    this._listeners = {};
    this.textContent = '';
    this._innerHTML = '';
    this.parentNode = null;
  }
  // innerHTML: kein HTML-Parsing, aber das verbreitete Leeren-Muster (el.innerHTML='')
  // bilden wir korrekt ab → Kinder werden entfernt.
  get innerHTML() { return this._innerHTML; }
  set innerHTML(v) {
    this._innerHTML = String(v ?? '');
    for (const c of this.childNodes) c.parentNode = null;
    this.childNodes = [];
    this.children = [];
  }
  // className ↔ classList synchron halten (el() setzt elem.className als String).
  get className() { return this.classList.toString(); }
  set className(v) {
    this.classList = new FakeClassList();
    String(v || '').split(/\s+/).filter(Boolean).forEach((c) => this.classList.add(c));
  }
  appendChild(child) {
    if (child == null) return child;
    if (child.tagName === '#FRAGMENT') {       // DocumentFragment entleeren
      for (const c of [...child.childNodes]) this.appendChild(c);
      child.childNodes = []; child.children = [];
      return child;
    }
    child.parentNode = this;
    this.childNodes.push(child);
    this.children.push(child);
    return child;
  }
  removeChild(child) {
    const i = this.childNodes.indexOf(child);
    if (i >= 0) this.childNodes.splice(i, 1);
    const j = this.children.indexOf(child);
    if (j >= 0) this.children.splice(j, 1);
    child.parentNode = null;
    return child;
  }
  // Moderne Kinder-APIs, die Views nutzen (Browser-nativ, im Mock nachgezogen).
  append(...nodes) { for (const n of nodes) if (n != null) this.appendChild(this._asNode(n)); }
  prepend(...nodes) {
    const made = nodes.filter(n => n != null).map(n => this._asNode(n));
    for (const n of made) n.parentNode = this;
    this.childNodes.unshift(...made);
    this.children.unshift(...made);
  }
  replaceChildren(...nodes) {
    for (const c of this.childNodes) c.parentNode = null;
    this.childNodes = [];
    this.children = [];
    for (const n of nodes) if (n != null) this.appendChild(this._asNode(n));
  }
  insertBefore(node, ref) {
    const n = this._asNode(node);
    const i = ref ? this.childNodes.indexOf(ref) : -1;
    if (i < 0) { this.appendChild(n); return n; }
    n.parentNode = this;
    this.childNodes.splice(i, 0, n);
    this.children.splice(i, 0, n);
    return n;
  }
  contains(node) {
    if (node === this) return true;
    return this.childNodes.some(c => c === node || (c.contains && c.contains(node)));
  }
  // Strings → Textknoten, damit append/prepend('text') wie im Browser funktioniert.
  _asNode(n) {
    if (typeof n === 'string' || typeof n === 'number') {
      const t = new FakeNode('#text'); t.textContent = String(n); return t;
    }
    return n;
  }
  remove() {
    if (this.parentNode) this.parentNode.removeChild(this);
  }
  setAttribute(k, v) { this._attrs[k] = String(v); }
  getAttribute(k) { return this._attrs[k] ?? null; }
  removeAttribute(k) { delete this._attrs[k]; }
  hasAttribute(k) { return k in this._attrs; }
  addEventListener(type, fn) {
    (this._listeners[type] = this._listeners[type] || []).push(fn);
  }
  removeEventListener(type, fn) {
    const a = this._listeners[type] || [];
    const i = a.indexOf(fn);
    if (i >= 0) a.splice(i, 1);
  }
  dispatchEvent(event) {
    const arr = this._listeners[event?.type] || [];
    for (const fn of arr) { try { fn(event); } catch {} }
    return true;
  }
  querySelector(sel) {
    const sels = sel.split(',').map(s => s.trim());
    let found = null;
    _walk(this, (n) => {
      if (n.nodeType === 1 && sels.some(s => _matchSelector(n, s))) { found = n; return true; }
    });
    return found;
  }
  querySelectorAll(sel) {
    const sels = sel.split(',').map(s => s.trim());
    const out = [];
    _walk(this, (n) => { if (n.nodeType === 1 && sels.some(s => _matchSelector(n, s))) out.push(n); });
    return out;
  }
  closest(sel) {
    const sels = sel.split(',').map(s => s.trim());
    let n = this;
    while (n) { if (n.nodeType === 1 && sels.some(s => _matchCompound(n, s))) return n; n = n.parentNode; }
    return null;
  }
  matches(sel) { return sel.split(',').some(s => _matchCompound(this, s.trim())); }
  getBoundingClientRect() {
    return { x: 0, y: 0, top: 0, left: 0, bottom: 0, right: 0, width: 0, height: 0 };
  }
  focus() {}
  click() { this.dispatchEvent({ type: 'click' }); }
  cloneNode() { return new FakeNode(this.tagName); }
}

class FakeDocument extends FakeNode {
  constructor() {
    super('document');
    this.documentElement = new FakeNode('html');
    this.body = new FakeNode('body');
    this.head = new FakeNode('head');
    this._byId = new Map();
  }
  createElement(tag) { return new FakeNode(tag); }
  createElementNS(_ns, tag) { return new FakeNode(tag); }
  createTextNode(text) { const n = new FakeNode('#text'); n.textContent = text; return n; }
  createDocumentFragment() { return new FakeNode('#fragment'); }
  getElementById(id) {
    if (this._byId.has(id)) return this._byId.get(id);
    let found = null;
    for (const r of [this.documentElement, this.body, this.head]) {
      _walk(r, (n) => { if (n.nodeType === 1 && (n._attrs.id ?? n.id) === id) { found = n; return true; } });
      if (found) break;
    }
    return found;
  }
  // querySelector/querySelectorAll werden von FakeNode geerbt (echter Matcher).
}

let mounted = false;

export function mountDom() {
  if (mounted) return;
  globalThis.document = new FakeDocument();
  globalThis.window = {
    document: globalThis.document,
    location: { hash: '', hostname: 'localhost', href: 'http://localhost/', pathname: '/', search: '' },
    history: {
      pushState(_state, _title, url) {
        const u = String(url || '/');
        const [p, q = ''] = u.split('?');
        globalThis.window.location.pathname = p || '/';
        globalThis.window.location.search = q ? '?' + q : '';
      },
      replaceState() {}, back() {}, forward() {},
    },
    dispatchEvent: () => {},
    matchMedia: () => ({ matches: false, addEventListener: () => {} }),
    navigator: { vibrate: () => {}, clipboard: { writeText: async () => {} } },
    speechSynthesis: { speak: () => {}, cancel: () => {}, getVoices: () => [], addEventListener: () => {} },
    requestAnimationFrame: (fn) => setTimeout(fn, 0),
    requestIdleCallback: (fn) => setTimeout(fn, 0),
    localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
    addEventListener: () => {},
    setTimeout, clearTimeout, setInterval, clearInterval,
  };
  globalThis.location = globalThis.window.location;
  globalThis.history = globalThis.window.history;
  globalThis.HTMLElement = FakeNode;
  globalThis.Element = FakeNode;
  globalThis.Node = FakeNode;
  globalThis.Event = class Event { constructor(type) { this.type = type; } };
  globalThis.CustomEvent = class CustomEvent { constructor(type, init) { this.type = type; this.detail = init?.detail; } };
  mounted = true;
}

export function unmountDom() {
  if (!mounted) return;
  // Globals NICHT löschen: Manche Views planen verzögerte DOM-Arbeit (rAF/Timeout).
  // Feuert die nach dem File-Teardown, würde ein gelöschtes `document` einen
  // uncaughtException auslösen. Wir markieren nur als unmounted — der nächste
  // mountDom() baut ein frisches, sauberes FakeDocument auf.
  mounted = false;
}

// Asynchron warten — zur Auflösung von fire-and-forget Tasks.
export function tick(ms = 0) {
  return new Promise((r) => setTimeout(r, ms));
}

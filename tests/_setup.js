// Gemeinsamer Test-Setup-Helper.
// Bietet:
//   - resetState(): leert den persistenten Store auf saubere Defaults
//   - DOM-Mock: minimales document/Element-Polyfill für Tests, die DOM-Helper nutzen
//   - tick(): hilft bei async fire-and-forget Operationen
//
// Pseudo-DOM ist absichtlich minimal — keine jsdom-Dependency. Wenn ein Test
// echtes DOM-Verhalten braucht, soll er explizit mocken.

import { state } from '../js/store/state.js';

// State-Reset — alle Felder auf saubere Defaults.
export function resetState() {
  state.theme = 'auto';
  state.favoriten = [];
  state.gelernt = {};
  state.streak = { count: 0, lastDay: null, days: {} };
  state.quizHistory = [];
  state.lernStats = { total: 0, korrekt: 0 };
  state.visited = [];
  state.achievements = {};
  state.onboarded = false;
  state.preset = 'default';
  state.notes = {};
  state.xp = { total: 0, log: [] };
  state.goals = { target: 10, progress: {}, reminderShown: {} };
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

class FakeNode {
  constructor(tagName = 'div') {
    this.tagName = String(tagName).toUpperCase();
    this.nodeType = tagName === '#text' ? 3 : 1; // 1=Element, 3=Text
    this.childNodes = [];
    this.children = [];
    this.classList = new FakeClassList();
    this._attrs = {};
    this.className = '';
    this.style = makeFakeStyle();
    this.dataset = {};
    this._listeners = {};
    this.textContent = '';
    this.innerHTML = '';
    this.parentNode = null;
  }
  appendChild(child) {
    if (child == null) return child;
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
  querySelector(_sel) { return null; }
  querySelectorAll(_sel) { return []; }
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
  getElementById(id) { return this._byId.get(id) || null; }
  // Selektoren — sehr simpel: nichts gefunden, leeres Array
  querySelector() { return null; }
  querySelectorAll() { return []; }
}

let mounted = false;

export function mountDom() {
  if (mounted) return;
  globalThis.document = new FakeDocument();
  globalThis.window = {
    document: globalThis.document,
    location: { hash: '', hostname: 'localhost', href: 'http://localhost/' },
    matchMedia: () => ({ matches: false, addEventListener: () => {} }),
    navigator: { vibrate: () => {}, clipboard: { writeText: async () => {} } },
    speechSynthesis: { speak: () => {}, cancel: () => {}, getVoices: () => [], addEventListener: () => {} },
    requestAnimationFrame: (fn) => setTimeout(fn, 0),
    requestIdleCallback: (fn) => setTimeout(fn, 0),
    localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
    addEventListener: () => {},
    setTimeout, clearTimeout, setInterval, clearInterval,
  };
  globalThis.HTMLElement = FakeNode;
  globalThis.Element = FakeNode;
  globalThis.Node = FakeNode;
  globalThis.Event = class Event { constructor(type) { this.type = type; } };
  globalThis.CustomEvent = class CustomEvent { constructor(type, init) { this.type = type; this.detail = init?.detail; } };
  mounted = true;
}

export function unmountDom() {
  if (!mounted) return;
  delete globalThis.document;
  delete globalThis.window;
  delete globalThis.HTMLElement;
  delete globalThis.Element;
  delete globalThis.Node;
  delete globalThis.Event;
  delete globalThis.CustomEvent;
  mounted = false;
}

// Asynchron warten — zur Auflösung von fire-and-forget Tasks.
export function tick(ms = 0) {
  return new Promise((r) => setTimeout(r, ms));
}

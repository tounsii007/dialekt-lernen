// Frontend: DOM-Helper $, $$, el, escapeHtml.
//
// Nutzt den FakeDOM aus _setup.js — kein echtes jsdom nötig.

import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';

import { mountDom, unmountDom } from '../_setup.js';

before(mountDom);
after(unmountDom);

// Modul erst NACH mountDom importieren, damit `document` global existiert.
const { el, $, $$, escapeHtml } = await import('../../js/util/dom.js');

describe('escapeHtml', () => {
  it('encodet HTML-Spezialzeichen', () => {
    assert.equal(escapeHtml('<script>alert("x")</script>'),
      '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;');
  });

  it('lässt normalen Text in Ruhe', () => {
    assert.equal(escapeHtml('Hallo Welt'), 'Hallo Welt');
  });

  it('& wird zu &amp;', () => {
    assert.equal(escapeHtml('A & B'), 'A &amp; B');
  });

  it('Apostroph wird zu &#39;', () => {
    assert.equal(escapeHtml("'foo'"), '&#39;foo&#39;');
  });

  it('robust gegen Zahlen', () => {
    assert.equal(escapeHtml(42), '42');
  });
});

describe('el — Element-Konstruktor', () => {
  it('erstellt Element mit Tag', () => {
    const e = el('div');
    assert.equal(e.tagName, 'DIV');
  });

  it('setzt Klasse via "class"-Attribut', () => {
    const e = el('div', { class: 'foo bar' });
    assert.equal(e.className, 'foo bar');
  });

  it('setzt setAttribute für gewöhnliche Attribute', () => {
    const e = el('a', { href: '/x', 'aria-label': 'Test' });
    assert.equal(e.getAttribute('href'), '/x');
    assert.equal(e.getAttribute('aria-label'), 'Test');
  });

  it('normalisiert camelCase-aria zu kebab-case (ariaLabel → aria-label)', () => {
    // Regression: setAttribute('ariaLabel', …) landet als „arialabel" und ist
    // für Screenreader wirkungslos — muss zu „aria-label" normalisiert werden.
    const e = el('button', { ariaLabel: 'Schließen', ariaHidden: 'true' });
    assert.equal(e.getAttribute('aria-label'), 'Schließen');
    assert.equal(e.getAttribute('aria-hidden'), 'true');
    assert.equal(e.hasAttribute('arialabel'), false);
  });

  it('lässt Attribute mit Wert true zur leeren Strings werden', () => {
    const e = el('input', { disabled: true });
    assert.equal(e.getAttribute('disabled'), '');
  });

  it('lässt Attribute mit Wert false weg', () => {
    const e = el('input', { disabled: false });
    assert.equal(e.hasAttribute('disabled'), false);
  });

  it('on-Handler werden via addEventListener registriert', () => {
    let clicked = false;
    const e = el('button', { onClick: () => { clicked = true; } });
    e.dispatchEvent({ type: 'click' });
    assert.equal(clicked, true);
  });

  it('dataset wird übernommen', () => {
    const e = el('div', { dataset: { foo: 'bar', n: '42' } });
    assert.equal(e.dataset.foo, 'bar');
    assert.equal(e.dataset.n, '42');
  });

  it('style als Objekt setzt CSS-Properties', () => {
    const e = el('div', { style: { color: 'red', fontSize: '12px' } });
    assert.equal(e.style.color, 'red');
    assert.equal(e.style.fontSize, '12px');
  });

  it('style setzt CSS-Custom-Properties (--var) via setProperty', () => {
    // Regression: Object.assign(style, {'--x':…}) ignoriert Custom-Props still.
    const e = el('div', { style: { '--dc': '#e63946', '--progress': '50%', width: '50%' } });
    assert.equal(e.style.getPropertyValue('--dc'), '#e63946');
    assert.equal(e.style.getPropertyValue('--progress'), '50%');
    assert.equal(e.style.width, '50%');
  });

  it('style: null/undefined wirft nicht (Object.entries-Guard)', () => {
    // Regression: typeof null === 'object' → früher crashte Object.entries(null).
    assert.doesNotThrow(() => el('div', { style: null }));
    assert.doesNotThrow(() => el('div', { style: undefined }));
  });

  it('Children: einzelnes Element', () => {
    const child = el('span');
    const parent = el('div', {}, child);
    assert.equal(parent.children.length, 1);
    assert.equal(parent.children[0], child);
  });

  it('Children: mehrere Elemente + Strings', () => {
    const parent = el('div', {}, el('span'), 'text', el('em'));
    // FakeNode konvertiert String zu createTextNode → 3 childNodes
    assert.equal(parent.childNodes.length, 3);
  });

  it('Children: null/false werden übersprungen', () => {
    const parent = el('div', {}, el('span'), null, false, el('em'));
    assert.equal(parent.children.length, 2);
  });

  it('Children: Array wird geflattent', () => {
    const parent = el('div', {}, [el('a'), el('b'), el('c')]);
    assert.equal(parent.children.length, 3);
  });

  it('html-Attribut setzt innerHTML', () => {
    const e = el('div', { html: '<span>raw</span>' });
    assert.equal(e.innerHTML, '<span>raw</span>');
  });
});

describe('$ / $$ — Selektoren', () => {
  it('$ ruft querySelector auf root auf', () => {
    const root = el('div');
    root.querySelector = (sel) => sel === '.foo' ? 'matched' : null;
    assert.equal($('.foo', root), 'matched');
  });

  it('$$ liefert Array.from(querySelectorAll)', () => {
    const root = el('div');
    root.querySelectorAll = () => ['a', 'b', 'c'];
    const r = $$('.x', root);
    assert.ok(Array.isArray(r));
    assert.deepEqual(r, ['a', 'b', 'c']);
  });
});

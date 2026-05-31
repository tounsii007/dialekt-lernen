// Tests für den sicheren CSS-Minifier (tools/lib/minify-css.mjs).

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { minifyCss } from '../tools/lib/minify-css.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

describe('minifyCss — Sicherheit', () => {
  it('entfernt Kommentare, behält /*! License */', () => {
    const out = minifyCss('/* weg */ a{color:red} /*! keep */ b{x:1}');
    assert.ok(!out.includes('weg'));
    assert.ok(out.includes('/*! keep */'));
  });

  it('verdichtet { } ; , und Whitespace', () => {
    const out = minifyCss('a {\n  color: red ;\n  margin: 0 ;\n}');
    assert.equal(out, 'a{color: red;margin: 0}');
  });

  it('lässt calc()-Ausdrücke unangetastet', () => {
    const out = minifyCss('a{width:calc(100% + 8px)}');
    assert.ok(out.includes('calc(100% + 8px)'));
  });

  it('schützt content-Strings mit Sonderzeichen', () => {
    const out = minifyCss('a::before{content:"a; b: c {}"}');
    assert.ok(out.includes('"a; b: c {}"'));
  });

  it('schützt url(data:…) inklusive Sonderzeichen', () => {
    const out = minifyCss('a{background:url(data:image/svg+xml;utf8,<svg x="1 2"/>)}');
    assert.ok(out.includes('url(data:image/svg+xml;utf8,<svg x="1 2"/>)'));
  });

  it('tastet Kombinatoren (> +) nicht an', () => {
    const out = minifyCss('a > b + c {x:1}');
    assert.ok(out.includes('a > b + c{'));
  });
});

describe('minifyCss — reale styles.css', () => {
  const src = readFileSync(join(ROOT, 'styles.css'), 'utf8');
  const min = minifyCss(src);

  it('verändert die Klammer-Bilanz nicht', () => {
    const open = (s) => (s.match(/\{/g) || []).length;
    const close = (s) => (s.match(/\}/g) || []).length;
    assert.equal(open(min), open(src));
    assert.equal(close(min), close(src));
  });

  it('erhält alle calc()-Aufrufe', () => {
    const calc = (s) => (s.match(/calc\(/g) || []).length;
    assert.equal(calc(min), calc(src));
  });

  it('ist kleiner als das Original', () => {
    assert.ok(min.length < src.length);
  });

  it('enthält nur noch License-Kommentare', () => {
    // Jedes verbleibende /* muss ein /*! sein.
    const comments = min.match(/\/\*/g) || [];
    const license = min.match(/\/\*!/g) || [];
    assert.equal(comments.length, license.length);
  });

  it('die ausgelieferte styles.min.css ist aktuell', () => {
    // Verhindert Drift zwischen styles.css und committetem styles.min.css.
    const shipped = readFileSync(join(ROOT, 'styles.min.css'), 'utf8');
    assert.equal(
        shipped, min, 'styles.min.css veraltet — `npm run minify-css` ausführen.');
  });
});

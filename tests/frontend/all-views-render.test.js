// Komplexer Schwachstellen-Finder: Rendert JEDE Route-View unter FakeDOM und
// stellt sicher, dass sie (a) nicht wirft und (b) Inhalt erzeugt. Deckt unsaubere
// Implementierungen auf — z.B. ungeschützte querySelector(...).addEventListener,
// fehlende Null-Checks oder Render-Pfade, die ohne echtes Layout crashen.
//
// Die Render-Signaturen spiegeln exakt js/router.js (renderRoute). Wenn dort eine
// Route hinzukommt, sollte sie hier ergänzt werden (Liste ist die Wahrheit für
// „alle Views getestet").

import { describe, it, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { mountDom, unmountDom, resetState, tick } from '../_setup.js';

before(mountDom);
after(unmountDom);

// Reduced-Motion: verhindert dauerhafte Rotations-/Floaty-Timer im Testlauf.
globalThis.window.matchMedia = () => ({ matches: true, addEventListener() {}, removeEventListener() {} });

// route-key → { modul, fn, args(), erwartetInhalt }
const VIEWS = [
  { key: 'home',        mod: '../../js/views/home.js',         fn: 'renderHome',          args: () => [{}],          content: true },
  { key: 'entdecken',   mod: '../../js/views/entdecken.js',    fn: 'renderEntdecken',     args: () => [],            content: true },
  { key: 'dialekt',     mod: '../../js/views/dialektDetail.js',fn: 'renderDialektDetail', args: () => ['hessisch'],  content: true },
  { key: 'lernen',      mod: '../../js/views/lernen.js',       fn: 'renderLernen',        args: () => [{}],          content: true },
  { key: 'quiz',        mod: '../../js/views/quiz.js',         fn: 'renderQuiz',          args: () => [],            content: true },
  { key: 'vergleich',   mod: '../../js/views/vergleich.js',    fn: 'renderVergleich',     args: () => [],            content: true },
  { key: 'favoriten',   mod: '../../js/views/favoriten.js',    fn: 'renderFavoriten',     args: () => [],            content: true },
  { key: 'karte',       mod: '../../js/views/karte.js',        fn: 'renderKarte',         args: () => [],            content: true },
  { key: 'statistiken', mod: '../../js/views/statistiken.js',  fn: 'renderStatistiken',   args: () => [],            content: true },
  { key: 'decks',       mod: '../../js/views/decks.js',        fn: 'renderDecks',         args: () => [],            content: true },
  { key: 'spiele',      mod: '../../js/views/spiele.js',       fn: 'renderSpiele',        args: () => [],            content: true },
  { key: 'sammlung',    mod: '../../js/views/sammlung.js',     fn: 'renderSammlung',      args: () => [],            content: true },
  { key: 'idiome',      mod: '../../js/views/idiome.js',       fn: 'renderIdiome',        args: () => [{}],          content: true },
  { key: 'lektionen',   mod: '../../js/views/lektionen.js',    fn: 'renderLektionen',     args: () => [{}],          content: true },
  { key: 'liga',        mod: '../../js/views/liga.js',         fn: 'renderLiga',          args: () => [],            content: true },
  { key: 'lernpfad',    mod: '../../js/views/lernpfad.js',     fn: 'renderLernpfad',      args: () => [],            content: true },
  { key: 'shadowing',   mod: '../../js/views/shadowing.js',    fn: 'renderShadowing',     args: () => [{}],          content: true },
  { key: 'klangpaare',  mod: '../../js/views/klangpaare.js',   fn: 'renderKlangpaare',    args: () => [{}],          content: true },
  // share ist ein Sonderfall (braucht ein Resultat-Token); ohne Daten darf es
  // einen Leer-/Fehlerzustand rendern, aber NICHT werfen.
  { key: 'share',       mod: '../../js/views/share.js',        fn: 'renderShare',         args: () => [undefined],   content: false },
];

describe('Alle Views rendern ohne Crash (FakeDOM)', () => {
  beforeEach(resetState);

  for (const v of VIEWS) {
    it(`${v.key} · ${v.fn} rendert ${v.content ? 'mit Inhalt' : 'ohne Crash'}`, async () => {
      const mod = await import(v.mod);
      assert.equal(typeof mod[v.fn], 'function', `${v.fn} muss exportiert sein`);
      const root = document.createElement('div');
      await Promise.resolve(mod[v.fn](root, ...v.args()));
      await tick(15); // verzögerte rAF-/setTimeout-Arbeit der View flushen, solange DOM steht
      if (v.content) {
        assert.ok(root.childNodes.length > 0, `${v.fn} sollte Inhalt rendern, war leer`);
      }
    });
  }
});

describe('Re-Render ist idempotent (kein Zustands-Leak)', () => {
  beforeEach(resetState);

  // Views zweimal in dasselbe Root rendern darf nicht werfen — fängt fehlende
  // Cleanup-/Reset-Logik beim Neu-Rendern.
  for (const v of VIEWS.filter(x => x.content)) {
    it(`${v.key} · doppeltes Rendern wirft nicht`, async () => {
      const mod = await import(v.mod);
      const root = document.createElement('div');
      await Promise.resolve(mod[v.fn](root, ...v.args()));
      await tick(5);
      await Promise.resolve(mod[v.fn](root, ...v.args()));
      await tick(15);
      assert.ok(true);
    });
  }
});

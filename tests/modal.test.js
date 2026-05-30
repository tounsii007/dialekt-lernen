// modal.js — Overlay-Schließverhalten & A11y-Attribute.
//
// Fokus-Trap, Initialfokus und Fokus-Wiederherstellung sind browser-only
// (FakeDOM kennt kein document.activeElement, focus() ist No-op) und werden
// dort verifiziert. Hier testen wir die rein logische Schließ-Semantik:
// onClose feuert genau einmal über JEDEN Schließweg (insb. ESC), und das
// confirmModal-Promise löst sich auch per Tastatur/Backdrop auf.

import { describe, it, beforeEach, afterEach, before, after } from 'node:test';
import assert from 'node:assert/strict';

import { mountDom, unmountDom } from './_setup.js';

before(mountDom);
after(unmountDom);

const { openModal, closeModal, confirmModal } = await import('../js/util/modal.js');
const { el } = await import('../js/util/dom.js');

// FakeDOM kennt querySelectorAll nicht — Buttons manuell einsammeln.
function collectButtons(node, out = []) {
  if (node && node.tagName === 'BUTTON') out.push(node);
  for (const c of (node?.childNodes || [])) collectButtons(c, out);
  return out;
}

function pressEscape() {
  document.dispatchEvent({ type: 'keydown', key: 'Escape' });
}

describe('confirmModal — Promise löst über alle Schließwege auf', () => {
  afterEach(() => closeModal());

  it('ESC löst mit false auf (früher: Promise hing für immer)', async () => {
    const p = confirmModal({ title: 'Sicher?', message: 'Test', danger: true });
    pressEscape();
    assert.equal(await p, false);
  });

  it('Backdrop-Klick löst mit false auf', async () => {
    const backdrop = openModalConfirm({ message: 'Test' });
    backdrop.dispatchEvent({ type: 'click' });
    assert.equal(await backdrop._promise, false);
  });

  it('Bestätigen-Button löst mit true auf', async () => {
    const p = confirmModal({ title: 'Ok?', message: 'Test', confirmLabel: 'OK' });
    const backdrop = document.body.childNodes[document.body.childNodes.length - 1];
    const buttons = collectButtons(backdrop);
    // Reihenfolge: × (close), Abbrechen, OK → primäre Aktion ist die letzte.
    buttons[buttons.length - 1].dispatchEvent({ type: 'click' });
    assert.equal(await p, true);
  });

  it('Abbrechen-Button löst mit false auf', async () => {
    const p = confirmModal({ title: 'Ok?', message: 'Test' });
    const backdrop = document.body.childNodes[document.body.childNodes.length - 1];
    const buttons = collectButtons(backdrop);
    // × ist buttons[0], Abbrechen ist buttons[1].
    buttons[1].dispatchEvent({ type: 'click' });
    assert.equal(await p, false);
  });
});

// Helper: confirmModal öffnen und Promise am zurückgegebenen Backdrop ablegen,
// damit der Test es ohne querySelector greifen kann.
function openModalConfirm({ message }) {
  let backdrop;
  const promise = new Promise((resolve) => {
    let answered = false;
    backdrop = openModal({
      title: 'Sicher?',
      content: el('p', {}, message),
      actions: [
        { label: 'Abbrechen', variant: 'ghost', onClick: () => { answered = true; resolve(false); } },
        { label: 'OK', variant: 'primary', onClick: () => { answered = true; resolve(true); } },
      ],
      onClose: () => { if (!answered) resolve(false); },
    });
  });
  backdrop._promise = promise;
  return backdrop;
}

describe('openModal — onClose-Semantik', () => {
  afterEach(() => closeModal());

  it('onClose feuert genau einmal bei ESC', () => {
    let n = 0;
    openModal({ title: 'X', content: el('p', {}, 'hi'), onClose: () => { n++; } });
    pressEscape();
    assert.equal(n, 1);
    // Weitere Schließversuche sind No-ops (Modal ist bereits zu).
    pressEscape();
    closeModal();
    assert.equal(n, 1);
  });

  it('onClose feuert auch ohne explizite Aktion (Backdrop)', () => {
    let n = 0;
    const backdrop = openModal({ title: 'X', content: el('p', {}, 'hi'), onClose: () => { n++; } });
    backdrop.dispatchEvent({ type: 'click' });
    assert.equal(n, 1);
  });

  it('ESC ohne offenes Modal ist ein No-op (kein Wurf)', () => {
    assert.doesNotThrow(() => pressEscape());
  });
});

describe('openModal — Dialog-A11y-Attribute', () => {
  afterEach(() => closeModal());

  it('Panel trägt role=dialog, aria-modal, aria-label und ist fokussierbar', () => {
    const backdrop = openModal({ title: 'Mein Titel', content: el('p', {}, 'x') });
    const panel = backdrop.childNodes[0];
    assert.equal(panel.getAttribute('role'), 'dialog');
    assert.equal(panel.getAttribute('aria-modal'), 'true');
    assert.equal(panel.getAttribute('aria-label'), 'Mein Titel');
    assert.equal(panel.getAttribute('tabindex'), '-1');
  });

  it('Schließen-Button hat aria-label', () => {
    const backdrop = openModal({ title: 'T', content: el('p', {}, 'x') });
    const closeBtn = collectButtons(backdrop).find(b => b.getAttribute('aria-label') === 'Schließen');
    assert.ok(closeBtn, 'Schließen-Button mit aria-label vorhanden');
  });
});

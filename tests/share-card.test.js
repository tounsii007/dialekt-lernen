// Share-Card slug + module loading tests (canvas/DOM-Code wird im Browser getestet).
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('share-card module', () => {
  it('exportiert die erwarteten Funktionen', async () => {
    // Stub: in Node gibt es keinen DOM/Canvas, daher Modul nur laden, nicht aufrufen
    const mod = await import('../js/util/share-card.js');
    assert.equal(typeof mod.renderShareCard, 'function');
    assert.equal(typeof mod.buildShareCardBlob, 'function');
    assert.equal(typeof mod.buildShareCardDataUrl, 'function');
    assert.equal(typeof mod.shareCard, 'function');
  });
});

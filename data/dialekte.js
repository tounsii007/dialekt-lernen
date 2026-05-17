// Zentrales Register aller Dialekte.
// Um einen neuen Dialekt hinzuzufügen:
//   1. Eine neue Datei in data/dialekte/ anlegen (z. B. fraenkisch.js)
//   2. Hier importieren und ins DIALEKTE-Array aufnehmen.
// Die App rendert den neuen Eintrag automatisch.

import hessisch        from './dialekte/hessisch.js';
import berlinisch      from './dialekte/berlinisch.js';
import bayerisch       from './dialekte/bayerisch.js';
import saechsisch      from './dialekte/saechsisch.js';
import schwaebisch     from './dialekte/schwaebisch.js';
import koelsch         from './dialekte/koelsch.js';
import plattdeutsch    from './dialekte/plattdeutsch.js';
import schwizerduetsch from './dialekte/schwizerduetsch.js';
import wienerisch      from './dialekte/wienerisch.js';

export const DIALEKTE = [
  hessisch,
  berlinisch,
  bayerisch,
  saechsisch,
  schwaebisch,
  koelsch,
  plattdeutsch,
  schwizerduetsch,
  wienerisch
];

// Schneller Index per ID für O(1)-Lookup
export const DIALEKT_INDEX = Object.fromEntries(
  DIALEKTE.map(d => [d.id, d])
);

// Aggregierte Liste aller Ausdrücke (über alle Dialekte)
export const ALLE_AUSDRUECKE = DIALEKTE.flatMap(d =>
  d.ausdruecke.map(a => ({ ...a, dialektId: d.id, dialektName: d.name, dialektFlag: d.flag, dialektFarbe: d.farbe }))
);

export function getDialekt(id) {
  return DIALEKT_INDEX[id] || null;
}

export function getAusdruck(dialektId, ausdruckId) {
  const d = getDialekt(dialektId);
  if (!d) return null;
  return d.ausdruecke.find(a => a.id === ausdruckId) || null;
}

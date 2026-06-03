// Pro-Dialekt-Lernfortschritt — präsentativ aus dem globalen Lernstand abgeleitet.
//
// Es gibt KEINEN eigenen Pro-Dialekt-Store: XP/Level werden global geführt
// (siehe js/store/xp.js). Diese Funktion zählt pro Dialekt die gelernten bzw.
// angefangenen Ausdrücke (via getLernstand) und leitet daraus Prozent, ein
// dialekt-lokales Level und eine XP-Schätzung ab. Rein für die Anzeige auf den
// Dialektkarten der Lernen-Setup-Seite — kein Persistieren, keine Migration.
//
// Kosten: O(n) Lookups pro Dialekt, getLernstand ist ein O(1)-Objektzugriff.

import { getLernstand, STATUS_HARD, STATUS_LEARNED } from '../store/learning.js';

// XP-Schätzung spiegelt die echten Award-Werte (XP.cardLearned=10, cardReviewed=5).
const XP_LEARNED = 10;
const XP_STARTED = 5;

/**
 * @param {{ id: string, ausdruecke?: Array<{id:string}> }} dialekt
 * @returns {{ total:number, learned:number, started:number, pct:number, xp:number, level:number }}
 */
export function getDialectProgress(dialekt) {
  const ausdruecke = (dialekt && dialekt.ausdruecke) || [];
  const total = ausdruecke.length;
  let learned = 0;
  let started = 0;
  for (const a of ausdruecke) {
    const stand = getLernstand(dialekt.id, a.id);
    if (stand >= STATUS_LEARNED) learned++;
    else if (stand >= STATUS_HARD) started++; // 1..2 = angefangen
  }
  const pct = total ? Math.round((learned / total) * 100) : 0;
  const xp = learned * XP_LEARNED + started * XP_STARTED;
  const level = 1 + Math.floor(learned / 10); // dialekt-lokal, NICHT levelForXp()
  return { total, learned, started, pct, xp, level };
}

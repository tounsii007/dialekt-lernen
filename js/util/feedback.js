// „Korrektur melden" — User können falsche Übersetzungen / Tippfehler /
// inhaltliche Fehler direkt aus der App heraus an das GitHub-Repo melden.
// Wir öffnen ein vor-ausgefülltes Issue-Formular in einem neuen Tab.

import { ISSUES_URL } from '../version.js';

// Baut die GitHub-Issue-URL mit Title + Body vorausgefüllt.
export function buildCorrectionUrl(dialekt, ausdruck) {
  const title = `Korrektur: ${dialekt.name} · „${ausdruck.ausdruck}" (${ausdruck.id})`;
  const body = `<!-- Beschreibe bitte kurz, was an diesem Eintrag falsch ist. -->

**Dialekt:** ${dialekt.name} (\`${dialekt.id}\`)
**ID:** \`${ausdruck.id}\`
**Ausdruck:** ${ausdruck.ausdruck}
**Hochdeutsch:** ${ausdruck.hochdeutsch}
**Kategorie:** ${ausdruck.kategorie}

**Was sollte korrigiert werden?**
(z. B. falsche Übersetzung, Tippfehler im Beispiel, missverständliche Bedeutung, …)

---
_Gemeldet via Dialekto-App._`;

  const params = new URLSearchParams({
    title,
    body,
    labels: 'data,user-report',
  });
  return `${ISSUES_URL}?${params.toString()}`;
}

// Öffnet das Issue-Formular in einem neuen Tab.
export function reportCorrection(dialekt, ausdruck) {
  const url = buildCorrectionUrl(dialekt, ausdruck);
  try {
    window.open(url, '_blank', 'noopener,noreferrer');
    return true;
  } catch {
    return false;
  }
}

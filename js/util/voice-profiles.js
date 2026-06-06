// Dialekt-Stimmprofile + dialektales TTS-Respelling.
//
// Browser-Sprachausgabe (Web Speech API) kennt keine echten Dialektstimmen.
// Wir nähern uns dem Klang auf zwei Wegen an:
//
//   1) Stimmprofil pro Dialekt — relative Tonhöhe/Tempo (Multiplikatoren auf
//      die Basis-Einstellung) + Geschlechts-Präferenz + deterministische
//      Zuweisung einer konkreten Stimme aus dem verfügbaren Pool. So klingt
//      jeder Dialekt erkennbar eigen, selbst wenn nur eine Stimme installiert
//      ist (dann tragen Tonhöhe/Tempo den Unterschied).
//
//   2) Respelling — der Ausdruck wird vor dem Vorlesen lautlich „umgeschrieben"
//      (z. B. Kölsch/Berlinerisch g→j, Schwäbisch st→scht, Sächsisch ei→ee),
//      sodass die deutsche Stimme näher an der Dialekt-Aussprache landet.
//      Best-effort und bewusst konservativ — lieber wenige sichere Regeln als
//      Kauderwelsch. Liefert immer einen sprechbaren String (Fallback: Original).
//
// Reine Heuristik, kein Linguistik-Werkzeug. Alle Regex laufen auf der
// kleingeschriebenen Form (TTS ignoriert Groß/Klein) und nutzen nur Lookahead
// (Lookbehind wird gemieden — es bricht Parsing in älteren Safari-Versionen).

// Wort-Regeln (ganze Wörter) laufen vor Laut-Regeln. \b auf lowercased Text.
const W = {
  ist:   [/\bist\b/g, 'is'],
  nicht: [/\bnicht\b/g, 'net'],
  dasDes:[/\bdas\b/g, 'des'],
  dasDat:[/\bdas\b/g, 'dat'],
  wasWat:[/\bwas\b/g, 'wat'],
  ichIck:[/\bich\b/g, 'ick'],
  ichIsch:[/\bich\b/g, 'isch'],
  ichIk: [/\bich\b/g, 'ik'],
  auchOoch:[/\bauch\b/g, 'ooch'],
  auchOch:[/\bauch\b/g, 'och'],
};
// Laut-Regeln (Phonem-Annäherung).
const L = {
  gJ_initial:  [/\bg(?=[aeiouyäöü])/g, 'j'],          // gut → jut
  gJ_inter:    [/([aeiouyäöü])g(?=[aeiouyäöü])/g, '$1j'], // sagen → sajen
  gCh_final:   [/([aeiouyäöü])g\b/g, '$1ch'],          // Tag → Tach
  pB_initial:  [/\bp(?=[aeiouyäöülr])/g, 'b'],         // Park → Bark
  tD_initial:  [/\bt(?=[aeiouyäöürw])/g, 'd'],         // Tasse → Dasse
  kG_initial:  [/\bk(?=[aeiouyäöülr])/g, 'g'],         // kalt → galt (sächs. Lenisierung)
  kCh_initial: [/\bk(?=[aeiouyäöü])/g, 'ch'],          // Kind → Chind (alemannisch)
  st_scht:     [/st/g, 'scht'],                        // Fenster → Fenschter ("scht" hat kein "st")
  sp_schp:     [/sp/g, 'schp'],                        // Wespe → Weschpe
  ei_ee:       [/ei/g, 'ee'],                          // Bein → Been
};

// rate/pitch sind Multiplikatoren auf die Basis-Einstellung (1 = neutral).
// gender ('m'|'f'|null) ist eine Präferenz für die Stimmenzuweisung.
export const VOICE_PROFILES = {
  // — Mittel-/Süddeutschland —
  bayerisch:      { rate: 0.95, pitch: 0.92, gender: 'm', respell: [W.nicht, W.ist] },
  oberpfaelzisch: { rate: 0.96, pitch: 0.93, gender: 'm', respell: [W.nicht, W.ist] },
  fraenkisch:     { rate: 0.97, pitch: 0.98, gender: 'f', respell: [W.ist, L.pB_initial, L.tD_initial, L.kG_initial] },
  schwaebisch:    { rate: 0.94, pitch: 0.98, gender: 'f', respell: [L.sp_schp, L.st_scht] },
  badisch:        { rate: 0.95, pitch: 1.00, gender: 'm', respell: [L.sp_schp, L.st_scht] },
  alemannisch:    { rate: 0.93, pitch: 0.96, gender: 'm', respell: [L.sp_schp, L.st_scht, L.kCh_initial] },
  pfaelzisch:     { rate: 0.98, pitch: 1.00, gender: 'm', respell: [W.ichIsch, W.dasDes] },
  saarlaendisch:  { rate: 0.98, pitch: 1.02, gender: 'f', respell: [W.ichIsch, W.dasDes] },
  hessisch:       { rate: 1.02, pitch: 1.03, gender: 'm', respell: [W.ichIsch, W.dasDes, L.gCh_final] },

  // — West / Rheinland / Ruhr —
  koelsch:        { rate: 1.02, pitch: 1.06, gender: 'f', respell: [W.ichIsch, W.auchOoch, L.gJ_initial, L.gJ_inter] },
  ruhrdeutsch:    { rate: 1.00, pitch: 0.96, gender: 'm', respell: [W.dasDat, W.wasWat] },

  // — Ost / Berlin —
  berlinisch:     { rate: 1.06, pitch: 1.00, gender: 'm', respell: [W.ichIck, W.dasDat, W.wasWat, W.auchOoch, L.gJ_initial, L.gJ_inter] },
  brandenburgisch:{ rate: 1.00, pitch: 0.98, gender: 'm', respell: [W.dasDat, W.wasWat, L.gJ_initial, L.gJ_inter] },
  saechsisch:     { rate: 0.96, pitch: 1.08, gender: 'f', respell: [W.ist, L.ei_ee, L.pB_initial, L.tD_initial, L.kG_initial] },
  thueringisch:   { rate: 0.97, pitch: 1.04, gender: 'f', respell: [W.ist, L.pB_initial, L.tD_initial] },

  // — Norddeutschland (Plattdeutsch-Raum) —
  plattdeutsch:   { rate: 0.92, pitch: 0.92, gender: 'm', respell: [W.dasDat, W.wasWat, W.ichIk, [/pf/g, 'p']] },
  ostfriesisch:   { rate: 0.90, pitch: 0.94, gender: 'm', respell: [W.dasDat, W.wasWat, W.ichIk, [/pf/g, 'p']] },
  mecklenburgisch:{ rate: 0.90, pitch: 0.95, gender: 'f', respell: [W.dasDat, W.wasWat, [/pf/g, 'p']] },

  // — Österreich (de-AT) —
  wienerisch:     { rate: 0.95, pitch: 1.04, gender: 'f', respell: [W.ist] },
  tirolerisch:    { rate: 0.96, pitch: 0.97, gender: 'm', respell: [W.ist] },
  steirisch:      { rate: 0.95, pitch: 0.99, gender: 'm', respell: [W.ist] },
  kaerntnerisch:  { rate: 0.95, pitch: 1.05, gender: 'f', respell: [W.ist] },
  vorarlbergerisch:{ rate: 0.93, pitch: 0.98, gender: 'm', respell: [L.sp_schp, L.st_scht, L.kCh_initial] },

  // — Schweiz (de-CH) —
  schwizerduetsch:{ rate: 0.90, pitch: 0.90, gender: 'm', respell: [W.ist, L.sp_schp, L.st_scht, L.kCh_initial] },
};

const NEUTRAL = { rate: 1, pitch: 1, gender: null, respell: [] };

/** Stimmprofil eines Dialekts (immer ein Objekt, nie null). */
export function getVoiceProfile(dialektId) {
  return VOICE_PROFILES[dialektId] || NEUTRAL;
}

/** true, wenn für den Dialekt ein kuratiertes Profil existiert. */
export function hasVoiceProfile(dialektId) {
  return Object.prototype.hasOwnProperty.call(VOICE_PROFILES, dialektId);
}

/**
 * Dialektales Respelling für die Sprachausgabe. Wandelt einen Ausdruck in eine
 * lautnähere Pseudo-Schreibweise, die die deutsche TTS-Stimme dialektaler
 * vorliest. Konservativ; liefert bei leerem/kaputtem Ergebnis das Original.
 */
export function respellForTts(text, dialektId) {
  const raw = String(text ?? '');
  if (!raw.trim()) return raw;
  const rules = getVoiceProfile(dialektId).respell;
  if (!rules || !rules.length) return raw;
  let s = raw.toLowerCase();
  for (const [pattern, repl] of rules) {
    try { s = s.replace(pattern, repl); } catch { /* defekte Regel überspringen */ }
  }
  s = s.trim();
  return s || raw;
}

// FNV-1a — stabiler String-Hash für die deterministische Stimmenzuweisung.
function hashString(s) {
  let h = 2166136261;
  const str = String(s);
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Best-effort-Geschlechtserkennung anhand bekannter TTS-Stimmnamen. Browser
// liefern selten ein Geschlechts-Flag → Namens-Heuristik, sonst null.
const FEMALE_RE = /\b(hedda|katja|anna|petra|marlene|vicki|steffi|female|frau|amala|conchita|elke|claudia|gisela|ingrid|sabine|h.lene)\b/i;
const MALE_RE   = /\b(stefan|conrad|hans|markus|yannick|male|herr|klaus|bernd|reed|florian|viktor|martin)\b/i;
function guessGender(name) {
  const n = String(name || '');
  if (FEMALE_RE.test(n)) return 'f';
  if (MALE_RE.test(n)) return 'm';
  return null;
}

/**
 * Wählt deterministisch eine Stimme für einen Dialekt aus dem verfügbaren Pool.
 *
 * Priorität des Pools: exakte Sprache (de-AT/de-CH) → Sprach-Präfix (de-*) →
 * alle Stimmen. Innerhalb des Pools wird, falls möglich, nach der
 * Geschlechts-Präferenz gefiltert; die finale Auswahl trifft ein stabiler Hash
 * über die dialektId, damit jeder Dialekt verlässlich dieselbe Stimme erhält.
 *
 * @param {string} dialektId
 * @param {string} lang — BCP-47 des Dialekts
 * @param {Array<{name?:string,lang?:string,voiceURI?:string}>} voices
 * @returns {string|null} voiceURI oder null
 */
export function assignVoiceURI(dialektId, lang = 'de-DE', voices = []) {
  if (!Array.isArray(voices) || !voices.length) return null;
  const full = String(lang || 'de-DE').toLowerCase();
  const prefix = (full.split('-')[0] || 'de');

  const exact = voices.filter((v) => (v.lang || '').toLowerCase() === full);
  const prefixPool = voices.filter((v) => (v.lang || '').toLowerCase().startsWith(prefix + '-'));
  let pool = exact.length ? exact : (prefixPool.length ? prefixPool : voices.slice());

  // Stabil sortieren — die Voice-Reihenfolge des Browsers ist nicht garantiert.
  pool.sort((a, b) => String(a.voiceURI || a.name || '').localeCompare(String(b.voiceURI || b.name || '')));

  const pref = getVoiceProfile(dialektId).gender;
  if (pref) {
    const gendered = pool.filter((v) => guessGender(v.name) === pref);
    if (gendered.length) pool = gendered;
  }

  const idx = hashString(dialektId) % pool.length;
  return pool[idx] ? (pool[idx].voiceURI || null) : null;
}

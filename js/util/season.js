// Saison-Modi · Erkennt aktuelle Jahreszeit/Brauchtum-Periode (Karneval, Wiesn, Advent)
// und liefert thematische Begrüßungen + kuratierte Ausdrucks-Listen.
//
// API:
//   getCurrentSeason([date])       → 'karneval' | 'wiesn' | 'advent' | null
//   getSeasonInfo(seasonId)        → { id, emoji, title, label, accent }
//   getSeasonalGreeting([date])    → string (passender Spruch)
//   getSeasonalExpressions([date]) → Array<Ausdruck> (kuratiert, sortiert nach Relevanz)
//   getSeasonStartHref([date])     → '#/lernen?...' für „Saison-Lektion starten"

import { ALLE_AUSDRUECKE } from '../../data/dialekte.js';

// Datumshelfer ---------------------------------------------------------------

function toDate(d) {
  if (d instanceof Date) return d;
  return new Date();
}

function isBetween(date, fromMonth, fromDay, toMonth, toDay) {
  // Vergleich nur Monat/Tag — Jahr ist egal.
  const m = date.getMonth() + 1;
  const day = date.getDate();
  const cur = m * 100 + day;
  const from = fromMonth * 100 + fromDay;
  const to = toMonth * 100 + toDay;
  if (from <= to) return cur >= from && cur <= to;
  // Zeitraum überlappt Jahreswechsel (z. B. Dez–Jan)
  return cur >= from || cur <= to;
}

// Aschermittwoch berechnen (46 Tage vor Ostersonntag).
// Anonyme Gauß-Osterformel — funktioniert für 1900–2199 ohne Tabellen.
function easterDate(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31); // 3 = März, 4 = April
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function ashWednesday(year) {
  const easter = easterDate(year);
  const ash = new Date(easter);
  ash.setDate(easter.getDate() - 46);
  return ash;
}

// Saison-Erkennung -----------------------------------------------------------

export function getCurrentSeason(date) {
  const d = toDate(date);
  const year = d.getFullYear();

  // Advent: 1. Dez bis 6. Januar (inkl. Dreikönigsfest)
  if (isBetween(d, 12, 1, 1, 6)) return 'advent';

  // Karneval: 6. Januar bis Aschermittwoch (heiße Phase Weiberfastnacht–Aschermittwoch)
  const ash = ashWednesday(year);
  // Karneval beginnt am 7. Januar (Tag nach Dreikönig). Vergleich auf 00:00.
  const karnevalStart = new Date(year, 0, 7);
  const today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  if (today >= karnevalStart && today <= ash) return 'karneval';

  // Wiesn: 15. Sep bis 5. Okt (Oktoberfest-Zeitraum)
  if (isBetween(d, 9, 15, 10, 5)) return 'wiesn';

  return null;
}

// Saison-Metadaten -----------------------------------------------------------

const SEASONS = {
  karneval: {
    id: 'karneval',
    emoji: '🎭',
    title: 'Karneval-Zeit',
    label: 'Helau & Alaaf — die fünfte Jahreszeit ist da!',
    accent: '#ef476f'
  },
  wiesn: {
    id: 'wiesn',
    emoji: '🍺',
    title: 'Wiesn-Zeit',
    label: 'O\'zapft is — Oktoberfest in München!',
    accent: '#f59e0b'
  },
  advent: {
    id: 'advent',
    emoji: '🎄',
    title: 'Advents-Zeit',
    label: 'Plätzchen, Glühwein und stille Nächte.',
    accent: '#22c55e'
  }
};

export function getSeasonInfo(seasonId) {
  return SEASONS[seasonId] || null;
}

// Saison-Begrüßungen ---------------------------------------------------------

const GREETINGS = {
  karneval: [
    'Kölle Alaaf! Närrische Grüße!',
    'Helau! Bist du auch im Karnevals-Fieber?',
    'Wer noch nicht jeck ist, wird\'s noch — Alaaf!'
  ],
  wiesn: [
    'O\'zapft is! Auf geht\'s zur Wiesn!',
    'Servus auf der Wiesn — eine Maß für d\' Gaudi!',
    'Lederhosn an, Dirndl raus — Oktoberfest-Zeit!'
  ],
  advent: [
    'Frohe Adventszeit — habt\'s a schöne Zeit!',
    'A scheene Adventszeit wünsch i dir!',
    'Et eß Adventszeit — Plätzchen, Glühwein, Vorfreude.'
  ]
};

export function getSeasonalGreeting(date) {
  const id = getCurrentSeason(date);
  if (!id) return null;
  const list = GREETINGS[id];
  if (!list || list.length === 0) return null;
  // Tagesabhängige, deterministische Wahl — wechselt täglich.
  const d = toDate(date);
  const seed = d.getFullYear() * 366 + Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000);
  return list[seed % list.length];
}

// Saison-Ausdrücke -----------------------------------------------------------

// Schlüsselwörter, die mit großer Wahrscheinlichkeit zu einer Saison passen.
// Treffer im Ausdruck/Bedeutung/Beispiel zählen als Match — sortiert nach Anzahl.
const SEASON_KEYWORDS = {
  karneval: [
    'karneval', 'fasching', 'fastnacht', 'fastelovend', 'alaaf', 'helau',
    'jeck', 'jecken', 'kamelle', 'bützje', 'bütz', 'funken', 'rosenmontag',
    'aschermittwoch', 'weiberfastnacht', 'nubbel', 'närrisch', 'sitzung',
    'umzug', 'kostüm', 'maskerade', 'büttenrede', 'tanzcorps', 'session',
    'elfte elfte', 'narr', 'nelken', 'krawatten', 'stippeföttche',
    'dreigestirn', 'tröömmelche', 'fastelo'
  ],
  wiesn: [
    'wiesn', 'oktoberfest', 'maß', 'mass', 'bier', 'breze', 'brezn',
    'brezel', 'lederhose', 'lederhosn', 'dirndl', 'haxn', 'haxe', 'weißwurst',
    'weisswurst', 'leberkäs', 'leberkas', 'schmankerl', 'gemütlich',
    'gaudi', 'prost', 'krug', 'krügerl', 'oachkatzlschwoaf', 'tracht',
    'zelt', 'bierzelt', 'wiesn-hit', 'auerhahn', 'biergarten', 'hendl',
    'obatzda', 'obazda', 'breze\'n', 'griaß', 'servus', 'pfiat', 'mei',
    'schmatzen', 'bayrisch', 'krapfen'
  ],
  advent: [
    'advent', 'weihnacht', 'christ', 'nikolaus', 'krippe', 'glühwein',
    'plätzchen', 'stollen', 'lebkuchen', 'zimt', 'kekse', 'tannenbaum',
    'baum', 'kerze', 'kerzn', 'stern', 'engel', 'krippenspiel', 'mette',
    'silvester', 'neujahr', 'silvesterabend', 'rauhnächte', 'dreikönig',
    'kranz', 'adventskalender', 'punsch', 'feuerzangenbowle', 'klausengehen',
    'krampus', 'sankt nikolaus', 'klaas', 'krippna', 'gabentisch',
    'bratapfel', 'zimtstern', 'feiertag', 'heiligabend', 'weihnachten'
  ]
};

function scoreExpression(ausdruck, keywords) {
  const txt = [
    ausdruck.ausdruck,
    ausdruck.hochdeutsch,
    ausdruck.bedeutung,
    ausdruck.beispiel,
    ausdruck.beispiel_hd
  ].filter(Boolean).join(' ').toLowerCase();
  let score = 0;
  for (const kw of keywords) {
    if (txt.includes(kw)) score += 1;
    // Treffer im Ausdruck selbst stärker gewichten
    if (ausdruck.ausdruck && ausdruck.ausdruck.toLowerCase().includes(kw)) score += 2;
  }
  return score;
}

export function getSeasonalExpressions(date, limit = 20) {
  const id = getCurrentSeason(date);
  if (!id) return [];
  const keywords = SEASON_KEYWORDS[id] || [];
  if (keywords.length === 0) return [];

  // Kandidaten-Pool je Saison vorfiltern (Performance + bessere Relevanz).
  let pool = ALLE_AUSDRUECKE;
  if (id === 'karneval') {
    pool = ALLE_AUSDRUECKE.filter(a =>
      a.kategorie === 'feiern' || a.dialektId === 'koelsch' || a.dialektId === 'hessisch'
    );
  } else if (id === 'wiesn') {
    pool = ALLE_AUSDRUECKE.filter(a =>
      a.dialektId === 'bayerisch' || a.dialektId === 'fraenkisch' ||
      a.kategorie === 'essen' || a.kategorie === 'feiern' || a.kategorie === 'alltag'
    );
  } else if (id === 'advent') {
    pool = ALLE_AUSDRUECKE.filter(a =>
      a.kategorie === 'feiern' || a.kategorie === 'essen' || a.kategorie === 'familie'
    );
  }

  // Score & sort
  const scored = pool
    .map(a => ({ a, score: scoreExpression(a, keywords) }))
    .filter(x => x.score > 0)
    .sort((x, y) => y.score - x.score || x.a.ausdruck.localeCompare(y.a.ausdruck));

  return scored.slice(0, limit).map(x => x.a);
}

// Link-Helper für „Saison-Lektion starten" ----------------------------------

export function getSeasonStartHref(date) {
  const id = getCurrentSeason(date);
  if (!id) return '#/lernen';
  // Themen-Lektion: Kategorie „feiern" + Saison-Hint im Query (Lernen-View kann ihn nutzen)
  return `#/lernen?kategorie=feiern&saison=${id}`;
}

// Sicherer, dependency-freier CSS-Minifier.
//
// Strategie (bewusst konservativ + robust):
//   1. Block-Kommentare per Regex entfernen (License /*! … */ behalten).
//      Verlässlich, da CSS keine verschachtelten Kommentare kennt und styles.css
//      keine /*-Sequenzen in String-Literalen enthält (per Test abgesichert).
//   2. Den Rest an String-Literalen ("…"/'…') aufsplitten und NUR die
//      Nicht-String-Segmente verdichten: Whitespace kollabieren und um die
//      strukturell unkritischen Zeichen { } ; , verdichten.
//
// NICHT angetastet werden : + - ~ > ( ) und String-Inhalte — damit bleiben
// calc()-Ausdrücke (`calc(100% + 8px)`), Kombinatoren (`a > b`), nth-child-
// Formeln, url(data:…) und content-Strings garantiert unverändert.

// Matcht ein vollständiges einfaches/doppeltes String-Literal (inkl. Escapes).
const STRING_RE = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/;

function tightenText(text) {
  return text
      .replace(/\s+/g, ' ')
      .replace(/\s*([{};,])\s*/g, '$1')
      .replace(/;}/g, '}');
}

/**
 * Minifiziert CSS sicher.
 * @param {string} css
 * @returns {string}
 */
export function minifyCss(css) {
  // 1) Kommentare entfernen (License-Marker /*! … */ behalten).
  const withoutComments = css.replace(/\/\*(?!!)[\s\S]*?\*\//g, '');

  // 2) An (jetzt ausgeglichenen) String-Literalen splitten; nur die
  //    Nicht-String-Segmente (gerade Indizes) verdichten.
  return withoutComments
      .split(STRING_RE)
      .map((seg, idx) => (idx % 2 === 1 ? seg : tightenText(seg)))
      .join('')
      .trim();
}

// Inline-SVG-Flaggen — verlässlich plattformübergreifend.
// Hintergrund: Windows rendert Emoji-Flaggen (🇩🇪) nur als Buchstaben-Kürzel
// ("DE"), nicht als Flagge. Für eine echte Flaggen-Anzeige in der Sprachauswahl
// brauchen wir daher gezeichnete SVGs (24×16, 3:2) statt Emoji.

const SVG_NS = 'http://www.w3.org/2000/svg';

// Markup je Sprache (Inhalt einer 24×16-viewBox).
const FLAG_MARKUP = {
  de:
    '<rect width="24" height="16" fill="#000"/>' +
    '<rect y="5.33" width="24" height="5.34" fill="#D00"/>' +
    '<rect y="10.67" width="24" height="5.33" fill="#FFCE00"/>',
  // Englisch → Union Jack (vereinfacht, bei kleiner Größe gut erkennbar)
  en:
    '<rect width="24" height="16" fill="#012169"/>' +
    '<path d="M0 0 24 16 M24 0 0 16" stroke="#fff" stroke-width="3.2"/>' +
    '<path d="M0 0 24 16 M24 0 0 16" stroke="#C8102E" stroke-width="1.6"/>' +
    '<path d="M12 0V16 M0 8H24" stroke="#fff" stroke-width="5.3"/>' +
    '<path d="M12 0V16 M0 8H24" stroke="#C8102E" stroke-width="3.2"/>',
  tr:
    '<rect width="24" height="16" fill="#E30A17"/>' +
    '<circle cx="9" cy="8" r="4" fill="#fff"/>' +
    '<circle cx="10.2" cy="8" r="3.2" fill="#E30A17"/>' +
    '<path d="M14 8l1.6.55-1 1.36V8.6l1 1.36z" fill="#fff" transform="translate(-0.3 -2.1) scale(1.15)"/>',
  fr:
    '<rect width="24" height="16" fill="#fff"/>' +
    '<rect width="8" height="16" fill="#002654"/>' +
    '<rect x="16" width="8" height="16" fill="#CE1126"/>',
  es:
    '<rect width="24" height="16" fill="#AA151B"/>' +
    '<rect y="4" width="24" height="8" fill="#F1BF00"/>',
};

/**
 * Liefert ein SVG-Flaggen-Element für die Sprache.
 * @param {string} lang  de|en|tr|fr|es
 * @param {number} size  Höhe in px (Breite = size * 1.5)
 */
export function flagSvg(lang, size = 16) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 16');
  svg.setAttribute('width', String(Math.round(size * 1.5)));
  svg.setAttribute('height', String(size));
  svg.setAttribute('class', 'lang-flag');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = FLAG_MARKUP[lang] || '<rect width="24" height="16" fill="#9ca3af"/>';
  return svg;
}

export function hasFlag(lang) {
  return Object.prototype.hasOwnProperty.call(FLAG_MARKUP, lang);
}

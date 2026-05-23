// Inline stroked SVG icons. Stroke colour inherits via currentColor.
// Each returns an SVGElement built from a markup string (parsed in a document fragment).

const SVG_NS = 'http://www.w3.org/2000/svg';

function svg(d, { size = 20, viewBox = '0 0 24 24' } = {}) {
  const s = document.createElementNS(SVG_NS, 'svg');
  s.setAttribute('viewBox', viewBox);
  s.setAttribute('width', size);
  s.setAttribute('height', size);
  s.setAttribute('fill', 'none');
  s.setAttribute('stroke', 'currentColor');
  s.setAttribute('stroke-width', '1.8');
  s.setAttribute('stroke-linecap', 'round');
  s.setAttribute('stroke-linejoin', 'round');
  s.innerHTML = d;
  return s;
}

export const icons = {
  book:     (opts) => svg('<path d="M4 19V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14"/><path d="M4 19a2 2 0 0 0 2 2h12"/><path d="M8 7h6"/><path d="M8 11h6"/>', opts),
  cards:    (opts) => svg('<rect x="3" y="5" width="14" height="14" rx="2"/><path d="M7 9h6"/><path d="M7 13h4"/><path d="M21 7v10a2 2 0 0 1-2 2"/>', opts),
  target:   (opts) => svg('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>', opts),
  speaker:  (opts) => svg('<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M16 9a4 4 0 0 1 0 6"/><path d="M19 6a8 8 0 0 1 0 12"/>', opts),
  star:     (opts) => svg('<path d="m12 3 2.7 5.7 6.3.9-4.5 4.4 1 6.3-5.5-2.9-5.5 2.9 1-6.3L3 9.6l6.3-.9z"/>', opts),
  heart:    (opts) => svg('<path d="M20.8 5.4a5.5 5.5 0 0 0-7.8 0L12 6.5l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8Z"/>', opts),
  sparkles: (opts) => svg('<path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5Z"/><path d="m5 17 .8 2.2L8 20l-2.2.8L5 23l-.8-2.2L2 20l2.2-.8z"/>', opts),
  command:  (opts) => svg('<path d="M9 6V3a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v3"/><path d="M9 18v3a3 3 0 1 1-3-3h12a3 3 0 1 1-3 3v-3"/><rect x="9" y="9" width="6" height="6"/>', opts),
  arrow:    (opts) => svg('<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>', opts),
  search:   (opts) => svg('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', opts),
  flame:    (opts) => svg('<path d="M12 3c1 4 5 5 5 9a5 5 0 1 1-10 0c0-2 1-3 1-5 2 1 4 1 4-4z"/>', opts),
  keyboard: (opts) => svg('<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h.01M11 10h.01M15 10h.01M7 14h10"/>', opts),
  zap:      (opts) => svg('<path d="m13 2-9 12h7l-1 8 9-12h-7z"/>', opts),
  globe:    (opts) => svg('<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/>', opts),
  map:      (opts) => svg('<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14"/><path d="M15 6v14"/>', opts),
  refresh:  (opts) => svg('<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 4v4h-4"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 20v-4h4"/>', opts)
};

export function icon(name, opts) {
  const fn = icons[name];
  return fn ? fn(opts) : svg('<circle cx="12" cy="12" r="9"/>', opts);
}

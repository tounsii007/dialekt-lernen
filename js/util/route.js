// Hash-basiertes Routing: Pfad parsen und Navigation auslösen.

export function parseHash() {
  const hash = location.hash || '#/';
  const path = hash.startsWith('#') ? hash.slice(1) : hash;
  const [pathOnly, query = ''] = path.split('?');
  const segs = pathOnly.split('/').filter(Boolean);
  const params = Object.fromEntries(new URLSearchParams(query).entries());
  return { segs, params, raw: path };
}

export function go(path) {
  location.hash = path.startsWith('#') ? path : `#${path}`;
}

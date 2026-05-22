// Zufallshelfer: shuffle und deterministischer Seed-RNG für „Ausdruck des Tages".

export function shuffle(arr, rng = Math.random) {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// LCG (Numerical Recipes Parameter) — gleicher Seed = gleiches Ergebnis.
export function seededRandom(seed) {
  let s = seed >>> 0;
  return function next() {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

export function pickSeeded(arr, seed) {
  if (!arr || !arr.length) return null;
  const r = seededRandom(seed);
  return arr[Math.floor(r() * arr.length)];
}

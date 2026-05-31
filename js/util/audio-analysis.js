// Aussprache-Rhythmus-Analyse — reine, testbare Mathematik (kein DOM/Audio).
//
// Wir können die TTS-Ausgabe der Web-Speech-API nicht abgreifen, also wird die
// Aufnahme des Nutzers nicht gegen echtes Referenz-Audio verglichen, sondern
// gegen das ERWARTETE Silben-Rhythmusmuster (eine Energie-„Welle" pro Silbe).
// Das misst ehrlich, was offline messbar ist: Silbenzahl und Timing/Rhythmus.
// Phonem-Genauigkeit übernimmt die SpeechRecognition (siehe pronunciation.js).

// RMS-Hüllkurve aus PCM-Samples ([-1,1]) in `buckets` gleich große Eimer.
export function computeEnvelope(samples, buckets = 32) {
  const n = samples ? samples.length : 0;
  const out = new Array(buckets).fill(0);
  if (!n || buckets <= 0) return out;
  const per = n / buckets;
  for (let b = 0; b < buckets; b++) {
    const start = Math.floor(b * per);
    const end = Math.max(start + 1, Math.floor((b + 1) * per));
    let sum = 0, c = 0;
    for (let i = start; i < end && i < n; i++) {
      const v = samples[i] || 0;
      sum += v * v; c++;
    }
    out[b] = c ? Math.sqrt(sum / c) : 0;
  }
  return out;
}

// Skaliert eine Hüllkurve so, dass das Maximum 1 ist. Stille bleibt Stille
// (keine Division durch 0, kein NaN).
export function normalizeEnvelope(env) {
  let max = 0;
  for (const v of env) if (v > max) max = v;
  if (max <= 0) return env.map(() => 0);
  return env.map((v) => v / max);
}

// Lineares Resampling einer Hüllkurve auf Länge `n`.
export function resampleEnvelope(env, n) {
  if (n <= 0) return [];
  const len = env.length;
  if (len === 0) return new Array(n).fill(0);
  if (len === n) return env.slice();
  if (n === 1) return [env[0]];
  const out = new Array(n);
  for (let i = 0; i < n; i++) {
    const pos = (i / (n - 1)) * (len - 1);
    const lo = Math.floor(pos);
    const hi = Math.min(len - 1, lo + 1);
    const frac = pos - lo;
    out[i] = env[lo] * (1 - frac) + env[hi] * frac;
  }
  return out;
}

// Referenz-Hüllkurve: `syllables` gleichmäßig verteilte Gauß-Hügel (Peak 1).
export function syllableEnvelope(syllables, buckets = 32) {
  const out = new Array(buckets).fill(0);
  const n = Math.max(0, Math.floor(syllables));
  if (n === 0 || buckets <= 0) return out;
  // Hügelbreite skaliert mit der Silbenzahl. Der Faktor 4.2 hält das Tal zwischen
  // benachbarten Hügeln bei ~0.11 — tief genug, dass countPeaks() sie zuverlässig
  // trennt (Tal-Schwelle 0.21) und ähnlich den echten Senken zwischen Silben.
  const sigma = Math.max(0.6, buckets / (n * 4.2));
  for (let s = 0; s < n; s++) {
    const center = ((s + 0.5) / n) * buckets;
    for (let b = 0; b < buckets; b++) {
      const d = b + 0.5 - center;
      const g = Math.exp(-(d * d) / (2 * sigma * sigma));
      if (g > out[b]) out[b] = g;
    }
  }
  return out;
}

// Zählt Energie-Hügel (Peaks): Anstieg über `threshold`, getrennt durch ein Tal
// unter `threshold * valleyRatio`. Normalisiert intern.
export function countPeaks(env, { threshold = 0.35, valleyRatio = 0.6 } = {}) {
  const norm = normalizeEnvelope(env);
  const valley = threshold * valleyRatio;
  let peaks = 0, inPeak = false;
  for (const v of norm) {
    if (!inPeak && v >= threshold) { inPeak = true; peaks++; }
    else if (inPeak && v <= valley) { inPeak = false; }
  }
  return peaks;
}

// Mittlere Energie (0..1) einer Hüllkurve nach Normalisierung — als Stille-Check.
export function meanEnergy(env) {
  const norm = normalizeEnvelope(env);
  if (!norm.length) return 0;
  return norm.reduce((s, v) => s + v, 0) / norm.length;
}

/**
 * Bewertet eine aufgenommene Hüllkurve gegen das erwartete Silbenmuster.
 * Kombiniert Form-Ähnlichkeit (50%) und Silben-/Peak-Treffer (50%).
 * Stille (zu wenig Energie) → Score 0.
 *
 * @returns {{ score:number, userPeaks:number, expectedSyllables:number,
 *             shapeSim:number, peakSim:number }}
 */
export function scorePronunciation(userEnv, expectedSyllables, { buckets = 32 } = {}) {
  const exp = Math.max(1, Math.floor(expectedSyllables || 1));
  const userRaw = resampleEnvelope(userEnv || [], buckets);
  const user = normalizeEnvelope(userRaw);
  const ref = syllableEnvelope(exp, buckets);

  let diff = 0;
  for (let i = 0; i < buckets; i++) diff += Math.abs((user[i] || 0) - (ref[i] || 0));
  const shapeSim = Math.max(0, 1 - diff / buckets);

  const userPeaks = countPeaks(userEnv || []);
  const peakSim = 1 - Math.min(1, Math.abs(userPeaks - exp) / Math.max(1, exp));

  const energyOk = meanEnergy(userEnv || []) > 0.05 ? 1 : 0;
  const score = Math.round(100 * energyOk * (0.5 * shapeSim + 0.5 * peakSim));

  return { score, userPeaks, expectedSyllables: exp, shapeSim, peakSim };
}

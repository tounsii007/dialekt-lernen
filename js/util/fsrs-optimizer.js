// FSRS-Parameter-Optimizer — personalisiert die 19 Gewichte aus dem
// Review-Log des Nutzers.
//
// Das ist der entscheidende Vorsprung gegenüber SM-2 (Anki-Default): SM-2
// nutzt für ALLE Nutzer denselben starren Easiness-Mechanismus. FSRS lernt
// aus der tatsächlichen Erinnerungs-Historie, wie SCHNELL DIESER Nutzer DIESE
// Karten vergisst, und justiert das Modell darauf.
//
// Methode (vereinfachtes Pendant zum offiziellen FSRS-Optimizer):
//   1. Review-Log nach Karte gruppieren, chronologisch sortieren.
//   2. Pro Karte die Sequenz mit Kandidaten-Gewichten nachsimulieren und an
//      jedem Review die vorhergesagte Retrievability R gegen das tatsächliche
//      Ergebnis (Again = vergessen, sonst = erinnert) per Log-Loss bewerten.
//   3. Die Gewichte mit Adam (numerischer Gradient, normalisierter Suchraum)
//      so anpassen, dass der mittlere Log-Loss minimal wird.
//
// REIN: kein DOM, kein Store, keine Seiteneffekte — identisch im Web, im
// Worker und als Referenz für die Flutter-Portierung nutzbar. Die Simulation
// folgt exakt der Logik von repeat() in fsrs.js, damit Optimizer-Modell und
// Scheduler-Modell deckungsgleich sind.

import {
  FSRS5_DEFAULT_PARAMS,
  GRADE_AGAIN,
  retrievability,
  initStability,
  initDifficulty,
  nextDifficulty,
  nextRecallStability,
  nextForgetStability,
  nextShortTermStability,
} from './fsrs.js';

const DAY_MS = 86_400_000;
const N = 19;

// Zulässige Bereiche der 19 Gewichte (analog open-spaced-repetition). Hält den
// Optimizer in physikalisch sinnvollen Regionen und definiert zugleich die
// Skalierung des normalisierten Suchraums.
export const FSRS_PARAM_BOUNDS = Object.freeze([
  [0.001, 100], [0.001, 100], [0.001, 100], [0.001, 100], // w0..w3  Initial-Stabilität
  [1, 10],      [0.001, 4],                               // w4,w5   Initial-Difficulty
  [0.001, 4],   [0.001, 0.75],                            // w6,w7   Difficulty-Update
  [0, 4.5],     [0, 0.8],      [0.001, 3.5],              // w8..w10 Recall-Stabilität
  [0.001, 5],   [0.001, 0.25], [0.001, 0.9],             // w11..w13 Forget-Stabilität
  [0, 4],       [0, 1],                                   // w14,w15
  [1, 6],                                                 // w16     Easy-Bonus
  [0, 2],       [0, 2],                                   // w17,w18 Short-Term
]);

// Klemmt eine Parameterliste in die gültigen Bereiche; ersetzt korrupte
// (nicht-endliche) Einträge durch den jeweiligen Default.
export function clampParams(w) {
  const out = new Array(N);
  for (let i = 0; i < N; i++) {
    const [lo, hi] = FSRS_PARAM_BOUNDS[i];
    const v = Number(w && w[i]);
    out[i] = Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : FSRS5_DEFAULT_PARAMS[i];
  }
  return out;
}

function normalize(w) {
  const z = new Array(N);
  for (let i = 0; i < N; i++) {
    const [lo, hi] = FSRS_PARAM_BOUNDS[i];
    z[i] = (w[i] - lo) / (hi - lo);
  }
  return z;
}

function denormalize(z) {
  const w = new Array(N);
  for (let i = 0; i < N; i++) {
    const [lo, hi] = FSRS_PARAM_BOUNDS[i];
    w[i] = lo + Math.min(1, Math.max(0, z[i])) * (hi - lo);
  }
  return w;
}

// Gruppiert Log-Einträge nach Karte und sortiert jede Gruppe chronologisch.
// Korrupte Einträge (fehlende/ungültige Zeit, Grade außerhalb 1..4, leerer
// Key) werden verworfen.
export function groupReviewsByCard(log) {
  const byCard = new Map();
  if (!Array.isArray(log)) return byCard;
  for (const e of log) {
    if (!e || typeof e !== 'object') continue;
    const t = Number(e.t);
    const g = Number(e.g);
    if (!Number.isFinite(t)) continue;
    if (!(g === 1 || g === 2 || g === 3 || g === 4)) continue;
    const key = typeof e.key === 'string' && e.key ? e.key : null;
    if (!key) continue;
    if (!byCard.has(key)) byCard.set(key, []);
    byCard.get(key).push({ t, g });
  }
  for (const arr of byCard.values()) arr.sort((a, b) => a.t - b.t);
  return byCard;
}

// Baut aus dem Log die Trainingssequenzen: pro Karte die Folge der Reviews mit
// den verstrichenen Tagen seit dem vorigen Review. `scored` zählt die
// bewertbaren Reviews (alle außer dem jeweils ersten — das erste Review
// initialisiert nur und hat keine vorhergehende Retention).
export function buildSequences(log) {
  const byCard = groupReviewsByCard(log);
  const sequences = [];
  let scored = 0;
  for (const [key, reviews] of byCard) {
    if (!reviews.length) continue;
    const steps = [];
    for (let i = 0; i < reviews.length; i++) {
      const elapsed = i === 0 ? 0 : Math.max(0, (reviews[i].t - reviews[i - 1].t) / DAY_MS);
      steps.push({ grade: reviews[i].g, elapsed });
    }
    scored += steps.length - 1;
    sequences.push({ key, steps });
  }
  return { sequences, scored, cards: sequences.length };
}

// Mittlerer binärer Log-Loss (Cross-Entropy) der Kandidaten-Gewichte über die
// Sequenzen. Niedriger = das Modell sagt das Erinnern/Vergessen besser vorher.
export function evaluateLoss(params, sequences) {
  const w = clampParams(params);
  let total = 0;
  let n = 0;
  for (const seq of sequences) {
    const steps = seq.steps;
    let S = 0;
    let D = 0;
    for (let i = 0; i < steps.length; i++) {
      const { grade, elapsed } = steps[i];
      if (i === 0) {
        S = initStability(grade, w);
        D = initDifficulty(grade, w);
        continue;
      }
      const r = retrievability(elapsed, S);
      const label = grade === GRADE_AGAIN ? 0 : 1;
      const p = Math.min(1 - 1e-6, Math.max(1e-6, r));
      total += -(label * Math.log(p) + (1 - label) * Math.log1p(-p));
      n++;
      // Update exakt wie in repeat(): Stabilität nutzt die ALTE Difficulty.
      const oldD = D;
      const oldS = S;
      D = nextDifficulty(oldD, grade, w);
      if (elapsed < 1) S = nextShortTermStability(oldS, grade, w);
      else if (grade === GRADE_AGAIN) S = nextForgetStability(oldD, oldS, r, w);
      else S = nextRecallStability(oldD, oldS, r, grade, w);
    }
  }
  return { loss: n ? total / n : Infinity, n };
}

/**
 * Fittet die FSRS-Gewichte aus einem Review-Log.
 *
 * @param {Array} log  Einträge { key, t, g, ... } (s. appendSrsLog in srs.js)
 * @param {object} [opts]
 * @param {number}   [opts.minReviews=64]      Mindestzahl bewertbarer Reviews
 * @param {number}   [opts.maxIters=60]        Adam-Iterationen
 * @param {number}   [opts.learningRate=0.1]   Lernrate (normalisierter Raum)
 * @param {number}   [opts.regularization=0.01] L2-Prior Richtung Default-Gewichte
 * @param {number[]} [opts.initialParams]      Startgewichte (Default: FSRS-5)
 * @returns {{ok:boolean, params:number[], ...}}
 */
export function optimize(log, opts = {}) {
  const { sequences, scored, cards } = buildSequences(log);
  const minReviews = opts.minReviews ?? 64;
  if (scored < minReviews) {
    return {
      ok: false,
      reason: 'insufficient-data',
      reviews: scored,
      cards,
      minReviews,
      params: clampParams(opts.initialParams || FSRS5_DEFAULT_PARAMS),
    };
  }

  const maxIters = Math.max(1, opts.maxIters ?? 60);
  const lr = opts.learningRate ?? 0.1;
  const reg = Math.max(0, opts.regularization ?? 0.01);
  const tol = opts.tol ?? 1e-5;
  const init = clampParams(opts.initialParams || FSRS5_DEFAULT_PARAMS);
  const defaultZ = normalize(clampParams(FSRS5_DEFAULT_PARAMS));

  // Zielfunktion im normalisierten Raum: Daten-Loss + optionaler Prior.
  const objective = (z) => {
    const { loss } = evaluateLoss(denormalize(z), sequences);
    if (!Number.isFinite(loss)) return Infinity;
    if (reg <= 0) return loss;
    let regTerm = 0;
    for (let i = 0; i < N; i++) {
      const dz = z[i] - defaultZ[i];
      regTerm += dz * dz;
    }
    return loss + reg * (regTerm / N);
  };

  let z = normalize(init);
  const m = new Array(N).fill(0);
  const v = new Array(N).fill(0);
  const b1 = 0.9;
  const b2 = 0.999;
  const adamEps = 1e-8;
  const gradEps = 1e-3;

  const initialLoss = evaluateLoss(denormalize(z), sequences).loss;
  let bestZ = z.slice();
  let bestObj = objective(z);
  let iterations = 0;

  for (let it = 1; it <= maxIters; it++) {
    iterations = it;

    // Numerischer Gradient (zentrale Differenz) im normalisierten Raum.
    const grad = new Array(N);
    let gnorm = 0;
    for (let i = 0; i < N; i++) {
      const zp = z.slice();
      const zm = z.slice();
      zp[i] = Math.min(1, z[i] + gradEps);
      zm[i] = Math.max(0, z[i] - gradEps);
      const denom = (zp[i] - zm[i]) || 1e-9;
      const gi = (objective(zp) - objective(zm)) / denom;
      grad[i] = Number.isFinite(gi) ? gi : 0;
      gnorm += grad[i] * grad[i];
    }

    // Adam-Schritt mit Bias-Korrektur, danach auf [0,1] geklemmt.
    for (let i = 0; i < N; i++) {
      m[i] = b1 * m[i] + (1 - b1) * grad[i];
      v[i] = b2 * v[i] + (1 - b2) * grad[i] * grad[i];
      const mhat = m[i] / (1 - Math.pow(b1, it));
      const vhat = v[i] / (1 - Math.pow(b2, it));
      z[i] = z[i] - (lr * mhat) / (Math.sqrt(vhat) + adamEps);
      z[i] = Math.min(1, Math.max(0, z[i]));
    }

    const obj = objective(z);
    if (obj < bestObj) {
      bestObj = obj;
      bestZ = z.slice();
    }
    if (Math.sqrt(gnorm) < tol) break;
  }

  const params = clampParams(denormalize(bestZ));
  const finalLoss = evaluateLoss(params, sequences).loss;
  return {
    ok: true,
    params,
    initialLoss,
    finalLoss,
    improvement: initialLoss - finalLoss,
    reviews: scored,
    cards,
    iterations,
  };
}

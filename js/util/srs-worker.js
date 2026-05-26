// Web Worker: rechnet SM-2-Updates off-main-thread.
//
// Empfängt: { event: 'review', card, rating }
// Antwortet: { event: 'reviewed', updatedCard, srs }
//
// WICHTIG: Dieser Worker darf NICHT auf state.js oder localStorage zugreifen.
// Daher steht hier eine eigenständige SM-2-Implementierung. Sie spiegelt
// die Logik in `js/store/srs.js` 1:1 — Änderungen müssen synchron gehalten
// werden (alternativ kann der Worker `srs.js` per dynamic import laden,
// solange der Host garantiert, dass dort keine Top-Level-Side-Effects auf
// localStorage stattfinden — was aktuell nicht der Fall ist).
//
// Die Karte (`card`) wird durchgereicht und kommt als `updatedCard` mit
// gemergtem `_srs`-Feld zurück. Der Host übernimmt die Persistierung.

const MIN_EF = 1.3;
const INIT_EF = 2.5;
const DAY_MS = 86_400_000;

const RATING_HARD = 1;
const RATING_MED  = 2;
const RATING_EASY = 3;

function ratingToQuality(r) {
  if (r === RATING_EASY) return 5;
  if (r === RATING_MED)  return 3;
  return 2;
}
function ratingToStand(r) {
  if (r === RATING_EASY) return 3;
  if (r === RATING_MED)  return 2;
  return 1;
}

function computeSm2(prev, rating) {
  const now = Date.now();
  const base = prev || {
    ef: INIT_EF, reps: 0, interval: 0, due: now, lapses: 0, last: 0, stand: 0
  };
  const q = ratingToQuality(rating);
  let { ef, reps, interval, lapses } = base;
  if (q < 3) {
    reps = 0;
    interval = 1;
    lapses += 1;
  } else {
    reps += 1;
    if (reps === 1) interval = 1;
    else if (reps === 2) interval = 6;
    else interval = Math.max(1, Math.round(interval * ef));
  }
  ef = ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (ef < MIN_EF) ef = MIN_EF;
  return {
    ef: Number(ef.toFixed(3)),
    reps,
    interval,
    due: now + interval * DAY_MS,
    lapses,
    last: now,
    stand: ratingToStand(rating)
  };
}

self.addEventListener('message', (e) => {
  const msg = e.data || {};
  if (msg.event !== 'review') return;
  try {
    const { card, rating } = msg;
    const prev = (card && card._srs) || null;
    const srs = computeSm2(prev, rating);
    const updatedCard = { ...(card || {}), _srs: srs };
    self.postMessage({ event: 'reviewed', updatedCard, srs, id: msg.id });
  } catch (err) {
    self.postMessage({
      event: 'error',
      message: String(err && err.message || err),
      id: msg.id
    });
  }
});

// Pull-to-Refresh für Mobile (Touch): am Seitenanfang nach unten ziehen, um die
// aktuelle Ansicht neu zu laden. Reiner Logik-Kern (testbar) + DOM-Verdrahtung,
// die in Nicht-Browser-Umgebungen (Tests) zur No-op wird.

export const PTR_THRESHOLD = 70; // px gezogener Weg bis zum Auslösen
export const PTR_RESISTANCE = 0.5; // Dämpfung des Zieh-Wegs (0..1)
export const PTR_MAX = PTR_THRESHOLD * 1.5;

// Gedämpfter Zieh-Weg: nur nach unten (positiv), gedeckelt für ein elastisches
// Gefühl. Rein — Grundlage der Geste, ohne DOM.
export function applyResistance(deltaY, resistance = PTR_RESISTANCE) {
  if (!(deltaY > 0)) return 0;
  return Math.min(PTR_MAX, deltaY * resistance);
}

// Löst die Aktualisierung aus, sobald der gedämpfte Weg den Schwellwert erreicht.
export function shouldTrigger(pull, threshold = PTR_THRESHOLD) {
  return pull >= threshold;
}

// Verdrahtet Pull-to-Refresh auf dem Dokument. Liefert eine Detach-Funktion.
// onRefresh kann ein Promise zurückgeben; währenddessen dreht der Indikator.
export function attachPullToRefresh({
  onRefresh,
  threshold = PTR_THRESHOLD,
  resistance = PTR_RESISTANCE,
} = {}) {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return () => {};
  }

  let indicator = document.querySelector('.ptr-indicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.className = 'ptr-indicator';
    indicator.setAttribute('aria-hidden', 'true');
    indicator.innerHTML = '<div class="ptr-spinner"></div>';
    document.body.appendChild(indicator);
  }

  let startY = 0;
  let pulling = false;
  let pull = 0;
  let refreshing = false;

  const atTop = () =>
    (window.scrollY || document.documentElement.scrollTop || 0) <= 0;

  function setIndicator(p) {
    indicator.style.transform =
      `translateX(-50%) translateY(${Math.min(p, PTR_MAX)}px)`;
    indicator.style.opacity = String(Math.min(1, p / threshold));
    indicator.classList.toggle('is-armed', p >= threshold);
  }

  function onStart(e) {
    if (refreshing || !atTop() || !e.touches || e.touches.length !== 1) {
      pulling = false;
      return;
    }
    startY = e.touches[0].clientY;
    pulling = true;
    pull = 0;
  }

  function onMove(e) {
    if (!pulling || refreshing) return;
    const dy = e.touches[0].clientY - startY;
    if (dy <= 0 || !atTop()) {
      pull = 0;
      setIndicator(0);
      return;
    }
    pull = applyResistance(dy, resistance);
    setIndicator(pull);
    // Sobald wir merklich ziehen, das native Overscroll-Bouncing unterdrücken.
    if (pull > 6 && e.cancelable) e.preventDefault();
  }

  async function onEnd() {
    if (!pulling || refreshing) {
      pulling = false;
      return;
    }
    pulling = false;
    if (!shouldTrigger(pull, threshold)) {
      setIndicator(0);
      return;
    }
    refreshing = true;
    indicator.classList.add('is-refreshing');
    setIndicator(threshold);
    const startedAt = Date.now();
    try {
      await onRefresh?.();
    } catch {
      // Refresh-Fehler nicht hochblubbern lassen — Geste soll robust bleiben.
    } finally {
      // Kurze Mindestanzeige, damit der Spinner nicht „blitzt".
      const elapsed = Date.now() - startedAt;
      const wait = Math.max(0, 400 - elapsed);
      setTimeout(() => {
        refreshing = false;
        indicator.classList.remove('is-refreshing');
        setIndicator(0);
      }, wait);
    }
  }

  document.addEventListener('touchstart', onStart, { passive: true });
  document.addEventListener('touchmove', onMove, { passive: false });
  document.addEventListener('touchend', onEnd, { passive: true });
  document.addEventListener('touchcancel', onEnd, { passive: true });

  return () => {
    document.removeEventListener('touchstart', onStart);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend', onEnd);
    document.removeEventListener('touchcancel', onEnd);
  };
}

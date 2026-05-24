// Netzwerk-Status-Anzeige: Online/Offline-Indikator + Verbindungsqualität

let bannerEl = null;
let toastFn = null;

function getBanner() {
  if (bannerEl && document.body.contains(bannerEl)) return bannerEl;
  bannerEl = document.createElement('div');
  bannerEl.id = 'networkBanner';
  bannerEl.className = 'network-banner';
  bannerEl.setAttribute('role', 'status');
  bannerEl.setAttribute('aria-live', 'polite');
  document.body.insertBefore(bannerEl, document.body.firstChild);
  return bannerEl;
}

function showBanner(msg, type = 'offline', autohide = 0) {
  const b = getBanner();
  b.className = 'network-banner is-visible network-' + type;
  b.innerHTML = `<span class="nb-dot"></span><span class="nb-text">${msg}</span>`;
  if (autohide > 0) {
    clearTimeout(b._timer);
    b._timer = setTimeout(() => hideBanner(), autohide);
  }
}

function hideBanner() {
  if (!bannerEl) return;
  bannerEl.classList.remove('is-visible');
}

function getConnectionInfo() {
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (!conn) return null;
  return {
    type: conn.effectiveType || conn.type || 'unknown',
    downlink: conn.downlink,
    saveData: conn.saveData
  };
}

export function initNetwork(toast) {
  toastFn = toast;

  const handleOffline = () => {
    showBanner('Offline — gespeicherte Daten sind verfügbar', 'offline');
    if (toast) toast('📡 Verbindung unterbrochen — App läuft offline weiter.', 'info', 3000);
  };

  const handleOnline = () => {
    showBanner('Wieder online ✓', 'online', 3000);
    if (toast) toast('✅ Wieder online!', 'success', 1800);
    // Notify SW to refresh caches
    if (navigator.serviceWorker?.controller) {
      navigator.serviceWorker.controller.postMessage('REFRESH_CACHE');
    }
  };

  window.addEventListener('offline', handleOffline);
  window.addEventListener('online', handleOnline);

  // Initial state
  if (!navigator.onLine) {
    showBanner('Offline — gespeicherte Daten verfügbar', 'offline');
  }

  // Verbindungsqualität überwachen
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (conn) {
    conn.addEventListener('change', () => {
      const info = getConnectionInfo();
      if (!info || !navigator.onLine) return;
      if (info.type === '2g' || info.type === 'slow-2g') {
        showBanner('Langsame Verbindung — Offline-Modus empfohlen', 'slow', 5000);
      }
      if (info.saveData) {
        showBanner('Datensparmodus aktiv', 'slow', 4000);
      }
    });
  }
}

export function isOnline() {
  return navigator.onLine;
}

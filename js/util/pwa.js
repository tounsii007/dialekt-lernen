// PWA-Setup: Service-Worker registrieren + Install-Prompt verwalten.

let deferredInstall = null;

export function initPwa(toast) {
  // SW nur in https oder localhost (Browser-Vorgabe).
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').then((reg) => {
        // Auf Update-Erkennung lauschen — wenn eine neuere SW-Version
        // installiert wurde, dem User Bescheid geben.
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (!newWorker) return;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Neue Version wartet — App neu laden zur Aktivierung.
              if (toast) {
                toast('Neue Version verfügbar — klicke hier zum Aktualisieren', 'info', 6000);
              }
            }
          });
        });
      }).catch(() => {});

      // Aktivierungs-Nachricht vom SW empfangen.
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data?.type === 'SW_ACTIVATED' && toast) {
          // Nur Toast zeigen, wenn das Update tatsächlich was Neues war.
          const prev = sessionStorage.getItem('dialekto:lastSwVersion');
          if (prev && prev !== event.data.version) {
            toast(`Aktualisiert auf v${event.data.version} ✓`, 'success', 2200);
          }
          try { sessionStorage.setItem('dialekto:lastSwVersion', event.data.version); } catch {}
        }
      });
    });
  }

  // Install-Prompt: BeforeInstallPromptEvent abfangen, später bei User-Trigger anzeigen.
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstall = e;
    showInstallChip(toast);
  });

  window.addEventListener('appinstalled', () => {
    deferredInstall = null;
    hideInstallChip();
    if (toast) toast('Dialekto installiert ✓', 'success', 2000);
  });
}

function showInstallChip(toast) {
  if (document.getElementById('installChip')) return;
  // Nur einmal pro Session anzeigen
  try {
    if (sessionStorage.getItem('dialekto:installShown')) return;
    sessionStorage.setItem('dialekto:installShown', '1');
  } catch {}
  const chip = document.createElement('button');
  chip.id = 'installChip';
  chip.className = 'install-chip';
  chip.innerHTML = `
    <span class="install-chip-icon">📲</span>
    <span class="install-chip-text">Als App installieren</span>
    <span class="install-chip-close" aria-label="Schließen">✕</span>
  `;
  document.body.appendChild(chip);

  chip.addEventListener('click', async (e) => {
    if (e.target.classList.contains('install-chip-close')) {
      hideInstallChip();
      return;
    }
    if (!deferredInstall) return;
    deferredInstall.prompt();
    try {
      const choice = await deferredInstall.userChoice;
      if (choice.outcome === 'accepted' && toast) toast('Installation läuft…', 'info', 1400);
    } catch {}
    deferredInstall = null;
    hideInstallChip();
  });
}

function hideInstallChip() {
  const chip = document.getElementById('installChip');
  if (chip) chip.remove();
}

export async function clearAppCaches() {
  if (navigator.serviceWorker?.controller) {
    navigator.serviceWorker.controller.postMessage('CLEAR_CACHE');
  }
}

// Generiert ein teilbares Bild (PNG) aus einem Ausdruck-Objekt.
// Nutzt Canvas — kein externes Asset, keine Server-Rendering.
//
// Bildmaß: 1080x1350 (Instagram-Portrait). Mit Dialekt-Farbverlauf,
// großem Ausdruck, Hochdeutsch-Übersetzung, kurzer Bedeutung.
//
// Public API:
//   buildShareCardBlob(ausdruck) → Promise<Blob>
//   shareCard(ausdruck) → versucht Web Share API; Fallback: Download

const W = 1080;
const H = 1350;

function wrapText(ctx, text, maxWidth) {
  const words = String(text || '').split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    const test = line ? line + ' ' + w : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawWrapped(ctx, text, x, y, maxWidth, lineHeight, maxLines = Infinity) {
  const lines = wrapText(ctx, text, maxWidth);
  const out = lines.slice(0, maxLines);
  if (lines.length > maxLines && out.length > 0) {
    // Ellipsis at end of last line
    let last = out[out.length - 1];
    while (ctx.measureText(last + '…').width > maxWidth && last.length > 0) {
      last = last.slice(0, -1);
    }
    out[out.length - 1] = last + '…';
  }
  out.forEach((line, i) => {
    ctx.fillText(line, x, y + i * lineHeight);
  });
  return out.length * lineHeight;
}

/**
 * Render the share card to a canvas.
 * @param {object} a — ausdruck object with { ausdruck, hochdeutsch, bedeutung, dialektName, dialektFarbe, dialektFlag }
 * @returns {HTMLCanvasElement}
 */
export function renderShareCard(a) {
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  const farbe = a.dialektFarbe || '#8338ec';
  const flag = a.dialektFlag || '🗣️';
  const dialektName = a.dialektName || '';

  // Background: gradient
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, farbe);
  grad.addColorStop(1, mix(farbe, '#1a1a2e', 0.45));
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Subtle vignette
  const vg = ctx.createRadialGradient(W / 2, H / 2, W * 0.3, W / 2, H / 2, W * 0.9);
  vg.addColorStop(0, 'rgba(0,0,0,0)');
  vg.addColorStop(1, 'rgba(0,0,0,0.35)');
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, W, H);

  // Inner card (frosted)
  const padX = 80, padY = 100;
  const innerW = W - 2 * padX;
  const innerH = H - 2 * padY;
  ctx.save();
  roundRect(ctx, padX, padY, innerW, innerH, 48);
  ctx.fillStyle = 'rgba(255,255,255,0.07)';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(255,255,255,0.18)';
  ctx.stroke();
  ctx.restore();

  // Top: flag + dialect name
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'left';
  ctx.font = '700 44px "Inter", system-ui, sans-serif';
  ctx.fillText(`${flag}  ${dialektName}`, padX + 60, padY + 100);

  // Top-right: dialekto brand mark
  ctx.textAlign = 'right';
  ctx.font = '600 28px "Inter", system-ui, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.fillText('Dialekto', W - padX - 60, padY + 100);

  // Center: ausdruck (BIG)
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fff';
  ctx.font = '800 120px "Fraunces", Georgia, serif';
  let y = padY + 380;
  // Try to fit ausdruck in 1-2 lines
  let fontSize = 120;
  while (fontSize > 60) {
    ctx.font = `800 ${fontSize}px "Fraunces", Georgia, serif`;
    const lines = wrapText(ctx, a.ausdruck || '', innerW - 120);
    if (lines.length <= 2) break;
    fontSize -= 8;
  }
  const ausdruckHeight = drawWrapped(ctx, a.ausdruck || '', W / 2, y, innerW - 120, fontSize * 1.15, 2);
  y += ausdruckHeight + 30;

  // Divider
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 120, y);
  ctx.lineTo(W / 2 + 120, y);
  ctx.stroke();
  y += 60;

  // Hochdeutsch
  ctx.fillStyle = '#fff';
  ctx.font = '500 52px "Inter", system-ui, sans-serif';
  const hdHeight = drawWrapped(ctx, a.hochdeutsch || '', W / 2, y, innerW - 120, 64, 2);
  y += hdHeight + 50;

  // Beispiel (italic)
  if (a.beispiel) {
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.font = 'italic 600 36px "Fraunces", Georgia, serif';
    drawWrapped(ctx, '„' + a.beispiel + '"', W / 2, y, innerW - 120, 48, 3);
  }

  // Bottom: kategorie + URL hint
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.font = '500 26px "Inter", system-ui, sans-serif';
  const bottomY = H - padY - 60;
  const kategorieLabel = a.kategorie ? `#${a.kategorie}` : '';
  if (kategorieLabel) ctx.fillText(kategorieLabel + '  ·  dialekto.app', W / 2, bottomY);
  else ctx.fillText('dialekto.app', W / 2, bottomY);

  return canvas;
}

export function buildShareCardBlob(a) {
  return new Promise((resolve, reject) => {
    try {
      const canvas = renderShareCard(a);
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas toBlob failed'));
      }, 'image/png');
    } catch (e) {
      reject(e);
    }
  });
}

export function buildShareCardDataUrl(a) {
  const canvas = renderShareCard(a);
  return canvas.toDataURL('image/png');
}

/**
 * Tries Web Share API (file), falls back to download.
 * @returns {Promise<'shared'|'downloaded'>}
 */
export async function shareCard(a) {
  const blob = await buildShareCardBlob(a);
  const filename = `dialekto-${slug(a.dialektName)}-${slug(a.ausdruck)}.png`;
  const file = new File([blob], filename, { type: 'image/png' });

  // Web Share API mit Files-Support
  if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: `${a.dialektName} · ${a.ausdruck}`,
        text: `„${a.ausdruck}" — ${a.hochdeutsch}`,
      });
      return 'shared';
    } catch (e) {
      if (e.name === 'AbortError') return 'shared'; // user cancelled, no fallback
      // sonst fallthrough zum Download
    }
  }

  // Fallback: Download
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 200);
  return 'downloaded';
}

// ---- Helpers ----

function slug(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
}

function roundRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function mix(c1, c2, t) {
  const a = parseHex(c1);
  const b = parseHex(c2);
  if (!a || !b) return c1;
  const r = Math.round(a.r * (1 - t) + b.r * t);
  const g = Math.round(a.g * (1 - t) + b.g * t);
  const bl = Math.round(a.b * (1 - t) + b.b * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

function parseHex(hex) {
  if (typeof hex !== 'string') return null;
  const m = hex.trim().match(/^#?([0-9a-f]{6})$/i);
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

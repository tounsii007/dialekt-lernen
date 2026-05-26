// Generiert ein teilbares Bild (PNG) aus einem Ausdruck-Objekt.
// Nutzt Canvas — kein externes Asset, keine Server-Rendering.
//
// Bildmaß: 1080x1350 (Instagram-Portrait). Mit Dialekt-Farbverlauf,
// großem Ausdruck, Hochdeutsch-Übersetzung, kurzer Bedeutung.
//
// Public API:
//   buildShareCardBlob(ausdruck) → Promise<Blob>
//   shareCard(ausdruck) → versucht Web Share API; Fallback: Download

// Verfügbare Bildformate
export const SHARE_FORMATS = {
  square:   { w: 1080, h: 1080, label: 'Quadrat (Instagram)', icon: '⬛' },
  portrait: { w: 1080, h: 1350, label: 'Portrait (Feed)',     icon: '📱' },
  story:    { w: 1080, h: 1920, label: 'Story (9:16)',         icon: '📲' },
  landscape:{ w: 1200, h: 630,  label: 'Landscape (Twitter/OG)', icon: '🖼️' },
};

// Standardformat
const DEFAULT_FORMAT = 'portrait';

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
 * @param {string} formatId — 'square' | 'portrait' | 'story' | 'landscape' (default: 'portrait')
 * @returns {HTMLCanvasElement}
 */
export function renderShareCard(a, formatId = DEFAULT_FORMAT) {
  const fmt = SHARE_FORMATS[formatId] || SHARE_FORMATS[DEFAULT_FORMAT];
  const W = fmt.w, H = fmt.h;
  const isLandscape = W > H;
  const isStory = H / W > 1.6;
  // Skalierungs-Faktor: kleinere Formate → kleinere Padding/Schriften
  const scale = Math.min(W, H) / 1080;

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
  const vg = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.3, W / 2, H / 2, Math.max(W, H) * 0.9);
  vg.addColorStop(0, 'rgba(0,0,0,0)');
  vg.addColorStop(1, 'rgba(0,0,0,0.35)');
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, W, H);

  // Inner card (frosted)
  const padX = Math.round(80 * scale);
  const padY = Math.round((isLandscape ? 60 : 100) * scale);
  const innerW = W - 2 * padX;
  const innerH = H - 2 * padY;
  ctx.save();
  roundRect(ctx, padX, padY, innerW, innerH, Math.round(48 * scale));
  ctx.fillStyle = 'rgba(255,255,255,0.07)';
  ctx.fill();
  ctx.lineWidth = Math.max(1, Math.round(2 * scale));
  ctx.strokeStyle = 'rgba(255,255,255,0.18)';
  ctx.stroke();
  ctx.restore();

  // Top: flag + dialect name
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'left';
  ctx.font = `700 ${Math.round(44 * scale)}px "Inter", system-ui, sans-serif`;
  ctx.fillText(`${flag}  ${dialektName}`, padX + 60 * scale, padY + 100 * scale);

  // Top-right: dialekto brand mark
  ctx.textAlign = 'right';
  ctx.font = `600 ${Math.round(28 * scale)}px "Inter", system-ui, sans-serif`;
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.fillText('Dialekto', W - padX - 60 * scale, padY + 100 * scale);

  // Center: ausdruck (BIG)
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fff';
  // Vertikale Mitte abhängig vom Format
  const centerY = isLandscape ? H * 0.42 : (isStory ? H * 0.42 : H * 0.32);
  let y = centerY;
  // Try to fit ausdruck in 1-2 lines
  let fontSize = Math.round(120 * scale);
  const maxAusdruckSize = isLandscape ? Math.round(90 * scale) : fontSize;
  fontSize = Math.min(fontSize, maxAusdruckSize);
  while (fontSize > 48) {
    ctx.font = `800 ${fontSize}px "Fraunces", Georgia, serif`;
    const lines = wrapText(ctx, a.ausdruck || '', innerW - 120 * scale);
    if (lines.length <= 2) break;
    fontSize -= 8;
  }
  ctx.font = `800 ${fontSize}px "Fraunces", Georgia, serif`;
  const ausdruckHeight = drawWrapped(ctx, a.ausdruck || '', W / 2, y, innerW - 120 * scale, fontSize * 1.15, 2);
  y += ausdruckHeight + 30 * scale;

  // Divider
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = Math.max(1, Math.round(3 * scale));
  ctx.beginPath();
  ctx.moveTo(W / 2 - 120 * scale, y);
  ctx.lineTo(W / 2 + 120 * scale, y);
  ctx.stroke();
  y += 60 * scale;

  // Hochdeutsch
  ctx.fillStyle = '#fff';
  ctx.font = `500 ${Math.round(52 * scale)}px "Inter", system-ui, sans-serif`;
  const hdHeight = drawWrapped(ctx, a.hochdeutsch || '', W / 2, y, innerW - 120 * scale, 64 * scale, 2);
  y += hdHeight + 50 * scale;

  // Beispiel (italic) — bei Landscape weglassen (zu wenig Platz)
  if (a.beispiel && !isLandscape) {
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.font = `italic 600 ${Math.round(36 * scale)}px "Fraunces", Georgia, serif`;
    drawWrapped(ctx, '„' + a.beispiel + '"', W / 2, y, innerW - 120 * scale, 48 * scale, isStory ? 4 : 3);
  }

  // Bottom: kategorie + URL hint
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.font = `500 ${Math.round(26 * scale)}px "Inter", system-ui, sans-serif`;
  const bottomY = H - padY - 60 * scale;
  const kategorieLabel = a.kategorie ? `#${a.kategorie}` : '';
  if (kategorieLabel) ctx.fillText(kategorieLabel + '  ·  dialekto.app', W / 2, bottomY);
  else ctx.fillText('dialekto.app', W / 2, bottomY);

  return canvas;
}

export function buildShareCardBlob(a, formatId) {
  return new Promise((resolve, reject) => {
    try {
      const canvas = renderShareCard(a, formatId);
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas toBlob failed'));
      }, 'image/png');
    } catch (e) {
      reject(e);
    }
  });
}

export function buildShareCardDataUrl(a, formatId) {
  const canvas = renderShareCard(a, formatId);
  return canvas.toDataURL('image/png');
}

/**
 * Tries Web Share API (file), falls back to download.
 * @param {object} a
 * @param {string} formatId — 'square' | 'portrait' | 'story' | 'landscape'
 * @returns {Promise<'shared'|'downloaded'>}
 */
export async function shareCard(a, formatId = DEFAULT_FORMAT) {
  const blob = await buildShareCardBlob(a, formatId);
  const filename = `dialekto-${slug(a.dialektName)}-${slug(a.ausdruck)}-${formatId}.png`;
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

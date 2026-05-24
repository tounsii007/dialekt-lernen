// Animiertes Sprach-Visualizer auf einem <canvas>. Wird über die
// .is-speaking-Klasse am <html> gesteuert, die der speech-Wrapper toggelt.
// Echtes Echtzeit-Audio aus Web Speech API ist nicht zugänglich — daher eine
// stilisierte Animation mit Perlin-ähnlichem Noise pro Bar.

const prefersReduced = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function rand(seed) {
  // einfacher LCG, deterministisch pro Bar
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

export function createWaveform(canvas, { bars = 28, color, glow = true } = {}) {
  if (!canvas || prefersReduced()) return { stop() {} };
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  function resize() {
    const r = canvas.getBoundingClientRect();
    canvas.width  = Math.max(1, r.width  * dpr);
    canvas.height = Math.max(1, r.height * dpr);
  }
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  const rng = Array.from({ length: bars }, (_, i) => rand(13 + i * 7));
  let raf = 0, t = 0, running = true;
  let active = document.documentElement.classList.contains('is-speaking');

  function tick() {
    if (!running) return;
    raf = requestAnimationFrame(tick);
    t += active ? 0.045 : 0.02;

    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const barW = w / bars;
    const accent = color || getComputedStyle(document.documentElement).getPropertyValue('--brand').trim() || '#8b5cf6';

    for (let i = 0; i < bars; i++) {
      const phase = t * (active ? 2 : 0.6) + i * 0.5;
      const noise = (Math.sin(phase) + 1) * 0.5;
      const noise2 = rng[i]();
      const amplitude = active
        ? (noise * 0.7 + noise2 * 0.3)
        : (Math.sin(phase * 0.6) * 0.18 + 0.22);
      const barH = Math.max(2 * dpr, amplitude * h * 0.9);
      const x = i * barW;
      const y = (h - barH) / 2;
      const rad = Math.min(barW * 0.35, 6 * dpr);
      ctx.fillStyle = accent;
      if (glow && active) ctx.shadowBlur = 12 * dpr, ctx.shadowColor = accent;
      else ctx.shadowBlur = 0;
      roundRect(ctx, x + barW * 0.18, y, barW * 0.64, barH, rad);
      ctx.fill();
    }
  }

  function roundRect(c, x, y, w, h, r) {
    c.beginPath();
    c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r);
    c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r);
    c.arcTo(x, y, x + w, y, r);
    c.closePath();
  }

  const obs = new MutationObserver(() => {
    active = document.documentElement.classList.contains('is-speaking');
  });
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  raf = requestAnimationFrame(tick);

  return {
    stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      obs.disconnect();
    }
  };
}

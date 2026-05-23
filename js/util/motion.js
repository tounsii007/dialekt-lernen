// Motion utilities: scroll-reveal, animated counters, magnetic & tilt helpers.
// Respects prefers-reduced-motion.

const prefersReduced = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

let revealObserver = null;
function ensureRevealObserver() {
  if (revealObserver) return revealObserver;
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-revealed');
        revealObserver.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  return revealObserver;
}

export function observeReveals(root = document) {
  const all = root.querySelectorAll('[data-reveal]:not(.is-revealed)');
  if (prefersReduced() || typeof IntersectionObserver === 'undefined') {
    all.forEach((el) => el.classList.add('is-revealed'));
    return;
  }
  const obs = ensureRevealObserver();
  all.forEach((el, i) => {
    if (!el.style.getPropertyValue('--reveal-delay')) {
      el.style.setProperty('--reveal-delay', `${Math.min(i * 60, 400)}ms`);
    }
    obs.observe(el);
  });
  // Failsafe: any reveal still hidden after 2.5s gets shown.
  setTimeout(() => {
    all.forEach((el) => {
      if (!el.classList.contains('is-revealed')) el.classList.add('is-revealed');
    });
  }, 2500);
}

// Easing for counter animation: out-cubic.
const outCubic = (t) => 1 - Math.pow(1 - t, 3);

export function animateCounter(el, to, { duration = 1200, suffix = '' } = {}) {
  const target = Number(to) || 0;
  if (prefersReduced() || target === 0) { el.textContent = target + suffix; return; }
  const start = performance.now();
  const from = 0;
  function frame(now) {
    const t = Math.min(1, (now - start) / duration);
    const v = Math.round(from + (target - from) * outCubic(t));
    el.textContent = v + suffix;
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

let counterObserver = null;
export function observeCounters(root = document) {
  const all = root.querySelectorAll('[data-count]');
  if (prefersReduced() || typeof IntersectionObserver === 'undefined') {
    all.forEach((el) => { el.textContent = el.dataset.count + (el.dataset.suffix || ''); });
    return;
  }
  if (!counterObserver) {
    counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const t = e.target;
          animateCounter(t, t.dataset.count, { suffix: t.dataset.suffix || '' });
          counterObserver.unobserve(t);
        }
      });
    }, { threshold: 0.4 });
  }
  all.forEach((el) => {
    // Defensive: ensure the correct value is visible even if rAF stalls.
    // We snap-set the target text, then the observer will animate from 0.
    el.textContent = el.dataset.count + (el.dataset.suffix || '');
    counterObserver.observe(el);
  });
}

// Pointer-driven spotlight: writes --mx/--my (0..100%) on elements with [data-spotlight].
// Single global listener for efficiency; activates on pointer move.
let spotlightInit = false;
export function initSpotlight() {
  if (spotlightInit || prefersReduced()) return;
  spotlightInit = true;
  document.addEventListener('pointermove', (e) => {
    const targets = document.elementsFromPoint(e.clientX, e.clientY)
      .filter((n) => n.dataset && 'spotlight' in n.dataset);
    targets.forEach((t) => {
      const r = t.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 100;
      const my = ((e.clientY - r.top) / r.height) * 100;
      t.style.setProperty('--mx', mx + '%');
      t.style.setProperty('--my', my + '%');
    });
  }, { passive: true });
}

// Smooth scroll progress for the topbar shimmer line.
let scrollInit = false;
export function initScrollProgress() {
  if (scrollInit) return;
  scrollInit = true;
  const set = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const p = max > 0 ? (h.scrollTop || window.scrollY) / max : 0;
    document.documentElement.style.setProperty('--scroll-p', p.toFixed(4));
  };
  set();
  window.addEventListener('scroll', set, { passive: true });
  window.addEventListener('resize', set, { passive: true });
}

// Confetti burst (for celebrations). Lightweight, no deps.
export function confettiBurst(originEl, { count = 80, colors } = {}) {
  if (prefersReduced()) return;
  const pal = colors || [
    'oklch(72% 0.22 295)', 'oklch(78% 0.18 165)',
    'oklch(76% 0.20 28)',  'oklch(80% 0.16 215)',
    'oklch(72% 0.20 340)'
  ];
  const rect = originEl ? originEl.getBoundingClientRect() : null;
  const ox = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
  const oy = rect ? rect.top + rect.height / 2 : window.innerHeight / 3;
  const layer = document.createElement('div');
  layer.className = 'confetti-layer';
  document.body.appendChild(layer);
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'confetti-piece';
    const angle = (Math.PI * 2 * i) / count + (Math.random() - .5) * .6;
    const vel = 200 + Math.random() * 320;
    const dx = Math.cos(angle) * vel;
    const dy = Math.sin(angle) * vel - 120;
    p.style.setProperty('--dx', dx + 'px');
    p.style.setProperty('--dy', dy + 'px');
    p.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
    p.style.background = pal[i % pal.length];
    p.style.left = ox + 'px';
    p.style.top  = oy + 'px';
    p.style.animationDelay = (Math.random() * 80) + 'ms';
    layer.appendChild(p);
  }
  setTimeout(() => layer.remove(), 1800);
}

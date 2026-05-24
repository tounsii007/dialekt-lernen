// Ripple-Effekt für alle .btn und .fc-mc-opt Elemente
// Basiert auf reinem CSS/DOM — kein Canvas, keine Library.

const RIPPLE_DURATION = 550;

function createRipple(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const size = Math.max(r.width, r.height) * 2;
  const x = (e.clientX - r.left) - size / 2;
  const y = (e.clientY - r.top)  - size / 2;

  const ripple = document.createElement('span');
  ripple.className = 'ripple-wave';
  ripple.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
  `;
  el.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
}

function attachRipple(el) {
  if (el.dataset.rippleAttached) return;
  el.dataset.rippleAttached = '1';
  el.addEventListener('pointerdown', createRipple);
}

// Observe dynamic DOM changes and attach to new buttons
const observer = new MutationObserver((mutations) => {
  for (const m of mutations) {
    for (const node of m.addedNodes) {
      if (!(node instanceof Element)) continue;
      queryRippleTargets(node).forEach(attachRipple);
    }
  }
});

function queryRippleTargets(root) {
  const found = [];
  if (root.matches?.('.btn, .fc-mc-opt, .karte-bubble, .dash-chip, .nav-link')) found.push(root);
  found.push(...root.querySelectorAll('.btn, .fc-mc-opt, .karte-bubble, .dash-chip, .nav-link'));
  return found;
}

export function initRipple() {
  // Initial scan
  queryRippleTargets(document.body).forEach(attachRipple);
  // Watch for new elements
  observer.observe(document.body, { childList: true, subtree: true });
}

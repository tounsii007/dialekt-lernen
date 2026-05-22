// DOM-Hilfsfunktionen: Selektion und Element-Konstruktion.

export const $  = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function applyAttribute(elem, key, value) {
  if (key === 'class')   { elem.className = value; return; }
  if (key === 'html')    { elem.innerHTML = value; return; }
  if (key === 'dataset') { Object.assign(elem.dataset, value); return; }
  if (key === 'style' && typeof value === 'object') {
    Object.assign(elem.style, value);
    return;
  }
  if (key.startsWith('on') && typeof value === 'function') {
    elem.addEventListener(key.slice(2).toLowerCase(), value);
    return;
  }
  if (value === true)                    elem.setAttribute(key, '');
  else if (value !== false && value != null) elem.setAttribute(key, value);
}

function appendChild(elem, child) {
  if (child == null || child === false) return;
  elem.appendChild(child.nodeType ? child : document.createTextNode(String(child)));
}

export function el(tag, attrs = {}, ...children) {
  const elem = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) applyAttribute(elem, k, v);
  for (const child of children.flat()) appendChild(elem, child);
  return elem;
}

export function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

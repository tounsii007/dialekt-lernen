// Idiom-Explorer — Redensarten aus allen Dialekten,
// gruppiert nach geteilter hochdeutscher Bedeutung.
// Übersicht zeigt Cluster-Karten („Begrüßungs-Redensarten",
// „Ausdrücke der Zustimmung" …); Klick führt in eine Cluster-Detail-Ansicht
// mit allen verwandten Redewendungen aus allen Dialekten.

import { el, go } from '../util.js';
import { ALLE_AUSDRUECKE, getDialekt } from '../../data/dialekte.js';
import { findRelatedExpressions } from '../util/related-expressions.js';
import { renderExpressionCard } from './partials.js';
import { normalize } from '../util/text.js';
import { emptyIllustration } from '../util/icons.js';

// Redensart-Datensatz (alle Dialekte, nur kategorie === 'redensart')
function getRedensarten() {
  return ALLE_AUSDRUECKE.filter(a => a.kategorie === 'redensart');
}

// Heuristische Cluster-Titel — gewählt anhand der hochdeutschen Bedeutung.
// Pro Cluster:
//   • label: Anzeigentitel (auch Karten-Titel in der Übersicht)
//   • emoji: kleine Identifikation
//   • match(hd): liefert true, wenn die hochdeutsche Bedeutung in den Cluster passt
const CLUSTER_DEFS = [
  {
    id: 'zustimmung',
    label: 'Ausdrücke der Zustimmung',
    emoji: '👍',
    match: (hd) => /\b(passt|in ordnung|okay|alles klar|geht klar|einverstanden|stimmt|natuerlich|sicher doch|gerne|jawohl)\b/.test(hd),
  },
  {
    id: 'begruessung',
    label: 'Begrüßungs- & Abschieds-Redensarten',
    emoji: '👋',
    match: (hd) => /\b(hallo|guten tag|gruess gott|wie gehts|grueezi|moin|servus|tschuess|auf wiedersehen|pfueati|tschau|bis bald|ade)\b/.test(hd),
  },
  {
    id: 'schimpf-mild',
    label: 'Schimpfwörter (mild)',
    emoji: '😤',
    match: (hd) => /\b(dummkopf|trottel|tolpel|depp|narr|spinner|idiot|nervt|aergerlich|nervtoeter|esel|schaf)\b/.test(hd),
  },
  {
    id: 'erstaunen',
    label: 'Ausrufe des Erstaunens',
    emoji: '😲',
    match: (hd) => /\b(mein gott|allmaechtig|um himmels willen|ach du|oh weh|um gottes willen|wahnsinn|krass|unglaublich|donnerwetter)\b/.test(hd),
  },
  {
    id: 'verneinung',
    label: 'Verneinungen & Ablehnungen',
    emoji: '🚫',
    match: (hd) => /\b(nein|niemals|geht nicht|kein|nicht moeglich|auf keinen fall|unmoeglich|aufhoeren|niente)\b/.test(hd),
  },
  {
    id: 'zeit-wetter',
    label: 'Wetter & Zeit',
    emoji: '🌦️',
    match: (hd) => /\b(regen|sonne|wetter|kalt|warm|nass|frostig|stuermisch|nieselt|matschig|morgen|gestern|heute|spaeter)\b/.test(hd),
  },
  {
    id: 'liebe',
    label: 'Liebe & Zuneigung',
    emoji: '💚',
    match: (hd) => /\b(liebling|schatz|herzchen|freundin|freund|verliebt|gern haben|ich liebe|ich mag)\b/.test(hd),
  },
  {
    id: 'essen',
    label: 'Rund ums Essen',
    emoji: '🍽️',
    match: (hd) => /\b(hunger|essen|durst|trinken|lecker|satt|hungrig|kaese|brot|wurst|kartoffel|kuchen|hopfentee)\b/.test(hd),
  },
  {
    id: 'mensch',
    label: 'Über andere Menschen',
    emoji: '🧑‍🤝‍🧑',
    match: (hd) => /\b(typ|mensch|kerl|frau|mann|kind|nachbar|kollege|fremder|altchen|liebling)\b/.test(hd),
  },
];

// „Sonstige" Cluster fängt Redensarten auf, die in keine Schublade passen.
const FALLBACK_CLUSTER = { id: 'sonstige', label: 'Weitere Redensarten', emoji: '💬' };

/**
 * Berechnet Cluster aus allen Redensarten.
 * Jeder Ausdruck landet in höchstens einem Cluster.
 */
function computeClusters() {
  const all = getRedensarten();
  const clusters = CLUSTER_DEFS.map(c => ({ ...c, items: [] }));
  const fallback = { ...FALLBACK_CLUSTER, items: [] };

  for (const a of all) {
    const hdNorm = normalize(a.hochdeutsch || '');
    const cluster = clusters.find(c => c.match(hdNorm));
    if (cluster) cluster.items.push(a);
    else fallback.items.push(a);
  }

  const out = clusters.filter(c => c.items.length > 0);
  if (fallback.items.length) out.push(fallback);
  return out;
}

/**
 * Sammelt für einen Anker-Ausdruck alle dialektübergreifend verwandten
 * Redensarten — kombiniert direkte Bedeutungs-Ähnlichkeit mit dem Cluster.
 */
function gatherClusterExpressions(cluster, anchor) {
  // Wir nehmen alle Items aus dem Cluster + alle direkt verwandten Redensarten.
  const seen = new Set();
  const result = [];
  function addIfRedensart(a) {
    const key = `${a.dialektId}.${a.id}`;
    if (seen.has(key)) return;
    if (a.kategorie !== 'redensart') return;
    seen.add(key);
    result.push(a);
  }
  cluster.items.forEach(addIfRedensart);
  if (anchor) {
    const related = findRelatedExpressions(anchor, 15);
    related.forEach(r => addIfRedensart(r.entry));
  }
  // Anker-Element zuerst, danach nach Dialektname sortiert.
  result.sort((x, y) => {
    if (anchor && x.id === anchor.id && x.dialektId === anchor.dialektId) return -1;
    if (anchor && y.id === anchor.id && y.dialektId === anchor.dialektId) return 1;
    return (x.dialektName || '').localeCompare(y.dialektName || '', 'de');
  });
  return result;
}

// ---------- Render ----------

export function renderIdiome(root, params = {}) {
  root.innerHTML = '';
  const view = el('div', { class: 'view idiome-view' });

  const clusters = computeClusters();
  const selectedClusterId = params?.cluster;
  const selectedCluster = clusters.find(c => c.id === selectedClusterId) || null;

  // Header
  view.appendChild(el('div', { class: 'section-head' },
    el('div', {},
      el('h2', {}, '💬 Idiom-Explorer'),
      el('div', { class: 'lede' },
        selectedCluster
          ? `${selectedCluster.label} — ${selectedCluster.items.length} Redewendungen aus den Dialekten.`
          : `Entdecke ${getRedensarten().length} Redensarten aus 12 Dialekten — gruppiert nach Bedeutung.`
      )
    ),
    selectedCluster
      ? el('button', {
          class: 'btn btn-ghost',
          onClick: () => go('#/idiome')
        }, '← Zurück zur Übersicht')
      : null
  ));

  if (!getRedensarten().length) {
    view.appendChild(el('div', { class: 'empty-state' },
      emptyIllustration('sparkles'),
      el('h3', {}, 'Noch keine Redensarten'),
      el('div', { class: 'empty-meta' }, 'Sobald die Datenbank Redensarten enthält, tauchen sie hier auf.')
    ));
    root.appendChild(view);
    return;
  }

  if (!selectedCluster) {
    view.appendChild(renderClusterOverview(clusters));
  } else {
    view.appendChild(renderClusterDetail(selectedCluster));
  }

  root.appendChild(view);
}

function renderClusterOverview(clusters) {
  const grid = el('div', { class: 'idiome-cluster-grid' });
  clusters.forEach(c => {
    const dialektSet = new Set(c.items.map(a => a.dialektId));
    const sample = c.items.slice(0, 3).map(a => a.ausdruck).join(' · ');
    const card = el('button', {
      class: 'idiome-cluster-card',
      dataset: { tilt: '', tiltMax: '6' },
      onClick: () => go(`#/idiome?cluster=${encodeURIComponent(c.id)}`)
    },
      el('div', { class: 'idiome-cluster-emoji' }, c.emoji),
      el('div', { class: 'idiome-cluster-title' }, c.label),
      el('div', { class: 'idiome-cluster-meta' },
        `${c.items.length} Redewendungen · ${dialektSet.size} Dialekte`
      ),
      sample ? el('div', { class: 'idiome-cluster-sample' }, '„' + sample + '"') : null,
      el('div', { class: 'idiome-cluster-cta' }, 'Cluster öffnen →')
    );
    grid.appendChild(card);
  });
  return grid;
}

function renderClusterDetail(cluster) {
  const wrap = el('div', { class: 'idiome-detail' });

  // Kontext-Karte oben
  wrap.appendChild(el('div', { class: 'idiome-detail-intro' },
    el('div', { class: 'idiome-detail-intro-emoji' }, cluster.emoji),
    el('div', {},
      el('div', { class: 'idiome-detail-intro-title' }, cluster.label),
      el('div', { class: 'idiome-detail-intro-meta' },
        `${cluster.items.length} Redensarten in diesem Cluster — quer durch ${new Set(cluster.items.map(a => a.dialektId)).size} Dialekte.`
      )
    )
  ));

  // Anker = erstes Element des Clusters; gibt findRelatedExpressions eine Basis.
  const anchor = cluster.items[0] || null;
  const grouped = gatherClusterExpressions(cluster, anchor);

  if (!grouped.length) {
    wrap.appendChild(el('div', { class: 'empty-state' },
      emptyIllustration('search'),
      el('h3', {}, 'Keine Redensarten gefunden')
    ));
    return wrap;
  }

  const grid = el('div', { class: 'expr-grid', style: { marginTop: '20px' } });
  grouped.forEach(a => {
    const d = getDialekt(a.dialektId);
    if (!d) return;
    grid.appendChild(renderExpressionCard(a, d));
  });
  wrap.appendChild(grid);

  return wrap;
}

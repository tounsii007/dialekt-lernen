// Idiom-Explorer — Redensarten aus allen Dialekten,
// gruppiert nach geteilter hochdeutscher Bedeutung.
// Übersicht zeigt Cluster-Karten („Begrüßungs-Redensarten",
// „Ausdrücke der Zustimmung" …); Klick führt in eine Cluster-Detail-Ansicht
// mit allen verwandten Redewendungen aus allen Dialekten.

import { el, go } from '../util.js';
import { t } from '../util/i18n.js';
import { ALLE_AUSDRUECKE, getDialekt } from '../../data/dialekte.js';
import { findRelatedExpressions } from '../util/related-expressions.js';
import { renderExpressionCard } from './partials.js';
import { normalize } from '../util/text.js';
import { emptyIllustration } from '../util/icons.js';

// Redensart-Datensatz (alle Dialekte, nur kategorie === 'redensart').
// ALLE_AUSDRUECKE ist statisch → einmal filtern und cachen, statt pro Render
// mehrfach über alle ~6700 Ausdrücke zu scannen.
let _redensartenCache = null;
function getRedensarten() {
  if (_redensartenCache === null) {
    _redensartenCache = ALLE_AUSDRUECKE.filter(a => a.kategorie === 'redensart');
  }
  return _redensartenCache;
}

// Anzahl distinct Dialekte, die tatsächlich Redensarten beisteuern — für den
// Header-Untertitel ("… aus N Dialekten"). Dynamisch statt fest verdrahtet,
// damit die Aussage zur Datenlage passt (aktuell tragen alle Dialekte bei).
function countRedensartDialekte() {
  return new Set(getRedensarten().map(a => a.dialektId)).size;
}

// Heuristische Cluster-Titel — gewählt anhand der hochdeutschen Bedeutung.
// Wir matchen per Substring auf der normalisierten Form (lowercase, Umlaute
// aufgelöst) — das ist toleranter als Word-Boundary-Regex.
// Pro Cluster:
//   • label:    Anzeigentitel
//   • emoji:    kleines Symbol
//   • keywords: Substrings, von denen mindestens einer passen muss
const CLUSTER_DEFS = [
  // Spezifische Cluster ZUERST — sonst klauen breite Cluster wie „verneinung"
  // (matcht „nicht") die spezifischen Treffer wie „nicht wahr?".
  {
    id: 'fragen-anhang',
    label: t('view.idiome.clusterFragenAnhang'),
    emoji: '❔',
    keywords: ['nicht wahr', 'oder?', '/ oder', 'oder ', 'gell', 'gelle', 'odda', 'wer? / nicht']
  },
  {
    id: 'zustimmung',
    label: t('view.idiome.clusterZustimmung'),
    emoji: '👍',
    keywords: ['passt', 'in ordnung', 'alles klar', 'okay', 'einverstanden', 'stimmt', 'sicher', 'jawohl', 'natuerlich', 'gerne']
  },
  {
    id: 'verneinung',
    label: t('view.idiome.clusterVerneinung'),
    emoji: '🚫',
    keywords: ['nicht', 'nichts', 'keine', 'kein ', 'niemals', 'gar nichts', 'unmoeglich', 'auf keinen fall']
  },
  {
    id: 'erstaunen',
    label: t('view.idiome.clusterErstaunen'),
    emoji: '😲',
    keywords: ['mein gott', 'allmaechtig', 'um himmels willen', 'ach du', 'oh weh', 'um gottes willen', 'wahnsinn', 'krass', 'unglaublich', 'donnerwetter', 'verflixt', 'mannometer']
  },
  {
    id: 'reden-schwatzen',
    label: t('view.idiome.clusterRedenSchwatzen'),
    emoji: '🗣️',
    keywords: ['reden', 'plappern', 'schwatzen', 'quatschen', 'schnacken', 'erzaehlen', 'quatsch', 'unsinn', 'witz', 'witze', 'schnauze', 'plaudern']
  },
  {
    id: 'menschen-charakter',
    label: t('view.idiome.clusterMenschenCharakter'),
    emoji: '🧑',
    keywords: ['mensch', 'kerl', 'typ', 'frau', 'mann', 'kind', 'nachbar', 'kollege', 'fremder', 'liebling', 'streber', 'aengstlich', 'verrueckt', 'spinner', 'narr', 'trottel', 'depp', 'idiot']
  },
  {
    id: 'wetter-zeit',
    label: t('view.idiome.clusterWetterZeit'),
    emoji: '🌦️',
    keywords: ['regen', 'sonne', 'wetter', 'kalt', 'warm', 'nass', 'frostig', 'stuermisch', 'nieselt', 'matschig', 'morgen', 'gestern', 'heute', 'spaeter', 'gleich', 'sofort', 'frueher']
  },
  {
    id: 'koerper-gefuehl',
    label: t('view.idiome.clusterKoerperGefuehl'),
    emoji: '😴',
    keywords: ['muede', 'erschoepft', 'kaputt', 'krank', 'gesund', 'hunger', 'durst', 'satt', 'froh', 'traurig', 'aerger', 'wut', 'gluecklich']
  },
  {
    id: 'essen-trinken',
    label: t('view.idiome.clusterEssenTrinken'),
    emoji: '🍽️',
    keywords: ['essen', 'lecker', 'kaese', 'brot', 'wurst', 'bier', 'wein', 'kartoffel', 'kuchen', 'leckerei', 'futter']
  },
  {
    id: 'kultur-brauchtum',
    label: t('view.idiome.clusterKulturBrauchtum'),
    emoji: '🎭',
    keywords: ['karneval', 'fasching', 'fasnet', 'maibaum', 'volksfest', 'oktoberfest', 'kirmes', 'kirchweih', 'sitzung']
  },
];

// „Sonstige" Cluster fängt Redensarten auf, die in keine Schublade passen.
const FALLBACK_CLUSTER = { id: 'sonstige', label: t('view.idiome.clusterSonstige'), emoji: '💬' };

/**
 * Berechnet Cluster aus allen Redensarten.
 * Jeder Ausdruck landet in höchstens einem Cluster (erstes Match gewinnt).
 * Wir nutzen Substring-Suche statt strikter Word-Boundary-Regex —
 * das funktioniert robust auch mit zusammengesetzten Wörtern.
 */
function matchesCluster(def, hdNorm) {
  return def.keywords.some(kw => hdNorm.includes(kw));
}

function computeClusters() {
  const all = getRedensarten();
  const clusters = CLUSTER_DEFS.map(c => ({ ...c, items: [] }));
  const fallback = { ...FALLBACK_CLUSTER, items: [] };

  for (const a of all) {
    const hdNorm = normalize(a.hochdeutsch || '');
    const cluster = clusters.find(c => matchesCluster(c, hdNorm));
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
      el('h2', {}, t('view.idiome.title')),
      el('div', { class: 'lede' },
        selectedCluster
          ? `${selectedCluster.label} — ${t('view.idiome.ledeCluster', { n: selectedCluster.items.length })}`
          : t('view.idiome.lede', { count: getRedensarten().length, dialekte: countRedensartDialekte() })
      )
    ),
    selectedCluster
      ? el('button', {
          class: 'btn btn-ghost',
          onClick: () => go('#/idiome')
        }, t('view.idiome.backToOverview'))
      : null
  ));

  if (!getRedensarten().length) {
    view.appendChild(el('div', { class: 'empty-state' },
      emptyIllustration('sparkles'),
      el('h3', {}, t('view.idiome.emptyTitle')),
      el('div', { class: 'empty-meta' }, t('view.idiome.emptyMeta'))
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
        `${t('view.idiome.cardCount', { n: c.items.length })} · ${t('count.dialekte', { n: dialektSet.size })}`
      ),
      sample ? el('div', { class: 'idiome-cluster-sample' }, '„' + sample + '"') : null,
      el('div', { class: 'idiome-cluster-cta' }, t('view.idiome.openCluster'))
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
        t('view.idiome.detailMeta', { n: cluster.items.length, dialekte: new Set(cluster.items.map(a => a.dialektId)).size })
      )
    )
  ));

  // Anker = erstes Element des Clusters; gibt findRelatedExpressions eine Basis.
  const anchor = cluster.items[0] || null;
  const grouped = gatherClusterExpressions(cluster, anchor);

  if (!grouped.length) {
    wrap.appendChild(el('div', { class: 'empty-state' },
      emptyIllustration('search'),
      el('h3', {}, t('view.idiome.detailEmptyTitle'))
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

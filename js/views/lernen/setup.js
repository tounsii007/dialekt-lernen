// Karteikarten-Modus · Auswahl-Bildschirm — neu gedacht als Lern-Hub.
//
// Aufbau (Hierarchie groß → klein):
//   1. Hero      — Begrüßung, Level-Block, Primär-CTA „Weiterlernen"
//   2. Dashboard — Streak / XP / Abzeichen / gelernt / fällig + Tagesziel
//   3. Modi      — drei Gruppen statt flacher Liste
//   4. Weiter    — zuletzt gelernte Dialekte (nur wenn vorhanden)
//   5. Dialekte  — Karten mit Pro-Dialekt-Fortschritt/Level/XP
//   6. Themen    — kuratierte Kategorien quer durch alle Dialekte
//   7. Sammlung  — Teaser zur Ausdrücke-Sammlung
//
// Alles liegt unter `.lernen-view`, damit CSS-Overrides die geteilte
// `.dialekt-card` (Home/Entdecken) nicht regredieren. Der onStart-Vertrag und
// das in sessionStorage gespeicherte Lern-Modus-Verhalten bleiben unverändert.

import { el, go } from '../../util.js';
import { DIALEKTE, ALLE_AUSDRUECKE } from '../../../data/dialekte.js';
import { KATEGORIE_LIST } from '../../../data/kategorien.js';
import { icon } from '../../util/icons.js';
import {
  getLernstand, getLernStats, STATUS_LEARNED, STATUS_MEDIUM
} from '../../store/learning.js';
import { getXp, xpToNextLevel, getLevelTitle } from '../../store/xp.js';
import { getStreak } from '../../store/streak.js';
import { getSrsStats } from '../../store/srs.js';
import { getAchievementStatus } from '../../store/achievements.js';
import { getAvatar } from '../../store/avatar.js';
import { getRecentDialects } from '../../util/recommendations.js';
import { getAdaptiveRecommendations } from '../../util/adaptive-plan.js';
import { renderGoalWidget } from '../../util/daily-goal.js';
import { getDialectProgress } from '../../util/dialect-progress.js';

// Modus-Definitionen (id → Anzeige). IDs bleiben identisch zum Bestand, damit
// der in sessionStorage gespeicherte Modus weiter gültig ist.
const MODE_DEFS = {
  normal:       { icon: 'cards',    title: 'Klassisch',       desc: 'Dialekt → Hochdeutsch' },
  reverse:      { icon: 'refresh',  title: 'Umgekehrt',       desc: 'Hochdeutsch → Dialekt' },
  audio:        { icon: 'speaker',  title: 'Nur Audio',       desc: 'Hör zu, dann antworte' },
  hoeren:       { icon: 'speaker',  title: 'Hörverständnis',  desc: 'Nur hören, dann antworten' },
  'voice-quiz': { icon: 'speaker',  title: 'Voice-Quiz',      desc: 'Hochdeutsch hören → Dialekt wählen' },
  diktat:       { icon: 'speaker',  title: 'Diktat',          desc: 'Hörsatz mit-tippen' },
  pron:         { icon: 'speaker',  title: 'Aussprache',      desc: 'Sprechen üben mit Mikrofon' },
  mc:           { icon: 'target',   title: 'Multiple Choice', desc: '4 Optionen — tippe die Bedeutung' },
  type:         { icon: 'keyboard', title: 'Tippen',          desc: 'Antwort eintippen (mit Toleranz)' },
  cloze:        { icon: 'target',   title: 'Lückentext',      desc: 'Fehlendes Wort im Satz ergänzen' }
};

// Gruppierung — reduziert die kognitive Last gegenüber 10 gleichwertigen Buttons.
const MODE_GROUPS = [
  { label: 'Empfohlen',          icon: 'sparkles', color: 'var(--brand)',   modes: ['normal', 'reverse'] },
  { label: 'Audio & Aussprache', icon: 'speaker',  color: 'var(--accent-2)', modes: ['audio', 'hoeren', 'voice-quiz', 'diktat', 'pron'] },
  { label: 'Fortgeschritten',    icon: 'zap',      color: 'var(--warm)',    modes: ['mc', 'type', 'cloze'] }
];

// Themen-Farben (zyklisch über die Kategorien)
const THEMEN_FARBEN = [
  '#ef476f', '#06d6a0', '#118ab2', '#ffd166', '#8338ec',
  '#fb5607', '#3a86ff', '#ff006e', '#06a77d', '#d62246',
  '#7209b7', '#4cc9f0', '#f72585', '#4361ee', '#10b981', '#f59e0b'
];

const ALL_COLOR = '#8338ec';

// ---- kleine, zustandslose Bausteine -----------------------------------------

function sectionHead(title, lede) {
  return el('div', { class: 'section-head' },
    el('div', {},
      el('h2', {}, title),
      el('div', { class: 'lede' }, lede)
    )
  );
}

function progressBar(pct, color) {
  return el('div', { class: 'ldc-progress', 'aria-hidden': 'true' },
    el('div', { class: 'ldc-progress-fill', style: { width: pct + '%', background: color || 'var(--dc, var(--brand))' } })
  );
}

function arrow() {
  return el('span', { class: 'dc-arrow' }, el('span', { html: '→' }));
}

// ---- Haupt-Render -----------------------------------------------------------

export function renderSetup(onStart) {
  const container = el('div', { class: 'lernen-view' });

  // Aggregierte Kennzahlen — je einmal berechnen, dann durchreichen.
  const lernStats = getLernStats();                  // { gelernt, inArbeit, gesamt }
  const srs = getSrsStats(ALLE_AUSDRUECKE);           // { due, learned, learning, fresh }
  const xpTotal = getXp();
  const lvl = xpToNextLevel(xpTotal);                 // { level, current, needed, progress }
  const streak = getStreak();
  const badges = getAchievementStatus().filter(a => a.unlocked).length;
  const hasProgress = lernStats.gesamt > 0;

  // Modus-Zustand (Closure) — bleibt über In-place-Re-render erhalten.
  let currentMode = (() => {
    try { return sessionStorage.getItem('dialekto:learnMode') || 'normal'; } catch { return 'normal'; }
  })();
  const modeTitle = () => MODE_DEFS[currentMode]?.title || 'Klassisch';
  let ctaHintEl = null;
  const syncCtaHint = () => { if (ctaHintEl) ctaHintEl.textContent = `Modus: ${modeTitle()}`; };

  // 1 — Hero ------------------------------------------------------------------
  function renderHero() {
    const avatar = getAvatar();
    const title = getLevelTitle(lvl.level);
    const pct = Math.round(lvl.progress * 100);
    const remaining = Math.max(0, lvl.needed - lvl.current);

    const startCta = el('button', {
      class: 'btn btn-primary lv-hero-cta',
      dataset: { magnetic: '14' },
      onClick: () => {
        let hasRecs = false;
        try { hasRecs = (getAdaptiveRecommendations(1) || []).length > 0; } catch {}
        onStart({ source: hasRecs ? 'recommendations' : 'all', mode: currentMode });
      }
    },
      el('span', {}, hasProgress ? 'Weiterlernen' : 'Lernsitzung starten'),
      el('span', { html: ' →' })
    );
    ctaHintEl = el('span', { class: 'lv-hero-cta-hint' }, `Modus: ${modeTitle()}`);

    const heroBadges = [
      ['🔥', `${ALLE_AUSDRUECKE.length.toLocaleString('de-DE')}+ Karten`],
      ['🎙️', 'Audio & Aussprache'],
      ['🏆', 'Sammle Abzeichen'],
      ['📈', 'Verfolge Fortschritt']
    ];

    const levelCard = el('aside', { class: 'lv-level-card', dataset: { tilt: '', tiltMax: '6' }, 'aria-label': `Level ${lvl.level}, ${title}` },
      el('div', { class: 'lv-level-top' },
        el('span', { class: 'lv-level-eyebrow' }, 'Dein Level'),
        el('span', { class: 'lv-level-num' }, String(lvl.level))
      ),
      el('div', { class: 'lv-level-title' }, title),
      el('div', { class: 'lv-level-bar', role: 'progressbar', 'aria-valuenow': String(pct), 'aria-valuemin': '0', 'aria-valuemax': '100' },
        el('div', { class: 'lv-level-fill', style: { width: pct + '%' } })
      ),
      el('div', { class: 'lv-level-meta' },
        el('span', {}, `${lvl.current} / ${lvl.needed} XP`),
        el('span', {}, remaining > 0 ? `Noch ${remaining} XP bis Lv. ${lvl.level + 1}` : 'Level voll!')
      )
    );

    return el('section', { class: 'lv-hero', dataset: { reveal: '' } },
      el('div', { class: 'lv-hero-main' },
        el('div', { class: 'lv-hero-greeting' },
          el('span', { class: 'lv-hero-avatar', 'aria-hidden': 'true' }, avatar.emoji),
          el('span', { class: 'lv-hero-hello' }, `Willkommen zurück, ${avatar.label}`)
        ),
        el('h1', { class: 'lv-hero-title' },
          'Deutsche Dialekte ',
          el('span', { class: 'grad' }, 'entdecken')
        ),
        el('p', { class: 'lv-hero-sub' },
          'Lerne echte Ausdrücke aus ganz Deutschland — mit Audio, sichtbarem Fortschritt und Abzeichen.'),
        el('div', { class: 'lv-hero-badges' },
          ...heroBadges.map(([ic, txt]) => el('span', { class: 'lv-hero-badge' },
            el('span', { class: 'lv-hero-badge-ic', 'aria-hidden': 'true' }, ic), txt))
        ),
        el('div', { class: 'lv-hero-actions' },
          el('div', { class: 'lv-hero-cta-wrap' }, startCta, ctaHintEl),
          el('button', { class: 'btn btn-secondary', dataset: { magnetic: '10' }, onClick: () => go('#/entdecken') },
            'Dialekte entdecken')
        ),
        hasProgress ? null : el('div', { class: 'lv-hero-firsttime' },
          el('span', { 'aria-hidden': 'true' }, '✨'),
          'Deine erste Sitzung bringt XP und schaltet Abzeichen frei.'
        )
      ),
      levelCard
    );
  }

  // 2 — Dashboard -------------------------------------------------------------
  function renderDashboard() {
    const tiles = [
      { ic: '🔥', value: streak,            label: streak === 1 ? 'Tag Streak' : 'Tage Streak', c: 'var(--warm)' },
      { ic: '⭐', value: xpTotal,           label: 'Gesamt-XP',     c: 'var(--brand)' },
      { ic: '🏆', value: badges,            label: 'Abzeichen',     c: '#f5b301' },
      { ic: '📚', value: lernStats.gelernt, label: 'Karten gelernt', c: 'var(--accent)' },
      { ic: '⏳', value: srs.due,           label: 'Heute fällig',  c: 'var(--pink)' }
    ];
    const grid = el('div', { class: 'lv-stats-grid' },
      ...tiles.map(t => el('div', { class: 'lv-stat', dataset: { spotlight: '' }, style: { '--sc': t.c } },
        el('span', { class: 'lv-stat-ic', 'aria-hidden': 'true' }, t.ic),
        el('span', { class: 'lv-stat-num', dataset: { count: String(t.value) } }, '0'),
        el('span', { class: 'lv-stat-label' }, t.label)
      ))
    );
    return el('section', { class: 'section', dataset: { reveal: '' } },
      sectionHead('Dein Fortschritt', 'Alles auf einen Blick — und was heute ansteht.'),
      el('div', { class: 'lv-dash' },
        grid,
        el('div', { class: 'lv-goal-card' }, renderGoalWidget())
      )
    );
  }

  // 3 — Modi ------------------------------------------------------------------
  function renderModeSection() {
    const groupsWrap = el('div', { class: 'lv-mode-groups' });
    function paint() {
      groupsWrap.innerHTML = '';
      MODE_GROUPS.forEach(group => {
        const row = el('div', { class: 'learn-mode-row' });
        group.modes.forEach(id => {
          const m = MODE_DEFS[id];
          if (!m) return;
          row.appendChild(el('button', {
            class: 'learn-mode' + (currentMode === id ? ' is-active' : ''),
            'aria-pressed': currentMode === id ? 'true' : 'false',
            onClick: () => {
              currentMode = id;
              try { sessionStorage.setItem('dialekto:learnMode', currentMode); } catch {}
              paint();
              syncCtaHint();
            }
          },
            el('span', { class: 'learn-mode-icon' }, icon(m.icon, { size: 22 })),
            el('span', { class: 'learn-mode-text' },
              el('strong', {}, m.title),
              el('span', {}, m.desc)
            )
          ));
        });
        groupsWrap.appendChild(el('div', { class: 'learn-mode-group', style: { '--gc': group.color } },
          el('div', { class: 'learn-mode-group-head' },
            el('span', { class: 'learn-mode-group-ic', 'aria-hidden': 'true' }, icon(group.icon, { size: 15 })),
            el('span', {}, group.label)
          ),
          row
        ));
      });
    }
    paint();
    return el('section', { class: 'section', dataset: { reveal: '' } },
      sectionHead('Wähle deinen Lernmodus', 'Von klassisch bis Aussprache — wähle, was zu dir passt.'),
      groupsWrap
    );
  }

  // 4 — Weiterlernen (zuletzt gelernte Dialekte) ------------------------------
  function renderContinueRow() {
    let recent = [];
    try { recent = getRecentDialects(4) || []; } catch { recent = []; }
    if (!recent.length) return null;
    return el('section', { class: 'section', dataset: { reveal: '' } },
      sectionHead('Weiter wo du warst', 'Setze eine kürzlich gelernte Region direkt fort.'),
      el('div', { class: 'lv-continue-row' },
        ...recent.map(d => el('button', {
          class: 'lv-continue-chip',
          style: { '--dc': d.farbe },
          onClick: () => onStart({ source: d.id, mode: currentMode })
        },
          el('span', { class: 'lv-continue-flag', 'aria-hidden': 'true' }, d.flag),
          el('span', { class: 'lv-continue-name' }, d.name),
          el('span', { class: 'lv-continue-go', html: '→' })
        ))
      )
    );
  }

  // 5 — Dialekt-Karten --------------------------------------------------------
  function renderAllCard() {
    const total = ALLE_AUSDRUECKE.length;
    const learned = lernStats.gelernt;
    const pct = total ? Math.round((learned / total) * 100) : 0;
    return el('button', {
      class: 'dialekt-card learn-dialekt-card lv-all-card',
      style: { '--dc': ALL_COLOR, '--progress': pct + '%' },
      dataset: { tilt: '', tiltMax: '6' },
      onClick: () => onStart({ source: 'all', mode: currentMode }),
      'aria-label': `Alle Dialekte: ${learned} von ${total} gelernt`
    },
      el('span', { class: 'dc-flag', 'aria-hidden': 'true' }, '🌍'),
      el('div', { class: 'ldc-topline' },
        el('span', { class: 'ldc-level' }, 'Alle'),
        el('span', { class: 'ldc-xp' }, `${total.toLocaleString('de-DE')} Karten`)
      ),
      el('div', { class: 'dc-name' }, 'Alle Dialekte'),
      el('div', { class: 'dc-region' }, '🌍 Bunte Mischung'),
      progressBar(pct, ALL_COLOR),
      el('div', { class: 'dc-foot' },
        el('span', { class: 'dc-count' }, learned > 0 ? `${learned} gelernt · ${pct}%` : 'Quer durch alle Regionen'),
        arrow()
      )
    );
  }

  function renderDialectCard(d) {
    const p = getDialectProgress(d);
    return el('button', {
      class: 'dialekt-card learn-dialekt-card',
      style: { '--dc': d.farbe, '--progress': p.pct + '%' },
      dataset: { tilt: '', tiltMax: '6' },
      onClick: () => onStart({ source: d.id, mode: currentMode }),
      'aria-label': `${d.name}: ${p.learned} von ${p.total} gelernt, ${p.pct} Prozent`
    },
      el('span', { class: 'dc-flag', 'aria-hidden': 'true' }, d.flag),
      el('div', { class: 'ldc-topline' },
        el('span', { class: 'ldc-level' }, `Lv. ${p.level}`),
        el('span', { class: 'ldc-xp' }, `${p.xp} XP`)
      ),
      el('div', { class: 'dc-name' }, d.name),
      el('div', { class: 'dc-region' }, `📍 ${d.region}`),
      progressBar(p.pct, d.farbe),
      el('div', { class: 'dc-foot' },
        el('span', { class: 'dc-count' }, `${p.learned}/${p.total} gelernt`),
        arrow()
      )
    );
  }

  function renderDialectSection() {
    const grid = el('div', { class: 'dialekt-grid' }, renderAllCard());
    DIALEKTE.forEach(d => grid.appendChild(renderDialectCard(d)));
    return el('section', { class: 'section', dataset: { reveal: '' } },
      sectionHead('Nach Dialekt lernen', 'Wähle eine Region — jede Karte zeigt deinen Fortschritt.'),
      grid
    );
  }

  // 6 — Themen-Lektionen ------------------------------------------------------
  function renderThemen() {
    const statsByKat = {};
    ALLE_AUSDRUECKE.forEach(a => {
      const s = statsByKat[a.kategorie] || (statsByKat[a.kategorie] = { total: 0, learned: 0, started: 0 });
      s.total++;
      const stand = getLernstand(a.dialektId, a.id);
      if (stand >= STATUS_LEARNED) s.learned++;
      else if (stand >= STATUS_MEDIUM) s.started++;
    });

    const grid = el('div', { class: 'dialekt-grid' });
    KATEGORIE_LIST.forEach((kat, i) => {
      const stats = statsByKat[kat.id];
      if (!stats || stats.total === 0) return;
      const color = THEMEN_FARBEN[i % THEMEN_FARBEN.length];
      const pct = Math.round((stats.learned / stats.total) * 100);
      const progressLabel = stats.learned > 0
        ? `${stats.learned}/${stats.total} gelernt (${pct}%)`
        : (stats.started > 0 ? `${stats.started}/${stats.total} angefangen` : `${stats.total} Karten`);
      grid.appendChild(el('button', {
        class: 'dialekt-card learn-dialekt-card thema-card',
        style: { '--dc': color, '--progress': pct + '%' },
        dataset: { tilt: '', tiltMax: '6' },
        onClick: () => onStart({ source: 'kategorie:' + kat.id, mode: currentMode }),
        'aria-label': `${kat.label}: ${progressLabel}`
      },
        el('span', { class: 'dc-flag', 'aria-hidden': 'true' }, kat.icon),
        el('div', { class: 'ldc-topline' },
          el('span', { class: 'ldc-level' }, 'Thema'),
          el('span', { class: 'ldc-xp' }, `${stats.total} Karten`)
        ),
        el('div', { class: 'dc-name' }, kat.label),
        el('div', { class: 'dc-region' }, 'Quer durch alle Dialekte'),
        progressBar(pct, color),
        el('div', { class: 'dc-foot' },
          el('span', { class: 'dc-count' }, progressLabel),
          arrow()
        )
      ));
    });

    return el('section', { class: 'section', dataset: { reveal: '' } },
      sectionHead('🎯 Themen-Lektionen', 'Fokussiert nach Kategorie — quer durch alle Dialekte.'),
      grid
    );
  }

  // 7 — Sammlung-Teaser -------------------------------------------------------
  function renderSammlungTeaser() {
    const total = ALLE_AUSDRUECKE.length;
    const unlocked = lernStats.gesamt;
    const pct = total ? Math.round((unlocked / total) * 100) : 0;
    return el('section', { class: 'section', dataset: { reveal: '' } },
      el('button', {
        class: 'lv-sammlung-teaser',
        dataset: { spotlight: '' },
        onClick: () => go('#/sammlung'),
        'aria-label': `Ausdrücke-Sammlung: ${unlocked} von ${total} freigeschaltet`
      },
        el('span', { class: 'lv-sammlung-ic', 'aria-hidden': 'true' }, '📚'),
        el('div', { class: 'lv-sammlung-body' },
          el('div', { class: 'lv-sammlung-title' }, 'Deine Ausdrücke-Sammlung'),
          el('div', { class: 'lv-sammlung-sub' },
            `${unlocked.toLocaleString('de-DE')} von ${total.toLocaleString('de-DE')} Ausdrücken freigeschaltet`),
          progressBar(pct, 'var(--brand)')
        ),
        el('span', { class: 'lv-sammlung-pct' }, `${pct}%`),
        arrow()
      )
    );
  }

  // Zusammenbauen — Hierarchie groß → klein.
  container.appendChild(renderHero());
  container.appendChild(renderDashboard());
  container.appendChild(renderModeSection());
  const cont = renderContinueRow();
  if (cont) container.appendChild(cont);
  container.appendChild(renderDialectSection());
  container.appendChild(renderThemen());
  container.appendChild(renderSammlungTeaser());

  return container;
}

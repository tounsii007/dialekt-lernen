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
import { t } from '../../util/i18n.js';
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
import { memoizePerEpoch } from '../../util/learn-cache.js';

// Modus-Definitionen (id → Anzeige). IDs bleiben identisch zum Bestand, damit
// der in sessionStorage gespeicherte Modus weiter gültig ist.
const MODE_DEFS = {
  normal:       { icon: 'cards',    title: t('view.setup.modeNormalTitle'),   desc: t('view.setup.modeNormalDesc') },
  reverse:      { icon: 'refresh',  title: t('view.setup.modeReverseTitle'),  desc: t('view.setup.modeReverseDesc') },
  audio:        { icon: 'speaker',  title: t('view.setup.modeAudioTitle'),    desc: t('view.setup.modeAudioDesc') },
  hoeren:       { icon: 'speaker',  title: t('view.setup.modeHoerenTitle'),   desc: t('view.setup.modeHoerenDesc') },
  'voice-quiz': { icon: 'speaker',  title: t('view.setup.modeVoiceQuizTitle'), desc: t('view.setup.modeVoiceQuizDesc') },
  diktat:       { icon: 'speaker',  title: t('view.setup.modeDiktatTitle'),   desc: t('view.setup.modeDiktatDesc') },
  pron:         { icon: 'speaker',  title: t('view.setup.modePronTitle'),     desc: t('view.setup.modePronDesc') },
  mc:           { icon: 'target',   title: t('view.setup.modeMcTitle'),       desc: t('view.setup.modeMcDesc') },
  type:         { icon: 'keyboard', title: t('view.setup.modeTypeTitle'),     desc: t('view.setup.modeTypeDesc') },
  cloze:        { icon: 'target',   title: t('view.setup.modeClozeTitle'),    desc: t('view.setup.modeClozeDesc') }
};

// Gruppierung — reduziert die kognitive Last gegenüber 10 gleichwertigen Buttons.
const MODE_GROUPS = [
  { label: t('view.setup.groupRecommended'), icon: 'sparkles', color: 'var(--brand)',   modes: ['normal', 'reverse'] },
  { label: t('view.setup.groupAudio'),       icon: 'speaker',  color: 'var(--accent-2)', modes: ['audio', 'hoeren', 'voice-quiz', 'diktat', 'pron'] },
  { label: t('view.setup.groupAdvanced'),    icon: 'zap',      color: 'var(--warm)',    modes: ['mc', 'type', 'cloze'] }
];

// Themen-Farben (zyklisch über die Kategorien)
const THEMEN_FARBEN = [
  '#ef476f', '#06d6a0', '#118ab2', '#ffd166', '#8338ec',
  '#fb5607', '#3a86ff', '#ff006e', '#06a77d', '#d62246',
  '#7209b7', '#4cc9f0', '#f72585', '#4361ee', '#10b981', '#f59e0b'
];

const ALL_COLOR = '#8338ec';

// Kategorie-Statistiken (total/learned/started je Kategorie) über ALLE ~6700
// Ausdrücke. Bisher bei jedem Öffnen des Lern-Hubs neu berechnet — jetzt einmal
// pro Epoche gemerkt. Invalidierung via util/learn-cache.js: Event-Bump bei
// jeder Bewertung (dialekto:xp) + Pro-Tick-Verfall als Backstop, sodass nach
// einer Lernstand-Änderung garantiert neu gerechnet wird.
const computeThemenStats = memoizePerEpoch(() => {
  const statsByKat = {};
  ALLE_AUSDRUECKE.forEach(a => {
    const s = statsByKat[a.kategorie] || (statsByKat[a.kategorie] = { total: 0, learned: 0, started: 0 });
    s.total++;
    const stand = getLernstand(a.dialektId, a.id);
    if (stand >= STATUS_LEARNED) s.learned++;
    else if (stand >= STATUS_MEDIUM) s.started++;
  });
  return statsByKat;
});

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
  const modeTitle = () => MODE_DEFS[currentMode]?.title || t('view.setup.modeNormalTitle');
  let ctaHintEl = null;
  const syncCtaHint = () => { if (ctaHintEl) ctaHintEl.textContent = t('view.setup.ctaHint', { mode: modeTitle() }); };

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
      el('span', {}, hasProgress ? t('view.setup.ctaContinue') : t('view.setup.ctaStart')),
      el('span', { html: ' →' })
    );
    ctaHintEl = el('span', { class: 'lv-hero-cta-hint' }, t('view.setup.ctaHint', { mode: modeTitle() }));

    const heroBadges = [
      ['🔥', t('view.setup.heroBadgeCards', { n: ALLE_AUSDRUECKE.length.toLocaleString('de-DE') })],
      ['🎙️', t('view.setup.heroBadgeAudio')],
      ['🏆', t('view.setup.heroBadgeBadges')],
      ['📈', t('view.setup.heroBadgeProgress')]
    ];

    const levelCard = el('aside', { class: 'lv-level-card', dataset: { tilt: '', tiltMax: '6' }, 'aria-label': t('view.setup.levelAria', { level: lvl.level, title }) },
      el('div', { class: 'lv-level-top' },
        el('span', { class: 'lv-level-eyebrow' }, t('view.setup.levelEyebrow')),
        el('span', { class: 'lv-level-num' }, String(lvl.level))
      ),
      el('div', { class: 'lv-level-title' }, title),
      el('div', { class: 'lv-level-bar', role: 'progressbar', 'aria-valuenow': String(pct), 'aria-valuemin': '0', 'aria-valuemax': '100' },
        el('div', { class: 'lv-level-fill', style: { width: pct + '%' } })
      ),
      el('div', { class: 'lv-level-meta' },
        el('span', {}, `${lvl.current} / ${lvl.needed} XP`),
        el('span', {}, remaining > 0 ? t('view.setup.levelRemaining', { xp: remaining, next: lvl.level + 1 }) : t('view.setup.levelFull'))
      )
    );

    return el('section', { class: 'lv-hero', dataset: { reveal: '' } },
      el('div', { class: 'lv-hero-main' },
        el('div', { class: 'lv-hero-greeting' },
          el('span', { class: 'lv-hero-avatar', 'aria-hidden': 'true' }, avatar.emoji),
          el('span', { class: 'lv-hero-hello' }, t('view.setup.heroHello', { name: avatar.label }))
        ),
        el('h1', { class: 'lv-hero-title' },
          t('view.setup.heroTitlePre'),
          el('span', { class: 'grad' }, t('view.setup.heroTitleAccent'))
        ),
        el('p', { class: 'lv-hero-sub' },
          t('view.setup.heroSub')),
        el('div', { class: 'lv-hero-badges' },
          ...heroBadges.map(([ic, txt]) => el('span', { class: 'lv-hero-badge' },
            el('span', { class: 'lv-hero-badge-ic', 'aria-hidden': 'true' }, ic), txt))
        ),
        el('div', { class: 'lv-hero-actions' },
          el('div', { class: 'lv-hero-cta-wrap' }, startCta, ctaHintEl),
          el('button', { class: 'btn btn-secondary', dataset: { magnetic: '10' }, onClick: () => go('#/entdecken') },
            t('view.setup.heroDiscover'))
        ),
        hasProgress ? null : el('div', { class: 'lv-hero-firsttime' },
          el('span', { 'aria-hidden': 'true' }, '✨'),
          t('view.setup.heroFirstTime')
        )
      ),
      levelCard
    );
  }

  // 2 — Dashboard -------------------------------------------------------------
  function renderDashboard() {
    const tiles = [
      { ic: '🔥', value: streak,            label: streak === 1 ? t('view.setup.statStreakOne') : t('view.setup.statStreak'), c: 'var(--warm)' },
      { ic: '⭐', value: xpTotal,           label: t('view.setup.statXp'),     c: 'var(--brand)' },
      { ic: '🏆', value: badges,            label: t('view.setup.statBadges'),     c: '#f5b301' },
      { ic: '📚', value: lernStats.gelernt, label: t('view.setup.statLearned'), c: 'var(--accent)' },
      { ic: '⏳', value: srs.due,           label: t('view.setup.statDue'),  c: 'var(--pink)' }
    ];
    const grid = el('div', { class: 'lv-stats-grid' },
      ...tiles.map(t => el('div', { class: 'lv-stat', dataset: { spotlight: '' }, style: { '--sc': t.c } },
        el('span', { class: 'lv-stat-ic', 'aria-hidden': 'true' }, t.ic),
        el('span', { class: 'lv-stat-num', dataset: { count: String(t.value) } }, '0'),
        el('span', { class: 'lv-stat-label' }, t.label)
      ))
    );
    return el('section', { class: 'section', dataset: { reveal: '' } },
      sectionHead(t('view.setup.dashTitle'), t('view.setup.dashLede')),
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
      sectionHead(t('view.setup.modesTitle'), t('view.setup.modesLede')),
      groupsWrap
    );
  }

  // 4 — Weiterlernen (zuletzt gelernte Dialekte) ------------------------------
  function renderContinueRow() {
    let recent = [];
    try { recent = getRecentDialects(4) || []; } catch { recent = []; }
    if (!recent.length) return null;
    return el('section', { class: 'section', dataset: { reveal: '' } },
      sectionHead(t('view.setup.continueTitle'), t('view.setup.continueLede')),
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
      'aria-label': t('view.setup.allCardAria', { learned, total })
    },
      el('span', { class: 'dc-flag', 'aria-hidden': 'true' }, '🌍'),
      el('div', { class: 'ldc-topline' },
        el('span', { class: 'ldc-level' }, t('common.all')),
        el('span', { class: 'ldc-xp' }, t('view.setup.cardsCount', { n: total.toLocaleString('de-DE') }))
      ),
      el('div', { class: 'dc-name' }, t('view.setup.allCardName')),
      el('div', { class: 'dc-region' }, t('view.setup.allCardRegion')),
      progressBar(pct, ALL_COLOR),
      el('div', { class: 'dc-foot' },
        el('span', { class: 'dc-count' }, learned > 0 ? t('view.setup.allCardFoot', { learned, pct }) : t('view.setup.allCardFootEmpty')),
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
      'aria-label': t('view.setup.dialectCardAria', { name: d.name, learned: p.learned, total: p.total, pct: p.pct })
    },
      el('span', { class: 'dc-flag', 'aria-hidden': 'true' }, d.flag),
      el('div', { class: 'ldc-topline' },
        el('span', { class: 'ldc-level' }, t('view.setup.levelShort', { n: p.level })),
        el('span', { class: 'ldc-xp' }, `${p.xp} XP`)
      ),
      el('div', { class: 'dc-name' }, d.name),
      el('div', { class: 'dc-region' }, `📍 ${d.region}`),
      progressBar(p.pct, d.farbe),
      el('div', { class: 'dc-foot' },
        el('span', { class: 'dc-count' }, t('view.setup.cardFootLearned', { learned: p.learned, total: p.total })),
        arrow()
      )
    );
  }

  function renderDialectSection() {
    const grid = el('div', { class: 'dialekt-grid' }, renderAllCard());
    DIALEKTE.forEach(d => grid.appendChild(renderDialectCard(d)));
    return el('section', { class: 'section', dataset: { reveal: '' } },
      sectionHead(t('view.setup.dialectsTitle'), t('view.setup.dialectsLede')),
      grid
    );
  }

  // 6 — Themen-Lektionen ------------------------------------------------------
  function renderThemen() {
    const statsByKat = computeThemenStats();

    const grid = el('div', { class: 'dialekt-grid' });
    KATEGORIE_LIST.forEach((kat, i) => {
      const stats = statsByKat[kat.id];
      if (!stats || stats.total === 0) return;
      const color = THEMEN_FARBEN[i % THEMEN_FARBEN.length];
      const pct = Math.round((stats.learned / stats.total) * 100);
      const progressLabel = stats.learned > 0
        ? t('view.setup.themaLabelLearned', { learned: stats.learned, total: stats.total, pct })
        : (stats.started > 0 ? t('view.setup.themaLabelStarted', { started: stats.started, total: stats.total }) : t('view.setup.cardsCount', { n: stats.total }));
      grid.appendChild(el('button', {
        class: 'dialekt-card learn-dialekt-card thema-card',
        style: { '--dc': color, '--progress': pct + '%' },
        dataset: { tilt: '', tiltMax: '6' },
        onClick: () => onStart({ source: 'kategorie:' + kat.id, mode: currentMode }),
        'aria-label': `${kat.label}: ${progressLabel}`
      },
        el('span', { class: 'dc-flag', 'aria-hidden': 'true' }, kat.icon),
        el('div', { class: 'ldc-topline' },
          el('span', { class: 'ldc-level' }, t('view.setup.themaTag')),
          el('span', { class: 'ldc-xp' }, t('view.setup.cardsCount', { n: stats.total }))
        ),
        el('div', { class: 'dc-name' }, kat.label),
        el('div', { class: 'dc-region' }, t('view.setup.themaRegion')),
        progressBar(pct, color),
        el('div', { class: 'dc-foot' },
          el('span', { class: 'dc-count' }, progressLabel),
          arrow()
        )
      ));
    });

    return el('section', { class: 'section', dataset: { reveal: '' } },
      sectionHead(t('view.setup.themenTitle'), t('view.setup.themenLede')),
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
        'aria-label': t('view.setup.sammlungAria', { unlocked, total })
      },
        el('span', { class: 'lv-sammlung-ic', 'aria-hidden': 'true' }, '📚'),
        el('div', { class: 'lv-sammlung-body' },
          el('div', { class: 'lv-sammlung-title' }, t('view.setup.sammlungTitle')),
          el('div', { class: 'lv-sammlung-sub' },
            t('view.setup.sammlungSub', { unlocked: unlocked.toLocaleString('de-DE'), total: total.toLocaleString('de-DE') })),
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

import { el, go, speak, toast } from '../util.js';
import { DIALEKTE, ALLE_AUSDRUECKE } from '../../data/dialekte.js';
import { KATEGORIEN } from '../../data/kategorien.js';
import { getStreak, getLernStats, getDailySeed, toggleFavorit, isFavorit } from '../store.js';
import { pickSeeded } from '../util.js';
import { renderDialektCard } from './partials.js';
import { icon, sparkline } from '../util/icons.js';
import { getRecommendations, getRecentDialects, getActivitySeries } from '../util/recommendations.js';
import { renderGoalWidget } from '../util/daily-goal.js';
import { getActiveChallengesWithProgress } from '../store/challenges.js';
import { getLongGoals, addLongGoal, removeLongGoal } from '../store/long-goals.js';
import {
  startPomodoro, stopPomodoro, isPomodoroRunning, getPomodoroState,
  POMODORO_DURATIONS, requestPomodoroNotificationPermission
} from '../util/pomodoro.js';
import {
  getCurrentSeason, getSeasonInfo, getSeasonalGreeting,
  getSeasonalExpressions, getSeasonStartHref
} from '../util/season.js';
import { getAdaptiveRecommendations } from '../util/adaptive-plan.js';

export function renderHome(root, params = {}) {
  root.innerHTML = '';
  const view = el('div', { class: 'view' });

  const stats = getLernStats();
  const streak = getStreak();
  const totalExpr = ALLE_AUSDRUECKE.length;
  const dailyFocus = !!(params && (params.daily === '1' || params.daily === 1 || params.daily === true));

  // Seasonal banner — wenn aktuell eine Saison läuft, ganz oben einblenden.
  const seasonId = getCurrentSeason();
  if (seasonId) {
    view.appendChild(renderSeasonBanner(seasonId));
  }

  // Hero
  view.appendChild(el('section', { class: 'hero' },
    el('div', {},
      el('span', { class: 'hero-eyebrow' },
        el('span', { html: '✨' }),
        'Deutsche Sprachvielfalt entdecken'
      ),
      el('h1', {},
        'Lerne Dialekte aus ',
        el('span', { class: 'grad' }, 'ganz Deutschland'),
        '.'
      ),
      buildWordCarousel(),
      el('p', {}, 'Vom Frankfurter „Ei guude" bis zum Wiener „Schmäh": Tauche ein in regionale Ausdrücke, lerne mit Karteikarten und teste dich im Quiz — alles erklärt auf Hochdeutsch.'),
      el('div', { class: 'hero-cta' },
        el('button', { class: 'btn btn-primary', dataset: { magnetic: '16' }, onClick: () => go('#/entdecken') },
          'Dialekte entdecken',
          el('span', { html: ' →' })
        ),
        el('button', { class: 'btn btn-secondary', dataset: { magnetic: '10' }, onClick: () => go('#/lernen') },
          'Karteikarten lernen'
        ),
        el('button', { class: 'btn btn-ghost', onClick: () => go('#/quiz') },
          'Quiz starten'
        )
      ),
      el('div', { class: 'hero-stats' },
        el('div', {},
          el('span', { class: 'hero-stat-num', dataset: { count: String(DIALEKTE.length) } }, '0'),
          el('span', { class: 'hero-stat-label' }, 'Dialekte')
        ),
        el('div', {},
          el('span', { class: 'hero-stat-num', dataset: { count: String(totalExpr) } }, '0'),
          el('span', { class: 'hero-stat-label' }, 'Ausdrücke')
        ),
        el('div', {},
          el('span', { class: 'hero-stat-num', dataset: { count: String(stats.gelernt) } }, '0'),
          el('span', { class: 'hero-stat-label' }, 'gelernt')
        ),
        streak > 0 ? el('div', {},
          el('span', { class: 'hero-stat-num', dataset: { count: String(streak), suffix: '🔥' } }, '0'),
          el('span', { class: 'hero-stat-label' }, 'Tage Streak')
        ) : null
      )
    ),
    renderHeroPreview()
  ));

  // Personal dashboard — "Heute lernen" + Recent + Activity
  const dash = renderDashboard();
  if (dash) view.appendChild(dash);

  // Adaptiver Lernplan — „Heute empfohlen"
  const recoSection = renderAdaptiveRecommendationsSection();
  if (recoSection) view.appendChild(recoSection);

  // Wöchentliche Challenges
  view.appendChild(renderChallengesSection());

  // Langfristige Lernziele
  view.appendChild(renderLongGoalsSection());

  // Daily expression
  const dailyWrap = renderDailyExpression(dailyFocus);
  dailyWrap.setAttribute('data-reveal', '');
  view.appendChild(dailyWrap);
  if (dailyFocus) {
    // Daily-Karte ist über Manifest-Shortcut (./#/?daily=1) aufgerufen worden:
    // sanft scrollen + temporäre Highlight-Klasse.
    setTimeout(() => {
      const el = dailyWrap.querySelector('.daily');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('daily-focus-highlight');
        setTimeout(() => el.classList.remove('daily-focus-highlight'), 3200);
      }
    }, 120);
  }

  // Dialekt grid
  const sec = el('section', { class: 'section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, 'Alle Dialekte'),
        el('div', { class: 'lede' }, 'Wähle eine Region, um Ausdrücke und Bedeutungen zu erkunden.')
      )
    )
  );
  const grid = el('div', { class: 'dialekt-grid' });
  DIALEKTE.forEach(d => grid.appendChild(renderDialektCard(d)));
  sec.appendChild(grid);
  view.appendChild(sec);

  // Features section — animated stroke icons
  view.appendChild(el('section', { class: 'section section-row', dataset: { reveal: '' } },
    el('div', { class: 'card', dataset: { spotlight: '' } },
      el('div', { class: 'card-title' }, 'Was kannst du hier tun?'),
      el('ul', { class: 'feature-list' },
        el('li', {}, el('span', { class: 'fi' }, icon('book')),    el('div', {}, el('b', {}, 'Ausdrücke entdecken — '), 'Browse durch hunderte Wörter und Redewendungen aus allen Regionen.')),
        el('li', {}, el('span', { class: 'fi' }, icon('cards')),   el('div', {}, el('b', {}, 'Karteikarten — '), 'Lerne wie mit Anki: vorne der Dialekt, hinten die Bedeutung auf Hochdeutsch.')),
        el('li', {}, el('span', { class: 'fi' }, icon('target')),  el('div', {}, el('b', {}, 'Quiz — '), 'Teste dein Wissen mit Multiple-Choice-Fragen.')),
        el('li', {}, el('span', { class: 'fi' }, icon('speaker')), el('div', {}, el('b', {}, 'Aussprache — '), 'Höre dir Ausdrücke per Sprachsynthese vor.')),
        el('li', {}, el('span', { class: 'fi' }, icon('heart')),   el('div', {}, el('b', {}, 'Favoriten — '), 'Speichere deine Lieblingsausdrücke für später.'))
      )
    ),
    el('div', { class: 'card', dataset: { spotlight: '' } },
      el('div', { class: 'card-title' }, 'Tastatur-Shortcuts'),
      el('ul', { class: 'feature-list' },
        el('li', {}, el('span', { class: 'fi' }, icon('search')),   el('div', {}, el('b', {}, 'S '), '— Suche öffnen')),
        el('li', {}, el('span', { class: 'fi' }, icon('sparkles')), el('div', {}, el('b', {}, 'T '), '— Hell/Dunkel umschalten')),
        el('li', {}, el('span', { class: 'fi' }, icon('arrow')),    el('div', {}, el('b', {}, '← / → '), '— In Karteikarten navigieren')),
        el('li', {}, el('span', { class: 'fi' }, icon('keyboard')), el('div', {}, el('b', {}, 'Leertaste '), '— Karteikarte umdrehen')),
        el('li', {}, el('span', { class: 'fi' }, icon('command')),  el('div', {}, el('b', {}, '1/2/3 '), '— Im Quiz auswählen'))
      )
    )
  ));

  root.appendChild(view);
}

function renderHeroPreview() {
  const samples = [
    { dialekt: 'Hessisch',   farbe: '#e63946', ausdruck: 'Ei guude!',   meaning: 'Hallo!',           depth: '1.4' },
    { dialekt: 'Ruhrdeutsch',farbe: '#e36414', ausdruck: 'Glück auf!',  meaning: 'Bergmannsgruß',    depth: '1.0' },
    { dialekt: 'Bayerisch',  farbe: '#0077b6', ausdruck: 'Servus',      meaning: 'Hallo / Tschüss',  depth: '1.7' }
  ];
  return el('div', { class: 'hero-preview', dataset: { pointerParallax: '' } },
    ...samples.map(s => el('div', { class: 'preview-card', dataset: { ppDepth: s.depth } },
      el('span', { class: 'dialect-tag', style: { background: s.farbe + '22', color: s.farbe } }, s.dialekt),
      el('div', { class: 'expr' }, s.ausdruck),
      el('div', { class: 'meaning' }, s.meaning)
    ))
  );
}

function renderDashboard() {
  const rec = getRecommendations(4);
  const recent = getRecentDialects(4);
  const activity = getActivitySeries(14);
  const totalActivity = activity.reduce((s, d) => s + d.count, 0);

  // Skip rendering when there is genuinely nothing to show (truly fresh user with no history).
  const hasReco = rec.hard.length + rec.almost.length + rec.fresh.length > 0;
  const hasRecent = recent.length > 0;
  if (!hasReco && !hasRecent && totalActivity === 0) return null;

  const buckets = [
    { key: 'due',    title: 'Heute fällig',    hint: 'Spaced-Repetition empfiehlt',   items: rec.due,    color: 'var(--pink)' },
    { key: 'hard',   title: 'Wiederholen',     hint: 'Karten mit häufigen Patzern',  items: rec.hard,   color: 'var(--warm)' },
    { key: 'almost', title: 'Fast geschafft',  hint: 'Mittel — noch eine Runde',     items: rec.almost, color: 'var(--brand)' },
    { key: 'fresh',  title: 'Neu entdecken',   hint: 'Noch unbekannte Ausdrücke',    items: rec.fresh,  color: 'var(--accent)' }
  ].filter(b => b.items.length > 0);

  const section = el('section', { class: 'section dashboard-section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, 'Dein Dashboard'),
        el('div', { class: 'lede' }, 'Personalisierte Empfehlungen basierend auf deinem Lernstand.')
      ),
      totalActivity > 0 ? el('div', { class: 'dash-activity' },
        el('div', { class: 'dash-activity-meta' },
          el('span', { class: 'dash-activity-num' }, String(totalActivity)),
          el('span', { class: 'dash-activity-label' }, 'Aktionen / 14 Tage')
        ),
        sparkline(activity.map(a => a.count), { width: 200, height: 48, color: 'currentColor' })
      ) : null
    )
  );

  const dashGrid = el('div', { class: 'dashboard-grid' });

  buckets.forEach((b) => {
    const card = el('article', { class: 'dash-card', dataset: { spotlight: '' }, style: { '--dc': b.color } },
      el('div', { class: 'dash-card-head' },
        el('div', { class: 'dash-card-title' }, b.title),
        el('span', { class: 'dash-card-count' }, String(b.items.length))
      ),
      el('div', { class: 'dash-card-hint' }, b.hint),
      el('ul', { class: 'dash-list' },
        ...b.items.slice(0, 3).map((it) => el('li', {},
          el('span', { class: 'dash-item-expr' }, it.ausdruck),
          el('span', { class: 'dash-item-meta' }, `${it.dialektFlag} ${it.dialektName}`)
        ))
      ),
      el('button', {
        class: 'btn btn-secondary dash-card-cta', dataset: { magnetic: '10' },
        onClick: () => go('#/lernen')
      }, 'Diese lernen →')
    );
    dashGrid.appendChild(card);
  });

  if (recent.length) {
    const recentCard = el('article', { class: 'dash-card dash-recent', dataset: { spotlight: '' } },
      el('div', { class: 'dash-card-head' },
        el('div', { class: 'dash-card-title' }, 'Zuletzt angeschaut'),
        el('span', { class: 'dash-card-count' }, String(recent.length))
      ),
      el('div', { class: 'dash-card-hint' }, 'Setze dort fort, wo du warst.'),
      el('div', { class: 'dash-chips' },
        ...recent.map(d => el('button', {
          class: 'dash-chip',
          style: { '--dc': d.farbe },
          onClick: () => go(`#/dialekt/${d.id}`)
        },
          el('span', { class: 'dash-chip-flag' }, d.flag),
          el('span', { class: 'dash-chip-name' }, d.name)
        ))
      )
    );
    dashGrid.appendChild(recentCard);
  }

  section.appendChild(dashGrid);

  // Tägliches Lernziel-Widget
  const goalSection = el('div', { class: 'section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, 'Heutiges Ziel'),
        el('div', { class: 'lede' }, 'Passe dein tägliches Lernpensum an — bleib im Rhythmus!')
      )
    ),
    renderGoalWidget()
  );
  section.appendChild(goalSection);

  return section;
}

function renderDailyExpression(focus = false) {
  const seed = getDailySeed();
  const expr = pickSeeded(ALLE_AUSDRUECKE, seed);
  if (!expr) return el('div');
  // Wenn via Manifest-Shortcut (daily=1) aufgerufen: größere Karten-Variante
  // mit Beispiel-Satz und prominenteren Aktionen.
  const dailyClasses = 'daily' + (focus ? ' daily-large' : '');
  return el('section', { class: 'section' },
    el('div', { class: dailyClasses },
      el('div', { class: 'daily-content' },
        el('span', { class: 'daily-eyebrow' }, focus ? '🌟 Heutiger Ausdruck' : '☀️ Ausdruck des Tages'),
        el('div', { class: 'daily-expr' }, expr.ausdruck),
        el('div', { class: 'daily-hd' }, '↦ ' + expr.hochdeutsch),
        el('div', { class: 'daily-meaning' }, expr.bedeutung),
        focus && expr.beispiel ? el('div', { class: 'daily-example' },
          el('div', { class: 'daily-example-dialect' }, '„' + expr.beispiel + '"'),
          expr.beispiel_hd ? el('div', { class: 'daily-example-hd' }, '↦ ' + expr.beispiel_hd) : null
        ) : null,
        el('div', { class: 'daily-foot' },
          el('span', { class: 'daily-source' }, `${expr.dialektFlag} ${expr.dialektName}`),
          el('div', { class: 'daily-actions' },
            el('button', {
              class: 'daily-action', title: 'Anhören',
              onClick: () => speak(expr.ausdruck, expr.dialektLang || 'de-DE')
            }, el('span', { html: '🔊' })),
            el('button', {
              class: 'daily-action', title: 'Zum Dialekt',
              onClick: () => go(`#/dialekt/${expr.dialektId}`)
            }, el('span', { html: '→' }))
          )
        ),
        focus ? el('div', { class: 'daily-cta-row', style: { marginTop: '14px', display: 'flex', gap: '10px', flexWrap: 'wrap' } },
          el('button', { class: 'btn btn-primary', dataset: { magnetic: '12' },
            onClick: () => go('#/lernen')
          }, 'Karteikarten starten →'),
          el('button', { class: 'btn btn-secondary', dataset: { magnetic: '10' },
            onClick: () => go(`#/dialekt/${expr.dialektId}`)
          }, `${expr.dialektFlag} ${expr.dialektName} öffnen`)
        ) : null
      )
    )
  );
}

// ----------------------------------------------------------------------------
// Saison-Banner (Karneval / Wiesn / Advent)
// ----------------------------------------------------------------------------
function renderSeasonBanner(seasonId) {
  const info = getSeasonInfo(seasonId);
  if (!info) return el('div');
  const greeting = getSeasonalGreeting();
  const expressions = getSeasonalExpressions(undefined, 5);
  const href = getSeasonStartHref();

  const banner = el('section', { class: `season-banner season-${info.id}`, dataset: { reveal: '' },
    style: { '--season-accent': info.accent } },
    el('div', { class: 'season-banner-head' },
      el('span', { class: 'season-emoji', 'aria-hidden': 'true' }, info.emoji),
      el('div', { class: 'season-meta' },
        el('div', { class: 'season-title' }, info.title),
        el('div', { class: 'season-greeting' }, greeting || info.label)
      ),
      el('button', {
        class: 'btn btn-primary season-cta',
        dataset: { magnetic: '12' },
        onClick: () => go(href)
      }, 'Saison-Lektion starten →')
    ),
    expressions.length ? el('div', { class: 'season-list' },
      el('div', { class: 'season-list-title' }, `Top ${expressions.length} Begriffe:`),
      el('ul', { class: 'season-chips' },
        ...expressions.map(a => el('li', {},
          el('button', {
            class: 'season-chip',
            onClick: () => go(`#/dialekt/${a.dialektId}`),
            title: `${a.hochdeutsch} — ${a.dialektName}`
          },
            el('span', { class: 'season-chip-expr' }, a.ausdruck),
            el('span', { class: 'season-chip-meta' }, `${a.dialektFlag} ${a.dialektName}`)
          )
        ))
      )
    ) : null
  );
  return banner;
}

function buildWordCarousel() {
  // Sample of expressive dialect words to cycle through
  const WORDS = [
    { word: 'Ei guude!',        flag: '🦁', name: 'Hessisch' },
    { word: 'Moin!',            flag: '⚓', name: 'Plattdeutsch' },
    { word: 'Servus!',          flag: '🥨', name: 'Bayerisch' },
    { word: 'Kölle Alaaf!',     flag: '🎭', name: 'Kölsch' },
    { word: 'Icke dit det!',    flag: '🐻', name: 'Berlinisch' },
    { word: 'Leiwand!',         flag: '🎻', name: 'Wienerisch' },
    { word: 'Grüezi mitenand!', flag: '🏔️', name: 'Schwizerdütsch' },
    { word: 'Nu freilich!',     flag: '⚪', name: 'Sächsisch' },
    { word: 'Bassd scho!',      flag: '🦅', name: 'Fränkisch' },
    { word: 'Glück auf!',       flag: '⚒️', name: 'Ruhrdeutsch' },
    { word: 'Heimelig!',        flag: '🌲', name: 'Alemannisch' },
    { word: 'Kehrwoche!',       flag: '🧹', name: 'Schwäbisch' }
  ];

  let idx = 0;
  const wordEl = el('span', { class: 'carousel-word' }, WORDS[0].word);
  const flagEl = el('span', { class: 'carousel-flag' }, WORDS[0].flag);
  const nameEl = el('span', { class: 'carousel-name' }, WORDS[0].name);
  const wrap = el('div', { class: 'word-carousel', ariaLive: 'polite' },
    el('span', { class: 'carousel-prefix' }, 'z.B. '),
    flagEl, wordEl, nameEl
  );

  let interval;
  function advance() {
    wordEl.classList.add('carousel-exit');
    setTimeout(() => {
      idx = (idx + 1) % WORDS.length;
      wordEl.textContent = WORDS[idx].word;
      flagEl.textContent = WORDS[idx].flag;
      nameEl.textContent = WORDS[idx].name;
      wordEl.classList.remove('carousel-exit');
      wordEl.classList.add('carousel-enter');
      setTimeout(() => wordEl.classList.remove('carousel-enter'), 400);
    }, 250);
  }

  // Start cycling after mount
  setTimeout(() => {
    interval = setInterval(advance, 2800);
  }, 1800);

  // Pause on hover
  wrap.addEventListener('mouseenter', () => clearInterval(interval));
  wrap.addEventListener('mouseleave', () => { interval = setInterval(advance, 2800); });

  return wrap;
}

// ----------------------------------------------------------------------------
// Wöchentliche Challenges
// ----------------------------------------------------------------------------
function renderChallengesSection() {
  const challenges = getActiveChallengesWithProgress();

  const section = el('section', { class: 'section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, 'Diese Woche'),
        el('div', { class: 'lede' }, 'Drei Mini-Challenges — neu jeden Montag.')
      ),
      el('button', {
        class: 'btn btn-ghost btn-pomodoro-toggle',
        title: 'Pomodoro-Lern-Session starten',
        onClick: openPomodoroPicker
      }, isPomodoroRunning() ? '⏸ Pomodoro stoppen' : '⏱ Pomodoro starten')
    )
  );

  const grid = el('div', { class: 'challenge-grid' });
  for (const c of challenges) {
    grid.appendChild(renderChallengeCard(c));
  }
  section.appendChild(grid);
  return section;
}

function renderChallengeCard(c) {
  const pct = c.target > 0 ? Math.min(1, c.current / c.target) * 100 : 0;
  const card = el('article', { class: 'challenge-card' + (c.done ? ' is-done' : ''), dataset: { spotlight: '' } },
    el('div', { class: 'challenge-card-head' },
      el('div', { class: 'challenge-card-title' }, c.label),
      el('span', { class: 'challenge-card-xp' }, `+${c.xp} XP`)
    ),
    c.hint ? el('div', { class: 'challenge-card-hint' }, c.hint) : null,
    el('div', { class: 'challenge-progress' },
      el('div', {
        class: 'challenge-progress-bar',
        style: { width: pct.toFixed(0) + '%' }
      })
    ),
    el('div', { class: 'challenge-progress-meta' },
      el('span', {}, `${c.current} / ${c.target}`),
      c.done ? el('span', { class: 'challenge-done' }, '✓ erledigt') : null
    )
  );
  return card;
}

// ----------------------------------------------------------------------------
// Lernziele (Long-term Goals)
// ----------------------------------------------------------------------------
function renderLongGoalsSection() {
  const section = el('section', { class: 'section', dataset: { reveal: '' } });
  const head = el('div', { class: 'section-head' },
    el('div', {},
      el('h2', {}, 'Deine Lernziele'),
      el('div', { class: 'lede' }, 'Langfristige Ziele — z.B. „bis Dezember 100 bayerische Ausdrücke".')
    ),
    el('button', {
      class: 'btn btn-secondary',
      onClick: () => openAddLongGoalDialog(section)
    }, '+ Ziel hinzufügen')
  );
  section.appendChild(head);

  const body = el('div', { class: 'long-goal-list' });
  refreshLongGoalsBody(body);
  section.appendChild(body);
  return section;
}

function refreshLongGoalsBody(body) {
  body.innerHTML = '';
  const goals = getLongGoals();
  if (!goals.length) {
    body.appendChild(el('div', { class: 'long-goal-empty' },
      'Noch keine Lernziele gesetzt. Klick auf „+ Ziel hinzufügen", um anzufangen.'));
    return;
  }
  for (const g of goals) {
    body.appendChild(renderLongGoalRow(g, body));
  }
}

function renderLongGoalRow(g, body) {
  const pct = (g.progress * 100).toFixed(0);
  const deadlineLabel = g.deadline
    ? (g.daysLeft != null && g.daysLeft >= 0
        ? `${g.deadline} (noch ${g.daysLeft} Tage)`
        : `${g.deadline} (fällig)`)
    : 'ohne Deadline';

  return el('article', { class: 'long-goal-row' + (g.done ? ' is-done' : '') },
    el('div', { class: 'long-goal-head' },
      el('div', { class: 'long-goal-label' }, g.label),
      el('button', {
        class: 'long-goal-remove',
        title: 'Ziel entfernen',
        onClick: () => {
          if (!confirm(`Ziel „${g.label}" wirklich löschen?`)) return;
          removeLongGoal(g.id);
          refreshLongGoalsBody(body);
        }
      }, '✕')
    ),
    el('div', { class: 'long-goal-meta' },
      el('span', {}, `${g.current} / ${g.target}`),
      el('span', { class: 'long-goal-deadline' }, deadlineLabel)
    ),
    el('div', { class: 'long-goal-progress' },
      el('div', {
        class: 'long-goal-progress-bar',
        style: { width: pct + '%' }
      })
    ),
    g.done ? el('div', { class: 'long-goal-done' }, '🎉 Ziel erreicht!') : null
  );
}

function openAddLongGoalDialog(section) {
  // Inline-Dialog direkt im Section — kein extra Modal-Framework.
  const list = section.querySelector('.long-goal-list');
  if (!list) return;
  // Falls schon ein offenes Formular: schließen.
  const existing = section.querySelector('.long-goal-form');
  if (existing) { existing.remove(); return; }

  const labelInput = el('input', {
    type: 'text', class: 'long-goal-input',
    placeholder: 'z.B. „Bis Dezember 100 bayerische Ausdrücke"',
    maxlength: '120'
  });
  const targetInput = el('input', {
    type: 'number', class: 'long-goal-input long-goal-input-num',
    min: '1', max: '5000', value: '50',
    placeholder: 'Anzahl'
  });
  const deadlineInput = el('input', {
    type: 'date', class: 'long-goal-input'
  });
  const dialektSelect = el('select', { class: 'long-goal-input' },
    el('option', { value: '' }, 'Alle Dialekte'),
    ...DIALEKTE.map(d => el('option', { value: d.id }, `${d.flag} ${d.name}`))
  );
  const kategorieSelect = el('select', { class: 'long-goal-input' },
    el('option', { value: '' }, 'Alle Kategorien'),
    ...Object.values(KATEGORIEN).map(k =>
      el('option', { value: k.id }, `${k.icon} ${k.label}`))
  );

  const form = el('div', { class: 'long-goal-form' },
    el('div', { class: 'long-goal-form-row' },
      el('label', {}, 'Bezeichnung'), labelInput
    ),
    el('div', { class: 'long-goal-form-row long-goal-form-row-split' },
      el('label', {}, 'Zielzahl'), targetInput,
      el('label', {}, 'Deadline'), deadlineInput
    ),
    el('div', { class: 'long-goal-form-row long-goal-form-row-split' },
      el('label', {}, 'Dialekt'), dialektSelect,
      el('label', {}, 'Kategorie'), kategorieSelect
    ),
    el('div', { class: 'long-goal-form-actions' },
      el('button', { class: 'btn btn-primary', onClick: () => {
        const label = labelInput.value.trim();
        const target = Number(targetInput.value) || 0;
        if (!label || target < 1) {
          toast('Bitte Bezeichnung und gültige Zielzahl angeben.', 'info', 2400);
          return;
        }
        addLongGoal({
          label, target,
          deadline: deadlineInput.value || null,
          scope: {
            dialektId: dialektSelect.value || null,
            kategorie: kategorieSelect.value || null
          }
        });
        form.remove();
        refreshLongGoalsBody(list);
      } }, 'Hinzufügen'),
      el('button', { class: 'btn btn-ghost', onClick: () => form.remove() }, 'Abbrechen')
    )
  );

  section.insertBefore(form, list);
}

// ----------------------------------------------------------------------------
// Pomodoro: minimaler Picker + Indikator-Badge
// ----------------------------------------------------------------------------
let pomodoroIndicator = null;

function ensurePomodoroIndicator() {
  if (pomodoroIndicator && document.body.contains(pomodoroIndicator)) return pomodoroIndicator;
  pomodoroIndicator = el('div', { class: 'pomodoro-indicator', role: 'status', ariaLive: 'polite' },
    el('span', { class: 'pomodoro-indicator-phase' }, 'Fokus'),
    el('span', { class: 'pomodoro-indicator-time' }, '00:00'),
    el('button', {
      class: 'pomodoro-indicator-stop', title: 'Pomodoro abbrechen',
      onClick: () => {
        stopPomodoro();
        if (pomodoroIndicator?.parentNode) pomodoroIndicator.remove();
        pomodoroIndicator = null;
      }
    }, '✕')
  );
  document.body.appendChild(pomodoroIndicator);
  return pomodoroIndicator;
}

function updatePomodoroIndicator(snap) {
  const indicator = ensurePomodoroIndicator();
  const mm = String(Math.floor(snap.remainingMs / 60000)).padStart(2, '0');
  const ss = String(Math.floor((snap.remainingMs % 60000) / 1000)).padStart(2, '0');
  indicator.querySelector('.pomodoro-indicator-time').textContent = `${mm}:${ss}`;
  const phaseEl = indicator.querySelector('.pomodoro-indicator-phase');
  phaseEl.textContent = snap.phase === 'break' ? 'Pause' : 'Fokus';
  indicator.classList.toggle('is-break', snap.phase === 'break');
}

function openPomodoroPicker() {
  if (isPomodoroRunning()) {
    stopPomodoro();
    if (pomodoroIndicator?.parentNode) pomodoroIndicator.remove();
    pomodoroIndicator = null;
    toast('Pomodoro gestoppt', 'info', 1800);
    return;
  }
  // Mini-Picker in einem Toast-ähnlichen Inline-Element
  const existing = document.querySelector('.pomodoro-picker');
  if (existing) { existing.remove(); return; }

  const picker = el('div', { class: 'pomodoro-picker' },
    el('div', { class: 'pomodoro-picker-title' }, 'Pomodoro-Session'),
    el('div', { class: 'pomodoro-picker-row' },
      ...POMODORO_DURATIONS.map(m => el('button', {
        class: 'pomodoro-picker-btn' + (m === 25 ? ' is-default' : ''),
        onClick: () => {
          picker.remove();
          requestPomodoroNotificationPermission().finally(() => {
            startPomodoro({
              minutes: m,
              breakMinutes: 5,
              onTick: updatePomodoroIndicator,
              onPhaseChange: (phase, snap) => {
                if (phase === 'stopped') return;
                updatePomodoroIndicator(snap);
              },
              onComplete: () => {
                if (pomodoroIndicator?.parentNode) pomodoroIndicator.remove();
                pomodoroIndicator = null;
              }
            });
            toast(`Pomodoro gestartet (${m} min)`, 'success', 1800);
          });
        }
      }, `${m} min`))
    ),
    el('button', { class: 'btn btn-ghost', onClick: () => picker.remove() }, 'Abbrechen')
  );
  document.body.appendChild(picker);
}

// ----------------------------------------------------------------------------
// Adaptiver Lernplan — Heute empfohlen
// ----------------------------------------------------------------------------
function renderAdaptiveRecommendationsSection() {
  let recs = [];
  try {
    recs = getAdaptiveRecommendations(5);
  } catch {
    recs = [];
  }
  if (!recs || recs.length === 0) return null;

  const section = el('section', { class: 'section adaptive-section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, '📈 Heute empfohlen'),
        el('div', { class: 'lede' }, 'Personalisiert — Karten, die jetzt den meisten Lerneffekt bringen.')
      ),
      el('button', {
        class: 'btn btn-primary',
        dataset: { magnetic: '10' },
        onClick: () => go('#/lernen?source=recommendations'),
        title: 'Diese Empfehlungen direkt in einer Karteikarten-Session lernen'
      }, 'Diese 5 jetzt lernen →')
    )
  );

  const grid = el('div', { class: 'adaptive-grid' });
  for (const rec of recs) {
    const a = rec.entry;
    if (!a) continue;
    grid.appendChild(el('button', {
      class: 'adaptive-card',
      style: { '--dc': a.dialektFarbe || 'var(--brand)' },
      dataset: { spotlight: '' },
      onClick: () => go(`#/dialekt/${a.dialektId}`),
      title: `${a.dialektFlag || ''} ${a.dialektName || ''} — ${a.hochdeutsch || ''}`
    },
      el('div', { class: 'adaptive-card-head' },
        el('span', { class: 'adaptive-flag' }, a.dialektFlag || '🃏'),
        el('span', { class: 'adaptive-priority', dataset: { p: String(rec.priority || 4) } },
          rec.priority === 1 ? '🔥 Dringend' :
          rec.priority === 2 ? '⚠️ Schwach' :
          rec.priority === 3 ? '🆕 Neu' : '✨ Auffrischung'
        )
      ),
      el('div', { class: 'adaptive-expr' }, a.ausdruck),
      el('div', { class: 'adaptive-hd' }, '↦ ' + (a.hochdeutsch || '')),
      el('div', { class: 'adaptive-reason' }, rec.reason)
    ));
  }
  section.appendChild(grid);
  return section;
}

import { el, go, speak } from '../util.js';
import { DIALEKTE, ALLE_AUSDRUECKE } from '../../data/dialekte.js';
import { KATEGORIEN } from '../../data/kategorien.js';
import { getStreak, getLernStats, getDailySeed, toggleFavorit, isFavorit } from '../store.js';
import { pickSeeded } from '../util.js';
import { renderDialektCard } from './partials.js';
import { icon } from '../util/icons.js';

export function renderHome(root) {
  root.innerHTML = '';
  const view = el('div', { class: 'view' });

  const stats = getLernStats();
  const streak = getStreak();
  const totalExpr = ALLE_AUSDRUECKE.length;

  // Hero
  view.appendChild(el('section', { class: 'hero' },
    el('div', {},
      el('span', { class: 'hero-eyebrow' },
        el('span', { html: '✨' }),
        'Deutsche Sprachvielfalt entdecken'
      ),
      el('h1', { html: 'Lerne Dialekte aus <span class="grad">ganz Deutschland</span>.' }),
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

  // Daily expression
  const dailyWrap = renderDailyExpression();
  dailyWrap.setAttribute('data-reveal', '');
  view.appendChild(dailyWrap);

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
    { dialekt: 'Hessisch',  farbe: '#e63946', ausdruck: 'Ei guude!',  meaning: 'Hallo!',          depth: '1.4' },
    { dialekt: 'Berlinisch', farbe: '#f4a261', ausdruck: 'Icke',       meaning: 'Ich',             depth: '1.0' },
    { dialekt: 'Bayerisch',  farbe: '#0077b6', ausdruck: 'Servus',     meaning: 'Hallo / Tschüss', depth: '1.7' }
  ];
  return el('div', { class: 'hero-preview', dataset: { pointerParallax: '' } },
    ...samples.map(s => el('div', { class: 'preview-card', dataset: { ppDepth: s.depth } },
      el('span', { class: 'dialect-tag', style: { background: s.farbe + '22', color: s.farbe } }, s.dialekt),
      el('div', { class: 'expr' }, s.ausdruck),
      el('div', { class: 'meaning' }, s.meaning)
    ))
  );
}

function renderDailyExpression() {
  const seed = getDailySeed();
  const expr = pickSeeded(ALLE_AUSDRUECKE, seed);
  if (!expr) return el('div');
  return el('section', { class: 'section' },
    el('div', { class: 'daily' },
      el('div', { class: 'daily-content' },
        el('span', { class: 'daily-eyebrow' }, '☀️ Ausdruck des Tages'),
        el('div', { class: 'daily-expr' }, expr.ausdruck),
        el('div', { class: 'daily-hd' }, '↦ ' + expr.hochdeutsch),
        el('div', { class: 'daily-meaning' }, expr.bedeutung),
        el('div', { class: 'daily-foot' },
          el('span', { class: 'daily-source' }, `${expr.dialektFlag} ${expr.dialektName}`),
          el('div', { class: 'daily-actions' },
            el('button', {
              class: 'daily-action', title: 'Anhören',
              onClick: () => speak(expr.ausdruck)
            }, el('span', { html: '🔊' })),
            el('button', {
              class: 'daily-action', title: 'Zum Dialekt',
              onClick: () => go(`#/dialekt/${expr.dialektId}`)
            }, el('span', { html: '→' }))
          )
        )
      )
    )
  );
}

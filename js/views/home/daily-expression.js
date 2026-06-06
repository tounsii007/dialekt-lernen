// Startseite · Ausdruck des Tages
// Seeded (stabil pro Tag). Bei Aufruf via Manifest-Shortcut (./#/?daily=1) wird
// eine größere Karten-Variante mit Beispiel-Satz, prominenteren Aktionen und
// einem sanften Scroll-+-Highlight gezeigt.

import { el, go, speak } from '../../util.js';
import { ALLE_AUSDRUECKE } from '../../../data/dialekte.js';
import { getDailySeed } from '../../store.js';
import { pickSeeded } from '../../util.js';

export function renderDailyExpression(focus = false) {
  const seed = getDailySeed();
  const expr = pickSeeded(ALLE_AUSDRUECKE, seed);
  if (!expr) return el('div');
  // Wenn via Manifest-Shortcut (daily=1) aufgerufen: größere Karten-Variante
  // mit Beispiel-Satz und prominenteren Aktionen.
  const dailyClasses = 'daily' + (focus ? ' daily-large' : '');
  const section = el('section', { class: 'section', dataset: { reveal: '' }, 'aria-label': 'Ausdruck des Tages' },
    el('div', { class: dailyClasses },
      el('div', { class: 'daily-content' },
        el('h2', { class: 'daily-eyebrow' }, focus ? '🌟 Heutiger Ausdruck' : '☀️ Ausdruck des Tages'),
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
              onClick: () => speak(expr.ausdruck, expr.dialektLang || 'de-DE', { dialektId: expr.dialektId })
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

  if (focus) {
    // Daily-Karte ist über Manifest-Shortcut (./#/?daily=1) aufgerufen worden:
    // sanft scrollen + temporäre Highlight-Klasse.
    setTimeout(() => {
      const card = section.querySelector('.daily');
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('daily-focus-highlight');
        setTimeout(() => card.classList.remove('daily-focus-highlight'), 3200);
      }
    }, 120);
  }

  return section;
}

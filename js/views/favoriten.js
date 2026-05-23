import { el, go } from '../util.js';
import { getFavoriten, getLernStats, getQuizGenauigkeit, getStreak, getQuizHistory } from '../store.js';
import { getDialekt, ALLE_AUSDRUECKE } from '../../data/dialekte.js';
import { renderExpressionCard } from './partials.js';
import { icon } from '../util/icons.js';

export function renderFavoriten(root) {
  root.innerHTML = '';
  const view = el('div', { class: 'view' });

  view.appendChild(el('div', { class: 'section-head' },
    el('div', {},
      el('h2', {}, '⭐ Deine Favoriten & Statistiken'),
      el('div', { class: 'lede' }, 'Hier findest du markierte Ausdrücke und deinen Lernfortschritt.')
    )
  ));

  // Stats
  const stats = getLernStats();
  const acc = getQuizGenauigkeit();
  const streak = getStreak();
  const favs = getFavoriten();
  const history = getQuizHistory();

  view.appendChild(el('div', { class: 'stat-grid', dataset: { reveal: '' } },
    el('div', { class: 'stat-card', dataset: { spotlight: '' } },
      el('div', { class: 'stat-card-icon' }, icon('target', { size: 22 })),
      el('div', { class: 'stat-card-value', dataset: { count: String(stats.gelernt) } }, String(stats.gelernt)),
      el('div', { class: 'stat-card-label' }, 'Ausdrücke gelernt')
    ),
    el('div', { class: 'stat-card', dataset: { spotlight: '' } },
      el('div', { class: 'stat-card-icon' }, icon('book', { size: 22 })),
      el('div', { class: 'stat-card-value', dataset: { count: String(stats.inArbeit) } }, String(stats.inArbeit)),
      el('div', { class: 'stat-card-label' }, 'In Arbeit')
    ),
    el('div', { class: 'stat-card', dataset: { spotlight: '' } },
      el('div', { class: 'stat-card-icon' }, icon('zap', { size: 22 })),
      el('div', { class: 'stat-card-value', dataset: { count: String(acc), suffix: '%' } }, acc + '%'),
      el('div', { class: 'stat-card-label' }, 'Quiz-Genauigkeit')
    ),
    el('div', { class: 'stat-card', dataset: { spotlight: '' } },
      el('div', { class: 'stat-card-icon' }, icon('flame', { size: 22 })),
      el('div', { class: 'stat-card-value', dataset: { count: String(streak) } }, String(streak)),
      el('div', { class: 'stat-card-label' }, 'Tage in Folge')
    ),
    el('div', { class: 'stat-card', dataset: { spotlight: '' } },
      el('div', { class: 'stat-card-icon' }, icon('heart', { size: 22 })),
      el('div', { class: 'stat-card-value', dataset: { count: String(favs.length) } }, String(favs.length)),
      el('div', { class: 'stat-card-label' }, 'Favoriten')
    )
  ));

  // Quiz-Verlauf
  if (history.length) {
    const last5 = history.slice(0, 5);
    view.appendChild(el('div', { class: 'card', style: { marginTop: '24px' } },
      el('div', { class: 'card-title' }, 'Letzte Quiz-Ergebnisse'),
      el('div', { style: { display: 'flex', gap: '12px', flexWrap: 'wrap' } },
        ...last5.map(h => {
          const pct = Math.round((h.score / h.total) * 100);
          const color = pct >= 70 ? 'var(--accent)' : pct >= 50 ? 'var(--warm)' : '#ef476f';
          return el('div', {
            style: { padding: '12px 18px', borderRadius: '12px', background: 'var(--bg-soft)', minWidth: '120px', textAlign: 'center', borderLeft: `4px solid ${color}` }
          },
            el('div', { style: { fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: '700' } }, pct + '%'),
            el('div', { style: { fontSize: '0.8rem', color: 'var(--text-muted)' } }, `${h.score}/${h.total} · ${new Date(h.date).toLocaleDateString('de-DE')}`)
          );
        })
      )
    ));
  }

  // Favoriten
  view.appendChild(el('div', { class: 'section-head', style: { marginTop: '40px' } },
    el('div', {}, el('h2', {}, 'Deine Favoriten'))
  ));

  if (favs.length === 0) {
    view.appendChild(el('div', { class: 'empty-state' },
      el('span', { class: 'emoji' }, '💫'),
      el('div', {}, 'Noch keine Favoriten markiert.'),
      el('div', { style: { marginTop: '8px', color: 'var(--text-muted)' } }, 'Klicke auf das ♡ Symbol bei einem Ausdruck, um ihn hier zu speichern.'),
      el('button', { class: 'btn btn-primary', style: { marginTop: '20px' }, onClick: () => go('#/entdecken') }, 'Dialekte erkunden')
    ));
  } else {
    const grid = el('div', { class: 'expr-grid' });
    favs.forEach(({ dialektId, ausdruckId }) => {
      const d = getDialekt(dialektId);
      if (!d) return;
      const a = d.ausdruecke.find(x => x.id === ausdruckId);
      if (!a) return;
      grid.appendChild(renderExpressionCard(a, d));
    });
    view.appendChild(grid);
  }

  root.appendChild(view);
}

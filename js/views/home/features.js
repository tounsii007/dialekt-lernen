// Startseite · Feature-Übersicht + Tastatur-Shortcuts — zwei statische Karten
// mit animierten Stroke-Icons: „Was kannst du hier tun?" und die wichtigsten
// Tastenkürzel.

import { el } from '../../util.js';
import { icon } from '../../util/icons.js';

export function renderFeatures() {
  return el('section', { class: 'section section-row', dataset: { reveal: '' }, 'aria-label': 'App-Features-Übersicht' },
    el('div', { class: 'card', dataset: { spotlight: '' } },
      el('h2', { class: 'card-title' }, 'Was kannst du hier tun?'),
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
  );
}

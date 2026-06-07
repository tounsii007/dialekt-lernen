// Startseite · Feature-Übersicht + Tastatur-Shortcuts — zwei statische Karten
// mit animierten Stroke-Icons: „Was kannst du hier tun?" und die wichtigsten
// Tastenkürzel.

import { el } from '../../util.js';
import { icon } from '../../util/icons.js';
import { t } from '../../util/i18n.js';

export function renderFeatures() {
  return el('section', { class: 'section section-row', dataset: { reveal: '' }, 'aria-label': t('view.features.sectionAria') },
    el('div', { class: 'card', dataset: { spotlight: '' } },
      el('h2', { class: 'card-title' }, t('view.features.title')),
      el('ul', { class: 'feature-list' },
        el('li', {}, el('span', { class: 'fi' }, icon('book')),    el('div', {}, el('b', {}, t('view.features.f1Title')), t('view.features.f1Desc'))),
        el('li', {}, el('span', { class: 'fi' }, icon('cards')),   el('div', {}, el('b', {}, t('view.features.f2Title')), t('view.features.f2Desc'))),
        el('li', {}, el('span', { class: 'fi' }, icon('target')),  el('div', {}, el('b', {}, t('view.features.f3Title')), t('view.features.f3Desc'))),
        el('li', {}, el('span', { class: 'fi' }, icon('speaker')), el('div', {}, el('b', {}, t('view.features.f4Title')), t('view.features.f4Desc'))),
        el('li', {}, el('span', { class: 'fi' }, icon('heart')),   el('div', {}, el('b', {}, t('view.features.f5Title')), t('view.features.f5Desc')))
      )
    ),
    el('div', { class: 'card', dataset: { spotlight: '' } },
      el('div', { class: 'card-title' }, t('view.features.shortcutsTitle')),
      el('ul', { class: 'feature-list' },
        el('li', {}, el('span', { class: 'fi' }, icon('search')),   el('div', {}, el('b', {}, 'S '), t('view.features.scSearch'))),
        el('li', {}, el('span', { class: 'fi' }, icon('sparkles')), el('div', {}, el('b', {}, 'T '), t('view.features.scTheme'))),
        el('li', {}, el('span', { class: 'fi' }, icon('arrow')),    el('div', {}, el('b', {}, '← / → '), t('view.features.scNav'))),
        el('li', {}, el('span', { class: 'fi' }, icon('keyboard')), el('div', {}, el('b', {}, t('view.features.keySpace')), t('view.features.scFlip'))),
        el('li', {}, el('span', { class: 'fi' }, icon('command')),  el('div', {}, el('b', {}, '1/2/3 '), t('view.features.scQuiz')))
      )
    )
  );
}

// Startseite · Lernziele (Long-term Goals) — langfristige Ziele mit Fortschritt,
// optionaler Deadline und Scope (Dialekt/Kategorie). Hinzufügen via Inline-Formular
// (kein extra Modal-Framework), Entfernen mit Zweiklick-Bestätigung an der Zeile.

import { el, toast } from '../../util.js';
import { t } from '../../util/i18n.js';
import { DIALEKTE } from '../../../data/dialekte.js';
import { KATEGORIEN } from '../../../data/kategorien.js';
import { getLongGoals, addLongGoal, removeLongGoal } from '../../store/long-goals.js';

export function renderLongGoalsSection() {
  const section = el('section', { class: 'section', dataset: { reveal: '' } });
  const head = el('div', { class: 'section-head' },
    el('div', {},
      el('h2', {}, t('view.long-goals.title')),
      el('div', { class: 'lede' }, t('view.long-goals.lede'))
    ),
    el('button', {
      class: 'btn btn-secondary',
      onClick: () => openAddLongGoalDialog(section)
    }, t('view.long-goals.add'))
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
      t('view.long-goals.empty')));
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
        ? t('view.long-goals.deadlineDaysLeft', { date: g.deadline, n: g.daysLeft })
        : t('view.long-goals.deadlineDue', { date: g.deadline }))
    : t('view.long-goals.noDeadline');

  return el('article', { class: 'long-goal-row' + (g.done ? ' is-done' : '') },
    el('div', { class: 'long-goal-head' },
      el('div', { class: 'long-goal-label' }, g.label),
      (() => {
        // Zweiklick-Bestätigung direkt am Button (kein blockierendes confirm,
        // platzsparend für die Zeile): erster Klick „scharf", zweiter löscht.
        const btn = el('button', { class: 'long-goal-remove', title: t('view.long-goals.removeTitle') }, '✕');
        let armed = false, timer = null;
        btn.addEventListener('click', () => {
          if (!armed) {
            armed = true;
            btn.classList.add('is-armed');
            btn.textContent = t('view.long-goals.removeArmed');
            btn.title = t('view.long-goals.removeArmedTitle');
            timer = setTimeout(() => {
              armed = false; btn.classList.remove('is-armed');
              btn.textContent = '✕'; btn.title = t('view.long-goals.removeTitle');
            }, 4000);
          } else {
            clearTimeout(timer);
            removeLongGoal(g.id);
            refreshLongGoalsBody(body);
          }
        });
        return btn;
      })()
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
    g.done ? el('div', { class: 'long-goal-done' }, t('view.long-goals.reached')) : null
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
    placeholder: t('view.long-goals.phLabel'),
    maxlength: '120'
  });
  const targetInput = el('input', {
    type: 'number', class: 'long-goal-input long-goal-input-num',
    min: '1', max: '5000', value: '50',
    placeholder: t('view.long-goals.phTarget')
  });
  const deadlineInput = el('input', {
    type: 'date', class: 'long-goal-input'
  });
  const dialektSelect = el('select', { class: 'long-goal-input' },
    el('option', { value: '' }, t('view.long-goals.allDialects')),
    ...DIALEKTE.map(d => el('option', { value: d.id }, `${d.flag} ${d.name}`))
  );
  const kategorieSelect = el('select', { class: 'long-goal-input' },
    el('option', { value: '' }, t('view.long-goals.allCategories')),
    ...Object.values(KATEGORIEN).map(k =>
      el('option', { value: k.id }, `${k.icon} ${k.label}`))
  );

  const form = el('div', { class: 'long-goal-form' },
    el('div', { class: 'long-goal-form-row' },
      el('label', {}, t('view.long-goals.labelName')), labelInput
    ),
    el('div', { class: 'long-goal-form-row long-goal-form-row-split' },
      el('label', {}, t('view.long-goals.labelTarget')), targetInput,
      el('label', {}, t('view.long-goals.labelDeadline')), deadlineInput
    ),
    el('div', { class: 'long-goal-form-row long-goal-form-row-split' },
      el('label', {}, t('view.long-goals.labelDialect')), dialektSelect,
      el('label', {}, t('view.long-goals.labelCategory')), kategorieSelect
    ),
    el('div', { class: 'long-goal-form-actions' },
      el('button', { class: 'btn btn-primary', onClick: () => {
        const label = labelInput.value.trim();
        const target = Number(targetInput.value) || 0;
        if (!label || target < 1) {
          toast(t('view.long-goals.toastInvalid'), 'info', 2400);
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
      } }, t('view.long-goals.submit')),
      el('button', { class: 'btn btn-ghost', onClick: () => form.remove() }, t('view.long-goals.cancel'))
    )
  );

  section.insertBefore(form, list);
}

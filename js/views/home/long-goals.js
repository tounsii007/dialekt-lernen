// Startseite · Lernziele (Long-term Goals) — langfristige Ziele mit Fortschritt,
// optionaler Deadline und Scope (Dialekt/Kategorie). Hinzufügen via Inline-Formular
// (kein extra Modal-Framework), Entfernen mit Zweiklick-Bestätigung an der Zeile.

import { el, toast } from '../../util.js';
import { DIALEKTE } from '../../../data/dialekte.js';
import { KATEGORIEN } from '../../../data/kategorien.js';
import { getLongGoals, addLongGoal, removeLongGoal } from '../../store/long-goals.js';

export function renderLongGoalsSection() {
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
      (() => {
        // Zweiklick-Bestätigung direkt am Button (kein blockierendes confirm,
        // platzsparend für die Zeile): erster Klick „scharf", zweiter löscht.
        const btn = el('button', { class: 'long-goal-remove', title: 'Ziel entfernen' }, '✕');
        let armed = false, t = null;
        btn.addEventListener('click', () => {
          if (!armed) {
            armed = true;
            btn.classList.add('is-armed');
            btn.textContent = 'Löschen?';
            btn.title = 'Nochmal klicken zum endgültigen Löschen';
            t = setTimeout(() => {
              armed = false; btn.classList.remove('is-armed');
              btn.textContent = '✕'; btn.title = 'Ziel entfernen';
            }, 4000);
          } else {
            clearTimeout(t);
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

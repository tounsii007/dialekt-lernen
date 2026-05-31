import { el, go } from '../util.js';
import {
  getFavoriten, getLernStats, getQuizGenauigkeit, getStreak, getQuizHistory,
  getStreakHeatmap, getActiveDays, evaluateAchievements, getVisitedDialects,
  toggleFavorit,
  getStreakProtection, setWeekendAmulet, canRepairStreak, repairStreak,
  MAX_FREEZES, MAX_REPAIRS, REPAIR_WINDOW_DAYS
} from '../store.js';
import { DIALEKTE, getDialekt, ALLE_AUSDRUECKE } from '../../data/dialekte.js';
import { renderExpressionCard } from './partials.js';
import { icon, emptyIllustration, sparkline } from '../util/icons.js';
import { getQuizSparkline } from '../util/recommendations.js';
import { confettiBurst } from '../util/motion.js';
import { sfx } from '../util/sounds.js';
import { downloadStateFile, importState, resetAllData, exportStateAsString, exportToCsv, downloadCsvFile } from '../store/transfer.js';
import { toast } from '../util.js';
import { getXp, getXpLog, xpToNextLevel, getLevelTitle } from '../store/xp.js';
import {
  getNotificationStatus, setNotificationSettings,
  enableNotifications, disableNotifications
} from '../store/notifications.js';
import { showNotification } from '../util/push.js';
import { getDecks, addToDeck } from '../store/decks.js';
import { getSuggestions, removeSuggestion, exportSuggestionsAsJson, countSuggestions } from '../store/suggestions.js';
import { openModal, confirmModal } from '../util/modal.js';
import { openCreateDeckModal } from './decks.js';

export function renderFavoriten(root) {
  root.innerHTML = '';
  const view = el('div', { class: 'view' });

  view.appendChild(el('div', { class: 'section-head' },
    el('div', {},
      el('h2', {}, '⭐ Deine Favoriten & Statistiken'),
      el('div', { class: 'lede' }, 'Hier findest du markierte Ausdrücke und deinen Lernfortschritt.')
    )
  ));

  // XP Card
  view.appendChild(renderXpCard());

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

  // Streak heatmap — GitHub-style
  view.appendChild(renderHeatmap());

  // Streak-Schutz (Freeze/Reparatur/Wochenend-Amulett)
  view.appendChild(renderStreakProtection(() => renderFavoriten(root)));

  // Achievements
  const achView = renderAchievements({
    gelerntCount: stats.gelernt,
    streak,
    quizCount: history.length,
    bestQuiz: history.reduce((m, h) => Math.max(m, Math.round((h.score / h.total) * 100)), 0),
    visitedCount: getVisitedDialects().length,
    totalDialects: DIALEKTE.length,
    totalAvailable: DIALEKTE.reduce((sum, d) => sum + d.ausdruecke.length, 0),
    favCount: favs.length
  });
  view.appendChild(achView);

  // Quiz-Verlauf — Sparkline + letzte Ergebnisse
  if (history.length) {
    const sparkData = getQuizSparkline(10);
    const last5 = history.slice(0, 5);
    const trend = sparkData.length >= 2
      ? sparkData[sparkData.length - 1].pct - sparkData[0].pct
      : 0;
    const trendText = trend > 0 ? `▲ +${trend}%` : trend < 0 ? `▼ ${trend}%` : '— stabil';
    const trendCls = trend > 0 ? 'pos' : trend < 0 ? 'neg' : 'neu';

    view.appendChild(el('div', { class: 'card quiz-trend', style: { marginTop: '24px' }, dataset: { spotlight: '', reveal: '' } },
      el('div', { class: 'quiz-trend-head' },
        el('div', {},
          el('div', { class: 'card-title' }, 'Quiz-Trend'),
          el('div', { class: 'lede', style: { fontSize: '.85rem' } }, `Letzte ${sparkData.length} Quizze · ${acc}% Gesamt-Genauigkeit`)
        ),
        el('div', { class: 'quiz-trend-delta ' + trendCls }, trendText)
      ),
      sparkData.length >= 2
        ? sparkline(sparkData.map(s => s.pct), { width: 320, height: 64, color: 'var(--brand)', max: 100 })
        : el('div', { class: 'lede' }, 'Mehr Quizze für eine Trendlinie spielen.'),
      el('div', { class: 'quiz-history-row' },
        ...last5.map(h => {
          const pct = Math.round((h.score / h.total) * 100);
          const tone = pct >= 70 ? 'good' : pct >= 50 ? 'okay' : 'bad';
          return el('div', { class: 'quiz-history-pill tone-' + tone },
            el('div', { class: 'qhp-pct' }, pct + '%'),
            el('div', { class: 'qhp-meta' }, `${h.score}/${h.total} · ${new Date(h.date).toLocaleDateString('de-DE')}`)
          );
        })
      )
    ));
  }

  // Benachrichtigungen (Tägliche Erinnerung)
  view.appendChild(renderNotificationSettings());

  // Daten-Tools (Export/Import/Reset)
  view.appendChild(renderDataTools());

  // Korrektur-Vorschläge (lokal)
  view.appendChild(renderSuggestionsPanel(() => renderFavoriten(root)));

  // Favoriten + Bulk-Aktionen
  view.appendChild(renderFavoritenList(favs, () => renderFavoriten(root)));

  root.appendChild(view);
}

// Favoriten-Liste mit optionalem Auswahl-Modus.
function renderFavoritenList(favs, rerender) {
  const wrap = el('section', { class: 'section favoriten-list-section', style: { marginTop: '40px' } });

  if (favs.length === 0) {
    wrap.appendChild(el('div', { class: 'section-head' },
      el('div', {}, el('h2', {}, 'Deine Favoriten'))
    ));
    wrap.appendChild(el('div', { class: 'empty-state' },
      emptyIllustration('heart'),
      el('h3', {}, 'Noch keine Favoriten markiert'),
      el('div', { class: 'empty-meta' }, 'Klicke auf das ♡ Symbol bei einem Ausdruck, um ihn hier zu speichern.'),
      el('button', { class: 'btn btn-primary', dataset: { magnetic: '12' }, onClick: () => go('#/entdecken') }, 'Dialekte erkunden')
    ));
    return wrap;
  }

  // Lokaler Auswahl-State (nicht persistent).
  let selectionMode = false;
  const selectedKeys = new Set();
  const keyOf = (dialektId, ausdruckId) => `${dialektId}.${ausdruckId}`;

  const grid = el('div', { class: 'expr-grid' });
  const head = el('div', { class: 'section-head', style: { alignItems: 'center', flexWrap: 'wrap', gap: '12px' } });
  const toolbar = el('div', { class: 'card', style: { padding: '12px 16px', marginBottom: '16px', display: 'none', flexWrap: 'wrap', gap: '8px', alignItems: 'center' } });

  function selectableKeys() {
    return favs
      .filter(({ dialektId, ausdruckId }) => {
        const d = getDialekt(dialektId);
        return d && d.ausdruecke.some(x => x.id === ausdruckId);
      })
      .map(({ dialektId, ausdruckId }) => keyOf(dialektId, ausdruckId));
  }

  function updateGridSelection() {
    grid.querySelectorAll('.expr-card').forEach(card => {
      const key = card.dataset.favKey;
      const isSel = key && selectedKeys.has(key);
      card.classList.toggle('is-bulk-selected', isSel);
      const cb = card.querySelector('.bulk-checkbox input');
      if (cb) cb.checked = isSel;
      const wrap = card.querySelector('.bulk-checkbox');
      if (wrap) wrap.style.display = selectionMode ? 'flex' : 'none';
    });
    updateCountLabel();
  }

  let countLabel = null;
  function updateCountLabel() {
    if (countLabel) countLabel.textContent = `${selectedKeys.size} ausgewählt`;
  }

  function renderHead() {
    head.innerHTML = '';
    head.appendChild(el('div', {}, el('h2', {}, 'Deine Favoriten')));
    const toggleBtn = el('button', {
      class: 'btn ' + (selectionMode ? 'btn-secondary' : 'btn-ghost'),
      style: { padding: '6px 14px' },
      onClick: () => {
        selectionMode = !selectionMode;
        if (!selectionMode) selectedKeys.clear();
        toolbar.style.display = selectionMode ? 'flex' : 'none';
        renderHead();
        updateGridSelection();
      }
    }, selectionMode ? '✕ Auswahl beenden' : '☑ Auswahl-Modus');
    head.appendChild(el('div', { style: { display: 'flex', gap: '8px' } }, toggleBtn));
  }
  renderHead();

  // Toolbar-Aktionen
  countLabel = el('span', { class: 'lede', style: { fontSize: '.85rem', flex: '1' } }, '0 ausgewählt');
  toolbar.appendChild(countLabel);

  toolbar.appendChild(el('button', {
    class: 'btn btn-ghost', style: { padding: '6px 12px', fontSize: '.85rem' },
    onClick: () => {
      const all = selectableKeys();
      all.forEach(k => selectedKeys.add(k));
      updateGridSelection();
    }
  }, 'Alle auswählen'));

  toolbar.appendChild(el('button', {
    class: 'btn btn-ghost', style: { padding: '6px 12px', fontSize: '.85rem' },
    onClick: () => {
      const all = selectableKeys();
      all.forEach(k => {
        if (selectedKeys.has(k)) selectedKeys.delete(k);
        else selectedKeys.add(k);
      });
      updateGridSelection();
    }
  }, 'Auswahl invertieren'));

  toolbar.appendChild(el('button', {
    class: 'btn btn-secondary', style: { padding: '6px 12px', fontSize: '.85rem' },
    onClick: async () => {
      if (selectedKeys.size === 0) { toast('Nichts ausgewählt', 'info', 1400); return; }
      await openAddToDeckDialog(Array.from(selectedKeys), rerender);
    }
  }, '🗂️ Zu Deck hinzufügen'));

  toolbar.appendChild(el('button', {
    class: 'btn btn-ghost danger-btn', style: { padding: '6px 12px', fontSize: '.85rem' },
    onClick: async () => {
      if (selectedKeys.size === 0) { toast('Nichts ausgewählt', 'info', 1400); return; }
      const n = selectedKeys.size;
      const ok = await confirmModal({
        title: 'Aus Favoriten entfernen?',
        message: `${n} Ausdr${n === 1 ? 'uck' : 'ücke'} aus den Favoriten entfernen?`,
        confirmLabel: 'Entfernen',
        danger: true
      });
      if (!ok) return;
      let removed = 0;
      for (const key of selectedKeys) {
        const [dialektId, ausdruckId] = key.split('.');
        if (!dialektId || !ausdruckId) continue;
        toggleFavorit(dialektId, ausdruckId); // toggles off, da Favorit
        removed++;
      }
      selectedKeys.clear();
      toast(`${removed} entfernt`, 'success', 1600);
      rerender();
    }
  }, '🗑️ Aus Favoriten entfernen'));

  wrap.appendChild(head);
  wrap.appendChild(toolbar);

  favs.forEach(({ dialektId, ausdruckId }) => {
    const d = getDialekt(dialektId);
    if (!d) return;
    const a = d.ausdruecke.find(x => x.id === ausdruckId);
    if (!a) return;

    const card = renderExpressionCard(a, d);
    const key = keyOf(dialektId, ausdruckId);
    card.dataset.favKey = key;

    // Checkbox-Overlay
    const cb = el('input', {
      type: 'checkbox',
      'aria-label': 'In Auswahl',
      onClick: (e) => {
        e.stopPropagation();
        if (cb.checked) selectedKeys.add(key); else selectedKeys.delete(key);
        card.classList.toggle('is-bulk-selected', cb.checked);
        updateCountLabel();
      }
    });
    const cbWrap = el('label', {
      class: 'bulk-checkbox',
      style: {
        position: 'absolute', top: '8px', left: '8px',
        display: 'none', alignItems: 'center', justifyContent: 'center',
        width: '28px', height: '28px',
        background: 'var(--bg-elev)', borderRadius: '6px',
        border: '1px solid var(--border)', zIndex: '5',
        cursor: 'pointer'
      },
      onClick: (e) => e.stopPropagation()
    }, cb);
    card.style.position = card.style.position || 'relative';
    card.prepend(cbWrap);

    // Click toggling im Auswahl-Modus (außer auf Action-Buttons)
    card.addEventListener('click', (e) => {
      if (!selectionMode) return;
      const t = e.target;
      if (t.closest('.expr-action') || t.closest('.expr-note-input')) return;
      cb.checked = !cb.checked;
      if (cb.checked) selectedKeys.add(key); else selectedKeys.delete(key);
      card.classList.toggle('is-bulk-selected', cb.checked);
      updateCountLabel();
    });

    grid.appendChild(card);
  });

  wrap.appendChild(grid);
  return wrap;
}

// Dialog zur Auswahl eines Decks (oder zum Neuanlegen).
async function openAddToDeckDialog(selectedKeys, rerender) {
  const decks = getDecks();

  const refs = selectedKeys.map(k => {
    const [dialektId, id] = k.split('.');
    return { dialektId, id };
  });

  let selectedDeckId = decks[0]?.id || null;

  const buildDeckList = () => {
    if (decks.length === 0) {
      return el('p', { class: 'lede' }, 'Du hast noch keine Decks. Lege jetzt eines an, um die Auswahl dort zu speichern.');
    }
    const list = el('div', { style: { display: 'grid', gap: '8px', maxHeight: '300px', overflowY: 'auto', padding: '4px' } });
    decks.forEach(d => {
      const row = el('label', {
        style: {
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '10px 12px', borderRadius: 'var(--r-md)',
          border: '1px solid var(--border)', cursor: 'pointer',
          background: 'var(--bg-soft)'
        }
      },
        el('input', {
          type: 'radio', name: 'deckChoice', value: d.id,
          checked: d.id === selectedDeckId,
          onClick: () => { selectedDeckId = d.id; }
        }),
        el('span', { style: { width: '14px', height: '14px', borderRadius: '50%', background: d.color, flexShrink: '0' } }),
        el('div', { style: { flex: '1' } },
          el('div', { style: { fontWeight: '600' } }, d.name),
          el('div', { class: 'lede', style: { fontSize: '.8rem' } },
            `${d.expressionIds.length} Einträge`
          )
        )
      );
      list.appendChild(row);
    });
    return list;
  };

  const listWrap = el('div', {}, buildDeckList());

  openModal({
    title: `Zu Deck hinzufügen (${selectedKeys.length})`,
    content: [
      listWrap,
      el('div', { style: { marginTop: '12px', display: 'flex', justifyContent: 'flex-end' } },
        el('button', {
          class: 'btn btn-ghost',
          style: { padding: '6px 12px' },
          onClick: () => {
            openCreateDeckModal((newDeckId) => {
              if (!newDeckId) return;
              // Nach Anlegen: gleich hinzufügen
              let added = 0;
              for (const ref of refs) {
                if (addToDeck(newDeckId, ref)) added++;
              }
              toast(`${added} zum neuen Deck hinzugefügt ✓`, 'success', 1800);
              rerender();
            });
          }
        }, '+ Neues Deck anlegen')
      )
    ],
    actions: [
      { label: 'Abbrechen', variant: 'ghost', onClick: () => {} },
      {
        label: 'Hinzufügen',
        variant: 'primary',
        onClick: () => {
          if (!selectedDeckId) {
            toast('Bitte ein Deck wählen oder neu anlegen', 'info', 1800);
            return false;
          }
          let added = 0, skipped = 0;
          for (const ref of refs) {
            if (addToDeck(selectedDeckId, ref)) added++;
            else skipped++;
          }
          const msg = skipped > 0
            ? `${added} hinzugefügt · ${skipped} bereits vorhanden`
            : `${added} hinzugefügt ✓`;
          toast(msg, 'success', 1800);
          rerender();
        }
      }
    ]
  });
}

// Panel: Übersicht aller eigenen Vorschläge + JSON-Export.
function renderSuggestionsPanel(rerender) {
  const list = getSuggestions();
  const n = list.length;

  const wrap = el('section', { class: 'section', dataset: { reveal: '' }, style: { marginTop: '24px' } });
  wrap.appendChild(el('div', { class: 'section-head' },
    el('div', {},
      el('h2', {}, '✎ Deine Korrektur-Vorschläge'),
      el('div', { class: 'lede' }, n === 0
        ? 'Du hast noch keine Vorschläge gespeichert. Klicke an einer Karte auf das ✎-Symbol, um eine Korrektur vorzuschlagen.'
        : `${n} lokal gespeicherte${n === 1 ? 'r Vorschlag' : ' Vorschläge'} — bereit zum Exportieren.`)
    )
  ));

  if (n === 0) return wrap;

  const actions = el('div', { class: 'data-tools-row', style: { marginBottom: '12px' } },
    el('button', {
      class: 'btn btn-primary', dataset: { magnetic: '10' },
      onClick: () => {
        const json = exportSuggestionsAsJson();
        try {
          const blob = new Blob([json], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          const stamp = new Date().toISOString().slice(0, 10);
          a.href = url;
          a.download = `dialekto-suggestions-${stamp}.json`;
          document.body.appendChild(a);
          a.click();
          setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
          toast('JSON heruntergeladen ✓', 'success', 1600);
        } catch {
          toast('Download fehlgeschlagen', 'info', 1800);
        }
      }
    }, '📥 Als JSON exportieren'),
    el('button', {
      class: 'btn btn-secondary', dataset: { magnetic: '10' },
      onClick: async () => {
        try {
          await navigator.clipboard.writeText(exportSuggestionsAsJson());
          toast('In Zwischenablage kopiert 📋', 'success', 1600);
        } catch {
          toast('Zwischenablage nicht verfügbar', 'info', 1600);
        }
      }
    }, '📋 In Zwischenablage'),
    el('button', {
      class: 'btn btn-ghost danger-btn',
      onClick: async () => {
        const ok = await confirmModal({
          title: 'Alle Vorschläge löschen?',
          message: `${n} lokale Vorschläge wirklich entfernen?`,
          confirmLabel: 'Alle löschen',
          danger: true
        });
        if (!ok) return;
        list.forEach(s => removeSuggestion(s.suggId));
        toast('Alle Vorschläge gelöscht', 'success', 1400);
        rerender();
      }
    }, '🗑️ Alle löschen')
  );
  wrap.appendChild(actions);

  const ul = el('div', { style: { display: 'grid', gap: '10px' } });
  list.forEach(s => {
    const d = getDialekt(s.dialektId);
    const a = d?.ausdruecke?.find(x => x.id === s.id);
    const headerText = a
      ? `${d.flag} ${d.name} · „${a.ausdruck}"`
      : `${s.dialektId} · ${s.id}`;
    const fieldLabels = {
      ausdruck: 'Ausdruck',
      hochdeutsch: 'Hochdeutsch',
      beispiel: 'Beispiel',
      beispiel_hd: 'Beispiel (Hochdeutsch)',
      bedeutung: 'Bedeutung'
    };

    const card = el('div', { class: 'card', style: { padding: '12px 16px' } },
      el('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' } },
        el('div', { style: { flex: '1' } },
          el('div', { style: { fontWeight: '600', marginBottom: '4px' } }, headerText),
          el('div', { class: 'lede', style: { fontSize: '.78rem' } },
            `Feld: ${fieldLabels[s.field] || s.field} · ${new Date(s.createdAt).toLocaleString('de-DE')}`
          )
        ),
        el('button', {
          class: 'btn btn-ghost',
          style: { padding: '4px 10px', fontSize: '.85rem' },
          title: 'Vorschlag löschen',
          onClick: () => {
            removeSuggestion(s.suggId);
            toast('Vorschlag entfernt', 'info', 1200);
            rerender();
          }
        }, '✕')
      ),
      el('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px', fontSize: '.85rem' } },
        el('div', {},
          el('div', { class: 'lede', style: { fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: '2px' } }, 'Aktuell'),
          el('div', { style: { padding: '6px 8px', background: 'var(--bg-soft)', borderRadius: '6px', wordBreak: 'break-word' } }, s.currentValue || '—')
        ),
        el('div', {},
          el('div', { class: 'lede', style: { fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: '2px', color: 'var(--brand)' } }, 'Vorschlag'),
          el('div', { style: { padding: '6px 8px', background: 'color-mix(in oklab, var(--brand) 8%, var(--bg-elev))', borderRadius: '6px', wordBreak: 'break-word', borderLeft: '2px solid var(--brand)' } }, s.proposedValue || '—')
        )
      ),
      s.note ? el('div', { class: 'lede', style: { fontSize: '.8rem', marginTop: '6px', fontStyle: 'italic' } }, `📝 ${s.note}`) : null
    );
    ul.appendChild(card);
  });

  wrap.appendChild(ul);
  return wrap;
}

function renderDataTools() {
  const fileInput = el('input', { type: 'file', accept: 'application/json', style: { display: 'none' } });
  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    let text;
    try {
      text = await file.text();
    } catch {
      // Datei nach Auswahl gelöscht / nicht lesbar — Reset, damit dieselbe
      // Datei erneut ausgewählt werden kann (change feuert sonst nicht wieder).
      e.target.value = '';
      toast('Datei konnte nicht gelesen werden.', 'info', 3000);
      return;
    }
    const res = importState(text, { strategy: 'merge' });
    if (res.ok) {
      toast('Daten importiert & gemerged ✓ — Seite wird neu geladen', 'success', 2200);
      setTimeout(() => window.location.reload(), 1100);
    } else {
      toast('Import fehlgeschlagen: ' + res.error, 'info', 3000);
    }
  });

  return el('section', { class: 'section data-tools-section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, 'Daten & Backup'),
        el('div', { class: 'lede' }, 'Sichere deinen Fortschritt oder übertrage ihn auf ein anderes Gerät.')
      )
    ),
    el('div', { class: 'data-tools-row' },
      el('button', {
        class: 'btn btn-primary', dataset: { magnetic: '10' },
        onClick: () => { downloadStateFile(); sfx.click(); toast('Backup-Datei heruntergeladen 💾', 'success', 1600); }
      }, '📥 Exportieren'),
      el('button', {
        class: 'btn btn-secondary', dataset: { magnetic: '10' },
        onClick: () => { sfx.click(); fileInput.click(); }
      }, '📤 Importieren'),
      el('button', {
        class: 'btn btn-secondary', dataset: { magnetic: '10' },
        onClick: () => {
          try {
            navigator.clipboard.writeText(exportStateAsString());
            toast('Backup in die Zwischenablage kopiert 📋', 'success', 1600);
            sfx.click();
          } catch {
            toast('Zwischenablage nicht verfügbar', 'info', 1600);
          }
        }
      }, '📋 In Zwischenablage'),
      el('button', {
        class: 'btn btn-secondary', dataset: { magnetic: '10' },
        onClick: () => {
          const favs = getFavoriten();
          if (favs.length === 0) {
            toast('Noch keine Favoriten — markiere zuerst Ausdrücke mit ♡', 'info', 2200);
            return;
          }
          sfx.click();
          const csv = exportToCsv(false, ALLE_AUSDRUECKE, getDialekt);
          downloadCsvFile(csv, `dialekto-favoriten-${new Date().toISOString().slice(0, 10)}.csv`);
          toast(`${favs.length} Favoriten als CSV exportiert 📊`, 'success', 1800);
        }
      }, '📊 Favoriten als CSV'),
      el('button', {
        class: 'btn btn-ghost', dataset: { magnetic: '10' },
        onClick: () => {
          sfx.click();
          const csv = exportToCsv(true, ALLE_AUSDRUECKE, getDialekt);
          downloadCsvFile(csv, `dialekto-alle-${new Date().toISOString().slice(0, 10)}.csv`);
          toast(`${ALLE_AUSDRUECKE.length} Ausdrücke als CSV exportiert 📚`, 'success', 1800);
        }
      }, '📚 Alle als CSV (Anki)'),
      el('button', {
        class: 'btn btn-ghost danger-btn',
        onClick: () => {
          if (confirm('Alle Daten wirklich zurücksetzen? Theme bleibt erhalten.')) {
            resetAllData({ keepTheme: true });
            toast('Daten zurückgesetzt — Seite wird neu geladen', 'info', 1600);
            setTimeout(() => window.location.reload(), 900);
          }
        }
      }, '🗑️ Zurücksetzen'),
      fileInput
    )
  );
}

function renderHeatmap() {
  const days = getStreakHeatmap(16); // 16 weeks
  const maxCount = days.reduce((m, d) => Math.max(m, d.count), 0) || 1;
  const monthLabel = (d) => ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'][d.getMonth()];

  const grid = el('div', { class: 'streak-grid' });
  // Group into weeks (columns)
  for (let w = 0; w < days.length / 7; w++) {
    const col = el('div', { class: 'streak-col' });
    for (let i = 0; i < 7; i++) {
      const d = days[w * 7 + i];
      if (!d) continue;
      const lvl = d.count === 0 ? 0 : Math.min(4, Math.ceil((d.count / maxCount) * 4));
      const cell = el('div', {
        class: `streak-cell lvl-${lvl}`,
        title: `${d.date.toLocaleDateString('de-DE')} — ${d.count} Aktion${d.count===1?'':'en'}`,
        style: { '--cell-delay': `${(w * 7 + i) * 6}ms` }
      });
      col.appendChild(cell);
    }
    grid.appendChild(col);
  }

  return el('div', { class: 'card streak-card', dataset: { spotlight: '', reveal: '' } },
    el('div', { class: 'streak-head' },
      el('div', {},
        el('div', { class: 'card-title' }, 'Lern-Heatmap'),
        el('div', { class: 'lede', style: { fontSize: '.85rem' } },
          `Letzte 16 Wochen · ${getActiveDays()} aktive Tage insgesamt`)
      ),
      el('div', { class: 'streak-legend' },
        el('span', {}, 'weniger'),
        el('span', { class: 'streak-cell lvl-0' }),
        el('span', { class: 'streak-cell lvl-1' }),
        el('span', { class: 'streak-cell lvl-2' }),
        el('span', { class: 'streak-cell lvl-3' }),
        el('span', { class: 'streak-cell lvl-4' }),
        el('span', {}, 'mehr')
      )
    ),
    grid
  );
}

// Streak-Schutz: verdiente Freezes, Reparatur-Token, Wochenend-Amulett.
// Alles offline verdient — keine Käufe (Privacy-/Offline-Säule bleibt intakt).
function renderStreakProtection(rerender) {
  const p = getStreakProtection();

  const pip = (filled) => el('span', {
    class: 'streak-pip' + (filled ? ' is-filled' : ''),
    'aria-hidden': 'true'
  });
  const pips = (have, max) => {
    const row = el('div', { class: 'streak-pips' });
    for (let i = 0; i < max; i++) row.appendChild(pip(i < have));
    return row;
  };

  // Eine Schutz-Kachel (Icon, Titel, Menge, Pip-Anzeige, Hinweis).
  const item = (emoji, title, have, max, hint) =>
    el('div', { class: 'streak-prot-item', dataset: { spotlight: '' } },
      el('div', { class: 'streak-prot-emoji' }, emoji),
      el('div', { class: 'streak-prot-body' },
        el('div', { class: 'streak-prot-title' }, title),
        el('div', { class: 'streak-prot-count' }, `${have} / ${max}`),
        pips(have, max),
        el('div', { class: 'streak-prot-hint' }, hint)
      )
    );

  const grid = el('div', { class: 'streak-prot-grid' },
    item('❄️', 'Streak-Freeze', p.freezes, p.maxFreezes,
      `Überbrückt einen verpassten Tag automatisch. Alle 5 Streak-Tage verdienst du einen.`),
    item('🔧', 'Reparatur', p.repairs, p.maxRepairs,
      `Stellt einen gerissenen Streak wieder her (binnen ${REPAIR_WINDOW_DAYS} Tagen). Alle 20 Tage gibt es eine.`)
  );

  // Wochenend-Amulett: opt-in Toggle (deckt Sa/So gratis ab, wenn ausgerüstet).
  const amuletToggle = el('input', {
    type: 'checkbox',
    checked: p.weekendAmulet,
    'aria-label': 'Wochenend-Amulett ausrüsten',
    onClick: (e) => {
      const on = setWeekendAmulet(e.target.checked);
      try { sfx.toggle(); } catch {}
      toast(on ? 'Wochenend-Amulett ausgerüstet 🛡️' : 'Wochenend-Amulett abgelegt', 'info', 1600);
    }
  });
  const amuletRow = el('label', { class: 'streak-amulet-row' },
    el('span', { class: 'streak-prot-emoji' }, '🛡️'),
    el('div', { class: 'streak-prot-body' },
      el('div', { class: 'streak-prot-title' }, 'Wochenend-Amulett'),
      el('div', { class: 'streak-prot-hint' },
        'Wenn ausgerüstet, zählen verpasste Wochenenden (Sa/So) nicht gegen deinen Streak — ganz ohne Freeze.')
    ),
    el('span', { class: 'streak-amulet-switch' }, amuletToggle, el('span', { class: 'streak-amulet-knob' }))
  );

  const card = el('div', { class: 'card streak-prot-card', dataset: { spotlight: '', reveal: '' } },
    el('div', { class: 'streak-head' },
      el('div', {},
        el('div', { class: 'card-title' }, '🛡️ Streak-Schutz'),
        el('div', { class: 'lede', style: { fontSize: '.85rem' } },
          'Schütze deine Serie — alles wird durchs Lernen verdient, nichts gekauft.')
      )
    ),
    grid,
    amuletRow
  );

  // Reparatur-Aufruf, falls der Streak gerade gerissen ist und reparierbar.
  if (p.canRepair && p.lastBreak) {
    const repairBtn = el('button', {
      class: 'btn btn-primary', dataset: { magnetic: '10' },
      onClick: () => {
        if (repairStreak()) {
          try { sfx.unlock(); } catch {}
          toast(`Streak repariert — zurück auf ${getStreakProtection().count} Tage! 🔧`, 'success', 2400);
          rerender();
        } else {
          toast('Reparatur nicht mehr möglich.', 'info', 1800);
        }
      }
    }, `🔧 Streak reparieren (war ${p.lastBreak.prevCount} Tage)`);

    card.appendChild(el('div', { class: 'streak-repair-cta' },
      el('div', { class: 'lede', style: { fontSize: '.88rem' } },
        `Dein ${p.lastBreak.prevCount}-Tage-Streak ist gerissen. Mit einer Reparatur holst du ihn zurück.`),
      repairBtn
    ));
  }

  return card;
}

function renderAchievements(stats) {
  const { items, justUnlocked } = evaluateAchievements(stats);
  const unlockedCount = items.filter(i => i.unlocked).length;

  const grid = el('div', { class: 'achievements-grid' });
  items.forEach(({ def, unlocked, justUnlocked: ju }) => {
    const card = el('div', {
      class: 'achievement' + (unlocked ? ' is-unlocked' : ' is-locked') + (ju ? ' is-fresh' : ''),
      title: def.desc,
      dataset: { spotlight: '' }
    },
      el('div', { class: 'ach-icon' }, def.icon),
      el('div', { class: 'ach-text' },
        el('div', { class: 'ach-title' }, def.title),
        el('div', { class: 'ach-desc' }, def.desc)
      ),
      unlocked ? el('div', { class: 'ach-check' }, icon('zap', { size: 14 })) : null
    );
    grid.appendChild(card);
  });

  // Celebrate any newly-unlocked achievements after a small delay.
  if (justUnlocked.length) {
    setTimeout(() => {
      const first = grid.querySelector('.achievement.is-fresh');
      if (first) confettiBurst(first, { count: 70 });
      sfx.unlock();
    }, 400);
  }

  return el('section', { class: 'section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, 'Achievements'),
        el('div', { class: 'lede' }, `${unlockedCount} von ${items.length} freigeschaltet`)
      )
    ),
    grid
  );
}


function renderNotificationSettings() {
  const status = getNotificationStatus();
  const { supported, permission, settings } = status;

  const wrap = el('section', { class: 'section notify-section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, '🔔 Tägliche Erinnerung'),
        el('div', { class: 'lede' }, supported
          ? 'Bekomme eine sanfte Benachrichtigung, damit dein Streak nicht reißt.'
          : 'Dein Browser unterstützt keine Benachrichtigungen — diese Funktion ist nicht verfügbar.')
      )
    )
  );

  if (!supported) {
    wrap.appendChild(el('div', { class: 'card' },
      el('div', { class: 'lede' }, 'Notifications werden vom Browser nicht unterstützt.')
    ));
    return wrap;
  }

  const timeInput = el('input', {
    type: 'time',
    value: `${String(settings.hour).padStart(2,'0')}:${String(settings.minute).padStart(2,'0')}`,
    class: 'time-input',
    style: { padding: '6px 10px', borderRadius: '8px', border: '1px solid var(--border, rgba(255,255,255,.15))', fontFamily: 'inherit' }
  });

  const enableBtn = el('button', {
    class: 'btn ' + (settings.enabled ? 'btn-secondary' : 'btn-primary'),
    dataset: { magnetic: '10' }
  }, settings.enabled ? 'Aktiv ✓ — deaktivieren' : 'Erinnerung aktivieren');

  const testBtn = el('button', {
    class: 'btn btn-ghost', dataset: { magnetic: '10' }
  }, '🔔 Test-Benachrichtigung');

  const statusLine = el('div', { class: 'lede', style: { fontSize: '.85rem', marginTop: '6px' } });
  const refreshStatus = () => {
    const s = getNotificationStatus();
    let txt;
    if (s.permission === 'denied') {
      txt = 'Permission wurde abgelehnt — bitte in den Browser-Einstellungen erlauben.';
    } else if (s.permission === 'default') {
      txt = 'Benachrichtigungen sind nicht aktiviert.';
    } else if (s.settings.enabled) {
      txt = `Aktiv — täglich um ${String(s.settings.hour).padStart(2,'0')}:${String(s.settings.minute).padStart(2,'0')}.`;
    } else {
      txt = 'Permission erteilt — Erinnerung ist aber ausgeschaltet.';
    }
    statusLine.textContent = txt;
  };
  refreshStatus();

  enableBtn.addEventListener('click', async () => {
    const cur = getNotificationStatus();
    if (cur.settings.enabled) {
      disableNotifications();
      enableBtn.textContent = 'Erinnerung aktivieren';
      enableBtn.classList.remove('btn-secondary');
      enableBtn.classList.add('btn-primary');
      refreshStatus();
      toast('Erinnerung deaktiviert', 'info', 1400);
      return;
    }
    const res = await enableNotifications();
    if (res.ok) {
      enableBtn.textContent = 'Aktiv ✓ — deaktivieren';
      enableBtn.classList.remove('btn-primary');
      enableBtn.classList.add('btn-secondary');
      toast('Erinnerung aktiviert 🔔', 'success', 1600);
    } else if (res.permission === 'denied') {
      toast('Permission wurde abgelehnt — bitte im Browser erlauben.', 'info', 2400);
    } else {
      toast('Permission nicht erteilt.', 'info', 1600);
    }
    refreshStatus();
  });

  timeInput.addEventListener('change', () => {
    const [h, m] = (timeInput.value || '19:00').split(':').map(Number);
    setNotificationSettings({ hour: h, minute: m });
    refreshStatus();
    toast(`Erinnerung auf ${timeInput.value} gesetzt`, 'success', 1200);
  });

  testBtn.addEventListener('click', async () => {
    const s = getNotificationStatus();
    if (s.permission !== 'granted') {
      const res = await enableNotifications();
      if (!res.ok) {
        toast('Bitte zuerst Benachrichtigungen erlauben.', 'info', 1800);
        return;
      }
    }
    const n = showNotification({
      title: 'Dialekto — Test 🔔',
      body: 'Wenn du das siehst, funktionieren Benachrichtigungen.',
      tag: 'dialekto-test',
      url: '#/lernen'
    });
    if (!n) toast('Test fehlgeschlagen — Browser blockt Benachrichtigungen.', 'info', 2000);
  });

  wrap.appendChild(el('div', { class: 'card notify-card', dataset: { spotlight: '' } },
    el('div', { class: 'notify-row', style: { display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' } },
      el('label', { style: { display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500' } },
        el('span', {}, 'Tägliche Uhrzeit'),
        timeInput
      ),
      enableBtn,
      testBtn
    ),
    statusLine
  ));

  return wrap;
}

function renderXpCard() {
  const xp = getXp();
  const { level, current, needed, progress } = xpToNextLevel(xp);
  const title = getLevelTitle(level);
  const log = getXpLog(5);
  const pct = Math.round(progress * 100);

  const reasonLabels = {
    'card-learned':   '📗 Karte gelernt',
    'card-reviewed':  '🔄 Karte wiederholt',
    'quiz-correct':   '✅ Quiz korrekt',
    'quiz-perfect':   '🏆 Quiz perfekt',
    'streak-day':     '🔥 Tages-Streak',
    'achievement':    '🏅 Achievement',
    'dialect-visit':  '📍 Dialekt besucht',
    'note-written':   '📝 Notiz geschrieben',
  };

  return el('section', { class: 'section', dataset: { reveal: '' } },
    el('div', { class: 'section-head' },
      el('div', {},
        el('h2', {}, 'Dein Fortschritt'),
        el('div', { class: 'lede' }, 'XP sammelst du durch Lernen, Quiz und tägliche Aktivität.')
      )
    ),
    el('div', { class: 'xp-card', dataset: { spotlight: '' } },
      el('div', { class: 'xp-card-head' },
        el('div', { class: 'xp-card-level' }, `${level}`),
        el('div', {},
          el('div', { class: 'xp-card-title' }, title),
          el('div', { class: 'xp-card-title-sub' }, `Level ${level} · ${xp} XP gesamt`)
        )
      ),
      el('div', { class: 'xp-card-bar-row' },
        el('div', { class: 'xp-card-bar', role: 'progressbar', ariaValuenow: pct, ariaValuemin: 0, ariaValuemax: 100 },
          el('div', { class: 'xp-card-bar-fill', style: { width: `${pct}%` } })
        ),
        el('span', { class: 'xp-card-bar-label' }, `${current}/${needed}`)
      ),
      log.length ? el('ul', { class: 'xp-log' },
        ...log.map(e => el('li', { class: 'xp-log-item' },
          el('span', {}, reasonLabels[e.reason] || e.reason),
          el('span', { class: 'xp-log-amount' }, `+${e.amount}`)
        ))
      ) : el('p', { class: 'xp-card-title-sub' }, 'Noch keine XP — lerne deine erste Karte!')
    )
  );
}

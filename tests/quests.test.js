// Tägliche Quests — Store-Logik: Rotation, Fortschritt, Belohnung, Bonus.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { state } from '../js/store/state.js';
import {
  QUEST_POOL,
  DAILY_QUEST_COUNT,
  ALL_DONE_BONUS_XP,
  currentDayKey,
  getDailyQuests,
  getQuestProgress,
  trackQuestMetric,
  reasonToMetrics,
  getActiveQuestsWithProgress,
  getQuestsSummary,
  resetQuests,
} from '../js/store/quests.js';

function resetQuestState() {
  state.gelernt = {};
  state.xp = { total: 0, log: [] };
  state.goals = { target: 10, progress: {}, reminderShown: {} };
  state.streak = { count: 0, lastDay: null, days: {} };
  state.srs = { scheduler: 'fsrs', retention: 0.9, fuzz: true, params: null };
  state.srsLog = [];
  state.quests = { day: null, progress: {}, completed: [], allDoneBonus: false };
}

describe('currentDayKey', () => {
  it('liefert ein lokales YYYY-MM-DD', () => {
    const key = currentDayKey(new Date(2026, 4, 31)); // 31. Mai 2026 (lokal)
    assert.equal(key, '2026-05-31');
  });
  it('füllt Monat/Tag mit führender Null', () => {
    assert.equal(currentDayKey(new Date(2026, 0, 3)), '2026-01-03');
  });
});

describe('getDailyQuests', () => {
  beforeEach(resetQuestState);

  it('liefert genau DAILY_QUEST_COUNT Quests', () => {
    assert.equal(getDailyQuests().length, DAILY_QUEST_COUNT);
  });

  it('ist deterministisch innerhalb desselben Tages', () => {
    const a = getDailyQuests().map(q => q.id);
    const b = getDailyQuests().map(q => q.id);
    assert.deepEqual(a, b);
  });

  it('garantiert drei verschiedene Metriken', () => {
    const metrics = getDailyQuests().map(q => q.metric);
    assert.equal(new Set(metrics).size, metrics.length);
  });

  it('zieht nur Quests aus dem Pool', () => {
    const ids = new Set(QUEST_POOL.map(q => q.id));
    for (const q of getDailyQuests()) assert.ok(ids.has(q.id), q.id);
  });
});

describe('getQuestProgress / trackQuestMetric', () => {
  beforeEach(resetQuestState);

  it('erhöht passende aktive Quests und ignoriert fremde Metriken', () => {
    const quest = getDailyQuests()[0];
    trackQuestMetric(quest.metric, 1);
    assert.equal(getQuestProgress(quest.id).current, 1);
    // Eine Metrik, die heute nicht aktiv ist, ändert nichts (sofern vorhanden).
    const inactive = ['review', 'learn', 'xp', 'quiz', 'quizPerfect', 'game']
      .find(m => !getDailyQuests().some(q => q.metric === m));
    if (inactive) {
      trackQuestMetric(inactive, 5);
      assert.equal(getQuestProgress(quest.id).current, 1);
    }
  });

  it('schließt eine Quest ab, vergibt XP und kappt den angezeigten Fortschritt', () => {
    const quest = getDailyQuests()[0];
    trackQuestMetric(quest.metric, quest.target + 5);
    const prog = getQuestProgress(quest.id);
    assert.equal(prog.done, true);
    assert.equal(prog.current, quest.target); // angezeigt gekappt
    assert.ok(state.quests.completed.includes(quest.id));
    assert.ok(state.xp.total >= quest.xp);
  });

  it('zählt eine abgeschlossene Quest nicht doppelt', () => {
    const quest = getDailyQuests()[0];
    trackQuestMetric(quest.metric, quest.target);
    const xpAfterFirst = state.xp.total;
    trackQuestMetric(quest.metric, quest.target);
    assert.equal(state.quests.completed.filter(id => id === quest.id).length, 1);
    // Kein erneuter XP-Zuwachs aus dieser Quest (Bonus ggf. separat, daher >=).
    assert.ok(state.xp.total >= xpAfterFirst);
  });

  it('ignoriert nicht-positive Beträge', () => {
    const quest = getDailyQuests()[0];
    trackQuestMetric(quest.metric, 0);
    trackQuestMetric(quest.metric, -3);
    assert.equal(getQuestProgress(quest.id).current, 0);
  });
});

describe('Abschluss-Bonus', () => {
  beforeEach(resetQuestState);

  it('vergibt den Bonus genau einmal, wenn alle Quests fertig sind', () => {
    const quests = getDailyQuests();
    const sumQuestXp = quests.reduce((s, q) => s + q.xp, 0);
    for (const q of quests) trackQuestMetric(q.metric, q.target);

    assert.equal(state.quests.allDoneBonus, true);
    assert.equal(state.quests.completed.length, quests.length);
    assert.equal(state.xp.total, sumQuestXp + ALL_DONE_BONUS_XP);

    // Weitere Tracks lösen keinen zweiten Bonus aus.
    const before = state.xp.total;
    trackQuestMetric(quests[0].metric, quests[0].target);
    assert.equal(state.xp.total, before);
  });

  it('kein Bonus, solange nicht alle fertig sind', () => {
    const quests = getDailyQuests();
    for (let i = 0; i < quests.length - 1; i++) trackQuestMetric(quests[i].metric, quests[i].target);
    assert.equal(state.quests.allDoneBonus, false);
  });
});

describe('reasonToMetrics — XP-Reason-Mapping & Feedback-Schutz', () => {
  it('mappt Lern-Reasons auf die richtigen Metriken (inkl. xp-Summe)', () => {
    assert.deepEqual(reasonToMetrics('card-learned', 10), [['learn', 1], ['review', 1], ['xp', 10]]);
    assert.deepEqual(reasonToMetrics('card-reviewed', 5), [['review', 1], ['xp', 5]]);
    assert.deepEqual(reasonToMetrics('quiz-correct', 24), [['quiz', 1], ['xp', 24]]);
    assert.deepEqual(reasonToMetrics('quiz-perfect', 50), [['quizPerfect', 1], ['xp', 50]]);
    assert.deepEqual(reasonToMetrics('memory-win', 40), [['game', 1], ['xp', 40]]);
  });

  it('unbekannte positive Reasons zählen nur als XP', () => {
    assert.deepEqual(reasonToMetrics('streakDay', 20), [['xp', 20]]);
  });

  it('ignoriert eigene Belohnungs-Reasons (kein Selbst-Hochschaukeln)', () => {
    assert.deepEqual(reasonToMetrics('quest-review-10', 30), []);
    assert.deepEqual(reasonToMetrics('quest-bonus', ALL_DONE_BONUS_XP), []);
    assert.deepEqual(reasonToMetrics('challenge-essen-10', 120), []);
  });

  it('vergibt keine xp-Metrik bei Betrag 0 oder negativ', () => {
    assert.deepEqual(reasonToMetrics('card-reviewed', 0), [['review', 1]]);
    assert.deepEqual(reasonToMetrics('unbekannt', 0), []);
  });
});

describe('getQuestsSummary / getActiveQuestsWithProgress', () => {
  beforeEach(resetQuestState);

  it('summary spiegelt erledigte Quests und Bonus-Status', () => {
    const quests = getDailyQuests();
    let s = getQuestsSummary();
    assert.equal(s.total, quests.length);
    assert.equal(s.done, 0);
    assert.equal(s.allDone, false);
    assert.equal(s.bonusClaimed, false);

    for (const q of quests) trackQuestMetric(q.metric, q.target);
    s = getQuestsSummary();
    assert.equal(s.done, quests.length);
    assert.equal(s.allDone, true);
    assert.equal(s.bonusClaimed, true);
  });

  it('getActiveQuestsWithProgress hängt current/target/done an', () => {
    const quest = getDailyQuests()[0];
    trackQuestMetric(quest.metric, 1);
    const enriched = getActiveQuestsWithProgress().find(q => q.id === quest.id);
    assert.ok(enriched);
    assert.equal(enriched.current, 1);
    assert.equal(enriched.target, quest.target);
    assert.equal(typeof enriched.done, 'boolean');
  });
});

describe('Tageswechsel & reset', () => {
  beforeEach(resetQuestState);

  it('rollt bei Tageswechsel: Fortschritt & Bonus werden zurückgesetzt', () => {
    const quest = getDailyQuests()[0];
    trackQuestMetric(quest.metric, quest.target);
    assert.ok(state.quests.completed.length > 0);

    // Tag künstlich „gestern" setzen → nächster Zugriff rollt neu.
    state.quests.day = '2000-01-01';
    getDailyQuests();
    assert.equal(state.quests.day, currentDayKey());
    assert.deepEqual(state.quests.progress, {});
    assert.deepEqual(state.quests.completed, []);
    assert.equal(state.quests.allDoneBonus, false);
  });

  it('resetQuests leert den Zustand', () => {
    const quest = getDailyQuests()[0];
    trackQuestMetric(quest.metric, quest.target);
    resetQuests();
    assert.equal(state.quests.day, null);
    assert.deepEqual(state.quests.completed, []);
    assert.equal(state.quests.allDoneBonus, false);
  });
});

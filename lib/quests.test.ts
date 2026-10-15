import { describe, it, expect, beforeEach, vi } from 'vitest';

const store = new Map<string, string>();
const localStorageMock = {
  getItem: (k: string) => store.get(k) ?? null,
  setItem: (k: string, v: string) => { store.set(k, String(v)); },
  removeItem: (k: string) => { store.delete(k); },
  clear: () => store.clear(),
};

vi.stubGlobal('window', {});
vi.stubGlobal('localStorage', localStorageMock);

import { getTodayQuests, recordQuestEvent, claimQuest } from './quests';
import { loadProgress } from './progress';

const QUEST_KEY = 'tradequest-quests';

describe('daily quests', { timeout: 30000 }, () => {
  beforeEach(() => {
    store.clear();
  });

  it('generates 3 quests for the day', () => {
    const quests = getTodayQuests();
    expect(quests).toHaveLength(3);
    quests.forEach(q => {
      expect(q.progress).toBe(0);
      expect(q.done).toBe(false);
      expect(q.claimed).toBe(false);
      expect(q.target).toBeGreaterThan(0);
      expect(q.reward).toBeGreaterThan(0);
    });
  });

  it('is deterministic within the same day', () => {
    store.clear();
    const a = getTodayQuests().map(q => q.id);
    store.delete(QUEST_KEY); // force reload → same date → same quests
    const b = getTodayQuests().map(q => q.id);
    expect(a).toEqual(b);
  });

  it('records matching events and marks quests done at target', () => {
    const quests = getTodayQuests();
    const lessonQuest = quests.find(q => q.type === 'lesson');
    if (!lessonQuest) {
      // No lesson quest today — record enough events to satisfy whatever exists
      quests.forEach(q => recordQuestEvent(q.type, q.target));
      expect(getTodayQuests().every(q => q.done)).toBe(true);
      return;
    }
    for (let i = 0; i < lessonQuest.target; i++) {
      recordQuestEvent('lesson', 1);
    }
    const updated = getTodayQuests().find(q => q.id === lessonQuest.id);
    expect(updated?.done).toBe(true);
    expect(updated?.progress).toBe(lessonQuest.target);
  });

  it('does not advance quests of other types', () => {
    const quests = getTodayQuests();
    const before = new Map(quests.map(q => [q.id, q.progress]));
    recordQuestEvent('trade', 5);
    const after = getTodayQuests();
    for (const q of after) {
      if (q.type === 'trade') {
        expect(q.progress).toBe(Math.min(q.target, (before.get(q.id) ?? 0) + 5));
      } else {
        expect(q.progress).toBe(before.get(q.id));
      }
    }
  });

  it('claimQuest pays XP once and refuses double claims', () => {
    const quests = getTodayQuests();
    const target = quests[0];
    recordQuestEvent(target.type, target.target);

    const before = loadProgress().totalXP;
    const paid = claimQuest(target.id);
    expect(paid).toBe(target.reward);
    expect(loadProgress().totalXP).toBe(before + target.reward);

    const again = claimQuest(target.id);
    expect(again).toBe(0);
    expect(loadProgress().totalXP).toBe(before + target.reward);
  });

  it('claimQuest refuses incomplete quests', () => {
    const quests = getTodayQuests();
    const incomplete = quests.find(q => !q.done);
    if (incomplete) {
      expect(claimQuest(incomplete.id)).toBe(0);
    }
  });

  it('regenerates quests when the stored date is stale', () => {
    getTodayQuests();
    const stored = JSON.parse(store.get(QUEST_KEY)!);
    stored.date = 'Mon Jan 01 2001';
    store.set(QUEST_KEY, JSON.stringify(stored));
    const quests = getTodayQuests();
    expect(quests.every(q => q.progress === 0 && !q.claimed)).toBe(true);
    expect(JSON.parse(store.get(QUEST_KEY)!).date).toBe(new Date().toDateString());
  });
});

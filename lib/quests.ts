/**
 * Daily quests — a date-seeded set of 3 goals per day.
 * Progress is recorded via recordQuestEvent() from the app's action points
 * (lesson completion, trades, correct answers) and persisted under its own
 * localStorage key. Claimed rewards award bonus XP through progress.ts.
 */

import { loadProgress, saveProgress, calculateLevel } from './progress';

export type QuestType = 'lesson' | 'trade' | 'correct' | 'xp';

export interface QuestDef {
  type: QuestType;
  target: number;
  reward: number;
  label: string;
  icon: string;
}

export interface Quest extends QuestDef {
  id: string;
  progress: number;
  done: boolean;
  claimed: boolean;
}

const QUEST_POOL: QuestDef[] = [
  { type: 'lesson', target: 1, reward: 30, label: 'Complete a lesson', icon: '📚' },
  { type: 'lesson', target: 2, reward: 60, label: 'Complete 2 lessons', icon: '🎓' },
  { type: 'lesson', target: 3, reward: 100, label: 'Complete 3 lessons', icon: '🏆' },
  { type: 'trade', target: 2, reward: 30, label: 'Make 2 trades', icon: '📈' },
  { type: 'trade', target: 5, reward: 70, label: 'Make 5 trades', icon: '💹' },
  { type: 'correct', target: 8, reward: 40, label: 'Answer 8 questions correctly', icon: '🎯' },
  { type: 'correct', target: 15, reward: 80, label: 'Answer 15 questions correctly', icon: '🔥' },
  { type: 'xp', target: 100, reward: 40, label: 'Earn 100 XP', icon: '⭐' },
  { type: 'xp', target: 250, reward: 90, label: 'Earn 250 XP', icon: '💎' },
];

const QUEST_KEY = 'tradequest-quests';
const QUESTS_PER_DAY = 3;

interface StoredQuests {
  date: string;
  quests: Quest[];
}

const todayKey = () => new Date().toDateString();

/** Deterministic daily pick: same 3 quests all day, different each day. */
function seedFromString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  }
  return h;
}

function pickQuests(date: string): Quest[] {
  const seed = seedFromString(date);
  // Deterministic shuffle of pool indices — always terminates.
  const indices = QUEST_POOL
    .map((_, i) => i)
    .sort((a, b) => (((a * 2654435761 + seed) >>> 0) % 97) - (((b * 2654435761 + seed) >>> 0) % 97));

  const picked: QuestDef[] = [];
  const seenTypes = new Set<QuestType>();
  // Prefer variety: take one quest per type first
  for (const idx of indices) {
    if (picked.length === QUESTS_PER_DAY) break;
    if (!seenTypes.has(QUEST_POOL[idx].type)) {
      picked.push(QUEST_POOL[idx]);
      seenTypes.add(QUEST_POOL[idx].type);
    }
  }
  // Fill any remainder with whatever is left
  for (const idx of indices) {
    if (picked.length === QUESTS_PER_DAY) break;
    if (!picked.includes(QUEST_POOL[idx])) picked.push(QUEST_POOL[idx]);
  }

  return picked.map((def, idx) => ({
    ...def,
    id: `${date}-${def.type}-${idx}`,
    progress: 0,
    done: false,
    claimed: false,
  }));
}

function load(): StoredQuests {
  const today = todayKey();
  if (typeof window === 'undefined') {
    return { date: today, quests: pickQuests(today) };
  }
  try {
    const raw = localStorage.getItem(QUEST_KEY);
    if (raw) {
      const stored = JSON.parse(raw) as StoredQuests;
      if (stored.date === today && Array.isArray(stored.quests)) return stored;
    }
  } catch {
    // corrupt storage — regenerate
  }
  const fresh: StoredQuests = { date: today, quests: pickQuests(today) };
  try {
    localStorage.setItem(QUEST_KEY, JSON.stringify(fresh));
  } catch { /* storage blocked — quests just won't persist */ }
  return fresh;
}

function persist(state: StoredQuests): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(QUEST_KEY, JSON.stringify(state));
  } catch { /* ignore */ }
}

/** Today's quests with progress — regenerates automatically on a new day. */
export const getTodayQuests = (): Quest[] => load().quests;

/**
 * Record progress toward today's quests. Call from action points:
 *   recordQuestEvent('lesson', 1)   — when a lesson is completed
 *   recordQuestEvent('trade', 1)    — when a trade executes
 *   recordQuestEvent('correct', 1)  — for each correct answer
 *   recordQuestEvent('xp', amount)  — when XP is earned
 * Returns the updated quest list so callers can refresh UI or toast.
 */
export const recordQuestEvent = (type: QuestType, amount = 1): Quest[] => {
  const state = load();
  for (const q of state.quests) {
    if (q.type !== type || q.done) continue;
    q.progress = Math.min(q.target, q.progress + amount);
    if (q.progress >= q.target) q.done = true;
  }
  persist(state);
  return state.quests;
};

/**
 * Claim a completed quest's XP reward. Returns the reward amount, or 0 if
 * the quest isn't claimable.
 */
export const claimQuest = (questId: string): number => {
  const state = load();
  const quest = state.quests.find(q => q.id === questId);
  if (!quest || !quest.done || quest.claimed) return 0;

  quest.claimed = true;
  persist(state);

  const progress = loadProgress();
  saveProgress({
    ...progress,
    totalXP: progress.totalXP + quest.reward,
    level: calculateLevel(progress.totalXP + quest.reward),
  });
  return quest.reward;
};

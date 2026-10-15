import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { UserProgress } from '@/types';

const store = new Map<string, string>();
const localStorageMock = {
  getItem: (k: string) => store.get(k) ?? null,
  setItem: (k: string, v: string) => { store.set(k, String(v)); },
  removeItem: (k: string) => { store.delete(k); },
  clear: () => store.clear(),
};

vi.stubGlobal('window', {});
vi.stubGlobal('localStorage', localStorageMock);

// Imports must come after globals are stubbed — progress.ts reads window lazily,
// but keeping it at top is fine since it only checks typeof window at call time.
import {
  loadProgress,
  saveProgress,
  completeLesson,
  updateStreak,
  getStreakBonus,
  activatePremium,
  cancelPremium,
  checkPremiumStatus,
  getPremiumMultiplier,
  canStartLesson,
  canTrade,
  consumeTrade,
  getUsage,
  getRemainingUsage,
  FREE_DAILY_LESSONS,
  FREE_DAILY_TRADES,
} from './progress';

const STORAGE_KEY = 'trading-duolingo-progress';

const baseProgress = (overrides: Partial<UserProgress> = {}): UserProgress => ({
  completedLessons: [],
  currentStreak: 0,
  longestStreak: 0,
  totalXP: 0,
  level: 1,
  lastActiveDate: new Date().toISOString(),
  streakFreezes: 3,
  totalDaysActive: 0,
  isPremium: false,
  premiumExpiry: null,
  ...overrides,
});

const seedProgress = (overrides: Partial<UserProgress> = {}) => {
  saveProgress(baseProgress(overrides));
};

const yesterday = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d;
};

beforeEach(() => {
  store.clear();
});

describe('loadProgress', () => {
  it('returns defaults for a fresh user', () => {
    const p = loadProgress();
    expect(p.completedLessons).toEqual([]);
    expect(p.totalXP).toBe(0);
    expect(p.isPremium).toBe(false);
  });

  it('round-trips saved progress', () => {
    seedProgress({ totalXP: 500, level: 3 });
    const p = loadProgress();
    expect(p.totalXP).toBe(500);
    expect(p.level).toBe(3);
  });

  it('migrates missing fields for stored legacy data', () => {
    store.set(STORAGE_KEY, JSON.stringify({ completedLessons: ['a'], totalXP: 10 }));
    const p = loadProgress();
    expect(p.streakFreezes).toBe(3);
    expect(p.isPremium).toBe(false);
  });
});

describe('daily usage limits', () => {
  it('allows a free user to start lessons up to the daily cap', () => {
    seedProgress({ usageDate: new Date().toDateString(), dailyLessonsUsed: FREE_DAILY_LESSONS - 1 });
    expect(canStartLesson(loadProgress())).toBe(true);
    seedProgress({ usageDate: new Date().toDateString(), dailyLessonsUsed: FREE_DAILY_LESSONS });
    expect(canStartLesson(loadProgress())).toBe(false);
  });

  it('allows a free user to trade up to the daily cap', () => {
    seedProgress({ usageDate: new Date().toDateString(), dailyTradesUsed: FREE_DAILY_TRADES - 1 });
    expect(canTrade(loadProgress())).toBe(true);
    seedProgress({ usageDate: new Date().toDateString(), dailyTradesUsed: FREE_DAILY_TRADES });
    expect(canTrade(loadProgress())).toBe(false);
  });

  it('premium users bypass both caps', () => {
    seedProgress({
      isPremium: true,
      premiumExpiry: null,
      usageDate: new Date().toDateString(),
      dailyLessonsUsed: 999,
      dailyTradesUsed: 999,
    });
    const p = loadProgress();
    expect(canStartLesson(p)).toBe(true);
    expect(canTrade(p)).toBe(true);
  });

  it('resets usage when the stored date is a previous day', () => {
    seedProgress({
      usageDate: yesterday().toDateString(),
      dailyLessonsUsed: 99,
      dailyTradesUsed: 99,
    });
    const usage = getUsage(loadProgress());
    expect(usage.lessonsUsed).toBe(0);
    expect(usage.tradesUsed).toBe(0);
  });

  it('consumeTrade increments today\'s trade count', () => {
    seedProgress({ usageDate: new Date().toDateString(), dailyTradesUsed: 3 });
    consumeTrade();
    const usage = getUsage(loadProgress());
    expect(usage.tradesUsed).toBe(4);
  });

  it('getRemainingUsage reports the correct remainder', () => {
    seedProgress({ usageDate: new Date().toDateString(), dailyLessonsUsed: 2, dailyTradesUsed: 5 });
    const remaining = getRemainingUsage(loadProgress());
    expect(remaining.lessons).toBe(FREE_DAILY_LESSONS - 2);
    expect(remaining.trades).toBe(FREE_DAILY_TRADES - 5);
  });
});

describe('completeLesson', () => {
  it('awards XP, marks the lesson complete, and counts daily usage', () => {
    seedProgress();
    const p = completeLesson('lesson-1', 100);
    expect(p.completedLessons).toContain('lesson-1');
    expect(p.totalXP).toBe(100);
    expect(p.dailyLessonsUsed).toBe(1);
  });

  it('does not double-count a completed lesson', () => {
    seedProgress({ completedLessons: ['lesson-1'], totalXP: 100 });
    const p = completeLesson('lesson-1', 100);
    expect(p.totalXP).toBe(100);
  });

  it('doubles XP for premium users', () => {
    seedProgress({ isPremium: true, premiumExpiry: null });
    const p = completeLesson('lesson-1', 100);
    expect(p.totalXP).toBe(200);
  });
});

describe('streaks', () => {
  it('does not change the streak when already active today', () => {
    const p = updateStreak(baseProgress({ currentStreak: 5, lastActiveDate: new Date().toISOString() }));
    expect(p.currentStreak).toBe(5);
  });

  it('increments the streak when last active yesterday', () => {
    const p = updateStreak(baseProgress({ currentStreak: 3, longestStreak: 8, lastActiveDate: yesterday().toISOString() }));
    expect(p.currentStreak).toBe(4);
    expect(p.longestStreak).toBe(8);
  });

  it('resets the streak to 1 after a gap, keeping the longest', () => {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const p = updateStreak(baseProgress({ currentStreak: 10, longestStreak: 10, lastActiveDate: threeDaysAgo.toISOString() }));
    expect(p.currentStreak).toBe(1);
    expect(p.longestStreak).toBe(10);
  });

  it('returns correct bonus tiers', () => {
    expect(getStreakBonus(0)).toBe(0);
    expect(getStreakBonus(3)).toBe(5);
    expect(getStreakBonus(7)).toBe(15);
    expect(getStreakBonus(14)).toBe(25);
    expect(getStreakBonus(21)).toBe(35);
    expect(getStreakBonus(30)).toBe(50);
  });
});

describe('premium', () => {
  it('activatePremium grants premium with a future expiry', () => {
    seedProgress();
    const p = activatePremium('monthly');
    expect(p.isPremium).toBe(true);
    expect(new Date(p.premiumExpiry!).getTime()).toBeGreaterThan(Date.now());
  });

  it('checkPremiumStatus returns false for expired subscriptions and clears the flag', () => {
    const expired = new Date();
    expired.setDate(expired.getDate() - 1);
    const p = baseProgress({ isPremium: true, premiumExpiry: expired.toISOString() });
    expect(checkPremiumStatus(p)).toBe(false);
    expect(JSON.parse(store.get(STORAGE_KEY)!).isPremium).toBe(false);
  });

  it('checkPremiumStatus returns true for valid premium', () => {
    const future = new Date();
    future.setDate(future.getDate() + 30);
    const p = baseProgress({ isPremium: true, premiumExpiry: future.toISOString() });
    expect(checkPremiumStatus(p)).toBe(true);
  });

  it('cancelPremium revokes premium immediately', () => {
    seedProgress({ isPremium: true });
    const p = cancelPremium();
    expect(p.isPremium).toBe(false);
    expect(p.premiumExpiry).toBeNull();
  });

  it('getPremiumMultiplier is 2x for premium, 1x otherwise', () => {
    expect(getPremiumMultiplier(baseProgress({ isPremium: true, premiumExpiry: null }))).toBe(2);
    expect(getPremiumMultiplier(baseProgress())).toBe(1);
  });
});

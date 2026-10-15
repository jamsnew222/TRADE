import { describe, it, expect, vi } from 'vitest';
import type { UserProgress } from '@/types';

vi.stubGlobal('window', {});

import { mergeProgress } from './progress-sync';

const base = (overrides: Partial<UserProgress> = {}): UserProgress => ({
  completedLessons: [],
  currentStreak: 0,
  longestStreak: 0,
  totalXP: 0,
  level: 1,
  lastActiveDate: '2024-01-01',
  ...overrides,
});

describe('mergeProgress', () => {
  it('returns local progress when no cloud data exists', () => {
    const local = base({ totalXP: 500, completedLessons: ['a', 'b'] });
    expect(mergeProgress(local, undefined)).toEqual(local);
  });

  it('unions completed lessons without duplicates', () => {
    const merged = mergeProgress(
      base({ completedLessons: ['a', 'b'] }),
      { completedLessons: ['b', 'c'] },
    );
    expect(merged.completedLessons.sort()).toEqual(['a', 'b', 'c']);
  });

  it('keeps the higher XP, level and streaks', () => {
    const merged = mergeProgress(
      base({ totalXP: 900, level: 4, currentStreak: 2, longestStreak: 5 }),
      { totalXP: 300, level: 2, currentStreak: 7, longestStreak: 3 },
    );
    expect(merged.totalXP).toBe(900);
    expect(merged.level).toBe(4);
    expect(merged.currentStreak).toBe(7);
    expect(merged.longestStreak).toBe(5);
  });

  it('takes the newer lastActiveDate', () => {
    const merged = mergeProgress(
      base({ lastActiveDate: '2024-03-10' }),
      { lastActiveDate: '2024-06-01' },
    );
    expect(merged.lastActiveDate).toBe('2024-06-01');
  });

  it('keeps the stricter daily usage when both sides are the same day', () => {
    const merged = mergeProgress(
      base({ usageDate: '2024-06-01', dailyLessonsUsed: 4, dailyTradesUsed: 10 }),
      { usageDate: '2024-06-01', dailyLessonsUsed: 1, dailyTradesUsed: 20 },
    );
    expect(merged.dailyLessonsUsed).toBe(4);
    expect(merged.dailyTradesUsed).toBe(20);
  });

  it('uses the newer usageDate counters when days differ', () => {
    const merged = mergeProgress(
      base({ usageDate: '2024-06-02', dailyLessonsUsed: 2 }),
      { usageDate: '2024-06-01', dailyLessonsUsed: 5 },
    );
    expect(merged.usageDate).toBe('2024-06-02');
    expect(merged.dailyLessonsUsed).toBe(2);
  });

  it('keeps the later premium bonus month (prevents double-dipping)', () => {
    const merged = mergeProgress(
      base({ lastPremiumBonusMonth: '2024-05' }),
      { lastPremiumBonusMonth: '2024-06' },
    );
    expect(merged.lastPremiumBonusMonth).toBe('2024-06');
  });

  it('treats premium as active if either side has it', () => {
    expect(mergeProgress(base({ isPremium: true }), { isPremium: false }).isPremium).toBe(true);
    expect(mergeProgress(base(), { isPremium: true }).isPremium).toBe(true);
  });

  it('fills profile fields from whichever side has them', () => {
    const merged = mergeProgress(
      base({ profileName: 'Trader' }),
      { profileAvatar: '🦊', tradingStyle: 'day-trader' as UserProgress['tradingStyle'] },
    );
    expect(merged.profileName).toBe('Trader');
    expect(merged.profileAvatar).toBe('🦊');
    expect(merged.tradingStyle).toBe('day-trader');
  });
});

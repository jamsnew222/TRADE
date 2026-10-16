import { UserProgress, Lesson } from '@/types';
import { tradingStyles } from '@/data/trading-styles';

const STORAGE_KEY = 'trading-duolingo-progress';

export const calculateLevel = (xp: number): number => {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

export const getNextLevelXP = (level: number): number => {
  return Math.pow(level, 2) * 100;
};

export const loadProgress = (): UserProgress => {
  if (typeof window === 'undefined') {
    return {
      completedLessons: [],
      currentStreak: 0,
      longestStreak: 0,
      totalXP: 0,
      level: 1,
      lastActiveDate: new Date().toISOString(),
      streakFreezes: 3,
      totalDaysActive: 0,
      isPremium: false,
      premiumExpiry: null
    };
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const parsed = JSON.parse(stored);
    // Ensure new fields exist for existing data
    return {
      ...parsed,
      longestStreak: parsed.longestStreak || 0,
      streakFreezes: parsed.streakFreezes || 3,
      totalDaysActive: parsed.totalDaysActive || 0,
      isPremium: parsed.isPremium || false,
      premiumExpiry: parsed.premiumExpiry ?? null
    };
  }

  return {
    completedLessons: [],
    currentStreak: 0,
    longestStreak: 0,
    totalXP: 0,
    level: 1,
    lastActiveDate: new Date().toISOString(),
    streakFreezes: 3,
    totalDaysActive: 0,
    isPremium: false,
    premiumExpiry: null
  };
};

export const saveTradingStyle = (tradingStyle: string): void => {
  if (typeof window !== 'undefined') {
    const progress = loadProgress();
    progress.tradingStyle = tradingStyle as 'day-trading' | 'swing-trading' | 'long-term-investing' | 'balanced';
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }
};

// Registered by lib/progress-sync.ts — invoked after every save so signed-in
// users' progress uploads to Firestore. Kept as a registration hook to avoid
// a circular import (progress-sync reads via loadProgress()).
let progressUploader: ((p: UserProgress) => void) | null = null;
export const registerProgressUploader = (fn: (p: UserProgress) => void): void => {
  progressUploader = fn;
};
export const notifyProgressSaved = (progress: UserProgress): void => {
  try { progressUploader?.(progress); } catch { /* sync must never break saves */ }
};

export const saveProfile = (name: string, avatar: string): UserProgress => {
  const progress = loadProgress();
  const updated = {
    ...progress,
    profileName: name.trim().slice(0, 24) || undefined,
    profileAvatar: avatar || undefined,
  };
  saveProgress(updated);
  return updated;
};

export const saveProgress = (progress: UserProgress): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    notifyProgressSaved(progress);
  }
};

const DAY_MS = 86400000;
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

/**
 * Consume streak freezes to cover missed days — one freeze per missed day,
 * Duolingo-style. Each freeze advances lastActiveDate by one day (freezes
 * count the missed day but are never "today" — they don't create activity).
 * Premium = unlimited freezes. Returns progress unchanged when nothing needed
 * covering or no freezes remain.
 */
const applyStreakFreezes = (progress: UserProgress): UserProgress => {
  const lastActive = startOfDay(new Date(progress.lastActiveDate));
  const today = startOfDay(new Date());
  // Full calendar days skipped — active yesterday means 0 missed
  const daysMissed = Math.floor((today.getTime() - lastActive.getTime()) / DAY_MS) - 1;
  if (daysMissed <= 0) return progress;

  const available = progress.isPremium ? daysMissed : Math.max(0, progress.streakFreezes ?? 0);
  const covered = Math.min(daysMissed, available);
  if (covered === 0) return progress;

  return {
    ...progress,
    lastActiveDate: new Date(lastActive.getTime() + covered * DAY_MS).toISOString(),
    streakFreezes: progress.isPremium
      ? progress.streakFreezes
      : (progress.streakFreezes ?? 0) - covered,
  };
};

export const updateStreak = (progress: UserProgress): UserProgress => {
  const today = new Date().toDateString();
  const lastActive = new Date(progress.lastActiveDate).toDateString();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (today === lastActive) {
    // Already active today, no change
    return progress;
  }

  // Missed day(s) — freezes cover the gap before the streak is judged
  const withFreezes = applyStreakFreezes(progress);
  const effectiveLast = new Date(withFreezes.lastActiveDate).toDateString();

  if (yesterday.toDateString() === effectiveLast) {
    // Active yesterday (or freezes covered the gap), increment streak
    const newStreak = withFreezes.currentStreak + 1;
    const newLongestStreak = Math.max(withFreezes.longestStreak || 0, newStreak);
    return {
      ...withFreezes,
      currentStreak: newStreak,
      longestStreak: newLongestStreak,
      lastActiveDate: new Date().toISOString(),
      totalDaysActive: (withFreezes.totalDaysActive || 0) + 1
    };
  }

  // Streak broken — freezes couldn't cover the gap
  return {
    ...withFreezes,
    currentStreak: 1,
    lastActiveDate: new Date().toISOString(),
    totalDaysActive: (withFreezes.totalDaysActive || 0) + 1
  };
};

/**
 * App-open reconciliation: an honest streak display before any lesson runs.
 * Consumes freezes to cover the gap (streak survives untouched), or zeroes the
 * streak — but never marks today active and never increments. Saves only when
 * something actually changed.
 */
export const reconcileStreak = (progress: UserProgress): UserProgress => {
  const today = new Date().toDateString();
  const lastActive = new Date(progress.lastActiveDate).toDateString();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (lastActive === today || lastActive === yesterday.toDateString()) {
    return progress; // streak is current — nothing to judge
  }

  const withFreezes = applyStreakFreezes(progress);
  const survived =
    new Date(withFreezes.lastActiveDate).toDateString() === yesterday.toDateString();
  const next = survived ? withFreezes : { ...withFreezes, currentStreak: 0 };

  if (next !== progress) saveProgress(next);
  return next;
};

export const getStreakBonus = (streak: number): number => {
  // Bonus XP for maintaining streaks
  if (streak >= 30) return 50; // 30 day streak
  if (streak >= 21) return 35; // 21 day streak
  if (streak >= 14) return 25; // 14 day streak
  if (streak >= 7) return 15;  // 7 day streak
  if (streak >= 3) return 5; // 3 day streak
  return 0;
};

export const activatePremium = (plan: 'monthly' | 'yearly'): UserProgress => {
  const progress = loadProgress();
  const now = new Date();
  const expiryDate = plan === 'monthly'
    ? new Date(now.setMonth(now.getMonth() + 1))
    : new Date(now.setFullYear(now.getFullYear() + 1));

  const updatedProgress = {
    ...progress,
    isPremium: true,
    premiumExpiry: expiryDate.toISOString()
  };

  saveProgress(updatedProgress);
  return updatedProgress;
};

export const checkPremiumStatus = (progress: UserProgress): boolean => {
  if (!progress.isPremium) return false;

  if (progress.premiumExpiry) {
    const expiry = new Date(progress.premiumExpiry);
    const now = new Date();
    if (now > expiry) {
      // Premium expired
      const updatedProgress = {
        ...progress,
        isPremium: false,
        premiumExpiry: null
      };
      saveProgress(updatedProgress);
      return false;
    }
  }

  return true;
};

export const cancelPremium = (): UserProgress => {
  const progress = loadProgress();
  const updatedProgress = {
    ...progress,
    isPremium: false,
    premiumExpiry: null
  };
  saveProgress(updatedProgress);
  return updatedProgress;
};

export const getPremiumMultiplier = (progress: UserProgress): number => {
  return checkPremiumStatus(progress) ? 2 : 1;
};

// Premium perk: +500 XP once per calendar month, granted on app load.
export const PREMIUM_MONTHLY_XP = 500;
export const grantMonthlyPremiumBonus = (): UserProgress => {
  const progress = loadProgress();
  const month = new Date().toISOString().slice(0, 7); // YYYY-MM
  if (!checkPremiumStatus(progress) || progress.lastPremiumBonusMonth === month) {
    return progress;
  }
  const totalXP = progress.totalXP + PREMIUM_MONTHLY_XP;
  const updated = { ...progress, totalXP, level: calculateLevel(totalXP), lastPremiumBonusMonth: month };
  saveProgress(updated);
  return updated;
};

// ---------- Free-tier daily usage limits ----------

export const FREE_DAILY_LESSONS = 5;
export const FREE_DAILY_TRADES = 25;

const todayKey = () => new Date().toDateString();

export const getUsage = (progress: UserProgress): { lessonsUsed: number; tradesUsed: number } => {
  if (progress.usageDate !== todayKey()) {
    return { lessonsUsed: 0, tradesUsed: 0 };
  }
  return {
    lessonsUsed: progress.dailyLessonsUsed || 0,
    tradesUsed: progress.dailyTradesUsed || 0,
  };
};

export const canStartLesson = (progress: UserProgress): boolean => {
  if (checkPremiumStatus(progress)) return true;
  return getUsage(progress).lessonsUsed < FREE_DAILY_LESSONS;
};

export const canTrade = (progress: UserProgress): boolean => {
  if (checkPremiumStatus(progress)) return true;
  return getUsage(progress).tradesUsed < FREE_DAILY_TRADES;
};

export const getRemainingUsage = (progress: UserProgress): { lessons: number; trades: number } => {
  const usage = getUsage(progress);
  return {
    lessons: Math.max(0, FREE_DAILY_LESSONS - usage.lessonsUsed),
    trades: Math.max(0, FREE_DAILY_TRADES - usage.tradesUsed),
  };
};

export const consumeTrade = (): UserProgress => {
  const progress = loadProgress();
  const usage = getUsage(progress);
  const updated = {
    ...progress,
    usageDate: todayKey(),
    dailyLessonsUsed: usage.lessonsUsed,
    dailyTradesUsed: usage.tradesUsed + 1,
  };
  saveProgress(updated);
  return updated;
};

export const completeLesson = (lessonId: string, xpReward: number): UserProgress => {
  const progress = loadProgress();

  if (progress.completedLessons.includes(lessonId)) {
    return progress; // Already completed
  }

  // Apply premium multiplier if active
  const premiumMultiplier = getPremiumMultiplier(progress);
  const finalXP = xpReward * premiumMultiplier;

  // Award streak freeze every 5 lessons completed (non-premium only)
  const lessonsCount = progress.completedLessons.length;
  const newStreakFreezes = !progress.isPremium && (lessonsCount + 1) % 5 === 0
    ? (progress.streakFreezes || 0) + 1
    : (progress.streakFreezes || 0);

  // Count toward the daily free-tier lesson limit
  const usage = getUsage(progress);

  const updatedProgress = {
    ...progress,
    completedLessons: [...progress.completedLessons, lessonId],
    totalXP: progress.totalXP + finalXP,
    level: calculateLevel(progress.totalXP + finalXP),
    streakFreezes: newStreakFreezes,
    usageDate: todayKey(),
    dailyLessonsUsed: usage.lessonsUsed + 1,
    dailyTradesUsed: usage.tradesUsed
  };

  const withStreak = updateStreak(updatedProgress);
  saveProgress(withStreak);

  return withStreak;
};

export const getLessonsByCategory = (lessons: Lesson[], category: string): Lesson[] => {
  return lessons.filter(lesson => lesson.category === category);
};

export const getAvailableLessons = (lessons: Lesson[], progress: UserProgress): Lesson[] => {
  return lessons.filter(lesson => {
    if (progress.completedLessons.includes(lesson.id)) {
      return false; // Already completed
    }
    
    if (lesson.prerequisites) {
      const hasPrerequisites = lesson.prerequisites.every(prereq => 
        progress.completedLessons.includes(prereq)
      );
      return hasPrerequisites;
    }
    
    return true;
  });
};

export const getRecommendedLessons = (lessons: Lesson[], progress: UserProgress): Lesson[] => {
  if (!progress.tradingStyle || progress.tradingStyle === 'balanced') {
    return getAvailableLessons(lessons, progress);
  }

  const styleInfo = tradingStyles.find(s => s.id === progress.tradingStyle);
  if (!styleInfo) {
    return getAvailableLessons(lessons, progress);
  }

  // Prioritize recommended lessons for the selected style
  const recommendedLessonIds = styleInfo.recommendedLessons;
  
  return lessons
    .filter(lesson => {
      if (progress.completedLessons.includes(lesson.id)) {
        return false;
      }
      
      if (lesson.prerequisites) {
        const hasPrerequisites = lesson.prerequisites.every(prereq => 
          progress.completedLessons.includes(prereq)
        );
        return hasPrerequisites;
      }
      
      return true;
    })
    .sort((a, b) => {
      const aRecommended = recommendedLessonIds.includes(a.id);
      const bRecommended = recommendedLessonIds.includes(b.id);
      
      if (aRecommended && !bRecommended) return -1;
      if (!aRecommended && bRecommended) return 1;
      return 0;
    });
};
import { UserProgress, Lesson, TradingStyle } from '@/types';
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
    progress.tradingStyle = tradingStyle as any;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }
};

export const saveProgress = (progress: UserProgress): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }
};

export const updateStreak = (progress: UserProgress): UserProgress => {
  const today = new Date().toDateString();
  const lastActive = new Date(progress.lastActiveDate).toDateString();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (today === lastActive) {
    // Already active today, no change
    return progress;
  } else if (yesterday.toDateString() === lastActive) {
    // Active yesterday, increment streak
    const newStreak = progress.currentStreak + 1;
    const newLongestStreak = Math.max(progress.longestStreak || 0, newStreak);
    return {
      ...progress,
      currentStreak: newStreak,
      longestStreak: newLongestStreak,
      lastActiveDate: new Date().toISOString(),
      totalDaysActive: (progress.totalDaysActive || 0) + 1
    };
  } else {
    // Streak broken or first time
    return {
      ...progress,
      currentStreak: 1,
      lastActiveDate: new Date().toISOString(),
      totalDaysActive: (progress.totalDaysActive || 0) + 1
    };
  }
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

export const useStreakFreeze = (progress: UserProgress): UserProgress => {
  // Premium users have unlimited freezes
  if (progress.isPremium) {
    // Reset streak to preserve it instead of breaking
    const today = new Date().toDateString();
    const lastActive = new Date(progress.lastActiveDate).toDateString();

    if (today !== lastActive) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (yesterday.toDateString() !== lastActive) {
        progress.lastActiveDate = new Date().toISOString();
      }
    }
    saveProgress(progress);
    return progress;
  }

  if (!progress.streakFreezes || progress.streakFreezes <= 0) {
    return progress;
  }

  progress.streakFreezes -= 1;
  // Reset streak to preserve it instead of breaking
  const today = new Date().toDateString();
  const lastActive = new Date(progress.lastActiveDate).toDateString();

  // If missed a day, use a freeze
  if (today !== lastActive) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (yesterday.toDateString() !== lastActive) {
      // Missed more than one day, still use freeze but don't reset
      progress.lastActiveDate = new Date().toISOString();
    }
  }

  saveProgress(progress);
  return progress;
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

  const updatedProgress = {
    ...progress,
    completedLessons: [...progress.completedLessons, lessonId],
    totalXP: progress.totalXP + finalXP,
    level: calculateLevel(progress.totalXP + finalXP),
    streakFreezes: newStreakFreezes
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
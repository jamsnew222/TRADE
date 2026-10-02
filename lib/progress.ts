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
      totalXP: 0,
      level: 1,
      lastActiveDate: new Date().toISOString()
    };
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }

  return {
    completedLessons: [],
    currentStreak: 0,
    totalXP: 0,
    level: 1,
    lastActiveDate: new Date().toISOString()
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
    return {
      ...progress,
      currentStreak: progress.currentStreak + 1,
      lastActiveDate: new Date().toISOString()
    };
  } else {
    // Streak broken or first time
    return {
      ...progress,
      currentStreak: 1,
      lastActiveDate: new Date().toISOString()
    };
  }
};

export const completeLesson = (lessonId: string, xpReward: number): UserProgress => {
  const progress = loadProgress();
  
  if (progress.completedLessons.includes(lessonId)) {
    return progress; // Already completed
  }

  const updatedProgress = {
    ...progress,
    completedLessons: [...progress.completedLessons, lessonId],
    totalXP: progress.totalXP + xpReward,
    level: calculateLevel(progress.totalXP + xpReward)
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
import { Achievement, UserProgress } from '@/types';
import { achievements } from '@/data/achievements';
import { lessons } from '@/data/lessons';

const ACHIEVEMENTS_KEY = 'tradequest-achievements';

export const loadAchievements = (): Achievement[] => {
  if (typeof window === 'undefined') {
    return achievements;
  }

  const stored = localStorage.getItem(ACHIEVEMENTS_KEY);
  if (stored) {
    return JSON.parse(stored);
  }

  return achievements;
};

export const saveAchievements = (achievementsData: Achievement[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievementsData));
  }
};

export const checkAchievements = (progress: UserProgress): Achievement[] => {
  const currentAchievements = loadAchievements();
  let updated = false;

  const updatedAchievements = currentAchievements.map(achievement => {
    if (achievement.unlocked) return achievement;

    let shouldUnlock = false;

    switch (achievement.requirement.type) {
      case 'lessons_completed':
        shouldUnlock = progress.completedLessons.length >= achievement.requirement.value;
        break;
      case 'total_xp':
        shouldUnlock = progress.totalXP >= achievement.requirement.value;
        break;
      case 'streak':
        shouldUnlock = progress.currentStreak >= achievement.requirement.value;
        break;
      case 'category_completed':
        if (achievement.requirement.category) {
          const categoryLessons = lessons.filter(
            lesson => lesson.category === achievement.requirement.category
          );
          const completedInCategory = categoryLessons.filter(lesson =>
            progress.completedLessons.includes(lesson.id)
          ).length;
          shouldUnlock = completedInCategory >= achievement.requirement.value;
        }
        break;
    }

    if (shouldUnlock) {
      updated = true;
      return {
        ...achievement,
        unlocked: true,
        unlockedAt: new Date().toISOString()
      };
    }

    return achievement;
  });

  if (updated) {
    saveAchievements(updatedAchievements);
  }

  return updatedAchievements;
};

export const getUnlockedAchievements = (): Achievement[] => {
  const achievementsData = loadAchievements();
  return achievementsData.filter(a => a.unlocked);
};

export const getLockedAchievements = (): Achievement[] => {
  const achievementsData = loadAchievements();
  return achievementsData.filter(a => !a.unlocked);
};
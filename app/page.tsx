'use client';

import { useState, useEffect } from 'react';
import { lessons, categories } from '@/data/lessons-padded';
import { tradingStyles } from '@/data/trading-styles';
import { learningPath } from '@/data/learning-path';
import { loadProgress, completeLesson, getAvailableLessons, getRecommendedLessons, saveTradingStyle, getStreakBonus, activatePremium, checkPremiumStatus } from '@/lib/progress';
import { checkAchievements, loadAchievements } from '@/lib/achievements';
import { UserProgress, Lesson, Achievement, TradingStyle, Level } from '@/types';
import ProgressCard from '@/components/ProgressCard';
import LessonCard from '@/components/LessonCard';
import LessonView from '@/components/LessonView';
import AchievementsModal from '@/components/AchievementsModal';
import TradingSimulator from '@/components/TradingSimulator';
import ReviewSystem from '@/components/ReviewSystem';
import TradingStyleSelector from '@/components/TradingStyleSelector';
import PaperTradingPlatform from '@/components/PaperTradingPlatform';
import LearningPath from '@/components/LearningPath';
import PremiumModal from '@/components/PremiumModal';
import SettingsModal from '@/components/SettingsModal';
import { TrendingUp, Trophy, Gamepad2, RotateCcw, BarChart3, Settings, Crown, BookOpen, Map } from 'lucide-react';

export default function Home() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showAchievements, setShowAchievements] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showStyleSelector, setShowStyleSelector] = useState(false);
  const [showPaperTrading, setShowPaperTrading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'path'>('path');
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    try {
      const progressData = loadProgress();
      setProgress(progressData);
      setAchievements(loadAchievements());

      // Check for system dark mode preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDarkMode(true);
      }

      // Show style selector if no trading style selected
      if (!progressData.tradingStyle) {
        setShowStyleSelector(true);
      }
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  }, []);

  const handleLessonComplete = (xpEarned: number) => {
    if (activeLesson) {
      const progressData = loadProgress();
      const streakBonus = getStreakBonus(progressData.currentStreak);
      const totalXP = xpEarned + streakBonus;

      const updatedProgress = completeLesson(activeLesson.id, totalXP);
      setProgress(updatedProgress);
      const updatedAchievements = checkAchievements(updatedProgress);
      setAchievements(updatedAchievements);
      setActiveLesson(null);
    }
  };

  const handleStyleSelect = (style: TradingStyle) => {
    saveTradingStyle(style);
    setShowStyleSelector(false);
    const updatedProgress = loadProgress();
    setProgress(updatedProgress);
  };

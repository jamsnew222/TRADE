'use client';

import { useState, useEffect } from 'react';
import { lessons, categories } from '@/data/lessons-padded';
import { tradingStyles } from '@/data/trading-styles';
import { learningPath } from '@/data/learning-path';
import { loadProgress, completeLesson, getRecommendedLessons, saveTradingStyle, getStreakBonus, checkPremiumStatus, canStartLesson, getRemainingUsage, FREE_DAILY_LESSONS } from '@/lib/progress';
import { initPurchases, purchasePremium, PurchaseResult } from '@/lib/purchases';
import { checkAchievements, loadAchievements } from '@/lib/achievements';
import { UserProgress, Lesson, Achievement, TradingStyle, Unit } from '@/types';
import ProgressCard from '@/components/ProgressCard';
import QuestsCard from '@/components/QuestsCard';
import OnboardingModal, { hasSeenOnboarding, markOnboarded } from '@/components/OnboardingModal';
import { recordQuestEvent } from '@/lib/quests';
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
import { TrendingUp, Trophy, Gamepad2, RotateCcw, BarChart3, Settings, Crown } from 'lucide-react';

// Merge real progress into the static path data: unlock levels
// sequentially within a unit, and units once the previous is done.
function buildPathUnits(completedLessonIds: string[]): Unit[] {
  const done = new Set(completedLessonIds);
  let prevUnitComplete = true;
  return learningPath.units.map(unit => {
    let prevLevelDone = true;
    const levels = unit.levels.map((level, i) => {
      const completed = done.has(level.lessonId);
      const locked = !prevUnitComplete || (i > 0 && !prevLevelDone);
      prevLevelDone = completed;
      return { ...level, locked, completed };
    });
    const completed = levels.every(l => l.completed);
    const merged = { ...unit, levels, locked: !prevUnitComplete, completed };
    prevUnitComplete = completed;
    return merged;
  });
}

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
  const [questTick, setQuestTick] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    try {
      const progressData = loadProgress();
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: hydrate persisted localStorage state after mount to avoid SSR/CSR mismatch
      setProgress(progressData);
      setAchievements(loadAchievements());

      // Check for system dark mode preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDarkMode(true);
      }

      // First launch: onboarding carousel, then style selector
      if (!hasSeenOnboarding()) {
        setShowOnboarding(true);
      } else if (!progressData.tradingStyle) {
        setShowStyleSelector(true);
      }

      // Sync premium entitlement with the store (native builds only; no-op on web)
      void initPurchases().then(() => setProgress(loadProgress()));
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  }, []);

  const handleLessonComplete = (xpEarned: number) => {
    if (activeLesson) {
      const progressData = loadProgress();
      const streakBonus = getStreakBonus(progressData.currentStreak);
      // LessonView advertises premium 2x XP on the completion screen — award it for real
      const premiumBonus = checkPremiumStatus(progressData) ? xpEarned : 0;
      const totalXP = xpEarned + streakBonus + premiumBonus;

      const updatedProgress = completeLesson(activeLesson.id, totalXP);
      recordQuestEvent('lesson', 1);
      recordQuestEvent('xp', totalXP);
      setQuestTick(t => t + 1);
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

  const pathUnits = buildPathUnits(progress?.completedLessons ?? []);

  const handleStartLesson = (lesson: Lesson) => {
    const current = loadProgress();
    if (lesson.premiumOnly && !checkPremiumStatus(current)) {
      setShowPremiumModal(true);
      return;
    }
    if (!canStartLesson(current)) {
      setShowPremiumModal(true);
      return;
    }
    setActiveLesson(lesson);
  };

  const handlePremiumSubscribe = async (plan: 'monthly' | 'yearly'): Promise<PurchaseResult> => {
    const result = await purchasePremium(plan);
    if (result.success) {
      setProgress(loadProgress());
      setShowPremiumModal(false);
    }
    return result;
  };

  const handlePremiumRestored = () => {
    setProgress(loadProgress());
    setShowPremiumModal(false);
  };

  const isPremiumUser = progress ? checkPremiumStatus(progress) : false;

  const filteredLessons = selectedCategory === 'All'
    ? lessons
    : lessons.filter(lesson => lesson.category === selectedCategory);

  const availableLessons = progress ? getRecommendedLessons(lessons, progress) : [];

  if (activeLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4 text-gray-900">
        <LessonView 
          lesson={activeLesson} 
          onComplete={handleLessonComplete}
          onBack={() => setActiveLesson(null)}
          onUpgrade={() => setShowPremiumModal(true)}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-green-50 to-blue-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`shadow-sm border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-500 p-2 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>TradeQuest</h1>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Master trading through interactive learning</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPaperTrading(true)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm font-medium">Paper Trading</span>
              </button>
              <button
                onClick={() => setShowReview(true)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span className="text-sm font-medium">Review</span>
              </button>
              <button
                onClick={() => setShowSimulator(true)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Gamepad2 className="w-4 h-4" />
                <span className="text-sm font-medium">Simulator</span>
              </button>
              <button
                onClick={() => setShowAchievements(true)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Trophy className="w-4 h-4" />
                <span className="text-sm font-medium">Achievements</span>
              </button>
              <button
                onClick={() => setShowPremiumModal(true)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isPremiumUser
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white hover:from-yellow-500 hover:to-amber-600'
                    : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Crown className="w-4 h-4" />
                <span className="text-sm font-medium">{isPremiumUser ? 'Premium' : 'Upgrade'}</span>
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span className="text-sm font-medium">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Section */}
        {progress && (
          <div className="mb-8">
            <ProgressCard progress={progress} darkMode={darkMode} />

            {/* Free plan daily usage */}
            {!isPremiumUser && (
              <div className={`mt-4 p-4 rounded-xl border-2 flex items-center justify-between ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span className="font-semibold">Free plan — today:</span>{' '}
                  {getRemainingUsage(progress).lessons} of {FREE_DAILY_LESSONS} lessons,{' '}
                  {getRemainingUsage(progress).trades} of 25 trades left
                </div>
                <button
                  onClick={() => setShowPremiumModal(true)}
                  className="text-sm font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                >
                  <Crown className="w-4 h-4" />
                  Go unlimited
                </button>
              </div>
            )}

            <QuestsCard darkMode={darkMode} tick={questTick} onClaimed={() => setProgress(loadProgress())} />
          </div>
        )}

        {/* Recommended Section */}
        {progress && progress.tradingStyle && progress.tradingStyle !== 'balanced' && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <span className="text-xl">⭐</span>
              </div>
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Recommended for {tradingStyles.find(s => s.id === progress.tradingStyle)?.name}
                </h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Based on your trading style preferences
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter - Only show in grid mode */}
        {viewMode === 'grid' && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === 'All'
                    ? 'bg-green-500 text-white'
                    : darkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Lessons
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-green-500 text-white'
                      : darkMode
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* View Mode Toggle */}
        {viewMode === 'grid' ? (
          /* Lessons Grid */
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLessons.map(lesson => {
                const isCompleted = progress?.completedLessons.includes(lesson.id);
                const isAvailable = availableLessons.some(l => l.id === lesson.id);
                
                return (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    isLocked={!isAvailable}
                    isCompleted={isCompleted || false}
                    onStart={() => handleStartLesson(lesson)}
                  />
                );
              })}
            </div>

            {filteredLessons.length === 0 && (
              <div className="text-center py-12">
                <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No lessons found in this category.</p>
              </div>
            )}
          </>
        ) : (
          /* Learning Path */
          <LearningPath
            units={pathUnits}
            onLevelClick={(level) => handleStartLesson(level.lesson)}
            darkMode={darkMode}
          />
        )}
      </main>

      {/* Achievements Modal */}
      {showAchievements && (
        <AchievementsModal 
          achievements={achievements} 
          onClose={() => setShowAchievements(false)} 
        />
      )}

      {/* Trading Simulator Modal */}
      {showSimulator && (
        <TradingSimulator 
          onClose={() => setShowSimulator(false)} 
          darkMode={darkMode}
          tradingStyle={progress?.tradingStyle}
        />
      )}

      {/* Paper Trading Platform Modal */}
      {showPaperTrading && (
        <PaperTradingPlatform 
          onClose={() => setShowPaperTrading(false)} 
          darkMode={darkMode}
        />
      )}

      {/* Review System Modal */}
      {showReview && progress && (
        <ReviewSystem 
          completedLessons={progress.completedLessons}
          lessons={lessons}
          onClose={() => setShowReview(false)}
          darkMode={darkMode}
        />
      )}

      {/* Trading Style Selector */}
      <TradingStyleSelector
        isOpen={showStyleSelector}
        onClose={() => setShowStyleSelector(false)}
        onSelect={handleStyleSelect}
        darkMode={darkMode}
      />

      {/* Premium Modal */}
      <PremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onSubscribe={handlePremiumSubscribe}
        onRestored={handlePremiumRestored}
        darkMode={darkMode}
      />

      {/* First-launch onboarding */}
      {showOnboarding && (
        <OnboardingModal
          onDone={() => {
            markOnboarded();
            setShowOnboarding(false);
            if (!progress?.tradingStyle) setShowStyleSelector(true);
          }}
        />
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        darkMode={darkMode}
        onDarkModeToggle={() => setDarkMode(!darkMode)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onStyleSelectorOpen={() => setShowStyleSelector(true)}
        tradingStyle={progress?.tradingStyle}
        tradingStyles={tradingStyles}
      />
    </div>
  );
}
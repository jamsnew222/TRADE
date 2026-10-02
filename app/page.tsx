'use client';

import { useState, useEffect } from 'react';
import { lessons, categories } from '@/data/lessons';
import { tradingStyles } from '@/data/trading-styles';
import { learningPath } from '@/data/learning-path';
import { loadProgress, completeLesson, getAvailableLessons, getRecommendedLessons, saveTradingStyle } from '@/lib/progress';
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
import { TrendingUp, BookOpen, Trophy, Moon, Sun, Gamepad2, RotateCcw, User, BarChart3, Map } from 'lucide-react';

export default function Home() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showStyleSelector, setShowStyleSelector] = useState(false);
  const [showPaperTrading, setShowPaperTrading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'path'>('path');

  useEffect(() => {
    setMounted(true);
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
  }, []);

  const handleLessonComplete = (xpEarned: number) => {
    if (activeLesson) {
      const updatedProgress = completeLesson(activeLesson.id, xpEarned);
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

  const filteredLessons = selectedCategory === 'All' 
    ? lessons 
    : lessons.filter(lesson => lesson.category === selectedCategory);

  const availableLessons = progress ? getRecommendedLessons(lessons, progress) : [];

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-2xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  if (activeLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
        <LessonView 
          lesson={activeLesson} 
          onComplete={handleLessonComplete}
          onBack={() => setActiveLesson(null)}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-green-50 to-blue-50'}`}>
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
                onClick={() => setViewMode(viewMode === 'grid' ? 'path' : 'grid')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {viewMode === 'grid' ? <Map className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                <span className="text-sm font-medium">{viewMode === 'grid' ? 'Path' : 'Grid'}</span>
              </button>
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
                onClick={() => setShowStyleSelector(true)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {progress?.tradingStyle ? tradingStyles.find(s => s.id === progress.tradingStyle)?.name : 'Style'}
                </span>
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
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Section */}
        {progress && (
          <div className="mb-8">
            <ProgressCard progress={progress} />
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
                    onStart={() => setActiveLesson(lesson)}
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
            units={learningPath.units}
            onLevelClick={(level) => setActiveLesson(level.lesson)}
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
    </div>
  );
}
'use client';

import { UserProgress } from '@/types';
import { Flame, Snowflake, Zap, Calendar, TrendingUp, Award, Clock, Crown, Infinity } from 'lucide-react';
import { checkPremiumStatus } from '@/lib/progress';

interface StreakDisplayProps {
  progress: UserProgress;
  darkMode: boolean;
}

export default function StreakDisplay({ progress, darkMode }: StreakDisplayProps) {
  const isPremium = checkPremiumStatus(progress);

  const getStreakBonus = (streak: number): { xp: number; label: string } => {
    if (streak >= 30) return { xp: 50, label: '30-Day Master' };
    if (streak >= 21) return { xp: 35, label: '21-Day Hero' };
    if (streak >= 14) return { xp: 25, label: '2-Week Warrior' };
    if (streak >= 7) return { xp: 15, label: 'Week Champion' };
    if (streak >= 3) return { xp: 5, label: '3-Day Streak' };
    return { xp: 0, label: '' };
  };

  const getNextBonus = (streak: number): { days: number; xp: number } => {
    if (streak < 3) return { days: 3, xp: 5 };
    if (streak < 7) return { days: 7, xp: 15 };
    if (streak < 14) return { days: 14, xp: 25 };
    if (streak < 21) return { days: 21, xp: 35 };
    return { days: 30, xp: 50 };
  };

  const currentBonus = getStreakBonus(progress.currentStreak);
  const nextBonus = getNextBonus(progress.currentStreak);
  const streakProgress = progress.currentStreak / 30; // 30 days for max bonus

  return (
    <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-orange-50 to-red-50'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${darkMode ? 'bg-orange-600' : 'bg-orange-500'}`}>
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Daily Streak</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Keep learning every day!
            </p>
          </div>
        </div>
        <div className={`text-right`}>
          <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {progress.currentStreak}
          </div>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>days</p>
        </div>
      </div>

      {/* Streak Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Progress to max bonus</span>
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            {Math.round(streakProgress * 100)}%
          </span>
        </div>
        <div className={`h-3 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
          <div
            className="h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-500"
            style={{ width: `${streakProgress * 100}%` }}
          />
        </div>
      </div>

      {/* Current Bonus */}
      {currentBonus.xp > 0 && (
        <div className={`mb-4 p-3 rounded-xl ${darkMode ? 'bg-orange-900/30 border border-orange-700' : 'bg-white border border-orange-200'}`}>
          <div className="flex items-center gap-2">
            <Zap className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
            <div>
              <p className={`font-semibold ${darkMode ? 'text-orange-400' : 'text-orange-700'}`}>
                Current Bonus: {currentBonus.label}
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                +{currentBonus.xp} XP per lesson
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Premium Bonus */}
      {isPremium && (
        <div className={`mb-4 p-3 rounded-xl ${darkMode ? 'bg-yellow-900/30 border border-yellow-700' : 'bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-300'}`}>
          <div className="flex items-center gap-2">
            <Crown className={`w-5 h-5 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
            <div>
              <p className={`font-semibold ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                Premium Active
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                2x XP on all lessons
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Next Bonus */}
      <div className={`mb-4 p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
        <div className="flex items-center gap-2">
          <Award className={`w-5 h-5 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
          <div className="flex-1">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Next bonus in <span className="font-semibold">{nextBonus.days - progress.currentStreak}</span> days
            </p>
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              +{nextBonus.xp} XP bonus
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
          <div className="flex items-center gap-1 mb-1">
            <TrendingUp className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Best</p>
          </div>
          <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {progress.longestStreak || 0}
          </p>
        </div>
        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
          <div className="flex items-center gap-1 mb-1">
            <Calendar className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active</p>
          </div>
          <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {progress.totalDaysActive || 0}
          </p>
        </div>
        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
          <div className="flex items-center gap-1 mb-1">
            <Snowflake className={`w-4 h-4 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Freezes</p>
          </div>
          <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {isPremium ? (
              <Infinity className="w-6 h-6 text-cyan-500" />
            ) : (
              progress.streakFreezes ?? 0
            )}
          </p>
        </div>
      </div>

      {/* Streak Freeze Button */}
      {!isPremium && (progress.streakFreezes ?? 0) > 0 && (
        <button
          className={`w-full mt-4 flex items-center justify-center gap-2 p-3 rounded-lg transition-colors ${
            darkMode
              ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
              : 'bg-cyan-500 hover:bg-cyan-600 text-white'
          }`}
        >
          <Snowflake className="w-4 h-4" />
          <span className="font-medium">Use Streak Freeze ({progress.streakFreezes ?? 0} left)</span>
        </button>
      )}

      {isPremium && (
        <div className={`w-full mt-4 flex items-center justify-center gap-2 p-3 rounded-lg ${
          darkMode ? 'bg-gradient-to-r from-yellow-600 to-amber-600' : 'bg-gradient-to-r from-yellow-400 to-amber-500'
        }`}>
          <Crown className="w-4 h-4 text-white" />
          <span className="font-medium text-white">Unlimited Streak Freezes</span>
        </div>
      )}

      {/* Streak Milestones */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className={`text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Milestones
        </p>
        <div className="flex gap-2">
          {[3, 7, 14, 21, 30].map((milestone) => {
            const achieved = progress.currentStreak >= milestone;
            const isCurrent = progress.currentStreak === milestone;
            return (
              <div
                key={milestone}
                className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium ${
                  achieved
                    ? 'bg-orange-500 text-white'
                    : darkMode
                      ? 'bg-gray-700 text-gray-500'
                      : 'bg-gray-200 text-gray-500'
                } ${isCurrent ? 'ring-2 ring-orange-400' : ''}`}
              >
                {milestone}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

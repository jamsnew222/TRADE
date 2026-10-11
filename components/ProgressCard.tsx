'use client';

import { UserProgress, TradingStyle } from '@/types';
import { tradingStyles } from '@/data/trading-styles';
import { Star, Zap } from 'lucide-react';
import StreakDisplay from './StreakDisplay';

interface ProgressCardProps {
  progress: UserProgress;
  darkMode: boolean;
}

export default function ProgressCard({ progress, darkMode }: ProgressCardProps) {
  const nextLevelXP = Math.pow(progress.level, 2) * 100;
  const currentLevelXP = Math.pow(progress.level - 1, 2) * 100;
  const progressInLevel = progress.totalXP - currentLevelXP;
  const progressPercent = (progressInLevel / (nextLevelXP - currentLevelXP)) * 100;

  const styleInfo = progress.tradingStyle ? tradingStyles.find(s => s.id === progress.tradingStyle) : null;

  return (
    <div className="space-y-4">
      <StreakDisplay progress={progress} darkMode={darkMode} />

      <div className={`rounded-2xl shadow-lg p-6 border-2 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-green-500'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-full ${darkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'}`}>
              <Zap className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total XP</p>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{progress.totalXP}</p>
            </div>
          </div>
        </div>

        {styleInfo && (
          <div className={`mb-4 p-3 rounded-lg ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{styleInfo.icon}</span>
              <div>
                <p className={`text-sm font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>{styleInfo.name}</p>
                <p className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>Trading Style</p>
              </div>
            </div>
          </div>
        )}

        <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} pt-4`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Star className={`w-5 h-5 text-yellow-500`} />
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Level {progress.level}</span>
            </div>
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {progress.totalXP} / {nextLevelXP} XP
            </span>
          </div>
          <div className={`w-full rounded-full h-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, progressPercent)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
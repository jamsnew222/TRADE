'use client';

import { UserProgress, TradingStyle } from '@/types';
import { tradingStyles } from '@/data/trading-styles';
import { Flame, Trophy, Star } from 'lucide-react';

interface ProgressCardProps {
  progress: UserProgress;
}

export default function ProgressCard({ progress }: ProgressCardProps) {
  const nextLevelXP = Math.pow(progress.level, 2) * 100;
  const currentLevelXP = Math.pow(progress.level - 1, 2) * 100;
  const progressInLevel = progress.totalXP - currentLevelXP;
  const progressPercent = (progressInLevel / (nextLevelXP - currentLevelXP)) * 100;

  const styleInfo = progress.tradingStyle ? tradingStyles.find(s => s.id === progress.tradingStyle) : null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-500">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-3 rounded-full">
            <Flame className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Current Streak</p>
            <p className="text-2xl font-bold text-gray-900">{progress.currentStreak} days</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-yellow-100 p-3 rounded-full">
            <Trophy className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total XP</p>
            <p className="text-2xl font-bold text-gray-900">{progress.totalXP}</p>
          </div>
        </div>
      </div>

      {styleInfo && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{styleInfo.icon}</span>
            <div>
              <p className="text-sm text-blue-900 font-semibold">{styleInfo.name}</p>
              <p className="text-xs text-blue-700">Trading Style</p>
            </div>
          </div>
        </div>
      )}

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="font-semibold text-gray-900">Level {progress.level}</span>
          </div>
          <span className="text-sm text-gray-600">
            {progress.totalXP} / {nextLevelXP} XP
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, progressPercent)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
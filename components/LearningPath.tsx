'use client';

import { Unit, Level } from '@/types';
import { Lock, CheckCircle, Circle, ChevronRight, Star } from 'lucide-react';

interface LearningPathProps {
  units: Unit[];
  onLevelClick: (level: Level) => void;
  darkMode: boolean;
}

export default function LearningPath({ units, onLevelClick, darkMode }: LearningPathProps) {
  return (
    <div className="space-y-8">
      {units.filter(unit => unit.levels.length > 0).map((unit, unitIndex) => (
        <div key={unit.id} className="relative">
          {/* Unit Header */}
          <div className={`p-6 rounded-2xl mb-4 ${
            unit.locked
              ? darkMode ? 'bg-gray-800' : 'bg-gray-100'
              : darkMode ? 'bg-gradient-to-r from-green-600 to-blue-600' : 'bg-gradient-to-r from-green-500 to-blue-500'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`text-4xl ${unit.locked ? 'opacity-50' : ''}`}>{unit.icon}</div>
                <div>
                  <h2 className={`text-2xl font-bold ${unit.locked ? 'opacity-50' : 'text-white'}`}>
                    {unit.title}
                  </h2>
                  <p className={`text-sm ${unit.locked ? 'opacity-50' : 'text-white/80'}`}>
                    {unit.description}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${unit.locked ? 'opacity-50' : 'text-white'}`}>
                  {unit.levels.filter(l => l.completed).length}/{unit.levels.length}
                </div>
                <div className={`text-xs ${unit.locked ? 'opacity-50' : 'text-white/80'}`}>
                  {unit.totalXP} XP
                </div>
              </div>
            </div>
          </div>

          {/* Levels Path */}
          <div className="relative pl-12">
            {/* Vertical Line */}
            <div className={`absolute left-6 top-0 bottom-0 w-1 ${
              darkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`} />

            {/* Levels */}
            <div className="space-y-4">
              {unit.levels.map((level, levelIndex) => {
                const isLocked = unit.locked || level.locked;
                const isCompleted = level.completed;
                const isCheckpoint = level.checkpoint;

                return (
                  <div key={level.id} className="relative">
                    {/* Connector Line */}
                    {levelIndex < unit.levels.length - 1 && (
                      <div className={`absolute left-6 top-12 w-1 h-8 ${
                        isCompleted 
                          ? 'bg-green-500' 
                          : isLocked 
                            ? darkMode ? 'bg-gray-700' : 'bg-gray-200'
                            : darkMode ? 'bg-gray-600' : 'bg-gray-300'
                      }`} />
                    )}

                    {/* Level Node */}
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? 'bg-green-500'
                          : isLocked
                            ? darkMode ? 'bg-gray-700' : 'bg-gray-200'
                            : darkMode ? 'bg-blue-600' : 'bg-blue-500'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : isLocked ? (
                          <Lock className="w-5 h-5 text-gray-400" />
                        ) : (
                          <Circle className="w-5 h-5 text-white" />
                        )}
                      </div>

                      {/* Level Card */}
                      <button
                        onClick={() => !isLocked && onLevelClick(level)}
                        disabled={isLocked}
                        className={`flex-1 p-4 rounded-xl border-2 text-left transition-all ${
                          isLocked
                            ? darkMode
                              ? 'bg-gray-800 border-gray-700 opacity-50 cursor-not-allowed'
                              : 'bg-gray-100 border-gray-200 opacity-50 cursor-not-allowed'
                            : darkMode
                              ? 'bg-gray-800 border-gray-700 hover:border-green-500 hover:bg-gray-750'
                              : 'bg-white border-gray-200 hover:border-green-500 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {level.lesson.title}
                              </h3>
                              {isCheckpoint && (
                                <Star className="w-4 h-4 text-yellow-500" />
                              )}
                            </div>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {level.lesson.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className={`text-sm font-medium ${
                              isCompleted ? 'text-green-600' : darkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              +{level.lesson.xpReward} XP
                            </div>
                            {!isLocked && (
                              <ChevronRight className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            )}
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
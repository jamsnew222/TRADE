'use client';

import { Lesson } from '@/types';
import { Crown, Lock, Play, Star } from 'lucide-react';

interface LessonCardProps {
  lesson: Lesson;
  isLocked: boolean;
  isCompleted: boolean;
  onStart: (lessonId: string) => void;
}

export default function LessonCard({ lesson, isLocked, isCompleted, onStart }: LessonCardProps) {
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  };

  const typeIcons: Record<string, string> = {
    quiz: '❓',
    matching: '🔗',
    'fill-blank': '✏️',
    'multiple-choice': '📝',
    'true-false': '✅',
    'multiple-select': '☑️',
    'ordering': '🔢',
    'word-bank': '📝',
    interactive: '🎮',
    flashcard: '🎴',
    'drag-drop': '🎯',
    timeline: '📅',
    scenario: '🎬'
  };

  return (
    <div 
      className={`relative bg-white rounded-2xl shadow-md p-6 border-2 transition-all duration-300 ${
        isLocked 
          ? 'border-gray-200 opacity-60 cursor-not-allowed' 
          : isCompleted 
            ? 'border-green-500 cursor-default' 
            : 'border-gray-200 hover:border-green-400 hover:shadow-lg cursor-pointer'
      }`}
      onClick={() => !isLocked && !isCompleted && onStart(lesson.id)}
    >
      {isLocked && (
        <div className="absolute top-4 right-4">
          <Lock className="w-5 h-5 text-gray-400" />
        </div>
      )}

      {isCompleted && (
        <div className="absolute top-4 right-4">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className="text-4xl">
          {typeIcons[lesson.type]}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-bold text-gray-900">{lesson.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[lesson.difficulty]}`}>
              {lesson.difficulty}
            </span>
            {lesson.premiumOnly && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 flex items-center gap-1">
                <Crown className="w-3 h-3" /> Premium
              </span>
            )}
          </div>
          
          <p className="text-gray-600 text-sm mb-3">{lesson.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">{lesson.category}</span>
            <div className="flex items-center gap-1 text-sm font-medium text-yellow-600">
              <Star className="w-4 h-4" />
              {lesson.xpReward} XP
            </div>
          </div>
        </div>
      </div>

      {!isLocked && !isCompleted && (
        <div className="mt-4 flex items-center justify-center text-green-600 font-medium">
          <Play className="w-4 h-4 mr-2" />
          Start Lesson
        </div>
      )}
    </div>
  );
}
'use client';

import { Lesson } from '@/types';
import { X, RotateCcw, CheckCircle } from 'lucide-react';

interface ReviewSystemProps {
  completedLessons: string[];
  lessons: Lesson[];
  onClose: () => void;
  darkMode: boolean;
}

export default function ReviewSystem({ completedLessons, lessons, onClose, darkMode }: ReviewSystemProps) {
  const completedLessonObjects = lessons.filter(lesson => completedLessons.includes(lesson.id));

  if (completedLessonObjects.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className={`rounded-2xl shadow-2xl max-w-md w-full p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Review Lessons</h2>
            <button 
              onClick={onClose}
              className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-700' : ''}`}
            >
              <X className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            </button>
          </div>
          <div className="text-center py-8">
            <RotateCcw className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              You haven't completed any lessons yet. Complete some lessons to review them later!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className={`p-6 border-b flex items-center justify-between ${darkMode ? 'border-gray-700' : ''}`}>
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-2 rounded-xl">
              <RotateCcw className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Review Lessons</h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {completedLessonObjects.length} completed lessons available for review
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-700' : ''}`}
          >
            <X className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-4">
            {completedLessonObjects.map(lesson => (
              <div
                key={lesson.id}
                className={`p-4 rounded-xl border-2 ${darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-white'}`}
              >
                <div className="flex items-start gap-4">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{lesson.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            lesson.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                            lesson.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {lesson.difficulty}
                          </span>
                        </div>
                        
                        <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{lesson.description}</p>
                        
                        {lesson.content.explanation && (
                          <div className={`p-3 rounded-lg mb-3 ${darkMode ? 'bg-gray-600' : 'bg-blue-50'}`}>
                            <h4 className={`text-sm font-semibold mb-1 ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>Key Concept</h4>
                            <p className={`text-sm ${darkMode ? 'text-blue-200' : 'text-blue-800'}`}>{lesson.content.explanation}</p>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{lesson.category}</span>
                          <div className="flex items-center gap-1 text-sm font-medium text-yellow-600">
                            <span className="text-lg">⭐</span>
                            {lesson.xpReward} XP
                          </div>
                        </div>
                      </div>
                    </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
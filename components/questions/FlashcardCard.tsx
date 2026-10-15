'use client';

import { useState } from 'react';
import { FlashcardQuestion } from '@/types';
import { FlipHorizontal, Sparkles } from 'lucide-react';
import QuestionShell from './QuestionShell';

interface FlashcardCardProps {
  question: FlashcardQuestion;
  counterLabel: string;
  onBack: () => void;
  /** User self-assessed; parent advances and counts score */
  onAssess: (known: boolean) => void;
}

export default function FlashcardCard({ question, counterLabel, onBack, onAssess }: FlashcardCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <QuestionShell onBack={onBack} counterLabel={counterLabel}>
      <div className="relative">
        <div
          onClick={() => setFlipped(!flipped)}
          className={`bg-gradient-to-br ${flipped ? 'from-amber-50 to-yellow-50' : 'from-emerald-50 to-green-50'} rounded-3xl shadow-xl p-8 border-2 ${flipped ? 'border-amber-200' : 'border-emerald-200'} min-h-[300px] cursor-pointer transition-all duration-500 hover:shadow-2xl`}
        >
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={(e) => { e.stopPropagation(); setFlipped(!flipped); }}
              className="p-2 hover:bg-white/50 rounded-full transition-colors"
            >
              <FlipHorizontal className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-600 mb-4">
              {flipped ? 'Answer' : 'Question'}
            </h3>
            <p className="text-2xl font-bold text-gray-900 leading-relaxed">
              {flipped ? question.back : question.front}
            </p>
            {question.hint && !flipped && (
              <p className="text-sm text-gray-500 mt-4 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                {question.hint}
              </p>
            )}
          </div>
        </div>

        {flipped && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              onClick={() => onAssess(false)}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Need Review
            </button>
            <button
              onClick={() => onAssess(true)}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Got It!
            </button>
          </div>
        )}
      </div>
    </QuestionShell>
  );
}

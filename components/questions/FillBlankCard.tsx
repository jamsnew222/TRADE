'use client';

import { useState } from 'react';
import { FillBlankExercise } from '@/types';
import { Sparkles } from 'lucide-react';
import QuestionShell from './QuestionShell';
import ResultPanel from './ResultPanel';

export interface FillBlankCardQuestion extends FillBlankExercise {
  type: 'fill-blank';
}

interface FillBlankCardProps {
  question: FillBlankCardQuestion;
  counterLabel: string;
  isLast: boolean;
  onBack: () => void;
  onResult: (correct: boolean) => void;
  onNext: () => void;
}

export default function FillBlankCard({ question, counterLabel, isLast, onBack, onResult, onNext }: FillBlankCardProps) {
  const [answer, setAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [wrongAttempt, setWrongAttempt] = useState(false);

  const submit = () => {
    const correct = answer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
    if (correct) {
      setWrongAttempt(false);
      setShowResult(true);
      onResult(true);
    } else {
      setWrongAttempt(true);
    }
  };

  return (
    <QuestionShell onBack={onBack} counterLabel={counterLabel}>
      <div className="bg-gradient-to-br from-white to-cyan-50 rounded-3xl shadow-xl p-8 border-2 border-cyan-200">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Fill in the blank</h2>
        <p className="text-gray-600 mb-6">Type the missing word to complete the sentence.</p>

        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6 mb-6 border border-cyan-100">
          <p className="text-cyan-900 text-lg leading-relaxed">
            {question.sentence.split('_____').map((part, index, parts) => (
              <span key={index}>
                {part}
                {index < parts.length - 1 && (
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => { setAnswer(e.target.value); setWrongAttempt(false); }}
                    disabled={showResult}
                    className="border-b-4 border-cyan-400 bg-transparent outline-none w-40 text-center mx-2 text-cyan-800 font-semibold text-xl"
                    placeholder="_____"
                  />
                )}
              </span>
            ))}
          </p>
          {question.hint && (
            <p className="text-cyan-700 text-sm mt-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Hint: {question.hint}
            </p>
          )}
        </div>

        {wrongAttempt && !showResult && (
          <div className="p-4 rounded-2xl mb-4 bg-red-50 border-2 border-red-200">
            <p className="text-red-700 font-semibold">Not quite — try again.</p>
          </div>
        )}

        {!showResult && (
          <button
            onClick={submit}
            disabled={!answer.trim()}
            className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 disabled:from-gray-300 disabled:to-gray-400 text-white py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            Submit Answer
          </button>
        )}

        {showResult && (
          <ResultPanel correct={true} isLast={isLast} onNext={onNext} />
        )}
      </div>
    </QuestionShell>
  );
}

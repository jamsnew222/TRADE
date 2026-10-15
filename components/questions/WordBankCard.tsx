'use client';

import { useState } from 'react';
import { WordBankQuestion } from '@/types';
import QuestionShell from './QuestionShell';
import ResultPanel from './ResultPanel';

interface WordBankCardProps {
  question: WordBankQuestion;
  counterLabel: string;
  isLast: boolean;
  onBack: () => void;
  onResult: (correct: boolean) => void;
  onNext: () => void;
}

export default function WordBankCard({ question, counterLabel, isLast, onBack, onResult, onNext }: WordBankCardProps) {
  const [selection, setSelection] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const toggleWord = (word: string) => {
    if (showResult) return;
    setSelection(prev => prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]);
  };

  const isCorrect = selection.length === question.correctWords.length &&
    selection.every(w => question.correctWords.includes(w));

  const check = () => {
    setShowResult(true);
    onResult(isCorrect);
  };

  return (
    <QuestionShell onBack={onBack} counterLabel={counterLabel}>
      <div className="bg-gradient-to-br from-white to-pink-50 rounded-3xl shadow-xl p-8 border-2 border-pink-200">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{question.instruction}</h2>
        <p className="text-gray-600 mb-6">Select words from the bank to complete the sentence</p>

        <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 mb-6 border border-pink-100">
          <p className="text-pink-900 text-lg leading-relaxed mb-4">{question.sentence}</p>
          <div className="flex flex-wrap gap-2">
            {selection.map((word, index) => (
              <span key={index} className="px-3 py-1 bg-pink-500 text-white rounded-full text-sm font-medium">
                {word}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-3 font-medium">Word Bank:</p>
          <div className="flex flex-wrap gap-2">
            {question.words.map((word, index) => (
              <button
                key={index}
                onClick={() => toggleWord(word)}
                disabled={showResult}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selection.includes(word)
                    ? 'bg-pink-500 text-white shadow-lg'
                    : 'bg-white border-2 border-pink-200 text-pink-700 hover:border-pink-400'
                }`}
              >
                {word}
              </button>
            ))}
          </div>
        </div>

        {!showResult && selection.length > 0 && (
          <button
            onClick={check}
            className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            Submit Answer
          </button>
        )}

        {showResult && (
          <ResultPanel correct={isCorrect} explanation={question.explanation} isLast={isLast} onNext={onNext} />
        )}
      </div>
    </QuestionShell>
  );
}

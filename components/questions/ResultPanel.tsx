'use client';

import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

interface ResultPanelProps {
  correct: boolean;
  explanation?: string;
  isLast: boolean;
  onNext: () => void;
}

export default function ResultPanel({ correct, explanation, isLast, onNext }: ResultPanelProps) {
  return (
    <>
      <div className={`p-4 rounded-2xl mt-6 ${correct ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
        <div className="flex items-center gap-2 mb-2">
          {correct ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <XCircle className="w-5 h-5 text-red-600" />
          )}
          <span className={`font-semibold ${correct ? 'text-green-700' : 'text-red-700'}`}>
            {correct ? 'Correct!' : 'Incorrect'}
          </span>
        </div>
        {explanation && <p className="text-gray-700">{explanation}</p>}
      </div>
      <button
        onClick={onNext}
        className="mt-6 w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
      >
        {isLast ? 'Complete Lesson' : 'Next Question'}
        {!isLast && <ArrowRight className="w-4 h-4" />}
      </button>
    </>
  );
}

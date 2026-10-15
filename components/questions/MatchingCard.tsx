'use client';

import { useState, useMemo } from 'react';
import { MatchingExercise } from '@/types';
import { RotateCcw } from 'lucide-react';
import QuestionShell from './QuestionShell';
import ResultPanel from './ResultPanel';

export interface MatchingCardQuestion extends MatchingExercise {
  type: 'matching';
}

// Deterministic shuffle — pure, keyed by a seed string
const seededShuffle = (indices: number[], seed: string): number[] => {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) | 0;
  const arr = [...indices];
  for (let i = arr.length - 1; i > 0; i--) {
    h = (h * 1103515245 + 12345) | 0;
    const j = (h >>> 0) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

interface MatchingCardProps {
  question: MatchingCardQuestion;
  counterLabel: string;
  isLast: boolean;
  onBack: () => void;
  onResult: (correct: boolean) => void;
  onNext: () => void;
}

export default function MatchingCard({ question, counterLabel, isLast, onBack, onResult, onNext }: MatchingCardProps) {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [matches, setMatches] = useState<Map<number, number>>(new Map());
  const [wrongAttempt, setWrongAttempt] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Right column shown shuffled so answers aren't positional
  const rightOrder = useMemo(
    () => seededShuffle(question.pairs.map((_, i) => i), question.id),
    [question]
  );
  const matchedRight = useMemo(() => new Set(matches.values()), [matches]);
  const allMatched = matches.size === question.pairs.length;

  const tryMatch = (left: number | null, right: number | null) => {
    if (left === null || right === null) return;
    if (left === right) {
      setMatches(prev => new Map(prev).set(left, right));
    } else {
      setWrongAttempt(true);
    }
    setSelectedLeft(null);
    setSelectedRight(null);
  };

  const submit = () => {
    // Left i matches right index i when pairs share indexes
    const allCorrect = question.pairs.every((_, i) => matches.get(i) === i);
    if (allCorrect) {
      setShowResult(true);
      setWrongAttempt(false);
      onResult(true);
    } else {
      setWrongAttempt(true);
      setMatches(new Map());
      setSelectedLeft(null);
      setSelectedRight(null);
    }
  };

  return (
    <QuestionShell onBack={onBack} counterLabel={counterLabel}>
      <div className="bg-gradient-to-br from-white to-orange-50 rounded-3xl shadow-xl p-8 border-2 border-orange-200">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{question.instruction}</h2>
        <p className="text-gray-600 mb-6">Click a term, then its matching definition</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            {question.pairs.map((pair, index) => {
              const isMatched = matches.has(index);
              return (
                <button
                  key={`left-${index}`}
                  disabled={isMatched || showResult}
                  onClick={() => {
                    setWrongAttempt(false);
                    const next = selectedLeft === index ? null : index;
                    setSelectedLeft(next);
                    tryMatch(next, selectedRight);
                  }}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    isMatched
                      ? 'border-green-500 bg-green-50 text-gray-400'
                      : selectedLeft === index
                        ? 'border-orange-500 bg-orange-50 shadow-lg'
                        : 'border-gray-200 hover:border-orange-400'
                  }`}
                >
                  {pair.left}
                </button>
              );
            })}
          </div>

          <div className="space-y-2">
            {rightOrder.map((pairIndex) => {
              const isMatched = matchedRight.has(pairIndex);
              return (
                <button
                  key={`right-${pairIndex}`}
                  disabled={isMatched || showResult}
                  onClick={() => {
                    setWrongAttempt(false);
                    const next = selectedRight === pairIndex ? null : pairIndex;
                    setSelectedRight(next);
                    tryMatch(selectedLeft, next);
                  }}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    isMatched
                      ? 'border-green-500 bg-green-50 text-gray-400'
                      : selectedRight === pairIndex
                        ? 'border-orange-500 bg-orange-50 shadow-lg'
                        : 'border-gray-200 hover:border-orange-400'
                  }`}
                >
                  {question.pairs[pairIndex].right}
                </button>
              );
            })}
          </div>
        </div>

        {wrongAttempt && !showResult && (
          <p className="text-red-600 text-sm font-medium mb-3 text-center">Not a match — try again.</p>
        )}

        {matches.size > 0 && !allMatched && !showResult && (
          <button
            onClick={() => { setMatches(new Map()); setSelectedLeft(null); setSelectedRight(null); setWrongAttempt(false); }}
            className="w-full text-gray-600 hover:text-gray-900 flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        )}

        {allMatched && !showResult && (
          <button
            onClick={submit}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            Check Answers
          </button>
        )}

        {showResult && (
          <ResultPanel correct={true} isLast={isLast} onNext={onNext} />
        )}
      </div>
    </QuestionShell>
  );
}

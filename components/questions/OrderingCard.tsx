'use client';

import { useState, useMemo } from 'react';
import { OrderingQuestion } from '@/types';
import { ChevronUp, ChevronDown } from 'lucide-react';
import QuestionShell from './QuestionShell';
import ResultPanel from './ResultPanel';

// Deterministic shuffle — pure (safe during render), keyed by a seed string
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

interface OrderingCardProps {
  question: OrderingQuestion;
  counterLabel: string;
  isLast: boolean;
  onBack: () => void;
  onResult: (correct: boolean) => void;
  onNext: () => void;
}

export default function OrderingCard({ question, counterLabel, isLast, onBack, onResult, onNext }: OrderingCardProps) {
  const [items, setItems] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const displayOrder = useMemo(() => {
    if (items.length > 0) return items;
    const base = seededShuffle(question.items.map((_, i) => i), question.id);
    const solved = base.every((v, i) => v === question.correctOrder[i]);
    return solved && base.length > 1 ? [...base.slice(1), base[0]] : base;
  }, [items, question]);

  const swap = (index1: number, index2: number) => {
    const next = [...displayOrder];
    [next[index1], next[index2]] = [next[index2], next[index1]];
    setItems(next);
  };

  const isCorrect = displayOrder.every((item, index) => item === question.correctOrder[index]);

  const check = () => {
    setShowResult(true);
    onResult(isCorrect);
  };

  return (
    <QuestionShell onBack={onBack} counterLabel={counterLabel}>
      <div className="bg-gradient-to-br from-white to-teal-50 rounded-3xl shadow-xl p-8 border-2 border-teal-200">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{question.instruction}</h2>
        <p className="text-gray-600 mb-6">Use arrows to reorder the items</p>

        <div className="space-y-2 mb-6">
          {displayOrder.map((itemIndex, position) => (
            <div
              key={position}
              className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-gray-200 shadow-sm"
            >
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => swap(position, position - 1)}
                  disabled={position === 0}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                >
                  <ChevronUp className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => swap(position, position + 1)}
                  disabled={position === displayOrder.length - 1}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                >
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div className="flex-1 font-medium text-gray-800">
                {position + 1}. {question.items[itemIndex]}
              </div>
            </div>
          ))}
        </div>

        {!showResult && (
          <button
            onClick={check}
            className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            Check Order
          </button>
        )}

        {showResult && (
          <ResultPanel correct={isCorrect} explanation={question.explanation} isLast={isLast} onNext={onNext} />
        )}
      </div>
    </QuestionShell>
  );
}

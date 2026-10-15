'use client';

import { useState } from 'react';
import { QuizQuestion } from '@/types';
import { CheckCircle, XCircle, LineChart } from 'lucide-react';
import QuestionShell from './QuestionShell';
import ResultPanel from './ResultPanel';
import Sparkline from '../Sparkline';

interface QuizCardProps {
  question: QuizQuestion;
  counterLabel: string;
  isLast: boolean;
  onBack: () => void;
  onResult: (correct: boolean) => void;
  onNext: () => void;
}

export default function QuizCard({ question, counterLabel, isLast, onBack, onResult, onNext }: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [selectedMulti, setSelectedMulti] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);

  const isMultiSelect = question.type === 'multiple-select' || Array.isArray(question.correctAnswers);
  const isTrueFalse = question.type === 'true-false';

  const chartFigure = question.chart && question.chart.length > 1 ? (
    <div className="mb-6 rounded-2xl border-2 border-indigo-100 bg-white p-4">
      <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-indigo-500">
        <LineChart className="w-4 h-4" /> Price chart
      </div>
      <div className="flex justify-center">
        <Sparkline
          data={question.chart}
          width={320}
          height={96}
          positive={question.chart[question.chart.length - 1] >= question.chart[0]}
        />
      </div>
    </div>
  ) : null;

  const selectAnswer = (index: number) => {
    if (showResult) return;
    if (isMultiSelect) {
      setSelectedMulti(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
      return;
    }
    setSelectedAnswer(index);
    const correct = index === question.correctAnswer;
    setWasCorrect(correct);
    setShowResult(true);
    onResult(correct);
  };

  const submitMulti = () => {
    if (showResult) return;
    const correctSet = new Set(question.correctAnswers || []);
    const correct = selectedMulti.length === correctSet.size && selectedMulti.every(i => correctSet.has(i));
    setWasCorrect(correct);
    setShowResult(true);
    onResult(correct);
  };

  // True/False gets a dedicated two-column layout
  if (isTrueFalse) {
    return (
      <QuestionShell onBack={onBack} counterLabel={counterLabel}>
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl p-8 border-2 border-blue-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{question.question}</h2>
          {chartFigure}
          <div className="grid grid-cols-2 gap-4">
            {['True', 'False'].map((label, index) => (
              <button
                key={label}
                onClick={() => selectAnswer(index)}
                disabled={showResult}
                className={`p-6 rounded-2xl border-2 font-semibold transition-all transform hover:scale-105 ${
                  showResult
                    ? selectedAnswer === index && question.correctAnswer === index
                      ? 'border-green-500 bg-green-50 text-green-700 shadow-lg'
                      : selectedAnswer === index
                        ? 'border-red-500 bg-red-50 text-red-700 shadow-lg'
                        : 'border-gray-200 text-gray-400'
                    : 'border-gray-200 hover:border-green-400 text-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          {showResult && (
            <ResultPanel correct={wasCorrect} explanation={question.explanation} isLast={isLast} onNext={onNext} />
          )}
        </div>
      </QuestionShell>
    );
  }

  if (isMultiSelect) {
    return (
      <QuestionShell onBack={onBack} counterLabel={counterLabel}>
        <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-xl p-8 border-2 border-purple-200">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{question.question}</h2>
          <p className="text-gray-600 mb-4">Select all that apply</p>
          {chartFigure}

          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => selectAnswer(index)}
                disabled={showResult}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all transform hover:scale-[1.02] ${
                  selectedMulti.includes(index)
                    ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-lg'
                    : 'border-gray-200 hover:border-purple-400 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${
                    selectedMulti.includes(index) ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                  }`}>
                    {selectedMulti.includes(index) && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {selectedMulti.length > 0 && !showResult && (
            <button
              onClick={submitMulti}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Submit Answer
            </button>
          )}

          {showResult && (
            <ResultPanel correct={wasCorrect} explanation={question.explanation} isLast={isLast} onNext={onNext} />
          )}
        </div>
      </QuestionShell>
    );
  }

  return (
    <QuestionShell onBack={onBack} counterLabel={counterLabel}>
      <div className="bg-gradient-to-br from-white to-indigo-50 rounded-3xl shadow-xl p-8 border-2 border-indigo-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{question.question}</h2>
        {chartFigure}

        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;

            let buttonClass = 'border-2 border-gray-200 hover:border-indigo-400';
            if (showResult && isSelected) {
              buttonClass = isCorrect
                ? 'border-2 border-green-500 bg-green-50 shadow-lg'
                : 'border-2 border-red-500 bg-red-50 shadow-lg';
            } else if (showResult && isCorrect) {
              buttonClass = 'border-2 border-green-500 bg-green-50 shadow-lg';
            } else if (isSelected) {
              buttonClass = 'border-2 border-indigo-500 bg-indigo-50 shadow-lg';
            }

            return (
              <button
                key={index}
                onClick={() => selectAnswer(index)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-2xl transition-all transform hover:scale-[1.02] ${buttonClass}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option}</span>
                  {showResult && isSelected && (
                    isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
            <p className="text-blue-800 font-medium">{question.explanation}</p>
          </div>
        )}

        {showResult && (
          <ResultPanel correct={wasCorrect} isLast={isLast} onNext={onNext} />
        )}
      </div>
    </QuestionShell>
  );
}

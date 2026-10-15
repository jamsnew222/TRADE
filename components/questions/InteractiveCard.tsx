'use client';

import { Target } from 'lucide-react';
import QuestionShell from './QuestionShell';

export interface InteractiveCardQuestion {
  type: 'interactive';
  id: string;
  scenario: string;
  steps: string[];
}

interface InteractiveCardProps {
  question: InteractiveCardQuestion;
  counterLabel: string;
  onBack: () => void;
  onDone: () => void;
}

export default function InteractiveCard({ question, counterLabel, onBack, onDone }: InteractiveCardProps) {
  return (
    <QuestionShell onBack={onBack} counterLabel={counterLabel}>
      <div className="bg-gradient-to-br from-white to-violet-50 rounded-3xl shadow-xl p-8 border-2 border-violet-200">
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-6 mb-6 border border-violet-100">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-violet-600" />
            <h3 className="font-semibold text-violet-900">Scenario</h3>
          </div>
          <p className="text-violet-800 leading-relaxed">{question.scenario}</p>
        </div>

        <div className="space-y-4">
          {question.steps.map((step, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="bg-gradient-to-br from-violet-100 to-purple-100 text-violet-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0 shadow-sm">
                {index + 1}
              </div>
              <p className="text-gray-700 leading-relaxed">{step}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onDone}
          className="mt-6 w-full bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
        >
          Complete Exercise
        </button>
      </div>
    </QuestionShell>
  );
}

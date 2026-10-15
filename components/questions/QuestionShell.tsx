'use client';

import { ArrowRight, Clock } from 'lucide-react';

interface QuestionShellProps {
  onBack: () => void;
  counterLabel: string;
  children: React.ReactNode;
}

export default function QuestionShell({ onBack, counterLabel, children }: QuestionShellProps) {
  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors">
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back
        </button>
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
          <Clock className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-600 font-medium">{counterLabel}</span>
        </div>
      </div>
      {children}
    </div>
  );
}

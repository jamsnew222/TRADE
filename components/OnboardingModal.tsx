'use client';

import { useState } from 'react';
import { TrendingUp, GraduationCap, LineChart, ChevronRight, ChevronLeft, Target, Flame, Trophy } from 'lucide-react';

const ONBOARDED_KEY = 'tradequest-onboarded';

export const hasSeenOnboarding = (): boolean => {
  if (typeof window === 'undefined') return true;
  return localStorage.getItem(ONBOARDED_KEY) === '1';
};

export const markOnboarded = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ONBOARDED_KEY, '1');
  } catch { /* ignore */ }
};

interface Slide {
  icon: typeof TrendingUp;
  iconBg: string;
  title: string;
  body: string;
  points: { icon: typeof Target; text: string }[];
}

const slides: Slide[] = [
  {
    icon: TrendingUp,
    iconBg: 'bg-gradient-to-br from-green-500 to-emerald-600',
    title: 'Welcome to TradeCub',
    body: 'Learn to trade like a game. Short lessons, real market practice, zero risk.',
    points: [
      { icon: GraduationCap, text: 'Bite-sized lessons teach you before you\'re tested' },
      { icon: Trophy, text: 'Earn XP, level up, unlock achievements' },
    ],
  },
  {
    icon: Flame,
    iconBg: 'bg-gradient-to-br from-orange-500 to-red-500',
    title: 'Build Your Streak',
    body: 'Come back daily — streaks earn bonus XP and daily quests pay out rewards.',
    points: [
      { icon: Target, text: '3 fresh quests every day, each worth bonus XP' },
      { icon: Flame, text: 'Streak freezes protect you when life gets busy' },
    ],
  },
  {
    icon: LineChart,
    iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    title: 'Practice with Real Markets',
    body: 'Trade real prices during market hours, or practice anytime with simulated prices that track the real thing.',
    points: [
      { icon: TrendingUp, text: 'Live Market mode follows real exchange hours' },
      { icon: LineChart, text: 'Practice 24/7 mode is always open — and your portfolio persists' },
    ],
  },
];

export default function OnboardingModal({ onDone }: { onDone: () => void }) {
  const [slide, setSlide] = useState(0);
  const isLast = slide === slides.length - 1;
  const s = slides[slide];
  const Icon = s.icon;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className={`${s.iconBg} p-10 text-center transition-colors`}>
          <div className="inline-flex bg-white/20 rounded-2xl p-4 mb-4">
            <Icon className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">{s.title}</h1>
        </div>

        <div className="p-6">
          <p className="text-gray-700 text-center leading-relaxed mb-6">{s.body}</p>

          <div className="space-y-3 mb-8">
            {s.points.map((p, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                <p.icon className="w-5 h-5 text-gray-600 shrink-0" />
                <span className="text-sm text-gray-700">{p.text}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setSlide(v => Math.max(0, v - 1))}
              disabled={slide === 0}
              className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-800 disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            <div className="flex gap-1.5">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${i === slide ? 'w-6 bg-green-500' : 'w-2 bg-gray-300'}`}
                />
              ))}
            </div>

            <button
              onClick={() => (isLast ? onDone() : setSlide(v => v + 1))}
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-bold transition-colors"
            >
              {isLast ? 'Get Started' : 'Next'} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

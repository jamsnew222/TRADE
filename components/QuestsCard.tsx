'use client';

import { useEffect, useState } from 'react';
import { Target, Gift, Check } from 'lucide-react';
import { Quest, getTodayQuests, claimQuest } from '@/lib/quests';
import { playClaim } from '@/lib/sounds';

interface QuestsCardProps {
  darkMode: boolean;
  /** Bump to re-read quest progress (e.g. after a lesson completes). */
  tick?: number;
}

export default function QuestsCard({ darkMode, tick = 0 }: QuestsCardProps) {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [justClaimed, setJustClaimed] = useState<number | null>(null);

  useEffect(() => {
    // Loading persisted quest state from localStorage — intentional post-mount read
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuests(getTodayQuests());
  }, [tick]);

  if (quests.length === 0) return null;

  const handleClaim = (id: string) => {
    const reward = claimQuest(id);
    if (reward > 0) {
      playClaim();
      setJustClaimed(reward);
      setQuests(getTodayQuests());
      setTimeout(() => setJustClaimed(null), 2500);
    }
  };

  return (
    <div className={`mt-4 p-4 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center gap-2 mb-3">
        <Target className={`w-5 h-5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
        <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Daily Quests</h3>
        <span className={`ml-auto text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>resets at midnight</span>
      </div>

      {justClaimed !== null && (
        <div className="mb-3 p-2 rounded-lg bg-green-100 border border-green-300 text-green-700 text-sm font-medium text-center">
          +{justClaimed} XP claimed!
        </div>
      )}

      <div className="space-y-2">
        {quests.map(q => {
          const pct = Math.min(100, Math.round((q.progress / q.target) * 100));
          return (
            <div
              key={q.id}
              className={`flex items-center gap-3 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
            >
              <span className="text-xl">{q.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className={`text-sm font-medium truncate ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {q.label}
                  </p>
                  <span className={`text-xs whitespace-nowrap ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {q.progress}/{q.target} · +{q.reward} XP
                  </span>
                </div>
                <div className={`mt-1 h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                  <div
                    className={`h-full rounded-full transition-all ${q.done ? 'bg-green-500' : 'bg-purple-500'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
              {q.claimed ? (
                <span className={`flex items-center gap-1 text-xs font-semibold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                  <Check className="w-4 h-4" /> Claimed
                </span>
              ) : q.done ? (
                <button
                  onClick={() => handleClaim(q.id)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-500 hover:bg-green-600 text-white text-xs font-bold transition-colors"
                >
                  <Gift className="w-3.5 h-3.5" /> Claim
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

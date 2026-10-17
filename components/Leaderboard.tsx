'use client';

import { useEffect, useState } from 'react';
import { X, Trophy, Flame, Medal, Crown } from 'lucide-react';
import { fetchLeaderboard, LeaderboardEntry } from '@/lib/leaderboard';

interface LeaderboardProps {
  /** Signed-in uid — null in guest mode or when Firebase isn't configured */
  currentUid: string | null;
  onClose: () => void;
  darkMode: boolean;
}

const MEDALS = ['🥇', '🥈', '🥉'];

export default function Leaderboard({ currentUid, onClose, darkMode }: LeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(!!currentUid);

  useEffect(() => {
    if (!currentUid) return;
    let alive = true;
    fetchLeaderboard().then(list => {
      if (alive) { setEntries(list); setLoading(false); }
    });
    return () => { alive = false; };
  }, [currentUid]);

  const card = `rounded-2xl shadow-2xl max-w-md w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`${card} max-h-[80vh] overflow-hidden flex flex-col`}>
        <div className={`p-6 border-b flex items-center justify-between ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500 p-2 rounded-xl">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Leaderboard</h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Top traders by total XP</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-700' : ''}`}
          >
            <X className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {!currentUid ? (
            <div className="text-center py-8">
              <Medal className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <p className={`mb-2 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Sign in to compete
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Leaderboards rank players by XP — they activate once cloud accounts are enabled.
              </p>
            </div>
          ) : loading ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 rounded-full border-4 border-yellow-500 border-t-transparent animate-spin" />
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-8">
              <Crown className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                No rankings yet — complete a lesson to claim the top spot!
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {entries.map((entry, i) => {
                const isMe = entry.uid === currentUid;
                return (
                  <div
                    key={entry.uid}
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      isMe
                        ? 'bg-green-100 border-2 border-green-400'
                        : darkMode ? 'bg-gray-700' : 'bg-gray-50 border-2 border-transparent'
                    }`}
                  >
                    <span className={`w-8 text-center font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {MEDALS[i] ?? i + 1}
                    </span>
                    <span className="text-2xl">{entry.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {entry.name}{isMe && ' (You)'}
                      </p>
                      <p className={`text-xs flex items-center gap-1 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                        <Flame className="w-3 h-3" /> {entry.currentStreak} day streak
                      </p>
                    </div>
                    <span className="font-bold text-yellow-600">{entry.totalXP} XP</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

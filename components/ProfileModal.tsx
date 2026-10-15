'use client';

import { useState } from 'react';
import { X, Pencil, Check, Trophy, Flame, Star, BookOpen, Calendar, Crown } from 'lucide-react';
import { UserProgress, Achievement } from '@/types';
import { saveProfile, getNextLevelXP } from '@/lib/progress';
import { tradingStyles } from '@/data/trading-styles';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  progress: UserProgress;
  achievements: Achievement[];
  /** Called after the profile is saved so the header avatar/name refresh */
  onSaved: (progress: UserProgress) => void;
}

const AVATARS = [
  '📈', '🐂', '🐻', '💎', '🚀', '⚡', '🎯', '🧠',
  '💰', '🏦', '📊', '🦈', '🦁', '🐺', '🦅', '👑',
  '🤖', '😎', '🧙', '🥷', '🤠', '👽', '🐸', '🦉'
];

export default function ProfileModal({ isOpen, onClose, darkMode, progress, achievements, onSaved }: ProfileModalProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(progress.profileName ?? '');
  const [avatar, setAvatar] = useState(progress.profileAvatar ?? '📈');
  const [pickingAvatar, setPickingAvatar] = useState(false);

  if (!isOpen) return null;

  const save = () => {
    onSaved(saveProfile(name, avatar));
    setEditing(false);
    setPickingAvatar(false);
  };

  const nextLevelXP = getNextLevelXP(progress.level);
  const prevLevelXP = getNextLevelXP(progress.level - 1);
  const levelPct = Math.min(100, Math.round(
    ((progress.totalXP - prevLevelXP) / Math.max(1, nextLevelXP - prevLevelXP)) * 100
  ));
  const style = tradingStyles.find(s => s.id === progress.tradingStyle);
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  const stats = [
    { icon: Star, label: 'Total XP', value: progress.totalXP.toLocaleString() },
    { icon: Trophy, label: 'Level', value: progress.level },
    { icon: Flame, label: 'Streak', value: `${progress.currentStreak}d` },
    { icon: BookOpen, label: 'Lessons', value: progress.completedLessons.length },
    { icon: Calendar, label: 'Days active', value: progress.totalDaysActive ?? 0 },
    { icon: Trophy, label: 'Achievements', value: `${unlockedCount}/${achievements.length}` },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Header */}
        <div className={`p-6 border-b flex items-center justify-between ${darkMode ? 'border-gray-700' : ''}`}>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Profile</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-700' : ''}`}
          >
            <X className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Avatar + name */}
          <div className="flex flex-col items-center text-center">
            <button
              onClick={() => setPickingAvatar(p => !p)}
              className="relative w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-5xl shadow-lg hover:scale-105 transition-transform"
              aria-label="Change avatar"
            >
              {avatar}
              <span className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow">
                <Pencil className="w-3.5 h-3.5 text-gray-600" />
              </span>
            </button>

            {pickingAvatar && (
              <div className="grid grid-cols-8 gap-2 mt-4">
                {AVATARS.map(a => (
                  <button
                    key={a}
                    onClick={() => setAvatar(a)}
                    className={`text-2xl p-1.5 rounded-lg transition-all ${a === avatar ? 'bg-blue-100 ring-2 ring-blue-500 scale-110' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            )}

            <div className="mt-4 flex items-center gap-2">
              {editing ? (
                <>
                  <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    maxLength={24}
                    placeholder="Your name"
                    className={`px-3 py-2 rounded-lg border-2 text-center font-bold text-lg w-48 focus:outline-none focus:border-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  />
                  <button onClick={save} className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600">
                    <Check className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {progress.profileName || 'Trader'}
                  </h3>
                  {progress.isPremium && <Crown className="w-5 h-5 text-yellow-500" />}
                  <button
                    onClick={() => { setEditing(true); setName(progress.profileName ?? ''); }}
                    className={`p-1.5 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    aria-label="Edit name"
                  >
                    <Pencil className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  </button>
                </>
              )}
            </div>
            {style && (
              <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {style.icon} {style.name}
              </p>
            )}
            {(name !== (progress.profileName ?? '') || avatar !== (progress.profileAvatar ?? '📈')) && !editing && (
              <button onClick={save} className="mt-3 px-4 py-1.5 rounded-full bg-blue-500 text-white text-sm font-medium hover:bg-blue-600">
                Save changes
              </button>
            )}
          </div>

          {/* Level progress */}
          <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex justify-between text-sm mb-2">
              <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Level {progress.level}</span>
              <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{progress.totalXP} / {nextLevelXP} XP</span>
            </div>
            <div className={`h-2.5 rounded-full overflow-hidden ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
              <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all" style={{ width: `${levelPct}%` }} />
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map(s => (
              <div key={s.label} className={`p-3 rounded-xl text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <s.icon className={`w-5 h-5 mx-auto mb-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{s.value}</div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

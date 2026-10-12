'use client';

import { Settings as SettingsIcon, X, Sun, Moon, Grid, Map, User, Globe, DollarSign, Building2 } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
  viewMode: 'grid' | 'path';
  onViewModeChange: (mode: 'grid' | 'path') => void;
  onStyleSelectorOpen: () => void;
  tradingStyle?: string;
  tradingStyles: Array<{ id: string; name: string; icon: string }>;
}

export default function SettingsModal({
  isOpen,
  onClose,
  darkMode,
  onDarkModeToggle,
  viewMode,
  onViewModeChange,
  onStyleSelectorOpen,
  tradingStyle,
  tradingStyles
}: SettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`rounded-2xl shadow-2xl max-w-md w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Header */}
        <div className={`p-6 border-b flex items-center justify-between ${darkMode ? 'border-gray-700' : ''}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${darkMode ? 'bg-blue-600' : 'bg-blue-100'}`}>
              <SettingsIcon className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-blue-600'}`} />
            </div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Settings</h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-700' : ''}`}
          >
            <X className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Appearance */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Appearance</h3>
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {darkMode ? <Moon className="w-5 h-5 text-gray-400" /> : <Sun className="w-5 h-5 text-yellow-500" />}
                  <div>
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Dark Mode</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {darkMode ? 'Currently enabled' : 'Currently disabled'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onDarkModeToggle}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    darkMode ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform ${
                      darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* View Mode */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>View Mode</h3>
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex gap-2">
                <button
                  onClick={() => onViewModeChange('grid')}
                  className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-blue-500 text-white'
                      : darkMode
                        ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                  <span className="font-medium">Grid</span>
                </button>
                <button
                  onClick={() => onViewModeChange('path')}
                  className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg transition-colors ${
                    viewMode === 'path'
                      ? 'bg-blue-500 text-white'
                      : darkMode
                        ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Map className="w-5 h-5" />
                  <span className="font-medium">Path</span>
                </button>
              </div>
              <p className={`text-sm mt-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {viewMode === 'grid' ? 'View lessons in a grid layout' : 'View lessons in a learning path'}
              </p>
            </div>
          </div>

          {/* Trading Style */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Trading Style</h3>
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <button
                onClick={onStyleSelectorOpen}
                className="w-full flex items-center justify-between p-3 rounded-lg border-2 transition-colors hover:border-blue-400"
              >
                <div className="flex items-center gap-3">
                  <User className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  <div className="text-left">
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {tradingStyle ? tradingStyles.find(s => s.id === tradingStyle)?.name : 'Not Set'}
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Customize your learning path
                    </p>
                  </div>
                </div>
                <div className={`text-2xl`}>
                  {tradingStyle ? tradingStyles.find(s => s.id === tradingStyle)?.icon : '⚖️'}
                </div>
              </button>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>About TradeQuest</h3>
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                TradeQuest is an interactive trading education app that helps you master trading through gamified lessons, real-time simulators, and personalized learning paths.
              </p>
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Version 0.1.0
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : ''}`}>
          <button
            onClick={onClose}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

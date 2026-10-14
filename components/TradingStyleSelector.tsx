'use client';

import { TradingStyle } from '@/types';
import { tradingStyles } from '@/data/trading-styles';
import { X, Check } from 'lucide-react';

interface TradingStyleSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (style: TradingStyle) => void;
  darkMode: boolean;
}

export default function TradingStyleSelector({ isOpen, onClose, onSelect, darkMode }: TradingStyleSelectorProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className={`p-6 border-b flex items-center justify-between ${darkMode ? 'border-gray-700' : ''}`}>
          <div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Choose Your Trading Style</h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Select the approach that matches your goals and risk tolerance
            </p>
          </div>
          <button 
            onClick={onClose}
            className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-700' : ''}`}
          >
            <X className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tradingStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => onSelect(style.id)}
                className={`p-6 rounded-2xl border-2 text-left transition-all hover:shadow-lg ${
                  darkMode 
                    ? 'border-gray-700 bg-gray-700 hover:border-green-500' 
                    : 'border-gray-200 bg-white hover:border-green-500'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{style.icon}</div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {style.name}
                    </h3>
                    <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {style.description}
                    </p>
                    
                    <div className="mb-4">
                      <p className={`text-xs font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Focus Areas:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {style.focus.map((focus, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 rounded-full text-xs ${
                              darkMode 
                                ? 'bg-gray-600 text-gray-300' 
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {focus}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={`flex items-center gap-2 text-sm ${
                      darkMode ? 'text-green-400' : 'text-green-600'
                    }`}>
                      <Check className="w-4 h-4" />
                      <span className="font-medium">{style.recommendedLessons.length || 'All'} lessons recommended</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className={`mt-6 p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
            <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
              <strong>💡 Tip:</strong> You can change your trading style later from your profile settings. 
              Your choice will customize lesson recommendations and simulator settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
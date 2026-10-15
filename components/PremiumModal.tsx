'use client';

import { useState } from 'react';
import { Crown, Star, Zap, Shield, Check, X, CreditCard, Gift, TrendingUp, BookOpen, Flame, Award, RotateCcw, Heart } from 'lucide-react';
import { PurchaseResult, restorePurchases } from '@/lib/purchases';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (plan: 'monthly' | 'yearly') => Promise<PurchaseResult>;
  onRestored: () => void;
  darkMode: boolean;
}

export default function PremiumModal({ isOpen, onClose, onSubscribe, onRestored, darkMode }: PremiumModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const [subscribing, setSubscribing] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubscribe = async () => {
    if (subscribing) return;
    setSubscribing(true);
    setError(null);
    try {
      const result = await onSubscribe(selectedPlan);
      if (!result.success) {
        if (result.cancelled) {
          onClose();
        } else {
          setError(result.error || 'Purchase failed — please try again');
        }
      }
    } finally {
      setSubscribing(false);
    }
  };

  const handleRestore = async () => {
    if (restoring) return;
    setRestoring(true);
    setError(null);
    try {
      const result = await restorePurchases();
      if (result.success) {
        onRestored();
      } else {
        setError(result.error || 'No subscription found to restore');
      }
    } finally {
      setRestoring(false);
    }
  };

  const benefits = [
    { icon: Star, title: '2x XP Rewards', description: 'Earn double XP on every lesson' },
    { icon: Flame, title: 'Unlimited Streak Freezes', description: 'Never lose your streak again' },
    { icon: Heart, title: '2 Revives Per Lesson', description: 'Keep going after running out of hearts' },
    { icon: Zap, title: 'Unlimited Daily Usage', description: 'No daily limits on lessons or simulator trades' },
    { icon: BookOpen, title: 'Premium Lessons', description: 'Access exclusive advanced content' },
    { icon: Zap, title: 'Instant Level Up', description: 'Skip waiting to level up' },
    { icon: Award, title: 'Exclusive Badges', description: 'Show off premium achievements' },
    { icon: TrendingUp, title: 'Real-Time Market Data', description: 'Live stock prices and charts' },
    { icon: Gift, title: 'Monthly Bonus XP', description: 'Get 500 bonus XP every month' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`max-w-4xl w-full rounded-3xl shadow-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Crown className="w-12 h-12 text-white" />
              <h1 className="text-4xl font-bold text-white">TradeQuest Premium</h1>
            </div>
            <p className="text-white/90 text-lg">Unlock your full trading potential</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Benefits Grid */}
          <div className="mb-8">
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Premium Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-4 rounded-xl ${
                    darkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-yellow-50 to-amber-50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    darkMode ? 'bg-yellow-600' : 'bg-yellow-100'
                  }`}>
                    <benefit.icon className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-yellow-600'}`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {benefit.title}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="mb-8">
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Choose Your Plan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Monthly Plan */}
              <div
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedPlan === 'monthly'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : darkMode
                      ? 'border-gray-700 bg-gray-700 hover:border-gray-600'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                onClick={() => setSelectedPlan('monthly')}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Monthly
                  </h3>
                  {selectedPlan === 'monthly' && (
                    <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Selected
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <span className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    $9.99
                  </span>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    /month
                  </span>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>All premium features</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Cancel anytime</span>
                  </li>
                </ul>
              </div>

              {/* Yearly Plan */}
              <div
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all relative ${
                  selectedPlan === 'yearly'
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                    : darkMode
                      ? 'border-gray-700 bg-gray-700 hover:border-gray-600'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                onClick={() => setSelectedPlan('yearly')}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  SAVE 40%
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Yearly
                  </h3>
                  {selectedPlan === 'yearly' && (
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Selected
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <span className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    $71.88
                  </span>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    /year
                  </span>
                  <div className={`text-sm line-through ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    $119.88
                  </div>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>All premium features</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>2 months free</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Priority support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border-2 border-red-200 text-red-700 text-sm font-medium text-center">
              {error}
            </div>
          )}
          <div className="flex gap-4">
            <button
              onClick={handleSubscribe}
              disabled={subscribing || restoring}
              className="flex-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 hover:from-yellow-500 hover:via-amber-600 hover:to-orange-600 disabled:opacity-60 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Crown className="w-5 h-5" />
              {subscribing ? 'Processing...' : 'Subscribe Now'}
            </button>
            <button
              onClick={onClose}
              disabled={subscribing || restoring}
              className={`px-6 py-4 rounded-xl font-medium transition-colors ${
                darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Maybe Later
            </button>
          </div>

          {/* Restore purchases — required by App Store guidelines */}
          <button
            onClick={handleRestore}
            disabled={subscribing || restoring}
            className={`mt-4 w-full flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
              darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <RotateCcw className={`w-4 h-4 ${restoring ? 'animate-spin' : ''}`} />
            {restoring ? 'Restoring...' : 'Restore Purchases'}
          </button>

          {/* Trust Badges */}
          <div className="mt-6 flex items-center justify-center gap-6 text-sm">
            <div className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Shield className="w-4 h-4" />
              <span>Secure Payment</span>
            </div>
            <div className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <X className="w-4 h-4" />
              <span>Cancel Anytime</span>
            </div>
            <div className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <CreditCard className="w-4 h-4" />
              <span>All Cards Accepted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

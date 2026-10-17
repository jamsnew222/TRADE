'use client';

import { useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { TrendingUp, Mail, Loader2 } from 'lucide-react';
import { authMethods } from '@/lib/auth';

export default function AuthScreen() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const isIOS = Capacitor.getPlatform() === 'ios';

  const run = async (fn: () => Promise<unknown>) => {
    setBusy(true);
    setError(null);
    try {
      await fn();
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Sign-in failed';
      // Friendlier messages for the common Firebase errors
      setError(
        msg.includes('invalid-credential') || msg.includes('wrong-password') ? 'Wrong email or password'
        : msg.includes('email-already-in-use') ? 'That email already has an account — try logging in'
        : msg.includes('weak-password') ? 'Password needs at least 6 characters'
        : msg.includes('invalid-email') ? 'That email address looks invalid'
        : msg.includes('popup-closed') || msg.includes('canceled') ? 'Sign-in was cancelled'
        : msg
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <TrendingUp className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">TradeCub</h1>
          <p className="text-gray-600 mt-1">Sign in to save your progress and streaks</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}
        {notice && (
          <div className="mb-4 p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm">
            {notice}
          </div>
        )}

        {/* Social sign-in */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => run(authMethods.signInGoogle)}
            disabled={busy}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 font-semibold text-gray-700 transition-colors disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.96l3.66-2.86z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 8.31 9.14 5.38 12 5.38z"/>
            </svg>
            Continue with Google
          </button>

          {/* Sign in with Apple — required by App Store rules on iOS when other
              social logins are offered */}
          {isIOS && (
            <button
              onClick={() => run(authMethods.signInApple)}
              disabled={busy}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Continue with Apple
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400">or with email</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Email/password */}
        <form
          onSubmit={e => {
            e.preventDefault();
            run(() => mode === 'signup'
              ? authMethods.signUpEmail(email, password)
              : authMethods.signInEmail(email, password));
          }}
          className="space-y-3"
        >
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
            autoComplete="email"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password (6+ characters)"
            required
            minLength={6}
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={busy}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors disabled:opacity-50"
          >
            {busy ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mail className="w-5 h-5" />}
            {mode === 'signup' ? 'Create Account' : 'Log In'}
          </button>

          {mode === 'login' && (
            <button
              type="button"
              disabled={busy}
              onClick={() => {
                if (!email) { setError('Enter your email first, then tap Forgot password'); return; }
                setNotice(null);
                void run(async () => {
                  await authMethods.resetPassword(email);
                  setNotice(`Password reset link sent to ${email}`);
                });
              }}
              className="w-full text-center text-sm text-gray-500 hover:text-blue-600"
            >
              Forgot password?
            </button>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => { setMode(m => m === 'login' ? 'signup' : 'login'); setError(null); setNotice(null); }}
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            {mode === 'login' ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  );
}

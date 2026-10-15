'use client';

import { useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithCredential,
  signOut as fbSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  OAuthProvider,
  EmailAuthProvider,
  sendPasswordResetEmail,
  type User,
} from 'firebase/auth';
import { Capacitor } from '@capacitor/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { getFirebaseAuth, firebaseConfigured } from './firebase';
import { deleteUserDoc } from './progress-sync';

export interface AuthState {
  /** null = not logged in; undefined is avoided — use `loading` */
  user: User | null;
  loading: boolean;
  /** false when Firebase isn't configured — app runs in guest/local mode */
  required: boolean;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) return;
    return onAuthStateChanged(auth, u => { setUser(u); setResolved(true); });
  }, []);

  // Configured but no auth callback yet => still resolving; unconfigured
  // (guest mode) is never "loading".
  return { user, loading: firebaseConfigured && !resolved, required: firebaseConfigured };
}

// On native, sign-in happens in the native Firebase SDK ("native layer").
// The web SDK keeps a separate auth state, so each successful native sign-in
// is bridged into the web layer via signInWithCredential — the web auth state
// is what the web Firestore SDK uses for security rules.

async function signInEmail(email: string, password: string) {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error('Auth is not configured');
  if (Capacitor.isNativePlatform()) {
    await FirebaseAuthentication.signInWithEmailAndPassword({ email, password });
    await signInWithCredential(auth, EmailAuthProvider.credential(email, password));
  } else {
    await signInWithEmailAndPassword(auth, email, password);
  }
}

async function signUpEmail(email: string, password: string) {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error('Auth is not configured');
  if (Capacitor.isNativePlatform()) {
    await FirebaseAuthentication.createUserWithEmailAndPassword({ email, password });
    await signInWithCredential(auth, EmailAuthProvider.credential(email, password));
  } else {
    await createUserWithEmailAndPassword(auth, email, password);
  }
}

async function signInGoogle() {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error('Auth is not configured');
  if (Capacitor.isNativePlatform()) {
    const res = await FirebaseAuthentication.signInWithGoogle();
    const c = res.credential;
    if (!c?.idToken) throw new Error('Google sign-in did not return a credential');
    await signInWithCredential(auth, GoogleAuthProvider.credential(c.idToken, c.accessToken));
  } else {
    await signInWithPopup(auth, new GoogleAuthProvider());
  }
}

async function signInApple() {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error('Auth is not configured');
  if (Capacitor.isNativePlatform()) {
    const res = await FirebaseAuthentication.signInWithApple();
    const c = res.credential;
    if (!c?.idToken) throw new Error('Apple sign-in did not return a credential');
    const provider = new OAuthProvider('apple.com');
    const webCred = provider.credential({
      idToken: c.idToken,
      rawNonce: c.nonce,
      accessToken: c.accessToken,
    });
    await signInWithCredential(auth, webCred);
  } else {
    await signInWithPopup(auth, new OAuthProvider('apple.com'));
  }
}

async function resetPassword(email: string) {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error('Auth is not configured');
  await sendPasswordResetEmail(auth, email);
}

async function signOut() {
  const auth = getFirebaseAuth();
  if (Capacitor.isNativePlatform()) {
    await FirebaseAuthentication.signOut();
  }
  if (auth) await fbSignOut(auth);
}

/**
 * Permanently deletes the account: cloud doc first (rules still allow the
 * write), then the auth user, then all local app data. Firebase requires a
 * recent login for deletion — callers should surface that message so the user
 * can re-sign-in and retry.
 */
async function deleteAccount() {
  const auth = getFirebaseAuth();
  const user = auth?.currentUser;
  if (!user) throw new Error('Not signed in');

  await deleteUserDoc(user.uid);
  try {
    await user.delete();
  } catch (e) {
    if ((e as { code?: string }).code === 'auth/requires-recent-login') {
      throw new Error('For security, sign out and sign back in, then delete your account.');
    }
    throw e;
  }
  if (Capacitor.isNativePlatform()) {
    await FirebaseAuthentication.signOut().catch(() => {});
  }
  // Account deletion should leave nothing behind — device prefs included,
  // so the next person on this device starts completely fresh.
  localStorage.clear();
}

export const authMethods = {
  signInEmail,
  signUpEmail,
  signInGoogle,
  signInApple,
  resetPassword,
  signOut,
  deleteAccount,
};

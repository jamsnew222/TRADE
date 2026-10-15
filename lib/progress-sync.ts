'use client';

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { UserProgress } from '@/types';
import { getFirestoreDb } from './firebase';
import { loadProgress, saveProgress, registerProgressUploader } from './progress';

/**
 * Cloud sync: progress lives at users/{uid}.progress in Firestore.
 * localStorage stays the local cache so the app works fully offline;
 * the cloud copy is authoritative across devices.
 */

const docRef = (uid: string) => doc(getFirestoreDb()!, 'users', uid);

/** Merge two progress snapshots — union what's accumulated, max what's counted. */
export function mergeProgress(local: UserProgress, cloud: Partial<UserProgress> | undefined): UserProgress {
  if (!cloud) return local;
  const done = new Set([...(local.completedLessons ?? []), ...(cloud.completedLessons ?? [])]);
  const merged: UserProgress = {
    ...local,
    ...cloud,
    completedLessons: [...done],
    totalXP: Math.max(local.totalXP ?? 0, cloud.totalXP ?? 0),
    level: Math.max(local.level ?? 1, cloud.level ?? 1),
    currentStreak: Math.max(local.currentStreak ?? 0, cloud.currentStreak ?? 0),
    longestStreak: Math.max(local.longestStreak ?? 0, cloud.longestStreak ?? 0),
    totalDaysActive: Math.max(local.totalDaysActive ?? 0, cloud.totalDaysActive ?? 0),
    streakFreezes: Math.max(local.streakFreezes ?? 0, cloud.streakFreezes ?? 0),
    // Path position takes the furthest reached
    currentUnit: Math.max(local.currentUnit ?? 0, cloud.currentUnit ?? 0),
    currentLevel: Math.max(local.currentLevel ?? 0, cloud.currentLevel ?? 0),
    // Premium status comes from RevenueCat, not the cloud copy — keep local truth
    isPremium: local.isPremium || cloud.isPremium,
    premiumExpiry: local.premiumExpiry ?? cloud.premiumExpiry ?? null,
    // Newest activity wins for the streak timestamp
    lastActiveDate:
      new Date(local.lastActiveDate) > new Date(cloud.lastActiveDate ?? 0)
        ? local.lastActiveDate
        : (cloud.lastActiveDate ?? local.lastActiveDate),
    // Daily usage counters: keep the stricter side so switching devices can't
    // bypass the free-tier cap (usage only counts when dated today anyway)
    usageDate:
      (local.usageDate ?? '') >= (cloud.usageDate ?? '') ? local.usageDate : cloud.usageDate,
    dailyLessonsUsed:
      local.usageDate === cloud.usageDate
        ? Math.max(local.dailyLessonsUsed ?? 0, cloud.dailyLessonsUsed ?? 0)
        : (local.usageDate ?? '') >= (cloud.usageDate ?? '')
          ? local.dailyLessonsUsed
          : cloud.dailyLessonsUsed,
    dailyTradesUsed:
      local.usageDate === cloud.usageDate
        ? Math.max(local.dailyTradesUsed ?? 0, cloud.dailyTradesUsed ?? 0)
        : (local.usageDate ?? '') >= (cloud.usageDate ?? '')
          ? local.dailyTradesUsed
          : cloud.dailyTradesUsed,
    // Later month wins — prevents the monthly premium bonus being claimed twice
    lastPremiumBonusMonth:
      (local.lastPremiumBonusMonth ?? '') >= (cloud.lastPremiumBonusMonth ?? '')
        ? local.lastPremiumBonusMonth
        : cloud.lastPremiumBonusMonth,
    // Profile fields: prefer whichever side has them set
    profileName: local.profileName ?? cloud.profileName,
    profileAvatar: local.profileAvatar ?? cloud.profileAvatar,
    tradingStyle: local.tradingStyle ?? cloud.tradingStyle,
  };
  return merged;
}

/** Called once when a user signs in: pull cloud progress, merge with local,
 *  write the merged result back to both stores. Returns the merged progress. */
export async function syncOnLogin(uid: string): Promise<UserProgress> {
  const db = getFirestoreDb();
  if (!db) return loadProgress();

  const local = loadProgress();
  try {
    const snap = await getDoc(docRef(uid));
    const cloud = snap.exists() ? (snap.data().progress as Partial<UserProgress>) : undefined;
    const merged = mergeProgress(local, cloud);
    saveProgress(merged); // local cache gets the merged state
    await setDoc(docRef(uid), { progress: merged }, { merge: true });
    return merged;
  } catch (e) {
    console.warn('Cloud sync failed, continuing with local progress:', e);
    return local;
  }
}

/** Register the uploader so every local save also writes to the cloud
 *  (fire-and-forget — offline writes queue in Firestore's own cache). */
export function enableProgressSync(uid: string): () => void {
  registerProgressUploader(progress => {
    const db = getFirestoreDb();
    if (!db) return;
    void setDoc(docRef(uid), { progress }, { merge: true }).catch(e =>
      console.warn('Progress upload failed:', e)
    );
  });
  return () => registerProgressUploader(() => {});
}

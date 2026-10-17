import { collection, deleteDoc, doc, getDocs, limit, orderBy, query, setDoc } from 'firebase/firestore';
import { getFirestoreDb } from './firebase';
import { UserProgress } from '@/types';

export interface LeaderboardEntry {
  uid: string;
  name: string;
  avatar: string;
  totalXP: number;
  currentStreak: number;
  updatedAt: string;
}

/**
 * Public rankings live in leaderboard/{uid} — deliberately a separate
 * collection from users/{uid} so rules can allow cross-user READS of just
 * these public stats (name/avatar/XP/streak) while users/* stays private.
 * Each user can only ever WRITE their own leaderboard entry.
 */

/** Publish this user's public stats — piggybacks on every progress upload. */
export function publishLeaderboardEntry(uid: string, progress: UserProgress): void {
  const db = getFirestoreDb();
  if (!db) return;
  const entry: LeaderboardEntry = {
    uid,
    name: progress.profileName?.trim() || 'Anonymous Trader',
    avatar: progress.profileAvatar || '🐂',
    totalXP: progress.totalXP ?? 0,
    currentStreak: progress.currentStreak ?? 0,
    updatedAt: new Date().toISOString(),
  };
  void setDoc(doc(db, 'leaderboard', uid), entry).catch(e =>
    console.warn('Leaderboard publish failed:', e)
  );
}

/** Remove the user's public leaderboard row — called on account deletion. */
export async function deleteLeaderboardEntry(uid: string): Promise<void> {
  const db = getFirestoreDb();
  if (!db) return;
  await deleteDoc(doc(db, 'leaderboard', uid)).catch(() => {});
}

export async function fetchLeaderboard(max = 50): Promise<LeaderboardEntry[]> {
  const db = getFirestoreDb();
  if (!db) return [];
  try {
    const q = query(
      collection(db, 'leaderboard'),
      orderBy('totalXP', 'desc'),
      limit(max)
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data() as LeaderboardEntry);
  } catch (e) {
    console.warn('Leaderboard fetch failed:', e);
    return [];
  }
}

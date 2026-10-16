'use client';

import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { UserProgress } from '@/types';

/**
 * Streak reminder — the Duolingo mechanic. A daily 7pm notification that only
 * fires while a streak is alive and the user hasn't been active today.
 * Permission is requested lazily the first time a streak exists worth
 * protecting — never at first launch.
 *
 * Native only; the web build no-ops (browsers would need the Push API +
 * service worker, which a static export can't provide per-platform).
 */

const STREAK_REMINDER_ID = 9001;
const REMINDER_HOUR = 19; // 7pm local

const wasActiveToday = (p: UserProgress): boolean =>
  new Date(p.lastActiveDate).toDateString() === new Date().toDateString();

async function cancelReminder(): Promise<void> {
  try {
    const { notifications } = await LocalNotifications.getPending();
    if (notifications.some(n => n.id === STREAK_REMINDER_ID)) {
      await LocalNotifications.cancel({ notifications: [{ id: STREAK_REMINDER_ID }] });
    }
  } catch { /* permission denied or platform quirk — non-fatal */ }
}

/**
 * Re-evaluate the reminder after any activity change (app launch, lesson
 * complete). Safe to call on web — returns immediately.
 */
export async function refreshStreakReminder(progress: UserProgress): Promise<void> {
  if (typeof window === 'undefined' || !Capacitor.isNativePlatform()) return;

  try {
    // Active today or no streak to protect → nothing to remind about
    if (wasActiveToday(progress) || progress.currentStreak < 1) {
      await cancelReminder();
      return;
    }

    const perm = await LocalNotifications.checkPermissions();
    let granted = perm.display === 'granted';
    if (!granted) {
      const req = await LocalNotifications.requestPermissions();
      granted = req.display === 'granted';
    }
    if (!granted) return; // user declined — respect it silently

    await cancelReminder();
    await LocalNotifications.schedule({
      notifications: [{
        id: STREAK_REMINDER_ID,
        title: 'Your streak is at risk 🔥',
        body: `You have a ${progress.currentStreak}-day streak — one quick lesson keeps it alive.`,
        schedule: {
          at: new Date(new Date().setHours(REMINDER_HOUR, 0, 0, 0)),
          every: 'day',
          repeats: true,
        },
      }],
    });
  } catch (e) {
    console.warn('Streak reminder failed:', e);
  }
}

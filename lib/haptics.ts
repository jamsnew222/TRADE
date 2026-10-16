'use client';

import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

/**
 * Tactile feedback for answer/result moments — native only, silently no-ops
 * on web. Pairs with the sounds in lib/sounds.ts at the same call sites.
 */

const ready = () => typeof window !== 'undefined' && Capacitor.isNativePlatform();

export const hapticCorrect = () => {
  if (ready()) void Haptics.notification({ type: NotificationType.Success }).catch(() => {});
};

export const hapticWrong = () => {
  if (ready()) void Haptics.notification({ type: NotificationType.Error }).catch(() => {});
};

export const hapticComplete = () => {
  if (ready()) void Haptics.notification({ type: NotificationType.Success }).catch(() => {});
};

export const hapticTap = () => {
  if (ready()) void Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
};

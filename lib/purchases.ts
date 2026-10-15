import { Capacitor } from '@capacitor/core';
import { activatePremium } from './progress';

/**
 * Premium billing layer.
 *
 * On native builds with RevenueCat keys configured, purchases go through
 * StoreKit / Google Play Billing via @revenuecat/purchases-capacitor.
 * Everywhere else (web, dev, missing keys) it falls back to the local
 * simulated subscription so the app stays fully usable.
 *
 * RevenueCat public SDK keys are designed to be embedded in clients —
 * they only identify the app, they do not grant account access.
 */
const RC_ANDROID_KEY = process.env.NEXT_PUBLIC_RC_ANDROID_API_KEY || '';
const RC_IOS_KEY = process.env.NEXT_PUBLIC_RC_IOS_API_KEY || '';

/** Entitlement identifier configured in the RevenueCat dashboard */
export const ENTITLEMENT_ID = 'premium';

type PurchasesModule = typeof import('@revenuecat/purchases-capacitor');

export function isNativeBilling(): boolean {
  if (typeof window === 'undefined' || !Capacitor.isNativePlatform()) return false;
  return Capacitor.getPlatform() === 'android' ? !!RC_ANDROID_KEY : !!RC_IOS_KEY;
}

async function getPurchases(): Promise<PurchasesModule['Purchases']> {
  const mod = await import('@revenuecat/purchases-capacitor');
  return mod.Purchases;
}

const rcKey = () => (Capacitor.getPlatform() === 'android' ? RC_ANDROID_KEY : RC_IOS_KEY);

const hasEntitlement = (info: { entitlements?: { active?: Record<string, unknown> } }): boolean =>
  !!info?.entitlements?.active?.[ENTITLEMENT_ID];

/**
 * Configure RevenueCat on app start and sync entitlement -> local premium flag.
 * Call once from the root component's mount effect; resolves when done.
 */
export async function initPurchases(): Promise<void> {
  if (!isNativeBilling()) return;
  try {
    const Purchases = await getPurchases();
    await Purchases.configure({ apiKey: rcKey() });

    const { customerInfo } = await Purchases.getCustomerInfo();
    if (hasEntitlement(customerInfo)) {
      activatePremium('yearly'); // persist premium locally; expiry refreshes on next launch
    }

    // Keep local premium state synced with billing changes mid-session
    await Purchases.addCustomerInfoUpdateListener((info) => {
      if (hasEntitlement(info)) {
        activatePremium('yearly');
      }
    });
  } catch (e) {
    // Billing unavailable (e.g. sandbox not configured) — local premium still works
    console.warn('RevenueCat init failed:', e);
  }
}

export interface PurchaseResult {
  success: boolean;
  cancelled?: boolean;
  simulated?: boolean;
  error?: string;
}

/**
 * Buy the selected premium plan. On native builds uses the real store sheet;
 * on web/dev it simulates the subscription so the flow is testable.
 */
export async function purchasePremium(plan: 'monthly' | 'yearly'): Promise<PurchaseResult> {
  if (!isNativeBilling()) {
    activatePremium(plan);
    return { success: true, simulated: true };
  }

  try {
    const Purchases = await getPurchases();
    const offerings = await Purchases.getOfferings();
    const packages = offerings.current?.availablePackages ?? [];
    const target = packages.find(p =>
      plan === 'monthly' ? /monthly/i.test(p.identifier) : /annual|yearly/i.test(p.identifier)
    ) ?? packages[0];

    if (!target) {
      return { success: false, error: 'No subscription package configured' };
    }

    const { customerInfo } = await Purchases.purchasePackage({ aPackage: target });
    if (hasEntitlement(customerInfo)) {
      activatePremium(plan);
      return { success: true };
    }
    return { success: false, error: 'Purchase completed but premium did not activate' };
  } catch (e) {
    const err = e as { code?: string; userCancelled?: boolean; message?: string };
    if (err?.userCancelled || err?.code === '1' || err?.code === 'PURCHASE_CANCELLED') {
      return { success: false, cancelled: true };
    }
    return { success: false, error: err?.message || 'Purchase failed' };
  }
}

/**
 * Restore previous purchases — Apple requires this control on the paywall.
 */
export async function restorePurchases(): Promise<PurchaseResult> {
  if (!isNativeBilling()) {
    return { success: false, error: 'No store account to restore on this device' };
  }
  try {
    const Purchases = await getPurchases();
    const { customerInfo } = await Purchases.restorePurchases();
    if (hasEntitlement(customerInfo)) {
      activatePremium('yearly');
      return { success: true };
    }
    return { success: false, error: 'No active subscription found' };
  } catch (e) {
    return { success: false, error: (e as Error)?.message || 'Restore failed' };
  }
}

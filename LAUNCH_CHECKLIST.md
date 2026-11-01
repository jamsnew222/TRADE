# TradeCub — Launch Checklist

Where things stand and what's left, in order. ✅ items are done and verified.
Everything else is a console/account step — none of it needs new code.

## Done (code)

- Static export + Capacitor Android/iOS projects — `npm run build` → `out/`
- Firebase auth (email, Google, Apple) + Firestore progress sync
- Release signing, ProGuard, minified release build — `gradlew bundleRelease` verified
- Icons, splash screens, feature graphic, store screenshots, store listing copy
- Privacy policy page (`app/privacy`) — ships with the static build
- In-app account deletion (required by both stores for apps with accounts)
- Lives/hearts, streaks + freezes, daily quests, mistake review, weekly
  leaderboard, premium paywall UI, mascot + answer animations

## Your steps — in order

### 1. Firebase (~15 min, free) — status: mostly done

- [x] Project created + web config pasted into `.env.local`
- [x] Providers enabled (email, Google, Apple)
- [ ] **Firestore Database** created — sidebar → Databases & Storage →
      Firestore Database → Create → production mode
- [ ] **`firestore.rules` pasted** — Firestore → Rules tab → paste repo file
      → Publish
- [ ] **Verify sync**: sign up at http://localhost:3000, finish a lesson,
      check Firestore Data tab for `users/{your-uid}`
- [ ] Android app registered (Project settings → Add app → Android):
      package `com.tradecub.app` + the SHA-1/SHA-256 fingerprints
- [ ] `google-services.json` → `android/app/google-services.json`
      (needed for **Google sign-in on Android**; email sign-in already works
      via the web-SDK fallback — verified on emulator)

### 2. GitHub Pages (1 click, free)

- [ ] Repo Settings → Pages → Source: **GitHub Actions**
- [ ] Privacy URL goes live: `https://jamsnew222.github.io/TRADE/privacy`
- [ ] Add `jamsnew222.github.io` to Firebase → Authentication → Settings →
      Authorized domains

### 3. Keystore backup (2 min)

- [ ] Copy `android/app/release.keystore` + `android/keystore.properties`
      somewhere off this machine — losing it means the app can never be updated
- [x] Keystore rotated 2026-10-27 (old password was exposed; old key kept as
      `release-old.keystore`). Register the NEW SHA-1/SHA-256 in Firebase —
      the old fingerprints are stale:
      - SHA-1: `38:18:F8:F4:1B:C4:AE:B1:A3:AA:A6:6E:72:7E:FD:29:E1:AF:12:44`
      - SHA-256: `93:9F:6C:3B:80:5A:F4:DD:1A:A2:E3:0A:FF:AD:D3:F2:01:99:FC:7A:24:DC:87:01:89:F6:68:8A:0D:C1:F8:FF`

### 4. Accounts (when ready to ship)

- [ ] Google Play Console — $25 one-time — play.google.com/console
- [ ] Apple Developer — $99/year — developer.apple.com
- [ ] RevenueCat project — free tier — revenuecat.com → keys into
      `NEXT_PUBLIC_REVENUECAT_*_KEY` in `.env.local` (real IAP)

### 5. Ship Android — walkthrough: `PLAY_SUBMISSION.md`

- [x] Emulator smoke test — app installs, signs in (email), renders
      (AVD `tradecub_test`, driver: `node assets/emu-drive.mjs`)
- [x] Signed `app-release.aab` built (includes all current fixes)
- [ ] Play Console app created → AAB uploaded → listing filled
      (assets: `assets/play-icon-512.png`, `assets/feature-graphic.png`,
      `assets/screenshots/`)
- [ ] Closed testing: ~12 opted-in testers for 14 days (Play requirement
      for new personal accounts) → then promote to Production
- [ ] Play Console → create app `com.tradecub.app` → upload AAB
- [ ] Store listing: copy from `STORE_LISTING.md`, images from
      `assets/screenshots/` + `assets/feature-graphic.png`

### 6. Ship iOS (needs a Mac)

- [ ] `ios/INSTRUCTIONS.md`: register Firebase iOS app →
      `GoogleService-Info.plist`, enable Sign in with Apple capability,
      Xcode archive → App Store Connect
- [ ] Same listing assets; iPad + iPhone screenshot sizes

## Reference

- Dev server: `npm run dev` → http://localhost:3000
- Verification: `npm run lint` · `npx tsc --noEmit` · `npm test` · `npm run build`
- Detail docs: `AUTH_SETUP.md` · `android/INSTRUCTIONS.md` ·
  `ios/INSTRUCTIONS.md` · `APP_STORE_GUIDE.md` · `STORE_LISTING.md`

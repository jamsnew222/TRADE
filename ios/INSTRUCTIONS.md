# iOS App Store Submission Instructions

iOS builds require a Mac with Xcode — these steps must be completed on a Mac.

## Prerequisites
- Mac with macOS + latest Xcode
- Apple Developer Account ($99/year)
- Firebase project already created for Android/web (see `../AUTH_SETUP.md`)
- RevenueCat iOS API key (`NEXT_PUBLIC_RC_IOS_API_KEY` in `.env.local` before building `out/`)

## 1. Build the web bundle and sync to iOS
```bash
npm run build        # produces out/  (must include RC iOS key env var)
npx cap sync ios
cd ios/App && open App.xcodeproj
```

## 2. Firebase on iOS (required for sign-in + cloud save)
1. In the Firebase console, register an **iOS app** with bundle id `com.tradecub.app`
2. Download `GoogleService-Info.plist` → drag it into Xcode under `App/App/` (check "Copy items if needed", target: **App**)
3. In `AppDelegate.swift`, add `import FirebaseCore` and `FirebaseApp.configure()` inside `application(_:didFinishLaunchingWithOptions:)` — the `@capacitor-firebase/authentication` pod is already pulled by `cap sync`; verify `Podfile.lock` lists `CapacitorFirebaseAuthentication`
4. Re-enable the same providers used on web (Email/Password, Google, Apple)

## 3. Sign in with Apple capability (required)
App Store guideline 4.8: any app offering Google sign-in **must** also offer
Sign in with Apple — we do, so the capability is mandatory:
- Xcode → App target → **Signing & Capabilities** → `+ Capability` → **Sign in with Apple**
- In the Firebase console's Apple provider settings, register your Services ID
  and key (see `../AUTH_SETUP.md` for the exact console path)

## 4. Signing & app metadata
- **Signing & Capabilities**: select your team, "Automatically manage signing", bundle id `com.tradecub.app`
- **General**: Display Name `TradeCub`, Version `1.0`, Build `1` (increment per upload)
- `Info.plist` needs no extra keys — local notifications and haptics work via
  Capacitor at runtime; we don't request tracking/ATT, contacts, or location

## 5. Icons & launch screen
- `Assets.xcassets` → AppIcon: supply the generated icons (`../assets/icon*.png`,
  1024×1024 required for the store slot)
- Splash: the generated `../assets/splash.svg` → export PNGs into the
  `Splash` asset, or keep the default

## 6. Account deletion (Apple guideline 5.1.1)
Already implemented in-app: Profile → Delete account removes the Firestore
doc, leaderboard entry, auth account, and local data. Reviewers may test this —
it must keep working. Don't remove it.

## 7. Archive & upload
- Select **Any iOS Device** → Product → Archive → Distribute App → App Store Connect
- If archive fails on signing: Xcode → Preferences → Accounts → download profiles

## 8. App Store Connect listing (see `../STORE_LISTING.md` for copy)
- Screenshots: 6.7" and 6.5" required (iPhone 15 Pro Max / 11 Pro Max simulator) —
  `assets/take-screenshots.mjs` images are a starting point but retake on-device for review
- Privacy policy URL: `https://jamsnew222.github.io/TRADE/privacy` (once GitHub Pages is enabled)
- Age rating: 4+ (financial education, no real trading)
- Review notes for Apple: "Trading *education* app — all trades are simulated,
  no real money. Accounts support email/Google/Apple sign-in; deletion is in
  Profile → Delete account. Premium is a subscription via RevenueCat."

## 9. TestFlight → submit
- Add testers via TestFlight before submitting (review likes to see a tested build)
- Submit for review; expect 1–3 days

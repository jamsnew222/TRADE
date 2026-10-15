# TradeQuest — Authentication Setup

Sign-in (email/password, Google, Apple) and cloud progress sync run on
**Firebase** — the app is a static export with no server, so Firebase is the
backend. This file lists the one-time console setup the app needs before
accounts go live. None of it can be done from code.

## 1. Create the Firebase project

1. <https://console.firebase.google.com> → **Add project** → name it e.g. `tradequest`
2. Project settings → **Your apps** → **Web** → register an app
3. Copy the four values into `.env.local`:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...
   ```

Without these the app runs in guest/local mode (no login screen) so dev still
works — ship only when they're set.

## 2. Enable sign-in providers

Firebase console → **Authentication** → **Sign-in method**:

- **Email/Password** → enable
- **Google** → enable, set a support email
- **Apple** → enable (needed for iOS; Apple requires it whenever other
  social logins are offered on iOS)

## 3. Firestore

Firebase console → **Firestore Database** → Create database (production mode).

Then deploy `firestore.rules` (repo root) — paste it into Firestore → Rules,
or `npx firebase deploy --only firestore:rules`. The rule restricts every user
to their own `users/{uid}` document; never ship with open rules.

## 4. Android (Google sign-in)

Google sign-in on Android needs your signing keys registered:

1. Get SHA-1 + SHA-256 of `android/app/release.keystore`:

   ```bash
   keytool -list -v -keystore android/app/release.keystore -alias tradequest
   ```

2. Firebase console → your **Android app** → **Add fingerprint** → paste both
3. Download `google-services.json` → put it at `android/app/google-services.json`
4. Then wire the Google Services Gradle plugin (do this **after** the JSON is
   in place — the plugin fails the build when the file is missing):
   - `android/build.gradle` → `dependencies` → add
     `classpath 'com.google.gms:google-services:4.4.2'`
   - `android/app/build.gradle` → bottom → add
     `apply plugin: 'com.google.gms.google-services'`

The Capacitor Firebase plugin is already installed and synced — the
google-services wiring above is the only native change needed.

## 5. iOS (Sign in with Apple)

1. Apple Developer → Identifiers → enable **Sign In with Apple** capability
   on the app's App ID
2. Xcode (on a Mac): `ios/App/App.xcodeproj` → Signing & Capabilities →
   add **Sign In with Apple**
3. Firebase console → Authentication → Apple → the iOS app's bundle ID must
   be registered as a Firebase iOS app; download `GoogleService-Info.plist`
   → put it at `ios/App/App/GoogleService-Info.plist`

## 6. Web / authorized domains

Firebase console → Authentication → **Settings** → Authorized domains →
add any domain hosting the app (e.g. `jamsnew222.github.io` if the Pages
site should allow sign-in). `localhost` is allowed by default.

## How it works in code

- `lib/firebase.ts` — initializes Firebase when the env vars exist
- `lib/auth.ts` — `useAuth()` hook + `authMethods` (web uses Firebase JS;
  native uses `@capacitor-firebase/authentication` and bridges the credential)
- `components/AuthScreen.tsx` — the required login gate
- `lib/progress-sync.ts` — merges cloud ↔ local on login (`users/{uid}`),
  uploads on every save; `firestore.rules` protects it
- `lib/purchases.ts` `linkPurchasesToUser(uid)` — ties RevenueCat premium to
  the Firebase account so subscriptions follow the login

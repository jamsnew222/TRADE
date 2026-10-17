# TradeCub

A Duolingo-style trading education app — bite-sized interactive lessons, a
live-market simulator, streaks, daily quests, and a synced account so progress
follows you across devices. Built to ship on Google Play and the App Store.

## Stack

- **Next.js (static export)** + React + TypeScript — `output: 'export'`, no
  server, no API routes
- **Capacitor** — wraps the export into native Android (`android/`) and iOS
  (`ios/`) apps
- **Firebase** — auth (email/password, Google, Apple) + Firestore for
  cloud-synced progress (`users/{uid}`)
- **RevenueCat** — premium subscriptions via StoreKit / Play Billing
- **Finnhub / stooq** — live + simulated market data for the simulator
- **Vitest** — unit + data-validation tests

## Develop

```bash
npm install
cp .env.example .env.local   # fill in keys — app runs in guest mode without them
npm run dev                  # http://localhost:3000
```

## Verify

```bash
npm run lint        # ESLint flat config, react-hooks rules
npx tsc --noEmit    # types
npm test            # Vitest
npm run build       # static export -> out/ (what Capacitor serves)
```

## Android

```bash
npm run build && npx cap sync android
cd android && ./gradlew assembleRelease    # signed APK
./gradlew bundleRelease                    # signed AAB (Play upload format)
```

Signing uses `android/keystore.properties` + `android/app/release.keystore`
(both gitignored — **back them up**, they are the app's permanent Play
identity). Full setup in `android/INSTRUCTIONS.md`.

## Accounts & cloud sync

Sign-in is required once Firebase env vars are configured; without them the
app runs in guest/local mode for development. Progress, achievements, and
simulator portfolios merge cloud ↔ local on login and upload on every save.
Console-side setup (providers, Firestore rules, SHA fingerprints, Apple
capability): **`AUTH_SETUP.md`**.

## Docs

- `AUTH_SETUP.md` — Firebase/Apple/Google console configuration
- `STORE_LISTING.md` — store copy, data-safety declarations, screenshot checklist
- `APP_STORE_GUIDE.md`, `android/INSTRUCTIONS.md` — publishing walkthroughs
- `firestore.rules` — deploy to Firestore (users can only reach their own doc)
- `assets/` — icon/splash sources, Play feature graphic, `take-screenshots.mjs`
  (Playwright store-screenshot capture against a running dev server)

## Education only

TradeCub is a learning tool. Simulated and delayed prices are for practice —
not investment advice.

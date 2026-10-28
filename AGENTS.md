<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Verification
- `npm run lint` (ESLint flat config, react-hooks rules enforced)
- `npx tsc --noEmit`
- `npm test` (Vitest: progress, question normalization, portfolio math)
- `npm run build` produces `out/` for Capacitor (output: 'export' - no API routes)
- Dev server: `npm run dev` at http://localhost:3000
- Android builds need JDK 21 (android/variables.gradle targets sourceCompatibility 21)
- Emulator smoke test: AVD `tradecub_test` exists (SDK at %LOCALAPPDATA%/Android/Sdk).
  Boot emulator → gradlew installDebug → adb forward tcp:9222
  localabstract:webview_devtools_remote_<pid> → `node assets/emu-drive.mjs`
  signs in via raw CDP; `emu-full-log.mjs` captures WebView console/network
- public/sw.js: HTML is network-first — never revert to cache-first for
  documents (stale shell + dead chunks = permanent spinner for returning users)

## Notes
- Finnhub key lives in .env.local (gitignored) as NEXT_PUBLIC_FINNHUB_API_KEY - client-side by necessity (static export); regenerate via finnhub.io if ever leaked
- Free tier: 5 lessons + 25 trades/day; premium bypasses (localStorage until real IAP)
- Question cards dispatch on question.type (not lesson.type) - see lib/lesson-questions.ts

## Auth & cloud sync
- Firebase = the backend (static export, no server). Console setup: AUTH_SETUP.md; env vars in .env.example — without them the app runs guest/local mode (no login gate)
- lib/firebase.ts (init + persistent Firestore cache), lib/auth.ts (useAuth + authMethods), lib/progress-sync.ts (Firestore users/{uid}: progress + simulator + paper portfolios, merge-on-login, upload-on-save via registerProgressUploader hooks — never import sync from progress.ts directly, that's why the hook exists)
- firestore.rules must be deployed; users can only access their own doc
- In-app account deletion exists (Profile -> Delete account) - App Store 5.1.1/Play require it for apps with account creation
- On native, Capacitor plugin signs in the native layer then credentials are bridged into the web SDK via signInWithCredential (web auth state is what web Firestore uses)
- RevenueCat linkPurchasesToUser(uid) ties premium to the Firebase account

# TradeCub — Google Play Submission Walkthrough

Everything Play Console asks for, with answers pre-drafted. Work top to bottom;
it's ~45 min of clicking plus the mandatory closed-testing wait.

## Prerequisites

- [ ] Play Console account paid ($25)
- [ ] `google-services.json` in `android/app/` (Google sign-in)
- [ ] Firestore database live + rules published
- [x] Privacy policy live at `https://tradequest-7db99.web.app/privacy`
      (Settings → Pages → GitHub Actions)
- [ ] Fresh AAB: `cd android && gradlew.bat bundleRelease`
      → `android/app/build/outputs/bundle/release/app-release.aab`

## App creation

- Name: **TradeCub**
- Default language: English (US)
- App or game: **App**
- Free or paid: **Free** (premium is IAP, not upfront)
- Declarations at the bottom of the wizard: all standard accepts.

## Store listing (Main store listing)

| Field | Value |
|---|---|
| App name | TradeCub |
| Short description | Learn to trade like a game — bite-size lessons, a practice simulator, zero risk. |
| Full description | Copy from `STORE_LISTING.md` |
| App icon | `assets/play-icon-512.png` (512×512) |
| Feature graphic | `assets/feature-graphic.png` (1024×500) |
| Phone screenshots | `assets/screenshots/*.png` (all 9) |
| Category | Education |
| Tags | education, finance |
| Email | your support email |
| Privacy policy URL | `https://tradequest-7db99.web.app/privacy` |

Ads: **No** — there are no ad SDKs; Play gives a "No ads" badge.

## Content rating (questionnaire → Everyone)

- Category: **Education**
- Violence, sexuality, language, controlled substances, gambling: **None**
- User interaction: app shows a public leaderboard (name + avatar + XP).
  That flags "Users can interact" — answer yes where asked; there's no chat
  or content exchange beyond displaying leaderboard stats.

## Target audience & content

- Age groups: **13 and up** (account creation + public leaderboard — do NOT
  select under-13 or the Families/children's policy applies)
- News app: No · COVID/government declarations: none apply

## Data safety form — exact answers

| Data type | Collected? | Shared? | Purpose | Required? | Encrypted | Deletable |
|---|---|---|---|---|---|---|
| Email address | Yes | No | Account management | Required | Yes | Yes |
| User IDs (Firebase UID) | Yes | No | Account management | Required | Yes | Yes |
| Name / avatar | Yes (optional) | **Yes** — public leaderboard | App functionality, personalisation | Optional | Yes | Yes |
| App activity (XP, streaks, lessons) | Yes | **Yes** — XP/streak shown on leaderboard | App functionality | Required | Yes | Yes |
| Purchase history | Yes (when IAP live) | No | App functionality | Required | Yes | Yes |
| Photos, contacts, location, files | **No** | — | — | — | — | — |
| Crash logs / diagnostics | **No** — no analytics SDK configured | — | — | — | — | — |

Notes reviewers check: encryption in transit = yes (HTTPS/Firebase);
account deletion exists in-app (Profile → Delete account) — that satisfies
the "deletable" column.

## Release path (mandatory for new personal accounts)

1. **Closed testing** → create track → add ~12 tester emails
   (or a Google Group). Share the opt-in link; testers must ACCEPT.
2. Wait **14 days with 12+ opted-in testers** — Play's hard requirement
   before Production unlocks.
3. Upload `app-release.aab` to the closed track first — same file promotes
   to Production later (Release → Promote release).
4. Fill the content rating + data safety + store listing before the first
   tester sees it — the listing is shared across tracks.

## After production unlocks

- Release → Production → promote the closed-testing release → review
  (~3–7 days first time).
- Keep `release.keystore` + `keystore.properties` backed up — Play App
  Signing can absorb future key loss only if you enroll it at upload
  (recommended: opt IN to Play App Signing when offered).

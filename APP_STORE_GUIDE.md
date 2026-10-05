# TradeQuest App Store Submission Guide

## What's Been Done

I've configured your TradeQuest app for submission to both the Apple App Store and Google Play Store. Here's what has been completed:

### 1. Next.js Build Configuration
- Updated `next.config.ts` to use static export (`output: 'export'`)
- Updated `capacitor.config.ts` to point to the `out` directory
- Fixed TypeScript errors in the codebase
- Successfully built the production version of the app

### 2. Capacitor Projects
- Added Android platform (`android/` directory)
- Added iOS platform (`ios/` directory)
- Synced the built web assets to both platforms

### 3. Android Configuration (Play Store)
- Configured `build.gradle` for release builds with:
  - Code minification enabled
  - Resource shrinking enabled
  - ProGuard optimization
- Set up signing configuration with keystore support
- Created `keystore.properties` template file
- Created detailed instructions in `android/INSTRUCTIONS.md`

### 4. iOS Configuration (App Store)
- Created Xcode project structure
- Created detailed instructions in `ios/INSTRUCTIONS.md`
- Configured basic project settings

## What You Need to Do Next

### For Android (Play Store)

1. **Generate a Keystore**
   ```bash
   cd android
   keytool -genkey -v -keystore release.keystore -alias tradequest -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Update keystore.properties**
   - Edit `android/keystore.properties`
   - Replace placeholder passwords with your actual passwords
   - Keep this file secure (don't commit to git)

3. **Build the Release Bundle**
   ```bash
   cd android
   gradlew.bat bundleRelease
   ```

4. **Create Play Store Listing**
   - Go to https://play.google.com/console
   - Create a new app with package name `com.tradequest.app`
   - Upload the AAB file from `android/app/build/outputs/bundle/release/`
   - Complete the store listing (icons, screenshots, description, etc.)
   - Submit for review

**See `android/INSTRUCTIONS.md` for detailed steps.**

### For iOS (App Store)

**Note:** iOS development requires a Mac with Xcode. You'll need to do these steps on a Mac.

1. **Open in Xcode**
   ```bash
   cd ios/App
   open App.xcodeproj
   ```

2. **Configure Signing**
   - Add your Apple Developer team
   - Set up bundle identifier: `com.tradequest.app`
   - Configure code signing

3. **Build and Archive**
   - Build for archive in Xcode
   - Upload to App Store Connect

4. **Complete App Store Listing**
   - Go to https://appstoreconnect.apple.com
   - Create app listing
   - Add screenshots, icons, description
   - Submit for review

**See `ios/INSTRUCTIONS.md` for detailed steps.**

## Important Notes

### Security
- **NEVER** commit your keystore file to version control
- **NEVER** commit keystore.properties with real passwords
- Keep your keystore in a secure location
- If you lose your keystore, you cannot update your app

### Developer Accounts
- **Android:** Google Play Developer Account ($25 one-time fee)
- **iOS:** Apple Developer Account ($99/year)

### Assets Needed
You'll need to create:
- App icons (various sizes for both platforms)
- Screenshots (various device sizes)
- Feature graphic (for Play Store)
- Privacy policy URL
- Support/contact URL

## Next Steps

1. Decide which store(s) you want to target first
2. Create the necessary developer account(s)
3. Follow the platform-specific instructions above
4. Generate your assets (icons, screenshots)
5. Submit for review

## Quick Reference

- **Android Build:** `cd android && gradlew.bat bundleRelease`
- **Android Keystore:** `keytool -genkey -v -keystore release.keystore -alias tradequest -keyalg RSA -keysize 2048 -validity 10000`
- **iOS:** Open `ios/App/App.xcodeproj` in Xcode on a Mac

## Troubleshooting

If you encounter issues:
- Check `android/INSTRUCTIONS.md` for Android-specific help
- Check `ios/INSTRUCTIONS.md` for iOS-specific help
- Ensure you have the correct SDK versions installed
- Make sure all dependencies are installed (`npm install`)

Good luck with your app store submission!

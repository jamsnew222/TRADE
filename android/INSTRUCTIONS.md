# Android Play Store Submission Instructions

## Prerequisites
- Java Development Kit (JDK) **21** — Capacitor 8 compiles with `sourceCompatibility 21`; JDK 17 fails with "invalid source release: 21"
- Android SDK (command-line tools are sufficient; Android Studio optional)
  - Installed at `%LOCALAPPDATA%\Android\Sdk` on this machine
  - Required packages: `platform-tools`, `platforms;android-36`, `build-tools;36.0.0`
  - Accept licenses: `sdkmanager --licenses`
- `android/local.properties` must contain `sdk.dir=C:\\Users\\<you>\\AppData\\Local\\Android\\Sdk` (gitignored)
- Set `JAVA_HOME`, `ANDROID_HOME`, `ANDROID_SDK_ROOT` before running gradlew
- Google Play Developer Account ($25 one-time fee)
- Capacitor CLI already installed

## Steps to Submit to Play Store

### 1. Generate a Keystore File
Run this command in the android directory:
```bash
keytool -genkey -v -keystore release.keystore -alias tradequest -keyalg RSA -keysize 2048 -validity 10000
```

This will ask you to:
- Set a keystore password (store this securely!)
- Enter information about your organization
- Set a key password (store this securely!)

### 2. Update keystore.properties
A release keystore already exists at `android/app/release.keystore` with credentials
in `android/keystore.properties` (both gitignored). The file path in
`keystore.properties` resolves **relative to `android/app/`**, so the keystore
must live in the `app/` directory. **Back up both files** — the upload key is the
app's permanent Play Store identity.

Example:
```
MYAPP_RELEASE_STORE_FILE=release.keystore
MYAPP_RELEASE_STORE_PASSWORD=your_actual_store_password
MYAPP_RELEASE_KEY_ALIAS=tradequest
MYAPP_RELEASE_KEY_PASSWORD=your_actual_key_password
```

### 3. Build the Release APK
From the root directory:
```bash
cd android
./gradlew assembleRelease
```

The APK will be located at: `android/app/build/outputs/apk/release/app-release.apk`

### 4. OR Build the Release Bundle (Recommended for Play Store)
```bash
cd android
./gradlew bundleRelease
```

The AAB (Android App Bundle) will be located at: `android/app/build/outputs/bundle/release/app-release.aab`

**Note:** Google Play now requires AAB format instead of APK for new apps.

### 5. Create Play Store Listing
- Go to Google Play Console (https://play.google.com/console)
- Create a new app
- Fill in:
  - App name: "TradeCub"
  - Package name: `com.tradecub.app`
  - App icon (512x512)
  - Feature graphic (1024x500)
  - Screenshots (phone and tablet, various sizes)
  - Short description (80 characters)
  - Full description (4000 characters)
  - Category
  - Content rating questionnaire

### 6. Upload the App
- In Play Console, go to "Release" > "Production" or "Testing"
- Click "Create new release"
- Upload the AAB file from step 4
- Add release notes
- Review and submit

### 7. Complete Store Listing
- Ensure all required information is filled
- Add privacy policy URL (required)
- Add content rating
- Set pricing and distribution

### 8. Submit for Review
- After everything is complete, submit for review
- Review typically takes 1-3 days

## Important Security Notes
- **NEVER** commit your keystore file to version control
- **NEVER** commit keystore.properties to version control
- Keep your keystore and passwords in a secure location
- If you lose your keystore, you won't be able to update your app

## Common Issues
- If you get build errors, ensure you have the correct Android SDK versions
- On Windows, use `gradlew.bat` instead of `./gradlew`
- Ensure you have accepted Android SDK licenses: `sdkmanager --licenses`

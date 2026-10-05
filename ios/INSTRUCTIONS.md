# iOS App Store Submission Instructions

Since iOS development requires a Mac with Xcode, these steps must be completed on a Mac computer.

## Prerequisites
- Mac computer with macOS
- Xcode installed (latest version from App Store)
- Apple Developer Account ($99/year)
- Capacitor CLI already installed

## Steps to Submit to App Store

### 1. Open the Project in Xcode
```bash
cd ios/App
open App.xcodeproj
```

### 2. Configure Signing & Capabilities
- In Xcode, select the "App" target
- Go to "Signing & Capabilities" tab
- Add your Apple Developer team
- Ensure "Automatically manage signing" is checked
- Bundle Identifier should be: `com.tradequest.app`

### 3. Configure App Information
- In Xcode, go to "General" tab
- Set Display Name: "TradeQuest"
- Set Version: "1.0"
- Set Build: "1"

### 4. Add Required Icons
- Create app icons in various sizes (1024x1024 for App Store, various sizes for iOS)
- Add them to the Assets.xcassets folder in Xcode

### 5. Configure Info.plist
- Add any required permissions if your app needs them
- Currently, the app only needs internet access

### 6. Build for Archive
- In Xcode, select "Any iOS Device" as the target
- Product > Archive
- This will create an archive

### 7. Upload to App Store Connect
- After archive is created, the Organizer window will open
- Click "Distribute App"
- Follow the prompts to upload to App Store Connect

### 8. Complete App Store Listing
- Go to App Store Connect (https://appstoreconnect.apple.com)
- Create a new app listing
- Fill in:
  - App name
  - Description
  - Screenshots (required for various device sizes)
  - App icon (1024x1024)
  - Category
  - Age rating
  - Privacy policy URL
  - Support URL

### 9. Submit for Review
- After all information is complete, submit for review
- Review typically takes 1-3 days

## Notes
- You'll need to generate a Distribution Certificate in Xcode
- You'll need to create an App Store Connect record before uploading
- Ensure you have proper test devices configured for TestFlight if needed

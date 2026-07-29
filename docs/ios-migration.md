# iOS Migration Guide: Memorization Station

This document outlines the recommended technical path for transforming this Next.js web application into a high-performance native iOS application.

## Strategy A: The PWA Path (Fastest)

Since the app is already configured as a Progressive Web App (PWA), the most immediate way to get it onto an iPhone is via Safari's "Add to Home Screen" feature.

### 1. Hardened Meta Tags
The `src/app/layout.tsx` already includes the necessary `apple-mobile-web-app-capable` and `viewportFit=cover` tags. These ensure the app runs without a browser URL bar and fills the screen, including the status bar area.

### 2. User Prompting
Consider adding a "Install on iOS" banner that triggers only for Safari mobile users, guiding them to click the "Share" icon and then "Add to Home Screen."

---

## Strategy B: Capacitor Native Shell (Professional)

For a real App Store presence, use **Capacitor** (by Ionic). It wraps your web code in a native WKWebView and provides access to native iOS APIs.

### 1. Preparation
Ensure the Next.js build is exported as a static site (SSG).
In `next.config.ts`:
```ts
const nextConfig = {
  output: 'export', // Required for Capacitor
  images: {
    unoptimized: true, // Local images only
  }
}
```

### 2. Installation
```bash
npm install @capacitor/core @capacitor/cli
npx cap init
npm install @capacitor/ios
npx cap add ios
```

### 3. Sync & Open
```bash
npm run build
npx cap sync
npx cap open ios
```
This will open your project in **Xcode**. From here, you can set your bundle identifier, app icons, and launch screens.

---

## Architecture Considerations (Carmack's Audit)

### 1. Offline Assets
The app relies heavily on `image.pollinations.ai` and `picsum.photos`. For a true native experience, images should be cached aggressively. Our existing `IndexedDB` caching strategy is compatible with Capacitor.

### 2. Storage
`localStorage` is persistent on iOS but can be cleared by the OS under low-disk conditions. For high-fidelity archival, consider migrating to `@capacitor/preferences` or a SQLite plugin for the card database.

### 3. Safe Areas
Always use CSS `env(safe-area-inset-top)` and `bottom`. The current `src/app/globals.css` implements these via `.safe-area-padding` and `.pb-safe` classes.

## Next Steps
- Implement a **Service Worker** for true offline asset caching.
- Create a set of **App Store Assets** (1024x1024 icon).
- Configure **Push Notifications** (via Capacitor Push plugin) for daily practice reminders.

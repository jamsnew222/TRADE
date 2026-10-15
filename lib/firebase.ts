import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// Public web config — safe to embed (Firebase keys identify the project,
// they don't grant access; rules on Firestore do the protecting).
const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/** True only when the Firebase env config is present — otherwise the app
 *  runs in guest/local mode so dev and builds without a project still work. */
export const firebaseConfigured = Boolean(
  config.apiKey && config.authDomain && config.projectId && config.appId
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

export function getFirebaseAuth(): Auth | null {
  if (!firebaseConfigured || typeof window === 'undefined') return null;
  if (!app) app = getApps().length ? getApps()[0] : initializeApp(config);
  if (!auth) auth = getAuth(app);
  return auth;
}

export function getFirestoreDb(): Firestore | null {
  if (!firebaseConfigured || typeof window === 'undefined') return null;
  if (!app) app = getApps().length ? getApps()[0] : initializeApp(config);
  if (!db) db = getFirestore(app);
  return db;
}

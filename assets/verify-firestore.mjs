// End-to-end Firestore verification: sign in as the QA account, then
// exercise the same read/write paths the app uses (users/{uid} + leaderboard).
// Usage: node assets/verify-firestore.mjs
import { readFileSync } from 'node:fs';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, getDocs, collection, deleteField } from 'firebase/firestore';

const env = Object.fromEntries(
  readFileSync('.env.local', 'utf8').split('\n')
    .filter(l => l.includes('=') && !l.startsWith('#'))
    .map(l => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; })
);

const app = initializeApp({
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

const auth = getAuth(app);
const db = getFirestore(app);
const cred = await signInWithEmailAndPassword(auth, 'screenshots@tradecub.dev', 'Screenshot-QA-2026!');
const uid = cred.user.uid;
console.log('1. AUTH OK — uid:', uid);

// Mirror the app's login-merge upload shape (lib/progress-sync.ts writes {progress: ...})
const userRef = doc(db, 'users', uid);
await setDoc(userRef, { progress: {}, verifyPing: new Date().toISOString() }, { merge: true });
console.log('2. users/{uid} WRITE OK');

const snap = await getDoc(userRef);
console.log('3. users/{uid} READ OK — fields:', Object.keys(snap.data()).join(', '));

await setDoc(doc(db, 'leaderboard', uid), { xp: 1, name: 'qa-verify', streak: 0, avatar: 'bull' }, { merge: true });
console.log('4. leaderboard/{uid} WRITE OK');

const lb = await getDocs(collection(db, 'leaderboard'));
console.log('5. leaderboard READ OK — entries:', lb.size);

// clean up the ping field
await setDoc(userRef, { verifyPing: deleteField() }, { merge: true });
console.log('6. cleanup OK');
console.log('\nALL CHECKS PASSED');
process.exit(0);

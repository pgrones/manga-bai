import { getApps, initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';
import { connectAuthEmulator, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};

const app = getApps()[0] ?? initializeApp(firebaseConfig);
export const analytics = () => getAnalytics(app);
export const auth = getAuth(app);
export const db = getDatabase(app, process.env.NEXT_PUBLIC_DATABASE_URL);

if (process.env.NODE_ENV === 'development') {
  try {
    connectDatabaseEmulator(db, 'localhost', 9000);
    connectAuthEmulator(auth, 'http://localhost:9099');
    // eslint-disable-next-line no-empty
  } catch (error) {}
}

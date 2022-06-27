import { getApps, initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';
import { connectAuthEmulator, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};

const app = getApps()[0] ?? initializeApp(firebaseConfig);
export const analytics = () => getAnalytics(app);
export const auth = getAuth(app);
export const db = getDatabase(
  app,
  'https://mangabai-default-rtdb.europe-west1.firebasedatabase.app'
);

if (process.env.NODE_ENV === 'development') {
  try {
    connectDatabaseEmulator(db, 'localhost', 9000);
    connectAuthEmulator(auth, 'http://localhost:9099');
    // eslint-disable-next-line no-empty
  } catch (error) {}
}

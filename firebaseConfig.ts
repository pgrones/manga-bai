import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDgQApdVZbg7OPmtrsOAf5U5lsFNu5u21g',
  authDomain: 'mangabai.firebaseapp.com',
  projectId: 'mangabai',
  storageBucket: 'mangabai.appspot.com',
  messagingSenderId: '956180902451',
  appId: '1:956180902451:web:9ccce705e32ac4dfef6946',
  measurementId: 'G-854K4MFB8T'
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getDatabase(app);

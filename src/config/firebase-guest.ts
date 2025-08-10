import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Guest Firebase project configuration (loaded from environment variables for security)
const guestFirebaseConfig = {
  apiKey: import.meta.env.VITE_GUEST_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_GUEST_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_GUEST_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_GUEST_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_GUEST_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_GUEST_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_GUEST_FIREBASE_MEASUREMENT_ID
};

// Initialize Guest Firebase App with a unique name
const guestApp = initializeApp(guestFirebaseConfig, 'guest-app');

// Initialize Guest Firebase services
export const guestAuth = getAuth(guestApp);
export const guestDb = getFirestore(guestApp);
export const guestStorage = getStorage(guestApp);

// Initialize Analytics for guest app
export const guestAnalytics = typeof window !== 'undefined' && guestFirebaseConfig.measurementId 
  ? getAnalytics(guestApp) 
  : null;

export default guestApp;

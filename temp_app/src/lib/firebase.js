import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    // ⚠️ TODO: Replace with your Firebase Config from Console
    apiKey: "YOUR_API_KEY",
    authDomain: "anasnide-cmd.firebaseapp.com",
    projectId: "anasnide-cmd",
    storageBucket: "anasnide-cmd.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase only once
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const auth = getAuth(app);

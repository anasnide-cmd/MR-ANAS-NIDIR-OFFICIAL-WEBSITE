import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCzkVHHTpCFYiede77faaonqDiiV5S2C18",
    authDomain: "anas-nidir.firebaseapp.com",
    projectId: "anas-nidir",
    storageBucket: "anas-nidir.firebasestorage.app",
    messagingSenderId: "351701049742",
    appId: "1:351701049742:web:4faa788e224e e52afe84df"
};

// Initialize Firebase only once
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

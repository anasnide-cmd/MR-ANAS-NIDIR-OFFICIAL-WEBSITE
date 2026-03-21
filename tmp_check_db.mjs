import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

console.log("Initializing firebase...");
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function check() {
    console.log("Checking for slug: jemputanhariraya");
    const q = query(collection(db, 'user_sites'), where('slug', '==', 'jemputanhariraya'));
    const snap = await getDocs(q);
    if (snap.empty) {
        console.log("Site not found in DB.");
    } else {
        const data = snap.docs[0].data();
        console.log("Site found. Data:", JSON.stringify(data, null, 2));
    }
}
check().catch(console.error);

'use client';
import { useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function PresenceTracker() {
    useEffect(() => {
        let interval;

        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Initial update
                updatePresence(user.uid);

                // Periodic update every 60 seconds
                interval = setInterval(() => {
                    updatePresence(user.uid);
                }, 60000);
            } else {
                if (interval) clearInterval(interval);
            }
        });

        const updatePresence = async (uid) => {
            try {
                const userRef = doc(db, 'users', uid);
                await setDoc(userRef, {
                    lastActive: Date.now(), // Use local time for easier comparison or serverTimestamp()
                    // We use Date.now() here for simplicity in client-side comparison in admin panel
                }, { merge: true });
            } catch (err) {
                console.error("Presence update failed:", err);
            }
        };

        return () => {
            unsub();
            if (interval) clearInterval(interval);
        };
    }, []);

    return null; // This component doesn't render anything
}

import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Adds a log entry to the site's history sub-collection.
 * @param {string} siteId - The ID of the site.
 * @param {string} userId - The ID of the user performing the action.
 * @param {string} userName - The name of the user performing the action.
 * @param {string} action - Descriptive name of the action (e.g., "Updated name").
 * @param {Object} details - Optional object with more info about the change.
 */
export async function addSiteLog(siteId, userId, userName, action, details = {}) {
    if (!siteId) return;
    
    try {
        const historyRef = collection(db, 'user_sites', siteId, 'history');
        await addDoc(historyRef, {
            userId,
            userName: userName || 'Anonymous',
            action,
            details,
            timestamp: serverTimestamp()
        });
    } catch (err) {
        console.error("Failed to add site log:", err);
    }
}

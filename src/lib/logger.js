import { db, auth } from './firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs, doc, updateDoc } from 'firebase/firestore';

const LOGS_COLLECTION = 'system_logs';

/**
 * Reports an error to the system logs in Firestore.
 * @param {Error|string} error - The error object or message.
 * @param {string} context - Where the error occurred (e.g., 'HomeClient', 'API/search').
 * @param {Object} additionalData - Any extra metadata (e.g., component state).
 */
export const reportError = async (error, context = 'Unknown', additionalData = {}) => {
    try {
        const user = auth.currentUser;
        const errorMsg = error instanceof Error ? error.message : String(error);
        const stack = error instanceof Error ? error.stack : null;

        await addDoc(collection(db, LOGS_COLLECTION), {
            message: errorMsg,
            stack: stack,
            context: context,
            timestamp: serverTimestamp(),
            status: 'open', // open, resolved
            severity: 'error', // info, warning, error, critical
            metadata: {
                ...additionalData,
                url: typeof window !== 'undefined' ? window.location.href : 'server-side',
                userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server-side',
            },
            userId: user ? user.uid : 'anonymous',
            userEmail: user ? user.email : 'anonymous'
        });
        
        console.error(`[SystemLogger] Reported error in ${context}:`, error);
    } catch (loggingError) {
        console.error('[SystemLogger] Failed to report error:', loggingError);
    }
};

/**
 * Fetches recent system logs.
 * Must be called by an Admin.
 */
export const getSystemLogs = async (limitCount = 50) => {
    try {
        const q = query(
            collection(db, LOGS_COLLECTION),
            orderBy('timestamp', 'desc'),
            limit(limitCount)
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            // Convert Firestore Timestamp to JS Date for easier handling in UI
            timestamp: doc.data().timestamp?.toDate() || new Date() 
        }));
    } catch (error) {
        console.error('[SystemLogger] Failed to fetch logs:', error);
        throw error;
    }
};

/**
 * Marks a log entry as resolved.
 */
export const resolveLog = async (logId) => {
    try {
        const logRef = doc(db, LOGS_COLLECTION, logId);
        await updateDoc(logRef, {
            status: 'resolved',
            resolvedAt: serverTimestamp(),
            resolvedBy: auth.currentUser ? auth.currentUser.email : 'system'
        });
    } catch (error) {
        console.error('[SystemLogger] Failed to resolve log:', error);
        throw error;
    }
};

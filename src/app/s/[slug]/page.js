import { Suspense } from 'react';
import UserSiteClient from './UserSiteClient';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

// For static export, we need to provide generateStaticParams
// Fetch all user site slugs from Firestore to generate static pages
export const generateStaticParams = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'user_sites'));
        const slugs = querySnapshot.docs.map(doc => ({
            slug: doc.data().slug || doc.id // Assuming slug field or use id
        }));
        // Ensure at least one param for the route to be generated
        return slugs.length > 0 ? slugs : [{ slug: 'placeholder' }];
    } catch (error) {
        console.error('Error fetching static params:', error);
        // Fallback to placeholder
        return [{ slug: 'placeholder' }];
    }
};

export default function UserSitePage() {
    return (
        <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00f0ff' }}>Loading...</div>}>
            <UserSiteClient />
        </Suspense>
    );
}

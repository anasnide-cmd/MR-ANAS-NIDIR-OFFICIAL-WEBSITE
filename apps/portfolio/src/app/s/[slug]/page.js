import { Suspense } from 'react';
import UserSiteClient from './UserSiteClient';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

// For static export, we need to provide generateStaticParams
// Since Firebase might not work during build, we'll provide some default slugs
export const generateStaticParams = async () => {
    // Return some default slugs that we know exist or might exist
    // This ensures the dynamic route is generated even if Firebase fails
    return [
        { slug: 'myshop' },
        { slug: 'portfolio' },
        { slug: 'blog' },
        { slug: 'placeholder' }
    ];
};

export default function UserSitePage() {
    return (
        <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00f0ff' }}>Loading...</div>}>
            <UserSiteClient />
        </Suspense>
    );
}

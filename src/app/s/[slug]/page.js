import { Suspense } from 'react';
import UserSiteClient from './UserSiteClient';

// For static export, we need to provide generateStaticParams
// Return at least one placeholder param to ensure route is generated
// Actual sites will be handled client-side via Firebase queries
export const generateStaticParams = async () => {
    // Return a placeholder - actual routing handled client-side
    // Firebase Hosting rewrites will route all /s/* to this page
    return [{ slug: 'placeholder' }];
};

export default function UserSitePage() {
    return (
        <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00f0ff' }}>Loading...</div>}>
            <UserSiteClient />
        </Suspense>
    );
}

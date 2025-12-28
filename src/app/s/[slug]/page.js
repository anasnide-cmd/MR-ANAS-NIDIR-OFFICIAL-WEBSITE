import UserSiteClient from './UserSiteClient';

// For static export, we need to provide generateStaticParams
// Since sites are created dynamically, we return empty array
// and handle routing client-side with Firebase Hosting rewrites
export async function generateStaticParams() {
    // Return empty array - pages will be generated on-demand
    // This allows the route to work with static export
    // Firebase Hosting rewrites will handle routing to this page
    return [];
}

export default function UserSitePage({ params }) {
    return <UserSiteClient slug={params.slug} />;
}

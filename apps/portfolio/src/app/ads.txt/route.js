import { db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const dynamic = 'force-dynamic'; // Ensure it's not cached statically at build time if we want real-time updates
export const revalidate = 3600; // Cache for 1 hour (3600 seconds) to reduce DB reads

export async function GET() {
    try {
        // Query all sites with monetization enabled
        // Note: Firestore might need an index for this query if it's compound, but here we just filter in code if needed or simple query
        // "monetization.enabled" is a nested field.
        const q = query(
            collection(db, 'user_sites'), 
            where('monetization.enabled', '==', true)
        );

        const querySnapshot = await getDocs(q);
        
        const publisherIds = new Set();
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const pubId = data.monetization?.publisherId;
            // Validate format roughly (pub-xxxxxxxxxxxxxxxx)
            if (pubId && pubId.startsWith('pub-')) {
                publisherIds.add(pubId);
            }
        });

        // Always include the platform's own ID if applicable, or just users'.
        // Format: google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
        
        let fileContent = '# ads.txt for Mr Build Platform\n';
        fileContent += '# Inventory Partner Domain: anasnidir.com\n\n';

        publisherIds.forEach(id => {
            fileContent += `google.com, ${id}, DIRECT, f08c47fec0942fa0\n`;
        });

        return new Response(fileContent, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Cache-Control': 'public, max-age=3600, s-maxage=3600'
            },
        });

    } catch (error) {
        console.error('Error generating ads.txt:', error);
        return new Response('# Error generating file', { status: 500 });
    }
}

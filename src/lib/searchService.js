import { db } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { staticPages } from './siteIndex';

export async function getSearchResults(searchQuery) {
    const normalizedQuery = searchQuery.toLowerCase().trim();
    if (!normalizedQuery) return [];

    const results = [];

    // 1. Search Static Index (In-Memory)
    const staticResults = staticPages.filter(page => {
        const titleMatch = page.title.toLowerCase().includes(normalizedQuery);
        const descMatch = page.description.toLowerCase().includes(normalizedQuery);
        const keywordMatch = page.keywords.some(k => k.includes(normalizedQuery));
        return titleMatch || descMatch || keywordMatch;
    }).map(page => ({
        id: `static-${page.id}`,
        title: page.title,
        url: page.url,
        snippet: page.description,
        type: 'official'
    }));

    results.push(...staticResults);

    // 2. Search Dynamic Content (Firestore - Mr Build Sites)
    try {
        // improved search: checking if name >= query && name <= query + '\uf8ff' for prefix search
        // simplest for now: simple array contains simulation via client filtering if list is small, 
        // OR standard where clause. Firestore doesn't support native full-text search without extensions (Algolia/Typesense).
        // We will fetch public sites and filter in memory for "Proprietary" feel without external deps like Algolia.
        
        const q = query(
            collection(db, 'user_sites'), 
            where('status', '==', 'public')
        );
        
        const snapshot = await getDocs(q);
        const siteResults = [];
        
        snapshot.forEach(doc => {
            const data = doc.data();
            const name = (data.name || '').toLowerCase();
            const slug = (data.slug || '').toLowerCase();
            
            if (name.includes(normalizedQuery) || slug.includes(normalizedQuery)) {
                siteResults.push({
                    id: `site-${doc.id}`,
                    title: data.name || 'Untitled Deployment',
                    url: `/s/${data.slug}`,
                    snippet: `A public digital architecture built with MR BUILD. Hosted at /s/${data.slug}.`,
                    type: 'user-site'
                });
            }
        });

        results.push(...siteResults);

    } catch (error) {
        console.error("Error searching database:", error);
        // Fallback or just ignore DB errors
    }

    return results;
}

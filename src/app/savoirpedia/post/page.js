import { db } from '../../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import WikiArticle from '../../../components/Savoirpedia/WikiArticle';

// Helper function to fetch article by slug
async function getArticle(slug) {
    if (!slug) return null;
    
    // Note: Since this is running in Node (Next.js server), 
    // firebase/firestore needs to be compatible.
    // If using client SDK in a server component, it works for reading usually.
    try {
        const q = query(collection(db, 'posts'), where('slug', '==', slug));
        const snap = await getDocs(q);
        if (!snap.empty) {
            const doc = snap.docs[0];
            const data = doc.data();
            
            // Serialize for passing to client component
            return {
                id: doc.id,
                ...data,
                date: data.date ? (data.date.seconds ? data.date.seconds * 1000 : data.date) : Date.now(),
            };
        }
    } catch (err) {
        console.error("Error fetching article:", err);
    }
    return null;
}

export async function generateMetadata({ searchParams }) {
    const { slug } = await searchParams;
    const article = await getArticle(slug);

    if (!article) {
        return {
            title: 'Article Not Found - Savoirpedia',
            description: 'The requested article could not be found.',
        };
    }

    // Default image if none exists
    const ogImage = article.image || '/assets/logo.jpg'; 
    
    return {
        title: `${article.title} - Savoirpedia`,
        description: `Read about ${article.title} on Savoirpedia, the free encyclopedia.`,
        openGraph: {
            title: article.title,
            description: `Read about ${article.title} on Savoirpedia.`,
            url: `https://mr-anas-nidir-official-website.web.app/savoirpedia/post?slug=${slug}`, // Replace with actual domain if known
            siteName: 'Savoirpedia',
            images: [
                {
                    url: ogImage,
                    width: 800,
                    height: 600,
                    alt: article.title,
                },
            ],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: `Read about ${article.title} on Savoirpedia.`,
            images: [ogImage],
        },
    };
}

export default async function WikiPostPage({ searchParams }) {
    const { slug } = await searchParams;
    const article = await getArticle(slug);

    return <WikiArticle article={article} />;
}

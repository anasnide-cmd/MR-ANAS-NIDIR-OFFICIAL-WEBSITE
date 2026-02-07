import { db } from '../../../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import WikiArticle from '../../../../components/Savoirpedia/WikiArticle';

// Helper function to fetch article by slug
async function getArticle(slug) {
    if (!slug) return null;
    
    try {
        const q = query(collection(db, 'posts'), where('slug', '==', slug));
        const snap = await getDocs(q);
        if (!snap.empty) {
            const doc = snap.docs[0];
            const data = doc.data();
            
            // Extract first image from content if 'image' field is missing
            let featuredImage = data.image;
            if (!featuredImage && data.content) {
                const imgMatch = data.content.match(/<img[^>]+src="([^">]+)"/);
                if (imgMatch && imgMatch[1]) {
                    featuredImage = imgMatch[1];
                }
            }

            // Serialize for passing to client component
            return {
                id: doc.id,
                ...data,
                image: featuredImage,
                date: data.date ? (data.date.seconds ? data.date.seconds * 1000 : data.date) : Date.now(),
            };
        }
    } catch (err) {
        console.error("Error fetching article:", err);
    }
    return null;
}

export async function generateMetadata({ params }) {
    // Next.js 15+ demands awaiting params
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    
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
            url: `https://mr-anas-nidir-official-website.web.app/savoirpedia/post/${slug}`,
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

export default async function WikiPostPage({ params }) {
    // Next.js 15+ demands awaiting params
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    
    const article = await getArticle(slug);

    return <WikiArticle article={article} />;
}

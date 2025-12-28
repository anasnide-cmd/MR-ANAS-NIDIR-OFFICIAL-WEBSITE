'use client';
import { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Emails that get verified badge
const VERIFIED_EMAILS = ['anasnide@gmail.com', 'ceo@anasnidir.com'];

export default function PostPage() {
    const params = useParams();
    const slug = decodeURIComponent(params.slug); // Decode URL-encoded slug
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const q = query(collection(db, 'posts'), where('slug', '==', slug));
                const snap = await getDocs(q);
                if (!snap.empty) {
                    const doc = snap.docs[0];
                    setPost({ id: doc.id, ...doc.data() });
                }
            } catch (err) {
                console.error("Error fetching post:", err);
            } finally {
                setLoading(false);
            }
        };
        if (slug) fetchPost();
    }, [slug]);

    if (loading) return <div className="section">Loading...</div>;

    if (!post) {
        return (
            <div className="section" style={{ textAlign: 'center' }}>
                <h1>Post Not Found</h1>
                <p>The post you're looking for doesn't exist.</p>
                <Link href="/blog" className="btn glow">Back to Blog</Link>
            </div>
        );
    }

    return (
        <main className="section" style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
            <Link href="/blog" style={{ color: '#00f0ff', marginBottom: 20, display: 'inline-block' }}>← Back to Blog</Link>

            <h1 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {post.title}
                {VERIFIED_EMAILS.includes(post.author) && (
                    <svg title="Verified Admin" style={{ width: 24, height: 24 }} viewBox="0 0 84 84" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#0064e0" fillRule="evenodd" d="m50.4.47c1.79-.97,4.02-.37,5.08,1.36l4.99,8.17,9.57.24c2.03.05,3.67,1.69,3.72,3.72l.24,9.57,8.17,4.99c1.74,1.06,2.34,3.3,1.36,5.08l-4.58,8.4,4.58,8.4c.97,1.79.37,4.02-1.36,5.08l-8.17,4.99-.24,9.57c-.05,2.03-1.69,3.67-3.72,3.72l-9.57.24-4.99,8.17c-1.06,1.74-3.3,2.34-5.08,1.36l-8.4-4.58-8.4,4.58c-1.79.97-4.02.37-5.08-1.36l-4.99-8.17-9.57-.24c-2.03-.05-3.67-1.69-3.72-3.72l-.24-9.57-8.17-4.99c-1.74-1.06-2.34-3.3-1.36-5.08l4.58-8.4L.47,33.6c-.97-1.79-.37-4.02,1.36-5.08l8.17-4.99.24-9.57c.05-2.03,1.69-3.67,3.72-3.72l9.57-.24L28.51,1.83c1.06-1.74,3.3-2.34,5.08-1.36l8.4,4.58L50.4.47Zm9.31,34.92c1.62-1.35,1.84-3.76.49-5.38-1.35-1.62-3.76-1.84-5.38-.49l-.26.21c-6.64,5.54-12.84,11.59-18.52,18.1l-6.62-6.62c-1.49-1.49-3.91-1.49-5.4,0-1.49,1.49-1.49,3.91,0,5.4l9.55,9.55c.76.76,1.8,1.16,2.87,1.11,1.07-.05,2.07-.55,2.76-1.37l.21-.26c6.06-7.27,12.77-13.98,20.04-20.04l.26-.21Z" />
                    </svg>
                )}
            </h1>

            <p style={{ color: '#9aa0a6', marginBottom: 30 }}>
                {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
                {post.author && <span> • By {post.author}</span>}
            </p>

            <article
                className="post-content"
                style={{ lineHeight: 1.8, fontSize: '1.1rem' }}
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <style jsx>{`
                .post-content :global(h2) { margin-top: 2em; }
                .post-content :global(p) { margin-bottom: 1em; }
                .post-content :global(code) { background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; }
            `}</style>
        </main>
    );
}

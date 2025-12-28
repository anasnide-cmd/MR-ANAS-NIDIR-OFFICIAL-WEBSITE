'use client';
import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import Link from 'next/link';

// Emails that get verified badge
const VERIFIED_EMAILS = ['anasnide@gmail.com', 'ceo@anasnidir.com'];

export default function BlogPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const q = query(collection(db, 'posts'), orderBy('date', 'desc'));
                const snap = await getDocs(q);
                setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
            } catch (err) {
                console.error("Error fetching posts:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <main className="container section">
            <header className="page-hero">
                <h1>Notes & Updates</h1>
                <p>Thoughts on engineering, product, and the indie stack.</p>
            </header>

            <div className="grid" style={{ justifyContent: 'flex-start' }}>
                {loading ? (
                    <p>Loading posts...</p>
                ) : posts.length > 0 ? (
                    posts.map((post) => (
                        <article key={post.id} className="card glass">
                            <h3>
                                {/* Note: You need to create [slug]/page.js to handle individual post views */}
                                <Link href={`/blog/${post.slug || '#'}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    {post.title}
                                </Link>
                                {VERIFIED_EMAILS.includes(post.author) && (
                                    <svg title="Verified Admin" style={{ marginLeft: 8, width: 18, height: 18, verticalAlign: 'middle' }} viewBox="0 0 84 84" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="#0064e0" fillRule="evenodd" d="m50.4.47c1.79-.97,4.02-.37,5.08,1.36l4.99,8.17,9.57.24c2.03.05,3.67,1.69,3.72,3.72l.24,9.57,8.17,4.99c1.74,1.06,2.34,3.3,1.36,5.08l-4.58,8.4,4.58,8.4c.97,1.79.37,4.02-1.36,5.08l-8.17,4.99-.24,9.57c-.05,2.03-1.69,3.67-3.72,3.72l-9.57.24-4.99,8.17c-1.06,1.74-3.3,2.34-5.08,1.36l-8.4-4.58-8.4,4.58c-1.79.97-4.02.37-5.08-1.36l-4.99-8.17-9.57-.24c-2.03-.05-3.67-1.69-3.72-3.72l-.24-9.57-8.17-4.99c-1.74-1.06-2.34-3.3-1.36-5.08l4.58-8.4L.47,33.6c-.97-1.79-.37-4.02,1.36-5.08l8.17-4.99.24-9.57c.05-2.03,1.69-3.67,3.72-3.72l9.57-.24L28.51,1.83c1.06-1.74,3.3-2.34,5.08-1.36l8.4,4.58L50.4.47Zm9.31,34.92c1.62-1.35,1.84-3.76.49-5.38-1.35-1.62-3.76-1.84-5.38-.49l-.26.21c-6.64,5.54-12.84,11.59-18.52,18.1l-6.62-6.62c-1.49-1.49-3.91-1.49-5.4,0-1.49,1.49-1.49,3.91,0,5.4l9.55,9.55c.76.76,1.8,1.16,2.87,1.11,1.07-.05,2.07-.55,2.76-1.37l.21-.26c6.06-7.27,12.77-13.98,20.04-20.04l.26-.21Z" />
                                    </svg>
                                )}
                            </h3>
                            <p className="meta">{new Date(post.date).toLocaleDateString()}</p>
                            <p>{post.content.substring(0, 100)}...</p>
                        </article>
                    ))
                ) : (
                    <p>No posts found. <Link href="/admin">Login to add content</Link>.</p>
                )}
            </div>

            <style jsx>{`
        .page-hero { margin-bottom: 40px; }
        .meta { color: #9aa0a6; font-size: 0.9rem; margin-bottom: 8px; }
      `}</style>
        </main>
    );
}

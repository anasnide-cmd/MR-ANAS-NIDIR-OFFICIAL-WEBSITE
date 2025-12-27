'use client';
import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import Link from 'next/link';

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

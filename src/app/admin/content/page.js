'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../../lib/firebase';
import Loader from '../../../components/Loader';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Link from 'next/link';

export default function ContentPage() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            if (u) {
                fetchPosts();
            } else {
                setLoading(false);
            }
        });
        return () => unsub();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, 'posts'), orderBy('date', 'desc'));
            const snap = await getDocs(q);
            setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        try {
            await deleteDoc(doc(db, 'posts', id));
            setPosts(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            alert('Error deleting: ' + err.message);
        }
    };

    if (loading) return <Loader text="Loading Content..." />;
    if (!user) return <div>Access Denied</div>;

    return (
        <div className="content-view animate-fade-in">
            <header className="page-header">
                <div>
                    <Link href="/admin" className="back-link">← Dashboard</Link>
                    <h1>Content Registry</h1>
                    <p className="subtitle">Managing {posts.length} Blog Posts</p>
                </div>
                <Link href="/admin/editor" className="btn-modern glow-blue">
                    ✍️ Create New Post
                </Link>
            </header>

            <div className="glass table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Slug</th>
                            <th>Date</th>
                            <th>Author</th>
                            <th align="right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => (
                            <tr key={post.id} className="post-row">
                                <td>
                                    <span className="post-title">{post.title}</span>
                                </td>
                                <td><code className="slug-tag">{post.slug}</code></td>
                                <td><span className="date-tag">{post.date ? new Date(post.date).toLocaleDateString() : 'Unknown'}</span></td>
                                <td><span className="author-tag">{post.author}</span></td>
                                <td align="right">
                                    <Link href={`/admin/editor?id=${post.id}`} className="btn-icon edit">✏️</Link>
                                    <button onClick={() => handleDelete(post.id)} className="btn-icon delete">🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {posts.length === 0 && <div className="empty-state">No content found. Start writing!</div>}
            </div>

            <style jsx>{`
                .page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 30px; }
                .back-link { color: #00f0ff; text-decoration: none; font-size: 0.9rem; font-weight: 700; display: block; margin-bottom: 10px; }
                h1 { font-size: 2rem; margin: 0; }

                .btn-modern { 
                    padding: 10px 20px; border-radius: 12px; font-weight: 700; text-decoration: none; display: inline-block; transition: all 0.3s; 
                }
                .glow-blue { background: #00f0ff; color: #000; box-shadow: 0 0 20px rgba(0, 240, 255, 0.2); }
                .glow-blue:hover { transform: translateY(-3px); box-shadow: 0 5px 25px rgba(0, 240, 255, 0.4); }

                .admin-table { width: 100%; border-collapse: collapse; }
                .admin-table th { text-align: left; padding: 20px; opacity: 0.5; font-size: 0.8rem; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.05); }
                .admin-table td { padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.02); vertical-align: middle; }

                .post-title { font-weight: 700; font-size: 1.1rem; color: #fff; }
                .slug-tag { background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 0.8rem; }
                .author-tag { opacity: 0.6; font-size: 0.9rem; }
                
                .btn-icon { background: rgba(255,255,255,0.05); border: none; cursor: pointer; padding: 8px; border-radius: 6px; margin-left: 5px; font-size: 1.1rem; transition: all 0.2s; text-decoration: none; display: inline-block; }
                .btn-icon:hover { background: rgba(255,255,255,0.1); transform: scale(1.1); }
                .btn-icon.delete:hover { background: rgba(255, 50, 50, 0.2); color: #ff3232; }

                .empty-state { padding: 50px; text-align: center; opacity: 0.5; font-style: italic; }

                .glass { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(10px); border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); }
                .animate-fade-in { animation: fadeIn 0.5s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
}

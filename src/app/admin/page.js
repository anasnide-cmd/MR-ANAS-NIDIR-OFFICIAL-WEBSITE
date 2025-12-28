'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../lib/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Link from 'next/link';

// ⚠️ OWNER EMAIL(S) - Only these emails can access the admin dashboard
const ALLOWED_ADMINS = [
    'anasnide@gmail.com',
    'ceo@anasnidir.com',
];

export default function AdminPage() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            if (u) fetchPosts();
            setLoading(false);
        });
        return () => unsub();
    }, []);

    const fetchPosts = async () => {
        const q = query(collection(db, 'posts'), orderBy('date', 'desc'));
        const snap = await getDocs(q);
        setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            alert('Login failed: ' + err.message);
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (err) {
            alert('Google Login failed: ' + err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete post?')) return;
        await deleteDoc(doc(db, 'posts', id));
        fetchPosts();
    };

    if (loading) return <div className="section">Loading...</div>;

    // Check if user is allowed (Owner Only)
    const isOwner = user && ALLOWED_ADMINS.includes(user.email);

    if (user && !isOwner) {
        return (
            <div className="section" style={{ maxWidth: 500, margin: '100px auto', textAlign: 'center' }}>
                <h1 style={{ color: 'red' }}>⛔ Access Denied</h1>
                <p>You are logged in as <strong>{user.email}</strong></p>
                <p>This area is restricted to site owners only.</p>
                <button onClick={() => signOut(auth)} className="btn" style={{ marginTop: 20 }}>Logout</button>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="section login-container">
                <div className="card glass login-card">
                    <h1>Admin Login</h1>
                    <p style={{ opacity: 0.6, marginBottom: 20 }}>Welcome back, please sign in.</p>
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                        <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required className="admin-input" />
                        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="admin-input" />
                        <button type="submit" className="btn glow">Login</button>

                        <div className="separator"><span>OR</span></div>

                        <button type="button" onClick={handleGoogleLogin} className="btn google-btn">
                            <span className="google-icon">G</span> Login with Google
                        </button>
                    </form>
                </div>

                <style jsx>{`
                    .login-container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 80vh;
                    }
                    .login-card {
                        width: 100%;
                        max-width: 400px;
                        padding: 40px;
                        text-align: center;
                    }
                    .admin-input {
                        padding: 12px;
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 8px;
                        color: #fff;
                        transition: border 0.3s;
                    }
                    .admin-input:focus {
                        border-color: #00f0ff;
                        outline: none;
                    }
                    .separator {
                        position: relative;
                        margin: 20px 0;
                        text-align: center;
                    }
                    .separator::before {
                        content: '';
                        position: absolute;
                        left: 0;
                        top: 50%;
                        width: 100%;
                        height: 1px;
                        background: rgba(255, 255, 255, 0.1);
                    }
                    .separator span {
                        position: relative;
                        background: #0a0a0a;
                        padding: 0 10px;
                        color: rgba(255, 255, 255, 0.4);
                        font-size: 0.8rem;
                    }
                    .google-btn {
                        background: #fff;
                        color: #000;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;
                    }
                    .google-icon {
                        font-weight: 900;
                        color: #4285F4;
                    }
                `}</style>
            </div>
        );
    }

    // Main Dashboard View
    return (
        <div className="dashboard-view">
            <header className="dashboard-header">
                <div>
                    <h1>Welcome, {user.displayName || 'Admin'}</h1>
                    <p style={{ opacity: 0.6 }}>Manage your content and site settings here.</p>
                </div>
                <div className="stats-mini">
                    <div className="stat-pill">
                        <span className="pill-count">{posts.length}</span>
                        <span className="pill-label">Total Posts</span>
                    </div>
                </div>
            </header>

            <section className="posts-section">
                <div className="section-header">
                    <h2>Recent Posts</h2>
                    <Link href="/admin/editor" className="btn glow">+ New Post</Link>
                </div>

                <div className="posts-grid">
                    {posts.map(post => (
                        <div key={post.id} className="post-row card glass">
                            <div className="post-info">
                                <h3>{post.title}</h3>
                                <span className="post-date">{post.date}</span>
                            </div>
                            <div className="post-actions">
                                <Link href={`/admin/editor?id=${post.id}`} className="action-link edit">Edit</Link>
                                <button onClick={() => handleDelete(post.id)} className="action-link delete">Delete</button>
                            </div>
                        </div>
                    ))}
                    {posts.length === 0 && <p style={{ opacity: 0.5 }}>No posts yet.</p>}
                </div>
            </section>

            <style jsx>{`
                .dashboard-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 40px;
                }
                .stat-pill {
                    background: rgba(0, 240, 255, 0.1);
                    border: 1px solid rgba(0, 240, 255, 0.2);
                    padding: 8px 16px;
                    border-radius: 100px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .pill-count {
                    color: #00f0ff;
                    font-weight: bold;
                    font-size: 1.2rem;
                }
                .pill-label {
                    font-size: 0.8rem;
                    opacity: 0.8;
                }
                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }
                .posts-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
                .post-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px 25px;
                    transition: transform 0.3s;
                }
                .post-row:hover {
                    transform: translateX(5px);
                    background: rgba(255, 255, 255, 0.05);
                }
                .post-date {
                    font-size: 0.8rem;
                    opacity: 0.5;
                }
                .post-actions {
                    display: flex;
                    gap: 20px;
                }
                .action-link {
                    font-size: 0.9rem;
                    text-decoration: none;
                    font-weight: 500;
                    transition: opacity 0.3s;
                    cursor: pointer;
                    background: none;
                    border: none;
                }
                .action-link:hover {
                    opacity: 0.7;
                }
                .edit { color: #00f0ff; }
                .delete { color: #ff3232; }
            `}</style>
        </div>
    );
}

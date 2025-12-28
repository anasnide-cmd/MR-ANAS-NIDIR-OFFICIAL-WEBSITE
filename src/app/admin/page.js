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
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authLoading, setAuthLoading] = useState(false);

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

    const handleGoogleLogin = async () => {
        setAuthLoading(true);
        try {
            await signInWithPopup(auth, new GoogleAuthProvider());
        } catch (err) {
            alert(err.message);
        } finally {
            setAuthLoading(false);
        }
    };

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setAuthLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            alert(err.message);
        } finally {
            setAuthLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        try {
            await deleteDoc(doc(db, 'posts', id));
            setPosts(posts.filter(p => p.id !== id));
        } catch (err) {
            alert('Error deleting post: ' + err.message);
        }
    };

    if (loading) return <div className="loading-state">Initializing Dashboard...</div>;

    if (!user) {
        return (
            <div className="login-container animate-fade-in">
                <div className="login-card glass">
                    <div className="login-header">
                        <div className="login-logo">A</div>
                        <h1>Admin Engine</h1>
                        <p>Authorized personnel only. Access terminal restricted.</p>
                    </div>

                    <form onSubmit={handleEmailLogin} className="login-form">
                        <div className="input-field">
                            <input
                                type="email"
                                placeholder="Email Identity"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-field">
                            <input
                                type="password"
                                placeholder="Security Key"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-login" disabled={authLoading}>
                            {authLoading ? '🔐 Verifying...' : '⚡ Establish Connection'}
                        </button>
                    </form>

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    <button className="btn-google" onClick={handleGoogleLogin} disabled={authLoading}>
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" alt="" />
                        Sync with Google Space
                    </button>

                    <p className="login-footer">System v2.0 • Secured by NEXENGINE</p>
                </div>

                <style jsx>{`
                    .login-container {
                        height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: radial-gradient(circle at center, #1a1a2e 0%, #020202 100%);
                        padding: 20px;
                    }
                    .login-card {
                        width: 100%;
                        max-width: 450px;
                        padding: 50px;
                        border-radius: 30px;
                        text-align: center;
                    }
                    .login-header { margin-bottom: 40px; }
                    .login-logo {
                        width: 60px; height: 60px;
                        background: #00f0ff;
                        color: #000;
                        font-size: 2rem;
                        font-weight: 900;
                        border-radius: 15px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 20px;
                        box-shadow: 0 0 30px rgba(0, 240, 255, 0.4);
                    }
                    .login-header h1 { font-size: 2rem; font-weight: 800; margin-bottom: 10px; letter-spacing: -1px; }
                    .login-header p { opacity: 0.5; font-size: 0.9rem; line-height: 1.5; }

                    .login-form { display: flex; flex-direction: column; gap: 15px; }
                    .input-field input {
                        width: 100%;
                        background: rgba(255, 255, 255, 0.03);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        padding: 16px;
                        border-radius: 12px;
                        color: #fff;
                        font-size: 1rem;
                        transition: all 0.3s;
                    }
                    .input-field input:focus {
                        background: rgba(255, 255, 255, 0.07);
                        border-color: #00f0ff;
                        outline: none;
                        box-shadow: 0 0 15px rgba(0, 240, 255, 0.1);
                    }

                    .btn-login {
                        background: #00f0ff;
                        color: #000;
                        border: none;
                        padding: 16px;
                        border-radius: 12px;
                        font-weight: 800;
                        font-size: 1rem;
                        cursor: pointer;
                        transition: all 0.3s;
                    }
                    .btn-login:hover { transform: translateY(-2px); box-shadow: 0 5px 20px rgba(0, 240, 255, 0.3); }
                    .btn-login:disabled { opacity: 0.5; transform: none; }

                    .divider {
                        margin: 30px 0;
                        position: relative;
                        text-align: center;
                    }
                    .divider::before {
                        content: '';
                        position: absolute;
                        top: 50%; left: 0; right: 0;
                        height: 1px;
                        background: rgba(255, 255, 255, 0.1);
                    }
                    .divider span {
                        position: relative;
                        background: #0a0a0a;
                        padding: 0 15px;
                        font-size: 0.75rem;
                        font-weight: 800;
                        opacity: 0.4;
                    }

                    .btn-google {
                        width: 100%;
                        background: #fff;
                        color: #000;
                        border: none;
                        padding: 14px;
                        border-radius: 12px;
                        font-weight: 700;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 12px;
                        cursor: pointer;
                        transition: all 0.3s;
                    }
                    .btn-google:hover { background: #f0f0f0; transform: translateY(-2px); }
                    .btn-google img { width: 20px; height: 20px; }

                    .login-footer { margin-top: 40px; font-size: 0.75rem; opacity: 0.3; letter-spacing: 1px; font-weight: 700; }
                `}</style>
            </div>
        );
    }

    return (
        <div className="dashboard-view">
            <header className="page-header">
                <div className="welcome-area">
                    <span className="welcome-tag">DASHBOARD COMMAND</span>
                    <h1>Hello, {user.displayName?.split(' ')[0] || 'Anas'}</h1>
                    <p className="subtitle">Everything is under control. What's next?</p>
                </div>
                <Link href="/admin/editor" className="btn glow-blue">+ Express Post</Link>
            </header>

            <section className="stats-grid">
                <div className="stat-card glass animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <div className="stat-info">
                        <span className="stat-label">Total Articles</span>
                        <span className="stat-value">{posts.length}</span>
                    </div>
                    <div className="stat-icon pulse">📝</div>
                </div>
                <div className="stat-card glass animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <div className="stat-info">
                        <span className="stat-label">System Status</span>
                        <span className="stat-value">Active</span>
                    </div>
                    <div className="stat-icon glow-green">⚡</div>
                </div>
                <div className="stat-card glass animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    <div className="stat-info">
                        <span className="stat-label">Platform</span>
                        <span className="stat-value">Next.js</span>
                    </div>
                    <div className="stat-icon glow-purple">🚀</div>
                </div>
            </section>

            <section className="content-section animate-fade-in">
                <div className="section-bar">
                    <h2>Recent Content Management</h2>
                    <span className="count-badge">{posts.length} Posts</span>
                </div>

                <div className="posts-table-wrapper card glass">
                    <table className="posts-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Date Published</th>
                                <th align="right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post, idx) => (
                                <tr key={post.id} className="post-row" style={{ animationDelay: `${idx * 0.05}s` }}>
                                    <td>
                                        <div className="post-title-cell">
                                            <span className="post-avatar">{post.title.charAt(0)}</span>
                                            <strong>{post.title}</strong>
                                        </div>
                                    </td>
                                    <td><span className="date-tag">{post.date}</span></td>
                                    <td align="right">
                                        <div className="action-btns">
                                            <Link href={`/admin/editor?id=${post.id}`} className="btn-icon edit" title="Edit Content">✏️</Link>
                                            <button onClick={() => handleDelete(post.id)} className="btn-icon delete" title="Delete Permanent">🗑️</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {posts.length === 0 && (
                                <tr>
                                    <td colSpan="3" align="center" style={{ padding: '60px', opacity: 0.5 }}>
                                        No content found. Start by creating a new post.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            <style jsx>{`
                .loading-state {
                    height: 60vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #00f0ff;
                }
                .page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 50px;
                }
                .welcome-tag {
                    font-size: 0.65rem;
                    color: #00f0ff;
                    font-weight: 800;
                    letter-spacing: 2px;
                    background: rgba(0, 240, 255, 0.1);
                    padding: 4px 10px;
                    border-radius: 4px;
                    margin-bottom: 10px;
                    display: inline-block;
                }
                .subtitle { opacity: 0.6; font-size: 1.1rem; }
                
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 25px;
                    margin-bottom: 50px;
                }
                .stat-card {
                    padding: 30px;
                    border-radius: 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .stat-card:hover {
                    transform: translateY(-10px);
                    border-color: rgba(0, 240, 255, 0.3);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                }
                .stat-info { display: flex; flex-direction: column; }
                .stat-label { font-size: 0.85rem; opacity: 0.6; margin-bottom: 5px; }
                .stat-value { font-size: 1.8rem; font-weight: 800; }
                .stat-icon { font-size: 2rem; }

                .content-section { margin-top: 40px; }
                .section-bar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 25px;
                }
                .count-badge {
                    background: rgba(255, 255, 255, 0.05);
                    padding: 6px 15px;
                    border-radius: 10px;
                    font-size: 0.85rem;
                    font-weight: 600;
                }

                .posts-table-wrapper {
                    overflow-x: auto;
                    border-radius: 24px;
                    padding: 10px;
                }
                .posts-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .posts-table th {
                    text-align: left;
                    padding: 20px;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    opacity: 0.4;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }
                .posts-table td {
                    padding: 20px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
                }
                .post-row {
                    transition: background 0.3s;
                    animation: rowIn 0.5s ease-out forwards;
                    opacity: 0;
                }
                @keyframes rowIn {
                    from { opacity: 0; transform: translateX(-10px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .post-row:hover {
                    background: rgba(255, 255, 255, 0.02);
                }
                .post-title-cell {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }
                .post-avatar {
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #00f0ff 0%, #0064e0 100%);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 900;
                    color: #fff;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
                }
                .date-tag {
                    font-size: 0.85rem;
                    color: rgba(255, 255, 255, 0.5);
                    background: rgba(255, 255, 255, 0.05);
                    padding: 4px 10px;
                    border-radius: 6px;
                }
                .action-btns { display: flex; gap: 10px; justify-content: flex-end; }
                .btn-icon {
                    width: 38px;
                    height: 38px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                    font-size: 1.1rem;
                    transition: all 0.2s;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    cursor: pointer;
                }
                .btn-icon:hover {
                    transform: scale(1.1);
                    border-color: #fff;
                }
                .btn-icon.delete:hover { border-color: #ff3232; background: rgba(255, 50, 50, 0.1); }

                .animate-slide-up {
                    opacity: 0;
                    animation: slideUp 0.6s ease-out forwards;
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .glow-blue { box-shadow: 0 0 20px rgba(0, 240, 255, 0.2); }
                .glow-green { text-shadow: 0 0 15px rgba(0, 255, 136, 0.5); }
                .glow-purple { text-shadow: 0 0 15px rgba(188, 0, 255, 0.5); }
                .pulse { animation: pulse 2s infinite; }
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }

                @media (max-width: 768px) {
                    .page-header { flex-direction: column; align-items: flex-start; gap: 20px; }
                    .stats-grid { grid-template-columns: 1fr; }
                    .posts-table th:nth-child(2), .posts-table td:nth-child(2) { display: none; }
                }
            `}</style>
        </div>
    );
}

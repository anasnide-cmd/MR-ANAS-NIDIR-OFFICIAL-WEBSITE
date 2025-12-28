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
            <div className="section" style={{ maxWidth: 400, margin: '100px auto' }}>
                <h1>Admin / Login</h1>
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: 10 }} />
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: 10 }} />
                    <button type="submit" className="btn glow">Login</button>

                    <div style={{ textAlign: 'center', margin: '10px 0' }}>OR</div>

                    <button type="button" onClick={handleGoogleLogin} className="btn" style={{ background: '#fff', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                        {/* Simple G icon */}
                        <span style={{ fontWeight: 'bold', color: 'blue' }}>G</span> Login with Google
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="section container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Dashboard</h1>
                <button onClick={() => signOut(auth)} style={{ background: 'red', color: '#fff', border: 0, padding: '6px 12px', borderRadius: 4 }}>Logout</button>
            </div>

            <div style={{ margin: '20px 0', display: 'flex', gap: 15 }}>
                <Link href="/admin/editor" className="btn glow">+ New Post</Link>
                <Link href="/admin/settings" className="btn" style={{ background: '#333', color: '#fff' }}>⚙️ Site Settings</Link>
            </div>

            <div className="grid" style={{ justifyContent: 'flex-start' }}>
                {posts.map(post => (
                    <div key={post.id} className="card glass">
                        <h3>{post.title}</h3>
                        <p className="meta">{post.date}</p>
                        <div style={{ marginTop: 10 }}>
                            <Link href={`/admin/editor?id=${post.id}`} style={{ marginRight: 10, color: 'cyan' }}>Edit</Link>
                            <button onClick={() => handleDelete(post.id)} style={{ color: 'red', background: 'none', border: 0, cursor: 'pointer' }}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

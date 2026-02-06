'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../../lib/firebase';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ALLOWED_ADMINS = ['anasnide@gmail.com', 'ceo@anasnidir.com'];

export default function SavoirPediaDashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // New Feature States
    const [searchTerm, setSearchTerm] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            if (u) {
                setUser(u);
                setDisplayName(u.displayName || '');
                const adminStatus = ALLOWED_ADMINS.includes(u.email);
                setIsAdmin(adminStatus);
                fetchUserPosts(u.uid, adminStatus);
            } else {
                setLoading(false);
            }
        });
        return () => unsub();
    }, []);

    const fetchUserPosts = async (uid, isUserAdmin) => {
        try {
            let q;
            if (isUserAdmin) {
                q = query(collection(db, 'posts'));
            } else {
                q = query(collection(db, 'posts'), where('authorId', '==', uid));
            }

            const snap = await getDocs(q);
            const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            // Sort by date desc (client side for now since composite index might be missing)
            data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setPosts(data);
        } catch (err) {
            console.error("Error fetching posts:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (postId) => {
        if (!isAdmin && !confirm('Are you sure you want to delete this article? This action cannot be undone.')) return;
        if (isAdmin && !confirm('ADMIN WARNING: You are about to delete this article. This action cannot be undone.')) return;
        
        try {
            await deleteDoc(doc(db, 'posts', postId));
            setPosts(prev => prev.filter(p => p.id !== postId));
        } catch (err) {
            alert("Error deleting: " + err.message);
        }
    };

    const handleUpdateProfile = async () => {
        if (!displayName.trim()) return;
        setIsUpdatingProfile(true);
        try {
            await updateProfile(user, { displayName: displayName });
            alert("Profile Updated! Your new name will appear on future articles.");
        } catch (err) {
            alert("Error updating profile: " + err.message);
        } finally {
            setIsUpdatingProfile(false);
        }
    };

    // Derived State
    const filteredPosts = posts.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = {
        total: posts.length,
        published: posts.filter(p => p.status === 'active').length,
        drafts: posts.filter(p => p.status === 'draft').length,
        totalWords: posts.reduce((acc, curr) => acc + (curr.content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0), 0)
    };

    if (loading) return <div className="dash-container">Loading Dashboard...</div>;

    if (!user) {
        return (
            <div className="dash-container centered">
                <style jsx global>{` body { padding-top: 0 !important; } `}</style>
                <div className="login-prompt">
                    <h2>Access Denied</h2>
                    <p>Please login to manage your articles.</p>
                    <Link href="/mr-build" className="btn-primary">Login</Link>
                </div>
                <style jsx>{`
                     .dash-container { max-width: 100%; width: 100%; margin: 0; padding: 40px; min-height: 100vh; background: #1a1a1a; color: #fff; }
                    .centered { display: flex; align-items: center; justify-content: center; }
                    .login-prompt { text-align: center; background: #222; padding: 40px; border: 1px solid #333; }
                    .btn-primary { display: inline-block; margin-top: 20px; background: #00f0ff; color: #000; padding: 10px 20px; text-decoration: none; font-weight: bold; }
                `}</style>
            </div>
        );
    }

    return (
        <div className="dash-container">
            <style jsx global>{` body { padding-top: 0 !important; } `}</style>
            
            <header className="dash-header">
                <div className="header-left">
                    <h1>SavoirPedia Dashboard</h1>
                    <p>
                        Welcome back, <strong>{user.email}</strong>
                        {isAdmin && <span style={{marginLeft:'10px', color:'#00f0ff', fontSize:'0.8rem', border:'1px solid #00f0ff', padding:'2px 6px', borderRadius:'4px', letterSpacing:'1px'}}>ADMIN MODE</span>}
                    </p>
                </div>
                <div className="header-actions">
                    <Link href="/savoirpedia/editor" className="btn-create">
                        + New Article
                    </Link>
                    <Link href="/savoirpedia" className="btn-back">
                        View Hub
                    </Link>
                </div>
            </header>

            <div className="dashboard-grid">
                {/* Left Column: Stats & Profile */}
                <div className="sidebar-col">
                    <div className="panel profile-panel">
                        <h3>Author Profile</h3>
                        <div className="form-group">
                            <label>Display Name</label>
                            <input 
                                value={displayName} 
                                onChange={(e) => setDisplayName(e.target.value)} 
                                placeholder="e.g. Dr. Freeman"
                            />
                            <button onClick={handleUpdateProfile} disabled={isUpdatingProfile}>
                                {isUpdatingProfile ? 'Saving...' : 'Update Name'}
                            </button>
                        </div>
                    </div>

                    <div className="panel stats-panel">
                        <h3>Analytics</h3>
                        <div className="stat-item">
                            <span>Total Articles</span>
                            <strong>{stats.total}</strong>
                        </div>
                        <div className="stat-item">
                            <span>Published</span>
                            <strong>{stats.published}</strong>
                        </div>
                        <div className="stat-item">
                            <span>Drafts</span>
                            <strong>{stats.drafts}</strong>
                        </div>
                        <div className="stat-item">
                            <span>Est. Words</span>
                            <strong>{stats.totalWords.toLocaleString()}</strong>
                        </div>
                    </div>
                </div>

                {/* Right Column: Content Manager */}
                <div className="content-col">
                    <div className="filter-bar">
                        <input 
                            type="text" 
                            placeholder="Search your articles..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="content-panel">
                        {filteredPosts.length === 0 ? (
                            <div className="empty-state">
                                <p>No articles found.</p>
                                {posts.length === 0 && <Link href="/savoirpedia/editor">Start Writing</Link>}
                            </div>
                        ) : (
                            <table className="posts-table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th style={{textAlign: 'right'}}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPosts.map(post => (
                                        <tr key={post.id}>
                                            <td>
                                                <div className="post-title-cell">
                                                    <Link href={`/savoirpedia/post?slug=${post.slug}`} className="table-link">
                                                        {post.title}
                                                    </Link>
                                                    <span className="post-cat">{post.category}</span>
                                                </div>
                                            </td>
                                            <td data-label="Status">
                                                <span className={`status-badge ${post.status || 'active'}`}>
                                                    {post.status === 'draft' ? 'Draft' : 'Published'}
                                                </span>
                                            </td>
                                            <td data-label="Date">{new Date(post.date).toLocaleDateString()}</td>
                                            <td className="actions-cell" data-label="Actions">
                                                <div className="action-buttons">
                                                    <Link href={`/savoirpedia/editor?id=${post.id}`} className="btn-icon edit" title="Edit">
                                                        ✏️
                                                    </Link>
                                                    <button onClick={() => handleDelete(post.id)} className="btn-icon delete" title="Delete">
                                                        🗑️
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .dash-container {
                    max-width: 100%;
                    width: 100%;
                    margin: 0;
                    padding: 40px;
                    background: #1a1a1a;
                    color: #e0e0e0;
                    min-height: 100vh;
                    font-family: sans-serif;
                }
                
                .dash-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #333;
                    padding-bottom: 20px;
                    margin-bottom: 30px;
                }
                .header-left h1 { margin: 0; font-family: 'Georgia', serif; font-size: 2rem; color: #fff; }
                .header-left p { margin: 5px 0 0; color: #888; }
                
                .header-actions { display: flex; gap: 15px; }
                .btn-create {
                    background: #00f0ff; color: #000; padding: 10px 20px; 
                    text-decoration: none; font-weight: bold; border-radius: 4px;
                    white-space: nowrap;
                }
                .btn-back {
                    display: inline-flex; align-items: center;
                    background: #333; color: #fff; padding: 10px 20px; 
                    text-decoration: none; border-radius: 4px; border: 1px solid #444;
                    white-space: nowrap;
                }

                .dashboard-grid {
                    display: grid;
                    grid-template-columns: 300px 1fr;
                    gap: 30px;
                }

                .panel { background: #222; border: 1px solid #333; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
                .panel h3 { margin: 0 0 15px; color: #fff; font-size: 1.1rem; border-bottom: 1px solid #333; padding-bottom: 10px; }

                .form-group label { display: block; margin-bottom: 5px; color: #aaa; font-size: 0.9rem; }
                .form-group input { width: 100%; padding: 8px; background: #111; border: 1px solid #333; color: #fff; margin-bottom: 10px; }
                .form-group button { 
                    width: 100%; padding: 8px; background: #333; color: #fff; border: 1px solid #444; cursor: pointer;
                }

                .stat-item { display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid #2a2a2a; padding-bottom: 5px; }
                .stat-item span { color: #888; }
                .stat-item strong { color: #00f0ff; }

                .filter-bar { margin-bottom: 20px; }
                .search-input { width: 100%; padding: 12px; background: #222; border: 1px solid #333; color: #fff; font-size: 1rem; border-radius: 8px; }

                .content-panel { background: #222; border: 1px solid #333; border-radius: 8px; overflow: hidden; }
                
                .posts-table { width: 100%; border-collapse: collapse; }
                .posts-table th, .posts-table td { padding: 15px; text-align: left; border-bottom: 1px solid #333; }
                .posts-table th { background: #2a2a2a; color: #aaa; font-weight: normal; font-size: 0.9rem; }
                
                .post-title-cell { display: flex; flex-direction: column; }
                .post-cat { font-size: 0.8rem; color: #666; margin-top: 4px; }
                .table-link { color: #fff; text-decoration: none; font-weight: bold; font-size: 1.1rem; }
                .table-link:hover { text-decoration: underline; color: #00f0ff; }

                .status-badge { padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; text-transform: uppercase; background: #333; display: inline-block; }
                .status-badge.active { background: rgba(0, 240, 255, 0.1); color: #00f0ff; border: 1px solid rgba(0, 240, 255, 0.3); }
                .status-badge.draft { background: rgba(255, 165, 0, 0.1); color: orange; border: 1px solid rgba(255, 165, 0, 0.3); }

                .actions-cell { text-align: right; }
                .action-buttons { display: flex; justify-content: flex-end; gap: 10px; }
                .btn-icon { 
                    background: #333; border: 1px solid #444; 
                    font-size: 1.2rem; cursor: pointer; padding: 8px; 
                    border-radius: 6px; display: inline-flex; align-items: center; justify-content: center;
                    width: 40px; height: 40px; transition: all 0.2s;
                }
                .btn-icon:hover { background: #444; transform: translateY(-2px); }
                .btn-icon.delete:hover { border-color: red; background: rgba(255,0,0,0.1); }
                
                /* MOBILE RESPONSIVE STYLES */
                @media (max-width: 900px) {
                    .dashboard-grid { grid-template-columns: 1fr; }
                    .dash-container { padding: 20px 15px; }
                    
                    /* Header Stack */
                    .dash-header { flex-direction: column; align-items: flex-start; gap: 20px; }
                    .header-actions { width: 100%; justify-content: space-between; }
                    .btn-create, .btn-back { flex: 1; text-align: center; justify-content: center; }

                    /* Responsive Table -> Cards */
                    .posts-table, .posts-table tbody, .posts-table tr, .posts-table td {
                        display: block;
                        width: 100%;
                    }
                    .posts-table thead { display: none; }
                    
                    .posts-table tr {
                        background: #1a1a1a;
                        margin-bottom: 20px;
                        border: 1px solid #333;
                        border-radius: 12px;
                        padding: 15px;
                    }
                    
                    .posts-table td {
                        padding: 10px 0;
                        border-bottom: 1px solid #2a2a2a;
                        text-align: right;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .posts-table td:last-child { border-bottom: none; }
                    
                    .posts-table td::before {
                        content: attr(data-label);
                        font-weight: bold;
                        color: #666;
                        font-size: 0.85rem;
                        text-transform: uppercase;
                    }

                    /* Special Styling for Title Cell in Card Mode */
                    .posts-table td:first-child {
                        text-align: left;
                        display: block;
                    }
                    .posts-table td:first-child::before { display: none; }
                    .post-title-cell { margin-bottom: 5px; }
                    .table-link { font-size: 1.3rem; display: block; margin-bottom: 5px; }

                    /* Action Buttons Mobile */
                    .action-buttons { width: 100%; justify-content: flex-end; }
                }
                
                .empty-state { padding: 40px; text-align: center; color: #888; }
                .empty-state a { color: #00f0ff; margin-left: 10px; }
            `}</style>
        </div>
    );
}

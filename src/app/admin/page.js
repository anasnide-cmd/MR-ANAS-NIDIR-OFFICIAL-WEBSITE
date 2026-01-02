'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, orderBy, getDocs, deleteDoc, doc, updateDoc, setDoc, where } from 'firebase/firestore';
import Link from 'next/link';

export default function AdminPage() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    // New state for User Management
    const [allSites, setAllSites] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [permissionError, setPermissionError] = useState(false);
    const [viewMode, setViewMode] = useState('sites'); // 'sites', 'posts'

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            if (u) {
                fetchDashboardData();
            } else {
                setLoading(false);
            }
        });
        return () => unsub();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        setPermissionError(false);
        try {
            // Fetch Posts (Legacy)
            const postsQ = query(collection(db, 'posts'), orderBy('date', 'desc'));
            const postsSnap = await getDocs(postsQ);
            setPosts(postsSnap.docs.map(d => ({ id: d.id, ...d.data() })));

            // Fetch All Sites
            const sitesQ = query(collection(db, 'user_sites'), orderBy('updatedAt', 'desc'));
            const sitesSnap = await getDocs(sitesQ);
            const sitesData = sitesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
            setAllSites(sitesData);

            // Fetch User Configs (Limits)
            const usersQ = query(collection(db, 'users'));
            const usersSnap = await getDocs(usersQ);
            const usersConfig = {};
            usersSnap.forEach(doc => {
                usersConfig[doc.id] = doc.data();
            });

            // Synthesize User List from Sites & Configs
            const uniqueUserIds = [...new Set(sitesData.map(s => s.userId))];
            const synthesizedUsers = uniqueUserIds.map(uid => {
                const userSites = sitesData.filter(s => s.userId === uid);
                const config = usersConfig[uid] || {};
                return {
                    uid,
                    email: config.email || userSites[0]?.userEmail || 'Unknown User',
                    displayName: config.displayName || 'Architect',
                    siteLimit: config.siteLimit || 1, // Default limit
                    sites: userSites,
                    role: config.role || 'user'
                };
            });
            setUsersList(synthesizedUsers);

        } catch (err) {
            console.error("Error fetching dashboard:", err);
            if (err.code === 'permission-denied') {
                setPermissionError(true);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePost = async (id) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        try {
            await deleteDoc(doc(db, 'posts', id));
            setPosts(posts.filter(p => p.id !== id));
        } catch (err) {
            alert('Error deleting post: ' + err.message);
        }
    };

    // --- Admin Actions ---

    const updateSiteStatus = async (siteId, newStatus) => {
        // newStatus: 'active', 'banned', 'verified'
        try {
            await updateDoc(doc(db, 'user_sites', siteId), {
                adminStatus: newStatus
            });
            // Update local state
            setAllSites(prev => prev.map(s => s.id === siteId ? { ...s, adminStatus: newStatus } : s));
        } catch (err) {
            alert('Failed to update status: ' + err.message);
        }
    };

    const updateUserLimit = async (uid, newLimit) => {
        const limitVal = parseInt(newLimit);
        if (isNaN(limitVal) || limitVal < 0) return;

        try {
            // Validating we have the doc ref, create if not exists
            const userRef = doc(db, 'users', uid);
            await setDoc(userRef, { siteLimit: limitVal }, { merge: true });

            // Update local state
            setUsersList(prev => prev.map(u => u.uid === uid ? { ...u, siteLimit: limitVal } : u));
        } catch (err) {
            alert('Failed to update limit: ' + err.message);
        }
    };

    if (loading) return <div className="loading-state">Syncing Dashboard Data...</div>;
    if (!user) return <div className="loading-state">Access Denied</div>;
    if (permissionError) return (
        <div className="error-state">
            <div className="error-card glass">
                <h2>🚫 Access Denied</h2>
                <p>The system refused your connection request.</p>
                <div className="troubleshoot">
                    <h3>SYSTEM OVERRIDE REQUIRED</h3>
                    <p>To access this control panel, you must manually grant yourself <strong>Admin</strong> privileges in the database.</p>
                    <ol>
                        <li>Open Firebase Console -&gt; Firestore</li>
                        <li>Find collection <code>users</code></li>
                        <li>Find document matching your UID: <code>{user.uid}</code></li>
                        <li>Add field: <code>role: "admin"</code></li>
                    </ol>
                    <button onClick={fetchDashboardData} className="btn glow-blue">RETRY CONNECTION</button>
                </div>
            </div>
            <style jsx>{`
                .error-state { height: 80vh; display: flex; align-items: center; justify-content: center; }
                .error-card { padding: 40px; border: 1px solid #ff3232; border-radius: 20px; max-width: 500px; text-align: center; }
                h2 { color: #ff3232; margin-bottom: 20px; }
                .troubleshoot { margin-top: 30px; background: rgba(0,0,0,0.3); padding: 20px; border-radius: 10px; text-align: left; }
                h3 { color: #00f0ff; font-size: 0.9rem; margin-bottom: 10px; letter-spacing: 1px; }
                ol { margin-left: 20px; color: rgba(255,255,255,0.7); font-size: 0.9rem; line-height: 1.6; margin-bottom: 20px; }
                code { background: rgba(255,255,255,0.1); padding: 2px 5px; border-radius: 4px; font-family: monospace; }
                .btn { cursor: pointer; border: none; }
                .glass { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(10px); }
                .glow-blue { box-shadow: 0 0 20px rgba(0, 240, 255, 0.2); background: #00f0ff; color: #000; padding: 10px 20px; border-radius: 8px; font-weight: 700; width: 100%; }
            `}</style>
        </div>
    );

    return (
        <div className="dashboard-view">
            <header className="page-header">
                <div className="welcome-area">
                    <span className="welcome-tag">SYSTEM ADMIN</span>
                    <h1>Overseer Control</h1>
                    <p className="subtitle">Managing {allSites.length} Active Nodes across {usersList.length} Architects</p>
                </div>
                <div className="view-toggles">
                    <button
                        className={`toggle-btn ${viewMode === 'sites' ? 'active' : ''}`}
                        onClick={() => setViewMode('sites')}
                    >
                        User Nodes
                    </button>
                    <button
                        className={`toggle-btn ${viewMode === 'posts' ? 'active' : ''}`}
                        onClick={() => setViewMode('posts')}
                    >
                        Blog Content
                    </button>
                </div>
            </header>

            <section className="stats-grid">
                <div className="stat-card glass">
                    <div className="stat-info">
                        <span className="stat-label">Total Sites</span>
                        <span className="stat-value">{allSites.length}</span>
                    </div>
                </div>
                <div className="stat-card glass">
                    <div className="stat-info">
                        <span className="stat-label">Total Users</span>
                        <span className="stat-value">{usersList.length}</span>
                    </div>
                </div>
                <div className="stat-card glass">
                    <div className="stat-info">
                        <span className="stat-label">Flagged Nodes</span>
                        <span className="stat-value warning">
                            {allSites.filter(s => s.adminStatus === 'banned').length}
                        </span>
                    </div>
                </div>
            </section>

            {viewMode === 'sites' && (
                <section className="content-section animate-fade-in">
                    <div className="section-bar">
                        <h2>User & Node Management</h2>
                    </div>

                    <div className="glass table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>User ID / UUID</th>
                                    <th>Limit</th>
                                    <th>Deployed Sites</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersList.map(u => (
                                    <tr key={u.uid} className="user-row">
                                        <td className="user-cell">
                                            <div className="user-identity">
                                                <span className="user-name">{u.displayName || 'Unknown'}</span>
                                                <span className="user-email">{u.email}</span>
                                                <div className="uid-tag" title={u.uid}>{u.uid.substring(0, 8)}...</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="limit-control">
                                                <input
                                                    type="number"
                                                    value={u.siteLimit}
                                                    onChange={(e) => updateUserLimit(u.uid, e.target.value)}
                                                    className="limit-input"
                                                />
                                                <span className="limit-label">sites</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="user-sites-list">
                                                {u.sites.map(site => (
                                                    <div key={site.id} className={`mini-site-card ${site.adminStatus || 'active'}`}>
                                                        <div className="site-mini-header">
                                                            <strong>{site.title || site.name || 'Untitled'}</strong>
                                                            <a href={`/s/${site.slug}`} target="_blank" className="tiny-link">🔗</a>
                                                        </div>
                                                        <div className="site-mini-slug">/s/{site.slug}</div>
                                                        <div className="site-status-toggles">
                                                            <button
                                                                onClick={() => updateSiteStatus(site.id, 'active')}
                                                                className={`tiny-btn ${!site.adminStatus || site.adminStatus === 'active' ? 'active' : ''}`}
                                                                title="Normal"
                                                            >🟢</button>
                                                            <button
                                                                onClick={() => updateSiteStatus(site.id, 'verified')}
                                                                className={`tiny-btn ${site.adminStatus === 'verified' ? 'verified' : ''}`}
                                                                title="Verify (Premium)"
                                                            >💎</button>
                                                            <button
                                                                onClick={() => updateSiteStatus(site.id, 'banned')}
                                                                className={`tiny-btn ${site.adminStatus === 'banned' ? 'banned' : ''}`}
                                                                title="Ban/Suspend"
                                                            >🔴</button>
                                                        </div>
                                                    </div>
                                                ))}
                                                {u.sites.length === 0 && <span className="no-sites">No active deployments</span>}
                                            </div>
                                        </td>
                                        <td>
                                            <span className="role-badge">{u.role}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {viewMode === 'posts' && (
                <section className="content-section animate-fade-in">
                    <div className="section-bar">
                        <h2>Blog Content</h2>
                        <Link href="/admin/editor/" className="btn glow-blue">+ New Post</Link>
                    </div>
                    {/* Reusing existing table logic simpler for now */}
                    <div className="posts-table-wrapper card glass">
                        <table className="posts-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Date</th>
                                    <th align="right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post) => (
                                    <tr key={post.id} className="post-row">
                                        <td><strong>{post.title}</strong></td>
                                        <td><span className="date-tag">{post.date}</span></td>
                                        <td align="right">
                                            <button onClick={() => handleDeletePost(post.id)} className="btn-icon delete">🗑️</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            <style jsx>{`
                .loading-state { height: 60vh; display: flex; align-items: center; justify-content: center; color: #00f0ff; }
                .dashboard-view { padding-bottom: 100px; }
                .page-header { display: flex; justify-content: space-between; margin-bottom: 40px; align-items: flex-end; }
                .welcome-tag { color: #00f0ff; font-size: 0.7rem; font-weight: 800; letter-spacing: 2px; }
                h1 { margin: 5px 0; font-size: 2rem; }
                .subtitle { opacity: 0.6; }

                .view-toggles { display: flex; gap: 10px; background: rgba(255,255,255,0.05); padding: 5px; border-radius: 10px; }
                .toggle-btn { 
                    padding: 8px 20px; border-radius: 8px; border: none; background: transparent; color: #fff; cursor: pointer; font-weight: 600;
                    transition: all 0.3s;
                }
                .toggle-btn.active { background: #00f0ff; color: #000; }

                .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px; }
                .stat-card { padding: 20px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.05); }
                .stat-value { font-size: 2rem; font-weight: 800; display: block; }
                .stat-value.warning { color: #ff3232; }

                .admin-table { width: 100%; border-collapse: collapse; }
                .admin-table th { text-align: left; padding: 15px; opacity: 0.5; font-size: 0.8rem; text-transform: uppercase; }
                .admin-table td { padding: 15px; border-top: 1px solid rgba(255,255,255,0.05); vertical-align: top; }
                
                .user-identity { display: flex; flex-direction: column; gap: 4px; }
                .user-name { font-weight: 700; color: #fff; font-size: 0.95rem; }
                .user-email { font-size: 0.8rem; opacity: 0.6; }
                .uid-tag { font-family: monospace; background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px; display: inline-block; font-size: 0.7rem; width: fit-content; }
                
                .limit-control { display: flex; align-items: center; gap: 8px; }
                .limit-input { 
                    width: 50px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); 
                    color: #fff; padding: 5px; border-radius: 4px; text-align: center;
                }

                .user-sites-list { display: flex; flex-wrap: wrap; gap: 10px; }
                .mini-site-card { 
                    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); 
                    padding: 10px; border-radius: 8px; width: 180px;
                }
                .mini-site-card.banned { border-color: #ff3232; background: rgba(255, 50, 50, 0.05); }
                .mini-site-card.verified { border-color: #00ff88; box-shadow: 0 0 10px rgba(0, 255, 136, 0.1); }
                
                .site-mini-header { display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 5px; }
                .site-mini-slug { font-size: 0.75rem; opacity: 0.5; margin-bottom: 8px; font-family: monospace; }
                
                .site-status-toggles { display: flex; gap: 5px; justify-content: flex-end; }
                .tiny-btn { 
                    background: rgba(255,255,255,0.05); border: none; cursor: pointer; 
                    padding: 4px; border-radius: 4px; opacity: 0.3; transition: all 0.2s;
                }
                .tiny-btn:hover { opacity: 1; transform: scale(1.2); }
                .tiny-btn.active { opacity: 1; background: rgba(255,255,255,0.1); }
                .tiny-btn.verified { color: #00ff88; }
                .tiny-btn.banned { color: #ff3232; }

                .no-sites { opacity: 0.3; font-style: italic; font-size: 0.9rem; }
                .role-badge { 
                    background: rgba(112, 0, 255, 0.2); color: #bc00ff; 
                    padding: 4px 10px; border-radius: 100px; font-size: 0.7rem; font-weight: 800; 
                }

                /* Reuse existing styles */
                .glass { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(10px); }
                .glow-blue { box-shadow: 0 0 20px rgba(0, 240, 255, 0.2); background: #00f0ff; color: #000; padding: 8px 15px; border-radius: 8px; text-decoration: none; font-weight: 700; }
                .table-wrapper { border-radius: 20px; overflow: hidden; }
            `}</style>
        </div>
    );
}

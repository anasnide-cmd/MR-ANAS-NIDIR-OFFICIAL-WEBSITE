'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../lib/firebase';
import Loader from '../../components/Loader';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, orderBy, getDocs, limit, where } from 'firebase/firestore';
import Link from 'next/link';

export default function AdminDashboard() {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalSites: 0,
        totalPosts: 0,
        bannedSites: 0,
        verifiedSites: 0
    });
    const [recentSites, setRecentSites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [permissionError, setPermissionError] = useState(false);

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
            // Parallel fetching for performance
            const [usersSnap, sitesSnap, postsSnap] = await Promise.all([
                getDocs(collection(db, 'users')),
                getDocs(query(collection(db, 'user_sites'), orderBy('updatedAt', 'desc'))),
                getDocs(collection(db, 'posts'))
            ]);

            const sites = sitesSnap.docs.map(d => ({ id: d.id, ...d.data() }));

            setStats({
                totalUsers: usersSnap.size,
                totalSites: sitesSnap.size,
                totalPosts: postsSnap.size,
                bannedSites: sites.filter(s => s.adminStatus === 'banned').length,
                verifiedSites: sites.filter(s => s.adminStatus === 'verified').length
            });

            // Get recent 5 sites
            setRecentSites(sites.slice(0, 5));

        } catch (err) {
            console.error("Error fetching dashboard:", err);
            if (err.code === 'permission-denied') {
                setPermissionError(true);
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader text="Syncing Admin Core..." />;
    if (!user) return <div className="loading-state">Access Denied</div>;
    
    // Permission Error Component
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
                        <li>Add field: <code>role: &quot;admin&quot;</code></li>
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
        <div className="dashboard-overview animate-fade-in">
            <header className="page-header">
                <div>
                    <span className="welcome-tag">SYSTEM OVERVIEW</span>
                    <h1>Command Center</h1>
                    <p className="subtitle">System status and key metrics</p>
                </div>
                <div className="header-actions">
                     <span className="live-indicator">● SYSTEM ONLINE</span>
                </div>
            </header>

            {/* Quick Stats Row */}
            <div className="stats-grid">
                <Link href="/admin/users" className="stat-card glass hover-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-info">
                        <span className="stat-label">Total Users</span>
                        <span className="stat-value">{stats.totalUsers}</span>
                    </div>
                </Link>
                <Link href="/admin/sites" className="stat-card glass hover-card">
                    <div className="stat-icon">🌐</div>
                    <div className="stat-info">
                        <span className="stat-label">Total Sites</span>
                        <span className="stat-value">{stats.totalSites}</span>
                    </div>
                </Link>
                <Link href="/admin/content" className="stat-card glass hover-card">
                    <div className="stat-icon">📝</div>
                    <div className="stat-info">
                        <span className="stat-label">Total Posts</span>
                        <span className="stat-value">{stats.totalPosts}</span>
                    </div>
                </Link>
                <div className="stat-card glass">
                    <div className="stat-icon">⚠️</div>
                    <div className="stat-info">
                        <span className="stat-label">Flagged Nodes</span>
                        <span className="stat-value warning">{stats.bannedSites}</span>
                    </div>
                </div>
            </div>

            {/* Recent Activity Section */}
            <section className="dashboard-section glass">
                <div className="section-header">
                    <h2>Recent Deployments</h2>
                    <Link href="/admin/sites" className="view-all">View All Sites →</Link>
                </div>
                <div className="recent-list">
                    {recentSites.map(site => (
                        <div key={site.id} className="recent-item">
                            <div className="site-info">
                                <span className="site-name">{site.title || 'Untitled Site'}</span>
                                <span className="site-url">/s/{site.slug}</span>
                            </div>
                            <div className="site-meta">
                                <span className={`status-pill ${site.adminStatus || 'active'}`}>
                                    {site.adminStatus || 'active'}
                                </span>
                                <span className="time-ago">
                                    {site.updatedAt?.seconds ? new Date(site.updatedAt.seconds * 1000).toLocaleDateString() : 'Unknown'}
                                </span>
                            </div>
                        </div>
                    ))}
                    {recentSites.length === 0 && <p className="empty-state">No recent activity detected.</p>}
                </div>
            </section>

            <style jsx>{`
                .dashboard-overview { padding-bottom: 100px; }
                .page-header { 
                    display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; 
                }
                h1 { margin: 5px 0; font-size: 2.5rem; background: linear-gradient(to right, #fff, #aaa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .welcome-tag { color: #00f0ff; font-size: 0.7rem; font-weight: 800; letter-spacing: 2px; }
                .subtitle { opacity: 0.6; }
                .live-indicator { color: #00ff88; font-weight: 700; font-size: 0.8rem; border: 1px solid rgba(0, 255, 136, 0.2); padding: 5px 10px; border-radius: 20px; background: rgba(0, 255, 136, 0.1); }

                .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 40px; }
                .stat-card { 
                    padding: 25px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); 
                    display: flex; align-items: center; gap: 20px; text-decoration: none; color: inherit;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .hover-card:hover { transform: translateY(-5px); background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); }
                .stat-icon { font-size: 2rem; background: rgba(255,255,255,0.05); width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 15px; }
                .stat-value { font-size: 2rem; font-weight: 800; display: block; line-height: 1; margin-top: 5px; }
                .stat-label { font-size: 0.8rem; opacity: 0.6; text-transform: uppercase; letter-spacing: 1px; }
                .stat-value.warning { color: #ff3232; }

                .dashboard-section { padding: 30px; border-radius: 25px; border: 1px solid rgba(255,255,255,0.05); }
                .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.05); }
                .section-header h2 { font-size: 1.2rem; margin: 0; }
                .view-all { color: #00f0ff; text-decoration: none; font-size: 0.9rem; font-weight: 600; }
                
                .recent-item { 
                    display: flex; justify-content: space-between; align-items: center; 
                    padding: 15px; border-radius: 12px; margin-bottom: 8px;
                    background: rgba(255,255,255,0.02); transition: all 0.2s;
                }
                .recent-item:hover { background: rgba(255,255,255,0.05); }
                .site-info { display: flex; flex-direction: column; gap: 4px; }
                .site-name { font-weight: 700; color: #fff; }
                .site-url { font-family: monospace; font-size: 0.8rem; opacity: 0.5; }
                
                .site-meta { display: flex; align-items: center; gap: 15px; }
                .status-pill { font-size: 0.7rem; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; font-weight: 800; }
                .status-pill.active { background: rgba(0, 255, 136, 0.1); color: #00ff88; }
                .status-pill.banned { background: rgba(255, 50, 50, 0.1); color: #ff3232; }
                .status-pill.verified { background: rgba(0, 240, 255, 0.1); color: #00f0ff; }
                .time-ago { font-size: 0.8rem; opacity: 0.4; }

                .glass { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(10px); }
                .animate-fade-in { animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
}

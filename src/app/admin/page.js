'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../lib/firebase';
import Loader from '../../components/Loader';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, orderBy, getDocs, limit, where } from 'firebase/firestore';
import Link from 'next/link';
import CommandGrid, { GridItem } from '../../components/Admin/CommandGrid';
import SystemTerminal from '../../components/Admin/SystemTerminal';
import { Shield } from 'lucide-react';

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
    const [logs, setLogs] = useState([]);

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
            
            // Simulate System Logs
            setLogs([
                { timestamp: Date.now(), source: 'NET_SEC', message: 'SCANNING NETWORK TRAFFIC...', type: 'info' },
                { timestamp: Date.now() - 1000, source: 'AUTH', message: 'ADMIN ACCESS GRANTED', type: 'success' },
                { timestamp: Date.now() - 2500, source: 'DB_CORE', message: `SYNCED ${usersSnap.size} USER NODES`, type: 'info' },
                { timestamp: Date.now() - 4000, source: 'SYS', message: 'SYSTEM INTEGRITY: 100%', type: 'success' },
            ]);

        } catch (err) {
            console.error("Error fetching dashboard:", err);
            if (err.code === 'permission-denied') {
                setPermissionError(true);
            }
            setLogs(prev => [...prev, { timestamp: Date.now(), source: 'ERR', message: 'ACCESS DENIED: ' + err.message, type: 'error' }]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="cia-loading"><div className="loader-text">INITIALIZING COMMAND ACCESS...</div></div>;
    if (!user) return <div className="cia-loading error">ACCESS DENIED</div>;

    // Permission Error Component
    if (permissionError) return (
        <div className="error-state">
            <div className="error-card glass">
                <h2>🚫 SECURITY BREACH DETECTED</h2>
                <p>UNAUTHORIZED ACCESS ATTEMPT.</p>
                <div className="troubleshoot">
                    <h3>MANUAL OVERRIDE REQUIRED</h3>
                    <p>Grant <strong>Admin</strong> privileges in Firestore to proceed.</p>
                    <ol>
                        <li>Access Database Console</li>
                        <li>Update User Node: <code>{user.uid}</code></li>
                        <li>Set <code>role: "admin"</code></li>
                    </ol>
                    <button onClick={fetchDashboardData} className="btn-cia">RETRY HANDSHAKE</button>
                </div>
            </div>
            <style jsx>{`
                .error-state { height: 100vh; display: flex; align-items: center; justify-content: center; background: #000; color: var(--cia-alert); }
                .error-card { padding: 40px; border: 1px solid var(--cia-alert); background: rgba(255, 0, 0, 0.05); text-align: center; }
                h2 { margin-bottom: 20px; font-family: 'Orbitron', sans-serif; letter-spacing: 2px; }
                .btn-cia { background: var(--cia-alert); color: #000; border: none; padding: 15px 30px; font-weight: bold; cursor: pointer; margin-top: 20px; }
                .btn-cia:hover { background: #fff; }
                code { color: #fff; background: rgba(255,255,255,0.1); padding: 2px 5px; }
            `}</style>
        </div>
    );

    return (
        <main className="cia-dashboard">
            <div className="scanline-overlay"></div>
            
            <header className="cia-header">
                <div>
                    <h1 className="cia-title">OPTIC-ZERO <span className="sub">COMMAND CENTER</span></h1>
                    <div className="status-line">
                        <span className="blink">●</span> SYSTEM ONLINE :: SECURE CONNECTION ESTABLISHED
                    </div>
                </div>
                <div className="header-meta">
                    <Link href="/admin/god-mode" className="god-mode-link">⚡ GOD MODE</Link>
                    <span>USER: {user.email}</span>
                    <span>ID: {user.uid.slice(0, 8)}...</span>
                </div>
            </header>

            <CommandGrid>
                {/* Stats Row */}
                <GridItem colSpan={3} title="USER NODES">
                    <div className="stat-display">
                        <span className="value">{stats.totalUsers}</span>
                        <span className="label">REGISTERED AGENTS</span>
                    </div>
                </GridItem>
                <GridItem colSpan={3} title="ACTIVE SITES">
                    <div className="stat-display">
                        <span className="value cyan">{stats.totalSites}</span>
                        <span className="label">DEPLOYED PLATFORMS</span>
                    </div>
                </GridItem>
                <Link href="/admin/audit-logs" style={{display:'contents'}}>
                    <GridItem colSpan={3} title="SECURITY AUDIT" border={true} className="audit-item">
                        <div className="stat-display audit-display">
                            <span className="value red"><Shield size={32}/></span>
                            <span className="label">VIEW LOGS</span>
                        </div>
                    </GridItem>
                </Link>
                <GridItem colSpan={3} title="INTEL DATABASE">
                    <div className="stat-display">
                        <span className="value">{stats.totalPosts}</span>
                        <span className="label">ARCHIVED RECORDS</span>
                    </div>
                </GridItem>
                <GridItem colSpan={3} title="THREAT ALERTS">
                    <div className="stat-display">
                        <span className="value red">{stats.bannedSites}</span>
                        <span className="label">FLAGGED NODES</span>
                    </div>
                </GridItem>

                {/* Main Content Area */}
                <GridItem colSpan={8} rowSpan={4} title="GLOBAL DEPLOYMENT MAP" border={true}>
                    {/* Simulated Map Placeholder */}
                    <div className="map-placeholder">
                        <div className="grid-lines"></div>
                        <div className="radar-sweep"></div>
                        <div className="map-text">SATELLITE LINK ACTIVE...</div>
                    </div>
                </GridItem>

                <GridItem colSpan={4} rowSpan={2} title="SYSTEM TERMINAL">
                    <SystemTerminal logs={logs} height="100%" />
                </GridItem>

                <GridItem colSpan={4} rowSpan={2} title="RECENT DEPLOYMENTS">
                     <div className="recent-list">
                        {recentSites.map(site => (
                            <Link href={`/admin/sites`} key={site.id} className="recent-row">
                                <span className="site-name">{site.title || 'UNKNOWN_NODE'}</span>
                                <span className={`status ${site.adminStatus || 'active'}`}>
                                    {site.adminStatus === 'banned' ? 'CRITICAL' : 'NOMINAL'}
                                </span>
                            </Link>
                        ))}
                     </div>
                </GridItem>
            </CommandGrid>

            <style jsx global>{`
                .cia-dashboard {
                    background-color: transparent;
                    min-height: 100%;
                    color: #e2e8f0;
                    font-family: 'Inter', 'Roboto', sans-serif;
                    position: relative;
                }
                .scanline-overlay {
                    display: none;
                }
                .cia-header {
                    padding: 0 0 24px 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                }
                .cia-title { margin: 0; font-size: 1.5rem; color: #f8fafc; font-weight: 600; text-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
                .cia-title .sub { color: #cbd5e1; font-size: 1rem; font-weight: 400; margin-left: 8px; }
                .status-line { font-size: 0.85rem; margin-top: 5px; color: #4ade80; font-weight: 500; }
                .blink { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #4ade80; margin-right: 6px; box-shadow: 0 0 10px rgba(74, 222, 128, 0.5); }
                
                .header-meta { text-align: right; display: flex; flex-direction: column; font-size: 0.85rem; gap: 4px; color: #cbd5e1; }
                .god-mode-link { color: #fca5a5; text-decoration: none; font-weight: 500; border: 1px solid rgba(239, 68, 68, 0.3); padding: 4px 12px; align-self: flex-end; margin-bottom: 5px; border-radius: 16px; transition: all 0.2s; background: rgba(239, 68, 68, 0.1); }
                .god-mode-link:hover { background: rgba(239, 68, 68, 0.2); box-shadow: 0 0 15px rgba(239, 68, 68, 0.2); color: #fff; }

                /* Stats */
                .stat-display { display: flex; flex-direction: column; align-items: flex-start; justify-content: center; height: 100%; text-align: left; }
                .stat-display .value { font-size: 3.5rem; font-weight: 600; line-height: 1; color: #ffffff; text-shadow: 0 0 20px rgba(255,255,255,0.2); margin-bottom: 8px; }
                .stat-display .value.cyan { color: #d8b4fe; text-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
                .stat-display .value.red { color: #fca5a5; text-shadow: 0 0 20px rgba(239, 68, 68, 0.4); }
                .stat-display .label { font-size: 0.85rem; color: #94a3b8; font-weight: 500; text-transform: uppercase; letter-spacing: 1px; }

                /* Map Placeholder */
                .map-placeholder { 
                    width: 100%; height: 100%; 
                    background: radial-gradient(circle at center, rgba(168, 85, 247, 0.1) 0%, transparent 70%); 
                    position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; 
                    border-radius: 8px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .grid-lines { 
                    position: absolute; inset: 0; 
                    background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
                    background-size: 40px 40px;
                    transform: perspective(600px) rotateX(60deg) translateY(-100px) translateZ(-200px);
                    animation: gridMove 20s linear infinite;
                }
                @keyframes gridMove {
                    from { background-position: 0 0; }
                    to { background-position: 0 40px; }
                }
                .map-text { z-index: 2; color: #f8fafc; font-weight: 600; font-size: 1rem; letter-spacing: 2px; text-shadow: 0 0 10px rgba(168, 85, 247, 0.5); }

                /* Recent List */
                .recent-list { display: flex; flex-direction: column; gap: 8px; height: 100%; overflow-y: auto; padding-right: 8px; }
                .recent-list::-webkit-scrollbar { width: 4px; }
                .recent-list::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 4px; }
                .recent-row { 
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 12px 16px; background: rgba(255, 255, 255, 0.03); 
                    text-decoration: none; color: #cbd5e1; font-size: 0.9rem; 
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 8px;
                    transition: all 0.2s ease;
                }
                .recent-row:hover { background: rgba(255, 255, 255, 0.08); border-color: rgba(168, 85, 247, 0.3); transform: translateX(4px); }
                .status { font-weight: 600; font-size: 0.75rem; padding: 4px 10px; border-radius: 12px; }
                .status.active { color: #4ade80; background: rgba(74, 222, 128, 0.1); border: 1px solid rgba(74, 222, 128, 0.2); }
                .status.banned { color: #f87171; background: rgba(248, 113, 113, 0.1); border: 1px solid rgba(248, 113, 113, 0.2); }

                /* Loading */
                .cia-loading { height: 100vh; display: flex; align-items: center; justify-content: center; background: #000; color: var(--cia-accent); font-family: monospace; font-size: 1.5rem; }
                .loader-text { animation: flicker 0.2s infinite; }
            `}</style>
        </main>
    );
}

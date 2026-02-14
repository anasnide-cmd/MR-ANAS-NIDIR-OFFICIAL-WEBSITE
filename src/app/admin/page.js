'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../lib/firebase';
import Loader from '../../components/Loader';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, orderBy, getDocs, limit, where } from 'firebase/firestore';
import Link from 'next/link';
import CommandGrid, { GridItem } from '../../components/Admin/CommandGrid';
import SystemTerminal from '../../components/Admin/SystemTerminal';

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
                    background-color: var(--cia-bg);
                    min-height: 100vh;
                    color: var(--cia-accent);
                    font-family: 'Share Tech Mono', monospace;
                    position: relative;
                }
                .scanline-overlay {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
                    background-size: 100% 2px, 3px 100%;
                    pointer-events: none;
                    z-index: 100;
                }
                .cia-header {
                    padding: 20px 30px;
                    border-bottom: 2px solid var(--cia-accent);
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    background: rgba(0, 243, 255, 0.05);
                }
                .cia-title { margin: 0; font-size: 2rem; color: #fff; letter-spacing: 5px; }
                .cia-title .sub { color: var(--cia-accent); font-size: 1rem; }
                .status-line { font-size: 0.8rem; margin-top: 5px; color: var(--cia-success); }
                .blink { animation: flicker 1s infinite; margin-right: 5px; color: var(--cia-success); }
                
                .header-meta { text-align: right; display: flex; flex-direction: column; opacity: 0.7; font-size: 0.8rem; }

                /* Stats */
                .stat-display { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; }
                .stat-display .value { font-size: 3rem; font-weight: 900; line-height: 1; color: #fff; text-shadow: 0 0 10px rgba(255,255,255,0.5); }
                .stat-display .value.cyan { color: var(--cia-accent); text-shadow: 0 0 10px var(--cia-accent); }
                .stat-display .value.red { color: var(--cia-alert); text-shadow: 0 0 10px var(--cia-alert); }
                .stat-display .label { font-size: 0.7rem; opacity: 0.7; margin-top: 5px; letter-spacing: 1px; }

                /* Map Placeholder */
                .map-placeholder { width: 100%; height: 100%; background: #000; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; }
                .grid-lines { 
                    position: absolute; inset: 0; 
                    background-image: linear-gradient(var(--cia-accent) 1px, transparent 1px), linear-gradient(90deg, var(--cia-accent) 1px, transparent 1px);
                    background-size: 50px 50px;
                    opacity: 0.1;
                }
                .radar-sweep {
                    position: absolute; width: 100%; height: 100%;
                    background: conic-gradient(from 0deg, transparent 0deg, rgba(0, 243, 255, 0.1) 60deg, transparent 60deg);
                    animation: radar 4s infinite linear;
                    border-radius: 50%;
                }
                @keyframes radar { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .map-text { z-index: 2; background: #000; padding: 5px 10px; border: 1px solid var(--cia-accent); }

                /* Recent List */
                .recent-list { display: flex; flex-direction: column; gap: 5px; height: 100%; overflow-y: auto; padding-right: 5px; }
                .recent-row { display: flex; justify-content: space-between; padding: 8px; background: rgba(255,255,255,0.05); text-decoration: none; color: inherit; font-size: 0.8rem; border-left: 2px solid transparent; }
                .recent-row:hover { background: rgba(0, 243, 255, 0.1); border-left-color: var(--cia-accent); }
                .status.active { color: var(--cia-success); }
                .status.banned { color: var(--cia-alert); }

                /* Loading */
                .cia-loading { height: 100vh; display: flex; align-items: center; justify-content: center; background: #000; color: var(--cia-accent); font-family: monospace; font-size: 1.5rem; }
                .loader-text { animation: flicker 0.2s infinite; }
            `}</style>
        </main>
    );
}

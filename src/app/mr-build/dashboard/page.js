'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../../lib/firebase';
import { collection, query, where, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loader from '../../../components/Loader';
import SkeletonLoader from '../../../components/SkeletonLoader';

export default function BuildDashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [sites, setSites] = useState([]);
    const [userLimit, setUserLimit] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = onAuthStateChanged(auth, async (u) => {
            if (u) {
                setUser(u);

                // Fetch User Config (Limit) & Sync Profile
                try {
                    const userRef = doc(db, 'users', u.uid);
                    const userDoc = await getDoc(userRef);

                    // Sync basic profile data (safe fields)
                    const profileUpdate = {
                        email: u.email,
                        displayName: u.displayName || u.email?.split('@')[0] || 'Anonymous',
                        lastActive: new Date().toISOString()
                    };

                    if (userDoc.exists()) {
                        setUserLimit(userDoc.data().siteLimit || 1);
                        // Update profile if changed (merge)
                        await setDoc(userRef, profileUpdate, { merge: true });
                    } else {
                        // Create initial doc (rules allow this for safe fields)
                        await setDoc(userRef, profileUpdate);
                    }
                } catch (err) {
                    console.error("Error syncing user profile:", err);
                }

                const q = query(collection(db, 'user_sites'), where('userId', '==', u.uid));
                const snap = await getDocs(q);
                setSites(snap.docs.map(d => ({ id: d.id, ...d.data() })));
            }
            setLoading(false);
            if (!u) {
                router.push('/mr-build/login');
            }
        });
        return () => checkUser();
    }, [router]);

    // InitialAuth Loader before we even know if we are logged in
    // However, we want to show the dashboard skeleton if we are just fetching data.
    // user state is null initially, so we need to be careful.
    // If loading is true, we might return null or the skeleton structure if we want a skeleton dashboard.
    // Use standard Loader only for initial auth check if needed, but here we want skeleton inside the layout.
    
    if (loading && !user) return <Loader text="Authenticating..." />; 
    if (!user) return null;

    return (
        <div className="dashboard-container">
            <header className="dashboard-header animate-reveal">
                <div className="user-persona">
                    <div className="avatar-glow">
                        <span className="avatar-initial">{user.email?.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="welcome-text">
                        <span className="protocol-tag">AUTHORIZED ARCHITECT</span>
                        <h1>Command Center</h1>
                        <p>Welcome back, {user.email?.split('@')[0]}. System status is optimal.</p>
                    </div>
                </div>
                <div className="header-actions">
                    <button onClick={async () => {
                        await signOut(auth);
                        router.push('/mr-build/login');
                    }} className="btn-signout">Terminate Session</button>
                </div>
            </header>

            <div className="status-grid">
                <div className="status-card glass site-card animate-reveal-delay">
                    <div className="card-header">
                        <h3>ACTIVE DEPLOYMENTS</h3>
                        <div className="header-badges">
                            <span className="status-badge pulse">LIVE</span>
                        </div>
                    </div>

                    {loading ? (
                         <div className="sites-grid-list">
                            {Array(3).fill(0).map((_, i) => (
                                <div key={i} className="site-item-card glass skeleton-card" style={{height: '110px', display: 'flex', alignItems: 'center', gap: '15px'}}>
                                    <SkeletonLoader height={50} width={50} style={{borderRadius: '10px'}} />
                                    <div style={{flex: 1}}>
                                        <SkeletonLoader height={24} width="60%" style={{marginBottom: '8px'}} />
                                        <SkeletonLoader height={14} width="40%" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : sites.length > 0 ? (
                        <div className="sites-grid-list">
                            {sites.map(site => (
                                <div key={site.id} className={`site-item-card glass ${site.adminStatus === 'banned' ? 'banned' : ''}`}>
                                    <div className="site-mini-preview">
                                        <span className="preview-logo">{site.name?.charAt(0) || 'N'}</span>
                                    </div>
                                    <div className="site-info-col">
                                        <h4 className="site-name">{site.name || site.title || 'Untitled'}</h4>
                                        <div className="site-meta-row">
                                            <span className="slug-tag">/s/{site.slug}</span>
                                            <span className="views-tag" title="Total Views">👁️ {site.views || 0}</span>
                                            <span className={`status-pill ${site.status}`}>
                                                {site.status === 'public' ? '🌐' : site.status === 'private' ? '🔒' : '📝'}
                                            </span>
                                            {site.adminStatus === 'banned' && <span className="banned-pill">SUSPENDED</span>}
                                        </div>
                                        <div className="site-actions-row small">
                                            <Link href={`/mr-build/editor?id=${site.id}`} className="btn-action primary compact">MANAGE</Link>
                                            {site.slug && site.adminStatus !== 'banned' && (
                                                <Link href={`/s/${site.slug}`} target="_blank" className="btn-action secondary compact">VIEW</Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-site">
                            <div className="construct-icon">🏗️</div>
                            <h3>No Active Nodes</h3>
                            <p>Initialize your first digital architecture.</p>
                        </div>
                    )}

                    {/* Only show 'New Deployment' button if not loading strings attached */}
                    {!loading && sites.length < userLimit && (
                        <div className="add-site-container">
                            <Link href="/mr-build/editor" className="btn-construct small">+ NEW DEPLOYMENT</Link>
                        </div>
                    )}
                     <div style={{marginTop: '20px', textAlign: 'center'}}>
                        <Link href="/mr-build/analytics" className="btn-text-link">📊 VIEW SYSTEM ANALYTICS</Link>
                    </div>
                </div>

                <div className="status-card glass quota-card animate-reveal-delay-2">
                    <h3>SYSTEM RESOURCES</h3>
                    <div className="resource-item">
                        <div className="res-header">
                            <span>Node Quota</span>
                            {loading ? <SkeletonLoader width={40} /> : <span>{sites.length}/{userLimit}</span>}
                        </div>
                        <div className="res-bar">
                            {loading ? (
                                <SkeletonLoader height={4} />
                            ) : (
                                <div className="res-fill" style={{ width: `${(sites.length / userLimit) * 100}%` }}></div>
                            )}
                        </div>
                    </div>
                    <div className="resource-item">
                        <div className="res-header">
                            <span>Bandwidth</span>
                            <span>Optimal</span>
                        </div>
                        <div className="res-bar">
                             <div className="res-fill glow" style={{ width: '85%' }}></div>
                        </div>
                    </div>
                    
                    <div className="billing-box glass">
                        <p>Current Protocol: <strong>{userLimit > 1 ? 'PREMIUM-X' : 'TRIAL-X'}</strong></p>
                        <Link href="/mr-build/subscription" className="btn-upgrade">EXPAND FLEET (UPGRADE)</Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .dashboard-container { max-width: 1200px; margin: 0 auto; padding-bottom: 100px; }
                
                .dashboard-header { 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    margin-bottom: 60px;
                    padding: 40px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }
                .user-persona { display: flex; align-items: center; gap: 25px; }
                .avatar-glow {
                    width: 70px; height: 70px;
                    background: linear-gradient(135deg, #00f0ff 0%, #0064e0 100%);
                    border-radius: 20px;
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 0 30px rgba(0, 240, 255, 0.3);
                }
                .avatar-initial { font-size: 2rem; font-weight: 900; color: #fff; }
                .protocol-tag { font-size: 0.65rem; color: #00f0ff; letter-spacing: 2px; font-weight: 800; }
                .welcome-text h1 { font-family: var(--font-orbitron); font-size: 2.2rem; margin: 5px 0; }
                .welcome-text p { opacity: 0.5; font-size: 0.95rem; }

                .btn-signout {
                    background: rgba(255, 50, 50, 0.1);
                    color: #ff3232;
                    border: 1px solid rgba(255, 50, 50, 0.2);
                    padding: 10px 20px;
                    border-radius: 10px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .btn-signout:hover { background: #ff3232; color: #fff; }

                .status-grid { display: grid; grid-template-columns: 1.8fr 1fr; gap: 40px; }
                .status-card { padding: 40px; border-radius: 35px; border: 1px solid rgba(255, 255, 255, 0.05); }
                
                .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
                .card-header h3 { font-family: var(--font-orbitron); font-size: 1rem; letter-spacing: 2px; opacity: 0.7; }
                .status-badge { 
                    font-size: 0.6rem; font-weight: 900; background: #00f0ff; color: #000; 
                    padding: 4px 10px; border-radius: 100px; box-shadow: 0 0 15px #00f0ff;
                }

                .sites-grid-list { display: grid; gap: 15px; margin-top: 20px; }
                .site-item-card { 
                    padding: 15px; border-radius: 12px; display: flex; align-items: center; gap: 15px;
                    border: 1px solid rgba(255,255,255,0.05); transition: background 0.2s;
                }
                .site-item-card:hover { background: rgba(255,255,255,0.05); }
                .site-item-card.banned { border-color: #ff3232; background: rgba(255,50,50,0.05); }
                
                .site-mini-preview { 
                    width: 50px; height: 50px; background: linear-gradient(135deg,rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%);
                    border-radius: 10px; display: flex; align-items: center; justify-content: center;
                }
                .site-info-col { flex: 1; }
                .site-meta-row { display: flex; gap: 10px; align-items: center; margin: 5px 0 10px; }
                .slug-tag { font-family: monospace; opacity: 0.5; font-size: 0.8rem; }
                .status-pill { font-size: 0.8rem; }
                .banned-pill { background: #ff3232; color: #fff; font-size: 0.6rem; padding: 2px 5px; border-radius: 4px; font-weight: 800; }
                
                .site-actions-row.small { display: flex; gap: 10px; }
                .btn-action.compact { padding: 6px 15px; font-size: 0.75rem; }
                .add-site-container { margin-top: 20px; text-align: center; }
                .btn-construct.small { padding: 10px 20px; font-size: 0.8rem; }

                .resource-item { margin-bottom: 30px; }
                .res-header { display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 800; margin-bottom: 10px; color: rgba(255, 255, 255, 0.5); }
                .res-bar { height: 4px; background: rgba(255, 255, 255, 0.05); border-radius: 10px; overflow: hidden; }
                .res-fill { height: 100%; background: #00f0ff; border-radius: 10px; }
                .res-fill.glow { box-shadow: 0 0 10px #00f0ff; }
                .res-fill.shield { background: #7000ff; box-shadow: 0 0 10px #7000ff; }
                .res-fill.danger { background: #ff3232; box-shadow: 0 0 10px #ff3232; }

                .billing-box { margin-top: 40px; padding: 25px; border-radius: 20px; text-align: center; }
                .billing-box p { font-size: 0.9rem; margin-bottom: 15px; }
                .btn-upgrade { 
                    width: 100%; padding: 12px; border-radius: 10px; background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1); color: rgba(255, 255, 255, 0.2);
                    font-weight: 800; font-size: 0.75rem; letter-spacing: 1px; cursor: pointer;
                    transition: all 0.3s;
                    text-decoration: none; display: block;
                    margin-bottom: 10px;
                }
                .btn-upgrade:hover {
                    background: rgba(0, 240, 255, 0.1);
                    color: #00f0ff;
                    border-color: #00f0ff;
                }
                .note { font-size: 0.7rem; opacity: 0.3; }

                .no-site { text-align: center; padding: 40px 0; }
                .construct-icon { font-size: 4rem; margin-bottom: 20px; opacity: 0.5; }
                .btn-construct { 
                    display: inline-block; background: #00f0ff; color: #000; text-decoration: none;
                    padding: 16px 35px; border-radius: 14px; font-weight: 900; margin-top: 25px;
                    box-shadow: 0 0 30px rgba(0, 240, 255, 0.2);
                }
                .btn-text-link {
                    display: inline-block; color: rgba(255,255,255,0.5); text-decoration: none; 
                    font-size: 0.8rem; font-weight: 700; transition: color 0.3s; margin-top: 10px;
                }
                .btn-text-link:hover { color: #00f0ff; }

                .animate-reveal { animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
                .animate-reveal-delay { animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s backwards; }
                .animate-reveal-delay-2 { animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s backwards; }
                @keyframes reveal { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                
                @media (max-width: 1024px) {
                    .status-grid { grid-template-columns: 1fr; }
                }

                @media (max-width: 768px) {
                    .dashboard-container { padding-bottom: 60px; }
                    .dashboard-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 20px;
                        padding: 25px 0;
                        margin-bottom: 40px;
                    }
                    .user-persona { gap: 15px; }
                    .avatar-glow { width: 50px; height: 50px; border-radius: 15px; }
                    .avatar-initial { font-size: 1.4rem; }
                    .welcome-text h1 { font-size: 1.6rem; }
                    .welcome-text p { font-size: 0.85rem; }
                    .header-actions { width: 100%; }
                    .btn-signout { width: 100%; }
                    .status-card { padding: 25px; border-radius: 25px; }
                    .card-header { margin-bottom: 25px; }
                    .card-header h3 { font-size: 0.85rem; }
                    .site-item-card { flex-direction: column; align-items: flex-start; gap: 12px; }
                    .site-mini-preview { width: 40px; height: 40px; }
                    .site-meta-row { flex-wrap: wrap; gap: 8px; }
                    .site-actions-row.small { width: 100%; }
                    .btn-action.compact { flex: 1; text-align: center; }
                    .billing-box { padding: 20px; }
                }

                @media (max-width: 480px) {
                    .dashboard-header { padding: 20px 0; margin-bottom: 30px; }
                    .avatar-glow { width: 45px; height: 45px; }
                    .welcome-text h1 { font-size: 1.4rem; }
                    .protocol-tag { font-size: 0.55rem; }
                    .status-card { padding: 20px; border-radius: 20px; }
                    .site-name { font-size: 0.95rem; }
                    .slug-tag { font-size: 0.7rem; }
                    .btn-construct.small { padding: 12px 16px; width: 100%; }
                    .add-site-container { margin-top: 15px; }
                    .res-header { font-size: 0.7rem; }
                }
            `}</style>
        </div>
    );
}

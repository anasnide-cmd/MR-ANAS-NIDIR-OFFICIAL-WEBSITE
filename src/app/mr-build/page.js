'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../lib/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

                // Fetch User Config (Limit)
                try {
                    const userDoc = await getDoc(doc(db, 'users', u.uid));
                    if (userDoc.exists()) {
                        setUserLimit(userDoc.data().siteLimit || 1);
                    }
                } catch (err) {
                    console.error("Error fetching user config:", err);
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
    }, []);

    if (loading) return (
        <div className="loading-screen">
            <div className="scanner"></div>
            <p>Scanning Identity...</p>
            <style jsx>{`
                .loading-screen {
                    height: 80vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: #00f0ff;
                }
                .scanner {
                    width: 200px;
                    height: 2px;
                    background: #00f0ff;
                    box-shadow: 0 0 20px #00f0ff;
                    margin-bottom: 20px;
                    animation: scan 2s infinite ease-in-out;
                }
                @keyframes scan {
                    0%, 100% { transform: translateY(-50px); opacity: 0; }
                    50% { transform: translateY(50px); opacity: 1; }
                }
            `}</style>
        </div>
    );

    if (!user) {
        return null;
    }

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

                    {sites.length > 0 ? (
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

                    {sites.length < userLimit && (
                        <div className="add-site-container">
                            <Link href="/mr-build/editor" className="btn-construct small">+ NEW DEPLOYMENT</Link>
                        </div>
                    )}
                </div>

                <div className="status-card glass quota-card animate-reveal-delay-2">
                    <h3>SYSTEM RESOURCES</h3>
                    <div className="resource-item">
                        <div className="res-header">
                            <span>Node Quota</span>
                            <span>{sites.length}/{userLimit}</span>
                        </div>
                        <div className="res-bar">
                            <div className="res-fill" style={{ width: `${(sites.length / userLimit) * 100}%` }}></div>
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
                    <div className="resource-item">
                        <div className="res-header">
                            <span>Security Level</span>
                            <span>{sites.some(s => s.adminStatus === 'banned') ? 'CRITICAL' : 'MAX'}</span>
                        </div>
                        <div className="res-bar">
                            <div className={`res-fill ${sites.some(s => s.adminStatus === 'banned') ? 'danger' : 'shield'}`} style={{ width: '100%' }}></div>
                        </div>
                    </div>

                    <div className="billing-box glass">
                        <p>Current Protocol: <strong>{userLimit > 1 ? 'PREMIUM-X' : 'TRIAL-X'}</strong></p>
                        <button className="btn-upgrade" disabled>EXPAND FLEET (UPGRADE)</button>
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

                .site-details { display: grid; grid-template-columns: 320px 1fr; gap: 40px; align-items: center; }
                .site-preview-container { perspective: 1000px; }
                .site-preview { 
                    height: 200px; border-radius: 20px; position: relative; overflow: hidden;
                    background: rgba(255, 255, 255, 0.02);
                    display: flex; align-items: center; justify-content: center;
                    transition: transform 0.5s;
                }
                .site-preview:hover { transform: rotateY(-10deg) rotateX(5deg); }
                .preview-content { text-align: center; }
                .preview-logo { font-size: 3rem; font-weight: 950; opacity: 0.1; }
                .preview-lines { margin-top: 15px; display: flex; flex-direction: column; gap: 8px; align-items: center; }
                .p-line { width: 40px; height: 2px; background: rgba(0, 240, 255, 0.2); border-radius: 1px; }
                .p-line.short { width: 20px; }
                .scan-line {
                    position: absolute; top: 0; left: 0; right: 0; height: 1px;
                    background: #00f0ff; box-shadow: 0 0 10px #00f0ff;
                    animation: scan 3s infinite linear;
                }
                @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }

                .site-name { font-size: 1.8rem; font-weight: 900; margin-bottom: 20px; }
                .meta-row { display: flex; gap: 15px; margin-bottom: 12px; font-size: 0.9rem; }
                .meta-row .label { opacity: 0.4; font-weight: 700; width: 100px; }
                .meta-row .value { font-weight: 800; color: #00f0ff; }
                .value.slug { text-transform: lowercase; }
                .status-indicator.public { color: #00ff88; }
                .status-indicator.private { color: #ff3232; }
                .status-indicator.draft { color: #ffa500; }
                .visibility-warning {
                    background: rgba(255, 165, 0, 0.1);
                    border: 1px solid rgba(255, 165, 0, 0.3);
                    color: #ffa500;
                    padding: 12px 15px;
                    border-radius: 10px;
                    margin-top: 15px;
                    font-size: 0.85rem;
                    line-height: 1.5;
                }
                .visibility-warning strong { color: #ffa500; }

                .site-actions-row { display: flex; gap: 15px; margin-top: 30px; }
                .btn-action { 
                    padding: 12px 25px; border-radius: 12px; font-weight: 800; font-size: 0.85rem; 
                    text-decoration: none; transition: all 0.3s;
                }
                .btn-action.primary { background: #00f0ff; color: #000; box-shadow: 0 5px 15px rgba(0, 240, 255, 0.2); }
                .btn-action.primary:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(0, 240, 255, 0.4); }
                .btn-action.secondary { border: 1px solid rgba(255, 255, 255, 0.1); color: #fff; }
                .btn-action.secondary:hover { background: rgba(255, 255, 255, 0.05); }
                .btn-action.share { border: 1px solid rgba(112, 0, 255, 0.3); color: #7000ff; background: rgba(112, 0, 255, 0.05); }
                .btn-action.share:hover { background: rgba(112, 0, 255, 0.1); border-color: #7000ff; }

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
                    font-weight: 800; font-size: 0.75rem; letter-spacing: 1px; cursor: not-allowed;
                    margin-bottom: 10px;
                }
                .note { font-size: 0.7rem; opacity: 0.3; }

                .no-site { text-align: center; padding: 40px 0; }
                .construct-icon { font-size: 4rem; margin-bottom: 20px; opacity: 0.5; }
                .btn-construct { 
                    display: inline-block; background: #00f0ff; color: #000; text-decoration: none;
                    padding: 16px 35px; border-radius: 14px; font-weight: 900; margin-top: 25px;
                    box-shadow: 0 0 30px rgba(0, 240, 255, 0.2);
                }

                .animate-reveal { animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
                .animate-reveal-delay { animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s backwards; }
                .animate-reveal-delay-2 { animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s backwards; }
                @keyframes reveal { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

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
                
                @media (max-width: 1024px) {
                    .status-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
}

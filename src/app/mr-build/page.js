'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BuildDashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [site, setSite] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = onAuthStateChanged(auth, async (u) => {
            if (u) {
                setUser(u);
                const q = query(collection(db, 'user_sites'), where('userId', '==', u.uid));
                const snap = await getDocs(q);
                if (!snap.empty) {
                    setSite({ id: snap.docs[0].id, ...snap.docs[0].data() });
                }
            }
            setLoading(false);
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

    useEffect(() => {
        if (!user && !loading) {
            router.push('/mr-build/login');
        }
    }, [user, loading, router]);

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
                        <span className="status-badge pulse">LIVE</span>
                    </div>
                    {site ? (
                        <div className="site-details">
                            <div className="site-preview-container">
                                <div className="site-preview glass">
                                    <div className="preview-content">
                                        <span className="preview-logo">{site.name?.charAt(0) || 'N'}</span>
                                        <div className="preview-lines">
                                            <div className="p-line"></div>
                                            <div className="p-line short"></div>
                                        </div>
                                    </div>
                                    <div className="scan-line"></div>
                                </div>
                            </div>
                            <div className="site-meta">
                                <h4 className="site-name">{site.name || site.title || 'Untitled Discovery'}</h4>
                                <div className="meta-row">
                                    <span className="label">Endpoint:</span>
                                    <span className="value slug">{site.slug ? `/s/${site.slug}` : 'Not set'}</span>
                                </div>
                                <div className="meta-row">
                                    <span className="label">Architecture:</span>
                                    <span className="value">{site.theme ? site.theme.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Default'}</span>
                                </div>
                                <div className="site-actions-row">
                                    <Link href="/mr-build/editor" className="btn-action primary">OPTIMIZE CORE</Link>
                                    {site.slug && (
                                        <Link href={`/s/${site.slug}`} target="_blank" className="btn-action secondary">VIEW LIVE</Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="no-site">
                            <div className="construct-icon">🏗️</div>
                            <h3>No Active Node Found</h3>
                            <p>Initialize your first digital architecture on the Mr Build network.</p>
                            <Link href="/mr-build/editor" className="btn-construct">INITIATE CONSTRUCTION</Link>
                        </div>
                    )}
                </div>

                <div className="status-card glass quota-card animate-reveal-delay-2">
                    <h3>SYSTEM RESOURCES</h3>
                    <div className="resource-item">
                        <div className="res-header">
                            <span>Node Quota</span>
                            <span>{site ? '1/1' : '0/1'}</span>
                        </div>
                        <div className="res-bar">
                            <div className="res-fill" style={{ width: site ? '100%' : '0%' }}></div>
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
                            <span>MAX</span>
                        </div>
                        <div className="res-bar">
                            <div className="res-fill shield" style={{ width: '100%' }}></div>
                        </div>
                    </div>

                    <div className="billing-box glass">
                        <p>Current Protocol: <strong>TRIAL-X</strong></p>
                        <button className="btn-upgrade" disabled>EXPAND FLEET (UPGRADE)</button>
                        <span className="note">Commercial expansions launching soon.</span>
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

                .site-actions-row { display: flex; gap: 15px; margin-top: 30px; }
                .btn-action { 
                    padding: 12px 25px; border-radius: 12px; font-weight: 800; font-size: 0.85rem; 
                    text-decoration: none; transition: all 0.3s;
                }
                .btn-action.primary { background: #00f0ff; color: #000; box-shadow: 0 5px 15px rgba(0, 240, 255, 0.2); }
                .btn-action.primary:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(0, 240, 255, 0.4); }
                .btn-action.secondary { border: 1px solid rgba(255, 255, 255, 0.1); color: #fff; }
                .btn-action.secondary:hover { background: rgba(255, 255, 255, 0.05); }

                .resource-item { margin-bottom: 30px; }
                .res-header { display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 800; margin-bottom: 10px; color: rgba(255, 255, 255, 0.5); }
                .res-bar { height: 4px; background: rgba(255, 255, 255, 0.05); border-radius: 10px; overflow: hidden; }
                .res-fill { height: 100%; background: #00f0ff; border-radius: 10px; }
                .res-fill.glow { box-shadow: 0 0 10px #00f0ff; }
                .res-fill.shield { background: #7000ff; box-shadow: 0 0 10px #7000ff; }

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

                @media (max-width: 1024px) {
                    .status-grid { grid-template-columns: 1fr; }
                    .site-details { grid-template-columns: 1fr; text-align: center; }
                    .site-preview-container { width: 100%; max-width: 400px; margin: 0 auto; }
                    .meta-row { justify-content: center; }
                    .site-actions-row { justify-content: center; }
                }
            `}</style>
        </div>
    );
}

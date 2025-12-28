'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import Image from 'next/image';

export default function BuildDashboard() {
    const [user, setUser] = useState(null);
    const [site, setSite] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = auth.onAuthStateChanged(async (u) => {
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

    if (loading) return null;

    if (!user) {
        return (
            <div className="hero-section center">
                <div className="glitch-title" data-text="MR BUILD">MR BUILD</div>
                <h2 className="tagline">The Future of Personal Web Presence</h2>
                <p className="description">Deploy your digital identity with precision. One-click architecture for visionaries.</p>
                <Link href="/mr-build/login" className="btn-large pulse-blue">Initialize Deployment</Link>

                <div className="features-grid">
                    <div className="feature-card glass">
                        <span className="icon">🚀</span>
                        <h3>Instant Launch</h3>
                        <p>Zero-config deployment in seconds.</p>
                    </div>
                    <div className="feature-card glass">
                        <span className="icon">🎨</span>
                        <h3>Bespoke Design</h3>
                        <p>Tailored aesthetic for elite personal brands.</p>
                    </div>
                    <div className="feature-card glass">
                        <span className="icon">💎</span>
                        <h3>Free Trial</h3>
                        <p>Build your first site at zero cost.</p>
                    </div>
                </div>

                <style jsx>{`
                    .hero-section { text-align: center; max-width: 900px; margin: 0 auto; padding: 100px 20px; }
                    .glitch-title { font-family: var(--font-orbitron); font-size: 5rem; font-weight: 900; letter-spacing: 5px; color: #fff; position: relative; }
                    .tagline { font-size: 1.5rem; color: #00f0ff; margin: 20px 0; font-weight: 300; letter-spacing: 2px; }
                    .description { opacity: 0.6; margin-bottom: 40px; font-size: 1.1rem; line-height: 1.6; }
                    .btn-large { padding: 20px 40px; background: #00f0ff; color: #000; text-decoration: none; border-radius: 12px; font-weight: 900; font-size: 1.2rem; letter-spacing: 1px; display: inline-block; transition: all 0.3s; }
                    .pulse-blue:hover { box-shadow: 0 0 40px rgba(0, 240, 255, 0.5); transform: translateY(-3px); }
                    
                    .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-top: 100px; }
                    .feature-card { padding: 30px; border-radius: 20px; transition: transform 0.3s; }
                    .feature-card:hover { transform: translateY(-10px); background: rgba(0, 240, 255, 0.05); }
                    .feature-card .icon { font-size: 2.5rem; display: block; margin-bottom: 20px; }
                    .feature-card h3 { font-family: var(--font-orbitron); font-size: 1.2rem; margin-bottom: 10px; }
                    .feature-card p { font-size: 0.9rem; opacity: 0.6; }
                `}</style>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Command Center</h1>
                <p>Welcome back, Architect.</p>
            </header>

            <div className="status-grid">
                <div className="status-card glass site-card">
                    <div className="card-info">
                        <h3>Your Digital Asset</h3>
                        {site ? (
                            <div className="site-details">
                                <div className="site-preview placeholder">
                                    <div className="preview-overlay">LIVE</div>
                                </div>
                                <div className="site-meta">
                                    <h4>{site.name || 'Untitled Project'}</h4>
                                    <p>Created: {new Date(site.createdAt || Date.now()).toLocaleDateString()}</p>
                                    <div className="site-actions">
                                        <Link href="/mr-build/editor" className="btn-edit">Optimize Site</Link>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="no-site">
                                <p>No active deployment found.</p>
                                <Link href="/mr-build/editor" className="btn-action">Initiate Construction</Link>
                                <span className="quota-hint">Protocol: Trial Status (1/1 Remaining)</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="status-card glass quota-card">
                    <h3>Billing & Resources</h3>
                    <div className="meter-container">
                        <div className="meter-label">
                            <span>Usage Limit</span>
                            <span>{site ? '100%' : '0%'}</span>
                        </div>
                        <div className="meter-track">
                            <div className="meter-fill" style={{ width: site ? '100%' : '0%' }}></div>
                        </div>
                    </div>
                    <p className="meter-hint">You are currently on the <strong>Free Trial</strong> package. (Limit: 1 site)</p>
                    <button className="btn-upgrade" disabled>Expand Infrastructure (Soon)</button>
                </div>
            </div>

            <style jsx>{`
                .dashboard-container { max-width: 1200px; margin: 0 auto; }
                .dashboard-header { margin-bottom: 40px; }
                .dashboard-header h1 { font-family: var(--font-orbitron); font-size: 2.5rem; margin-bottom: 10px; }
                .dashboard-header p { opacity: 0.5; letter-spacing: 1px; }

                .status-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 30px; }
                .status-card { padding: 40px; border-radius: 30px; }
                
                .site-card h3 { margin-bottom: 30px; color: #00f0ff; letter-spacing: 2px; }
                .no-site { text-align: center; padding: 60px 0; }
                .btn-action { display: inline-block; background: #00f0ff; color: #000; text-decoration: none; padding: 15px 35px; border-radius: 12px; font-weight: 800; margin: 20px 0; }
                .quota-hint { display: block; font-size: 0.8rem; opacity: 0.4; }

                .site-details { display: flex; gap: 30px; align-items: flex-start; }
                .site-preview { width: 300px; height: 180px; background: #111; border-radius: 15px; position: relative; border: 1px solid rgba(255,255,255,0.1); }
                .preview-overlay { position: absolute; top: 10px; right: 10px; background: #00f0ff; color: #000; font-size: 0.6rem; font-weight: 900; padding: 2px 8px; border-radius: 10px; }
                .site-meta h4 { font-size: 1.5rem; margin-bottom: 10px; }
                .site-meta p { opacity: 0.5; font-size: 0.9rem; margin-bottom: 20px; }
                .btn-edit { background: rgba(0,240,255,0.1); color: #00f0ff; text-decoration: none; border: 1px solid rgba(0,240,255,0.3); padding: 10px 20px; border-radius: 10px; font-weight: 700; transition: all 0.3s; }
                .btn-edit:hover { background: #00f0ff; color: #000; }

                .meter-container { margin: 30px 0; }
                .meter-label { display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 10px; font-weight: 800; }
                .meter-track { height: 6px; background: rgba(255,255,255,0.05); border-radius: 10px; overflow: hidden; }
                .meter-fill { height: 100%; background: #00f0ff; box-shadow: 0 0 15px #00f0ff; }
                .meter-hint { font-size: 0.85rem; opacity: 0.5; line-height: 1.6; }
                .btn-upgrade { width: 100%; margin-top: 30px; padding: 14px; border-radius: 10px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.2); cursor: not-allowed; }
            `}</style>
        </div>
    );
}

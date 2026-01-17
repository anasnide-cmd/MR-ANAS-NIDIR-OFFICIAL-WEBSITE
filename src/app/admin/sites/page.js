'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../../lib/firebase';
import Loader from '../../../components/Loader';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, orderBy, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore';
import Link from 'next/link';

export default function SitesPage() {
    const [user, setUser] = useState(null);
    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, active, banned, verified

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            if (u) {
                fetchSites();
            } else {
                setLoading(false);
            }
        });
        return () => unsub();
    }, []);

    const fetchSites = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, 'user_sites'), orderBy('updatedAt', 'desc'));
            const snap = await getDocs(q);
            setSites(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const updateSiteStatus = async (siteId, newStatus) => {
        try {
            await updateDoc(doc(db, 'user_sites', siteId), { adminStatus: newStatus });
            setSites(prev => prev.map(s => s.id === siteId ? { ...s, adminStatus: newStatus } : s));
        } catch (err) {
            alert('Error updating status: ' + err.message);
        }
    };

    const updatePublisherId = async (siteId, currentId) => {
        const newId = prompt("Enter AdSense Publisher ID (e.g., pub-xxxxxxxx):", currentId || '');
        if (newId === null) return;
        try {
             await setDoc(doc(db, 'user_sites', siteId), {
                 monetization: { publisherId: newId }
             }, { merge: true });
             setSites(prev => prev.map(s => s.id === siteId ? { ...s, monetization: { ...(s.monetization || {}), publisherId: newId } } : s));
        } catch (err) {
            alert('Error updating AdSense ID: ' + err.message);
        }
    }

    const filteredSites = sites.filter(s => {
        if (filter === 'all') return true;
        const status = s.adminStatus || 'active';
        return status === filter;
    });

    if (loading) return <Loader text="Loading Sites..." />;
    if (!user) return <div>Access Denied</div>;

    return (
        <div className="sites-view animate-fade-in">
            <header className="page-header">
                <div>
                    <Link href="/admin" className="back-link">← Dashboard</Link>
                    <h1>Site Operations</h1>
                    <p className="subtitle">Monitoring {sites.length} Deployments</p>
                </div>
                <div className="filter-bar">
                    {['all', 'active', 'verified', 'banned'].map(f => (
                        <button 
                            key={f}
                            className={`filter-btn ${filter === f ? 'active' : ''}`}
                            onClick={() => setFilter(f)}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
            </header>

            <div className="sites-grid">
                {filteredSites.map(site => (
                    <div key={site.id} className={`site-card ${site.adminStatus || 'active'}`}>
                        <div className="card-header">
                            <h3 title={site.title}>{site.title || 'Untitled Site'}</h3>
                            <span className={`status-badge ${site.adminStatus || 'active'}`}>
                                {site.adminStatus || 'active'}
                            </span>
                        </div>
                        
                        <div className="card-body">
                            <div className="info-row">
                                <span className="label">URL Slug</span>
                                <span className="value slug">/s/{site.slug}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Owner</span>
                                <span className="value email">{site.userEmail}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Views</span>
                                <span className="value highlight">{site.views || 0}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Monetization</span>
                                <span className="value">{site.monetization?.publisherId ? '✅ Enabled' : 'Off'}</span>
                            </div>
                        </div>

                        <div className="card-actions">
                            <div className="action-group">
                                <button onClick={() => updateSiteStatus(site.id, 'verified')} title="Verify" className="btn-icon verify">💎</button>
                                <button onClick={() => updateSiteStatus(site.id, 'active')} title="Normal" className="btn-icon normal">🟢</button>
                                <button onClick={() => updateSiteStatus(site.id, 'banned')} title="Ban" className="btn-icon ban">🔴</button>
                            </div>
                            <button onClick={() => updatePublisherId(site.id, site.monetization?.publisherId)} className="btn-text">
                                {site.monetization?.publisherId ? 'Edit Ads' : 'Setup Ads'}
                            </button>
                            <a href={`/s/${site.slug}`} target="_blank" className="btn-visit">Visit ➜</a>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 30px; }
                .back-link { color: #00f0ff; text-decoration: none; font-size: 0.9rem; font-weight: 700; display: block; margin-bottom: 10px; }
                h1 { font-size: 2rem; margin: 0; }
                
                .filter-bar { display: flex; gap: 10px; background: rgba(255,255,255,0.05); padding: 5px; border-radius: 12px; }
                .filter-btn { padding: 8px 16px; background: transparent; border: none; color: #fff; cursor: pointer; border-radius: 8px; font-weight: 600; opacity: 0.6; transition: all 0.2s; }
                .filter-btn:hover { opacity: 1; background: rgba(255,255,255,0.05); }
                .filter-btn.active { background: #00f0ff; color: #000; opacity: 1; }

                .sites-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
                .site-card { 
                    background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255,255,255,0.05); 
                    border-radius: 16px; padding: 20px; transition: all 0.3s; display: flex; flex-direction: column; gap: 15px;
                }
                .site-card:hover { transform: translateY(-5px); background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.1); }
                .site-card.banned { border-color: #ff3232; box-shadow: 0 0 15px rgba(255, 50, 50, 0.1); }
                .site-card.verified { border-color: #00f0ff; box-shadow: 0 0 15px rgba(0, 240, 255, 0.1); }

                .card-header { display: flex; justify-content: space-between; align-items: center; }
                .card-header h3 { margin: 0; font-size: 1.1rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 180px; }
                
                .status-badge { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; padding: 2px 8px; border-radius: 10px; }
                .status-badge.active { color: #00ff88; background: rgba(0, 255, 136, 0.1); }
                .status-badge.banned { color: #ff3232; background: rgba(255, 50, 50, 0.1); }
                .status-badge.verified { color: #00f0ff; background: rgba(0, 240, 255, 0.1); }

                .card-body { display: flex; flex-direction: column; gap: 8px; }
                .info-row { display: flex; justify-content: space-between; font-size: 0.9rem; }
                .info-row .label { opacity: 0.5; }
                .info-row .value { font-weight: 500; }
                .slug { font-family: monospace; opacity: 0.7; }
                .email { font-size: 0.8rem; opacity: 0.7; }
                .highlight { color: #00f0ff; font-weight: 700; }

                .card-actions { margin-top: auto; display: flex; justify-content: space-between; align-items: center; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.05); }
                .action-group { display: flex; gap: 5px; }
                .btn-icon { background: rgba(255,255,255,0.05); border: none; cursor: pointer; font-size: 1rem; padding: 5px; border-radius: 6px; transition: transform 0.2s; }
                .btn-icon:hover { transform: scale(1.2); background: rgba(255,255,255,0.1); }
                
                .btn-text { background: transparent; border: none; color: #aaa; cursor: pointer; font-size: 0.8rem; text-decoration: underline; }
                .btn-text:hover { color: #fff; }
                
                .btn-visit { color: #00f0ff; text-decoration: none; font-size: 0.9rem; font-weight: 700; }
                
                .animate-fade-in { animation: fadeIn 0.5s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
}

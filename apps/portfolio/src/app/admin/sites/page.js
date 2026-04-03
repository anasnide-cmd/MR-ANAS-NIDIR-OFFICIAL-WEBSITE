'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../../lib/firebase';
import Loader from '../../../components/Loader';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, orderBy, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore';
import Link from 'next/link';
import CommandGrid, { GridItem } from '../../../components/Admin/CommandGrid';

export default function SitesPage() {
    const [user, setUser] = useState(null);
    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, active, banned, verified
    const [selectedIds, setSelectedIds] = useState([]);

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
            alert('CMD_FAIL: ' + err.message);
        }
    };

    const updatePublisherId = async (siteId, currentId) => {
        const newId = prompt("INPUT ADSENSE ID (pub-xxxxxxxx):", currentId || '');
        if (newId === null) return;
        try {
             await setDoc(doc(db, 'user_sites', siteId), {
                 monetization: { publisherId: newId }
             }, { merge: true });
             setSites(prev => prev.map(s => s.id === siteId ? { ...s, monetization: { ...(s.monetization || {}), publisherId: newId } } : s));
        } catch (err) {
            alert('CMD_FAIL: ' + err.message);
        }
    }

    const filteredSites = sites.filter(s => {
        if (filter === 'all') return true;
        const status = s.adminStatus || 'active';
        return status === filter;
    });

    if (loading) return <div className="cia-loading">SCANNING NETWORK NODES...</div>;
    if (!user) return <div className="cia-loading error">ACCESS DENIED</div>;

    return (
        <main className="cia-dashboard">
            <header className="cia-header">
                <div>
                    <Link href="/admin" className="back-link">:: RETURN TO COMMAND</Link>
                    <h1 className="cia-title">PLATFORM SURVEILLANCE <span className="sub">TRAFFIC MONITOR</span></h1>
                </div>
                <div className="filter-group">
                    {['all', 'active', 'verified', 'banned'].map(f => (
                        <button 
                            key={f}
                            className={`filter-btn ${filter === f ? 'active' : ''}`}
                            onClick={() => setFilter(f)}
                        >
                            [{f.toUpperCase()}]
                        </button>
                    ))}
                </div>
            </header>

            <div className="surveillance-grid">
                {filteredSites.map(site => (
                    <div key={site.id} className={`node-card ${site.adminStatus || 'active' } ${selectedIds.includes(site.id) ? 'selected' : ''}`}>
                        <div className="node-header">
                            <input 
                                type="checkbox" 
                                className="cia-checkbox"
                                checked={selectedIds.includes(site.id)}
                                onChange={(e) => {
                                    if(e.target.checked) setSelectedIds(prev => [...prev, site.id]);
                                    else setSelectedIds(prev => prev.filter(id => id !== site.id));
                                }}
                            />
                            <span className="node-id">NODE :: {site.slug.toUpperCase()}</span>
                            <span className={`status-code ${site.adminStatus || 'active'}`}>
                                {site.adminStatus === 'banned' ? '⚠ CRITICAL' : (site.adminStatus === 'verified' ? '✔ SECURE' : '● NOMINAL')}
                            </span>
                        </div>
                        
                        <div className="node-vis">
                            <div className="signal-bars">
                                {[1,2,3,4,5].map(i => (
                                    <div key={i} className={`bar ${i <= Math.min(5, Math.ceil((site.views || 0)/10)) ? 'lit' : ''}`}></div>
                                ))}
                            </div>
                            <span className="views-val">{site.views || 0} HITS</span>
                        </div>

                        <div className="node-details">
                            <div className="detail-row">
                                <span className="lbl">TITLE:</span>
                                <span className="val">{site.title || 'UNKNOWN'}</span>
                            </div>
                            <div className="detail-row">
                                <span className="lbl">OWNER:</span>
                                <span className="val email">{site.userEmail}</span>
                            </div>
                            <div className="detail-row">
                                <span className="lbl">ADS:</span>
                                <span className="val">{site.monetization?.publisherId ? 'ACTIVE' : 'INACTIVE'}</span>
                            </div>
                        </div>

                        <div className="node-actions">
                            <button onClick={() => updateSiteStatus(site.id, 'verified')} className="action-btn" title="Verify">SECURE</button>
                            <button onClick={() => updateSiteStatus(site.id, 'banned')} className="action-btn warn" title="Ban">PURGE</button>
                            <button onClick={() => updatePublisherId(site.id, site.monetization?.publisherId)} className="action-btn">ADS</button>
                            <a href={`/s/${site.slug}`} target="_blank" className="action-btn link">VISIT ➜</a>
                        </div>
                    </div>
                ))}
                {filteredSites.length === 0 && <div className="empty-sector">SECTOR CLEAR. NO NODES DETECTED.</div>}
            </div>

            {/* BULK ACTION BAR */}
            {selectedIds.length > 0 && (
                 <div className="bulk-bar">
                    <div className="bulk-info">
                        <span className="count">{selectedIds.length}</span>
                        <span>NODES TARGETED</span>
                    </div>
                    <div className="bulk-actions">
                        <button onClick={() => console.log('Mass Secure', selectedIds)} className="btn-cia small">SECURE ALL</button>
                        <button onClick={() => console.log('Mass Purge', selectedIds)} className="btn-cia small warn">PURGE ALL</button>
                        <button onClick={() => setSelectedIds([])} className="btn-cia small">ABORT</button>
                    </div>
                 </div>
            )}

            <style jsx global>{`
                .bulk-bar {
                    position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
                    background: #000; border: 1px solid var(--cia-accent);
                    padding: 15px 30px; border-radius: 50px;
                    display: flex; gap: 30px; align-items: center;
                    box-shadow: 0 0 30px rgba(0, 243, 255, 0.2);
                    z-index: 900; animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .bulk-info { display: flex; align-items: center; gap: 10px; font-weight: bold; color: #fff; }
                .bulk-info .count { background: var(--cia-accent); color: #000; padding: 2px 8px; border-radius: 10px; }
                .bulk-actions { display: flex; gap: 10px; }
                @keyframes slideUp { from { transform: translate(-50%, 100%); } to { transform: translate(-50%, 0); } }

                .cia-checkbox {
                    accent-color: var(--cia-accent);
                    width: 16px; height: 16px; cursor: pointer;
                    margin-right: 10px;
                }
                .node-card.selected {
                    background: rgba(0, 243, 255, 0.1);
                    border-color: var(--cia-accent);
                    box-shadow: 0 0 15px rgba(0, 243, 255, 0.1);
                }

                .cia-dashboard {
                    background-color: var(--cia-bg);
                    min-height: 100vh;
                    color: var(--cia-accent);
                    font-family: 'Share Tech Mono', monospace;
                    padding-bottom: 50px;
                }
                .cia-header {
                    padding: 20px 30px;
                    border-bottom: 2px solid var(--cia-accent);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: rgba(0, 243, 255, 0.05);
                    margin-bottom: 30px;
                }
                .back-link { color: var(--cia-accent); text-decoration: none; font-size: 0.8rem; letter-spacing: 2px; display: block; margin-bottom: 5px; opacity: 0.6; }
                .cia-title { margin: 0; font-size: 2rem; color: #fff; letter-spacing: 5px; }
                .cia-title .sub { color: var(--cia-accent); font-size: 1rem; }

                .filter-group { display: flex; gap: 5px; }
                .filter-btn { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.5); cursor: pointer; padding: 5px 10px; font-family: inherit; font-size: 0.8rem; transition: all 0.2s; }
                .filter-btn:hover { border-color: var(--cia-accent); color: var(--cia-accent); }
                .filter-btn.active { background: var(--cia-accent); color: #000; border-color: var(--cia-accent); font-weight: bold; }

                .surveillance-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; padding: 0 30px; }
                
                .node-card {
                    background: rgba(0,0,0,0.5);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 15px;
                    position: relative;
                    display: flex; flex-direction: column; gap: 15px;
                }
                .node-card:before { content: ''; position: absolute; top: -1px; left: -1px; width: 10px; height: 10px; border-top: 2px solid var(--cia-accent); border-left: 2px solid var(--cia-accent); }
                .node-card:after { content: ''; position: absolute; bottom: -1px; right: -1px; width: 10px; height: 10px; border-bottom: 2px solid var(--cia-accent); border-right: 2px solid var(--cia-accent); }
                
                .node-card:hover { background: rgba(0, 243, 255, 0.03); border-color: rgba(0, 243, 255, 0.3); }
                .node-card.banned { border-color: var(--cia-alert); }
                
                .node-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; }
                .node-id { font-size: 0.9rem; font-weight: bold; color: #fff; }
                .status-code { font-size: 0.7rem; font-weight: bold; }
                .status-code.active { color: var(--cia-success); }
                .status-code.banned { color: var(--cia-alert); }
                .status-code.verified { color: var(--cia-accent); }
                
                .node-vis { display: flex; align-items: center; justify-content: space-between; background: rgba(0,0,0,0.3); padding: 10px; }
                .signal-bars { display: flex; gap: 2px; align-items: flex-end; height: 20px; }
                .bar { width: 4px; background: #333; height: 100%; }
                .bar:nth-child(1) { height: 20%; }
                .bar:nth-child(2) { height: 40%; }
                .bar:nth-child(3) { height: 60%; }
                .bar:nth-child(4) { height: 80%; }
                .bar:nth-child(5) { height: 100%; }
                .bar.lit { background: var(--cia-accent); box-shadow: 0 0 5px var(--cia-accent); }
                .views-val { font-size: 1.2rem; font-weight: bold; color: #fff; }
                
                .node-details { display: flex; flex-direction: column; gap: 5px; }
                .detail-row { display: flex; justify-content: space-between; font-size: 0.8rem; }
                .detail-row .lbl { opacity: 0.5; }
                .val.email { opacity: 0.8; }
                
                .node-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; margin-top: auto; }
                .action-btn { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.7); cursor: pointer; padding: 5px; font-family: inherit; font-size: 0.7rem; transition: all 0.2s; }
                .action-btn:hover { border-color: var(--cia-accent); color: var(--cia-accent); background: rgba(0, 243, 255, 0.1); }
                .action-btn.warn:hover { border-color: var(--cia-alert); color: var(--cia-alert); background: rgba(255, 50, 50, 0.1); }
                .action-btn.link { text-decoration: none; text-align: center; color: var(--cia-accent); border-color: var(--cia-accent); }
                
                .empty-sector { grid-column: 1/-1; text-align: center; padding: 50px; opacity: 0.5; border: 1px dashed rgba(255,255,255,0.2); }
                
                .cia-loading { height: 100vh; display: flex; align-items: center; justify-content: center; color: var(--cia-accent); animation: flicker 0.5s infinite; }
            `}</style>
        </main>
    );
}

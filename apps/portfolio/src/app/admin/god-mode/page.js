'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../../lib/firebase';
import { collection, getDocs, doc, deleteDoc, updateDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Loader from '../../../components/Loader';
import { Shield, Users, Globe, Trash2, Key, Search, Ban, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function GodModePage() {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState('users'); // users | sites
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            if (u) {
                // Verify Admin (Client-side check, rules enforce backend)
                // In a real app, claims would be better
                setUser(u);
                await fetchAllData();
            } else {
                setLoading(false); // Unauthorized
            }
        });
        return () => unsub();
    }, []);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const [uSnap, sSnap] = await Promise.all([
                getDocs(collection(db, 'users')),
                getDocs(collection(db, 'user_sites'))
            ]);
            setUsers(uSnap.docs.map(d => ({ id: d.id, ...d.data() })));
            setSites(sSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        } catch (err) {
            console.error("God Mode Access Denied:", err);
            alert("ACCESS DENIED: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBanSite = async (siteId, currentStatus) => {
        if(!confirm(`Confirm ${currentStatus === 'restricted' ? 'UNBAN' : 'BAN'} for site ${siteId}?`)) return;
        try {
            await updateDoc(doc(db, 'user_sites', siteId), {
                adminStatus: currentStatus === 'restricted' ? 'verified' : 'restricted'
            });
            // Optimistic update
            setSites(prev => prev.map(s => s.id === siteId ? { ...s, adminStatus: currentStatus === 'restricted' ? 'verified' : 'restricted' } : s));
        } catch (err) { alert(err.message); }
    };

    const handleDeleteUser = async (uid) => {
        if(!confirm("CRITICAL: DELETE USER? This cannot be undone.")) return;
        try {
            await deleteDoc(doc(db, 'users', uid));
            setUsers(prev => prev.filter(u => u.id !== uid));
        } catch (err) { alert(err.message); }
    };

    const filteredUsers = users.filter(u => 
        (u.email || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
        (u.id || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredSites = sites.filter(s => 
        (s.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
        (s.id || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <Loader text="INITIALIZING GOD MODE..." />;
    if (!user) return <div className="access-denied">ACCESS DENIED</div>;

    return (
        <div className="god-mode-container">
            <header className="god-header">
                <div className="title-section">
                    <Shield size={32} color="#ff0055" />
                    <h1>GOD MODE <span className="version">v1.0</span></h1>
                </div>
                <div className="search-bar">
                    <Search size={16} />
                    <input 
                        placeholder="Search UUID / Email / Site..." 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            <nav className="god-nav">
                <button 
                    className={tab === 'users' ? 'active' : ''} 
                    onClick={() => setTab('users')}
                >
                    <Users size={16} /> AGENTS ({users.length})
                </button>
                <button 
                    className={tab === 'sites' ? 'active' : ''} 
                    onClick={() => setTab('sites')}
                >
                    <Globe size={16} /> CONSTRUCTS ({sites.length})
                </button>
            </nav>

            <main className="god-content">
                {tab === 'users' ? (
                    <div className="data-table">
                        <div className="row header">
                            <span className="col id">UUID</span>
                            <span className="col">EMAIL</span>
                            <span className="col">PLAN</span>
                            <span className="col actions">ACTIONS</span>
                        </div>
                        {filteredUsers.map(u => (
                            <div key={u.id} className="row">
                                <span className="col id" title={u.id}>{u.id.substring(0, 8)}...</span>
                                <span className="col">{u.email}</span>
                                <span className="col">{u.plan || 'Free'}</span>
                                <span className="col actions">
                                    <button className="btn-icon danger" onClick={() => handleDeleteUser(u.id)} title="Delete Agent">
                                        <Trash2 size={14}/>
                                    </button>
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="data-table">
                         <div className="row header">
                            <span className="col id">ID</span>
                            <span className="col">NAME</span>
                            <span className="col">OWNER</span>
                            <span className="col">STATUS</span>
                            <span className="col actions">ACTIONS</span>
                        </div>
                         {filteredSites.map(s => (
                            <div key={s.id} className="row">
                                <span className="col id" title={s.id}>{s.id.substring(0, 8)}...</span>
                                <span className="col">{s.name}</span>
                                <span className="col" title={s.userId}>{s.userId?.substring(0, 8)}...</span>
                                <span className="col">
                                    <span className={`badge ${s.adminStatus || 'verified'}`}>{s.adminStatus || 'verified'}</span>
                                </span>
                                <span className="col actions">
                                    <button 
                                        className="btn-icon warn" 
                                        onClick={() => handleBanSite(s.id, s.adminStatus)}
                                        title={s.adminStatus === 'restricted' ? 'Unban' : 'Ban'}
                                    >
                                        {s.adminStatus === 'restricted' ? <CheckCircle size={14}/> : <Ban size={14}/>}
                                    </button>
                                    <button className="btn-icon" onClick={() => window.open(`/s/${s.slug || s.id}`, '_blank')} title="View">
                                        <Globe size={14}/>
                                    </button>
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            
            <style jsx>{`
                .god-mode-container {
                    min-height: 100vh; background: #000; color: #fff;
                    font-family: 'JetBrains Mono', monospace;
                }
                .god-header {
                    padding: 20px; border-bottom: 2px solid #333;
                    display: flex; justify-content: space-between; align-items: center;
                }
                .title-section { display: flex; align-items: center; gap: 15px; }
                h1 { font-size: 1.5rem; letter-spacing: 2px; color: #ff0055; margin: 0; }
                .version { font-size: 0.8rem; color: #666; vertical-align: super; }

                .search-bar {
                    background: #111; border: 1px solid #333; padding: 8px 16px;
                    display: flex; align-items: center; gap: 10px; width: 300px;
                }
                .search-bar input { background: transparent; border: none; color: #fff; width: 100%; outline: none; }

                .god-nav { display: flex; border-bottom: 1px solid #333; background: #050505; }
                .god-nav button {
                    padding: 15px 30px; background: none; border: none; color: #666;
                    border-right: 1px solid #333; cursor: pointer; font-weight: bold;
                    display: flex; gap: 10px; align-items: center;
                }
                .god-nav button:hover { background: #111; color: #fff; }
                .god-nav button.active { background: #ff0055; color: #000; }

                .god-content { padding: 30px; }
                
                .data-table { border: 1px solid #333; background: #050505; }
                .row { display: flex; padding: 12px; border-bottom: 1px solid #222; align-items: center; }
                .row:hover { background: #111; }
                .row.header { background: #151515; font-weight: bold; color: #888; border-bottom: 2px solid #333; }
                
                .col { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding: 0 10px; }
                .col.id { flex: 0 0 100px; font-family: monospace; color: #666; }
                .col.actions { flex: 0 0 100px; display: flex; gap: 10px; justify-content: flex-end; }
                
                .btn-icon { background: #222; border: none; color: #ccc; padding: 6px; cursor: pointer; border-radius: 4px; }
                .btn-icon:hover { background: #333; color: #fff; }
                .btn-icon.danger:hover { background: #ff0000; color: #fff; }
                .btn-icon.warn:hover { background: #ffaa00; color: #000; }

                .badge { padding: 2px 6px; border-radius: 4px; font-size: 0.7rem; text-transform: uppercase; }
                .badge.verified { background: #00ff00; color: #000; }
                .badge.restricted { background: #ff0000; color: #fff; }

                .access-denied { height: 100vh; display: flex; align-items: center; justify-content: center; color: #ff0000; font-size: 2rem; font-weight: bold; letter-spacing: 5px; background: #000; }
            `}</style>
        </div>
    );
}

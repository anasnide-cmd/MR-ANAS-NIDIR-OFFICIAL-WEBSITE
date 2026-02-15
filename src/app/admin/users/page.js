'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../../lib/firebase';
import Loader from '../../../components/Loader';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, getDocs, doc, setDoc } from 'firebase/firestore';
import Link from 'next/link';

export default function UsersPage() {
    const [user, setUser] = useState(null);
    const [usersList, setUsersList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null); // For Modal
    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            if (u) {
                fetchUsers();
            } else {
                setLoading(false);
            }
        });
        return () => unsub();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const usersQ = query(collection(db, 'users'));
            const usersSnap = await getDocs(usersQ);
            const usersConfig = {};
            usersSnap.forEach(doc => {
                usersConfig[doc.id] = doc.data();
            });

            const sitesQ = query(collection(db, 'user_sites'));
            const sitesSnap = await getDocs(sitesQ);
            const sitesData = sitesSnap.docs.map(d => ({...d.data(), id: d.id}));

            const uniqueIds = new Set([...Object.keys(usersConfig), ...sitesData.map(s => s.userId)]);
            
            const synthesized = Array.from(uniqueIds).map(uid => {
                const config = usersConfig[uid] || {};
                const userSites = sitesData.filter(s => s.userId === uid);
                
                const displayEmail = config.email || userSites[0]?.userEmail || 'Unknown Email';
                const displayName = config.displayName || 'UNIDENTIFIED_AGENT';

                // Online detection: active within last 2 minutes (120000ms)
                const isOnline = config.lastActive && (Date.now() - config.lastActive < 120000);

                return {
                    uid,
                    email: displayEmail,
                    displayName: displayName,
                    role: config.role || 'user',
                    siteLimit: config.siteLimit || 1,
                    siteCount: userSites.length,
                    sites: userSites,
                    totalViews: userSites.reduce((acc, s) => acc + (s.views || 0), 0),
                    lastActive: config.lastActive || null,
                    isOnline,
                    // Extended Account Data
                    bio: config.bio || '',
                    contactEmail: config.contactEmail || '',
                    phone: config.phone || '',
                    jobTitle: config.jobTitle || 'OPERATIVE',
                    location: config.location || 'UNKNOWN',
                    dob: config.dob || '',
                    website: config.website || '',
                    gender: config.gender || '',
                    fullConfig: config
                };
            });

            setUsersList(synthesized);
        } catch (err) {
            console.error("Error fetching users:", err);
            // alert("Error loading users"); // Silent fail in CIA mode
        } finally {
            setLoading(false);
        }
    };

    const updateUserLimit = async (uid, newLimit) => {
        const limitVal = parseInt(newLimit);
        if (isNaN(limitVal) || limitVal < 0) return;
        try {
            const userRef = doc(db, 'users', uid);
            await setDoc(userRef, { siteLimit: limitVal }, { merge: true });
            setUsersList(prev => prev.map(u => u.uid === uid ? { ...u, siteLimit: limitVal } : u));
        } catch (err) {
            alert('CMD_FAIL: ' + err.message);
        }
    };
    
    const promoteUser = async (uid) => {
        if(!confirm("AUTHORIZE PROMOTION TO ADMIN LEVEL?")) return;
        try {
            await setDoc(doc(db, 'users', uid), { role: 'admin' }, { merge: true });
            setUsersList(prev => prev.map(u => u.uid === uid ? { ...u, role: 'admin' } : u));
        } catch (err) {
            alert('CMD_FAIL: ' + err.message);
        }
    };

    const filteredUsers = usersList.filter(u => 
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.uid.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="cia-loading">ACCESSING AGENT DATABASE...</div>;
    if (!user) return <div className="cia-loading error">UNAUTHORIZED</div>;

    return (
        <main className="cia-dashboard">
            <header className="cia-header">
                <div>
                    <Link href="/admin" className="back-link">:: RETURN TO COMMAND</Link>
                    <h1 className="cia-title">AGENT DATABASE <span className="sub">PERSONNEL FILES</span></h1>
                </div>
                <div className="search-box">
                    <span className="sc-icon">🔍</span>
                    <input 
                        type="text" 
                        placeholder="SEARCH OPERATIVES..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="cia-input"
                    />
                </div>
            </header>

            <div className="agent-grid">
                {filteredUsers.map(u => (
                    <div key={u.uid} className={`agent-card ${u.role === 'admin' ? 'admin' : ''} ${selectedIds.includes(u.uid) ? 'selected' : ''}`}>
                        <div className="card-top">
                            <input 
                                type="checkbox" 
                                className="cia-checkbox"
                                checked={selectedIds.includes(u.uid)}
                                onChange={(e) => {
                                    if(e.target.checked) setSelectedIds(prev => [...prev, u.uid]);
                                    else setSelectedIds(prev => prev.filter(id => id !== u.uid));
                                }}
                            />
                            <div className="status-indicator">
                                <span className={`dot ${u.isOnline ? 'online' : 'offline'}`}></span>
                                {u.isOnline ? 'ACTIVE' : 'OFFLINE'}
                            </div>
                            <span className="clearance">LVL: {u.role === 'admin' ? '5' : '1'}</span>
                        </div>
                        
                        <div className="agent-info">
                            <div className="avatar-placeholder">{u.displayName.charAt(0)}</div>
                            <div className="details">
                                <h3>{u.displayName}</h3>
                                <code className="uid">{u.uid.slice(0, 12)}...</code>
                                <span className="email">{u.email}</span>
                            </div>
                        </div>

                        <div className="agent-stats">
                            <div className="stat">
                                <span className="lbl">DEPLOYMENTS</span>
                                <span className="val">{u.siteCount}</span>
                            </div>
                            <div className="stat">
                                <span className="lbl">INTEL (VIEWS)</span>
                                <span className="val">{u.totalViews}</span>
                            </div>
                        </div>

                        <div className="agent-actions">
                            <div className="limit-box">
                                <label>MAX NODES:</label>
                                <input
                                    type="number"
                                    value={u.siteLimit}
                                    onChange={(e) => updateUserLimit(u.uid, e.target.value)}
                                />
                            </div>
                            <div className="btns">
                                <button onClick={() => setSelectedUser(u)} className="btn-cia small">DOSSIER</button>
                                {u.role !== 'admin' && (
                                    <button onClick={() => promoteUser(u.uid)} className="btn-cia small warn" title="Promote">▲</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* BULK ACTION BAR */}
            {selectedIds.length > 0 && (
                 <div className="bulk-bar">
                    <div className="bulk-info">
                        <span className="count">{selectedIds.length}</span>
                        <span>AGENTS SELECTED</span>
                    </div>
                    <div className="bulk-actions">
                        <button onClick={() => console.log('Mass Verify', selectedIds)} className="btn-cia small">VERIFY ALL</button>
                        <button onClick={() => console.log('Mass Ban', selectedIds)} className="btn-cia small warn">PURGE ALL</button>
                        <button onClick={() => setSelectedIds([])} className="btn-cia small">CANCEL</button>
                    </div>
                 </div>
            )}

            {/* CONFIDENTIAL DOSSIER MODAL */}
            {selectedUser && (
                <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
                    <div className="dossier-file" onClick={e => e.stopPropagation()}>
                        <div className="dossier-header">
                            <h2>CONFIDENTIAL FILE // {selectedUser.uid}</h2>
                            <button className="close-btn" onClick={() => setSelectedUser(null)}>[X]</button>
                        </div>
                        
                        <div className="dossier-body">
                            <div className="stamp">{selectedUser.role === 'admin' ? 'TOP SECRET' : 'CONFIDENTIAL'}</div>
                            
                            <div className="dossier-actions" style={{marginBottom: '20px', display: 'flex', justifyContent: 'flex-end'}}>
                                <Link href={`/admin/messages?target=${selectedUser.uid}`} className="btn-cia" style={{textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px'}}>
                                    <span>📡</span> TRANSMIT ORDER
                                </Link>
                            </div>

                            <div className="dossier-section">
                                <h3>// IDENTITY_MATRIX</h3>
                                <div className="data-grid">
                                    <div className="data-row"><span className="lbl">CODENAME:</span> <span className="val">{selectedUser.displayName}</span></div>
                                    <div className="data-row"><span className="lbl">CONTACT:</span> <span className="val">{selectedUser.email}</span></div>
                                    <div className="data-row"><span className="lbl">LOCATION:</span> <span className="val">{selectedUser.location}</span></div>
                                    <div className="data-row"><span className="lbl">TITLE:</span> <span className="val">{selectedUser.jobTitle}</span></div>
                                </div>
                            </div>

                            <div className="dossier-section">
                                <h3>// DEPLOYMENT_LOG</h3>
                                <div className="site-log">
                                    {selectedUser.sites.length > 0 ? (
                                        selectedUser.sites.map(site => (
                                            <div key={site.id} className="log-entry">
                                                <span className="log-status" data-status={site.adminStatus || 'active'}>●</span>
                                                <span className="log-name">{site.title || 'UNNAMED_NODE'}</span>
                                                <a href={`/s/${site.slug}`} target="_blank" className="log-link">/s/{site.slug} ➜</a>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="empty-log">NO DEPLOYMENTS ON RECORD.</div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="dossier-section">
                                <h3>// RAW_DATA_DUMP</h3>
                                <pre className="raw-dump">{JSON.stringify(selectedUser, null, 2)}</pre>
                            </div>
                        </div>
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
                .back-link:hover { opacity: 1; }
                .cia-title { margin: 0; font-size: 2rem; color: #fff; letter-spacing: 5px; }
                .cia-title .sub { color: var(--cia-accent); font-size: 1rem; }

                .search-box { display: flex; align-items: center; border: 1px solid var(--cia-accent); padding: 5px 10px; background: rgba(0,0,0,0.5); }
                .cia-input { background: transparent; border: none; color: #fff; font-family: inherit; font-size: 1rem; outline: none; width: 250px; padding-left: 10px; }
                
                .agent-grid {
                    display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; padding: 0 30px;
                }
                .agent-card {
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 20px;
                    position: relative;
                    transition: all 0.2s;
                    display: flex; flex-direction: column; gap: 15px;
                }
                .agent-card:hover { border-color: var(--cia-accent); background: rgba(0, 243, 255, 0.05); }
                .agent-card.admin { border-color: var(--cia-warn); }
                .agent-card.admin:hover { background: rgba(255, 174, 0, 0.05); }

                .card-top { display: flex; justify-content: space-between; font-size: 0.7rem; opacity: 0.7; }
                .status-indicator { display: flex; align-items: center; gap: 5px; }
                .dot { width: 6px; height: 6px; background: #555; border-radius: 50%; }
                .dot.online { background: var(--cia-success); box-shadow: 0 0 5px var(--cia-success); }
                
                .agent-info { display: flex; gap: 15px; align-items: center; }
                .avatar-placeholder { width: 50px; height: 50px; background: var(--cia-accent); color: #000; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: bold; }
                .details h3 { margin: 0; font-size: 1.1rem; color: #fff; }
                .uid { display: block; font-size: 0.7rem; opacity: 0.5; margin: 2px 0; }
                .email { font-size: 0.8rem; opacity: 0.8; }
                
                .agent-stats { display: flex; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1); padding: 10px 0; }
                .stat { display: flex; flex-direction: column; align-items: center; }
                .stat .lbl { font-size: 0.6rem; opacity: 0.5; }
                .stat .val { font-size: 1.2rem; font-weight: bold; color: #fff; }

                .agent-actions { display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
                .limit-box { display: flex; align-items: center; gap: 5px; font-size: 0.7rem; }
                .limit-box input { width: 40px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 2px; text-align: center; }
                
                .btns { display: flex; gap: 5px; }
                .btn-cia { background: transparent; border: 1px solid var(--cia-accent); color: var(--cia-accent); cursor: pointer; font-family: inherit; font-weight: bold; transition: all 0.2s; }
                .btn-cia:hover { background: var(--cia-accent); color: #000; }
                .btn-cia.small { padding: 4px 8px; font-size: 0.7rem; }
                .btn-cia.warn { border-color: var(--cia-warn); color: var(--cia-warn); }
                .btn-cia.warn:hover { background: var(--cia-warn); color: #000; }

                /* MODAL */
                .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 1000; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(2px); }
                .dossier-file { 
                    width: 600px; max-width: 90%; max-height: 90vh; overflow-y: auto;
                    background: #000; border: 2px solid var(--cia-accent); 
                    box-shadow: 0 0 30px rgba(0, 243, 255, 0.1);
                    padding: 30px; position: relative;
                }
                .dossier-header { display: flex; justify-content: space-between; margin-bottom: 20px; border-bottom: 4px solid #fff; padding-bottom: 10px; }
                .dossier-header h2 { margin: 0; font-size: 1.2rem; }
                .close-btn { background: none; border: none; color: var(--cia-alert); font-weight: bold; cursor: pointer; font-size: 1.2rem; }
                
                .stamp { 
                    position: absolute; top: 80px; right: 40px; 
                    border: 4px solid rgba(255, 50, 50, 0.3); color: rgba(255, 50, 50, 0.3); 
                    padding: 10px 20px; font-size: 2rem; font-weight: bold; transform: rotate(-15deg); pointer-events: none; 
                }
                
                .dossier-section { margin-bottom: 30px; }
                .dossier-section h3 { font-size: 0.8rem; color: var(--cia-accent); border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 15px; padding-bottom: 5px; }
                
                .data-row { display: flex; justify-content: space-between; border-bottom: 1px dotted rgba(255,255,255,0.1); padding: 5px 0; font-size: 0.9rem; }
                .data-row .lbl { opacity: 0.5; }
                
                .site-log { display: flex; flex-direction: column; gap: 5px; }
                .log-entry { display: flex; align-items: center; gap: 10px; font-size: 0.8rem; padding: 5px; background: rgba(255,255,255,0.05); }
                .log-status[data-status="active"] { color: var(--cia-success); }
                .log-status[data-status="banned"] { color: var(--cia-alert); }
                .log-link { margin-left: auto; color: var(--cia-accent); text-decoration: none; opacity: 0.7; }
                .log-link:hover { opacity: 1; }

                .raw-dump { font-size: 0.6rem; color: #555; overflow-x: auto; max-width: 100%; border: 1px solid #333; padding: 10px; }

                .cia-loading { height: 100vh; display: flex; align-items: center; justify-content: center; color: var(--cia-accent); animation: flicker 0.5s infinite; }
            `}</style>
        </main>
    );
}

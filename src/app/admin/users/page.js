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
                const displayName = config.displayName || 'Architect';

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
                    jobTitle: config.jobTitle || '',
                    location: config.location || '',
                    dob: config.dob || '',
                    website: config.website || '',
                    gender: config.gender || '',
                    fullConfig: config
                };
            });

            setUsersList(synthesized);
        } catch (err) {
            console.error("Error fetching users:", err);
            alert("Error loading users");
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
            alert('Failed to update limit: ' + err.message);
        }
    };
    
    const promoteUser = async (uid) => {
        if(!confirm("Are you sure you want to promote this user to ADMIN?")) return;
        try {
            await setDoc(doc(db, 'users', uid), { role: 'admin' }, { merge: true });
            setUsersList(prev => prev.map(u => u.uid === uid ? { ...u, role: 'admin' } : u));
        } catch (err) {
            alert('Failed to promote user: ' + err.message);
        }
    };

    const filteredUsers = usersList.filter(u => 
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.uid.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <Loader text="Loading Users..." />;
    if (!user) return <div className="p-10 text-center text-cyan-400">Access Denied</div>;

    return (
        <div className="users-view animate-fade-in">
            <header className="page-header">
                <div>
                    <Link href="/admin" className="back-link">← Dashboard</Link>
                    <h1>User Management</h1>
                    <p className="subtitle">Managing {usersList.length} Registered Accounts</p>
                </div>
                <div className="search-box">
                    <input 
                        type="text" 
                        placeholder="Search users..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
            </header>

            <div className="glass table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>User Identity</th>
                            <th>Status</th>
                            <th>Role</th>
                            <th>Stats</th>
                            <th>Site Allocation</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(u => (
                            <tr key={u.uid} className="user-row">
                                <td>
                                    <div className="user-identity">
                                        <span className="user-name">{u.displayName}</span>
                                        <span className="user-email">{u.email}</span>
                                        <span className="uid-tag">{u.uid}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className={`status-indicator ${u.isOnline ? 'online' : 'offline'}`}>
                                        <span className="dot"></span>
                                        <span className="text">{u.isOnline ? 'ONLINE' : 'OFFLINE'}</span>
                                    </div>
                                </td>
                                <td>
                                    <span className={`role-badge ${u.role === 'admin' ? 'admin' : ''}`}>
                                        {u.role.toUpperCase()}
                                    </span>
                                </td>
                                <td>
                                    <div className="stats-col">
                                        <span>👁️ {u.totalViews} views</span>
                                        <span>🏗️ {u.siteCount} sites</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="limit-control">
                                        <input
                                            type="number"
                                            value={u.siteLimit}
                                            onChange={(e) => updateUserLimit(u.uid, e.target.value)}
                                            className="limit-input"
                                        />
                                        <span className="limit-label">max sites</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="action-row">
                                        <button onClick={() => setSelectedUser(u)} className="btn-small details" title="View Full Details">
                                            🔍 Details
                                        </button>
                                        {u.role !== 'admin' && (
                                            <button onClick={() => promoteUser(u.uid)} className="btn-small promote" title="Promote to Admin">
                                                ⭐
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredUsers.length === 0 && <div className="no-results">No users found matching search.</div>}
            </div>

            {/* USER DETAILS MODAL */}
            {selectedUser && (
                <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
                    <div className="modal-content glass" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>User Profile</h2>
                            <button className="close-btn" onClick={() => setSelectedUser(null)}>×</button>
                        </div>
                        
                        <div className="modal-body">
                            <div className="profile-header">
                                <div className="profile-avatar">
                                    {(selectedUser.displayName || 'U').charAt(0).toUpperCase()}
                                </div>
                                <div className="profile-info">
                                    <h3>{selectedUser.displayName}</h3>
                                    <span className="profile-email">{selectedUser.email}</span>
                                    <code className="profile-uid">{selectedUser.uid}</code>
                                    <div className="profile-badges">
                                        <span className={`role-badge ${selectedUser.role}`}>{selectedUser.role.toUpperCase()}</span>
                                        {selectedUser.lastActive && (
                                            <span className="active-badge">Active: {new Date(selectedUser.lastActive).toLocaleDateString()}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="stats-grid-mini">
                                <div className="stat-box">
                                    <span className="label">Total Views</span>
                                    <span className="value">{selectedUser.totalViews}</span>
                                </div>
                                <div className="stat-box">
                                    <span className="label">Sites Owned</span>
                                    <span className="value">{selectedUser.siteCount} / {selectedUser.siteLimit}</span>
                                </div>
                                <div className="stat-box">
                                    <span className="label">Status</span>
                                    <span className={`value ${selectedUser.isOnline ? 'ok' : 'offline'}`}>
                                        {selectedUser.isOnline ? 'Online' : 'Offline'}
                                    </span>
                                </div>
                            </div>

                            <div className="section-title">Personal Information</div>
                            <div className="personal-details-grid glass">
                                {selectedUser.bio && (
                                    <div className="full-width-item">
                                        <span className="p-label">Bio</span>
                                        <p className="p-value bio-text">{selectedUser.bio}</p>
                                    </div>
                                )}
                                <div className="p-item">
                                    <span className="p-label">Job Title</span>
                                    <span className="p-value">{selectedUser.jobTitle || 'Not Set'}</span>
                                </div>
                                <div className="p-item">
                                    <span className="p-label">Location</span>
                                    <span className="p-value">{selectedUser.location || 'Not Set'}</span>
                                </div>
                                <div className="p-item">
                                    <span className="p-label">Website</span>
                                    <span className="p-value">{selectedUser.website ? <a href={selectedUser.website} target="_blank" className="inner-link">{selectedUser.website}</a> : 'Not Set'}</span>
                                </div>
                                <div className="p-item">
                                    <span className="p-label">Phone</span>
                                    <span className="p-value">{selectedUser.phone || 'Not Set'}</span>
                                </div>
                                <div className="p-item">
                                    <span className="p-label">Gender</span>
                                    <span className="p-value">{selectedUser.gender || 'Not Set'}</span>
                                </div>
                                <div className="p-item">
                                    <span className="p-label">Birth Date</span>
                                    <span className="p-value">{selectedUser.dob || 'Not Set'}</span>
                                </div>
                                <div className="p-item">
                                    <span className="p-label">Contact Email</span>
                                    <span className="p-value">{selectedUser.contactEmail || selectedUser.email}</span>
                                </div>
                            </div>

                            <div className="section-title">Deployed Sites ({selectedUser.siteCount})</div>
                            <div className="sites-list-scroll">
                                {selectedUser.sites.length > 0 ? (
                                    selectedUser.sites.map(site => (
                                        <div key={site.id} className="mini-site-row">
                                            <div className="mini-site-info">
                                                <strong>{site.title || 'Untitled'}</strong>
                                                <small>/s/{site.slug}</small>
                                            </div>
                                            <div className="mini-site-meta">
                                                <span className={`status-dot ${site.adminStatus || 'active'}`}></span>
                                                <span className="views-count">{site.views || 0} views</span>
                                                <a href={`/s/${site.slug}`} target="_blank" className="site-link">➜</a>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="empty-msg">No sites deployed yet.</div>
                                )}
                            </div>

                            <details className="raw-data-details">
                                <summary>Raw System Data</summary>
                                <pre>{JSON.stringify(selectedUser, null, 2)}</pre>
                            </details>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 30px; }
                .back-link { color: #00f0ff; text-decoration: none; font-size: 0.9rem; font-weight: 700; display: block; margin-bottom: 10px; }
                h1 { font-size: 2rem; margin: 0; }
                .subtitle { opacity: 0.6; }
                
                .search-input { 
                    padding: 10px 20px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); 
                    border-radius: 10px; color: #fff; width: 300px;
                }
                .search-input:focus { outline: none; border-color: #00f0ff; }

                .admin-table { width: 100%; border-collapse: collapse; }
                .admin-table th { text-align: left; padding: 20px; opacity: 0.5; font-size: 0.8rem; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.05); }
                .admin-table td { padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.02); vertical-align: top; }
                
                .user-identity { display: flex; flex-direction: column; gap: 4px; }
                .user-name { font-weight: 700; color: #fff; }
                .user-email { opacity: 0.7; font-size: 0.9rem; }
                .uid-tag { font-family: monospace; opacity: 0.3; font-size: 0.7rem; }
                
                .role-badge { background: rgba(255,255,255,0.1); padding: 4px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: 800; }
                .role-badge.admin { background: rgba(0, 240, 255, 0.2); color: #00f0ff; }
                
                .stats-col { display: flex; flex-direction: column; gap: 5px; font-size: 0.9rem; opacity: 0.8; }
                
                .limit-control { display: flex; align-items: center; gap: 8px; }
                .limit-input { width: 60px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); color: #fff; padding: 5px; border-radius: 4px; text-align: center; }
                .limit-label { font-size: 0.8rem; opacity: 0.6; }

                .action-row { display: flex; gap: 8px; }
                .btn-small { background: rgba(255,255,255,0.05); border: none; color: #fff; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; transition: all 0.2s; white-space: nowrap; }
                .btn-small:hover { background: #fff; color: #000; }
                .btn-small.details { border: 1px solid rgba(255,255,255,0.1); }
                .btn-small.promote:hover { background: #00f0ff; color: #000; }
                
                .no-results { padding: 40px; text-align: center; opacity: 0.5; }
                .glass { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(10px); border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); }
                .animate-fade-in { animation: fadeIn 0.5s ease-out; }

                /* MODAL STYLES */
                .modal-overlay {
                    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.8); backdrop-filter: blur(5px);
                    display: flex; justify-content: flex-end;
                    z-index: 1000; animation: fadeIn 0.3s;
                }
                .modal-content {
                    width: 550px; max-width: 100%; height: 100%;
                    background: #0a0a0a; border-left: 1px solid rgba(255,255,255,0.1);
                    padding: 30px; display: flex; flex-direction: column;
                    animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    overflow-y: auto;
                }
                .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
                .modal-header h2 { margin: 0; font-size: 1.5rem; }
                .close-btn { font-size: 2rem; background: none; border: none; color: #fff; cursor: pointer; opacity: 0.5; transition: opacity 0.2s; line-height: 1; }
                .close-btn:hover { opacity: 1; }

                .profile-header { display: flex; gap: 20px; align-items: center; margin-bottom: 30px; padding-bottom: 30px; border-bottom: 1px solid rgba(255,255,255,0.1); }
                .profile-avatar { width: 80px; height: 80px; background: #00f0ff; color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; font-weight: 800; }
                .profile-info h3 { margin: 0 0 5px 0; font-size: 1.2rem; }
                .profile-email { display: block; opacity: 0.7; font-size: 0.9rem; margin-bottom: 5px; }
                .profile-uid { display: block; font-family: monospace; font-size: 0.7rem; opacity: 0.4; margin-bottom: 10px; background: rgba(255,255,255,0.05); padding: 4px; border-radius: 4px; width: fit-content; }
                .profile-badges { display: flex; gap: 10px; }
                .active-badge { font-size: 0.7rem; background: rgba(0, 255, 136, 0.1); color: #00ff88; padding: 2px 8px; border-radius: 10px; }

                .stats-grid-mini { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 30px; }
                .stat-box { background: rgba(255,255,255,0.03); padding: 15px; border-radius: 10px; text-align: center; }
                .stat-box .label { display: block; font-size: 0.7rem; opacity: 0.5; text-transform: uppercase; margin-bottom: 5px; }
                .stat-box .value { display: block; font-size: 1.2rem; font-weight: 700; }
                .stat-box .value.ok { color: #00ff88; }

                .section-title { font-size: 0.9rem; font-weight: 700; text-transform: uppercase; opacity: 0.5; margin-bottom: 15px; letter-spacing: 1px; }

                .personal-details-grid {
                    display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
                    padding: 20px; border-radius: 15px; margin-bottom: 30px;
                    background: rgba(255,255,255,0.02);
                }
                .p-item { display: flex; flex-direction: column; gap: 4px; }
                .full-width-item { grid-column: span 2; display: flex; flex-direction: column; gap: 8px; }
                .p-label { font-size: 0.65rem; text-transform: uppercase; opacity: 0.4; letter-spacing: 0.5px; }
                .p-value { font-size: 0.9rem; color: #eee; }
                .bio-text { line-height: 1.5; opacity: 0.8; font-style: italic; }
                .inner-link { color: #00f0ff; text-decoration: none; }
                .inner-link:hover { text-decoration: underline; }
                
                .sites-list-scroll { max-height: 300px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; margin-bottom: 30px; }
                .mini-site-row { background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }
                .mini-site-info { display: flex; flex-direction: column; }
                .mini-site-info small { opacity: 0.5; font-family: monospace; }
                .mini-site-meta { display: flex; align-items: center; gap: 10px; font-size: 0.8rem; }
                .status-dot { width: 8px; height: 8px; border-radius: 50%; }
                .status-dot.active { background: #00ff88; }
                .status-dot.banned { background: #ff3232; }
                .status-dot.verified { background: #00f0ff; }
                
                .status-indicator { display: flex; align-items: center; gap: 8px; font-size: 0.7rem; font-weight: 800; }
                .status-indicator .dot { width: 8px; height: 8px; border-radius: 50%; }
                .status-indicator.online { color: #00ff88; }
                .status-indicator.online .dot { background: #00ff88; box-shadow: 0 0 10px #00ff88; }
                .status-indicator.offline { color: rgba(255,255,255,0.3); }
                .status-indicator.offline .dot { background: rgba(255,255,255,0.2); }
                
                .stat-box .value.offline { color: rgba(255,255,255,0.4); }

                .site-link { color: #fff; text-decoration: none; opacity: 0.5; transition: opacity 0.2s; }
                .site-link:hover { opacity: 1; }

                .raw-data-details summary { cursor: pointer; opacity: 0.5; font-size: 0.8rem; margin-bottom: 10px; }
                .raw-data-details pre { background: rgba(0,0,0,0.5); padding: 15px; border-radius: 10px; overflow-x: auto; font-size: 0.7rem; color: #00ff88; }

                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }

                /* RESPONSIVE / MOBILE OPTIMIZATION */
                @media (max-width: 768px) {
                    .page-header { flex-direction: column; align-items: flex-start; gap: 15px; }
                    .search-input { width: 100%; }
                    
                    /* Transform Table to Cards */
                    .admin-table, .admin-table tbody, .admin-table tr { display: block; width: 100%; }
                    .admin-table thead { display: none; } /* Hide headers */
                    
                    .user-row {
                        background: rgba(255,255,255,0.03);
                        margin-bottom: 20px;
                        padding: 20px;
                        border-radius: 16px;
                        border: 1px solid rgba(255,255,255,0.08);
                        display: grid !important;
                        grid-template-columns: 1fr 1fr;
                        grid-template-areas: 
                            "identity status"
                            "role stats"
                            "limits limits"
                            "actions actions";
                        gap: 15px 0;
                        align-items: center;
                    }
                    
                    .admin-table td { padding: 0; border: none; display: block; }
                    
                    /* Assign grid areas to specific cells based on standard order */
                    .admin-table td:nth-child(1) { grid-area: identity; }
                    .admin-table td:nth-child(2) { grid-area: status; justify-self: end; }
                    .admin-table td:nth-child(3) { grid-area: role; }
                    .admin-table td:nth-child(4) { grid-area: stats; justify-self: end; text-align: right; }
                    .admin-table td:nth-child(5) { grid-area: limits; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.05); }
                    .admin-table td:nth-child(6) { grid-area: actions; margin-top: 10px; }

                    .user-identity { gap: 2px; }
                    .user-email { font-size: 0.8rem; }
                    .uid-tag { display: none; } /* Hide raw UID on mobile to save space */
                    
                    .action-row { display: grid; grid-template-columns: 1fr auto; gap: 10px; }
                    .btn-small.details { 
                        display: flex; justify-content: center; align-items: center; 
                        padding: 12px; background: rgba(0, 240, 255, 0.1); 
                        border-color: rgba(0, 240, 255, 0.3); color: #00f0ff;
                        font-weight: 700;
                    }
                    
                    .modal-content { width: 100%; padding: 20px; }
                    .stats-grid-mini { grid-template-columns: 1fr; }
                    .personal-details-grid { grid-template-columns: 1fr; }
                    .full-width-item { grid-column: span 1; }
                }
            `}</style>
        </div>
    );
}

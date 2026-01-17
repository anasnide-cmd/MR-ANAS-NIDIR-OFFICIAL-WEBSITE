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
            // Fetch User Configs
            const usersQ = query(collection(db, 'users'));
            const usersSnap = await getDocs(usersQ);
            const usersConfig = {};
            usersSnap.forEach(doc => {
                usersConfig[doc.id] = doc.data();
            });

            // Fetch Sites to map owners
            const sitesQ = query(collection(db, 'user_sites'));
            const sitesSnap = await getDocs(sitesQ);
            const sitesData = sitesSnap.docs.map(d => d.data());

            // Build User List using Configs as primary source, then enhance with site data
            // Note: Users might not have a config doc if they haven't set preferences, 
            // so we also check unique userIds from sites.
            
            const uniqueIds = new Set([...Object.keys(usersConfig), ...sitesData.map(s => s.userId)]);
            
            const synthesized = Array.from(uniqueIds).map(uid => {
                const config = usersConfig[uid] || {};
                const userSites = sitesData.filter(s => s.userId === uid);
                
                // Infer email/name from sites if not in config
                const displayEmail = config.email || userSites[0]?.userEmail || 'Unknown Email';
                const displayName = config.displayName || 'Architect';

                return {
                    uid,
                    email: displayEmail,
                    displayName: displayName,
                    role: config.role || 'user',
                    siteLimit: config.siteLimit || 1,
                    siteCount: userSites.length,
                    totalViews: userSites.reduce((acc, s) => acc + (s.views || 0), 0),
                    lastActive: config.lastActive || null
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
    }

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
                                    {u.role !== 'admin' && (
                                        <button onClick={() => promoteUser(u.uid)} className="btn-small">
                                            Make Admin
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredUsers.length === 0 && <div className="no-results">No users found matching search.</div>}
            </div>

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
                
                .btn-small { background: rgba(255,255,255,0.05); border: none; color: #fff; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 0.8rem; transition: all 0.2s; }
                .btn-small:hover { background: #00f0ff; color: #000; }
                
                .no-results { padding: 40px; text-align: center; opacity: 0.5; }
                
                .glass { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(10px); border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); }
                .animate-fade-in { animation: fadeIn 0.5s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
}

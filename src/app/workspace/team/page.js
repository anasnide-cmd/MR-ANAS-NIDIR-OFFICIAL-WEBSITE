'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../../lib/firebase';
import { collection, query, where, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function TeamPage() {
    const [currentUser, setCurrentUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [team, setTeam] = useState([]);
    const [emailInput, setEmailInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            if (u) {
                const userDoc = await getDoc(doc(db, 'users', u.uid));
                if (userDoc.exists() && (userDoc.data().role === 'owner' || userDoc.data().role === 'admin')) {
                    setIsOwner(true);
                    setCurrentUser(u);
                    fetchTeam();
                } else {
                    setIsOwner(false); // Should be handled by layout, but extra safety
                }
            }
        });
        return () => unsub();
    }, []);

    const fetchTeam = async () => {
        try {
            // Fetch users with role 'staff', 'admin', 'owner'
            // Firestore 'in' query limited to 10, but we have few roles
            const q = query(collection(db, 'users'), where('role', 'in', ['staff', 'admin', 'owner']));
            const snapshot = await getDocs(q);
            const teamData = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            setTeam(teamData);
        } catch (err) {
            console.error("Failed to fetch team:", err);
            setError("Could not load team data.");
        }
    };

    const handleRecruit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Find user by email
            const q = query(collection(db, 'users'), where('email', '==', emailInput));
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                setError("User not found. They must sign up first.");
                setLoading(false);
                return;
            }

            const targetUser = snapshot.docs[0];
            const currentRole = targetUser.data().role;

            if (currentRole === 'owner') {
                setError("Cannot modify Owner status.");
                setLoading(false);
                return;
            }

            // Promote to Staff
            await updateDoc(doc(db, 'users', targetUser.id), {
                role: 'staff'
            });

            setSuccess(`${targetUser.data().email} has been recruited as Staff.`);
            setEmailInput('');
            fetchTeam();
        } catch (err) {
            console.error("Recruitment failed:", err);
            setError("Operation failed. Check permissions.");
        } finally {
            setLoading(false);
        }
    };

    const updateRole = async (userId, newRole) => {
        if (!confirm(`Change role to ${newRole}?`)) return;
        try {
            await updateDoc(doc(db, 'users', userId), { role: newRole });
            fetchTeam();
        } catch (err) {
            alert("Failed to update role");
        }
    };

    if (!isOwner) return <div className="p-10 text-center">ACCESS RESTRICTED: OWNER/ADMIN ONLY</div>;

    return (
        <div className="team-container">
            <header className="page-header">
                <h1>TEAM MANAGEMENT</h1>
                <p>Recruit and manage workspace access.</p>
            </header>

            <div className="recruit-section card">
                <h3>Recruit New Staff</h3>
                <form onSubmit={handleRecruit} className="recruit-form">
                    <input
                        type="email"
                        placeholder="Enter user email..."
                        value={emailInput}
                        onChange={e => setEmailInput(e.target.value)}
                        required
                        className="input-field"
                    />
                    <button type="submit" className="btn-recruit" disabled={loading}>
                        {loading ? 'PROCESSING...' : 'RECRUIT STAFF'}
                    </button>
                </form>
                {error && <p className="msg error">{error}</p>}
                {success && <p className="msg success">{success}</p>}
            </div>

            <div className="team-list-section">
                <h3>Active Personnel</h3>
                <div className="team-grid">
                    {team.map(member => (
                        <div key={member.id} className={`member-card ${member.role}`}>
                            <div className="member-info">
                                <div className="avatar">{member.email?.charAt(0).toUpperCase()}</div>
                                <div>
                                    <span className="member-email">{member.email}</span>
                                    <span className="member-role">{member.role}</span>
                                </div>
                            </div>
                            {member.role !== 'owner' && member.id !== currentUser.uid && (
                                <div className="actions">
                                    {member.role === 'staff' ? (
                                        <button onClick={() => updateRole(member.id, 'user')} className="btn-demote">Remove Access</button>
                                    ) : (
                                        <button onClick={() => updateRole(member.id, 'staff')} className="btn-promote">Restore Access</button>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .team-container { padding: 40px; max-width: 1000px; margin: 0 auto; }
                .page-header { margin-bottom: 40px; text-align: center; }
                h1 { font-family: var(--font-orbitron); color: #fff; margin-bottom: 10px; }
                p { color: rgba(255,255,255,0.5); }

                .card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); padding: 30px; border-radius: 16px; margin-bottom: 40px; }
                h3 { font-family: var(--font-orbitron); font-size: 1rem; color: #a0a0ff; margin-bottom: 20px; text-transform: uppercase; }

                .recruit-form { display: flex; gap: 10px; }
                .input-field { flex: 1; padding: 12px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff; font-family: inherit; }
                .btn-recruit { padding: 12px 24px; background: #a0a0ff; color: #000; font-weight: 800; border: none; border-radius: 8px; cursor: pointer; transition: 0.2s; }
                .btn-recruit:hover { opacity: 0.9; transform: translateY(-2px); }
                
                .msg { margin-top: 15px; font-size: 0.9rem; padding: 10px; border-radius: 8px; }
                .msg.error { background: rgba(255,50,50,0.1); color: #ff5050; border: 1px solid rgba(255,50,50,0.2); }
                .msg.success { background: rgba(50,255,100,0.1); color: #50ff80; border: 1px solid rgba(50,255,100,0.2); }

                .team-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
                .member-card { background: rgba(255,255,255,0.02); padding: 20px; border-radius: 12px; display: flex; flex-direction: column; gap: 15px; border: 1px solid rgba(255,255,255,0.05); }
                .member-card.owner { border-color: #ffd700; background: rgba(255, 215, 0, 0.05); }
                .member-card.admin { border-color: #a0a0ff; }
                
                .member-info { display: flex; gap: 15px; align-items: center; }
                .avatar { width: 40px; height: 40px; background: #333; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; }
                .member-card.owner .avatar { background: #ffd700; color: #000; }
                .member-card.admin .avatar { background: #a0a0ff; color: #000; }
                
                .member-email { display: block; font-weight: 600; font-size: 0.9rem; }
                .member-role { font-size: 0.75rem; opacity: 0.6; text-transform: uppercase; letter-spacing: 1px; }

                .actions { display: flex; justify-content: flex-end; }
                .btn-demote { background: transparent; border: 1px solid rgba(255,50,50,0.3); color: #ff5050; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.75rem; }
                .btn-demote:hover { background: rgba(255,50,50,0.1); }
                .btn-promote { background: transparent; border: 1px solid rgba(50,255,100,0.3); color: #50ff80; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.75rem; }

                @media (max-width: 600px) {
                    .recruit-form { flex-direction: column; }
                }
            `}</style>
        </div>
    );
}

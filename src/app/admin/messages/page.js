'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, orderBy, getDocs, addDoc, deleteDoc, doc, where } from 'firebase/firestore';
import Loader from '../../../components/Loader';
import Link from 'next/link';

export default function AdminMessages() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [usersList, setUsersList] = useState([]);
    const [messagesHistory, setMessagesHistory] = useState([]);

    // Form State
    const [msgData, setMsgData] = useState({
        title: '',
        content: '',
        type: 'broadcast', // broadcast, direct
        priority: 'normal', // normal, urgent
        targetUserId: '',
    });

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            if (u) {
                setUser(u);
                fetchData();
            } else {
                setLoading(false);
            }
        });
        return () => unsub();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch Users for Direct Messaging
            const usersSnap = await getDocs(collection(db, 'users'));
            const users = [];
            usersSnap.forEach(doc => {
                users.push({ uid: doc.id, ...doc.data() });
            });
            setUsersList(users);

            // Fetch Message History
            const msgQ = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
            const msgSnap = await getDocs(msgQ);
            setMessagesHistory(msgSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!msgData.title || !msgData.content) return;
        if (msgData.type === 'direct' && !msgData.targetUserId) {
            alert("Please select a target user.");
            return;
        }

        setSending(true);
        try {
            await addDoc(collection(db, 'messages'), {
                ...msgData,
                createdAt: new Date().toISOString(),
                author: 'admin',
                authorEmail: user.email
            });
            
            alert("Message deployed successfully!");
            setMsgData({
                title: '',
                content: '',
                type: 'broadcast',
                priority: 'normal',
                targetUserId: '',
            });
            fetchData();
        } catch (err) {
            console.error("Error sending message:", err);
            alert("Deployment failed: " + err.message);
        } finally {
            setSending(false);
        }
    };

    const handleDeleteMessage = async (id) => {
        if (!confirm("Retract this message? It will disappear from all user feeds.")) return;
        try {
            await deleteDoc(doc(db, 'messages', id));
            fetchData();
        } catch (err) {
            alert("Failed to retract: " + err.message);
        }
    };

    if (loading) return <Loader text="Syncing Comms..." />;

    return (
        <div className="messages-view">
            <header className="page-header">
                <div className="header-info">
                    <span className="page-tag">COMMUNICATIONS HUB</span>
                    <h1>Announcements & Messaging</h1>
                    <p className="subtitle">Broadcast updates or send secure direct directives to users.</p>
                </div>
            </header>

            <div className="messages-grid">
                {/* Compose Form */}
                <div className="compose-card glass card reveal-on-scroll">
                    <h3>Deploy New Directive</h3>
                    <form onSubmit={handleSendMessage} className="directive-form">
                        <div className="input-group">
                            <label>Directive Title</label>
                            <input 
                                value={msgData.title}
                                onChange={e => setMsgData({...msgData, title: e.target.value})}
                                placeholder="System Update v2.1..."
                                className="modern-input"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Directive Content</label>
                            <textarea 
                                value={msgData.content}
                                onChange={e => setMsgData({...msgData, content: e.target.value})}
                                placeholder="Enter message requirements..."
                                className="modern-input"
                                rows={4}
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="input-group half">
                                <label>Target Scope</label>
                                <select 
                                    value={msgData.type}
                                    onChange={e => setMsgData({...msgData, type: e.target.value})}
                                    className="modern-input"
                                >
                                    <option value="broadcast">Global Broadcast</option>
                                    <option value="direct">Targeted Directive</option>
                                </select>
                            </div>

                            <div className="input-group half">
                                <label>Priority Level</label>
                                <select 
                                    value={msgData.priority}
                                    onChange={e => setMsgData({...msgData, priority: e.target.value})}
                                    className="modern-input"
                                >
                                    <option value="normal">Standard</option>
                                    <option value="urgent">Urgent (Popup)</option>
                                </select>
                            </div>
                        </div>

                        {msgData.type === 'direct' && (
                            <div className="input-group">
                                <label>Select Target User</label>
                                <select 
                                    value={msgData.targetUserId}
                                    onChange={e => setMsgData({...msgData, targetUserId: e.target.value})}
                                    className="modern-input"
                                    required
                                >
                                    <option value="">-- Choose User --</option>
                                    {usersList.map(u => (
                                        <option key={u.uid} value={u.uid}>
                                            {u.displayName || u.email} ({u.email})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <button type="submit" className="btn-modern glow-blue full-width" disabled={sending}>
                            {sending ? '⚡ Deploying...' : '🚀 Deploy Directive'}
                        </button>
                    </form>
                </div>

                {/* History List */}
                <div className="history-card glass card reveal-on-scroll">
                    <h3>Directive History</h3>
                    <div className="history-list">
                        {messagesHistory.length === 0 ? (
                            <p className="no-data">No history found. System is quiet.</p>
                        ) : (
                            messagesHistory.map(msg => (
                                <div key={msg.id} className={`history-item ${msg.priority}`}>
                                    <div className="item-main">
                                        <div className="item-meta">
                                            <span className={`type-pill ${msg.type}`}>{msg.type.toUpperCase()}</span>
                                            {msg.priority === 'urgent' && <span className="urgent-pill">URGENT</span>}
                                            <span className="date-tag">{new Date(msg.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <h4>{msg.title}</h4>
                                        <p>{msg.content}</p>
                                        {msg.type === 'direct' && (
                                            <div className="target-info">
                                                To: <code>{usersList.find(u => u.uid === msg.targetUserId)?.email || msg.targetUserId}</code>
                                            </div>
                                        )}
                                    </div>
                                    <button onClick={() => handleDeleteMessage(msg.id)} className="btn-retract" title="Retract Directive">
                                        🗑️
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .messages-view { animation: fadeIn 0.5s ease-out; }
                .page-header { margin-bottom: 40px; }
                .page-tag { 
                    font-size: 0.7rem; color: #00f0ff; letter-spacing: 3px; 
                    background: rgba(0, 240, 255, 0.1); padding: 5px 12px; 
                    border-radius: 20px; font-weight: 900;
                }
                .page-header h1 { font-family: var(--font-orbitron); font-size: 2.2rem; margin: 15px 0 10px; }
                .subtitle { opacity: 0.5; }

                .messages-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 30px; }

                .card { padding: 30px; border-radius: 24px; position: relative; overflow: hidden; }
                h3 { font-family: var(--font-orbitron); font-size: 1.1rem; color: #00f0ff; margin-bottom: 25px; letter-spacing: 1px; }

                .input-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
                .input-group label { font-size: 0.75rem; font-weight: 800; opacity: 0.6; text-transform: uppercase; letter-spacing: 1px; }
                
                .modern-input {
                    background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px; padding: 12px 15px; color: #fff; font-size: 0.95rem; font-family: inherit;
                    transition: all 0.3s;
                }
                .modern-input:focus { border-color: #00f0ff; outline: none; background: rgba(255, 255, 255, 0.05); }
                select.modern-input { cursor: pointer; }
                select.modern-input option { background: #0a0a0a; color: #fff; }

                .form-row { display: flex; gap: 15px; }
                .half { flex: 1; }

                .history-list { max-height: 600px; overflow-y: auto; padding-right: 10px; }
                .history-list::-webkit-scrollbar { width: 4px; }
                .history-list::-webkit-scrollbar-thumb { background: rgba(0, 240, 255, 0.2); border-radius: 10px; }

                .history-item { 
                    padding: 20px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 16px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: flex-start;
                    transition: all 0.3s;
                }
                .history-item:hover { background: rgba(255, 255, 255, 0.04); border-color: rgba(255, 255, 255, 0.1); }
                .history-item.urgent { border-left: 4px solid #ff3232; background: rgba(255, 50, 50, 0.02); }

                .item-main { flex: 1; }
                .item-meta { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
                .type-pill { font-size: 0.6rem; font-weight: 900; padding: 2px 8px; border-radius: 4px; }
                .type-pill.broadcast { background: rgba(0, 240, 255, 0.1); color: #00f0ff; }
                .type-pill.direct { background: rgba(112, 0, 255, 0.1); color: #7000ff; }
                .urgent-pill { background: #ff3232; color: #fff; font-size: 0.6rem; font-weight: 900; padding: 2px 8px; border-radius: 4px; }
                .date-tag { font-size: 0.7rem; opacity: 0.4; }

                h4 { margin: 0 0 8px; font-size: 1.1rem; }
                p { font-size: 0.9rem; opacity: 0.7; margin-bottom: 10px; line-height: 1.5; }
                .target-info { font-size: 0.75rem; opacity: 0.5; }
                .target-info code { color: #7000ff; }

                .btn-retract { 
                    background: none; border: none; cursor: pointer; font-size: 1rem; opacity: 0.3; 
                    transition: all 0.3s; padding: 5px; 
                }
                .btn-retract:hover { opacity: 1; transform: scale(1.2); filter: drop-shadow(0 0 5px #ff3232); }

                .no-data { text-align: center; opacity: 0.4; padding: 40px; }

                @media (max-width: 1200px) {
                    .messages-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
}

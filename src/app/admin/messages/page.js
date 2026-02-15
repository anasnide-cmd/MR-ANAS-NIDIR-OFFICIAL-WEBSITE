'use client';
import { useState, useEffect, Suspense } from 'react';
import { auth, db } from '../../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, orderBy, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function MessagesContent() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [usersList, setUsersList] = useState([]);
    const [messagesHistory, setMessagesHistory] = useState([]);
    const searchParams = useSearchParams();

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

    // Handle Deep Linking
    useEffect(() => {
        const target = searchParams.get('target');
        if (target) {
            setMsgData(prev => ({
                ...prev,
                type: 'direct',
                targetUserId: target,
                title: 'CLASSIFIED DIRECTIVE // ' + new Date().toISOString().split('T')[0]
            }));
        }
    }, [searchParams]);

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
            alert("TARGET_MISSING: ABORTING TRANSMISSION");
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
            
            // Play sound effect purely via DOM manipulation if we had audio, 
            // for now just visual feedback
            setMsgData({
                title: '',
                content: '',
                type: 'broadcast',
                priority: 'normal',
                targetUserId: '',
            });
            fetchData();
        } catch (err) {
            alert("TRANSMISSION_FAIL: " + err.message);
        } finally {
            setSending(false);
        }
    };

    const handleDeleteMessage = async (id) => {
        if (!confirm("CONFIRM DELETION OF RECORD?")) return;
        try {
            await deleteDoc(doc(db, 'messages', id));
            fetchData();
        } catch (err) {
            alert("DELETE_FAIL");
        }
    };

    if (loading) return <div className="cia-loading">ESTABLISHING SECURE CONNECTION...</div>;

    return (
        <div className="cia-dashboard">
             <header className="cia-header">
                <div>
                    <Link href="/admin" className="back-link">:: RETURN TO COMMAND</Link>
                    <h1 className="cia-title">SECURE COMMS <span className="sub">ENCRYPTED CHANNEL</span></h1>
                </div>
                <div className="status-badge">
                    <span className="blink">●</span> LIVE
                </div>
            </header>

            <div className="comms-grid">
                {/* TRANSMISSION TERMINAL */}
                <div className="terminal-card">
                    <div className="terminal-header">
                        <h3>:: TRANSMISSION_PROTOCOL</h3>
                    </div>
                    <form onSubmit={handleSendMessage} className="terminal-form">
                        <div className="form-group">
                            <label>ENCRYPTION_KEY (TITLE)</label>
                            <input 
                                value={msgData.title}
                                onChange={e => setMsgData({...msgData, title: e.target.value})}
                                placeholder="ENTER HEADER..."
                                className="cia-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>PAYLOAD (CONTENT)</label>
                            <textarea 
                                value={msgData.content}
                                onChange={e => setMsgData({...msgData, content: e.target.value})}
                                placeholder="ENTER MESSAGE DATA..."
                                className="cia-input area"
                                rows={6}
                                required
                            />
                        </div>

                        <div className="controls-row">
                            <div className="form-group half">
                                <label>SIGNAL_TYPE</label>
                                <select 
                                    value={msgData.type}
                                    onChange={e => setMsgData({...msgData, type: e.target.value})}
                                    className="cia-input"
                                >
                                    <option value="broadcast">GLOBAL_BROADCAST</option>
                                    <option value="direct">DIRECT_BEAM</option>
                                </select>
                            </div>

                            <div className="form-group half">
                                <label>PRIORITY_LEVEL</label>
                                <select 
                                    value={msgData.priority}
                                    onChange={e => setMsgData({...msgData, priority: e.target.value})}
                                    className="cia-input"
                                >
                                    <option value="normal">STANDARD</option>
                                    <option value="urgent">CRITICAL (INTERRUPT)</option>
                                </select>
                            </div>
                        </div>

                        {msgData.type === 'direct' && (
                            <div className="form-group fade-in">
                                <label>TARGET_DESIGNATION</label>
                                <select 
                                    value={msgData.targetUserId}
                                    onChange={e => setMsgData({...msgData, targetUserId: e.target.value})}
                                    className="cia-input"
                                    required
                                >
                                    <option value="">-- SELECT OPERATIVE --</option>
                                    {usersList.map(u => (
                                        <option key={u.uid} value={u.uid}>
                                            {u.displayName} [{u.email}]
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <button type="submit" className="btn-transmit" disabled={sending}>
                            {sending ? 'TRANSMITTING...' : 'INITIATE TRANSMISSION'}
                        </button>
                    </form>
                </div>

                {/* ARCHIVE LOG */}
                <div className="archive-card">
                    <div className="terminal-header">
                        <h3>:: ARCHIVE_LOG</h3>
                    </div>
                    <div className="log-scroll">
                        {messagesHistory.length === 0 ? (
                            <div className="no-data">NO RECORDS FOUND</div>
                        ) : (
                            messagesHistory.map(msg => (
                                <div key={msg.id} className={`log-entry ${msg.priority}`}>
                                    <div className="entry-meta">
                                        <span className="timestamp">[{new Date(msg.createdAt).toLocaleDateString()}]</span>
                                        <span className={`tag ${msg.type}`}>{msg.type.toUpperCase()}</span>
                                        {msg.priority === 'urgent' && <span className="tag urgent">CRITICAL</span>}
                                    </div>
                                    <div className="entry-title">{msg.title}</div>
                                    <div className="entry-content">{msg.content}</div>
                                    {msg.type === 'direct' && (
                                        <div className="entry-target">&gt;&gt; TARGET: {usersList.find(u => u.uid === msg.targetUserId)?.email || msg.targetUserId}</div>
                                    )}
                                    <button onClick={() => handleDeleteMessage(msg.id)} className="btn-delete" title="Purge Record">×</button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <style jsx global>{`
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
                
                .status-badge { border: 1px solid var(--cia-success); color: var(--cia-success); padding: 5px 10px; font-size: 0.8rem; display: flex; align-items: center; gap: 5px; }
                .blink { animation: flicker 1s infinite; }

                .comms-grid {
                    display: grid; grid-template-columns: 1fr 1fr; gap: 30px; padding: 0 30px;
                }
                
                .terminal-card, .archive-card {
                    background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1);
                    height: 600px; display: flex; flex-direction: column;
                }
                
                .terminal-header {
                    background: rgba(255,255,255,0.05); padding: 10px 15px;
                    border-bottom: 1px solid var(--cia-accent);
                }
                .terminal-header h3 { margin: 0; font-size: 0.9rem; color: var(--cia-accent); letter-spacing: 2px; }
                
                .terminal-form { padding: 20px; display: flex; flex-direction: column; gap: 20px; }
                
                .form-group { display: flex; flex-direction: column; gap: 5px; }
                .form-group label { font-size: 0.7rem; opacity: 0.7; color: var(--cia-accent); }
                
                .cia-input {
                    background: rgba(0, 243, 255, 0.05); border: 1px solid rgba(255,255,255,0.2);
                    color: #fff; padding: 10px; font-family: inherit; font-size: 1rem;
                }
                .cia-input:focus { outline: none; border-color: var(--cia-accent); box-shadow: 0 0 10px rgba(0, 243, 255, 0.1); }
                .cia-input.area { resize: none; }
                .cia-input option { background: #000; }

                .controls-row { display: flex; gap: 20px; }
                .half { flex: 1; }

                .btn-transmit {
                    margin-top: 10px; padding: 15px; background: var(--cia-accent); color: #000;
                    border: none; font-family: inherit; font-weight: bold; font-size: 1.1rem;
                    cursor: pointer; transition: all 0.2s; letter-spacing: 2px;
                }
                .btn-transmit:hover { background: #fff; box-shadow: 0 0 20px var(--cia-accent); }
                .btn-transmit:disabled { opacity: 0.5; cursor: not-allowed; }

                .log-scroll { flex: 1; overflow-y: auto; padding: 10px; display: flex; flex-direction: column; gap: 10px; }
                
                .log-entry {
                    background: rgba(255,255,255,0.02); border-left: 2px solid rgba(255,255,255,0.2);
                    padding: 10px; position: relative;
                }
                .log-entry:hover { background: rgba(255,255,255,0.05); }
                .log-entry.urgent { border-left-color: var(--cia-alert); background: rgba(255, 50, 50, 0.05); }
                
                .entry-meta { display: flex; gap: 10px; font-size: 0.7rem; margin-bottom: 5px; opacity: 0.7; }
                .tag { font-weight: bold; }
                .tag.direct { color: #bb00ff; }
                .tag.broadcast { color: var(--cia-success); }
                .tag.urgent { color: var(--cia-alert); }
                
                .entry-title { font-weight: bold; color: #fff; margin-bottom: 5px; }
                .entry-content { font-size: 0.9rem; opacity: 0.8; line-height: 1.4; white-space: pre-wrap; }
                .entry-target { margin-top: 5px; font-size: 0.7rem; color: #bb00ff; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 5px; }
                
                .btn-delete {
                    position: absolute; top: 5px; right: 5px; background: none; border: none;
                    color: rgba(255,255,255,0.3); cursor: pointer; font-size: 1.2rem;
                }
                .btn-delete:hover { color: var(--cia-alert); }
                
                .fade-in { animation: fadeIn 0.3s; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
                
                .cia-loading { height: 100vh; display: flex; align-items: center; justify-content: center; color: var(--cia-accent); animation: flicker 0.5s infinite; }
            `}</style>
        </div>
    );
}

export default function AdminMessages() {
    return (
        <Suspense fallback={<div className="cia-loading">LOADING COMMS MODULE...</div>}>
            <MessagesContent />
        </Suspense>
    );
}

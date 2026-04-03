'use client';
import { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, query, where, onSnapshot, orderBy, or } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function NotificationCenter() {
    const [messages, setMessages] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [dismissedMessages, setDismissedMessages] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('dismissed_messages');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    useEffect(() => {
        const unsubAuth = onAuthStateChanged(auth, (user) => {
            if (!user) return;

            // Simplified query to test permissions (fetch only broadcasts)
            const q = query(
                collection(db, 'messages'), 
                where('type', '==', 'broadcast')
            );
            
            const unsubMsg = onSnapshot(q, (snap) => {
                const allMsgs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
                
                // Filter for current user
                const visible = allMsgs.filter(m => 
                    m.type === 'broadcast' || m.targetUserId === user.uid
                );

                setMessages(visible);
            }, (error) => {
                console.error("NotificationCenter: Snapshot listener error", error);
            });

            return () => unsubMsg();
        });

        return () => unsubAuth();
    }, []);

    const activeUrgent = messages.find(m => 
        m.priority === 'urgent' && 
        !dismissedMessages.includes(m.id)
    );

    const dismissMessage = (id) => {
        const updated = [...dismissedMessages, id];
        setDismissedMessages(updated);
        localStorage.setItem('dismissed_messages', JSON.stringify(updated));
    };

    const unreadCount = messages.filter(m => !dismissedMessages.includes(m.id)).length;

    return (
        <div className="notification-center">
            {/* Bell Icon */}
            <div className="bell-wrapper" onClick={() => setShowDropdown(!showDropdown)}>
                <span className="bell-icon">🔔</span>
                {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
            </div>

            {/* Notification Dropdown */}
            {showDropdown && (
                <div className="notification-dropdown glass card">
                    <div className="dropdown-header">
                        <h4>System Feed</h4>
                        <button onClick={() => setShowDropdown(false)}>×</button>
                    </div>
                    <div className="dropdown-list">
                        {messages.length === 0 ? (
                            <p className="empty-msg">No active directives.</p>
                        ) : (
                            messages.map(msg => (
                                <div key={msg.id} className={`notif-item ${msg.priority} ${dismissedMessages.includes(msg.id) ? 'read' : 'unread'}`}>
                                    <div className="notif-content">
                                        <h5>{msg.title}</h5>
                                        <p>{msg.content}</p>
                                        <span className="notif-date">{new Date(msg.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    {!dismissedMessages.includes(msg.id) && (
                                        <button className="dismiss-btn" onClick={() => dismissMessage(msg.id)}>Dismiss</button>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* Urgent Message Popup */}
            {activeUrgent && (
                <div className="urgent-popup-overlay">
                    <div className="urgent-popup glass card">
                        <div className="urgent-header">
                            <span className="urgent-tag">URGENT DIRECTIVE</span>
                            <h2>{activeUrgent.title}</h2>
                        </div>
                        <div className="urgent-body">
                            <p>{activeUrgent.content}</p>
                        </div>
                        <div className="urgent-footer">
                            <button className="btn-modern glow-blue" onClick={() => dismissMessage(activeUrgent.id)}>
                                Acknowledge Directive
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .notification-center { position: relative; display: flex; align-items: center; }
                .bell-wrapper { cursor: pointer; position: relative; padding: 10px; transition: transform 0.3s; }
                .bell-wrapper:hover { transform: scale(1.1); }
                .bell-icon { font-size: 1.4rem; filter: drop-shadow(0 0 5px rgba(0, 240, 255, 0.5)); }
                .badge {
                    position: absolute; top: 5px; right: 5px; background: #ff3232; color: #fff;
                    font-size: 0.65rem; font-weight: 900; padding: 2px 6px; border-radius: 10px;
                    box-shadow: 0 0 10px rgba(255, 50, 50, 0.5); border: 2px solid #000;
                }

                .notification-dropdown {
                    position: absolute; top: 100%; right: 0; width: 320px; max-height: 450px;
                    z-index: 1000; margin-top: 15px; border: 1px solid rgba(0, 240, 255, 0.2);
                    display: flex; flex-direction: column; overflow: hidden;
                }
                .dropdown-header { padding: 15px 20px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); display: flex; justify-content: space-between; align-items: center; }
                .dropdown-header h4 { font-family: var(--font-orbitron); font-size: 0.9rem; color: #00f0ff; margin: 0; }
                .dropdown-header button { background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer; opacity: 0.5; }

                .dropdown-list { overflow-y: auto; flex: 1; padding: 10px; }
                .notif-item { 
                    padding: 15px; border-radius: 12px; margin-bottom: 10px; background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05); transition: all 0.3s;
                }
                .notif-item.urgent { border-left: 3px solid #ff3232; background: rgba(255, 50, 50, 0.03); }
                .notif-item.read { opacity: 0.5; }
                .notif-item h5 { font-size: 0.95rem; margin: 0 0 5px; }
                .notif-item p { font-size: 0.8rem; margin: 0 0 10px; line-height: 1.4; }
                .notif-date { font-size: 0.7rem; opacity: 0.4; }
                .dismiss-btn { background: none; border: 1px solid rgba(0, 240, 255, 0.3); color: #00f0ff; font-size: 0.7rem; padding: 4px 10px; border-radius: 6px; cursor: pointer; }
                .dismiss-btn:hover { background: #00f0ff; color: #000; }

                .empty-msg { text-align: center; opacity: 0.4; font-size: 0.8rem; padding: 40px 0; }

                /* Urgent Popup */
                .urgent-popup-overlay {
                    position: fixed; inset: 0; background: rgba(0, 0, 0, 0.85);
                    display: flex; align-items: center; justify-content: center; z-index: 10000;
                    backdrop-filter: blur(10px); animation: fadeIn 0.3s ease-out;
                }
                .urgent-popup {
                    width: 90%; max-width: 500px; padding: 40px; border: 1px solid #ff3232;
                    text-align: center; box-shadow: 0 0 50px rgba(255, 50, 50, 0.2);
                    animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .urgent-tag { color: #ff3232; font-size: 0.7rem; font-weight: 900; letter-spacing: 4px; display: block; margin-bottom: 20px; }
                .urgent-header h2 { font-family: var(--font-orbitron); font-size: 2rem; margin: 0 0 20px; }
                .urgent-body p { font-size: 1.1rem; opacity: 0.8; line-height: 1.6; margin-bottom: 40px; }
                .btn-modern.glow-blue { 
                    background: #fff; color: #000; padding: 15px 35px; border-radius: 12px; font-weight: 900; font-size: 1rem;
                    box-shadow: 0 0 20px #fff; transition: all 0.3s;
                }
                .btn-modern.glow-blue:hover { transform: scale(1.05); }

                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(30px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
            `}</style>
        </div>
    );
}

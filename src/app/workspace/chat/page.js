'use client';
import { useState, useEffect, useRef } from 'react';
import { auth, db } from '../../../lib/firebase';
import { collection, query, orderBy, limit, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function ChatPage() {
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const dummyRef = useRef();

    useEffect(() => {
        const unsubAuth = onAuthStateChanged(auth, u => {
            if (u) setUser(u);
        });

        // Query last 50 messages
        const q = query(
            collection(db, 'workspace_chats'),
            orderBy('timestamp', 'asc'),
            limit(50)
        );

        const unsubChat = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(msgs);
            // Scroll to bottom on new message
            setTimeout(() => dummyRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        }, (error) => {
            console.error("ChatPage: Snapshot listener error", error);
        });

        return () => {
            unsubAuth();
            unsubChat();
        };
    }, []);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !user) return;

        try {
            await addDoc(collection(db, 'workspace_chats'), {
                text: newMessage,
                timestamp: serverTimestamp(),
                senderId: user.uid,
                senderName: user.email?.split('@')[0] || 'Unknown Staff',
                senderEmail: user.email,
                type: 'text'
            });
            setNewMessage('');
        } catch (err) {
            console.error("Failed to send:", err);
            alert("Failed to send message.");
        }
    };

    return (
        <div className="chat-container">
            <header className="chat-header">
                <h1>COMMUNICATION HUB</h1>
                <p>Secure Team Channel • Encrypted</p>
            </header>

            <div className="messages-area">
                {messages.map((msg) => {
                    const isMe = msg.senderId === user?.uid;
                    return (
                        <div key={msg.id} className={`message-row ${isMe ? 'mine' : 'theirs'}`}>
                            {!isMe && <span className="sender-name">{msg.senderName}</span>}
                            <div className="message-bubble">
                                {msg.text}
                            </div>
                        </div>
                    );
                })}
                <div ref={dummyRef}></div>
            </div>

            <form onSubmit={sendMessage} className="input-area">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a secure message..."
                    className="chat-input"
                />
                <button type="submit" className="send-btn" disabled={!newMessage.trim()}>
                    ➤
                </button>
            </form>

            <style jsx>{`
                .chat-container {
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    background: #0f1014;
                    position: relative;
                }
                .chat-header {
                    padding: 20px 30px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    background: rgba(15, 16, 20, 0.95);
                    backdrop-filter: blur(10px);
                    z-index: 10;
                }
                h1 { 
                    font-family: var(--font-orbitron); 
                    font-size: 1.2rem; 
                    color: #fff;
                    letter-spacing: 1px;
                }
                p { font-size: 0.8rem; color: #00f0ff; opacity: 0.7; }

                .messages-area {
                    flex: 1;
                    overflow-y: auto;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .message-row {
                    display: flex;
                    flex-direction: column;
                    max-width: 70%;
                }
                .message-row.mine { align-self: flex-end; align-items: flex-end; }
                .message-row.theirs { align-self: flex-start; align-items: flex-start; }

                .sender-name {
                    font-size: 0.7rem;
                    color: rgba(255, 255, 255, 0.5);
                    margin-bottom: 4px;
                    margin-left: 10px;
                }

                .message-bubble {
                    padding: 12px 18px;
                    border-radius: 18px;
                    background: rgba(255, 255, 255, 0.05);
                    color: #fff;
                    line-height: 1.5;
                    font-size: 0.95rem;
                    position: relative;
                }
                .message-row.mine .message-bubble {
                    background: linear-gradient(135deg, #0050ff 0%, #0080ff 100%);
                    border-bottom-right-radius: 2px;
                }
                .message-row.theirs .message-bubble {
                    border-bottom-left-radius: 2px;
                }

                .input-area {
                    padding: 20px;
                    background: rgba(15, 16, 20, 0.9);
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    gap: 10px;
                }

                .chat-input {
                    flex: 1;
                    padding: 15px 20px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 30px;
                    color: #fff;
                    font-family: inherit;
                    outline: none;
                }
                .chat-input:focus { border-color: #00f0ff; background: rgba(255, 255, 255, 0.08); }

                .send-btn {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: #00f0ff;
                    border: none;
                    color: #000;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    transition: transform 0.2s;
                }
                .send-btn:hover:not(:disabled) { transform: scale(1.1); }
                .send-btn:disabled { opacity: 0.5; cursor: not-allowed; }

                @media (max-width: 480px) {
                    .message-row { max-width: 85%; }
                    .chat-input { padding: 12px 16px; font-size: 16px; /* prevent zoom */ }
                }
            `}</style>
        </div>
    );
}

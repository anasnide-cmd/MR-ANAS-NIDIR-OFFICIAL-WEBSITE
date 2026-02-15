'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';

export default function AdminAgent() {
    const [apiKey, setApiKey] = useState(null);

    useEffect(() => {
        // Fetch API Key from system_config (Client Side - Authenticated)
        const fetchKey = async () => {
             try {
                const { doc, getDoc, getFirestore } = await import('firebase/firestore');
                // We need to import db app instance or use getFirestore() if not exported globally here
                // Assumes db is available or we import it. 
                // Since this component is inside the app, better to import db from lib
                const { db } = await import('../../lib/firebase');
                
                const configRef = doc(db, 'system_config', 'nex_ai');
                const configSnap = await getDoc(configRef);
                if (configSnap.exists()) {
                    const config = configSnap.data();
                    if (config.keys && Array.isArray(config.keys)) {
                         const activeKeyObj = config.keys.find(k => k.status === 'active');
                         if (activeKeyObj) setApiKey(activeKeyObj.key);
                    } else if (config.openRouterKey) {
                        setApiKey(config.openRouterKey);
                    }
                }
            } catch (err) {
                console.warn("Oracle Key Fetch Warning:", err);
            }
        };
        fetchKey();
    }, []);

    const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
        api: '/api/admin/agent',
        body: { apiKey }, // Pass key dynamically
        initialMessages: [
            { id: 'init', role: 'system', content: 'SYSTEM_READY: ORACLE ONLINE.' },
            { id: 'welcome', role: 'assistant', content: 'Oracle engaged. Awaiting directive.' }
        ],
        onFinish: (message) => {
             // Optional: Save here if needed, but useEffect is broader
        }
    });
    
    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem('oracle_history');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.length > 0) setMessages(parsed);
            } catch (e) {
                console.error("Failed to load oracle history", e);
            }
        }
    }, [setMessages]);

    // Save to local storage
    useEffect(() => {
        if (messages.length > 2) { // Don't save just the initial system messages
             localStorage.setItem('oracle_history', JSON.stringify(messages));
        }
    }, [messages]);

    const clearHistory = () => {
        setMessages([
            { id: 'init', role: 'system', content: 'SYSTEM_READY: ORACLE ONLINE.' },
            { id: 'welcome', role: 'assistant', content: 'Oracle memory purged. Awaiting directive.' }
        ]);
        localStorage.removeItem('oracle_history');
    };
    
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <>
            {/* TOGGLE BUTTON */}
            <button 
                className={`oracle-toggle ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                title="Access Oracle AI"
            >
                <div className="eye-icon">
                    <div className="pupil"></div>
                </div>
            </button>

            {/* CHAT INTERFACE */}
            <div className={`oracle-interface ${isOpen ? 'open' : ''}`}>
                <div className="oracle-header">
                    <div className="header-status">
                        <span className="blink">●</span> ORACLE_V1.1
                    </div>
                    <div className="header-controls">
                        <button onClick={clearHistory} className="clear-btn" title="Purge Memory">PURGE</button>
                        <button onClick={() => setIsOpen(false)} className="close-btn">×</button>
                    </div>
                </div>

                <div className="oracle-log">
                    {messages.filter(m => m.role !== 'system').map(m => (
                        <div key={m.id} className={`log-entry ${m.role}`}>
                            <span className="log-prefix">{m.role === 'user' ? 'CMD >' : 'AI ::'}</span>
                            <span className="log-content">{m.content}</span>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="log-entry assistant">
                            <span className="log-prefix">AI ::</span>
                            <span className="log-content processing">PROCESSING_DATA_STREAM...</span>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="oracle-input-area">
                    <input 
                        value={input}
                        onChange={handleInputChange}
                        placeholder="ENTER QUERY..."
                        className="oracle-input"
                    />
                    <button type="submit" className="send-btn" disabled={isLoading}>
                        ➜
                    </button>
                </form>
            </div>

            <style jsx>{`
                .oracle-toggle {
                    position: fixed; bottom: 30px; right: 30px;
                    width: 60px; height: 60px;
                    border-radius: 50%;
                    background: #000;
                    border: 2px solid var(--cia-accent);
                    cursor: pointer;
                    z-index: 2000;
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 0 20px rgba(0, 243, 255, 0.2);
                    transition: all 0.3s;
                }
                .oracle-toggle:hover { transform: scale(1.1); box-shadow: 0 0 30px rgba(0, 243, 255, 0.4); }
                .oracle-toggle.active { border-color: var(--cia-warn); }

                .eye-icon {
                    width: 20px; height: 12px;
                    border: 2px solid var(--cia-accent);
                    border-radius: 50%;
                    position: relative;
                    display: flex; align-items: center; justify-content: center;
                }
                .pupil {
                    width: 6px; height: 6px; background: var(--cia-accent); border-radius: 50%;
                    animation: scan 3s infinite ease-in-out;
                }

                @keyframes scan {
                    0%, 100% { transform: translateX(-4px); }
                    50% { transform: translateX(4px); }
                }

                .oracle-interface {
                    position: fixed; bottom: 100px; right: 30px;
                    width: 350px; height: 500px;
                    background: rgba(0, 0, 0, 0.95);
                    border: 1px solid var(--cia-accent);
                    border-radius: 20px;
                    display: flex; flex-direction: column;
                    z-index: 2000;
                    transform: translateY(20px); opacity: 0; pointer-events: none;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    overflow: hidden;
                    box-shadow: 0 0 50px rgba(0, 0, 0, 0.8);
                }
                .oracle-interface.open { transform: translateY(0); opacity: 1; pointer-events: all; }

                .oracle-header {
                    padding: 15px; border-bottom: 1px solid rgba(255,255,255,0.1);
                    display: flex; justify-content: space-between; align-items: center;
                    background: rgba(0, 243, 255, 0.05);
                }
                .header-status { font-family: 'Share Tech Mono', monospace; color: var(--cia-accent); font-size: 0.8rem; display: flex; gap: 5px; align-items: center; }
                .header-controls { display: flex; gap: 10px; align-items: center; }
                .clear-btn { background: none; border: 1px solid var(--cia-warn); color: var(--cia-warn); font-size: 0.6rem; padding: 2px 6px; cursor: pointer; border-radius: 4px; }
                .clear-btn:hover { background: var(--cia-warn); color: #000; }
                .close-btn { background: none; border: none; color: #fff; cursor: pointer; font-size: 1.2rem; opacity: 0.5; }
                .close-btn:hover { opacity: 1; }

                .oracle-log {
                    flex: 1; overflow-y: auto; padding: 15px;
                    font-family: 'Share Tech Mono', monospace; font-size: 0.85rem;
                    display: flex; flex-direction: column; gap: 15px;
                }
                
                .log-entry { display: flex; flex-direction: column; gap: 2px; }
                .log-entry.user { align-items: flex-end; text-align: right; }
                .log-entry.assistant { align-items: flex-start; text-align: left; }
                
                .log-prefix { font-size: 0.6rem; opacity: 0.5; color: var(--cia-accent); margin-bottom: 2px; }
                .log-content { 
                    background: rgba(255,255,255,0.05); padding: 8px 12px; border-radius: 8px; 
                    line-height: 1.4; color: #eee; max-width: 90%;
                }
                .user .log-content { background: rgba(0, 243, 255, 0.1); color: var(--cia-accent); }
                .assistant .log-content { border-left: 2px solid var(--cia-accent); }

                .processing { animation: flicker 1s infinite; color: var(--cia-accent); }

                .oracle-input-area {
                    padding: 15px; border-top: 1px solid rgba(255,255,255,0.1);
                    display: flex; gap: 10px;
                }
                .oracle-input {
                    flex: 1; background: transparent; border: none; color: #fff;
                    font-family: 'Share Tech Mono', monospace; font-size: 0.9rem;
                    outline: none;
                }
                .send-btn {
                    background: var(--cia-accent); color: #000; border: none;
                    width: 30px; height: 30px; border-radius: 4px; cursor: pointer;
                    display: flex; align-items: center; justify-content: center;
                    font-weight: bold;
                }
                .send-btn:disabled { opacity: 0.5; }
            `}</style>
        </>
    );
}

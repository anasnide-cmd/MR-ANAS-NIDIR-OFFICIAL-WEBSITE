'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

// Fallback models
const DEFAULT_MODELS = [
    { id: 'openai/gpt-4o', name: 'GPT-4o', description: 'Great for most tasks' },
    { id: 'anthropic/claude-3-opus', name: 'Claude 3 Opus', description: 'Strong reasoning' }
];

export default function NexAI() {
    // --- STATE ---
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [modelList, setModelList] = useState(DEFAULT_MODELS);
    const [selectedModel, setSelectedModel] = useState(DEFAULT_MODELS[0].id);
    const [loading, setLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile toggle
    const [showModelDropdown, setShowModelDropdown] = useState(false);
    
    // Refs
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);

    // --- EFFECTS ---

    // 1. Fetch Models
    useEffect(() => {
        const fetchModels = async () => {
            try {
                const res = await fetch('/api/nex-ai/models');
                if (res.ok) {
                    const data = await res.json();
                    if (data.models && data.models.length > 0) {
                        setModelList(data.models);
                        if (!data.models.find(m => m.id === selectedModel)) {
                            setSelectedModel(data.models[0].id);
                        }
                    }
                }
            } catch (err) {
                console.error("Failed to load models:", err);
            }
        };
        fetchModels();
    }, []);

    // 2. Auto-scroll
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(scrollToBottom, [messages, loading]);

    // 3. Auto-resize input
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; 
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
        }
    }, [input]);


    // --- HANDLERS ---

    const handleSend = async (e) => {
        e?.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);
        if (textareaRef.current) textareaRef.current.style.height = 'auto';

        try {
            // Placeholder for streaming/response
            const aiMsgId = Date.now();
            setMessages(prev => [...prev, { role: 'assistant', content: '', id: aiMsgId, pending: true }]);

            const res = await fetch('/api/nex-ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMsg].filter(m => m.role !== 'system'),
                    model: selectedModel
                })
            });

            if (!res.ok) throw new Error(await res.text());

            const data = await res.json();
            
            // Replace pending message
            setMessages(prev => prev.map(m => 
                m.id === aiMsgId ? { role: 'assistant', content: data.content } : m
            ));

        } catch (err) {
            setMessages(prev => [...prev, { role: 'error', content: `Error: ${err.message}` }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // --- RENDER HELPERS ---
    const currentModelName = modelList.find(m => m.id === selectedModel)?.name || 'Select Model';

    return (
        <div className="layout">
             <style jsx global>{` body { padding-top: 0 !important; overflow: hidden; background: #212121; } `}</style>

            {/* --- SIDEBAR --- */}
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-top">
                    <button className="new-chat-btn" onClick={() => setMessages([])}>
                        <span className="plus">+</span> New Chat
                    </button>
                    <button className="close-sidebar-mobile" onClick={() => setIsSidebarOpen(false)}>✕</button>
                </div>

                <div className="sidebar-content">
                    <div className="history-group">
                        <h3>Today</h3>
                        <div className="history-item">Model configuration...</div>
                        <div className="history-item">React useEffect help...</div>
                    </div>
                </div>

                <div className="sidebar-footer">
                   <Link href="/" className="user-row">
                        <div className="avatar">U</div>
                        <div className="user-info">
                            <span className="name">User</span>
                            <span className="plan">Admin</span>
                        </div>
                   </Link>
                </div>
            </aside>

            {/* --- MAIN AREA --- */}
            <main className="main">
                {/* Header / Model Selector */}
                <header className="top-bar">
                    <button className="mobile-menu-btn" onClick={() => setIsSidebarOpen(true)}>☰</button>
                    
                    <div className="model-selector" onClick={() => setShowModelDropdown(!showModelDropdown)}>
                        <span className="selected-model">{currentModelName}</span>
                        <span className="arrow">▼</span>
                        
                        {showModelDropdown && (
                            <div className="model-dropdown">
                                {modelList.map(m => (
                                    <div 
                                        key={m.id} 
                                        className={`model-option ${selectedModel === m.id ? 'active' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedModel(m.id);
                                            setShowModelDropdown(false);
                                        }}
                                    >
                                        <div className="opt-name">{m.name}</div>
                                        <div className="opt-desc">{m.description}</div>
                                        {selectedModel === m.id && <span className="check">✓</span>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="spacer"></div>
                </header>

                {/* Chat Area */}
                <div className="chat-container">
                    {messages.length === 0 ? (
                        <div className="empty-state">
                            <div className="logo-icon">NEX</div>
                            <h2>How can I help you today?</h2>
                        </div>
                    ) : (
                        <div className="messages-list">
                            {messages.map((m, i) => (
                                <div key={i} className={`message-row ${m.role}`}>
                                    <div className="message-content">
                                        {m.role === 'user' ? (
                                             <div className="user-bubble">{m.content}</div>
                                        ) : (
                                            <div className="ai-text">
                                                {m.role === 'error' ? <span style={{color:'red'}}>{m.content}</span> : m.content}
                                                {m.pending && <span className="cursor">|</span>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} style={{height:'1px'}} />
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="input-container">
                    <div className="input-box-wrapper">
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Message NEX AI..."
                            rows={1}
                        />
                        <button 
                            className={`send-btn ${input.trim() ? 'active' : ''}`} 
                            onClick={handleSend}
                            disabled={!input.trim() || loading}
                        >
                            ↑
                        </button>
                    </div>
                    <div className="disclaimer">
                        NEX AI can make mistakes. Consider checking important information.
                    </div>
                </div>
            </main>

            {/* --- STYLES --- */}
            <style jsx>{`
                /* Layout */
                .layout { display: flex; height: 100vh; background: #212121; color: #ECECEC; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
                
                /* Sidebar */
                .sidebar {
                    width: 260px; background: #171717; display: flex; flex-direction: column; padding: 10px;
                    transition: transform 0.3s ease; z-index: 50;
                }
                .new-chat-btn {
                    display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 15px;
                    background: transparent; border: 1px solid transparent; border-radius: 8px;
                    color: #ECECEC; cursor: pointer; text-align: left; font-size: 0.9rem;
                    transition: 0.2s;
                }
                .new-chat-btn:hover { background: #212121; }
                .plus { font-size: 1.2rem; font-weight: 300; }
                
                .sidebar-content { flex: 1; overflow-y: auto; padding-top: 20px; }
                .history-group h3 { color: #666; font-size: 0.75rem; padding: 0 10px 8px; margin: 0; }
                .history-item { 
                    padding: 8px 10px; font-size: 0.9rem; color: #ECECEC; 
                    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                    border-radius: 8px; cursor: pointer;
                }
                .history-item:hover { background: #212121; }

                .sidebar-footer { padding-top: 10px; border-top: 1px solid #333; }
                .user-row { 
                    display: flex; align-items: center; gap: 10px; padding: 10px; 
                    text-decoration: none; color: #ECECEC; border-radius: 8px; 
                }
                .user-row:hover { background: #212121; }
                .avatar { width: 32px; height: 32px; background: #fff; color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; }
                .user-info { display: flex; flex-direction: column; }
                .name { font-size: 0.9rem; font-weight: 500; }
                .plan { font-size: 0.75rem; color: #999; }

                /* Main */
                .main { flex: 1; display: flex; flex-direction: column; position: relative; background: #212121; }
                
                /* Header */
                .top-bar { 
                    height: 60px; display: flex; align-items: center; justify-content: space-between; 
                    padding: 0 20px; position: sticky; top: 0; z-index: 10;
                }
                .mobile-menu-btn { display: none; background: none; border: none; color: #ECECEC; font-size: 1.5rem; cursor: pointer; }
                .close-sidebar-mobile { display: none; background: none; border: none; color: #ECECEC; font-size: 1.2rem; cursor: pointer; margin-left: auto; }

                .model-selector { 
                    position: relative; display: flex; align-items: center; gap: 6px; 
                    padding: 8px 12px; border-radius: 12px; cursor: pointer; 
                    font-weight: 600; font-size: 1.1rem; color: #ECECEC;
                }
                .model-selector:hover { background: #2F2F2F; }
                .arrow { font-size: 0.7rem; opacity: 0.6; }

                .model-dropdown {
                    position: absolute; top: 100%; left: 0; width: 300px;
                    background: #2F2F2F; border: 1px solid #444; border-radius: 12px;
                    padding: 6px; box-shadow: 0 10px 20px rgba(0,0,0,0.3);
                    display: flex; flex-direction: column; gap: 2px;
                }
                .model-option {
                    padding: 10px; border-radius: 8px; cursor: pointer; position: relative;
                }
                .model-option:hover { background: #424242; }
                .model-option.active { background: #424242; }
                .opt-name { font-size: 0.95rem; font-weight: 500; }
                .opt-desc { font-size: 0.8rem; color: #aaa; margin-top: 2px; }
                .check { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); color: #fff; }

                /* Chat */
                .chat-container { 
                    flex: 1; 
                    overflow-y: auto; 
                    display: flex; 
                    flex-direction: column; 
                    align-items: center;
                    width: 100%;
                }
                
                .empty-state {
                    display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;
                    gap: 20px; color: #fff; text-align: center; padding: 20px;
                }
                .logo-icon { 
                    width: 60px; height: 60px; background: #fff; color: #000; border-radius: 50%; 
                    display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1rem;
                }

                .messages-list { 
                    width: 100%; 
                    max-width: 800px; 
                    padding: 20px; 
                    display: flex; 
                    flex-direction: column; 
                    gap: 20px;
                    overflow-x: hidden; /* Prevent horizontal scroll */
                }
                .message-row { display: flex; width: 100%; }
                .message-row.user { justify-content: flex-end; }
                .message-row.assistant { justify-content: flex-start; }
                
                .message-content { 
                    max-width: 85%; 
                    overflow-wrap: anywhere; /* Critical for long words */
                    word-break: break-word;
                }
                
                .user-bubble { background: #2F2F2F; padding: 10px 16px; border-radius: 20px; line-height: 1.5; color: #ECECEC; }
                .ai-text { padding: 10px 0; line-height: 1.6; color: #ECECEC; white-space: pre-wrap; }
                .cursor { animation: blink 1s step-end infinite; }
                @keyframes blink { 50% { opacity: 0; } }

                /* Input */
                .input-container {
                    width: 100%; display: flex; flex-direction: column; align-items: center;
                    padding: 20px; background: #212121;
                    padding-bottom: max(20px, env(safe-area-inset-bottom)); /* Safe area */
                }
                .input-box-wrapper {
                    width: 100%; max-width: 800px; background: #2F2F2F; border-radius: 26px;
                    padding: 10px 16px; display: flex; align-items: flex-end; gap: 10px;
                    border: 1px solid transparent;
                }
                .input-box-wrapper:focus-within { border-color: #555; }

                textarea {
                    flex: 1; background: transparent; border: none; color: #fff; 
                    font-size: 1rem; resize: none; max-height: 200px; padding: 10px 0;
                    font-family: inherit; line-height: 1.5;
                }
                textarea:focus { outline: none; }
                
                .send-btn {
                    width: 32px; height: 32px; border-radius: 50%; border: none;
                    background: #676767; color: #2F2F2F; font-weight: bold; font-size: 1.2rem;
                    display: flex; align-items: center; justify-content: center; cursor: not-allowed;
                    transition: 0.2s; margin-bottom: 4px; flex-shrink: 0; /* Prevent squishing */
                }
                .send-btn.active { background: #fff; color: #000; cursor: pointer; }
                
                .disclaimer { font-size: 0.75rem; color: #888; margin-top: 10px; text-align: center; max-width: 90%; }

                /* Mobile */
                @media (max-width: 768px) {
                    .layout { overflow: hidden; /* Prevent body scroll */ }
                    .sidebar {
                        position: fixed; top:0; left:0; height: 100%; width: 80%; max-width: 300px;
                        transform: translateX(-100%);
                        box-shadow: none;
                    }
                    .sidebar.open { 
                        transform: translateX(0); 
                        box-shadow: 10px 0 50px rgba(0,0,0,0.5); 
                    }
                    
                    /* Overlay when sidebar open */
                    .sidebar.open::before {
                        content: ''; position: fixed; top: 0; left: 100%; width: 100vw; height: 100%;
                        background: rgba(0,0,0,0.5); z-index: -1;
                    }

                    .mobile-menu-btn { display: block; padding: 10px; margin-left: -10px; }
                    .close-sidebar-mobile { display: block; }
                    
                    .messages-list { padding: 15px; width: 100%; }
                    .bubble { max-width: 90%; }
                    
                    .input-container { padding: 10px; padding-bottom: max(15px, env(safe-area-inset-bottom)); }
                    .input-box-wrapper { border-radius: 20px; padding: 8px 12px; }
                    
                    /* Better typography for mobile */
                    h2 { font-size: 1.2rem; }
                }

            `}</style>
        </div>
    );
}

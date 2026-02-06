'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

// Fallback models in case API fails
const DEFAULT_MODELS = [
    { id: 'openai/gpt-4o', name: 'GPT-4o (Default)', description: 'Most capable model (OpenAI)' },
    { id: 'anthropic/claude-3-opus', name: 'Claude 3 Opus (Default)', description: 'Intelligent & nuanced (Anthropic)' }
];

export default function NexAI() {
    const [messages, setMessages] = useState([
        { role: 'system', content: 'Welcome to NEX AI. Choose your model and begin.' }
    ]);
    const [input, setInput] = useState('');
    const [modelList, setModelList] = useState(DEFAULT_MODELS);
    const [selectedModel, setSelectedModel] = useState(DEFAULT_MODELS[0].id);
    const [loading, setLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile Toggle
    const messagesEndRef = useRef(null);

    // Fetch Models on Mount
    useEffect(() => {
        const fetchModels = async () => {
            try {
                const res = await fetch('/api/nex-ai/models');
                if (res.ok) {
                    const data = await res.json();
                    if (data.models && data.models.length > 0) {
                        setModelList(data.models);
                        // Optional: Reset selection if current not in new list
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

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            // Optimistic UI update
            const aiMsgId = Date.now();
            setMessages(prev => [...prev, { role: 'assistant', content: 'Processing...', id: aiMsgId, pending: true }]);

            const res = await fetch('/api/nex-ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMsg].filter(m => m.role !== 'system'), // Basic history
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

    return (
        <div className="nex-container">
            <style jsx global>{` body { padding-top: 0 !important; overflow: hidden; } `}</style>
            
            <div className="holo-bg"></div>
            
            <button className="mobile-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                {isSidebarOpen ? '✖' : '☰ Models'}
            </button>

            <div className={`chat-layout ${isSidebarOpen ? 'models-open' : ''}`}>
                <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                    <div className="logo">
                        <span className="nex">NEX</span>
                        <span className="ai">AI</span>
                    </div>
                    
                    <div className="model-list">
                        <h3>Neural Engine</h3>
                        {modelList.map(m => (
                            <button 
                                key={m.id} 
                                className={`model-btn ${selectedModel === m.id ? 'active' : ''}`}
                                onClick={() => {
                                    setSelectedModel(m.id);
                                    setIsSidebarOpen(false); // Close on mobile selection
                                }}
                            >
                                <span className="model-name">{m.name}</span>
                                <span className="model-desc">{m.description}</span>
                            </button>
                        ))}
                    </div>
                </aside>

                <main className="chat-main" onClick={() => isSidebarOpen && setIsSidebarOpen(false)}>
                    <div className="messages-area">
                        {messages.map((m, i) => (
                            <div key={i} className={`message ${m.role} ${m.pending ? 'pending' : ''}`}>
                                <div className="bubble">
                                    {m.role === 'system' && <span className="sys-icon">🌐</span>}
                                    {m.role === 'user' && <span className="user-icon">👤</span>}
                                    <div className="text">{m.content}</div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSend} className="input-area">
                        <div className="input-wrapper">
                            <input 
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder={`Querying ${modelList.find(m => m.id === selectedModel)?.name || 'AI'}...`}
                                className="chat-input"
                            />
                            <button type="submit" className="send-btn" disabled={loading || !input.trim()}>
                                {loading ? 'Thinking...' : 'TRANSMIT'}
                            </button>
                        </div>
                    </form>
                </main>
            </div>

            <style jsx>{`
                .nex-container {
                    height: 100vh;
                    width: 100vw;
                    background: #000;
                    color: #fff;
                    font-family: 'Inter', sans-serif;
                    position: relative;
                }

                .holo-bg {
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 100%;
                    background: 
                        radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.05) 0%, transparent 50%),
                        linear-gradient(rgba(0, 255, 128, 0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 255, 128, 0.02) 1px, transparent 1px);
                    background-size: 100% 100%, 40px 40px, 40px 40px;
                    pointer-events: none;
                    z-index: 0;
                }

                .chat-layout {
                    display: flex;
                    height: 100%;
                    position: relative;
                    z-index: 1;
                }

                /* Sidebar */
                .sidebar {
                    width: 280px;
                    background: rgba(10, 10, 10, 0.9);
                    border-right: 1px solid rgba(0, 240, 255, 0.1);
                    backdrop-filter: blur(20px);
                    display: flex;
                    flex-direction: column;
                    padding: 20px;
                    padding-top: 80px; /* Safe area */
                    transition: transform 0.3s ease;
                }
                .logo { 
                    font-size: 2rem; font-weight: 900; letter-spacing: -1px; margin-bottom: 30px; 
                    background: linear-gradient(to right, #fff, #00f0ff);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                }
                .logo .ai { color: #00f0ff; -webkit-text-fill-color: #00f0ff; }

                .model-list { flex: 1; overflow-y: auto; }
                .model-list h3 {
                    font-size: 0.8rem; text-transform: uppercase; color: #666; letter-spacing: 1px; margin-bottom: 15px;
                }
                .model-btn {
                    width: 100%;
                    text-align: left;
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    padding: 12px;
                    margin-bottom: 10px;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex; flex-direction: column; gap: 4px;
                }
                .model-btn:hover { background: rgba(255, 255, 255, 0.05); }
                .model-btn.active {
                    background: rgba(0, 240, 255, 0.1);
                    border-color: #00f0ff;
                }
                .model-name { color: #fff; font-weight: bold; font-size: 0.95rem; }
                .model-desc { color: #888; font-size: 0.75rem; }

                /* Main Chat */
                .chat-main {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    transition: filter 0.3s ease;
                }

                .messages-area {
                    flex: 1;
                    padding: 100px 10% 20px; /* Top padding for mobile nav */
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .message {
                    display: flex;
                }
                .message.system { justify-content: center; opacity: 0.6; font-size: 0.9rem; }
                .message.user { justify-content: flex-end; }
                .message.assistant { justify-content: flex-start; }
                .message.error { justify-content: center; color: #ff4444; }

                .bubble {
                    max-width: 70%;
                    padding: 15px 20px;
                    border-radius: 12px;
                    position: relative;
                    line-height: 1.5;
                }
                .user .bubble {
                    background: #00f0ff;
                    color: #000;
                    border-radius: 12px 12px 0 12px;
                }
                .assistant .bubble {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px 12px 12px 0;
                }
                .system .bubble {
                    background: transparent;
                    padding: 5px;
                    display: flex; align-items: center; gap: 8px;
                }
                
                .pending .bubble { opacity: 0.7; animation: pulse 2s infinite; }

                /* Input Area */
                .input-area {
                    padding: 20px 10%;
                    background: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(10px);
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                }
                .input-wrapper {
                    display: flex;
                    gap: 10px;
                    background: rgba(255, 255, 255, 0.05);
                    padding: 8px;
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .chat-input {
                    flex: 1;
                    background: transparent;
                    border: none;
                    color: #fff;
                    padding: 10px;
                    font-size: 1rem;
                }
                .chat-input:focus { outline: none; }
                
                .send-btn {
                    background: #00f0ff;
                    color: #000;
                    border: none;
                    font-weight: bold;
                    padding: 10px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .send-btn:disabled { background: #444; color: #888; cursor: not-allowed; }

                @keyframes pulse { 0% { opacity: 0.4; } 50% { opacity: 0.8; } 100% { opacity: 0.4; } }

                /* Mobile Controls */
                .mobile-toggle {
                    position: fixed; top: 20px; left: 20px;
                    z-index: 100;
                    background: rgba(0, 240, 255, 0.1);
                    color: #00f0ff;
                    border: 1px solid #00f0ff;
                    padding: 8px 15px; border-radius: 20px;
                    cursor: pointer;
                    font-weight: bold;
                    backdrop-filter: blur(5px);
                }

                @media (max-width: 768px) {
                    .sidebar {
                        position: absolute;
                        left: 0; top: 0; bottom: 0;
                        width: 80%;
                        transform: translateX(-100%);
                        z-index: 50;
                    }
                    .sidebar.open { transform: translateX(0); }
                    
                    .messages-area { padding: 80px 15px 15px; }
                    .bubble { max-width: 85%; }
                    .input-area { padding: 15px; }
                    
                    /* Dim chat when menu open */
                    .models-open .chat-main { filter: blur(4px) brightness(0.5); pointer-events: none; }
                }
                
                /* Desktop */
                @media (min-width: 769px) {
                    .mobile-toggle { display: none; }
                    .sidebar { padding-top: 20px; }
                    .messages-area { padding-top: 20px; }
                }
            `}</style>
        </div>
    );
}

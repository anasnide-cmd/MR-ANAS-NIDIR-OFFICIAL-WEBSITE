'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@ai-sdk/react';
import { Sparkles, Bot, Send, Brain, Search, Cpu } from 'lucide-react';
import SearchControlMenu from '../SearchEngine/SearchControlMenu';
import SearchSettingsModal from '../SearchEngine/SearchSettingsModal';
import AppLauncher from '../SearchEngine/AppLauncher';

export default function LandingClient() {
    const [query, setQuery] = useState('');
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [aiMode, setAiMode] = useState(false);
    const router = useRouter();
    const chatRef = useRef(null);

    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        api: '/api/chat',
        body: {
            context: 'Mr Search - Conversational Information Retrieval'
        }
    });

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/mr-search/results?q=${encodeURIComponent(query)}`);
        }
    };

    const toggleTheme = () => {
        window.dispatchEvent(new Event('mr-search-theme-toggle'));
    };

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className={`search-landing ${aiMode ? 'ai-active' : ''}`}>
            <div className="bg-grid"></div>
            
            <div className="top-controls">
                <button 
                    onClick={() => setAiMode(!aiMode)} 
                    className={`ai-toggle ${aiMode ? 'active' : ''}`}
                    title="Toggle Nexus AI Mode"
                >
                    <Brain className="w-5 h-5" />
                    <span>{aiMode ? 'AI ACTIVE' : 'SWITCH TO AI'}</span>
                </button>
                <AppLauncher />
                <SearchControlMenu 
                    onThemeToggle={toggleTheme} 
                    onOpenSettings={() => setSettingsOpen(true)}
                />
            </div>

            <SearchSettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />

            <main className="search-core">
                <AnimatePresence mode="wait">
                    {!aiMode ? (
                        <motion.div 
                            key="standard"
                            initial={{ opacity: 0, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="logo-section">
                                <h1 className="glitch-text" data-text="MR SEARCH">MR SEARCH</h1>
                                <span className="subtitle">THE SUPER ENGINE</span>
                            </div>

                            <form onSubmit={handleSearch} className="search-form">
                                <div className="input-wrapper glowing-border">
                                    <input 
                                        type="text" 
                                        placeholder="INITIALIZE SEARCH PROTOCOL..." 
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        className="search-input"
                                        autoFocus
                                    />
                                    <button type="submit" className="btn-search">
                                       <Search className="w-6 h-6" />
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="ai-chat"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="ai-chat-interface"
                        >
                            <div className="ai-header">
                                <Cpu className="w-8 h-8 text-purple-400 animate-pulse" />
                                <h2>NEXUS AI SEARCH</h2>
                            </div>

                            <div ref={chatRef} className="chat-history">
                                {messages.length === 0 && (
                                    <div className="empty-chat">
                                        <Sparkles className="w-12 h-12 text-purple-500/30 mb-4" />
                                        <p>The neural net is ready. Ask anything about the MR ANAS NIDIR ecosystem.</p>
                                    </div>
                                )}
                                {messages.map((m) => (
                                    <div key={m.id} className={`chat-bubble ${m.role === 'user' ? 'user' : 'bot'}`}>
                                        <div className="bubble-content">
                                            {m.role === 'assistant' && <Bot className="w-4 h-4 mr-2 inline-block opacity-50" />}
                                            {m.content}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="chat-bubble bot loading">
                                        <span className="dot"></span>
                                        <span className="dot"></span>
                                        <span className="dot"></span>
                                    </div>
                                )}
                            </div>

                            <form onSubmit={handleSubmit} className="ai-input-form">
                                <div className="ai-input-wrapper">
                                    <input 
                                        className="ai-input"
                                        value={input}
                                        placeholder="Enter search query or complex question..."
                                        onChange={handleInputChange}
                                    />
                                    <button type="submit" disabled={isLoading || !input?.trim()} className="btn-ai-send">
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="quick-actions">
                    <button onClick={() => setQuery('Portfolio')} className="chip">PORTFOLIO</button>
                    <button onClick={() => setQuery('Mr Build')} className="chip">MR BUILD</button>
                    <button onClick={() => setQuery('AI Technology')} className="chip">AI TECH</button>
                </div>
            </main>

            <style jsx>{`
                .search-landing {
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    background: radial-gradient(circle at center, #111 0%, #000 100%);
                    overflow: hidden;
                    transition: all 1s ease;
                }
                .search-landing.ai-active {
                    background: radial-gradient(circle at center, #0a001a 0%, #000 100%);
                }
                .top-controls {
                    position: absolute; top: 20px; right: 20px; z-index: 50;
                    display: flex; align-items: center; gap: 15px;
                }
                .ai-toggle {
                    background: rgba(168, 85, 247, 0.1);
                    border: 1px solid rgba(168, 85, 247, 0.3);
                    color: #a855f7;
                    padding: 8px 16px;
                    border-radius: 50px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .ai-toggle:hover { background: rgba(168, 85, 247, 0.2); transform: translateY(-2px); }
                .ai-toggle.active { background: #a855f7; color: #fff; box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }

                .bg-grid {
                    position: absolute; inset: 0;
                    background-image: 
                        linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px);
                    background-size: 50px 50px;
                    pointer-events: none;
                    mask-image: radial-gradient(circle at center, black 40%, transparent 80%);
                }

                .search-core {
                    z-index: 10;
                    text-align: center;
                    width: 100%;
                    max-width: 800px;
                    padding: 20px;
                }

                .logo-section { margin-bottom: 50px; }
                .glitch-text {
                    font-family: var(--font-orbitron);
                    font-size: 5rem;
                    font-weight: 900;
                    color: #fff;
                    letter-spacing: -2px;
                }
                .subtitle { letter-spacing: 5px; font-size: 1rem; font-weight: 700; opacity: 0.8; }

                .search-form { width: 100%; }
                .input-wrapper {
                    position: relative;
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(20px);
                    border-radius: 50px;
                    padding: 5px 20px;
                    display: flex;
                    align-items: center;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .search-input {
                    background: transparent;
                    border: none;
                    width: 100%;
                    padding: 15px;
                    font-size: 1.2rem;
                    color: #fff;
                    outline: none;
                }

                .btn-search { background: transparent; border: none; font-size: 1.5rem; cursor: pointer; color: #00f0ff; opacity: 0.7; }
                .btn-search:hover { opacity: 1; transform: scale(1.1); }

                .ai-chat-interface {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(168, 85, 247, 0.2);
                    border-radius: 30px;
                    padding: 30px;
                    height: 600px;
                    display: flex;
                    flex-direction: column;
                    backdrop-filter: blur(40px);
                    box-shadow: 0 40px 100px rgba(0,0,0,0.5);
                }

                .ai-header { display: flex; items-center justify-content: center; gap: 15px; margin-bottom: 25px; }
                .ai-header h2 { font-family: var(--font-orbitron); font-size: 1.2rem; color: #a855f7; letter-spacing: 2px; }

                .chat-history {
                    flex: 1;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    padding: 10px;
                    margin-bottom: 20px;
                    scrollbar-width: thin;
                    scrollbar-color: rgba(168, 85, 247, 0.3) transparent;
                }

                .empty-chat { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0.5; font-size: 0.9rem; }

                .chat-bubble { max-width: 80%; padding: 12px 18px; border-radius: 20px; font-size: 0.95rem; text-align: left; line-height: 1.5; }
                .chat-bubble.user { align-self: flex-end; background: #a855f7; color: #fff; border-bottom-right-radius: 4px; }
                .chat-bubble.bot { align-self: flex-start; background: rgba(255,255,255,0.05); color: #ddd; border-bottom-left-radius: 4px; border: 1px solid rgba(255,255,255,0.1); }

                .ai-input-form { width: 100%; }
                .ai-input-wrapper { background: rgba(0,0,0,0.3); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 20px; padding: 5px 15px; display: flex; align-items: center; }
                .ai-input { background: transparent; border: none; flex: 1; padding: 12px; color: #fff; font-size: 1rem; outline: none; }
                .btn-ai-send { background: #a855f7; border: none; border-radius: 12px; padding: 10px; color: #fff; cursor: pointer; transition: all 0.2s; }
                .btn-ai-send:hover { transform: scale(1.05); box-shadow: 0 0 15px rgba(168, 85, 247, 0.5); }

                .chat-bubble.loading { display: flex; gap: 4px; padding: 15px; }
                .dot { width: 6px; height: 6px; background: #a855f7; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both; }
                .dot:nth-child(1) { animation-delay: -0.32s; }
                .dot:nth-child(2) { animation-delay: -0.16s; }
                @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1.0); } }

                .quick-actions { margin-top: 30px; display: flex; gap: 15px; justify-content: center; }
                .chip {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: rgba(255, 255, 255, 0.6);
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .chip:hover { background: rgba(255, 255, 255, 0.1); border-color: rgba(255, 255, 255, 0.3); color: #fff; }

                @media (max-width: 768px) {
                    .glitch-text { font-size: 3rem; }
                    .ai-chat-interface { height: 500px; padding: 20px; }
                }
            `}</style>
        </div>
    );
}

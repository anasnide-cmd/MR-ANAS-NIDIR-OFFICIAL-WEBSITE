'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@ai-sdk/react';
import { Sparkles, Bot, Send, Brain, Search, Cpu } from 'lucide-react';
import SearchControlMenu from '../SearchEngine/SearchControlMenu';
import SearchSettingsModal from '../SearchEngine/SearchSettingsModal';
import AppLauncher from '../SearchEngine/AppLauncher';
import MagneticWrapper from '../Effects/MagneticWrapper';

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
                                    <MagneticWrapper strength={0.4}>
                                        <button type="submit" className="btn-search">
                                           <Search className="w-6 h-6" />
                                        </button>
                                    </MagneticWrapper>
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
                    background: #000;
                    overflow: hidden;
                    transition: background 1s ease;
                }
                .search-landing.ai-active {
                    background: radial-gradient(circle at center, #0a001a 0%, #000 100%);
                }
                
                .top-controls {
                    position: absolute; top: 30px; right: 30px; z-index: 50;
                    display: flex; align-items: center; gap: 20px;
                }
                .ai-toggle {
                    background: var(--glass-bg);
                    border: 1px solid var(--glass-border);
                    color: var(--text-dim);
                    padding: 10px 20px;
                    border-radius: 40px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 0.75rem;
                    font-weight: 900;
                    cursor: pointer;
                    transition: all 0.3s;
                    letter-spacing: 2px;
                }
                .ai-toggle:hover { border-color: #a855f7; color: #a855f7; transform: translateY(-2px); }
                .ai-toggle.active { background: #a855f7; color: #fff; border-color: #a855f7; box-shadow: 0 0 30px rgba(168, 85, 247, 0.4); }

                .bg-grid {
                    position: absolute; inset: 0;
                    background-image: 
                        linear-gradient(rgba(0, 240, 255, 0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 240, 255, 0.05) 1px, transparent 1px);
                    background-size: 100px 100px;
                    pointer-events: none;
                    mask-image: radial-gradient(circle at center, black 30%, transparent 70%);
                }

                .search-core {
                    z-index: 10;
                    text-align: center;
                    width: 100%;
                    max-width: 900px;
                    padding: 20px;
                }

                .logo-section { margin-bottom: 60px; }
                .glitch-text {
                    font-family: 'Orbitron', sans-serif;
                    font-size: clamp(3rem, 12vw, 6rem);
                    font-weight: 950;
                    color: #fff;
                    letter-spacing: -3px;
                    line-height: 1;
                    margin-bottom: 10px;
                }
                .subtitle { letter-spacing: 12px; font-size: 0.9rem; font-weight: 900; color: var(--text-dim); text-transform: uppercase; }

                .input-wrapper {
                    position: relative;
                    background: var(--glass-bg);
                    backdrop-filter: blur(var(--glass-blur));
                    border-radius: 100px;
                    padding: 8px 35px;
                    display: flex;
                    align-items: center;
                    border: 1px solid var(--glass-border);
                    transition: all 0.4s var(--ease-out-expo);
                    max-width: 700px;
                    margin: 0 auto;
                }
                .input-wrapper:focus-within {
                    border-color: var(--primary);
                    box-shadow: 0 0 40px rgba(0, 240, 255, 0.1);
                    transform: scale(1.02);
                }

                .search-input {
                    background: transparent;
                    border: none;
                    width: 100%;
                    padding: 20px;
                    font-size: 1.3rem;
                    color: #fff;
                    outline: none;
                    font-family: 'Inter', sans-serif;
                }

                .btn-search { background: transparent; border: none; font-size: 1.5rem; cursor: pointer; color: var(--primary); transition: all 0.3s; }
                .btn-search:hover { transform: scale(1.1) rotate(10deg); }

                .ai-chat-interface {
                    background: var(--glass-bg);
                    backdrop-filter: blur(40px);
                    border: 1px solid rgba(168, 85, 247, 0.3);
                    border-radius: 40px;
                    padding: 40px;
                    height: 650px;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 50px 100px rgba(0,0,0,0.6);
                }

                .ai-header { display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 40px; }
                .ai-header h2 { font-family: 'Orbitron', sans-serif; font-size: 1.4rem; color: #a855f7; letter-spacing: 4px; font-weight: 900; }

                .chat-history {
                    flex: 1;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    padding: 10px;
                    margin-bottom: 30px;
                }

                .chat-bubble { max-width: 85%; padding: 18px 24px; border-radius: 24px; font-size: 1rem; line-height: 1.6; }
                .chat-bubble.user { align-self: flex-end; background: #a855f7; color: #fff; border-bottom-right-radius: 4px; box-shadow: 0 10px 20px rgba(168, 85, 247, 0.2); }
                .chat-bubble.bot { align-self: flex-start; background: rgba(255,255,255,0.05); color: var(--text); border-bottom-left-radius: 4px; border: 1px solid var(--glass-border); }

                .ai-input-wrapper { background: rgba(0,0,0,0.4); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 24px; padding: 10px 20px; display: flex; align-items: center; }
                .ai-input { background: transparent; border: none; flex: 1; padding: 15px; color: #fff; font-size: 1.1rem; outline: none; }
                .btn-ai-send { background: #a855f7; border: none; border-radius: 15px; padding: 12px; color: #fff; cursor: pointer; transition: all 0.3s; }

                .quick-actions { margin-top: 50px; display: flex; gap: 20px; justify-content: center; }
                .chip {
                    background: var(--glass-bg);
                    border: 1px solid var(--glass-border);
                    color: var(--text-dim);
                    padding: 10px 24px;
                    border-radius: 40px;
                    font-size: 0.85rem;
                    cursor: pointer;
                    transition: all 0.3s;
                    font-weight: 900;
                    letter-spacing: 1px;
                }
                .chip:hover { border-color: var(--primary); color: var(--primary); transform: translateY(-3px); }

                @media (max-width: 768px) {
                    .glitch-text { font-size: 3.5rem; }
                    .ai-chat-interface { height: 550px; padding: 25px; }
                    .top-controls { top: 20px; right: 20px; }
                }
            `}</style>
        </div>
    );
}

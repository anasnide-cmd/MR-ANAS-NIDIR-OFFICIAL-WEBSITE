'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import { db, auth } from '@/lib/firebase';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { 
    collection, addDoc, query, where, orderBy, onSnapshot, 
    serverTimestamp, doc, updateDoc, deleteDoc 
} from 'firebase/firestore';

// Fallback models
const DEFAULT_MODELS = [
    { id: 'openai/gpt-4o', name: 'GPT-4o', description: 'Great for most tasks' },
    { id: 'anthropic/claude-3-opus', name: 'Claude 3 Opus', description: 'Strong reasoning' }
];

export default function NexAI() {
    // --- STATE ---
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [modelList, setModelList] = useState(DEFAULT_MODELS);
    const [selectedModel, setSelectedModel] = useState(DEFAULT_MODELS[0].id);
    const [loading, setLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showModelDropdown, setShowModelDropdown] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    
    // Voice State
    const [isListening, setIsListening] = useState(false);
    const [voiceEnabled, setVoiceEnabled] = useState(false); 
    const [isSpeaking, setIsSpeaking] = useState(false);

    // Chat History State
    const [chatHistory, setChatHistory] = useState([]);
    const [currentChatId, setCurrentChatId] = useState(null);

    // Refs
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);
    const recognitionRef = useRef(null);
    const canvasRef = useRef(null);

    // --- EFFECTS ---

    // 0. Auth & History Listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
            if (currentUser) {
                setShowLoginModal(false);
                // Subscribe to user's chat history
                // Note: Removed orderBy('updatedAt', 'desc') to avoid composite index requirement for now.
                // Sorting is done client-side.
                const q = query(
                    collection(db, 'user_chats'), 
                    where('userId', '==', currentUser.uid)
                );
                const unsubChats = onSnapshot(q, (snapshot) => {
                    const chats = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
                    // Client-side sort
                    chats.sort((a, b) => {
                        const tA = a.updatedAt?.toMillis ? a.updatedAt.toMillis() : (a.updatedAt || 0);
                        const tB = b.updatedAt?.toMillis ? b.updatedAt.toMillis() : (b.updatedAt || 0);
                        return tB - tA;
                    });
                    setChatHistory(chats);
                });
                return () => unsubChats();
            } else {
                setChatHistory([]);
                setMessages([]);
            }
        });
        return () => unsubscribe();
    }, []);

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

    // 3. Prism Highlight
    useEffect(() => {
        if (typeof window !== 'undefined') {
            Prism.highlightAll();
        }
    }, [messages]);

    // 4. Auto-resize input
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; 
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
        }
    }, [input]);

    // 5. Initialize Speech Recognition
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.lang = 'en-US';

                recognition.onstart = () => setIsListening(true);
                recognition.onend = () => setIsListening(false);
                recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    setInput(transcript);
                };
                recognitionRef.current = recognition;
            }
        }
    }, []);

    // 6. Particle Effect Background
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        const particles = [];
        const particleCount = 50; 

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5 + 0.1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }
            draw() {
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);


    // --- HANDLERS ---

    const handleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Please try again.");
        }
    };

    const handleLogout = async (e) => {
        e?.stopPropagation();
        try {
            await signOut(auth);
            startNewChat();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const startNewChat = () => {
        setCurrentChatId(null);
        setMessages([]);
        setIsSidebarOpen(false);
        cancelSpeech();
    };

    const loadChat = (chat) => {
        cancelSpeech();
        setCurrentChatId(chat.id);
        setMessages(chat.messages || []);
        setIsSidebarOpen(false);
    };

    const deleteChat = async (e, chatId) => {
        e.stopPropagation();
        if (!confirm('Delete this chat?')) return;
        try {
            await deleteDoc(doc(db, 'user_chats', chatId));
            if (currentChatId === chatId) {
                startNewChat();
            }
        } catch (err) {
            console.error("Failed to delete chat:", err);
        }
    };

    // Voice Handlers
    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            recognitionRef.current?.start();
        }
    };

    const toggleVoice = () => {
        setVoiceEnabled(!voiceEnabled);
        if (isSpeaking) cancelSpeech();
    };

    const speakText = (text) => {
        if (!voiceEnabled || typeof window === 'undefined') return;
        
        const cleanText = text
            .replace(/```[\s\S]*?```/g, 'Code block skipped.')
            .replace(/<think>[\s\S]*?<\/think>/g, '') 
            .replace(/[*#`_]/g, '');

        const utterance = new SpeechSynthesisUtterance(cleanText);
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.name.includes('Google US English')) || voices[0];
        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        
        window.speechSynthesis.speak(utterance);
    };

    const cancelSpeech = () => {
        if (typeof window !== 'undefined') {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    };

    const handleSend = async (e) => {
        e?.preventDefault();
        if (!input.trim() || loading) return;

        if (!user) {
            setShowLoginModal(true);
            return;
        }

        cancelSpeech(); 

        const userMsg = { role: 'user', content: input, timestamp: Date.now() };
        const newMessages = [...messages, userMsg];
        
        setMessages(newMessages);
        setInput('');
        setLoading(true);
        if (textareaRef.current) textareaRef.current.style.height = 'auto';

        // Firestore Update
        try {
            if (user) {
                if (!currentChatId) {
                    const docRef = await addDoc(collection(db, 'user_chats'), {
                        userId: user.uid,
                        title: input.slice(0, 30) + (input.length > 30 ? '...' : ''),
                        messages: newMessages,
                        createdAt: serverTimestamp(),
                        updatedAt: serverTimestamp(),
                        model: selectedModel
                    });
                    setCurrentChatId(docRef.id);
                } else {
                    await updateDoc(doc(db, 'user_chats', currentChatId), {
                        messages: newMessages,
                        updatedAt: serverTimestamp()
                    });
                }
            }
        } catch (err) {
            console.error("Failed to save chat:", err);
        }

        try {
            const aiMsgId = Date.now();
            setMessages(prev => [...prev, { role: 'assistant', content: '', id: aiMsgId, loading: true }]);

            const res = await fetch('/api/nex-ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: newMessages.filter(m => m.role !== 'system'),
                    model: selectedModel
                })
            });

            if (!res.ok) throw new Error(await res.text());

            const data = await res.json();
            
            setMessages(prev => {
                const updated = prev.map(m => 
                    m.id === aiMsgId ? { 
                        role: 'assistant', 
                        content: data.content, 
                        id: aiMsgId, 
                        loading: false,
                        typing: true 
                    } : m
                );
                return updated;
            });
            
            if (voiceEnabled) {
                speakText(data.content);
            }

            if (user && currentChatId) {
                 const finalMsg = { role: 'assistant', content: data.content, timestamp: Date.now() };
                 await updateDoc(doc(db, 'user_chats', currentChatId), {
                     messages: [...newMessages, finalMsg],
                     updatedAt: serverTimestamp()
                 });
            }

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
    
    const MarkdownRenderer = ({ content }) => {
        const thinkRegex = /<think>([\s\S]*?)<\/think>/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        const renderMarkdownChunk = (text, keyPrefix) => {
            const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
            const subParts = [];
            let subLastIndex = 0;
            let subMatch;

            while ((subMatch = codeBlockRegex.exec(text)) !== null) {
                if (subMatch.index > subLastIndex) {
                    subParts.push({ type: 'text', content: text.slice(subLastIndex, subMatch.index) });
                }
                subParts.push({ type: 'code', lang: subMatch[1] || 'text', content: subMatch[2] });
                subLastIndex = subMatch.index + subMatch[0].length;
            }
            if (subLastIndex < text.length) {
                subParts.push({ type: 'text', content: text.slice(subLastIndex) });
            }

            return subParts.map((part, i) => {
                if (part.type === 'code') {
                    return (
                        <div key={`${keyPrefix}-${i}`} className="code-block">
                            <div className="code-header">
                                <span>{part.lang}</span>
                            </div>
                            <pre className={`language-${part.lang}`}>
                                <code>{part.content}</code>
                            </pre>
                        </div>
                    );
                } else {
                    let t = part.content;
                    return <span key={`${keyPrefix}-${i}`} dangerouslySetInnerHTML={{ 
                        __html: t
                            .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
                            .replace(/\*(.*?)\*/g, '<i>$1</i>')
                            .replace(/`(.*?)`/g, '<code class="inline-code">$1</code>')
                            .replace(/\n/g, '<br/>')
                    }} />;
                }
            });
        };

        if (!content) return null;

        while ((match = thinkRegex.exec(content)) !== null) {
            if (match.index > lastIndex) {
                parts.push({ type: 'markdown', content: content.slice(lastIndex, match.index) });
            }
            parts.push({ type: 'think', content: match[1] });
            lastIndex = match.index + match[0].length;
        }
        if (lastIndex < content.length) {
            parts.push({ type: 'markdown', content: content.slice(lastIndex) });
        }

        return (
            <>
                {parts.map((part, i) => {
                    if (part.type === 'think') {
                        return (
                            <details key={i} className="think-block">
                                <summary>Thinking Process</summary>
                                <div className="think-content">
                                    {part.content}
                                </div>
                            </details>
                        );
                    } else {
                        return renderMarkdownChunk(part.content, i);
                    }
                })}
            </>
        );
    };

    const Typewriter = ({ text, onComplete }) => {
        const [display, setDisplay] = useState('');
        
        useEffect(() => {
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    setDisplay(text.slice(0, i + 1));
                    i++;
                } else {
                    clearInterval(timer);
                    onComplete?.();
                }
            }, 5); 
            return () => clearInterval(timer);
        }, [text]);

        return <MarkdownRenderer content={display} />;
    };

    const currentModelName = modelList.find(m => m.id === selectedModel)?.name || 'Select Model';

    return (
        <div className="layout">
             <style jsx global>{` body { padding-top: 0 !important; overflow: hidden; background: #0F0F0F; } `}</style>

            {/* Background Particles */}
            <canvas ref={canvasRef} className="background-canvas" />

            {/* --- SIDEBAR --- */}
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-top">
                    <button className="new-chat-btn" onClick={startNewChat}>
                        <span className="plus">+</span> New Chat
                    </button>
                    <button className="close-sidebar-mobile" onClick={() => setIsSidebarOpen(false)}>✕</button>
                </div>

                <div className="sidebar-content">
                    <div className="history-group">
                        <h3>Your Chats</h3>
                        {authLoading ? (
                            <div className="history-loading">Loading...</div>
                        ) : !user ? (
                            <div className="history-cta">
                                <p>Login to save your chat history</p>
                            </div>
                        ) : chatHistory.length === 0 ? (
                            <div className="history-empty">No chats yet</div>
                        ) : (
                            chatHistory.map(chat => (
                                <div 
                                    key={chat.id} 
                                    className={`history-item ${currentChatId === chat.id ? 'active' : ''}`}
                                    onClick={() => loadChat(chat)}
                                >
                                    <div className="history-title">{chat.title || 'New Chat'}</div>
                                    <button className="delete-chat" onClick={(e) => deleteChat(e, chat.id)}>×</button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="sidebar-footer">
                   <div 
                        className={`user-row ${!user ? 'clickable' : ''}`} 
                        onClick={!user ? handleLogin : undefined}
                   >
                        <div className="avatar">
                            {user && user.photoURL ? (
                                <img src={user.photoURL} alt="U" />
                            ) : (
                                'U'
                            )}
                        </div>
                        <div className="user-info">
                            <span className="name">{user ? (user.displayName || user.email.split('@')[0]) : 'Guest (Click to Login)'}</span>
                            {user && <button className="logout-btn" onClick={handleLogout}>Log out</button>}
                        </div>
                   </div>
                </div>
            </aside>

            {/* --- MAIN AREA --- */}
            <main className="main">
                {/* Header / Model Selector */}
                <header className="top-bar glass">
                    <button className="mobile-menu-btn" onClick={() => setIsSidebarOpen(true)}>☰</button>
                    
                    <div className="model-selector" onClick={() => setShowModelDropdown(!showModelDropdown)}>
                        <div className="chip">
                            <span className="selected-model">{currentModelName}</span>
                            <span className="arrow">▼</span>
                        </div>
                        
                        {showModelDropdown && (
                            <div className="model-dropdown glass">
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
                    
                    {/* Voice Controls Header */}
                    <div className="voice-controls">
                        <button 
                            className={`icon-btn ${voiceEnabled ? 'active' : ''}`}
                            onClick={toggleVoice}
                            title={voiceEnabled ? "Mute AI Voice" : "Enable AI Voice"}
                        >
                            {voiceEnabled ? '🔊' : '🔇'}
                        </button>
                    </div>

                </header>

                {/* Chat Area */}
                <div className="chat-container">
                    {messages.length === 0 ? (
                        <div className="empty-state">
                            <div className="logo-glow">
                                <div className="logo-icon">NEX</div>
                            </div>
                            <h2>How can I help you today?</h2>
                            {!user && (
                                <button className="login-hero-btn glass-btn" onClick={handleLogin}>Log in to start</button>
                            )}
                        </div>
                    ) : (
                        <div className="messages-list">
                            {messages.map((m, i) => (
                                <div key={i} className={`message-row ${m.role} animate-in`}>
                                    <div className={`message-content ${m.role === 'user' ? 'user-glass' : 'ai-glass'}`}>
                                        {m.role === 'assistant' && (
                                            <div className="ai-name">NEX AI</div>
                                        )}
                                        {m.loading ? (
                                            <div className="typing-dots">
                                                <span>.</span><span>.</span><span>.</span>
                                            </div>
                                        ) : m.typing ? (
                                            <Typewriter 
                                                text={m.content} 
                                                onComplete={() => {
                                                    setMessages(prev => prev.map(msg => 
                                                        msg.id === m.id ? { ...msg, typing: false } : msg
                                                    ));
                                                }} 
                                            />
                                        ) : (
                                            <div className="msg-text">
                                                <MarkdownRenderer content={m.content || ''} />
                                            </div>
                                        )}
                                        {m.role === 'error' && <div style={{color:'#ef4444', marginTop:'8px'}}>{m.content}</div>}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} style={{height:'1px'}} />
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="input-container">
                    <div className={`input-box-wrapper glass ${isListening ? 'listening' : ''}`}>
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={isListening ? "Listening..." : (user ? "Message NEX AI..." : "Login to chat...")}
                            rows={1}
                            disabled={!user}
                        />
                        
                        {/* Mic Button */}
                        <button 
                            className={`mic-btn ${isListening ? 'listening' : ''}`}
                            onClick={toggleListening}
                            title="Speak"
                            disabled={!user}
                        >
                            {isListening ? '🛑' : '🎤'}
                        </button>

                        <button 
                            className={`send-btn ${input.trim() ? 'active' : ''}`} 
                            onClick={handleSend}
                            disabled={!input.trim() || loading || !user}
                        >
                            ↑
                        </button>
                    </div>
                    <div className="disclaimer">
                        NEX AI can make mistakes. Consider checking important information.
                    </div>
                </div>
            </main>

            {/* Login Modal */}
            {showLoginModal && (
                <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
                    <div className="modal-content glass-modal" onClick={e => e.stopPropagation()}>
                        <h2>Login Required</h2>
                        <p>Please log in to chat with NEX AI and save your history.</p>
                        <button className="login-btn-modal" onClick={handleLogin}>
                            Continue with Google
                        </button>
                        <button className="close-modal" onClick={() => setShowLoginModal(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {/* --- STYLES --- */}
            <style jsx>{`
                /* Layout */
                .layout { display: flex; height: 100vh; background: radial-gradient(circle at center, #1a1a1a 0%, #000 100%); color: #ECECEC; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; position: relative; }
                
                .background-canvas {
                    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                    pointer-events: none; z-index: 0; opacity: 0.4;
                }

                /* Glassmorphism Utilities */
                .glass {
                    background: rgba(30, 30, 30, 0.6);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                }
                .glass-modal {
                    background: rgba(40, 40, 40, 0.85);
                    backdrop-filter: blur(16px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                }
                .user-glass {
                    background: rgba(60, 60, 60, 0.4);
                    backdrop-filter: blur(8px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .ai-glass {
                    background: transparent;
                }
                
                /* Sidebar */
                .sidebar {
                    width: 260px; 
                    background: rgba(15, 15, 15, 0.9);
                    backdrop-filter: blur(10px);
                    display: flex; flex-direction: column; padding: 10px;
                    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); 
                    z-index: 50;
                    border-right: 1px solid rgba(255,255,255,0.05);
                }
                .new-chat-btn {
                    display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 15px;
                    background: transparent; border: 1px solid rgba(255,255,255,0.05); border-radius: 8px;
                    color: #ECECEC; cursor: pointer; text-align: left; font-size: 0.9rem;
                    transition: 0.2s;
                }
                .new-chat-btn:hover { background: rgba(255,255,255,0.05); }
                .plus { font-size: 1.2rem; font-weight: 300; }
                
                .sidebar-content { flex: 1; overflow-y: auto; padding-top: 20px; }
                .history-group h3 { color: #888; font-size: 0.75rem; padding: 0 10px 8px; margin: 0; letter-spacing: 0.5px; }
                
                .history-item { 
                    padding: 8px 10px; font-size: 0.9rem; color: #BBB; 
                    border-radius: 8px; cursor: pointer; display: flex; justify-content: space-between; align-items: center;
                    margin-bottom: 2px; transition: 0.2s;
                }
                .history-item:hover, .history-item.active { background: rgba(255,255,255,0.08); color: #fff; }
                .history-title { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; }
                
                .delete-chat { 
                    background: none; border: none; color: #666; font-size: 1.1rem; cursor: pointer; padding: 0 4px;
                    opacity: 0; transition: 0.2s;
                }
                .history-item:hover .delete-chat { opacity: 1; }
                .delete-chat:hover { color: #ff4444; }

                .history-empty { padding: 0 15px; font-size: 0.85rem; color: #555; font-style: italic; }
                .history-cta { padding: 0 15px; font-size: 0.85rem; color: #888; text-align: center; margin-top: 20px; }

                .sidebar-footer { padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.05); }
                .user-row { 
                    display: flex; align-items: center; gap: 10px; padding: 10px; 
                    text-decoration: none; color: #ECECEC; border-radius: 8px; 
                    transition: 0.2s;
                }
                .user-row.clickable { cursor: pointer; }
                .user-row.clickable:hover { background: rgba(255,255,255,0.05); }
                
                .avatar { width: 32px; height: 32px; background: #fff; color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; overflow: hidden; }
                .avatar img { width: 100%; height: 100%; object-fit: cover; }
                .user-info { display: flex; flex-direction: column; flex: 1; overflow: hidden; }
                .name { font-size: 0.9rem; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .logout-btn { background: none; border: none; padding: 0; color: #888; font-size: 0.75rem; text-align: left; cursor: pointer; }
                .logout-btn:hover { color: #fff; text-decoration: underline; }

                /* Main */
                .main { flex: 1; display: flex; flex-direction: column; position: relative; z-index: 10; }
                
                /* Header */
                .top-bar { 
                    height: 60px; display: flex; align-items: center; justify-content: space-between; 
                    padding: 0 20px; position: sticky; top: 0; z-index: 10;
                    background: rgba(20, 20, 20, 0.5); 
                }
                .voice-controls { display: flex; align-items: center; gap: 10px;}
                .icon-btn { 
                    background: transparent; border: none; font-size: 1.2rem; cursor: pointer; 
                    opacity: 0.5; transition: 0.2s; color: #fff;
                }
                .icon-btn:hover, .icon-btn.active { opacity: 1; text-shadow: 0 0 10px rgba(0,240,255,0.5); transform: scale(1.1); }

                .mobile-menu-btn { display: none; background: none; border: none; color: #ECECEC; font-size: 1.5rem; cursor: pointer; }
                .close-sidebar-mobile { display: none; background: none; border: none; color: #ECECEC; font-size: 1.2rem; cursor: pointer; margin-left: auto; }

                .model-selector { 
                    position: relative; display: flex; align-items: center; cursor: pointer; 
                    font-weight: 500; font-size: 1rem; color: #ECECEC;
                }
                .chip {
                    display: flex; align-items: center; gap: 8px; 
                    padding: 6px 12px; border-radius: 20px; background: rgba(255,255,255,0.05);
                    transition: 0.2s;
                }
                .chip:hover { background: rgba(255,255,255,0.1); }
                .arrow { font-size: 0.7rem; opacity: 0.6; }

                .model-dropdown {
                    position: absolute; top: calc(100% + 5px); left: 0; width: 260px;
                    border-radius: 12px;
                    padding: 6px; box-shadow: 0 10px 40px rgba(0,0,0,0.5);
                    display: flex; flex-direction: column; gap: 2px;
                }
                .model-option {
                    padding: 10px; border-radius: 8px; cursor: pointer; position: relative;
                }
                .model-option:hover { background: rgba(255,255,255,0.05); }
                .model-option.active { background: rgba(255,255,255,0.1); }
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
                .logo-glow {
                    position: relative;
                }
                .logo-glow::before {
                    content: ''; position: absolute; inset: -10px; 
                    background: radial-gradient(circle, rgba(0,240,255,0.4) 0%, transparent 70%); 
                    filter: blur(20px); z-index: -1;
                }
                .logo-icon { 
                    width: 70px; height: 70px; background: #fff; color: #000; border-radius: 50%; 
                    display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.8rem;
                    box-shadow: 0 0 20px rgba(255,255,255,0.2);
                }
                .login-hero-btn {
                    padding: 12px 24px; color: #fff; font-weight: 600;
                    border: none; border-radius: 30px; cursor: pointer; transition: 0.3s;
                    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
                }
                .login-hero-btn:hover { background: rgba(255,255,255,0.2); transform: scale(1.05); box-shadow: 0 0 20px rgba(255,255,255,0.1); }

                .messages-list { 
                    width: 100%; 
                    max-width: 800px; 
                    padding: 20px; 
                    display: flex; 
                    flex-direction: column; 
                    gap: 30px;
                    overflow-x: hidden; 
                    padding-bottom: 40px;
                }
                
                .message-row { display: flex; width: 100%; }
                .message-row.user { justify-content: flex-end; }
                .message-row.assistant { justify-content: flex-start; }
                
                .animate-in { animation: slideUpFade 0.4s ease-out forwards; opacity: 0; transform: translateY(10px); }
                @keyframes slideUpFade { 100% { opacity: 1; transform: translateY(0); } }
                
                .message-content { 
                    max-width: 85%; position: relative;
                }
                
                .user-glass { 
                    padding: 12px 18px; border-radius: 20px; border-bottom-right-radius: 4px;
                    line-height: 1.6; color: #ECECEC; font-size: 1rem;
                }
                
                .ai-glass {
                    width: 100%;
                }
                .ai-name { font-size: 0.8rem; font-weight: 700; margin-bottom: 8px; color: #aaa; letter-spacing: 1px; text-transform: uppercase; }
                
                .msg-text { line-height: 1.7; }

                .code-block {
                    margin: 20px 0;
                    border-radius: 12px;
                    overflow: hidden;
                    background: #1e1e1e;
                    border: 1px solid #333;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                }
                .code-header {
                    background: #252525;
                    padding: 8px 16px;
                    font-size: 0.75rem;
                    color: #888;
                    text-transform: uppercase;
                    border-bottom: 1px solid #333;
                    display: flex; justify-content: space-between;
                }
                pre { margin: 0; padding: 16px; overflow-x: auto; background: #151515 !important; }
                code { font-family: 'Fira Code', 'Consolas', monospace; font-size: 0.9rem; }
                .inline-code { background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; color: #e0e0e0; font-size: 0.85em; }

                /* Think Block */
                .think-block {
                    margin: 16px 0;
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 10px;
                    background: rgba(0,0,0,0.2);
                    overflow: hidden;
                }
                .think-block summary {
                    padding: 10px 14px;
                    cursor: pointer;
                    font-size: 0.85rem;
                    color: #888;
                    background: rgba(255,255,255,0.03);
                    user-select: none;
                    transition: 0.2s;
                }
                .think-block summary:hover { background: rgba(255,255,255,0.06); color: #ccc; }
                .think-content {
                    padding: 14px;
                    font-size: 0.9rem;
                    color: #999;
                    border-top: 1px solid rgba(255,255,255,0.05);
                    background: rgba(0,0,0,0.3);
                    font-style: italic;
                    white-space: pre-wrap;
                }

                /* Typing Dots */
                .typing-dots span {
                    display: inline-block; width: 6px; height: 6px; background: #888; border-radius: 50%; margin: 0 3px;
                    animation: pulse 1s infinite;
                }
                .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
                .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
                @keyframes pulse { 0%, 100% { opacity: 0.4; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } }

                /* Input */
                .input-container {
                    width: 100%; display: flex; flex-direction: column; align-items: center;
                    padding: 20px; 
                    padding-bottom: max(20px, env(safe-area-inset-bottom)); 
                }
                .input-box-wrapper {
                    width: 100%; max-width: 800px; border-radius: 26px;
                    padding: 14px 20px; display: flex; align-items: flex-end; gap: 14px;
                    transition: all 0.3s;
                }
                .input-box-wrapper:focus-within { 
                    background: rgba(40, 40, 40, 0.8);
                    border-color: rgba(255,255,255,0.2);
                    box-shadow: 0 0 30px rgba(0,0,0,0.3);
                }
                .input-box-wrapper.listening { 
                    border-color: rgba(0, 240, 255, 0.6); 
                    box-shadow: 0 0 25px rgba(0, 240, 255, 0.15); 
                }

                textarea {
                    flex: 1; background: transparent; border: none; color: #fff; 
                    font-size: 1rem; resize: none; max-height: 200px; padding: 6px 0;
                    font-family: inherit; line-height: 1.5;
                }
                textarea:focus { outline: none; }
                
                .mic-btn {
                    background: transparent; border: none; font-size: 1.3rem; cursor: pointer; padding: 6px;
                    opacity: 0.6; transition: 0.3s;
                }
                .mic-btn:hover { opacity: 1; transform: scale(1.1); color: #fff; }
                .mic-btn.listening { opacity: 1; animation: pulse-mic 1.5s infinite; color: #00f0ff; text-shadow: 0 0 10px #00f0ff; }
                
                @keyframes pulse-mic {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }

                .send-btn {
                    width: 38px; height: 38px; border-radius: 50%; border: none;
                    background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.3); font-weight: bold; font-size: 1.3rem;
                    display: flex; align-items: center; justify-content: center; cursor: not-allowed;
                    transition: 0.3s; margin-bottom: 2px; flex-shrink: 0;
                }
                .send-btn.active { 
                    background: #fff; color: #000; cursor: pointer; 
                    box-shadow: 0 0 15px rgba(255,255,255,0.3);
                }
                .send-btn.active:hover { transform: scale(1.05); }
                
                .disclaimer { font-size: 0.75rem; color: #666; margin-top: 12px; text-align: center; max-width: 90%; opacity: 0.7; }
                
                /* Modal */
                .modal-overlay {
                    position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 100;
                    display: flex; align-items: center; justify-content: center;
                }
                .modal-content {
                    padding: 40px; border-radius: 20px; width: 90%; max-width: 400px;
                    text-align: center; 
                }
                .modal-content h2 { margin-top: 0; font-weight: 300; letter-spacing: 1px; }
                .login-btn-modal {
                    width: 100%; padding: 14px; margin-top: 25px; background: #fff; color: #000;
                    border: none; border-radius: 12px; font-weight: bold; cursor: pointer; font-size: 1rem;
                    transition: 0.3s;
                }
                .login-btn-modal:hover { transform: translateY(-2px); box-shadow: 0 5px 20px rgba(255,255,255,0.2); }
                .close-modal {
                    margin-top: 20px; background: none; border: none; color: #888; cursor: pointer; font-size: 0.9rem;
                    text-decoration: underline;
                }
                .close-modal:hover { color: #fff; }

                /* Mobile */
                @media (max-width: 768px) {
                    .layout { overflow: hidden; }
                    .sidebar {
                        position: fixed; top:0; left:0; height: 100%; width: 85%; max-width: 320px;
                        transform: translateX(-100%);
                        box-shadow: none;
                    }
                    .sidebar.open { 
                        transform: translateX(0); 
                        box-shadow: 10px 0 50px rgba(0,0,0,0.5); 
                    }
                    
                    /* Overlay */
                    .sidebar.open::before {
                        content: ''; position: fixed; top: 0; left: 100%; width: 100vw; height: 100%;
                        background: rgba(0,0,0,0.6); z-index: -1; backdrop-filter: blur(4px);
                    }

                    .mobile-menu-btn { display: block; padding: 10px; margin-left: -10px; }
                    .close-sidebar-mobile { display: block; }
                    
                    .messages-list { padding: 15px; width: 100%; gap: 20px; }
                    .user-glass { border-radius: 16px; border-bottom-right-radius: 2px; }
                    
                    .input-container { padding: 10px; padding-bottom: max(15px, env(safe-area-inset-bottom)); }
                    .input-box-wrapper { border-radius: 24px; padding: 10px 16px; }
                    
                    h2 { font-size: 1.3rem; }
                }

            `}</style>
        </div>
    );
}

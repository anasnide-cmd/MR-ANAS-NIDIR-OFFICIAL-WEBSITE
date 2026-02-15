'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Mic, Volume2, VolumeX, Globe, Cpu, Paperclip } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { doc, collection, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export default function ArchitectModal({ onClose, user }) {
    const router = useRouter();
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "I am the Architect. Describe your vision, and I will construct the digital infrastructure."
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [systemStatus, setSystemStatus] = useState('checking'); // checking, online, offline
    const [cachedKey, setCachedKey] = useState(null);
    const [showManualInput, setShowManualInput] = useState(false);
    const [manualKey, setManualKey] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Check System Status & Fetch Key on Mount
    useEffect(() => {
        const checkSystem = async () => {
            console.log("Starting System Check...");
            try {
                if (!user) {
                    console.log("User not ready yet.");
                    return;
                }

                const configRef = doc(db, 'system_config', 'nex_ai');
                console.log("Fetching config from:", configRef.path);
                
                const configSnap = await getDoc(configRef);
                
                if (configSnap.exists()) {
                    const config = configSnap.data();
                    console.log("Config Found:", config);
                    
                    let foundKey = null;
                    if (config.keys && Array.isArray(config.keys)) {
                         const activeKeyObj = config.keys.find(k => k.status === 'active');
                         if (activeKeyObj) foundKey = activeKeyObj.key;
                    } else if (config.openRouterKey) {
                        foundKey = config.openRouterKey;
                    }

                    if (foundKey) {
                        setCachedKey(foundKey);
                        setSystemStatus('online');
                        console.log("Key Found & Cached.");
                    } else {
                        setSystemStatus('offline');
                        setMessages(prev => [...prev, {role: 'error', content: `DIAGNOSTIC: Config found, but NO ACTIVE KEY. Keys found: ${config.keys?.length || 0}`}]);
                    }
                } else {
                    setSystemStatus('offline');
                     setMessages(prev => [...prev, {role: 'error', content: "DIAGNOSTIC: 'system_config/nex_ai' does not exist."}]);
                }
            } catch (err) {
                console.error("System Check Failed:", err);
                
                // If it's a permission error, automatically show manual input
                setSystemStatus('offline');
                setShowManualInput(true);
                setMessages(prev => [...prev, {role: 'error', content: `SYSTEM ALERT: Database check blocked (${err.code}). Switched to Manual Mode.`}]);
            }
        };
        
        if (user) checkSystem();
    }, [user?.uid]);

    const [attachments, setAttachments] = useState([]);
    const fileInputRef = useRef(null);

    // File Handlers
    const handleFileSelect = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const newAttachments = await Promise.all(files.map(async (file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve({
                        name: file.name,
                        type: file.type,
                        content: reader.result // Base64
                    });
                };
                reader.readAsDataURL(file);
            });
        }));

        setAttachments(prev => [...prev, ...newAttachments]);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const removeAttachment = (index) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    };

    const handleSend = async () => {
        if ((!input.trim() && attachments.length === 0) || loading) return;

        // Store user message with attachments for local display
        const userMsg = { 
            role: 'user', 
            content: input,
            attachments: attachments 
        };
        
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setInput('');
        setAttachments([]);
        setLoading(true);

        try {
            // Check for "Build it" confirmation or similar to trigger generation
            const isGenerationRequest = messages.length > 0 || input.toLowerCase().includes('build') || input.toLowerCase().includes('create') || input.toLowerCase().includes('generate');
            
            // Prioritize Manual Key -> then Cached Key
            let clientApiKey = manualKey.trim() || cachedKey;

            // Diagnostic Log
            console.log("Architect Sending Request. Key Status:", clientApiKey ? "FOUND" : "MISSING");

            // Format messages for API (Vision Support)
            const apiMessages = newMessages.map(m => {
                if (m.role === 'user' && m.attachments && m.attachments.length > 0) {
                    return {
                        role: 'user',
                        content: [
                            { type: "text", text: m.content || "Analyze this image." },
                            ...m.attachments.map(att => ({
                                type: "image_url",
                                image_url: { url: att.content }
                            }))
                        ]
                    };
                }
                // Strip attachments from history if not needed by API or ensure only content is sent
                return { role: m.role, content: m.content };
            });

            const res = await fetch('/api/nex-ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: apiMessages,
                    mode: 'architect', // SPECIAL MODE
                    userId: user.uid,
                    apiKey: clientApiKey // Pass key from client
                })
            });

            if (!res.ok) throw new Error(await res.text());

            const data = await res.json();
            
            // IF AI returns a "GENERATE_SITE" action
            if (data.action === 'GENERATE_SITE') {
                setGenerating(true);
                // 1. Create Site in Firestore
                const newSiteRef = doc(collection(db, 'user_sites'));
                const siteData = {
                    id: newSiteRef.id,
                    userId: user.uid,
                    name: data.data.title || 'AI Generated Site',
                    description: data.data.description || 'Generated by NEX Architect',
                    files: data.data.files,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    status: 'draft',
                    adminStatus: 'active', // REQUIRED BY FIRESTORE RULES
                    theme: 'dark-nebula',
                    aiGenerated: true
                };

                try {
                    console.log("Creating Site in Firestore...", siteData);
                    await setDoc(newSiteRef, siteData);
                    console.log("Site Created! Redirecting...");
                    
                    // 2. Redirect
                    setTimeout(() => {
                        router.push(`/mr-build/editor?id=${newSiteRef.id}`);
                    }, 1500);
                } catch (dbErr) {
                    console.error("Firestore Write Failed:", dbErr);
                    setGenerating(false); // Stop loading animation
                    setMessages(prev => [...prev, { role: 'error', content: `CRITICAL DB ERROR: Could not save site. ${dbErr.code} - ${dbErr.message}` }]);
                }
            } else {
                // Normal chat response (clarification)
                setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
            }

        } catch (err) {
            console.error(err);
            setMessages(prev => [...prev, { role: 'error', content: "Architect Failure: " + err.message }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="architect-overlay">
            <div className="architect-modal">
                <div className="architect-header">
                    <div className="brand">
                        <Cpu size={20} className="icon-cpu" />
                        <span>NEX ARCHITECT</span>
                        <div 
                            className={`status-indicator ${systemStatus}`} 
                            onClick={() => setShowManualInput(!showManualInput)}
                            title="Click to configure manually"
                            style={{cursor: 'pointer'}}
                        >
                            <div className="dot"></div>
                            <span>{systemStatus === 'online' ? 'ONLINE' : (manualKey ? 'MANUAL' : 'OFFLINE')}</span>
                        </div>
                    </div>
                    <button onClick={onClose} className="close-btn"><X size={20}/></button>
                </div>

                {/* MANUAL KEY INPUT OVERLAY */}
                {(showManualInput || (systemStatus === 'offline' && !manualKey)) && (
                    <div className="manual-key-bar">
                        <input 
                            type="password" 
                            value={manualKey} 
                            onChange={e => setManualKey(e.target.value)} 
                            placeholder="Enter OpenRouter Key manually (sk-or-...)"
                        />
                        <button onClick={() => {
                            if(manualKey.trim().length > 10) setSystemStatus('online');
                            setShowManualInput(false);
                        }}>Link</button>
                    </div>
                )}

                <div className="chat-area custom-scrollbar">
                    {messages.map((m, i) => (
                        <div key={i} className={`message ${m.role}`}>
                            {m.role === 'assistant' && <div className="avatar">A</div>}
                            <div className="bubble">
                                {m.content}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="message assistant">
                            <div className="avatar">A</div>
                            <div className="bubble thinking">
                                <span>●</span><span>●</span><span>●</span>
                            </div>
                        </div>
                    )}
                    {generating && (
                        <div className="gen-overlay">
                            <Globe className="spin-globe" size={48} />
                            <h3>CONSTRUCTING REALITY...</h3>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Attachments Preview */}
                {attachments.length > 0 && (
                    <div className="attachments-preview">
                        {attachments.map((file, index) => (
                            <div key={index} className="attachment-chip">
                                <span>{file.name}</span>
                                <button onClick={() => removeAttachment(index)} className="remove-att-btn"><X size={10} /></button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="input-area">
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        style={{display: 'none'}} 
                        multiple 
                        accept="image/*"
                        onChange={handleFileSelect}
                    />
                    <button 
                         className="attach-btn"
                         onClick={() => fileInputRef.current?.click()}
                         title="Attach Image"
                    >
                        <Paperclip size={18} />
                    </button>
                    <input 
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSend()}
                        placeholder="Describe your site (or upload a mockup)..."
                        disabled={generating || loading}
                    />
                    <button onClick={handleSend} disabled={generating || loading || (!input && attachments.length === 0)}>
                        <Send size={18} />
                    </button>
                </div>
            </div>

            <style jsx>{`
                .architect-overlay {
                    position: fixed; inset: 0;
                    background: rgba(0,0,0,0.9); backdrop-filter: blur(10px);
                    display: flex; align-items: center; justify-content: center;
                    z-index: 2000;
                    animation: fadeIn 0.3s ease-out;
                }
                .architect-modal {
                    width: 600px; height: 700px;
                    background: #050505;
                    border: 1px solid #00f0ff;
                    border-radius: 12px;
                    display: flex; flex-direction: column;
                    box-shadow: 0 0 50px rgba(0, 240, 255, 0.2);
                    overflow: hidden;
                    position: relative;
                }
                .architect-header {
                    padding: 20px; border-bottom: 1px solid rgba(0, 240, 255, 0.3);
                    display: flex; justify-content: space-between; align-items: center;
                    background: rgba(0, 240, 255, 0.05);
                }
                .brand { display: flex; align-items: center; gap: 10px; color: #00f0ff; font-weight: 800; letter-spacing: 2px; }
                .close-btn { background: none; border: none; color: #fff; cursor: pointer; opacity: 0.7; }
                .close-btn:hover { opacity: 1; color: #ff0055; }

                .chat-area { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 20px; position: relative; }
                
                .message { display: flex; gap: 10px; opacity: 0; animation: slideUp 0.3s forwards; }
                .message.user { justify-content: flex-end; }
                .message.assistant { justify-content: flex-start; }
                
                .avatar { 
                    width: 30px; height: 30px; background: #00f0ff; color: #000; 
                    border-radius: 4px; display: flex; align-items: center; justify-content: center; font-weight: bold; 
                }
                
                .bubble {
                    max-width: 80%; padding: 12px 16px; border-radius: 8px; font-size: 14px; line-height: 1.5;
                    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #ccc;
                }
                .user .bubble { background: rgba(0, 240, 255, 0.1); border-color: rgba(0, 240, 255, 0.3); color: #fff; }
                .thinking span { animation: blink 1.4s infinite; opacity: 0; }
                .thinking span:nth-child(2) { animation-delay: 0.2s; }
                .thinking span:nth-child(3) { animation-delay: 0.4s; }

                .input-area {
                    padding: 20px; border-top: 1px solid rgba(255,255,255,0.1);
                    display: flex; gap: 10px;
                }
                .input-area input {
                    flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
                    padding: 12px; color: #fff; border-radius: 6px; outline: none;
                }
                .input-area input:focus { border-color: #00f0ff; }
                .input-area button {
                    background: #00f0ff; color: #000; border: none; width: 44px; border-radius: 6px; cursor: pointer;
                    display: flex; align-items: center; justify-content: center;
                }
                .input-area button:hover { background: #fff; }

                .gen-overlay {
                    position: absolute; inset: 0; background: rgba(0,0,0,0.95);
                    display: flex; flex-direction: column; align-items: center; justify-content: center;
                    gap: 20px; z-index: 10; color: #00f0ff;
                }
                .spin-globe { animation: spin 4s linear infinite; }

                .manual-key-bar {
                    padding: 10px; background: rgba(255,0,0,0.1); border-bottom: 1px solid rgba(255,0,0,0.2);
                    display: flex; gap: 10px; animation: slideUp 0.3s;
                }
                .manual-key-bar input {
                    flex: 1; background: #000; border: 1px solid #333; color: #fff; padding: 5px 10px; border-radius: 4px; font-size: 0.8rem;
                }
                .manual-key-bar button {
                    background: #333; color: #fff; border: 1px solid #555; padding: 2px 10px; border-radius: 4px; cursor: pointer; font-size: 0.7rem;
                }
                .manual-key-bar button:hover { background: #00f0ff; color: #000; }

                @keyframes blink { 50% { opacity: 1; } }
                @keyframes slideUp { from { transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

                .status-indicator {
                    display: flex; align-items: center; gap: 6px; font-size: 0.7rem; 
                    margin-left: 15px; padding: 4px 8px; border-radius: 12px;
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .status-indicator.online { color: #00ff80; background: rgba(0,255,128,0.1); border-color: rgba(0,255,128,0.3); }
                .status-indicator.offline { color: #ff4444; background: rgba(255,68,68,0.1); border-color: rgba(255,68,68,0.3); }
                .status-indicator.checking { color: #fbff00; background: rgba(251,255,0,0.1); }
                .status-indicator.error { color: #ff0055; background: rgba(255,0,85,0.1); }

                .dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; box-shadow: 0 0 5px currentColor; }
                
                .attachments-preview {
                    display: flex; gap: 8px; padding: 0 20px 10px 20px; overflow-x: auto;
                }
                .attachment-chip {
                    display: flex; align-items: center; gap: 6px; background: rgba(0, 240, 255, 0.1); 
                    border: 1px solid rgba(0, 240, 255, 0.2); padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; color: #00f0ff;
                }
                .remove-att-btn { background: none; border: none; color: #ff0055; cursor: pointer; padding: 0; display: flex; }
                
                .attach-btn {
                    background: transparent !important; color: #666 !important; width: auto !important;
                }
                .attach-btn:hover { color: #00f0ff !important; }
            `}</style>
        </div>
    );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, ChevronRight, Mic, Volume2, VolumeX, Paperclip, X } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import { db, auth } from '../../../lib/firebase'; // Added db and auth import
import { doc, getDoc, onSnapshot } from 'firebase/firestore'; // Added firestore imports
import { onAuthStateChanged } from 'firebase/auth'; // Added auth import

export default function AICopilot({ siteData, onCodeUpdate }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: JSON.stringify({
            message: "I'm your NEX AI Architect. I can read your code and make changes directly. What should we build?",
            thought: "Initialized."
        })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Voice State
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Model State
  const [selectedModel, setSelectedModel] = useState('openai/gpt-4o-mini');
  const [models, setModels] = useState([]); // Dynamic models
  const [user, setUser] = useState(null);
  const [aiCredits, setAiCredits] = useState(null);
  const [apiKey, setApiKey] = useState(null);

  // Auth & Credit Sync
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
        setUser(u);
        if (u) {
            // Real-time credit listener
            const unsubCredits = onSnapshot(doc(db, 'users', u.uid), (snap) => {
                if (snap.exists()) {
                    setAiCredits(snap.data().aiCredits);
                }
            });
            return () => unsubCredits();
        }
    });
    return () => unsubAuth();
  }, []);

  // Fetch Models from Admin Config
  useEffect(() => {
    const fetchModelsAndKey = async () => {
        try {
            const docRef = doc(db, 'system_config', 'nex_ai');
            const snap = await getDoc(docRef);
            if (snap.exists()) {
                const data = snap.data();
                
                // 1. Models
                if (data.models) {
                    const activeModels = data.models.filter(m => m.active);
                    setModels(activeModels);
                    if (activeModels.length > 0) setSelectedModel(activeModels[0].id);
                }

                // 2. Extract API Key (Auto)
                let foundKey = null;
                if (data.keys && Array.isArray(data.keys)) {
                    const activeKeyObj = data.keys.find(k => k.status === 'active');
                    if (activeKeyObj) foundKey = activeKeyObj.key;
                } else if (data.openRouterKey) {
                    foundKey = data.openRouterKey;
                }
                
                if (foundKey) setApiKey(foundKey);

            } else {
                // Fallback
                setModels([{ id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini (Default)' }]);
            }
        } catch (err) {
            console.error("Error fetching AI config:", err);
            setModels([{ id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini' }]);
        }
    };
    fetchModelsAndKey();
  }, []);

  const scrollRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Self-Healing Trigger
  useEffect(() => {
    const handleAiFixRequest = (e) => {
        const error = e.detail?.error;
        if (error) {
            setInput(`Fix this error: ${error}`);
            // Optional: Auto-send after a delay?
            // handleSend(null, `Fix this error: ${error}`);
        }
    };
    window.addEventListener('AI_FIX_REQUEST', handleAiFixRequest);
    return () => window.removeEventListener('AI_FIX_REQUEST', handleAiFixRequest);
  }, []);

  // Initialize Speech Recognition
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

  // Functions
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
    
    const utterance = new SpeechSynthesisUtterance(text);
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

      setAttachments([...attachments, ...newAttachments]);
      if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeAttachment = (index) => {
      setAttachments(attachments.filter((_, i) => i !== index));
  };

  // Ghost Writer Logic
  const streamCodeToEditor = async (filename, code) => {
      const baseSpeed = 10; 
      const speed = Math.max(2, baseSpeed - Math.floor(code.length / 500));
      const chunkSize = 5; 
      
      for (let i = 0; i <= code.length; i += chunkSize) {
          const slice = code.slice(0, i + chunkSize);
          onCodeUpdate(filename, slice);
          await new Promise(r => setTimeout(r, speed));
      }
      onCodeUpdate(filename, code);
  };

  // Chat Handler
  const handleSend = async (e) => {
    e?.preventDefault();
    if ((!input.trim() && attachments.length === 0) || loading) return;

    cancelSpeech();

    // Construct user message with attachments
    const userMsgContent = {
        text: input,
        attachments: attachments
    };

    // For display, we might just show text, or show an indicator
    const userMsg = { 
        role: 'user', 
        content: input || (attachments.length > 0 ? `[Sent ${attachments.length} files]` : ''), 
        id: Date.now().toString(),
        attachments: attachments // Store for rendering if needed
    };
    
    const newMessages = [...messages, userMsg];
    
    setMessages(newMessages);
    setInput('');
    setAttachments([]);
    setLoading(true);

    try {
        const res = await fetch('/api/nex-ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: newMessages.filter(m => m.role !== 'error').map(m => {
                    if (m.role === 'user') {
                        // If it has attachments, send structured content
                        if (m.attachments && m.attachments.length > 0) {
                            return {
                                role: 'user',
                                content: [
                                    { type: "text", text: m.content || "Analyze these files." },
                                    ...m.attachments.map(att => ({
                                        type: "image_url",
                                        image_url: { url: att.content }
                                    }))
                                ]
                            };
                        }
                        return { role: m.role, content: m.content };
                    }
                    
                    // Safe Parse for Assistant
                    let parsedContent = m.content;
                    try {
                        const json = JSON.parse(m.content);
                        parsedContent = json.message || m.content;
                    } catch (e) {
                        // maintain original content if parse fails
                    }
                    return { 
                        role: m.role, 
                        content: parsedContent
                    };
                }),
                currentContext: {
                    files: siteData?.files ? Object.keys(siteData.files).reduce((acc, filename) => {
                        acc[filename] = siteData.files[filename].content;
                        return acc;
                    }, {}) : {}
                },
                model: selectedModel,
                mode: 'coder', // Explicitly set mode
                userId: user?.uid,
                apiKey: apiKey // Pass Client-Side Key
            })
        });

        if (res.status === 402) {
            const errData = await res.json();
            if (errData.action === 'OUT_OF_FUEL') {
                if (confirm(errData.message)) {
                    router.push('/mr-build/subscription');
                }
                return;
            }
        }

        if (!res.ok) throw new Error(await res.text());

        const data = await res.json();
        const aiMsg = { role: 'assistant', content: JSON.stringify(data), id: (Date.now() + 1).toString() };
        
        setMessages([...newMessages, aiMsg]);
        
        if (voiceEnabled && data.message) {
            speakText(data.message);
        }

        // Handle File Updates (Ghost Writer)
        if (data.action === 'UPDATE_FILE' && data.modifications) {
            for (const mod of data.modifications) {
                await streamCodeToEditor(mod.file, mod.code);
            }
        }

    } catch (err) {
        setMessages([...newMessages, { role: 'error', content: `Error: ${err.message}`, id: Date.now().toString() }]);
    } finally {
        setLoading(false);
    }
  };

  // specialized renderer for the copilot to handle thinking blocks and code buttons
  const MessageContent = ({ content, role }) => {
      if (role === 'assistant') {
          try {
              // Try parsing as JSON first (New Agent Logic)
              const data = typeof content === 'string' ? JSON.parse(content) : content;
              return (
                  <div className="agent-response">
                      {data.thought && (
                          <details className="think-block">
                              <summary>Thinking Process</summary>
                              <div className="think-content">{data.thought}</div>
                          </details>
                      )}
                      <div className="text-content">{data.message}</div>
                      {data.modifications && data.modifications.length > 0 && (
                          <div className="action-badge">
                              <Sparkles size={10} />
                              <span>Updated {data.modifications.map(m => m.file).join(', ')}</span>
                          </div>
                      )}
                  </div>
              );
          } catch (e) {
              // Fallback for old text-based messages or partial streams
              return <div className="text-content">{content}</div>;
          }
      }

      // User messages
      return <div className="text-content">{content}</div>;
  };

  return (
    <div className="copilot-container">
      {/* Header */}
      <div className="header">
        <div className="brand">
          <Sparkles className="icon-sparkles" size={16} />
          <h2 className="title">NEX AI ARCT</h2>
        </div>
        <div className="header-controls">
            {aiCredits !== null && (
                <div className="fuel-gauge" title="Neural Fuel (Credits)">
                    <div className="gauge-icon">⛽</div>
                    <span className="gauge-val">{aiCredits}</span>
                </div>
            )}
            <select 
                value={selectedModel} 
                onChange={(e) => setSelectedModel(e.target.value)}
                className="model-select"
            >
                {models.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
            <button 
                onClick={toggleVoice} 
                className={`voice-btn ${voiceEnabled ? 'active' : ''}`}
                title="Toggle Voice"
            >
                {voiceEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="messages-area custom-scrollbar">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`message-row ${m.role}`}
            >
              <div className={`message-bubble ${m.role}`}>
                <div className="message-meta">
                  {m.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                  <span className="role-name">
                    {m.role === 'user' ? 'You' : 'NEX AI'}
                  </span>
                </div>
                
                <MessageContent content={m.content} role={m.role} />
                
                {m.role === 'error' && <div className="error-text">Error processing request</div>}
              </div>
            </div>
          ))}

        {loading && (
          <div className="loading-indicator">
            <div className="dots">
              <span className="dot dot-1"></span>
              <span className="dot dot-2"></span>
              <span className="dot dot-3"></span>
            </div>
          </div>
        )}
      </div>

      {/* Attachments Preview */}
      {attachments.length > 0 && (
          <div className="attachments-preview">
              {attachments.map((file, index) => (
                  <div key={index} className="attachment-chip">
                      <span className="file-name">{file.name}</span>
                      <button onClick={() => removeAttachment(index)} className="remove-btn">
                          <X size={12} />
                      </button>
                  </div>
              ))}
          </div>
      )}

      {/* Input */}
      <div className="input-area">
        <div className={`input-wrapper ${isListening ? 'listening' : ''}`}>
          <input
            className="chat-input"
            value={input}
            placeholder={isListening ? "Listening..." : "Describe a component..."}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                handleSend(e);
              }
            }}
          />
          
          <input 
              type="file" 
              ref={fileInputRef}
              className="hidden-file-input"
              multiple
              onChange={handleFileSelect}
              style={{ display: 'none' }}
          />

          <div className="input-actions">
            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="action-btn"
                title="Attach file"
            >
                <Paperclip size={16} />
            </button>
            <button
                type="button"
                onClick={toggleListening}
                className={`action-btn mic ${isListening ? 'active' : ''}`}
            >
                <Mic size={16} />
            </button>
            <button
                type="button"
                onClick={handleSend}
                disabled={loading || (!input.trim() && attachments.length === 0)}
                className="action-btn send"
            >
                <Send size={16} />
            </button>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        /* Core Container */
        .copilot-container {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;
            background: rgba(5, 5, 5, 0.95);
            backdrop-filter: blur(20px);
            border-left: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: -10px 0 40px rgba(0,0,0,0.6);
            color: #e2e8f0;
            font-family: 'Inter', sans-serif;
            overflow: hidden;
        }

        /* Header */
        .header {
            padding: 14px 18px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 100%);
        }
        .header-controls {
            display: flex;
            gap: 8px;
            align-items: center;
        }
        .model-select {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.08);
            color: #94a3b8;
            font-size: 11px;
            border-radius: 4px;
            padding: 4px 8px;
            outline: none;
            cursor: pointer;
        }
        .model-select:hover {
            background: rgba(255,255,255,0.1);
            color: #fff;
        }
        .model-select option {
            background: #1a1a20;
            color: #fff;
        }

        .fuel-gauge {
            display: flex;
            align-items: center;
            gap: 6px;
            background: rgba(0, 240, 255, 0.1);
            border: 1px solid rgba(0, 240, 255, 0.2);
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: bold;
            color: #00f0ff;
            cursor: help;
        }
        .gauge-icon { font-size: 10px; }

        .brand {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .title {
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.15em;
            color: #fff;
            background: linear-gradient(90deg, #fff, #94a3b8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-transform: uppercase;
            margin: 0;
        }
        :global(.icon-sparkles) {
            color: #00f0ff;
            filter: drop-shadow(0 0 5px rgba(0, 240, 255, 0.5));
            animation: pulse 3s infinite ease-in-out;
        }
        @keyframes pulse {
            0%, 100% { opacity: 0.8; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.1); }
        }

        .voice-btn {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.05);
            color: #94a3b8;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .voice-btn:hover { 
            background: rgba(255,255,255,0.1); 
            color: #fff; 
        }
        .voice-btn.active {
            background: rgba(34, 211, 238, 0.15);
            border-color: rgba(34, 211, 238, 0.3);
            color: #22d3ee;
            box-shadow: 0 0 10px rgba(34, 211, 238, 0.15);
        }

        /* Messages Area */
        .messages-area {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 24px;
            scroll-behavior: smooth;
        }
        .message-row {
            display: flex;
            width: 100%;
            animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        
        .message-row.user { justify-content: flex-end; }
        .message-row.assistant { justify-content: flex-start; }

        .message-bubble {
            max-width: 88%;
            padding: 12px 16px;
            border-radius: 12px;
            font-size: 13px;
            line-height: 1.6;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            position: relative;
        }
        .message-bubble.user {
            background: linear-gradient(135deg, #4f46e5, #7c3aed);
            color: white;
            border-top-right-radius: 2px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .message-bubble.assistant {
            background: rgba(20, 20, 25, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.08);
            color: #e2e8f0;
            border-top-left-radius: 2px;
            backdrop-filter: blur(10px);
        }

        .message-meta {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;
            opacity: 0.5;
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }
        
        /* Thinking Block */
        .think-block {
            margin-bottom: 10px;
            background: rgba(0,0,0,0.3);
            padding: 8px 12px;
            border-radius: 8px;
            border: 1px solid rgba(255,255,255,0.05);
            transition: all 0.2s;
        }
        .think-block[open] {
            background: rgba(0,0,0,0.5);
            border-color: rgba(255,255,255,0.1);
        }
        .think-block summary {
            font-size: 10px;
            font-style: italic;
            color: #64748b;
            cursor: pointer;
            user-select: none;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .think-block summary::before {
            content: '💭';
            font-style: normal;
        }
        .think-block summary:hover { color: #94a3b8; }
        
        .think-content {
            margin-top: 8px;
            padding-left: 8px;
            border-left: 2px solid rgba(139, 92, 246, 0.2);
            font-size: 11px;
            color: #94a3b8;
            font-family: 'JetBrains Mono', monospace;
            line-height: 1.5;
        }

        /* Action Badge */
        .action-badge {
            margin-top: 8px;
            background: rgba(6, 182, 212, 0.1);
            border: 1px solid rgba(6, 182, 212, 0.2);
            padding: 6px 10px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 500;
            color: #22d3ee;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            animation: slideUp 0.3s ease-out;
        }
        @keyframes slideUp { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

        /* Loading */
        .loading-indicator {
            padding: 4px 16px;
        }
        .dots {
            background: rgba(255, 255, 255, 0.05);
            padding: 8px 14px;
            border-radius: 12px;
            border-top-left-radius: 2px;
            display: inline-flex;
            gap: 4px;
        }
        .dot {
            width: 4px;
            height: 4px;
            background: #94a3b8;
            border-radius: 50%;
            animation: bounce 1.4s infinite ease-in-out both;
        }
        .dot-1 { animation-delay: -0.32s; }
        .dot-2 { animation-delay: -0.16s; }
        
        .attachments-preview {
            display: flex;
            gap: 8px;
            padding: 8px 16px;
            background: rgba(0,0,0,0.2);
            border-top: 1px solid rgba(255,255,255,0.05);
            overflow-x: auto;
        }
        .attachment-chip {
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 4px;
            padding: 4px 8px;
            font-size: 11px;
            display: flex;
            align-items: center;
            gap: 6px;
            white-space: nowrap;
        }
        .file-name {
            max-width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .remove-btn {
            background: transparent;
            border: none;
            color: #ef4444;
            cursor: pointer;
            padding: 0;
            display: flex;
        }

        /* Input Area */
        .input-area {
            padding: 16px 20px 24px 20px;
            background: linear-gradient(0deg, rgba(0,0,0,0.8), rgba(0,0,0,0));
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
        }
        .input-wrapper {
            position: relative;
            background: rgba(30, 30, 36, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .input-wrapper:focus-within {
            background: rgba(30, 30, 36, 0.9);
            border-color: rgba(139, 92, 246, 0.4);
            box-shadow: 0 0 0 1px rgba(139, 92, 246, 0.3), 0 8px 20px rgba(0,0,0,0.3);
        }
        
        .chat-input {
            width: 100%;
            background: transparent;
            border: none;
            padding: 14px 16px;
            padding-right: 86px;
            color: #f1f5f9;
            font-size: 13px;
            line-height: 1.5;
            outline: none;
        }
        .chat-input::placeholder { color: #64748b; }

        .input-actions {
            position: absolute;
            right: 8px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            gap: 6px;
        }
        .action-btn {
            width: 28px;
            height: 28px;
            border-radius: 6px;
            border: none;
            background: transparent;
            color: #64748b;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .action-btn:hover { background: rgba(255,255,255,0.05); color: #94a3b8; }
        
        .action-btn.mic.active {
            background: rgba(34, 211, 238, 0.15);
            color: #22d3ee;
            animation: pulse-mic 1.5s infinite;
        }
        @keyframes pulse-mic {
            0% { box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.4); }
            70% { box-shadow: 0 0 0 6px rgba(34, 211, 238, 0); }
            100% { box-shadow: 0 0 0 0 rgba(34, 211, 238, 0); }
        }
        
        .action-btn.send {
            color: #a78bfa;
        }
        .action-btn.send:hover {
            background: rgba(139, 92, 246, 0.2);
            color: #c4b5fd;
        }
        .action-btn.send:disabled {
            opacity: 0.3;
            cursor: not-allowed;
            background: transparent;
        }

        /* Scrollbar */
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
            background: rgba(255,255,255,0.1); 
            border-radius: 10px; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
}

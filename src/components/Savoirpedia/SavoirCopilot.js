import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, Mic, Volume2, VolumeX, Edit3, Image as ImageIcon, X } from 'lucide-react';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function SavoirCopilot({ currentTitle, currentContent, onUpdate }) {
  // ... (existing state) ...
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: JSON.stringify({
            message: "I am NEX AI, your research assistant and editor. I can write articles, fix grammar, or restructure your content.",
            thought: "Ready to write."
        })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Voice State
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  // Vision State
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  
  // Model State
  const [selectedModel, setSelectedModel] = useState('openai/gpt-4o-mini');
  const [models, setModels] = useState([]);
  const [apiKey, setApiKey] = useState(null);

  // Fetch Models
  useEffect(() => {
    const fetchModels = async () => {
        try {
            const docRef = doc(db, 'system_config', 'nex_ai');
            const snap = await getDoc(docRef);
            if (snap.exists()) {
                const data = snap.data();
                if (data.models) setModels(data.models.filter(m => m.active));
                
                // Load API Key (Client-side)
                if (data.keys && Array.isArray(data.keys)) {
                    const activeKeys = data.keys.filter(k => k.status === 'active');
                    if (activeKeys.length > 0) {
                       setApiKey(activeKeys[Math.floor(Math.random() * activeKeys.length)].key);
                    }
                } else if (data.openRouterKey) {
                    setApiKey(data.openRouterKey);
                }
            } else {
                setModels([{ id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini' }]);
            }
        } catch (err) {
            console.error("Failed to load NEX AI config:", err);
            setModels([{ id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini' }]);
        }
    };
    fetchModels();
  }, []);

  const scrollRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Speech Recognition
  useEffect(() => {
      if (typeof window !== 'undefined') {
          const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
          if (SpeechRecognition) {
              const recognition = new SpeechRecognition();
              recognition.continuous = false;
              recognition.interimResults = false;
              recognition.lang = 'en-US';
              recognition.onresult = (event) => setInput(event.results[0][0].transcript);
              recognition.onstart = () => setIsListening(true);
              recognition.onend = () => setIsListening(false);
              recognitionRef.current = recognition;
          }
      }
  }, []);

  const toggleListening = () => {
    isListening ? recognitionRef.current?.stop() : recognitionRef.current?.start();
  };

  const speakText = (text) => {
    if (!voiceEnabled || typeof window === 'undefined') return;
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  // Helper: Robust JSON parser
  const tryParseJSON = (str) => {
      try {
          if (typeof str !== 'string') return str;
          // 1. Try direct parse
          return JSON.parse(str);
      } catch (e) {
          try {
              // 2. Try extracting JSON from markdown blocks or substrings
              const match = str.match(/\{[\s\S]*\}/);
              if (match) return JSON.parse(match[0]);
          } catch (e2) {
              return null;
          }
      }
      return null;
  };

  // Helper to clean content
  const formatMessage = (content) => {
      if (!content) return '';
      
      // 1. Strip markdown code blocks
      let clean = content.replace(/```html/g, '').replace(/```/g, '');
      
      // 2. Unescape HTML entities (if the AI returned escaped HTML)
      clean = clean
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&amp;/g, '&');
        
      // 3. Convert Markdown Images to HTML
      clean = clean.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
          return `<img src="${src}" alt="${alt}" class="generated-image" />`;
      });

      // 4. Aggressive Fallback: Auto-convert raw Pollinations URLs
      clean = clean.replace(/(https:\/\/image\.pollinations\.ai\/[^\s)]+)/g, (match) => {
          // If already inside an img tag, skip (simple check)
          if (clean.includes(`src="${match}"`)) return match;
          return `<img src="${match}" alt="Generated Image" class="generated-image" />`;
      });
        
      return clean;
  };

  // Image Upload Handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB Limit
          alert("File too large. Please upload an image under 5MB.");
          return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async (e) => {
    e?.preventDefault();
    if ((!input.trim() && !selectedImage) || loading) return;

    // Construct User Message
    let contentPayload = input;
    
    // If image exists, create multimodal content array
    if (selectedImage) {
        contentPayload = [
            { type: "text", text: input || "Analyze this image." },
            { type: "image_url", image_url: { url: selectedImage } }
        ];
    }

    const userMsg = { 
        role: 'user', 
        content: contentPayload, // Can be string or array
        id: Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9) 
    };
    
    const newMessages = [...messages, userMsg];
    
    setMessages(newMessages);
    setInput('');
    setSelectedImage(null); // Clear image after send
    setLoading(true);

    try {
        const res = await fetch('/api/nex-ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: newMessages.filter(m => m.role !== 'error').map(m => {
                    // Normalize content for API
                     const json = tryParseJSON(m.content);
                     // If content is already object/array (multimodal), keep it. 
                     // If it's a string, try extracting message from JSON or use raw.
                     let content = m.content;
                     if (typeof m.content === 'string') {
                         content = json?.message || m.content;
                     }
                     return { role: m.role, content };
                }),
                currentContext: {
                    title: currentTitle,
                    content: currentContent
                },
                model: selectedModel,
                mode: 'article',
                apiKey: apiKey
            })
        });

        if (!res.ok) throw new Error(await res.text());

        const data = await res.json();
        const aiMsg = { role: 'assistant', content: JSON.stringify(data), id: Date.now().toString() + '-ai-' + Math.random().toString(36).substr(2, 9) };
        
        // Handle Article Updates
        if (data.action === 'UPDATE_ARTICLE' && data.data) {
            onUpdate(data.data);
        } else if (data.action === 'UPDATE_CONTENT' && data.content) {
            onUpdate({ content: data.content });
        } else if (data.action === 'GENERATE_IMAGE' && data.data?.description) {
            // Client-side Image Generation logic handled by renderer
        }

        setMessages([...newMessages, aiMsg]);
        
        if (voiceEnabled && data.message) speakText(data.message);

    } catch (err) {
        setMessages([...newMessages, { role: 'error', content: `Error: ${err.message}`, id: Date.now().toString() + '-err-' + Math.random().toString(36).substr(2, 9) }]);
    } finally {
        setLoading(false);
    }
  };

  // ... (helper functions retryParseJSON, formatMessage remain same) ...

  const MessageContent = ({ content, role }) => {
      // Handle User Multimodal Content (Array)
      if (role === 'user' && Array.isArray(content)) {
          return (
              <div className="user-multimodal">
                  {content.map((part, i) => {
                      if (part.type === 'text') return <div key={i} className="text-content">{part.text}</div>;
                      if (part.type === 'image_url') return (
                        <div key={i} className="uploaded-image-preview">
                            <img src={part.image_url.url} alt="User Upload" />
                        </div>
                      );
                      return null;
                  })}
              </div>
          );
      }

      if (role === 'assistant') {
          // ... (existing assistant logic) ...
          const data = tryParseJSON(content);
          if (data) {
               // ... (existing return) ...
               return (
                  <div className="agent-response">
                      {data.thought && (
                          <div className="think-block">
                              <span className="think-icon">💭</span>
                              <span className="think-text">{data.thought}</span>
                          </div>
                      )}
                      
                      <div className="text-content" dangerouslySetInnerHTML={{ __html: formatMessage(data.message) }} />
                      
                      {data.action === 'GENERATE_IMAGE' && data.data?.description && (
                          <div className="image-container">
                              <img 
                                src={`https://image.pollinations.ai/prompt/${encodeURIComponent(data.data.description)}?width=1024&height=576&nologo=true`} 
                                alt={data.data.description} 
                                className="generated-image"
                                loading="lazy"
                              />
                              <div className="image-caption">Generative Art: {data.data.description}</div>
                          </div>
                      )}

                      {(data.action === 'UPDATE_CONTENT' || data.action === 'UPDATE_ARTICLE') && (
                          <div className="action-badge">
                              <Edit3 size={10} />
                              <span>Updated Article</span>
                          </div>
                      )}
                  </div>
              );
          } else {
             return <div className="text-content" dangerouslySetInnerHTML={{ __html: formatMessage(content) }} />;
          }
      }
      return <div className="text-content">{content}</div>;
  };

  return (
    <div className="copilot-container">
      {/* Header (same) */}
      <div className="header">
        <div className="brand">
          <Sparkles className="icon-sparkles" size={16} />
          <h2 className="title">NEX EDITOR</h2>
        </div>
        <div className="header-controls">
            <select 
                value={selectedModel} 
                onChange={(e) => setSelectedModel(e.target.value)}
                className="model-select"
            >
                {models.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
            <button 
                onClick={() => setVoiceEnabled(!voiceEnabled)} 
                className={`voice-btn ${voiceEnabled ? 'active' : ''}`}
            >
                {voiceEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="messages-area custom-scrollbar">
          {messages.map((m) => (
            <div key={m.id} className={`message-row ${m.role}`}>
              <div className={`message-bubble ${m.role}`}>
                <div className="message-meta">
                  {m.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                  <span className="role-name">{m.role === 'user' ? 'You' : 'NEX AI'}</span>
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

      {/* Input */}
      <div className="input-area">
        {/* Image Preview Overlay */}
        {selectedImage && (
            <div className="image-preview-container">
                <img src={selectedImage} alt="Preview" className="img-preview" />
                <button onClick={() => setSelectedImage(null)} className="remove-img-btn">
                    <X size={12} />
                </button>
            </div>
        )}

        <div className={`input-wrapper ${isListening ? 'listening' : ''}`}>
          <input
            className="chat-input"
            value={input}
            placeholder={isListening ? "Listening..." : "Write a paragraph or upload image..."}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) handleSend(e); }}
          />

          {/* Hidden File Input */}
          <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept="image/*" 
              onChange={handleImageUpload} 
          />

          <div className="input-actions">
            {/* Upload Button */}
             <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`action-btn upload ${selectedImage ? 'active' : ''}`}
                title="Upload Image"
            >
                <ImageIcon size={16} />
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
                disabled={loading || (!input.trim() && !selectedImage)}
                className="action-btn send"
            >
                <Send size={16} />
            </button>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        /* ... (existing styles) ... */
        .copilot-container {
            display: flex; flex-direction: column; height: 100%; width: 100%;
            background: rgba(5, 5, 5, 0.95); backdrop-filter: blur(20px);
            border-left: 1px solid rgba(255, 255, 255, 0.08);
            color: #e2e8f0; font-family: 'Inter', sans-serif;
        }
        .header {
            padding: 14px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            display: flex; align-items: center; justify-content: space-between;
        }
        /* ... include all previous styles ... */
        .brand { display: flex; align-items: center; gap: 10px; }
        .title {
            font-size: 11px; font-weight: 800; letter-spacing: 0.15em;
            color: #fff; text-transform: uppercase; margin: 0;
        }
        :global(.icon-sparkles) { color: #00f0ff; filter: drop-shadow(0 0 5px rgba(0, 240, 255, 0.5)); }
        
        .header-controls { display: flex; gap: 8px; align-items: center; }
        .model-select {
            background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
            color: #94a3b8; font-size: 11px; border-radius: 4px; padding: 4px 8px; outline: none;
        }
        .model-select option { background: #1a1a20; color: #fff; }
        
        .voice-btn {
            width: 28px; height: 28px; border-radius: 50%;
            background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.05);
            color: #94a3b8; cursor: pointer; display: flex; align-items: center; justify-content: center;
        }
        .voice-btn.active { color: #22d3ee; border-color: rgba(34, 211, 238, 0.3); }

        .messages-area { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 24px; }
        .message-row { display: flex; width: 100%; animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        
        .message-row.user { justify-content: flex-end; }
        .message-row.assistant { justify-content: flex-start; }

        .message-bubble {
            max-width: 88%; padding: 12px 16px; border-radius: 12px; font-size: 13px; line-height: 1.6;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2); position: relative;
        }
        .message-bubble.user { background: linear-gradient(135deg, #4f46e5, #7c3aed); color: white; border-top-right-radius: 2px; }
        .message-bubble.assistant {
            background: rgba(20, 20, 25, 0.6); border: 1px solid rgba(255, 255, 255, 0.08);
            color: #e2e8f0; border-top-left-radius: 2px; backdrop-filter: blur(10px);
        }

        .message-meta {
            display: flex; align-items: center; gap: 8px; margin-bottom: 8px; opacity: 0.5;
            font-size: 10px; font-weight: 600; text-transform: uppercase;
        }
        
        .text-content { font-size: 13px; line-height: 1.6; white-space: pre-wrap; }
        .text-content :global(img) { max-width: 100%; border-radius: 8px; margin: 10px 0; display: block; }

        .user-multimodal { display: flex; flex-direction: column; gap: 8px; }
        .uploaded-image-preview img { max-width: 150px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2); }
        
        .image-container { margin-top: 12px; border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
        .generated-image { width: 100%; height: auto; display: block; }
        .image-caption { 
            background: rgba(0,0,0,0.4); padding: 4px 8px; font-size: 10px; color: #94a3b8; 
            text-align: center; border-top: 1px solid rgba(255,255,255,0.05);
        }

        .think-block {
            margin-bottom: 10px; background: rgba(0,0,0,0.3); padding: 8px 12px;
            border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);
            display: flex; gap: 8px; align-items: flex-start;
        }
        .think-text { font-size: 11px; font-style: italic; color: #64748b; font-family: monospace; }
        
        .action-badge {
            margin-top: 8px; background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.2);
            padding: 6px 10px; border-radius: 6px; font-size: 11px; font-weight: 500;
            color: #22d3ee; display: inline-flex; align-items: center; gap: 6px;
        }

        .loading-indicator { padding: 4px 16px; }
        .dots { display: inline-flex; gap: 4px; background: rgba(255, 255, 255, 0.05); padding: 8px 14px; border-radius: 12px; }
        .dot { width: 4px; height: 4px; background: #94a3b8; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both; }
        .dot-1 { animation-delay: -0.32s; }
        .dot-2 { animation-delay: -0.16s; }
        @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }

        .input-area { padding: 16px 20px 24px 20px; background: linear-gradient(0deg, rgba(0,0,0,0.8), rgba(0,0,0,0)); position: relative; }
        .image-preview-container {
            position: absolute; bottom: 80px; left: 20px; 
            background: rgba(20,20,25,0.9); padding: 4px; border-radius: 8px;
            border: 1px solid rgba(255,255,255,0.1); display: flex;
        }
        .img-preview { width: 60px; height: 60px; object-fit: cover; border-radius: 4px; }
        .remove-img-btn {
            position: absolute; top: -6px; right: -6px; width: 18px; height: 18px;
            background: #ef4444; border-radius: 50%; color: white; border: none;
            display: flex; align-items: center; justify-content: center; cursor: pointer;
        }

        .input-wrapper {
            position: relative; background: rgba(30, 30, 36, 0.6); border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px; transition: all 0.2s;
        }
        .input-wrapper:focus-within { background: rgba(30, 30, 36, 0.9); border-color: rgba(139, 92, 246, 0.4); }
        
        .chat-input {
            width: 100%; background: transparent; border: none; padding: 14px 16px; padding-right: 120px;
            color: #f1f5f9; font-size: 13px; outline: none;
        }
        .input-actions { position: absolute; right: 8px; top: 50%; transform: translateY(-50%); display: flex; gap: 6px; }
        .action-btn {
            width: 28px; height: 28px; border-radius: 6px; border: none; background: transparent;
            color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center;
        }
        .action-btn:hover { background: rgba(255,255,255,0.05); color: #94a3b8; }
        .action-btn.active { color: #22d3ee; }
        .action-btn.mic.active { animation: pulse-mic 1.5s infinite; }
        .action-btn.send:hover { color: #c4b5fd; background: rgba(139, 92, 246, 0.2); }
        .action-btn.upload:hover { color: #34d399; }
        
        /* Scrollbar styling */
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }

        @media (max-width: 768px) {
            .copilot-container {
                height: 100dvh; /* Use dynamic viewport height for mobile browsers */
                position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                border-left: none;
                z-index: 9999; /* Ensure it overlays nicely if used in modal/fullscreen */
            }
            
            .header { padding: 12px 15px; }
            .model-select { max-width: 100px; text-overflow: ellipsis; overflow: hidden; }
            
            .messages-area { padding: 15px; gap: 15px; }
            .message-bubble { max-width: 92%; font-size: 14px; padding: 10px 14px; }
            
            .input-area { padding: 12px 15px 20px 15px; }
            .input-wrapper { border-radius: 25px; }
            .chat-input { padding: 12px 16px; padding-right: 110px; font-size: 16px; /* Prevent Zoom */ }
            
            .input-actions { right: 5px; gap: 2px; }
            .action-btn { width: 32px; height: 32px; /* Larger touch target */ }
            
            /* Hide non-essential elements on very small screens if needed */
            .image-preview-container { bottom: 70px; left: 15px; }
        }
      `}</style>
    </div>
  );
}

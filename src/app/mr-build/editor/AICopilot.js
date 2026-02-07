'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, ChevronRight, Mic, Volume2, VolumeX } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

export default function AICopilot({ onApplyCode }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: "I'm your NEX AI Architect. Describe the component you want to build, and I'll generate the code for you."
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Voice State
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const scrollRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

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
    
    // Clean text for speech
    const cleanText = text
        .replace(/```[\s\S]*?```/g, 'Here is the code.')
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

  const extractCode = (text) => {
    if (!text) return null;
    const match = text.match(/```(?:html|jsx|tsx|css)?\n([\s\S]*?)```/);
    return match ? match[1] : null;
  };

  // Chat Handler
  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    cancelSpeech();

    const userMsg = { role: 'user', content: input, id: Date.now().toString() };
    const newMessages = [...messages, userMsg];
    
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
        const res = await fetch('/api/nex-ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: newMessages.filter(m => m.role !== 'error').map(m => ({ role: m.role, content: m.content })),
                model: 'openai/gpt-4o', // Default to smarter model for coding
                system: `You are the NEX AI Architect for Mr Build.
                Your goal is to generate high-quality HTML and CSS code for the user.
                
                RULES:
                1. Output CLEAN, MODERN, and RESPONSIVE code.
                2. Use the "Dark Nebula" aesthetic (dark backgrounds, neon accents, glassmorphism) unless requested otherwise.
                3. IMPORTANT: Provide a SINGLE HTML block with embedded <style> tags. Do NOT use external CSS files.
                4. Use 'https://placehold.co/600x400' for images. Do NOT use local paths like 'image.jpg'.
                5. If explaining, be concise.`
            })
        });

        if (!res.ok) throw new Error(await res.text());

        const data = await res.json();
        const aiMsg = { role: 'assistant', content: data.content, id: (Date.now() + 1).toString() };
        
        setMessages([...newMessages, aiMsg]);
        
        if (voiceEnabled) {
            speakText(data.content);
        }

    } catch (err) {
        setMessages([...newMessages, { role: 'error', content: `Error: ${err.message}`, id: Date.now().toString() }]);
    } finally {
        setLoading(false);
    }
  };

  // specialized renderer for the copilot to handle thinking blocks and code buttons
  const MessageContent = ({ content, role }) => {
      const parts = [];
      const thinkRegex = /<think>([\s\S]*?)<\/think>/g;
      let lastIndex = 0;
      let match;

      while ((match = thinkRegex.exec(content)) !== null) {
          if (match.index > lastIndex) {
              parts.push({ type: 'text', content: content.slice(lastIndex, match.index) });
          }
          parts.push({ type: 'think', content: match[1] });
          lastIndex = match.index + match[0].length;
      }
      if (lastIndex < content.length) {
          parts.push({ type: 'text', content: content.slice(lastIndex) });
      }

      return (
          <>
              {parts.map((part, i) => (
                  part.type === 'think' ? (
                      <details key={i} className="think-block">
                          <summary>Thinking Process</summary>
                          <div className="think-content">{part.content}</div>
                      </details>
                  ) : (
                      <div key={i} className="text-content">
                          {part.content.split('```').map((chunk, j) => {
                              if (j % 2 === 1) {
                                  // Code block logic is handled by extractCode for the button, 
                                  // but here we just render it nicely or hide it if it's too long?
                                  // For sidebar, maybe just show "Code Block Generated" and the apply button?
                                  // Let's show a preview.
                                  return (
                                     <div key={j} className="code-preview">
                                         {chunk.replace(/^(html|css|js|jsx)/, '')}
                                     </div>
                                  );
                              }
                              return <span key={j}>{chunk}</span>;
                          })}
                      </div>
                  )
              ))}
          </>
      );
  };

  return (
    <div className="copilot-container">
      {/* Header */}
      <div className="header">
        <div className="brand">
          <Sparkles className="icon-sparkles" size={16} />
          <h2 className="title">NEX AI ARCHITECT</h2>
        </div>
        <button 
            onClick={toggleVoice} 
            className={`voice-btn ${voiceEnabled ? 'active' : ''}`}
        >
            {voiceEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
        </button>
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
                
                {m.role === 'assistant' && extractCode(m.content) && (
                  <button
                    onClick={() => onApplyCode(extractCode(m.content))}
                    className="apply-btn"
                  >
                    Apply to Canvas <ChevronRight size={12} />
                  </button>
                )}
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
          
          <div className="input-actions">
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
                disabled={loading || !input.trim()}
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
            width: 320px;
            background: rgba(10, 10, 12, 0.95);
            backdrop-filter: blur(16px);
            border-left: 1px solid rgba(139, 92, 246, 0.2);
            box-shadow: -10px 0 30px rgba(0,0,0,0.5);
            position: relative;
            color: #fff;
            font-family: 'Inter', sans-serif;
        }

        /* Header */
        .header {
            padding: 16px;
            border-bottom: 1px solid rgba(139, 92, 246, 0.2);
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: linear-gradient(90deg, rgba(88, 28, 135, 0.1), transparent);
        }
        .brand {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .title {
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.1em;
            color: #fff;
            text-transform: uppercase;
            font-style: italic;
            margin: 0;
        }
        /* Using global global css variable or explicit color if not available */
        :global(.icon-sparkles) {
            color: #22d3ee;
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        .voice-btn {
            padding: 6px;
            border-radius: 50%;
            background: transparent;
            border: none;
            color: #6b7280;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .voice-btn:hover { color: #d1d5db; }
        .voice-btn.active {
            background: rgba(34, 211, 238, 0.2);
            color: #22d3ee;
        }

        /* Messages Area */
        .messages-area {
            flex: 1;
            overflow-y: auto;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            scroll-behavior: smooth;
        }
        .message-row {
            display: flex;
            width: 100%;
        }
        .message-row.user { justify-content: flex-end; }
        .message-row.assistant { justify-content: flex-start; }

        .message-bubble {
            max-width: 90%;
            padding: 12px;
            border-radius: 12px;
            font-size: 13px;
            line-height: 1.5;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            backdrop-filter: blur(4px);
        }
        .message-bubble.user {
            background: rgba(124, 58, 237, 0.8); /* purple-600 */
            color: white;
            border-top-right-radius: 0;
            border: 1px solid rgba(167, 139, 250, 0.3);
        }
        .message-bubble.assistant {
            background: rgba(21, 21, 24, 0.9);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #e5e7eb;
            border-top-left-radius: 0;
        }

        .message-meta {
            display: flex;
            align-items: center;
            gap: 6px;
            margin-bottom: 6px;
            opacity: 0.6;
            font-size: 10px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }

        /* Content Styling */
        .text-content { white-space: pre-wrap; }
        
        .think-block {
            margin-bottom: 8px;
            background: rgba(0,0,0,0.2);
            padding: 8px;
            border-radius: 4px;
            border: 1px solid rgba(255,255,255,0.05);
        }
        .think-block summary {
            font-size: 10px;
            font-style: italic;
            color: #6b7280;
            cursor: pointer;
        }
        .think-block summary:hover { color: #9ca3af; }
        .think-content {
            margin-top: 4px;
            padding-left: 8px;
            border-left: 2px solid rgba(139, 92, 246, 0.3);
            font-size: 11px;
            color: #9ca3af;
        }

        .code-preview {
            margin: 8px 0;
            padding: 8px;
            background: rgba(0,0,0,0.4);
            border-radius: 4px;
            font-family: monospace;
            font-size: 10px;
            overflow-x: auto;
            border: 1px solid rgba(255,255,255,0.1);
            white-space: pre;
        }

        .apply-btn {
            margin-top: 12px;
            width: 100%;
            padding: 8px;
            background: linear-gradient(90deg, #0891b2, #2563eb); /* cyan-600 to blue-600 */
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 6px;
            color: white;
            font-weight: 700;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: -0.02em;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            box-shadow: 0 0 15px rgba(0, 255, 255, 0.2);
            transition: all 0.2s;
        }
        .apply-btn:hover {
            filter: brightness(1.1);
            transform: translateY(-1px);
        }

        .error-text {
            color: #ef4444;
            font-size: 11px;
            margin-top: 4px;
        }

        /* Loading */
        .loading-indicator {
            display: flex;
            justify-content: flex-start;
        }
        .dots {
            background: rgba(21, 21, 24, 0.9);
            border: 1px solid rgba(255, 255, 255, 0.05);
            padding: 8px 12px;
            border-radius: 12px;
            border-top-left-radius: 0;
            display: flex;
            gap: 4px;
        }
        .dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            animation: bounce 1.4s infinite ease-in-out both;
        }
        .dot-1 { background-color: #06b6d4; animation-delay: -0.32s; }
        .dot-2 { background-color: #8b5cf6; animation-delay: -0.16s; }
        .dot-3 { background-color: #3b82f6; }
        
        @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }

        /* Input Area */
        .input-area {
            padding: 16px;
            background: #0a0a0c;
            border-top: 1px solid rgba(139, 92, 246, 0.1);
        }
        .input-wrapper {
            position: relative;
            background: #151518;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            transition: all 0.2s;
        }
        .input-wrapper:focus-within {
            border-color: rgba(139, 92, 246, 0.5);
        }
        .input-wrapper.listening {
            border-color: rgba(34, 211, 238, 0.8);
            box-shadow: 0 0 15px rgba(34, 211, 238, 0.2);
        }

        .chat-input {
            width: 100%;
            background: transparent;
            border: none;
            padding: 12px 16px;
            padding-right: 80px; /* Space for buttons */
            color: white;
            font-size: 13px;
            outline: none;
        }
        .chat-input::placeholder { color: #4b5563; }

        .input-actions {
            position: absolute;
            right: 8px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            gap: 4px;
        }
        .action-btn {
            padding: 6px;
            border-radius: 6px;
            border: none;
            background: transparent;
            color: #6b7280;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .action-btn:hover { color: #d1d5db; }
        
        .action-btn.mic.active {
            background: rgba(34, 211, 238, 0.2);
            color: #22d3ee;
        }
        
        .action-btn.send {
            background: rgba(139, 92, 246, 0.2);
            color: #a78bfa;
        }
        .action-btn.send:hover {
            background: rgba(139, 92, 246, 0.8);
            color: white;
        }
        .action-btn:disabled {
            opacity: 0.3;
            cursor: not-allowed;
        }

        /* Scrollbar */
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
            background: rgba(255,255,255,0.1); 
            border-radius: 2px; 
        }
      `}</style>
    </div>
  );
}

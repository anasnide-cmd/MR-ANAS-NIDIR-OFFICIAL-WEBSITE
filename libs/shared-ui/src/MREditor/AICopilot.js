'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, ChevronRight, Mic, Volume2, VolumeX, Paperclip, X, ChevronDown, Rocket, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Card,
    Avatar,
    Button,
    ButtonGroup,
    Badge,
    Chip,
    Input,
    TextArea,
    Dropdown,
    Tooltip,
    ScrollShadow,
    Progress
} from "@heroui/react";
import { db, auth } from '../../lib/firebase'; // Updated relative path
import { doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore'; 
import { onAuthStateChanged } from 'firebase/auth'; 

const AICopilot = memo(({ siteData, onCodeUpdate, selectionContext }) => {
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

  // Self-Healing & Contextual Triggers
  useEffect(() => {
    const handleAiFixRequest = (e) => {
        const error = e.detail?.error;
        if (error) {
            handleSend(null, `Fix this error in ${selectionContext?.activeFile || 'the current file'}:\n${error}`);
        }
    };

    const handleAiExplainRequest = (e) => {
        const error = e.detail?.error;
        if (error) {
            handleSend(null, `Explain this error occurring in ${selectionContext?.activeFile || 'the current file'}. Why did it happen and how can I prevent it in the future?\n\nError: ${error}`);
        }
    };

    const handleExternalCommand = (e) => {
        const cmd = e.detail?.command;
        const context = e.detail?.context || selectionContext;
        
        if (cmd) {
            let fullPrompt = cmd;
            if (context?.selectedText) {
                fullPrompt = `I have selected this code:\n\`\`\`\n${context.selectedText}\n\`\`\`\n\nTask: ${cmd}`;
            } else if (context?.activeFile) {
                fullPrompt = `I am currently working on ${context.activeFile}.\n\nTask: ${cmd}`;
            }
            
            handleSend(null, fullPrompt);
        }
    };

    window.addEventListener('AI_FIX_REQUEST', handleAiFixRequest);
    window.addEventListener('AI_EXPLAIN_REQUEST', handleAiExplainRequest);
    window.addEventListener('AI_COMMAND_PALETTE_TRIGGER', handleExternalCommand);
    return () => {
        window.removeEventListener('AI_FIX_REQUEST', handleAiFixRequest);
        window.removeEventListener('AI_EXPLAIN_REQUEST', handleAiExplainRequest);
        window.removeEventListener('AI_COMMAND_PALETTE_TRIGGER', handleExternalCommand);
    };
  }, [selectionContext]);

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
  const handleSend = async (e, overrideInput) => {
    e?.preventDefault();
    let finalInput = overrideInput || input;
    
    // Slash Commands Handling
    if (finalInput.startsWith('/')) {
        const cmd = finalInput.split(' ')[0].toLowerCase();
        const args = finalInput.slice(cmd.length).trim();
        const contextHeader = selectionContext?.selectedText 
            ? `Regarding this code:\n\`\`\`\n${selectionContext.selectedText}\n\`\`\`\n\n`
            : (selectionContext?.activeFile ? `Regarding ${selectionContext.activeFile}:\n\n` : '');

        switch(cmd) {
            case '/fix': 
                finalInput = `${contextHeader}Analyze the current code and fix any bugs, logical errors, or anti-patterns. ${args}`;
                break;
            case '/docs':
                finalInput = `${contextHeader}Add comprehensive JSDoc/inline comments to this code. ${args}`;
                break;
            case '/refactor':
                finalInput = `${contextHeader}Refactor this code for better readability, performance, and modern syntax. ${args}`;
                break;
            case '/test':
                finalInput = `${contextHeader}Write a set of unit tests for this functionality. ${args}`;
                break;
        }
    }

    if ((!finalInput.trim() && attachments.length === 0) || loading) return;

    cancelSpeech();

    // Construct user message with attachments
    const userMsgContent = {
        text: input,
        attachments: attachments
    };

    // For display, we might just show text, or show an indicator
    const userMsg = { 
        role: 'user', 
        content: finalInput || (attachments.length > 0 ? `[Sent ${attachments.length} files]` : ''), 
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
        
        // --- SECURE CLIENT-SIDE DECREMENT ---
        if (user?.uid && aiCredits > 0) {
            try {
                await updateDoc(doc(db, 'users', user.uid), {
                    aiCredits: aiCredits - 1,
                    lastAiUsage: new Date().toISOString()
                });
            } catch (err) {
                console.error("Credit sync failed:", err);
            }
        }

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

  // Specialized renderer for generating images
  const ImageGenerator = ({ description }) => {
      const [imgUrl, setImgUrl] = useState(null);
      const [isGenerating, setIsGenerating] = useState(false);
      const [saved, setSaved] = useState(false);

      const generate = async () => {
          setIsGenerating(true);
          try {
              const res = await fetch('/api/generate-image', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ prompt: description, userId: user?.uid })
              });
              const data = await res.json();
              if (data.url) setImgUrl(data.url);
          } catch(e) {
             console.error(e);
          } finally {
             setIsGenerating(false);
          }
      };

      const saveToAssets = async () => {
          if (!imgUrl) return;
          try {
              const { ref, uploadBytes } = await import('firebase/storage');
              const { storage } = await import('../../lib/firebase'); // Updated path
              const res = await fetch(imgUrl);
              const blob = await res.blob();
              const sRef = ref(storage, `users/${user.uid}/uploads/ai_${Date.now()}.png`);
              await uploadBytes(sRef, blob);
              setSaved(true);
          } catch (e) {
              console.error(e);
          }
      };

      if (imgUrl) {
          return (
              <div style={{ marginTop: '10px', background: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <img src={imgUrl} alt="Generated" style={{ width: '100%', borderRadius: '4px', marginBottom: '10px' }} />
                  <button onClick={saveToAssets} disabled={saved} style={{ width: '100%', padding: '8px', background: saved ? 'rgba(0, 255, 128, 0.2)' : 'rgba(0, 240, 255, 0.2)', color: saved ? '#00ff80' : '#00f0ff', border: saved ? '1px solid #00ff80' : '1px solid #00f0ff', borderRadius: '4px', cursor: saved ? 'default' : 'pointer', fontWeight: 'bold' }}>
                      {saved ? 'Saved to Asset Depot' : 'Add to Asset Depot'}
                  </button>
              </div>
          );
      }

      return (
          <button onClick={generate} disabled={isGenerating} style={{ marginTop: '10px', width: '100%', padding: '8px', background: 'rgba(208, 0, 255, 0.1)', color: '#d000ff', border: '1px solid rgba(208, 0, 255, 0.3)', borderRadius: '4px', cursor: isGenerating ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s' }} onMouseOver={e => !isGenerating && (e.currentTarget.style.background = 'rgba(208,0,255,0.2)')} onMouseOut={e => !isGenerating && (e.currentTarget.style.background = 'rgba(208,0,255,0.1)')}>
              <Sparkles size={14} /> {isGenerating ? 'Synthesizing...' : `Generate: "${description}"`}
          </button>
      )
  };

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
                <motion.div 
                    key={`${keyPrefix}-${i}`} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="code-block-wrapper group/code relative"
                >
                    <div className="code-header flex items-center justify-between px-3 py-2 bg-white/5 border-b border-white/10 rounded-t-lg">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{part.lang}</span>
                        <Button 
                            isIconOnly 
                            size="sm" 
                            variant="light" 
                            className="h-6 w-6 text-white/20 hover:text-[#00f0ff] opacity-0 group-hover/code:opacity-100 transition-opacity"
                            onClick={() => {
                                navigator.clipboard.writeText(part.content);
                            }}
                        >
                            <Copy size={12} />
                        </Button>
                    </div>
                    <div className="code-container bg-[#050505] p-3 rounded-b-lg overflow-x-auto border-x border-b border-white/5">
                        <pre className={`language-${part.lang} text-xs font-mono leading-relaxed`}>
                            <code className="text-[#00f0ff]/80">{part.content}</code>
                        </pre>
                    </div>
                </motion.div>
              );
          } else {
              return <span key={`${keyPrefix}-${i}`} dangerouslySetInnerHTML={{ 
                  __html: part.content
                      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
                      .replace(/\*(.*?)\*/g, '<i>$1</i>')
                      .replace(/`(.*?)`/g, '<code class="inline-code">$1</code>')
                      .replace(/\n/g, '<br/>')
              }} />;
          }
      });
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
                      <div className="text-content">{renderMarkdownChunk(data.message, 'msg')}</div>
                      
                      {data.action === 'GENERATE_IMAGE' && data.data?.description && (
                          <ImageGenerator description={data.data.description} />
                      )}

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
              return <div className="text-content">{renderMarkdownChunk(content, 'fallback')}</div>;
          }
      }

      // User messages
      return <div className="text-content">{renderMarkdownChunk(content, 'user')}</div>;
  };

  return (
    <div className="copilot-container">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-white/5 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-2">
            <Sparkles className="text-[#00f0ff] drop-shadow-[0_0_5px_rgba(0,240,255,0.4)]" size={16} />
            <h2 className="text-[10px] font-black tracking-widest text-white/90 uppercase">NEX AI ARCT</h2>
        </div>
        <div className="flex items-center gap-2">
            {aiCredits !== null && (
                <Badge.Root>
                    <Badge.Label 
                        content={aiCredits} 
                        color="primary" 
                        variant="flat" 
                        size="sm"
                        className="bg-[#00f0ff]/10 text-[#00f0ff] border-none font-black"
                    >
                        <div className="p-1 px-2 flex items-center gap-1">
                            <Rocket size={10} className="text-[#00f0ff]" />
                        </div>
                    </Badge.Label>
                </Badge.Root>
            )}
            {selectionContext?.selectedText && (
                <Tooltip content={`Selection active in ${selectionContext.activeFile}`}>
                    <Chip 
                        size="sm" 
                        variant="flat" 
                        className="bg-[#00f0ff]/20 text-[#00f0ff] h-7 border border-[#00f0ff]/30 animate-pulse"
                        startContent={<Layout size={12} />}
                    >
                        SELECTED
                    </Chip>
                </Tooltip>
            )}
            <Dropdown.Root placement="bottom-end">
                <Dropdown.Trigger>
                    <Button 
                        size="sm" 
                        variant="flat" 
                        className="bg-white/5 text-white/60 min-w-fit px-2 h-7 text-[10px]"
                        endContent={<ChevronDown size={12} />}
                    >
                        {models.find(m => m.id === selectedModel)?.name || 'Model'}
                    </Button>
                </Dropdown.Trigger>
                <Dropdown.Popover className="bg-[#111] border border-white/10">
                    <Dropdown.Menu 
                        aria-label="Model Selection"
                        selectedKeys={[selectedModel]}
                        onSelectionChange={(keys) => setSelectedModel(Array.from(keys)[0])}
                        selectionMode="single"
                    >
                        {models.map(m => (
                            <Dropdown.Item key={m.id}>{m.name}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown.Root>
            <Button
                isIconOnly
                size="sm"
                variant="light"
                onClick={toggleVoice}
                className={voiceEnabled ? 'text-[#00f0ff]' : 'text-white/40'}
            >
                {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollShadow ref={scrollRef} className="flex-1 p-4 flex flex-col gap-6 no-scrollbar" hideScrollBar>
          <AnimatePresence initial={false}>
              {messages.map((m, idx) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                      duration: 0.4, 
                      delay: idx === messages.length - 1 ? 0 : idx * 0.05,
                      ease: [0.16, 1, 0.3, 1] 
                  }}
                  className={`flex w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[90%] sm:max-w-[85%] flex flex-col gap-2 ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-2 px-1">
                        {m.role === 'user' ? (
                            <>
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-tight">YOU</span>
                                <Avatar.Root size="sm" className="w-5 h-5 border border-white/20">
                                    <Avatar.Fallback className="bg-white/5"><User size={12} /></Avatar.Fallback>
                                </Avatar.Root>
                            </>
                        ) : (
                            <>
                                <Avatar.Root size="sm" className="w-5 h-5 border border-[#00f0ff]/20 bg-[#00f0ff]/5">
                                    <Avatar.Fallback className="bg-transparent"><Bot size={12} className="text-[#00f0ff]" /></Avatar.Fallback>
                                </Avatar.Root>
                                <span className="text-[10px] font-black text-[#00f0ff] uppercase tracking-tight">NEX AI</span>
                            </>
                        )}
                    </div>
                    
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-2xl border transition-all duration-300 ${
                        m.role === 'user' 
                        ? 'bg-gradient-to-br from-indigo-600/90 to-violet-700/90 text-white border-white/10 rounded-tr-none' 
                        : 'bg-white/5 backdrop-blur-3xl text-white/90 border-white/10 rounded-tl-none hover:bg-white/10'
                    }`}>
                        <MessageContent content={m.content} role={m.role} />
                    </div>
                    
                    {m.role === 'error' && <Chip color="danger" variant="flat" size="sm" className="mt-1">Neural Connection Lost</Chip>}
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>

        {loading && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-3 p-4 items-center"
          >
            <div className="w-6 h-6 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/20 flex items-center justify-center animate-pulse">
                <Bot size={12} className="text-[#00f0ff]" />
            </div>
            <div className="flex gap-1.5 items-center bg-white/5 p-2 px-3 rounded-full border border-white/5">
              <motion.span 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                className="w-1.5 h-1.5 bg-[#00f0ff] rounded-full"
              ></motion.span>
              <motion.span 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                className="w-1.5 h-1.5 bg-[#00f0ff] rounded-full"
              ></motion.span>
              <motion.span 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                className="w-1.5 h-1.5 bg-[#00f0ff] rounded-full"
              ></motion.span>
            </div>
          </motion.div>
        )}
      </ScrollShadow>

      {/* Attachments Preview */}
      {attachments.length > 0 && (
          <ScrollShadow orientation="horizontal" className="flex gap-2 p-3 bg-black/60 border-t border-white/5 no-scrollbar">
              {attachments.map((file, index) => (
                  <Chip 
                    key={index} 
                    onClose={() => removeAttachment(index)} 
                    variant="flat" 
                    className="bg-white/5 border border-white/10 text-white/70 h-7"
                    size="sm"
                  >
                        {file.name}
                  </Chip>
              ))}
          </ScrollShadow>
      )}

      {/* Input */}
      <div className="p-4 bg-black/60 border-t border-white/5 backdrop-blur-2xl">
        <div className="relative group">
          <TextArea
            value={input}
            onValueChange={setInput}
            placeholder={isListening ? "Listening..." : "Describe a component..."}
            minRows={1}
            maxRows={8}
            variant="bordered"
            radius="lg"
            classNames={{
                base: "max-w-full",
                input: "text-sm sm:text-base pr-20",
                inputWrapper: "bg-white/5 border-white/10 group-data-[focus=true]:border-[#00f0ff]/50 transition-all",
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !loading) {
                e.preventDefault();
                handleSend(e);
              }
            }}
          />
          
          <input 
              type="file" 
              ref={fileInputRef}
              className="hidden"
              multiple
              onChange={handleFileSelect}
          />

          <div className="absolute right-2 bottom-2 flex gap-1 z-10">
            <Button
                isIconOnly
                size="sm"
                variant="light"
                onClick={() => fileInputRef.current?.click()}
                className="text-white/30 hover:text-white"
            >
                <Paperclip size={18} />
            </Button>
            <Button
                isIconOnly
                size="sm"
                variant="light"
                onClick={toggleListening}
                className={isListening ? 'text-[#00f0ff] animate-pulse' : 'text-white/30'}
            >
                <Mic size={18} />
            </Button>
            <Button
                isIconOnly
                size="sm"
                className="bg-[#00f0ff]/10 text-[#00f0ff] hover:bg-[#00f0ff]/20 disabled:opacity-20"
                onClick={handleSend}
                isLoading={loading}
                isDisabled={!input.trim() && attachments.length === 0}
            >
                {!loading && <Send size={18} />}
            </Button>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .copilot-container {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;
            background: rgba(5, 5, 5, 0.95);
            backdrop-filter: blur(20px);
            border-left: 1px solid rgba(255, 255, 255, 0.08);
            color: #e2e8f0;
            overflow: hidden;
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
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
        }

        /* Code Blocks */
        .code-block-wrapper { margin: 15px 0; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; overflow: hidden; background: #011627; }
        .code-header { background: rgba(255,255,255,0.05); padding: 5px 15px; display: flex; justify-content: space-between; font-size: 10px; color: #888; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .code-container { display: flex; position: relative; }
        .code-container .line-numbers { 
            padding: 15px 0; 
            text-align: right; 
            background: rgba(0,0,0,0.3); 
            border-right: 1px solid rgba(255,255,255,0.05); 
            color: #444; 
            font-family: inherit; 
            font-size: 13px; 
            line-height: inherit; 
            user-select: none; 
            min-width: 40px;
            padding-right: 10px;
            flex-shrink: 0;
        }
        .code-container .line-number { height: 1.5em; display: flex; align-items: center; justify-content: flex-end; }
        .code-container pre { flex: 1; margin: 0 !important; border-radius: 0 !important; background: transparent !important; padding: 15px !important; line-height: 1.5; overflow-x: auto; }
        .code-container pre code { font-family: "Fira Code", monospace !important; font-size: 13px !important; }
        .inline-code { background: rgba(255,255,255,0.1); padding: 2px 5px; border-radius: 4px; font-family: monospace; color: #00f0ff; }
      `}</style>
    </div>
  );
});

AICopilot.displayName = 'AICopilot';

export default AICopilot;

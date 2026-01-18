'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Bot, User, ChevronRight, X } from 'lucide-react';

export default function AICopilot({ onApplyCode }) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: "I'm your Nexus AI Assistant. Describe the component or page you want to build, and I'll generate the code for you!"
      }
    ],
    body: {
      context: 'Mr Build Editor - Generating Tailwind CSS Components'
    }
  });

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const extractCode = (text) => {
    const match = text.match(/```(?:html|jsx|tsx|css)?\n([\s\S]*?)```/);
    return match ? match[1] : null;
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0c] border-l border-purple-500/20 w-80 shadow-2xl">
      <div className="p-4 border-b border-purple-500/20 flex items-center justify-between bg-gradient-to-r from-purple-900/10 to-transparent">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
          <h2 className="text-sm font-bold tracking-wider text-white uppercase italic">Magic Build AI</h2>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth custom-scrollbar">
        <AnimatePresence>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3 text-[13px] leading-relaxed shadow-lg ${
                  m.role === 'user'
                    ? 'bg-purple-600 text-white rounded-tr-none'
                    : 'bg-[#151518] border border-white/5 text-gray-200 rounded-tl-none'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5 opacity-50">
                  {m.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                  <span className="text-[10px] font-medium uppercase tracking-widest">
                    {m.role === 'user' ? 'You' : 'Nexus AI'}
                  </span>
                </div>
                {m.content}
                
                {m.role === 'assistant' && extractCode(m.content) && (
                  <button
                    onClick={() => onApplyCode(extractCode(m.content))}
                    className="mt-3 w-full py-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg text-white font-bold text-[11px] uppercase tracking-tighter hover:opacity-90 transition-all flex items-center justify-center gap-2 border border-white/10"
                  >
                    Apply to Canvas <ChevronRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#151518] border border-white/5 p-3 rounded-2xl rounded-tl-none">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-[#0a0a0c] border-t border-purple-500/10">
        <div className="relative group">
          <input
            className="w-full bg-[#151518] border border-white/10 rounded-xl py-3 pl-4 pr-12 text-[13px] text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-gray-600 group-hover:border-white/20"
            value={input}
            placeholder="Describe a component..."
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !isLoading && input?.trim()) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <button
            type="button"
            onClick={(e) => {
              if (!isLoading && input?.trim()) {
                handleSubmit(e);
              }
            }}
            disabled={isLoading || !input?.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-purple-600/20 text-purple-400 hover:bg-purple-600 hover:text-white disabled:opacity-30 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

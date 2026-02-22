'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const SystemTerminal = ({ logs = [], height = '200px' }) => {
  const scrollRef = useRef(null);
  const [displayedLogs, setDisplayedLogs] = useState([]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedLogs]);

  // Simulate incoming data stream
  useEffect(() => {
    setDisplayedLogs(logs);
  }, [logs]);

  return (
    <div className="terminal-container" style={{ height }}>
      <div className="scanline" />
      <div className="terminal-header">
        <span className="blink">●</span> LIVE SYSTEM FEED // SECURE CHANNEL_01
      </div>
      <div className="terminal-body" ref={scrollRef}>
        {displayedLogs.length === 0 ? (
            <div className="entry system">
                <span className="timestamp">{new Date().toLocaleTimeString()}</span>
                <span className="msg">INITIALIZING OPTIC-ZERO PROTOCOLS...</span>
            </div>
        ) : displayedLogs.map((log, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`entry ${log.type || 'info'}`}
          >
            <span className="timestamp">[{new Date(log.timestamp || Date.now()).toLocaleTimeString()}]</span>
            <span className="prefix">{log.source || 'SYS'} ::</span>
            <span className="msg">{log.message}</span>
          </motion.div>
        ))}
        <div className="cursor">_</div>
      </div>

      <style jsx>{`
        .terminal-container {
            background: rgba(15, 23, 42, 0.4);
            border-radius: 12px;
            padding: 0;
            font-family: 'Roboto Mono', 'Courier New', monospace;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            height: 100%;
        }
        .scanline {
            display: none;
        }
        .terminal-header {
            background: linear-gradient(90deg, rgba(255, 255, 255, 0.1), transparent);
            color: #f8fafc;
            padding: 12px 16px;
            font-size: 0.85rem;
            font-weight: 500;
            letter-spacing: 0.5px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            font-family: 'Inter', 'Roboto', sans-serif;
            backdrop-filter: blur(10px);
        }
        .blink { display: inline-block; width: 8px; height: 8px; background: #a855f7; border-radius: 50%; margin-right: 8px; box-shadow: 0 0 10px rgba(168, 85, 247, 0.5); }
        
        .terminal-body {
            flex: 1;
            padding: 16px;
            overflow-y: auto;
            color: #cbd5e1;
            font-size: 0.85rem;
            background: transparent;
        }
        .terminal-body::-webkit-scrollbar { width: 4px; }
        .terminal-body::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 4px; }

        .entry { margin-bottom: 6px; display: flex; gap: 12px; }
        .entry.error { color: #fca5a5; }
        .entry.warning { color: #fde047; }
        .entry.success { color: #4ade80; }
        
        .timestamp { color: #64748b; }
        .prefix { font-weight: 600; color: #f8fafc; min-width: 60px; }
        
        .cursor { display: inline-block; animation: flicker 0.5s infinite; }
      `}</style>
    </div>
  );
};

export default SystemTerminal;

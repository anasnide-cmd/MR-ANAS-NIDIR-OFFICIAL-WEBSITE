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
            background: #000;
            border: 1px solid var(--cia-accent);
            padding: 0;
            font-family: 'Courier New', monospace;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        .scanline {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(to bottom, transparent, var(--scanline) 50%, transparent);
            background-size: 100% 4px;
            pointer-events: none;
            z-index: 10;
        }
        .terminal-header {
            background: var(--cia-accent);
            color: #000;
            padding: 5px 10px;
            font-size: 0.7rem;
            font-weight: 800;
            letter-spacing: 1px;
            border-bottom: 1px solid var(--cia-accent);
        }
        .blink { animation: flicker 1s infinite; margin-right: 5px; color: #ff0000; }
        
        .terminal-body {
            flex: 1;
            padding: 10px;
            overflow-y: auto;
            color: var(--cia-accent);
            font-size: 0.8rem;
        }
        .terminal-body::-webkit-scrollbar { width: 4px; }
        .terminal-body::-webkit-scrollbar-thumb { background: var(--cia-accent); }

        .entry { margin-bottom: 4px; display: flex; gap: 8px; }
        .entry.error { color: var(--cia-alert); }
        .entry.warning { color: var(--cia-warn); }
        .entry.success { color: var(--cia-success); }
        
        .timestamp { opacity: 0.5; }
        .prefix { font-weight: bold; opacity: 0.8; }
        
        .cursor { display: inline-block; animation: flicker 0.5s infinite; }
      `}</style>
    </div>
  );
};

export default SystemTerminal;

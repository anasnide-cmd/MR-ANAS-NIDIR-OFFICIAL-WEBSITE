'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function NexusCommand() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "EXPLORE", href: "#projects" },
    { label: "PRICING", href: "#pricing" },
    { label: "ARCHIVES", href: "/savoirpedia" },
    { label: "COMMUNITY", href: "#community" },
    { label: "CONTACT", href: "#contact" }
  ];

  return (
    <div className="nexus-command-system">
      <motion.button 
        className={`command-orb ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="orb-inner"></div>
        <div className="orb-rings">
          <div className="ring"></div>
          <div className="ring"></div>
        </div>
      </motion.button>

      {isOpen && (
        <div className="command-overlay" onClick={() => setIsOpen(false)}>
          <motion.div 
            className="command-menu glass"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="menu-header">
              <span className="terminal-prompt">NEXUS_COMMAND_HUB_V1.0</span>
              <div className="scanline"></div>
            </div>
            <nav className="menu-links">
              {menuItems.map((item, i) => (
                <a 
                  key={i} 
                  href={item.href} 
                  className="menu-item"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="item-num">0{i+1}</span>
                  <span className="item-label">{item.label}</span>
                  <div className="item-bar"></div>
                </a>
              ))}
            </nav>
          </motion.div>
        </div>
      )}

      <style jsx>{`
        .nexus-command-system {
          position: fixed;
          bottom: 40px;
          right: 40px;
          z-index: 99999;
        }
        .command-orb {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #000;
          border: 1px solid rgba(0, 240, 255, 0.4);
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 30px rgba(0, 240, 255, 0.2);
        }
        .orb-inner {
          width: 20px;
          height: 20px;
          background: #00f0ff;
          border-radius: 50%;
          box-shadow: 0 0 20px #00f0ff;
          position: relative;
          z-index: 2;
        }
        .ring {
          position: absolute;
          inset: -10px;
          border: 1px solid rgba(0, 240, 255, 0.2);
          border-radius: 50%;
          animation: orbRotate 10s linear infinite;
        }
        .ring:nth-child(2) {
          inset: -20px;
          animation-duration: 15s;
          animation-direction: reverse;
        }
        @keyframes orbRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .command-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: -1;
        }
        .command-menu {
          width: 400px;
          padding: 40px;
          border-radius: 4px;
          background: rgba(0, 5, 10, 0.95) !important;
          border-color: rgba(0, 240, 255, 0.4) !important;
          position: relative;
        }
        .menu-header {
          padding-bottom: 20px;
          margin-bottom: 30px;
          border-bottom: 1px solid rgba(0, 240, 255, 0.2);
          position: relative;
        }
        .terminal-prompt {
          font-family: monospace;
          font-size: 0.7rem;
          color: #00f0ff;
          letter-spacing: 2px;
        }
        .menu-links {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .menu-item {
          display: flex;
          align-items: center;
          gap: 20px;
          text-decoration: none;
          color: #fff;
          padding: 15px;
          position: relative;
          transition: all 0.3s;
        }
        .item-num {
          font-family: monospace;
          font-size: 0.7rem;
          color: rgba(0, 240, 255, 0.5);
        }
        .item-label {
          font-size: 1.2rem;
          font-weight: 900;
          letter-spacing: 4px;
        }
        .item-bar {
          position: absolute;
          bottom: 0;
          left: 15px;
          right: 15px;
          height: 1px;
          background: linear-gradient(90deg, #00f0ff, transparent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s;
        }
        .menu-item:hover .item-bar {
          transform: scaleX(1);
        }
        .menu-item:hover {
          background: rgba(0, 240, 255, 0.05);
          padding-left: 25px;
        }
      `}</style>
    </div>
  );
}

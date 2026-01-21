'use client';

import { useState, useEffect } from 'react';

export default function PresenceDisplay() {
  const [count, setCount] = useState(124);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        const change = Math.floor(Math.random() * 3) - 1;
        return prev + change;
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pulse-matrix">
      <div className="neural-node">
        <div className="core"></div>
        <div className="ring ring-1"></div>
        <div className="ring ring-2"></div>
        <div className="ring ring-3"></div>
      </div>
      <div className="presence-info">
        <span className="count">{count}</span>
        <span className="label">LIVE NODES</span>
      </div>

      <style jsx>{`
        .pulse-matrix {
          display: inline-flex;
          align-items: center;
          gap: 15px;
          padding: 10px 20px;
          background: rgba(0, 240, 255, 0.02);
          border: 1px solid rgba(0, 240, 255, 0.2);
          border-radius: 4px;
          position: relative;
          overflow: hidden;
        }
        .neural-node {
          position: relative;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .core {
          width: 6px;
          height: 6px;
          background: #00f0ff;
          border-radius: 50%;
          box-shadow: 0 0 15px #00f0ff;
          z-index: 2;
        }
        .ring {
          position: absolute;
          border: 1px solid rgba(0, 240, 255, 0.3);
          border-radius: 50%;
          animation: pulseRing 3s ease-out infinite;
        }
        .ring-1 { width: 10px; height: 10px; animation-delay: 0s; }
        .ring-2 { width: 18px; height: 18px; animation-delay: 1s; }
        .ring-3 { width: 24px; height: 24px; animation-delay: 2s; }

        @keyframes pulseRing {
          0% { transform: scale(0.5); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: scale(2); opacity: 0; }
        }
        
        .presence-info {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }
        .count {
          font-size: 1.1rem;
          font-weight: 950;
          color: #fff;
          font-family: monospace;
          letter-spacing: 1px;
        }
        .label {
          font-size: 0.5rem;
          font-weight: 950;
          letter-spacing: 3px;
          color: rgba(0, 240, 255, 0.5);
          text-transform: uppercase;
          margin-top: 4px;
        }
      `}</style>
    </div>
  );
}

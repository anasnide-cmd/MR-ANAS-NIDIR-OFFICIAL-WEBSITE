'use client';
import React from 'react';
import { reportError } from '../lib/logger';

class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorId: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to Firestore
    reportError(error, 'GlobalErrorBoundary', {
      componentStack: errorInfo.componentStack
    });
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-screen">
          <div className="error-box">
            <div className="icon">⚠️</div>
            <h1>CRITICAL SYSTEM FAILURE</h1>
            <p>An unexpected anomaly has caused the interface to crash.</p>
            <p className="sub-text">This event has been logged to the Central Mainframe.</p>
            <button onClick={() => window.location.reload()} className="reload-btn">
              REBOOT INTERFACE
            </button>
          </div>
          <style jsx>{`
            .error-screen {
              height: 100vh;
              width: 100vw;
              background: #000;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #fff;
              position: fixed;
              top: 0; left: 0;
              z-index: 99999;
            }
            .error-box {
              text-align: center;
              border: 1px solid #ff3232;
              padding: 40px;
              border-radius: 20px;
              background: rgba(255, 50, 50, 0.05);
              box-shadow: 0 0 50px rgba(255, 50, 50, 0.2);
              max-width: 500px;
            }
            .icon { font-size: 4rem; margin-bottom: 20px; }
            h1 { 
              font-family: var(--font-orbitron); 
              color: #ff3232; 
              margin-bottom: 15px;
              letter-spacing: 2px;
            }
            p { color: rgba(255, 255, 255, 0.7); margin-bottom: 10px; }
            .sub-text { font-size: 0.8rem; opacity: 0.85; margin-bottom: 30px; }
            .reload-btn {
              background: #ff3232;
              color: #000;
              border: none;
              padding: 15px 30px;
              font-weight: 900;
              letter-spacing: 2px;
              cursor: pointer;
              transition: all 0.3s;
            }
            .reload-btn:hover { background: #fff; transform: scale(1.05); }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;

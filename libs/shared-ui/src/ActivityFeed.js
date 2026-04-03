'use client';

import { useState, useEffect } from 'react';

const MOCK_EVENTS = [
  "New site deployed on MR BUILD by user_482",
  "NEX AI handled 1.2k queries in the last hour",
  "SavoirPedia updated: 'The Future of Neural Networks'",
  "MR SEARCH indexed 450 new pages",
  "ANAS GPT upgraded to v4.2.0-nebula",
  "System health check: 100% uptime across all nodes",
  "New user joined the Nexus Universe",
  "MR SHOP: 5 new digital assets listed",
  "Global Signal: Optimization complete in EU-West-1",
  "NEXENGINE reached 1 million total requests"
];

export default function ActivityFeed() {
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }, []);

  return (
    <div className="activity-ticker">
      <div className="ticker-label">
        <div className="live-dot"></div>
        <span>GLOBAL SIGNAL</span>
      </div>
      <div className="ticker-wrap">
        <div className="ticker-move">
          {events.concat(events).map((event, i) => (
            <div key={i} className="ticker-item">
              <span className="ticker-time">{currentTime}</span>
              <span className="ticker-text">{event}</span>
              <span className="ticker-sep">/ /</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .activity-ticker {
          display: flex;
          align-items: center;
          height: 40px;
          background: rgba(0, 240, 255, 0.05);
          border-y: 1px solid rgba(0, 240, 255, 0.1);
          overflow: hidden;
          width: 100%;
          backdrop-filter: blur(10px);
        }
        .ticker-label {
          padding: 0 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.65rem;
          font-weight: 900;
          letter-spacing: 2px;
          color: #00f0ff;
          background: #000;
          height: 100%;
          z-index: 2;
          border-right: 1px solid rgba(0, 240, 255, 0.2);
        }
        .live-dot {
          width: 6px;
          height: 6px;
          background: #ff0055;
          border-radius: 50%;
          box-shadow: 0 0 10px #ff0055;
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
        .ticker-wrap {
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
        }
        .ticker-move {
          display: inline-block;
          padding-left: 100%;
          animation: ticker 60s linear infinite;
        }
        .ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 15px;
          padding: 0 20px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.8rem;
        }
        .ticker-time {
          color: #00f0ff;
          font-family: monospace;
          opacity: 0.6;
        }
        .ticker-sep {
          color: rgba(0, 240, 255, 0.3);
          font-weight: 900;
        }
        @keyframes ticker {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
        .ticker-wrap:hover .ticker-move {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

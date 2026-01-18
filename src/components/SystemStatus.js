'use client';

import { useState, useEffect } from 'react';

export default function SystemStatus() {
  const [metrics, setMetrics] = useState({
    latency: 42,
    uptime: 99.99,
    activeUsers: 124,
    buildSuccess: 98.4
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        latency: Math.floor(40 + Math.random() * 10),
        uptime: 99.98 + (Math.random() * 0.02),
        activeUsers: prev.activeUsers + (Math.random() > 0.5 ? 1 : -1),
        buildSuccess: 98 + (Math.random() * 1)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: "GLOBE LATENCY", value: `${metrics.latency}ms`, trend: "optimal" },
    { label: "CORE UPTIME", value: `${metrics.uptime.toFixed(2)}%`, trend: "stable" },
    { label: "ACTIVE SESSIONS", value: metrics.activeUsers, trend: "up" },
    { label: "BUILD RELIABILITY", value: `${metrics.buildSuccess.toFixed(1)}%`, trend: "high" }
  ];

  return (
    <div className="system-status-container">
      <div className="status-grid">
        {stats.map((stat, i) => (
          <div key={i} className="status-card glass">
            <span className="status-label">{stat.label}</span>
            <span className="status-value">{stat.value}</span>
            <div className={`status-trend ${stat.trend}`}>
              {stat.trend.toUpperCase()}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .system-status-container {
          width: 100%;
          margin: 40px 0;
        }
        .status-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }
        .status-card {
          padding: 25px;
          border-radius: 12px;
          border: 1px solid rgba(0, 240, 255, 0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          background: rgba(0, 0, 0, 0.3);
          transition: border-color 0.3s;
        }
        .status-card:hover {
          border-color: rgba(0, 240, 255, 0.4);
        }
        .status-label {
          font-size: 0.65rem;
          font-weight: 900;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 10px;
        }
        .status-value {
          font-size: 1.8rem;
          font-weight: 900;
          color: #fff;
          margin-bottom: 8px;
          font-family: 'Inter', sans-serif;
        }
        .status-trend {
          font-size: 0.6rem;
          font-weight: 900;
          letter-spacing: 1px;
          padding: 4px 10px;
          border-radius: 4px;
        }
        .optimal { background: rgba(0, 255, 240, 0.1); color: #00f0ff; }
        .stable { background: rgba(0, 255, 100, 0.1); color: #00ff64; }
        .up { background: rgba(255, 200, 0, 0.1); color: #ffc800; }
        .high { background: rgba(0, 240, 255, 0.1); color: #00f0ff; }

        @media (max-width: 600px) {
          .status-grid {
            grid-template-columns: 1fr 1fr;
          }
          .status-value { font-size: 1.4rem; }
        }
      `}</style>
    </div>
  );
}

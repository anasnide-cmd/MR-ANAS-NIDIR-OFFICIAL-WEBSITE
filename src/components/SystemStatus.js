'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

function HolographicCard({ stat, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { damping: 20, stiffness: 200 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { damping: 20, stiffness: 200 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className={`status-card holographic ${stat.trend === 'pro' ? 'pro-card' : ''}`}
    >
      <div className="scanline"></div>
      <div className="card-glitch-border"></div>
      <span className="status-label">{stat.label}</span>
      <span className="status-value">{stat.value}</span>
      <div className={`status-trend ${stat.trend}`}>
        {stat.trend.toUpperCase()}
      </div>
    </motion.div>
  );
}

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
    { label: "BUILD RELIABILITY", value: `${metrics.buildSuccess.toFixed(1)}%`, trend: "high" },
    { label: "PRIORITY LANE", value: "ACTIVE", trend: "pro" },
    { label: "PRO NODES", value: "ONLINE", trend: "pro" }
  ];

  return (
    <div className="system-status-container">
      <div className="status-grid">
        {stats.map((stat, i) => (
          <HolographicCard key={i} stat={stat} index={i} />
        ))}
      </div>

      <style jsx>{`
        .system-status-container {
          width: 100%;
          margin: 40px 0;
        }
        .status-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 25px;
        }
        .status-card {
          padding: 30px 20px;
          border-radius: 4px;
          border: 1px solid rgba(0, 240, 255, 0.2);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          background: rgba(0, 240, 255, 0.02);
          position: relative;
          overflow: hidden;
          transition: background 0.3s;
        }
        .holographic::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(0, 240, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.05) 1px, transparent 1px);
          background-size: 10px 10px;
          opacity: 0.2;
          pointer-events: none;
        }
        .scanline {
          position: absolute;
          width: 100%;
          height: 2px;
          background: rgba(0, 240, 255, 0.1);
          top: 0;
          animation: scan 3s linear infinite;
          pointer-events: none;
        }
        @keyframes scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        .status-card:hover {
          background: rgba(0, 240, 255, 0.05);
          border-color: rgba(0, 240, 255, 0.6);
        }
        .pro-card {
          border-color: rgba(255, 215, 0, 0.4);
          background: rgba(255, 215, 0, 0.02);
        }
        .pro-card .scanline { background: rgba(255, 215, 0, 0.2); }
        .status-label {
          font-size: 0.6rem;
          font-weight: 950;
          letter-spacing: 3px;
          color: rgba(0, 240, 255, 0.5);
          margin-bottom: 15px;
        }
        .pro-card .status-label { color: rgba(255, 215, 0, 0.5); }
        .status-value {
          font-size: 1.8rem;
          font-weight: 900;
          color: #fff;
          margin-bottom: 12px;
          text-shadow: 0 0 10px rgba(0, 240, 255, 0.3);
        }
        .pro-card .status-value { text-shadow: 0 0 10px rgba(255, 215, 0, 0.3); }
        .status-trend {
          font-size: 0.55rem;
          font-weight: 950;
          letter-spacing: 2px;
          padding: 4px 12px;
          border: 1px solid currentColor;
          border-radius: 20px;
        }
        .optimal { color: #00f0ff; background: rgba(0, 240, 255, 0.05); }
        .stable { color: #00ff64; background: rgba(0, 255, 100, 0.05); }
        .up { color: #ffc800; background: rgba(255, 200, 0, 0.05); }
        .high { color: #00f0ff; background: rgba(0, 240, 255, 0.05); }
        .pro { color: #ffd700; background: rgba(255, 215, 0, 0.05); }

        @media (max-width: 600px) {
          .status-grid { grid-template-columns: 1fr 1fr; }
          .status-value { font-size: 1.4rem; }
        }
      `}</style>
    </div>
  );
}

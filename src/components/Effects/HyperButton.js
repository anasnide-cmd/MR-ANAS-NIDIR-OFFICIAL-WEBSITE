'use client';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

export default function HyperButton({ children, href, className = "", gold = false }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * 0.4);
    y.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const contentX = useTransform(mouseX, val => val * 0.5);
  const contentY = useTransform(mouseY, val => val * 0.5);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY }}
      className={`hyper-btn-container ${gold ? 'gold' : ''} ${className}`}
    >
      <a href={href} className="hyper-btn">
        <motion.span style={{ x: contentX, y: contentY }}>
          {children}
        </motion.span>
        <div className={`liquid-glow ${isHovered ? 'active' : ''}`}></div>
      </a>
      
      <style jsx>{`
        .hyper-btn-container {
          position: relative;
          display: inline-block;
          z-index: 5;
        }
        .hyper-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px 45px;
          background: #fff;
          color: #000;
          text-decoration: none;
          font-weight: 950;
          font-size: 0.85rem;
          letter-spacing: 3px;
          border-radius: 4px;
          overflow: hidden;
          transition: background 0.3s;
        }
        .gold .hyper-btn {
          background: #ffd700;
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.2);
        }
        .hyper-btn span {
          position: relative;
          z-index: 2;
          display: block;
        }
        .liquid-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(0, 240, 255, 0.4), transparent 70%);
          transform: scale(0);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s;
          opacity: 0;
          pointer-events: none;
        }
        .gold .liquid-glow {
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.6), transparent 70%);
        }
        .liquid-glow.active {
          transform: scale(3);
          opacity: 1;
        }
      `}</style>
    </motion.div>
  );
}

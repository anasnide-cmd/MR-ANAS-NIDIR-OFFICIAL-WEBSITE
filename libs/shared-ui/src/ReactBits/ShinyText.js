'use client';
import { motion } from 'framer-motion';

export default function ShinyText({ text, disabled = false, speed = 3, className = '' }) {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`shiny-text ${className} ${disabled ? 'disabled' : ''}`}
      style={{
        backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        display: 'inline-block',
        color: '#b5b5b5a4', // Subdued base color
        animation: !disabled ? `shine ${animationDuration} linear infinite` : 'none',
      }}
    >
      {text}
      <style jsx>{`
        @keyframes shine {
          0% { background-position: 100%; }
          100% { background-position: -100%; }
        }
        .shiny-text {
            color: #b5b5b5a4;
            background-clip: text; /* Standard property */
            -webkit-background-clip: text; /* Vendor prefix */
        }
        .shiny-text.disabled {
            background-image: none !important; /* Ensure no gradient if disabled */
            animation: none !important;
        }
      `}</style>
    </div>
  );
}

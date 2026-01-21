'use client';
import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  const springX = useSpring(0, { damping: 20, stiffness: 250 });
  const springY = useSpring(0, { damping: 20, stiffness: 250 });

  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const handleMove = (e) => {
      springX.set(e.clientX);
      springY.set(e.clientY);
      
      const target = e.target;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer' || target.tagName === 'A' || target.tagName === 'BUTTON');
    };

    const handleDown = () => setIsClicked(true);
    const handleUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [springX, springY]);

  return (
    <motion.div
      className="custom-cursor"
      style={{
        left: springX,
        top: springY,
        scale: isClicked ? 0.8 : isPointer ? 1.5 : 1,
        borderColor: isClicked ? '#ff00c8' : isPointer ? '#00f0ff' : 'rgba(255,255,255,0.5)',
      }}
    >
      <div className="inner-dot"></div>
      <style jsx>{`
        .custom-cursor {
          position: fixed;
          width: 40px;
          height: 40px;
          border: 2px solid rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          pointer-events: none;
          z-index: 10000;
          transform: translate(-50%, -50%);
          transition: scale 0.3s, border-color 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .inner-dot {
          width: 4px;
          height: 4px;
          background: #00f0ff;
          border-radius: 50%;
          box-shadow: 0 0 10px #00f0ff;
        }
        @media (max-width: 768px) {
          .custom-cursor { display: none; }
        }
      `}</style>
    </motion.div>
  );
}

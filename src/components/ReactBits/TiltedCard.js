'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const TiltedCard = ({ 
  children, 
  className = '', 
  tiltStrength = 20, 
  glareOpacity = 0.4, 
  scaleOnHover = 1.05,
  mobile = false 
}) => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [tiltStrength, -tiltStrength]
  );
  
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [-tiltStrength, tiltStrength]
  );

  const glareBackground = useTransform(
    [mouseXSpring, mouseYSpring],
    ([xVal, yVal]) => `radial-gradient(circle at ${50 + xVal * 100}% ${50 + yVal * 100}%, rgba(255,255,255,0.8) 0%, transparent 50%)`
  );

  if (isMobile || mobile) {
      return <div className={`relative ${className}`}>{children}</div>;
  }

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
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
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: scaleOnHover }}
      className={`relative transition-all duration-200 ease-out ${className}`}
    >
      <div
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
        className="relative z-10 h-full"
      >
        {children}
      </div>

      {/* Glare Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay"
        style={{
          opacity: glareOpacity,
          background: glareBackground,
          borderRadius: 'inherit'
        }}
      />
    </motion.div>
  );
};

export default TiltedCard;

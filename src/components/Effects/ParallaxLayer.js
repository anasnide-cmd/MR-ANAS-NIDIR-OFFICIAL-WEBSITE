'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ParallaxLayer({ children, speed = 0.5, direction = 'vertical' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const range = direction === 'vertical' ? [100 * speed, -100 * speed] : [50 * speed, -50 * speed];
  const y = useTransform(scrollYProgress, [0, 1], range);
  const x = useTransform(scrollYProgress, [0, 1], direction === 'horizontal' ? range : [0, 0]);

  return (
    <motion.div ref={ref} style={{ y, x }}>
      {children}
    </motion.div>
  );
}

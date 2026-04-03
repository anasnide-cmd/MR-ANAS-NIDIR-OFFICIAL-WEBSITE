'use client';
import { motion } from 'framer-motion';

export default function ScrollReveal({ children, direction = 'up', delay = 0, distance = 50 }) {
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for premium feel
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px" }}
      variants={variants}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
}

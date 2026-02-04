'use client';
import { useEffect, useRef } from 'react';

export default function QuantumCore() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    // Cinematic Particle System
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      pulse: Math.random() * 0.02,
      opacity: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.8 ? '#ff00c8' : '#00f0ff'
    }));

    // Shooting Star Protocol
    let shootingStar = null;
    const spawnShootingStar = () => {
      shootingStar = {
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height / 2),
        vx: Math.random() * 15 + 10,
        vy: Math.random() * 5 + 2,
        life: 1.0
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Particles with soft glow
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.opacity += p.pulse;

        if (p.opacity > 0.8 || p.opacity < 0.2) p.pulse *= -1;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        
        // Add subtle refraction bloom
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
      });

      // Handle Shooting Stars
      if (shootingStar) {
        shootingStar.x += shootingStar.vx;
        shootingStar.y += shootingStar.vy;
        shootingStar.life -= 0.01;

        if (shootingStar.life <= 0) {
          shootingStar = null;
        } else {
          ctx.beginPath();
          const gradient = ctx.createLinearGradient(
            shootingStar.x, shootingStar.y,
            shootingStar.x - shootingStar.vx * 5, shootingStar.y - shootingStar.vy * 5
          );
          gradient.addColorStop(0, '#fff');
          gradient.addColorStop(1, 'transparent');
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(shootingStar.x - shootingStar.vx * 5, shootingStar.y - shootingStar.vy * 5);
          ctx.stroke();
        }
      } else if (Math.random() < 0.005) {
        spawnShootingStar();
      }

      ctx.shadowBlur = 0; // Reset for performance
      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="quantum-core-wrapper">
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div className="aurora-engine"></div>
      <style jsx>{`
        .quantum-core-wrapper {
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: radial-gradient(circle at center, rgba(112, 0, 255, 0.05) 0%, transparent 70%);
        }
        .aurora-engine {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, 
            rgba(0, 240, 255, 0.03) 0%, 
            rgba(255, 0, 200, 0.03) 50%, 
            rgba(0, 240, 255, 0.03) 100%
          );
          background-size: 400% 400%;
          animation: auroraFlow 20s ease infinite;
          mix-blend-mode: screen;
        }
        @keyframes auroraFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}

'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function Home() {
  const sectionsRef = useRef([]);
  const [settings, setSettings] = useState({
    heroTitle: 'MR ANAS NIDIR',
    heroSubtitle: 'Entrepreneur • Visionary • Digital Innovator',
    bioTitle: 'My Story',
    bioText1: 'Mr Anas Nidir is a tech entrepreneur, futurist, and digital architect. He is the founder of innovation-focused projects including NEXENGINE, NEX AI, and ANAS GPT.',
    bioText2: 'Since March 2025, he has been developing high-performance solutions from scratch — without relying on traditional tools or platforms.',
    quote: 'Simple is Power',
    contactEmail: 'ceo@anasnidir.com',
    tiktok: 'https://tiktok.com/@anasnide',
    instagram: 'https://www.instagram.com/anasnide',
    projects: [
      { icon: '⚡', title: 'NEXENGINE', desc: 'Independent web server system built for speed, privacy, and total control.', tag: 'Infrastructure' },
      { icon: '🤖', title: 'NEX AI', desc: 'Custom AI Chatbot Platform with advanced natural language processing.', tag: 'AI / ML' },
      { icon: '💬', title: 'ANAS GPT', desc: 'Advanced LLM Web Assistant for seamless human-AI interaction.', tag: 'AI Assistant' }
    ],
    products: [
      { name: 'Gumroad', url: 'https://anasnidir.gumroad.com/' }
    ]
  });

  useEffect(() => {
    // Fetch Settings
    const fetchSettings = async () => {
      const docRef = doc(db, 'settings', 'homepage');
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setSettings(snap.data());
      }
    };
    fetchSettings();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    sectionsRef.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* HERO */}
      <header className="hero" id="home">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <div className="logo-container">
            <div className="logo-ring"></div>
            <div className="logo-ring ring-2"></div>
            <div className="logo-glow">
              <img src="/assets/logo.jpg" alt="Logo" className="logo" />
            </div>
          </div>
          <h1 className="hero-title">
            <span className="gradient-text">{settings.heroTitle}</span>
          </h1>
          <p className="hero-subtitle">{settings.heroSubtitle}</p>
          <div className="hero-buttons">
            <Link href="#projects" className="btn primary">Explore Projects</Link>
            <Link href="/blog" className="btn secondary">Read Blog</Link>
          </div>
        </div>
        <div className="scroll-indicator">
          <span></span>
        </div>
      </header>

      {/* PROJECTS */}
      <section id="projects" className="section reveal" ref={el => sectionsRef.current[0] = el}>
        <h2 className="section-title">🚀 My Projects</h2>
        <p className="section-subtitle">Building the future, one innovation at a time</p>

        <div className="project-grid">
          {settings.projects.map((proj, i) => (
            <article key={i} className={`project-card ${i === 1 ? 'featured' : ''}`}>
              <div className="card-icon">{proj.icon}</div>
              <h3>{proj.title}</h3>
              <p>{proj.desc}</p>
              <span className="card-tag">{proj.tag}</span>
            </article>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="stat">
          <span className="stat-number">3+</span>
          <span className="stat-label">Active Projects</span>
        </div>
        <div className="stat">
          <span className="stat-number">2025</span>
          <span className="stat-label">Founded</span>
        </div>
        <div className="stat">
          <span className="stat-number">∞</span>
          <span className="stat-label">Possibilities</span>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section reveal" ref={el => sectionsRef.current[1] = el}>
        <h2 className="section-title">👤 About Me</h2>
        <div className="about-content">
          <p className="about-text">
            I'm <strong>Mr Anas Nidir</strong>, a builder of tech, AI systems, and futuristic platforms —
            driven by simplicity and independence. I believe in creating tools that empower,
            not restrict.
          </p>
        </div>
      </section>

      {/* BIO */}
      <section id="bio" className="section bio-section reveal" ref={el => sectionsRef.current[2] = el}>
        <div className="bio-container">
          <div className="bio-image-wrapper">
            <Image src="/assets/profile.jpg" alt="Mr Anas Nidir" width={280} height={280} className="bio-img" />
            <div className="bio-badge">Founder & CEO</div>
          </div>
          <div className="bio-text">
            <h2>{settings.bioTitle}</h2>
            <p>{settings.bioText1}</p>
            <p>{settings.bioText2}</p>
            <blockquote>"{settings.quote}"</blockquote>
          </div>
        </div>
      </section>

      <section id="products" className="section reveal" ref={el => sectionsRef.current[3] = el}>
        <h2 className="section-title">📚 Digital Products</h2>
        <p className="section-subtitle">Resources to help you build and grow</p>
        <div style={{ display: 'flex', gap: 15, justifyContent: 'center', flexWrap: 'wrap' }}>
          {settings.products.map((prod, i) => (
            <a key={i} href={prod.url} target="_blank" rel="noopener noreferrer" className="btn primary large">
              {prod.name} →
            </a>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section contact-section reveal" ref={el => sectionsRef.current[4] = el}>
        <h2 className="section-title">📨 Let's Connect</h2>
        <p className="section-subtitle">Have a project in mind? Let's talk.</p>
        <a href={`mailto:${settings.contactEmail}`} className="contact-email">{settings.contactEmail}</a>
        <div className="social-links">
          <a href={settings.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
          <a href={settings.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </section>

      <style jsx>{`
        /* Hero Section */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
          z-index: 0;
        }
        .hero-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.1) 0%, transparent 50%);
        }
        .hero-content {
          position: relative;
          z-index: 1;
          padding: 20px;
        }
        .logo-container {
          position: relative;
          display: inline-block;
          margin-bottom: 48px;
        }
        .logo-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 650px;
          height: 650px;
          border: 1px solid rgba(0, 240, 255, 0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: ring-rotate 10s linear infinite;
        }
        .logo-ring.ring-2 {
          width: 700px;
          height: 700px;
          border-color: rgba(0, 100, 224, 0.15);
          animation: ring-rotate 15s linear infinite reverse;
        }
        .logo-glow {
          position: relative;
          display: inline-block;
          border-radius: 20px;
          animation: float 4s ease-in-out infinite;
          box-shadow: 
            0 0 60px rgba(0, 240, 255, 0.3),
            0 0 120px rgba(0, 240, 255, 0.15);
        }
        .logo {
          max-width: 600px;
          height: auto;
          border-radius: 12px;
          display: block;
          transition: transform 0.4s ease;
        }
        .logo-glow:hover .logo {
          transform: scale(1.03);
        }
        .hero-title {
          font-size: clamp(2.5rem, 8vw, 4.5rem);
          margin: 0 0 16px;
          font-weight: 800;
          letter-spacing: -1px;
        }
        .gradient-text {
          background: linear-gradient(90deg, #00f0ff, #0064e0, #00f0ff);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        .hero-subtitle {
          font-size: 1.2rem;
          opacity: 0.8;
          margin-bottom: 32px;
        }
        .hero-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn {
          padding: 14px 32px;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
        }
        .btn.primary {
          background: linear-gradient(90deg, #00f0ff, #0064e0);
          color: #000;
        }
        .btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 240, 255, 0.3);
        }
        .btn.secondary {
          background: transparent;
          border: 2px solid #00f0ff;
          color: #00f0ff;
        }
        .btn.secondary:hover {
          background: rgba(0, 240, 255, 0.1);
        }
        .btn.large {
          padding: 18px 48px;
          font-size: 1.1rem;
        }
        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
        }
        .scroll-indicator span {
          display: block;
          width: 24px;
          height: 40px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 12px;
          position: relative;
        }
        .scroll-indicator span::before {
          content: '';
          position: absolute;
          top: 6px;
          left: 50%;
          width: 4px;
          height: 8px;
          background: #00f0ff;
          border-radius: 2px;
          transform: translateX(-50%);
          animation: scroll 1.5s infinite;
        }

        /* Section Styles */
        .section {
          padding: 100px 24px;
          text-align: center;
        }
        .section-title {
          font-size: 2.5rem;
          margin-bottom: 12px;
        }
        .section-subtitle {
          opacity: 0.7;
          margin-bottom: 48px;
          font-size: 1.1rem;
        }

        /* Project Cards */
        .project-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .project-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 32px;
          text-align: left;
          transition: all 0.3s ease;
        }
        .project-card:hover {
          transform: translateY(-8px);
          border-color: rgba(0, 240, 255, 0.3);
          box-shadow: 0 20px 40px rgba(0, 240, 255, 0.1);
        }
        .project-card.featured {
          border-color: rgba(0, 240, 255, 0.3);
          background: linear-gradient(135deg, rgba(0, 240, 255, 0.05), rgba(0, 100, 224, 0.05));
        }
        .card-icon {
          font-size: 2.5rem;
          margin-bottom: 16px;
        }
        .project-card h3 {
          font-size: 1.5rem;
          margin: 0 0 12px;
        }
        .project-card p {
          opacity: 0.7;
          line-height: 1.6;
          margin: 0 0 16px;
        }
        .card-tag {
          display: inline-block;
          padding: 6px 12px;
          background: rgba(0, 240, 255, 0.1);
          border-radius: 20px;
          font-size: 0.85rem;
          color: #00f0ff;
        }

        /* Stats */
        .stats-section {
          display: flex;
          justify-content: center;
          gap: 60px;
          padding: 60px 24px;
          background: rgba(0, 240, 255, 0.03);
          flex-wrap: wrap;
        }
        .stat {
          text-align: center;
        }
        .stat-number {
          display: block;
          font-size: 3rem;
          font-weight: 700;
          color: #00f0ff;
        }
        .stat-label {
          opacity: 0.7;
        }

        /* Bio Section */
        .bio-section {
          background: linear-gradient(180deg, transparent, rgba(0, 240, 255, 0.02));
        }
        .bio-container {
          display: flex;
          gap: 48px;
          max-width: 1000px;
          margin: 0 auto;
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
        }
        .bio-image-wrapper {
          position: relative;
        }
        .bio-img {
          border-radius: 20px;
          border: 3px solid rgba(0, 240, 255, 0.3);
        }
        .bio-badge {
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(90deg, #00f0ff, #0064e0);
          color: #000;
          padding: 8px 20px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .bio-text {
          max-width: 500px;
          text-align: left;
        }
        .bio-text h2 {
          font-size: 2rem;
          margin-bottom: 20px;
        }
        .bio-text p {
          line-height: 1.8;
          margin-bottom: 16px;
          opacity: 0.9;
        }
        .bio-text blockquote {
          font-size: 1.3rem;
          font-style: italic;
          color: #00f0ff;
          border-left: 3px solid #00f0ff;
          padding-left: 20px;
          margin: 24px 0;
        }

        /* Contact */
        .contact-section {
          background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.5));
        }
        .contact-email {
          display: inline-block;
          font-size: 1.5rem;
          color: #00f0ff;
          text-decoration: none;
          margin-bottom: 24px;
          transition: all 0.3s;
        }
        .contact-email:hover {
          text-shadow: 0 0 20px rgba(0, 240, 255, 0.5);
        }
        .social-links {
          display: flex;
          gap: 24px;
          justify-content: center;
        }
        .social-links a {
          color: #fff;
          text-decoration: none;
          opacity: 0.7;
          transition: all 0.3s;
        }
        .social-links a:hover {
          opacity: 1;
          color: #00f0ff;
        }

        /* Animations */
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0, 240, 255, 0.4); }
          50% { box-shadow: 0 0 0 20px rgba(0, 240, 255, 0); }
        }
        @keyframes scroll {
          0% { opacity: 1; transform: translateX(-50%) translateY(0); }
          100% { opacity: 0; transform: translateX(-50%) translateY(12px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes ring-rotate {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* Reveal Animation */
        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s ease;
        }
        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-title { font-size: 2.2rem; }
          .stats-section { gap: 40px; }
          .stat-number { font-size: 2rem; }
          .bio-container { flex-direction: column; text-align: center; }
          .bio-text { text-align: center; }
          .bio-text blockquote { border-left: none; padding: 0; }
        }
      `}</style>
    </>
  );
}

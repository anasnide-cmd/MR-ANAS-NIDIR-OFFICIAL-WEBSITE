'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import ShinyText from './ReactBits/ShinyText';
import RetroGrid from './ReactBits/RetroGrid';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function HomeClient() {
  const sectionsRef = useRef([]);
  const [settings, setSettings] = useState({
    heroTitle: 'MR ANAS NIDIR',
    heroSubtitle: 'Entrepreneur • Visionary • Digital Innovator',
    aboutText: "I'm Mr Anas Nidir, a builder of tech, AI systems, and futuristic platforms — driven by simplicity and independence. I believe in creating tools that empower, not restrict.",
    bioTitle: 'My Story',
    bioText1: 'Mr Anas Nidir is a tech entrepreneur, futurist, and digital architect. He is the founder of innovation-focused projects including NEXENGINE, NEX AI, and ANAS GPT.',
    bioText2: 'Since March 2025, he has been developing high-performance solutions from scratch — without relying on traditional tools or platforms.',
    quote: 'Simple is Power',
    contactEmail: 'ceo@anasnidir.com',
    tiktok: 'https://tiktok.com/@anasnide',
    instagram: 'https://www.instagram.com/anasnide',
    stats: [
      { label: 'Active Projects', value: '3+' },
      { label: 'Founded', value: '2025' },
      { label: 'Possibilities', value: '∞' }
    ],
    projects: [
      { icon: '⚡', title: 'NEXENGINE', desc: 'Independent web server system built for speed, privacy, and total control.', tag: 'Infrastructure' },
      { icon: '🤖', title: 'NEX AI', desc: 'Custom AI Chatbot Platform with advanced natural language processing.', tag: 'AI / ML' },
      { icon: '💬', title: 'ANAS GPT', desc: 'Advanced LLM Web Assistant for seamless human-AI interaction.', tag: 'AI Assistant' }
    ],
    products: [
      { name: 'Gumroad', url: 'https://anasnidir.gumroad.com/' }
    ]
  });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Fetch Settings
    const fetchSettings = async () => {
      try {
          const docRef = doc(db, 'settings', 'homepage');
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            setSettings(snap.data());
          }
      } catch (err) {
          console.error("Failed to fetch settings", err);
      }
    };
    fetchSettings();

    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    sectionsRef.current.forEach(el => el && observer.observe(el));
    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* HERO */}
      <header className="hero" id="home">
        <div className="hero-bg">
          <RetroGrid />
          <div className="grid-overlay"></div>
        </div>

        <div className="hero-content" style={{ transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)` }}>
          <div className="logo-container">
            <div className="logo-pulse"></div>
            <div className="logo-glow">
              <Image src="/assets/logo.jpg" alt="Logo" width={400} height={400} className="logo" style={{ objectFit: 'contain' }} />
            </div>
          </div>
          <h1 className="hero-title animate-reveal">
            <ShinyText text={settings.heroTitle} speed={3} className="custom-shiny-text" />
          </h1>
          <p className="hero-subtitle animate-reveal-delay">{settings.heroSubtitle}</p>
          <div className="hero-buttons animate-reveal-delay-2">
            <Link href="#projects" className="btn-premium">
              <span>EXPLORE UNIVERSE</span>
              <div className="btn-glow"></div>
            </Link>
            <Link href="/savoirpedia" className="btn-outline">
              READ ARCHIVES
            </Link>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <span>EXPLORE</span>
        </div>
      </header>

      {/* PROJECTS */}
      <section id="projects" className="section reveal" ref={el => sectionsRef.current[0] = el}>
        <div className="section-header">
          <span className="section-tag">PORTFOLIO</span>
          <h2 className="section-title">ENGINEERED PROJECTS</h2>
          <div className="section-line"></div>
        </div>

        <div className="project-grid">
          {settings.projects.map((proj, i) => (
            <article key={i} className="project-card glass shadow-hover">
              <div className="card-top">
                <div className="card-icon-wrapper">
                  <span className="card-icon">{proj.icon}</span>
                  <div className="icon-glow"></div>
                </div>
                <span className="card-tag">{proj.tag}</span>
              </div>
              <h3>{proj.title}</h3>
              <p>{proj.desc}</p>
              <div className="card-footer">
                <span className="view-link">INITIATING DATA...</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="stats-container">
          {(settings.stats || []).map((stat, idx) => (
            <div className="stat-item" key={idx}>
              <div className="stat-circle">
                <span className="stat-number">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section reveal" ref={el => sectionsRef.current[1] = el}>
        <h2 className="section-title">👤 About Me</h2>
        <div className="about-content">
          <p className="about-text">
            {settings.aboutText}
          </p>
        </div>
      </section>

      {/* BIO */}
      <section id="bio" className="section bio-section reveal" ref={el => sectionsRef.current[2] = el}>
        <div className="bio-glitch-bg"></div>
        <div className="bio-container">
          <div className="bio-visual">
            <div className="bio-image-frame">
              <Image src="/assets/profile.jpg" alt="Anas" width={400} height={400} className="bio-img" />
              <div className="frame-border"></div>
            </div>
            <div className="bio-experience">
              <span className="exp-num">EST.</span>
              <span className="exp-text">2025</span>
            </div>
          </div>
          <div className="bio-text">
            <span className="subtitle">THE ARCHITECT</span>
            <h2>{settings.bioTitle}</h2>
            <p className="highlight">{settings.bioText1}</p>
            <p>{settings.bioText2}</p>
            <div className="quote-box">
              <span className="quote-icon">&quot;</span>
              <p>{settings.quote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="section product-section reveal" ref={el => sectionsRef.current[3] = el}>
        <h2 className="section-title">DIGITAL ASSETS</h2>
        <div className="asset-grid">
          {settings.products.map((prod, i) => (
            <a key={i} href={prod.url} target="_blank" rel="noopener noreferrer" className="asset-link glass">
              <span className="asset-name">{prod.name}</span>
              <span className="asset-arrow">→</span>
            </a>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section contact-section reveal" ref={el => sectionsRef.current[4] = el}>
        <div className="footer-glow"></div>
        <h2 className="section-title">SECURE CONNECTION</h2>
        <p className="section-subtitle">READY TO LAUNCH YOUR NEXT VISION?</p>
        <a href={`mailto:${settings.contactEmail}`} className="contact-link gradient-text">{settings.contactEmail}</a>

        <div className="social-wrap">
          <a href={settings.tiktok} target="_blank" className="social-btn">TIKTOK</a>
          <div className="dot"></div>
          <a href={settings.instagram} target="_blank" className="social-btn">INSTAGRAM</a>
        </div>
      </section>

      <style jsx>{`
        /* Hero Section Premium */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: #020202;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }
        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(0, 240, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 240, 255, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
          mask-image: radial-gradient(circle at 50% 50%, black, transparent 80%);
        }
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
          animation: orbFloat 20s infinite alternate;
        }
        .orb-1 { width: 400px; height: 400px; background: #00f0ff; top: -100px; right: -100px; }
        .orb-2 { width: 300px; height: 300px; background: #0064e0; bottom: -50px; left: -50px; animation-delay: -5s; }
        .orb-3 { width: 250px; height: 250px; background: #7000ff; top: 40%; left: 30%; animation-delay: -10s; }

        @keyframes orbFloat {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(50px, 50px) scale(1.1); }
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          transition: transform 0.1s ease-out;
        }
        .logo-container {
          position: relative;
          margin-bottom: 50px;
        }
        .logo-glow {
          position: relative;
          /* Fluid responsive sizing: min 180px, preferred 25vw, max 400px */
          width: clamp(180px, 25vw, 400px);
          height: clamp(180px, 25vw, 400px);
          margin: 0 auto;
          border-radius: 30px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .logo { 
          width: 100%; 
          height: 100%; 
          display: block; 
          object-fit: contain;
        }
        .logo-pulse {
          position: absolute;
          top: 50%; left: 50%;
          /* Fluid responsive: slightly larger than logo */
          width: clamp(200px, 28vw, 450px); 
          height: clamp(200px, 28vw, 450px);
          transform: translate(-50%, -50%);
          border: 1px solid rgba(0, 240, 255, 0.2);
          border-radius: 50px;
          animation: pulseRotate 10s linear infinite;
        }
        @keyframes pulseRotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .hero-title {
          font-size: clamp(2rem, 10vw, 6rem);
          font-weight: 950;
          letter-spacing: -3px;
          margin-bottom: 10px;
        }
        .gradient-text {
          background: linear-gradient(90deg, #fff, #00f0ff, #fff);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        .hero-subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.6);
          letter-spacing: 4px;
          text-transform: uppercase;
          margin-bottom: 40px;
        }

        .hero-buttons { display: flex; gap: 20px; justify-content: center; }
        .btn-premium {
          position: relative;
          padding: 16px 40px;
          background: #fff;
          color: #000;
          text-decoration: none;
          font-weight: 900;
          font-size: 0.9rem;
          letter-spacing: 2px;
          border-radius: 4px;
          overflow: hidden;
          transition: all 0.3s;
        }
        .btn-premium:hover { transform: translateY(-3px); letter-spacing: 3px; }
        .btn-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s;
        }
        .btn-premium:hover .btn-glow { transform: translateX(100%); }

        .btn-outline {
          padding: 16px 40px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
          text-decoration: none;
          font-weight: 700;
          letter-spacing: 2px;
          border-radius: 4px;
          transition: all 0.3s;
        }
        .btn-outline:hover { background: #fff; color: #000; }

        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.7rem;
          letter-spacing: 3px;
        }
        .mouse {
          width: 24px; height: 40px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          position: relative;
        }
        .wheel {
          width: 4px; height: 8px;
          background: #00f0ff;
          position: absolute;
          top: 6px; left: 50%;
          transform: translateX(-50%);
          border-radius: 2px;
          animation: wheelScroll 1.5s infinite;
        }
        @keyframes wheelScroll {
          0% { transform: translate(-50%, 0); opacity: 1; }
          100% { transform: translate(-50%, 15px); opacity: 0; }
        }

        /* Section Styling */
        .section { padding: 150px 40px; max-width: 1400px; margin: 0 auto; }
        .section-header { text-align: left; margin-bottom: 80px; }
        .section-tag { color: #00f0ff; letter-spacing: 5px; font-weight: 900; font-size: 0.75rem; display: block; margin-bottom: 15px; }
        .section-title { font-size: 3rem; font-weight: 900; letter-spacing: -1px; }
        .section-header .section-line { width: 100px; height: 4px; background: #00f0ff; margin-top: 20px; box-shadow: 0 0 20px #00f0ff; }

        /* Project Cards 3D */
        .project-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }
        .project-card {
          padding: 50px;
          border-radius: 30px;
          text-align: left;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }
        .project-card:hover {
          transform: translateY(-15px) scale(1.02);
          border-color: rgba(0, 240, 255, 0.4);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
        }
        .card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; }
        .card-icon-wrapper { position: relative; }
        .card-icon { font-size: 3rem; position: relative; z-index: 2; }
        .icon-glow {
          position: absolute; inset: 0;
          background: #00f0ff; filter: blur(20px);
          opacity: 0.2; border-radius: 50%;
        }
        .project-card h3 { font-size: 1.8rem; font-weight: 800; margin-bottom: 15px; }
        .project-card p { color: rgba(255, 255, 255, 0.6); line-height: 1.8; margin-bottom: 30px; }
        .card-footer { font-size: 0.7rem; letter-spacing: 2px; font-weight: 900; color: #00f0ff; }

        /* Stats Pulse */
        .stats-section { background: #050505; padding: 100px 0; border-y: 1px solid rgba(255, 255, 255, 0.05); }
        .stats-container {
          display: flex; justify-content: space-around;
          max-width: 1200px; margin: 0 auto; flex-wrap: wrap; gap: 40px;
        }
        .stat-circle {
          width: 200px; height: 200px;
          border: 1px solid rgba(0, 240, 255, 0.1);
          border-radius: 50%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          transition: all 0.4s;
          background: radial-gradient(circle, rgba(0, 240, 255, 0.05) 0%, transparent 70%);
        }
        .stat-circle:hover {
          border-color: #00f0ff;
          box-shadow: 0 0 40px rgba(0, 240, 255, 0.2);
          transform: scale(1.05);
        }
        .stat-number { font-size: 3rem; font-weight: 900; color: #fff; }
        .stat-label { font-size: 0.7rem; letter-spacing: 3px; color: rgba(255, 255, 255, 0.4); text-transform: uppercase; }

        /* Bio Enhancement */
        .bio-section { position: relative; overflow: hidden; }
        .bio-container { display: grid; grid-template-columns: 1fr 1.2fr; gap: 80px; align-items: center; }
        .bio-visual { position: relative; }
        .bio-image-frame {
          position: relative;
          border-radius: 40px;
          overflow: hidden;
          z-index: 2;
        }
        .frame-border {
          position: absolute; inset: 20px;
          border: 1px solid #00f0ff;
          border-radius: 30px;
          opacity: 0.3;
        }
        .bio-img { width: 100%; height: auto; display: block; }
        .bio-experience {
          position: absolute; bottom: -30px; right: -30px;
          background: #00f0ff; color: #000;
          padding: 30px; border-radius: 30px;
          display: flex; flex-direction: column;
          z-index: 3; font-weight: 900;
        }
        .bio-text h2 { font-size: 3.5rem; font-weight: 900; margin-bottom: 30px; }
        .highlight { font-size: 1.4rem; font-weight: 600; color: #00f0ff; margin-bottom: 25px; }
        .bio-text p { color: rgba(255, 255, 255, 0.6); line-height: 2; margin-bottom: 25px; }
        .quote-box {
          background: rgba(255, 255, 255, 0.03);
          padding: 40px; border-radius: 20px;
          border-left: 5px solid #00f0ff;
          position: relative;
        }
        .quote-icon {
          position: absolute; top: 10px; left: 20px;
          font-size: 4rem; opacity: 0.1; color: #00f0ff;
        }

        /* Products Grid */
        .asset-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 50px;
        }
        .asset-link {
          padding: 30px;
          display: flex; justify-content: space-between; align-items: center;
          text-decoration: none; border-radius: 15px;
          color: #fff; font-weight: 800; font-size: 1.2rem;
          transition: all 0.3s;
        }
        .asset-link:hover {
          background: #fff; color: #000;
          transform: translateX(10px);
        }

        /* Contact Section */
        .contact-section { text-align: center; background: #000; }
        .contact-link {
          font-size: clamp(2rem, 8vw, 5rem);
          font-weight: 950;
          text-decoration: none;
          display: block;
          margin: 40px 0;
          transition: transform 0.3s;
        }
        .contact-link:hover { transform: scale(1.05); }
        .social-wrap { display: flex; justify-content: center; align-items: center; gap: 30px; }
        .social-btn {
          font-weight: 900; letter-spacing: 4px; font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.4); text-decoration: none;
          transition: all 0.3s;
        }
        .social-btn:hover { color: #00f0ff; }
        .dot { width: 6px; height: 6px; background: #00f0ff; border-radius: 50%; opacity: 0.4; }

        /* Global Reveal */
        .reveal { opacity: 0; transform: translateY(50px); transition: all 1s cubic-bezier(0.4, 0, 0.2, 1); }
        .reveal.active { opacity: 1; transform: translateY(0); }

        /* Animation Helpers */
        .animate-reveal { animation: revIn 1s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .animate-reveal-delay { animation: revIn 1s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards; opacity: 0; }
        .animate-reveal-delay-2 { animation: revIn 1s cubic-bezier(0.4, 0, 0.2, 1) 0.4s forwards; opacity: 0; }
        @keyframes revIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1024px) {
          .bio-container { grid-template-columns: 1fr; gap: 50px; }
          .bio-text { order: 1; text-align: center; }
          .bio-visual { order: 2; max-width: 500px; margin: 0 auto; }
          .quote-box { text-align: left; }
        }

        @media (max-width: 768px) {
          .section { padding: 80px 20px; }
          .section-title { font-size: 2rem; }
          .section-header { margin-bottom: 40px; }
          .hero-title { font-size: 2.5rem; letter-spacing: -1px; }
          .hero-subtitle { font-size: 0.9rem; letter-spacing: 2px; margin-bottom: 30px; }
          .project-grid { grid-template-columns: 1fr; gap: 20px; }
          .project-card { padding: 30px; border-radius: 20px; }
          .project-card h3 { font-size: 1.4rem; }
          .hero-buttons { flex-direction: column; gap: 15px; }
          .btn-premium, .btn-outline { width: 100%; text-align: center; padding: 14px 30px; }
          .stat-circle { width: 130px; height: 130px; }
          .stat-number { font-size: 1.8rem; }
          .stat-label { font-size: 0.6rem; letter-spacing: 2px; }
          .stats-section { padding: 60px 20px; }
          .stats-container { gap: 20px; }
          .logo-glow { width: 280px; height: 280px; }
          .logo-pulse { width: 310px; height: 310px; }
          .bio-container { gap: 40px; }
          .bio-text h2 { font-size: 2.5rem; }
          .highlight { font-size: 1.1rem; }
          .bio-experience { bottom: -20px; right: -10px; padding: 20px; border-radius: 20px; }
          .quote-box { padding: 25px; }
          .quote-icon { font-size: 3rem; }
          .contact-link { font-size: clamp(1.5rem, 6vw, 3rem); word-break: break-all; }
          .social-wrap { flex-direction: column; gap: 15px; }
          .asset-grid { grid-template-columns: 1fr; }
          .asset-link { font-size: 1rem; padding: 20px; }
        }

        @media (max-width: 480px) {
          .section { padding: 60px 15px; }
          .section-title { font-size: 1.6rem; }
          .hero-title { font-size: 2rem; }
          .hero-subtitle { font-size: 0.75rem; letter-spacing: 1px; }
          .logo-glow { width: 200px; height: 200px; }
          .logo-pulse { width: 230px; height: 230px; }
          .logo-container { margin-bottom: 30px; }
          .project-card { padding: 25px; }
          .project-card h3 { font-size: 1.2rem; }
          .project-card p { font-size: 0.9rem; line-height: 1.6; }
          .card-icon { font-size: 2.5rem; }
          .stat-circle { width: 100px; height: 100px; }
          .stat-number { font-size: 1.4rem; }
          .stat-label { font-size: 0.5rem; }
          .bio-text h2 { font-size: 2rem; }
          .bio-experience { position: relative; bottom: auto; right: auto; margin-top: 20px; align-self: center; }
          .bio-visual { display: flex; flex-direction: column; align-items: center; }
          .scroll-indicator { display: none; }
        }
      `}</style>
    </>
  );
}

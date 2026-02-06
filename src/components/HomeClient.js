'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import ShinyText from './ReactBits/ShinyText';
import RetroGrid from './ReactBits/RetroGrid';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import ActivityFeed from './ActivityFeed';
import SystemStatus from './SystemStatus';
import PresenceDisplay from './PresenceDisplay';
import ScrollReveal from './Effects/ScrollReveal';
import ParallaxLayer from './Effects/ParallaxLayer';
import QuantumCore from './Effects/QuantumCore';
import MagneticWrapper from './Effects/MagneticWrapper';
import CustomCursor from './Effects/CustomCursor';
import HyperButton from './Effects/HyperButton';
import LensEffects from './Effects/LensEffects';
import NexusCommand from './NexusCommand';


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

      // Localized mouse tracking for cards
      const cards = document.querySelectorAll('.project-card, .hub-card, .price-card');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <LensEffects />
      <NexusCommand />
      <CustomCursor />
      <QuantumCore />
      {/* HERO */}
      <header className="hero" id="home">
        <div className="hero-bg">
          <div className="subtle-grid">
            <RetroGrid opacity={0.1} />
          </div>
          <div className="nebula-container">
            <div className="nebula nebula-1"></div>
            <div className="nebula nebula-2"></div>
            <div className="nebula nebula-3"></div>
          </div>
          <div className="grid-overlay"></div>
        </div>

        <div className="hero-content" style={{ transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)` }}>
          <ParallaxLayer speed={-0.3}>
            <div className="logo-container">
              <div className="logo-pulse"></div>
              <div className="logo-glow">
                <Image src="/assets/logo.jpg" alt="Logo" width={400} height={400} className="logo" style={{ objectFit: 'contain' }} />
              </div>
            </div>
          </ParallaxLayer>

          <ScrollReveal direction="up" delay={0.2}>
            <h1 className="hero-title animate-reveal">
              <ShinyText text={settings.heroTitle} speed={3} className="custom-shiny-text" />
            </h1>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.4}>
            <p className="hero-subtitle animate-reveal-delay">{settings.heroSubtitle}</p>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.6}>
            <div className="hero-presence animate-reveal-delay">
              <PresenceDisplay />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.8}>
            <div className="hero-buttons animate-reveal-delay-2">
              <HyperButton href="#projects">
                EXPLORE UNIVERSE
              </HyperButton>
              <HyperButton href="/savoirpedia" className="alt-btn">
                READ ARCHIVES
              </HyperButton>
            </div>
          </ScrollReveal>
        </div>

        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <span>EXPLORE</span>
        </div>
      </header>

      <div className="telemetry-bar">
        <ActivityFeed />
      </div>

      {/* NEXUS AI SUITE */}
      <section id="projects" className="section">
        <ScrollReveal direction="up">
          <div className="section-header">
            <span className="section-tag">THE ECOSYSTEM</span>
            <h2 className="section-title">NEXUS AI SUITE</h2>
          </div>
        </ScrollReveal>

        <div className="project-grid">
          <ScrollReveal direction="left" delay={0.1}>
            <Link href="/mr-build" className="project-card glass shadow-hover no-underline">
              <MagneticWrapper strength={0.1} range={100}>
                <div className="card-top">
                  <div className="card-icon-wrapper">
                    <span className="card-icon">🏗️</span>
                    <div className="icon-glow"></div>
                  </div>
                  <span className="card-tag">Web Builder</span>
                </div>
                <h3>MR BUILD</h3>
                <p>Deploy high-performance, SEO-optimized websites in seconds. Zero code, total control.</p>
                <div className="card-footer">
                  <span className="view-link">LAUNCH ENGINE →</span>
                </div>
              </MagneticWrapper>
            </Link>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.2}>
            <Link href="/mr-search" className="project-card glass shadow-hover no-underline">
              <MagneticWrapper strength={0.1} range={100}>
                <div className="card-top">
                  <div className="card-icon-wrapper">
                    <span className="card-icon">🔍</span>
                    <div className="icon-glow"></div>
                  </div>
                  <span className="card-tag">Real-time Search</span>
                </div>
                <h3>MR SEARCH</h3>
                <p>Next-gen indexing technology for deep-web discovery and instant data retrieval.</p>
                <div className="card-footer">
                  <span className="view-link">START SEARCH →</span>
                </div>
              </MagneticWrapper>
            </Link>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.25}>
            <Link href="/nex-ai" className="project-card glass shadow-hover no-underline">
              <MagneticWrapper strength={0.1} range={100}>
                <div className="card-top">
                  <div className="card-icon-wrapper">
                    <span className="card-icon">🤖</span>
                    <div className="icon-glow"></div>
                  </div>
                  <span className="card-tag">Artificial Intelligence</span>
                </div>
                <h3>NEX AI</h3>
                <p>Interact with the singularity. Access GPT-4, Claude 3, and Llama 3 in a holographic interface.</p>
                <div className="card-footer">
                  <span className="view-link">INITIATE UPLINK →</span>
                </div>
              </MagneticWrapper>
            </Link>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.3}>
            <Link href="/mr-shop" className="project-card glass shadow-hover no-underline">
              <MagneticWrapper strength={0.1} range={100}>
                <div className="card-top">
                  <div className="card-icon-wrapper">
                    <span className="card-icon">🛍️</span>
                    <div className="icon-glow"></div>
                  </div>
                  <span className="card-tag">Marketplace</span>
                </div>
                <h3>MR SHOP</h3>
                <p>A secure digital asset exchange for futuristic tools, templates, and AI models.</p>
                <div className="card-footer">
                  <span className="view-link">BROWSE ASSETS →</span>
                </div>
              </MagneticWrapper>
            </Link>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.4}>
            <Link href="/savoirpedia" className="project-card glass shadow-hover no-underline">
              <MagneticWrapper strength={0.1} range={100}>
                <div className="card-top">
                  <div className="card-icon-wrapper">
                    <span className="card-icon">📚</span>
                    <div className="icon-glow"></div>
                  </div>
                  <span className="card-tag">Knowledge Hub</span>
                </div>
                <h3>SAVOIRPEDIA</h3>
                <p>The definitive archive for tech, futurism, and digital sovereignty.</p>
                <div className="card-footer">
                  <span className="view-link">OPEN ARCHIVES →</span>
                </div>
              </MagneticWrapper>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* PRO CTAS: SAVOIRPEDIA & BIO INTERRUPT */}
      <section className="section cta-banner-section">
        <div className="cta-banner glass pro">
          <div className="cta-content">
            <span className="cta-tag">PREMIUM ACCESS</span>
            <h2>UNLOCK THE MASTER ARCHIVE</h2>
            <p>Get exclusive access to the deep-tech insights and futurist perspectives reserved for our Pro members.</p>
          </div>
          <Link href="/mr-build/subscription" className="btn-premium gold">
            GO PRO NOW
          </Link>
        </div>
      </section>

      {/* SYSTEM DASHBOARD */}
      <section className="section" style={{ paddingTop: '50px' }}>
        <ScrollReveal direction="up">
          <div className="section-header">
            <span className="section-tag">SYSTEM STATUS</span>
            <h2 className="section-title">GLOBAL PERFORMANCE</h2>
          </div>
        </ScrollReveal>
        <SystemStatus />
      </section>

      {/* ECONOMIC ENGINE: PRICING */}
      <section id="pricing" className="section">
        <ScrollReveal direction="up">
          <div className="section-header center">
            <span className="section-tag">MONETIZATION</span>
            <h2 className="section-title">ECONOMIC ENGINE</h2>
            <p className="section-subtitle">Fuel your digital expansion with our premium protocols.</p>
          </div>
        </ScrollReveal>

        <div className="pricing-grid">
          <ScrollReveal direction="up" delay={0.2}>
            <MagneticWrapper strength={0.05} range={200}>
              <div className="price-card glass">
                <div className="price-header">
                  <h3>TRIAL-X</h3>
                  <div className="amount">$0<span>/mo</span></div>
                </div>
                <ul className="price-features">
                  <li>✅ 1 Active Deployment</li>
                  <li>✅ Basic Site Editor</li>
                  <li>✅ Manual Deployments</li>
                  <li>❌ Custom Domains</li>
                </ul>
                <Link href="/mr-build/login" className="btn-outline">START FREE</Link>
              </div>
            </MagneticWrapper>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <MagneticWrapper strength={0.08} range={200}>
              <div className="price-card glass pro highlight">
                <div className="badge">MOST POPULAR</div>
                <div className="price-header">
                  <h3>PREMIUM-X</h3>
                  <div className="amount">$9.99<span>/mo</span></div>
                </div>
                <ul className="price-features">
                  <li>✅ <strong>5 Active Deployments</strong></li>
                  <li>✅ <strong>Advanced Components</strong></li>
                  <li>✅ <strong>Instant Updates</strong></li>
                  <li>✅ 24/7 Priority Channel</li>
                </ul>
                <Link href="/mr-build/subscription" className="btn-premium">UPGRADE NOW</Link>
              </div>
            </MagneticWrapper>
          </ScrollReveal>
        </div>
      </section>

      {/* MARKETPLACE SHOWCASE */}
      <section className="section">
        <ScrollReveal direction="left">
          <div className="section-header">
            <span className="section-tag">MR SHOP</span>
            <h2 className="section-title">FEATURED ASSETS</h2>
          </div>
        </ScrollReveal>
        
        <div className="asset-grid">
          <ScrollReveal direction="right" delay={0.2}>
            <MagneticWrapper strength={0.1}>
              <div className="asset-item glass">
                <div className="asset-info">
                  <h4>Nebula UI Kit</h4>
                  <p>Premium dark-mode templates for Mr Build.</p>
                </div>
                <div className="asset-price">$19</div>
                <a href="https://anasnidir.gumroad.com/" target="_blank" className="btn-buy">BUY NOW</a>
              </div>
            </MagneticWrapper>
          </ScrollReveal>
          
          <ScrollReveal direction="right" delay={0.4}>
            <MagneticWrapper strength={0.1}>
              <div className="asset-item glass">
                <div className="asset-info">
                  <h4>Quantum Search API</h4>
                  <p>Direct access to Mr Search indexing core.</p>
                </div>
                <div className="asset-price">$49</div>
                <a href="https://anasnidir.gumroad.com/" target="_blank" className="btn-buy">BUY NOW</a>
              </div>
            </MagneticWrapper>
          </ScrollReveal>
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
      <section id="about" className="section">
        <ScrollReveal direction="up">
          <h2 className="section-title">👤 About Me</h2>
          <div className="about-content">
            <p className="about-text">
              {settings.aboutText}
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* BIO */}
      <section id="bio" className="section bio-section">
        <div className="bio-glitch-bg"></div>
        <div className="bio-container">
          <div className="bio-visual">
            <ScrollReveal direction="left">
              <ParallaxLayer speed={0.2}>
                <div className="bio-image-frame">
                  <Image src="/assets/profile.jpg" alt="Anas" width={400} height={400} className="bio-img" />
                  <div className="frame-border"></div>
                </div>
              </ParallaxLayer>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.3}>
              <div className="bio-experience">
                <span className="exp-num">EST.</span>
                <span className="exp-text">2025</span>
              </div>
            </ScrollReveal>
          </div>
          <div className="bio-text">
            <ScrollReveal direction="right">
              <span className="subtitle">THE ARCHITECT</span>
              <h2>{settings.bioTitle}</h2>
              <p className="highlight">{settings.bioText1}</p>
              <p>{settings.bioText2}</p>
              <div className="quote-box">
                <span className="quote-icon">&quot;</span>
                <p>{settings.quote}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="section product-section">
        <ScrollReveal direction="up">
          <h2 className="section-title">DIGITAL ASSETS</h2>
        </ScrollReveal>
        <div className="asset-grid">
          {settings.products.map((prod, i) => (
            <a key={i} href={prod.url} target="_blank" rel="noopener noreferrer" className="asset-link glass">
              <span className="asset-name">{prod.name}</span>
              <span className="asset-arrow">→</span>
            </a>
          ))}
        </div>
      </section>

      {/* SUCCESS SIGNALS (Testimonials / Social Proof) */}
      <section className="section success-signals">
        <ScrollReveal direction="up">
          <div className="section-header center">
            <span className="section-tag">VALIDATION</span>
            <h2 className="section-title">SUCCESS SIGNALS</h2>
          </div>
        </ScrollReveal>
        <div className="signal-grid">
          <div className="signal-card glass">
            <p className="signal-quote">"Mr Build changed how I deploy. It's the infrastructure I didn't know I needed."</p>
            <div className="signal-author">— Verified Architect</div>
          </div>
          <div className="signal-card glass">
            <p className="signal-quote">"The speed of Mr Search is unparalleled. Absolute digital sovereignty."</p>
            <div className="signal-author">— Data Futurist</div>
          </div>
        </div>
      </section>

      {/* NEXUS HUB: COMMUNITY & REFERRALS */}
      <section id="community" className="section community-hub-section">
        <div className="hub-container">
          <ScrollReveal direction="left">
            <div className="hub-info">
              <span className="section-tag">JOIN THE FLEET</span>
              <h2 className="section-title">THE NEXUS HUB</h2>
              <p>Connect with other digital architects, share your builds, and earn rewards for expanding the universe.</p>
              
              <MagneticWrapper strength={0.05}>
                <div className="referral-teaser glass">
                  <div className="teaser-icon">🎁</div>
                  <div className="teaser-text">
                    <h4>REFER & EARN</h4>
                    <p>Invite a friend and get 1 month of PREMIUM-X for free.</p>
                  </div>
                </div>
              </MagneticWrapper>
            </div>
          </ScrollReveal>

          <div className="hub-links">
            <ScrollReveal direction="right" delay={0.2}>
              <MagneticWrapper strength={0.1}>
                <a href="#" className="hub-card discord shadow-hover no-underline">
                  <span className="hub-icon">💬</span>
                  <h3>DISCORD COMMAND</h3>
                  <p>Official HQ for updates and support.</p>
                </a>
              </MagneticWrapper>
            </ScrollReveal>
            
            <ScrollReveal direction="right" delay={0.4}>
              <MagneticWrapper strength={0.1}>
                <a href="#" className="hub-card x shadow-hover no-underline">
                  <span className="hub-icon">𝕏</span>
                  <h3>NEXUS BROADCAST</h3>
                  <p>Follow the latest system signals.</p>
                </a>
              </MagneticWrapper>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section contact-section">
        <div className="footer-glow"></div>
        <ScrollReveal direction="up">
          <div className="section-header center">
            <span className="section-tag">CONNECTION</span>
            <h2 className="section-title">SECURE PROTOCOL</h2>
            <p className="section-subtitle">READY TO LAUNCH YOUR NEXT VISION?</p>
          </div>
        </ScrollReveal>
        <a href={`mailto:${settings.contactEmail}`} className="contact-link gradient-text">{settings.contactEmail}</a>

        <div className="social-wrap">
          <a href={settings.tiktok} target="_blank" className="social-btn">TIKTOK</a>
          <div className="dot"></div>
          <a href={settings.instagram} target="_blank" className="social-btn">INSTAGRAM</a>
        </div>
      </section>

      <style jsx>{`
        .section {
          padding: var(--section-padding) 20px;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* LIQUID FROST GLASS SYSTEM */
        .glass {
          background: rgba(255, 255, 255, 0.015);
          backdrop-filter: blur(40px) saturate(150%);
          -webkit-backdrop-filter: blur(40px) saturate(150%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.9),
                      inset 0 0 0 1px rgba(255, 255, 255, 0.05);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .glass::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.05), transparent);
          transform: translateX(-100%);
          transition: transform 0.8s;
        }
        .glass:hover::after {
          transform: translateX(100%);
        }
        .glass:hover {
          background: rgba(255, 255, 255, 0.035);
          border-color: rgba(0, 240, 255, 0.4);
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 60px 120px -30px rgba(0, 0, 0, 1),
                      0 0 40px rgba(0, 240, 255, 0.15);
        }

        /* Hero Section Premium */
        .telemetry-bar {
          position: relative;
          z-index: 10;
          border-bottom: 1px solid rgba(0, 240, 255, 0.1);
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(20px);
        }
        .subtle-grid {
          position: absolute;
          inset: 0;
          opacity: 0.3;
          pointer-events: none;
        }
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: #000;
        }

        .cta-banner-section { padding: var(--section-padding) 20px; }
        .cta-banner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 80px;
          border-radius: 40px;
          gap: 40px;
          position: relative;
          overflow: hidden;
        }
        .cta-banner::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top right, rgba(0, 240, 255, 0.1), transparent);
          pointer-events: none;
        }
        .cta-banner.pro {
          border-color: rgba(255, 215, 0, 0.3);
          background: linear-gradient(90deg, rgba(255, 215, 0, 0.1), transparent);
          box-shadow: inset 0 0 100px rgba(255, 215, 0, 0.05);
        }
        .cta-tag { color: #ffd700; font-weight: 950; letter-spacing: 5px; font-size: 0.7rem; text-transform: uppercase; }
        .cta-content h2 { font-family: 'Orbitron', sans-serif; font-size: clamp(2rem, 5vw, 3.5rem); margin: 15px 0; font-weight: 900; }
        .cta-content p { opacity: 0.6; max-width: 500px; font-size: 1.1rem; line-height: 1.6; color: var(--text-dim); }
        
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
          margin-top: 60px;
        }
        .price-card {
          padding: 60px 40px;
          border-radius: 30px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 30px;
          position: relative;
        }
        .price-card.pro {
          border-color: var(--primary);
          transform: scale(1.05);
          z-index: 2;
          background: rgba(0, 240, 255, 0.04);
          box-shadow: 0 0 50px rgba(0, 240, 255, 0.1);
        }
        .price-card .badge {
          position: absolute; top: -15px; left: 50%; transform: translateX(-50%);
          background: var(--primary); color: #000; font-weight: 900; font-size: 0.7rem;
          padding: 6px 18px; border-radius: 20px;
          box-shadow: 0 4px 15px rgba(0, 240, 255, 0.3);
        }
        .price-header h3 { font-family: 'Orbitron', sans-serif; font-size: 1.4rem; letter-spacing: 2px; margin-bottom: 20px; }
        .amount { font-family: 'Orbitron', sans-serif; font-size: 3.5rem; font-weight: 950; }
        .amount span { font-size: 1rem; opacity: 0.4; font-family: 'Inter', sans-serif; }
        
        .price-features { list-style: none; padding: 0; text-align: left; }
        .price-features li { margin-bottom: 18px; color: var(--text-dim); font-size: 0.95rem; display: flex; align-items: center; gap: 10px; }
        
        .asset-grid {
          display: grid;
          gap: 20px;
          margin-top: 40px;
        }
        .asset-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 30px 45px;
          border-radius: 24px;
        }
        .asset-item:hover { transform: translateX(10px); }
        .asset-info h4 { font-family: 'Orbitron', sans-serif; font-size: 1.3rem; margin-bottom: 5px; }
        .asset-info p { font-size: 0.9rem; color: var(--text-dim); }
        .asset-price { font-family: 'Orbitron', sans-serif; font-size: 1.5rem; font-weight: 900; color: var(--primary); }

        .signal-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
          margin-top: 50px;
        }
        .signal-card {
          padding: 50px;
          border-radius: 30px;
          border: 1px solid rgba(0, 240, 255, 0.1);
          text-align: left;
        }
        .signal-quote { font-style: italic; font-size: 1.15rem; color: var(--text-dim); margin-bottom: 25px; line-height: 1.6; }
        .signal-author { font-family: 'Orbitron', sans-serif; font-weight: 950; font-size: 0.75rem; letter-spacing: 2px; color: var(--primary); text-transform: uppercase; }

        .hub-container {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 80px;
          align-items: center;
        }
        .hub-info h2 { font-family: 'Orbitron', sans-serif; font-size: clamp(2.5rem, 6vw, 4rem); margin-bottom: 30px; font-weight: 900; line-height: 1.1; }
        .hub-info p { font-size: 1.2rem; color: var(--text-dim); margin-bottom: 40px; line-height: 1.7; }
        
        .referral-teaser {
          display: flex;
          align-items: center;
          gap: 30px;
          padding: 40px;
          border-radius: 30px;
          border: 1px solid rgba(255, 215, 0, 0.3);
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.05), transparent);
        }
        .teaser-icon { font-size: 3rem; }
        .teaser-text h4 { font-family: 'Orbitron', sans-serif; font-weight: 950; color: #ffd700; margin-bottom: 8px; font-size: 1.2rem; }
        .teaser-text p { font-size: 0.95rem; color: var(--text-dim); margin-bottom: 0; }

        .hub-links {
          display: grid;
          gap: 24px;
        }
        .hub-card {
          padding: 50px 40px;
          border-radius: 30px;
        }
        .hub-card:hover { border-color: var(--primary); transform: translateY(-5px); }
        .discord { background: rgba(88, 101, 242, 0.05); }
        .hub-icon { font-size: 3rem; display: block; margin-bottom: 25px; }
        .hub-card h3 { font-family: 'Orbitron', sans-serif; font-size: 1.3rem; font-weight: 900; margin-bottom: 12px; }

        .logo-glow {
          width: clamp(220px, 30vw, 450px);
          height: clamp(220px, 30vw, 450px);
          border-radius: 40px;
          box-shadow: 0 20px 80px rgba(0, 240, 255, 0.15);
        }
        .logo-pulse {
          width: clamp(250px, 35vw, 500px); 
          height: clamp(250px, 35vw, 500px);
          border-radius: 60px;
        }

        .hero-title {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(3.5rem, 12vw, 7.5rem);
          line-height: 0.9;
          margin-bottom: 15px;
        }
        .hero-subtitle {
          font-size: 1.2rem;
          color: var(--text-dim);
          letter-spacing: 6px;
        }

        @media (max-width: 1024px) {
          .hub-container { grid-template-columns: 1fr; gap: 60px; text-align: center; }
          .hub-info p { margin-left: auto; margin-right: auto; }
          .referral-teaser { justify-content: center; }
          .cta-banner { flex-direction: column; text-align: center; padding: 60px 40px; }
          .cta-content p { margin: 0 auto; }
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
          transition: transform 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
        }

        .nebula-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .nebula {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.3;
          animation: nebulaMove 25s infinite alternate;
        }
        .nebula-1 { width: 600px; height: 600px; background: radial-gradient(circle, #00f0ff, transparent); top: -10%; left: -10%; }
        .nebula-2 { width: 500px; height: 500px; background: radial-gradient(circle, #7000ff, transparent); bottom: -10%; right: -10%; animation-delay: -5s; }
        .nebula-3 { width: 400px; height: 400px; background: radial-gradient(circle, #ff00c8, transparent); top: 30%; left: 40%; animation-delay: -10s; }

        @keyframes nebulaMove {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(100px, 100px) scale(1.2); }
        }
        .logo-container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
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
        .section-header { text-align: left; margin-bottom: 80px; position: relative; }
        .section-tag { color: #00f0ff; letter-spacing: 5px; font-weight: 900; font-size: 0.75rem; display: block; margin-bottom: 15px; }
        .section-title { 
          font-size: 3rem; 
          font-weight: 900; 
          letter-spacing: -1px;
          position: relative;
          display: inline-block;
        }
        .section-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -10px;
          width: 0;
          height: 2px;
          background: #00f0ff;
          box-shadow: 0 0 15px #00f0ff;
          transition: width 1.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .section:hover .section-title::after {
          width: 100%;
        }
        .section-header .section-line { width: 100px; height: 4px; background: #00f0ff; margin-top: 20px; box-shadow: 0 0 20px #00f0ff; display: none; }

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
          transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
          position: relative;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(0, 240, 255, 0.05);
        }
        .project-card:hover {
          transform: translateY(-15px) scale(1.02);
          border-color: rgba(0, 240, 255, 0.4);
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 240, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
        }
        .project-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 240, 255, 0.1), transparent 80%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .project-card:hover::before { opacity: 1; }
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

        /* Global Scroll Reveal Logic handled by ScrollReveal component */

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
          .logo-glow { width: clamp(200px, 40vw, 300px); height: clamp(200px, 40vw, 300px); }
          .logo-pulse { width: clamp(230px, 45vw, 350px); height: clamp(230px, 45vw, 350px); }
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
          .logo-glow { width: clamp(160px, 50vw, 220px); height: clamp(160px, 50vw, 220px); }
          .logo-pulse { width: clamp(190px, 55vw, 250px); height: clamp(190px, 55vw, 250px); }
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

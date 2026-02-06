'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import MagneticWrapper from './Effects/MagneticWrapper';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const pathname = usePathname();
  const [hoveredLink, setHoveredLink] = useState(null);
  const navbarRef = useRef(null);
  const lastScrollY = useRef(0);
  const [navHidden, setNavHidden] = useState(false);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only hide navbar on mobile/tablet (less than 1024px)
      if (window.innerWidth < 1024) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setNavHidden(true);
        } else {
          setNavHidden(false);
        }
      } else {
        // Always show navbar on desktop
        setNavHidden(false);
      }

      lastScrollY.current = currentScrollY;
      setScrolled(currentScrollY > 20);
    };

    // Handle resize to reset state
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setNavHidden(false);
        setIsOpen(false);
      }
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
      setIsOpen(false);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isLinkActive = (href) => {
    if (!href) return false;
    if (href === pathname) return true;
    if (href.startsWith('#') && href === activeHash) return true;
    if (href === '/' && pathname === '/') return true;
    return false;
  };

  // Hide Navbar on user sites or admin pages
  if (pathname?.startsWith('/s/')) return null;
  if (pathname?.startsWith('/admin')) return null;

  const navLinks = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/#projects', label: 'Projects', icon: '🚀' },
    { href: '/#products', label: 'Products', icon: '🛍️' },
    { href: '/savoirpedia', label: 'SavoirPedia', icon: '📝' },
    { href: '/nex-ai', label: 'NEX AI', icon: '🤖' },
    { href: '/mr-build', label: 'Mr Build', icon: '🔨' },
    { href: '/#contact', label: 'Contact', icon: '📧' },
  ];

  const adminLink = { href: '/admin', label: 'Admin', icon: '⚙️', mobileOnly: true };

  return (
    <nav
      ref={navbarRef}
      className={`navbar ${scrolled ? 'scrolled' : ''} ${navHidden ? 'hidden' : ''} ${isOpen ? 'menu-open' : ''}`}
    >
      {/* Animated Background Effect */}
      <div className="navbar-bg-effect"></div>

      <div className="navbar-container">
        {/* Logo with 3D Effect */}
        <Link
          href="/"
          className="logo-link"
          onClick={() => setIsOpen(false)}
          aria-label="Home"
        >
          <div className="logo-3d">
            <div className="logo-front">
              <Image
                src="/assets/logo.jpg"
                alt="Anas Nidir Logo"
                width={64}
                height={64}
                className="navbar-logo"
                priority
              />
            </div>
            <div className="logo-side"></div>
            <div className="logo-glow"></div>
          </div>
          <div className="logo-text-container">
            <span className="logo-text">ANAS NIDIR</span>
            <span className="logo-subtitle">CREATIVE DEVELOPER</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          <div className="nav-links-wrapper">
            {navLinks.map(({ href, label, icon }) => (
              <div
                key={href}
                className="nav-item"
                onMouseEnter={() => setHoveredLink(href)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <Link
                  href={href}
                  className={`nav-link ${isLinkActive(href) ? 'active' : ''}`}
                  scroll={href.startsWith('#')}
                >
                  <MagneticWrapper strength={0.3} range={40}>
                    <span className="nav-icon">{icon}</span>
                    <span className="nav-label">{label}</span>
                    {isLinkActive(href) && (
                      <div className="active-glow"></div>
                    )}
                  </MagneticWrapper>
                </Link>
                <div className={`nav-hover-effect ${hoveredLink === href ? 'visible' : ''}`}></div>
              </div>
            ))}
          </div>

          {/* CTA Button with Holographic Effect */}
          <div className="nav-cta">
            <Link href="#contact" className="cta-button" scroll={false}>
              <span className="cta-text">Let&apos;s Connect</span>
              <div className="cta-icon">
                <div className="arrow-line"></div>
                <div className="arrow-head"></div>
              </div>
              <div className="cta-hologram"></div>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`holographic-btn ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <div className="btn-inner">
            <span className="line top"></span>
            <span className="line middle"></span>
            <span className="line bottom"></span>
          </div>
          <div className="btn-glow"></div>
        </button>

        {/* Mobile Menu */}
        <div className={`mobile-menu-container ${isOpen ? 'open' : ''}`}>
          <div className="mobile-menu-glass">
            {/* Menu Header */}
            <div className="mobile-menu-header">
              <div className="mobile-logo">
                <div className="logo-3d small">
                  <Image
                    src="/assets/logo.jpg"
                    alt="Logo"
                    width={44}
                    height={44}
                    className="navbar-logo"
                  />
                </div>
                <div>
                  <span className="logo-text">ANAS NIDIR</span>
                  <span className="logo-subtitle">CREATIVE DEVELOPER</span>
                </div>
              </div>
              <div className="menu-status">
                <span className="status-dot"></span>
                <span className="status-text">ONLINE</span>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="mobile-nav-grid">
              {[...navLinks, adminLink].map(({ href, label, icon, mobileOnly }) => (
                <div
                  key={href}
                  className={`mobile-nav-card ${mobileOnly ? 'admin-card' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  <Link
                    href={href}
                    className={`mobile-nav-link ${isLinkActive(href) ? 'active' : ''}`}
                    scroll={href.startsWith('#')}
                  >
                    <MagneticWrapper strength={0.2} range={60}>
                      <div className="card-icon">{icon}</div>
                      <span className="card-label">{label}</span>
                      {isLinkActive(href) && (
                        <div className="card-active-indicator">
                          <div className="pulse-ring"></div>
                        </div>
                      )}
                    </MagneticWrapper>
                  </Link>
                  <div className="card-glow"></div>
                </div>
              ))}
            </nav>

            {/* Mobile CTA */}
            <div className="mobile-cta-section">
              <Link
                href="#contact"
                className="mobile-cta-button"
                onClick={() => setIsOpen(false)}
                scroll={false}
              >
                <span className="cta-main-text">Start Project</span>
                <span className="cta-subtext">Get in touch →</span>
                <div className="cta-gradient"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Base Styles */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 90px;
          z-index: 30000; /* Absolute top-layer UI */
          transition: all 0.5s cubic-bezier(0.77, 0, 0.175, 1);
          background: rgba(8, 8, 12, 0);
          border-bottom: 1px solid transparent;
          overflow: visible; /* Allow drop shadows/glows to be seen */
        }

        .navbar-bg-effect {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(8, 8, 12, 0) 0%,
            rgba(8, 8, 12, 0) 100%
          );
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: -1;
          pointer-events: none; /* CRITICAL: Do not catch clicks */
        }

        .navbar.scrolled {
          height: 80px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .navbar.scrolled .navbar-bg-effect {
          opacity: 1;
          background: linear-gradient(
            180deg,
            rgba(8, 8, 12, 0.95) 0%,
            rgba(8, 8, 12, 0.9) 100%
          );
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .navbar.hidden {
          transform: translateY(-100%);
          opacity: 0;
        }

        .navbar-container {
          max-width: 1600px;
          margin: 0 auto;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2.5rem;
          position: relative;
          z-index: 2;
        }

        /* Logo with 3D Effect */
        .logo-link {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          text-decoration: none;
          z-index: 2003;
          position: relative;
          pointer-events: auto;
          cursor: pointer;
        }

        .logo-3d {
          position: relative;
          width: 64px;
          height: 64px;
          transform-style: preserve-3d;
          transform: perspective(500px) rotateX(10deg);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .logo-3d:hover {
          transform: perspective(500px) rotateX(0deg) translateY(-5px);
        }

        .logo-front {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 14px;
          border: 2px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateZ(10px);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .logo-3d:hover .logo-front {
          border-color: rgba(0, 240, 255, 0.3);
          box-shadow: 
            0 10px 30px rgba(0, 240, 255, 0.2),
            inset 0 0 30px rgba(0, 240, 255, 0.1);
        }

        .logo-side {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 240, 255, 0.3), rgba(0, 255, 149, 0.3));
          border-radius: 14px;
          transform: translateZ(-5px) translateY(5px);
          filter: blur(2px);
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .logo-3d:hover .logo-side {
          transform: translateZ(-8px) translateY(8px);
          opacity: 0.8;
        }

        .navbar-logo {
          border-radius: 12px;
          object-fit: cover;
          transition: all 0.3s ease;
        }

        .logo-glow {
          position: absolute;
          inset: -15px;
          background: radial-gradient(circle at center, 
            rgba(0, 240, 255, 0.4) 0%,
            rgba(0, 255, 149, 0.2) 40%,
            transparent 70%);
          filter: blur(20px);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .logo-3d:hover .logo-glow {
          opacity: 1;
        }

        .logo-text-container {
          display: flex;
          flex-direction: column;
        }

        .logo-text {
          font-weight: 900;
          letter-spacing: 2px;
          background: linear-gradient(135deg, #ffffff 0%, #a0e7ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 1.3rem;
          text-shadow: 0 4px 30px rgba(160, 231, 255, 0.3);
        }

        .logo-subtitle {
          font-size: 0.7rem;
          letter-spacing: 3px;
          color: rgba(255, 255, 255, 0.4);
          margin-top: 2px;
          font-weight: 300;
          text-transform: uppercase;
        }

        .logo-3d.small {
          width: 44px;
          height: 44px;
          transform: none;
        }

        /* Desktop Navigation */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 3rem;
          flex: 1;
          justify-content: center;
        }

        .nav-links-wrapper {
          display: flex;
          gap: 0.2rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 50px;
          padding: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
        }

        .nav-item {
          position: relative;
          padding: 0.5rem 0;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.5rem;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          border-radius: 30px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 2;
          border: 1px solid transparent;
          cursor: pointer;
          pointer-events: auto;
        }

        .nav-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .nav-link.active {
          color: #00f0ff;
          background: rgba(0, 240, 255, 0.1);
          border-color: rgba(0, 240, 255, 0.2);
        }

        .nav-icon {
          font-size: 1.1rem;
          opacity: 0.8;
          transition: opacity 0.3s ease;
        }

        .nav-link:hover .nav-icon,
        .nav-link.active .nav-icon {
          opacity: 1;
          transform: scale(1.1);
        }

        .nav-label {
          font-weight: 600;
          font-size: 0.9rem;
          letter-spacing: 0.5px;
        }

        .active-glow {
          position: absolute;
          inset: 0;
          border-radius: 30px;
          background: radial-gradient(circle at center, 
            rgba(0, 240, 255, 0.2) 0%,
            transparent 70%);
          filter: blur(10px);
          opacity: 0;
          animation: pulseActive 2s infinite;
        }

        @keyframes pulseActive {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .nav-hover-effect {
          position: absolute;
          inset: 0;
          border-radius: 30px;
          background: linear-gradient(135deg, 
            rgba(0, 240, 255, 0.2) 0%,
            rgba(0, 255, 149, 0.2) 100%);
          filter: blur(15px);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
          pointer-events: none; /* Do not block clicks */
        }

        .nav-hover-effect.visible {
          opacity: 0.5;
        }

        /* CTA Button */
        .nav-cta {
          margin-left: auto;
        }

        .cta-button {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 2rem;
          background: linear-gradient(135deg, 
            rgba(0, 240, 255, 0.1) 0%,
            rgba(0, 255, 149, 0.1) 100%);
          border: 1px solid rgba(0, 240, 255, 0.3);
          border-radius: 50px;
          color: #00f0ff;
          text-decoration: none;
          font-weight: 700;
          letter-spacing: 1px;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          pointer-events: auto;
        }

        .cta-button:hover {
          transform: translateY(-3px) scale(1.02);
          background: linear-gradient(135deg, 
            rgba(0, 240, 255, 0.15) 0%,
            rgba(0, 255, 149, 0.15) 100%);
          border-color: rgba(0, 240, 255, 0.6);
          box-shadow: 
            0 10px 30px rgba(0, 240, 255, 0.3),
            0 0 60px rgba(0, 240, 255, 0.1);
        }

        .cta-text {
          position: relative;
          z-index: 2;
        }

        .cta-icon {
          position: relative;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .arrow-line {
          width: 12px;
          height: 2px;
          background: #00f0ff;
          position: absolute;
          right: 0;
          transition: width 0.3s ease;
        }

        .arrow-head {
          width: 6px;
          height: 6px;
          border-right: 2px solid #00f0ff;
          border-top: 2px solid #00f0ff;
          transform: rotate(45deg);
          position: absolute;
          right: 0;
          transition: transform 0.3s ease;
        }

        .cta-button:hover .arrow-line {
          width: 16px;
        }

        .cta-button:hover .arrow-head {
          transform: rotate(45deg) translate(2px, -2px);
        }

        .cta-hologram {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          transform: translateX(-100%);
          transition: transform 0.6s ease;
          z-index: 1;
        }

        .cta-button:hover .cta-hologram {
          transform: translateX(100%);
        }

        /* Mobile Menu Button */
        .holographic-btn {
          display: none;
          position: relative;
          width: 56px;
          height: 56px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          cursor: pointer;
          padding: 0;
          z-index: 2001;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .holographic-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(0, 240, 255, 0.3);
          transform: translateY(-2px);
        }

        .holographic-btn.active {
          background: rgba(0, 240, 255, 0.1);
          border-color: rgba(0, 240, 255, 0.4);
        }

        .btn-inner {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 6px;
          z-index: 2;
        }

        .line {
          display: block;
          width: 24px;
          height: 2px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 2px;
          transition: all 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
        }

        .holographic-btn.active .top {
          transform: translateY(8px) rotate(45deg);
          background: #00f0ff;
        }

        .holographic-btn.active .middle {
          opacity: 0;
          transform: scale(0);
        }

        .holographic-btn.active .bottom {
          transform: translateY(-8px) rotate(-45deg);
          background: #00f0ff;
        }

        .btn-glow {
          position: absolute;
          inset: -10px;
          background: radial-gradient(circle at center, 
            rgba(0, 240, 255, 0.3) 0%,
            transparent 70%);
          filter: blur(15px);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .holographic-btn:hover .btn-glow {
          opacity: 0.5;
        }

        .holographic-btn.active .btn-glow {
          opacity: 0.8;
        }

        /* Mobile Menu Container */
        .mobile-menu-container {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 30001;
          pointer-events: none;
          visibility: hidden; /* Ensure it's hidden from interactivity */
        }

        .mobile-menu-container.open {
          pointer-events: all;
          visibility: visible;
        }

        .mobile-menu-glass {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          max-width: 450px;
          height: 100%;
          background: rgba(10, 10, 15, 0.98);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          border-left: 1px solid rgba(255, 255, 255, 0.1);
          transform: translateX(100%);
          opacity: 0;
          transition: all 0.5s cubic-bezier(0.77, 0, 0.175, 1);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }

        .mobile-menu-container.open .mobile-menu-glass {
          transform: translateX(0);
          opacity: 1;
        }

        /* Mobile Menu Header */
        .mobile-menu-header {
          padding: 2.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .mobile-logo {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .menu-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(0, 255, 68, 0.1);
          border: 1px solid rgba(0, 255, 68, 0.3);
          border-radius: 20px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: #00ff44;
          border-radius: 50%;
          box-shadow: 0 0 10px #00ff44;
          animation: statusPulse 2s infinite;
        }

        @keyframes statusPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .status-text {
          font-size: 0.8rem;
          font-weight: 600;
          color: #00ff44;
          letter-spacing: 1px;
        }

        /* Mobile Navigation Grid */
        .mobile-nav-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          padding: 2.5rem;
          flex: 1;
        }

        .mobile-nav-card {
          position: relative;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .mobile-nav-card:hover {
          transform: translateY(-5px) scale(1.02);
          border-color: rgba(0, 240, 255, 0.2);
          box-shadow: 0 10px 30px rgba(0, 240, 255, 0.1);
        }

        .mobile-nav-card.admin-card {
          background: rgba(255, 200, 0, 0.05);
          border-color: rgba(255, 200, 0, 0.1);
          grid-column: 1 / -1;
        }

        .mobile-nav-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          text-decoration: none;
          color: rgba(255, 255, 255, 0.8);
          position: relative;
          z-index: 2;
          height: 100%;
        }

        .mobile-nav-link.active {
          color: #00f0ff;
        }

        .mobile-nav-card.admin-card .mobile-nav-link.active {
          color: #ffcc00;
        }

        .card-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
          opacity: 0.8;
          transition: all 0.3s ease;
        }

        .mobile-nav-link.active .card-icon,
        .mobile-nav-link:hover .card-icon {
          opacity: 1;
          transform: scale(1.1);
        }

        .card-label {
          font-weight: 600;
          font-size: 0.9rem;
          letter-spacing: 0.5px;
          text-align: center;
        }

        .card-active-indicator {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 12px;
          height: 12px;
        }

        .pulse-ring {
          position: absolute;
          inset: 0;
          border: 2px solid #00f0ff;
          border-radius: 50%;
          animation: ringPulse 2s infinite;
        }

        @keyframes ringPulse {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }

        .card-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, 
            rgba(0, 240, 255, 0.1) 0%,
            transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .mobile-nav-card:hover .card-glow {
          opacity: 0.5;
        }

        /* Mobile CTA */
        .mobile-cta-section {
          padding: 2.5rem;
          padding-top: 0;
        }

        .mobile-cta-button {
          display: block;
          padding: 1.5rem 2rem;
          background: linear-gradient(135deg, 
            rgba(0, 240, 255, 0.1) 0%,
            rgba(0, 255, 149, 0.1) 100%);
          border: 1px solid rgba(0, 240, 255, 0.3);
          border-radius: 20px;
          color: #00f0ff;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .mobile-cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0, 240, 255, 0.2);
          border-color: rgba(0, 240, 255, 0.6);
        }

        .cta-main-text {
          display: block;
          font-size: 1.3rem;
          font-weight: 800;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
          position: relative;
          z-index: 2;
        }

        .cta-subtext {
          display: block;
          font-size: 0.9rem;
          opacity: 0.8;
          position: relative;
          z-index: 2;
        }

        .cta-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            45deg,
            transparent,
            rgba(0, 240, 255, 0.1),
            transparent
          );
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .mobile-cta-button:hover .cta-gradient {
          transform: translateX(100%);
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .navbar-container {
            padding: 0 2rem;
          }
          
          .desktop-nav {
            gap: 2rem;
          }
          
          .nav-links-wrapper {
            gap: 0.1rem;
          }
          
          .nav-link {
            padding: 0.75rem 1.25rem;
          }
        }

        @media (max-width: 1024px) {
          .desktop-nav {
            display: none;
          }
          
          .holographic-btn {
            display: block;
          }
          
          .mobile-menu-container {
            display: block;
          }
          
          .navbar-container {
            padding: 0 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .navbar {
            height: 80px;
          }
          
          .navbar.scrolled {
            height: 70px;
          }
          
          .logo-3d {
            width: 44px;
            height: 44px;
          }
          
          .logo-text {
            font-size: 1.1rem;
          }
          
          .mobile-menu-glass {
            max-width: 100%;
          }
          
          .mobile-nav-grid {
            grid-template-columns: 1fr;
            gap: 0.75rem;
            padding: 2rem;
          }
          
          .mobile-menu-header {
            padding: 2rem;
          }
          
          .mobile-cta-section {
            padding: 2rem;
          }
        }

        @media (max-width: 480px) {
          .navbar-container {
            padding: 0 1rem;
          }
          
          .logo-subtitle {
            display: none;
          }
          
          .holographic-btn {
            width: 48px;
            height: 48px;
          }
          
          .mobile-nav-link {
            padding: 1.5rem 1rem;
          }
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .navbar,
          .nav-link,
          .cta-button,
          .mobile-menu-glass,
          .mobile-nav-card,
          .holographic-btn {
            transition: none;
          }
          
          .active-glow,
          .pulse-ring,
          .status-dot {
            animation: none;
          }
          
          .mobile-nav-card:hover {
            transform: none;
          }
        }
      `}</style>
    </nav>
  );
}
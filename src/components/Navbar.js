'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 4);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link href="/" className="logo-link">
          <div className="logo-wrapper">
            <Image src="/assets/logo.jpg" alt="Logo" width={40} height={40} className="navbar-logo" />
            <div className="logo-glow"></div>
          </div>
          <span className="logo-text">ANAS NIDIR</span>
        </Link>

        <div className={`nav-overlay ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(false)}></div>

        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li className="mobile-header">
            <span className="logo-text">NAVIGATION</span>
            <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
          </li>
          <li><Link href="/#home" className={pathname === '/' ? 'active' : ''} onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link href="/#projects" onClick={() => setIsOpen(false)}>Projects</Link></li>
          <li><Link href="/#products" onClick={() => setIsOpen(false)}>Products</Link></li>
          <li><Link href="/blog" onClick={() => setIsOpen(false)}>Blog</Link></li>
          <li><Link href="/#contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
          <li className="mobile-only"><Link href="/admin" onClick={() => setIsOpen(false)}>Admin Engine</Link></li>
        </ul>

        <div className="nav-actions">
          <Link href="#projects" className="btn-nav">Explore Now</Link>
          <button
            className={`hamburger ${isOpen ? 'active' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <style jsx>{`
                .navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 80px;
                    z-index: 2000;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    background: transparent;
                }
                .navbar.scrolled {
                    height: 70px;
                    background: rgba(5, 5, 5, 0.8);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(0, 240, 255, 0.1);
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                }
                .navbar-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 40px;
                }

                .logo-link {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    text-decoration: none;
                    transition: transform 0.3s;
                }
                .logo-link:hover { transform: scale(1.02); }
                .logo-wrapper { position: relative; width: 40px; height: 40px; }
                .navbar-logo { border-radius: 10px; z-index: 2; position: relative; }
                .logo-glow {
                    position: absolute;
                    inset: -5px;
                    background: #00f0ff;
                    filter: blur(15px);
                    opacity: 0;
                    transition: opacity 0.3s;
                    border-radius: 50%;
                }
                .logo-link:hover .logo-glow { opacity: 0.4; }
                .logo-text {
                    font-weight: 900;
                    letter-spacing: 2px;
                    color: #fff;
                    font-size: 1.1rem;
                }

                .nav-links {
                    display: flex;
                    gap: 30px;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    align-items: center;
                }
                .nav-links li a {
                    color: rgba(255, 255, 255, 0.6);
                    text-decoration: none;
                    font-size: 0.9rem;
                    font-weight: 700;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    padding: 10px 0;
                    position: relative;
                    transition: color 0.3s;
                }
                .nav-links li a::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    width: 0;
                    height: 2px;
                    background: #00f0ff;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    transform: translateX(-50%);
                    box-shadow: 0 0 10px #00f0ff;
                }
                .nav-links li a:hover, .nav-links li a.active {
                    color: #fff;
                }
                .nav-links li a:hover::after, .nav-links li a.active::after {
                    width: 100%;
                }

                .btn-nav {
                    padding: 10px 25px;
                    background: rgba(0, 240, 255, 0.1);
                    border: 1px solid rgba(0, 240, 255, 0.3);
                    color: #00f0ff;
                    text-decoration: none;
                    border-radius: 100px;
                    font-weight: 800;
                    font-size: 0.85rem;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    transition: all 0.3s;
                }
                .btn-nav:hover {
                    background: #00f0ff;
                    color: #000;
                    box-shadow: 0 0 25px rgba(0, 240, 255, 0.4);
                }

                .hamburger {
                    display: none;
                    flex-direction: column;
                    gap: 6px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 10px;
                    z-index: 2001;
                }
                .hamburger span {
                    display: block;
                    width: 28px;
                    height: 2px;
                    background: #fff;
                    transition: all 0.3s;
                    border-radius: 2px;
                }
                .hamburger.active span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
                .hamburger.active span:nth-child(2) { opacity: 0; }
                .hamburger.active span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

                .mobile-header { display: none; }
                .nav-overlay {
                    display: none;
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(5px);
                    z-index: 1999;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.4s;
                }
                .nav-overlay.active { opacity: 1; pointer-events: auto; }

                @media (max-width: 1024px) {
                    .nav-links { gap: 20px; }
                    .navbar-container { padding: 0 20px; }
                }

                @media (max-width: 860px) {
                    .hamburger { display: flex; }
                    .btn-nav { display: none; }
                    .nav-links {
                        position: fixed;
                        top: 0;
                        right: -100%;
                        width: 320px;
                        height: 100vh;
                        background: rgba(5, 5, 5, 0.95);
                        backdrop-filter: blur(30px);
                        flex-direction: column;
                        padding: 100px 40px;
                        align-items: flex-start;
                        gap: 25px;
                        z-index: 2000;
                        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                        border-left: 1px solid rgba(255, 255, 255, 0.05);
                    }
                    .nav-links.open { right: 0; }
                    .mobile-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        width: 100%;
                        margin-bottom: 20px;
                        padding-bottom: 20px;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    }
                    .close-btn {
                        background: none;
                        border: none;
                        color: #fff;
                        font-size: 1.5rem;
                        cursor: pointer;
                    }
                    .nav-links li a { font-size: 1.2rem; }
                    .nav-overlay { display: block; }
                    .mobile-only { display: block; }
                }
            `}</style>
    </nav>
  );
}

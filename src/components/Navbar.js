'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 4);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="logo-container">
                <div className="logo-img">
                    {/* Note: Ensure logo.jpg is moved to public/assets/ */}
                    <Image src="/assets/logo.jpg" alt="MR ANAS NIDIR" width={36} height={36} className="navbar-logo" />
                </div>
                <div className="logo-text">MR ANAS NIDIR</div>
            </div>

            <ul className={`nav-links ${isOpen ? 'active' : ''}`} id="nav-links">
                <li className="close-btn" onClick={() => setIsOpen(false)}>✕</li>
                <li><Link href="/" className="active" onClick={() => setIsOpen(false)}>Home</Link></li>
                <li><Link href="/#projects" onClick={() => setIsOpen(false)}>Projects</Link></li>
                <li><Link href="/#products" onClick={() => setIsOpen(false)}>Products</Link></li>
                <li><Link href="/#about" onClick={() => setIsOpen(false)}>About</Link></li>
                <li><Link href="/#bio" onClick={() => setIsOpen(false)}>Biography</Link></li>
                <li><Link href="/#contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
                <li><Link href="/portfolio" onClick={() => setIsOpen(false)}>Portfolio</Link></li>
                <li><Link href="/blog" onClick={() => setIsOpen(false)}>Blog</Link></li>
            </ul>

            <button className="nav-btn" onClick={() => window.location.href = '#projects'}>Get Started</button>

            <button
                className="hamburger"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
            >
                <i className="fas fa-bars">☰</i>
            </button>

            <style jsx>{`
        .navbar {
          position: fixed; top: 0; left: 0; right: 0;
          height: 70px;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 16px; z-index: 1000;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255,255,255,.08);
          transition: box-shadow 0.3s;
        }
        .navbar.scrolled {
          box-shadow: 0 5px 20px rgba(0,0,0,0.35);
        }
        .logo-container { display: flex; align-items: center; gap: 10px; }
        .navbar-logo { border-radius: 6px; }
        .logo-text { font-weight: 700; letter-spacing: .5px; color: #00f0ff; }
        
        .nav-links { display: flex; gap: 18px; list-style: none; margin: 0; padding: 0; }
        .nav-links :global(a) { color: #fff; text-decoration: none; padding: 8px 4px; border-radius: 6px; transition: color .2s ease; }
        .nav-links :global(a:hover) { color: #00f0ff; }
        
        .nav-btn {
          background: transparent; border: 1px solid #00f0ff; color: #00f0ff;
          padding: .5rem 1rem; border-radius: 999px; cursor: pointer;
        }
        .hamburger { display: none; background: none; border: none; color: #fff; font-size: 1.6rem; cursor: pointer; }

        @media (max-width: 768px) {
          .hamburger { display: block; }
          .nav-btn { display: none; }
          .nav-links {
            position: fixed; top: 70px; left: -260px;
            width: 260px; height: calc(100vh - 70px);
            flex-direction: column; gap: 0; padding: 12px;
            background: rgba(0,0,0,.85); backdrop-filter: blur(14px);
            border-right: 1px solid rgba(255,255,255,.08);
            box-shadow: 8px 0 24px rgba(0,0,0,.4);
            transition: left .28s ease;
          }
          .nav-links.active { left: 0; }
          .close-btn {
            font-size: 1.8rem; color: #fff; cursor: pointer;
            align-self: flex-end; margin: 6px 6px 10px 0;
          }
        }
      `}</style>
        </nav>
    );
}

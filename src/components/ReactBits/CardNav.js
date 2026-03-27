/* eslint-disable react-hooks/set-state-in-effect */
'use client';
import { useLayoutEffect, useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const CardNav = ({
  logo = '/assets/logo.jpg',
  logoAlt = 'Anas Nidir Logo',
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#0a0a0a',
  menuColor = '#ffffff',
  buttonBgColor = '#00f0ff',
  buttonTextColor = '#000000'
}) => {
  // State for menu
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);
  const pathname = usePathname();
  const lastPath = useRef(pathname);



  useEffect(() => {
    // Initial State
    if (navRef.current) {
      gsap.set(navRef.current, { height: 70, overflow: 'hidden' });
      gsap.set(cardsRef.current, { y: 50, opacity: 0 });
    }
  }, []);

  const toggleMenu = (e) => {
    if (e) e.stopPropagation();
    const navEl = navRef.current;
    if (!navEl) return;

    console.log("[CardNav] toggleMenu called. Current isExpanded:", isExpanded);

    if (!isExpanded) {
      // OPEN
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      
      const targetHeight = "auto"; // Let GSAP handle auto height
      console.log("[CardNav] Opening to height:", targetHeight);

      gsap.killTweensOf(navEl);
      gsap.to(navEl, {
        height: targetHeight,
        duration: 0.5,
        ease: ease
      });

      const validCards = cardsRef.current.filter(Boolean);
      gsap.killTweensOf(validCards);
      gsap.to(validCards, { 
        y: 0, 
        opacity: 1, 
        duration: 0.4, 
        ease: ease, 
        stagger: 0.1,
        delay: 0.1
      });

    } else {
      // CLOSE
      setIsHamburgerOpen(false);
      console.log("[CardNav] Closing menu");
      
      gsap.killTweensOf(navEl);
      gsap.to(navEl, {
        height: 70,
        duration: 0.5,
        ease: ease,
        onComplete: () => {
          setIsExpanded(false);
          console.log("[CardNav] Close animation complete");
        }
      });

      const validCards = cardsRef.current.filter(Boolean);
      gsap.killTweensOf(validCards);
      gsap.to(validCards, { 
        y: 50, 
        opacity: 0, 
        duration: 0.3, 
        ease: ease
      });
    }
  };

  // Close menu when route changes
  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      setIsExpanded(false);
      setIsHamburgerOpen(false);
      if (navRef.current) {
         gsap.killTweensOf(navRef.current);
         gsap.killTweensOf(cardsRef.current);
         gsap.to(navRef.current, { height: 70, duration: 0.3, ease: ease });
         gsap.to(cardsRef.current, { y: 50, opacity: 0, duration: 0.2, ease: ease });
      }
    }
  }, [pathname, ease]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isExpanded && navRef.current && !navRef.current.contains(event.target)) {
         console.log("[CardNav] Click outside detected - closing");
         // Close logic
         setIsExpanded(false);
         setIsHamburgerOpen(false);
         gsap.killTweensOf(navRef.current);
         const validCards = cardsRef.current.filter(Boolean);
         gsap.killTweensOf(validCards);
         gsap.to(navRef.current, { height: 70, duration: 0.5, ease: ease });
         gsap.to(validCards, { y: 50, opacity: 0, duration: 0.3, ease: ease });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded, ease]);

  const setCardRef = i => el => {
    if (el) cardsRef.current[i] = el;
  };

  // Hide on user sites, admin pages, SavoirPedia, or Creovate
  if (pathname?.startsWith('/s/') || pathname?.startsWith('/admin') || pathname?.startsWith('/savoirpedia') || pathname?.startsWith('/creovate')) return null;

  return (
    <div className={`card-nav-container ${className}`}>
      <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`} style={{ backgroundColor: baseColor }}>
        <div className="card-nav-top">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
            onClick={(e) => toggleMenu(e)}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            tabIndex={0}
            style={{ color: menuColor }}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          <div className="logo-container">
            <Image src={logo} alt={logoAlt} width={48} height={48} className="logo" priority />
            <span className="logo-text">ANAS NIDIR</span>
          </div>

          <Link
            href="#contact"
            className="card-nav-cta-button"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            Let&apos;s Talk
          </Link>
        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((lnk, i) => (
                  <Link key={`${lnk.label}-${i}`} className="nav-card-link" href={lnk.href} aria-label={lnk.ariaLabel}>
                    <GoArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                    {lnk.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>

      <style jsx>{`
        .card-nav-container {
            position: fixed;
            top: calc(20px + env(safe-area-inset-top));
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 800px;
            z-index: 999999;
        }

        .card-nav {
            overflow: hidden;
            border-radius: 40px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
            border: 1px solid rgba(255,255,255,0.1);
        }

        .card-nav-top {
            height: 70px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
        }

        .hamburger-menu {
            width: 40px;
            height: 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 6px;
            cursor: pointer;
            border-radius: 50%;
            transition: background 0.3s;
        }
        .hamburger-menu:hover { background: rgba(255,255,255,0.05); }

        .hamburger-line {
            width: 20px;
            height: 2px;
            background-color: currentColor;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hamburger-menu.open .hamburger-line:first-child {
            transform: translateY(4px) rotate(45deg);
        }
        .hamburger-menu.open .hamburger-line:last-child {
            transform: translateY(-4px) rotate(-45deg);
        }

        .logo-container {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .logo {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            object-fit: cover;
        }
        .logo-text {
            font-weight: 800;
            letter-spacing: 0.1em;
            font-size: clamp(0.9rem, 1.2vw, 1.25rem);
            color: #fff;
        }

        .card-nav-cta-button {
            padding: 10px clamp(15px, 2vw, 24px);
            border-radius: 30px;
            font-weight: 700;
            text-decoration: none;
            font-size: clamp(0.75rem, 0.9vw, 0.9rem);
            transition: var(--transition-smooth);
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }
        .card-nav-cta-button:focus-visible {
            outline: 2px solid #fff;
            outline-offset: 4px;
        }
        .card-nav-cta-button:hover { 
            opacity: 1;
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
        }

        .card-nav-content {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            padding: 12px 12px 24px;
        }

        .nav-card {
            border-radius: 20px;
            padding: clamp(16px, 2.5vw, 32px);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: clamp(180px, 15vw, 240px);
            transition: var(--transition-ultra);
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.05);
        }
        .nav-card:focus-visible {
             outline: 3px solid var(--primary);
             outline-offset: 4px;
        }
        .nav-card::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, transparent, rgba(255,255,255,0.03), transparent);
            transform: translateX(-100%);
            transition: transform 0.6s;
        }
        .nav-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
            border-color: rgba(255,255,255,0.2);
        }
        .nav-card:hover::after {
            transform: translateX(100%);
        }

        .nav-card-label {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            font-weight: 800;
            opacity: 0.6;
        }

        .nav-card-links {
            display: flex;
            flex-direction: column;
            gap: clamp(8px, 1vw, 14px);
        }

        .nav-card-link {
            display: flex;
            align-items: center;
            gap: 10px;
            color: inherit;
            text-decoration: none;
            font-size: clamp(0.95rem, 1.1vw, 1.25rem);
            font-weight: 700;
            opacity: 0.85;
            transition: var(--transition-smooth);
        }
        .nav-card-link:focus-visible {
             text-decoration: underline;
             opacity: 1;
        }
        .nav-card-link:hover { opacity: 1; transform: translateX(5px); }

        .nav-card-link-icon {
            font-size: 0.9em;
            transform: rotate(45deg);
            transition: transform 0.4s var(--ease-out-expo);
        }
        .nav-card-link:hover .nav-card-link-icon {
            transform: rotate(0deg);
        }

        @media (max-width: 768px) {
            .card-nav-container { width: 94%; top: 15px; }
            .card-nav-content {
                grid-template-columns: 1fr;
                gap: 8px;
            }
            .nav-card {
                min-height: 100px;
                padding: 16px;
            }
            .logo-text { display: none; }
        }

        @media (min-width: 1920px) {
            .card-nav-container { max-width: 1200px; top: 40px; }
            .card-nav-top { height: 90px; padding: 0 30px; }
            .logo { width: 64px; height: 64px; }
        }
      `}</style>
    </div>
  );
};

export default CardNav;

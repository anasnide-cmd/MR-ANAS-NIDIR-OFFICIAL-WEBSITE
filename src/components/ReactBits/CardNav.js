'use client';
import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

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
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);
  const pathname = usePathname();

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      // In a real scenario, we might want to dynamically measure content.
      // For now, returning 'auto' via GSAP can be tricky, so we estimate or use a large enough value
      // or rely on `height: 'auto'` if GSAP supports it well in this context.
      // simpler approach: fixed large height or simple auto calculation.
      return 'auto';
    }
    return 300; // Increased height for desktop
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    // Initial states
    gsap.set(navEl, { height: 70, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.5,
      ease
    });

    tl.to(cardsRef.current, { 
      y: 0, 
      opacity: 1, 
      duration: 0.4, 
      ease, 
      stagger: 0.1 
    }, '-=0.2');

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease, items]);

  useEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;
      if (isExpanded) {
        // Recalculate if open
         const newHeight = calculateHeight();
         gsap.set(navRef.current, { height: newHeight });
      } else {
         // Reset if closed
         gsap.set(navRef.current, { height: 70 });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play();
    } else {
      setIsHamburgerOpen(false);
      tl.reverse();
      // Wait for reverse to finish to set expanded false? 
      // Actually GSAP reverse maps perfectly. 
      // We set isExpanded to false immediately or after safely?
      // Better to use state to track visual state.
      // But for logical `open` class, we toggle immediately or onReverseComplete.
      // Let's toggle immediately to match user intent, but maybe delay render logic if needed.
      // For simplicity/safety with GSAP:
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
    }
  };

  // Close menu when route changes
  useEffect(() => {
      if (isExpanded) {
          setIsHamburgerOpen(false);
          const tl = tlRef.current;
          if (tl) {
              tl.reverse();
              tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
          } else {
              setIsExpanded(false);
          }
      }
  }, [pathname]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isExpanded && navRef.current && !navRef.current.contains(event.target)) {
        setIsHamburgerOpen(false);
        const tl = tlRef.current;
        if (tl) {
            tl.reverse();
            tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
        } else {
            setIsExpanded(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const setCardRef = i => el => {
    if (el) cardsRef.current[i] = el;
  };

  // Hide on user sites, admin pages, or SavoirPedia (Wiki)
  if (pathname?.startsWith('/s/') || pathname?.startsWith('/admin') || pathname?.startsWith('/blog')) return null;

  return (
    <div className={`card-nav-container ${className}`}>
      <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`} style={{ backgroundColor: baseColor }}>
        <div className="card-nav-top">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            tabIndex={0}
            style={{ color: menuColor }}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          <div className="logo-container">
            <img src={logo} alt={logoAlt} className="logo" />
            <span className="logo-text">ANAS NIDIR</span>
          </div>

          <Link
            href="#contact"
            className="card-nav-cta-button"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            Let's Talk
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
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 800px;
            z-index: 10000;
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
            width: 32px;
            height: 32px;
            border-radius: 8px;
            object-fit: cover;
        }
        .logo-text {
            font-weight: 800;
            letter-spacing: 1px;
            font-size: 0.9rem;
            color: #fff;
        }

        .card-nav-cta-button {
            padding: 10px 20px;
            border-radius: 30px;
            font-weight: 700;
            text-decoration: none;
            font-size: 0.85rem;
            transition: opacity 0.3s;
        }
        .card-nav-cta-button:hover { opacity: 0.9; }

        .card-nav-content {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            padding: 10px 10px 20px;
            /* Hidden initially by logic, but layout needs structure */
        }

        .nav-card {
            border-radius: 20px;
            padding: 24px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 200px;
            transition: transform 0.3s;
        }
        .nav-card:hover {
            transform: translateY(-5px);
        }

        .nav-card-label {
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            font-weight: 700;
            opacity: 0.7;
        }

        .nav-card-links {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .nav-card-link {
            display: flex;
            align-items: center;
            gap: 8px;
            color: inherit;
            text-decoration: none;
            font-size: 1.1rem;
            font-weight: 600;
            opacity: 0.9;
            transition: opacity 0.2s;
        }
        .nav-card-link:hover { opacity: 1; }

        .nav-card-link-icon {
            font-size: 0.9rem;
            transform: rotate(45deg);
            transition: transform 0.3s;
        }
        .nav-card-link:hover .nav-card-link-icon {
            transform: rotate(0deg);
        }

        @media (max-width: 768px) {
            .card-nav-content {
                grid-template-columns: 1fr;
            }
            .nav-card {
                min-height: 120px;
                padding: 20px;
            }
        }
      `}</style>
    </div>
  );
};

export default CardNav;

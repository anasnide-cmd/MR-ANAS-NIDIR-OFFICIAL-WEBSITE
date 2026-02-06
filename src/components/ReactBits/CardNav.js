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

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 450;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      return 600;
    }
    return 450;
  };

  useEffect(() => {
    // Initial State
    if (navRef.current) {
      gsap.set(navRef.current, { height: 70, overflow: 'hidden' });
      gsap.set(cardsRef.current, { y: 50, opacity: 0 });
    }
  }, []);

  const toggleMenu = () => {
    const navEl = navRef.current;
    if (!navEl) return;

    if (!isExpanded) {
      // OPEN
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      
      const targetHeight = calculateHeight();

      gsap.to(navEl, {
        height: targetHeight,
        duration: 0.5,
        ease: ease
      });

      gsap.to(cardsRef.current, { 
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
      
      gsap.to(navEl, {
        height: 70,
        duration: 0.5,
        ease: ease,
        onComplete: () => setIsExpanded(false)
      });

      gsap.to(cardsRef.current, { 
        y: 50, 
        opacity: 0, 
        duration: 0.3, 
        ease: ease
      });
    }
  };

  // Close menu when route changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsExpanded(false);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHamburgerOpen(false);
    // Reset animations
    if (navRef.current) {
       gsap.to(navRef.current, { height: 70, duration: 0.5, ease: ease });
       gsap.to(cardsRef.current, { y: 50, opacity: 0, duration: 0.3, ease: ease });
    }
  }, [pathname, ease]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isExpanded && navRef.current && !navRef.current.contains(event.target)) {
         // Close logic
         setIsExpanded(false);
         setIsHamburgerOpen(false);
         gsap.to(navRef.current, { height: 70, duration: 0.5, ease: ease });
         gsap.to(cardsRef.current, { y: 50, opacity: 0, duration: 0.3, ease: ease });
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

  // Hide on user sites, admin pages, or SavoirPedia (Wiki)
  if (pathname?.startsWith('/s/') || pathname?.startsWith('/admin') || pathname?.startsWith('/savoirpedia')) return null;

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
            width: 48px;
            height: 48px;
            border-radius: 12px;
            object-fit: cover;
        }
        .logo-text {
            font-weight: 800;
            letter-spacing: 1.5px;
            font-size: 1rem;
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

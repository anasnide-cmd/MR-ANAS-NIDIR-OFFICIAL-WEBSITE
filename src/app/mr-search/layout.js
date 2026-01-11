'use client';
import { useState, useEffect } from 'react';
import { Orbitron, Exo_2 } from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' });
const exo2 = Exo_2({ subsets: ['latin'], variable: '--font-exo2' });

export default function SearchLayout({ children }) {
    const [theme, setTheme] = useState('cyan'); // cyan, purple, green

    useEffect(() => {
        const handleToggle = () => {
            setTheme(prev => {
                if (prev === 'cyan') return 'purple';
                if (prev === 'purple') return 'green';
                return 'cyan';
            });
        };
        window.addEventListener('mr-search-theme-toggle', handleToggle);
        return () => window.removeEventListener('mr-search-theme-toggle', handleToggle);
    }, []);

    const getThemeColor = () => {
        if (theme === 'purple') return '#be00ff';
        if (theme === 'green') return '#00ff41';
        return '#00f0ff'; // cyan
    };

    return (
        <div className={`search-wrapper ${orbitron.variable} ${exo2.variable} theme-${theme}`}>
            {children}
            <style jsx global>{`
                .search-wrapper {
                    min-height: 100vh;
                    background: #000;
                    color: #fff;
                    font-family: var(--font-exo2);
                    overflow-x: hidden;
                    --primary-glow: ${getThemeColor()};
                }
                
                /* Global overrides based on theme */
                .theme-cyan .glitch-text { text-shadow: 0 0 20px rgba(0, 240, 255, 0.5); }
                .theme-purple .glitch-text { text-shadow: 0 0 20px rgba(190, 0, 255, 0.5); }
                .theme-green .glitch-text { text-shadow: 0 0 20px rgba(0, 255, 65, 0.5); }

                .input-wrapper:focus-within { border-color: var(--primary-glow) !important; box-shadow: 0 0 30px var(--primary-glow) !important; }
                .chip:hover { color: var(--primary-glow) !important; border-color: var(--primary-glow) !important; background: rgba(255,255,255,0.05) !important; }
                .subtitle { color: var(--primary-glow) !important; }
                
                ::selection {
                    background: var(--primary-glow);
                    color: #000;
                }
            `}</style>
        </div>
    );
}

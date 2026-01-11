'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import SearchControlMenu from '../../components/SearchEngine/SearchControlMenu';
import SearchSettingsModal from '../../components/SearchEngine/SearchSettingsModal';
import AppLauncher from '../../components/SearchEngine/AppLauncher';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [settingsOpen, setSettingsOpen] = useState(false);
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/mr-search/results?q=${encodeURIComponent(query)}`);
        }
    };

    const toggleTheme = () => {
        window.dispatchEvent(new Event('mr-search-theme-toggle'));
    };

    return (
        <div className="search-landing">
            <div className="bg-grid"></div>
            
            {/* Control Menu */}
            <div className="top-controls">
                <AppLauncher />
                <SearchControlMenu 
                    onThemeToggle={toggleTheme} 
                    onOpenSettings={() => setSettingsOpen(true)}
                />
            </div>

            <SearchSettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />

            <main className="search-core">
                <motion.div 
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="logo-section"
                >
                    <h1 className="glitch-text" data-text="MR SEARCH">MR SEARCH</h1>
                    <span className="subtitle">THE SUPER ENGINE</span>
                </motion.div>

                <motion.form 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    onSubmit={handleSearch} 
                    className="search-form"
                >
                    <div className="input-wrapper glowing-border">
                        <input 
                            type="text" 
                            placeholder="INITIALIZE SEARCH PROTOCOL..." 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="search-input"
                            autoFocus
                        />
                        <button type="submit" className="btn-search">
                           🔍
                        </button>
                    </div>
                </motion.form>

                <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 1, duration: 1 }}
                     className="quick-actions"
                >
                    <button onClick={() => setQuery('Portfolio')} className="chip">PORTFOLIO</button>
                    <button onClick={() => setQuery('Mr Build')} className="chip">MR BUILD</button>
                    <button onClick={() => setQuery('AI Technology')} className="chip">AI TECH</button>
                </motion.div>
            </main>

            <style jsx>{`
                .search-landing {
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    background: radial-gradient(circle at center, #111 0%, #000 100%);
                }
                .top-controls {
                    position: absolute; top: 20px; right: 20px; z-index: 50;
                    display: flex; align-items: center; gap: 15px;
                }
                .bg-grid {
                    position: absolute; inset: 0;
                    background-image: 
                        linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px);
                    background-size: 50px 50px;
                    pointer-events: none;
                    mask-image: radial-gradient(circle at center, black 40%, transparent 80%);
                }

                .search-core {
                    z-index: 10;
                    text-align: center;
                    width: 100%;
                    max-width: 700px;
                    padding: 20px;
                }

                .logo-section { margin-bottom: 50px; }
                .glitch-text {
                    font-family: var(--font-orbitron);
                    font-size: 5rem;
                    font-weight: 900;
                    color: #fff;
                    letter-spacing: -2px;
                    transition: text-shadow 0.3s;
                }
                .subtitle {
                    letter-spacing: 5px;
                    font-size: 1rem;
                    font-weight: 700;
                    opacity: 0.8;
                }

                .search-form { width: 100%; }
                .input-wrapper {
                    position: relative;
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(20px);
                    border-radius: 50px;
                    padding: 5px 20px;
                    display: flex;
                    align-items: center;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    transition: all 0.3s;
                }

                .search-input {
                    background: transparent;
                    border: none;
                    width: 100%;
                    padding: 15px;
                    font-size: 1.2rem;
                    color: #fff;
                    font-family: var(--font-exo2);
                    outline: none;
                }
                .search-input::placeholder { color: rgba(255, 255, 255, 0.3); }

                .btn-search {
                    background: transparent;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    opacity: 0.7;
                    transition: all 0.2s;
                }
                .btn-search:hover { opacity: 1; transform: scale(1.1); }

                .quick-actions { margin-top: 30px; display: flex; gap: 15px; justify-content: center; }
                .chip {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: rgba(255, 255, 255, 0.6);
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                @media (max-width: 768px) {
                    .glitch-text { font-size: 3rem; }
                }
            `}</style>
        </div>
    );
}

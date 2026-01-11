'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSearchResults } from '../../../lib/searchService';
import SkeletonLoader from '../../../components/SkeletonLoader';
import SearchControlMenu from '../../../components/SearchEngine/SearchControlMenu';
import SearchSettingsModal from '../../../components/SearchEngine/SearchSettingsModal';
import AppLauncher from '../../../components/SearchEngine/AppLauncher';

function SearchResultsContent() {
    const searchParams = useSearchParams();
    const q = searchParams.get('q');
    const router = useRouter();
    const [query, setQuery] = useState(q || '');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');
    const [settingsOpen, setSettingsOpen] = useState(false);

    const toggleTheme = () => {
        window.dispatchEvent(new Event('mr-search-theme-toggle'));
    };

    useEffect(() => {
        if (q) {
            setQuery(q);
            setLoading(true);
            getSearchResults(q).then(res => {
                setResults(res);
                setLoading(false);
            });
        }
    }, [q]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/mr-search/results?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div className="results-container">
            <header className="results-header glass">
                <div className="header-top">
                    <Link href="/mr-search" className="logo-small">MR SEARCH</Link>
                    <form onSubmit={handleSearch} className="header-search-form">
                        <input 
                            type="text" 
                            value={query} 
                            onChange={(e) => setQuery(e.target.value)} 
                            className="header-input"
                        />
                         <button type="submit" className="header-btn">🔍</button>
                    </form>
                    <div className="header-controls">
                        <AppLauncher />
                        <SearchControlMenu 
                            onThemeToggle={toggleTheme}
                             onOpenSettings={() => setSettingsOpen(true)}
                        />
                    </div>
                </div>
                
                <SearchSettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />

                <div className="header-tabs">
                     {['All', 'Images', 'Videos', 'News', 'Maps'].map(tab => (
                         <button 
                            key={tab} 
                            className={`tab-btn ${activeTab === tab.toLowerCase() ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.toLowerCase())}
                        >
                             {tab}
                         </button>
                     ))}
                </div>
            </header>

            <main className="results-main">
                <p className="result-stats">
                    {loading ? 'Searching cosmos...' : `About ${results.length * 142000} results (0.${Math.floor(Math.random() * 90) + 10} seconds)`}
                </p>

                {loading ? (
                    <div className="skeletons">
                        {[1,2,3].map(i => (
                            <div key={i} className="res-card skeleton">
                                <SkeletonLoader height={20} width="60%" style={{marginBottom: 10}} />
                                <SkeletonLoader height={14} width="40%" style={{marginBottom: 10}} />
                                <SkeletonLoader height={60} width="90%" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="results-list">
                        {results.map(res => (
                            <div key={res.id} className="res-card animate-fade-in">
                                <div className="res-url">
                                    <span className="globe-icon">🌐</span>
                                    {res.url}
                                </div>
                                <h3><a href={res.url} target="_blank" rel="noopener noreferrer">{res.title}</a></h3>
                                <p className="res-snippet">{res.snippet}</p>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <style jsx>{`
                .results-container {
                    padding-top: 140px;
                    min-height: 100vh;
                    background: #000;
                }
                .results-header {
                    position: fixed;
                    top: 0; left: 0; right: 0;
                    background: rgba(10, 10, 10, 0.95);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 20px 20px 0;
                    z-index: 100;
                    backdrop-filter: blur(10px);
                }
                .header-top { display: flex; align-items: center; gap: 30px; margin-bottom: 20px; max-width: 1200px; margin-inline: auto; }
                .logo-small {
                    font-family: var(--font-orbitron);
                    font-weight: 900;
                    color: #fff;
                    text-decoration: none;
                    font-size: 1.2rem;
                }
                .header-search-form {
                    flex: 1;
                    max-width: 600px;
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                .header-input {
                    width: 100%;
                    padding: 12px 20px;
                    border-radius: 30px;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: #fff;
                    font-family: var(--font-exo2);
                    outline: none;
                    transition: border-color 0.3s;
                }
                .header-input:focus { border-color: #00f0ff; }
                .header-btn {
                    position: absolute; right: 15px; background: none; border: none; cursor: pointer; font-size: 1.1rem;
                }

                .header-controls {
                    display: flex; align-items: center; gap: 15px;
                }

                .header-tabs {
                    display: flex; gap: 20px; max-width: 1200px; margin: 0 auto;
                }
                .tab-btn {
                    background: none; border: none; color: rgba(255, 255, 255, 0.6);
                    padding: 10px 5px; cursor: pointer; font-size: 0.9rem;
                    border-bottom: 2px solid transparent;
                    transition: all 0.3s;
                }
                .tab-btn.active { color: #00f0ff; border-bottom-color: #00f0ff; }
                .tab-btn:hover { color: #fff; }

                .results-main {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .result-stats {
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 0.8rem;
                    margin-bottom: 30px;
                }

                .res-card {
                    margin-bottom: 30px;
                    max-width: 650px;
                }
                .res-url {
                    display: flex; align-items: center; gap: 8px;
                    font-size: 0.8rem; color: #fff; opacity: 0.7; margin-bottom: 5px;
                }
                .res-card h3 {
                    font-size: 1.3rem; margin: 0 0 5px;
                }
                .res-card h3 a {
                    color: #8ab4f8; text-decoration: none;
                }
                .res-card h3 a:hover { text-decoration: underline; }
                .res-snippet {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.9rem;
                    line-height: 1.6;
                }

                .animate-fade-in { animation: fadeIn 0.5s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                @media (max-width: 768px) {
                    .header-top { flex-direction: column; align-items: flex-start; gap: 10px; }
                    .header-search-form { width: 100%; }
                    .results-container { padding-top: 180px; }
                }
            `}</style>
        </div>
    );
}

export default function SearchResultsPage() {
    return (
        <Suspense fallback={<div style={{color: '#fff', padding: 50}}>Initializing...</div>}>
            <SearchResultsContent />
        </Suspense>
    );
}

'use client';
import { useEffect, useState, useRef } from 'react';
import MagneticWrapper from '../Effects/MagneticWrapper';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import Image from 'next/image';

export default function HubClient() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const q = query(collection(db, 'posts'), orderBy('date', 'desc'), limit(50));
                const snap = await getDocs(q);
                const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
                setPosts(data);
                setFilteredPosts(data);
            } catch (err) {
                console.error("Error fetching posts:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    // Derived state for stats
    const totalArticles = posts.length;
    const engineeringCount = posts.filter(p => (p.category || '').toLowerCase() === 'engineering').length;
    const designCount = posts.filter(p => (p.category || '').toLowerCase() === 'design').length;

    // Filter Logic
    const [activeCategory, setActiveCategory] = useState('All');
    
    useEffect(() => {
        let results = posts;
        
        // 1. Search Filter
        if (searchTerm) {
            results = results.filter(post =>
                (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.content.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // 2. Category Filter
        if (activeCategory !== 'All') {
            results = results.filter(post => (post.category || 'General') === activeCategory);
        }

        // 3. Status Filter (Legacy vs Active)
        results = results.filter(post => post.status === 'active' || !post.status);

        setFilteredPosts(results);
    }, [searchTerm, activeCategory, posts]);

    return (
        <main className="wiki-container">
            {/* HOLOGRAPHIC HERO DASHBOARD */}
            <header className="wiki-hero glass-panel">
                <div className="hero-content">
                    <div className="wiki-logo">
                        <span className="logo-symbol">S</span>
                        <div className="logo-text">
                            <h1>SavoirPedia</h1>
                            <p>SYSTEM KNOWLEDGE ARCHIVE</p>
                        </div>
                    </div>
                    
                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-val">{totalArticles}</span>
                            <span className="stat-label">ENTRIES</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-val online">ONLINE</span>
                            <span className="stat-label">SYSTEM STATUS</span>
                        </div>
                    </div>
                </div>

                <div className="hero-actions">
                     <MagneticWrapper strength={0.2}>
                        <Link href="/savoirpedia/dashboard" className="action-btn dashboard-btn">
                            <span>📊 MY DASHBOARD</span>
                        </Link>
                    </MagneticWrapper>
                    <MagneticWrapper strength={0.2}>
                        <Link href="/savoirpedia/editor" className="action-btn create-btn">
                            <span>+ NEW ENTRY</span>
                        </Link>
                    </MagneticWrapper>
                </div>
            </header>

            {/* CONTROL BAR: SEARCH & FILTERS */}
            <section className="control-bar">
                <div className="search-wrapper">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search the archive..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="spotlight-search"
                    />
                </div>
                
                <div className="filter-pills">
                    {['All', 'Engineering', 'Design', 'Product', 'General'].map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            <div className="wiki-main-content">
                {loading ? (
                    <div className="loading-state">
                        <div className="loader-spinner"></div>
                        <span>Decryption in progress...</span>
                    </div>
                ) : (
                    <div className="articles-grid">
                        <div className="grid-header">
                            <h3>{activeCategory === 'All' && !searchTerm ? "Latest Transmissions" : "Filtered Results"}</h3>
                            <div className="tech-line"></div>
                        </div>
                        
                        {filteredPosts.length > 0 ? (
                            <div className="posts-masonry">
                                {filteredPosts.map((post, index) => {
                                    // Extract first image
                                    const imgMatch = post.content.match(/<img[^>]+src="([^">]+)"/);
                                    const thumbnail = (imgMatch && imgMatch[1]) ? imgMatch[1] : '/assets/logo.jpg';
                                    
                                    return (
                                        <Link key={post.id} href={`/savoirpedia/post/${post.slug}`} className="post-card-wrapper">
                                            <MagneticWrapper strength={0.15}>
                                                <article className="post-card glass" style={{animationDelay: `${index * 50}ms`}}>
                                                    <div className="card-image-wrapper">
                                                        <Image src={thumbnail} alt={post.title} fill style={{objectFit: 'cover'}} />
                                                        <div className="card-overlay"></div>
                                                    </div>
                                                    <div className="card-content">
                                                        <div className="card-meta">
                                                            <span className="meta-cat">{post.category || 'General'}</span>
                                                            <span className="meta-date">{new Date(post.date).toLocaleDateString('en-US')}</span>
                                                        </div>
                                                        <h3 className="card-title">{post.title}</h3>
                                                    </div>
                                                </article>
                                            </MagneticWrapper>
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <span className="empty-icon">∅</span>
                                <p>No data found matching query param.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <style jsx global>{`
                body { padding-top: 0 !important; background: #050505; }
            `}</style>
            <style jsx>{`
                .wiki-container {
                    background: #050505;
                    color: #fff;
                    min-height: 100dvh;
                    padding: 40px 20px;
                    background-image: 
                        radial-gradient(circle at 15% 50%, rgba(0, 240, 255, 0.03) 0%, transparent 25%), 
                        radial-gradient(circle at 85% 30%, rgba(212, 175, 55, 0.03) 0%, transparent 25%);
                }

                /* GLASS PANEL HERO */
                .glass-panel {
                    position: relative; overflow: hidden; /* For pseudo-elements */
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 24px;
                    padding: 40px;
                    margin: 0 auto 40px auto;
                    max-width: 1400px;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    flex-wrap: wrap;
                    gap: 30px;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                }
                .glass-panel::before {
                    content: ''; position: absolute; inset: 0;
                    background: linear-gradient(0deg, transparent 50%, rgba(0, 240, 255, 0.02) 50%);
                    background-size: 100% 4px; z-index: 0; pointer-events: none;
                }
                
                .glass-panel::after {
                    content: ''; position: absolute; inset: 0;
                    background: radial-gradient(circle at 50% -50%, rgba(0, 240, 255, 0.1), transparent 70%);
                    pointer-events: none; z-index: 0;
                }

                .wiki-logo { display: flex; align-items: center; gap: 20px; position: relative; z-index: 1; }
                .logo-symbol { 
                    font-size: 3.5rem; font-family: 'Orbitron', sans-serif; 
                    background: linear-gradient(135deg, #fff, #888); 
                    -webkit-background-clip: text; color: transparent; 
                    font-weight: 900; 
                    filter: drop-shadow(0 0 15px rgba(0, 240, 255, 0.3));
                    transition: transform 0.5s;
                }
                .glass-panel:hover .logo-symbol { transform: rotate(10deg) scale(1.1); }

                .logo-text h1 { 
                    margin: 0; font-size: 2.5rem; font-family: 'Orbitron', sans-serif; 
                    letter-spacing: -1px; font-weight: 900; color: #fff; 
                    text-shadow: 0 5px 15px rgba(0,0,0,0.5);
                }
                .logo-text p { 
                    margin: 0; color: #00f0ff; font-size: 0.75rem; 
                    letter-spacing: 4px; text-transform: uppercase; font-weight: 700;
                    opacity: 0.8;
                }

                .hero-stats { display: flex; gap: 40px; position: relative; z-index: 1; }
                .stat-item { display: flex; flex-direction: column; align-items: flex-start; }
                .stat-val { font-family: 'Orbitron', sans-serif; font-size: 1.8rem; font-weight: 700; color: #fff; line-height: 1; }
                
                .stat-val.online { 
                    color: #00ff88; font-size: 1rem; padding-top: 8px; 
                    display: flex; align-items: center; gap: 8px;
                }
                .stat-val.online::before {
                    content: ''; width: 8px; height: 8px; background: #00ff88; border-radius: 50%;
                    box-shadow: 0 0 10px #00ff88; animation: pulse 2s infinite;
                }
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(0, 255, 136, 0.7); }
                    70% { box-shadow: 0 0 0 10px rgba(0, 255, 136, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(0, 255, 136, 0); }
                }

                .stat-label { font-size: 0.65rem; color: rgba(255,255,255,0.4); margin-top: 5px; letter-spacing: 1px; }

                .hero-actions { display: flex; gap: 15px; position: relative; z-index: 1; }
                .action-btn {
                    padding: 12px 24px;
                    border-radius: 12px;
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 0.8rem;
                    letter-spacing: 1px;
                    transition: all 0.3s;
                    display: inline-block;
                }
                .dashboard-btn { background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.1); }
                .dashboard-btn:hover { background: #fff; color: #000; box-shadow: 0 0 20px rgba(255,255,255,0.2); }
                .create-btn { background: #00f0ff; color: #000; border: 1px solid #00f0ff; box-shadow: 0 0 20px rgba(0, 240, 255, 0.3); }
                .create-btn:hover { background: #fff; border-color: #fff; color: #000; box-shadow: 0 0 30px rgba(255,255,255,0.5); }

                /* CONTROL BAR */
                .control-bar {
                    max-width: 1400px; margin: 0 auto 50px auto;
                    display: flex; gap: 20px; align-items: center; flex-wrap: wrap;
                    /* Sticky behaviors for mobile */
                    position: sticky; top: 10px; z-index: 50;
                    background: rgba(5, 5, 5, 0.8); backdrop-filter: blur(15px);
                    padding: 15px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05);
                }
                .search-wrapper {
                    flex-grow: 1; position: relative; max-width: 500px;
                }
                .search-icon { position: absolute; left: 20px; top: 50%; transform: translateY(-50%); opacity: 0.5; font-size: 0.9rem; }
                .spotlight-search {
                    width: 100%; padding: 16px 20px 16px 50px;
                    background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 50px; color: #fff; font-size: 1rem;
                    transition: all 0.3s;
                }
                .spotlight-search:focus { outline: none; border-color: #00f0ff; box-shadow: 0 0 20px rgba(0, 240, 255, 0.1); background: rgba(0,0,0,0.8); }

                .filter-pills { 
                    display: flex; gap: 10px; overflow-x: auto; padding-bottom: 5px; 
                    scrollbar-width: none; /* Firefox */
                    min-width: 0; max-width: 100%; /* Flexbox overflow safety */
                }
                .filter-pills::-webkit-scrollbar { display: none; /* Chrome/Safari */ }
                
                .filter-pill {
                    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
                    color: rgba(255,255,255,0.6); padding: 8px 18px; border-radius: 20px;
                    cursor: pointer; font-size: 0.8rem; transition: all 0.3s; white-space: nowrap;
                }
                .filter-pill:hover { background: rgba(255,255,255,0.1); color: #fff; }
                .filter-pill:active { transform: scale(0.95); }
                .filter-pill.active { background: #fff; color: #000; border-color: #fff; font-weight: 700; transform: scale(1.05); }

                /* GRID LAYOUT */
                .wiki-main-content { max-width: 1400px; margin: 0 auto; }
                .grid-header { display: flex; align-items: center; gap: 20px; margin-bottom: 30px; }
                .grid-header h3 { margin: 0; font-family: 'Orbitron', sans-serif; font-size: 1.2rem; color: #fff; white-space: nowrap; }
                .tech-line { height: 1px; background: linear-gradient(90deg, #00f0ff, transparent); width: 100%; opacity: 0.3; }

                .posts-masonry {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 30px;
                }

                .post-card {
                    background: #0a0a0a;
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 20px;
                    overflow: hidden;
                    display: flex; flex-direction: column;
                    height: 100%;
                    transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
                    animation: fadeUp 0.6s ease-out backwards;
                }
                .post-card:hover {
                    transform: translateY(-5px);
                    border-color: rgba(0, 240, 255, 0.3);
                    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
                }
                .post-card:active {
                    transform: scale(0.98);
                }

                .card-image-wrapper {
                    position: relative; height: 220px; width: 100%;
                }
                .card-overlay {
                    position: absolute; inset: 0;
                    background: linear-gradient(to top, #0a0a0a 0%, transparent 100%);
                    opacity: 0.8;
                }

                .card-content { padding: 25px; flex-grow: 1; display: flex; flex-direction: column; }
                .card-meta { display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 0.75rem; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 1px; }
                .meta-cat { color: #00f0ff; font-weight: 700; }

                .card-title {
                    font-size: 1.3rem; margin: 0; color: #fff;
                    font-family: 'Orbitron', sans-serif; line-height: 1.4;
                    font-weight: 700;
                }

                .loading-state, .empty-state {
                    text-align: center; padding: 100px 0; color: rgba(255,255,255,0.3);
                    font-family: 'Orbitron', sans-serif;
                }
                .loader-spinner {
                    width: 40px; height: 40px; border: 2px solid rgba(0, 240, 255, 0.1);
                    border-top-color: #00f0ff; border-radius: 50%;
                    animation: spin 1s linear infinite; margin: 0 auto 20px auto;
                }
                .empty-icon { font-size: 4rem; display: block; margin-bottom: 20px; opacity: 0.2; }

                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

                @media (max-width: 768px) {
                    .glass-panel { flex-direction: column; align-items: flex-start; padding: 30px 20px; }
                    .hero-actions { width: 100%; flex-direction: column; }
                    .action-btn { width: 100%; text-align: center; }
                    .control-bar { flex-direction: column; align-items: stretch; }
                    .search-wrapper { max-width: 100%; }
                    .posts-masonry { grid-template-columns: 1fr; }
                    
                    /* Mobile Header Fixes */
                    .wiki-logo { gap: 15px; }
                    .logo-symbol { font-size: 2.5rem; }
                    .logo-text h1 { font-size: 1.8rem; word-break: break-word; }
                    .logo-text p { font-size: 0.65rem; }
                    .hero-stats { gap: 20px; flex-wrap: wrap; }
                    .stat-val { font-size: 1.5rem; }
                }
            `}</style>
        </main>
    );
}

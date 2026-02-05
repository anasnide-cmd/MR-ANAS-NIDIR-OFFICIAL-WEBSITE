'use client';
import { useEffect, useState, useRef } from 'react';
import MagneticWrapper from '../Effects/MagneticWrapper';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
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
                const q = query(collection(db, 'posts'), orderBy('date', 'desc'));
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

    useEffect(() => {
        const results = posts.filter(post =>
            (post.status === 'active' || !post.status) && // Show active or legacy posts (no status)
            (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredPosts(results);
    }, [searchTerm, posts]);

    return (
        <main className="wiki-container">
            <header className="wiki-header">
                <div className="wiki-logo">
                    <span className="logo-symbol">S</span>
                    <div className="logo-text">
                        <h1>SavoirPedia</h1>
                        <p>The Free Knowledge Base</p>
                    </div>
                </div>
                <div className="wiki-search">
                    <Link href="/savoirpedia/dashboard" className="create-btn" style={{backgroundColor: '#333', color: '#fff', border: '1px solid #444', marginRight: '5px'}} title="My Dashboard">
                        📊 Dashboard
                    </Link>
                        <MagneticWrapper strength={0.2}>
                            <Link href="/savoirpedia/editor" className="create-btn">
                                CREATE ARTICLE
                            </Link>
                        </MagneticWrapper>
                    <input
                        type="text"
                        placeholder="Search database..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button className="search-btn">🔍</button>
                </div>
            </header>

            <div className="wiki-layout">
                <aside className="wiki-sidebar">
                    <nav className="wiki-nav">
                        <h3>Navigation</h3>
                        <ul>
                            <li><Link href="/">Main Page</Link></li>
                            <li><Link href="/savoirpedia/dashboard">My Dashboard</Link></li>
                            <li><Link href="/mr-build">Mr Build</Link></li>
                            <li><Link href="/mr-games">Games</Link></li>
                            <li><Link href="/#contact">Contact</Link></li>
                        </ul>
                    </nav>
                    <nav className="wiki-nav">
                        <h3>Portals</h3>
                        <ul>
                            <li><a href="#">Engineering</a></li>
                            <li><a href="#">Product</a></li>
                            <li><a href="#">Design</a></li>
                        </ul>
                    </nav>
                </aside>

                <div className="wiki-main-content">
                    {loading ? (
                        <div className="loading-state">Accessing Archives...</div>
                    ) : (
                        <>
                            <section className="welcome-banner white-panel">
                                <h2>Welcome to the Archive</h2>
                                <p>
                                    Welcome to the <strong>Mr Anas Nidir Official Knowledge Base</strong>, a collection of 
                                    documentation, articles, and devlogs maintained by the system administrator. 
                                    There are currently <strong>{posts.length}</strong> articles in the database.
                                </p>
                            </section>

                            <div className="articles-grid">
                                <div className="section-header">
                                    <h3>{searchTerm ? `Search Results for "${searchTerm}"` : "Latest Entries"}</h3>
                                    <div className="line"></div>
                                </div>
                                
                                {filteredPosts.length > 0 ? (
                                    <div className="posts-grid">
                                        {filteredPosts.map(post => {
                                            // Extract first image
                                            const imgMatch = post.content.match(/<img[^>]+src="([^">]+)"/);
                                            const thumbnail = (imgMatch && imgMatch[1]) ? imgMatch[1] : '/assets/logo.jpg';
                                            
                                            return (
                                                <Link key={post.id} href={`/savoirpedia/post/${post.slug}`} className="post-card glass no-underline" style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <MagneticWrapper strength={0.1} range={100}>
                                                        <div className="card-image">
                                                            <Image src={thumbnail} alt={post.title} width={400} height={180} />
                                                        </div>
                                                        <div className="card-content">
                                                            <div className="card-meta">
                                                                <span>{new Date(post.date).toLocaleDateString()}</span>
                                                                <span className="dot">•</span>
                                                                <span>{post.category || 'General'}</span>
                                                            </div>
                                                            <h3 className="card-title">{post.title}</h3>
                                                            <p className="card-snippet">
                                                                {post.content.replace(/<[^>]*>?/gm, '').substring(0, 120)}...
                                                            </p>
                                                        </div>
                                                    </MagneticWrapper>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p>No results found matching your query.</p>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <style jsx global>{`
                body { padding-top: 0 !important; }
            `}</style>
            <style jsx>{`
                .wiki-container {
                    background: #000;
                    color: var(--text);
                    min-height: 100vh;
                    padding: 40px 20px;
                }

                .wiki-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px solid var(--glass-border);
                    padding-bottom: 30px;
                    margin-bottom: 40px;
                    max-width: 1400px;
                    margin-left: auto;
                    margin-right: auto;
                }
                .wiki-logo { display: flex; align-items: center; gap: 20px; }
                .logo-symbol { font-size: 3.5rem; font-family: 'Orbitron', sans-serif; color: var(--primary); font-weight: 900; }
                .logo-text h1 { margin: 0; font-size: 2rem; font-family: 'Orbitron', sans-serif; letter-spacing: 2px; font-weight: 900; }
                .logo-text p { margin: 0; color: var(--text-dim); font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; }

                .wiki-search { display: flex; gap: 10px; align-items: center; }
                .create-btn {
                    padding: 10px 20px;
                    background: var(--glass-bg);
                    border: 1px solid var(--glass-border);
                    color: var(--text);
                    text-decoration: none;
                    font-weight: 900;
                    border-radius: 12px;
                    font-size: 0.85rem;
                    transition: all 0.3s;
                }
                .create-btn:hover { background: var(--primary); color: #000; border-color: var(--primary); transform: translateY(-2px); }
                
                .search-input {
                    padding: 12px 20px;
                    border: 1px solid var(--glass-border);
                    background: var(--glass-bg);
                    color: var(--text);
                    width: 300px;
                    border-radius: 12px;
                    outline: none;
                }
                .search-btn {
                    padding: 12px 20px;
                    background: var(--glass-bg);
                    border: 1px solid var(--glass-border);
                    color: var(--text);
                    cursor: pointer;
                    border-radius: 12px;
                }

                .wiki-layout {
                    display: grid;
                    grid-template-columns: 280px 1fr;
                    gap: 60px;
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .wiki-sidebar { font-size: 0.95rem; }
                .wiki-nav { margin-bottom: 40px; }
                .wiki-nav h3 {
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    border-bottom: 1px solid var(--glass-border);
                    margin-bottom: 15px;
                    padding-bottom: 10px;
                    color: var(--primary);
                    font-family: 'Orbitron', sans-serif;
                    letter-spacing: 3px;
                }
                .wiki-nav ul { list-style: none; padding: 0; }
                .wiki-nav li { margin-bottom: 12px; }
                .wiki-nav a { color: var(--text-dim); text-decoration: none; transition: all 0.2s; }
                .wiki-nav a:hover { color: var(--primary); padding-left: 5px; }

                .welcome-banner {
                    background: linear-gradient(135deg, rgba(0, 240, 255, 0.05), transparent);
                    border: 1px solid var(--primary);
                    border-left-width: 8px;
                    padding: 40px;
                    margin-bottom: 50px;
                    border-radius: 20px;
                }
                .welcome-banner h2 { 
                    margin-top: 0; 
                    font-family: 'Orbitron', sans-serif; 
                    color: var(--primary); 
                    font-weight: 900;
                    font-size: 1.8rem;
                }
                .welcome-banner p { color: var(--text-dim); font-size: 1.1rem; line-height: 1.7; }

                .section-header {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    margin-bottom: 30px;
                }
                .section-header h3 { 
                    margin: 0; white-space: nowrap; 
                    font-family: 'Orbitron', sans-serif; 
                    font-size: 1.4rem; 
                    font-weight: 900;
                }
                .section-header .line { height: 1px; background: var(--glass-border); width: 100%; }

                .posts-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 30px;
                }
                
                .post-card {
                    background: var(--glass-bg);
                    border: 1px solid var(--glass-border);
                    border-radius: 24px;
                    overflow: hidden;
                    transition: all 0.4s var(--ease-out-expo);
                    display: flex; flex-direction: column;
                }
                .post-card:hover {
                    transform: translateY(-10px);
                    border-color: var(--primary);
                    box-shadow: 0 10px 40px rgba(0, 240, 255, 0.1);
                }

                .card-image {
                    height: 200px;
                    width: 100%;
                    overflow: hidden;
                }
                
                .card-content { padding: 30px; flex-grow: 1; display: flex; flex-direction: column; }
                
                .card-title {
                    font-size: 1.4rem; margin-bottom: 12px;
                    color: var(--text); text-decoration: none;
                    font-family: 'Orbitron', sans-serif; font-weight: 900;
                    line-height: 1.3;
                    transition: color 0.3s;
                }
                .card-title:hover { color: var(--primary); }

                .card-meta {
                    font-size: 0.8rem; color: var(--text-dim); margin-bottom: 20px;
                    display: flex; align-items: center; gap: 10px;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    font-weight: 950;
                }
                .dot { color: var(--glass-border); }
                .card-snippet { font-size: 0.95rem; color: var(--text-dim); line-height: 1.7; margin: 0; }

                @media (max-width: 1024px) {
                    .wiki-layout { grid-template-columns: 1fr; }
                    .wiki-sidebar { display: none; }
                    .wiki-header { flex-direction: column; gap: 30px; align-items: center; text-align: center; }
                    .wiki-search { width: 100%; justify-content: center; flex-wrap: wrap; }
                    .search-input { width: 100%; max-width: 400px; }
                }
            `}</style>
        </main>
    );
}

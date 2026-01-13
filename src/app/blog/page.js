'use client';
import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import Link from 'next/link';

export default function BlogHub() {
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
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase())
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
                    <Link href="/blog/editor" className="create-btn" title="Contribute Article">
                        ✍️ Create
                    </Link>
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
                                    <ul className="article-list">
                                        {filteredPosts.map(post => (
                                            <li key={post.id} className="article-item">
                                                <Link href={`/blog/post?slug=${post.slug || '#'}`} className="article-link">
                                                    {post.title}
                                                </Link>
                                                <span className="article-meta">
                                                    last modified {new Date(post.date).toLocaleDateString()}
                                                </span>
                                                <p className="article-snippet">
                                                    {post.content.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No results found matching your query.</p>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <style jsx>{`
                .wiki-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                    font-family: 'Georgia', serif; /* Classic Wiki Feel */
                    background: #f6f6f6;
                    color: #000;
                    min-height: 100vh;
                }
                
                /* Dark Mode Override for consistency with main site if needed, 
                   but Wiki style usually implies white paper look. 
                   Let's stick to a "Dark Wiki" theme to match the site, 
                   OR a high-contrast inverted one if the user wants "Wiki" look.
                   Given "look like Wikipedia", standard implies white/light. 
                   However, the site is dark. Let's make a "Dark Wiki". */
                
                .wiki-container {
                    background: #1a1a1a;
                    color: #e0e0e0;
                    font-family: sans-serif; /* Modern Wiki */
                }

                .wiki-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px solid #333;
                    padding-bottom: 20px;
                    margin-bottom: 20px;
                }
                .wiki-logo { display: flex; align-items: center; gap: 15px; }
                .logo-symbol { font-size: 3rem; font-family: serif; color: #00f0ff; }
                .logo-text h1 { margin: 0; font-size: 1.5rem; font-family: serif; letter-spacing: 1px; }
                .logo-text p { margin: 0; opacity: 0.6; font-size: 0.8rem; }

                .wiki-search { display: flex; gap: 5px; }
                .create-btn {
                    padding: 8px 15px;
                    background: #00f0ff;
                    color: #000;
                    text-decoration: none;
                    font-weight: bold;
                    display: flex; align-items: center;
                }
                .search-input {
                    padding: 8px;
                    border: 1px solid #333;
                    background: #222;
                    color: #fff;
                    width: 250px;
                }
                .search-btn {
                    padding: 8px 15px;
                    background: #333;
                    border: 1px solid #333;
                    color: #fff;
                    cursor: pointer;
                }

                .wiki-layout {
                    display: grid;
                    grid-template-columns: 200px 1fr;
                    gap: 30px;
                }

                .wiki-sidebar {
                    font-size: 0.9rem;
                }
                .wiki-nav { margin-bottom: 20px; }
                .wiki-nav h3 {
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    border-bottom: 1px solid #333;
                    margin-bottom: 10px;
                    padding-bottom: 5px;
                    color: #00f0ff;
                }
                .wiki-nav ul { list-style: none; padding: 0; }
                .wiki-nav li { margin-bottom: 5px; }
                .wiki-nav a { color: #aaa; text-decoration: none; }
                .wiki-nav a:hover { color: #fff; text-decoration: underline; }

                .welcome-banner {
                    background: #222;
                    border: 1px solid #00f0ff;
                    border-left-width: 5px;
                    padding: 20px;
                    margin-bottom: 30px;
                }
                .welcome-banner h2 { margin-top: 0; font-family: serif; color: #00f0ff; }

                .section-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 20px;
                }
                .section-header h3 { margin: 0; white-space: nowrap; font-family: serif; font-size: 1.5rem; }
                .section-header .line { height: 1px; background: #333; width: 100%; }

                .article-list { list-style: none; padding: 0; }
                .article-item { margin-bottom: 25px; }
                .article-link {
                    display: block;
                    font-size: 1.2rem;
                    color: #00f0ff;
                    text-decoration: none;
                    margin-bottom: 5px;
                    font-family: serif;
                    font-weight: bold;
                }
                .article-link:hover { text-decoration: underline; }
                .article-meta { font-size: 0.8rem; color: #666; }
                .article-snippet { color: #ccc; line-height: 1.5; margin-top: 5px; }

                @media (max-width: 768px) {
                    .wiki-layout { grid-template-columns: 1fr; }
                    .wiki-sidebar { display: none; }
                    .wiki-header { flex-direction: column; gap: 20px; align-items: flex-start; }
                    .wiki-search { width: 100%; }
                    .search-input { width: 100%; }
                }
            `}</style>
        </main>
    );
}

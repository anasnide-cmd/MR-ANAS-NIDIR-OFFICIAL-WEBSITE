'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ShareButton from './ShareButton';
import MagneticWrapper from '../Effects/MagneticWrapper';

export default function WikiArticle({ article }) {
    const [scrolled, setScrolled] = useState(0);

    // Default image extraction if not provided
    const heroImage = article.image || '/assets/logo.jpg';

    // Scroll Progress Logic
    useEffect(() => {
        const handleScroll = () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            setScrolled(scrolled);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!article) {
        return (
            <div className="wiki-error">
                <h1>Data Not Found</h1>
                <p>The requested file is not in the system archives.</p>
                <Link href="/savoirpedia">Return to Base</Link>
            </div>
        );
    }

    const category = article.category || "Documentation";
    const author = article.author || "System Admin";

    return (
        <article className="wiki-wrapper">
            {/* READING PROGRESS BAR */}
            <div className="progress-container">
                <div className="progress-bar" style={{ width: `${scrolled}%` }}></div>
            </div>

            {/* HERO SECTION */}
            <header className="article-hero">
                <div className="hero-bg">
                    <Image src={heroImage} alt="Hero" fill style={{objectFit: 'cover'}} className="hero-img-blur" />
                    <div className="hero-overlay"></div>
                </div>
                
                <div className="hero-content">
                    <div className="hero-meta">
                        <span className="hero-cat">{category}</span>
                        <span className="hero-date">{new Date(article.date).toLocaleDateString()}</span>
                    </div>
                    <h1 className="hero-title">{article.title}</h1>
                    <div className="hero-actions">
                        <MagneticWrapper strength={0.2}><ShareButton title={article.title} /></MagneticWrapper>
                        <MagneticWrapper strength={0.2}>
                            <Link href="/savoirpedia" className="back-btn">← ARCHIVE</Link>
                        </MagneticWrapper>
                    </div>
                </div>
            </header>

            <div className="article-layout">
                <div className="main-col">
                    <div className="intro-block glass">
                        <p className="lead-paragraph">
                            <strong>{article.title}</strong> is a documented entry in the system archives, initialized by <strong>{author}</strong>. 
                            It serves as a primary intelligence source regarding {category.toLowerCase()}.
                        </p>
                    </div>

                    <div className="wiki-content-render" dangerouslySetInnerHTML={{ __html: article.content }} />

                    <div className="wiki-references">
                        <h3>System References</h3>
                        <ol className="refs-list">
                            <li>^ Original entry by {author}, {new Date(article.date).getFullYear()}.</li>
                            <li>^ System logs verification hash: #A8F-{Math.floor(Math.random()*999)}.</li>
                        </ol>
                    </div>
                </div>

                {/* SIDEBAR */}
                <aside className="side-col">
                    <div className="meta-card glass">
                        <div className="meta-card-header">System Data</div>
                        <div className="meta-row">
                            <span className="meta-label">ID</span>
                            <span className="meta-value mono">{article.id}</span>
                        </div>
                        <div className="meta-row">
                            <span className="meta-label">Author</span>
                            <span className="meta-value">{author}</span>
                        </div>
                        <div className="meta-row">
                            <span className="meta-label">Status</span>
                            <span className="status-badge verified">VERIFIED</span>
                        </div>
                    </div>

                    <div className="toc-card glass">
                        <div className="toc-header">Index</div>
                        <ul className="toc-list">
                            <li><a href="#overview">01. Overview</a></li>
                            <li><a href="#content">02. Core Data</a></li>
                            <li><a href="#references">03. References</a></li>
                        </ul>
                    </div>
                </aside>
            </div>

            <style jsx global>{`
                body { background: #050505; color: #fff; }
                
                /* CONTENT STYLES */
                .wiki-content-render {
                    font-size: 1.1rem; line-height: 1.8; color: rgba(255,255,255,0.85); margin-top: 30px;
                }
                .wiki-content-render h2 {
                    font-family: 'Orbitron', sans-serif; font-size: 1.5rem; color: #fff;
                    margin-top: 40px; margin-bottom: 20px; padding-bottom: 10px;
                    border-bottom: 1px solid rgba(0, 240, 255, 0.2);
                }
                .wiki-content-render p { margin-bottom: 20px; }
                .wiki-content-render ul { margin-left: 20px; margin-bottom: 20px; list-style-type: square; color: #00f0ff; }
                .wiki-content-render li span { color: rgba(255,255,255,0.85); }
                
                .wiki-content-render img {
                    max-width: 100%; border-radius: 12px; margin: 30px 0;
                    border: 1px solid rgba(255,255,255,0.1);
                }

                .wiki-error { 
                    padding: 100px; text-align: center; color: #fff; font-family: 'Orbitron', sans-serif; 
                }
            `}</style>
            <style jsx>{`
                .wiki-wrapper { padding-bottom: 100px; }

                /* PROGRESS BAR */
                .progress-container {
                    position: fixed; top: 0; left: 0; width: 100%; height: 3px; z-index: 9999;
                    background: transparent;
                }
                .progress-bar { height: 3px; background: #00f0ff; box-shadow: 0 0 10px #00f0ff; width: 0%; transition: width 0.1s; }

                /* HERO */
                .article-hero {
                    position: relative; height: 60vh; min-height: 400px; width: 100%;
                    display: flex; align-items: flex-end; justify-content: flex-start;
                    margin-bottom: 60px;
                }
                .hero-bg { position: absolute; inset: 0; z-index: -1; overflow: hidden; }
                .hero-overlay {
                    position: absolute; inset: 0;
                    background: linear-gradient(to top, #050505 0%, rgba(5,5,5,0.8) 50%, rgba(5,5,5,0.3) 100%);
                }
                .hero-content {
                    width: 100%; max-width: 1200px; margin: 0 auto; padding: 40px 20px;
                    position: relative; z-index: 10;
                }
                .hero-meta { display: flex; gap: 15px; margin-bottom: 15px; font-family: 'Orbitron', sans-serif; font-size: 0.9rem; }
                .hero-cat { color: #00f0ff; font-weight: 700; text-transform: uppercase; }
                .hero-date { color: rgba(255,255,255,0.6); }

                .hero-title {
                    font-size: 3.5rem; font-family: 'Orbitron', sans-serif; 
                    font-weight: 900; line-height: 1.1; margin: 0 0 30px 0;
                    text-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }
                .hero-actions { display: flex; gap: 20px; align-items: center; }

                .back-btn {
                    color: rgba(255,255,255,0.7); text-decoration: none; font-weight: 700; font-size: 0.9rem;
                    border: 1px solid rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 50px;
                    transition: all 0.3s;
                }
                .back-btn:hover { background: #fff; color: #000; border-color: #fff; }

                /* LAYOUT */
                .article-layout {
                    display: grid; grid-template-columns: 1fr 300px; gap: 50px;
                    max-width: 1200px; margin: 0 auto; padding: 0 20px;
                }

                .intro-block {
                    margin-bottom: 40px; padding: 30px; border-left: 4px solid #00f0ff;
                }
                .lead-paragraph { font-size: 1.2rem; line-height: 1.7; color: #fff; opacity: 0.9; margin: 0; }

                .glass {
                    background: rgba(255,255,255,0.03); backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.05); border-radius: 16px;
                }

                /* SIDEBAR */
                .side-col { display: flex; flex-direction: column; gap: 30px; }
                
                .meta-card { padding: 25px; }
                .meta-card-header { font-family: 'Orbitron', sans-serif; font-weight: 700; margin-bottom: 20px; color: rgba(255,255,255,0.5); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; }
                .meta-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.9rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 12px; }
                .meta-label { color: rgba(255,255,255,0.5); }
                .meta-value.mono { font-family: monospace; color: #00f0ff; }
                .status-badge { background: rgba(0, 255, 136, 0.1); color: #00ff88; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 700; }

                .toc-card { padding: 25px; position: sticky; top: 100px; }
                .toc-header { font-family: 'Orbitron', sans-serif; font-weight: 700; margin-bottom: 15px; color: #fff; }
                .toc-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
                .toc-list a { color: rgba(255,255,255,0.6); text-decoration: none; font-size: 0.9rem; transition: all 0.2s; display: block; }
                .toc-list a:hover { color: #00f0ff; padding-left: 5px; }

                .wiki-references { margin-top: 60px; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.5); }
                .wiki-references h3 { font-family: 'Orbitron', sans-serif; font-size: 1rem; color: #fff; margin-bottom: 15px; }
                .refs-list { padding-left: 20px; font-size: 0.85rem; }

                @media (max-width: 1024px) {
                    .article-layout { grid-template-columns: 1fr; }
                    .side-col { order: -1; }
                    .meta-card { display: flex; flex-wrap: wrap; gap: 20px; align-items: center; justify-content: space-between; }
                    .meta-row { border: none; margin: 0; padding: 0; gap: 10px; }
                    .toc-card { display: none; }
                }

                @media (max-width: 768px) {
                    .hero-title { font-size: 2.2rem; }
                    .article-hero { height: 50vh; min-height: 300px; }
                    .intro-block { padding: 20px; border-left-width: 2px; }
                }
            `}</style>
        </article>
    );
}

'use client';



import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ShareButton from './ShareButton';
import MagneticWrapper from '../Effects/MagneticWrapper';
import { Share2, Clock, Terminal, ChevronRight, X, Sparkles } from 'lucide-react';
import SavoirCopilot from './SavoirCopilot';

// 1. Decryption Animation Utility
const useDecryption = (text, active) => {
    const [display, setDisplay] = useState(active ? '' : text);
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    
    useEffect(() => {
        if (!active) return;
        
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplay(text.split('').map((char, index) => {
                if (index < iteration) return text[index];
                return chars[Math.floor(Math.random() * chars.length)];
            }).join(''));
            
            if (iteration >= text.length) clearInterval(interval);
            iteration += Math.ceil(text.length / 30); // Reveal speed
        }, 30);
        
        return () => clearInterval(interval);
    }, [text, active]);
    
    return active ? display : text;
};

export default function WikiArticle({ article, allArticles = [] }) {
    const [scrolled, setScrolled] = useState(0);
    const articleContent = article?.content;
    const articleSlug = article?.slug;
    const articleTitle = article?.title;
    const [activeSection, setActiveSection] = useState('overview');
    const [isDecrypting, setIsDecrypting] = useState(true);
    const [selection, setSelection] = useState({ text: '', x: 0, y: 0, show: false });
    const [copilotQuery, setCopilotQuery] = useState('');
    const [soundEnabled, setSoundEnabled] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [showCopilot, setShowCopilot] = useState(false);

    const wikiAuthor = article?.authorId || article?.author || 'Nexus Researcher';
    const wikiCategory = article?.category || "Documentation";

    // Default image extraction if not provided
    const heroImage = article?.image || '/assets/logo.jpg';

    // 1. Intelligence Helpers
    const calculateStats = (text) => {
        const words = text.replace(/<[^>]*>/g, '').split(/\s+/).length;
        const readTime = Math.ceil(words / 200);
        
        // Complexity logic: based on word count and "technical" keywords
        const techKeywords = ['system', 'quantum', 'algorithm', 'neural', 'interface', 'logic', 'protocol'];
        const techCount = techKeywords.filter(k => text.toLowerCase().includes(k)).length;
        
        let tier = "Tier 1: General";
        if (words > 500 || techCount > 2) tier = "Tier 2: Advanced";
        if (words > 1000 || techCount > 4) tier = "Tier 3: Expert";
        if (words > 2000 || techCount > 6) tier = "Tier 4: Master";
        
        return { readTime, tier };
    };

    const stats = useMemo(() => {
        if (!articleContent) return { readTime: 0, tier: "Tier 1: General" };
        return calculateStats(articleContent);
    }, [articleContent]);

    const decryptedTitle = useDecryption(articleTitle || '', isDecrypting);

    useEffect(() => {
        const timer = setTimeout(() => setIsDecrypting(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    // 2. Auto-Linker Logic
    const processedContent = useMemo(() => {
        if (!articleContent || !allArticles.length) return articleContent || '';

        let content = articleContent;
        
        // Sort articles by title length descending
        const sortedArticles = [...allArticles].sort((a, b) => b.title.length - a.title.length);

        sortedArticles.forEach(item => {
            if (item.slug === articleSlug) return;
            
            const escapedTitle = item.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(?<!<[^>]*)${escapedTitle}(?![^<]*>)`, 'gi');
            
            let replaced = false;
            content = content.replace(regex, (match) => {
                if (replaced) return match;
                replaced = true;
                return `<a href="/savoirpedia/post/${item.slug}" class="auto-link">${match}</a>`;
            });
        });

        return content;
    }, [articleContent, allArticles, articleSlug]);

    // 4. Highlight-to-Ask logic


    const handleMouseUp = (e) => {
        const selectedText = window.getSelection().toString().trim();
        if (selectedText.length > 5) {
            setSelection({
                text: selectedText,
                x: e.pageX,
                y: e.pageY,
                show: true
            });
        } else {
            setSelection({ ...selection, show: false });
        }
    };

    useEffect(() => {
        const handleClick = () => setSelection({ ...selection, show: false });
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [selection]);

    // 5. Soundscape Logic
    const playSound = (freq = 440, type = 'sine', duration = 0.1) => {
        if (!soundEnabled) return;
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch (e) {}
    };

    // 6. PDF Export & History
    const exportToPDF = () => {
        playSound(880, 'sine', 0.2);
        window.print();
    };

    // Scroll Progress & Active Section Logic
    useEffect(() => {
        const sections = ['overview', 'content', 'references'];
        const handleScroll = () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolledPercentage = (winScroll / height) * 100;
            setScrolled(scrolledPercentage);

            // Active section detection
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150) {
                        setActiveSection(section);
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 7. Guard: Check for null article before rendering
    if (!article) {
        return (
            <div className="wiki-error">
                <style jsx>{`
                    .wiki-error { 
                        padding: 100px; text-align: center; color: #fff; font-family: Orbitron, sans-serif; 
                        display: flex; flex-direction: column; align-items: center; gap: 20px;
                    }
                    .error-icon { font-size: 4rem; color: #ff3232; }
                    .back-link { color: #00f0ff; text-decoration: none; border: 1px solid #00f0ff; padding: 10px 20px; border-radius: 4px; }
                `}</style>
                <div className="error-icon">⚠️</div>
                <h1>CRITICAL_ERROR: DATA_MISSING</h1>
                <p>The requested intelligence payload is not present in the neural archives.</p>
                <Link href="/savoirpedia" className="back-link">RETURN TO HUB</Link>
            </div>
        );
    }

    return (
        <article className="wiki-wrapper">
            {/* READING PROGRESS BAR */}
            <div className="progress-container">
                <div className="progress-bar" style={{ width: `${scrolled}%` }}></div>
            </div>

            {/* HERO SECTION */}
            <header className="article-hero">
                <div className="hero-bg">
                    <Image src={heroImage} alt="Hero" fill style={{objectFit: 'cover'}} className="hero-img-blur" priority />
                    <div className="hero-overlay"></div>
                </div>
                
                <div className="hero-content">
                    <div className="hero-meta">
                        <span className="hero-cat">{wikiCategory}</span>
                        <div className="hero-intelligence">
                            <span className="intel-item">READ TIME: {stats.readTime} MIN</span>
                            <span className="intel-item">{stats.tier}</span>
                        </div>
                    </div>
                    <h1 className="hero-title">{isDecrypting ? decryptedTitle : article.title}</h1>
                    <div className="hero-actions">
                        <MagneticWrapper strength={0.2}><div onClick={() => playSound(880, 'triangle')}><ShareButton title={article.title} /></div></MagneticWrapper>
                        <MagneticWrapper strength={0.2}>
                            <Link href="/savoirpedia" className="back-btn" onMouseEnter={() => playSound(440, 'sine', 0.05)}>← ARCHIVE</Link>
                        </MagneticWrapper>
                        <button 
                            className={`sound-toggle ${soundEnabled ? 'active' : ''}`}
                            onClick={() => { setSoundEnabled(!soundEnabled); if(!soundEnabled) playSound(660, 'square', 0.1); }}
                        >
                            {soundEnabled ? 'AUDIO: ON' : 'AUDIO: OFF'}
                        </button>
                        <button className="btn-utility" onClick={exportToPDF} title="Generate Intelligence Report">
                            EXPORT REPORT
                        </button>
                        <button className="btn-utility" onClick={() => setShowHistory(true)} title="View System Logs">
                            HISTORY
                        </button>
                    </div>
                </div>
            </header>

            <div className="article-layout">
                <div className="main-col" onMouseUp={handleMouseUp}>
                    <div id="overview" className="intro-block glass">
                        <p className="lead-paragraph">
                            <strong>{article.title}</strong> is a documented entry in the system archives, initialized by <strong>{wikiAuthor}</strong>. 
                            It serves as a primary intelligence source regarding {wikiCategory.toLowerCase()}.
                        </p>
                    </div>

                    <div id="content" className={`wiki-content-render ${isDecrypting ? 'decrypting' : ''}`} dangerouslySetInnerHTML={{ __html: processedContent }} />

                    <div id="references" className="wiki-references">
                        <h3>System References</h3>
                        <ol className="refs-list">
                            <li>^ Original entry by {wikiAuthor}, {new Date(article.date).getFullYear()}.</li>
                            <li>^ System logs verification hash: #A8F-492.</li>
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
                            <span className="meta-value">{wikiAuthor}</span>
                        </div>
                        <div className="meta-row">
                            <span className="meta-label">Last Updated</span>
                            <span className="meta-value">{new Date(article.updatedAt || article.date).toLocaleDateString()}</span>
                        </div>
                        <div className="meta-row">
                            <span className="meta-label">Status</span>
                            <span className="status-badge verified">VERIFIED</span>
                        </div>
                    </div>

                    <div className="toc-card glass">
                        <div className="toc-header">
                            <span>Index</span>
                            <div className="scanning-line"></div>
                        </div>
                        <ul className="toc-list">
                            <li className={activeSection === 'overview' ? 'active' : ''} onClick={() => playSound(330)}><a href="#overview">01. Overview</a></li>
                            <li className={activeSection === 'content' ? 'active' : ''} onClick={() => playSound(330)}><a href="#content">02. Core Data</a></li>
                            <li className={activeSection === 'references' ? 'active' : ''} onClick={() => playSound(330)}><a href="#references">03. References</a></li>
                        </ul>
                    </div>
                </aside>
            </div>

            {/* HIGHLIGHT POPUP */}
            {selection.show && (
                <div 
                    className="highlight-popover glass"
                    style={{ top: selection.y - 60, left: selection.x - 50 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setCopilotQuery(`Explain this in the context of ${article.title}: "${selection.text}"`);
                        setShowCopilot(true);
                        setSelection({ ...selection, show: false });
                    }}
                >
                    <Sparkles size={14} /> ASK NEX AI
                </div>
            )}

            {/* AI SIDEBAR OVERLAY (Shared with Editor logic) */}
            {showCopilot && (
                <div className="ai-overlay-container">
                    <div className="ai-sidebar glass">
                        <div className="sidebar-header">
                            <h3>NEX INTELLIGENCE</h3>
                            <button onClick={() => setShowCopilot(false)} className="close-btn"><X size={16}/></button>
                        </div>
                        <div className="sidebar-content">
                            <SavoirCopilot 
                                currentTitle={article.title}
                                currentContent={article.content}
                                initialMessage={copilotQuery}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* HISTORY MODAL */}
            {showHistory && (
                <div className="history-overlay" onClick={() => setShowHistory(false)}>
                    <div className="history-modal glass" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>SYSTEM LOGS: {article.title}</h3>
                            <button onClick={() => setShowHistory(false)} className="close-btn"><X size={18}/></button>
                        </div>
                        <div className="modal-body">
                            <div className="log-entry">
                                <div className="log-time">{new Date(article.date).toLocaleString()}</div>
                                <div className="log-action">INITIAL_ENTRY_CREATED</div>
                                <div className="log-user">System Initialization: {wikiAuthor}</div>
                            </div>
                            {article.updatedAt && (
                                <div className="log-entry">
                                    <div className="log-time">{new Date(article.updatedAt).toLocaleString()}</div>
                                    <div className="log-action">ENTRY_REVISED</div>
                                    <div className="log-user">Updated by: {wikiAuthor}</div>
                                </div>
                            )}
                            <div className="log-entry future">
                                <div className="log-time">--/--/--</div>
                                <div className="log-action">AWAITING_FURTHER_DATA</div>
                                <div className="log-user">Nexus AI Sequence Pending...</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
                body { background: #050505; color: #fff; }
                
                /* CONTENT STYLES */
                .wiki-content-render.decrypting {
                    opacity: 0.5; filter: blur(2px); transition: all 1s;
                }
                .wiki-content-render {
                    font-size: 1.1rem; line-height: 1.8; color: rgba(255,255,255,0.85); margin-top: 30px;
                }
                .wiki-content-render h2 {
                    font-family: Orbitron, sans-serif; font-size: 1.5rem; color: #fff;
                    margin-top: 40px; margin-bottom: 20px; padding-bottom: 10px;
                    border-bottom: 1px solid rgba(0, 240, 255, 0.2);
                }
                .wiki-content-render p { margin-bottom: 20px; }
                
                /* Modular Blocks */
                .nex-alert {
                    background: rgba(255, 50, 50, 0.05); border: 1px solid rgba(255, 50, 50, 0.2);
                    padding: 15px; border-radius: 8px; margin: 25px 0; display: flex; gap: 15px;
                    align-items: center; border-left: 4px solid #ff3232;
                }
                .alert-icon { font-size: 1.5rem; }
                .alert-content { color: #ffcccc; font-size: 0.95rem; }

                .nex-data-scan {
                    background: rgba(0, 240, 255, 0.05); border: 1px solid rgba(0, 240, 255, 0.2);
                    padding: 0; border-radius: 8px; margin: 25px 0; overflow: hidden;
                    border-left: 4px solid #00f0ff;
                }
                .data-header { 
                    background: rgba(0, 240, 255, 0.1); padding: 8px 15px; 
                    font-family: Orbitron, sans-serif; font-size: 0.7rem; font-weight: 800;
                    color: #00f0ff; letter-spacing: 2px;
                }
                .data-body { padding: 15px; color: #ccfaff; font-size: 0.95rem; }

                .nex-code {
                    background: #111; padding: 20px; border-radius: 8px; margin: 25px 0;
                    border: 1px solid rgba(255,255,255,0.1); font-family: 'Fira Code', monospace;
                    font-size: 0.9rem; color: #00ff88; overflow-x: auto;
                }

                .wiki-content-render ul { margin-left: 20px; margin-bottom: 20px; list-style-type: square; color: #00f0ff; }
                .wiki-content-render li span { color: rgba(255,255,255,0.85); }
                
                .wiki-content-render img {
                    max-width: 100%; border-radius: 12px; margin: 30px 0;
                    border: 1px solid rgba(255,255,255,0.1);
                }

                .auto-link {
                    color: #00f0ff;
                    text-decoration: none;
                    border-bottom: 1px dashed rgba(0, 240, 255, 0.3);
                    transition: all 0.2s;
                }
                .auto-link:hover {
                    color: #fff;
                    border-bottom: 1px solid #00f0ff;
                    background: rgba(0, 240, 255, 0.05);
                }

                .wiki-error { 
                    padding: 100px; text-align: center; color: #fff; font-family: Orbitron, sans-serif; 
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
                    position: relative; height: 60dvh; min-height: 400px; width: 100%;
                    display: flex; align-items: flex-end; justify-content: flex-start;
                    margin-bottom: 60px;
                }
                .hero-bg { position: absolute; inset: 0; overflow: hidden; }
                .hero-overlay {
                    position: absolute; inset: 0;
                    background: linear-gradient(to top, #050505 0%, rgba(5,5,5,0.8) 50%, rgba(5,5,5,0.3) 100%);
                }
                .hero-content {
                    width: 100%; max-width: 1200px; margin: 0 auto; padding: 40px 20px;
                    position: relative; z-index: 10;
                }
                .hero-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; font-family: Orbitron, sans-serif; font-size: 0.9rem; flex-wrap: wrap; gap: 15px; }
                .hero-cat { color: #00f0ff; font-weight: 700; text-transform: uppercase; }
                .hero-date { color: rgba(255,255,255,0.8); }

                .hero-intelligence { display: flex; gap: 20px; }
                .intel-item { 
                    font-size: 0.7rem; color: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.1); 
                    padding: 4px 10px; border-radius: 4px; background: rgba(255,255,255,0.02);
                    letter-spacing: 1px; font-weight: 700;
                }

                .hero-title {
                    font-size: 3.5rem; font-family: Orbitron, sans-serif; 
                    font-weight: 900; line-height: 1.1; margin: 0 0 30px 0;
                    text-shadow: 0 10px 30px rgba(0,0,0,0.5);
                    word-break: break-word; overflow-wrap: break-word;
                }
                .hero-actions { display: flex; gap: 20px; align-items: center; }

                .back-btn {
                    color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 700; font-size: 0.9rem;
                    border: 1px solid rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 50px;
                    transition: all 0.3s;
                }
                .back-btn:hover { background: #fff; color: #000; border-color: #fff; }

                .sound-toggle {
                    background: transparent; border: 1px solid rgba(255,255,255,0.1);
                    color: rgba(255,255,255,0.4); font-family: Orbitron, sans-serif;
                    font-size: 0.7rem; padding: 8px 12px; border-radius: 4px; cursor: pointer;
                    transition: all 0.2s; letter-spacing: 1px;
                }
                .sound-toggle:hover { border-color: rgba(255,255,255,0.3); color: #fff; }
                .sound-toggle.active { color: #00f0ff; border-color: rgba(0, 240, 255, 0.3); background: rgba(0, 240, 255, 0.05); }

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
                .meta-card-header { font-family: Orbitron, sans-serif; font-weight: 700; margin-bottom: 20px; color: rgba(255,255,255,0.7); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; }
                .meta-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.9rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 12px; }
                .meta-label { color: rgba(255,255,255,0.7); }
                .meta-value.mono { font-family: monospace; color: #00f0ff; }
                .status-badge { background: rgba(0, 255, 136, 0.1); color: #00ff88; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 700; }
                .status-badge.verified { 
                    box-shadow: 0 0 5px rgba(0, 255, 136, 0.2); 
                    animation: badgePulse 2s infinite; 
                }
                @keyframes badgePulse {
                    0% { box-shadow: 0 0 0 0 rgba(0, 255, 136, 0.4); }
                    70% { box-shadow: 0 0 0 4px rgba(0, 255, 136, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(0, 255, 136, 0); }
                }

                .toc-card { padding: 25px; position: sticky; top: 100px; overflow: hidden; }
                .toc-header { 
                    font-family: Orbitron, sans-serif; font-weight: 700; margin-bottom: 20px; color: #fff; 
                    display: flex; justify-content: space-between; align-items: center; position: relative;
                }
                .scanning-line {
                    position: absolute; left: -25px; right: -25px; height: 1px;
                    background: linear-gradient(90deg, transparent, #00f0ff, transparent);
                    box-shadow: 0 0 10px #00f0ff;
                    animation: scan 3s linear infinite;
                    opacity: 0.5;
                }
                @keyframes scan {
                    0% { top: 0%; }
                    100% { top: 100%; }
                }

                .toc-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
                .toc-list li { border-left: 2px solid transparent; transition: all 0.3s; }
                .toc-list li.active { border-left: 2px solid #00f0ff; background: rgba(0, 240, 255, 0.05); }
                .toc-list a { color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.9rem; transition: all 0.2s; display: block; padding: 5px 15px; }
                .toc-list li.active a { color: #00f0ff; font-weight: 700; }
                .toc-list a:hover { color: #00f0ff; padding-left: 20px; }

                .highlight-popover {
                    position: absolute; z-index: 1000; padding: 8px 15px;
                    display: flex; align-items: center; gap: 8px; font-weight: 700;
                    font-size: 0.75rem; color: #00f0ff; cursor: pointer;
                    border: 1px solid rgba(0, 240, 255, 0.4); border-radius: 4px;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.5);
                    animation: popIn 0.2s ease-out;
                    font-family: Orbitron, sans-serif;
                }
                @keyframes popIn {
                    from { opacity: 0; transform: translateY(10px) scale(0.9); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                .ai-overlay-container {
                    position: fixed; inset: 0; z-index: 9999;
                    background: rgba(0,0,0,0.4); backdrop-filter: blur(2px);
                    display: flex; justify-content: flex-end;
                }
                .ai-sidebar {
                    width: 400px; height: 100%; border-left: 1px solid #333;
                    display: flex; flex-direction: column; animation: slideIn 0.3s ease-out;
                }
                @keyframes slideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }

                .wiki-references { margin-top: 60px; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.7); }
                .wiki-references h3 { font-family: Orbitron, sans-serif; font-size: 1rem; color: #fff; margin-bottom: 15px; }
                .refs-list { padding-left: 20px; font-size: 0.85rem; }

                .btn-utility {
                    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
                    color: rgba(255,255,255,0.8); font-family: Orbitron, sans-serif;
                    font-size: 0.7rem; padding: 8px 12px; border-radius: 4px; cursor: pointer;
                    transition: all 0.2s; letter-spacing: 1px;
                }
                .btn-utility:hover { border-color: #00f0ff; color: #fff; background: rgba(0, 240, 255, 0.05); }

                .history-overlay {
                    position: fixed; inset: 0; z-index: 99999; background: rgba(0,0,0,0.8);
                    backdrop-filter: blur(5px); display: flex; align-items: center; justify-content: center;
                    animation: fadeIn 0.3s ease-out;
                }
                .history-modal {
                    width: 500px; max-width: 90vw; background: #111; border: 1px solid #333;
                    border-radius: 12px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                }
                .modal-header {
                    padding: 20px; border-bottom: 1px solid #333; display: flex; justify-content: space-between;
                    align-items: center; background: #1a1a1a;
                }
                .modal-header h3 { margin: 0; font-size: 0.9rem; font-family: Orbitron, sans-serif; letter-spacing: 1px; color: #00f0ff; }
                .modal-body { padding: 25px; display: flex; flex-direction: column; gap: 20px; }
                .log-entry { border-left: 2px solid #00f0ff; padding-left: 15px; position: relative; }
                .log-entry.future { border-left-color: #333; opacity: 0.5; }
                .log-entry::before {
                    content: ""; position: absolute; left: -6px; top: 0; width: 10px; height: 10px;
                    border-radius: 50%; background: #00f0ff; box-shadow: 0 0 10px #00f0ff;
                }
                .log-entry.future::before { background: #333; box-shadow: none; }
                .log-time { font-family: Orbitron, sans-serif; font-size: 0.65rem; color: #666; margin-bottom: 5px; }
                .log-action { font-weight: 800; font-size: 0.8rem; letter-spacing: 1px; color: #fff; }
                .log-user { font-size: 0.75rem; color: #888; margin-top: 3px; }

                @media print {
                    .side-col, .hero-actions, .sound-toggle, .btn-utility, .ai-sidebar, .article-hero .hero-bg, .p-editor-toolbar { display: none !important; }
                    .article-hero { background: #fff !important; color: #000 !important; height: auto !important; padding: 50px 0 !important; }
                    .hero-title { color: #000 !important; font-size: 3rem !important; }
                    .intel-item { border-color: #000 !important; color: #000 !important; }
                    .article-layout { display: block !important; }
                    .main-col { width: 100% !important; color: #000 !important; }
                    body { background: #fff !important; color: #000 !important; font-family: "Georgia", serif !important; }
                    .wiki-content-render { font-size: 12pt !important; line-height: 1.6 !important; color: #000 !important; }
                    .lead-paragraph { border-bottom: 2px solid #000 !important; padding-bottom: 20px !important; margin-bottom: 40px !important; }
                    .intro-block { border: none !important; background: none !important; color: #000 !important; }
                    .auto-link { border-bottom: 1px solid #000 !important; color: #000 !important; }
                }

                @media (max-width: 1024px) {
                    .article-layout { grid-template-columns: 1fr; }
                    /* Move sidebar to bottom on mobile/tablet */
                    .side-col { order: 2; margin-top: 40px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 40px; }
                    
                    .meta-card { display: flex; flex-wrap: wrap; gap: 20px; align-items: center; justify-content: space-between; }
                    .meta-row { border: none; margin: 0; padding: 0; gap: 10px; }
                    
                    /* Make TOC horizontal scrollable or wrapped on mobile */
                    .toc-card { 
                        position: relative; top: 0; 
                        margin-top: 20px; padding: 20px; 
                    }
                    .toc-list { flex-direction: row; flex-wrap: wrap; gap: 15px 25px; }
                    .toc-list a { padding: 5px 0; }
                }

                @media (max-width: 768px) {
                    .article-hero { height: 40vh; min-height: 250px; margin-bottom: 40px; }
                    .hero-content { padding: 20px; bottom: 0; }
                    .hero-title { font-size: 2rem; margin-bottom: 20px; }
                    .hero-meta { font-size: 0.8rem; flex-wrap: wrap; gap: 10px; }
                    .hero-actions { width: 100%; flex-wrap: wrap; gap: 10px; }
                    .back-btn { font-size: 0.8rem; padding: 6px 14px; }
                    
                    .article-layout { gap: 30px; padding: 0 15px; }
                    
                    .intro-block { padding: 20px; border-left-width: 3px; border-radius: 12px; }
                    .lead-paragraph { font-size: 1rem; line-height: 1.6; }
                    
                    .wiki-content-render { font-size: 1rem; margin-top: 20px; }
                    .wiki-content-render h2 { font-size: 1.3rem; margin-top: 30px; }
                    
                    /* Sidebar Mobile specific */
                    .meta-card { flex-direction: column; align-items: flex-start; gap: 0; }
                    .meta-row { width: 100%; border-bottom: 1px solid rgba(255,255,255,0.05); padding: 10px 0; justify-content: space-between; }
                    .meta-row:last-child { border-bottom: none; }

                    .hero-meta { flex-direction: column; align-items: flex-start; gap: 10px; }
                    .hero-intelligence { width: 100%; justify-content: space-between; }
                }
            `}</style>
        </article>
    );
}

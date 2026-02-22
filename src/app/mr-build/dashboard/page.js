'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../../lib/firebase';
import { collection, query, where, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loader from '../../../components/Loader';
import SkeletonLoader from '../../../components/SkeletonLoader';
import { 
    Book, 
    Star, 
    GitBranch, 
    Eye, 
    Clock, 
    Box, 
    Settings, 
    LogOut,
    Plus,
    Search,
    Code,
    Layout,
    ChevronDown,
    X,
    TrendingUp
} from 'lucide-react';

import ArchitectModal from './ArchitectModal';

export default function BuildDashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [sites, setSites] = useState([]);
    const [userLimit, setUserLimit] = useState(1);
    const [unlockedTemplates, setUnlockedTemplates] = useState([]);
    const [showNewModal, setShowNewModal] = useState(false);
    const [showArchitect, setShowArchitect] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('repositories'); // 'repositories', 'stars', 'projects'

    // Template Definitions
    const TEMPLATES = {
        'blank': {
            files: {
                'index.html': { content: '<!-- New Project -->\n<h1>Hello World</h1>', language: 'html' },
                'styles.css': { content: 'body { background: #000; color: #fff; }', language: 'css' },
                'README.md': { content: '# New Project', language: 'markdown' }
            }
        },
        'cyberpunk': {
            files: {
                'index.html': { content: '<div class="cyber-card">\n  <h1>NEON FUTURE</h1>\n  <p>System Online</p>\n  <button>JACK IN</button>\n</div>', language: 'html' },
                'styles.css': { content: 'body { background: #050505; color: #00f0ff; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; font-family: monospace; }\n\n.cyber-card {\n  border: 1px solid #00f0ff;\n  padding: 40px;\n  box-shadow: 0 0 20px rgba(0,240,255,0.2);\n  text-align: center;\n}\n\nh1 { letter-spacing: 5px; text-shadow: 0 0 10px #00f0ff; }\n\nbutton {\n  background: #00f0ff; color: #000; border: none; padding: 10px 20px;\n  font-weight: bold; cursor: pointer; margin-top: 20px;\n}\nbutton:hover { box-shadow: 0 0 15px #00f0ff; }', language: 'css' },
                'README.md': { content: '# Cyberpunk Template\nA neon-soaked starting point.', language: 'markdown' }
            }
        },
        'saas': {
            files: {
                'index.html': { content: '<nav>\n  <h3>SaaS.io</h3>\n  <button>Get Started</button>\n</nav>\n<header>\n  <h1>Scale Your Business</h1>\n  <p>The ultimate platform for growth.</p>\n</header>', language: 'html' },
                'styles.css': { content: 'body { font-family: sans-serif; margin: 0; color: #333; }\nnav { display: flex; justify-content: space-between; padding: 20px; border-bottom: 1px solid #eee; }\nheader { text-align: center; padding: 100px 20px; }\nh1 { font-size: 3rem; margin-bottom: 10px; }\nbutton { background: #000; color: #fff; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }', language: 'css' },
                'README.md': { content: '# SaaS Landing Page\nClean, modern, convertible.', language: 'markdown' }
            }
        }
    };

    // Swipe State
    const [swipeState, setSwipeState] = useState({ id: null, startX: 0, currentX: 0, showAction: null });

    const triggerHaptic = (pattern = 20) => {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    };

    const handleTouchStart = (e, id) => {
        setSwipeState({ id, startX: e.touches[0].clientX, currentX: e.touches[0].clientX, showAction: null });
    };

    const handleTouchMove = (e) => {
        if (!swipeState.id) return;
        const currentX = e.touches[0].clientX;
        const diff = currentX - swipeState.startX;
        setSwipeState(prev => ({ ...prev, currentX }));
    };

    const handleTouchEnd = () => {
        if (!swipeState.id) return;
        const diff = swipeState.currentX - swipeState.startX;
        const threshold = 100;

        if (diff > threshold) {
            // Swipe Right -> Deploy/Enter
            triggerHaptic(50);
            router.push(`/mr-build/editor?id=${swipeState.id}`);
        } else if (diff < -threshold) {
             // Swipe Left -> Delete
             triggerHaptic([30, 50, 30]);
             if(confirm('Delete this project?')) {
                 // Trigger delete logic (would need a delete function, but for now just log/stub)
                 // In a real app we'd call deleteDoc
                 console.log('Delete ' + swipeState.id);
             }
        }
        
        setSwipeState({ id: null, startX: 0, currentX: 0, showAction: null });
    };

    useEffect(() => {
        const checkUser = onAuthStateChanged(auth, async (u) => {
            if (u) {
                setUser(u);
                try {
                    const userRef = doc(db, 'users', u.uid);
                    const userDoc = await getDoc(userRef);
                    
                    const profileUpdate = {
                        email: u.email,
                        displayName: u.displayName || u.email?.split('@')[0] || 'Anonymous',
                        lastActive: new Date().toISOString()
                    };

                    if (userDoc.exists()) {
                        setUserLimit(userDoc.data().siteLimit || 1);
                        setUnlockedTemplates(userDoc.data().unlockedAssets || []);
                        await setDoc(userRef, profileUpdate, { merge: true });
                    } else {
                        await setDoc(userRef, profileUpdate);
                    }
                } catch (err) {
                    console.error("Error syncing user profile:", err);
                }

                const q = query(collection(db, 'user_sites'), where('userId', '==', u.uid));
                const snap = await getDocs(q);
                setSites(snap.docs.map(d => ({ id: d.id, ...d.data() })));
            }
            setLoading(false);
            if (!u) {
                router.push('/mr-build/login');
            }
        });
        return () => checkUser();
    }, [router]);

    const handleNewRepo = () => {
        if (sites.length >= userLimit) {
            if (confirm(`You've reached your site limit (${userLimit}). Upgrade to Premium-X to deploy up to 5 sites?`)) {
                router.push('/mr-build/subscription');
            }
            return;
        }
        setShowNewModal(true); 
    };

    const startFromScratch = () => {
        router.push('/mr-build/editor?new=true');
    };

    const startFromTemplate = async (templateId) => {
        // We will pass the template ID via query param, and the Editor will look it up.
        // For system templates (hardcoded), we can handle them in the Editor initialization or 
        // inject them into the URL as encoded data if small, OR just use the ID and let Editor resolve it.
        // Let's assume the Editor knows these IDs or we pass a flag.
        router.push(`/mr-build/editor?new=true&template=${templateId}`);
    };

    const toggleMonetization = async (siteIdx) => {
        const site = displaySites[siteIdx];
        const newEnabled = !site.monetization?.enabled;
        
        try {
            const siteRef = doc(db, 'user_sites', site.id);
            await updateDoc(siteRef, {
                'monetization.enabled': newEnabled,
                updatedAt: new Date().toISOString()
            });
            // Local update for immediate feedback
            const updatedSites = [...sites];
            const originalIdx = updatedSites.findIndex(s => s.id === site.id);
            if (originalIdx !== -1) {
                updatedSites[originalIdx].monetization = {
                    ...updatedSites[originalIdx].monetization,
                    enabled: newEnabled
                };
                setSites(updatedSites);
            }
        } catch (err) {
            console.error("Failed to toggle monetization:", err);
        }
    };

    const updatePublisherId = async (siteIdx, pubId) => {
        const site = displaySites[siteIdx];
        try {
            const siteRef = doc(db, 'user_sites', site.id);
            await updateDoc(siteRef, {
                'monetization.publisherId': pubId,
                updatedAt: new Date().toISOString()
            });
            // Local update
            const updatedSites = [...sites];
            const originalIdx = updatedSites.findIndex(s => s.id === site.id);
            if (originalIdx !== -1) {
                updatedSites[originalIdx].monetization = {
                    ...updatedSites[originalIdx].monetization,
                    publisherId: pubId
                };
                setSites(updatedSites);
            }
        } catch (err) {
            console.error("Failed to update publisher ID:", err);
        }
    };

    if (loading && !user) return <Loader text="Initializing Nexus Interface..." />; 
    if (!user) return null;

    // Filter Logic
    let displaySites = sites.filter(site => 
        (site.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
        (site.description || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (activeTab === 'stars') {
        displaySites = displaySites.filter(site => (site.views || 0) > 0);
    }

    return (
        <div className="nebula-container">
            {/* Header */}
            <header className="nebula-header">
                <div className="brand-section">
                    <Box size={24} className="brand-icon" />
                    <span className="brand-text">MR BUILD <span className="highlight">OS</span></span>
                </div>
                <div className="header-actions">
                    <div className="user-profile" onClick={() => router.push('/mr-build/subscription')}>
                        <div className="user-info-header">
                            <span className="user-name">{user.displayName || user.email?.split('@')[0]}</span>
                            <span className="user-plan">FREE PLAN</span>
                        </div>
                        <img 
                            src={`https://ui-avatars.com/api/?name=${user.email}&background=00f0ff&color=000`} 
                            alt="User" 
                            className="avatar-sm" 
                        />
                    </div>
                </div>
            </header>

            <main className="nebula-main">
                {/* Stats / Welcome Banner */}
                <section className="welcome-banner">
                    <div className="banner-content">
                        <h1>Command Center</h1>
                        <p>Manage your digital constructs and deploy new realities.</p>
                    </div>
                    <div className="stats-row">
                        <div className="stat-card">
                            <div className="stat-value">{sites.length} / {userLimit}</div>
                            <div className="stat-label">Active Sites</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{sites.reduce((acc, s) => acc + (s.views || 0), 0)}</div>
                            <div className="stat-label">Total Views</div>
                        </div>
                    </div>
                </section>

                {/* Controls */}
                <div className="controls-bar">
                    <div className="search-wrapper">
                        <Search size={16} className="search-icon"/>
                        <input 
                            placeholder="Search projects..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button onClick={() => router.push('/mr-build/analytics')} className="btn-analytics">
                        <TrendingUp size={16} /> Earnings
                    </button>
                    <button onClick={handleNewRepo} className="btn-new-project">
                        <Plus size={16} /> New Project
                    </button>
                </div>

                {/* Projects Grid */}
                <div className="projects-grid">
                    {loading ? (
                        Array(3).fill(0).map((_, i) => (
                            <div key={i} className="project-card skeleton">
                                <SkeletonLoader height={160} width="100%" />
                                <div style={{padding: 16}}>
                                    <SkeletonLoader height={20} width="60%" />
                                </div>
                            </div>
                        ))
                    ) : displaySites.length > 0 ? (
                        displaySites.map(site => (
                            <div 
                                key={site.id} 
                                className="project-card" 
                                onClick={() => { if(!swipeState.id) router.push(`/mr-build/editor?id=${site.id}`); }}
                                onTouchStart={(e) => handleTouchStart(e, site.id)}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                                style={{
                                    transform: swipeState.id === site.id ? `translateX(${swipeState.currentX - swipeState.startX}px)` : 'none',
                                    transition: swipeState.id === site.id ? 'none' : 'transform 0.3s'
                                }}
                            >
                                {/* Swipe Indicators */}
                                {swipeState.id === site.id && (swipeState.currentX - swipeState.startX) > 50 && (
                                    <div className="swipe-indicator right">OPEN 🚀</div>
                                )}
                                {swipeState.id === site.id && (swipeState.currentX - swipeState.startX) < -50 && (
                                    <div className="swipe-indicator left">DELETE 🗑️</div>
                                )}

                                <div className="card-preview">
                                    <div className="preview-overlay">
                                        <button className="btn-launch">ENTER CONSTRUCT <ChevronDown size={14} style={{transform: 'rotate(-90deg)'}}/></button>
                                    </div>
                                    <div className="tech-badge">NEX ENGINE</div>
                                </div>
                                <div className="card-body">
                                    <div className="card-header">
                                        <h3>{site.name || 'Untitled Project'}</h3>
                                        <span className={`status-dot ${site.status === 'public' ? 'online' : 'offline'}`}></span>
                                    </div>
                                    <p className="card-desc">{site.description || 'No description provided.'}</p>
                                    <div className="card-meta">
                                        <span>Updated {new Date(site.updatedAt || 0).toLocaleDateString()}</span>
                                        <div className="meta-icons">
                                            {site.monetization?.enabled && <span title="Monetized">💰</span>}
                                            <span title="Views"><Eye size={12}/> {site.views || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">
                            <div className="empty-icon">📂</div>
                            <h3>No Projects Found</h3>
                            <button onClick={handleNewRepo}>Initialize First Project</button>
                        </div>
                    )}
                </div>
            </main>

            {/* Architect Modal */}
            {showArchitect && <ArchitectModal onClose={() => setShowArchitect(false)} user={user} />}

            {/* New Project Modal */}
            {showNewModal && (
                <div className="modal-backdrop" onClick={() => setShowNewModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-head">
                            <h2>Initialize New Construct</h2>
                            <button onClick={() => setShowNewModal(false)}><X size={20}/></button>
                        </div>
                        <div className="modal-options-grid">
                            <button className="option-tile architect" onClick={() => { setShowNewModal(false); setShowArchitect(true); }}>
                                <div className="tile-icon"><Star size={24}/></div>
                                <h3>AI Architect</h3>
                                <p>Describe and generate.</p>
                            </button>
                            <button className="option-tile blank" onClick={startFromScratch}>
                                <div className="tile-icon"><Code size={24}/></div>
                                <h3>Blank Core</h3>
                                <p>Start from scratch.</p>
                            </button>
                            <button className="option-tile template" onClick={() => startFromTemplate('cyberpunk')}>
                                <div className="tile-icon" style={{color: '#00f0ff'}}><Layout size={24}/></div>
                                <h3>Cyberpunk</h3>
                                <p>Neon & Glass</p>
                            </button>
                            <button className="option-tile template" onClick={() => startFromTemplate('saas')}>
                                <div className="tile-icon" style={{color: '#ff0055'}}><Box size={24}/></div>
                                <h3>SaaS Landing</h3>
                                <p>Clean & Modern</p>
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <style jsx>{`
                .nebula-container {
                    min-height: 100vh;
                    background: radial-gradient(circle at 50% 0%, #1a1f2e 0%, #050505 60%);
                    color: #fff;
                    font-family: 'Inter', sans-serif;
                }

                /* Header */
                .nebula-header {
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 16px 32px;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    background: rgba(5,5,5,0.8); backdrop-filter: blur(10px);
                    position: sticky; top: 0; z-index: 50;
                }
                .brand-section { display: flex; align-items: center; gap: 10px; font-family: 'Orbitron', sans-serif; font-weight: 700; letter-spacing: 1px; }
                .brand-icon { color: #00f0ff; filter: drop-shadow(0 0 5px #00f0ff); }
                .highlight { color: #00f0ff; font-size: 0.8em; margin-left: 4px; }
                
                .user-profile { display: flex; align-items: center; gap: 12px; cursor: pointer; padding: 4px 8px; border-radius: 8px; transition: 0.2s; }
                .user-profile:hover { background: rgba(255,255,255,0.05); }
                .user-info-header { text-align: right; display: none; }
                @media (min-width: 768px) { .user-info-header { display: block; } }
                
                .user-name { display: block; font-size: 14px; font-weight: 600; }
                .user-plan { display: block; font-size: 10px; color: #00f0ff; letter-spacing: 1px; }
                .avatar-sm { width: 32px; height: 32px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.2); }

                /* Main */
                .nebula-main { max-width: 1200px; margin: 0 auto; padding: 32px 20px; }

                /* Welcome Banner */
                .welcome-banner { 
                    display: flex; flex-direction: column; justify-content: space-between; align-items: start;
                    margin-bottom: 40px; gap: 20px;
                }
                @media (min-width: 768px) { .welcome-banner { flex-direction: row; align-items: center; } }
                
                .banner-content h1 { font-family: 'Orbitron', sans-serif; font-size: 2rem; margin-bottom: 8px; background: linear-gradient(90deg, #fff, #888); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .banner-content p { color: #888; }
                
                .stats-row { display: flex; gap: 20px; }
                .stat-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 12px 20px; border-radius: 12px; min-width: 120px; }
                .stat-value { font-size: 1.5rem; font-weight: 700; color: #00f0ff; }
                .stat-label { font-size: 0.8rem; color: #666; text-transform: uppercase; letter-spacing: 1px; }

                /* Controls */
                .controls-bar { display: flex; gap: 16px; margin-bottom: 30px; flex-wrap: wrap; }
                @media (max-width: 600px) { .controls-bar { flex-direction: column-reverse; } }

                .search-wrapper { 
                    flex: 1; display: flex; align-items: center; gap: 10px; 
                    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
                    padding: 10px 16px; border-radius: 8px; min-width: 250px;
                }
                .search-wrapper input { background: transparent; border: none; color: #fff; flex: 1; outline: none; }
                .search-icon { color: #666; }
                
                .btn-new-project {
                    background: #00f0ff; color: #000; border: none; padding: 10px 24px; border-radius: 8px;
                    font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;
                    transition: 0.2s; box-shadow: 0 0 15px rgba(0, 240, 255, 0.3);
                }
                @media (max-width: 600px) { .btn-new-project { width: 100%; justify-content: center; } }
                .btn-new-project:hover { transform: translateY(-2px); box-shadow: 0 0 25px rgba(0, 240, 255, 0.5); }

                .btn-analytics {
                    background: rgba(0, 240, 255, 0.1); color: #00f0ff; border: 1px solid rgba(0, 240, 255, 0.3);
                    padding: 10px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; 
                    display: flex; align-items: center; gap: 8px; transition: 0.2s;
                }
                .btn-analytics:hover { background: rgba(0, 240, 255, 0.2); box-shadow: 0 0 15px rgba(0, 240, 255, 0.2); }

                /* Grid */
                .projects-grid {
                    display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px;
                }
                @media (max-width: 600px) { .projects-grid { grid-template-columns: 1fr; } }

                .project-card {
                    background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 16px; overflow: visible; cursor: pointer; transition: 0.3s;
                    position: relative;
                }
                .project-card:hover { 
                    transform: translateY(-5px); border-color: #00f0ff; 
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5); 
                }

                .swipe-indicator {
                    position: absolute; top: 0; bottom: 0; width: 100px;
                    display: flex; align-items: center; justify-content: center;
                    font-weight: 800; font-size: 14px; letter-spacing: 1px;
                }
                .swipe-indicator.right {
                    left: -100px; background: linear-gradient(90deg, transparent, rgba(0,255,0,0.2));
                    border-right: 1px solid #00ff80; color: #00ff80;
                    justify-content: flex-end; padding-right: 20px;
                }
                .swipe-indicator.left {
                    right: -100px; background: linear-gradient(-90deg, transparent, rgba(255,0,0,0.2));
                    border-left: 1px solid #ff4444; color: #ff4444;
                    justify-content: flex-start; padding-left: 20px;
                }
                
                .card-preview {
                    height: 160px; background: linear-gradient(45deg, #111, #222);
                    display: flex; align-items: center; justify-content: center;
                    position: relative;
                    border-radius: 16px 16px 0 0;
                    overflow: hidden;
                }
                .preview-overlay {
                    position: absolute; inset: 0; background: rgba(0,0,0,0.6);
                    display: flex; align-items: center; justify-content: center;
                    opacity: 0; transition: 0.2s;
                }
                .project-card:hover .preview-overlay { opacity: 1; }
                .btn-launch {
                    background: rgba(0, 240, 255, 0.1); border: 1px solid #00f0ff; color: #00f0ff;
                    padding: 8px 16px; border-radius: 20px; cursor: pointer;
                    display: flex; align-items: center; gap: 6px; font-size: 0.8rem; letter-spacing: 1px;
                }
                .tech-badge {
                    position: absolute; bottom: 10px; right: 10px;
                    background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1);
                    padding: 4px 8px; border-radius: 4px; font-size: 0.6rem; color: #aaa;
                }

                .card-body { padding: 20px; }
                .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
                .card-header h3 { font-size: 1.1rem; font-weight: 600; color: #fff; }
                .status-dot { width: 8px; height: 8px; border-radius: 50%; box-shadow: 0 0 5px currentColor; }
                .status-dot.online { color: #00ff80; background: #00ff80; }
                .status-dot.offline { color: #666; background: #666; }
                
                .card-desc { font-size: 0.9rem; color: #888; margin-bottom: 20px; height: 40px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
                
                .card-meta { display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: #555; }
                .meta-icons { display: flex; gap: 10px; }

                /* Empty State */
                .empty-state { text-align: center; padding: 60px; grid-column: 1 / -1; border: 1px dashed rgba(255,255,255,0.1); border-radius: 12px; }
                .empty-icon { font-size: 3rem; margin-bottom: 16px; opacity: 0.5; }
                .empty-state h3 { margin-bottom: 20px; color: #fff; }
                .empty-state button { background: #00f0ff; color: #000; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; }

                /* Modal */
                .modal-backdrop {
                    position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(5px);
                    display: flex; align-items: center; justify-content: center; z-index: 100;
                    animation: fadeIn 0.2s;
                }
                .modal-content {
                    background: #0a0a0a; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px;
                    width: 600px; max-width: 90%; padding: 30px;
                    box-shadow: 0 0 50px rgba(0,0,0,0.5);
                }
                .modal-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
                .modal-head h2 { font-family: 'Orbitron'; color: #fff; letter-spacing: 1px; }
                .modal-head button { background: none; border: none; color: #666; cursor: pointer; }
                .modal-head button:hover { color: #fff; }

                .modal-options-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 16px; }
                .option-tile {
                    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
                    padding: 24px; border-radius: 12px; cursor: pointer; text-align: center; transition: 0.2s;
                }
                .option-tile:hover { transform: translateY(-3px); border-color: #00f0ff; background: rgba(0, 240, 255, 0.05); }
                .tile-icon { font-size: 2rem; margin-bottom: 12px; color: #00f0ff; }
                .option-tile h3 { font-size: 1rem; margin-bottom: 4px; color: #fff; }
                .option-tile p { font-size: 0.8rem; color: #666; }
                .option-tile.architect .tile-icon { color: #d000ff; }
                .option-tile.architect:hover { border-color: #d000ff; background: rgba(208, 0, 255, 0.05); }

                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            `}</style>
        </div>
    );
}

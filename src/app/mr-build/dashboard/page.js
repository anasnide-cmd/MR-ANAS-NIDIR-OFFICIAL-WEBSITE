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
    ChevronDown
} from 'lucide-react';

export default function BuildDashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [sites, setSites] = useState([]);
    const [userLimit, setUserLimit] = useState(1);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('repositories'); // 'repositories', 'stars', 'projects'

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
        // In a real app, this might open a modal or redirect to a creation wizard
        router.push('/mr-build/editor?new=true'); 
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
            {/* Top Navigation Bar */}
            <header className="nebula-header">
                <div className="header-left">
                    <div className="logo-section">
                        <Box size={24} className="logo-icon" />
                        <span className="logo-text">Mr Build <span className="highlight">OS</span></span>
                    </div>
                     <div className="search-bar">
                        <Search size={14} className="search-icon" />
                        <input 
                            placeholder="Search repositories..." 
                            className="nebula-search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className="shortcut">/</span>
                    </div>
                    <nav className="header-nav">
                        <button className="nav-item">Pull requests</button>
                        <button className="nav-item">Issues</button>
                        <button className="nav-item">Codespaces</button>
                        <button className="nav-item">Marketplace</button>
                        <button className="nav-item">Explore</button>
                    </nav>
                </div>
                <div className="header-right">
                    <div className="user-menu" onClick={async () => {
                        await signOut(auth);
                        router.push('/mr-build/login');
                    }}>
                        <img 
                            src={`https://ui-avatars.com/api/?name=${user.email}&background=00f0ff&color=000`} 
                            alt="User" 
                            className="header-avatar" 
                        />
                    </div>
                </div>
            </header>

            <main className="nebula-main">
                <div className="nebula-layout">
                    
                    {/* Left Sidebar */}
                    <aside className="nebula-sidebar">
                        <div className="profile-section">
                            <div className="profile-avatar-large">
                                <img 
                                    src={`https://ui-avatars.com/api/?name=${user.email}&background=050505&color=00f0ff&size=200`} 
                                    alt="Profile" 
                                />
                                <div className="online-indicator"></div>
                            </div>
                            <h2 className="profile-name">{user.displayName || user.email?.split('@')[0]}</h2>
                            <p className="profile-handle">{user.email}</p>
                            
                            <button className="btn-block-action">Edit profile</button> 
                             
                            <div className="profile-stats">
                                <span className="stat-item"><Star size={14} className="icon-star"/> <strong>{sites.reduce((acc, s) => acc + (s.views || 0), 0)}</strong> stars</span>
                                <span className="stat-item"><Eye size={14} className="icon-eye"/> <strong>{sites.length}</strong> repos</span>
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="achievements">
                            <h3>Achievements</h3>
                            <div className="badge-grid">
                                <div className="badge tooltip-trigger" title="First Deployment">🚀</div>
                                <div className="badge tooltip-trigger" title="Quick Starter">⚡</div>
                                {sites.length >= 3 && <div className="badge tooltip-trigger" title="Prolific Builder">🏗️</div>}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="nebula-content">
                        {/* Tab Switcher */}
                        <div className="content-tabs">
                            <button 
                                className={`tab-btn ${activeTab === 'repositories' ? 'active' : ''}`}
                                onClick={() => setActiveTab('repositories')}
                            >
                                <Book size={16}/>
                                Repositories
                                <span className="counter">{sites.length}</span>
                            </button>
                            <button 
                                className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                                onClick={() => setActiveTab('projects')}
                            >
                                <Layout size={16}/>
                                Projects
                            </button>
                            <button className="tab-btn">
                                <Box size={16}/>
                                Packages
                            </button>
                            <button 
                                className={`tab-btn ${activeTab === 'stars' ? 'active' : ''}`}
                                onClick={() => setActiveTab('stars')}
                            >
                                <Star size={16}/>
                                Stars
                            </button>
                        </div>

                        {/* Search & Filters */}
                        <div className="repo-controls">
                            <div className="search-wrapper">
                                <input 
                                    placeholder="Find a repository..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="repo-search-input"
                                />
                            </div>
                            <div className="filter-buttons">
                                <button className="btn-filter">Type <ChevronDown size={12}/></button>
                                <button className="btn-filter">Language <ChevronDown size={12}/></button>
                                <button className="btn-filter">Sort <ChevronDown size={12}/></button>
                                <button onClick={handleNewRepo} className="btn-new-repo">
                                    <Book size={16} /> New
                                </button>
                            </div>
                        </div>

                        <div className="repo-list">
                            {loading ? (
                                Array(3).fill(0).map((_, i) => (
                                    <div key={i} className="repo-item skeleton">
                                        <SkeletonLoader height={24} width={200} />
                                        <SkeletonLoader height={16} width="60%" style={{marginTop: 8}} />
                                    </div>
                                ))
                            ) : displaySites.length > 0 ? (
                                displaySites.map(site => (
                                    <div key={site.id} className="repo-item">
                                        <div className="repo-main">
                                            <div className="repo-header">
                                                <h3>
                                                    <Link href={`/mr-build/editor?id=${site.id}`} className="repo-link">
                                                        {site.name || site.title || 'untitled-repo'}
                                                    </Link>
                                                </h3>
                                                <span className="repo-visibility">
                                                    {site.status === 'public' ? 'Public' : 'Private'}
                                                </span>
                                            </div>
                                            <p className="repo-desc">
                                                {site.description || 'No description provided.'}
                                            </p>
                                            <div className="repo-meta">
                                                <span className="meta-item language">
                                                    <span className="lang-color" style={{background: '#00f0ff'}}></span>
                                                    HTML/NEX
                                                </span>
                                                <span className="meta-item hover-accent">
                                                    <Star size={14} /> {site.views || 0}
                                                </span>
                                                <span className="meta-item hover-accent">
                                                    <GitBranch size={14} /> 1
                                                </span>
                                                <span className="meta-item">
                                                    Updated {new Date(site.updatedAt || Date.now()).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="repo-stats-graph">
                                             <div className="activity-bar"></div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-repos">
                                    <h3>{activeTab === 'stars' ? "You haven't starred any repositories yet." : "No repositories matching your search."}</h3>
                                    {activeTab === 'repositories' && (
                                        <button onClick={handleNewRepo} className="btn-create-first">Create a new repository</button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <style jsx>{`
                /* Dark Nebula Palette */
                .nebula-container {
                    --bg-page: #050505;
                    --bg-panel: rgba(22, 27, 34, 0.6);
                    --border: rgba(48, 54, 61, 0.6);
                    --text-main: #e6edf3;
                    --text-muted: #8b949e;
                    --brand: #00f0ff;
                    --brand-glow: rgba(0, 240, 255, 0.2);
                    --btn-bg: rgba(33, 38, 45, 0.8);
                    --btn-hover: #30363d;
                    
                    min-height: 100vh;
                    background: radial-gradient(circle at 10% 10%, rgba(9,23,37,1) 0%, rgba(0,0,0,1) 100%);
                    color: var(--text-main);
                    font-family: 'Inter', sans-serif;
                }

                /* Header */
                .nebula-header {
                    background: rgba(1, 4, 9, 0.8);
                    backdrop-filter: blur(10px);
                    padding: 12px 24px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px solid var(--border);
                    position: sticky; top: 0; z-index: 50;
                }
                .header-left { display: flex; align-items: center; gap: 20px; }
                .logo-section { 
                    display: flex; align-items: center; gap: 8px; font-weight: 700; color: #fff; font-family: 'Orbitron', sans-serif; 
                }
                .logo-icon { color: var(--brand); filter: drop-shadow(0 0 5px var(--brand)); } 
                .highlight { color: var(--brand); font-size: 0.8em; margin-left: 2px; }
                
                .search-bar {
                    background: var(--btn-bg);
                    border: 1px solid var(--border);
                    border-radius: 6px;
                    padding: 4px 12px;
                    display: flex;
                    align-items: center;
                    width: 320px;
                    transition: 0.3s;
                }
                .search-bar:focus-within { border-color: var(--brand); box-shadow: 0 0 0 2px var(--brand-glow); }
                .search-icon { color: var(--text-muted); margin-right: 8px; }
                .nebula-search-input {
                    background: transparent;
                    border: none;
                    color: var(--text-main);
                    width: 100%;
                    font-size: 13px;
                    outline: none;
                }
                .shortcut { 
                    border: 1px solid var(--border); 
                    border-radius: 4px; padding: 0 6px; font-size: 10px; color: var(--text-muted); 
                }
                
                .header-nav { display: flex; gap: 4px; }
                .nav-item { 
                    background: transparent; border: none; color: var(--text-main); 
                    font-size: 14px; font-weight: 600; cursor: pointer; padding: 6px 10px; border-radius: 6px;
                    transition: 0.2s;
                }
                .nav-item:hover { color: rgba(255,255,255,0.8); background: rgba(255,255,255,0.1); }

                .header-avatar {
                    width: 28px; height: 28px; border-radius: 50%; border: 1px solid var(--border);
                    cursor: pointer; transition: 0.2s;
                }
                .header-avatar:hover { box-shadow: 0 0 10px var(--brand); border-color: var(--brand); }

                /* Layout */
                .nebula-main {
                    padding: 0;
                    width: 100%;
                    max-width: 100%;
                }
                .nebula-layout {
                    display: grid;
                    grid-template-columns: 320px 1fr;
                    gap: 0;
                    min-height: calc(100vh - 60px);
                }

                /* Sidebar */
                .nebula-sidebar { 
                    padding: 32px;
                    border-right: 1px solid var(--border);
                    background: rgba(0,0,0,0.3);
                } 
                .profile-avatar-large { position: relative; width: 100%; margin-bottom: 20px; }
                .profile-avatar-large img {
                    width: 100%; height: auto;
                    border-radius: 50%;
                    border: 2px solid var(--border);
                }
                .online-indicator {
                    position: absolute; bottom: 10%; right: 10%;
                    width: 32px; height: 32px;
                    background: var(--brand);
                    border: 4px solid #0d1117;
                    border-radius: 50%;
                    box-shadow: 0 0 15px var(--brand);
                }
                .profile-name { font-size: 26px; font-weight: 700; margin-bottom: 4px; color: #fff; letter-spacing: -0.5px; }
                .profile-handle { font-size: 20px; color: var(--text-muted); font-weight: 300; margin-bottom: 24px; }
                
                .btn-block-action {
                    width: 100%;
                    background: var(--btn-bg);
                    border: 1px solid var(--border);
                    color: var(--text-main);
                    padding: 8px 16px;
                    border-radius: 6px;
                    font-weight: 500;
                    cursor: pointer;
                    margin-bottom: 24px;
                    transition: 0.2s;
                }
                .btn-block-action:hover { background: var(--btn-hover); border-color: var(--text-muted); }

                .profile-stats { font-size: 14px; color: var(--text-muted); display: flex; flex-direction: column; gap: 12px; }
                .stat-item { display: flex; align-items: center; gap: 8px; }
                .stat-item strong { color: var(--text-main); }
                .icon-star, .icon-eye { color: var(--text-muted); }

                .divider { height: 1px; background: var(--border); margin: 32px 0; }
                
                .achievements h3 { font-size: 16px; margin-bottom: 16px; font-weight: 600; }
                .badge-grid { display: flex; gap: 12px; }
                .badge { 
                    width: 48px; height: 48px; 
                    background: rgba(255,255,255,0.03); 
                    border: 1px solid var(--border); 
                    border-radius: 50%; 
                    display: flex; align-items: center; justify-content: center;
                    font-size: 20px;
                    cursor: help;
                    transition: 0.2s;
                }
                .badge:hover { border-color: var(--brand); box-shadow: 0 0 10px var(--brand-glow); transform: translateY(-2px); }

                /* Content Area */
                .nebula-content { padding: 32px 48px; }
                
                .content-tabs {
                    display: flex;
                    gap: 8px;
                    border-bottom: 1px solid var(--border);
                    margin-bottom: 32px;
                }
                .tab-btn {
                    background: transparent;
                    border: none;
                    color: var(--text-main);
                    padding: 10px 20px;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    border-bottom: 2px solid transparent;
                    transition: all 0.2s;
                }
                .tab-btn:hover { background: rgba(255,255,255,0.03); border-radius: 6px 6px 0 0; }
                .tab-btn.active { font-weight: 600; border-bottom-color: var(--brand); }
                .counter {
                    background: rgba(110,118,129,0.4);
                    padding: 2px 8px;
                    border-radius: 2em;
                    font-size: 11px;
                }
                
                .repo-controls {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 24px;
                    gap: 16px;
                }
                .search-wrapper { flex: 1; }
                .repo-search-input {
                    box-sizing: border-box;
                    width: 100%;
                    padding: 8px 16px;
                    font-size: 14px;
                    line-height: 20px;
                    color: var(--text-main);
                    background: var(--bg-page);
                    border: 1px solid var(--border);
                    border-radius: 6px;
                    transition: 0.2s;
                }
                .repo-search-input:focus { border-color: var(--brand); box-shadow: 0 0 0 2px var(--brand-glow); outline: none; }

                .filter-buttons { display: flex; gap: 8px; }
                .btn-filter {
                    background: var(--btn-bg);
                    color: var(--text-main);
                    border: 1px solid var(--border);
                    padding: 6px 16px;
                    border-radius: 6px;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    display: flex; align-items: center; gap: 6px;
                    transition: 0.2s;
                }
                .btn-filter:hover { border-color: var(--text-muted); background: var(--btn-hover); }

                .btn-new-repo {
                    background: #238636;
                    color: #fff;
                    border: 1px solid rgba(240,246,252,0.1);
                    padding: 6px 20px;
                    border-radius: 6px;
                    font-size: 14px;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    transition: 0.2s;
                    box-shadow: 0 0 15px rgba(35, 134, 54, 0.4);
                }
                .btn-new-repo:hover { background: #2ea043; transform: translateY(-1px); box-shadow: 0 0 20px rgba(35, 134, 54, 0.6); }

                /* Repo List */
                .repo-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 32px 0;
                    border-top: 1px solid var(--border);
                    transition: 0.2s;
                }
                .repo-item:hover { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.01)); }
                .repo-item:last-child { border-bottom: none; }
                
                .repo-header { display: flex; align-items: center; gap: 16px; margin-bottom: 8px; }
                .repo-link { color: var(--brand); font-size: 20px; font-weight: 600; text-decoration: none; transition: 0.2s; word-break: break-word; }
                .repo-link:hover { text-decoration: underline; text-shadow: 0 0 8px var(--brand-glow); }
                
                .repo-visibility {
                    border: 1px solid var(--border);
                    border-radius: 2em;
                    padding: 0 10px;
                    font-size: 12px;
                    font-weight: 500;
                    color: var(--text-muted);
                    line-height: 20px;
                }
                
                .repo-desc { color: var(--text-muted); font-size: 14px; margin-bottom: 16px; max-width: 80%; line-height: 1.5; word-break: break-word; }
                
                .repo-meta { display: flex; align-items: center; gap: 24px; font-size: 12px; color: var(--text-muted); }
                .meta-item { display: flex; align-items: center; gap: 6px; }
                .lang-color {
                    width: 12px; height: 12px; border-radius: 50%; display: inline-block;
                    border: 1px solid rgba(255,255,255,0.2);
                    box-shadow: 0 0 5px var(--brand);
                }
                .hover-accent:hover { color: var(--brand); cursor: pointer; }

                .activity-bar {
                    width: 120px; height: 10px;
                    background: rgba(255,255,255,0.05);
                    border-radius: 2px;
                    overflow: hidden;
                    position: relative;
                }
                .activity-bar::after {
                    content: ''; position: absolute; top:0; left:0; height:100%; width: 40%;
                    background: linear-gradient(90deg, transparent, var(--brand), transparent);
                    animation: scanning 2s linear infinite;
                }
                @keyframes scanning { 0% { left: -50%; } 100% { left: 150%; } }

                .no-repos { padding: 60px; text-align: center; border: 1px solid var(--border); border-radius: 6px; margin-top: 30px; background: rgba(0,0,0,0.2); }
                .btn-create-first { color: var(--brand); background: transparent; border: 1px solid var(--brand); padding: 8px 16px; border-radius: 6px; cursor: pointer; margin-top: 16px; display: inline-block; }
                .btn-create-first:hover { background: var(--brand); color: #000; }

                /* Mobile/Tablet Responsive */
                @media (max-width: 1024px) {
                    .nebula-layout { grid-template-columns: 1fr; }
                    .nebula-sidebar { 
                        display: flex; flex-direction: column; align-items: center; text-align: center;
                        border-right: none; border-bottom: 1px solid var(--border);
                        padding: 16px 24px;
                        width: 100%;
                        background: radial-gradient(circle at top, rgba(1, 4, 9, 0.8), rgba(1, 4, 9, 0.4));
                    }
                    .profile-section { 
                        display: flex; 
                        flex-direction: column; 
                        align-items: center; 
                        width: 100%; 
                        gap: 12px; 
                    }
                    .profile-avatar-large { 
                        width: 72px; 
                        height: 72px; 
                        font-size: 20px;
                        margin-bottom: 0;
                        box-shadow: 0 0 20px rgba(0, 240, 255, 0.15);
                    }
                    .profile-name { font-size: 18px; }
                    .profile-handle { font-size: 14px; }
                    .btn-edit-profile { width: 100%; justify-content: center; }
                    
                    .profile-details { width: 100%; max-width: 400px; }
                    .nebula-content { padding: 16px; }
                }

                @media (max-width: 768px) {
                    .repo-controls { flex-direction: column; align-items: stretch; gap: 12px; margin-bottom: 16px; }
                    .search-wrapper { width: 100%; }
                    .filter-buttons { 
                        display: flex; 
                        overflow-x: auto; 
                        gap: 8px; 
                        padding-bottom: 4px;
                        -webkit-overflow-scrolling: touch;
                        scrollbar-width: none; 
                    }
                    .filter-buttons::-webkit-scrollbar { display: none; }
                    .btn-filter { 
                        white-space: nowrap; flex-shrink: 0; 
                        padding: 6px 12px; font-size: 13px;
                        background: rgba(33, 38, 45, 0.5);
                    }
                    .repo-item { flex-direction: column; gap: 12px; padding: 16px; }
                    .repo-header { flex-wrap: wrap; gap: 8px; }
                    .repo-meta { flex-wrap: wrap; gap: 12px; }
                    .activity-bar { display: none; } /* Hide fixed width element */
                    
                    .btn-new-repo { margin-left: 0; width: 100%; justify-content: center; margin-top: 4px; }
                }
            `}</style>
        </div>
    );
}

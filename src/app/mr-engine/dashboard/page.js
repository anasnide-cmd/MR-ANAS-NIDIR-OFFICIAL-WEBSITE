'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../../lib/firebase';
import { collection, query, where, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loader from '../../../components/Loader';
import SkeletonLoader from '../../../components/SkeletonLoader';
import { 
    Gamepad2, 
    Star, 
    Zap, 
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
    TrendingUp,
    Play,
    Share2,
    Check,
    Trophy
} from 'lucide-react';

import GameSettingsModal from './GameSettingsModal';

export default function EngineDashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('projects');
    const [editingGame, setEditingGame] = useState(null);
    const [showNewModal, setShowNewModal] = useState(false);
    const [copiedGameId, setCopiedGameId] = useState(null);

    const GAME_TEMPLATES = {
        'blank': {
            name: 'Blank Canvas',
            desc: 'Start with a clean 2D canvas.',
            icon: <Box size={24}/>,
            files: {
                'index.html': { content: '<canvas id="gameCanvas"></canvas>\n<script src="game.js"></script>', language: 'html' },
                'style.css': { content: 'body { background: #000; margin: 0; display: flex; align-items: center; justify-content: center; height: 100vh; }\ncanvas { background: #111; border: 1px solid #333; }', language: 'css' },
                'game.js': { content: 'const canvas = document.getElementById("gameCanvas");\nconst ctx = canvas.getContext("2d");\ncanvas.width = 800; canvas.height = 600;\n\nfunction loop() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\n  ctx.fillStyle = "cyan";\n  ctx.fillRect(Math.random()*canvas.width, Math.random()*canvas.height, 50, 50);\n  requestAnimationFrame(loop);\n}\nloop();', language: 'javascript' }
            }
        },
        'player-topdown': {
            name: 'Top-Down Starter',
            desc: 'Movement and collision boilerplate.',
            icon: <Gamepad2 size={24} color="#00f0ff" />,
            files: {
                'index.html': { content: '<canvas id="gameCanvas"></canvas>\n<script src="game.js"></script>', language: 'html' },
                'style.css': { content: 'body { background: #050505; margin: 0; overflow: hidden; }\ncanvas { display: block; }', language: 'css' },
                'game.js': { content: 'const canvas = document.getElementById("gameCanvas");\nconst ctx = canvas.getContext("2d");\ncanvas.width = window.innerWidth; canvas.height = window.innerHeight;\n\nlet player = { x: 100, y: 100, size: 30, color: "#00f0ff" };\nlet keys = {};\n\nwindow.addEventListener("keydown", e => keys[e.key] = true);\nwindow.addEventListener("keyup", e => keys[e.key] = false);\n\nfunction update() {\n  if(keys["ArrowUp"]) player.y -= 5;\n  if(keys["ArrowDown"]) player.y += 5;\n  if(keys["ArrowLeft"]) player.x -= 5;\n  if(keys["ArrowRight"]) player.x += 5;\n}\n\nfunction draw() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\n  ctx.fillStyle = player.color;\n  ctx.fillRect(player.x, player.y, player.size, player.size);\n}\n\nfunction loop() {\n  update();\n  draw();\n  requestAnimationFrame(loop);\n}\nloop();', language: 'javascript' }
            }
        }
    };

    useEffect(() => {
        const checkUser = onAuthStateChanged(auth, async (u) => {
            if (u) {
                setUser(u);
                const q = query(collection(db, 'user_games'), where('userId', '==', u.uid));
                const snap = await getDocs(q);
                setGames(snap.docs.map(d => ({ id: d.id, ...d.data() })));
            } else {
                router.push('/mr-build/login');
            }
            setLoading(false);
        });
        return () => checkUser();
    }, [router]);

    const handleCreateGame = async (templateId) => {
        // In a real app, we might save the template choice to Firestore first or pass it to the editor
        router.push(`/mr-engine/editor?new=true&template=${templateId}`);
    };

    const copyToClipboard = async (e, game) => {
        e.stopPropagation();
        if (!game.slug || game.status !== 'public') return;
        try {
            const url = `https://anasnidir.com/mr-games/u/${game.slug}`;
            await navigator.clipboard.writeText(url);
            setCopiedGameId(game.id);
            setTimeout(() => setCopiedGameId(null), 2000);
        } catch (err) {
            console.error("Failed to copy link: ", err);
        }
    };

    if (loading) return <Loader text="Booting Engine Subsystems..." />;
    if (!user) return null;

    const displayGames = games.filter(game => 
        (game.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="engine-dashboard">
            <header className="dashboard-header">
                <div className="brand">
                    <Gamepad2 size={24} className="brand-icon" />
                    <span className="brand-text">MR ENGINE <span className="version">V1.0</span></span>
                </div>
                <div className="header-right">
                    <button className="btn-arcade" onClick={() => router.push('/mr-games')}>
                        <Play size={16} /> PLAY ARCADE
                    </button>
                    <div className="user-pill">
                        <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.email}&background=00f0ff&color=000`} alt="avatar" />
                        <span>{user.displayName || 'Developer'}</span>
                    </div>
                </div>
            </header>

            <main className="dashboard-content">
                <section className="hero-banner">
                    <div className="hero-text">
                        <h1>Game Developer Portal</h1>
                        <p>Architect new realities and deploy them to the MR Arcade.</p>
                    </div>
                    <div className="quick-stats">
                        <div className="stat-box">
                            <span className="stat-val">{games.length}</span>
                            <span className="stat-label">CORES</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-val">{games.reduce((acc, g) => acc + (g.plays || 0), 0)}</span>
                            <span className="stat-label">TOTAL PLAYS</span>
                        </div>
                    </div>
                </section>

                <div className="action-bar">
                    <div className="search-box">
                        <Search size={18} />
                        <input 
                            placeholder="Filter game cores..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn-create" onClick={() => setShowNewModal(true)}>
                        <Plus size={18} /> INITIALIZE NEW CORE
                    </button>
                </div>

                <div className="games-grid">
                    {displayGames.map(game => (
                        <div key={game.id} className="game-card" onClick={() => router.push(`/mr-engine/editor?id=${game.id}`)}>
                            <div className="card-top">
                                <div className="game-preview-icon">👾</div>
                                <div className="card-badges">
                                    <span className={`status-tag ${game.status}`}>{game.status}</span>
                                    <span className="genre-tag">{game.genre || 'Action'}</span>
                                </div>
                            </div>
                            <div className="card-info">
                                <h3>{game.name || 'Untitled Core'}</h3>
                                <p>{game.description || 'No data stream provided.'}</p>
                                <div className="card-footer">
                                    <div className="stats">
                                        <span><Eye size={12}/> {game.plays || 0}</span>
                                        <span><Trophy size={12}/> {game.highScore || 0}</span>
                                    </div>
                                    <div className="actions">
                                        <button onClick={(e) => { e.stopPropagation(); setEditingGame(game); }} title="Core Settings">
                                            <Settings size={14} />
                                        </button>
                                        <button onClick={(e) => copyToClipboard(e, game)} title="Share Arcade Link">
                                            {copiedGameId === game.id ? <Check size={14} color="#00ff80"/> : <Share2 size={14} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {displayGames.length === 0 && (
                        <div className="empty-state">
                            <Zap size={48} className="empty-icon" />
                            <h3>No Active Game Cores</h3>
                            <p>Start your first project to begin architecting.</p>
                            <button onClick={() => setShowNewModal(true)}>INITIALIZE CORE</button>
                        </div>
                    )}
                </div>
            </main>

            {showNewModal && (
                <div className="modal-overlay" onClick={() => setShowNewModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Select Template Protocol</h2>
                            <button onClick={() => setShowNewModal(false)}><X size={20}/></button>
                        </div>
                        <div className="template-grid">
                            {Object.entries(GAME_TEMPLATES).map(([id, t]) => (
                                <div key={id} className="template-card" onClick={() => handleCreateGame(id)}>
                                    <div className="template-icon">{t.icon}</div>
                                    <div className="template-info">
                                        <h3>{t.name}</h3>
                                        <p>{t.desc}</p>
                                    </div>
                                    <ChevronDown size={20} className="arrow" style={{transform: 'rotate(-90deg)'}} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {editingGame && (
                <GameSettingsModal 
                    game={editingGame} 
                    user={user} 
                    onClose={() => setEditingGame(null)}
                    onUpdate={(updated) => setGames(prev => prev.map(g => g.id === updated.id ? updated : g))}
                    onDelete={(id) => setGames(prev => prev.filter(g => g.id !== id))}
                />
            )}

            <style jsx>{`
                .engine-dashboard {
                    min-height: 100vh;
                    background: #000;
                    color: #fff;
                    font-family: 'Inter', sans-serif;
                    background-image: 
                        radial-gradient(circle at 50% 0%, #001a1a 0%, #000 70%);
                }

                .dashboard-header {
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 20px 40px;
                    border-bottom: 1px solid rgba(0, 240, 255, 0.1);
                    backdrop-filter: blur(10px);
                    position: sticky; top: 0; z-index: 50;
                }

                @media (max-width: 768px) {
                    .dashboard-header { padding: 15px 20px; }
                    .brand-text { font-size: 1rem; }
                    .header-right { gap: 10px; }
                    .user-pill span { display: none; }
                    .btn-arcade span { display: none; }
                    .btn-arcade { padding: 8px; }
                }

                .brand { display: flex; align-items: center; gap: 15px; }
                .brand-icon { color: #00f0ff; filter: drop-shadow(0 0 8px #00f0ff); }
                .brand-text { font-family: 'Orbitron'; font-weight: 800; letter-spacing: 2px; font-size: 1.2rem; }
                .version { font-size: 0.6rem; color: #00f0ff; background: rgba(0, 240, 255, 0.1); padding: 2px 6px; border-radius: 4px; vertical-align: top; }

                .header-right { display: flex; align-items: center; gap: 20px; }
                .btn-arcade {
                    background: rgba(0, 240, 255, 0.1); color: #00f0ff; border: 1px solid #00f0ff;
                    padding: 8px 16px; border-radius: 8px; font-weight: 700; cursor: pointer;
                    display: flex; align-items: center; gap: 8px; transition: 0.3s;
                }
                .btn-arcade:hover { background: #00f0ff; color: #000; box-shadow: 0 0 20px rgba(0,240,255,0.4); }

                .user-pill {
                    display: flex; align-items: center; gap: 10px; padding: 5px 15px;
                    background: rgba(255,255,255,0.05); border-radius: 20px;
                }
                .user-pill img { width: 24px; height: 24px; border-radius: 50%; }
                .user-pill span { font-size: 0.9rem; font-weight: 500; }

                .dashboard-content { max-width: 1200px; margin: 0 auto; padding: 40px 20px; }

                .hero-banner {
                    display: flex; justify-content: space-between; align-items: center;
                    margin-bottom: 50px; padding-bottom: 30px; border-bottom: 1px solid rgba(255,255,255,0.05);
                }
                @media (max-width: 768px) {
                    .hero-banner { flex-direction: column; text-align: center; gap: 30px; align-items: center; }
                    .hero-text h1 { font-size: 1.8rem; }
                    .quick-stats { justify-content: center; width: 100%; }
                    .stat-box { text-align: center; }
                }

                .hero-text h1 { font-family: 'Orbitron'; font-size: 2.5rem; margin-bottom: 10px; }
                .hero-text p { color: #888; font-size: 1.1rem; }

                .quick-stats { display: flex; gap: 30px; }
                .stat-box { text-align: right; }
                .stat-val { display: block; font-size: 2rem; font-weight: 800; color: #00f0ff; font-family: 'Orbitron'; }
                .stat-label { font-size: 0.7rem; color: #666; letter-spacing: 2px; }

                .action-bar { display: flex; gap: 20px; margin-bottom: 30px; }
                @media (max-width: 768px) {
                    .action-bar { flex-direction: column; }
                    .btn-create { justify-content: center; }
                }

                .search-box {
                    flex: 1; display: flex; align-items: center; gap: 12px;
                    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
                    padding: 10px 20px; border-radius: 12px;
                }
                .search-box input { background: transparent; border: none; color: #fff; flex: 1; outline: none; }
                .search-box svg { color: #666; }

                .btn-create {
                    background: #fff; color: #000; border: none; padding: 12px 24px; border-radius: 12px;
                    font-weight: 800; font-family: 'Orbitron'; font-size: 0.9rem; cursor: pointer;
                    display: flex; align-items: center; gap: 10px; transition: 0.3s;
                }
                .btn-create:hover { background: #00f0ff; box-shadow: 0 0 30px rgba(0,240,255,0.4); transform: translateY(-2px); }

                .games-grid {
                    display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px;
                }

                .game-card {
                    background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 20px; overflow: hidden; cursor: pointer; transition: 0.3s;
                }
                .game-card:hover { transform: translateY(-5px); border-color: #00f0ff; background: rgba(0,240,255,0.02); }

                .card-top {
                    height: 120px; background: #0a0a0a; display: flex; align-items: center; justify-content: center;
                    position: relative; font-size: 3rem;
                }
                .card-badges { position: absolute; top: 10px; left: 10px; right: 10px; display: flex; justify-content: space-between; }
                .status-tag { font-size: 0.6rem; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; font-weight: 800; }
                .status-tag.public { background: #00ff80; color: #000; }
                .status-tag.draft { background: #444; color: #fff; }
                .genre-tag { font-size: 0.6rem; color: #00f0ff; border: 1px solid #00f0ff; padding: 2px 8px; border-radius: 4px; }

                .card-info { padding: 20px; }
                .card-info h3 { margin: 0 0 8px; font-family: 'Orbitron'; font-size: 1.1rem; }
                .card-info p { color: #666; font-size: 0.85rem; margin-bottom: 20px; height: 34px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }

                .card-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.05); pt: 15px; }
                .stats { display: flex; gap: 15px; color: #444; font-size: 0.8rem; }
                .stats span { display: flex; align-items: center; gap: 4px; }
                .actions { display: flex; gap: 10px; }
                .actions button { background: transparent; border: none; color: #888; cursor: pointer; transition: 0.2s; }
                .actions button:hover { color: #00f0ff; }

                .empty-state {
                    grid-column: 1 / -1; text-align: center; padding: 80px 20px;
                    border: 2px dashed rgba(255,255,255,0.05); border-radius: 20px;
                }
                .empty-icon { color: #222; margin-bottom: 20px; }
                .empty-state h3 { font-size: 1.5rem; margin-bottom: 10px; }
                .empty-state p { color: #666; margin-bottom: 30px; }
                .empty-state button { background: #00f0ff; color: #000; border: none; padding: 12px 30px; border-radius: 12px; font-weight: 800; cursor: pointer; }

                .modal-overlay {
                    position: fixed; inset: 0; background: rgba(0,0,0,0.9); backdrop-filter: blur(10px);
                    display: flex; align-items: center; justify-content: center; z-index: 100;
                }
                .modal-content { background: #0a0a0a; border: 1px solid #333; border-radius: 24px; padding: 40px; width: 500px; max-width: 90%; }
                @media (max-width: 768px) {
                    .modal-content { padding: 20px; border-radius: 0; width: 100%; height: 100%; max-width: 100%; display: flex; flex-direction: column; justify-content: center; }
                    .template-card { padding: 15px; gap: 15px; }
                }
                .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
                .modal-header h2 { font-family: 'Orbitron'; font-size: 1.2rem; }
                .modal-header button { background: none; border: none; color: #666; cursor: pointer; }

                .template-grid { display: flex; flex-direction: column; gap: 15px; }
                .template-card {
                    display: flex; align-items: center; gap: 20px; padding: 20px;
                    background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 16px; cursor: pointer; transition: 0.3s;
                }
                .template-card:hover { border-color: #00f0ff; background: rgba(0,240,255,0.05); transform: translateX(10px); }
                .template-icon { width: 50px; height: 50px; background: rgba(255,255,255,0.05); border-radius: 12px; display: flex; align-items: center; justify-content: center; }
                .template-info { flex: 1; }
                .template-info h3 { margin: 0 0 4px; font-size: 1rem; }
                .template-info p { margin: 0; color: #666; font-size: 0.8rem; }
                .arrow { color: #333; }
            `}</style>
        </div>
    );
}

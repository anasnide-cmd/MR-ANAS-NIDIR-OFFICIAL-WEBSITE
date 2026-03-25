'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../../lib/firebase';
import { doc, setDoc, deleteDoc, collection, query, where, getDocs, getDoc } from 'firebase/firestore';
import { useRouter, useSearchParams } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import Loader from '../../../components/Loader';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';

// Shared Components
const Terminal = dynamic(() => import('../../../components/MREditor/Terminal'), { ssr: false });
const AssetManager = dynamic(() => import('../../../components/MREditor/AssetManager'), { ssr: false });
const AICopilot = dynamic(() => import('../../../components/MREditor/AICopilot'), { ssr: false });
const FileTree = dynamic(() => import('../../../components/MREditor/FileTree'), { ssr: false });

import 'prismjs/themes/prism-tomorrow.css';  
import { 
    Gamepad2, 
    Star, 
    Eye, 
    Code, 
    Play, 
    Book,
    Layout, 
    Settings,
    FileCode,
    Folder,
    ChevronRight,
    Save, 
    ExternalLink, 
    Terminal as TerminalIcon, 
    Sparkles, 
    X, 
    Maximize, 
    Minimize, 
    Download, 
    Image as ImageIcon, 
    Trophy
} from 'lucide-react';

import { Suspense } from 'react';

const GAME_TEMPLATES = {
    'blank': {
        files: {
            'index.html': { content: '<canvas id="gameCanvas"></canvas>\n<script src="game.js"></script>', language: 'html' },
            'style.css': { content: 'body { background: #000; margin: 0; display: flex; align-items: center; justify-content: center; height: 100vh; overflow: hidden; }\ncanvas { background: #111; border: 1px solid #333; }', language: 'css' },
            'game.js': { content: 'const canvas = document.getElementById("gameCanvas");\nconst ctx = canvas.getContext("2d");\ncanvas.width = 800; canvas.height = 600;\n\nfunction loop() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\n  ctx.fillStyle = "cyan";\n  ctx.font = "20px Orbitron";\n  ctx.fillText("ENGINE CORE ACTIVE", 50, 50);\n  ctx.fillRect(Math.random()*canvas.width, Math.random()*canvas.height, 5, 5);\n  requestAnimationFrame(loop);\n}\nloop();', language: 'javascript' },
            'README.md': { content: '# New Game Core\nInitialized via MR Engine.', language: 'markdown' }
        }
    },
    'player-topdown': {
        files: {
            'index.html': { content: '<canvas id="gameCanvas"></canvas>\n<script src="game.js"></script>', language: 'html' },
            'style.css': { content: 'body { background: #050505; margin: 0; overflow: hidden; }\ncanvas { display: block; }', language: 'css' },
            'game.js': { content: 'const canvas = document.getElementById("gameCanvas");\nconst ctx = canvas.getContext("2d");\ncanvas.width = window.innerWidth; canvas.height = window.innerHeight;\n\nlet player = { x: canvas.width/2, y: canvas.height/2, size: 20, color: "#00f0ff" };\nlet keys = {};\n\nwindow.addEventListener("keydown", e => keys[e.key] = true);\nwindow.addEventListener("keyup", e => keys[e.key] = false);\n\nfunction update() {\n  if(keys["ArrowUp"]) player.y -= 5;\n  if(keys["ArrowDown"]) player.y += 5;\n  if(keys["ArrowLeft"]) player.x -= 5;\n  if(keys["ArrowRight"]) player.x += 5;\n}\n\nfunction draw() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\n  ctx.fillStyle = player.color;\n  ctx.shadowBlur = 15; ctx.shadowColor = player.color;\n  ctx.fillRect(player.x - player.size/2, player.y - player.size/2, player.size, player.size);\n}\n\nfunction loop() {\n  update(); draw(); requestAnimationFrame(loop);\n}\nloop();', language: 'javascript' }
        }
    }
};

function EditorContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryGameId = searchParams.get('id');

    const [user, setUser] = useState(null);
    const [gameId, setGameId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeFile, setActiveFile] = useState('game.js'); 
    const [showPreview, setShowPreview] = useState(true);
    const [copilotOpen, setCopilotOpen] = useState(false);
    const [terminalOpen, setTerminalOpen] = useState(false);
    const [previewKey, setPreviewKey] = useState(0);
    const [successMsg, setSuccessMsg] = useState('');

    const [gameData, setGameData] = useState({
        name: '', slug: '', description: '',
        status: 'draft',
        genre: 'Action',
        updatedAt: new Date().toISOString(),
        files: {}
    });

    const [showSidebar, setShowSidebar] = useState(true);
    const [sidebarMode, setSidebarMode] = useState('files');
    const [isCreating, setIsCreating] = useState(false);
    const [newFileName, setNewFileName] = useState('');
    const [deletingFile, setDeletingFile] = useState(null);
    const [zenMode, setZenMode] = useState(false);
    const [mobileTab, setMobileTab] = useState('editor'); // 'editor', 'preview', 'ai', 'terminal'

    const [debouncedGameData, setDebouncedGameData] = useState(gameData);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedGameData(gameData);
        }, 500);
        return () => clearTimeout(handler);
    }, [gameData]);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            if (!u) { router.push('/mr-build/login'); return; }
            setUser(u);

            if (queryGameId) {
                try {
                    const docSnap = await getDoc(doc(db, 'user_games', queryGameId));
                    if (docSnap.exists()) {
                        setGameId(docSnap.id);
                        const data = docSnap.data();
                        setGameData({ 
                            ...data, 
                            id: docSnap.id,
                            files: data.files || {} 
                        });
                    }
                } catch (err) { console.error(err); }
            } else {
                const templateId = searchParams.get('template') || 'blank';
                setGameData(prev => ({
                    ...prev,
                    files: GAME_TEMPLATES[templateId]?.files || GAME_TEMPLATES['blank'].files
                }));
            }
            setLoading(false);
        });
        return () => unsub();
    }, [queryGameId, router, searchParams]);

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        try {
            let targetId = gameId;
            if (!targetId) {
                const newRef = doc(collection(db, 'user_games'));
                targetId = newRef.id;
                await setDoc(newRef, {
                    ...gameData,
                    userId: user.uid,
                    id: targetId,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
                setGameId(targetId);
                router.replace(`/mr-engine/editor?id=${targetId}`);
            } else {
                await setDoc(doc(db, 'user_games', targetId), {
                    ...gameData,
                    updatedAt: new Date().toISOString()
                }, { merge: true });
            }
            setSuccessMsg('Game core synchronized.');
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (err) {
            console.error(err);
            alert('Sync failed.');
        } finally {
            setSaving(false);
        }
    };

    const confirmCreate = () => {
        if (!newFileName.trim()) { setIsCreating(false); return; }
        const ext = newFileName.split('.').pop().toLowerCase();
        let lang = 'javascript';
        if (ext === 'html') lang = 'html';
        else if (ext === 'css') lang = 'css';
        setGameData(prev => ({
            ...prev,
            files: { ...prev.files, [newFileName]: { content: '', language: lang } }
        }));
        setActiveFile(newFileName);
        setIsCreating(false);
        setNewFileName('');
    };

    const updateFileContent = (fileName, newContent) => {
        setGameData(prev => ({
            ...prev,
            files: {
                ...prev.files,
                [fileName]: { ...prev.files[fileName], content: newContent }
            }
        }));
    };

    if (loading) return <Loader text="Syncing Game State..." />;

    const currentFile = (gameData?.files && gameData.files[activeFile]) || { content: '', language: 'text' };

    return (
        <div className="engine-editor">
             {!zenMode && (
            <header className="editor-header">
                <div className="header-left">
                    <button className="btn-icon" onClick={() => router.push('/mr-engine/dashboard')}>
                        <ChevronRight size={20} style={{transform: 'rotate(180deg)'}} />
                    </button>
                    <button className="btn-icon mobile-only" onClick={() => setShowSidebar(!showSidebar)}>
                        <Layout size={20} />
                    </button>
                    <div className="game-info">
                        <input 
                            value={gameData.name || 'Untitled Core'}
                            onChange={(e) => setGameData({...gameData, name: e.target.value})}
                        />
                        <span className={`status ${gameData.status} hidden-mobile`}>{gameData.status.toUpperCase()}</span>
                    </div>
                </div>
                <div className="header-right">
                    <button className={`btn-icon ${terminalOpen ? 'active' : ''} hidden-mobile`} onClick={() => setTerminalOpen(!terminalOpen)}>
                        <TerminalIcon size={18} />
                    </button>
                    <button className={`btn-icon ${copilotOpen ? 'active' : ''} hidden-mobile`} onClick={() => setCopilotOpen(!copilotOpen)}>
                        <Sparkles size={18} />
                    </button>
                    <button className="btn-save" onClick={handleSave} disabled={saving}>
                        <Save size={16} /> <span className="hidden-mobile">{saving ? 'SYNCING...' : 'SYNC CORE'}</span>
                    </button>
                    <button className={`btn-icon ${showPreview ? 'active' : ''} hidden-mobile`} onClick={() => setShowPreview(!showPreview)}>
                        <Eye size={18} />
                    </button>
                </div>
            </header>
             )}

            <div className="workspace">
                 <FileTree 
                    files={gameData.files || {}}
                    activeFile={activeFile}
                    onSelectFile={(f) => { setActiveFile(f); if(window.innerWidth < 768) { setShowSidebar(false); setMobileTab('editor'); } }}
                    onCreateFile={(name) => {
                        const ext = name.split('.').pop().toLowerCase();
                        let lang = 'javascript';
                        if (ext === 'html') lang = 'html';
                        else if (ext === 'css') lang = 'css';
                        setGameData(prev => ({
                            ...prev,
                            files: { ...prev.files, [name]: { content: '', language: lang } }
                        }));
                        setActiveFile(name);
                    }}
                    showSidebar={showSidebar}
                    setShowSidebar={setShowSidebar}
                />

                <main className="main-area">
                    <div className={`editor-box ${(showPreview && (mobileTab === 'editor' || window.innerWidth >= 768)) ? 'split' : ''} ${mobileTab !== 'editor' && 'hidden-mobile'}`}>
                         <Editor
                            value={currentFile.content}
                            onValueChange={code => updateFileContent(activeFile, code)}
                            highlight={code => highlight(code, languages[currentFile.language || 'javascript'] || languages.markup)}
                            padding={20}
                            className="code-editor"
                            style={{
                                fontFamily: '"Fira Code", monospace',
                                fontSize: 13,
                                backgroundColor: 'transparent',
                                minHeight: '100%',
                            }}
                        />
                    </div>

                    <div className={`preview-box ${(!showPreview || (mobileTab !== 'preview' && window.innerWidth < 768)) ? 'hidden' : ''}`}>
                        <div className="preview-tools">
                            <span>LIVE ENGINE PREVIEW</span>
                            <button onClick={() => setPreviewKey(k => k + 1)}><Play size={14}/></button>
                        </div>
                        <iframe 
                            key={previewKey}
                            srcDoc={`
                                <html>
                                    <head>
                                        <style>
                                            ${debouncedGameData?.files?.['style.css']?.content || ''}
                                            @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');
                                        </style>
                                    </head>
                                    <body>
                                        ${debouncedGameData?.files?.['index.html']?.content || ''}
                                        <script>
                                            ${debouncedGameData?.files?.['game.js']?.content || ''}
                                        </script>
                                    </body>
                                </html>
                            `}
                        />
                    </div>
                    <div className={`ai-box ${mobileTab !== 'ai' ? 'hidden-mobile' : ''} mobile-panel`}>
                         <AICopilot siteData={gameData} onCodeUpdate={updateFileContent} />
                    </div>

                    <div className={`terminal-box ${mobileTab !== 'terminal' ? 'hidden-mobile' : ''} mobile-panel`}>
                         <Terminal files={gameData.files} onUpdateFiles={updateFileContent} />
                    </div>
                </main>
            </div>

            <div className="mobile-nav mobile-only">
                <button className={mobileTab === 'editor' ? 'active' : ''} onClick={() => setMobileTab('editor')}>CODE</button>
                <button className={mobileTab === 'preview' ? 'active' : ''} onClick={() => setMobileTab('preview')}>PREVIEW</button>
                <button className={mobileTab === 'ai' ? 'active' : ''} onClick={() => setMobileTab('ai')}>AI</button>
                <button className={mobileTab === 'terminal' ? 'active' : ''} onClick={() => setMobileTab('terminal')}>TERM</button>
            </div>

            {successMsg && <div className="toast">{successMsg}</div>}

            <style jsx>{`
                .engine-editor { height: 100vh; display: flex; flex-direction: column; background: #050505; color: #fff; }
                .editor-header { height: 60px; border-bottom: 1px solid #1a1a1a; display: flex; justify-content: space-between; align-items: center; padding: 0 20px; background: #000; }
                .header-left, .header-right { display: flex; align-items: center; gap: 15px; }
                .game-info { display: flex; align-items: center; gap: 10px; }
                .game-info input { background: transparent; border: none; color: #fff; font-family: 'Orbitron'; font-weight: 700; width: 200px; outline: none; }
                
                @media (max-width: 768px) {
                    .editor-header { padding: 0 10px; height: 50px; }
                    .game-info input { width: 120px; font-size: 0.9rem; }
                    .header-left, .header-right { gap: 8px; }
                    .hidden-mobile { display: none !important; }
                    .mobile-only { display: block !important; }
                    .btn-save { padding: 6px 10px !important; }
                }
                .mobile-only { display: none; }

                .status { font-size: 0.6rem; background: #222; padding: 2px 6px; border-radius: 4px; color: #888; letter-spacing: 1px; }
                .status.public { background: rgba(0, 240, 255, 0.1); color: #00f0ff; }

                .btn-icon { background: transparent; border: none; color: #444; cursor: pointer; padding: 8px; border-radius: 6px; transition: 0.2s; }
                .btn-icon:hover { color: #fff; background: #111; }
                .btn-icon.active { color: #00f0ff; background: rgba(0, 240, 255, 0.1); }

                .btn-save { background: #00f0ff; color: #000; border: none; padding: 6px 16px; border-radius: 6px; font-weight: 800; font-family: 'Orbitron'; font-size: 0.75rem; cursor: pointer; display: flex; align-items: center; gap: 6px; }

                .workspace { flex: 1; display: flex; overflow: hidden; position: relative; }
                .sidebar { width: 220px; border-right: 1px solid #1a1a1a; background: #080808; display: flex; flex-direction: column; transition: 0.3s; }
                
                @media (max-width: 768px) {
                    .sidebar { position: absolute; left: -220px; top: 0; bottom: 0; z-index: 100; box-shadow: 20px 0 50px rgba(0,0,0,0.5); }
                    .sidebar.visible { left: 0; }
                    .main-area { flex-direction: column; }
                    .editor-box.split { border-right: none; }
                    .preview-box { height: 100%; width: 100%; position: absolute; top: 40px; left: 0; right: 0; bottom: 0; }
                    .preview-box.hidden { display: none; }
                    .hidden-mobile { display: none !important; }
                }

                .sidebar-head { padding: 15px; display: flex; justify-content: space-between; font-size: 0.7rem; color: #444; font-weight: 800; letter-spacing: 1px; }
                .sidebar-actions { display: flex; gap: 10px; }
                .sidebar-head button { background: none; border: none; color: #444; cursor: pointer; }
                .file-list { flex: 1; overflow-y: auto; }
                .file-item { padding: 10px 15px; display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 0.85rem; color: #666; transition: 0.2s; }
                .file-item:hover { background: #111; color: #fff; }
                .file-item.active { background: rgba(0, 240, 255, 0.05); color: #00f0ff; border-left: 2px solid #00f0ff; }

                .main-area { flex: 1; display: flex; position: relative; }
                
                .editor-box { flex: 1; overflow-y: auto; background: #050505; }
                .editor-box.split { border-right: 1px solid #1a1a1a; }
                
                .preview-box { flex: 1; display: flex; flex-direction: column; background: #000; }
                .preview-tools { padding: 10px 15px; background: #0a0a0a; border-bottom: 1px solid #1a1a1a; display: flex; justify-content: space-between; align-items: center; font-size: 0.7rem; color: #444; font-weight: 800; }
                .preview-tools button { background: none; border: none; color: #00f0ff; cursor: pointer; }
                iframe { flex: 1; border: none; background: #fff; }

                .mobile-nav { display: none; height: 50px; background: #000; border-top: 1px solid #1a1a1a; justify-content: space-around; align-items: center; z-index: 100; }
                .mobile-nav button { background: none; border: none; color: #444; font-size: 0.7rem; font-weight: 800; padding: 10px; }
                .mobile-nav button.active { color: #00f0ff; border-top: 2px solid #00f0ff; }

                .mobile-panel { width: 100%; height: 100%; position: absolute; inset: 0; z-index: 10; background: #000; }
                
                @media (max-width: 768px) {
                    .mobile-nav { display: flex !important; }
                    .hidden-mobile { display: none !important; }
                    .preview-box { position: absolute; inset: 0; z-index: 10; }
                    .main-area { flex-direction: column; }
                }

                .toast { position: fixed; bottom: 70px; right: 20px; background: #00f0ff; color: #000; padding: 10px 20px; border-radius: 8px; font-weight: 800; font-size: 0.8rem; animation: slideUp 0.3s; z-index: 1000; }
                @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            `}</style>
        </div>
    );
}

export default function GameEditor() {
    return (
        <Suspense fallback={<Loader text="Syncing Game State..." />}>
            <EditorContent />
        </Suspense>
    );
}


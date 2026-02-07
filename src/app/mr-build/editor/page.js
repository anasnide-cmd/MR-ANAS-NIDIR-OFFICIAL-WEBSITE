'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../../lib/firebase';
import { doc, setDoc, deleteDoc, collection, query, where, getDocs, getDoc } from 'firebase/firestore';
import { useRouter, useSearchParams } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';

import Loader from '../../../components/Loader';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import AICopilot from './AICopilot';
import dynamic from 'next/dynamic';

const Terminal = dynamic(() => import('./Terminal'), { 
    ssr: false, 
    loading: () => <div style={{padding: '20px', color: '#666'}}>Initializing Terminal...</div>
});
import 'prismjs/themes/prism-tomorrow.css'; 
import { 
    GitBranch, 
    Star, 
    Eye, 
    Code, 
    AlertCircle, 
    GitPullRequest, 
    Play, 
    Book,
    Layout, 
    Shield, 
    LineChart, 
    Settings,
    FileCode,
    FileText,
    Folder,
    ChevronRight,
    ChevronDown,
    Save,
    ExternalLink,
    Terminal as TerminalIcon, // Rename icon to avoid conflict
    Sparkles,
    X,
    Maximize,
    Minimize
} from 'lucide-react';

/* --- ICONS & STYLES --- */
// Using local styled-jsx at the bottom

import { Suspense } from 'react';

function EditorContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const querySiteId = searchParams.get('id');

    // State
    const [user, setUser] = useState(null);
    const [siteId, setSiteId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('code'); // code, issues, pr, settings
    const [activeFile, setActiveFile] = useState('index.html'); 
    const [showPreview, setShowPreview] = useState(false); // Default to FALSE
    const [copilotOpen, setCopilotOpen] = useState(false);
    const [terminalOpen, setTerminalOpen] = useState(false); // Default to FALSE
    const [previewKey, setPreviewKey] = useState(0); // For forcing iframe reload
    const [successMsg, setSuccessMsg] = useState('');

    const [siteData, setSiteData] = useState({
        name: '', slug: '', title: '', description: '',
        status: 'draft',
        theme: 'dark-nebula',
        socials: {},
        updatedAt: new Date().toISOString(),
        files: {} // Virtual File System: { "filename": { content: "...", language: "..." } }
    });

    const [showSidebar, setShowSidebar] = useState(false);
    
    // UI States
    const [isCreating, setIsCreating] = useState(false);
    const [newFileName, setNewFileName] = useState('');
    const [deletingFile, setDeletingFile] = useState(null); // filename

    // Terminal Listener
    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data?.type === 'CONSOLE_LOG') {
                event.data.args.forEach(arg => window.terminalWrite?.(`\x1b[2m[LOG]\x1b[0m ${arg}`));
            }
            if (event.data?.type === 'CONSOLE_ERR') {
                event.data.args.forEach(arg => window.terminalWrite?.(`\x1b[31m[ERR]\x1b[0m ${arg}`));
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    // Load Data & Migrate
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            if (!u) { router.push('/mr-build/login'); return; }
            setUser(u);

            if (querySiteId) {
                try {
                    const docRef = await getDoc(doc(db, 'user_sites', querySiteId));
                    if (docRef.exists()) {
                        setSiteId(docRef.id);
                        const data = docRef.data();
                        
                        // --- MIGRATION LOGIC (V1 -> V2) ---
                        if (!data.files) {
                            console.log("Migrating to V2 File System...");
                            data.files = {
                                'index.html': { content: data.customHtml || '', language: 'html' },
                                'styles.css': { content: data.customCss || '', language: 'css' },
                                'README.md': { content: `# ${data.title || 'Project'}\n${data.description || ''}`, language: 'markdown' }
                            };
                        }
                        
                        setSiteData({ ...data, id: docRef.id });
                    }
                } catch (err) { console.error(err); }
            } else {
                // New Project Init
                setSiteData(prev => ({
                    ...prev,
                    files: {
                        'index.html': { content: '<!-- New Project -->\n<h1>Hello World</h1>', language: 'html' },
                        'styles.css': { content: 'body { background: #000; color: #fff; }', language: 'css' },
                        'README.md': { content: '# New Project', language: 'markdown' }
                    }
                }));
            }
            setLoading(false);
        });
        return () => unsub();
    }, [querySiteId, router]);

    // File Management Functions
    const startCreating = () => {
        setIsCreating(true);
        setNewFileName('');
    };

    const confirmCreate = () => {
        if (!newFileName.trim()) { setIsCreating(false); return; }
        if (siteData.files[newFileName]) { alert("File already exists!"); return; }

        const ext = newFileName.split('.').pop();
        let lang = 'javascript';
        if (ext === 'html') lang = 'html';
        if (ext === 'css') lang = 'css';
        if (ext === 'md') lang = 'markdown';
        if (ext === 'json') lang = 'json';

        setSiteData(prev => ({
            ...prev,
            files: {
                ...prev.files,
                [newFileName]: { content: '', language: lang }
            }
        }));
        setActiveFile(newFileName);
        setIsCreating(false);
        setNewFileName('');
    };

    const cancelCreate = () => {
        setIsCreating(false);
        setNewFileName('');
    };

    const startDelete = (e, fileName) => {
        e.stopPropagation();
        if (fileName === 'index.html') { alert("Cannot delete main entry file!"); return; }
        setDeletingFile(fileName);
    };

    const confirmDelete = (e, fileName) => {
        e.stopPropagation();
        setSiteData(prev => {
            const newFiles = { ...prev.files };
            delete newFiles[fileName];
            return { ...prev, files: newFiles };
        });
        if (activeFile === fileName) setActiveFile('index.html');
        setDeletingFile(null);
    };

    const cancelDelete = (e) => {
        e.stopPropagation();
        setDeletingFile(null);
    };

    const updateFileContent = (fileName, newContent) => {
        setSiteData(prev => ({
            ...prev,
            files: {
                ...prev.files,
                [fileName]: { ...prev.files[fileName], content: newContent }
            }
        }));
    };

    // Save Function
    const handleSave = async () => {
        if (!user || !siteId) return;
        setSaving(true);
        try {
            await setDoc(doc(db, 'user_sites', siteId), {
                ...siteData,
                updatedAt: new Date().toISOString()
            }, { merge: true });
            
            setSuccessMsg('Changes committed successfully.');
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (err) {
            console.error('Save failed:', err);
            alert('Failed to save changes.');
        } finally {
            setSaving(false);
        }
    };

    // Derived Logic
    const repoName = siteData.slug || 'untitled-repo';
    const userName = user?.displayName || user?.email?.split('@')[0] || 'user';
    const currentFile = siteData.files[activeFile] || { content: '', language: 'text' };

    if (loading) return <Loader text="Loading Repository..." />;

    return (
        <div className="repo-container">
            {/* 1. Header (Breadcrumbs + Actions) */}
            <header className="repo-header">
                <div className="header-left">
                    <button className="mobile-menu-btn" onClick={() => setShowSidebar(!showSidebar)} title="Toggle File Explorer">
                        <Layout size={20} />
                    </button>
                    <div className="repo-breadcrumb">
                        <BookIcon />
                        <Link href="/mr-build/dashboard" className="user-link">{userName}</Link>
                        <span className="separator">/</span>
                        <span className="repo-name">{repoName}</span>
                        <span className="badge-public">{siteData.status === 'public' ? 'Public' : 'Private'}</span>
                    </div>
                </div>
                <div className="header-right">
                    <button className="btn-action-sm">
                        <Eye size={14} /> Unwatch <span className="count">1</span>
                    </button>
                    <button className="btn-action-sm">
                        <GitBranch size={14} /> Fork <span className="count">0</span>
                    </button>
                    <button className="btn-action-sm">
                        <Star size={14} /> Star <span className="count">{siteData.views || 0}</span>
                    </button>
                </div>
            </header>

            {/* 2. Navigation Tabs */}
            <nav className="repo-nav">
                <button className={`nav-tab ${activeTab === 'code' ? 'active' : ''}`} onClick={() => setActiveTab('code')}>
                    <Code size={16} /> Code
                </button>
                <button className={`nav-tab ${activeTab === 'issues' ? 'active' : ''}`} onClick={() => setActiveTab('issues')}>
                    <AlertCircle size={16} /> Issues <span className="counter">0</span>
                </button>
                <button className={`nav-tab ${activeTab === 'pr' ? 'active' : ''}`} onClick={() => setActiveTab('pr')}>
                    <GitPullRequest size={16} /> Pull requests <span className="counter">0</span>
                </button>
                <button className={`nav-tab ${activeTab === 'actions' ? 'active' : ''}`} onClick={() => setActiveTab('actions')}>
                    <Play size={16} /> Actions
                </button>
                <button className={`nav-tab ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
                    <Layout size={16} /> Projects
                </button>
                <button className={`nav-tab ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
                    <Settings size={16} /> Settings
                </button>
            </nav>

            {/* 3. Main Content Area */}
            <main className="repo-content">
                
                {/* SETTINGS VIEW (Simplified for this demo) */}
                {activeTab === 'settings' && (
                    <div className="settings-container">
                        <h3>Repository Settings</h3>
                        <div className="form-group">
                            <label>Repository Name (Slug)</label>
                            <input 
                                value={siteData.slug} 
                                onChange={e => setSiteData({...siteData, slug: e.target.value})}
                                className="gh-input"
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input 
                                value={siteData.description} 
                                onChange={e => setSiteData({...siteData, description: e.target.value})}
                                className="gh-input"
                            />
                        </div>
                         <div className="form-group">
                            <label>Visibility</label>
                            <select 
                                value={siteData.status}
                                onChange={e => setSiteData({...siteData, status: e.target.value})}
                                className="gh-select"
                            >
                                <option value="draft">Draft (Private)</option>
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>
                        <button className="btn-primary" onClick={handleSave} disabled={saving}>
                            {saving ? 'Saving...' : 'Rename Repository'}
                        </button>
                    </div>
                )}

                {/* CODE VIEW */}
                {activeTab === 'code' && (
                    <div className="code-layout">
                        {/* 3a. File Explorer Sidebar (Modal) */}
                        <aside className={`file-explorer ${showSidebar ? 'visible' : ''}`}>
                            <div className="explorer-header">
                                <span>FILES</span>
                                <button onClick={startCreating} className="btn-icon-add" title="New File">+</button>
                            </div>
                            <div className="explorer-list">
                                {isCreating && (
                                    <div className="file-creation-row">
                                        <input 
                                            autoFocus
                                            value={newFileName}
                                            onChange={e => setNewFileName(e.target.value)}
                                            onKeyDown={e => { if(e.key === 'Enter') confirmCreate(); if(e.key === 'Escape') cancelCreate(); }}
                                            onBlur={cancelCreate}
                                            className="new-file-input"
                                            placeholder="filename.ext"
                                        />
                                    </div>
                                )}
                                {Object.keys(siteData.files).sort().map(fileName => (
                                    <div 
                                        key={fileName}
                                        className={`file-item ${activeFile === fileName ? 'active' : ''}`} 
                                        onClick={() => { setActiveFile(fileName); setShowSidebar(false); }}
                                    >
                                        <div className="file-name-wrap">
                                            {fileName.endsWith('.html') && <Code size={14} className="icon-file icon-html" />}
                                            {fileName.endsWith('.css') && <Code size={14} className="icon-file icon-css" />}
                                            {fileName.endsWith('.js') && <FileCode size={14} className="icon-file icon-js" />}
                                            {fileName.endsWith('.md') && <Book size={14} className="icon-file" />}
                                            {!['.html','.css','.js','.md'].some(ext => fileName.endsWith(ext)) && <FileText size={14} className="icon-file" />}
                                            {fileName}
                                        </div>
                                        {fileName !== 'index.html' && (
                                            deletingFile === fileName ? (
                                                <div className="delete-confirm">
                                                    <button className="btn-confirm-del warn" onClick={(e) => confirmDelete(e, fileName)}>Del</button>
                                                    <button className="btn-confirm-del" onClick={cancelDelete}>X</button>
                                                </div>
                                            ) : (
                                                <button 
                                                    className="btn-delete-file"
                                                    onClick={(e) => startDelete(e, fileName)}
                                                >
                                                    &times;
                                                </button>
                                            )
                                        )}
                                    </div>
                                ))}
                            </div>
                        </aside>

            {/* 3b. Editor / Preview Area */}
                        <div className="editor-main">
                            {/* Toolbar */}
                            <div className="editor-toolbar">
                                <div className="toolbar-left">
                                    <span className="breadcrumb-path">{repoName} / <strong>{activeFile}</strong></span>
                                </div>
                                <div className="toolbar-right">
                                    {activeFile !== 'README.md' && (
                                        <button 
                                            className={`btn-tool ${showPreview ? 'active' : ''}`} 
                                            onClick={() => setShowPreview(!showPreview)}
                                        >
                                            <Eye size={14}/> {showPreview ? 'Hide Preview' : 'Preview'}
                                        </button>
                                    )}
                                    <button className={`btn-tool ${terminalOpen ? 'active' : ''}`} onClick={() => setTerminalOpen(!terminalOpen)}>
                                        <TerminalIcon size={14}/> Terminal
                                    </button>
                                    <button className="btn-tool" onClick={() => setCopilotOpen(!copilotOpen)}>
                                        <Sparkles size={14}/> Copilot
                                    </button>
                                    <button className="btn-primary-sm" onClick={handleSave} disabled={saving}>
                                        <Save size={14}/> {saving ? 'Committing...' : 'Commit changes'}
                                    </button>
                                    {siteData.slug && (
                                        <a href={`/s/${siteData.slug}`} target="_blank" className="btn-tool">
                                            <ExternalLink size={14}/> Visit
                                        </a>
                                    )}
                                </div>
                            </div>
                            
                            {successMsg && <div className="flash-msg">{successMsg}</div>}

                            <div className={`workspace ${copilotOpen ? 'with-copilot' : ''}`}>
                                
                                <div className="editor-layout-col">
                                    <div className="editor-upper">
                                        {/* The Editor */}
                                        <div className={`editor-pane ${showPreview ? 'split' : ''}`}>
                                            {activeFile === 'README.md' ? (
                                                <div className="readme-preview">
                                                    <h1>{siteData.title || 'Untitled Project'}</h1>
                                                    <p>{siteData.description || 'No description found.'}</p>
                                                    <hr/>
                                                    <h3>Status</h3>
                                                    <p>This project is currently <strong>{siteData.status}</strong>.</p>
                                                    <div style={{marginTop: '20px', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px'}}>
                                                        <pre style={{whiteSpace: 'pre-wrap'}}>{currentFile.content}</pre>
                                                    </div>
                                                </div>
                                            ) : (
                                                <Editor
                                                    value={currentFile.content}
                                                    onValueChange={code => updateFileContent(activeFile, code)}
                                                    highlight={code => {
                                                        if (currentFile.language === 'html') return highlight(code, languages.markup);
                                                        if (currentFile.language === 'css') return highlight(code, languages.css);
                                                        if (currentFile.language === 'javascript') return highlight(code, languages.javascript);
                                                        return highlight(code, languages.markup);
                                                    }}
                                                    padding={20}
                                                    className="code-editor"
                                                    style={{
                                                        fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                                                        fontSize: 14,
                                                    }}
                                                />
                                            )}
                                        </div>

                                        {/* The Live Preview (Iframe) */}
                                        {showPreview && activeFile !== 'README.md' && (
                                            <div className="preview-pane">
                                                <div className="preview-header">
                                                    <span>Browser Preview</span>
                                                    <div className="traffic-lights">
                                                        <span className="light red"></span>
                                                        <span className="light yellow"></span>
                                                        <span className="light green"></span>
                                                    </div>
                                                </div>
                                                <iframe 
                                                    key={previewKey} // Force reload on run
                                                    title="Live Preview"
                                                    srcDoc={`
                                                        <html>
                                                            <head>
                                                                <style>${siteData.files['styles.css']?.content || ''}</style>
                                                            </head>
                                                            <body>
                                                                ${siteData.files['index.html']?.content || ''}
                                                                
                                                                <!-- Console Hijack -->
                                                                <script>
                                                                    (function() {
                                                                        const oldLog = console.log;
                                                                        const oldError = console.error;
                                                                        
                                                                        console.log = function(...args) {
                                                                            window.parent.postMessage({ type: 'CONSOLE_LOG', args: args.map(a => String(a)) }, '*');
                                                                            oldLog.apply(console, args);
                                                                        };
                                                                        
                                                                        console.error = function(...args) {
                                                                            window.parent.postMessage({ type: 'CONSOLE_ERR', args: args.map(a => String(a)) }, '*');
                                                                            oldError.apply(console, args);
                                                                        };

                                                                        window.onerror = function(msg, source, lineno, colno, error) {
                                                                            window.parent.postMessage({ type: 'CONSOLE_ERR', args: [msg] }, '*');
                                                                        };
                                                                    })();
                                                                </script>

                                                                <!-- Inject JS -->
                                                                <script>
                                                                    ${Object.keys(siteData.files)
                                                                        .filter(f => f.endsWith('.js'))
                                                                        .map(f => `
                                                                            try {
                                                                                // Virtual File: ${f}
                                                                                ${siteData.files[f].content}
                                                                            } catch(e) { console.error("Error in ${f}:", e); }
                                                                        `).join('\n')}
                                                                </script>
                                                            </body>
                                                        </html>
                                                    `}
                                                    className="preview-iframe"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Terminal Panel */}
                                    {terminalOpen && (
                                        <div className="terminal-pane">
                                            <div className="terminal-header">
                                                <span>TERMINAL</span>
                                                <button onClick={() => setTerminalOpen(false)}><X size={12}/></button>
                                            </div>
                                            <div className="terminal-body">
                                                <Terminal 
                                                    files={siteData.files} 
                                                    onUpdateFiles={updateFileContent} 
                                                    onRun={() => setPreviewKey(k => k + 1)}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {copilotOpen && (
                                    <div className="copilot-sidebar">
                                         <AICopilot 
                                            siteData={siteData}
                                            onCodeUpdate={(file, code) => {
                                                // Handle Multi-File Updates
                                                if (!siteData.files[file]) {
                                                    const ext = file.split('.').pop();
                                                    let lang = 'javascript';
                                                    if (ext === 'html') lang = 'html';
                                                    if (ext === 'css') lang = 'css';
                                                    if (ext === 'json') lang = 'json';
                                                    
                                                    setSiteData(prev => ({
                                                        ...prev,
                                                        files: {
                                                            ...prev.files,
                                                            [file]: { content: code, language: lang }
                                                        }
                                                    }));
                                                    setSuccessMsg(`AI created ${file}`);
                                                } else {
                                                    updateFileContent(file, code);
                                                    setSuccessMsg(`AI updated ${file}`);
                                                }
                                                setTimeout(() => setSuccessMsg(''), 3000);
                                            }} 
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <style jsx>{`
                /* Dark Nebula Editor Theme */
                .repo-container {
                    --bg-canvas: #050505;
                    --bg-header: rgba(1, 4, 9, 0.8);
                    --bg-sub: rgba(22, 27, 34, 0.3);
                    --border-color: rgba(48, 54, 61, 0.6);
                    --text-primary: #e6edf3;
                    --text-secondary: #8b949e;
                    --accent: #00f0ff;
                    --accent-glow: rgba(0, 240, 255, 0.15);
                    --btn-bg: rgba(33, 38, 45, 0.8);
                    --btn-border: rgba(240, 246, 252, 0.1);
                    --btn-hover: #30363d;
                    --btn-primary: #238636;
                    --btn-primary-hover: #2ea043;
                    
                    background: radial-gradient(circle at 50% 10%, #0d1117 0%, #050505 100%);
                    color: var(--text-primary);
                    min-height: 100vh;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
                    display: flex;
                    flex-direction: column;
                }

                /* Header */
                .repo-header {
                    background: var(--bg-header);
                    backdrop-filter: blur(10px);
                    padding: 12px 24px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid var(--border-color);
                    z-index: 20;
                }
                .repo-breadcrumb {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 18px;
                }
                .user-link { color: var(--text-secondary); text-decoration: none; transition: 0.2s; }
                .user-link:hover { color: var(--accent); }
                .separator { color: var(--text-secondary); }
                .repo-name { font-weight: 700; color: var(--accent); text-shadow: 0 0 10px var(--accent-glow); }
                .badge-public {
                    font-size: 11px;
                    border: 1px solid var(--border-color);
                    border-radius: 2em;
                    padding: 2px 10px;
                    color: var(--text-secondary);
                    margin-left: 8px;
                    font-weight: 500;
                }

                .header-right { display: flex; gap: 8px; }
                .btn-action-sm {
                    background: var(--btn-bg);
                    border: 1px solid var(--btn-border);
                    color: var(--text-primary);
                    padding: 4px 12px;
                    border-radius: 6px;
                    font-size: 13px; /* Larger font for mobile */
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    cursor: pointer;
                    transition: 0.2s;
                    flex-shrink: 0;
                    min-height: 32px; /* Touch target */
                }
                .btn-action-sm:hover { background: var(--btn-hover); border-color: var(--text-secondary); }
                .count {
                    background: rgba(110,118,129,0.4);
                    padding: 0 6px;
                    border-radius: 2em;
                    font-size: 10px;
                }

                /* Navigation */
                .repo-nav {
                    background: var(--bg-header);
                    padding: 0 24px;
                    display: flex;
                    gap: 8px;
                    border-bottom: 1px solid var(--border-color);
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                    white-space: nowrap;
                    scrollbar-width: none;
                    backdrop-filter: blur(10px);
                }
                .repo-nav::-webkit-scrollbar { display: none; }
                .nav-tab {
                    background: transparent;
                    border: none;
                    color: var(--text-primary);
                    padding: 12px 16px;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    border-bottom: 2px solid transparent;
                    transition: 0.2s;
                    white-space: nowrap;
                    position: relative;
                }
                .nav-tab:hover { background: rgba(255,255,255,0.05); }
                .nav-tab.active { border-bottom-color: var(--accent); font-weight: 600; }
                .nav-tab.active svg { color: var(--accent); filter: drop-shadow(0 0 5px var(--accent)); }
                
                .counter { background: rgba(110,118,129,0.4); padding: 0 6px; border-radius: 10px; font-size: 10px; }

                /* Main Content */
                .repo-content { padding: 24px; flex: 1; overflow: hidden; }

                /* Code View Layout */
                .code-layout {
                    display: grid;
                    grid-template-columns: 1fr; /* Single column now */
                    gap: 0;
                    height: calc(100vh - 140px);
                    position: relative;
                }
                
                .editor-main {
                    display: flex;
                    flex-direction: column;
                    min-width: 0;
                    height: 100%;
                }
                
                /* File Explorer Modal */
                .file-explorer {
                    position: absolute;
                    top: 0; left: 0; bottom: 0;
                    width: 300px;
                    background: rgba(13, 17, 23, 0.95);
                    border-right: 1px solid var(--border-color);
                    z-index: 50;
                    transform: translateX(-100%);
                    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
                    backdrop-filter: blur(10px);
                    display: flex;
                    flex-direction: column;
                    box-shadow: 10px 0 30px rgba(0,0,0,0.5);
                }
                .file-explorer.visible { transform: translateX(0); }

                /* Backdrop */
                .file-explorer.visible::before {
                    content: '';
                    position: fixed;
                    top: 0; left: 300px; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.3);
                    z-index: -1;
                    pointer-events: auto;
                }
                
                .explorer-header {
                     padding: 10px 16px;
                     background: rgba(255,255,255,0.03);
                     border-bottom: 1px solid var(--border-color);
                     font-size: 12px;
                     font-weight: 600;
                     display: flex; justify-content: space-between; align-items: center;
                     color: var(--text-secondary);
                }
                .branch-badge { 
                    background: rgba(255,255,255,0.1); 
                    padding: 2px 8px; 
                    border-radius: 6px; 
                    display: flex; align-items: center; gap: 6px; 
                    font-size: 12px;
                    border: 1px solid var(--border-color);
                    cursor: pointer;
                    color: var(--text-primary);
                }
                .branch-badge:hover { background: rgba(255,255,255,0.2); }

                .file-item {
                    padding: 8px 12px;
                    font-size: 13px;
                    border-bottom: 1px solid rgba(255,255,255,0.02);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    color: var(--text-secondary);
                    transition: 0.15s;
                }
                .file-item:last-child { border-bottom: none; }
                .file-item:hover { background: rgba(255,255,255,0.05); color: var(--text-primary); }
                .file-item.active { 
                    background: rgba(0, 240, 255, 0.1); 
                    color: #fff; 
                    border-left: 2px solid var(--accent); 
                }
                .file-name-wrap { display: flex; align-items: center; gap: 8px; }

                .icon-file { color: var(--text-secondary); }
                .icon-html { color: #e34c26; }
                .icon-css { color: #563d7c; }
                .icon-js { color: #f7df1e; }
                
                .btn-icon-add {
                    background: transparent;
                    border: 1px solid var(--border-color);
                    color: var(--text-primary);
                    width: 20px; height: 20px;
                    display: flex; align-items: center; justify-content: center;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .btn-icon-add:hover { background: var(--btn-bg); border-color: var(--accent); }

                .btn-delete-file {
                    background: transparent;
                    border: none;
                    color: #ef4444;
                    opacity: 0;
                    cursor: pointer;
                    font-size: 16px;
                }
                .file-item:hover .btn-delete-file { opacity: 1; }
                .btn-delete-file:hover { color: #ff0000; }
                
                .file-creation-row {
                    padding: 8px 12px;
                    border-bottom: 1px solid rgba(255,255,255,0.02);
                }
                .new-file-input {
                    width: 100%;
                    background: rgba(0,0,0,0.3);
                    border: 1px solid var(--accent);
                    color: #fff;
                    padding: 4px 8px;
                    font-size: 12px;
                    border-radius: 4px;
                    outline: none;
                }
                
                .delete-confirm { display: flex; gap: 4px; }
                .btn-confirm-del {
                    background: rgba(255,255,255,0.1);
                    border: none;
                    color: #fff;
                    font-size: 10px;
                    padding: 2px 6px;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .btn-confirm-del.warn { background: #ef4444; }
                .btn-confirm-del:hover { opacity: 0.8; }

                /* Editor Main */
                .editor-main {
                    display: flex;
                    flex-direction: column;
                    border: 1px solid var(--border-color);
                    border-radius: 6px;
                    background: #0d1117;
                    overflow: hidden;
                    box-shadow: 0 0 20px rgba(0,0,0,0.5);
                }
                .editor-toolbar {
                    background: rgba(22, 27, 34, 0.9);
                    padding: 8px 16px;
                    border-bottom: 1px solid var(--border-color);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                    gap: 12px;
                }
                .editor-toolbar::-webkit-scrollbar { display: none; }
                .breadcrumb-path { 
                    font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace; 
                    font-size: 12px; 
                    color: var(--text-secondary);
                }
                .breadcrumb-path strong { color: var(--text-primary); }
                .toolbar-right { display: flex; gap: 8px; }
                
                .btn-tool {
                    background: transparent;
                    border: 1px solid var(--border-color);
                    color: var(--text-secondary);
                    padding: 4px 10px;
                    border-radius: 6px;
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex; align-items: center; gap: 6px;
                    transition: 0.2s;
                    white-space: nowrap;
                    flex-shrink: 0;
                    min-height: 32px;
                }
                .btn-tool:hover { background: rgba(255,255,255,0.1); color: var(--text-primary); border-color: var(--text-secondary); }
                .btn-tool.active { background: rgba(0, 240, 255, 0.15); color: var(--accent); border-color: var(--accent); }
                
                .btn-primary-sm {
                    background: var(--btn-primary);
                    color: #fff;
                    border: 1px solid rgba(240,246,252,0.1);
                    padding: 4px 12px;
                    border-radius: 6px;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex; align-items: center; gap: 6px;
                    transition: 0.2s;
                    box-shadow: 0 0 10px rgba(35, 134, 54, 0.4);
                }
                .btn-primary-sm:hover { background: var(--btn-primary-hover); }

                /* Workspace */
                .workspace {
                    display: flex;
                    flex: 1;
                    overflow: hidden;
                    position: relative;
                }
                
                .editor-pane {
                    flex: 1;
                    overflow-y: auto;
                    background: transparent;
                }
                /* Custom Scrollbar */
                .editor-pane::-webkit-scrollbar { width: 8px; }
                .editor-pane::-webkit-scrollbar-track { background: transparent; }
                .editor-pane::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
                .editor-pane::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }

                .editor-pane.split { flex: 0.5; border-right: 1px solid var(--border-color); }
                
                .readme-preview { padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6; }
                .readme-preview h1 { border-bottom: 1px solid var(--border-color); padding-bottom: 10px; margin-bottom: 24px; font-size: 2em; color: var(--text-primary); }
                .readme-preview h3 { margin-top: 24px; margin-bottom: 16px; font-size: 1.5em; color: var(--text-primary); }
                .readme-preview p { margin-bottom: 16px; color: var(--text-secondary); }
                .readme-preview code { background: rgba(110,118,129,0.2); padding: 0.2em 0.4em; border-radius: 6px; font-family: monospace; color: var(--text-primary); }

                .preview-pane {
                    flex: 0.5;
                    display: flex;
                    flex-direction: column;
                    background: #fff;
                }
                .preview-header {
                    background: #f6f8fa;
                    color: #24292f;
                    padding: 8px 16px;
                    font-size: 12px;
                    font-weight: 600;
                    border-bottom: 1px solid #d0d7de;
                }
                .preview-iframe { flex: 1; border: none; width: 100%; height: 100%; }

                .copilot-sidebar {
                    width: 350px;
                    border-left: 1px solid var(--border-color);
                    background: var(--bg-sub);
                    backdrop-filter: blur(10px);
                }

                .flash-msg {
                    background: var(--btn-primary);
                    color: #fff;
                    padding: 8px 16px;
                    font-size: 13px;
                    font-weight: 600;
                    display: flex; align-items: center; gap: 8px;
                    animation: slideDown 0.3s ease-out;
                    position: absolute;
                    top: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 50;
                    border-radius: 8px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                    border: 1px solid rgba(255,255,255,0.1);
                    backdrop-filter: blur(12px);
                }
                @keyframes slideDown { from { transform: translate(-50%, -20px) scale(0.9); opacity: 0; } to { transform: translate(-50%, 16px) scale(1); opacity: 1; } }
                
                .settings-container { max-width: 600px; padding: 20px 0; color: var(--text-secondary); }
                .form-group { margin-bottom: 20px; }
                .form-group label { display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px; color: var(--text-primary); }
                .gh-input, .gh-select {
                    width: 100%;
                    padding: 8px 12px;
                    background: rgba(0,0,0,0.3);
                    border: 1px solid var(--border-color);
                    border-radius: 6px;
                    color: var(--text-primary);
                    font-size: 14px;
                    line-height: 20px;
                }
                .gh-input:focus, .gh-select:focus { outline: 2px solid var(--accent); border-color: var(--accent); }
                .btn-primary {
                     background: var(--btn-primary);
                    color: #fff;
                    border: 1px solid rgba(240,246,252,0.1);
                    padding: 6px 16px;
                    border-radius: 6px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: 0.2s;
                }
                .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 0 15px rgba(35, 134, 54, 0.4); }

                /* Mobile */
                @media (max-width: 768px) {
                    .code-layout { grid-template-columns: 1fr; }
                    .file-explorer { display: none; } /* Hide sidebar on mobile for now */
                    .editor-pane.split { flex: 1; display: none; }
                    .editor-pane.split:first-child { display: block; } 
                    .preview-pane { position: absolute; inset: 0; z-index: 10; }
                }
                .mobile-menu-btn {
                    display: flex; /* Always visible */
                    background: transparent;
                    border: 1px solid var(--border-color);
                    color: var(--text-secondary);
                    padding: 6px;
                    border-radius: 6px;
                    cursor: pointer;
                    margin-right: 12px;
                }
                .mobile-menu-btn:hover { color: var(--text-primary); border-color: var(--text-secondary); }

                /* Mobile Responsive */
                @media (max-width: 768px) {
                    .mobile-menu-btn { display: flex; }
                    .repo-header { flex-direction: column; align-items: flex-start; gap: 12px; height: auto; padding: 16px; }
                    .header-left { display: flex; align-items: center; width: 100%; }
                    .header-right { 
                        width: 100%; 
                        justify-content: flex-start; 
                        overflow-x: auto; 
                        padding-bottom: 8px;
                        gap: 12px;
                        -webkit-overflow-scrolling: touch;
                    }
                    .header-right::-webkit-scrollbar { display: none; }
                }
                    
                    .code-layout { grid-template-columns: 1fr; position: relative; height: calc(100vh - 180px); }
                    
                /* Workspace */
                .workspace {
                    display: flex;
                    flex: 1;
                    overflow: hidden;
                    position: relative;
                }
                
                .editor-layout-col {
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    min-width: 0;
                    height: 100%;
                }
                
                .editor-upper {
                    flex: 1;
                    display: flex;
                    min-height: 0; 
                    position: relative;
                }

                .editor-pane {
                    flex: 1;
                    overflow: auto;
                    position: relative;
                }
                .editor-pane.split { border-right: 1px solid var(--border-color); }

                /* Preview Pane */
                .preview-pane {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    background: #fff;
                    overflow: hidden;
                }
                .preview-header {
                    background: #e1e4e8;
                    color: #24292e;
                    padding: 6px 12px;
                    font-size: 11px;
                    font-weight: 600;
                    border-bottom: 1px solid #d1d5da;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .traffic-lights { display: flex; gap: 6px; }
                .light { width: 10px; height: 10px; border-radius: 50%; }
                .light.red { background: #ff5f56; border: 1px solid #e0443e; }
                .light.yellow { background: #ffbd2e; border: 1px solid #dea123; }
                .light.green { background: #27c93f; border: 1px solid #1aab29; }

                .preview-iframe {
                    flex: 1;
                    border: none;
                    background: #fff;
                    width: 100%;
                    height: 100%;
                }

                /* Terminal Pane */
                .terminal-pane {
                    height: 240px;
                    min-height: 100px;
                    border-top: 1px solid var(--border-color);
                    background: #0d1117;
                    display: flex;
                    flex-direction: column;
                }
                .terminal-header {
                    background: var(--bg-header);
                    padding: 6px 12px;
                    font-size: 11px;
                    font-weight: 600;
                    border-bottom: 1px solid var(--border-color);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: var(--text-secondary);
                }
                .terminal-header button {
                     background: transparent; border: none; color: var(--text-secondary); cursor: pointer;
                }
                .terminal-header button:hover { color: #fff; }
                
                .terminal-body {
                    flex: 1;
                    position: relative;
                    overflow: hidden;
                    padding: 4px;
                }

                /* Copilot Sidebar */
                .copilot-sidebar {
                    width: 350px;
                    border-left: 1px solid var(--border-color);
                    background: rgba(0,0,0,0.5);
                    backdrop-filter: blur(10px);
                    display: flex;
                    flex-direction: column;
                    z-index: 10;
                }
                .workspace:not(.with-copilot) .copilot-sidebar { display: none; }

                /* Code Editor Override */
                :global(.code-editor) {
                    min-height: 100%;
                }
                :global(textarea) { outline: none !important; }
                
                .readme-preview {
                    padding: 40px;
                    max-width: 800px;
                    margin: 0 auto;
                    color: var(--text-primary);
                    line-height: 1.6;
                }
                .readme-preview h1 { border-bottom: 1px solid var(--border-color); padding-bottom: 10px; margin-bottom: 20px; }
                .readme-preview hr { border: 0; border-top: 1px solid var(--border-color); margin: 24px 0; }

                .flash-msg {
                    position: absolute;
                    top: 60px;
                    right: 20px;
                    background: var(--btn-primary);
                    color: #fff;
                    padding: 8px 16px;
                    border-radius: 6px;
                    font-size: 13px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                    animation: slideIn 0.3s ease-out;
                    z-index: 100;
                }
                @keyframes slideIn { from { transform: translateY(-10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

                /* Mobile Responsive */
                @media (max-width: 768px) {
                .mobile-responsive-wrapper { display: contents; } /* Hack placeholder to attach comment */

                    /* Mobile File Explorer Slide-in */
                    .file-explorer {
                        display: none;
                        position: absolute;
                        top: 0; left: 0; bottom: 0;
                        width: 250px;
                        background: rgba(13, 17, 23, 0.95);
                        z-index: 50;
                        border-right: 1px solid var(--border-color);
                        box-shadow: 10px 0 20px rgba(0,0,0,0.5);
                    }
                    .file-explorer.mobile-visible { display: flex; animation: slideIn 0.2s ease-out; }
                    
                    .editor-pane.split { display: none; }
                    .editor-pane.split:first-child { display: block; flex: 1; }

                    /* Backdrop for mobile sidebar */
                    .file-explorer.mobile-visible::before {
                        content: '';
                        position: fixed;
                        top: 0; left: 250px; right: 0; bottom: 0;
                        background: rgba(0,0,0,0.5);
                        z-index: -1;
                    .file-explorer.mobile-visible::before {
                        content: '';
                        position: fixed;
                        top: 0; left: 250px; right: 0; bottom: 0;
                        background: rgba(0,0,0,0.5);
                        z-index: -1;
                        pointer-events: auto;
                    }
                }
                @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
            `}</style>
        </div>
    );
}

export default function MrBuildEditorPage() {
    return (
        <Suspense fallback={<Loader text="Initializing Editor..." />}>
            <EditorContent />
        </Suspense>
    );
}

function BookIcon() {
    return (
        <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style={{color: '#8b949e'}}>
            <path d="M0 1.75A.75.75 0 01.75 1h4.253c1.227 0 2.317.59 3 1.501A3.744 3.744 0 0111.006 1h4.245a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-4.507a2.25 2.25 0 00-1.591.659l-.622.621a.75.75 0 01-1.06 0l-.622-.621A2.25 2.25 0 005.258 13H.75a.75.75 0 01-.75-.75V1.75zm8.755 3a2.25 2.25 0 012.25-2.25H14.5v9h-3.757c-.71 0-1.4.201-1.992.572l.004-7.322zm-1.504 7.324l.004-5.073-.002-2.253A2.25 2.25 0 005.003 2.5H1.5v9h3.757a3.677 3.677 0 011.994.574z"></path>
        </svg>
    )
}

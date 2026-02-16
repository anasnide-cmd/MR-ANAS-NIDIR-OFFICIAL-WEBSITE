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
    Minimize,
    Plus
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
    const [zenMode, setZenMode] = useState(false); // Zen Mode State

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

    // Load Template Logic
    useEffect(() => {
        const templateId = searchParams.get('template');
        const isNew = searchParams.get('new') === 'true';

        if (isNew && templateId) {
            const fetchTemplate = async () => {
                try {
                    const tempRef = doc(db, 'system_templates', templateId);
                    const snap = await getDoc(tempRef);
                    if (snap.exists()) {
                        setSiteData(prev => ({
                            ...prev,
                            files: { ...prev.files, ...snap.data().files }
                        }));
                    }
                } catch (err) {
                    console.error("Failed to load template:", err);
                }
            };
            fetchTemplate();
        }
    }, [searchParams]);

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
        if (!user) return;
        setSaving(true);
        try {
            let targetId = siteId;
            
            // If new project, create the document first
            if (!targetId) {
                const newSiteRef = doc(collection(db, 'user_sites'));
                targetId = newSiteRef.id;
                
                // Secondary Guard: Double check limit on save
                const userRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userRef);
                const limit = userDoc.data()?.siteLimit || 1;
                
                const q = query(collection(db, 'user_sites'), where('userId', '==', user.uid));
                const snap = await getDocs(q);
                
                if (snap.size >= limit) {
                    alert(`Limit reached! You can only have ${limit} sites on your current plan.`);
                    router.push('/mr-build/subscription');
                    return;
                }

                await setDoc(newSiteRef, {
                    ...siteData,
                    userId: user.uid,
                    id: targetId,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
                setSiteId(targetId);
                // Redirect to official editor URL for this site
                router.replace(`/mr-build/editor?id=${targetId}`);
            } else {
                await setDoc(doc(db, 'user_sites', targetId), {
                    ...siteData,
                    updatedAt: new Date().toISOString()
                }, { merge: true });
            }
            
            setSuccessMsg('Changes committed successfully.');
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (err) {
            console.error('Save failed:', err);
            alert('Failed to save changes.');
        } finally {
            setSaving(false);
        }
    };

    // AI Fix Handler (Self-Healing)
    const handleAiFix = async (errorMsg) => {
        setCopilotOpen(true);
        // We'll expose a method on AICopilot via ref or just trigger it via state in a real app
        // For now, let's simulate the user typing this into the copilot
        // In a polised version, we'd use a context or ref. 
        // Hack: Dispatch a custom event that AICopilot listens to
        window.dispatchEvent(new CustomEvent('AI_FIX_REQUEST', { detail: { error: errorMsg } }));
    };

    // Derived Logic
    const repoName = siteData.slug || 'untitled-repo';

    const userName = user?.displayName || user?.email?.split('@')[0] || 'user';
    const currentFile = siteData.files[activeFile] || { content: '', language: 'text' };

    if (loading) return <Loader text="Loading Construct..." />;

    return (
        <div className="nebula-editor">
            {/* 1. Editor Header (Hidden in Zen Mode) */}
            {!zenMode && (
            <header className="editor-header">
                <div className="header-left">
                    <button className="btn-icon" onClick={() => router.push('/mr-build/dashboard')} title="Back to Dashboard">
                        <ChevronRight size={20} style={{transform: 'rotate(180deg)'}} />
                    </button>
                    <div className="project-info">
                        <input 
                            className="project-name-input"
                            value={siteData.name || siteData.slug}
                            onChange={(e) => setSiteData({...siteData, name: e.target.value})}
                            placeholder="Project Name"
                        />
                        <span className={`status-badge ${siteData.status}`}>{siteData.status}</span>
                    </div>
                </div>
                <div className="header-right">
                    <button className={`btn-icon ${zenMode ? 'active' : ''}`} onClick={() => setZenMode(!zenMode)} title="Toggle Zen Mode">
                        <Maximize size={18} />
                    </button>
                    <button className={`btn-icon ${showSidebar ? 'active' : ''}`} onClick={() => setShowSidebar(!showSidebar)}>
                        <Folder size={18} />
                    </button>
                    <button className={`btn-icon ${terminalOpen ? 'active' : ''}`} onClick={() => setTerminalOpen(!terminalOpen)}>
                        <TerminalIcon size={18} />
                    </button>
                    <button className={`btn-icon ${copilotOpen ? 'active' : ''}`} onClick={() => setCopilotOpen(!copilotOpen)}>
                        <Sparkles size={18} />
                    </button>
                    <button className="btn-save" onClick={handleSave} disabled={saving}>
                        <Save size={16} /> <span>{saving ? 'Saving...' : 'Save'}</span>
                    </button>
                    <div className="divider"></div>
                     <button className={`btn-icon ${showPreview ? 'active' : ''}`} onClick={() => setShowPreview(!showPreview)}>
                        <Eye size={18} />
                    </button>
                    {siteData.slug && (
                        <a href={`/s/${siteData.slug}`} target="_blank" className="btn-icon" title="Open Live Site">
                            <ExternalLink size={18}/>
                        </a>
                    )}
                </div>
            </header>
            )}

            {/* Zen Mode Exit Button (Floating) */}
            {zenMode && (
                <button 
                    className="zen-exit-btn"
                    onClick={() => setZenMode(false)}
                    title="Exit Zen Mode"
                >
                    <Minimize size={20} />
                </button>
            )}

            {/* 2. Main Workspace */}
            <div className="workspace-container">
                
                {/* File Explorer (Mobile Drawer / Desktop Sidebar) */}
                {!zenMode && (
                <aside className={`file-explorer ${showSidebar ? 'visible' : ''}`}>
                    <div className="explorer-header">
                        <span>FILES</span>
                        <button onClick={startCreating} className="btn-add-file" title="New File"><Plus size={16}/></button>
                    </div>
                    
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

                    <div className="file-list">
                        {Object.keys(siteData.files).sort().map(fileName => (
                            <div 
                                key={fileName}
                                className={`file-item ${activeFile === fileName ? 'active' : ''}`} 
                                onClick={() => { setActiveFile(fileName); if(window.innerWidth < 768) setShowSidebar(false); }}
                            >
                                <span className="file-icon">
                                    {fileName.endsWith('.html') && <Code size={14} color="#e34c26" />}
                                    {fileName.endsWith('.css') && <Code size={14} color="#563d7c" />}
                                    {fileName.endsWith('.js') && <FileCode size={14} color="#f7df1e" />}
                                    {fileName.endsWith('.md') && <Book size={14} color="#fff" />}
                                </span>
                                <span className="file-name">{fileName}</span>
                                {fileName !== 'index.html' && (
                                    <button 
                                        className="btn-delete"
                                        onClick={(e) => deletingFile === fileName ? confirmDelete(e, fileName) : startDelete(e, fileName)}
                                    >
                                        {deletingFile === fileName ? <span className="confirm-del">Sure?</span> : <X size={12} />}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </aside>
                )}

                {/* Mobile Sidebar Backdrop */}
                {showSidebar && <div className="sidebar-backdrop" onClick={() => setShowSidebar(false)} />}

                {/* Editor & Preview Area */}
                <main className={`main-pane ${copilotOpen ? 'shrink' : ''}`}>
                    
                    {/* Code Editor */}
                    <div className={`editor-wrapper ${showPreview ? 'split-view' : ''} ${activeFile === 'README.md' ? 'readme-mode' : ''}`}>
                         {activeFile === 'README.md' ? (
                            <div className="readme-preview">
                                <h1>{siteData.title || 'Untitled Project'}</h1>
                                <p>{siteData.description || 'No description found.'}</p>
                                <hr/>
                                <div className="readme-content">
                                    <pre>{currentFile.content}</pre>
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
                                    backgroundColor: 'transparent',
                                    minHeight: '100%'
                                }}
                            />
                        )}
                    </div>

                    {/* Preview (Conditional or Split) */}
                    <div className={`preview-wrapper ${showPreview ? 'visible' : ''}`}>
                        <div className="preview-toolbar">
                            <span>Preview</span>
                            <button onClick={() => setPreviewKey(k => k + 1)} title="Refresh"><Play size={12} /></button>
                        </div>
                         <iframe 
                            key={previewKey}
                            title="Live Preview"
                            srcDoc={`
                                <html>
                                    <head>
                                        <style>${siteData.files['styles.css']?.content || ''}</style>
                                    </head>
                                    <body>
                                        ${(siteData.files['index.html']?.content || '')
                                            .replace(/<link[^>]*href=['"]styles\.css['"][^>]*>/g, '')
                                            .replace(/<script[^>]*src=['"]script\.js['"][^>]*><\/script>/g, '')
                                        }
                                        ${siteData.monetization?.enabled && siteData.monetization?.publisherId ? `
                                            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteData.monetization.publisherId}" crossorigin="anonymous"></script>
                                            <div style="margin: 20px auto; padding: 20px; border: 1px dashed #00f0ff; color: #00f0ff; text-align: center; font-family: sans-serif; font-size: 12px;">
                                                [ ADS ENABLED: ${siteData.monetization.publisherId} ]
                                            </div>
                                        ` : ''}
                                        <script>
                                            (function() {
                                                const oldLog = console.log; const oldError = console.error;
                                                console.log = function(...args) { window.parent.postMessage({ type: 'CONSOLE_LOG', args: args.map(a => String(a)) }, '*'); oldLog.apply(console, args); };
                                                console.error = function(...args) { window.parent.postMessage({ type: 'CONSOLE_ERR', args: args.map(a => String(a)) }, '*'); oldError.apply(console, args); };
                                                window.onerror = function(msg) { window.parent.postMessage({ type: 'CONSOLE_ERR', args: [msg] }, '*'); };
                                            })();
                                        </script>
                                        <script>
                                            ${Object.keys(siteData.files).filter(f => f.endsWith('.js')).map(f => `try { ${siteData.files[f].content} } catch(e) { console.error(e); }`).join('\n')}
                                        </script>
                                    </body>
                                </html>
                            `}
                            className="preview-iframe"
                        />
                    </div>

                    {/* Terminal Pane */}
                    {terminalOpen && (
                        <div className="terminal-drawer">
                            <div className="drawer-header">
                                <span>TERMINAL</span>
                                <button onClick={() => setTerminalOpen(false)}><X size={14}/></button>
                            </div>
                            <Terminal 
                                files={siteData.files} 
                                onUpdateFiles={updateFileContent} 
                                onRun={() => setPreviewKey(k => k + 1)}
                                onFixError={handleAiFix}
                            />
                        </div>
                    )}
                </main>

                {/* Copilot Sidebar */}
                {copilotOpen && (
                    <aside className="copilot-sidebar">
                        <AICopilot 
                            siteData={siteData} 
                            onCodeUpdate={(file, code) => {
                                if (!siteData.files[file]) {
                                    setSiteData(prev => ({ ...prev, files: { ...prev.files, [file]: { content: code, language: file.endsWith('html')?'html':file.endsWith('css')?'css':'javascript' } } }));
                                } else {
                                    updateFileContent(file, code);
                                }
                                setSuccessMsg('AI updated ' + file);
                            }} 
                        />
                    </aside>
                )}
            </div>

            {successMsg && <div className="toast-notification">{successMsg}</div>}

            <style jsx>{`
                .nebula-editor {
                    display: flex; flex-direction: column; height: 100vh;
                    background: #050505; color: #fff; font-family: 'Inter', sans-serif;
                    overflow: hidden;
                }

                /* Header */
                .editor-header {
                    height: 60px; display: flex; justify-content: space-between; align-items: center;
                    padding: 0 16px; background: rgba(10,10,10,0.8); border-bottom: 1px solid rgba(255,255,255,0.1);
                    backdrop-filter: blur(10px); z-index: 50;
                }
                .header-left, .header-right { display: flex; align-items: center; gap: 12px; }
                
                .project-info { display: flex; align-items: center; gap: 10px; }
                .project-name-input {
                    background: transparent; border: 1px solid transparent; color: #fff;
                    font-size: 16px; font-weight: 600; width: 200px;
                    padding: 4px 8px; border-radius: 4px; transition: 0.2s;
                }
                .project-name-input:focus { border-color: #00f0ff; outline: none; background: rgba(255,255,255,0.05); }
                .project-name-input:hover { border-color: rgba(255,255,255,0.1); }
                
                .status-badge { font-size: 10px; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; letter-spacing: 1px; }
                .status-badge.public { background: rgba(0,255,128,0.2); color: #00ff80; }
                .status-badge.draft { background: rgba(255,255,255,0.1); color: #aaa; }

                .btn-icon {
                    background: transparent; border: none; color: #888; cursor: pointer;
                    padding: 8px; border-radius: 6px; transition: 0.2s; display: flex; align-items: center; justify-content: center;
                }
                .btn-icon:hover { color: #fff; background: rgba(255,255,255,0.05); }
                .btn-icon.active { color: #00f0ff; background: rgba(0,240,255,0.1); }
                
                .btn-save {
                    background: #00f0ff; color: #000; border: none; padding: 6px 16px; border-radius: 6px;
                    font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px;
                    transition: 0.2s;
                }
                .btn-save:hover { box-shadow: 0 0 10px rgba(0,240,255,0.5); }
                .btn-save:disabled { opacity: 0.5; cursor: not-allowed; }
                
                .divider { width: 1px; height: 24px; background: rgba(255,255,255,0.1); margin: 0 4px; }

                /* Workspace */
                .workspace-container { display: flex; flex: 1; overflow: hidden; position: relative; }

                /* Sidebar */
                .file-explorer {
                    width: 250px; background: #0a0a0a; border-right: 1px solid rgba(255,255,255,0.05);
                    display: flex; flex-direction: column; transition: 0.3s;
                    position: absolute; top:0; bottom:0; left:0; transform: translateX(-100%); z-index: 40;
                }
                .file-explorer.visible { transform: translateX(0); position: relative; }
                @media (max-width: 768px) {
                    .file-explorer { position: absolute; height: 100%; box-shadow: 10px 0 30px rgba(0,0,0,0.5); }
                    .file-explorer.visible { transform: translateX(0); }
                    .sidebar-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.5); z-index: 30; }
                }

                .explorer-header { 
                    padding: 16px; font-size: 12px; color: #666; font-weight: 700; letter-spacing: 1px;
                    display: flex; justify-content: space-between; align-items: center;
                }
                .btn-add-file { background: none; border: none; color: #666; cursor: pointer; }
                .btn-add-file:hover { color: #fff; }

                .file-list { flex: 1; overflow-y: auto; }
                .file-item {
                    padding: 10px 16px; display: flex; align-items: center; gap: 10px;
                    cursor: pointer; color: #888; font-size: 14px; border-left: 2px solid transparent;
                    transition: 0.2s;
                }
                .file-item:hover { background: rgba(255,255,255,0.02); color: #fff; }
                .file-item.active { background: rgba(0,240,255,0.05); color: #fff; border-left-color: #00f0ff; }
                .file-name { flex: 1; overflow: hidden; text-overflow: ellipsis; }
                .btn-delete { background: none; border: none; color: #666; cursor: pointer; opacity: 0; transition: 0.2s; }
                .file-item:hover .btn-delete { opacity: 1; }
                .btn-delete:hover { color: #ff4444; }
                .confirm-del { font-size: 10px; color: #ff4444; text-transform: uppercase; }

                .file-creation-row { padding: 10px 16px; background: rgba(255,255,255,0.05); }
                .new-file-input { width: 100%; background: transparent; border: none; color: #fff; outline: none; font-size: 14px; }

                /* Main Pane */
                .main-pane { flex: 1; display: flex; position: relative; overflow: hidden; transition: 0.3s; }
                .main-pane.shrink { margin-right: 0; } /* Copilot takes space */
                
                .editor-wrapper { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
                .editor-wrapper.split-view { width: 50%; border-right: 1px solid rgba(255,255,255,0.1); }
                @media (max-width: 768px) {
                    .editor-wrapper.split-view { display: none; } /* On mobile, toggle, don't split */
                }

                .preview-wrapper { 
                    flex: 1; background: #fff; display: none; flex-direction: column; 
                }
                .preview-wrapper.visible { display: flex; }
                @media (max-width: 768px) {
                    .preview-wrapper.visible { position: absolute; inset: 0; z-index: 20; }
                }

                .preview-toolbar { padding: 8px 16px; background: #eee; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center; color: #333; font-size: 12px; font-weight: 600; }
                .preview-iframe { flex: 1; width: 100%; height: 100%; border: none; }

                /* Terminal */
                .terminal-drawer {
                    position: absolute; bottom: 0; left: 0; right: 0; height: 250px;
                    background: #0d0d0d; border-top: 1px solid rgba(255,255,255,0.1);
                    display: flex; flex-direction: column; z-index: 25;
                    box-shadow: 0 -10px 30px rgba(0,0,0,0.5);
                }
                .drawer-header { padding: 8px 16px; background: #151515; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #888; font-weight: 700; letter-spacing: 1px; }
                
                /* Copilot Sidebar */
                .copilot-sidebar {
                    width: 320px; background: #080808; border-left: 1px solid rgba(255,255,255,0.1);
                    display: flex; flex-direction: column; z-index: 30;
                }
                @media (max-width: 1024px) {
                    .copilot-sidebar { position: absolute; right: 0; top: 0; bottom: 0; box-shadow: -10px 0 30px rgba(0,0,0,0.5); }
                }

                .zen-exit-btn {
                    position: fixed; bottom: 30px; right: 30px; width: 44px; height: 44px;
                    border-radius: 50%; background: rgba(0,240,255,0.1); border: 1px solid rgba(0,240,255,0.3);
                    color: #00f0ff; display: flex; align-items: center; justify-content: center;
                    cursor: pointer; backdrop-filter: blur(10px); transition: 0.3s; z-index: 100;
                }
                .zen-exit-btn:hover { background: rgba(0,240,255,0.2); box-shadow: 0 0 20px rgba(0,240,255,0.4); transform: scale(1.1); }

                .toast-notification {
                    position: fixed; bottom: 30px; right: 30px;
                    background: #00f0ff; color: #000; padding: 12px 24px;
                    border-radius: 8px; font-weight: 600; box-shadow: 0 5px 20px rgba(0,240,255,0.3);
                    z-index: 100; animation: fadeUp 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
                }
                @keyframes fadeUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

                .readme-preview { padding: 40px; overflow-y: auto; height: 100%; color: #ccc; }
                .readme-preview h1 { color: #fff; border-bottom: 1px solid #333; padding-bottom: 10px; }
                .readme-content { background: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px; margin-top: 20px; }
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

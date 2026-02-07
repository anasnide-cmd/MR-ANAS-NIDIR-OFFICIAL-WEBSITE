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
    Terminal
} from 'lucide-react';

/* --- ICONS & STYLES --- */
// Using local styled-jsx at the bottom

export default function MrBuildEditorContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const querySiteId = searchParams.get('id');

    // State
    const [user, setUser] = useState(null);
    const [siteId, setSiteId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('code'); // code, issues, pr, settings
    const [activeFile, setActiveFile] = useState('index.html'); // index.html, styles.css, README.md
    const [showPreview, setShowPreview] = useState(false);
    const [copilotOpen, setCopilotOpen] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    const [siteData, setSiteData] = useState({
        name: '', slug: '', title: '', description: '',
        customHtml: '', customCss: '',
        status: 'draft',
        theme: 'dark-nebula',
        socials: {},
        updatedAt: new Date().toISOString()
    });

    const [showMobileSidebar, setShowMobileSidebar] = useState(false);

    // Load Data
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            if (!u) { router.push('/mr-build/login'); return; }
            setUser(u);

            if (querySiteId) {
                try {
                    const docRef = await getDoc(doc(db, 'user_sites', querySiteId));
                    if (docRef.exists()) {
                        setSiteId(docRef.id);
                        setSiteData({ ...docRef.data(), id: docRef.id });
                    }
                } catch (err) { console.error(err); }
            }
            setLoading(false);
        });
        return () => unsub();
    }, [querySiteId, router]);

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

    if (loading) return <Loader text="Loading Repository..." />;

    return (
        <div className="repo-container">
            {/* 1. Header (Breadcrumbs + Actions) */}
            <header className="repo-header">
                <div className="header-left">
                    <button className="mobile-menu-btn" onClick={() => setShowMobileSidebar(!showMobileSidebar)}>
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
                        {/* 3a. File Explorer Sidebar */}
                        <aside className={`file-explorer ${showMobileSidebar ? 'mobile-visible' : ''}`}>
                            <div className="explorer-header">
                                <span>FILES</span>
                                <span className="branch-badge"><GitBranch size={10}/> main</span>
                            </div>
                            <div className="explorer-list">
                                <div className={`file-item ${activeFile === 'index.html' ? 'active' : ''}`} onClick={() => { setActiveFile('index.html'); setShowMobileSidebar(false); }}>
                                    <Code size={14} className="icon-file icon-html" /> index.html
                                </div>
                                <div className={`file-item ${activeFile === 'styles.css' ? 'active' : ''}`} onClick={() => { setActiveFile('styles.css'); setShowMobileSidebar(false); }}>
                                    <Code size={14} className="icon-file icon-css" /> styles.css
                                </div>
                                <div className={`file-item ${activeFile === 'README.md' ? 'active' : ''}`} onClick={() => { setActiveFile('README.md'); setShowMobileSidebar(false); }}>
                                    <Book size={14} className="icon-file" /> README.md
                                </div>
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
                                    <button className="btn-tool" onClick={() => setCopilotOpen(!copilotOpen)}>
                                        <Terminal size={14}/> Copilot
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
                                
                                {/* The Editor */}
                                <div className={`editor-pane ${showPreview ? 'split' : ''}`}>
                                    {activeFile === 'README.md' && (
                                        <div className="readme-preview">
                                            <h1>{siteData.title || 'Untitled Project'}</h1>
                                            <p>{siteData.description || 'No description found.'}</p>
                                            <hr/>
                                            <h3>Status</h3>
                                            <p>This project is currently <strong>{siteData.status}</strong>.</p>
                                            <p style={{marginTop: '20px', color: '#8b949e', fontSize: '0.9em'}}>
                                                This <code>README.md</code> is auto-generated from your repository settings.
                                            </p>
                                        </div>
                                    )}

                                    {activeFile === 'index.html' && (
                                        <Editor
                                            value={siteData.customHtml}
                                            onValueChange={code => setSiteData({ ...siteData, customHtml: code })}
                                            highlight={code => highlight(code, languages.markup)}
                                            padding={20}
                                            className="code-editor"
                                            style={{
                                                fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                                                fontSize: 14,
                                            }}
                                        />
                                    )}

                                    {activeFile === 'styles.css' && (
                                        <Editor
                                            value={siteData.customCss}
                                            onValueChange={code => setSiteData({ ...siteData, customCss: code })}
                                            highlight={code => highlight(code, languages.css)}
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
                                        <div className="preview-header">Browser Preview</div>
                                        <iframe 
                                            title="Live Preview"
                                            srcDoc={`
                                                <html>
                                                    <head>
                                                        <style>${siteData.customCss}</style>
                                                    </head>
                                                    <body>
                                                        ${siteData.customHtml}
                                                    </body>
                                                </html>
                                            `}
                                            className="preview-iframe"
                                        />
                                    </div>
                                )}

                                {/* Copilot Sidebar */}
                                {copilotOpen && (
                                    <div className="copilot-sidebar">
                                         <AICopilot onApplyCode={(code) => {
                                             if (activeFile === 'index.html') {
                                                 setSiteData(prev => ({ ...prev, customHtml: prev.customHtml + '\n' + code }));
                                             } else if (activeFile === 'styles.css') {
                                                 setSiteData(prev => ({ ...prev, customCss: prev.customCss + '\n' + code }));
                                             } else {
                                                 alert('Switch to index.html or styles.css to apply code.');
                                             }
                                         }} />
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
                    font-size: 12px;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    cursor: pointer;
                    transition: 0.2s;
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
                    backdrop-filter: blur(10px);
                }
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
                    grid-template-columns: 260px 1fr;
                    gap: 20px;
                    height: calc(100vh - 140px);
                }
                
                /* File Explorer */
                .file-explorer {
                    border: 1px solid var(--border-color);
                    border-radius: 6px;
                    background: rgba(0,0,0,0.4); 
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    backdrop-filter: blur(5px);
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
                    padding: 8px 16px;
                    font-size: 13px;
                    border-bottom: 1px solid rgba(255,255,255,0.02);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: var(--text-secondary);
                    transition: 0.15s;
                }
                .file-item:last-child { border-bottom: none; }
                .file-item:hover { background: rgba(255,255,255,0.05); color: var(--text-primary); }
                .file-item.active { 
                    background: rgba(0, 240, 255, 0.1); 
                    color: #fff; 
                    border-left: 2px solid var(--accent); 
                    padding-left: 14px; 
                }
                .icon-file { color: var(--text-secondary); }
                .icon-html { color: #e34c26; }
                .icon-css { color: #563d7c; }

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
                }
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
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex; align-items: center; gap: 6px;
                    transition: 0.2s;
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
                    border-radius: 6px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                }
                @keyframes slideDown { from { transform: translate(-50%, -20px); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }
                
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
                    display: none;
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
                    .header-right { width: 100%; justify-content: flex-start; overflow-x: auto; padding-bottom: 4px; }
                    
                    .code-layout { grid-template-columns: 1fr; position: relative; }
                    
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
                }
                @keyframes slideIn { from { transform: translateX(-100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            `}</style>
        </div>
    );
}

function BookIcon() {
    return (
        <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style={{color: '#8b949e'}}>
            <path d="M0 1.75A.75.75 0 01.75 1h4.253c1.227 0 2.317.59 3 1.501A3.744 3.744 0 0111.006 1h4.245a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-4.507a2.25 2.25 0 00-1.591.659l-.622.621a.75.75 0 01-1.06 0l-.622-.621A2.25 2.25 0 005.258 13H.75a.75.75 0 01-.75-.75V1.75zm8.755 3a2.25 2.25 0 012.25-2.25H14.5v9h-3.757c-.71 0-1.4.201-1.992.572l.004-7.322zm-1.504 7.324l.004-5.073-.002-2.253A2.25 2.25 0 005.003 2.5H1.5v9h3.757a3.677 3.677 0 011.994.574z"></path>
        </svg>
    )
}

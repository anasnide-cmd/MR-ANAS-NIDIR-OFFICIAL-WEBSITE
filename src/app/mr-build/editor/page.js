'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, storage } from '../../../lib/firebase';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import dynamic from 'next/dynamic';
import Loader from '../../../components/Loader';
import { motion, AnimatePresence } from 'framer-motion';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// Shared Components
const AICopilot = dynamic(() => import('../../../components/MREditor/AICopilot'), { ssr: false });
const AssetManager = dynamic(() => import('../../../components/MREditor/AssetManager'), { ssr: false });
const SpriteEditor = dynamic(() => import('../../../components/MREditor/SpriteEditor'), { ssr: false });
const Terminal = dynamic(() => import('../../../components/MREditor/Terminal'), { ssr: false });
const Auditor = dynamic(() => import('../../../components/MREditor/Auditor'), { ssr: false });
const FileTree = dynamic(() => import('../../../components/MREditor/FileTree'), { ssr: false });
const ARPreview = dynamic(() => import('../../../components/MREditor/ARPreview'), { ssr: false });
const NormalPreview = dynamic(() => import('../../../components/MREditor/NormalPreview'), { ssr: false });
const LibraryManager = dynamic(() => import('../../../components/MREditor/LibraryManager'), { ssr: false });
const AICommandPalette = dynamic(() => import('../../../components/MREditor/AICommandPalette'), { ssr: false });

import Editor from 'react-simple-code-editor';
import TabBar from '../../../components/MREditor/TabBar';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-tomorrow.css';

import { 
    Save, 
    Play, 
    Eye, 
    Terminal as TerminalIcon, 
    Sparkles, 
    Search,
    ChevronLeft,
    Monitor,
    Smartphone,
    Menu,
    Files,
    Code,
    Layout,
    Download,
    Maximize,
    Box
} from 'lucide-react';

function EditorContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const projectId = searchParams.get('id');

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeFile, setActiveFile] = useState('index.html');
    const [showPreview, setShowPreview] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [bottomPanel, setBottomPanel] = useState('terminal'); // 'terminal', 'auditor'
    const [rightPanel, setRightPanel] = useState('copilot'); // 'copilot', 'assets'
    const [openFiles, setOpenFiles] = useState(['index.html']);
    const [showSpriteEditor, setShowSpriteEditor] = useState(false);
    const [activeTab, setActiveTab] = useState('editor'); // 'editor', 'preview', 'ai', 'terminal', 'assets'
    const [previewMode, setPreviewMode] = useState('normal'); // 'normal', 'ar'
    const [previewDoc, setPreviewDoc] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [localProjectId, setLocalProjectId] = useState(projectId);
    const [zenMode, setZenMode] = useState(false);
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);
    const [selectionContext, setSelectionContext] = useState({ activeFile: 'index.html', selectedText: '' });

    const [projectData, setProjectData] = useState({
        name: 'Untitled Project',
        files: {
            'index.html': { content: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { margin: 0; background: #000; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; }\n  </style>\n</head>\n<body>\n  <h1>MR BUILD ACTIVE</h1>\n  <script src="script.js"></script>\n</body>\n</html>', language: 'html' },
            'style.css': { content: 'body { margin: 0; overflow: hidden; }', language: 'css' },
            'script.js': { content: 'console.log("MR Build Initialized");', language: 'javascript' }
        }
    });

    useEffect(() => {
        const handleMessage = (e) => {
            if (e.data && e.data.type === 'preview-logs') {
                const { logType, content } = e.data;
                let prefix = '';
                let color = '';
                
                switch(logType) {
                    case 'info': prefix = '\x1b[36m[INFO]\x1b[0m '; color = '\x1b[36m'; break;
                    case 'warn': prefix = '\x1b[33m[WARN]\x1b[0m '; color = '\x1b[33m'; break;
                    case 'error': prefix = '\x1b[31m[ERR]\x1b[0m '; color = '\x1b[31m'; break;
                    default: prefix = '\x1b[32m[LOG]\x1b[0m '; color = '\x1b[32m'; break;
                }
                
                if (window.terminalWrite) {
                    window.terminalWrite(`${prefix}${content}`);
                }
            }
        };
        window.addEventListener('message', handleMessage);

        const handleKeyDown = (e) => {
            if (e.altKey && e.key.toLowerCase() === 'a') {
                e.preventDefault();
                setIsPaletteOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('message', handleMessage);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            if (!u) { router.push('/mr-build/login'); return; }
            setUser(u);

            if (projectId) {
                const docSnap = await getDoc(doc(db, 'user_sites', projectId));
                if (docSnap.exists()) {
                    setLocalProjectId(docSnap.id);
                    const data = docSnap.data();
                    // Handle legacy projects or projects without 'files' structure
                    if (!data.files) {
                        data.files = {
                            'index.html': { 
                                content: data.customHtml || '<!DOCTYPE html>\n<html>\n<body>\n  <h1>NEX CONSTRUCT INITIALIZED</h1>\n</body>\n</html>', 
                                language: 'html' 
                            },
                            'style.css': { 
                                content: data.customCss || 'body { background: #000; color: #fff; }', 
                                language: 'css' 
                            }
                        };
                    }
                    setProjectData({ ...data, name: data.name || 'Untitled Project' });
                }
            }
            setLoading(false);
        });
        return () => unsub();
    }, [projectId, router]);

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        try {
            let targetId = localProjectId;
            if (!targetId) {
                const newRef = doc(collection(db, 'user_sites'));
                targetId = newRef.id;
                await setDoc(newRef, {
                    ...projectData,
                    userId: user.uid,
                    id: targetId,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
                setLocalProjectId(targetId);
                router.replace(`/mr-build/editor?id=${targetId}`);
            } else {
                await setDoc(doc(db, 'user_sites', targetId), {
                    ...projectData,
                    updatedAt: new Date().toISOString()
                }, { merge: true });
            }
            setSuccessMsg('Project synchronized.');
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (err) {
            console.error(err);
            alert('Save failed: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleExport = async () => {
        setSaving(true);
        try {
            const zip = new JSZip();
            const files = projectData.files || {};
            
            Object.keys(files).forEach(name => {
                zip.file(name, files[name].content);
            });
            
            const blob = await zip.generateAsync({ type: 'blob' });
            saveAs(blob, `${projectData.name.replace(/\s+/g, '_')}_bundle.zip`);
            setSuccessMsg('Project bundled and exported.');
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (err) {
            console.error(err);
            alert('Export failed: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    const updateFileContent = (fileName, content, language = null) => {
        setProjectData(prev => {
            const newFiles = { ...prev.files };
            if (content === null) {
                delete newFiles[fileName];
                setOpenFiles(prevOpen => prevOpen.filter(f => f !== fileName));
                if (activeFile === fileName) setActiveFile('index.html');
            } else {
                newFiles[fileName] = {
                    ...newFiles[fileName],
                    content: content,
                    language: language || newFiles[fileName]?.language || 'javascript'
                };
                if (!openFiles.includes(fileName)) {
                    setOpenFiles(prevOpen => [...prevOpen, fileName]);
                }
            }
            return { ...prev, files: newFiles };
        });
    };
    
    const handleSaveSprite = async (spriteData) => {
        if (!user) return;
        console.log("Saving sprite to storage...", spriteData.name);
        try {
            const storageRef = ref(storage, `users/${user.uid}/uploads/${spriteData.name}`);
            const result = await uploadBytes(storageRef, spriteData.blob);
            console.log("Sprite uploaded successfully:", result.fullPath);

            // Force a small delay to ensure Firebase Storage propagation
            await new Promise(resolve => setTimeout(resolve, 500));

            // Alert AssetManager to refresh
            window.dispatchEvent(new CustomEvent('ASSET_MODIFIED'));
            setShowSpriteEditor(false);
        } catch (err) {
            console.error("Failed to save sprite:", err);
            alert(`Syncing failed: ${err.message}`);
        }
    };

    const handleRun = () => {
        const html = projectData.files['index.html']?.content || '';
        const css = (projectData.files['style.css']?.content || '') + (projectData.files['style.css']?.content ? '' : '');
        const js = projectData.files['script.js']?.content || '';
        
        const docText = `
            <!DOCTYPE html>
            <html>
                <head>
                    <script>
                        (function() {
                            const sendToParent = (type, args) => {
                                window.parent.postMessage({
                                    type: 'preview-logs',
                                    logType: type,
                                    content: Array.from(args).map(arg => {
                                        try { return typeof arg === 'object' ? JSON.stringify(arg) : String(arg); }
                                        catch(e) { return String(arg); }
                                    }).join(' ')
                                }, '*');
                            };
                            const original = { log: console.log, info: console.info, warn: console.warn, error: console.error };
                            console.log = (...args) => { sendToParent('log', args); original.log.apply(console, args); };
                            console.info = (...args) => { sendToParent('info', args); original.info.apply(console, args); };
                            console.warn = (...args) => { sendToParent('warn', args); original.warn.apply(console, args); };
                            console.error = (...args) => { sendToParent('error', args); original.error.apply(console, args); };
                            window.onerror = (m, u, l, c, e) => { sendToParent('error', [\`Uncaught Error: \${m} at \${l}:\${c}\`]); return false; };
                        })();
                    </script>
                    <style>
                        ${css}
                        body { margin: 0; background: transparent; color: white; font-family: sans-serif; }
                    </style>
                </head>
                <body>
                    ${html}
                    <script>${js}</script>
                </body>
            </html>
        `;
        setPreviewDoc(docText);
        if (window.innerWidth < 768) setActiveTab('preview');
        else setShowPreview(true);
    };

    const handleInsertAsset = (url) => {
        const ext = activeFile.split('.').pop().toLowerCase();
        let snippet = url;
        if (ext === 'html') snippet = `<img src="${url}" alt="asset" style="max-width: 100%;" />`;
        else if (ext === 'css') snippet = `background-image: url("${url}");`;
        
        updateFileContent(activeFile, currentFile.content + '\n' + snippet);
    };

    if (loading) return <Loader text="Loading Project..." />;

    const currentFile = (projectData?.files && projectData.files[activeFile]) || { content: '', language: 'javascript' };

    return (
        <div className="mr-editor">
            <header className="editor-nav">
                <div className="nav-left">
                    <button onClick={() => router.push('/mr-build/dashboard')} className="btn-back">
                        <ChevronLeft size={20} />
                    </button>
                    <button className="btn-icon mobile-only" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <Menu size={20} />
                    </button>
                    <h1>{projectData.name}</h1>
                </div>
                <div className="nav-center">
                    <button className="btn-save" onClick={handleSave} disabled={saving}>
                        <Save size={16} /> <span>{saving ? 'SAVING...' : 'SAVE'}</span>
                    </button>
                    <button className="btn-run" onClick={handleRun}>
                        <Play size={16} /> <span>RUN</span>
                    </button>
                </div>
                <div className="nav-right">
                    <button onClick={() => setRightPanel('copilot')} className={rightPanel === 'copilot' ? 'active' : ''}>
                        <Sparkles size={18} />
                    </button>
                    <button onClick={() => setRightPanel('assets')} className={rightPanel === 'assets' ? 'active' : ''}>
                        <Search size={18} />
                    </button>
                    <button onClick={() => setRightPanel('library')} className={rightPanel === 'library' ? 'active' : ''} title="Library Injector">
                        <Box size={18} />
                    </button>
                    <button onClick={() => setShowPreview(!showPreview)} className={showPreview ? 'active' : ''}>
                        <Eye size={18} />
                    </button>
                    <button onClick={handleExport} className="btn-export" title="Export ZIP">
                        <Download size={18} />
                    </button>
                    <button onClick={() => setZenMode(!zenMode)} className={zenMode ? 'active' : ''} title="Zen Mode">
                        <Maximize size={18} />
                    </button>
                </div>
            </header>

            <div className="editor-main">
                <FileTree 
                    files={projectData.files || {}}
                    activeFile={activeFile}
                    onSelectFile={(f) => { 
                        setActiveFile(f); 
                        setSelectionContext(prev => ({ ...prev, activeFile: f }));
                        if (!openFiles.includes(f)) setOpenFiles(prev => [...prev, f]);
                        if(window.innerWidth < 768) { setSidebarOpen(false); setActiveTab('editor'); } 
                    }}
                    onCreateFile={(name) => updateFileContent(name, '')}
                    onDeleteFile={(name) => updateFileContent(name, null)}
                    showSidebar={sidebarOpen && !zenMode}
                    setShowSidebar={setSidebarOpen}
                />

                <div className={`editor-content ${(activeTab !== 'editor' && window.innerWidth < 768) ? 'hidden-mobile' : ''}`}>
                    <div className="ai-quick-actions">
                        <button onClick={() => window.dispatchEvent(new CustomEvent('AI_COMMAND_PALETTE_TRIGGER', { detail: { command: '/suggest', context: selectionContext } }))}>
                            <Sparkles size={12} /> SUGGEST
                        </button>
                        <button onClick={() => window.dispatchEvent(new CustomEvent('AI_COMMAND_PALETTE_TRIGGER', { detail: { command: '/docs', context: selectionContext } }))}>
                            <Code size={12} /> DOCUMENT
                        </button>
                        <button onClick={() => window.dispatchEvent(new CustomEvent('AI_COMMAND_PALETTE_TRIGGER', { detail: { command: '/refactor', context: selectionContext } }))}>
                            <Layout size={12} /> REFACTOR
                        </button>
                    </div>
                    <TabBar 
                        openFiles={openFiles}
                        activeFile={activeFile}
                        onSelectFile={(f) => setActiveFile(f)}
                        onCloseFile={(f) => {
                            const newOpenFiles = openFiles.filter(file => file !== f);
                            setOpenFiles(newOpenFiles);
                            if (activeFile === f) {
                                setActiveFile(newOpenFiles[newOpenFiles.length - 1] || 'index.html');
                            }
                        }}
                    />
                    <div className={`code-area ${(bottomPanel === 'terminal' || bottomPanel === 'auditor') && window.innerWidth < 768 && activeTab !== 'editor' ? 'hidden-mobile' : ''}`}>
                        <div className="editor-container-with-lines">
                            <div className="line-numbers">
                                {currentFile.content.split('\n').map((_, i) => (
                                    <div key={i} className="line-number">{i + 1}</div>
                                ))}
                            </div>
                             <Editor
                                 value={currentFile.content}
                                 onValueChange={code => updateFileContent(activeFile, code)}
                                 highlight={code => highlight(code, languages[currentFile.language] || languages.javascript)}
                                 padding={20}
                                 className="code-editor"
                                 onKeyDown={(e) => {
                                     // Capture selection on key up/down with a small delay
                                     setTimeout(() => {
                                         const selection = window.getSelection().toString();
                                         if (selection) {
                                             setSelectionContext({ activeFile, selectedText: selection });
                                         }
                                     }, 0);
                                 }}
                                 onMouseUp={() => {
                                     const selection = window.getSelection().toString();
                                     if (selection) {
                                         setSelectionContext({ activeFile, selectedText: selection });
                                     } else {
                                         setSelectionContext(prev => ({ ...prev, selectedText: '' }));
                                     }
                                 }}
                                 style={{
                                     fontFamily: '"Fira Code", monospace',
                                     fontSize: 13,
                                     lineHeight: '1.5',
                                     backgroundColor: 'transparent',
                                     minHeight: '100%',
                                     color: '#fff',
                                     flex: 1
                                 }}
                             />
                        </div>
                    </div>
                    
                    <div className={`bottom-panel ${activeTab !== 'terminal' && activeTab !== 'auditor' ? 'hidden-mobile' : ''}`}>
                        <div className="panel-tabs hidden-mobile">
                            <button onClick={() => setBottomPanel('terminal')} className={bottomPanel === 'terminal' ? 'active' : ''}>TERMINAL</button>
                            <button onClick={() => setBottomPanel('auditor')} className={bottomPanel === 'auditor' ? 'active' : ''}>AUDITOR</button>
                        </div>
                        <div className="panel-content">
                            {activeTab === 'terminal' || bottomPanel === 'terminal' ? (
                                <Terminal 
                                    files={projectData.files || {}} 
                                    onUpdateFiles={updateFileContent} 
                                    onRun={handleRun}
                                    onFixError={(err) => window.dispatchEvent(new CustomEvent('AI_FIX_REQUEST', { detail: { error: err } }))}
                                />
                            ) : (
                                <Auditor files={projectData.files || {}} />
                            )}
                        </div>
                    </div>
                </div>

                {showPreview && (
                    <div className={`preview-area ${activeTab !== 'preview' ? 'hidden-mobile' : ''}`}>
                        <div className="preview-mode-selector">
                            <div className={`selector-bg ${previewMode}`}></div>
                            <button 
                                className={previewMode === 'normal' ? 'active' : ''} 
                                onClick={() => setPreviewMode('normal')}
                            >
                                <Monitor size={14} /> <span>NORMAL</span>
                            </button>
                            <button 
                                className={previewMode === 'ar' ? 'active' : ''} 
                                onClick={() => setPreviewMode('ar')}
                            >
                                <Smartphone size={14} /> <span>AR</span>
                            </button>
                        </div>
                        <div className="preview-window">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={previewMode}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    style={{ width: '100%', height: '100%' }}
                                >
                                    {previewMode === 'ar' ? (
                                        <ARPreview srcDoc={previewDoc} />
                                    ) : (
                                        <NormalPreview srcDoc={previewDoc} />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                )}

                <aside className={`right-panel ${(activeTab !== 'ai' && activeTab !== 'assets') || zenMode ? 'hidden-mobile hidden-desktop' : ''}`}>
                    {activeTab === 'assets' || (rightPanel === 'assets' && activeTab === 'editor') ? (
                        <AssetManager onInsert={handleInsertAsset} onSpriteEditor={() => setShowSpriteEditor(true)} />
                    ) : (rightPanel === 'library') ? (
                        <LibraryManager projectData={projectData} onUpdateFile={updateFileContent} />
                    ) : (
                        <AICopilot 
                            siteData={projectData} 
                            onCodeUpdate={updateFileContent} 
                            selectionContext={selectionContext}
                        />
                    )}
                </aside>
            </div>

            <div className="mobile-nav mobile-only">
                <button className={activeTab === 'editor' ? 'active' : ''} onClick={() => setActiveTab('editor')}>
                    <Code size={18} /> <span>CODE</span>
                </button>
                <button className={activeTab === 'editor' && sidebarOpen ? 'active' : ''} onClick={() => { setSidebarOpen(!sidebarOpen); if(!sidebarOpen) setActiveTab('editor'); }}>
                    <Files size={18} /> <span>FILES</span>
                </button>
                <button className={activeTab === 'preview' ? 'active' : ''} onClick={() => setActiveTab('preview')}>
                    <Eye size={18} /> <span>PREVIEW</span>
                </button>
                <button className={activeTab === 'terminal' ? 'active' : ''} onClick={() => { setActiveTab(activeTab === 'terminal' ? 'editor' : 'terminal'); setBottomPanel('terminal'); }}>
                    <TerminalIcon size={18} /> <span>TERM</span>
                </button>
                <button className={activeTab === 'auditor' ? 'active' : ''} onClick={() => { setActiveTab(activeTab === 'auditor' ? 'editor' : 'auditor'); setBottomPanel('auditor'); }}>
                    <Layout size={18} /> <span>AUDIT</span>
                </button>
                <button className={activeTab === 'ai' ? 'active' : ''} onClick={() => setActiveTab(activeTab === 'ai' ? 'editor' : 'ai')}>
                    <Sparkles size={18} /> <span>AI</span>
                </button>
                <button className={activeTab === 'assets' ? 'active' : ''} onClick={() => setActiveTab(activeTab === 'assets' ? 'editor' : 'assets')}>
                    <Search size={18} /> <span>ASSETS</span>
                </button>
            </div>

            {showSpriteEditor && (
                <SpriteEditor 
                    onSave={handleSaveSprite} 
                    onClose={() => setShowSpriteEditor(false)} 
                />
            )}

            {successMsg && <div className="toast">{successMsg}</div>}

            <AICommandPalette 
                isOpen={isPaletteOpen} 
                onClose={() => setIsPaletteOpen(false)}
                onCommand={(cmd) => {
                    window.dispatchEvent(new CustomEvent('AI_COMMAND_PALETTE_TRIGGER', { 
                        detail: { command: cmd, context: selectionContext } 
                    }));
                    if(window.innerWidth > 768) setRightPanel('copilot');
                    else setActiveTab('ai');
                }}
            />

            <style jsx>{`
                .mr-editor { height: 100dvh; display: flex; flex-direction: column; background: #050505; color: #fff; overflow: hidden; }
                .editor-nav { height: 50px; background: #000; border-bottom: 1px solid #1a1a1a; display: flex; justify-content: space-between; align-items: center; padding: 0 15px; flex-shrink: 0; }
                .nav-left, .nav-center, .nav-right { display: flex; align-items: center; gap: 12px; }
                .nav-left h1 { font-size: 0.8rem; font-family: 'Orbitron'; margin: 0; color: #00f0ff; letter-spacing: 1px; }
                
                .ai-quick-actions {
                    display: flex;
                    gap: 8px;
                    padding: 6px 15px;
                    background: rgba(10, 10, 15, 0.8);
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    overflow-x: auto;
                    white-space: nowrap;
                    -webkit-overflow-scrolling: touch;
                    scrollbar-width: none;
                }
                .ai-quick-actions::-webkit-scrollbar { display: none; }

                .ai-quick-actions button {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(0, 240, 255, 0.15);
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 9px;
                    font-weight: 900;
                    padding: 5px 12px;
                    border-radius: 6px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    transition: 0.2s;
                    letter-spacing: 0.5px;
                    flex-shrink: 0;
                }
                .ai-quick-actions button:hover {
                    background: rgba(0, 240, 255, 0.1);
                    color: #00f0ff;
                    border-color: rgba(0, 240, 255, 0.5);
                    box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
                }
                
                @media (max-width: 768px) {
                    .nav-center span { display: none; }
                    .nav-left h1 { font-size: 0.7rem; max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                }

                .btn-save, .btn-run, .btn-export { background: #00f0ff; color: #000; border: none; padding: 5px 12px; border-radius: 4px; font-weight: 800; font-size: 0.7rem; cursor: pointer; display: flex; align-items: center; gap: 5px; transition: 0.2s; }
                .btn-run { background: #00ff88; }
                .btn-export { background: transparent; color: #00f0ff; border: 1px solid rgba(0, 240, 255, 0.3); }
                .btn-export:hover { background: rgba(0, 240, 255, 0.1); }
                
                .nav-right button { background: transparent; border: none; color: #444; cursor: pointer; transition: 0.2s; }
                .nav-right button.active { color: #00f0ff; }
                
                .editor-main { flex: 1; display: flex; overflow: hidden; position: relative; }
                
                .editor-content { flex: 1; display: flex; flex-direction: column; border-right: 1px solid #1a1a1a; min-width: 0; }
                .code-area { flex: 1; overflow-y: auto; background: #080808; }
                .editor-container-with-lines { display: flex; position: relative; min-height: 100%; }
                .line-numbers { 
                    padding: 20px 0; 
                    text-align: right; 
                    background: rgba(0,0,0,0.3); 
                    border-right: 1px solid rgba(255,255,255,0.05); 
                    color: #444; 
                    font-family: "Fira Code", monospace; 
                    font-size: 13px; 
                    line-height: 1.5; 
                    user-select: none; 
                    min-width: 45px;
                    padding-right: 15px;
                    flex-shrink: 0;
                }
                .line-number { height: 1.5em; padding-right: 5px; }
                .code-editor :global(textarea) { outline: none !important; white-space: pre !important; }
                .code-editor :global(pre) { white-space: pre !important; }
                
                .bottom-panel { 
                    height: ${zenMode ? '0%' : '35%'}; 
                    border-top: ${zenMode ? 'none' : '1px solid #1a1a1a'}; 
                    display: flex; 
                    flex-direction: column; 
                    flex-shrink: 0; 
                    overflow: hidden;
                    transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .panel-tabs { display: flex; background: #000; border-bottom: 1px solid #1a1a1a; }
                .panel-tabs button { padding: 8px 15px; background: transparent; border: none; color: #444; font-size: 0.6rem; font-weight: 800; cursor: pointer; }
                .panel-tabs button.active { color: #00f0ff; border-bottom: 2px solid #00f0ff; }
                .panel-content { flex: 1; overflow: hidden; }
                
                .preview-area { width: 450px; border-left: 1px solid #1a1a1a; flex-shrink: 0; display: flex; flex-direction: column; background: #000; z-index: 5; }
                .preview-mode-selector { 
                    display: flex; background: #0a0a0a; border-bottom: 1px solid #1a1a1a; 
                    height: 40px; padding: 4px; gap: 4px; position: relative;
                }
                .selector-bg {
                    position: absolute; top: 4px; height: 32px; width: calc(50% - 6px);
                    background: #1a1a1a; border-radius: 6px; transition: 0.3s cubic-bezier(0.19, 1, 0.22, 1);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .selector-bg.normal { left: 4px; }
                .selector-bg.ar { left: calc(50% + 2px); }

                .preview-mode-selector button { 
                    flex: 1; background: transparent; border: none; color: #555; 
                    font-size: 0.65rem; font-weight: 800; cursor: pointer; 
                    display: flex; align-items: center; justify-content: center; 
                    gap: 8px; z-index: 2; transition: color 0.3s;
                    letter-spacing: 1px;
                }
                .preview-mode-selector button.active { color: #00f0ff; }
                .preview-window { flex: 1; overflow: hidden; position: relative; background: #000; }
                .right-panel { width: 300px; background: #080808; flex-shrink: 0; }
                
                @media (max-width: 768px) {
                    .preview-area, .right-panel, .bottom-panel { width: 100%; position: absolute; inset: 0; z-index: 10; background: #000; }
                    .hidden-mobile { display: none !important; }
                    .mobile-only { display: flex !important; }
                }
                .hidden-desktop { display: none !important; }

                .mobile-nav { 
                    display: none; 
                    height: 65px; 
                    background: #000; 
                    border-top: 1px solid #1a1a1a; 
                    padding: 0 10px;
                    gap: 5px;
                    overflow-x: auto;
                    white-space: nowrap;
                    -webkit-overflow-scrolling: touch;
                    scrollbar-width: none;
                    z-index: 100; 
                }
                .mobile-nav::-webkit-scrollbar { display: none; }

                .mobile-nav button { 
                    background: none; 
                    border: none; 
                    color: #555; 
                    font-size: 0.55rem; 
                    font-weight: 800; 
                    padding: 8px 12px; 
                    display: flex; 
                    flex-direction: column; 
                    align-items: center; 
                    gap: 6px;
                    flex-shrink: 0;
                    min-width: 65px;
                    transition: 0.2s;
                }
                .mobile-nav button.active { 
                    color: #00f0ff; 
                    background: rgba(0, 240, 255, 0.05);
                    border-radius: 8px;
                }
                .mobile-nav button.active :global(svg) { color: #00f0ff; }

                .sprite-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 1000; display: flex; align-items: center; justify-content: center; }
                .modal-content { background: #111; padding: 10px; border-radius: 12px; position: relative; width: 95%; height: 95%; }
                .close-btn { position: absolute; top: 10px; right: 10px; background: #ff4444; color: #fff; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; z-index: 10001; }

                .toast { position: fixed; bottom: 70px; right: 20px; background: #00f0ff; color: #000; padding: 10px 20px; border-radius: 8px; font-weight: 800; font-size: 0.8rem; animation: slideUp 0.3s; z-index: 1000; }
                @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            `}</style>
        </div>
    );
}

export default function MREditorPage() {
    return (
        <Suspense fallback={<Loader text="Initializing Workspace..." />}>
            <EditorContent />
        </Suspense>
    );
}
'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, storage } from '../../../lib/firebase';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import dynamic from 'next/dynamic';
import Loader from '../../../components/Loader';

// Shared Components
const AICopilot = dynamic(() => import('../../../components/MREditor/AICopilot'), { ssr: false });
const AssetManager = dynamic(() => import('../../../components/MREditor/AssetManager'), { ssr: false });
const SpriteEditor = dynamic(() => import('../../../components/MREditor/SpriteEditor'), { ssr: false });
const Terminal = dynamic(() => import('../../../components/MREditor/Terminal'), { ssr: false });
const Auditor = dynamic(() => import('../../../components/MREditor/Auditor'), { ssr: false });
const FileTree = dynamic(() => import('../../../components/MREditor/FileTree'), { ssr: false });
const ARPreview = dynamic(() => import('../../../components/MREditor/ARPreview'), { ssr: false });

import Editor from 'react-simple-code-editor';
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
    Layout
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
    const [showSpriteEditor, setShowSpriteEditor] = useState(false);
    const [activeTab, setActiveTab] = useState('editor'); // 'editor', 'preview', 'ai', 'terminal', 'assets'
    const [previewDoc, setPreviewDoc] = useState('');

    const [projectData, setProjectData] = useState({
        name: 'Untitled Project',
        files: {
            'index.html': { content: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { margin: 0; background: #000; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; }\n  </style>\n</head>\n<body>\n  <h1>MR BUILD ACTIVE</h1>\n  <script src="script.js"></script>\n</body>\n</html>', language: 'html' },
            'style.css': { content: 'body { margin: 0; overflow: hidden; }', language: 'css' },
            'script.js': { content: 'console.log("MR Build Initialized");', language: 'javascript' }
        }
    });

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            if (!u) { router.push('/mr-build/login'); return; }
            setUser(u);

            if (projectId) {
                const docSnap = await getDoc(doc(db, 'user_sites', projectId));
                if (docSnap.exists()) {
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
        if (!user || !projectId) return;
        setSaving(true);
        try {
            await setDoc(doc(db, 'user_sites', projectId), {
                ...projectData,
                updatedAt: new Date().toISOString()
            }, { merge: true });
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const updateFileContent = (fileName, content, language = null) => {
        setProjectData(prev => {
            const newFiles = { ...prev.files };
            if (content === null) {
                delete newFiles[fileName];
            } else {
                newFiles[fileName] = {
                    ...newFiles[fileName],
                    content: content,
                    language: language || newFiles[fileName]?.language || 'javascript'
                };
            }
            return { ...prev, files: newFiles };
        });
    };
    
    const handleSaveSprite = async (spriteData) => {
        if (!user) return;
        try {
            const storageRef = ref(storage, `users/${user.uid}/uploads/${spriteData.name}`);
            await uploadBytes(storageRef, spriteData.blob);
            // Alert AssetManager to refresh
            window.dispatchEvent(new CustomEvent('ASSET_MODIFIED'));
            setShowSpriteEditor(false);
        } catch (err) {
            console.error("Failed to save sprite:", err);
            alert("Syncing failed.");
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
                    <button onClick={() => setShowPreview(!showPreview)} className={showPreview ? 'active' : ''}>
                        <Eye size={18} />
                    </button>
                </div>
            </header>

            <div className="editor-main">
                <FileTree 
                    files={projectData.files || {}}
                    activeFile={activeFile}
                    onSelectFile={(f) => { setActiveFile(f); if(window.innerWidth < 768) { setSidebarOpen(false); setActiveTab('editor'); } }}
                    onCreateFile={(name) => updateFileContent(name, '')}
                    showSidebar={sidebarOpen}
                    setShowSidebar={setSidebarOpen}
                />

                <div className={`editor-content ${(activeTab !== 'editor' && window.innerWidth < 768) ? 'hidden-mobile' : ''}`}>
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
                                style={{
                                    fontFamily: '"Fira Code", monospace',
                                    fontSize: 13,
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
                        <ARPreview srcDoc={previewDoc} />
                    </div>
                )}

                <aside className={`right-panel ${activeTab !== 'ai' && activeTab !== 'assets' ? 'hidden-mobile' : ''}`}>
                    {activeTab === 'assets' || (rightPanel === 'assets' && activeTab === 'editor') ? (
                        <AssetManager onInsert={handleInsertAsset} onSpriteEditor={() => setShowSpriteEditor(true)} />
                    ) : (
                        <AICopilot siteData={projectData} onCodeUpdate={updateFileContent} />
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

            <style jsx>{`
                .mr-editor { height: 100vh; display: flex; flex-direction: column; background: #050505; color: #fff; overflow: hidden; }
                .editor-nav { height: 50px; background: #000; border-bottom: 1px solid #1a1a1a; display: flex; justify-content: space-between; align-items: center; padding: 0 15px; flex-shrink: 0; }
                .nav-left, .nav-center, .nav-right { display: flex; align-items: center; gap: 15px; }
                .nav-left h1 { font-size: 0.9rem; font-family: 'Orbitron'; margin: 0; color: #00f0ff; }
                
                @media (max-width: 768px) {
                    .nav-center span { display: none; }
                    .nav-left h1 { font-size: 0.7rem; max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                }

                .btn-save, .btn-run { background: #00f0ff; color: #000; border: none; padding: 5px 12px; border-radius: 4px; font-weight: 800; font-size: 0.7rem; cursor: pointer; display: flex; align-items: center; gap: 5px; }
                .btn-run { background: #00ff88; }
                
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
                    padding-right: 10px;
                }
                .line-number { height: 1.5em; padding-right: 5px; }
                
                .bottom-panel { height: 35%; border-top: 1px solid #1a1a1a; display: flex; flex-direction: column; flex-shrink: 0; }
                .panel-tabs { display: flex; background: #000; border-bottom: 1px solid #1a1a1a; }
                .panel-tabs button { padding: 8px 15px; background: transparent; border: none; color: #444; font-size: 0.6rem; font-weight: 800; cursor: pointer; }
                .panel-tabs button.active { color: #00f0ff; border-bottom: 2px solid #00f0ff; }
                .panel-content { flex: 1; overflow: hidden; }
                
                .preview-area { width: 400px; border-right: 1px solid #1a1a1a; flex-shrink: 0; }
                .right-panel { width: 300px; background: #080808; flex-shrink: 0; }
                
                @media (max-width: 768px) {
                    .preview-area, .right-panel, .bottom-panel { width: 100%; position: absolute; inset: 0; z-index: 10; background: #000; }
                    .hidden-mobile { display: none !important; }
                    .mobile-only { display: flex !important; }
                }

                .mobile-nav { display: none; height: 60px; background: #000; border-top: 1px solid #1a1a1a; justify-content: space-around; align-items: center; z-index: 100; }
                .mobile-nav button { background: none; border: none; color: #444; font-size: 0.6rem; font-weight: 800; padding: 5px; display: flex; flex-direction: column; align-items: center; gap: 4px; }
                .mobile-nav button.active { color: #00f0ff; }
                .mobile-nav button.active :global(svg) { color: #00f0ff; }

                .sprite-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 1000; display: flex; align-items: center; justify-content: center; }
                .modal-content { background: #111; padding: 10px; border-radius: 12px; position: relative; width: 95%; height: 95%; }
                .close-btn { position: absolute; top: 10px; right: 10px; background: #ff4444; color: #fff; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; z-index: 10001; }
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
import { useState, useEffect, Suspense, useMemo, useCallback, useRef } from 'react';
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
const MonacoEditor = dynamic(() => import('../../../components/MREditor/MonacoEditor'), { ssr: false });

import TabBar from '../../../components/MREditor/TabBar';

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
    Box,
    X
} from 'lucide-react';

import {
    Button,
    ButtonGroup,
    Tabs,
    Dropdown,
    Chip,
    ScrollShadow,
    Breadcrumbs
} from "@heroui/react";

function EditorContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const projectId = searchParams.get('id');
    const editorRef = useRef(null);
    const debounceTimer = useRef(null);

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

    const handleSave = useCallback(async () => {
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
    }, [user, localProjectId, projectData, router]);

    const handleExport = useCallback(async () => {
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
    }, [projectData]);

    const updateFileContent = useCallback((fileName, content, language = null, immediate = false) => {
        const performUpdate = () => {
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

        if (immediate) {
            performUpdate();
        } else {
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
            debounceTimer.current = setTimeout(performUpdate, 300);
        }
    }, [activeFile, openFiles]);
    
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

    const handleRun = useCallback(() => {
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
    }, [projectData]);

    const handleMonacoChange = useCallback((code) => {
        // Use debounced update for regular typing
        updateFileContent(activeFile, code, null, false);
    }, [activeFile, updateFileContent]);

    const handleSelectionChange = useCallback((selectedText) => {
        setSelectionContext(prev => ({
            ...prev,
            selectedText: selectedText
        }));
    }, []);

    const handleInsertAsset = useCallback((url) => {
        const ext = activeFile.split('.').pop().toLowerCase();
        let snippet = url;
        if (ext === 'html') snippet = `<img src="${url}" alt="asset" style="max-width: 100%;" />`;
        else if (ext === 'css') snippet = `background-image: url("${url}");`;
        
        if (editorRef.current) {
            editorRef.current.insertText(snippet);
            // After insertion, update the full state immediately to sync
            updateFileContent(activeFile, editorRef.current.getValue(), null, true);
        } else {
            // Fallback
            updateFileContent(activeFile, (projectData.files[activeFile]?.content || '') + '\n' + snippet, null, true);
        }
    }, [activeFile, projectData, updateFileContent]);

    if (loading) return <Loader text="Neural Link Establishing..." />;

    const currentFile = useMemo(() => {
        return (projectData?.files && projectData.files[activeFile]) || { content: '', language: 'javascript' };
    }, [projectData, activeFile]);

    const ScanlineOverlay = () => (
        <div className="absolute inset-0 pointer-events-none z-[1000] opacity-[0.05] overflow-hidden">
            <div className="absolute inset-0 w-full h-[200%] animate-scanline" 
                 style={{ background: 'linear-gradient(to bottom, transparent 50%, #00f0ff 50%)', backgroundSize: '100% 8px' }} />
        </div>
    );

    const handleSelectFile = useCallback((f) => { 
        setActiveFile(f); 
        setSelectionContext(prev => ({ ...prev, activeFile: f }));
        if (!openFiles.includes(f)) setOpenFiles(prev => [...prev, f]);
        if(window.innerWidth < 768) { setSidebarOpen(false); setActiveTab('editor'); } 
    }, [openFiles]);

    const handleCreateFile = useCallback((name) => updateFileContent(name, ''), [updateFileContent]);
    const handleDeleteFile = useCallback((name) => updateFileContent(name, null), [updateFileContent]);

    const handleCloseFile = useCallback((f) => {
        const newOpenFiles = openFiles.filter(file => file !== f);
        setOpenFiles(newOpenFiles);
        if (activeFile === f) {
            setActiveFile(newOpenFiles[newOpenFiles.length - 1] || 'index.html');
        }
    }, [openFiles, activeFile]);

    return (
        <div className="mr-editor selection:bg-[#00f0ff] selection:text-black">
            <ScanlineOverlay />
            <header className="h-[60px] bg-[#050505]/80 backdrop-blur-2xl border-b border-[#00f0ff]/10 flex items-center justify-between px-4 sticky top-0 z-50 shadow-[0_4px_30px_rgba(0,240,255,0.05)]">
                <div className="flex items-center gap-3">
                    <Button 
                        isIconOnly 
                        variant="light" 
                        size="sm"
                        onClick={() => router.push('/mr-build/dashboard')}
                        className="text-white/40 hover:text-[#00f0ff] transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </Button>
                    <Button 
                        isIconOnly 
                        variant="flat" 
                        size="sm"
                        className="md:hidden bg-[#00f0ff]/5 border border-[#00f0ff]/20 text-[#00f0ff]"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <Menu size={20} />
                    </Button>
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black tracking-[4px] text-[#00f0ff]/40 uppercase leading-none mb-1">PROJECT CORE</span>
                        <h1 className="text-[0.7rem] sm:text-[0.8rem] font-orbitron m-0 text-white tracking-[2px] uppercase truncate max-w-[100px] sm:max-w-none">
                            {projectData.name}
                        </h1>
                    </div>
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <Button 
                        size="sm"
                        className="bg-[#00f0ff] text-black font-black shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-all"
                        onClick={handleSave}
                        isLoading={saving}
                        startContent={<Save size={16} />}
                    >
                        {saving ? 'SYNCING...' : 'SYNC CORE'}
                    </Button>
                    <Button 
                        size="sm"
                        className="bg-[#00ff88] text-black font-black shadow-[0_0_15px_rgba(0,255,136,0.4)]"
                        onClick={handleRun}
                        startContent={<Play size={16} />}
                    >
                        INITIALIZE
                    </Button>
                </div>

                {/* Mobile Actions */}
                <div className="md:hidden flex items-center gap-2">
                    <ButtonGroup.Root size="sm" variant="flat">
                         <Button isIconOnly onClick={handleSave} className="bg-[#00f0ff] text-black shadow-lg shadow-[#00f0ff]/20"><Save size={16} /></Button>
                         <Button isIconOnly onClick={handleRun} className="bg-[#00ff88] text-black shadow-lg shadow-[#00ff88]/20"><Play size={16} /></Button>
                    </ButtonGroup.Root>
                </div>

                <div className="flex items-center gap-1 sm:gap-4 justify-end">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button isIconOnly variant="light" size="sm" onClick={() => setRightPanel('copilot')} className={rightPanel === 'copilot' ? 'text-[#00f0ff] animate-pulse-slow' : 'text-white/40'}>
                            <Sparkles size={18} />
                        </Button>
                    </motion.div>
                    <Button isIconOnly variant="light" size="sm" onClick={() => setRightPanel('assets')} className={rightPanel === 'assets' ? 'text-[#00f0ff]' : 'text-white/40'}>
                        <Search size={18} />
                    </Button>
                    <Button isIconOnly variant="light" size="sm" onClick={() => setZenMode(!zenMode)} className={zenMode ? 'text-[#00f0ff]' : 'text-white/40'}>
                        <Maximize size={18} />
                    </Button>
                </div>
            </header>

            <div className="editor-main">
                <motion.div 
                    initial={false}
                    animate={{ width: sidebarOpen && !zenMode ? (window.innerWidth < 768 ? '100%' : '260px') : '0px' }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden border-r border-[#00f0ff]/10 z-20"
                >
                    <FileTree 
                        files={projectData.files || {}}
                        activeFile={activeFile}
                        onSelectFile={handleSelectFile}
                        onCreateFile={handleCreateFile}
                        onDeleteFile={handleDeleteFile}
                        showSidebar={true}
                        setShowSidebar={setSidebarOpen}
                    />
                </motion.div>

                <div className={`editor-content relative overflow-hidden ${(activeTab !== 'editor' && window.innerWidth < 768) ? 'hidden-mobile' : ''}`}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab === 'editor' ? 'editor-content' : 'other'}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="flex flex-col flex-1 h-full"
                        >
                            <ScrollShadow orientation="horizontal" className="ai-quick-actions flex gap-3 p-3 px-4 bg-black/60 border-b border-white/5 no-scrollbar" hideScrollBar>
                        <Button 
                            size="sm" 
                            variant="flat" 
                            className="bg-white/5 border border-white/10 text-white/80 hover:text-[#00f0ff] hover:bg-[#00f0ff]/10 hover:border-[#00f0ff]/40 min-w-fit h-8 text-[10px] sm:text-xs font-black tracking-tighter transition-all"
                            onClick={() => window.dispatchEvent(new CustomEvent('AI_COMMAND_PALETTE_TRIGGER', { detail: { command: '/suggest', context: selectionContext } }))}
                            startContent={<Sparkles size={12} className="text-[#00f0ff]" />}
                        >
                            SUGGEST
                        </Button>
                        <Button 
                            size="sm" 
                            variant="flat" 
                            className="bg-white/5 border border-white/10 text-white/80 hover:text-[#00f0ff] hover:bg-[#00f0ff]/10 hover:border-[#00f0ff]/40 min-w-fit h-8 text-[10px] sm:text-xs font-black tracking-tighter transition-all"
                            onClick={() => window.dispatchEvent(new CustomEvent('AI_COMMAND_PALETTE_TRIGGER', { detail: { command: '/docs', context: selectionContext } }))}
                            startContent={<Code size={12} className="text-[#00f0ff]" />}
                        >
                            DOCUMENT
                        </Button>
                        <Button 
                            size="sm" 
                            variant="flat" 
                            className="bg-white/5 border border-white/10 text-white/80 hover:text-[#00f0ff] hover:bg-[#00f0ff]/10 hover:border-[#00f0ff]/40 min-w-fit h-8 text-[10px] sm:text-xs font-black tracking-tighter transition-all"
                            onClick={() => window.dispatchEvent(new CustomEvent('AI_COMMAND_PALETTE_TRIGGER', { detail: { command: '/refactor', context: selectionContext } }))}
                            startContent={<Layout size={12} className="text-[#00f0ff]" />}
                        >
                            REFACTOR
                        </Button>
                    </ScrollShadow>
                    <TabBar 
                        openFiles={openFiles}
                        activeFile={activeFile}
                        onSelectFile={handleSelectFile}
                        onCloseFile={handleCloseFile}
                    />
                    <div className={`code-area relative flex-1 ${(bottomPanel === 'terminal' || bottomPanel === 'auditor') && window.innerWidth < 768 && activeTab !== 'editor' ? 'hidden-mobile' : ''}`}>
                         <MonacoEditor
                             ref={editorRef}
                             value={currentFile.content}
                             onChange={handleMonacoChange}
                             onSelectionChange={handleSelectionChange}
                             language={activeFile.split('.').pop()}
                             path={activeFile}
                         />
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
                </motion.div>
            </AnimatePresence>
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

            <div className="mobile-nav mobile-only bg-black border-t border-white/10 px-1 overflow-hidden h-[65px]">
                <Tabs.Root 
                    aria-label="Mobile Navigation" 
                    selectedKey={activeTab} 
                    onSelectionChange={setActiveTab}
                    variant="underlined"
                    color="primary"
                    className="w-full h-full"
                >
                    <Tabs.List className="gap-1 w-full relative rounded-none p-0 border-none h-full bg-transparent">
                        <Tabs.Tab 
                            key="editor" 
                            className="max-w-fit px-2 h-14 data-[selected=true]:text-[#00f0ff]"
                        >
                            <div className="flex flex-col items-center gap-1"><Code size={18} /><span className="text-[10px] font-bold">CODE</span></div>
                        </Tabs.Tab>
                        <Tabs.Tab 
                            key="files" 
                            className="max-w-fit px-2 h-14 data-[selected=true]:text-[#00f0ff]"
                            onClick={() => { setSidebarOpen(!sidebarOpen); setActiveTab('editor'); }}
                        >
                            <div className="flex flex-col items-center gap-1"><Files size={18} /><span className="text-[10px] font-bold">FILES</span></div>
                        </Tabs.Tab>
                        <Tabs.Tab 
                            key="preview" 
                            className="max-w-fit px-2 h-14 data-[selected=true]:text-[#00f0ff]"
                            onClick={handleRun}
                        >
                            <div className="flex flex-col items-center gap-1"><Eye size={18} /><span className="text-[10px] font-bold">PREVIEW</span></div>
                        </Tabs.Tab>
                        <Tabs.Tab 
                            key="terminal" 
                            className="max-w-fit px-2 h-14 data-[selected=true]:text-[#00f0ff]"
                            onClick={() => setBottomPanel('terminal')}
                        >
                            <div className="flex flex-col items-center gap-1"><TerminalIcon size={18} /><span className="text-[10px] font-bold">TERM</span></div>
                        </Tabs.Tab>
                        <Tabs.Tab 
                            key="ai" 
                            className="max-w-fit px-2 h-14 data-[selected=true]:text-[#00f0ff]"
                        >
                            <div className="flex flex-col items-center gap-1"><Sparkles size={18} /><span className="text-[10px] font-bold">AI</span></div>
                        </Tabs.Tab>
                        <Tabs.Tab 
                            key="assets" 
                            className="max-w-fit px-2 h-14 data-[selected=true]:text-[#00f0ff]"
                            onClick={() => setRightPanel('assets')}
                        >
                            <div className="flex flex-col items-center gap-1"><Search size={18} /><span className="text-[10px] font-bold">ASSETS</span></div>
                        </Tabs.Tab>
                    </Tabs.List>
                </Tabs.Root>
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
                .mr-editor { height: 100dvh; display: flex; flex-direction: column; background: #010101; color: #fff; overflow: hidden; position: relative; font-family: 'Exo 2', sans-serif; }
                
                @keyframes scanline {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
                .animate-scanline {
                    animation: scanline 8s linear infinite;
                }

                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

                @media (max-width: 768px) {
                    .nav-left h1 { font-size: 0.7rem; max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                }
                
                .editor-main { 
                    flex: 1; 
                    display: flex; 
                    overflow: hidden; 
                    position: relative; 
                    background: radial-gradient(circle at 50% 50%, #050510 0%, #010101 100%);
                }
                
                .editor-content { 
                    flex: 1; 
                    display: flex; 
                    flex-direction: column; 
                    border-right: 1px solid rgba(0,240,255,0.08); 
                    min-width: 0; 
                    background: rgba(0,0,0,0.4);
                    backdrop-filter: blur(10px);
                }
                .code-area { flex: 1; overflow: hidden; position: relative; }
                
                .bottom-panel { 
                    height: ${zenMode ? '0%' : '35dvh'}; 
                    border-top: ${zenMode ? 'none' : '1px solid rgba(0,240,255,0.15)'}; 
                    display: flex; 
                    flex-direction: column; 
                    flex-shrink: 0; 
                    overflow: hidden;
                    transition: 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                    background: rgba(1,1,1,0.9);
                    backdrop-filter: blur(30px);
                    box-shadow: 0 -10px 40px rgba(0,0,0,0.8);
                }
                .panel-tabs { display: flex; background: rgba(0,0,0,0.5); border-bottom: 1px solid rgba(0,240,255,0.05); }
                .panel-tabs button { padding: 14px 24px; background: transparent; border: none; color: #555; font-size: 0.65rem; font-weight: 900; cursor: pointer; letter-spacing: 3px; transition: 0.4s; text-transform: uppercase; }
                .panel-tabs button.active { color: #00f0ff; border-bottom: 2px solid #00f0ff; text-shadow: 0 0 15px rgba(0,240,255,0.6); background: rgba(0,240,255,0.03); }
                .panel-content { flex: 1; overflow: hidden; }
                
                .preview-area { 
                    width: 480px; 
                    border-left: 1px solid rgba(255,255,255,0.05); 
                    flex-shrink: 0; 
                    display: flex; 
                    flex-direction: column; 
                    background: #000; 
                    z-index: 5;
                    box-shadow: -20px 0 50px rgba(0,0,0,0.5);
                }
                .preview-mode-selector { 
                    display: flex; background: #050505; border-bottom: 1px solid rgba(0,240,255,0.1); 
                    height: 50px; padding: 6px; gap: 6px; position: relative;
                }
                .selector-bg {
                    position: absolute; top: 6px; height: 38px; width: calc(50% - 9px);
                    background: rgba(0,240,255,0.12); border-radius: 10px; transition: 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    border: 1px solid rgba(0, 240, 255, 0.25);
                    box-shadow: 0 0 20px rgba(0,240,255,0.1);
                }
                .selector-bg.normal { left: 6px; }
                .selector-bg.ar { left: calc(50% + 3px); }

                .preview-mode-selector button { 
                    flex: 1; background: transparent; border: none; color: rgba(255,255,255,0.4); 
                    font-size: 0.7rem; font-weight: 900; cursor: pointer; 
                    display: flex; align-items: center; justify-content: center; 
                    gap: 10px; z-index: 2; transition: all 0.4s;
                    letter-spacing: 2px;
                }
                .preview-mode-selector button.active { color: #00f0ff; text-shadow: 0 0 10px rgba(0,240,255,0.6); }
                .preview-window { flex: 1; overflow: hidden; position: relative; background: #000; }
                
                .right-panel { 
                    width: 360px; 
                    background: rgba(5,5,5,0.8); 
                    flex-shrink: 0; 
                    border-left: 1px solid rgba(255,255,255,0.05);
                    backdrop-filter: blur(20px);
                }
                
                @media (max-width: 768px) {
                    .preview-area, .right-panel, .bottom-panel { width: 100%; position: absolute; inset: 0; z-index: 10; background: #000; }
                    .hidden-mobile { display: none !important; }
                    .mobile-only { display: flex !important; }
                }
                .hidden-desktop { display: none !important; }

                .mobile-nav { 
                    display: none; 
                    height: 75px; 
                    z-index: 100; 
                    box-shadow: 0 -10px 40px rgba(0,0,0,0.8);
                    background: #050505;
                    position: relative;
                }
                .mobile-nav::after {
                    content: "";
                    position: absolute;
                    top: 0; left: 0; right: 0; height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(0,240,255,0.4), transparent);
                }

                .toast { position: fixed; bottom: 100px; right: 20px; background: #00f0ff; color: #000; padding: 14px 28px; border-radius: 12px; font-weight: 950; font-size: 0.8rem; letter-spacing: 1.5px; box-shadow: 0 15px 40px rgba(0,240,255,0.5); animation: toastIn 0.6s cubic-bezier(0.16, 1, 0.3, 1); z-index: 2000; text-transform: uppercase; border: 1px solid rgba(255,255,255,0.2); }
                @keyframes toastIn { from { transform: translateX(100%) scale(0.8); opacity: 0; } to { transform: translateX(0) scale(1); opacity: 1; } }
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
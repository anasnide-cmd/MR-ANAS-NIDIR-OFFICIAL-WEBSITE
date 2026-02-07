'use client';
import { useState, useEffect, Suspense } from 'react';
import { auth, db } from '../../../lib/firebase';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// PrimeReact Imports - Dynamic for Editor to avoid SSR issues
const Editor = dynamic(() => import('primereact/editor').then(mod => mod.Editor), { ssr: false });
import 'primereact/resources/themes/lara-dark-cyan/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Sparkles, X } from 'lucide-react';

// Import SavoirCopilot (Dynamic to avoid SSR)
const SavoirCopilot = dynamic(() => import('../../../components/Savoirpedia/SavoirCopilot'), { ssr: false });

const ALLOWED_ADMINS = ['anasnide@gmail.com', 'ceo@anasnidir.com'];

export default function PublicWikiEditor() {
    return (
        <Suspense fallback={<div className="wiki-container">Loading Editor...</div>}>
            <PublicWikiEditorContent />
        </Suspense>
    );
}

function PublicWikiEditorContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get('id');

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [showCopilot, setShowCopilot] = useState(false);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            if (u) {
                setUser(u);
                if (editId) {
                    // Fetch existing post
                    try {
                        const docRef = doc(db, 'posts', editId);
                        const docSnap = await getDoc(docRef);
                        if (docSnap.exists()) {
                            const data = docSnap.data();
                            // Security check: Only author or admin can edit
                            const isAdmin = ALLOWED_ADMINS.includes(u.email);
                            if (data.authorId !== u.uid && !isAdmin) {
                                alert("You are not authorized to edit this article.");
                                router.push('/savoirpedia/dashboard');
                                return;
                            }
                            setTitle(data.title);
                            setCategory(data.category);
                            setContent(data.content);
                        }
                    } catch (err) {
                        console.error("Error fetching post:", err);
                    }
                }
                setLoading(false);
            } else {
                setLoading(false);
            }
        });
        return () => unsub();
    }, [editId, router]);

    // 1. Auto-Save Logic
    useEffect(() => {
        if (!editId && !title && !content) {
            // Load from localStorage if starting fresh
            const savedData = localStorage.getItem('savoir_pedia_draft');
            if (savedData) {
                try {
                    const { title: t, category: c, content: cont } = JSON.parse(savedData);
                    setTitle(t || '');
                    setCategory(c || '');
                    setContent(cont || '');
                } catch (e) {
                    console.error("Failed to parse draft:", e);
                }
            }
        }
    }, [editId]);

    useEffect(() => {
        if (title || content || category) {
            const timer = setTimeout(() => {
                localStorage.setItem('savoir_pedia_draft', JSON.stringify({ title, category, content }));
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [title, category, content]);

    const handlePublish = async (e, status = 'active') => {
        if (e) e.preventDefault();
        // Validation
        if (!title || !content || content === '<p><br></p>') return alert('Title and Content are required.');
        
        setIsSubmitting(true);
        try {
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            const now = new Date().toISOString();
            const postData = {
                title,
                category,
                content,
                author: user.displayName || user.email, 
                date: now,
                updatedAt: now, // Add Versioning Tracking
                status: status
            };

            if (editId) {
                // Update
                delete postData.date; // Don't overwrite original creation date
                await updateDoc(doc(db, 'posts', editId), postData);
            } else {
                // Create
                await addDoc(collection(db, 'posts'), {
                    ...postData,
                    slug: slug + '-' + Date.now().toString().slice(-4),
                    authorId: user.uid
                });
            }
            
            localStorage.removeItem('savoir_pedia_draft'); // Clear draft on success
            router.push('/savoirpedia/dashboard'); 
        } catch (err) {
            alert('Error publishing: ' + err.message);
            setIsSubmitting(false);
        }
    };

    const handleSuggestCategory = async () => {
        if (!content || isSubmitting) return;
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/nex-ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: `Based on this content, suggest a single short category name (like "Astrophysics" or "Web Development"). Respond ONLY with the category name: ${content.substring(0, 1000)}` }],
                    mode: 'chat'
                })
            });
            const data = await res.json();
            if (data.message) {
                setCategory(data.message.trim().replace(/^"|"$/g, ''));
            }
        } catch (err) {
            console.error("AI Category Suggestion failed:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const insertBlock = (type) => {
        let blockHtml = '';
        switch(type) {
            case 'alert':
                blockHtml = '<div class="nex-alert"><div class="alert-icon">⚠️</div><div class="alert-content"><strong>SYSTEM ALERT:</strong> Enter critical notification here...</div></div><p></p>';
                break;
            case 'data':
                blockHtml = '<div class="nex-data-scan"><div class="data-header">DATA SCAN</div><div class="data-body">Intelligence payload goes here...</div></div><p></p>';
                break;
            case 'code':
                blockHtml = '<pre class="nex-code"><code>// Initializing neural sequence...\nconsole.log("Hello, NEX-AI");</code></pre><p></p>';
                break;
        }
        setContent(prev => prev + blockHtml);
    };

    if (loading) return <div className="wiki-container">Checking credentials...</div>;

    if (!user) {
        return (
            <div className="wiki-container centered">
                <style jsx global>{` body { padding-top: 0 !important; } `}</style>
                <div className="login-prompt">
                    <h2>Authentication Required</h2>
                    <p>You must be logged in to contribute to SavoirPedia.</p>
                    <Link href="/mr-build" className="btn-primary">Login via Mr Build</Link>
                </div>
                <style jsx>{`
                    .centered { display: flex; align-items: center; justify-content: center; min-height: 80vh; }
                    .login-prompt { text-align: center; background: #222; padding: 40px; border: 1px solid #333; }
                    .btn-primary { 
                        display: inline-block; margin-top: 20px; text-decoration: none; 
                        background: #00f0ff; color: #000; padding: 10px 20px; font-weight: bold;
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div className="wiki-container">
            <style jsx global>{` body { padding-top: 0 !important; } `}</style> 
            <header className="editor-header">
                <div className="header-left">
                    <h1>{editId ? 'Edit Article' : 'Create New Article'}</h1>
                    <p>Contributing as <strong>{user.email}</strong></p>
                </div>
                <button 
                    className={`btn-copilot ${showCopilot ? 'active' : ''}`} 
                    onClick={() => setShowCopilot(!showCopilot)}
                >
                    <Sparkles size={16} /> NEX EDITOR
                </button>
            </header>
            
            <style jsx global>{`
                .p-editor-toolbar { border-radius: 8px 8px 0 0; }
                .p-editor-content { border-radius: 0 0 8px 8px; }
            `}</style>

            <div className={`editor-layout ${showCopilot ? 'with-sidebar' : ''}`}>
                <div className="main-column">
                    <form onSubmit={handlePublish} className="wiki-form">
                        <div className="form-group">
                            <label>Article Title</label>
                            <input 
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="e.g., Quantum Computing"
                                className="wiki-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Category (Custom)</label>
                            <div className="input-with-button">
                                <input 
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                    placeholder="e.g. Astrophysics"
                                    className="wiki-input"
                                    required 
                                />
                                <button type="button" onClick={handleSuggestCategory} className="btn-suggest" title="AI Suggest Category">
                                    <Sparkles size={14} /> AI SUGGEST
                                </button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Content Macros</label>
                            <div className="macro-toolbar">
                                <button type="button" onClick={() => insertBlock('alert')} className="macro-btn alert">
                                    [!] SYSTEM ALERT
                                </button>
                                <button type="button" onClick={() => insertBlock('data')} className="macro-btn data">
                                    [i] DATA SCAN
                                </button>
                                <button type="button" onClick={() => insertBlock('code')} className="macro-btn code">
                                    [CODE] NEURAL SNIPPET
                                </button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label style={{marginBottom: '10px', display: 'block'}}>Content</label>
                            <div className="editor-wrapper">
                                <Editor 
                                    value={content} 
                                    onTextChange={(e) => setContent(e.htmlValue)} 
                                    style={{ height: '500px', fontSize: '1.1rem' }} 
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" onClick={(e) => handlePublish(e, 'draft')} className="btn-draft" disabled={isSubmitting}>
                                {isSubmitting ? 'Saving...' : 'Save Draft'}
                            </button>
                            <button type="submit" className="btn-publish" disabled={isSubmitting} onClick={(e) => handlePublish(e, 'active')}>
                                {isSubmitting ? 'Publishing...' : 'Publish Article'}
                            </button>
                            <Link href="/savoirpedia/dashboard" className="btn-cancel">Cancel</Link>
                        </div>
                    </form>
                </div>

                {/* AI Sidebar */}
                {showCopilot && (
                    <aside className="ai-sidebar">
                        <div className="sidebar-header">
                            <h3>NEX ASSISTANT</h3>
                            <button onClick={() => setShowCopilot(false)} className="close-btn"><X size={16}/></button>
                        </div>
                        <div className="sidebar-content">
                            <SavoirCopilot 
                                currentTitle={title}
                                currentContent={content}
                                onUpdate={(data) => {
                                    if (data.title) setTitle(data.title);
                                    if (data.category) setCategory(data.category);
                                    if (data.content) setContent(data.content);
                                }}
                            />
                        </div>
                    </aside>
                )}
            </div>

            <style jsx>{`
                /* Layout */
                .editor-layout { display: flex; gap: 20px; position: relative; }
                .main-column { flex: 1; min-width: 0; transition: width 0.3s; }
                
                .editor-header { 
                    border-bottom: 1px solid #333; margin-bottom: 20px; 
                    display: flex; justify-content: space-between; align-items: center;
                }
                .editor-header h1 { font-family: 'Georgia', serif; font-size: 2rem; margin: 0; }
                
                .btn-copilot {
                    background: rgba(0, 240, 255, 0.1); border: 1px solid rgba(0, 240, 255, 0.3);
                    color: #00f0ff; padding: 8px 16px; border-radius: 20px; cursor: pointer;
                    display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 0.9rem;
                    transition: all 0.2s;
                }
                .btn-copilot:hover, .btn-copilot.active { background: rgba(0, 240, 255, 0.2); box-shadow: 0 0 10px rgba(0, 240, 255, 0.2); }

                /* Sidebar */
                .ai-sidebar {
                    width: 350px;
                    background: #111; border: 1px solid #333; border-radius: 8px;
                    display: flex; flex-direction: column; overflow: hidden;
                    height: calc(100vh - 150px); position: sticky; top: 20px;
                }
                .sidebar-header {
                    padding: 10px 15px; border-bottom: 1px solid #333; display: flex; justify-content: space-between; align-items: center;
                    background: #1a1a1a;
                }
                .sidebar-header h3 { margin: 0; font-size: 0.9rem; color: #aaa; letter-spacing: 1px; }
                .close-btn { background: transparent; border: none; color: #666; cursor: pointer; }
                .close-btn:hover { color: #fff; }
                
                .sidebar-content { flex: 1; overflow: hidden; }

                /* Existing Styles */
                .btn-draft {
                    background: transparent; border: 1px solid #666; color: #ccc;
                    padding: 10px 20px; font-weight: bold; cursor: pointer; border-radius: 4px;
                }
                .btn-draft:hover { border-color: #fff; color: #fff; }

                .input-with-button { display: flex; gap: 10px; }
                .btn-suggest {
                    background: rgba(0, 240, 255, 0.1); border: 1px solid rgba(0, 240, 255, 0.3);
                    color: #00f0ff; padding: 0 15px; border-radius: 4px; cursor: pointer;
                    font-size: 0.75rem; font-weight: 700; display: flex; align-items: center; gap: 5px;
                    transition: all 0.2s; white-space: nowrap;
                }
                .btn-suggest:hover { background: rgba(0, 240, 255, 0.25); border-color: #00f0ff; }

                .macro-toolbar { display: flex; gap: 10px; margin-bottom: 5px; }
                .macro-btn {
                    padding: 6px 12px; font-size: 0.7rem; font-weight: 800; border-radius: 4px;
                    cursor: pointer; transition: all 0.2s; font-family: 'Orbitron', sans-serif;
                    letter-spacing: 1px;
                }
                .macro-btn.alert { background: rgba(255, 50, 50, 0.1); border: 1px solid rgba(255, 50, 50, 0.3); color: #ff3232; }
                .macro-btn.data { background: rgba(0, 240, 255, 0.1); border: 1px solid rgba(0, 240, 255, 0.3); color: #00f0ff; }
                .macro-btn.code { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: #fff; }
                .macro-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }

                .wiki-container {
                    max-width: 100%;
                    width: 100%;
                    margin: 0;
                    padding: 20px 40px;
                    color: #e0e0e0;
                    min-height: 100vh;
                }
                
                .form-group { margin-bottom: 20px; }
                .form-group label { display: block; margin-bottom: 8px; font-weight: bold; color: #aaa; }
                
                /* Override PrimeReact Theme bits for better blend if needed */
                .editor-wrapper :global(.p-editor-container .p-editor-toolbar) {
                    background: #222;
                    border-color: #333;
                }
                .editor-wrapper :global(.p-editor-container .p-editor-content) {
                    background: #1a1a1a;
                    border-color: #333;
                    color: #fff;
                    font-family: inherit;
                }
                .editor-wrapper :global(.ql-snow .ql-stroke) { stroke: #ccc; }
                .editor-wrapper :global(.ql-snow .ql-fill) { fill: #ccc; }

                /* Modular Blocks in Editor */
                :global(.nex-alert) {
                    background: rgba(255, 50, 50, 0.1) !important; border: 1px solid rgba(255, 50, 50, 0.2) !important;
                    padding: 15px !important; border-radius: 8px; margin: 20px 0; display: flex; gap: 15px;
                    align-items: center; border-left: 4px solid #ff3232 !important;
                }
                :global(.nex-data-scan) {
                    background: rgba(0, 240, 255, 0.1) !important; border: 1px solid rgba(0, 240, 255, 0.2) !important;
                    padding: 0 !important; border-radius: 8px; margin: 20px 0; overflow: hidden;
                    border-left: 4px solid #00f0ff !important;
                }
                :global(.data-header) { background: rgba(0, 240, 255, 0.2); padding: 5px 15px; font-weight: bold; color: #00f0ff; }
                :global(.data-body) { padding: 10px 15px; }

                :global(.nex-code) {
                    background: #111 !important; padding: 15px !important; border-radius: 8px; 
                    margin: 20px 0; border: 1px solid rgba(255,255,255,0.1); color: #00ff88 !important;
                }

                .wiki-input {
                    width: 100%;
                    background: #222;
                    border: 1px solid #333;
                    color: #fff;
                    padding: 10px;
                    font-size: 1rem;
                    font-family: sans-serif;
                }
                .wiki-input:focus { border-color: #00f0ff; outline: none; }

                .form-actions { display: flex; gap: 15px; align-items: center; margin-top: 30px; }
                
                .btn-publish {
                    background: #00f0ff; color: #000; border: none; padding: 10px 25px;
                    font-weight: bold; cursor: pointer; font-size: 1rem;
                }
                .btn-publish:disabled { opacity: 0.5; }
                
                .btn-cancel { color: #aaa; text-decoration: none; }
                .btn-cancel:hover { color: #fff; }
                
                @media (max-width: 1000px) {
                    .editor-layout { flex-direction: column; }
                    .ai-sidebar { width: 100%; height: 500px; position: static; }
                }
            `}</style>
        </div>
    );
}

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

    const handlePublish = async (e, status = 'active') => {
        if (e) e.preventDefault();
        // Validation
        if (!title || !content || content === '<p><br></p>') return alert('Title and Content are required.');
        
        setIsSubmitting(true);
        try {
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            const postData = {
                title,
                category,
                content,
                author: user.displayName || user.email, // Use Display Name if available
                // authorId: user.uid, // Keep original owner
                date: new Date().toISOString(),
                status: status
            };

            if (editId) {
                // Update
                await updateDoc(doc(db, 'posts', editId), postData);
            } else {
                // Create
                await addDoc(collection(db, 'posts'), {
                    ...postData,
                    slug: slug + '-' + Date.now().toString().slice(-4),
                    authorId: user.uid
                });
            }
            
            router.push('/savoirpedia/dashboard'); // Go to dashboard after save
        } catch (err) {
            alert('Error publishing: ' + err.message);
            setIsSubmitting(false);
        }
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
                            <input 
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                placeholder="e.g. Astrophysics"
                                className="wiki-input"
                                required 
                            />
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

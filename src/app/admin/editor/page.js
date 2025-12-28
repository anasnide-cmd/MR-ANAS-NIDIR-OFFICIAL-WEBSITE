'use client';
import { useState, useEffect, Suspense } from 'react';
import { auth, db } from '../../../lib/firebase';
import { doc, getDoc, setDoc, addDoc, collection } from 'firebase/firestore';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function EditorContent() {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            if (editId) {
                loadPost(editId);
            } else {
                setLoading(false);
            }
        });
        return () => unsub();
    }, [editId]);

    const loadPost = async (id) => {
        const d = await getDoc(doc(db, 'posts', id));
        if (d.exists()) {
            const data = d.data();
            setTitle(data.title);
            setSlug(data.slug);
            setContent(data.content);
        }
        setLoading(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const postData = {
            title,
            slug,
            content,
            date: new Date().toISOString(),
            author: auth.currentUser?.email || 'unknown'
        };

        if (editId) {
            await setDoc(doc(db, 'posts', editId), postData, { merge: true });
        } else {
            await addDoc(collection(db, 'posts'), postData);
        }
        router.push('/admin');
    };

    if (loading) return <div className="loading-state">Initializing Editor...</div>;

    return (
        <div className="editor-view">
            <header className="page-header">
                <div className="header-info">
                    <Link href="/admin" className="back-link">← Back to Dashboard</Link>
                    <h1>{editId ? 'Refine Content' : 'Draft New Article'}</h1>
                    <p className="subtitle">Crafting the future, one word at a time.</p>
                </div>
                <div className="header-actions">
                    <button onClick={handleSave} className="btn-modern glow-blue">
                        <span>💾</span> {editId ? 'Update Article' : 'Publish Article'}
                    </button>
                </div>
            </header>

            <div className="editor-container card glass">
                <form onSubmit={handleSave} className="editor-form">
                    <div className="input-row">
                        <div className="input-wrapper">
                            <label>Article Title</label>
                            <input
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="Enter a compelling title..."
                                required
                                className="modern-input title-field"
                            />
                        </div>
                        <div className="input-wrapper">
                            <label>URL Slug</label>
                            <input
                                value={slug}
                                onChange={e => setSlug(e.target.value)}
                                placeholder="my-awesome-post"
                                required
                                className="modern-input"
                            />
                        </div>
                    </div>

                    <div className="input-wrapper content-area">
                        <div className="content-header">
                            <label>Article Body</label>
                            <span className="format-hint">HTML Supported</span>
                        </div>
                        <textarea
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            placeholder="Start writing your story here..."
                            required
                            rows={20}
                            className="modern-input content-textarea"
                        />
                    </div>
                </form>
            </div>

            <style jsx>{`
                .editor-view { animation: fadeIn 0.5s ease-out; }
                .page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 40px;
                }
                .back-link {
                    color: #00f0ff;
                    text-decoration: none;
                    font-size: 0.9rem;
                    font-weight: 700;
                    margin-bottom: 15px;
                    display: block;
                    transition: transform 0.2s;
                }
                .back-link:hover { transform: translateX(-5px); }
                .subtitle { opacity: 0.5; font-size: 1.1rem; }

                .editor-container {
                    padding: 40px;
                    border-radius: 30px;
                }
                .editor-form { display: flex; flex-direction: column; gap: 30px; }
                
                .input-row { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; }
                .input-wrapper { display: flex; flex-direction: column; gap: 10px; }
                .input-wrapper label { font-size: 0.85rem; font-weight: 800; color: #00f0ff; letter-spacing: 1px; text-transform: uppercase; }
                
                .modern-input {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 12px;
                    padding: 15px 20px;
                    color: #fff;
                    font-size: 1rem;
                    transition: all 0.3s;
                }
                .modern-input:focus {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: #00f0ff;
                    outline: none;
                    box-shadow: 0 0 20px rgba(0, 240, 255, 0.1);
                }
                .title-field { font-size: 1.4rem; font-weight: 700; }
                
                .content-header { display: flex; justify-content: space-between; align-items: center; }
                .format-hint { font-size: 0.7rem; opacity: 0.4; font-weight: 800; }
                
                .content-textarea {
                    line-height: 1.6;
                    font-family: inherit;
                    min-height: 400px;
                    resize: vertical;
                }

                .btn-modern {
                    padding: 14px 28px;
                    border-radius: 14px;
                    font-weight: 800;
                    font-size: 1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    transition: all 0.3s;
                    border: none;
                }
                .glow-blue {
                    background: #00f0ff;
                    color: #000;
                    box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);
                }
                .glow-blue:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 25px rgba(0, 240, 255, 0.4);
                }

                .loading-state {
                    height: 50vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #00f0ff;
                    font-weight: 800;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 768px) {
                    .page-header { flex-direction: column; align-items: flex-start; gap: 30px; }
                    .header-actions { width: 100%; }
                    .btn-modern { width: 100%; justify-content: center; }
                    .input-row { grid-template-columns: 1fr; }
                    .editor-container { padding: 25px; }
                }
            `}</style>
        </div>
    );
}

export default function EditorPage() {
    return (
        <Suspense fallback={<div className="section">Loading...</div>}>
            <EditorContent />
        </Suspense>
    );
}

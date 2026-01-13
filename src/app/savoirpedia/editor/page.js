'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// PrimeReact Imports
import { Editor } from 'primereact/editor';
import 'primereact/resources/themes/lara-dark-cyan/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function PublicWikiEditor() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('General');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
            if (!u) {
                // Optional: Redirect
            }
        });
        return () => unsub();
    }, []);

    const handlePublish = async (e) => {
        e.preventDefault();
        // Validation: Check if content is empty or just has tags
        if (!title || !content || content === '<p><br></p>') return alert('Title and Content are required.');
        
        setIsSubmitting(true);
        try {
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            
            await addDoc(collection(db, 'posts'), {
                title,
                slug: slug + '-' + Date.now().toString().slice(-4),
                category,
                content, // Content is already HTML from Editor
                author: user.email,
                authorId: user.uid,
                date: new Date().toISOString(),
                status: 'active'
            });
            
            router.push('/savoirpedia');
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
                <h1>Create New Article</h1>
                <p>Contributing as <strong>{user.email}</strong></p>
            </header>

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
                    <button type="submit" className="btn-publish" disabled={isSubmitting}>
                        {isSubmitting ? 'Publishing...' : 'Publish Article'}
                    </button>
                    <Link href="/savoirpedia" className="btn-cancel">Cancel</Link>
                </div>
            </form>

            <style jsx>{`
                .wiki-container {
                    max-width: 100%;
                    width: 100%;
                    margin: 0;
                    padding: 40px 20px;
                    color: #e0e0e0;
                    min-height: 100vh;
                }
                .editor-header { border-bottom: 1px solid #333; margin-bottom: 30px; }
                .editor-header h1 { font-family: 'Georgia', serif; font-size: 2rem; margin-bottom: 10px; }
                
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
            `}</style>
        </div>
    );
}

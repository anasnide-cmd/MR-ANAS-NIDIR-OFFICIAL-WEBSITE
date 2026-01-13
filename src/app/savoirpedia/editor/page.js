'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
        if (!title || !content) return alert('Title and Content are required.');
        
        setIsSubmitting(true);
        try {
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            
            await addDoc(collection(db, 'posts'), {
                title,
                slug: slug + '-' + Date.now().toString().slice(-4),
                category,
                content: content.replace(/\n/g, '<br/>'),
                author: user.email,
                authorId: user.uid,
                date: new Date().toISOString(),
                status: 'active'
            });
            
            router.push('/blog');
        } catch (err) {
            alert('Error publishing: ' + err.message);
            setIsSubmitting(false);
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 1024 * 1024 * 2) { // 2MB Limit check
             alert("File is too large (Max 2MB). Please use an external URL for large images.");
             return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
             const base64data = reader.result;
             const tag = `<img src="${base64data}" alt="Uploaded Image" class="wiki-image" />`;
             setContent(prev => prev + '\n' + tag + '\n');
        };
        reader.readAsDataURL(file);
    };

    const insertMedia = (type) => {
        const url = prompt(`Enter ${type} URL:`);
        if (!url) return;

        let tag = '';
        if (type === 'Image') {
            tag = `<img src="${url}" alt="User Image" class="wiki-image" />`;
        } else if (type === 'Video') {
            // Simple YouTube Embed detection or direct video
            if (url.includes('youtube.com') || url.includes('youtu.be')) {
                 const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
                 tag = `<div class="wiki-video-wrapper"><iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe></div>`;
            } else {
                tag = `<video src="${url}" controls class="wiki-video"></video>`;
            }
        }
        setContent(prev => prev + '\n' + tag + '\n');
    };

    if (loading) return <div className="wiki-container">Checking credentials...</div>;

    if (!user) {
        return (
            <div className="wiki-container centered">
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
                    <div className="content-toolbar">
                        <label>Content (HTML Supported)</label>
                        <div className="toolbar-actions">
                            <button type="button" onClick={() => insertMedia('Image')} className="tool-btn">📷 URL</button>
                            <label className="tool-btn" style={{cursor: 'pointer'}}>
                                📁 Upload
                                <input type="file" accept="image/*" onChange={handleFileUpload} style={{display: 'none'}} />
                            </label>
                            <button type="button" onClick={() => insertMedia('Video')} className="tool-btn">🎥 Video</button>
                        </div>
                    </div>
                    <textarea 
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="Write your article content here..."
                        className="wiki-textarea"
                        rows={15}
                        required
                    />
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
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 40px 20px;
                    color: #e0e0e0;
                    min-height: 100vh;
                }
                .editor-header { border-bottom: 1px solid #333; margin-bottom: 30px; }
                .editor-header h1 { font-family: 'Georgia', serif; font-size: 2rem; margin-bottom: 10px; }
                
                .form-group { margin-bottom: 20px; }
                .form-group label { display: block; margin-bottom: 8px; font-weight: bold; color: #aaa; }
                
                .content-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
                .toolbar-actions { display: flex; gap: 10px; }
                .tool-btn { 
                    background: #333; color: #fff; border: 1px solid #444; padding: 4px 10px; 
                    cursor: pointer; font-size: 0.8rem; border-radius: 4px;
                }
                .tool-btn:hover { background: #444; }

                .wiki-input, .wiki-textarea {
                    width: 100%;
                    background: #222;
                    border: 1px solid #333;
                    color: #fff;
                    padding: 10px;
                    font-size: 1rem;
                    font-family: sans-serif;
                }
                .wiki-input:focus, .wiki-textarea:focus { border-color: #00f0ff; outline: none; }

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

'use client';
import { useState, useEffect, Suspense } from 'react';
import { auth, db } from '../../../lib/firebase';
import { doc, getDoc, setDoc, addDoc, collection } from 'firebase/firestore';
import { useRouter, useSearchParams } from 'next/navigation';

function EditorContent() {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get('id');

    useEffect(() => {
        // Protect route
        if (!auth.currentUser) {
            // A bit rough check, for UX rely on onAuthStateChanged
        }

        if (editId) {
            loadPost(editId);
        } else {
            setLoading(false);
        }
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

    if (loading) return <div className="section">Loading...</div>;

    return (
        <div className="section container" style={{ maxWidth: 800 }}>
            <h1>{editId ? 'Edit Post' : 'New Post'}</h1>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                    <label>Title</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} required style={{ width: '100%', padding: 8 }} />
                </div>
                <div>
                    <label>Slug (URL)</label>
                    <input value={slug} onChange={e => setSlug(e.target.value)} required style={{ width: '100%', padding: 8 }} />
                </div>
                <div>
                    <label>Content (HTML/Text)</label>
                    <textarea value={content} onChange={e => setContent(e.target.value)} required rows={15} style={{ width: '100%', padding: 8 }} />
                </div>
                <button type="submit" className="btn glow">Save Post</button>
            </form>
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

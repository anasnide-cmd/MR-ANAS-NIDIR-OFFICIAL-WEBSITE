'use client';
import { useState, useEffect, Suspense } from 'react';
import { auth, db } from '../../../lib/firebase';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function MrBuildEditorContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const userId = auth.currentUser?.uid;

    const [siteData, setSiteData] = useState({
        name: '',
        slug: '',
        title: '',
        description: '',
        theme: 'dark-nebula',
        socials: {
            instagram: '',
            tiktok: '',
            twitter: ''
        }
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(async (u) => {
            if (!u) {
                router.push('/mr-build/login');
                return;
            }
            // Fetch existing site if any
            const q = query(collection(db, 'user_sites'), where('userId', '==', u.uid));
            const snap = await getDocs(q);
            if (!snap.empty) {
                const data = snap.docs[0].data();
                setSiteData({ ...siteData, ...data, id: snap.docs[0].id });
            }
            setLoading(false);
        });
        return () => unsub();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const finalData = {
                ...siteData,
                userId: auth.currentUser.uid,
                updatedAt: new Date().toISOString()
            };

            if (siteData.id) {
                await setDoc(doc(db, 'user_sites', siteData.id), finalData, { merge: true });
            } else {
                const newDocRef = doc(collection(db, 'user_sites'));
                await setDoc(newDocRef, { ...finalData, createdAt: new Date().toISOString() });
            }
            router.push('/mr-build');
        } catch (err) {
            alert('Error saving site: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="loading-state">Initializing Neural Interface...</div>;

    return (
        <div className="editor-view">
            <header className="page-header">
                <div className="header-info">
                    <Link href="/mr-build" className="back-link">← Return to Command Center</Link>
                    <h1>{siteData.id ? 'Optimize Core Architecture' : 'Initialize New Deployment'}</h1>
                    <p className="subtitle">Configure your digital node on the Mr Build network.</p>
                </div>
                <div className="header-actions">
                    <button onClick={handleSave} className="btn-modern glow-blue" disabled={saving}>
                        {saving ? 'Synchronizing...' : (siteData.id ? '💾 Update Node' : '🚀 Deploy Node')}
                    </button>
                </div>
            </header>

            <div className="editor-container">
                <form onSubmit={handleSave} className="editor-layout">
                    <div className="main-config glass card">
                        <h3>General Configuration</h3>
                        <div className="input-group">
                            <label>Internal Node Name (Reference only)</label>
                            <input
                                value={siteData.name}
                                onChange={e => setSiteData({ ...siteData, name: e.target.value })}
                                placeholder="My Cyber Portfolio"
                                className="modern-input"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Access Slug (Subdomain)</label>
                            <div className="slug-input-wrapper">
                                <input
                                    value={siteData.slug}
                                    onChange={e => setSiteData({ ...siteData, slug: e.target.value })}
                                    placeholder="my-alias"
                                    className="modern-input"
                                    required
                                />
                                <span className="slug-suffix">.mrnidir.com</span>
                            </div>
                        </div>

                        <div className="divider"></div>

                        <h3>On-Page Identity</h3>
                        <div className="input-group">
                            <label>Public Title</label>
                            <input
                                value={siteData.title}
                                onChange={e => setSiteData({ ...siteData, title: e.target.value })}
                                placeholder="THE ARCHITECT"
                                className="modern-input"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Short Bio/Description</label>
                            <textarea
                                value={siteData.description}
                                onChange={e => setSiteData({ ...siteData, description: e.target.value })}
                                placeholder="Building the future of the web..."
                                className="modern-input"
                                rows={4}
                            />
                        </div>
                    </div>

                    <div className="sidebar-config">
                        <div className="glass card theme-selector">
                            <h3>Aesthetic Protocols</h3>
                            <div className="theme-options">
                                <button type="button"
                                    className={`theme-btn ${siteData.theme === 'dark-nebula' ? 'active' : ''}`}
                                    onClick={() => setSiteData({ ...siteData, theme: 'dark-nebula' })}
                                >
                                    Dark Nebula
                                </button>
                                <button type="button"
                                    className={`theme-btn ${siteData.theme === 'cyber-grid' ? 'active' : ''}`}
                                    onClick={() => setSiteData({ ...siteData, theme: 'cyber-grid' })}
                                >
                                    Cyber Grid
                                </button>
                                <button type="button"
                                    className={`theme-btn ${siteData.theme === 'liquid-gold' ? 'active' : ''}`}
                                    onClick={() => setSiteData({ ...siteData, theme: 'liquid-gold' })}
                                >
                                    Liquid Gold
                                </button>
                            </div>
                        </div>

                        <div className="glass card social-config">
                            <h3>Social Connectivity</h3>
                            <div className="input-group">
                                <label>Instagram URL</label>
                                <input
                                    value={siteData.socials?.instagram || ''}
                                    onChange={e => setSiteData({ ...siteData, socials: { ...siteData.socials, instagram: e.target.value } })}
                                    className="modern-input"
                                />
                            </div>
                            <div className="input-group">
                                <label>TikTok URL</label>
                                <input
                                    value={siteData.socials?.tiktok || ''}
                                    onChange={e => setSiteData({ ...siteData, socials: { ...siteData.socials, tiktok: e.target.value } })}
                                    className="modern-input"
                                />
                            </div>
                        </div>
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
                }
                .subtitle { opacity: 0.5; font-size: 1.1rem; }

                .editor-layout {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 30px;
                }
                .card { padding: 40px; border-radius: 30px; }
                h3 { font-family: var(--font-orbitron); font-size: 1.2rem; margin-bottom: 25px; color: #00f0ff; letter-spacing: 1px; }

                .input-group { display: flex; flex-direction: column; gap: 10px; margin-bottom: 25px; }
                .input-group label { font-size: 0.8rem; font-weight: 800; opacity: 0.6; text-transform: uppercase; letter-spacing: 1px; }
                
                .modern-input {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    padding: 15px;
                    color: #fff;
                    font-size: 1rem;
                    transition: all 0.3s;
                }
                .modern-input:focus { border-color: #00f0ff; outline: none; box-shadow: 0 0 15px rgba(0, 240, 255, 0.1); }

                .slug-input-wrapper { display: flex; align-items: center; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; overflow: hidden; }
                .slug-input-wrapper .modern-input { border: none; background: transparent; flex: 1; }
                .slug-suffix { padding: 0 15px; font-size: 0.8rem; opacity: 0.4; font-weight: 700; border-left: 1px solid rgba(255, 255, 255, 0.1); }

                .divider { height: 1px; background: rgba(255, 255, 255, 0.05); margin: 30px 0; }

                .theme-options { display: flex; flex-direction: column; gap: 10px; }
                .theme-btn {
                    padding: 15px;
                    border-radius: 12px;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: #fff;
                    cursor: pointer;
                    text-align: left;
                    font-weight: 700;
                    transition: all 0.3s;
                }
                .theme-btn:hover { background: rgba(255, 255, 255, 0.05); }
                .theme-btn.active { border-color: #00f0ff; background: rgba(0, 240, 255, 0.1); color: #00f0ff; }

                .btn-modern {
                    padding: 15px 30px;
                    border-radius: 14px;
                    font-weight: 800;
                    font-size: 1rem;
                    cursor: pointer;
                    border: none;
                    transition: all 0.3s;
                }
                .glow-blue { background: #00f0ff; color: #000; box-shadow: 0 0 20px rgba(0, 240, 255, 0.2); }
                .glow-blue:hover { transform: translateY(-2px); box-shadow: 0 5px 25px rgba(0, 240, 255, 0.4); }

                .loading-state { height: 60vh; display: flex; align-items: center; justify-content: center; color: #00f0ff; font-weight: 900; letter-spacing: 2px; }

                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                @media (max-width: 1024px) {
                    .editor-layout { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
}

export default function MrBuildEditor() {
    return (
        <Suspense fallback={<div className="loading-state">Syncing Neural Net...</div>}>
            <MrBuildEditorContent />
        </Suspense>
    );
}

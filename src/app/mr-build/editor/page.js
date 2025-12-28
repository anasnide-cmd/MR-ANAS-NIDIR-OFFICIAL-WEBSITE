'use client';
import { useState, useEffect, Suspense } from 'react';
import { auth, db } from '../../../lib/firebase';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';

function MrBuildEditorContent() {
    const router = useRouter();
    const [siteId, setSiteId] = useState(null);
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
    const [error, setError] = useState('');
    const [slugError, setSlugError] = useState('');

    // Sanitize slug: lowercase, alphanumeric + hyphens only
    const sanitizeSlug = (slug) => {
        return slug
            .toLowerCase()
            .replace(/[^a-z0-9-]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    };

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            if (!u) {
                router.push('/mr-build/login');
                return;
            }
            
            try {
                // Fetch existing site if any
                const q = query(collection(db, 'user_sites'), where('userId', '==', u.uid));
                const snap = await getDocs(q);
                if (!snap.empty) {
                    const doc = snap.docs[0];
                    const data = doc.data();
                    setSiteId(doc.id);
                    setSiteData({
                        name: data.name || '',
                        slug: data.slug || '',
                        title: data.title || '',
                        description: data.description || '',
                        theme: data.theme || 'dark-nebula',
                        socials: data.socials || { instagram: '', tiktok: '', twitter: '' }
                    });
                }
            } catch (err) {
                console.error('Error loading site:', err);
                setError('Failed to load site data');
            } finally {
                setLoading(false);
            }
        });
        return () => unsub();
    }, [router]);

    // Check slug uniqueness
    const checkSlugAvailability = async (slug, currentSiteId) => {
        if (!slug) return { available: false, error: 'Slug is required' };
        if (slug.length < 3) return { available: false, error: 'Slug must be at least 3 characters' };
        if (slug.length > 30) return { available: false, error: 'Slug must be less than 30 characters' };
        if (!/^[a-z0-9-]+$/.test(slug)) return { available: false, error: 'Slug can only contain lowercase letters, numbers, and hyphens' };

        try {
            const q = query(collection(db, 'user_sites'), where('slug', '==', slug));
            const snap = await getDocs(q);
            
            // If editing and it's the same slug, it's available
            if (!snap.empty && currentSiteId && snap.docs[0].id === currentSiteId) {
                return { available: true };
            }
            
            // If not empty and not our site, it's taken
            if (!snap.empty) {
                return { available: false, error: 'This slug is already taken' };
            }
            
            return { available: true };
        } catch (err) {
            console.error('Error checking slug:', err);
            return { available: false, error: 'Error checking slug availability' };
        }
    };

    const handleSlugChange = async (e) => {
        const rawSlug = e.target.value;
        const sanitized = sanitizeSlug(rawSlug);
        setSiteData({ ...siteData, slug: sanitized });
        setSlugError('');

        // Debounce slug check
        if (sanitized && sanitized.length >= 3) {
            setTimeout(async () => {
                const check = await checkSlugAvailability(sanitized, siteId);
                if (!check.available) {
                    setSlugError(check.error);
                }
            }, 500);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setError('');
        setSlugError('');

        const user = auth.currentUser;
        if (!user) {
            router.push('/mr-build/login');
            return;
        }

        // Validate slug
        if (!siteData.slug) {
            setSlugError('Slug is required');
            return;
        }

        const slugCheck = await checkSlugAvailability(siteData.slug, siteId);
        if (!slugCheck.available) {
            setSlugError(slugCheck.error);
            return;
        }

        setSaving(true);
        try {
            const finalData = {
                name: siteData.name.trim(),
                slug: siteData.slug.trim(),
                title: siteData.title.trim(),
                description: siteData.description.trim(),
                theme: siteData.theme,
                socials: {
                    instagram: (siteData.socials?.instagram || '').trim(),
                    tiktok: (siteData.socials?.tiktok || '').trim(),
                    twitter: (siteData.socials?.twitter || '').trim()
                },
                userId: user.uid,
                updatedAt: new Date().toISOString()
            };

            if (siteId) {
                // Update existing
                await setDoc(doc(db, 'user_sites', siteId), finalData, { merge: true });
            } else {
                // Create new
                const newDocRef = doc(collection(db, 'user_sites'));
                await setDoc(newDocRef, {
                    ...finalData,
                    createdAt: new Date().toISOString()
                });
                setSiteId(newDocRef.id);
            }
            
            router.push('/mr-build');
        } catch (err) {
            console.error('Error saving site:', err);
            setError('Error saving site: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="loading-state">
            <div className="scanner"></div>
            Initializing Neural Interface...
            <style jsx>{`
                .loading-state {
                    height: 60vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: #00f0ff;
                    font-weight: 900;
                    letter-spacing: 2px;
                }
                .scanner {
                    width: 200px;
                    height: 2px;
                    background: #00f0ff;
                    box-shadow: 0 0 20px #00f0ff;
                    margin-bottom: 20px;
                    animation: scan 2s infinite ease-in-out;
                }
                @keyframes scan {
                    0%, 100% { transform: translateY(-50px); opacity: 0; }
                    50% { transform: translateY(50px); opacity: 1; }
                }
            `}</style>
        </div>
    );

    return (
        <div className="editor-view">
            <header className="page-header">
                <div className="header-info">
                    <Link href="/mr-build" className="back-link">← Return to Command Center</Link>
                    <h1>{siteId ? 'Optimize Core Architecture' : 'Initialize New Deployment'}</h1>
                    <p className="subtitle">Configure your digital node on the Mr Build network.</p>
                </div>
                <div className="header-actions">
                    <button onClick={handleSave} className="btn-modern glow-blue" disabled={saving}>
                        {saving ? 'Synchronizing...' : (siteId ? '💾 Update Node' : '🚀 Deploy Node')}
                    </button>
                </div>
            </header>

            {error && (
                <div className="error-banner">
                    ⚠️ {error}
                </div>
            )}

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
                            <label>Access Slug (URL identifier)</label>
                            <div className="slug-input-wrapper">
                                <input
                                    value={siteData.slug}
                                    onChange={handleSlugChange}
                                    placeholder="my-alias"
                                    className={`modern-input ${slugError ? 'error' : ''}`}
                                    required
                                />
                                <span className="slug-suffix">/s/</span>
                            </div>
                            {slugError && (
                                <span className="field-error">{slugError}</span>
                            )}
                            <span className="field-hint">Only lowercase letters, numbers, and hyphens. 3-30 characters.</span>
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
                                    🌌 Dark Nebula
                                </button>
                                <button type="button"
                                    className={`theme-btn ${siteData.theme === 'cyber-grid' ? 'active' : ''}`}
                                    onClick={() => setSiteData({ ...siteData, theme: 'cyber-grid' })}
                                >
                                    ⚡ Cyber Grid
                                </button>
                                <button type="button"
                                    className={`theme-btn ${siteData.theme === 'liquid-gold' ? 'active' : ''}`}
                                    onClick={() => setSiteData({ ...siteData, theme: 'liquid-gold' })}
                                >
                                    💎 Liquid Gold
                                </button>
                            </div>
                        </div>

                        <div className="glass card social-config">
                            <h3>Social Connectivity</h3>
                            <div className="input-group">
                                <label>Instagram URL</label>
                                <input
                                    type="url"
                                    value={siteData.socials?.instagram || ''}
                                    onChange={e => setSiteData({ ...siteData, socials: { ...siteData.socials, instagram: e.target.value } })}
                                    placeholder="https://instagram.com/username"
                                    className="modern-input"
                                />
                            </div>
                            <div className="input-group">
                                <label>TikTok URL</label>
                                <input
                                    type="url"
                                    value={siteData.socials?.tiktok || ''}
                                    onChange={e => setSiteData({ ...siteData, socials: { ...siteData.socials, tiktok: e.target.value } })}
                                    placeholder="https://tiktok.com/@username"
                                    className="modern-input"
                                />
                            </div>
                            <div className="input-group">
                                <label>Twitter/X URL (Optional)</label>
                                <input
                                    type="url"
                                    value={siteData.socials?.twitter || ''}
                                    onChange={e => setSiteData({ ...siteData, socials: { ...siteData.socials, twitter: e.target.value } })}
                                    placeholder="https://twitter.com/username"
                                    className="modern-input"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <style jsx>{`
                .editor-view { animation: fadeIn 0.5s ease-out; }
                .error-banner {
                    background: rgba(255, 50, 50, 0.1);
                    border: 1px solid rgba(255, 50, 50, 0.3);
                    color: #ff3232;
                    padding: 15px 20px;
                    border-radius: 12px;
                    margin-bottom: 30px;
                    font-weight: 700;
                }
                .page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 40px;
                    flex-wrap: wrap;
                    gap: 20px;
                }
                .header-info { flex: 1; min-width: 300px; }
                .back-link {
                    color: #00f0ff;
                    text-decoration: none;
                    font-size: 0.9rem;
                    font-weight: 700;
                    margin-bottom: 15px;
                    display: inline-block;
                    transition: opacity 0.3s;
                }
                .back-link:hover { opacity: 0.7; }
                .page-header h1 {
                    font-family: var(--font-orbitron);
                    font-size: 2rem;
                    margin: 10px 0;
                    letter-spacing: -1px;
                }
                .subtitle { opacity: 0.5; font-size: 1rem; }

                .editor-layout {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 30px;
                }
                .card {
                    padding: 40px;
                    border-radius: 30px;
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                h3 {
                    font-family: var(--font-orbitron);
                    font-size: 1.2rem;
                    margin-bottom: 25px;
                    color: #00f0ff;
                    letter-spacing: 1px;
                }

                .input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    margin-bottom: 25px;
                }
                .input-group label {
                    font-size: 0.8rem;
                    font-weight: 800;
                    opacity: 0.6;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                
                .modern-input {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    padding: 15px;
                    color: #fff;
                    font-size: 1rem;
                    font-family: inherit;
                    transition: all 0.3s;
                }
                .modern-input:focus {
                    border-color: #00f0ff;
                    outline: none;
                    box-shadow: 0 0 15px rgba(0, 240, 255, 0.1);
                    background: rgba(255, 255, 255, 0.05);
                }
                .modern-input.error {
                    border-color: #ff3232;
                }
                .field-error {
                    color: #ff3232;
                    font-size: 0.85rem;
                    font-weight: 700;
                }
                .field-hint {
                    color: rgba(255, 255, 255, 0.3);
                    font-size: 0.75rem;
                }

                .slug-input-wrapper {
                    display: flex;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    overflow: hidden;
                }
                .slug-input-wrapper .modern-input {
                    border: none;
                    background: transparent;
                    flex: 1;
                }
                .slug-suffix {
                    padding: 0 15px;
                    font-size: 0.8rem;
                    opacity: 0.4;
                    font-weight: 700;
                    border-left: 1px solid rgba(255, 255, 255, 0.1);
                    white-space: nowrap;
                }

                .divider {
                    height: 1px;
                    background: rgba(255, 255, 255, 0.05);
                    margin: 30px 0;
                }

                .theme-options {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
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
                    font-size: 0.95rem;
                }
                .theme-btn:hover {
                    background: rgba(255, 255, 255, 0.05);
                    transform: translateX(5px);
                }
                .theme-btn.active {
                    border-color: #00f0ff;
                    background: rgba(0, 240, 255, 0.1);
                    color: #00f0ff;
                }

                .btn-modern {
                    padding: 15px 30px;
                    border-radius: 14px;
                    font-weight: 800;
                    font-size: 1rem;
                    cursor: pointer;
                    border: none;
                    transition: all 0.3s;
                    white-space: nowrap;
                }
                .btn-modern:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                .glow-blue {
                    background: #00f0ff;
                    color: #000;
                    box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);
                }
                .glow-blue:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 25px rgba(0, 240, 255, 0.4);
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 1024px) {
                    .editor-layout {
                        grid-template-columns: 1fr;
                    }
                    .page-header {
                        flex-direction: column;
                        align-items: flex-start;
                    }
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

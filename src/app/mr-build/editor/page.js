'use client';
import { useState, useEffect, Suspense } from 'react';
import { auth, db } from '../../../lib/firebase';
import { doc, setDoc, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';
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
        },
        customHtml: '',
        customCss: '',
        status: 'draft' // public, draft, private
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [slugError, setSlugError] = useState('');
    const [activeTab, setActiveTab] = useState('basic');

    // Sanitize slug: lowercase, alphanumeric + hyphens only
    const sanitizeSlug = (slug) => {
        return slug
            .toLowerCase()
            .replace(/[^a-z0-9-]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    };

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            const loadUserData = async () => {
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
                            socials: data.socials || { instagram: '', tiktok: '', twitter: '' },
                            customHtml: data.customHtml || '',
                            customCss: data.customCss || '',
                            status: data.status || 'draft'
                        });
                    }
                } catch (err) {
                    console.error('Error loading site:', err);
                    setError('Failed to load site data');
                } finally {
                    setLoading(false);
                }
            };
            loadUserData();
        });
        return () => unsub();
    }, [router]);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(''), 5000);
            return () => clearTimeout(timer);
        }
    }, [success]);

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

    const handleDelete = async () => {
        if (!siteId) return;
        
        const confirmed = confirm(`Are you sure you want to delete "${siteData.name || siteData.title}"? This action cannot be undone and your site will be permanently removed.`);
        if (!confirmed) return;

        setSaving(true);
        try {
            await deleteDoc(doc(db, 'user_sites', siteId));
            setSuccess('Site deleted successfully!');
            // Redirect after a short delay
            setTimeout(() => {
                router.push('/mr-build');
            }, 2000);
        } catch (err) {
            console.error('Error deleting site:', err);
            setError('Error deleting site: ' + err.message);
        } finally {
            setSaving(false);
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
                customHtml: siteData.customHtml.trim(),
                customCss: siteData.customCss.trim(),
                status: siteData.status,
                userId: user.uid,
                updatedAt: new Date().toISOString()
            };

            if (siteId) {
                // Update existing
                await setDoc(doc(db, 'user_sites', siteId), finalData, { merge: true });
                setSuccess('Site updated successfully!');
            } else {
                // Create new
                const newDocRef = doc(collection(db, 'user_sites'));
                await setDoc(newDocRef, {
                    ...finalData,
                    createdAt: new Date().toISOString()
                });
                setSiteId(newDocRef.id);
                setSuccess('Site deployed successfully!');
            }
            setError('');
            
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
                    {siteId && siteData.slug && (
                        <>
                            <a href={`/s/${siteData.slug}`} target="_blank" rel="noopener noreferrer" className="btn-modern outline">
                                👁️ Preview
                            </a>
                            <button 
                                onClick={() => {
                                    const url = `${window.location.origin}/s/${siteData.slug}`;
                                    navigator.clipboard.writeText(url).then(() => {
                                        // Show success feedback
                                        const btn = event.target;
                                        const originalText = btn.textContent;
                                        btn.textContent = '✅ Link Copied!';
                                        btn.classList.add('success');
                                        setTimeout(() => {
                                            btn.textContent = originalText;
                                            btn.classList.remove('success');
                                        }, 2000);
                                    });
                                }}
                                className="btn-modern share"
                            >
                                📤 Share Site
                            </button>
                        </>
                    )}
                </div>
            </header>

            {error && (
                <div className="error-banner">
                    ⚠️ {error}
                </div>
            )}

            {success && (
                <div className="success-banner">
                    ✅ {success}
                </div>
            )}

            <div className="tabs-container">
                <button type="button" className={`tab-btn ${activeTab === 'basic' ? 'active' : ''}`} onClick={() => setActiveTab('basic')}>
                    📋 Basic Settings
                </button>
                <button type="button" className={`tab-btn ${activeTab === 'appearance' ? 'active' : ''}`} onClick={() => setActiveTab('appearance')}>
                    🎨 Appearance
                </button>
                <button type="button" className={`tab-btn ${activeTab === 'social' ? 'active' : ''}`} onClick={() => setActiveTab('social')}>
                    🔗 Social Links
                </button>
                <button type="button" className={`tab-btn ${activeTab === 'code' ? 'active' : ''}`} onClick={() => setActiveTab('code')}>
                    💻 Custom Code
                </button>
            </div>

            <div className="editor-container">
                <form onSubmit={handleSave} className="editor-layout">
                    <div className="tab-content">
                        {activeTab === 'basic' && (
                            <div className="main-config glass card reveal-on-scroll">
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

                            <div className="divider"></div>

                            <h3>Publication Status</h3>
                            <div className="status-selector">
                                <button type="button"
                                    className={`status-btn draft ${siteData.status === 'draft' ? 'active' : ''}`}
                                    onClick={() => setSiteData({ ...siteData, status: 'draft' })}
                                >
                                    📝 Draft
                                    <span className="status-desc">Work in progress</span>
                                </button>
                                <button type="button"
                                    className={`status-btn private ${siteData.status === 'private' ? 'active' : ''}`}
                                    onClick={() => setSiteData({ ...siteData, status: 'private' })}
                                >
                                    🔒 Private
                                    <span className="status-desc">Owner only</span>
                                </button>
                                <button type="button"
                                    className={`status-btn public ${siteData.status === 'public' ? 'active' : ''}`}
                                    onClick={() => setSiteData({ ...siteData, status: 'public' })}
                                >
                                    🌐 Public
                                    <span className="status-desc">Live & visible</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'appearance' && (
                        <div className="main-config glass card reveal-on-scroll">
                            <h3>Visual Theme</h3>
                            <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '20px' }}>
                                Choose a theme that matches your digital aesthetic.
                            </p>
                            <div className="theme-grid">
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
                    )}

                    {activeTab === 'social' && (
                        <div className="main-config glass card reveal-on-scroll">
                            <h3>Social Connectivity</h3>
                            <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '20px' }}>
                                Link your social platforms for easy access.
                            </p>
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
                    )}

                    {activeTab === 'code' && (
                        <div className="main-config glass card reveal-on-scroll">
                            <h3>Custom Code (Advanced)</h3>
                            <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '20px' }}>
                                Override the default template with your own HTML and CSS. Leave blank to use the standard design.
                            </p>
                            <div className="input-group">
                                <label>Custom HTML</label>
                                <textarea
                                    value={siteData.customHtml}
                                    onChange={e => setSiteData({ ...siteData, customHtml: e.target.value })}
                                    placeholder="<div>Hello World</div>"
                                    className="code-textarea"
                                    rows={15}
                                />
                            </div>
                            <div className="input-group">
                                <label>Custom CSS</label>
                                <textarea
                                    value={siteData.customCss}
                                    onChange={e => setSiteData({ ...siteData, customCss: e.target.value })}
                                    placeholder="body { background: red; }"
                                    className="code-textarea"
                                    rows={15}
                                />
                            </div>
                        </div>
                    )}
                    </div>

                    <div className="sidebar-actions">
                        <div className="glass card actions-panel reveal-on-scroll">
                            <h3>Quick Actions</h3>
                            <button type="submit" className="btn-modern glow-blue full-width" disabled={saving}>
                                {saving ? '⏳ Synchronizing...' : (siteId ? '💾 Update Node' : '🚀 Deploy Node')}
                            </button>
                            {siteId && siteData.slug && (
                                <>
                                    <a href={`/s/${siteData.slug}`} target="_blank" rel="noopener noreferrer" className="btn-modern outline full-width">
                                        👁️ Preview Site
                                    </a>
                                    <button type="button" 
                                        onClick={() => {
                                            const url = `${window.location.origin}/s/${siteData.slug}`;
                                            navigator.clipboard.writeText(url).then(() => {
                                                // Show success feedback
                                                const btn = event.target;
                                                const originalText = btn.textContent;
                                                btn.textContent = '✅ Link Copied!';
                                                btn.classList.add('success');
                                                setTimeout(() => {
                                                    btn.textContent = '📤 Share Site Link';
                                                    btn.classList.remove('success');
                                                }, 2000);
                                            });
                                        }}
                                        className="btn-modern share full-width"
                                    >
                                        📤 Share Site Link
                                    </button>
                                </>
                            )}
                            <button type="button" onClick={() => {
                                if (confirm('Reset all changes?')) {
                                    setSiteData({
                                        name: '',
                                        slug: '',
                                        title: '',
                                        description: '',
                                        theme: 'dark-nebula',
                                        socials: { instagram: '', tiktok: '', twitter: '' },
                                        customHtml: '',
                                        customCss: '',
                                        status: 'draft'
                                    });
                                    setSlugError('');
                                }
                            }} className="btn-modern danger full-width">
                                🔄 Reset Form
                            </button>
                            {siteId && (
                                <button type="button" onClick={handleDelete} className="btn-modern danger full-width">
                                    🗑️ Delete Site
                                </button>
                            )}
                        </div>

                        <div className="glass card status-panel reveal-on-scroll">
                            <h3>System Status</h3>
                            <div className="status-item">
                                <span className="status-label">Configuration:</span>
                                <span className={`status-value ${siteData.title && siteData.slug ? 'ready' : 'pending'}`}>
                                    {siteData.title && siteData.slug ? '✅ Complete' : '⏳ In Progress'}
                                </span>
                            </div>
                            <div className="status-item">
                                <span className="status-label">Status:</span>
                                <span className={`status-value ${siteData.status === 'public' ? 'ready' : siteData.status === 'private' ? 'warning' : 'pending'}`}>
                                    {siteData.status === 'public' ? '🌐 Public' : siteData.status === 'private' ? '🔒 Private' : '📝 Draft'}
                                </span>
                            </div>
                            <div className="status-item">
                                <span className="status-label">Theme:</span>
                                <span className="status-value ready">🎨 {siteData.theme.replace('-', ' ').toUpperCase()}</span>
                            </div>
                            <div className="status-item">
                                <span className="status-label">Social Links:</span>
                                <span className={`status-value ${Object.values(siteData.socials || {}).some(v => v) ? 'ready' : 'pending'}`}>
                                    {Object.values(siteData.socials || {}).filter(v => v).length} Connected
                                </span>
                            </div>
                            <div className="status-item">
                                <span className="status-label">Custom Code:</span>
                                <span className={`status-value ${siteData.customHtml || siteData.customCss ? 'ready' : 'pending'}`}>
                                    {siteData.customHtml || siteData.customCss ? '💻 Active' : '📝 Template'}
                                </span>
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
                .success-banner {
                    background: rgba(0, 255, 136, 0.1);
                    border: 1px solid rgba(0, 255, 136, 0.3);
                    color: #00ff88;
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
                    display: flex;
                    flex-direction: column;
                    gap: 30px;
                }

                .tab-content {
                    transition: all 0.3s ease;
                }
                .card {
                    padding: 40px;
                    border-radius: 30px;
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    transition: all 0.3s ease;
                }
                .card:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 255, 255, 0.2);
                    transform: translateY(-2px);
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
                .code-textarea {
                    background: rgba(0, 0, 0, 0.5);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    padding: 15px;
                    color: #00f0ff;
                    font-size: 0.9rem;
                    font-family: 'Courier New', monospace;
                    resize: vertical;
                    min-height: 150px;
                    transition: all 0.3s;
                }
                .code-textarea:focus {
                    border-color: #00f0ff;
                    outline: none;
                    box-shadow: 0 0 15px rgba(0, 240, 255, 0.1);
                    background: rgba(0, 0, 0, 0.7);
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
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(0, 240, 255, 0.4); }
                    50% { box-shadow: 0 0 0 10px rgba(0, 240, 255, 0); }
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

                .btn-modern.danger {
                    background: rgba(255, 50, 50, 0.1);
                    border: 1px solid rgba(255, 50, 50, 0.3);
                    color: #ff3232;
                }
                .btn-modern.danger:hover {
                    background: rgba(255, 50, 50, 0.2);
                }
                .btn-modern.outline {
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    color: #fff;
                }
                .btn-modern.outline:hover {
                    background: rgba(255, 255, 255, 0.05);
                }
                .btn-modern.share {
                    background: rgba(112, 0, 255, 0.1);
                    border: 1px solid rgba(112, 0, 255, 0.3);
                    color: #7000ff;
                }
                .btn-modern.share:hover {
                    background: rgba(112, 0, 255, 0.2);
                    border-color: #7000ff;
                }
                .btn-modern.success {
                    background: rgba(0, 255, 136, 0.1);
                    border-color: #00ff88;
                    color: #00ff88;
                }
                .btn-modern.full-width {
                    width: 100%;
                    margin-bottom: 15px;
                }

                .tabs-container {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 30px;
                    flex-wrap: wrap;
                }
                .tab-btn {
                    padding: 12px 20px;
                    border-radius: 12px;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: #fff;
                    cursor: pointer;
                    font-weight: 700;
                    font-size: 0.9rem;
                    transition: all 0.3s;
                }
                .tab-btn:hover {
                    background: rgba(255, 255, 255, 0.05);
                }
                .tab-btn.active {
                    background: rgba(0, 240, 255, 0.1);
                    border-color: #00f0ff;
                    color: #00f0ff;
                    box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
                }

                .sidebar-actions {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                .actions-panel .btn-modern {
                    margin-bottom: 10px;
                }
                .status-panel {
                    padding: 20px;
                }
                .status-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                    font-size: 0.85rem;
                }
                .status-label {
                    opacity: 0.7;
                }
                .status-value {
                    font-weight: 700;
                }
                .status-value.ready {
                    color: #00f0ff;
                }
                .status-value.warning {
                    color: #ffa500;
                }

                .theme-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 10px;
                }

                .status-selector {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                }
                .status-btn {
                    padding: 12px 20px;
                    border-radius: 12px;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: #fff;
                    cursor: pointer;
                    font-weight: 700;
                    font-size: 0.9rem;
                    transition: all 0.3s;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 5px;
                    min-width: 100px;
                }
                .status-btn:hover {
                    background: rgba(255, 255, 255, 0.05);
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                }
                .status-btn.active {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                }
                .status-btn.draft.active {
                    border-color: #ffa500;
                    background: rgba(255, 165, 0, 0.1);
                    color: #ffa500;
                }
                .status-btn.private.active {
                    border-color: #ff3232;
                    background: rgba(255, 50, 50, 0.1);
                    color: #ff3232;
                }
                .status-btn.public.active {
                    border-color: #00ff88;
                    background: rgba(0, 255, 136, 0.1);
                    color: #00ff88;
                }
                .status-desc {
                    font-size: 0.7rem;
                    opacity: 0.6;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .reveal-on-scroll {
                    opacity: 0;
                    transform: translateY(30px);
                    animation: reveal 0.8s ease-out forwards;
                }
                .reveal-on-scroll:nth-child(1) { animation-delay: 0.1s; }
                .reveal-on-scroll:nth-child(2) { animation-delay: 0.2s; }
                .reveal-on-scroll:nth-child(3) { animation-delay: 0.3s; }
                .reveal-on-scroll:nth-child(4) { animation-delay: 0.4s; }
                .reveal-on-scroll:nth-child(5) { animation-delay: 0.5s; }

                @keyframes reveal {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .divider {
                    height: 1px;
                    background: rgba(255, 255, 255, 0.1);
                    margin: 30px 0;
                }

                @media (max-width: 768px) {
                    .editor-layout {
                        grid-template-columns: 1fr;
                        gap: 20px;
                    }
                    .tabs-container {
                        justify-content: center;
                    }
                    .tab-btn {
                        flex: 1;
                        text-align: center;
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

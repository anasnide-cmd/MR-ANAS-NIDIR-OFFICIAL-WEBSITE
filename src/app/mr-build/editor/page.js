'use client';
import { useState, useEffect, Suspense } from 'react';
import { auth, db } from '../../../lib/firebase';
import { doc, setDoc, deleteDoc, collection, query, where, getDocs, getDoc } from 'firebase/firestore';
import { useRouter, useSearchParams } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';

import Loader from '../../../components/Loader';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-tomorrow.css'; // Pro Dark Theme

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
        status: 'draft', // public, draft, private
        keywords: '',
        ogImage: '',
        monetization: {
            enabled: false,
            publisherId: ''
        },
        views: 0
    });
    const [showPreview, setShowPreview] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [slugError, setSlugError] = useState('');
    const [activeTab, setActiveTab] = useState('basic');

    const templates = [
        {
            id: 'portfolio',
            name: 'Dev Portfolio',
            icon: '👨‍💻',
            desc: 'Minimalist dark-mode portfolio for developers.',
            html: '<div class="hero">\n  <h1>Enter Your Name</h1>\n  <p>Full Stack Developer</p>\n</div>\n<div class="projects">\n  <div class="card">Project 1</div>\n  <div class="card">Project 2</div>\n</div>',
            css: 'body { background: #111; color: #fff; font-family: sans-serif; }\n.hero { text-align: center; padding: 100px 20px; }\nh1 { font-size: 3rem; margin-bottom: 10px; color: #00f0ff; }\n.projects { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 800px; margin: 0 auto; }\n.card { padding: 30px; background: #222; border-radius: 10px; }'
        },
        {
            id: 'saas',
            name: 'SaaS Startup',
            icon: '🚀',
            desc: 'Modern landing page for software products.',
            html: '<nav class="navbar">\n  <div class="logo">NexusAI</div>\n  <div class="nav-links">\n    <a href="#features">Features</a>\n    <a href="#pricing">Pricing</a>\n    <button class="btn-primary">Get Started</button>\n  </div>\n</nav>\n<header class="hero">\n  <h1>Automate Your Workflow with AI</h1>\n  <p>Scale your business 10x faster with our intelligent platform.</p>\n  <div class="hero-btns">\n    <button class="btn-primary">Start Free Trial</button>\n    <button class="btn-secondary">Watch Demo</button>\n  </div>\n</header>\n<section id="features" class="features">\n  <div class="feature-card">\n    <h3>⚡ Lightning Fast</h3>\n    <p>Deploy in seconds, not minutes.</p>\n  </div>\n  <div class="feature-card">\n    <h3>🛡️ Enterprise Secure</h3>\n    <p>Bank-grade encryption by default.</p>\n  </div>\n  <div class="feature-card">\n    <h3>📊 Real-time Analytics</h3>\n    <p>Track every metric that matters.</p>\n  </div>\n</section>',
            css: 'body { margin: 0; font-family: "Inter", sans-serif; background: #0f172a; color: #fff; }\n.navbar { display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; border-bottom: 1px solid rgba(255,255,255,0.1); }\n.logo { font-weight: 800; font-size: 1.5rem; color: #38bdf8; }\n.nav-links a { margin-right: 20px; color: #94a3b8; text-decoration: none; }\n.btn-primary { padding: 10px 20px; background: #38bdf8; color: #000; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; }\n.btn-secondary { padding: 10px 20px; background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #fff; border-radius: 6px; cursor: pointer; }\n.hero { padding: 80px 20px; text-align: center; max-width: 800px; margin: 0 auto; }\nh1 { font-size: 3.5rem; margin-bottom: 20px; background: linear-gradient(to right, #38bdf8, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }\n.hero p { font-size: 1.2rem; color: #94a3b8; margin-bottom: 40px; }\n.hero-btns { display: flex; justify-content: center; gap: 15px; }\n.features { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; padding: 60px 20px; max-width: 1000px; margin: 0 auto; }\n.feature-card { padding: 30px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; }'
        },
        {
            id: 'restaurant',
            name: 'Modern Restaurant',
            icon: '🍽️',
            desc: 'Elegant menu and reservation site.',
            html: '<header class="hero-header">\n  <div class="overlay">\n    <h1>Lumière Bistro</h1>\n    <p>Experience the Taste of Paris</p>\n    <button class="reserve-btn">Book a Table</button>\n  </div>\n</header>\n<section class="menu">\n  <h2>Our Favorites</h2>\n  <div class="menu-item">\n    <div class="item-name">Truffle Pasta</div>\n    <div class="item-price">$24</div>\n  </div>\n  <div class="menu-item">\n    <div class="item-name">Wagyu Burger</div>\n    <div class="item-price">$28</div>\n  </div>\n  <div class="menu-item">\n    <div class="item-name">Crème Brûlée</div>\n    <div class="item-price">$12</div>\n  </div>\n</section>',
            css: 'body { margin: 0; font-family: "Playfair Display", serif; background: #1a1a1a; color: #d4d4d4; }\n.hero-header { height: 60vh; background: url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80") center/cover; position: relative; }\n.overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.6); display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; }\nh1 { font-size: 4rem; color: #e5e5e5; margin: 0; }\np { font-style: italic; font-size: 1.5rem; margin-top: 10px; }\n.reserve-btn { margin-top: 30px; padding: 15px 40px; background: #c0a062; color: #000; border: none; font-family: sans-serif; letter-spacing: 2px; cursor: pointer; transition: background 0.3s; }\n.reserve-btn:hover { background: #d4b475; }\n.menu { padding: 80px 20px; max-width: 600px; margin: 0 auto; }\n.menu h2 { text-align: center; font-size: 2.5rem; color: #c0a062; margin-bottom: 40px; }\n.menu-item { display: flex; justify-content: space-between; border-bottom: 1px dotted #444; padding: 15px 0; margin-bottom: 10px; }\n.item-name { font-size: 1.2rem; font-weight: bold; }'
        },
        {
            id: 'event',
            name: 'Event Launch',
            icon: '📅',
            desc: 'Countdown and registration for events.',
            html: '<div class="container">\n  <span class="tag">COMING SOON</span>\n  <h1>Future Tech Summit 2025</h1>\n  <div class="countdown">\n    <div class="time-box">04<span>Days</span></div>\n    <div class="time-box">12<span>Hours</span></div>\n    <div class="time-box">30<span>Mins</span></div>\n  </div>\n  <form class="signup">\n    <input type="email" placeholder="Enter your email for updates">\n    <button type="button">Notify Me</button>\n  </form>\n</div>',
            css: 'body { margin: 0; height: 100vh; display: flex; align-items: center; justify-content: center; background: #000; color: #fff; font-family: sans-serif; overflow: hidden; }\n.container { text-align: center; position: relative; z-index: 1; }\n.tag { background: #ff3e3e; padding: 5px 10px; font-size: 0.8rem; letter-spacing: 2px; font-weight: bold; }\nh1 { font-size: 4rem; margin: 20px 0 40px; text-transform: uppercase; letter-spacing: -2px; }\n.countdown { display: flex; gap: 20px; justify-content: center; margin-bottom: 50px; }\n.time-box { display: flex; flex-direction: column; font-size: 3rem; font-weight: 900; line-height: 1; }\n.time-box span { font-size: 0.8rem; opacity: 0.5; font-weight: normal; margin-top: 5px; text-transform: uppercase; }\n.signup { display: flex; max-width: 400px; margin: 0 auto; gap: 10px; }\ninput { flex: 1; padding: 15px; background: #222; border: 1px solid #333; color: #fff; outline: none; }\nbutton { padding: 15px 30px; background: #fff; color: #000; font-weight: bold; border: none; cursor: pointer; }'
        },
        {
            id: 'linkbio',
            name: 'Link In Bio',
            icon: '🔗',
            desc: 'Mobile-first link hub for social media.',
            html: '<div class="profile">\n  <div class="avatar"></div>\n  <h2>@username</h2>\n</div>\n<div class="links">\n  <a href="#" class="link-btn">My Website</a>\n  <a href="#" class="link-btn">Latest Video</a>\n  <a href="#" class="link-btn">Contact Me</a>\n</div>',
            css: 'body { background: linear-gradient(45deg, #12c2e9, #c471ed); color: #fff; text-align: center; font-family: sans-serif; min-height: 100vh; }\n.profile { padding: 40px 20px; }\n.avatar { width: 100px; height: 100px; background: #fff; border-radius: 50%; margin: 0 auto 20px; }\n.links { max-width: 400px; margin: 0 auto; display: flex; flex-direction: column; gap: 15px; padding: 20px; }\n.link-btn { display: block; background: rgba(255,255,255,0.2); padding: 15px; border-radius: 30px; color: #fff; text-decoration: none; backdrop-filter: blur(5px); font-weight: bold; transition: transform 0.2s; }\n.link-btn:hover { transform: scale(1.02); background: rgba(255,255,255,0.3); }'
        },
        {
            id: 'landing',
            name: 'Product Landing',
            icon: '📦',
            desc: 'High-conversion landing page structure.',
            html: '<nav>Brand</nav>\n<header>\n  <h1>The Future is Here</h1>\n  <button>Get Started</button>\n</header>\n<section>Feature 1</section>\n<section>Feature 2</section>',
            css: 'body { margin: 0; font-family: sans-serif; }\nnav { padding: 20px; background: #000; color: #fff; }\nheader { padding: 100px 20px; text-align: center; background: #f4f4f4; }\nh1 { font-size: 3rem; }\nbutton { padding: 15px 30px; background: #0070f3; color: #fff; border: none; border-radius: 5px; font-size: 1.2rem; cursor: pointer; }\nsection { padding: 50px 20px; text-align: center; border-bottom: 1px solid #eee; }'
        }
    ];

    const applyTemplate = (tpl) => {
        if (confirm(`Apply "${tpl.name}" template? This will overwrite your current Custom HTML and CSS.`)) {
            setSiteData({
                ...siteData,
                customHtml: tpl.html,
                customCss: tpl.css
            });
            setActiveTab('code'); // Switch to code tab to see results
            setSuccess(`Template "${tpl.name}" applied successfully!`);
        }
    };

    // Sanitize slug: lowercase, alphanumeric + hyphens only
    const sanitizeSlug = (slug) => {
        return slug
            .toLowerCase()
            .replace(/[^a-z0-9-]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    };

    const searchParams = useSearchParams();
    const querySiteId = searchParams.get('id');

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            const loadUserData = async () => {
                if (!u) {
                    router.push('/mr-build/login');
                    return;
                }

                try {
                    if (querySiteId) {
                        const docRef = await getDoc(doc(db, 'user_sites', querySiteId));
                        if (docRef.exists() && docRef.data().userId === u.uid) {
                            const data = docRef.data();
                            setSiteId(docRef.id);
                            setSiteData({
                                name: data.name || '',
                                slug: data.slug || '',
                                title: data.title || '',
                                description: data.description || '',
                                theme: data.theme || 'dark-nebula',
                                socials: data.socials || { instagram: '', tiktok: '', twitter: '' },
                                customHtml: data.customHtml || '',
                                customCss: data.customCss || '',
                                status: data.status || 'draft',
                                adminStatus: data.adminStatus || 'active',
                                monetization: data.monetization || { enabled: false, publisherId: '' },
                                keywords: data.keywords || '',
                                ogImage: data.ogImage || '',
                                views: data.views || 0
                            });
                        } else {
                            router.push('/mr-build/dashboard');
                        }
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
    }, [router, querySiteId]);

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
                router.push('/mr-build/dashboard');
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

        // Check if site is banned
        if (siteId && siteData.adminStatus === 'banned') {
            setError('This site has been suspended by the administrator. Contact support.');
            return;
        }

        // Check limits for new sites
        if (!siteId) {
            try {
                // Fetch fresh count and limit
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                const limit = userDoc.exists() ? (userDoc.data().siteLimit || 1) : 1;

                const q = query(collection(db, 'user_sites'), where('userId', '==', user.uid));
                const snap = await getDocs(q);

                if (snap.size >= limit) {
                    setError(`Site limit reached (${limit}/${limit}). Upgrade your plan to create more.`);
                    return;
                }
            } catch (err) {
                console.error("Error checking limits:", err);
                setError('Failed to verify site limits: ' + err.message);
                return;
            }
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
                monetization: siteData.monetization || { enabled: false, publisherId: '' },
                keywords: (siteData.keywords || '').trim(),
                ogImage: (siteData.ogImage || '').trim(),
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
                    adminStatus: 'active', // Default status
                    createdAt: new Date().toISOString()
                });
                setSiteId(newDocRef.id);
                setSuccess('Site deployed successfully!');
            }
            setError('');

            // Stay on page to allow further edits, or redirect if needed? 
            // Original code redirected. Let's redirect but maybe wait?
            // Actually original code redirected immediately.
            setTimeout(() => {
                router.push('/mr-build/dashboard');
            }, 1000);

        } catch (err) {
            console.error('Error saving site:', err);
            setError('Error saving site: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <Loader text="Initializing Neural Interface..." />;

    return (
        <div className="editor-view">
            <header className="page-header">
                <div className="header-info">
                    <Link href="/mr-build/dashboard" className="back-link">← Return to Command Center</Link>
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

            {siteData.status !== 'public' && siteData.slug && (
                <div className="warning-banner">
                    ⚠️ <strong>Your page is not visible!</strong> Your site is currently set to <strong>{siteData.status}</strong> status.
                    Set it to <strong>Public</strong> in the Basic Settings tab to make it visible at <code>/s/{siteData.slug}</code>
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
                <button type="button" className={`tab-btn ${activeTab === 'monetization' ? 'active' : ''}`} onClick={() => setActiveTab('monetization')}>
                    💰 Monetize
                </button>
                <button type="button" className={`tab-btn ${activeTab === 'templates' ? 'active' : ''}`} onClick={() => setActiveTab('templates')}>
                    🧩 Templates
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
                                <div className="input-group">
                                    <label>SEO Keywords (Comma items)</label>
                                    <input
                                        value={siteData.keywords}
                                        onChange={e => setSiteData({ ...siteData, keywords: e.target.value })}
                                        placeholder="portfolio, developer, react, nextjs"
                                        className="modern-input"
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Social Share Image URL (OG:Image)</label>
                                    <input
                                        value={siteData.ogImage}
                                        onChange={e => setSiteData({ ...siteData, ogImage: e.target.value })}
                                        placeholder="https://example.com/my-image.jpg"
                                        className="modern-input"
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

                        {activeTab === 'monetization' && (
                            <div className="main-config glass card reveal-on-scroll">
                                <h3>Monetization & Ads</h3>
                                <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '20px' }}>
                                    Earn revenue by displaying ads on your site.
                                </p>
                                
                                {siteData.views < 1000 ? (
                                    <div className="locked-feature">
                                        <div className="locked-icon">🔒</div>
                                        <h4>Monetization Locked</h4>
                                        <p>You need at least <strong>1,000 views</strong> to enable ads on your site.</p>
                                        <div className="progress-container">
                                            <div className="progress-bar" style={{ width: `${Math.min((siteData.views / 1000) * 100, 100)}%` }}></div>
                                        </div>
                                        <p className="progress-text">{siteData.views} / 1,000 Views</p>
                                    </div>
                                ) : (
                                    <>
                                        <label className="toggle-switch" style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px', cursor: 'pointer'}}>
                                            <input 
                                                type="checkbox" 
                                                checked={siteData.monetization?.enabled || false} 
                                                onChange={(e) => setSiteData({
                                                    ...siteData, 
                                                    monetization: { ...siteData.monetization, enabled: e.target.checked }
                                                })}
                                                style={{width: '20px', height: '20px'}}
                                            />
                                            <span style={{fontSize: '1.1rem', fontWeight: 'bold', color: siteData.monetization?.enabled ? '#00f0ff' : '#fff'}}>
                                                Enable AdSense Ads
                                            </span>
                                        </label>

                                        {siteData.monetization?.enabled && (
                                            <div className="input-group animate-fade-in">
                                                <label>Google AdSense Publisher ID</label>
                                                <input
                                                    value={siteData.monetization?.publisherId || ''}
                                                    onChange={e => setSiteData({
                                                        ...siteData,
                                                        monetization: { ...siteData.monetization, publisherId: e.target.value }
                                                    })}
                                                    placeholder="pub-xxxxxxxxxxxxxxxx"
                                                    className="modern-input"
                                                />
                                                <p style={{fontSize: '0.8rem', opacity: 0.5, marginTop: '5px'}}>
                                                    Find this in your Google AdSense account settings.
                                                </p>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}

                        {activeTab === 'templates' && (
                            <div className="main-config glass card reveal-on-scroll">
                                <h3>Quick-Start Templates</h3>
                                <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '20px' }}>
                                    Jumpstart your build with a pre-configured architecture.
                                </p>
                                <div className="templates-grid">
                                    {templates.map(tpl => (
                                        <div key={tpl.id} className="template-card" onClick={() => applyTemplate(tpl)}>
                                            <div className="tpl-icon">{tpl.icon}</div>
                                            <h4>{tpl.name}</h4>
                                            <p>{tpl.desc}</p>
                                            <button type="button" className="btn-use-tpl">Use Template</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'code' && (
                            <div className="main-config glass card reveal-on-scroll" style={{ maxWidth: showPreview ? '100%' : '800px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div className="code-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3>Advanced Engineering</h3>
                                    <div className="toggle-wrapper">
                                        <button 
                                            type="button" 
                                            className={`toggle-btn ${showPreview ? 'active' : ''}`}
                                            onClick={() => setShowPreview(!showPreview)}
                                        >
                                            {showPreview ? '👁️ Hide Live Preview' : '👁️ Show Split Preview'}
                                        </button>
                                    </div>
                                </div>

                                <div className={`code-workspace ${showPreview ? 'split-view' : ''}`}>
                                    <div className="editors-column">
                                        <div className="input-group">
                                            <label className="code-label">HTML Structure <span className="lang-tag">HTML5</span></label>
                                            <div className="editor-wrapper">
                                                <Editor
                                                    value={siteData.customHtml}
                                                    onValueChange={code => setSiteData({ ...siteData, customHtml: code })}
                                                    highlight={code => highlight(code, languages.markup)}
                                                    padding={15}
                                                    className="pro-editor"
                                                    style={{
                                                        fontFamily: '"Fira Code", "Fira Mono", monospace',
                                                        fontSize: 14,
                                                        backgroundColor: '#1e1e1e',
                                                        borderRadius: '8px',
                                                        minHeight: '200px'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="input-group">
                                            <label className="code-label">CSS Styling <span className="lang-tag">CSS3</span></label>
                                            <div className="editor-wrapper">
                                                <Editor
                                                    value={siteData.customCss}
                                                    onValueChange={code => setSiteData({ ...siteData, customCss: code })}
                                                    highlight={code => highlight(code, languages.css)}
                                                    padding={15}
                                                    className="pro-editor"
                                                    style={{
                                                        fontFamily: '"Fira Code", "Fira Mono", monospace',
                                                        fontSize: 14,
                                                        backgroundColor: '#1e1e1e',
                                                        borderRadius: '8px',
                                                        minHeight: '200px'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="block-library">
                                            <h4>🏗️ Building Blocks</h4>
                                            <div className="blocks-grid">
                                                <button type="button" className="block-btn" onClick={() => setSiteData(prev => ({ ...prev, customHtml: prev.customHtml + '\n<header class="hero">\n  <h1>Hero Title</h1>\n  <p>Subtitle goes here</p>\n</header>', customCss: prev.customCss + '\n.hero { padding: 4rem 2rem; text-align: center; background: #222; }' }))}>
                                                    Hero Section
                                                </button>
                                                <button type="button" className="block-btn" onClick={() => setSiteData(prev => ({ ...prev, customHtml: prev.customHtml + '\n<div class="grid-2">\n  <div>Feature 1</div>\n  <div>Feature 2</div>\n</div>', customCss: prev.customCss + '\n.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }' }))}>
                                                    2-Col Grid
                                                </button>
                                                <button type="button" className="block-btn" onClick={() => setSiteData(prev => ({ ...prev, customHtml: prev.customHtml + '\n<button class="cta-btn">Click Me</button>', customCss: prev.customCss + '\n.cta-btn { padding: 10px 20px; background: #00f0ff; color: #000; border: none; border-radius: 5px; cursor: pointer; }' }))}>
                                                    CTA Button
                                                </button>
                                                <button type="button" className="block-btn" onClick={() => setSiteData(prev => ({ ...prev, customHtml: prev.customHtml + '\n<footer>\n  <p>&copy; 2024 My Site</p>\n</footer>', customCss: prev.customCss + '\nfooter { padding: 20px; text-align: center; opacity: 0.7; }' }))}>
                                                    Footer
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {showPreview && (
                                        <div className="preview-column">
                                            <label className="code-label">Live Output</label>
                                            <div className="preview-frame-container">
                                                <iframe 
                                                    title="Live Preview"
                                                    srcDoc={`
                                                        <html>
                                                            <head>
                                                                <style>${siteData.customCss}</style>
                                                            </head>
                                                            <body>
                                                                ${siteData.customHtml}
                                                            </body>
                                                        </html>
                                                    `}
                                                    className="live-preview-iframe"
                                                />
                                            </div>
                                        </div>
                                    )}
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
                                        monetization: { enabled: false, publisherId: '' },
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
                                <span className="status-label">Monetization:</span>
                                <span className={`status-value ${siteData.monetization?.enabled && siteData.monetization?.publisherId ? 'ready' : 'pending'}`}>
                                    {siteData.monetization?.enabled ? (siteData.monetization?.publisherId ? '💰 Active' : '⚠️ Missing ID') : 'Off'}
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
                .warning-banner {
                    background: rgba(255, 165, 0, 0.1);
                    border: 1px solid rgba(255, 165, 0, 0.3);
                    color: #ffa500;
                    padding: 15px 20px;
                    border-radius: 12px;
                    margin-bottom: 30px;
                    font-weight: 700;
                    line-height: 1.6;
                }
                .warning-banner code {
                    background: rgba(0, 0, 0, 0.3);
                    padding: 2px 8px;
                    border-radius: 4px;
                    font-family: 'Courier New', monospace;
                    color: #ffa500;
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
                    gap: 15px;
                    flex-wrap: wrap;
                }

                .templates-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 20px;
                }
                .template-card {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 15px;
                    padding: 20px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .template-card:hover {
                    background: rgba(255, 255, 255, 0.1);
                    border-color: #00f0ff;
                    transform: translateY(-5px);
                }
                .tpl-icon { font-size: 2.5rem; margin-bottom: 10px; }
                .template-card h4 { margin: 10px 0; color: #fff; }
                .template-card p { font-size: 0.8rem; opacity: 0.6; margin-bottom: 15px; line-height: 1.4; }
                .btn-use-tpl {
                    background: transparent;
                    border: 1px solid #00f0ff;
                    color: #00f0ff;
                    padding: 5px 15px;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .template-card:hover .btn-use-tpl {
                    background: #00f0ff;
                    color: #000;
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

                .progress-container {
                    width: 100%;
                    height: 10px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 5px;
                    margin: 15px 0;
                    overflow: hidden;
                }
                .progress-bar {
                    height: 100%;
                    background: #00f0ff;
                    transition: width 0.5s ease;
                }
                .locked-feature {
                    text-align: center;
                    padding: 40px;
                    background: rgba(0, 0, 0, 0.3);
                    border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .locked-icon { font-size: 3rem; margin-bottom: 20px; }
                .locked-feature h4 { color: #ff3232; margin-bottom: 10px; }
                
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

                /* Code Editor & Preview Styles */
                .code-workspace { display: flex; gap: 20px; }
                .code-workspace.split-view .editors-column { width: 50%; }
                .code-workspace.split-view .preview-column { width: 50%; }
                .editors-column { width: 100%; transition: width 0.3s; }
                .preview-column { display: flex; flex-direction: column; }
                
                .editor-wrapper { border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; overflow: hidden; }
                .editor-wrapper:focus-within { border-color: #00f0ff; box-shadow: 0 0 15px rgba(0, 240, 255, 0.1); }
                
                .code-label { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-weight: 700; color: #ccc; }
                .lang-tag { font-size: 0.7rem; background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; color: #00f0ff; }
                
                .toggle-btn {
                    background: rgba(0, 240, 255, 0.1); color: #00f0ff; border: 1px solid rgba(0, 240, 255, 0.3);
                    padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 0.85rem; font-weight: 600;
                    transition: all 0.2s;
                }
                .toggle-btn:hover, .toggle-btn.active { background: #00f0ff; color: #000; }
                
                .preview-frame-container { 
                    flex: 1; background: #fff; border-radius: 8px; overflow: hidden; 
                    height: 600px; /* Fixed height for preview in split view */
                }
                .live-preview-iframe { width: 100%; height: 100%; border: none; }
                
                .block-library { margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); }
                .blocks-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px; margin-top: 10px; }
                .block-btn {
                    padding: 10px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.05);
                    color: #ccc; border-radius: 6px; cursor: pointer; transition: all 0.2s; font-size: 0.85rem;
                }
                .block-btn:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.2); color: #fff; }
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

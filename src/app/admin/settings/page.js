'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ALLOWED_ADMINS = ['anasnide@gmail.com', 'ceo@anasnidir.com'];

export default function SettingsPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('general');
    const router = useRouter();

    // Settings State
    const [settings, setSettings] = useState({
        heroTitle: 'MR ANAS NIDIR',
        heroSubtitle: 'Entrepreneur • Visionary • Digital Innovator',
        aboutText: "I'm Mr Anas Nidir, a builder of tech, AI systems, and futuristic platforms — driven by simplicity and independence. I believe in creating tools that empower, not restrict.",
        bioTitle: 'My Story',
        bioText1: 'Mr Anas Nidir is a tech entrepreneur, futurist, and digital architect...',
        bioText2: 'Since March 2025, he has been developing high-performance solutions...',
        quote: 'Simple is Power',
        contactEmail: 'ceo@anasnidir.com',
        tiktok: 'https://tiktok.com/@anasnide',
        instagram: 'https://www.instagram.com/anasnide',
        stats: [
            { label: 'Active Projects', value: '3+' },
            { label: 'Founded', value: '2025' },
            { label: 'Possibilities', value: '∞' }
        ],
        projects: [
            { icon: '⚡', title: 'NEXENGINE', desc: 'Independent web server system built for speed, privacy, and total control.', tag: 'Infrastructure' },
            { icon: '🤖', title: 'NEX AI', desc: 'Custom AI Chatbot Platform with advanced natural language processing.', tag: 'AI / ML' },
            { icon: '💬', title: 'ANAS GPT', desc: 'Advanced LLM Web Assistant for seamless human-AI interaction.', tag: 'AI Assistant' }
        ],
        products: [
            { name: 'Gumroad', url: 'https://anasnidir.gumroad.com/' }
        ]
    });

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            if (!u || !ALLOWED_ADMINS.includes(u.email)) {
                router.push('/admin');
                return;
            }
            setUser(u);

            const docRef = doc(db, 'settings', 'homepage');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setSettings(prev => ({
                    ...prev,
                    ...data,
                    stats: data.stats || prev.stats,
                    aboutText: data.aboutText || prev.aboutText
                }));
            }
            setLoading(false);
        });
        return () => unsub();
    }, [router]);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await setDoc(doc(db, 'settings', 'homepage'), settings);
            alert('Settings saved successfully!');
        } catch (err) {
            alert('Error saving settings: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="loading-state">Initializing Dashboard...</div>;

    const tabs = [
        { id: 'general', label: 'General Info', icon: '🏠' },
        { id: 'projects', label: 'Projects', icon: '🚀' },
        { id: 'products', label: 'Products', icon: '📦' },
    ];

    return (
        <div className="settings-view">
            <header className="page-header">
                <div className="header-info">
                    <span className="page-tag">SYSTEM CONFIG</span>
                    <h1>Environment Settings</h1>
                    <p className="subtitle">Configure your digital identity across the platform.</p>
                </div>
                <button
                    onClick={handleSave}
                    className={`btn glow-blue ${saving ? 'saving' : ''}`}
                    disabled={saving}
                >
                    {saving ? '⚡ Syncing...' : '💾 Save Configurations'}
                </button>
            </header>

            <div className="settings-container">
                <nav className="tab-sidebar">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <span className="tab-icon">{tab.icon}</span>
                            <div className="tab-text">
                                <span className="tab-label">{tab.label}</span>
                                <span className="tab-desc">Edit {tab.id} data</span>
                            </div>
                        </button>
                    ))}
                </nav>

                <div className="tab-viewport card glass">
                    {activeTab === 'general' && (
                        <div className="settings-form animate-fade-in">
                            <div className="section-block">
                                <h3 className="section-title">Hero Branding</h3>
                                <div className="input-row">
                                    <div className="input-wrapper">
                                        <label>Primary Title</label>
                                        <input type="text" value={settings.heroTitle} onChange={e => setSettings({ ...settings, heroTitle: e.target.value })} className="modern-input" />
                                    </div>
                                    <div className="input-wrapper">
                                        <label>Subtitle Tagline</label>
                                        <input type="text" value={settings.heroSubtitle} onChange={e => setSettings({ ...settings, heroSubtitle: e.target.value })} className="modern-input" />
                                    </div>
                                </div>
                            </div>

                            <div className="section-block">
                                <h3 className="section-title">About Narrative</h3>
                                <div className="input-wrapper">
                                    <label>Introductory Paragraph</label>
                                    <textarea rows={4} value={settings.aboutText} onChange={e => setSettings({ ...settings, aboutText: e.target.value })} className="modern-input" />
                                </div>
                            </div>

                            <div className="section-block">
                                <h3 className="section-title">Performance Stats</h3>
                                <div className="stats-editor-grid">
                                    {settings.stats.map((s, idx) => (
                                        <div key={idx} className="stat-input-group">
                                            <input placeholder="20+" value={s.value} onChange={e => {
                                                const newS = [...settings.stats]; newS[idx].value = e.target.value; setSettings({ ...settings, stats: newS });
                                            }} className="modern-input compact" />
                                            <input placeholder="Label" value={s.label} onChange={e => {
                                                const newS = [...settings.stats]; newS[idx].label = e.target.value; setSettings({ ...settings, stats: newS });
                                            }} className="modern-input" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="section-block">
                                <h3 className="section-title">Bio & Social Connectivity</h3>
                                <div className="input-row">
                                    <div className="input-wrapper">
                                        <label>Contact Email</label>
                                        <input type="email" value={settings.contactEmail} onChange={e => setSettings({ ...settings, contactEmail: e.target.value })} className="modern-input" />
                                    </div>
                                    <div className="input-wrapper">
                                        <label>TikTok Handle</label>
                                        <input type="text" value={settings.tiktok} onChange={e => setSettings({ ...settings, tiktok: e.target.value })} className="modern-input" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'projects' && (
                        <div className="projects-manager animate-fade-in">
                            <div className="manager-header">
                                <h3 className="section-title">Portfolio Infrastructure</h3>
                                <button type="button" onClick={() => setSettings({ ...settings, projects: [...settings.projects, { icon: '🚀', title: '', desc: '', tag: '' }] })} className="btn-small">+ Deploy New</button>
                            </div>
                            <div className="projects-grid-modern">
                                {settings.projects.map((proj, idx) => (
                                    <div key={idx} className="project-editor-card glass">
                                        <div className="card-top">
                                            <input placeholder="🚀" value={proj.icon} onChange={e => {
                                                const newP = [...settings.projects]; newP[idx].icon = e.target.value; setSettings({ ...settings, projects: newP });
                                            }} className="icon-input" />
                                            <input placeholder="Project Name" value={proj.title} onChange={e => {
                                                const newP = [...settings.projects]; newP[idx].title = e.target.value; setSettings({ ...settings, projects: newP });
                                            }} className="title-input" />
                                        </div>
                                        <textarea placeholder="Brief engineering description..." rows={2} value={proj.desc} onChange={e => {
                                            const newP = [...settings.projects]; newP[idx].desc = e.target.value; setSettings({ ...settings, projects: newP });
                                        }} className="modern-input" style={{ marginTop: 15 }} />
                                        <div className="card-bottom">
                                            <input placeholder="TAG" value={proj.tag} onChange={e => {
                                                const newP = [...settings.projects]; newP[idx].tag = e.target.value; setSettings({ ...settings, projects: newP });
                                            }} className="tag-input" />
                                            <button type="button" onClick={() => setSettings({ ...settings, projects: settings.projects.filter((_, i) => i !== idx) })} className="del-btn">Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'products' && (
                        <div className="products-manager animate-fade-in">
                            <div className="manager-header">
                                <h3 className="section-title">Commercial Channels</h3>
                                <button type="button" onClick={() => setSettings({ ...settings, products: [...settings.products, { name: '', url: '' }] })} className="btn-small">+ Link Store</button>
                            </div>
                            <div className="products-list-modern">
                                {settings.products.map((prod, idx) => (
                                    <div key={idx} className="product-input-row glass">
                                        <input placeholder="Gumroad" value={prod.name} onChange={e => {
                                            const newP = [...settings.products]; newP[idx].name = e.target.value; setSettings({ ...settings, products: newP });
                                        }} className="modern-input" style={{ flex: 1 }} />
                                        <input placeholder="URL" value={prod.url} onChange={e => {
                                            const newP = [...settings.products]; newP[idx].url = e.target.value; setSettings({ ...settings, products: newP });
                                        }} className="modern-input" style={{ flex: 2 }} />
                                        <button type="button" onClick={() => setSettings({ ...settings, products: settings.products.filter((_, i) => i !== idx) })} className="del-btn circle">✕</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .settings-view { padding-bottom: 50px; }
                .page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 50px;
                }
                .page-tag {
                    font-size: 0.65rem;
                    color: #00f0ff;
                    font-weight: 800;
                    letter-spacing: 2px;
                    background: rgba(0, 240, 255, 0.1);
                    padding: 4px 10px;
                    border-radius: 4px;
                    margin-bottom: 10px;
                    display: inline-block;
                }
                .subtitle { opacity: 0.6; font-size: 1.1rem; }
                
                .settings-container {
                    display: grid;
                    grid-template-columns: 280px 1fr;
                    gap: 40px;
                    align-items: flex-start;
                }
                .tab-sidebar {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
                .tab-item {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding: 15px 20px;
                    background: transparent;
                    border: 1px solid transparent;
                    border-radius: 16px;
                    color: rgba(255, 255, 255, 0.4);
                    cursor: pointer;
                    text-align: left;
                    transition: all 0.3s;
                }
                .tab-item:hover {
                    background: rgba(255, 255, 255, 0.03);
                    color: rgba(255, 255, 255, 0.8);
                }
                .tab-item.active {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(0, 240, 255, 0.2);
                    color: #fff;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                }
                .tab-icon { font-size: 1.5rem; }
                .tab-text { display: flex; flex-direction: column; }
                .tab-label { font-weight: 700; font-size: 1rem; }
                .tab-desc { font-size: 0.75rem; opacity: 0.5; }

                .tab-viewport {
                    padding: 40px;
                    min-height: 500px;
                    border-radius: 30px;
                }

                .section-block { margin-bottom: 40px; }
                .section-title {
                    font-size: 1rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 20px;
                    color: #00f0ff;
                    border-left: 3px solid #00f0ff;
                    padding-left: 15px;
                }

                .input-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 25px;
                }
                .input-wrapper { display: flex; flex-direction: column; gap: 8px; }
                .input-wrapper label { font-size: 0.85rem; opacity: 0.5; font-weight: 600; }

                .modern-input {
                    padding: 14px 18px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 12px;
                    color: #fff;
                    font-size: 1rem;
                    transition: all 0.3s;
                }
                .modern-input:focus {
                    background: rgba(255, 255, 255, 0.06);
                    border-color: #00f0ff;
                    outline: none;
                    box-shadow: 0 0 15px rgba(0, 240, 255, 0.1);
                }
                .compact { width: 100px; text-align: center; font-weight: 800; color: #00f0ff; }

                .stats-editor-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                }
                .stat-input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .manager-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 30px;
                }
                .btn-small {
                    padding: 8px 16px;
                    background: #00f0ff;
                    color: #000;
                    border: none;
                    border-radius: 8px;
                    font-weight: 700;
                    font-size: 0.8rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .btn-small:hover { transform: scale(1.05); box-shadow: 0 0 15px rgba(0, 240, 255, 0.4); }

                .projects-grid-modern {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                }
                .project-editor-card {
                    padding: 25px;
                    border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .card-top { display: flex; gap: 15px; }
                .icon-input { width: 50px; text-align: center; font-size: 1.2rem; }
                .title-input { flex: 1; font-weight: 700; }
                .icon-input, .title-input, .tag-input {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 10px;
                    padding: 10px;
                    color: #fff;
                }
                .card-bottom {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 15px;
                }
                .tag-input { width: 40%; font-size: 0.8rem; font-weight: 700; color: #00f0ff; text-transform: uppercase; }
                .del-btn {
                    background: none;
                    border: none;
                    color: #ff4d4d;
                    font-weight: 600;
                    font-size: 0.85rem;
                    cursor: pointer;
                    opacity: 0.6;
                    transition: opacity 0.2s;
                }
                .del-btn:hover { opacity: 1; }
                .del-btn.circle {
                    width: 35px;
                    height: 35px;
                    background: rgba(255, 77, 77, 0.1);
                    border-radius: 100px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .products-list-modern {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
                .product-input-row {
                    display: flex;
                    gap: 15px;
                    padding: 15px;
                    border-radius: 16px;
                    align-items: center;
                }

                .glow-blue {
                    padding: 12px 25px;
                    background: #00f0ff;
                    color: #000;
                    border: none;
                    border-radius: 12px;
                    font-weight: 800;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);
                }
                .glow-blue:hover { transform: translateY(-2px); box-shadow: 0 5px 25px rgba(0, 240, 255, 0.4); }
                .glow-blue:disabled { opacity: 0.5; transform: none; box-shadow: none; }

                .animate-fade-in {
                    animation: fadeIn 0.4s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 1024px) {
                    .settings-container { grid-template-columns: 1fr; }
                    .tab-sidebar { flex-direction: row; overflow-x: auto; padding-bottom: 10px; }
                    .tab-item { flex: 0 0 auto; white-space: nowrap; }
                    .tab-desc { display: none; }
                }
                @media (max-width: 768px) {
                    .page-header { flex-direction: column; align-items: flex-start; gap: 20px; }
                    .input-row, .stats-editor-grid, .projects-grid-modern { grid-template-columns: 1fr; }
                    .tab-viewport { padding: 25px; }
                    .product-input-row { flex-direction: column; }
                    .product-input-row .modern-input { width: 100%; }
                }
            `}</style>
        </div>
    );
}

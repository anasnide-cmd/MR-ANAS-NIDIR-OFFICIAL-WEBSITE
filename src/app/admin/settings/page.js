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

    if (loading) return <div className="section">Loading...</div>;

    const tabs = [
        { id: 'general', label: 'General Info', icon: '🏠' },
        { id: 'projects', label: 'Projects', icon: '🚀' },
        { id: 'products', label: 'Products', icon: '📦' },
    ];

    return (
        <div className="settings-view">
            <header className="page-header">
                <div>
                    <h1>Site Settings</h1>
                    <p style={{ opacity: 0.6 }}>Global configuration for your portfolio.</p>
                </div>
                <button onClick={handleSave} className="btn glow" disabled={saving}>
                    {saving ? 'Saving...' : '💾 Save Changes'}
                </button>
            </header>

            <nav className="tab-nav">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <span>{tab.icon}</span> {tab.label}
                    </button>
                ))}
            </nav>

            <div className="tab-content card glass">
                {activeTab === 'general' && (
                    <div className="settings-grid">
                        <div className="input-group full">
                            <h3>Hero Section</h3>
                            <label>Title</label>
                            <input type="text" value={settings.heroTitle} onChange={e => setSettings({ ...settings, heroTitle: e.target.value })} className="admin-input" />
                            <label>Subtitle</label>
                            <input type="text" value={settings.heroSubtitle} onChange={e => setSettings({ ...settings, heroSubtitle: e.target.value })} className="admin-input" />
                        </div>

                        <div className="input-group full">
                            <h3>About Section</h3>
                            <label>Description (Home Page)</label>
                            <textarea rows={4} value={settings.aboutText} onChange={e => setSettings({ ...settings, aboutText: e.target.value })} className="admin-input" />
                        </div>

                        <div className="input-group">
                            <h3>Stats</h3>
                            {settings.stats.map((s, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                                    <input placeholder="Value" value={s.value} onChange={e => {
                                        const newS = [...settings.stats];
                                        newS[idx].value = e.target.value;
                                        setSettings({ ...settings, stats: newS });
                                    }} style={{ width: 80 }} className="admin-input" />
                                    <input placeholder="Label" value={s.label} onChange={e => {
                                        const newS = [...settings.stats];
                                        newS[idx].label = e.target.value;
                                        setSettings({ ...settings, stats: newS });
                                    }} style={{ flex: 1 }} className="admin-input" />
                                </div>
                            ))}
                        </div>

                        <div className="input-group">
                            <h3>Bio Section</h3>
                            <label>Bio Title</label>
                            <input type="text" value={settings.bioTitle} onChange={e => setSettings({ ...settings, bioTitle: e.target.value })} className="admin-input" />
                            <label>Quote</label>
                            <input type="text" value={settings.quote} onChange={e => setSettings({ ...settings, quote: e.target.value })} className="admin-input" />
                        </div>

                        <div className="input-group full">
                            <h3>Contact & Socials</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                                <div>
                                    <label>Email</label>
                                    <input type="email" value={settings.contactEmail} onChange={e => setSettings({ ...settings, contactEmail: e.target.value })} className="admin-input" />
                                </div>
                                <div>
                                    <label>TikTok</label>
                                    <input type="text" value={settings.tiktok} onChange={e => setSettings({ ...settings, tiktok: e.target.value })} className="admin-input" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'projects' && (
                    <div className="projects-grid-editor">
                        {settings.projects.map((proj, idx) => (
                            <div key={idx} className="editor-card">
                                <div style={{ display: 'flex', gap: 10 }}>
                                    <input placeholder="Icon" value={proj.icon} onChange={e => {
                                        const newP = [...settings.projects]; newP[idx].icon = e.target.value; setSettings({ ...settings, projects: newP });
                                    }} style={{ width: 60 }} className="admin-input" />
                                    <input placeholder="Title" value={proj.title} onChange={e => {
                                        const newP = [...settings.projects]; newP[idx].title = e.target.value; setSettings({ ...settings, projects: newP });
                                    }} style={{ flex: 1 }} className="admin-input" />
                                </div>
                                <textarea placeholder="Description" rows={2} value={proj.desc} onChange={e => {
                                    const newP = [...settings.projects]; newP[idx].desc = e.target.value; setSettings({ ...settings, projects: newP });
                                }} className="admin-input" style={{ margin: '10px 0' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <input placeholder="Tag" value={proj.tag} onChange={e => {
                                        const newP = [...settings.projects]; newP[idx].tag = e.target.value; setSettings({ ...settings, projects: newP });
                                    }} className="admin-input" style={{ width: '40%' }} />
                                    <button type="button" onClick={() => setSettings({ ...settings, projects: settings.projects.filter((_, i) => i !== idx) })} style={{ color: '#ff3232', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={() => setSettings({ ...settings, projects: [...settings.projects, { icon: '🚀', title: '', desc: '', tag: '' }] })} className="btn" style={{ background: '#333' }}>+ Add Project</button>
                    </div>
                )}

                {activeTab === 'products' && (
                    <div className="products-list-editor">
                        {settings.products.map((prod, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: 10, marginBottom: 15 }}>
                                <input placeholder="Label" value={prod.name} onChange={e => {
                                    const newP = [...settings.products]; newP[idx].name = e.target.value; setSettings({ ...settings, products: newP });
                                }} className="admin-input" style={{ flex: 1 }} />
                                <input placeholder="URL" value={prod.url} onChange={e => {
                                    const newP = [...settings.products]; newP[idx].url = e.target.value; setSettings({ ...settings, products: newP });
                                }} className="admin-input" style={{ flex: 2 }} />
                                <button type="button" onClick={() => setSettings({ ...settings, products: settings.products.filter((_, i) => i !== idx) })} style={{ color: '#ff3232', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => setSettings({ ...settings, products: [...settings.products, { name: '', url: '' }] })} className="btn" style={{ background: '#333' }}>+ Add Product</button>
                    </div>
                )}
            </div>

            <style jsx>{`
                .settings-view {
                    animation: fadeIn 0.5s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 30px;
                }
                .tab-nav {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 20px;
                }
                .tab-btn {
                    padding: 10px 20px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 8px;
                    color: rgba(255, 255, 255, 0.6);
                    cursor: pointer;
                    transition: all 0.3s;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .tab-btn:hover {
                    background: rgba(255, 255, 255, 0.08);
                    color: #fff;
                }
                .tab-btn.active {
                    background: rgba(0, 240, 255, 0.1);
                    border-color: rgba(0, 240, 255, 0.2);
                    color: #00f0ff;
                }
                .tab-content {
                    padding: 30px;
                }
                .settings-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 40px;
                }
                .full { grid-column: 1 / -1; }
                .input-group h3 {
                    margin-bottom: 20px;
                    color: #00f0ff;
                }
                .input-group label {
                    display: block;
                    margin: 15px 0 8px;
                    font-size: 0.85rem;
                    opacity: 0.6;
                }
                .admin-input {
                    display: block;
                    width: 100%;
                    padding: 12px;
                    background: rgba(0, 0, 0, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 6px;
                    color: #fff;
                    transition: border 0.3s;
                }
                .admin-input:focus {
                    border-color: #00f0ff;
                    outline: none;
                }
                .editor-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    padding: 20px;
                    border-radius: 12px;
                    margin-bottom: 20px;
                }
            `}</style>
        </div>
    );
}

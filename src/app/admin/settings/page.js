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
    const router = useRouter();

    // Settings State
    const [settings, setSettings] = useState({
        heroTitle: 'MR ANAS NIDIR',
        heroSubtitle: 'Entrepreneur • Visionary • Digital Innovator',
        bioTitle: 'My Story',
        bioText1: 'Mr Anas Nidir is a tech entrepreneur, futurist, and digital architect...',
        bioText2: 'Since March 2025, he has been developing high-performance solutions...',
        quote: 'Simple is Power',
        contactEmail: 'ceo@anasnidir.com',
        tiktok: 'https://tiktok.com/@anasnide',
        instagram: 'https://www.instagram.com/anasnide',
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

            // Fetch current settings
            const docRef = doc(db, 'settings', 'homepage');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setSettings(docSnap.data());
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

    return (
        <main className="section container" style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
                <h1>Site Settings</h1>
                <Link href="/admin" style={{ color: 'cyan' }}>← Dashboard</Link>
            </div>

            <form onSubmit={handleSave} className="card glass" style={{ display: 'flex', flexDirection: 'column', gap: 20, textAlign: 'left', padding: 30 }}>

                <section>
                    <h3>Hero Section</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <label>Hero Title</label>
                        <input
                            type="text"
                            value={settings.heroTitle}
                            onChange={e => setSettings({ ...settings, heroTitle: e.target.value })}
                            style={{ padding: 10, background: 'rgba(255,255,255,0.1)', border: '1px solid #444', color: '#fff' }}
                        />
                        <label>Hero Subtitle</label>
                        <input
                            type="text"
                            value={settings.heroSubtitle}
                            onChange={e => setSettings({ ...settings, heroSubtitle: e.target.value })}
                            style={{ padding: 10, background: 'rgba(255,255,255,0.1)', border: '1px solid #444', color: '#fff' }}
                        />
                    </div>
                </section>

                <hr style={{ opacity: 0.1 }} />

                <section>
                    <h3>Bio Section</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <label>Bio Title</label>
                        <input
                            type="text"
                            value={settings.bioTitle}
                            onChange={e => setSettings({ ...settings, bioTitle: e.target.value })}
                            style={{ padding: 10, background: 'rgba(255,255,255,0.1)', border: '1px solid #444', color: '#fff' }}
                        />
                        <label>Paragraph 1</label>
                        <textarea
                            rows={3}
                            value={settings.bioText1}
                            onChange={e => setSettings({ ...settings, bioText1: e.target.value })}
                            style={{ padding: 10, background: 'rgba(255,255,255,0.1)', border: '1px solid #444', color: '#fff' }}
                        />
                        <label>Paragraph 2</label>
                        <textarea
                            rows={3}
                            value={settings.bioText2}
                            onChange={e => setSettings({ ...settings, bioText2: e.target.value })}
                            style={{ padding: 10, background: 'rgba(255,255,255,0.1)', border: '1px solid #444', color: '#fff' }}
                        />
                        <label>Quote</label>
                        <input
                            type="text"
                            value={settings.quote}
                            onChange={e => setSettings({ ...settings, quote: e.target.value })}
                            style={{ padding: 10, background: 'rgba(255,255,255,0.1)', border: '1px solid #444', color: '#fff' }}
                        />
                    </div>
                </section>

                <hr style={{ opacity: 0.1 }} />

                <section>
                    <h3>Contact & Socials</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <label>Email</label>
                        <input
                            type="email"
                            value={settings.contactEmail}
                            onChange={e => setSettings({ ...settings, contactEmail: e.target.value })}
                            style={{ padding: 10, background: 'rgba(255,255,255,0.1)', border: '1px solid #444', color: '#fff' }}
                        />
                        <label>TikTok URL</label>
                        <input
                            type="text"
                            value={settings.tiktok}
                            onChange={e => setSettings({ ...settings, tiktok: e.target.value })}
                            style={{ padding: 10, background: 'rgba(255,255,255,0.1)', border: '1px solid #444', color: '#fff' }}
                        />
                        <label>Instagram URL</label>
                        <input
                            type="text"
                            value={settings.instagram}
                            onChange={e => setSettings({ ...settings, instagram: e.target.value })}
                            style={{ padding: 10, background: 'rgba(255,255,255,0.1)', border: '1px solid #444', color: '#fff' }}
                        />
                    </div>
                </section>

                <hr style={{ opacity: 0.1 }} />

                <section>
                    <h3>Projects</h3>
                    {settings.projects.map((proj, idx) => (
                        <div key={idx} style={{ marginBottom: 20, padding: 15, border: '1px solid #444', borderRadius: 10 }}>
                            <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                                <input placeholder="Icon (Emoji)" value={proj.icon} onChange={e => {
                                    const newP = [...settings.projects];
                                    newP[idx].icon = e.target.value;
                                    setSettings({ ...settings, projects: newP });
                                }} style={{ width: 60, padding: 8, background: '#222', color: '#fff' }} />
                                <input placeholder="Title" value={proj.title} onChange={e => {
                                    const newP = [...settings.projects];
                                    newP[idx].title = e.target.value;
                                    setSettings({ ...settings, projects: newP });
                                }} style={{ flex: 1, padding: 8, background: '#222', color: '#fff' }} />
                            </div>
                            <textarea placeholder="Description" value={proj.desc} onChange={e => {
                                const newP = [...settings.projects];
                                newP[idx].desc = e.target.value;
                                setSettings({ ...settings, projects: newP });
                            }} style={{ width: '100%', padding: 8, background: '#222', color: '#fff', marginBottom: 10 }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <input placeholder="Tag" value={proj.tag} onChange={e => {
                                    const newP = [...settings.projects];
                                    newP[idx].tag = e.target.value;
                                    setSettings({ ...settings, projects: newP });
                                }} style={{ padding: 8, background: '#222', color: '#fff' }} />
                                <button type="button" onClick={() => {
                                    setSettings({ ...settings, projects: settings.projects.filter((_, i) => i !== idx) });
                                }} style={{ color: 'red', background: 'none', border: 0 }}>Remove</button>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={() => setSettings({ ...settings, projects: [...settings.projects, { icon: '🚀', title: '', desc: '', tag: '' }] })} className="btn" style={{ fontSize: '0.8rem' }}>+ Add Project</button>
                </section>

                <hr style={{ opacity: 0.1 }} />

                <section>
                    <h3>Products (Gumroad, etc)</h3>
                    {settings.products.map((prod, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                            <input placeholder="Label" value={prod.name} onChange={e => {
                                const newP = [...settings.products];
                                newP[idx].name = e.target.value;
                                setSettings({ ...settings, products: newP });
                            }} style={{ flex: 1, padding: 8, background: '#222', color: '#fff' }} />
                            <input placeholder="URL" value={prod.url} onChange={e => {
                                const newP = [...settings.products];
                                newP[idx].url = e.target.value;
                                setSettings({ ...settings, products: newP });
                            }} style={{ flex: 2, padding: 8, background: '#222', color: '#fff' }} />
                            <button type="button" onClick={() => {
                                setSettings({ ...settings, products: settings.products.filter((_, i) => i !== idx) });
                            }} style={{ color: 'red', background: 'none', border: 0 }}>X</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => setSettings({ ...settings, products: [...settings.products, { name: '', url: '' }] })} className="btn" style={{ fontSize: '0.8rem' }}>+ Add Product</button>
                </section>

                <button type="submit" className="btn glow" disabled={saving} style={{ marginTop: 20 }}>
                    {saving ? 'Saving...' : 'Save Settings'}
                </button>
            </form>
        </main>
    );
}

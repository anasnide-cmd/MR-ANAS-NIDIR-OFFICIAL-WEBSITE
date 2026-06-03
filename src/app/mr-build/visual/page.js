'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../../lib/firebase';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { 
    ChevronLeft, 
    Save, 
    Play, 
    Download, 
    Layout, 
    Smartphone, 
    Monitor, 
    Plus, 
    Trash, 
    ArrowUp, 
    ArrowDown, 
    Sliders, 
    Code, 
    Sparkles, 
    FileText,
    Grid,
    Link as LinkIcon,
    Palette
} from 'lucide-react';
import Loader from '../../../components/Loader';

// Initial Template Data
const DEFAULT_SECTIONS = [
    {
        id: 'navbar-1',
        type: 'navbar',
        brand: 'NEX BUILDER',
        bg: '#050508',
        color: '#00f0ff',
        links: [
            { text: 'Home', url: '#' },
            { text: 'Specs', url: '#specs' },
            { text: 'Connect', url: '#connect' }
        ]
    },
    {
        id: 'hero-1',
        type: 'hero',
        title: 'BUILD THE NEON FUTURE',
        subtitle: 'Drag sections, customize colors, and launch responsive websites visually without writing single line of code.',
        buttonText: 'LAUNCH PROJECT',
        buttonUrl: '#specs',
        buttonBg: '#00f0ff',
        buttonColor: '#000000',
        bg: '#090a14',
        color: '#ffffff'
    },
    {
        id: 'features-1',
        type: 'features',
        title: 'WIDGET CAPABILITIES',
        bg: '#050508',
        color: '#ffffff',
        cardBg: '#0e0f19',
        cardBorder: 'rgba(0, 240, 255, 0.1)',
        items: [
            { icon: '⚡', title: 'Live Compilation', desc: 'Generates clean, semantic HTML and CSS inline as you edit.' },
            { icon: '📱', title: 'Responsive Core', desc: 'Auto-adapts to phones and desktop viewports out of the box.' },
            { icon: '🚀', title: 'Cloud Deploy', desc: 'Deploys directly to the public web with customizable routing.' }
        ]
    },
    {
        id: 'footer-1',
        type: 'footer',
        text: '© 2026 MR BUILD VISUAL CORE. ALL RIGHTS RESERVED.',
        bg: '#030305',
        color: '#888888'
    }
];

function compileVisualToCode(sections, name) {
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name || 'My Visual Website'}</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=Orbitron:wght@800;900&display=swap" rel="stylesheet">
</head>
<body>
`;

    sections.forEach(sec => {
        if (sec.type === 'navbar') {
            html += `    <nav class="navbar" style="background: ${sec.bg}; color: ${sec.color};">
        <div class="brand">${sec.brand}</div>
        <div class="nav-links">
            ${sec.links.map(l => `<a href="${l.url}" style="color: ${sec.color};">${l.text}</a>`).join('\n            ')}
        </div>
    </nav>\n`;
        } else if (sec.type === 'hero') {
            html += `    <header class="hero-section" style="background: ${sec.bg}; color: ${sec.color};">
        <h1 class="hero-title">${sec.title}</h1>
        <p class="hero-subtitle">${sec.subtitle}</p>
        <a href="${sec.buttonUrl}" class="btn-hero" style="background: ${sec.buttonBg}; color: ${sec.buttonColor};">${sec.buttonText}</a>
    </header>\n`;
        } else if (sec.type === 'features') {
            html += `    <section class="features-section" id="specs" style="background: ${sec.bg}; color: ${sec.color};">
        <h2 class="section-heading">${sec.title}</h2>
        <div class="features-grid">
            ${sec.items.map(item => `            <div class="feature-card" style="background: ${sec.cardBg}; border-color: ${sec.cardBorder};">
                <div class="feature-icon">${item.icon}</div>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            </div>`).join('\n')}
        </div>
    </section>\n`;
        } else if (sec.type === 'rich_text') {
            html += `    <section class="text-section" style="background: ${sec.bg}; color: ${sec.color}; text-align: ${sec.align || 'left'};">
        <h2 class="text-heading">${sec.title}</h2>
        <p class="text-content">${sec.content}</p>
    </section>\n`;
        } else if (sec.type === 'footer') {
            html += `    <footer class="footer-section" style="background: ${sec.bg}; color: ${sec.color};">
        <p>${sec.text}</p>
    </footer>\n`;
        }
    });

    html += `</body>
</html>`;

    let css = `body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background: #000;
    color: #fff;
}
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 50px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
}
.navbar .brand {
    font-family: 'Orbitron', sans-serif;
    font-weight: 900;
    font-size: 1.25rem;
    letter-spacing: 1.5px;
}
.navbar .nav-links {
    display: flex;
    gap: 24px;
}
.navbar .nav-links a {
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    transition: opacity 0.2s;
}
.navbar .nav-links a:hover {
    opacity: 0.8;
}
.hero-section {
    padding: 140px 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.hero-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 3.5rem;
    font-weight: 900;
    letter-spacing: 2px;
    margin: 0 0 20px;
    line-height: 1.2;
    background: linear-gradient(90deg, #fff, #00f0ff);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}
.hero-subtitle {
    font-size: 1.15rem;
    color: #8f9bb3;
    max-width: 600px;
    margin: 0 0 40px;
    line-height: 1.6;
}
.btn-hero {
    display: inline-block;
    padding: 15px 38px;
    border-radius: 30px;
    font-weight: 900;
    font-size: 0.95rem;
    text-decoration: none;
    box-shadow: 0 0 25px rgba(0, 240, 255, 0.25);
    transition: 0.2s;
}
.btn-hero:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 35px rgba(0, 240, 255, 0.45);
}
.features-section {
    padding: 100px 20px;
    text-align: center;
}
.section-heading {
    font-family: 'Orbitron', sans-serif;
    font-size: 2.2rem;
    font-weight: 900;
    letter-spacing: 1.5px;
    margin: 0 0 50px;
}
.features-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    max-width: 1100px;
    margin: 0 auto;
}
.feature-card {
    flex: 1;
    min-width: 280px;
    max-width: 340px;
    padding: 40px 30px;
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,0.05);
    text-align: left;
    transition: 0.3s;
}
.feature-card:hover {
    transform: translateY(-5px);
    border-color: #00f0ff;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
.feature-icon {
    font-size: 2.5rem;
    margin-bottom: 25px;
}
.feature-card h3 {
    font-size: 1.3rem;
    margin: 0 0 12px;
    font-weight: 700;
}
.feature-card p {
    color: #8f9bb3;
    font-size: 0.9rem;
    line-height: 1.6;
    margin: 0;
}
.text-section {
    padding: 80px 20px;
    max-width: 800px;
    margin: 0 auto;
}
.text-heading {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.8rem;
    font-weight: 800;
    margin: 0 0 20px;
}
.text-content {
    color: #ccc;
    font-size: 1rem;
    line-height: 1.8;
    margin: 0;
}
.footer-section {
    padding: 50px 20px;
    text-align: center;
    border-top: 1px solid rgba(255,255,255,0.05);
}
.footer-section p {
    margin: 0;
    font-size: 0.85rem;
    letter-spacing: 1px;
}
@media (max-width: 768px) {
    .navbar {
        padding: 20px;
        flex-direction: column;
        gap: 15px;
    }
    .hero-title {
        font-size: 2.2rem;
    }
    .hero-subtitle {
        font-size: 1rem;
    }
    .features-grid {
        flex-direction: column;
        align-items: center;
    }
    .feature-card {
        width: 100%;
        box-sizing: border-box;
    }
}
`;

    return {
        'index.html': { content: html, language: 'html' },
        'styles.css': { content: css, language: 'css' }
    };
}

function VisualContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const projectId = searchParams.get('id');

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [sections, setSections] = useState(DEFAULT_SECTIONS);
    const [selectedSectionId, setSelectedSectionId] = useState(null);
    const [previewMode, setPreviewMode] = useState('desktop'); // 'desktop', 'mobile'
    const [successMsg, setSuccessMsg] = useState('');
    const [localProjectId, setLocalProjectId] = useState(projectId);
    const [projectName, setProjectName] = useState('Untitled Visual Project');

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            if (!u) { router.push('/mr-build/login'); return; }
            setUser(u);

            if (projectId) {
                const docSnap = await getDoc(doc(db, 'user_sites', projectId));
                if (docSnap.exists()) {
                    setLocalProjectId(docSnap.id);
                    const data = docSnap.data();
                    setProjectName(data.name || 'Untitled Project');
                    if (data.visualData) {
                        setSections(data.visualData);
                    }
                }
            }
            setLoading(false);
        });
        return () => unsub();
    }, [projectId, router]);

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        try {
            let targetId = localProjectId;
            const compiledFiles = compileVisualToCode(sections, projectName);

            const sitePayload = {
                name: projectName,
                editorMode: 'visual',
                visualData: sections,
                files: compiledFiles,
                updatedAt: new Date().toISOString()
            };

            if (!targetId) {
                const newRef = doc(collection(db, 'user_sites'));
                targetId = newRef.id;
                await setDoc(newRef, {
                    ...sitePayload,
                    userId: user.uid,
                    id: targetId,
                    status: 'draft',
                    adminStatus: 'active',
                    slug: `visual-${targetId.substring(0, 6)}`,
                    views: 0,
                    createdAt: new Date().toISOString()
                });
                setLocalProjectId(targetId);
                router.replace(`/mr-build/visual?id=${targetId}`);
            } else {
                await setDoc(doc(db, 'user_sites', targetId), sitePayload, { merge: true });
            }
            setSuccessMsg('Visual design synchronized.');
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (err) {
            console.error(err);
            alert('Save failed: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    const addSection = (type) => {
        const id = `${type}-${Date.now()}`;
        let newSec = {};

        switch(type) {
            case 'navbar':
                newSec = {
                    id, type, brand: 'NEW NAVBAR', bg: '#050508', color: '#00f0ff',
                    links: [{ text: 'Home', url: '#' }, { text: 'Contact', url: '#' }]
                };
                break;
            case 'hero':
                newSec = {
                    id, type, title: 'NEON HERO BLOCK', subtitle: 'Describe your concept here with custom tags.',
                    buttonText: 'CLICK HERE', buttonUrl: '#', buttonBg: '#a000ff', buttonColor: '#ffffff',
                    bg: '#090a14', color: '#ffffff'
                };
                break;
            case 'features':
                newSec = {
                    id, type, title: 'CORE SPECS', bg: '#000000', color: '#ffffff',
                    cardBg: '#0d0d12', cardBorder: 'rgba(255,255,255,0.05)',
                    items: [
                        { icon: '🚀', title: 'Feature 1', desc: 'Short descriptor detail.' },
                        { icon: '💎', title: 'Feature 2', desc: 'Short descriptor detail.' }
                    ]
                };
                break;
            case 'rich_text':
                newSec = {
                    id, type, title: 'DOCUMENT HEADING', content: 'Detailed semantic markdown paragraph styled for modern viewports.',
                    bg: '#050508', color: '#ffffff', align: 'left'
                };
                break;
            case 'footer':
                newSec = {
                    id, type, text: '© 2026 BRAND INC. POWERED BY MR BUILD.', bg: '#050508', color: '#888888'
                };
                break;
            default:
                return;
        }

        setSections([...sections, newSec]);
        setSelectedSectionId(id);
    };

    const moveSection = (index, direction) => {
        const nextIndex = direction === 'up' ? index - 1 : index + 1;
        if (nextIndex < 0 || nextIndex >= sections.length) return;

        const newSecs = [...sections];
        const temp = newSecs[index];
        newSecs[index] = newSecs[nextIndex];
        newSecs[nextIndex] = temp;
        setSections(newSecs);
    };

    const deleteSection = (id) => {
        setSections(sections.filter(s => s.id !== id));
        if (selectedSectionId === id) setSelectedSectionId(null);
    };

    const updateSectionProps = (id, props) => {
        setSections(sections.map(s => s.id === id ? { ...s, ...props } : s));
    };

    if (loading) return <Loader text="Loading Visual Workspace..." />;

    const selectedSec = sections.find(s => s.id === selectedSectionId);

    return (
        <div className="visual-builder">
            <header className="visual-nav">
                <div className="nav-left">
                    <button onClick={() => router.push('/mr-build/dashboard')} className="btn-back">
                        <ChevronLeft size={20} />
                    </button>
                    <input 
                        type="text" 
                        value={projectName} 
                        onChange={(e) => setProjectName(e.target.value)} 
                        className="project-name-input"
                    />
                </div>
                
                <div className="nav-center">
                    <div className="preview-selector">
                        <button className={previewMode === 'desktop' ? 'active' : ''} onClick={() => setPreviewMode('desktop')}>
                            <Monitor size={16} /> <span className="hide-mobile">DESKTOP</span>
                        </button>
                        <button className={previewMode === 'mobile' ? 'active' : ''} onClick={() => setPreviewMode('mobile')}>
                            <Smartphone size={16} /> <span className="hide-mobile">MOBILE</span>
                        </button>
                    </div>
                </div>

                <div className="nav-right">
                    {localProjectId && (
                        <button className="btn-code" onClick={() => router.push(`/mr-build/editor?id=${localProjectId}`)}>
                            <Code size={16} /> <span className="hide-mobile">CODE EDITOR</span>
                        </button>
                    )}
                    <button className="btn-save" onClick={handleSave} disabled={saving}>
                        <Save size={16} /> <span>{saving ? 'SAVING...' : 'SAVE'}</span>
                    </button>
                </div>
            </header>

            <div className="visual-main">
                <aside className="widget-panel">
                    <div className="panel-title">WIDGETS</div>
                    <div className="widget-list">
                        <button className="widget-btn" onClick={() => addSection('navbar')}>
                            <Layout size={18} />
                            <div className="widget-text">
                                <strong>Navigation</strong>
                                <p>Header Brand & Links</p>
                            </div>
                        </button>
                        <button className="widget-btn" onClick={() => addSection('hero')}>
                            <Sparkles size={18} />
                            <div className="widget-text">
                                <strong>Hero Section</strong>
                                <p>Large Callout Block</p>
                            </div>
                        </button>
                        <button className="widget-btn" onClick={() => addSection('features')}>
                            <Grid size={18} />
                            <div className="widget-text">
                                <strong>Features Grid</strong>
                                <p>Feature Columns</p>
                            </div>
                        </button>
                        <button className="widget-btn" onClick={() => addSection('rich_text')}>
                            <FileText size={18} />
                            <div className="widget-text">
                                <strong>Rich Text</strong>
                                <p>Headings & Paragraph</p>
                            </div>
                        </button>
                        <button className="widget-btn" onClick={() => addSection('footer')}>
                            <Layout size={18} style={{ transform: 'rotate(180deg)' }} />
                            <div className="widget-text">
                                <strong>Footer</strong>
                                <p>Links & Copyright</p>
                            </div>
                        </button>
                    </div>
                </aside>

                <div className="canvas-area">
                    <div className={`canvas-viewport viewport-${previewMode}`}>
                        <div className="canvas-frame">
                            {sections.length === 0 ? (
                                <div className="canvas-empty">
                                    <Plus size={32} />
                                    <h3>Empty Canvas</h3>
                                    <p>Select widgets from the left panel to build your website layout.</p>
                                </div>
                            ) : (
                                sections.map((sec, idx) => {
                                    const isSelected = selectedSectionId === sec.id;
                                    return (
                                        <div 
                                            key={sec.id} 
                                            className={`canvas-section section-${sec.type} ${isSelected ? 'selected' : ''}`}
                                            onClick={(e) => { e.stopPropagation(); setSelectedSectionId(sec.id); }}
                                            style={{ background: sec.bg, color: sec.color }}
                                        >
                                            {/* Section Floating Handles */}
                                            <div className="section-handles">
                                                <span className="section-badge">{sec.type.toUpperCase()}</span>
                                                <button onClick={(e) => { e.stopPropagation(); moveSection(idx, 'up'); }} disabled={idx === 0}><ArrowUp size={12} /></button>
                                                <button onClick={(e) => { e.stopPropagation(); moveSection(idx, 'down'); }} disabled={idx === sections.length - 1}><ArrowDown size={12} /></button>
                                                <button onClick={(e) => { e.stopPropagation(); deleteSection(sec.id); }} className="danger"><Trash size={12} /></button>
                                            </div>

                                            {/* Renders Section View */}
                                            {sec.type === 'navbar' && (
                                                <div className="navbar-render">
                                                    <div className="brand">{sec.brand}</div>
                                                    <div className="nav-links">
                                                        {sec.links.map((l, i) => <span key={i}>{l.text}</span>)}
                                                    </div>
                                                </div>
                                            )}

                                            {sec.type === 'hero' && (
                                                <div className="hero-render">
                                                    <h2>{sec.title}</h2>
                                                    <p>{sec.subtitle}</p>
                                                    <span className="btn-hero-render" style={{ background: sec.buttonBg, color: sec.buttonColor }}>{sec.buttonText}</span>
                                                </div>
                                            )}

                                            {sec.type === 'features' && (
                                                <div className="features-render">
                                                    <h2>{sec.title}</h2>
                                                    <div className="features-grid-render">
                                                        {sec.items.map((item, i) => (
                                                            <div key={i} className="card-render" style={{ background: sec.cardBg, borderColor: sec.cardBorder }}>
                                                                <span className="card-icon">{item.icon}</span>
                                                                <h3>{item.title}</h3>
                                                                <p>{item.desc}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {sec.type === 'rich_text' && (
                                                <div className="text-render" style={{ textAlign: sec.align || 'left' }}>
                                                    <h2>{sec.title}</h2>
                                                    <p>{sec.content}</p>
                                                </div>
                                            )}

                                            {sec.type === 'footer' && (
                                                <div className="footer-render">
                                                    <p>{sec.text}</p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>

                <aside className={`properties-panel ${selectedSectionId ? 'visible' : ''}`}>
                    <div className="panel-title">
                        PROPERTIES
                        {selectedSectionId && (
                            <button onClick={() => setSelectedSectionId(null)} className="close-btn">×</button>
                        )}
                    </div>
                    {selectedSec ? (
                        <div className="properties-content">
                            <div className="prop-group">
                                <label><Palette size={12} /> BACKGROUND COLOR</label>
                                <input 
                                    type="color" 
                                    value={selectedSec.bg || '#000000'} 
                                    onChange={(e) => updateSectionProps(selectedSec.id, { bg: e.target.value })} 
                                />
                            </div>
                            <div className="prop-group">
                                <label><Palette size={12} /> TEXT COLOR</label>
                                <input 
                                    type="color" 
                                    value={selectedSec.color || '#ffffff'} 
                                    onChange={(e) => updateSectionProps(selectedSec.id, { color: e.target.value })} 
                                />
                            </div>

                            <div className="divider"></div>

                            {/* Contextual Properties */}
                            {selectedSec.type === 'navbar' && (
                                <>
                                    <div className="prop-group">
                                        <label>BRAND TEXT</label>
                                        <input 
                                            type="text" 
                                            value={selectedSec.brand} 
                                            onChange={(e) => updateSectionProps(selectedSec.id, { brand: e.target.value })} 
                                        />
                                    </div>
                                    <div className="prop-group">
                                        <label>NAV LINKS (Text & URL)</label>
                                        {selectedSec.links.map((link, idx) => (
                                            <div key={idx} className="prop-row">
                                                <input 
                                                    type="text" 
                                                    value={link.text} 
                                                    placeholder="Text"
                                                    onChange={(e) => {
                                                        const newLinks = [...selectedSec.links];
                                                        newLinks[idx].text = e.target.value;
                                                        updateSectionProps(selectedSec.id, { links: newLinks });
                                                    }} 
                                                />
                                                <input 
                                                    type="text" 
                                                    value={link.url} 
                                                    placeholder="URL"
                                                    onChange={(e) => {
                                                        const newLinks = [...selectedSec.links];
                                                        newLinks[idx].url = e.target.value;
                                                        updateSectionProps(selectedSec.id, { links: newLinks });
                                                    }} 
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {selectedSec.type === 'hero' && (
                                <>
                                    <div className="prop-group">
                                        <label>HERO TITLE</label>
                                        <input 
                                            type="text" 
                                            value={selectedSec.title} 
                                            onChange={(e) => updateSectionProps(selectedSec.id, { title: e.target.value })} 
                                        />
                                    </div>
                                    <div className="prop-group">
                                        <label>HERO SUBTITLE</label>
                                        <textarea 
                                            value={selectedSec.subtitle} 
                                            onChange={(e) => updateSectionProps(selectedSec.id, { subtitle: e.target.value })} 
                                        />
                                    </div>
                                    <div className="prop-group">
                                        <label>BUTTON TEXT</label>
                                        <input 
                                            type="text" 
                                            value={selectedSec.buttonText} 
                                            onChange={(e) => updateSectionProps(selectedSec.id, { buttonText: e.target.value })} 
                                        />
                                    </div>
                                    <div className="prop-group">
                                        <label>BUTTON URL</label>
                                        <input 
                                            type="text" 
                                            value={selectedSec.buttonUrl} 
                                            onChange={(e) => updateSectionProps(selectedSec.id, { buttonUrl: e.target.value })} 
                                        />
                                    </div>
                                    <div className="prop-group">
                                        <label>BUTTON BG</label>
                                        <input 
                                            type="color" 
                                            value={selectedSec.buttonBg} 
                                            onChange={(e) => updateSectionProps(selectedSec.id, { buttonBg: e.target.value })} 
                                        />
                                    </div>
                                    <div className="prop-group">
                                        <label>BUTTON TEXT COLOR</label>
                                        <input 
                                            type="color" 
                                            value={selectedSec.buttonColor} 
                                            onChange={(e) => updateSectionProps(selectedSec.id, { buttonColor: e.target.value })} 
                                        />
                                    </div>
                                </>
                            )}

                            {selectedSec.type === 'features' && (
                                <>
                                    <div className="prop-group">
                                        <label>GRID TITLE</label>
                                        <input 
                                            type="text" 
                                            value={selectedSec.title} 
                                            onChange={(e) => updateSectionProps(selectedSec.id, { title: e.target.value })} 
                                        />
                                    </div>
                                    <div className="prop-group">
                                        <label>CARD BACKGROUND</label>
                                        <input 
                                            type="color" 
                                            value={selectedSec.cardBg} 
                                            onChange={(e) => updateSectionProps(selectedSec.id, { cardBg: e.target.value })} 
                                        />
                                    </div>
                                    <div className="prop-group">
                                        <label>CARD BORDER COLOR</label>
                                        <input 
                                            type="text" 
                                            value={selectedSec.cardBorder} 
                                            placeholder="rgba(255,255,255,0.05)"
                                            onChange={(e) => updateSectionProps(selectedSec.id, { cardBorder: e.target.value })} 
                                        />
                                    </div>
                                    <div className="prop-group">
                                        <label>GRID FEATURES</label>
                                        {selectedSec.items.map((item, idx) => (
                                            <div key={idx} className="prop-feature-edit">
                                                <div className="prop-row">
                                                    <input 
                                                        type="text" 
                                                        value={item.icon} 
                                                        placeholder="Icon"
                                                        style={{ width: '40px' }}
                                                        onChange={(e) => {
                                                            const newItems = [...selectedSec.items];
                                                            newItems[idx].icon = e.target.value;
                                                            updateSectionProps(selectedSec.id, { items: newItems });
                                                        }} 
                                                    />
                                                    <input 
                                                        type="text" 
                                                        value={item.title} 
                                                        placeholder="Title"
                                                        onChange={(e) => {
                                                            const newItems = [...selectedSec.items];
                                                            newItems[idx].title = e.target.value;
                                                            updateSectionProps(selectedSec.id, { items: newItems });
                                                        }} 
                                                    />
                                                </div>
                                                <textarea 
                                                    value={item.desc} 
                                                    placeholder="Description"
                                                    onChange={(e) => {
                                                        const newItems = [...selectedSec.items];
                                                        newItems[idx].desc = e.target.value;
                                                        updateSectionProps(selectedSec.id, { items: newItems });
                                                    }} 
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {selectedSec.type === 'rich_text' && (
                                <>
                                    <div className="prop-group">
                                        <label>HEADING</label>
                                        <input 
                                            type="text" 
                                            value={selectedSec.title} 
                                            onChange={(e) => updateSectionProps(selectedSec.id, { title: e.target.value })} 
                                        />
                                    </div>
                                    <div className="prop-group">
                                        <label>TEXT CONTENT</label>
                                        <textarea 
                                            value={selectedSec.content} 
                                            onChange={(e) => updateSectionProps(selectedSec.id, { content: e.target.value })} 
                                        />
                                    </div>
                                    <div className="prop-group">
                                        <label>ALIGNMENT</label>
                                        <select 
                                            value={selectedSec.align || 'left'} 
                                            onChange={(e) => updateSectionProps(selectedSec.id, { align: e.target.value })}
                                        >
                                            <option value="left">LEFT</option>
                                            <option value="center">CENTER</option>
                                            <option value="right">RIGHT</option>
                                        </select>
                                    </div>
                                </>
                            )}

                            {selectedSec.type === 'footer' && (
                                <>
                                    <div className="prop-group">
                                        <label>COPYRIGHT TEXT</label>
                                        <input 
                                            type="text" 
                                            value={selectedSec.text} 
                                            onChange={(e) => updateSectionProps(selectedSec.id, { text: e.target.value })} 
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="properties-empty">
                            Select a section on the canvas to configure properties.
                        </div>
                    )}
                </aside>
            </div>

            {successMsg && <div className="toast">{successMsg}</div>}

            <style jsx>{`
                .visual-builder { height: 100dvh; display: flex; flex-direction: column; background: #050508; color: #fff; overflow: hidden; font-family: 'Inter', sans-serif; }
                .visual-nav { height: 60px; background: #000; border-bottom: 1px solid rgba(0, 240, 255, 0.15); display: flex; justify-content: space-between; align-items: center; padding: 0 20px; flex-shrink: 0; }
                .nav-left, .nav-center, .nav-right { display: flex; align-items: center; gap: 12px; }
                
                .btn-back { background: transparent; border: none; color: #888; cursor: pointer; display: flex; align-items: center; transition: 0.2s; }
                .btn-back:hover { color: #00f0ff; }
                .project-name-input { background: transparent; border: 1px solid transparent; color: #fff; font-family: 'Orbitron'; font-size: 0.9rem; font-weight: 700; outline: none; padding: 4px 8px; border-radius: 4px; transition: 0.2s; max-width: 250px; }
                .project-name-input:focus { border-color: rgba(0, 240, 255, 0.3); background: rgba(255,255,255,0.02); }

                .preview-selector { display: flex; background: #0d0d12; padding: 4px; border-radius: 8px; gap: 4px; border: 1px solid rgba(255,255,255,0.05); }
                .preview-selector button { background: transparent; border: none; color: #666; font-size: 0.7rem; font-weight: 800; padding: 6px 12px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: 0.2s; }
                .preview-selector button.active { background: rgba(0, 240, 255, 0.08); color: #00f0ff; box-shadow: 0 0 10px rgba(0, 240, 255, 0.1); }
                
                .btn-code, .btn-save { background: rgba(0, 240, 255, 0.08); border: 1px solid rgba(0, 240, 255, 0.3); color: #00f0ff; padding: 6px 16px; border-radius: 20px; font-weight: 800; font-size: 0.75rem; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: 0.2s; }
                .btn-code:hover { background: rgba(0, 240, 255, 0.15); box-shadow: 0 0 15px rgba(0, 240, 255, 0.2); }
                .btn-save { background: #00f0ff; color: #000; border: none; box-shadow: 0 0 15px rgba(0, 240, 255, 0.3); }
                .btn-save:hover { box-shadow: 0 0 25px rgba(0, 240, 255, 0.5); transform: translateY(-1px); }

                .visual-main { flex: 1; display: flex; overflow: hidden; position: relative; }
                
                /* Widgets Sidebar */
                .widget-panel { width: 250px; background: rgba(5,5,8,0.5); backdrop-filter: blur(20px); border-right: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; flex-shrink: 0; }
                .panel-title { padding: 15px 20px; font-size: 0.7rem; font-family: 'Orbitron'; color: #444; font-weight: 800; letter-spacing: 1px; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; }
                .widget-list { flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 10px; }
                .widget-btn { display: flex; align-items: center; gap: 15px; padding: 12px 15px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; color: rgba(255,255,255,0.6); text-align: left; cursor: pointer; transition: 0.2s; }
                .widget-btn:hover { background: rgba(0, 240, 255, 0.05); border-color: rgba(0, 240, 255, 0.3); color: #00f0ff; }
                .widget-text strong { display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 2px; }
                .widget-text p { font-size: 0.7rem; opacity: 0.6; margin: 0; }

                /* Properties Sidebar */
                .properties-panel { width: 300px; background: rgba(5,5,8,0.5); backdrop-filter: blur(20px); border-left: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; flex-shrink: 0; transform: translateX(100%); transition: 0.3s cubic-bezier(0.19, 1, 0.22, 1); }
                .properties-panel.visible { transform: translateX(0); }
                .properties-content { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 20px; }
                .properties-empty { flex: 1; display: flex; align-items: center; justify-content: center; padding: 40px; text-align: center; color: #444; font-size: 0.85rem; }
                .close-btn { background: none; border: none; color: #888; font-size: 1.5rem; cursor: pointer; transition: 0.2s; }
                .close-btn:hover { color: #fff; }

                .prop-group { display: flex; flex-direction: column; gap: 8px; }
                .prop-group label { font-size: 0.65rem; font-weight: 800; color: #666; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px; }
                .prop-group input[type="text"], .prop-group select, .prop-group textarea { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 10px; border-radius: 8px; color: #fff; font-size: 0.85rem; outline: none; transition: 0.2s; }
                .prop-group input[type="text"]:focus, .prop-group select:focus, .prop-group textarea:focus { border-color: rgba(0, 240, 255, 0.4); background: rgba(0, 240, 255, 0.02); }
                .prop-group textarea { height: 80px; resize: none; }
                .prop-group input[type="color"] { -webkit-appearance: none; border: none; width: 100%; height: 35px; border-radius: 8px; cursor: pointer; background: transparent; }
                .prop-group input[type="color"]::-webkit-color-swatch-wrapper { padding: 0; }
                .prop-group input[type="color"]::-webkit-color-swatch { border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; }
                
                .prop-row { display: flex; gap: 10px; }
                .prop-row input { flex: 1; }
                .prop-feature-edit { background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.03); padding: 10px; border-radius: 8px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 10px; }

                /* Canvas Area */
                .canvas-area { flex: 1; background: #0c0d12; overflow-y: auto; padding: 40px 20px; display: flex; justify-content: center; position: relative; background-image: radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px); background-size: 20px 20px; }
                .canvas-viewport { background: #000; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.8); overflow: hidden; transition: width 0.3s cubic-bezier(0.19, 1, 0.22, 1); min-height: 500px; }
                .viewport-desktop { width: 100%; max-width: 960px; }
                .viewport-mobile { width: 375px; }
                .canvas-frame { width: 100%; height: 100%; display: flex; flex-direction: column; background: #000; position: relative; }
                
                .canvas-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 100px 40px; text-align: center; color: #333; }
                .canvas-empty h3 { color: #666; margin: 15px 0 5px; }
                .canvas-empty p { font-size: 0.85rem; max-width: 300px; opacity: 0.6; }

                /* Canvas Element Styles */
                .canvas-section { position: relative; padding: 40px 30px; transition: 0.2s; border: 2px solid transparent; cursor: pointer; }
                .canvas-section:hover { border-color: rgba(0, 240, 255, 0.3); }
                .canvas-section.selected { border-color: #00f0ff; box-shadow: 0 0 20px rgba(0, 240, 255, 0.15); }
                
                .section-handles { position: absolute; top: 10px; right: 10px; display: none; gap: 4px; background: #0d0d12; border: 1px solid rgba(255,255,255,0.05); padding: 4px; border-radius: 6px; z-index: 50; }
                .canvas-section:hover .section-handles { display: flex; }
                .section-handles button { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); color: #888; border-radius: 4px; padding: 4px; cursor: pointer; display: flex; align-items: center; transition: 0.2s; }
                .section-handles button:hover:not(:disabled) { color: #00f0ff; background: rgba(0,240,255,0.05); }
                .section-handles button.danger:hover { color: #ff4444; background: rgba(255,68,68,0.05); }
                .section-handles button:disabled { opacity: 0.3; cursor: not-allowed; }
                .section-badge { font-size: 8px; font-weight: 900; letter-spacing: 0.5px; color: #00f0ff; padding: 4px 8px; background: rgba(0, 240, 255, 0.08); border-radius: 4px; display: flex; align-items: center; }

                /* Render Styling Templates */
                .navbar-render { display: flex; justify-content: space-between; align-items: center; width: 100%; border-bottom: 1px solid rgba(255,255,255,0.03); padding-bottom: 10px; }
                .navbar-render .brand { font-family: 'Orbitron'; font-weight: 900; font-size: 1.1rem; letter-spacing: 1px; }
                .navbar-render .nav-links { display: flex; gap: 15px; font-size: 0.8rem; font-weight: 600; opacity: 0.8; }
                
                .hero-render { text-align: center; padding: 60px 10px; display: flex; flex-direction: column; align-items: center; }
                .hero-render h2 { font-family: 'Orbitron'; font-size: 2rem; font-weight: 900; letter-spacing: 1px; margin: 0 0 15px; }
                .hero-render p { font-size: 0.9rem; opacity: 0.7; max-width: 500px; margin: 0 0 25px; line-height: 1.5; }
                .btn-hero-render { padding: 10px 25px; border-radius: 20px; font-weight: 900; font-size: 0.8rem; }

                .features-render h2 { font-family: 'Orbitron'; font-size: 1.5rem; text-align: center; margin: 0 0 35px; }
                .features-grid-render { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; width: 100%; }
                .card-render { padding: 25px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); }
                .card-icon { font-size: 1.8rem; display: block; margin-bottom: 15px; }
                .card-render h3 { font-size: 1.05rem; font-weight: 700; margin: 0 0 8px; }
                .card-render p { font-size: 0.8rem; opacity: 0.6; line-height: 1.5; margin: 0; }

                .text-render h2 { font-family: 'Orbitron'; font-size: 1.4rem; margin: 0 0 15px; }
                .text-render p { font-size: 0.9rem; opacity: 0.8; line-height: 1.6; margin: 0; }

                .footer-render { text-align: center; font-size: 0.75rem; color: #555; }
                .footer-render p { margin: 0; }

                .divider { height: 1px; background: rgba(255,255,255,0.05); margin: 10px 0; }
                .toast { position: fixed; bottom: 30px; right: 30px; background: #00f0ff; color: #000; padding: 10px 20px; border-radius: 8px; font-weight: 800; font-size: 0.8rem; animation: slideUp 0.3s; z-index: 1000; }
                @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

                @media (max-width: 768px) {
                    .hide-mobile { display: none !important; }
                    .visual-nav { padding: 0 10px; }
                    .project-name-input { max-width: 150px; font-size: 0.8rem; }
                    .widget-panel { width: 70px; }
                    .widget-text { display: none; }
                    .widget-btn { justify-content: center; padding: 12px; }
                    .properties-panel { position: absolute; top: 0; right: 0; bottom: 0; z-index: 100; box-shadow: -10px 0 30px rgba(0,0,0,0.5); }
                    .canvas-viewport { max-width: 100%; }
                    .canvas-area { padding: 10px; }
                }
            `}</style>
        </div>
    );
}

export default function VisualPage() {
    return (
        <Suspense fallback={<Loader text="Initializing Visual Workspace..." />}>
            <VisualContent />
        </Suspense>
    );
}

'use client';
import { useState, useEffect, Suspense } from 'react';
import { db } from '../../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useParams } from 'next/navigation';

function UserSiteContent() {
    const { slug } = useParams();
    const [site, setSite] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSite = async () => {
            const q = query(collection(db, 'user_sites'), where('slug', '==', slug));
            const snap = await getDocs(q);
            if (!snap.empty) {
                setSite(snap.docs[0].data());
            }
            setLoading(false);
        };
        if (slug) fetchSite();
    }, [slug]);

    if (loading) return <div className="loading">Initializing Neural Node...</div>;

    if (!site) return (
        <div className="not-found">
            <h1>404: Node Offline</h1>
            <p>The digital architecture you're looking for is currently offline or non-existent.</p>
        </div>
    );

    return (
        <div className={`site-wrapper theme-${site.theme}`}>
            <div className="grid-overlay"></div>

            <header className="site-header">
                <div className="logo-circ">
                    <span>{site.title?.charAt(0)}</span>
                </div>
                <h1 className="glow-text">{site.title}</h1>
                <p className="description">{site.description}</p>
            </header>

            <main className="content">
                <div className="glass-panel">
                    <h3>SOCIAL TERMINALS</h3>
                    <div className="social-links">
                        {site.socials?.instagram && (
                            <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="social-tag">INSTAGRAM</a>
                        )}
                        {site.socials?.tiktok && (
                            <a href={site.socials.tiktok} target="_blank" rel="noopener noreferrer" className="social-tag">TIKTOK</a>
                        )}
                        {site.socials?.twitter && (
                            <a href={site.socials.twitter} target="_blank" rel="noopener noreferrer" className="social-tag">TWITTER</a>
                        )}
                        {(!site.socials?.instagram && !site.socials?.tiktok && !site.socials?.twitter) && (
                            <p style={{ opacity: 0.3, fontStyle: 'italic' }}>No social links configured</p>
                        )}
                    </div>
                </div>
            </main>

            <footer className="site-footer">
                <p>Architected via <strong>MR BUILD PRO</strong></p>
            </footer>

            <style jsx>{`
                .site-wrapper {
                    min-height: 100vh;
                    background: #020202;
                    color: #fff;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                    text-align: center;
                    padding: 40px;
                }
                .grid-overlay {
                    position: absolute; inset: 0;
                    background-image: 
                        linear-gradient(rgba(0, 240, 255, 0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 240, 255, 0.05) 1px, transparent 1px);
                    background-size: 50px 50px;
                    mask-image: radial-gradient(circle at 50% 50%, black, transparent 80%);
                }

                .site-header { position: relative; z-index: 2; margin-bottom: 50px; }
                .logo-circ {
                    width: 100px; height: 100px;
                    background: linear-gradient(135deg, #00f0ff 0%, #0064e0 100%);
                    border-radius: 50%; margin: 0 auto 30px;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 3rem; font-weight: 950;
                    box-shadow: 0 0 30px rgba(0, 240, 255, 0.4);
                }
                .glow-text {
                    font-size: 4rem; font-weight: 950; letter-spacing: -2px;
                    margin-bottom: 15px; text-transform: uppercase;
                }
                .description { font-size: 1.2rem; opacity: 0.6; max-width: 600px; margin: 0 auto; line-height: 1.6; }

                .content { position: relative; z-index: 2; width: 100%; max-width: 500px; }
                .glass-panel {
                    padding: 40px; border-radius: 30px;
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .glass-panel h3 { font-size: 0.8rem; letter-spacing: 4px; opacity: 0.4; margin-bottom: 30px; }
                .social-links { display: flex; justify-content: center; gap: 20px; }
                .social-tag {
                    padding: 12px 25px; border-radius: 100px;
                    border: 1px solid rgba(0, 240, 255, 0.3);
                    color: #00f0ff; text-decoration: none;
                    font-weight: 800; font-size: 0.8rem; letter-spacing: 1px;
                    transition: all 0.3s;
                }
                .social-tag:hover { background: #00f0ff; color: #000; box-shadow: 0 0 20px rgba(0, 240, 255, 0.5); }

                .site-footer { position: absolute; bottom: 40px; width: 100%; opacity: 0.3; font-size: 0.8rem; letter-spacing: 2px; }

                /* Dark Nebula (default) */
                .theme-dark-nebula .logo-circ { background: linear-gradient(135deg, #00f0ff 0%, #0064e0 100%); box-shadow: 0 0 30px rgba(0, 240, 255, 0.4); }
                .theme-dark-nebula .social-tag { border-color: rgba(0, 240, 255, 0.3); color: #00f0ff; }
                .theme-dark-nebula .social-tag:hover { background: #00f0ff; box-shadow: 0 0 20px rgba(0, 240, 255, 0.5); }

                /* Liquid Gold */
                .theme-liquid-gold .logo-circ { background: linear-gradient(135deg, #ffd700 0%, #ff8c00 100%); box-shadow: 0 0 30px rgba(255, 215, 0, 0.4); }
                .theme-liquid-gold .glow-text { color: #ffd700; }
                .theme-liquid-gold .social-tag { border-color: rgba(255, 215, 0, 0.3); color: #ffd700; }
                .theme-liquid-gold .social-tag:hover { background: #ffd700; color: #000; box-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
                .theme-liquid-gold .grid-overlay { background-image: linear-gradient(rgba(255, 215, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 215, 0, 0.05) 1px, transparent 1px); }

                /* Cyber Grid */
                .theme-cyber-grid .glow-text { color: #00ff88; }
                .theme-cyber-grid .logo-circ { background: linear-gradient(135deg, #00ff88 0%, #0088ff 100%); box-shadow: 0 0 30px rgba(0, 255, 136, 0.4); }
                .theme-cyber-grid .social-tag { border-color: rgba(0, 255, 136, 0.3); color: #00ff88; }
                .theme-cyber-grid .social-tag:hover { background: #00ff88; color: #000; box-shadow: 0 0 20px rgba(0, 255, 136, 0.5); }
                .theme-cyber-grid .grid-overlay { background-image: linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px); }

                .loading, .not-found { height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #00f0ff; text-align: center; }
                .not-found h1 { font-size: 3rem; margin-bottom: 20px; }

                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            `}</style>
        </div>
    );
}

export default function UserSitePage() {
    return (
        <Suspense fallback={<div className="loading">Syncing...</div>}>
            <UserSiteContent />
        </Suspense>
    );
}

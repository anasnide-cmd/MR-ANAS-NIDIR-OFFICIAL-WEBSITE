'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function AppLauncher() {
    const [isOpen, setIsOpen] = useState(false);

    const apps = [
        { name: 'Account', icon: '👤', url: '/mr-build' }, // Redirect to dashboard as "Account"
        { name: 'Search', icon: '🔍', url: '/mr-search' },
        { name: 'Mr Build', icon: '🏗️', url: '/mr-build' },
        { name: 'Portfolio', icon: '🌐', url: '/' },
        { name: 'Blog', icon: '📰', url: '/blog' },
        { name: 'Admin', icon: '🛡️', url: '/admin' },
        { name: 'Analytics', icon: '📈', url: '/#stats' }, // Anchor on home
        { name: 'Cloud', icon: '☁️', url: '/mr-build' }, // Placeholder
        { name: 'Contact', icon: '✉️', url: '/#contact' },
    ];

    return (
        <div className="app-launcher-container">
            <button 
                className={`btn-launcher ${isOpen ? 'active' : ''}`} 
                onClick={() => setIsOpen(!isOpen)}
                title="MR ANAS NIDIR APPS"
            >
                <div className="grid-icon">
                    {[...Array(9)].map((_, i) => <span key={i} className="dot"></span>)}
                </div>
            </button>

            {isOpen && (
                <div className="launcher-dropdown glass">
                    <div className="apps-grid">
                        {apps.map((app, idx) => (
                            <Link key={idx} href={app.url} className="app-item">
                                <span className="app-icon">{app.icon}</span>
                                <span className="app-name">{app.name}</span>
                            </Link>
                        ))}
                    </div>
                    {/* Overlay to close when clicking outside could be added here or strictly controlled */}
                </div>
            )}
            
            {isOpen && <div className="click-outside" onClick={() => setIsOpen(false)}></div>}

            <style jsx>{`
                .app-launcher-container {
                    position: relative;
                }
                
                .btn-launcher {
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 12px;
                    border-radius: 50%;
                    transition: all 0.2s;
                    display: flex; align-items: center; justify-content: center;
                }
                .btn-launcher:hover, .btn-launcher.active {
                    background: rgba(255, 255, 255, 0.1);
                }

                .grid-icon {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 4px;
                    width: 20px; height: 20px;
                }
                .dot {
                    width: 4px; height: 4px;
                    background-color: rgba(255, 255, 255, 0.7);
                    border-radius: 50%;
                }
                .btn-launcher:hover .dot { background-color: #fff; }

                .launcher-dropdown {
                    position: absolute;
                    top: 50px;
                    right: 0; // Align right
                    width: 320px;
                    background: rgba(20, 20, 20, 0.95);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    padding: 20px;
                    z-index: 200;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
                    transform-origin: top right;
                    animation: popIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
                }
                @keyframes popIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }

                .apps-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 10px;
                }

                .app-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 15px 5px;
                    border-radius: 15px;
                    text-decoration: none;
                    color: #fff;
                    transition: background 0.2s;
                }
                .app-item:hover {
                    background: rgba(255, 255, 255, 0.1);
                }

                .app-icon { font-size: 2rem; margin-bottom: 8px; }
                .app-name { font-size: 0.8rem; opacity: 0.8; font-weight: 500; }

                .click-outside {
                    position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 105;
                }
            `}</style>
        </div>
    );
}

'use client';
import { useState } from 'react';

export default function SearchControlMenu({ onThemeToggle, onOpenSettings }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="control-menu-container">
            <button className="btn-dots" onClick={() => setIsOpen(!isOpen)}>
                ⋮
            </button>
            <div className={`menu-dropdown ${isOpen ? 'open' : ''}`}>
                 <div className="menu-item" onClick={() => { setIsOpen(false); onThemeToggle(); }}>
                     <span>Switch Theme</span>
                     <span>🎨</span>
                 </div>
                 <div className="menu-item" onClick={() => { setIsOpen(false); onOpenSettings(); }}>
                     <span>Search Settings</span>
                     <span>🔧</span>
                 </div>
                 <div className="menu-divider"></div>
                 <div className="menu-item" onClick={() => { setIsOpen(false); alert('Incognito Mode Activated (Simulation)'); }}>
                     <span>New Incognito Window</span>
                     <span>🕵️</span>
                 </div>
                 <div className="menu-divider"></div>
                 <div className="menu-item" style={{color: '#ff3232'}}>
                     <small>MR ANAS NIDIR ENGINE v1.1</small>
                 </div>
            </div>

            <style jsx>{`
                .control-menu-container {
                    position: relative;
                    z-index: 100;
                }
                .btn-dots {
                    background: transparent;
                    border: none;
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 10px;
                    border-radius: 50%;
                    transition: all 0.3s;
                }
                .btn-dots:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: #fff;
                }
                .menu-dropdown {
                    position: absolute;
                    top: 40px;
                    right: 0;
                    width: 250px;
                    background: rgba(10, 10, 10, 0.95);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    padding: 10px;
                    backdrop-filter: blur(20px);
                    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
                    display: none;
                }
                .menu-dropdown.open { display: block; animation: openMenu 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
                @keyframes openMenu { from { opacity: 0; transform: scale(0.95) translate(10px, -10px); } to { opacity: 1; transform: scale(1) translate(0, 0); } }

                .menu-item {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 12px 15px;
                    color: #fff;
                    font-family: var(--font-exo2);
                    font-size: 0.9rem;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .menu-item:hover { background: rgba(255, 255, 255, 0.05); }
                .menu-item span { opacity: 0.7; }
                .menu-divider { height: 1px; background: rgba(255, 255, 255, 0.1); margin: 5px 0; }
            `}</style>
        </div>
    );
}

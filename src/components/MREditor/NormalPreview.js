'use client';
import { RefreshCw, Shield, ChevronLeft, ChevronRight } from 'lucide-react';

export default function NormalPreview({ srcDoc }) {
    const handleRefresh = () => {
        const iframe = document.getElementById('preview-iframe');
        if (iframe) iframe.srcdoc = srcDoc;
    };

    return (
        <div className="normal-preview-container">
            <div className="preview-header">
                <div className="window-controls">
                    <span className="dot close"></span>
                    <span className="dot minimize"></span>
                    <span className="dot maximize"></span>
                </div>
                
                <div className="navigation-controls">
                    <ChevronLeft size={14} className="nav-icon disabled" />
                    <ChevronRight size={14} className="nav-icon disabled" />
                    <RefreshCw size={14} className="nav-icon active" onClick={handleRefresh} />
                </div>

                <div className="address-bar">
                    <Shield size={10} className="secure-icon" />
                    <span>localhost:3000/mr-build/preview</span>
                </div>

                <div className="header-right">
                    <div className="menu-dot"></div>
                    <div className="menu-dot"></div>
                    <div className="menu-dot"></div>
                </div>
            </div>
            
            <div className="iframe-wrapper">
                <iframe
                    id="preview-iframe"
                    srcDoc={srcDoc}
                    title="Normal Preview"
                    sandbox="allow-scripts allow-forms allow-popups allow-modals allow-same-origin"
                />
            </div>

            <style jsx>{`
                .normal-preview-container {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    background: #111;
                    border-radius: 12px;
                    overflow: hidden;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    box-shadow: 0 20px 50px rgba(0,0,0,0.4);
                }
                
                .preview-header {
                    height: 40px;
                    background: #1a1a1a;
                    display: flex;
                    align-items: center;
                    padding: 0 16px;
                    gap: 16px;
                    border-bottom: 1px solid #2a2a2a;
                    user-select: none;
                }
                
                .window-controls {
                    display: flex;
                    gap: 8px;
                }
                
                .dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                }
                .dot.close { background: #ff5f56; }
                .dot.minimize { background: #ffbd2e; }
                .dot.maximize { background: #27c93f; }
                
                .navigation-controls {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: #555;
                }
                
                .nav-icon {
                    cursor: pointer;
                    transition: color 0.2s;
                }
                .nav-icon.active:hover { color: #00f0ff; }
                .nav-icon.disabled { opacity: 0.3; cursor: default; }
                
                .address-bar {
                    flex: 1;
                    background: #0d0d0d;
                    height: 24px;
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    padding: 0 10px;
                    gap: 8px;
                    font-size: 0.7rem;
                    color: #888;
                    font-family: 'JetBrains Mono', 'Fira Code', monospace;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                
                .secure-icon { color: #27c93f; }
                
                .header-right {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                    cursor: pointer;
                }
                .menu-dot {
                    width: 3px;
                    height: 3px;
                    background: #555;
                    border-radius: 50%;
                }

                .iframe-wrapper {
                    flex: 1;
                    background: #fff;
                    position: relative;
                }
                
                iframe {
                    width: 100%;
                    height: 100%;
                    border: none;
                    background: #fff;
                }
            `}</style>
        </div>
    );
}

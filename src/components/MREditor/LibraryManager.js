'use client';
import { useState } from 'react';
import { Box, Plus, Check, Info } from 'lucide-react';

const LIBRARIES = [
    { 
        id: 'tailwind', 
        name: 'Tailwind CSS', 
        description: 'Utility-first CSS framework',
        cdn: '<script src="https://unpkg.com/@tailwindcss/browser@4"></script>',
        type: 'css'
    },
    { 
        id: 'gsap', 
        name: 'GSAP', 
        description: 'Professional-grade animations',
        cdn: '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>',
        type: 'js'
    },
    { 
        id: 'three', 
        name: 'Three.js', 
        description: '3D Graphics engine',
        cdn: '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/0.170.0/three.min.js"></script>',
        type: 'js'
    },
    { 
        id: 'framer', 
        name: 'Framer Motion (CDN)', 
        description: 'Motion library for React/HTML',
        cdn: '<script src="https://unpkg.com/framer-motion@10.16.4/dist/framer-motion.js"></script>',
        type: 'js'
    },
    { 
        id: 'lucide', 
        name: 'Lucide Icons', 
        description: 'Beautiful & consistent icons',
        cdn: '<script src="https://unpkg.com/lucide@latest"></script>',
        type: 'js'
    },
    {
        id: 'bootstrap',
        name: 'Bootstrap 5',
        description: 'Responsive frontend toolkit',
        cdn: '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">',
        type: 'css'
    }
];

export default function LibraryManager({ projectData, onUpdateFile }) {
    const [injected, setInjected] = useState([]);

    const handleInject = (lib) => {
        const indexFile = projectData.files['index.html'];
        if (!indexFile) {
            alert('index.html not found. Library injection requires an index.html file.');
            return;
        }

        // Check if already injected
        if (indexFile.content.includes(lib.id)) {
             setInjected([...injected, lib.id]);
             return;
        }

        let newContent = indexFile.content;
        if (lib.type === 'css') {
            // Inject before </head>
            newContent = indexFile.content.replace('</head>', `  ${lib.cdn}\n</head>`);
        } else {
            // Inject before </body>
            newContent = indexFile.content.replace('</body>', `  ${lib.cdn}\n</body>`);
        }

        if (newContent === indexFile.content) {
            // Fallback: just append
            newContent += `\n<!-- ${lib.name} -->\n${lib.cdn}`;
        }

        onUpdateFile('index.html', newContent);
        setInjected([...injected, lib.id]);
    };

    return (
        <div className="library-manager">
            <div className="manager-header">
                <Box size={16} />
                <h3>Library Injector</h3>
            </div>
            
            <div className="library-list custom-scrollbar">
                {LIBRARIES.map(lib => {
                    const isAlreadyInjected = projectData.files['index.html']?.content.includes(lib.id) || injected.includes(lib.id);
                    
                    return (
                        <div key={lib.id} className="library-card">
                            <div className="lib-info">
                                <h4>{lib.name}</h4>
                                <p>{lib.description}</p>
                            </div>
                            <button 
                                onClick={() => handleInject(lib)}
                                className={`inject-btn ${isAlreadyInjected ? 'active' : ''}`}
                                disabled={isAlreadyInjected}
                            >
                                {isAlreadyInjected ? <Check size={14} /> : <Plus size={14} />}
                                <span>{isAlreadyInjected ? 'Active' : 'Add'}</span>
                            </button>
                        </div>
                    );
                })}
            </div>

            <div className="helper-note">
                <Info size={12} />
                <span>Links are injected into index.html automatically.</span>
            </div>

            <style jsx>{`
                .library-manager {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    background: #080808;
                    color: #fff;
                    padding: 20px;
                }
                .manager-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 25px;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    padding-bottom: 15px;
                }
                .manager-header h3 {
                    font-size: 0.8rem;
                    font-weight: 800;
                    letter-spacing: 2px;
                    color: #555;
                    margin: 0;
                }
                .library-list {
                    flex: 1;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .library-card {
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 8px;
                    padding: 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    transition: 0.2s;
                }
                .library-card:hover {
                    background: rgba(255,255,255,0.04);
                    border-color: rgba(255,255,255,0.1);
                }
                .lib-info h4 {
                    font-size: 0.85rem;
                    margin: 0 0 4px 0;
                    color: #fff;
                }
                .lib-info p {
                    font-size: 0.65rem;
                    color: #555;
                    margin: 0;
                    max-width: 160px;
                }
                .inject-btn {
                    background: rgba(0, 240, 255, 0.1);
                    color: #00f0ff;
                    border: 1px solid rgba(0, 240, 255, 0.2);
                    padding: 6px 12px;
                    border-radius: 4px;
                    font-size: 0.65rem;
                    font-weight: 800;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    transition: 0.2s;
                }
                .inject-btn:hover:not(:disabled) {
                    background: rgba(0, 240, 255, 0.2);
                    transform: scale(1.05);
                }
                .inject-btn.active {
                    background: rgba(0, 255, 128, 0.1);
                    color: #00ff80;
                    border-color: rgba(0, 255, 128, 0.2);
                    cursor: default;
                }
                .helper-note {
                    margin-top: 20px;
                    padding-top: 15px;
                    border-top: 1px solid rgba(255,255,255,0.05);
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #444;
                    font-size: 0.6rem;
                }
            `}</style>
        </div>
    );
}

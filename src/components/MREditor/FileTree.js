'use client';
import { useState } from 'react';
import { FileCode, Plus, X } from 'lucide-react';

export default function FileTree({ 
    files, 
    activeFile, 
    onSelectFile, 
    onCreateFile, 
    onDeleteFile, 
    showSidebar, 
    setShowSidebar 
}) {
    const [isCreating, setIsCreating] = useState(false);
    const [newFileName, setNewFileName] = useState('');

    const confirmCreate = () => {
        if (!newFileName.trim()) { setIsCreating(false); return; }
        onCreateFile(newFileName);
        setIsCreating(false);
        setNewFileName('');
    };

    return (
        <aside className={`sidebar ${showSidebar ? 'visible' : ''}`}>
            <div className="sidebar-head">
                <span>FILESYSTEM</span>
                <div className="sidebar-actions">
                    <button onClick={() => setIsCreating(true)}><Plus size={16}/></button>
                    <button className="mobile-only" onClick={() => setShowSidebar(false)}><X size={16}/></button>
                </div>
            </div>
            {isCreating && (
                <div className="new-file">
                     <input 
                        autoFocus 
                        value={newFileName} 
                        onChange={e => setNewFileName(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && confirmCreate()}
                        onBlur={() => setIsCreating(false)}
                        placeholder="filename.js"
                    />
                </div>
            )}
            <div className="file-list">
                {Object.keys(files).sort().map(f => (
                    <div 
                        key={f} 
                        className={`file-item ${activeFile === f ? 'active' : ''}`} 
                        onClick={() => onSelectFile(f)}
                    >
                        <FileCode size={14} color={f.endsWith('.js') ? '#f7df1e' : '#00f0ff'} />
                        <span>{f}</span>
                    </div>
                ))}
            </div>
            <style jsx>{`
                .sidebar { 
                    width: 220px; 
                    border-right: 1px solid #1a1a1a; 
                    background: #080808; 
                    display: flex; 
                    flex-direction: column; 
                    transition: 0.3s; 
                    height: 100%;
                }
                
                @media (max-width: 768px) {
                    .sidebar { 
                        position: absolute; 
                        left: -80%; 
                        width: 80%;
                        top: 0; 
                        bottom: 0; 
                        z-index: 100; 
                        box-shadow: 20px 0 50px rgba(0,0,0,0.5); 
                    }
                    .sidebar.visible { left: 0; }
                }

                .sidebar-head { 
                    padding: 15px; 
                    display: flex; 
                    justify-content: space-between; 
                    font-size: 0.7rem; 
                    color: #444; 
                    font-weight: 800; 
                    letter-spacing: 1px; 
                }
                .sidebar-actions { display: flex; gap: 10px; }
                .sidebar-head button { background: none; border: none; color: #888; cursor: pointer; padding: 10px; }
                
                .new-file { padding: 10px 15px; }
                .new-file input {
                    width: 100%;
                    background: #111;
                    border: 1px solid #333;
                    color: #fff;
                    padding: 8px 12px;
                    font-size: 0.9rem;
                    border-radius: 4px;
                    outline: none;
                }

                .file-list { flex: 1; overflow-y: auto; }
                .file-item { 
                    padding: 14px 20px; 
                    display: flex; 
                    align-items: center; 
                    gap: 12px; 
                    cursor: pointer; 
                    font-size: 0.9rem; 
                    color: #666; 
                    transition: 0.2s; 
                }
                .file-item:hover { background: #111; color: #fff; }
                .file-item.active { 
                    background: rgba(0, 240, 255, 0.05); 
                    color: #00f0ff; 
                    border-left: 2px solid #00f0ff; 
                }
                
                .mobile-only { display: none; }
                @media (max-width: 768px) {
                    .mobile-only { display: block; }
                }
            `}</style>
        </aside>
    );
}

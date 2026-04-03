'use client';
import React, { useState, memo } from 'react';
import { FileCode, Plus, X } from 'lucide-react';

const FileTree = memo(({ 
    files, 
    activeFile, 
    onSelectFile, 
    onCreateFile, 
    onDeleteFile, 
    showSidebar, 
    setShowSidebar 
}) => {
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
                    <button onClick={() => setIsCreating(true)} aria-label="Create New File"><Plus size={16}/></button>
                    <button className="mobile-only" onClick={() => setShowSidebar(false)} aria-label="Close Sidebar"><X size={16}/></button>
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
                {Object.keys(files || {}).sort().map(f => {
                    const isHtml = f.endsWith('.html');
                    const isCss = f.endsWith('.css');
                    const isJs = f.endsWith('.js');
                    const isJson = f.endsWith('.json');
                    
                    let iconColor = '#888';
                    if (isHtml) iconColor = '#ff4400';
                    else if (isCss) iconColor = '#00aaff';
                    else if (isJs) iconColor = '#f7df1e';
                    else if (isJson) iconColor = '#00ff88';

                    return (
                        <div 
                            key={f} 
                            className={`file-item ${activeFile === f ? 'active' : ''}`} 
                            onClick={() => onSelectFile(f)}
                        >
                            <div className="file-main">
                                <FileCode size={14} color={iconColor} />
                                <span>{f}</span>
                            </div>
                            {f !== 'index.html' && (
                                <button 
                                    className="delete-file-btn" 
                                    onClick={(e) => { e.stopPropagation(); if(confirm(`Delete ${f}?`)) onDeleteFile(f); }}
                                    aria-label={`Delete ${f}`}
                                >
                                    <X size={12} />
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
            <style jsx>{`
                .sidebar { 
                    width: 260px; 
                    border-right: 1px solid rgba(0,240,255,0.08); 
                    background: #050505; 
                    display: flex; 
                    flex-direction: column; 
                    transition: 0.3s; 
                    height: 100%;
                }
                
                @media (max-width: 768px) {
                    .sidebar { 
                        position: absolute; 
                        left: -100%; 
                        width: 100%;
                        top: 0; 
                        bottom: 0; 
                        z-index: 100; 
                        background: #010101;
                    }
                    .sidebar.visible { left: 0; }
                }

                .sidebar-head { 
                    padding: 15px 20px; 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center;
                    font-size: 10px; 
                    color: rgba(255,255,255,0.3); 
                    font-weight: 900; 
                    letter-spacing: 2.5px; 
                    text-transform: uppercase;
                    border-bottom: 1px solid rgba(255,255,255,0.03);
                }
                .sidebar-actions { display: flex; gap: 8px; }
                .sidebar-head button { background: none; border: none; color: #666; cursor: pointer; padding: 4px; border-radius: 4px; transition: 0.2s; }
                .sidebar-head button:hover { color: #00f0ff; background: rgba(0,240,255,0.05); }
                
                .new-file { padding: 12px 20px; }
                .new-file input {
                    width: 100%;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(0,240,255,0.2);
                    color: #fff;
                    padding: 10px 14px;
                    font-size: 0.8rem;
                    border-radius: 8px;
                    outline: none;
                    font-family: 'JetBrains Mono', monospace;
                }

                .file-list { flex: 1; overflow-y: auto; padding: 10px 0; }
                .file-item { 
                    padding: 10px 20px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: space-between;
                    gap: 12px; 
                    cursor: pointer; 
                    font-size: 0.8rem; 
                    color: rgba(255,255,255,0.5); 
                    transition: 0.2s; 
                    position: relative;
                }
                .file-main { display: flex; align-items: center; gap: 12px; }
                .file-item:hover { background: rgba(255,255,255,0.02); color: rgba(255,255,255,0.8); }
                .file-item:hover .delete-file-btn { opacity: 1; }
                .file-item.active { 
                    background: rgba(0, 240, 255, 0.05); 
                    color: #00f0ff; 
                }
                .file-item.active::before {
                    content: '';
                    position: absolute;
                    left: 0; top: 0; bottom: 0;
                    width: 3px;
                    background: #00f0ff;
                    box-shadow: 0 0 10px #00f0ff;
                }
                
                .delete-file-btn { 
                    opacity: 0; 
                    background: transparent; 
                    border: none; 
                    color: #444; 
                    cursor: pointer; 
                    padding: 4px; 
                    border-radius: 4px;
                    transition: 0.2s;
                }
                .delete-file-btn:hover { background: rgba(255,0,0,0.1); color: #ff4444; }
            `}</style>
        </aside>
    );
});

FileTree.displayName = 'FileTree';

export default FileTree;

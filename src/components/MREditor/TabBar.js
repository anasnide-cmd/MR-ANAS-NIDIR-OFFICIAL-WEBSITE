'use client';
import React, { memo } from 'react';
import { X, FileCode } from 'lucide-react';

const TabBar = memo(({ 
    openFiles, 
    activeFile, 
    onSelectFile, 
    onCloseFile 
}) => {
    const getFileIcon = (filename) => {
        const ext = filename.split('.').pop().toLowerCase();
        let color = '#888';
        if (ext === 'html') color = '#ff4400';
        else if (ext === 'css') color = '#00aaff';
        else if (ext === 'js') color = '#f7df1e';
        else if (ext === 'json') color = '#00ff88';
        return <FileCode size={14} color={color} />;
    };

    if (openFiles.length === 0) return null;

    return (
        <div className="tab-bar-container">
            <div className="tabs-list custom-scrollbar">
                {openFiles.map((file) => (
                    <div 
                        key={file} 
                        className={`tab-item ${activeFile === file ? 'active' : ''}`}
                        onClick={() => onSelectFile(file)}
                    >
                        <div className="tab-icon">{getFileIcon(file)}</div>
                        <span className="tab-name">{file}</span>
                        <button 
                            className="tab-close" 
                            onClick={(e) => {
                                e.stopPropagation();
                                onCloseFile(file);
                            }}
                        >
                            <X size={12} />
                        </button>
                    </div>
                ))}
            </div>
            
            <style jsx>{`
                .tab-bar-container {
                    height: 35px;
                    background: #000;
                    border-bottom: 1px solid #1a1a1a;
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                    flex-shrink: 0;
                }
                
                .tabs-list {
                    display: flex;
                    height: 100%;
                    overflow-x: auto;
                    overflow-y: hidden;
                    scrollbar-width: none;
                }
                .tabs-list::-webkit-scrollbar {
                    display: none;
                }
                
                .tab-item {
                    height: 100%;
                    min-width: 120px;
                    max-width: 200px;
                    display: flex;
                    align-items: center;
                    padding: 0 12px;
                    gap: 8px;
                    background: #0a0a0a;
                    border-right: 1px solid #1a1a1a;
                    cursor: pointer;
                    user-select: none;
                    transition: 0.2s;
                    position: relative;
                }
                
                .tab-item:hover {
                    background: #111;
                }
                
                .tab-item.active {
                    background: #080808;
                    color: #00f0ff;
                    border-bottom: 2px solid #00f0ff;
                }
                
                .tab-item.active::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: #00f0ff;
                    box-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
                }
                
                .tab-name {
                    font-size: 0.75rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-family: 'Inter', sans-serif;
                    font-weight: 500;
                    color: inherit;
                }
                
                .tab-item:not(.active) .tab-name {
                    color: #666;
                }
                .tab-item:hover .tab-name {
                    color: #aaa;
                }
                .tab-item.active .tab-name {
                    color: #00f0ff;
                }
                
                .tab-close {
                    margin-left: auto;
                    background: transparent;
                    border: none;
                    color: #444;
                    padding: 2px;
                    border-radius: 4px;
                    display: flex;
                    opacity: 0;
                    transition: 0.2s;
                }
                
                .tab-item:hover .tab-close, .tab-item.active .tab-close {
                    opacity: 1;
                }
                
                .tab-close:hover {
                    background: rgba(255,255,255,0.1);
                    color: #fff;
                }
                
                .tab-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0.8;
                }
            `}</style>
        </div>
    );
});

TabBar.displayName = 'TabBar';

export default TabBar;

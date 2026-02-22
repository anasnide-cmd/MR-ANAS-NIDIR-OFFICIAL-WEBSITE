'use client';
import { useState, useRef } from 'react';
import { Sparkles, LayoutGrid, Type, Square, Image as ImageIcon, Search, Circle } from 'lucide-react';

export default function Toolbar({ addElement, canvasBg, setCanvasBg }) {
    const [activeTab, setActiveTab] = useState('text');

    const handleAddText = (type) => {
        const textConfig = {
            heading: { fontSize: 48, fontWeight: 'bold', content: 'Add a heading' },
            subheading: { fontSize: 24, fontWeight: '600', content: 'Add a subheading' },
            body: { fontSize: 16, fontWeight: 'normal', content: 'Add a little bit of body text' }
        };
        
        addElement({
            type: 'text',
            ...textConfig[type],
            color: '#000000',
            x: 200,
            y: 200,
            width: 300,
            height: 100
        });
    };

    const handleAddShape = (shapeType) => {
        const shapeConfig = {
            square: { width: 150, height: 150, shapeType: 'square' },
            circle: { width: 150, height: 150, shapeType: 'circle' },
            rounded: { width: 150, height: 150, shapeType: 'rounded' },
            triangle: { width: 150, height: 150, shapeType: 'triangle' }
        };

        addElement({
            type: 'shape',
            color: '#ffca28', // gold
            x: 200,
            y: 200,
            ...shapeConfig[shapeType]
        });
    };

    const fileInputRef = useRef(null);

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                let w = img.width;
                let h = img.height;
                const max = 300;
                if (w > max || h > max) {
                    if (w > h) { h = (h / w) * max; w = max; }
                    else { w = (w / h) * max; h = max; }
                }
                
                addElement({
                    type: 'image',
                    url: event.target.result,
                    x: 100,
                    y: 100,
                    width: w,
                    height: h
                });
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    };

    return (
        <aside className="design-sidebar">
            {/* Primary Tab Bar */}
            <div className="tab-bar">
                <button className={`tab-btn ${activeTab === 'design' ? 'active' : ''}`} onClick={() => setActiveTab('design')}>
                    <LayoutGrid size={20} />
                    <span>Design</span>
                </button>
                <button className={`tab-btn ${activeTab === 'elements' ? 'active' : ''}`} onClick={() => setActiveTab('elements')}>
                    <Square size={20} />
                    <span>Elements</span>
                </button>
                <button className={`tab-btn ${activeTab === 'text' ? 'active' : ''}`} onClick={() => setActiveTab('text')}>
                    <Type size={20} />
                    <span>Text</span>
                </button>
                <button className={`tab-btn ${activeTab === 'uploads' ? 'active' : ''}`} onClick={() => setActiveTab('uploads')}>
                    <ImageIcon size={20} />
                    <span>Uploads</span>
                </button>
            </div>

            {/* Flyout Panel */}
            <div className="panel-content custom-scrollbar">
                {activeTab === 'design' && (
                    <div className="tab-pane">
                        <h3>Canvas Settings</h3>
                        <div className="setting-group">
                            <label style={{fontSize: '0.8rem', color: '#ccc'}}>Background Color</label>
                            <input 
                                type="color" 
                                value={canvasBg}
                                onChange={(e) => setCanvasBg(e.target.value)}
                                className="color-picker"
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'text' && (
                    <div className="tab-pane">
                        <div className="search-box">
                            <Search size={14} color="#888" />
                            <input type="text" placeholder="Search text..." />
                        </div>
                        
                        <div className="action-buttons">
                            <button className="add-text-btn heading" onClick={() => handleAddText('heading')}>
                                Add a heading
                            </button>
                            <button className="add-text-btn subheading" onClick={() => handleAddText('subheading')}>
                                Add a subheading
                            </button>
                            <button className="add-text-btn body" onClick={() => handleAddText('body')}>
                                Add a little bit of body text
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'elements' && (
                    <div className="tab-pane">
                        <div className="search-box">
                            <Search size={14} color="#888" />
                            <input type="text" placeholder="Search elements..." />
                        </div>
                        
                        <h3>Shapes</h3>
                        <div className="shape-grid">
                            <button className="shape-btn" onClick={() => handleAddShape('square')}>
                                <div className="square-shape"></div>
                            </button>
                            <button className="shape-btn" onClick={() => handleAddShape('circle')}>
                                <div className="circle-shape"></div>
                            </button>
                            <button className="shape-btn" onClick={() => handleAddShape('rounded')}>
                                <div className="rounded-shape"></div>
                            </button>
                            <button className="shape-btn" onClick={() => handleAddShape('triangle')}>
                                <div className="triangle-shape"></div>
                            </button>
                        </div>
                    </div>
                )}
                {activeTab === 'uploads' && (
                    <div className="tab-pane">
                         <h3>Upload Media</h3>
                         <p style={{fontSize: '0.8rem', color: '#888', marginBottom: '15px'}}>Upload PNG, JPG, or SVG to drop onto your canvas.</p>
                         
                         <input 
                            type="file" 
                            accept="image/*" 
                            ref={fileInputRef} 
                            style={{ display: 'none' }} 
                            onChange={handleFileUpload}
                         />
                         
                         <button 
                            className="add-text-btn" 
                            style={{textAlign: 'center', fontWeight: 'bold'}}
                            onClick={() => fileInputRef.current?.click()}
                         >
                             Upload Image
                         </button>
                    </div>
                )}
            </div>

            <style jsx>{`
                .design-sidebar {
                    width: 340px;
                    display: flex;
                    background: #111;
                    border-right: 1px solid rgba(255, 215, 0, 0.1);
                    z-index: 90;
                }

                .tab-bar {
                    width: 72px;
                    background: #080808;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding-top: 10px;
                    border-right: 1px solid rgba(255,255,255,0.05);
                }

                .tab-btn {
                    width: 60px;
                    height: 60px;
                    background: transparent;
                    border: none;
                    color: #888;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    cursor: pointer;
                    border-radius: 8px;
                    transition: 0.2s;
                    margin-bottom: 5px;
                }
                .tab-btn span { font-size: 0.65rem; }
                .tab-btn:hover { color: #fff; background: rgba(255,255,255,0.05); }
                .tab-btn.active { color: #ffca28; background: rgba(255, 215, 0, 0.1); }

                .panel-content {
                    flex: 1;
                    padding: 20px;
                    overflow-y: auto;
                }

                .search-box {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: #1a1a1a;
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 10px 15px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                }
                .search-box input {
                    background: transparent; border: none; color: #fff; width: 100%; outline: none; font-size: 0.9rem;
                }

                .action-buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .add-text-btn {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 8px;
                    color: #fff;
                    padding: 15px;
                    text-align: left;
                    cursor: pointer;
                    transition: 0.2s;
                }
                .add-text-btn:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,215,0,0.3); }
                
                .add-text-btn.heading { font-size: 1.5rem; font-weight: bold; }
                .add-text-btn.subheading { font-size: 1.1rem; font-weight: 600; }
                .add-text-btn.body { font-size: 0.9rem; }

                h3 {
                    font-size: 0.8rem;
                    color: #fff;
                    margin-bottom: 12px;
                }

                .shape-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 10px;
                }

                .shape-btn {
                    aspect-ratio: 1;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }
                .shape-btn:hover { background: rgba(255,255,255,0.1); }
                .square-shape { width: 50%; height: 50%; background: #ccc; }
                .circle-shape { width: 50%; height: 50%; background: #ccc; border-radius: 50%; }
                .rounded-shape { width: 50%; height: 50%; background: #ccc; border-radius: 8px; }
                .triangle-shape { 
                    width: 50%; height: 50%; background: #ccc; 
                    clip-path: polygon(50% 0%, 0% 100%, 100% 100%); 
                }

                .setting-group {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: rgba(255,255,255,0.05);
                    padding: 10px;
                    border-radius: 8px;
                    margin-top: 10px;
                }

                .color-picker {
                    width: 30px; 
                    height: 30px; 
                    padding: 0; 
                    border: 1px solid rgba(255,255,255,0.2); 
                    border-radius: 4px; 
                    cursor: pointer;
                    background: transparent;
                }

                @media (max-width: 768px) {
                    .design-sidebar {
                        width: 100%;
                        flex-direction: column-reverse; /* Tabs on bottom, panel above */
                        border-right: none;
                        border-top: 1px solid rgba(255, 215, 0, 0.1);
                        z-index: 100;
                    }
                    
                    .tab-bar {
                        width: 100%;
                        height: 70px;
                        flex-direction: row;
                        justify-content: space-around;
                        padding-top: 0;
                        border-right: none;
                        border-top: 1px solid rgba(255,255,255,0.05);
                    }
                    
                    .tab-btn {
                        width: auto;
                        height: 100%;
                        flex: 1;
                        margin-bottom: 0;
                    }

                    .panel-content {
                        max-height: 40vh; /* Don't take up entire screen */
                        padding: 15px;
                    }
                }
            `}</style>
        </aside>
    );
}

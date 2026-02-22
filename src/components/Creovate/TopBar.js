'use client';
import html2canvas from 'html2canvas';

import { Menu, Undo2, Redo2, Download, Play, ZoomIn, ZoomOut, Trash2, ArrowUp, ArrowDown, Copy, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, SlidersHorizontal, Cloud, Loader } from 'lucide-react';

export default function TopBar({ selectedElement, updateElement, deleteElement, duplicateElement, canvasRef, setSelectedId, scale, setScale, undo, redo, canUndo, canRedo, elements, saveProject, isSaving }) {
  const handleColorChange = (e) => {
    if (selectedElement) {
        updateElement(selectedElement.id, { color: e.target.value });
    }
  };

  const handleFontSizeChange = (e) => {
    if (selectedElement && selectedElement.type === 'text') {
        updateElement(selectedElement.id, { fontSize: parseInt(e.target.value) || 16 });
    }
  };

  const handleFontFamilyChange = (e) => {
    if (selectedElement && selectedElement.type === 'text') {
        updateElement(selectedElement.id, { fontFamily: e.target.value });
    }
  };

  const toggleTextStyle = (styleKey, activeValue, inactiveValue) => {
    if (selectedElement && selectedElement.type === 'text') {
        const currentValue = selectedElement[styleKey] || inactiveValue;
        updateElement(selectedElement.id, { [styleKey]: currentValue === activeValue ? inactiveValue : activeValue });
    }
  };

  const handleOpacityChange = (e) => {
      if (selectedElement) {
          updateElement(selectedElement.id, { opacity: parseFloat(e.target.value) });
      }
  };

  const handleLayerChange = (direction) => {
      if (!selectedElement) return;
      const currentZ = selectedElement.zIndex || 1;
      // Using min 1 and max 999 to stay safely within basic rendering stacking contexts
      let newZ = currentZ;

      if (direction === 'up') {
          // Find max zIndex to just put it on top if needed, or simple increment
          const maxZ = Math.max(...elements.map(el => el.zIndex || 1));
          newZ = currentZ >= maxZ ? currentZ + 1 : maxZ + 1;
      } else {
          newZ = Math.max(1, currentZ - 1);
      }
      
      updateElement(selectedElement.id, { zIndex: newZ });
  };

  const handleExport = async () => {
      if (!canvasRef || !canvasRef.current) return;
      
      // Clear selection so bounding boxes aren't in download
      setSelectedId(null);
      
      setTimeout(async () => {
          try {
              const canvas = await html2canvas(canvasRef.current, { useCORS: true, backgroundColor: null });
              const dataUrl = canvas.toDataURL('image/png');
              const link = document.createElement('a');
              link.download = 'creovate-design.png';
              link.href = dataUrl;
              link.click();
          } catch (err) {
              console.error('Export Failed:', err);
          }
      }, 50);
  };

  return (
    <header className="design-topbar">
      <div className="topbar-left">
        <button className="menu-btn"><Menu size={20} /></button>
        <div className="project-title">
          <span className="file-name">Untitled Concept_Alpha</span>
        </div>
      </div>

      <div className="topbar-center">
         {/* Contextual Formatting Bar */}
         {selectedElement ? (
             <div className="formatting-bar">
                 <input 
                    type="color" 
                    title="Change Color"
                    value={selectedElement.color || '#ffffff'} 
                    onChange={handleColorChange}
                    className="color-picker"
                 />
                 
                 {selectedElement.type === 'text' && (
                     <>
                         <select 
                            className="font-family-select"
                            value={selectedElement.fontFamily || 'inherit'}
                            onChange={handleFontFamilyChange}
                            title="Font Family"
                         >
                            <option value="inherit">Default</option>
                            <option value="Inter, sans-serif">Inter</option>
                            <option value="Roboto, sans-serif">Roboto</option>
                            <option value="Outfit, sans-serif">Outfit</option>
                            <option value="monospace">Monospace</option>
                            <option value="serif">Serif</option>
                            <option value="cursive">Cursive</option>
                         </select>

                         <div className="font-size-control">
                            <input 
                                type="number" 
                                title="Font Size"
                                value={selectedElement.fontSize || 24} 
                                onChange={handleFontSizeChange}
                                min="8" max="200"
                            />
                         </div>
                         <div className="divider"></div>
                         
                         {/* Text Formatting Toggles */}
                         <button className={`icon-btn action ${(selectedElement.fontWeight === 'bold' || selectedElement.fontWeight === 700) ? 'active' : ''}`} title="Bold" onClick={() => toggleTextStyle('fontWeight', 'bold', 'normal')}><Bold size={16} /></button>
                         <button className={`icon-btn action ${selectedElement.fontStyle === 'italic' ? 'active' : ''}`} title="Italic" onClick={() => toggleTextStyle('fontStyle', 'italic', 'normal')}><Italic size={16} /></button>
                         <button className={`icon-btn action ${selectedElement.textDecoration === 'underline' ? 'active' : ''}`} title="Underline" onClick={() => toggleTextStyle('textDecoration', 'underline', 'none')}><Underline size={16} /></button>
                         
                         <div className="divider"></div>
                         
                         {/* Text Alignment */}
                         <button className={`icon-btn action ${(!selectedElement.textAlign || selectedElement.textAlign === 'left') ? 'active' : ''}`} title="Align Left" onClick={() => updateElement(selectedElement.id, { textAlign: 'left' })}><AlignLeft size={16} /></button>
                         <button className={`icon-btn action ${selectedElement.textAlign === 'center' ? 'active' : ''}`} title="Align Center" onClick={() => updateElement(selectedElement.id, { textAlign: 'center' })}><AlignCenter size={16} /></button>
                         <button className={`icon-btn action ${selectedElement.textAlign === 'right' ? 'active' : ''}`} title="Align Right" onClick={() => updateElement(selectedElement.id, { textAlign: 'right' })}><AlignRight size={16} /></button>
                     </>
                 )}

                 <div className="divider"></div>

                 {/* Opacity Control */}
                 <div className="opacity-control" title="Opacity">
                    <SlidersHorizontal size={14} color="#888" style={{marginLeft: '10px'}} />
                    <input 
                        type="range" 
                        min="0" max="1" step="0.05"
                        value={selectedElement.opacity ?? 1}
                        onChange={handleOpacityChange}
                        className="opacity-slider"
                    />
                 </div>

                 <div className="divider"></div>

                 <button 
                    className="icon-btn action" 
                    title="Bring Forward" 
                    onClick={() => handleLayerChange('up')}
                 >
                    <ArrowUp size={16} />
                 </button>
                 <button 
                    className="icon-btn action" 
                    title="Send Backward" 
                    onClick={() => handleLayerChange('down')}
                 >
                    <ArrowDown size={16} />
                 </button>
                 <button 
                    className="icon-btn action" 
                    title="Duplicate Element" 
                    onClick={() => duplicateElement(selectedElement.id)}
                 >
                    <Copy size={16} />
                 </button>
                 <div className="divider"></div>
                 <button 
                    className="icon-btn action danger" 
                    title="Delete Element" 
                    onClick={() => deleteElement(selectedElement.id)}
                 >
                    <Trash2 size={16} />
                 </button>
             </div>
         ) : (
             <div className="action-group">
                <button className={`icon-btn action ${canUndo ? '' : 'disabled'}`} title="Undo" onClick={undo} disabled={!canUndo}>
                    <Undo2 size={18} />
                </button>
                <button className={`icon-btn action ${canRedo ? '' : 'disabled'}`} title="Redo" onClick={redo} disabled={!canRedo}>
                    <Redo2 size={18} />
                </button>
                <div className="divider"></div>
                <button className="icon-btn" title="Zoom Out" onClick={() => setScale(s => Math.max(0.1, s - 0.1))}><ZoomOut size={18}/></button>
                <span className="zoom-level">{Math.round(scale * 100)}%</span>
                <button className="icon-btn" title="Zoom In" onClick={() => setScale(s => Math.min(3, s + 0.1))}><ZoomIn size={18}/></button>
             </div>
         )}
      </div>

      <div className="topbar-right">
        <button className="icon-btn" onClick={saveProject} disabled={isSaving} title="Save to Cloud">
            {isSaving ? <Loader size={16} /> : <Cloud size={16} />} 
        </button>
        <button className="presence-avatar hide-mobile">A</button>
        <button className="btn-play hide-mobile" title="Present"><Play size={16} fill="currentColor" /></button>
        <button className="btn-export" onClick={handleExport}>
            <Download size={16} /> Export
        </button>
      </div>

      <style jsx>{`
        .design-topbar {
          height: 60px;
          background: #080808;
          border-bottom: 1px solid rgba(255, 215, 0, 0.15); /* Gold border */
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          color: #fff;
          z-index: 100;
        }

        .topbar-left, .topbar-center, .topbar-right {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .menu-btn {
          background: transparent; border: none; color: #ffca28; cursor: pointer;
          display: flex; align-items: center; padding: 8px; border-radius: 6px; transition: 0.2s;
        }
        .menu-btn:hover { background: rgba(255, 215, 0, 0.1); }

        .project-title { display: flex; align-items: center; gap: 12px; }
        .file-name { font-size: 0.95rem; font-weight: 600; color: #fff; letter-spacing: 0.5px; }

        .opacity-control {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .opacity-slider {
            width: 60px;
            accent-color: #ffca28;
            cursor: pointer;
        }

        .action-group, .formatting-bar {
            display: flex; align-items: center; gap: 8px;
            background: #111; padding: 4px 8px; border-radius: 8px;
            border: 1px solid rgba(255,255,255,0.05);
            max-width: 100vw; overflow-x: auto; scrollbar-width: none;
        }
        .formatting-bar::-webkit-scrollbar { display: none; }

        .icon-btn {
            background: transparent; border: none; color: #888; padding: 6px;
            border-radius: 6px; cursor: pointer; transition: 0.2s; display: flex; align-items: center;
        }
        .icon-btn:hover { color: #fff; background: rgba(255, 215, 0, 0.1); }
        .icon-btn.active { color: #ffca28; background: rgba(255, 215, 0, 0.2); }
        .icon-btn.danger:hover { color: #ff4757; background: rgba(255, 71, 87, 0.1); }
        .icon-btn.disabled { opacity: 0.3; cursor: not-allowed; }
        .icon-btn.disabled:hover { background: transparent; color: #888; }

        .color-picker {
            width: 28px; height: 28px; padding: 0; border: 1px solid rgba(255,255,255,0.2);
            border-radius: 4px; cursor: pointer; background: transparent;
        }
        .color-picker::-webkit-color-swatch-wrapper { padding: 0; }
        .color-picker::-webkit-color-swatch { border: none; border-radius: 3px; }

        .font-size-control input {
            width: 45px; background: transparent; border: none; color: #fff; text-align: center;
            outline: none; font-size: 0.9rem;
        }
        
        .font-family-select {
            background: #222; border: 1px solid #333; color: #fff; padding: 4px; border-radius: 4px;
            outline: none; font-size: 0.85rem; cursor: pointer;
        }

        .divider { width: 1px; height: 16px; background: rgba(255,255,255,0.1); }
        .zoom-level { font-size: 0.8rem; font-weight: 500; width: 45px; text-align: center; color: #ccc; }

        .presence-avatar {
            width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #111, #333);
            border: 2px solid #ffca28; color: #ffca28; font-weight: bold; display: flex;
            align-items: center; justify-content: center; cursor: pointer;
        }

        .btn-play {
            background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);
            color: #fff; width: 36px; height: 36px; border-radius: 8px; display: flex;
            align-items: center; justify-content: center; cursor: pointer; transition: 0.2s;
        }
        .btn-play:hover { background: rgba(255, 215, 0, 0.2); color: #ffca28; border-color: rgba(255, 215, 0, 0.5); }

        .btn-export {
            background: #ffca28; color: #000; border: none; border-radius: 8px; padding: 0 16px;
            height: 36px; font-weight: 700; font-size: 0.85rem; display: flex; align-items: center;
            gap: 8px; cursor: pointer; transition: all 0.2s; box-shadow: 0 0 15px rgba(255, 215, 0, 0.2);
        }
        .btn-export:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(255, 215, 0, 0.4); background: #ffe066; }

        @media (max-width: 768px) {
            .hide-mobile { display: none !important; }
            .design-topbar { padding: 0 10px; justify-content: flex-start; gap: 10px; }
            .project-title { display: none; }
            .topbar-center { flex: 1; max-width: calc(100vw - 80px); }
        }
      `}</style>
    </header>
  );
}

'use client';
import html2canvas from 'html2canvas';

import { Menu, Undo2, Redo2, Download, Play, ZoomIn, ZoomOut, Trash2 } from 'lucide-react';

export default function TopBar({ selectedElement, updateElement, deleteElement, canvasRef, setSelectedId }) {
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
                     <div className="font-size-control">
                        <input 
                            type="number" 
                            title="Font Size"
                            value={selectedElement.fontSize || 24} 
                            onChange={handleFontSizeChange}
                            min="8" max="200"
                        />
                     </div>
                 )}
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
                <button className="icon-btn action" title="Undo"><Undo2 size={18} /></button>
                <button className="icon-btn action" title="Redo"><Redo2 size={18} /></button>
                <div className="divider"></div>
                <button className="icon-btn" title="Zoom Out"><ZoomOut size={18}/></button>
                <span className="zoom-level">100%</span>
                <button className="icon-btn" title="Zoom In"><ZoomIn size={18}/></button>
             </div>
         )}
      </div>

      <div className="topbar-right">
        <button className="presence-avatar">A</button>
        <button className="btn-play" title="Present"><Play size={16} fill="currentColor" /></button>
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

        .action-group, .formatting-bar {
            display: flex; align-items: center; gap: 8px;
            background: #111; padding: 4px 8px; border-radius: 8px;
            border: 1px solid rgba(255,255,255,0.05);
        }

        .icon-btn {
            background: transparent; border: none; color: #888; padding: 6px;
            border-radius: 6px; cursor: pointer; transition: 0.2s; display: flex; align-items: center;
        }
        .icon-btn:hover { color: #fff; background: rgba(255, 215, 0, 0.1); }
        .icon-btn.danger:hover { color: #ff4757; background: rgba(255, 71, 87, 0.1); }

        .color-picker {
            width: 28px; height: 28px; padding: 0; border: 1px solid rgba(255,255,255,0.2);
            border-radius: 4px; cursor: pointer; background: transparent;
        }
        .color-picker::-webkit-color-swatch-wrapper { padding: 0; }
        .color-picker::-webkit-color-swatch { border: none; border-radius: 3px; }

        .font-size-control input {
            background: transparent; border: 1px solid rgba(255,255,255,0.1); color: #fff;
            width: 50px; text-align: center; border-radius: 4px; padding: 4px; outline: none;
        }

        .divider { width: 1px; height: 20px; background: rgba(255,255,255,0.1); }
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
      `}</style>
    </header>
  );
}

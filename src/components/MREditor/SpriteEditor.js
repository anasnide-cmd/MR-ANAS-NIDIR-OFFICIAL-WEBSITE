'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { 
    Pencil, 
    Eraser, 
    PaintBucket, 
    Pipette, 
    Grid3X3, 
    ZoomIn, 
    ZoomOut, 
    RotateCcw, 
    RotateCw, 
    Save, 
    X, 
    Download,
    Eye,
    Maximize2
} from 'lucide-react';

export default function SpriteEditor({ onSave, onClose, initialData = null }) {
    const canvasRef = useRef(null);
    const [gridSize, setGridSize] = useState(16);
    const [color, setColor] = useState('#00f0ff');
    const [tool, setTool] = useState('pencil'); // pencil, eraser, bucket, picker
    const [zoom, setZoom] = useState(20);
    const [showGrid, setShowGrid] = useState(true);
    const [isDrawing, setIsDrawing] = useState(false);
    
    // Pixel Data: 2D array [y][x] = hex color or null (transparent)
    const [pixels, setPixels] = useState(() => {
        if (initialData?.pixels) return initialData.pixels;
        return Array(16).fill(null).map(() => Array(16).fill(null));
    });

    const [history, setHistory] = useState([JSON.stringify(pixels)]);
    const [historyStep, setHistoryStep] = useState(0);

    // Color Palette
    const palette = [
        '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', 
        '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080',
        '#00f0ff', '#ff007f', '#7fff00', '#333333', '#666666', '#999999'
    ];

    useEffect(() => {
        drawCanvas();
    }, [pixels, zoom, showGrid]);

    const drawCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const size = gridSize * zoom;
        canvas.width = size;
        canvas.height = size;

        // Clear
        ctx.clearRect(0, 0, size, size);

        // Draw Pixels
        pixels.forEach((row, y) => {
            row.forEach((pixelColor, x) => {
                if (pixelColor) {
                    ctx.fillStyle = pixelColor;
                    ctx.fillRect(x * zoom, y * zoom, zoom, zoom);
                }
            });
        });

        // Draw Grid
        if (showGrid) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 0.5;
            for (let i = 0; i <= gridSize; i++) {
                ctx.beginPath();
                ctx.moveTo(i * zoom, 0);
                ctx.lineTo(i * zoom, size);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(0, i * zoom);
                ctx.lineTo(size, i * zoom);
                ctx.stroke();
            }
        }
    };

    const addToHistory = (newPixels) => {
        const state = JSON.stringify(newPixels);
        const newHistory = history.slice(0, historyStep + 1);
        newHistory.push(state);
        if (newHistory.length > 50) newHistory.shift();
        setHistory(newHistory);
        setHistoryStep(newHistory.length - 1);
    };

    const undo = () => {
        if (historyStep > 0) {
            const prevState = JSON.parse(history[historyStep - 1]);
            setPixels(prevState);
            setHistoryStep(historyStep - 1);
        }
    };

    const redo = () => {
        if (historyStep < history.length - 1) {
            const nextState = JSON.parse(history[historyStep + 1]);
            setPixels(nextState);
            setHistoryStep(historyStep + 1);
        }
    };

    const handleAction = (x, y) => {
        if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) return;

        const newPixels = pixels.map(row => [...row]);

        if (tool === 'pencil') {
            newPixels[y][x] = color;
        } else if (tool === 'eraser') {
            newPixels[y][x] = null;
        } else if (tool === 'picker') {
            if (newPixels[y][x]) setColor(newPixels[y][x]);
            setTool('pencil');
            return;
        } else if (tool === 'bucket') {
            const targetColor = newPixels[y][x];
            if (targetColor === color) return;
            floodFill(newPixels, x, y, targetColor, color);
        }

        setPixels(newPixels);
        addToHistory(newPixels);
    };

    const floodFill = (pix, x, y, target, replacement) => {
        if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) return;
        if (pix[y][x] !== target) return;

        pix[y][x] = replacement;
        floodFill(pix, x + 1, y, target, replacement);
        floodFill(pix, x - 1, y, target, replacement);
        floodFill(pix, x, y + 1, target, replacement);
        floodFill(pix, x, y - 1, target, replacement);
    };

    const onMouseDown = (e) => {
        setIsDrawing(true);
        const rect = canvasRef.current.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        const x = Math.floor((clientX - rect.left) / zoom);
        const y = Math.floor((clientY - rect.top) / zoom);
        handleAction(x, y);
    };

    const onMouseMove = (e) => {
        if (!isDrawing || tool === 'bucket') return;
        const rect = canvasRef.current.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        const x = Math.floor((clientX - rect.left) / zoom);
        const y = Math.floor((clientY - rect.top) / zoom);
        
        if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
            if (tool === 'pencil' && pixels[y][x] === color) return;
            if (tool === 'eraser' && pixels[y][x] === null) return;
            
            const newPixels = pixels.map(row => [...row]);
            newPixels[y][x] = tool === 'pencil' ? color : null;
            setPixels(newPixels);
        }
        if (e.touches && e.cancelable) e.preventDefault();
    };

    const onMouseUp = () => {
        if (isDrawing && tool !== 'bucket' && tool !== 'picker') {
            addToHistory(pixels);
        }
        setIsDrawing(false);
    };

    const handleSaveLocal = () => {
        // Create a hidden canvas to export the real size image
        const outCanvas = document.createElement('canvas');
        outCanvas.width = gridSize;
        outCanvas.height = gridSize;
        const outCtx = outCanvas.getContext('2d');

        pixels.forEach((row, y) => {
            row.forEach((pixelColor, x) => {
                if (pixelColor) {
                    outCtx.fillStyle = pixelColor;
                    outCtx.fillRect(x, y, 1, 1);
                }
            });
        });

        outCanvas.toBlob((blob) => {
            onSave({
                blob,
                pixels,
                gridSize,
                name: `sprite_${Date.now()}.png`
            });
        }, 'image/png');
    };

    const changeGridSize = (newSize) => {
        if (!confirm(`Changing grid size to ${newSize}x${newSize} will reset your canvas. Continue?`)) return;
        setGridSize(newSize);
        setPixels(Array(newSize).fill(null).map(() => Array(newSize).fill(null)));
        setHistory([JSON.stringify(Array(newSize).fill(null).map(() => Array(newSize).fill(null)))]);
        setHistoryStep(0);
    };

    return (
        <div className="sprite-editor-overlay">
            <div className="sprite-editor-container">
                <header className="se-header">
                    <div className="header-title">
                        <Maximize2 size={16} />
                        <span>SPRITE MAKER</span>
                    </div>
                    <div className="header-actions">
                        <button onClick={handleSaveLocal} className="btn-primary"><Save size={14}/> <span>Save to Assets</span></button>
                        <button onClick={onClose} className="btn-close"><X size={18}/></button>
                    </div>
                </header>

                <div className="se-body">
                    {/* Sidebar: Tools & Palette */}
                    <div className="se-sidebar">
                        <div className="tool-group">
                            <label>Tools</label>
                            <div className="tool-grid">
                                <button className={tool === 'pencil' ? 'active' : ''} onClick={() => setTool('pencil')} title="Pencil (P)"><Pencil size={18}/></button>
                                <button className={tool === 'eraser' ? 'active' : ''} onClick={() => setTool('eraser')} title="Eraser (E)"><Eraser size={18}/></button>
                                <button className={tool === 'bucket' ? 'active' : ''} onClick={() => setTool('bucket')} title="Bucket (B)"><PaintBucket size={18}/></button>
                                <button className={tool === 'picker' ? 'active' : ''} onClick={() => setTool('picker')} title="Color Picker (I)"><Pipette size={18}/></button>
                            </div>
                        </div>

                        <div className="tool-group">
                            <label>Color</label>
                            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="color-main" />
                            <div className="palette-grid">
                                {palette.map(p => (
                                    <div 
                                        key={p} 
                                        className={`palette-color ${color === p ? 'active' : ''}`} 
                                        style={{ backgroundColor: p }}
                                        onClick={() => setColor(p)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="tool-group">
                            <label>Grid Size</label>
                            <div className="size-buttons">
                                {[8, 16, 32, 64].map(s => (
                                    <button key={s} className={gridSize === s ? 'active' : ''} onClick={() => changeGridSize(s)}>{s}</button>
                                ))}
                            </div>
                        </div>

                        <div className="tool-group">
                            <label>View</label>
                            <div className="view-grid">
                                <button onClick={() => setZoom(z => Math.min(z + 2, 50))} title="Zoom In"><ZoomIn size={16}/></button>
                                <button onClick={() => setZoom(z => Math.max(z - 2, 2))} title="Zoom Out"><ZoomOut size={16}/></button>
                                <button className={showGrid ? 'active' : ''} onClick={() => setShowGrid(!showGrid)} title="Toggle Grid"><Grid3X3 size={16}/></button>
                            </div>
                        </div>

                        <div className="tool-group">
                            <label>History</label>
                            <div className="history-grid">
                                <button onClick={undo} disabled={historyStep === 0} title="Undo (Ctrl+Z)"><RotateCcw size={16}/></button>
                                <button onClick={redo} disabled={historyStep === history.length - 1} title="Redo (Ctrl+Y)"><RotateCw size={16}/></button>
                            </div>
                        </div>
                    </div>

                    {/* Main Workspace: Canvas */}
                    <div className="se-workspace">
                        <div className="canvas-wrapper">
                            <canvas 
                                ref={canvasRef}
                                onMouseDown={onMouseDown}
                                onMouseMove={onMouseMove}
                                onMouseUp={onMouseUp}
                                onMouseLeave={onMouseUp}
                                onTouchStart={onMouseDown}
                                onTouchMove={onMouseMove}
                                onTouchEnd={onMouseUp}
                                style={{
                                    cursor: tool === 'pencil' ? 'crosshair' : 'pointer',
                                    imageRendering: 'pixelated'
                                }}
                            />
                        </div>
                    </div>

                    {/* Right Sidebar: Preview */}
                    <div className="se-preview-panel">
                        <label>Live Preview (1:1)</label>
                        <div className="preview-box">
                             <div 
                                style={{ 
                                    width: gridSize, 
                                    height: gridSize, 
                                    position: 'relative',
                                    backgroundColor: '#000',
                                    backgroundImage: 'linear-gradient(45deg, #222 25%, transparent 25%), linear-gradient(-45deg, #222 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #222 75%), linear-gradient(-45deg, transparent 75%, #222 75%)',
                                    backgroundSize: '4px 4px',
                                    backgroundPosition: '0 0, 0 2px, 2px -2px, -2px 0px'
                                }}
                            >
                                {pixels.map((row, y) => row.map((px, x) => px && (
                                    <div key={`${x}-${y}`} style={{ position: 'absolute', left: x, top: y, width: 1, height: 1, backgroundColor: px }} />
                                )))}
                            </div>
                        </div>
                        <div className="preview-box scaled">
                             <div 
                                style={{ 
                                    width: 100, 
                                    height: 100, 
                                    position: 'relative',
                                    backgroundColor: '#000',
                                    imageRendering: 'pixelated'
                                }}
                            >
                                {pixels.map((row, y) => row.map((px, x) => px && (
                                    <div key={`${x}-${y}`} style={{ position: 'absolute', left: `${(x/gridSize)*100}%`, top: `${(y/gridSize)*100}%`, width: `${100/gridSize}%`, height: `${100/gridSize}%`, backgroundColor: px }} />
                                )))}
                            </div>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    .sprite-editor-overlay {
                        position: fixed; inset: 0; background: rgba(0,0,0,0.85);
                        z-index: 9999; display: flex; align-items: center; justify-content: center;
                        backdrop-filter: blur(5px);
                    }
                    .sprite-editor-container {
                        width: 95vw; height: 90vh; background: #111; border-radius: 12px;
                        display: flex; flex-direction: column; overflow: hidden;
                        border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                    }
                    @media (max-width: 768px) {
                        .sprite-editor-container { width: 100vw; height: 100vh; border-radius: 0; }
                    }
                    
                    .se-header {
                        padding: 12px 20px; background: #1a1a1a; border-bottom: 1px solid rgba(255,255,255,0.05);
                        display: flex; justify-content: space-between; align-items: center;
                    }
                    .header-title { display: flex; align-items: center; gap: 10px; color: #fff; font-size: 12px; font-weight: 700; letter-spacing: 1px; }
                    .header-actions { display: flex; gap: 10px; }
                    
                    .btn-primary {
                        background: #00f0ff; color: #000; border: none; padding: 6px 14px; border-radius: 4px;
                        font-size: 11px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px;
                    }
                    .btn-close { background: transparent; border: none; color: #666; cursor: pointer; }
                    .btn-close:hover { color: #fff; }

                    .se-body { flex: 1; display: flex; overflow: hidden; }
                    @media (max-width: 768px) {
                        .se-body { flex-direction: column; }
                    }
                    
                    .se-sidebar {
                        width: 180px; background: #151515; border-right: 1px solid rgba(255,255,255,0.05);
                        padding: 15px; display: flex; flex-direction: column; gap: 20px; overflow-y: auto;
                    }
                    @media (max-width: 768px) {
                        .se-sidebar { 
                            width: 100%; height: auto; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.05);
                            flex-direction: row; align-items: flex-start; gap: 15px; padding: 10px;
                        }
                    }
                    
                    .tool-group label { display: block; font-size: 10px; color: #555; text-transform: uppercase; margin-bottom: 8px; font-weight: 700; }
                    @media (max-width: 768px) {
                        .tool-group { min-width: 100px; flex-shrink: 0; }
                        .tool-group label { font-size: 8px; margin-bottom: 4px; }
                    }
                    
                    .tool-grid, .view-grid, .history-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; }
                    @media (max-width: 768px) {
                        .tool-grid, .view-grid, .history-grid { grid-template-columns: repeat(4, 1fr); display: flex; gap: 4px; }
                        .se-sidebar button { padding: 6px; }
                    }
                    
                    .se-sidebar button {
                        background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
                        color: #888; padding: 8px; border-radius: 4px; cursor: pointer; transition: 0.2s;
                        display: flex; align-items: center; justify-content: center;
                    }
                    .se-sidebar button:hover { background: rgba(255,255,255,0.08); color: #fff; }
                    .se-sidebar button.active { background: rgba(0,240,255,0.1); color: #00f0ff; border-color: #00f0ff; }
                    .se-sidebar button:disabled { opacity: 0.2; cursor: not-allowed; }

                    .color-main { width: 100%; height: 36px; border: none; background: transparent; cursor: pointer; padding: 0; }
                    @media (max-width: 768px) { .color-main { height: 24px; width: 40px; } }
                    
                    .palette-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; margin-top: 8px; }
                    @media (max-width: 768px) { 
                        .palette-grid { display: flex; margin-top: 0; overflow-x: auto; padding-bottom: 4px; }
                        .palette-color { min-width: 20px; height: 20px; }
                    }
                    
                    .palette-color { height: 24px; border-radius: 2px; cursor: pointer; border: 1px solid transparent; transition: 0.2s; }
                    .palette-color.active { border-color: #fff; transform: scale(1.1); }

                    .size-buttons { display: flex; gap: 4px; }
                    .size-buttons button { flex: 1; font-size: 10px; padding: 4px; }

                    .se-workspace { flex: 1; background: #0a0a0a; display: flex; align-items: center; justify-content: center; position: relative; overflow: auto; touch-action: none; }
                    .canvas-wrapper { 
                        box-shadow: 0 0 50px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); 
                        background-image: linear-gradient(45deg, #111 25%, transparent 25%), linear-gradient(-45deg, #111 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #111 75%), linear-gradient(-45deg, transparent 75%, #111 75%);
                        background-size: 20px 20px;
                        background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
                    }

                    .se-preview-panel { width: 150px; background: #151515; border-left: 1px solid rgba(255,255,255,0.05); padding: 15px; display: flex; flex-direction: column; gap: 20px; }
                    @media (max-width: 768px) {
                        .se-preview-panel { display: none; }
                    }
                    .preview-box { background: #000; padding: 10px; border-radius: 4px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.05); overflow: hidden; }
                    .preview-box.scaled { height: 120px; }
                `}</style>
            </div>
        </div>
    );
}

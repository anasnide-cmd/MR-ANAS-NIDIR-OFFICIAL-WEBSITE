'use client';
import { useState, useEffect } from 'react';

export default function CanvasWorkspace({ elements, updateElement, selectedId, setSelectedId, canvasRef, scale, canvasBg, commitHistory }) {
    const [draggingId, setDraggingId] = useState(null);
    const [resizingId, setResizingId] = useState(null);
    const [resizeHandle, setResizeHandle] = useState(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const handlePointerDown = (e, id, type) => {
        e.stopPropagation();
        setSelectedId(id);
        const el = elements.find(el => el.id === id);
        if (!el) return;

        if (type.startsWith('resize')) {
            setResizingId(id);
            setResizeHandle(type.split('-')[1]); 
        } else {
            setDraggingId(id);
            // Calculate pointer offset relative to element top-left
            // To ensure it snaps to pointer correctly
            // We use clientX, clientY minus canvas bounding box, then minus element x,y
            if (canvasRef.current) {
                const rect = canvasRef.current.getBoundingClientRect();
                const mouseX = (e.clientX - rect.left) / scale;
                const mouseY = (e.clientY - rect.top) / scale;
                setDragOffset({ x: mouseX - el.x, y: mouseY - el.y });
            }
        }
    };

    const handlePointerMove = (e) => {
        if (!draggingId && !resizingId) return;

        if (canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect();
            let mouseX = (e.clientX - rect.left) / scale;
            let mouseY = (e.clientY - rect.top) / scale;

            if (draggingId) {
                const newX = mouseX - dragOffset.x;
                const newY = mouseY - dragOffset.y;
                updateElement(draggingId, { x: newX, y: newY }, false);
            }

            if (resizingId) {
                const el = elements.find(el => el.id === resizingId);
                if (!el) return;
                
                let { x, y, width, height } = el;
                
                if (resizeHandle === 'br') {
                    width = mouseX - x;
                    height = mouseY - y;
                } else if (resizeHandle === 'bl') {
                    width = (x + width) - mouseX;
                    height = mouseY - y;
                    x = mouseX;
                } else if (resizeHandle === 'tr') {
                    width = mouseX - x;
                    height = (y + height) - mouseY;
                    y = mouseY;
                } else if (resizeHandle === 'tl') {
                    width = (x + width) - mouseX;
                    height = (y + height) - mouseY;
                    x = mouseX;
                    y = mouseY;
                }
                
                // Keep min dims to prevent inversion
                if (width < 20) {
                    if (resizeHandle === 'tl' || resizeHandle === 'bl') x -= (20 - width);
                    width = 20;
                }
                if (height < 20) {
                    if (resizeHandle === 'tl' || resizeHandle === 'tr') y -= (20 - height);
                    height = 20;
                }

                updateElement(resizingId, { x, y, width, height }, false);
            }
        }
    };

    const handlePointerUp = () => {
        if (draggingId || resizingId) {
            commitHistory();
        }
        setDraggingId(null);
        setResizingId(null);
        setResizeHandle(null);
    };

    // Attach listeners to window so dragging doesn't stop if mouse leaves element bounds
    useEffect(() => {
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    });

    const handleTextChange = (e, id) => {
        updateElement(id, { content: e.target.innerText });
    };

    return (
        <main className="design-canvas-wrapper custom-scrollbar" onClick={() => setSelectedId(null)}>
            <div className="canvas-background">
                <div className="artboard-container">
                    {/* Fixed size Artboard */}
                    <div className="artboard" ref={canvasRef} onClick={(e) => e.stopPropagation()}>
                        
                        {elements.map((el) => {
                        const isSelected = selectedId === el.id;
                        
                        return (
                            <div 
                                key={el.id}
                                className={`canvas-element ${isSelected ? 'selected' : ''}`}
                                style={{
                                    transform: `translate(${el.x}px, ${el.y}px)`,
                                    width: el.width,
                                    height: el.type === 'shape' ? el.height : (el.type === 'image' ? el.height : 'auto'),
                                    zIndex: el.zIndex || 1,
                                    cursor: draggingId === el.id ? 'grabbing' : 'grab',
                                    backgroundColor: el.type === 'shape' ? el.color : 'transparent',
                                    backgroundImage: el.type === 'image' ? `url(${el.url})` : 'none',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: el.shapeType === 'circle' ? '50%' : (el.shapeType === 'rounded' ? '16px' : '0px'),
                                    opacity: el.opacity ?? 1,
                                }}
                                onPointerDown={(e) => handlePointerDown(e, el.id, 'drag')}
                            >
                                {el.type === 'text' && (
                                    <div 
                                        className="text-content"
                                        contentEditable
                                        suppressContentEditableWarning
                                        onBlur={(e) => handleTextChange(e, el.id)}
                                        style={{
                                            color: el.color,
                                            fontSize: `${el.fontSize}px`,
                                            fontWeight: el.fontWeight || 'normal',
                                            fontStyle: el.fontStyle || 'normal',
                                            textDecoration: el.textDecoration || 'none',
                                            textAlign: el.textAlign || 'left',
                                            fontFamily: el.fontFamily || 'inherit',
                                            padding: '4px',
                                            outline: 'none',
                                            pointerEvents: isSelected ? 'auto' : 'none',
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    >
                                        {el.content}
                                    </div>
                                )}

                                {isSelected && (
                                    <>
                                        {/* Bounding Box indicators */}
                                        <div className="resize-handle tl" onPointerDown={(e) => handlePointerDown(e, el.id, 'resize-tl')}></div>
                                        <div className="resize-handle tr" onPointerDown={(e) => handlePointerDown(e, el.id, 'resize-tr')}></div>
                                        <div className="resize-handle bl" onPointerDown={(e) => handlePointerDown(e, el.id, 'resize-bl')}></div>
                                        <div className="resize-handle br" onPointerDown={(e) => handlePointerDown(e, el.id, 'resize-br')}></div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .design-canvas-wrapper {
                    flex: 1;
                    background: #1a1a1a;
                    position: relative;
                    overflow: auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-image: 
                        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
                    background-size: 20px 20px;
                }

                .canvas-background {
                    min-width: 1500px;
                    min-height: 1000px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .artboard-container {
                     transform: scale(${scale});
                     transform-origin: center center;
                     transition: transform 0.2s ease-out;
                }

                .artboard {
                    width: 1080px; 
                    height: 1080px; /* Instagram post size standard */
                    background: ${canvasBg};
                    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
                    position: relative;
                    overflow: hidden;
                    touch-action: none; /* Prevents scroll on mobile when dragging */
                }

                .canvas-element {
                    position: absolute;
                    top: 0;
                    left: 0;
                    user-select: none;
                }

                .canvas-element.selected {
                    outline: 1.5px solid #00f0ff; /* Canva blue/cyan */
                }

                .resize-handle {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    background: #fff;
                    border: 1.5px solid #00f0ff;
                    border-radius: 50%;
                    z-index: 20;
                }
                .resize-handle:hover {
                   transform: scale(1.2);
                }

                .tl { top: -5px; left: -5px; cursor: nwse-resize; }
                .tr { top: -5px; right: -5px; cursor: nesw-resize; }
                .bl { bottom: -5px; left: -5px; cursor: nesw-resize; }
                .br { bottom: -5px; right: -5px; cursor: nwse-resize; }
            `}</style>
        </main>
    );
}

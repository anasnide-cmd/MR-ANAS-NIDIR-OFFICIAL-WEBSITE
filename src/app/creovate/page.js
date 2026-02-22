'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import TopBar from '../../components/Creovate/TopBar';
import Toolbar from '../../components/Creovate/Toolbar';
import CanvasWorkspace from '../../components/Creovate/CanvasWorkspace';

export default function CreovatePage() {
    const [elements, setElements] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const canvasRef = useRef(null);

    const addElement = (element) => {
        setElements(prev => [...prev, { ...element, id: Date.now().toString() }]);
    };

    const updateElement = (id, newProps) => {
        setElements(prev => prev.map(el => (el.id === id ? { ...el, ...newProps } : el)));
    };

    const deleteElement = useCallback((id) => {
        setElements(prev => prev.filter(el => el.id !== id));
        if (selectedId === id) setSelectedId(null);
    }, [selectedId]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Delete' || e.key === 'Backspace') {
                const activeTag = document.activeElement?.tagName?.toLowerCase();
                const isEditingText = activeTag === 'input' || activeTag === 'textarea' || document.activeElement?.isContentEditable;
                
                if (selectedId && !isEditingText) {
                    deleteElement(selectedId);
                }
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedId, deleteElement]);

    return (
        <div className="creovate-app" onClick={(e) => {
            // Deselect if clicking outside
            if (e.target.classList.contains('creovate-app') || e.target.classList.contains('canvas-background')) {
                setSelectedId(null);
            }
        }}>
            <TopBar 
                selectedElement={elements.find(el => el.id === selectedId)} 
                updateElement={updateElement} 
                deleteElement={deleteElement} 
                canvasRef={canvasRef}
                setSelectedId={setSelectedId}
            />
            
            <div className="editor-body">
                <Toolbar addElement={addElement} />
                <CanvasWorkspace 
                    elements={elements} 
                    updateElement={updateElement}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    canvasRef={canvasRef}
                />
            </div>

            <style jsx>{`
                .creovate-app {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    width: 100vw;
                    overflow: hidden;
                    background: #050505;
                }

                .editor-body {
                    display: flex;
                    flex: 1;
                    height: calc(100vh - 60px); /* 60px is TopBar height */
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}

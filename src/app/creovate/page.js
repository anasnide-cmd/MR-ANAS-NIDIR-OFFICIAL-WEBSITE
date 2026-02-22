'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { db } from '../../lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';

import TopBar from '../../components/Creovate/TopBar';
import Toolbar from '../../components/Creovate/Toolbar';
import CanvasWorkspace from '../../components/Creovate/CanvasWorkspace';

export default function CreovatePage() {
    const [elements, setElements] = useState([]);
    const [history, setHistory] = useState([[]]); // Stack of element arrays
    const [historyIndex, setHistoryIndex] = useState(0);

    const [selectedId, setSelectedId] = useState(null);
    const [scale, setScale] = useState(1);
    const [canvasBg, setCanvasBg] = useState('#ffffff');
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const canvasRef = useRef(null);

    // Wrapper for state updates to trigger history
    const updateStateAndHistory = (newElements) => {
        setHistory(prevHistory => {
            const newHistory = prevHistory.slice(0, historyIndex + 1);
            newHistory.push(newElements);
            setHistoryIndex(newHistory.length - 1);
            return newHistory;
        });
        setElements(newElements);
    };

    const commitHistory = () => {
        setHistory(prevHistory => {
            // Prevent duplicate history pushes if it hasn't changed
            if (prevHistory[historyIndex] === elements) return prevHistory;
            const newHistory = prevHistory.slice(0, historyIndex + 1);
            newHistory.push(elements);
            setHistoryIndex(newHistory.length - 1);
            return newHistory;
        });
    };

    const undo = () => {
        if (historyIndex > 0) {
            setHistoryIndex(prev => prev - 1);
            setElements(history[historyIndex - 1]);
            setSelectedId(null);
        }
    };

    const redo = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(prev => prev + 1);
            setElements(history[historyIndex + 1]);
            setSelectedId(null);
        }
    };

    const addElement = (element) => {
        const newEls = [...elements, { ...element, id: Date.now().toString() }];
        updateStateAndHistory(newEls);
    };

    const updateElement = (id, newProps, saveHistory = true) => {
        const newEls = elements.map(el => (el.id === id ? { ...el, ...newProps } : el));
        if (saveHistory) {
            updateStateAndHistory(newEls);
        } else {
            setElements(newEls);
        }
    };

    const deleteElement = useCallback((id) => {
        const newEls = elements.filter(el => el.id !== id);
        updateStateAndHistory(newEls);
        if (selectedId === id) setSelectedId(null);
    }, [elements, history, historyIndex, selectedId]);

    const duplicateElement = useCallback((id) => {
        const elToClone = elements.find(el => el.id === id);
        if (!elToClone) return;

        const clonedEl = {
            ...elToClone,
            id: Date.now().toString(),
            x: elToClone.x + 20, // offset slightly
            y: elToClone.y + 20,
            zIndex: Math.max(...elements.map(e => e.zIndex || 1)) + 1 // put on top
        };

        const newEls = [...elements, clonedEl];
        updateStateAndHistory(newEls);
        setSelectedId(clonedEl.id); // select the new clone
    }, [elements, history, historyIndex]);

    const saveProject = async () => {
        setIsSaving(true);
        try {
            await addDoc(collection(db, 'creovate_projects'), {
                elements,
                canvasBg,
                createdAt: serverTimestamp()
            });
            alert('Project saved successfully!');
        } catch (err) {
            console.warn('Error saving project:', err.message);
            alert('Failed to save project. Check console.');
        } finally {
            setIsSaving(false);
        }
    };

    const loadLatestProject = async () => {
        try {
            const q = query(collection(db, 'creovate_projects'), orderBy('createdAt', 'desc'), limit(1));
            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
                const data = snapshot.docs[0].data();
                if (data.elements) setElements(data.elements);
                if (data.canvasBg) setCanvasBg(data.canvasBg);
                // reset history
                setHistory([data.elements || []]);
                setHistoryIndex(0);
            }
        } catch (err) {
            console.warn('Wait, no latest project found or permission restricted:', err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadLatestProject();
        // Initial mobile scale check
        if (window.innerWidth <= 768) {
            setScale(0.35);
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            const activeTag = document.activeElement?.tagName?.toLowerCase();
            const isEditingText = activeTag === 'input' || activeTag === 'textarea' || document.activeElement?.isContentEditable;
            
            if (isEditingText) return; // don't hijack typing

            // Delete
            if (e.key === 'Delete' || e.key === 'Backspace') {
                if (selectedId) {
                    deleteElement(selectedId);
                }
            }

            // Duplicate (Ctrl+D or Cmd+D)
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
                e.preventDefault(); // prevent browser bookmark
                if (selectedId) {
                    duplicateElement(selectedId);
                }
            }

            // Keyboard Nudging (Arrow Keys)
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                if (selectedId) {
                    e.preventDefault(); // prevent page scroll
                    const elToMove = elements.find(el => el.id === selectedId);
                    if (!elToMove) return;

                    const nudgeAmount = e.shiftKey ? 10 : 1;
                    let { x, y } = elToMove;

                    if (e.key === 'ArrowUp') y -= nudgeAmount;
                    if (e.key === 'ArrowDown') y += nudgeAmount;
                    if (e.key === 'ArrowLeft') x -= nudgeAmount;
                    if (e.key === 'ArrowRight') x += nudgeAmount;

                    // Update without saving to history every single tap to prevent lag
                    updateElement(selectedId, { x, y }, false);
                }
            }
        };
        
        const handleKeyUp = (e) => {
             // Commit history when nudge finishes
             if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                 if (selectedId) {
                     commitHistory();
                 }
             }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [selectedId, deleteElement, duplicateElement, elements, commitHistory]);

    if (isLoading) {
        return (
            <div className="creovate-app" style={{justifyContent: 'center', alignItems: 'center', color: '#ffca28'}}>
                <h2>Loading Workspace...</h2>
            </div>
        );
    }

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
                duplicateElement={duplicateElement}
                canvasRef={canvasRef}
                setSelectedId={setSelectedId}
                scale={scale}
                setScale={setScale}
                undo={undo}
                redo={redo}
                canUndo={historyIndex > 0}
                canRedo={historyIndex < history.length - 1}
                elements={elements}
                saveProject={saveProject}
                isSaving={isSaving}
            />
            
            <div className="editor-body">
                <Toolbar addElement={addElement} canvasBg={canvasBg} setCanvasBg={setCanvasBg} />
                <CanvasWorkspace 
                    elements={elements} 
                    updateElement={updateElement}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    canvasRef={canvasRef}
                    scale={scale}
                    canvasBg={canvasBg}
                    commitHistory={commitHistory}
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
                
                @media (max-width: 768px) {
                    .editor-body {
                        flex-direction: column-reverse;
                    }
                }
            `}</style>
        </div>
    );
}

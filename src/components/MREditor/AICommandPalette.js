'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, Sparkles, X, CornerDownLeft, Search } from 'lucide-react';

export default function AICommandPalette({ isOpen, onClose, onCommand }) {
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        onCommand(query.trim());
        onClose();
    };

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="palette-overlay">
                    <motion.div 
                        className="palette-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div 
                        className="palette-content"
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    >
                        <form onSubmit={handleSubmit} className="palette-form">
                            <div className="input-icon">
                                <Sparkles size={18} className="sparkle-icon" />
                            </div>
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="What should we build next? (e.g., 'Add a dark theme button')"
                                className="palette-input"
                            />
                            <div className="input-hint">
                                <CornerDownLeft size={12} />
                                <span>ENTER</span>
                            </div>
                        </form>
                        
                        <div className="palette-suggestions">
                            <div className="suggestion-label">QUICK ACTIONS</div>
                            <div className="suggestion-grid">
                                <button type="button" onClick={() => { setQuery('Fix all bugs in this file'); inputRef.current?.focus(); }}>
                                    <Sparkles size={12} /> Fix Bugs
                                </button>
                                <button type="button" onClick={() => { setQuery('Add detailed comments to the code'); inputRef.current?.focus(); }}>
                                    <Search size={12} /> Add Documentation
                                </button>
                                <button type="button" onClick={() => { setQuery('Refactor this to use modern ES6 syntax'); inputRef.current?.focus(); }}>
                                    <Command size={12} /> Refactor Code
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    <style jsx>{`
                        .palette-overlay {
                            position: fixed;
                            inset: 0;
                            z-index: 9999;
                            display: flex;
                            align-items: flex-start;
                            justify-content: center;
                            padding-top: 15vh;
                        }
                        .palette-backdrop {
                            position: absolute;
                            inset: 0;
                            background: rgba(0, 0, 0, 0.7);
                            backdrop-filter: blur(8px);
                        }
                        .palette-content {
                            position: relative;
                            width: 100%;
                            max-width: 600px;
                            background: rgba(15, 15, 20, 0.95);
                            border: 1px solid rgba(0, 240, 255, 0.2);
                            border-radius: 16px;
                            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 240, 255, 0.1);
                            overflow: hidden;
                            margin: 0 20px;
                        }
                        .palette-form {
                            display: flex;
                            align-items: center;
                            padding: 16px 20px;
                            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                            background: rgba(255, 255, 255, 0.02);
                        }
                        .input-icon {
                            margin-right: 15px;
                            color: #00f0ff;
                        }
                        .sparkle-icon {
                            filter: drop-shadow(0 0 5px rgba(0, 240, 255, 0.5));
                        }
                        .palette-input {
                            flex: 1;
                            background: transparent;
                            border: none;
                            color: #fff;
                            font-size: 16px;
                            font-family: 'Inter', sans-serif;
                            outline: none;
                        }
                        .palette-input::placeholder {
                            color: rgba(255, 255, 255, 0.3);
                        }
                        .input-hint {
                            display: flex;
                            align-items: center;
                            gap: 5px;
                            background: rgba(255, 255, 255, 0.05);
                            padding: 4px 8px;
                            border-radius: 4px;
                            font-size: 10px;
                            font-weight: 800;
                            color: rgba(255, 255, 255, 0.5);
                            border: 1px solid rgba(255, 255, 255, 0.1);
                        }
                        .palette-suggestions {
                            padding: 15px 20px;
                        }
                        .suggestion-label {
                            font-size: 10px;
                            font-weight: 800;
                            color: rgba(255, 255, 255, 0.3);
                            letter-spacing: 1px;
                            margin-bottom: 12px;
                        }
                        .suggestion-grid {
                            display: flex;
                            flex-wrap: wrap;
                            gap: 10px;
                        }
                        .suggestion-grid button {
                            background: rgba(255, 255, 255, 0.03);
                            border: 1px solid rgba(255, 255, 255, 0.08);
                            color: rgba(255, 255, 255, 0.7);
                            padding: 8px 12px;
                            border-radius: 8px;
                            font-size: 12px;
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            transition: 0.2s;
                        }
                        .suggestion-grid button:hover {
                            background: rgba(0, 240, 255, 0.1);
                            border-color: rgba(0, 240, 255, 0.4);
                            color: #00f0ff;
                            transform: translateY(-2px);
                        }

                        @media (max-width: 768px) {
                            .palette-overlay {
                                padding-top: 5vh;
                            }
                            .palette-content {
                                margin: 0 10px;
                                border-radius: 12px;
                            }
                            .palette-form {
                                padding: 12px 15px;
                            }
                            .palette-input {
                                font-size: 14px;
                            }
                            .input-hint {
                                display: none;
                            }
                            .suggestion-grid {
                                gap: 8px;
                            }
                            .suggestion-grid button {
                                padding: 6px 10px;
                                font-size: 11px;
                            }
                        }
                    `}</style>
                </div>
            )}
        </AnimatePresence>
    );
}

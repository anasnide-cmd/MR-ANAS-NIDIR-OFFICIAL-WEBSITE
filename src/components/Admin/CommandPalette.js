'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, getDocs, limit, where } from 'firebase/firestore';
import { db } from '../../lib/firebase'; // Adjust path as needed
import Link from 'next/link';

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [queryText, setQueryText] = useState('');
    const [results, setResults] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);
    const router = useRouter();

    // Toggle with Ctrl+K / Cmd+K
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
            setQueryText('');
            setResults(staticCommands);
        }
    }, [isOpen]);

    // Handle search logic
    useEffect(() => {
        const search = async () => {
            if (!queryText) {
                setResults(staticCommands);
                return;
            }

            const lowerQuery = queryText.toLowerCase();
            
            // Filter static commands
            const filteredCommands = staticCommands.filter(cmd => 
                cmd.label.toLowerCase().includes(lowerQuery)
            );

            // Search Users (Realtime from Firestore would be better, but simulated for speed/demo)
            // In a real app, you might debounce this and fetch from API
            // For now, we'll just show a "Search for..." action if it looks like an email/user
            let dynamicResults = [];
            if (queryText.length > 2) {
                dynamicResults.push({
                    id: 'search-user',
                    label: `SEARCH AGENT: "${queryText}"`,
                    type: 'action',
                    action: () => router.push(`/admin/users?search=${queryText}`)
                });
                dynamicResults.push({
                    id: 'search-site',
                    label: `SCAN SECTOR: "${queryText}"`,
                    type: 'action',
                    action: () => router.push(`/admin/sites?search=${queryText}`)
                });
            }

            setResults([...filteredCommands, ...dynamicResults]);
            setSelectedIndex(0);
        };

        const timeoutId = setTimeout(search, 200);
        return () => clearTimeout(timeoutId);
    }, [queryText, router]);

    // Handle selection
    const handleSelect = (item) => {
        if (item.action) {
            item.action();
        } else if (item.href) {
            router.push(item.href);
        }
        setIsOpen(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev + 1) % results.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (results[selectedIndex]) {
                handleSelect(results[selectedIndex]);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="palette-overlay" onClick={() => setIsOpen(false)}>
            <div className="palette-modal" onClick={e => e.stopPropagation()}>
                <div className="palette-header">
                    <span className="prompt">root@optic-zero:~$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={queryText}
                        onChange={e => setQueryText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="EXECUTE COMMAND..."
                        className="palette-input"
                    />
                    <span className="cursor-block">█</span>
                </div>
                
                <div className="palette-results">
                    {results.length > 0 ? (
                        results.map((item, index) => (
                            <div 
                                key={item.id} 
                                className={`result-item ${index === selectedIndex ? 'selected' : ''}`}
                                onClick={() => handleSelect(item)}
                                onMouseEnter={() => setSelectedIndex(index)}
                            >
                                <span className="icon">{item.icon || '➜'}</span>
                                <div className="info">
                                    <span className="label">{item.label}</span>
                                    {item.desc && <span className="desc">{item.desc}</span>}
                                </div>
                                {item.shortcut && <span className="shortcut">{item.shortcut}</span>}
                            </div>
                        ))
                    ) : (
                        <div className="no-results">NO MATCHING PROTOCOLS FOUND</div>
                    )}
                </div>
                
                <div className="palette-footer">
                    <span>Target: SYSTEM_CORE</span>
                    <span>Status: UNLOCKED</span>
                    <span>[ESC] TO ABORT</span>
                </div>
            </div>

            <style jsx>{`
                .palette-overlay {
                    position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(5px);
                    z-index: 9999; display: flex; align-items: flex-start; justify-content: center;
                    padding-top: 10vh; animation: fadeIn 0.1s;
                }
                .palette-modal {
                    width: 600px; max-width: 90%; background: #050505;
                    border: 1px solid var(--cia-accent);
                    box-shadow: 0 0 50px rgba(0, 243, 255, 0.15);
                    border-radius: 8px; overflow: hidden;
                    font-family: 'Share Tech Mono', monospace;
                }
                
                .palette-header {
                    display: flex; align-items: center; padding: 15px 20px;
                    border-bottom: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.02);
                }
                .prompt { color: var(--cia-success); margin-right: 10px; opacity: 0.8; font-size: 0.9rem; }
                .palette-input {
                    background: transparent; border: none; color: #fff; font-family: inherit;
                    font-size: 1.1rem; flex: 1; outline: none; text-transform: uppercase;
                }
                .cursor-block { animation: flicker 1s infinite; color: var(--cia-accent); margin-left: 5px; }

                .palette-results { max-height: 400px; overflow-y: auto; padding: 10px 0; }
                
                .result-item {
                    display: flex; align-items: center; padding: 10px 20px; cursor: pointer;
                    border-left: 2px solid transparent; color: rgba(255,255,255,0.7);
                }
                .result-item.selected {
                    background: rgba(0, 243, 255, 0.1);
                    border-left-color: var(--cia-accent);
                    color: #fff;
                }
                .result-item .icon { margin-right: 15px; width: 20px; text-align: center; }
                .result-item .info { flex: 1; display: flex; flex-direction: column; }
                .result-item .label { font-weight: bold; font-size: 0.9rem; }
                .result-item .desc { font-size: 0.7rem; opacity: 0.5; margin-top: 2px; }
                .result-item .shortcut { font-size: 0.7rem; opacity: 0.4; border: 1px solid rgba(255,255,255,0.2); padding: 2px 5px; border-radius: 4px; }
                
                .no-results { padding: 20px; text-align: center; color: var(--cia-alert); opacity: 0.7; }
                
                .palette-footer {
                    padding: 8px 20px; background: rgba(0,0,0,0.5); font-size: 0.7rem; color: rgba(255,255,255,0.3);
                    display: flex; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.05);
                }

                @keyframes flicker { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
                @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
            `}</style>
        </div>
    );
}

const staticCommands = [
    { id: 'dash', label: 'DASHBOARD', desc: 'Return to Command Center', href: '/admin', icon: '⌂' },
    { id: 'users', label: 'AGENT DATABASE', desc: 'Manage User Personnel', href: '/admin/users', icon: '👥' },
    { id: 'sites', label: 'PLATFORM SURVEILLANCE', desc: 'Monitor Deployed Nodes', href: '/admin/sites', icon: '🌐' },
    { id: 'monitor', label: 'NEXUS EYE', desc: 'Threat Detection System', href: '/admin/monitor', icon: '👁' },
    { id: 'logs', label: 'SYSTEM LOGS', desc: 'View Raw Event Streams', href: '/admin/settings', icon: '≡' },
    { id: 'logout', label: 'TERMINATE SESSION', desc: 'Secure Logout', action: () => document.querySelector('.logout-button')?.click(), icon: '✕' },
];

'use client';
import { useState, useEffect } from 'react';
import { db } from '@mr/core/firebase';
import { doc, updateDoc, deleteDoc, collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
import { X, Save, Trash2, Globe, Lock, Gamepad2, Clock, UserPlus, ShieldAlert, BookOpen } from 'lucide-react';

export default function GameSettingsModal({ game, user, onClose, onUpdate, onDelete }) {
    const [activeTab, setActiveTab] = useState('params'); // 'params', 'history', 'ownership'
    const [formData, setFormData] = useState({
        name: game.name || '',
        slug: game.slug || '',
        description: game.description || '',
        status: game.status || 'draft',
        genre: game.genre || 'Action',
        controls: game.controls || 'Keyboard/Mouse'
    });
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState('');
    const [history, setHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(false);
    
    // Transfer Ownership state
    const [transferEmail, setTransferEmail] = useState('');
    const [transferring, setTransferring] = useState(false);

    useEffect(() => {
        if (activeTab === 'history') {
            fetchHistory();
        }
    }, [activeTab]);

    const fetchHistory = async () => {
        setLoadingHistory(true);
        try {
            const historyRef = collection(db, 'user_games', game.id, 'history');
            const q = query(historyRef, orderBy('timestamp', 'desc'), limit(20));
            const snap = await getDocs(q);
            setHistory(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        } catch (err) {
            console.error("Failed to fetch history:", err);
        } finally {
            setLoadingHistory(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        setError('');
        try {
             // Basic slug validation
             const slugRegex = /^[a-z0-9-]+$/;
             if (formData.slug && !slugRegex.test(formData.slug)) {
                 throw new Error("Slug can only contain lowercase letters, numbers, and hyphens.");
             }

            const gameRef = doc(db, 'user_games', game.id);
            const updates = {
                name: formData.name,
                slug: formData.slug,
                description: formData.description,
                status: formData.status,
                genre: formData.genre,
                controls: formData.controls,
                updatedAt: new Date().toISOString()
            };

            await updateDoc(gameRef, updates);
            
            onUpdate({ ...game, ...updates }); // Optimistic UI update
            onClose();
        } catch (err) {
            console.error("Failed to update game settings:", err);
            setError(err.message || 'Failed to update settings. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleTransfer = async () => {
        if (!transferEmail) {
            setError("Please enter the recipient's email.");
            return;
        }

        if (transferEmail.toLowerCase() === user?.email?.toLowerCase()) {
            setError("You already own this game.");
            return;
        }

        if (!confirm(`Are you sure you want to transfer ownership of "${game.name}" to ${transferEmail}?`)) {
            return;
        }

        setTransferring(true);
        setError('');
        try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', transferEmail.toLowerCase()));
            const snap = await getDocs(q);

            if (snap.empty) {
                throw new Error("Recipient user not found. They must have an account.");
            }

            const targetUid = snap.docs[0].id;

            const gameRef = doc(db, 'user_games', game.id);
            await updateDoc(gameRef, {
                userId: targetUid,
                updatedAt: new Date().toISOString()
            });

            onDelete(game.id);
            onClose();
            alert(`Game successfully transferred to ${transferEmail}.`);
        } catch (err) {
            console.error("Transfer failed:", err);
            setError(err.message || "Failed to transfer ownership.");
        } finally {
            setTransferring(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm(`Are you absolutely sure you want to delete "${game.name || 'Untitled'}"? This cannot be undone.`)) {
            return;
        }

        setDeleting(true);
        setError('');
        try {
            await deleteDoc(doc(db, 'user_games', game.id));
            onDelete(game.id);
            onClose();
        } catch (err) {
            console.error("Failed to delete game:", err);
            setError('Failed to delete game. Please try again.');
            setDeleting(false);
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-head">
                    <h2>Game Protocol Parameters</h2>
                    <button onClick={onClose}><X size={20}/></button>
                </div>

                <div className="modal-tabs">
                    <button className={activeTab === 'params' ? 'active' : ''} onClick={() => setActiveTab('params')}>Metadata</button>
                    <button className={activeTab === 'history' ? 'active' : ''} onClick={() => setActiveTab('history')}>Sequence</button>
                    <button className={activeTab === 'ownership' ? 'active' : ''} onClick={() => setActiveTab('ownership')}>Auth</button>
                </div>

                {error && <div className="error-banner">{error}</div>}

                <div className="modal-body">
                    {activeTab === 'params' && (
                        <div className="tab-pane">
                            <div className="form-group">
                                <label>Game Title</label>
                                <input 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    placeholder="e.g. Neon Tactics"
                                    className="text-input"
                                />
                            </div>

                            <div className="form-group">
                                <label>Arcade Slug</label>
                                <div className="slug-input-wrapper">
                                    <span className="slug-prefix">mr-games/u/</span>
                                    <input 
                                        name="slug" 
                                        value={formData.slug} 
                                        onChange={handleChange} 
                                        placeholder="neon-tactics"
                                        className="text-input slug-input"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea 
                                    name="description" 
                                    value={formData.description} 
                                    onChange={handleChange} 
                                    placeholder="Brief description of your game..."
                                    className="text-area"
                                    rows={3}
                                />
                            </div>

                            <div className="form-group row-group">
                                <div className="half-width">
                                    <label>Genre</label>
                                    <select name="genre" value={formData.genre} onChange={handleChange} className="select-input">
                                        <option value="Action">Action</option>
                                        <option value="Adventure">Adventure</option>
                                        <option value="Puzzle">Puzzle</option>
                                        <option value="RPG">RPG</option>
                                        <option value="Shooter">Shooter</option>
                                        <option value="Simulation">Simulation</option>
                                    </select>
                                </div>
                                <div className="half-width">
                                    <label>Arcade Status</label>
                                    <select name="status" value={formData.status} onChange={handleChange} className="select-input">
                                        <option value="draft">DEVELOPMENT (Internal)</option>
                                        <option value="public">PUBLISHED (Live)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Control Scheme</label>
                                <input 
                                    name="controls" 
                                    value={formData.controls} 
                                    onChange={handleChange} 
                                    placeholder="e.g. WASD to move, Space to shoot"
                                    className="text-input"
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div className="tab-pane history-pane">
                            {loadingHistory ? (
                                <div className="loading-state">Syncing sequence history...</div>
                            ) : history.length > 0 ? (
                                <div className="history-list">
                                    {history.map(item => (
                                        <div key={item.id} className="history-item">
                                            <div className="history-icon"><Clock size={14}/></div>
                                            <div className="history-details">
                                                <p className="history-action">{item.action}</p>
                                                <p className="history-meta">By {item.userName} • {item.timestamp?.toDate ? item.timestamp.toDate().toLocaleString() : 'Just now'}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-history">No recorded events for this game core.</div>
                            )}
                        </div>
                    )}

                    {activeTab === 'ownership' && (
                        <div className="tab-pane ownership-pane">
                            <div className="alert-box warning">
                                <ShieldAlert size={20} />
                                <div>
                                    <h4>Transfer Protocol</h4>
                                    <p>Transferring ownership is permanent. You will lose all control over this game core immediately.</p>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Recipient Email Address</label>
                                <div className="transfer-input-group">
                                    <input 
                                        type="email"
                                        value={transferEmail}
                                        onChange={(e) => setTransferEmail(e.target.value)}
                                        placeholder="dev@mrgames.com"
                                        className="text-input"
                                    />
                                    <button 
                                        className="btn-transfer" 
                                        onClick={handleTransfer}
                                        disabled={transferring || !transferEmail}
                                    >
                                        <UserPlus size={16} /> {transferring ? 'TRANSFERRING...' : 'TRANSFER'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="modal-footer">
                    <button className="btn-danger" onClick={handleDelete} disabled={deleting || saving}>
                        {deleting ? 'DELETING...' : <><Trash2 size={16} /> DELETE CORE</>}
                    </button>
                    <div className="footer-right">
                        <button className="btn-secondary" onClick={onClose} disabled={saving || deleting}>CANCEL</button>
                        <button className="btn-primary" onClick={handleSave} disabled={saving || deleting}>
                            {saving ? 'UPDATING...' : <><Save size={16} /> COMMIT CHANGES</>}
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .modal-backdrop {
                    position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(8px);
                    display: flex; align-items: center; justify-content: center; z-index: 200;
                    animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    padding: 20px;
                }
                .modal-content {
                    background: #050505; border: 1px solid #00f0ff; border-radius: 20px;
                    width: 600px; max-width: 95vw; max-height: 90vh; display: flex; flex-direction: column;
                    box-shadow: 0 0 50px rgba(0,240,255,0.1);
                    font-family: 'Inter', sans-serif; overflow: hidden;
                }
                @media (max-width: 600px) {
                    .modal-content { width: 100vw; height: 100vh; max-width: 100vw; max-height: 100vh; border-radius: 0; border: none; }
                    .modal-head { padding: 15px 20px; }
                    .modal-tabs { padding: 0 10px; overflow-x: auto; }
                    .modal-tabs button { padding: 10px 15px; font-size: 0.75rem; white-space: nowrap; }
                    .modal-body { padding: 15px; }
                    .modal-footer { padding: 15px; flex-direction: column; gap: 15px; }
                    .footer-right { width: 100%; flex-direction: column; gap: 8px; }
                    .footer-right button, .btn-danger { width: 100%; justify-content: center; }
                }
                .modal-head { 
                    display: flex; justify-content: space-between; align-items: center; 
                    padding: 24px; border-bottom: 1px solid rgba(0,240,255,0.1);
                }
                .modal-head h2 { font-family: 'Orbitron'; font-size: 1.2rem; color: #fff; letter-spacing: 2px; font-weight: 700; margin: 0; }
                .modal-head button { background: none; border: none; color: #888; cursor: pointer; transition: 0.2s; display: flex; padding: 4px; border-radius: 4px; }
                .modal-head button:hover { color: #fff; background: rgba(0,240,255,0.1); }

                .modal-tabs {
                    display: flex; background: rgba(255,255,255,0.02); padding: 0 24px; border-bottom: 1px solid rgba(255,255,255,0.05);
                }
                .modal-tabs button {
                    background: none; border: none; color: #666; padding: 12px 20px; font-size: 0.85rem; font-weight: 640; cursor: pointer;
                    border-bottom: 2px solid transparent; transition: 0.2s; text-transform: uppercase; letter-spacing: 1px;
                }
                .modal-tabs button:hover { color: #fff; }
                .modal-tabs button.active { color: #00f0ff; border-bottom-color: #00f0ff; }

                .error-banner {
                    background: rgba(255, 68, 68, 0.1); color: #ff4444; border-bottom: 1px solid rgba(255, 68, 68, 0.2);
                    padding: 12px 24px; font-size: 0.85rem; font-weight: 600; text-align: center;
                }

                .modal-body { padding: 24px; overflow-y: auto; display: flex; flex-direction: column; }
                .tab-pane { display: flex; flex-direction: column; gap: 20px; animation: fadeIn 0.2s ease-out; }
                
                .form-group { display: flex; flex-direction: column; gap: 8px; }
                .form-group label { font-size: 0.8rem; color: #666; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
                
                .text-input, .text-area, .select-input {
                    background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.1); color: #fff;
                    padding: 12px 16px; border-radius: 12px; font-size: 1rem; font-family: 'Inter', sans-serif;
                    transition: 0.2s; outline: none; width: 100%;
                }
                .text-input:focus, .text-area:focus, .select-input:focus {
                    border-color: #00f0ff; background: rgba(0, 240, 255, 0.05); box-shadow: 0 0 15px rgba(0,240,255,0.1);
                }
                .text-area { resize: vertical; min-height: 80px; }
                
                .slug-input-wrapper { display: flex; align-items: stretch; }
                .slug-prefix { 
                    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-right: none;
                    padding: 0 16px; border-radius: 12px 0 0 12px; display: flex; align-items: center; color: #888; font-size: 0.9rem;
                    font-family: monospace;
                }
                .slug-input { border-radius: 0 12px 12px 0; font-family: monospace; }

                .row-group { flex-direction: row; gap: 24px; }
                @media (max-width: 600px) {
                    .row-group { flex-direction: column; gap: 20px; }
                    .slug-input-wrapper { flex-direction: column; }
                    .slug-prefix { border-radius: 12px 12px 0 0; border-right: 1px solid rgba(255,255,255,0.1); border-bottom: none; padding: 8px 12px; font-size: 0.8rem; }
                    .slug-input { border-radius: 0 0 12px 12px; }
                    .transfer-input-group { flex-direction: column; }
                    .btn-transfer { padding: 12px; justify-content: center; }
                }
                .half-width { flex: 1; display: flex; flex-direction: column; gap: 8px; }

                .alert-box { 
                    display: flex; gap: 16px; padding: 16px; border-radius: 12px;
                }
                .alert-box.warning { background: rgba(255, 68, 68, 0.1); border: 1px solid rgba(255, 68, 68, 0.2); color: #ff4444; }
                .alert-box h4 { margin: 0 0 4px 0; font-family: 'Orbitron'; font-size: 0.9rem; }
                .alert-box p { margin: 0; font-size: 0.85rem; opacity: 0.8; }

                .history-list { display: flex; flex-direction: column; gap: 12px; }
                .history-item { 
                    display: flex; gap: 12px; padding: 12px; background: rgba(255,255,255,0.02); border-radius: 12px;
                }
                .history-icon { color: #00f0ff; }
                .history-action { font-size: 0.9rem; font-weight: 600; color: #fff; margin: 0; }
                .history-meta { font-size: 0.75rem; color: #666; margin: 2px 0 0 0; }
                .empty-history, .loading-state { text-align: center; padding: 40px; color: #666; }

                .transfer-input-group { display: flex; gap: 12px; }
                .btn-transfer {
                    background: #00f0ff; color: #000; border: none; padding: 0 20px; border-radius: 12px; font-weight: 800;
                    cursor: pointer; display: flex; align-items: center; gap: 8px;
                }

                .modal-footer {
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 24px; border-top: 1px solid rgba(0,240,255,0.1);
                }
                .footer-right { display: flex; gap: 12px; }

                .btn-danger {
                    background: transparent; color: #ff4444; border: 1px solid rgba(255,68,68,0.3);
                    padding: 10px 16px; border-radius: 12px; font-weight: 600; cursor: pointer;
                    display: flex; align-items: center; gap: 8px;
                }
                .btn-danger:hover:not(:disabled) { background: rgba(255,68,68,0.1); }

                .btn-secondary {
                    background: transparent; color: #888; border: 1px solid rgba(255,255,255,0.1);
                    padding: 10px 20px; border-radius: 12px; font-weight: 600; cursor: pointer;
                }
                .btn-secondary:hover:not(:disabled) { color: #fff; border-color: #fff; }

                .btn-primary {
                    background: #00f0ff; color: #000; border: none;
                    padding: 10px 24px; border-radius: 12px; font-weight: 800; cursor: pointer;
                    display: flex; align-items: center; gap: 8px;
                }
                .btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,240,255,0.3); }

                button:disabled { opacity: 0.5; cursor: not-allowed; }

                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
}

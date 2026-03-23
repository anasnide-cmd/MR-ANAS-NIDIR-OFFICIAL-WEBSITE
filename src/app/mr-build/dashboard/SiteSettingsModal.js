'use client';
import { useState, useEffect } from 'react';
import { db } from '../../../lib/firebase';
import { doc, updateDoc, deleteDoc, collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
import { X, Save, Trash2, Globe, Lock, DollarSign, Clock, UserPlus, ShieldAlert } from 'lucide-react';
import { addSiteLog } from '../../../lib/siteHistory';

export default function SiteSettingsModal({ site, user, onClose, onUpdate, onDelete }) {
    const [activeTab, setActiveTab] = useState('params'); // 'params', 'history', 'ownership', 'marketplace'
    const [formData, setFormData] = useState({
        name: site.name || '',
        slug: site.slug || '',
        description: site.description || '',
        status: site.status || 'draft',
        monetizationEnabled: site.monetization?.enabled || false,
        publisherId: site.monetization?.publisherId || '',
        isForSale: site.isForSale || false,
        salePrice: site.salePrice || 0
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
            const historyRef = collection(db, 'user_sites', site.id, 'history');
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

            const siteRef = doc(db, 'user_sites', site.id);
            const updates = {
                name: formData.name,
                slug: formData.slug,
                description: formData.description,
                status: formData.status,
                monetization: {
                    enabled: formData.monetizationEnabled,
                    publisherId: formData.publisherId
                },
                isForSale: formData.isForSale,
                salePrice: parseFloat(formData.salePrice) || 0,
                updatedAt: new Date().toISOString()
            };

            await updateDoc(siteRef, updates);
            
            // Log the change
            await addSiteLog(
                site.id, 
                user?.uid, 
                user?.displayName || user?.email, 
                "Updated site parameters", 
                { changes: updates }
            );

            onUpdate({ ...site, ...updates }); // Optimistic UI update
            onClose();
        } catch (err) {
            console.error("Failed to update site settings:", err);
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
            setError("You already own this site.");
            return;
        }

        if (!confirm(`Are you sure you want to transfer ownership of "${site.name}" to ${transferEmail}? You will lose access to this construct.`)) {
            return;
        }

        setTransferring(true);
        setError('');
        try {
            // Find target user by email
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', transferEmail.toLowerCase()));
            const snap = await getDocs(q);

            if (snap.empty) {
                throw new Error("Recipient user not found in the system. They must have a MR BUILD account.");
            }

            const targetUser = snap.docs[0].data();
            const targetUid = snap.docs[0].id;

            // Update ownership
            const siteRef = doc(db, 'user_sites', site.id);
            await updateDoc(siteRef, {
                userId: targetUid,
                updatedAt: new Date().toISOString()
            });

            // Log transfer
            await addSiteLog(
                site.id, 
                user?.uid, 
                user?.displayName || user?.email, 
                `Transferred ownership to ${transferEmail}`, 
                { from: user?.email, to: transferEmail }
            );

            onDelete(site.id); // Remove from current user's dashboard
            onClose();
            alert(`Site successfully transferred to ${transferEmail}.`);
        } catch (err) {
            console.error("Transfer failed:", err);
            setError(err.message || "Failed to transfer ownership.");
        } finally {
            setTransferring(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm(`Are you absolutely sure you want to delete "${site.name || 'Untitled'}"? This cannot be undone.`)) {
            return;
        }

        setDeleting(true);
        setError('');
        try {
            await deleteDoc(doc(db, 'user_sites', site.id));
            onDelete(site.id); // Remove from local state
            onClose();
        } catch (err) {
            console.error("Failed to delete site:", err);
            setError('Failed to delete site. Please try again.');
            setDeleting(false);
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-head">
                    <h2>Site Construct Parameters</h2>
                    <button onClick={onClose}><X size={20}/></button>
                </div>

                <div className="modal-tabs">
                    <button className={activeTab === 'params' ? 'active' : ''} onClick={() => setActiveTab('params')}>Parameters</button>
                    <button className={activeTab === 'marketplace' ? 'active' : ''} onClick={() => setActiveTab('marketplace')}>Marketplace</button>
                    <button className={activeTab === 'history' ? 'active' : ''} onClick={() => setActiveTab('history')}>History</button>
                    <button className={activeTab === 'ownership' ? 'active' : ''} onClick={() => setActiveTab('ownership')}>Ownership</button>
                </div>

                {error && <div className="error-banner">{error}</div>}

                <div className="modal-body">
                    {activeTab === 'params' && (
                        <div className="tab-pane">
                            <div className="form-group">
                                <label>Construct Name</label>
                                <input 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    placeholder="e.g. My Awesome Site"
                                    className="text-input"
                                />
                            </div>

                            <div className="form-group">
                                <label>NEX URL Slug</label>
                                <div className="slug-input-wrapper">
                                    <span className="slug-prefix">anasnidir.com/s/</span>
                                    <input 
                                        name="slug" 
                                        value={formData.slug} 
                                        onChange={handleChange} 
                                        placeholder="my-awesome-site"
                                        className="text-input slug-input"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Description (Internal Notes)</label>
                                <textarea 
                                    name="description" 
                                    value={formData.description} 
                                    onChange={handleChange} 
                                    placeholder="Brief notes about this construct..."
                                    className="text-area"
                                    rows={3}
                                />
                            </div>

                            <div className="form-group row-group">
                                <div className="half-width">
                                    <label>Deployment Status</label>
                                    <select name="status" value={formData.status} onChange={handleChange} className="select-input">
                                        <option value="draft">Draft (Private)</option>
                                        <option value="public">Public (Live)</option>
                                    </select>
                                </div>
                                <div className="half-width status-visual">
                                     {formData.status === 'public' ? (
                                        <span className="status-badge public"><Globe size={14}/> ONLINE</span>
                                     ) : (
                                        <span className="status-badge draft"><Lock size={14}/> OFFLINE</span>
                                     )}
                                </div>
                            </div>

                            <hr className="divider" />

                            <div className="form-group">
                                <label className="checkbox-label">
                                    <input 
                                        type="checkbox" 
                                        name="monetizationEnabled" 
                                        checked={formData.monetizationEnabled} 
                                        onChange={handleChange} 
                                    />
                                    <DollarSign size={16} /> Enable Auto-Monetization (AdSense)
                                </label>
                            </div>

                            {formData.monetizationEnabled && (
                                <div className="form-group">
                                    <label>Publisher ID</label>
                                    <input 
                                        name="publisherId" 
                                        value={formData.publisherId} 
                                        onChange={handleChange} 
                                        placeholder="ca-pub-1234567890"
                                        className="text-input"
                                    />
                                    <small className="help-text">Your Google AdSense Publisher ID. Ads will be automatically injected into the construct.</small>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'marketplace' && (
                        <div className="tab-pane marketplace-pane">
                            <div className="alert-box info">
                                <DollarSign size={20} />
                                <div>
                                    <h4>Sell Your Construct</h4>
                                    <p>List your site on the NEX Marketplace. Other users will be able to purchase and own this site.</p>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="checkbox-label">
                                    <input 
                                        type="checkbox" 
                                        name="isForSale" 
                                        checked={formData.isForSale} 
                                        onChange={handleChange} 
                                    />
                                    List on Marketplace
                                </label>
                            </div>

                            {formData.isForSale && (
                                <div className="form-group">
                                    <label>Sale Price (USD)</label>
                                    <div className="price-input-wrapper">
                                        <span className="currency-prefix">$</span>
                                        <input 
                                            type="number"
                                            name="salePrice" 
                                            value={formData.salePrice} 
                                            onChange={handleChange} 
                                            placeholder="0.00"
                                            className="text-input price-input"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                    <small className="help-text">Set a competitive price for your digital property.</small>
                                </div>
                            )}
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
                                <div className="empty-history">No recorded events for this construct.</div>
                            )}
                        </div>
                    )}

                    {activeTab === 'ownership' && (
                        <div className="tab-pane ownership-pane">
                            <div className="alert-box warning">
                                <ShieldAlert size={20} />
                                <div>
                                    <h4>Transfer Protocol</h4>
                                    <p>Transferring ownership is permanent. You will lose all control over this digital construct immediately upon completion.</p>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Recipient Email Address</label>
                                <div className="transfer-input-group">
                                    <input 
                                        type="email"
                                        value={transferEmail}
                                        onChange={(e) => setTransferEmail(e.target.value)}
                                        placeholder="user@example.com"
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
                                <small className="help-text">The recipient must have an existing MR BUILD account.</small>
                            </div>
                        </div>
                    )}
                </div>

                <div className="modal-footer">
                    {activeTab === 'params' ? (
                        <>
                            <button className="btn-danger" onClick={handleDelete} disabled={deleting || saving}>
                                {deleting ? 'DELETING...' : <><Trash2 size={16} /> DELETE CONSTRUCT</>}
                            </button>
                            <div className="footer-right">
                                <button className="btn-secondary" onClick={onClose} disabled={saving || deleting}>CANCEL</button>
                                <button className="btn-primary" onClick={handleSave} disabled={saving || deleting}>
                                    {saving ? 'SAVING...' : <><Save size={16} /> SAVE CHANGES</>}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div style={{width: '100%', textAlign: 'right'}}>
                            <button className="btn-secondary" onClick={onClose}>CLOSE</button>
                        </div>
                    )}
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
                    background: #0a0a0a; border: 1px solid rgba(0,240,255,0.2); border-radius: 16px;
                    width: 600px; max-width: 95vw; max-height: 90vh; display: flex; flex-direction: column;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 20px rgba(0,240,255,0.05);
                    font-family: 'Inter', sans-serif; overflow: hidden;
                }
                .modal-head { 
                    display: flex; justify-content: space-between; align-items: center; 
                    padding: 24px; border-bottom: 1px solid rgba(255,255,255,0.05);
                    background: rgba(255,255,255,0.02);
                }
                .modal-head h2 { font-family: 'Orbitron'; font-size: 1.2rem; color: #fff; letter-spacing: 1px; font-weight: 700; margin: 0; }
                .modal-head button { background: none; border: none; color: #888; cursor: pointer; transition: 0.2s; display: flex; padding: 4px; border-radius: 4px; }
                .modal-head button:hover { color: #fff; background: rgba(255,255,255,0.1); }

                .modal-tabs {
                    display: flex; background: rgba(255,255,255,0.02); padding: 0 24px; border-bottom: 1px solid rgba(255,255,255,0.05);
                    overflow-x: auto; scrollbar-width: none;
                }
                .modal-tabs::-webkit-scrollbar { display: none; }
                .modal-tabs button {
                    background: none; border: none; color: #666; padding: 12px 20px; font-size: 0.85rem; font-weight: 600; cursor: pointer;
                    border-bottom: 2px solid transparent; transition: 0.2s; text-transform: uppercase; letter-spacing: 0.5px;
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
                .form-group label { font-size: 0.85rem; color: #aaa; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
                
                .text-input, .text-area, .select-input {
                    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); color: #fff;
                    padding: 12px 16px; border-radius: 8px; font-size: 1rem; font-family: 'Inter', sans-serif;
                    transition: 0.2s; outline: none; width: 100%;
                }
                .text-input:focus, .text-area:focus, .select-input:focus {
                    border-color: #00f0ff; background: rgba(0, 240, 255, 0.05); box-shadow: 0 0 10px rgba(0,240,255,0.1);
                }
                .text-area { resize: vertical; min-height: 80px; }
                
                .slug-input-wrapper { display: flex; align-items: stretch; }
                .slug-prefix { 
                    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-right: none;
                    padding: 0 16px; border-radius: 8px 0 0 8px; display: flex; align-items: center; color: #888; font-size: 0.9rem;
                    font-family: monospace;
                }
                .slug-input { border-radius: 0 8px 8px 0; font-family: monospace; }

                .row-group { flex-direction: row; gap: 24px; align-items: center; }
                .half-width { flex: 1; display: flex; flex-direction: column; gap: 8px; }
                .status-visual { align-items: flex-start; justify-content: flex-end; padding-bottom: 10px; }

                .status-badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 800; letter-spacing: 1px; }
                .status-badge.public { background: rgba(0,255,128,0.1); color: #00ff80; border: 1px solid rgba(0,255,128,0.2); }
                .status-badge.draft { background: rgba(255,255,255,0.05); color: #888; border: 1px solid rgba(255,255,255,0.1); }

                .divider { border: 0; height: 1px; background: rgba(255,255,255,0.1); margin: 4px 0; }

                .checkbox-label { 
                    display: flex !important; align-items: center; gap: 10px; cursor: pointer; color: #fff !important; 
                    font-weight: 500 !important; text-transform: none !important; letter-spacing: 0 !important; font-size: 1rem !important;
                }
                .checkbox-label input[type="checkbox"] { width: 18px; height: 18px; accent-color: #00f0ff; cursor: pointer; }

                .help-text { color: #666; font-size: 0.75rem; margin-top: -4px; }

                /* History */
                .history-list { display: flex; flex-direction: column; gap: 12px; }
                .history-item { 
                    display: flex; gap: 12px; padding: 12px; background: rgba(255,255,255,0.02); border-radius: 8px;
                    border: 1px solid rgba(255,255,255,0.05);
                }
                .history-icon { color: #00f0ff; background: rgba(0,240,255,0.1); height: 28px; width: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
                .history-action { font-size: 0.9rem; font-weight: 600; color: #fff; margin: 0; }
                .history-meta { font-size: 0.75rem; color: #666; margin: 2px 0 0 0; }
                .empty-history, .loading-state { text-align: center; padding: 40px; color: #666; font-style: italic; }

                /* Ownership */
                .alert-box { 
                    display: flex; gap: 16px; padding: 16px; border-radius: 12px; margin-bottom: 20px;
                }
                .alert-box.warning { background: rgba(255, 170, 0, 0.1); border: 1px solid rgba(255, 170, 0, 0.2); color: #ffaa00; }
                .alert-box.info { background: rgba(0, 240, 255, 0.1); border: 1px solid rgba(0, 240, 255, 0.2); color: #00f0ff; }
                .alert-box h4 { margin: 0 0 4px 0; font-family: 'Orbitron'; font-size: 0.9rem; letter-spacing: 0.5px; }
                .alert-box p { margin: 0; font-size: 0.85rem; opacity: 0.8; line-height: 1.4; }

                .price-input-wrapper { display: flex; align-items: stretch; }
                .currency-prefix { 
                    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-right: none;
                    padding: 0 16px; border-radius: 8px 0 0 8px; display: flex; align-items: center; color: #4ade80; font-weight: 700;
                }
                .price-input { border-radius: 0 8px 8px 0; }

                .transfer-input-group { display: flex; gap: 12px; }
                .btn-transfer {
                    background: #ffaa00; color: #000; border: none; padding: 0 20px; border-radius: 8px; font-weight: 800;
                    cursor: pointer; display: flex; align-items: center; gap: 8px; transition: 0.2s;
                }
                .btn-transfer:hover:not(:disabled) { background: #ffcc00; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(255, 170, 0, 0.3); }

                .modal-footer {
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 24px; border-top: 1px solid rgba(255,255,255,0.05);
                    background: rgba(255,255,255,0.02); gap: 16px; flex-wrap: wrap;
                }
                .footer-right { display: flex; gap: 12px; }

                .btn-danger {
                    background: transparent; color: #ff4444; border: 1px solid rgba(255,68,68,0.3);
                    padding: 10px 16px; border-radius: 8px; font-weight: 700; font-size: 0.85rem; cursor: pointer;
                    display: flex; align-items: center; gap: 8px; transition: 0.2s; letter-spacing: 1px;
                }
                .btn-danger:hover:not(:disabled) { background: rgba(255,68,68,0.1); border-color: #ff4444; }

                .btn-secondary {
                    background: transparent; color: #aaa; border: 1px solid rgba(255,255,255,0.2);
                    padding: 10px 20px; border-radius: 8px; font-weight: 600; font-size: 0.85rem; cursor: pointer; transition: 0.2s;
                }
                .btn-secondary:hover:not(:disabled) { color: #fff; border-color: rgba(255,255,255,0.4); }

                .btn-primary {
                    background: #00f0ff; color: #000; border: none;
                    padding: 10px 24px; border-radius: 8px; font-weight: 800; font-size: 0.85rem; cursor: pointer;
                    display: flex; align-items: center; gap: 8px; transition: 0.2s; letter-spacing: 1px;
                    box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
                }
                .btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 0 25px rgba(0, 240, 255, 0.4); }

                button:disabled { opacity: 0.5; cursor: not-allowed !important; transform: none !important; box-shadow: none !important; }

                @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

                @media (max-width: 600px) {
                    .modal-head h2 { font-size: 1rem; }
                    .modal-tabs { padding: 0 12px; }
                    .modal-tabs button { padding: 12px 14px; font-size: 0.75rem; }
                    .modal-body { padding: 16px; }
                    .modal-footer { flex-direction: column-reverse; padding: 16px; }
                    .footer-right { width: 100%; }
                    .btn-danger, .footer-right > button { flex: 1; justify-content: center; height: 45px; }
                    .row-group { flex-direction: column; align-items: stretch; gap: 16px; }
                    .half-width.status-visual { justify-content: flex-start; padding-top: 0; }
                    .slug-prefix { padding: 0 8px; font-size: 0.75rem; }
                    .transfer-input-group { flex-direction: column; }
                    .btn-transfer { height: 45px; justify-content: center; }
                    .history-item { padding: 10px; }
                    .alert-box { padding: 12px; gap: 12px; }
                    .alert-box h4 { font-size: 0.8rem; }
                    .alert-box p { font-size: 0.75rem; }
                }
                
                @media (max-height: 500px) {
                    .modal-content { max-height: 95vh; }
                }
            `}</style>
        </div>
    );
}

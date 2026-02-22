'use client';
import { useState } from 'react';
import { db } from '../../../lib/firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { X, Save, Trash2, Globe, Lock, DollarSign } from 'lucide-react';

export default function SiteSettingsModal({ site, onClose, onUpdate, onDelete }) {
    const [formData, setFormData] = useState({
        name: site.name || '',
        slug: site.slug || '',
        description: site.description || '',
        status: site.status || 'draft',
        monetizationEnabled: site.monetization?.enabled || false,
        publisherId: site.monetization?.publisherId || ''
    });
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState('');

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
                updatedAt: new Date().toISOString()
            };

            await updateDoc(siteRef, updates);
            onUpdate({ ...site, ...updates }); // Optimistic UI update
            onClose();
        } catch (err) {
            console.error("Failed to update site settings:", err);
            setError(err.message || 'Failed to update settings. Please try again.');
        } finally {
            setSaving(false);
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

                {error && <div className="error-banner">{error}</div>}

                <div className="modal-body">
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

                <div className="modal-footer">
                    <button className="btn-danger" onClick={handleDelete} disabled={deleting || saving}>
                        {deleting ? 'DELETING...' : <><Trash2 size={16} /> DELETE CONSTRUCT</>}
                    </button>
                    <div className="footer-right">
                        <button className="btn-secondary" onClick={onClose} disabled={saving || deleting}>CANCEL</button>
                        <button className="btn-primary" onClick={handleSave} disabled={saving || deleting}>
                            {saving ? 'SAVING...' : <><Save size={16} /> SAVE CHANGES</>}
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
                    background: #0a0a0a; border: 1px solid rgba(0,240,255,0.2); border-radius: 16px;
                    width: 600px; max-width: 100%; max-height: 90vh; display: flex; flex-direction: column;
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

                .error-banner {
                    background: rgba(255, 68, 68, 0.1); color: #ff4444; border-bottom: 1px solid rgba(255, 68, 68, 0.2);
                    padding: 12px 24px; font-size: 0.85rem; font-weight: 600; text-align: center;
                }

                .modal-body { padding: 24px; overflow-y: auto; display: flex; flex-direction: column; gap: 20px; }
                
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

                @keyframes fadeIn { from { opacity: 0; transform: scale(0.98) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }

                @media (max-width: 600px) {
                    .modal-footer { flex-direction: column-reverse; }
                    .footer-right { width: 100%; }
                    .btn-danger, .footer-right > button { flex: 1; justify-content: center; }
                    .row-group { flex-direction: column; align-items: stretch; gap: 16px; }
                    .slug-prefix { padding: 0 8px; font-size: 0.75rem; }
                }
            `}</style>
        </div>
    );
}

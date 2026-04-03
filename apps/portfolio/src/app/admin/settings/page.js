'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Loader from '../../../components/Loader';

const ALLOWED_ADMINS = ['anasnide@gmail.com', 'ceo@anasnidir.com'];

export default function AdminSettings() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Keys State
    const [keys, setKeys] = useState([]);
    const [newKey, setNewKey] = useState('');
    const [keyLabel, setKeyLabel] = useState('');
    
    // Models State
    const [models, setModels] = useState([]);
    const [newModelId, setNewModelId] = useState('');
    const [newModelName, setNewModelName] = useState('');
    const [newModelDesc, setNewModelDesc] = useState('');

    const [isSaving, setIsSaving] = useState(false);
    const [statusMsg, setStatusMsg] = useState('');

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            if (u && ALLOWED_ADMINS.includes(u.email)) {
                setUser(u);
                fetchSettings();
            } else {
                setLoading(false);
            }
        });
        return () => unsub();
    }, []);

    const fetchSettings = async () => {
        try {
            const docRef = doc(db, 'system_config', 'nex_ai');
            const snap = await getDoc(docRef);
            if (snap.exists()) {
                const data = snap.data();
                
                // Load Keys
                if (data.keys) {
                    setKeys(data.keys);
                } else if (data.openRouterKey) {
                    // Legacy migration
                    setKeys([{
                        id: Date.now().toString(),
                        key: data.openRouterKey,
                        label: 'Legacy Key',
                        status: 'active',
                        addedAt: new Date().toISOString()
                    }]);
                }

                // Load Models
                if (data.models) {
                    setModels(data.models);
                } else {
                    // Defaults if empty
                    setModels([
                        { id: 'openai/gpt-4o', name: 'GPT-4 Omni', description: 'Smartest model', active: true },
                        { id: 'anthropic/claude-3-opus', name: 'Claude 3 Opus', description: 'Human-like reasoning', active: true }
                    ]);
                }
            }
        } catch (err) {
            console.error("Error fetching settings:", err);
        } finally {
            setLoading(false);
        }
    };

    const saveData = async (updatedKeys, updatedModels) => {
        setIsSaving(true);
        setStatusMsg('');
        try {
            await setDoc(doc(db, 'system_config', 'nex_ai'), {
                keys: updatedKeys !== undefined ? updatedKeys : keys,
                models: updatedModels !== undefined ? updatedModels : models,
                updatedAt: new Date().toISOString(),
                updatedBy: user.email
            }, { merge: true });
            
            if (updatedKeys) setKeys(updatedKeys);
            if (updatedModels) setModels(updatedModels);
            
            setStatusMsg('✅ Configuration saved successfully!');
            setTimeout(() => setStatusMsg(''), 3000);
        } catch (err) {
            setStatusMsg('❌ Error saving: ' + err.message);
        } finally {
            setIsSaving(false);
        }
    };

    // --- KEY HANDLERS ---
    const handleAddKey = (e) => {
        e.preventDefault();
        if (!newKey.trim()) return;
        const newItem = {
            id: Date.now().toString(),
            key: newKey.trim(),
            label: keyLabel.trim() || `Key ${keys.length + 1}`,
            status: 'active',
            addedAt: new Date().toISOString()
        };
        saveData([...keys, newItem], undefined);
        setNewKey('');
        setKeyLabel('');
    };

    const toggleKeyStatus = (id) => {
        const updated = keys.map(k => k.id === id ? { ...k, status: k.status === 'active' ? 'disabled' : 'active' } : k);
        saveData(updated, undefined);
    };

    const deleteKey = (id) => {
        if (!confirm('Permanently remove this API key?')) return;
        saveData(keys.filter(k => k.id !== id), undefined);
    };

    // --- MODEL HANDLERS ---
    const handleAddModel = (e) => {
        e.preventDefault();
        if (!newModelId.trim() || !newModelName.trim()) return;
        
        const newModel = {
            id: newModelId.trim(), // e.g., 'openai/gpt-4'
            name: newModelName.trim(),
            description: newModelDesc.trim() || 'Custom AI Model',
            active: true
        };
        
        saveData(undefined, [...models, newModel]);
        setNewModelId('');
        setNewModelName('');
        setNewModelDesc('');
    };

    const toggleModelStatus = (id) => {
        const updated = models.map(m => m.id === id ? { ...m, active: !m.active } : m);
        saveData(undefined, updated);
    };

    const deleteModel = (id) => {
        if (!confirm('Remove this model from the list?')) return;
        saveData(undefined, models.filter(m => m.id !== id));
    };


    if (loading) return <Loader text="Loading Settings..." />;
    if (!user) return <div style={{padding:'40px', color:'#fff'}}>Access Denied</div>;

    return (
        <div className="settings-view animate-fade-in">
            <header className="page-header">
                <h1>System Config</h1>
                <p className="subtitle">Manage global API keys and AI models.</p>
            </header>

            {/* --- API KEYS SECTION --- */}
            <div className="card glass">
                <div className="card-header">
                    <h2>🔑 API Keys (Rotation Pool)</h2>
                    <span className="badge">{keys.filter(k => k.status === 'active').length} Active</span>
                </div>
                
                <form onSubmit={handleAddKey} className="add-form">
                    <div className="form-row">
                        <input type="text" value={keyLabel} onChange={e => setKeyLabel(e.target.value)} placeholder="Label" className="modern-input label-input" />
                        <input type="text" value={newKey} onChange={e => setNewKey(e.target.value)} placeholder="sk-or..." className="modern-input key-input" required />
                        <button type="submit" className="btn-add" disabled={isSaving}>+ ADD</button>
                    </div>
                </form>

                <div className="list-container">
                    {keys.map(k => (
                        <div key={k.id} className={`list-item ${k.status}`}>
                            <div className="item-info">
                                <span className="item-title">{k.label}</span>
                                <code className="item-sub">...{k.key.substring(k.key.length - 4)}</code>
                            </div>
                            <div className="item-actions">
                                <button className={`btn-toggle ${k.status}`} onClick={() => toggleKeyStatus(k.id)}>{k.status}</button>
                                <button className="btn-delete" onClick={() => deleteKey(k.id)}>🗑️</button>
                            </div>
                        </div>
                    ))}
                    {keys.length === 0 && <div className="empty-msg">No keys found.</div>}
                </div>
            </div>

            {/* --- MODELS SECTION --- */}
            <div className="card glass">
                <div className="card-header">
                    <h2>🤖 AI Models</h2>
                    <span className="badge blue">{models.filter(m => m.active).length} Active</span>
                </div>
                
                <p className="description">Define which models appear in the NEX AI dropdown.</p>

                <form onSubmit={handleAddModel} className="add-form">
                    <div className="form-row">
                        <input type="text" value={newModelName} onChange={e => setNewModelName(e.target.value)} placeholder="Name (e.g. Gemini Pro)" className="modern-input" required />
                        <input type="text" value={newModelId} onChange={e => setNewModelId(e.target.value)} placeholder="Model ID (e.g. google/gemini-pro)" className="modern-input key-input" required />
                    </div>
                    <div className="form-row" style={{marginTop:'10px'}}>
                         <input type="text" value={newModelDesc} onChange={e => setNewModelDesc(e.target.value)} placeholder="Description (Optional)" className="modern-input full-width" />
                         <button type="submit" className="btn-add" disabled={isSaving}>+ ADD MODEL</button>
                    </div>
                </form>

                <div className="list-container">
                    {models.map(m => (
                        <div key={m.id} className={`list-item ${m.active ? 'active' : 'disabled'}`}>
                            <div className="item-info">
                                <span className="item-title">{m.name}</span>
                                <span className="item-sub">{m.id}</span>
                            </div>
                            <div className="item-actions">
                                <button className={`btn-toggle ${m.active ? 'active' : 'disabled'}`} onClick={() => toggleModelStatus(m.id)}>
                                    {m.active ? 'VISIBLE' : 'HIDDEN'}
                                </button>
                                <button className="btn-delete" onClick={() => deleteModel(m.id)}>🗑️</button>
                            </div>
                        </div>
                    ))}
                    {models.length === 0 && <div className="empty-msg">No models configured.</div>}
                </div>
            </div>

            {statusMsg && <div className="status-toast">{statusMsg}</div>}

            <style jsx>{`
                .settings-view { padding: 0 0 40px; color: #fff; max-width: 900px; }
                .animate-fade-in { animation: fadeIn 0.5s ease-out; }
                
                .page-header { margin-bottom: 30px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; }
                h1 { margin: 0; font-size: 2rem; background: linear-gradient(to right, #fff, #00f0ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .subtitle { color: #888; margin-top: 5px; }

                .card { padding: 30px; border-radius: 16px; margin-bottom: 30px; }
                .glass { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255,255,255,0.05); }
                
                .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
                h2 { margin: 0; color: #00f0ff; font-size: 1.4rem; }
                .badge { background: rgba(0, 255, 128, 0.1); color: #00ff80; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; border: 1px solid rgba(0, 255, 128, 0.2); }
                .badge.blue { background: rgba(0, 240, 255, 0.1); color: #00f0ff; border-color: rgba(0, 240, 255, 0.2); }

                .description { color: #aaa; margin-bottom: 20px; font-size: 0.9rem; }

                .add-form { background: rgba(0,0,0,0.2); padding: 20px; border-radius: 12px; margin-bottom: 25px; border: 1px solid rgba(255,255,255,0.05); }
                .form-row { display: flex; gap: 10px; flex-wrap: wrap; }
                
                .modern-input {
                    padding: 12px 15px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 8px; color: #fff; flex: 1; transition: 0.2s;
                }
                .modern-input:focus { outline: none; border-color: #00f0ff; }
                .modern-input.full-width { width: 100%; flex: 100%; }
                
                .btn-add {
                    background: #00f0ff; color: #000; border: none; padding: 0 25px; border-radius: 8px; font-weight: bold; cursor: pointer; white-space: nowrap;
                }
                .btn-add:hover { box-shadow: 0 0 15px rgba(0,240,255,0.4); }

                .list-container { display: flex; flex-direction: column; gap: 10px; }
                .list-item {
                    display: flex; justify-content: space-between; align-items: center;
                    background: rgba(255,255,255,0.02); padding: 15px 20px; border-radius: 10px;
                    border: 1px solid rgba(255,255,255,0.05);
                }
                .list-item.active { border-left: 3px solid #00f0ff; }
                .list-item.disabled { border-left: 3px solid #666; opacity: 0.6; }

                .item-info { display: flex; flex-direction: column; gap: 4px; }
                .item-title { font-weight: bold; color: #fff; }
                .item-sub { font-size: 0.8rem; color: #888; font-family: monospace; }

                .item-actions { display: flex; gap: 10px; align-items: center; }
                .btn-toggle { font-size: 0.7rem; padding: 5px 10px; border-radius: 4px; font-weight: bold; cursor: pointer; border: none; text-transform: uppercase; }
                .btn-toggle.active { background: rgba(0, 255, 128, 0.2); color: #00ff80; }
                .btn-toggle.disabled { background: rgba(255, 255, 255, 0.1); color: #aaa; }
                
                .btn-delete { background: none; border: none; cursor: pointer; opacity: 0.5; font-size: 1.1rem; }
                .btn-delete:hover { opacity: 1; color: #ff4444; }
                
                .empty-msg { text-align: center; color: #666; font-style: italic; padding: 20px; }

                .status-toast {
                    position: fixed; bottom: 30px; right: 30px; background: #222; color: #fff; padding: 15px 25px;
                    border-left: 4px solid #00f0ff; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                    animation: slideIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); z-index: 100;
                }
                @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
}

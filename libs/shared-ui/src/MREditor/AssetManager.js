'use client';
import { useState, useEffect } from 'react';
import { storage, auth } from '@mr/core/firebase'; // Updated relative path
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { Loader2, Upload, Trash2, Copy, Image as ImageIcon, X, AlertCircle, Sparkles } from 'lucide-react';

export default function AssetManager({ onInsert, onSpriteEditor }) {
    const [assets, setAssets] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showAiPrompt, setShowAiPrompt] = useState(false);
    const [aiPrompt, setAiPrompt] = useState('');
    const [generating, setGenerating] = useState(false);

    useEffect(() => {
        fetchAssets();

        const handleRefresh = () => fetchAssets();
        window.addEventListener('ASSET_MODIFIED', handleRefresh);
        return () => window.removeEventListener('ASSET_MODIFIED', handleRefresh);
    }, []);

    const fetchAssets = async () => {
        if (!auth.currentUser) return;
        setLoading(true);
        setError(null);
        try {
            const listRef = ref(storage, `users/${auth.currentUser.uid}/uploads`);
            const res = await listAll(listRef);
            
            // Limit parallel requests if many items to avoid 429/timeout
            const urls = [];
            for (const itemRef of res.items) {
                try {
                    const url = await getDownloadURL(itemRef);
                    urls.push({ name: itemRef.name, url, path: itemRef.fullPath });
                } catch (e) {
                    console.warn(`Failed to get URL for ${itemRef.name}`, e);
                }
            }
            setAssets(urls);
        } catch (err) {
            console.error("Error fetching assets:", err);
            if (err.code === 'storage/retry-limit-exceeded') {
                setError("Storage connection timed out. This often happens due to network issues or if the storage bucket 'anas-nidir.firebasestorage.app' is not correctly configured in Firebase Console.");
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file || !auth.currentUser) return;

        setUploading(true);
        setError(null);
        try {
            const storageRef = ref(storage, `users/${auth.currentUser.uid}/uploads/${Date.now()}_${file.name}`);
            await uploadBytes(storageRef, file);
            await fetchAssets();
        } catch (err) {
            console.error("Upload failed:", err);
            setError("Upload failed: " + err.message);
        } finally {
            setUploading(false);
        }
    };

    const handleGenerate = async () => {
        if (!aiPrompt.trim() || !auth.currentUser) return;
        setGenerating(true);
        setError(null);
        try {
            const res = await fetch('/api/generate-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: aiPrompt, userId: auth.currentUser.uid })
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || 'Generation failed');
            }

            const data = await res.json();
            
            // Fetch generated image as Blob
            const imgRes = await fetch(data.url);
            if (!imgRes.ok) throw new Error('Failed to download generated image');
            const blob = await imgRes.blob();

            // Upload to User Storage
            const storageRef = ref(storage, `users/${auth.currentUser.uid}/uploads/ai_${Date.now()}.png`);
            await uploadBytes(storageRef, blob);
            await fetchAssets();

            setShowAiPrompt(false);
            setAiPrompt('');
        } catch (err) {
            console.error("AI Generation failed:", err);
            setError(err.message);
        } finally {
            setGenerating(false);
        }
    };

    const handleDelete = async (path) => {
        if (!confirm("Delete this asset?")) return;
        try {
            const assetRef = ref(storage, path);
            await deleteObject(assetRef);
            setAssets(prev => prev.filter(a => a.path !== path));
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Delete failed: " + err.message);
        }
    };

    const copyToClipboard = (url) => {
        navigator.clipboard.writeText(url);
        alert("URL copied to clipboard!");
    };

    return (
        <div className="asset-manager">
            <div className="am-header">
                <h3>ASSET DEPOT</h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="sprite-btn" onClick={onSpriteEditor} title="Original Pixel Art">
                        <ImageIcon size={14}/>
                        <span>Sprite</span>
                    </button>
                    <button className="gen-btn" onClick={() => setShowAiPrompt(!showAiPrompt)}>
                        <Sparkles size={14}/>
                        <span>AI Gen</span>
                    </button>
                    <label className={`upload-btn ${uploading ? 'disabled' : ''}`}>
                        {uploading ? <Loader2 className="spin" size={14}/> : <Upload size={14}/>}
                        <span>Upload</span>
                        <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} hidden />
                    </label>
                </div>
            </div>

            {showAiPrompt && (
                <div className="ai-prompt-box">
                    <input 
                        type="text" 
                        value={aiPrompt} 
                        onChange={e => setAiPrompt(e.target.value)} 
                        placeholder="Describe an image..." 
                        disabled={generating}
                    />
                    <button onClick={handleGenerate} disabled={generating || !aiPrompt.trim()}>
                        {generating ? <Loader2 className="spin" size={14} /> : 'Generate'}
                    </button>
                </div>
            )}

            <div className="asset-grid custom-scrollbar">
                {error && (
                    <div className="error-state">
                        <AlertCircle size={20} />
                        <p>Storage Error</p>
                        <span>{error}</span>
                        <button onClick={fetchAssets}>Retry</button>
                    </div>
                )}
                {loading ? (
                    <div className="loading-state"><Loader2 className="spin"/> Loading assets...</div>
                ) : assets.length === 0 && !error ? (
                    <div className="empty-state">
                        <ImageIcon size={32} opacity={0.3}/>
                        <p>No assets uploaded.</p>
                    </div>
                ) : (
                    assets.map(asset => (
                        <div key={asset.path} className="asset-card">
                            <div className="img-wrapper" onClick={() => onInsert && onInsert(asset.url)}>
                                <img src={asset.url} alt={asset.name} />
                            </div>
                            <div className="actions">
                                <button onClick={() => copyToClipboard(asset.url)} title="Copy URL"><Copy size={12}/></button>
                                <button onClick={() => handleDelete(asset.path)} className="del" title="Delete"><Trash2 size={12}/></button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <style jsx>{`
                .asset-manager {
                    height: 100%; display: flex; flex-direction: column;
                    background: #0a0a0a; color: #fff;
                }
                .am-header {
                    padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.1);
                    display: flex; justify-content: space-between; align-items: center;
                }
                .am-header h3 { font-size: 11px; letter-spacing: 1px; color: #888; margin: 0; }
                
                .upload-btn {
                    background: rgba(0,240,255,0.1); color: #00f0ff; border: 1px solid rgba(0,240,255,0.3);
                    padding: 4px 10px; border-radius: 4px; font-size: 11px; cursor: pointer;
                    display: flex; align-items: center; gap: 6px; transition: 0.2s;
                }
                .upload-btn:hover { background: rgba(0,240,255,0.2); }
                .upload-btn.disabled { opacity: 0.5; cursor: not-allowed; }

                .gen-btn {
                    background: rgba(208,0,255,0.1); color: #d000ff; border: 1px solid rgba(208,0,255,0.3);
                    padding: 4px 10px; border-radius: 4px; font-size: 11px; cursor: pointer;
                    display: flex; align-items: center; gap: 6px; transition: 0.2s;
                }
                .gen-btn:hover { background: rgba(208,0,255,0.2); }

                .sprite-btn {
                    background: rgba(0,255,136,0.1); color: #00ff88; border: 1px solid rgba(0,255,136,0.3);
                    padding: 4px 10px; border-radius: 4px; font-size: 11px; cursor: pointer;
                    display: flex; align-items: center; gap: 6px; transition: 0.2s;
                }
                .sprite-btn:hover { background: rgba(0,255,136,0.2); }

                .ai-prompt-box {
                    padding: 12px; background: rgba(0,0,0,0.5); border-bottom: 1px solid rgba(255,255,255,0.1);
                    display: flex; gap: 8px;
                }
                .ai-prompt-box input {
                    flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
                    color: #fff; padding: 6px 10px; border-radius: 4px; font-size: 12px; outline: none;
                }
                .ai-prompt-box button {
                    background: #d000ff; color: #fff; border: none; padding: 6px 12px; border-radius: 4px;
                    font-size: 12px; font-weight: bold; cursor: pointer;
                }
                .ai-prompt-box button:disabled { opacity: 0.5; cursor: not-allowed; }

                .asset-grid {
                    flex: 1; overflow-y: auto; padding: 12px;
                    display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;
                }
                
                .asset-card {
                    background: rgba(255,255,255,0.03); border-radius: 6px; overflow: hidden;
                    border: 1px solid rgba(255,255,255,0.05); position: relative;
                }
                .img-wrapper { height: 80px; width: 100%; display: flex; align-items: center; justify-content: center; background: #000; }
                .img-wrapper img { max-width: 100%; max-height: 100%; object-fit: contain; }
                
                .actions {
                    display: flex; border-top: 1px solid rgba(255,255,255,0.05);
                }
                .actions button {
                    flex: 1; background: transparent; border: none; color: #666; padding: 6px;
                    cursor: pointer; transition: 0.2s; border-right: 1px solid rgba(255,255,255,0.05);
                }
                .actions button:hover { background: rgba(255,255,255,0.05); color: #fff; }
                .actions button.del:hover { color: #ff4444; background: rgba(255,68,68,0.1); }
                .actions button:last-child { border-right: none; }

                .empty-state {
                    grid-column: span 2; display: flex; flex-direction: column; align-items: center;
                    justify-content: center; height: 150px; color: #444; font-size: 12px;
                }
                .loading-state { grid-column: span 2; text-align: center; color: #666; margin-top: 20px; font-size: 12px; }
                
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

                .error-state {
                    grid-column: span 2; display: flex; flex-direction: column; align-items: center; gap: 10px;
                    padding: 20px; color: #ff4444; background: rgba(255, 68, 68, 0.1); border: 1px solid #ff4444; border-radius: 8px;
                    text-align: center; font-size: 12px;
                }
                .error-state button {
                    background: #ff4444; color: #fff; border: none; padding: 6px 16px; border-radius: 4px; cursor: pointer;
                }
            `}</style>
        </div>
    );
}

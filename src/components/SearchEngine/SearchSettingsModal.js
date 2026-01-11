'use client';

export default function SearchSettingsModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content glass">
                <h2>Search Preferences</h2>
                
                <div className="setting-row">
                    <label>SafeSearch</label>
                    <div className="toggle active"></div>
                </div>
                <div className="setting-row">
                    <label>Instant Results</label>
                    <div className="toggle active"></div>
                </div>
                <div className="setting-row">
                    <label>AI Summaries</label>
                    <div className="toggle active"></div>
                </div>
                
                <div className="modal-actions">
                    <button onClick={onClose} className="btn-save">Save Changes</button>
                    <button onClick={onClose} className="btn-cancel">Cancel</button>
                </div>
            </div>

            <style jsx>{`
                .modal-overlay {
                    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.8);
                    display: flex; align-items: center; justify-content: center;
                    z-index: 1000;
                    backdrop-filter: blur(5px);
                }
                .modal-content {
                    width: 400px; padding: 30px; border-radius: 20px;
                    background: #111; color: #fff;
                    border: 1px solid rgba(255,255,255,0.1);
                    font-family: var(--font-exo2);
                }
                .modal-content h2 { margin-top: 0; margin-bottom: 20px; font-family: var(--font-orbitron); }
                
                .setting-row {
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 15px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
                }
                .toggle {
                    width: 40px; height: 20px; background: rgba(255,255,255,0.1);
                    border-radius: 10px; position: relative; cursor: pointer;
                }
                .toggle.active { background: #00f0ff; }
                .toggle.active::after {
                    content: ''; position: absolute; right: 2px; top: 2px;
                    width: 16px; height: 16px; background: #000; border-radius: 50%;
                }

                .modal-actions { margin-top: 30px; display: flex; gap: 10px; }
                .btn-save { flex: 1; padding: 12px; background: #00f0ff; color: #000; border: none; font-weight: 800; cursor: pointer; border-radius: 8px; }
                .btn-cancel { padding: 12px 20px; background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.2); cursor: pointer; border-radius: 8px; }
            `}</style>
        </div>
    );
}

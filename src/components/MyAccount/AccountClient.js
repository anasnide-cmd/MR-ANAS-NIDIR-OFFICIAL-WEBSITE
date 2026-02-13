'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '../../lib/firebase';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { updateProfile, onAuthStateChanged, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Loader from '../../components/Loader';
import PayPalButton from '../../components/PayPalButton';

export default function AccountClient() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('home');
    const [userData, setUserData] = useState(null);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState({ type: '', text: '' });
    const [showRefuelModal, setShowRefuelModal] = useState(false);
    const [selectedPack, setSelectedPack] = useState(null);

    const fuelPacks = [
        { id: 'scout', name: 'Scout Pack', credits: 50, price: 2.99, desc: 'Entry-level neural boost.' },
        { id: 'engine', name: 'Engine Pack', credits: 200, price: 9.99, desc: 'Power for the dedicated builder.' },
        { id: 'titan', name: 'Titan Pack', credits: 1000, price: 39.99, desc: 'Infinite scale for AI masterminds.' }
    ];

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            if (u) {
                setUser(u);
                try {
                    const snap = await getDoc(doc(db, 'users', u.uid));
                    if (snap.exists()) {
                        setUserData(snap.data());
                    } else {
                        setUserData({ displayName: u.displayName, createdAt: new Date().toISOString() });
                    }
                } catch (e) {
                    console.error(e);
                }
            } else {
                router.push('/mr-build/login');
            }
            setLoading(false);
        });
        return () => unsub();
    }, [router]);

    const handleSave = async (data) => {
        setSaving(true);
        setMsg({type:'', text:''});
        try {
            await setDoc(doc(db, 'users', user.uid), data, { merge: true });
            if (data.displayName && data.displayName !== user.displayName) {
                await updateProfile(user, { displayName: data.displayName });
            }
            setMsg({ type: 'success', text: 'Changes saved successfully.' });
            setUserData(prev => ({ ...prev, ...data }));
        } catch (err) {
            setMsg({ type: 'error', text: err.message });
        } finally {
            setSaving(false);
        }
    };

    const handlePasswordReset = async () => {
        try {
            await sendPasswordResetEmail(auth, user.email);
            setMsg({ type: 'success', text: 'Password reset email sent to ' + user.email });
        } catch (err) {
            setMsg({ type: 'error', text: err.message });
        }
    };

    const handleRefuelSuccess = async (packId) => {
        const pack = fuelPacks.find(p => p.id === packId);
        if (!pack) return;

        try {
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, {
                aiCredits: increment(pack.credits)
            });
            setShowRefuelModal(false);
            setSelectedPack(null);
            setMsg({ type: 'success', text: `Successfully refueled with ${pack.credits} Neural Credits!` });
            
            // Re-fetch user data to sync UI
            const snap = await getDoc(userRef);
            if (snap.exists()) setUserData(snap.data());
        } catch (err) {
            console.error("Refuel error:", err);
            setMsg({ type: 'error', text: 'Payment successful but failed to update balance. Please contact support.' });
        }
    };

    if (loading) return <Loader text="Secure Environment Loading..." />;
    if (!user || !userData) return null;

    const navItems = [
        { id: 'home', label: 'Home', icon: '🏠' },
        { id: 'personal', label: 'Personal Info', icon: '👤' },
        { id: 'data', label: 'Data & Privacy', icon: '🛡️' },
        { id: 'security', label: 'Security', icon: '🔒' }
    ];

    return (
        <div className="account-shell">
            <aside className="account-sidebar glass">
                <div className="sidebar-header">
                    <div className="brand">Account</div>
                </div>
                <nav className="sidebar-nav">
                    {navItems.map(item => (
                        <button 
                            key={item.id} 
                            onClick={() => setActiveTab(item.id)}
                            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                        >
                            <span className="icon">{item.icon}</span>
                            <span className="label">{item.label}</span>
                        </button>
                    ))}
                </nav>
                <div className="sidebar-footer">
                    <button onClick={() => { signOut(auth); router.push('/mr-build/login'); }} className="signout-btn">
                        Sign Out
                    </button>
                </div>
            </aside>

            <main className="account-content">
                <header className="content-header">
                    <h1>{navItems.find(i => i.id === activeTab).label}</h1>
                    <div className="user-mini">
                        <div className="avatar-small">{user.email[0].toUpperCase()}</div>
                    </div>
                </header>
                
                <div className="content-body animate-fade-in">
                    {msg.text && (
                        <div className={`status-banner ${msg.type} glass`}>{msg.text}</div>
                    )}

                    {activeTab === 'home' && (
                        <div className="dashboard-grid">
                            <div className="card glass welcome-card">
                                <h2>Welcome, {userData.displayName || 'User'}</h2>
                                <p>Manage your info, privacy, and security to make Mr Build work better for you.</p>
                            </div>
                            <div className="card glass stat-card">
                                <h3>Storage Used</h3>
                                <div className="stat-val">{(userData.storageUsed || 0) / 1024} MB</div>
                                <div className="progress-bar"><div style={{width: '5%'}}></div></div>
                            </div>
                             <div className="card glass stat-card fuel-card">
                                <h3>Neural Credits</h3>
                                <div className="stat-val credits">{userData.aiCredits !== undefined ? userData.aiCredits : (userData.plan === 'pro' ? 500 : 50)}</div>
                                <p>Available for NEX AI Engine</p>
                                <button className="refuel-btn" onClick={() => setShowRefuelModal(true)}>Refuel Now</button>
                            </div>
                             <div className="card glass stat-card">
                                <h3>Security Status</h3>
                                <div className="stat-val safe">Protected</div>
                                <p>2-Step Verification is off</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'personal' && (
                        <div className="card glass form-card">
                            <h3>Basic Info</h3>
                            <p>Some info may be visible to other people using Mr Build services.</p>
                            
                            <div className="form-row">
                                <label>Profile Picture</label>
                                <div className="avatar-row">
                                    <div className="avatar-large">{user.email[0].toUpperCase()}</div>
                                    <button className="btn-text">Change</button>
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <label>Display Name</label>
                                <input 
                                    defaultValue={userData.displayName || ''} 
                                    onBlur={(e) => handleSave({ displayName: e.target.value })}
                                    className="modern-input"
                                />
                            </div>

                            <div className="form-row">
                                <label>Bio / About</label>
                                <textarea 
                                    defaultValue={userData.bio || ''}
                                    onBlur={(e) => handleSave({ bio: e.target.value })}
                                    className="modern-input"
                                    rows="3"
                                />
                            </div>

                            <div className="form-row">
                                <label>Contact Email</label>
                                <input 
                                    defaultValue={userData.contactEmail || user.email}
                                    onBlur={(e) => handleSave({ contactEmail: e.target.value })}
                                    className="modern-input"
                                />
                            </div>

                            <div className="form-row">
                                <label>Phone</label>
                                <input 
                                    defaultValue={userData.phone || ''}
                                    onBlur={(e) => handleSave({ phone: e.target.value })}
                                    className="modern-input"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>

                            <div className="form-row">
                                <label>Job Title</label>
                                <input 
                                    defaultValue={userData.jobTitle || ''}
                                    onBlur={(e) => handleSave({ jobTitle: e.target.value })}
                                    className="modern-input"
                                    placeholder="Software Engineer"
                                />
                            </div>

                            <div className="form-row">
                                <label>Location</label>
                                <input 
                                    defaultValue={userData.location || ''}
                                    onBlur={(e) => handleSave({ location: e.target.value })}
                                    className="modern-input"
                                    placeholder="City, Country"
                                />
                            </div>

                            <div className="form-row">
                                <label>Date of Birth</label>
                                <input 
                                    type="date"
                                    defaultValue={userData.dob || ''}
                                    onBlur={(e) => handleSave({ dob: e.target.value })}
                                    className="modern-input"
                                />
                            </div>

                             <div className="form-row">
                                <label>Website</label>
                                <input 
                                    defaultValue={userData.website || ''}
                                    onBlur={(e) => handleSave({ website: e.target.value })}
                                    className="modern-input"
                                    placeholder="https://example.com"
                                />
                            </div>

                             <div className="form-row">
                                <label>Gender</label>
                                <select 
                                    defaultValue={userData.gender || ''}
                                    onChange={(e) => handleSave({ gender: e.target.value })}
                                    className="modern-input"
                                    style={{ background: '#000', color: '#fff' }}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="non-binary">Non-binary</option>
                                    <option value="prefer-not-to-say">Prefer not to say</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="card glass form-card">
                            <h3>Signing in into Google</h3>
                            <div className="security-row">
                                <div>
                                    <h4>Password</h4>
                                    <p>Last changed: Never</p>
                                </div>
                                <button onClick={handlePasswordReset} className="btn-arrow">→</button>
                            </div>
                            <div className="security-row">
                                <div>
                                    <h4>2-Step Verification</h4>
                                    <p>Add an extra layer of security to your account.</p>
                                </div>
                                <button className="btn-arrow">→</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'data' && (
                         <div className="card glass form-card">
                            <h3>Data & Privacy</h3>
                            <p>You have control over what data is saved.</p>
                             <div className="security-row">
                                <div>
                                    <h4>Mr Build Data</h4>
                                    <p>You have {((userData.siteLimit || 1) - 1)} active sites.</p>
                                </div>
                                <button className="btn-arrow" onClick={() => router.push('/mr-build/dashboard')}>Manage Sites</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Refuel Modal */}
                {showRefuelModal && (
                    <div className="modal-overlay" onClick={() => setShowRefuelModal(false)}>
                        <div className="refuel-modal glass" onClick={e => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>RECHARGE NEURAL FUEL</h2>
                                <button className="close-btn" onClick={() => setShowRefuelModal(false)}>×</button>
                            </div>
                            
                            <div className="pack-list">
                                {fuelPacks.map(pack => (
                                    <div key={pack.id} className={`pack-card ${selectedPack === pack.id ? 'selected' : ''}`} onClick={() => setSelectedPack(pack.id)}>
                                        <div className="pack-info">
                                            <h3>{pack.name}</h3>
                                            <p>{pack.desc}</p>
                                        </div>
                                        <div className="pack-price">
                                            <div className="credits">+{pack.credits}</div>
                                            <div className="cost">${pack.price}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {selectedPack && (
                                <div className="payment-gateway">
                                    <div className="payment-label">SECURE CHECKOUT:</div>
                                    <PayPalButton 
                                        amount={fuelPacks.find(p => p.id === selectedPack).price.toString()} 
                                        onSuccess={() => handleRefuelSuccess(selectedPack)} 
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>

            <style jsx>{`
                .account-shell {
                    display: flex;
                    min-height: 100vh;
                    background: #050505;
                    color: #fff;
                    font-family: 'Inter', sans-serif;
                }
                .glass {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .account-sidebar {
                    width: 280px;
                    display: flex;
                    flex-direction: column;
                    padding: 20px;
                    border-right: 1px solid rgba(255,255,255,0.1);
                }
                .brand { font-size: 1.5rem; font-weight: bold; margin-bottom: 40px; padding-left: 10px; }
                .nav-item {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding: 12px 15px;
                    background: transparent;
                    border: none;
                    color: #aaa;
                    cursor: pointer;
                    border-radius: 0 20px 20px 0;
                    margin-bottom: 5px;
                    transition: all 0.2s;
                    text-align: left;
                    font-size: 0.95rem;
                }
                .nav-item:hover { background: rgba(255,255,255,0.05); color: #fff; }
                .nav-item.active { background: rgba(0, 240, 255, 0.1); color: #00f0ff; }
                .sidebar-footer { margin-top: auto; }
                .signout-btn {
                    width: 100%;
                    padding: 10px;
                    background: transparent;
                    border: 1px solid rgba(255,50,50,0.3);
                    color: #ff5555;
                    border-radius: 8px;
                    cursor: pointer;
                }

                .account-content { flex: 1; display: flex; flex-direction: column; }
                .content-header {
                    padding: 20px 40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }
                .content-header h1 { font-size: 1.5rem; margin: 0; }
                .avatar-small {
                    width: 40px; height: 40px; background: #00f0ff; color: #000;
                    border-radius: 50%; display: flex; alignItems: center; justifyContent: center;
                    font-weight: bold;
                }

                .content-body { padding: 40px; max-width: 1000px; margin: 0 auto; width: 100%; }
                
                .dashboard-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
                .welcome-card { grid-column: span 2; padding: 30px; border-radius: 12px; }
                .stat-card { padding: 25px; border-radius: 12px; }
                .stat-val { font-size: 2rem; font-weight: bold; margin: 10px 0; }
                .stat-val.safe { color: #00ff88; }
                
                .form-card { padding: 0; border-radius: 12px; overflow: hidden; }
                .form-card h3 { padding: 20px 30px; margin: 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
                .form-card > p { padding: 0 30px; opacity: 0.6; font-size: 0.9rem; margin-top: 15px; }
                
                .form-row, .security-row {
                    padding: 20px 30px;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 20px;
                }
                .form-row label { flex: 1; color: #aaa; font-size: 0.9rem; }
                .modern-input {
                    flex: 2;
                    background: transparent;
                    border: 1px solid rgba(255,255,255,0.2);
                    padding: 10px;
                    border-radius: 6px;
                    color: #fff;
                }
                .modern-input:focus { border-color: #00f0ff; outline: none; }
                .btn-arrow { background: none; border: none; color: #fff; font-size: 1.2rem; cursor: pointer; }

                .fuel-card { border-color: rgba(0, 240, 255, 0.3); }
                .stat-val.credits { color: #00f0ff; text-shadow: 0 0 10px rgba(0, 240, 255, 0.3); }
                .refuel-btn {
                    margin-top: 15px;
                    padding: 8px 16px;
                    background: rgba(0, 240, 255, 0.1);
                    border: 1px solid #00f0ff;
                    color: #00f0ff;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.8rem;
                    transition: 0.2s;
                }
                .refuel-btn:hover { background: #00f0ff; color: #000; }

                .avatar-large {
                    width: 60px; height: 60px; background: #00f0ff; color: #000;
                    border-radius: 50%; display: flex; alignItems: center; justifyContent: center;
                    font-weight: bold; font-size: 1.5rem;
                }
                .avatar-row { display: flex; align-items: center; gap: 20px; flex: 2; }
                .btn-text { background: none; border: none; color: #00f0ff; cursor: pointer; }

                .status-banner {
                    padding: 15px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                }
                .status-banner.success { color: #00ff88; border-color: #00ff88; }
                .status-banner.error { color: #ff5555; border-color: #ff5555; }

                .modal-overlay {
                    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.85); backdrop-filter: blur(10px);
                    display: flex; align-items: center; justify-content: center; z-index: 1000;
                }
                .refuel-modal {
                    width: 480px; max-width: 95%; padding: 40px; border-radius: 24px;
                    border: 1px solid rgba(0, 240, 255, 0.3);
                }
                .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
                .modal-header h2 { font-family: var(--font-orbitron); font-size: 1.1rem; letter-spacing: 2px; color: #00f0ff; }
                .close-btn { background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer; opacity: 0.5; }
                
                .pack-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 30px; }
                .pack-card {
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 16px 20px; border-radius: 12px; background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1); cursor: pointer; transition: 0.2s;
                }
                .pack-card:hover { border-color: #00f0ff; background: rgba(0, 240, 255, 0.05); }
                .pack-card.selected { border-color: #00f0ff; background: rgba(0, 240, 255, 0.1); box-shadow: 0 0 20px rgba(0, 240, 255, 0.2); }
                
                .pack-info h3 { font-size: 1rem; margin-bottom: 4px; }
                .pack-info p { font-size: 0.8rem; opacity: 0.5; }
                .pack-price { text-align: right; }
                .pack-price .credits { color: #00f0ff; font-weight: 800; font-size: 1.1rem; }
                .pack-price .cost { font-size: 0.9rem; font-weight: 700; opacity: 0.8; }

                .payment-gateway { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 25px; }
                .payment-label { text-align: center; font-size: 0.7rem; letter-spacing: 1.5px; opacity: 0.5; margin-bottom: 15px; font-weight: 700; }

                @media (max-width: 768px) {
                    .account-shell { flex-direction: column; }
                    .account-sidebar { width: 100%; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.1); }
                    .dashboard-grid { grid-template-columns: 1fr; }
                    .form-row { flex-direction: column; align-items: flex-start; }
                    .modern-input { width: 100%; }
                }
            `}</style>
        </div>
    );
}

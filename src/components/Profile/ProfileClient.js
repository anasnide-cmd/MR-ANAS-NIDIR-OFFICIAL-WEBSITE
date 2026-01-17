'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { updateProfile, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Loader from '../../components/Loader';

export default function ProfileClient() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        displayName: '',
        bio: '',
        contactEmail: '',
        role: 'user', // Read-only usually
        siteLimit: 1, // Read-only
        createdAt: ''
    });

    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            if (u) {
                setUser(u);
                try {
                    const docRef = doc(db, 'users', u.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setFormData({
                            displayName: data.displayName || u.displayName || '',
                            bio: data.bio || '',
                            contactEmail: data.contactEmail || u.email || '',
                            role: data.role || 'user',
                            siteLimit: data.siteLimit || 1,
                            createdAt: data.createdAt || new Date().toISOString()
                        });
                    } else {
                        // Init default data if doc doesn't exist
                        setFormData(prev => ({
                            ...prev,
                            displayName: u.displayName || u.email?.split('@')[0] || '',
                            contactEmail: u.email || ''
                        }));
                    }
                } catch (err) {
                    console.error("Error fetching profile:", err);
                    setMessage({ type: 'error', text: 'Failed to load profile data.' });
                }
            } else {
                router.push('/mr-build/login');
            }
            setLoading(false);
        });
        return () => unsub();
    }, [router]);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            // Update Auth Profile (Display Name)
            if (user.displayName !== formData.displayName) {
                await updateProfile(user, { displayName: formData.displayName });
            }

            // Update Firestore Doc
            await setDoc(doc(db, 'users', user.uid), {
                displayName: formData.displayName,
                bio: formData.bio,
                contactEmail: formData.contactEmail,
                lastUpdated: new Date().toISOString()
            }, { merge: true });

            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (err) {
            console.error("Error saving profile:", err);
            setMessage({ type: 'error', text: 'Failed to save changes.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <Loader text="Accessing Secure Records..." />;
    if (!user) return null;

    return (
        <div className="profile-container animate-fade-in">
            <div className="profile-card glass">
                <header className="profile-header">
                    <div className="avatar-large">
                        {formData.displayName ? formData.displayName.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="header-info">
                        <h1>{formData.displayName || 'User Profile'}</h1>
                        <span className="role-badge">{formData.role.toUpperCase()}</span>
                    </div>
                </header>

                <form onSubmit={handleSave} className="profile-form">
                    <div className="form-grid">
                        <div className="input-group">
                            <label>Display Name</label>
                            <input 
                                type="text" 
                                value={formData.displayName}
                                onChange={e => setFormData({...formData, displayName: e.target.value})}
                                className="modern-input"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="input-group">
                            <label>Contact Email</label>
                            <input 
                                type="email" 
                                value={formData.contactEmail}
                                onChange={e => setFormData({...formData, contactEmail: e.target.value})}
                                className="modern-input"
                                placeholder="contact@example.com"
                            />
                        </div>

                        <div className="input-group full-width">
                            <label>Bio / About</label>
                            <textarea 
                                value={formData.bio}
                                onChange={e => setFormData({...formData, bio: e.target.value})}
                                className="modern-input textarea"
                                placeholder="Tell us about yourself..."
                                rows={4}
                            />
                        </div>

                        <div className="input-group read-only">
                            <label>Account Status</label>
                            <div className="readonly-field">Active</div>
                        </div>

                        <div className="input-group read-only">
                            <label>Site Limit</label>
                            <div className="readonly-field">{formData.siteLimit} Sites</div>
                        </div>
                    </div>

                    {message.text && (
                        <div className={`message-banner ${message.type}`}>
                            {message.text}
                        </div>
                    )}

                    <div className="form-actions">
                        <button type="submit" className="btn-save" disabled={saving}>
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>

            <style jsx>{`
                .profile-container {
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 40px 20px;
                    background: radial-gradient(circle at top, #1a1a1a 0%, #000 100%);
                    color: #fff;
                    font-family: 'Inter', sans-serif;
                }
                .glass {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                }
                .profile-card {
                    width: 100%;
                    max-width: 800px;
                    padding: 40px;
                }
                .profile-header {
                    display: flex;
                    align-items: center;
                    gap: 30px;
                    margin-bottom: 40px;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    padding-bottom: 30px;
                }
                .avatar-large {
                    width: 100px;
                    height: 100px;
                    background: linear-gradient(135deg, #00f0ff, #00ff88);
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 3rem;
                    font-weight: 900;
                    color: #000;
                    box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
                }
                .header-info h1 { margin: 0 0 10px; font-size: 2.5rem; letter-spacing: -1px; }
                .role-badge {
                    background: rgba(255,255,255,0.1);
                    padding: 5px 12px;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: bold;
                    letter-spacing: 1px;
                }

                .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 25px;
                    margin-bottom: 30px;
                }
                .full-width { grid-column: span 2; }
                
                .input-group { display: flex; flex-direction: column; gap: 8px; }
                .input-group label {
                    font-size: 0.8rem; text-transform: uppercase; font-weight: bold; opacity: 0.6; letter-spacing: 1px;
                }
                .modern-input {
                    background: rgba(0,0,0,0.3);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 15px;
                    border-radius: 10px;
                    color: #fff;
                    font-size: 1rem;
                    transition: all 0.3s;
                }
                .modern-input:focus {
                    border-color: #00f0ff;
                    outline: none;
                    background: rgba(0,0,0,0.5);
                    box-shadow: 0 0 15px rgba(0, 240, 255, 0.1);
                }
                .textarea { resize: vertical; min-height: 100px; }
                .readonly-field {
                    padding: 15px;
                    background: rgba(255,255,255,0.05);
                    border-radius: 10px;
                    color: rgba(255,255,255,0.5);
                    font-family: monospace;
                }

                .form-actions { display: flex; justify-content: flex-end; }
                .btn-save {
                    padding: 15px 40px;
                    background: #00f0ff;
                    color: #000;
                    border: none;
                    border-radius: 10px;
                    font-size: 1rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .btn-save:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(0, 240, 255, 0.3);
                }
                .btn-save:disabled { opacity: 0.7; cursor: not-allowed; }

                .message-banner {
                    padding: 15px;
                    border-radius: 10px;
                    margin-bottom: 20px;
                    font-weight: bold;
                    text-align: center;
                }
                .message-banner.success {
                    background: rgba(0, 255, 136, 0.1);
                    color: #00ff88;
                    border: 1px solid rgba(0, 255, 136, 0.3);
                }
                .message-banner.error {
                    background: rgba(255, 50, 50, 0.1);
                    color: #ff3232;
                    border: 1px solid rgba(255, 50, 50, 0.3);
                }

                @media (max-width: 768px) {
                    .form-grid { grid-template-columns: 1fr; }
                    .full-width { grid-column: span 1; }
                    .profile-header { flex-direction: column; text-align: center; }
                }
            `}</style>
        </div>
    );
}

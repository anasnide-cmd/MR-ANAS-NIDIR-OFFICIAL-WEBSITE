'use client';
import { useState, useEffect } from 'react';
import { auth } from '../../lib/firebase';
import {
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import AdminSidebar from '../../components/AdminSidebar';

const ALLOWED_ADMINS = [
    'anasnide@gmail.com',
    'ceo@anasnidir.com',
];

export default function AdminLayout({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authLoading, setAuthLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarMinimized, setSidebarMinimized] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });

        // Load sidebar preference
        const saved = localStorage.getItem('sidebarMinimized');
        if (saved !== null) setSidebarMinimized(saved === 'true');

        return () => unsub();
    }, []);

    const toggleMinimize = () => {
        const newState = !sidebarMinimized;
        setSidebarMinimized(newState);
        localStorage.setItem('sidebarMinimized', newState);
    };

    const handleGoogleLogin = async () => {
        setAuthLoading(true);
        try {
            await signInWithPopup(auth, new GoogleAuthProvider());
        } catch (err) {
            alert(err.message);
        } finally {
            setAuthLoading(false);
        }
    };

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setAuthLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            alert(err.message);
        } finally {
            setAuthLoading(false);
        }
    };

    if (loading) return <div className="admin-loading">Initializing Dashboard...</div>;

    const isOwner = user && ALLOWED_ADMINS.includes(user.email);

    // UNAUTHENTICATED: Show Premium Login
    if (!user) {
        return (
            <div className="login-container animate-fade-in">
                <div className="login-card glass">
                    <div className="login-header">
                        <div className="login-logo">A</div>
                        <h1>Admin Engine</h1>
                        <p>Authorized personnel only. Access terminal restricted.</p>
                    </div>

                    <form onSubmit={handleEmailLogin} className="login-form">
                        <div className="input-field">
                            <input
                                type="email"
                                placeholder="Email Identity"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-field">
                            <input
                                type="password"
                                placeholder="Security Key"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-login" disabled={authLoading}>
                            {authLoading ? '🔐 Verifying...' : '⚡ Establish Connection'}
                        </button>
                    </form>

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    <button className="btn-google" onClick={handleGoogleLogin} disabled={authLoading}>
                        <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="" />
                        Sync with Google Space
                    </button>

                    <p className="login-footer">System v2.0 • Secured by NEXENGINE</p>
                </div>

                <style jsx>{`
                    .login-container {
                        height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: radial-gradient(circle at center, #1a1a2e 0%, #020202 100%);
                        padding: 20px;
                        color: #fff;
                    }
                    .login-card {
                        width: 100%;
                        max-width: 450px;
                        padding: 50px;
                        border-radius: 30px;
                        text-align: center;
                        background: rgba(255, 255, 255, 0.03);
                        backdrop-filter: blur(20px);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                    }
                    .login-header { margin-bottom: 40px; }
                    .login-logo {
                        width: 60px; height: 60px;
                        background: #00f0ff;
                        color: #000;
                        font-size: 2rem;
                        font-weight: 900;
                        border-radius: 15px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 20px;
                        box-shadow: 0 0 30px rgba(0, 240, 255, 0.4);
                    }
                    .login-header h1 { font-size: 2rem; font-weight: 800; margin-bottom: 10px; letter-spacing: -1px; }
                    .login-header p { opacity: 0.5; font-size: 0.9rem; line-height: 1.5; }

                    .login-form { display: flex; flex-direction: column; gap: 15px; }
                    .input-field input {
                        width: 100%;
                        background: rgba(255, 255, 255, 0.03);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        padding: 16px;
                        border-radius: 12px;
                        color: #fff;
                        font-size: 1rem;
                        transition: all 0.3s;
                    }
                    .input-field input:focus {
                        background: rgba(255, 255, 255, 0.07);
                        border-color: #00f0ff;
                        outline: none;
                        box-shadow: 0 0 15px rgba(0, 240, 255, 0.1);
                    }

                    .btn-login {
                        background: #00f0ff;
                        color: #000;
                        border: none;
                        padding: 16px;
                        border-radius: 12px;
                        font-weight: 800;
                        font-size: 1rem;
                        cursor: pointer;
                        transition: all 0.3s;
                    }
                    .btn-login:hover { transform: translateY(-2px); box-shadow: 0 5px 20px rgba(0, 240, 255, 0.3); }
                    .btn-login:disabled { opacity: 0.5; transform: none; }

                    .divider {
                        margin: 30px 0;
                        position: relative;
                        text-align: center;
                    }
                    .divider::before {
                        content: '';
                        position: absolute;
                        top: 50%; left: 0; right: 0;
                        height: 1px;
                        background: rgba(255, 255, 255, 0.1);
                    }
                    .divider span {
                        position: relative;
                        background: #0a0a0a;
                        padding: 0 15px;
                        font-size: 0.75rem;
                        font-weight: 800;
                        opacity: 0.4;
                    }

                    .btn-google {
                        width: 100%;
                        background: #fff;
                        color: #000;
                        border: none;
                        padding: 14px;
                        border-radius: 12px;
                        font-weight: 700;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 12px;
                        cursor: pointer;
                        transition: all 0.3s;
                    }
                    .btn-google:hover { background: #f0f0f0; transform: translateY(-2px); }
                    .btn-google img { width: 20px; height: 20px; }

                    .login-footer { margin-top: 40px; font-size: 0.75rem; opacity: 0.3; letter-spacing: 1px; font-weight: 700; }
                    
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
            </div>
        );
    }

    // UNAUTHORIZED: Show Access Denied
    if (!isOwner) {
        return (
            <div className="access-denied">
                <h1>⛔ Access Denied</h1>
                <p>You are logged in as <strong>{user.email}</strong></p>
                <p className="hint">This machine only recognizes authorized DNA signatures.</p>
                <button onClick={() => signOut(auth)} className="btn-outline">Logout Account</button>

                <style jsx>{`
                    .access-denied {
                        height: 100vh;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        gap: 15px;
                        background: #020202;
                        color: #fff;
                        padding: 20px;
                    }
                    h1 { font-size: 2.5rem; margin-bottom: 10px; }
                    strong { color: #ff3232; }
                    .hint { opacity: 0.5; font-size: 0.9rem; font-style: italic; }
                    .btn-outline {
                        margin-top: 20px;
                        padding: 12px 25px;
                        border: 1px solid rgba(255,255,255,0.2);
                        background: transparent;
                        color: #fff;
                        border-radius: 12px;
                        cursor: pointer;
                        font-weight: 700;
                        transition: all 0.3s;
                    }
                    .btn-outline:hover { background: rgba(255,255,255,0.05); border-color: #ff3232; color: #ff3232; }
                `}</style>
            </div>
        );
    }

    // AUTHORIZED: Show Sidebar + Content
    return (
        <div className="admin-layout">
            <button className="mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? '✕' : '☰'}
            </button>

            <AdminSidebar
                isOpen={sidebarOpen}
                close={() => setSidebarOpen(false)}
                isMinimized={sidebarMinimized}
                toggleMinimize={toggleMinimize}
            />

            {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

            <main className={`admin-main ${sidebarMinimized ? 'minimized' : ''}`}>
                <div className="admin-content-wrapper">
                    {children}
                </div>
            </main>

            <style jsx>{`
                .admin-loading {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    font-size: 1.2rem;
                    color: #00f0ff;
                }
                .admin-layout {
                    display: flex;
                    min-height: 100vh;
                    background: #020202;
                    color: #fff;
                    position: relative;
                }
                .mobile-toggle {
                    display: none;
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 1001;
                    background: rgba(0, 240, 255, 0.1);
                    border: 1px solid rgba(0, 240, 255, 0.2);
                    color: #00f0ff;
                    width: 45px;
                    height: 45px;
                    border-radius: 10px;
                    font-size: 1.5rem;
                    cursor: pointer;
                    backdrop-filter: blur(5px);
                }
                .sidebar-overlay {
                    display: none;
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.7);
                    backdrop-filter: blur(3px);
                    z-index: 99;
                }
                .admin-main {
                    flex: 1;
                    margin-left: 280px;
                    padding: 40px;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .admin-main.minimized {
                    margin-left: 80px;
                }
                .admin-content-wrapper {
                    max-width: 1100px;
                    margin: 0 auto;
                    animation: pageFadeIn 0.5s ease-out;
                }
                @keyframes pageFadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .access-denied {
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    gap: 20px;
                    background: #050505;
                }

                @media (max-width: 1024px) {
                    .admin-main {
                        margin-left: 0;
                        padding: 80px 20px 40px;
                    }
                    .mobile-toggle {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .sidebar-overlay {
                        display: block;
                    }
                }
            `}</style>
        </div>
    );
}

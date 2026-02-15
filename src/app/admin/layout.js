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
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import AdminSidebar from '../../components/AdminSidebar';
import CommandPalette from '../../components/Admin/CommandPalette';
import AdminAgent from '../../components/Admin/AdminAgent';

const ALLOWED_ADMINS = [
    'anasnide@gmail.com',
    'ceo@anasnidir.com',
];

// Fallback icons if react-icons is not installed
const FiLoader = () => <span className="icon">↻</span>;
const FiLogOut = () => <span className="icon">🚪</span>;
const FiMenu = () => <span className="icon">☰</span>;
const FiX = () => <span className="icon">✕</span>;
const FiChevronLeft = () => <span className="icon">‹</span>;
const FiChevronRight = () => <span className="icon">›</span>;
const FiLock = () => <span className="icon">🔒</span>;
const FiMail = () => <span className="icon">✉️</span>;
const FiKey = () => <span className="icon">🔑</span>;
const FiAlertCircle = () => <span className="icon">⚠️</span>;
const FiCheck = () => <span className="icon">✓</span>;

const Loader = () => (
    <div className="loader-container">
        <div className="loader">
            <div className="loader-circle"></div>
            <div className="loader-circle"></div>
            <div className="loader-circle"></div>
        </div>
        <p className="loader-text">Initializing Secure Dashboard</p>
        <style jsx>{`
            .loader-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                background: linear-gradient(135deg, #0a0a0f 0%, #020202 100%);
            }
            .loader {
                display: flex;
                gap: 8px;
                margin-bottom: 20px;
            }
            .loader-circle {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: #00f0ff;
                animation: pulse 1.4s ease-in-out infinite;
            }
            .loader-circle:nth-child(2) {
                animation-delay: 0.2s;
            }
            .loader-circle:nth-child(3) {
                animation-delay: 0.4s;
            }
            .loader-text {
                color: rgba(255, 255, 255, 0.7);
                font-size: 0.9rem;
                letter-spacing: 0.5px;
                font-weight: 500;
            }
            @keyframes pulse {
                0%, 100% { opacity: 0.3; transform: scale(0.9); }
                50% { opacity: 1; transform: scale(1.1); }
            }
        `}</style>
    </div>
);

export default function AdminLayout({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authLoading, setAuthLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarMinimized, setSidebarMinimized] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });

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
        setAuthError('');
        try {
            await signInWithPopup(auth, new GoogleAuthProvider());
            setLoginSuccess(true);
            setTimeout(() => setLoginSuccess(false), 2000);
        } catch (err) {
            setAuthError(err.message);
        } finally {
            setAuthLoading(false);
        }
    };

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setAuthLoading(true);
        setAuthError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setLoginSuccess(true);
            setTimeout(() => setLoginSuccess(false), 2000);
        } catch (err) {
            setAuthError(err.message);
        } finally {
            setAuthLoading(false);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
    };

    if (!mounted) return null;

    if (loading) return <Loader />;

    const isOwner = user && ALLOWED_ADMINS.includes(user.email);

    // UNAUTHENTICATED: Premium Login UI
    if (!user) {
        return (
            <div className="login-container">
                <div className="login-background">
                    <div className="gradient-blob"></div>
                    <div className="grid-pattern"></div>
                </div>
                
                <div className="login-card">
                    <div className="login-header">
                        <div className="login-logo">
                            <FiLock />
                        </div>
                        <h1>NEXENGINE DASHBOARD</h1>
                        <p className="login-subtitle">Secure administrative interface • v2.0</p>
                    </div>

                    {authError && (
                        <div className="error-alert">
                            <FiAlertCircle />
                            <span>{authError}</span>
                        </div>
                    )}

                    {loginSuccess && (
                        <div className="success-alert">
                            <FiCheck />
                            <span>Authentication successful! Redirecting...</span>
                        </div>
                    )}

                    <form onSubmit={handleEmailLogin} className="login-form">
                        <div className="input-group">
                            <div className="input-icon">
                                <FiMail />
                            </div>
                            <input
                                type="email"
                                placeholder="Admin email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                disabled={authLoading}
                            />
                        </div>

                        <div className="input-group">
                            <div className="input-icon">
                                <FiKey />
                            </div>
                            <input
                                type="password"
                                placeholder="Security key"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                disabled={authLoading}
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn-primary"
                            disabled={authLoading}
                        >
                            {authLoading ? (
                                <>
                                    <FiLoader />
                                    Authenticating...
                                </>
                            ) : (
                                'Establish Connection'
                            )}
                        </button>
                    </form>

                    <div className="divider">
                        <span>Secure Alternative</span>
                    </div>

                    <button 
                        className="btn-secondary"
                        onClick={handleGoogleLogin}
                        disabled={authLoading}
                    >
                        <svg className="google-icon" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Authenticate with Google
                    </button>

                    <div className="login-footer">
                        <div className="security-badge">
                            <div className="secure-dot"></div>
                            <span>End-to-end encrypted • ISO 27001 compliant</span>
                        </div>
                        <p className="copyright">© 2024 NEXENGINE SYSTEMS • All rights reserved</p>
                    </div>
                </div>

                <style jsx>{`
                    .login-container {
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 20px;
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .login-background {
                        position: fixed;
                        inset: 0;
                        background: linear-gradient(135deg, #0a0a0f 0%, #020202 100%);
                        z-index: -2;
                    }
                    
                    .gradient-blob {
                        position: absolute;
                        top: -20%;
                        right: -10%;
                        width: 60%;
                        height: 60%;
                        background: radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, rgba(0, 240, 255, 0) 70%);
                        filter: blur(60px);
                    }
                    
                    .grid-pattern {
                        position: absolute;
                        inset: 0;
                        background-image: 
                            linear-gradient(rgba(0, 240, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 240, 255, 0.05) 1px, transparent 1px);
                        background-size: 40px 40px;
                        mask-image: radial-gradient(circle at center, black 30%, transparent 70%);
                    }
                    
                    .login-card {
                        width: 100%;
                        max-width: 420px;
                        padding: 40px;
                        background: rgba(255, 255, 255, 0.03);
                        backdrop-filter: blur(20px);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 24px;
                        box-shadow: 
                            0 20px 60px rgba(0, 0, 0, 0.5),
                            inset 0 1px 0 rgba(255, 255, 255, 0.1);
                        animation: fadeIn 0.5s ease-out;
                    }
                    
                    .login-header {
                        text-align: center;
                        margin-bottom: 32px;
                    }
                    
                    .login-logo {
                        width: 72px;
                        height: 72px;
                        margin: 0 auto 20px;
                        background: linear-gradient(135deg, #00f0ff 0%, #0080ff 100%);
                        border-radius: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-shadow: 0 0 40px rgba(0, 240, 255, 0.3);
                    }
                    
                    .logo-icon {
                        width: 32px;
                        height: 32px;
                        color: #000;
                    }
                    
                    h1 {
                        font-size: 1.75rem;
                        font-weight: 800;
                        background: linear-gradient(135deg, #fff 0%, #a0a0a0 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        margin-bottom: 8px;
                        letter-spacing: -0.5px;
                    }
                    
                    .login-subtitle {
                        color: rgba(255, 255, 255, 0.6);
                        font-size: 0.875rem;
                        letter-spacing: 0.5px;
                    }
                    
                    .error-alert, .success-alert {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        padding: 16px;
                        border-radius: 12px;
                        margin-bottom: 24px;
                        font-size: 0.875rem;
                        animation: slideDown 0.3s ease-out;
                    }
                    
                    .error-alert {
                        background: rgba(255, 50, 50, 0.1);
                        border: 1px solid rgba(255, 50, 50, 0.2);
                        color: #ff5050;
                    }
                    
                    .success-alert {
                        background: rgba(50, 255, 100, 0.1);
                        border: 1px solid rgba(50, 255, 100, 0.2);
                        color: #32ff64;
                    }
                    
                    .login-form {
                        display: flex;
                        flex-direction: column;
                        gap: 16px;
                        margin-bottom: 32px;
                    }
                    
                    .input-group {
                        position: relative;
                        display: flex;
                        align-items: center;
                    }
                    
                    .input-icon {
                        position: absolute;
                        left: 16px;
                        color: rgba(255, 255, 255, 0.5);
                    }
                    
                    input {
                        width: 100%;
                        padding: 16px 16px 16px 48px;
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 12px;
                        color: #fff;
                        font-size: 0.95rem;
                        transition: all 0.2s ease;
                    }
                    
                    input:focus {
                        outline: none;
                        background: rgba(255, 255, 255, 0.08);
                        border-color: #00f0ff;
                        box-shadow: 0 0 0 3px rgba(0, 240, 255, 0.1);
                    }
                    
                    input:disabled {
                        opacity: 0.5;
                        cursor: not-allowed;
                    }
                    
                    .btn-primary, .btn-secondary {
                        width: 100%;
                        padding: 16px;
                        border: none;
                        border-radius: 12px;
                        font-size: 0.95rem;
                        font-weight: 600;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 12px;
                        transition: all 0.2s ease;
                    }
                    
                    .btn-primary {
                        background: linear-gradient(135deg, #00f0ff 0%, #0080ff 100%);
                        color: #000;
                    }
                    
                    .btn-primary:hover:not(:disabled) {
                        transform: translateY(-2px);
                        box-shadow: 0 10px 30px rgba(0, 240, 255, 0.3);
                    }
                    
                    .btn-primary:disabled {
                        opacity: 0.6;
                        cursor: not-allowed;
                    }
                    
                    .btn-secondary {
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        color: #fff;
                    }
                    
                    .btn-secondary:hover:not(:disabled) {
                        background: rgba(255, 255, 255, 0.1);
                        transform: translateY(-2px);
                    }
                    
                    .spin {
                        animation: spin 1s linear infinite;
                    }
                    
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    
                    .google-icon {
                        width: 20px;
                        height: 20px;
                    }
                    
                    .divider {
                        position: relative;
                        margin: 24px 0;
                        text-align: center;
                    }
                    
                    .divider::before {
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: 0;
                        right: 0;
                        height: 1px;
                        background: rgba(255, 255, 255, 0.1);
                    }
                    
                    .divider span {
                        position: relative;
                        background: rgba(255, 255, 255, 0.03);
                        padding: 0 16px;
                        color: rgba(255, 255, 255, 0.4);
                        font-size: 0.75rem;
                        font-weight: 600;
                        letter-spacing: 0.5px;
                    }
                    
                    .login-footer {
                        margin-top: 40px;
                        text-align: center;
                    }
                    
                    .security-badge {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                        margin-bottom: 16px;
                        color: rgba(255, 255, 255, 0.4);
                        font-size: 0.75rem;
                        font-weight: 500;
                    }
                    
                    .secure-dot {
                        width: 6px;
                        height: 6px;
                        border-radius: 50%;
                        background: #00ff88;
                        box-shadow: 0 0 8px #00ff88;
                    }
                    
                    .copyright {
                        color: rgba(255, 255, 255, 0.3);
                        font-size: 0.7rem;
                        letter-spacing: 0.5px;
                    }
                    
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    
                    @keyframes slideDown {
                        from { opacity: 0; transform: translateY(-10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    
                    @media (max-width: 480px) {
                        .login-card {
                            padding: 32px 24px;
                        }
                        
                        h1 {
                            font-size: 1.5rem;
                        }
                    }
                `}</style>
            </div>
        );
    }

    // UNAUTHORIZED: Access Denied
    if (!isOwner) {
        return (
            <div className="access-denied">
                <div className="denied-container">
                    <div className="denied-icon">🚫</div>
                    <h1>Access Restricted</h1>
                    <p className="denied-subtitle">
                        Unauthorized access attempt detected from:
                    </p>
                    <div className="user-info">
                        <span className="user-email">{user.email}</span>
                        <span className="user-status">UNVERIFIED</span>
                    </div>
                    <p className="denied-message">
                        This terminal requires Level 9 clearance. Your credentials do not match authorized personnel records.
                    </p>
                    <button onClick={handleLogout} className="logout-btn">
                        <FiLogOut />
                        Terminate Session
                    </button>
                </div>

                <style jsx>{`
                    .access-denied {
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 20px;
                        background: linear-gradient(135deg, #120e0e 0%, #000 100%);
                    }
                    
                    .denied-container {
                        max-width: 480px;
                        text-align: center;
                        padding: 48px;
                        background: rgba(255, 255, 255, 0.03);
                        backdrop-filter: blur(20px);
                        border: 1px solid rgba(255, 50, 50, 0.1);
                        border-radius: 24px;
                        box-shadow: 0 20px 60px rgba(255, 0, 0, 0.1);
                        animation: fadeIn 0.5s ease-out;
                    }
                    
                    .denied-icon {
                        font-size: 4rem;
                        margin-bottom: 24px;
                        opacity: 0.9;
                    }
                    
                    h1 {
                        font-size: 2.5rem;
                        font-weight: 800;
                        background: linear-gradient(135deg, #ff3232 0%, #ff8080 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        margin-bottom: 16px;
                    }
                    
                    .denied-subtitle {
                        color: rgba(255, 255, 255, 0.6);
                        font-size: 0.95rem;
                        margin-bottom: 8px;
                    }
                    
                    .user-info {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 12px;
                        margin: 24px 0;
                        padding: 16px;
                        background: rgba(255, 50, 50, 0.1);
                        border-radius: 12px;
                        border: 1px solid rgba(255, 50, 50, 0.2);
                    }
                    
                    .user-email {
                        font-weight: 600;
                        color: #ff8080;
                    }
                    
                    .user-status {
                        font-size: 0.75rem;
                        padding: 4px 12px;
                        background: rgba(255, 50, 50, 0.2);
                        border-radius: 20px;
                        color: #ff3232;
                        font-weight: 700;
                        letter-spacing: 1px;
                    }
                    
                    .denied-message {
                        color: rgba(255, 255, 255, 0.5);
                        line-height: 1.6;
                        margin: 24px 0;
                        font-size: 0.95rem;
                    }
                    
                    .logout-btn {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 12px;
                        width: 100%;
                        padding: 16px;
                        background: rgba(255, 50, 50, 0.1);
                        border: 1px solid rgba(255, 50, 50, 0.2);
                        border-radius: 12px;
                        color: #ff8080;
                        font-size: 0.95rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s ease;
                    }
                    
                    .logout-btn:hover {
                        background: rgba(255, 50, 50, 0.2);
                        transform: translateY(-2px);
                        box-shadow: 0 10px 30px rgba(255, 0, 0, 0.2);
                    }
                    
                    @media (max-width: 480px) {
                        .denied-container {
                            padding: 32px 24px;
                        }
                        
                        h1 {
                            font-size: 2rem;
                        }
                    }
                `}</style>
            </div>
        );
    }

    // AUTHORIZED: Dashboard Layout
    return (
        <div className="admin-layout">
            <button 
                className="mobile-toggle"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle sidebar"
            >
                {sidebarOpen ? <FiX /> : <FiMenu />}
            </button>

            <AdminSidebar
                isOpen={sidebarOpen}
                close={() => setSidebarOpen(false)}
                isMinimized={sidebarMinimized}
                toggleMinimize={toggleMinimize}
            />

            {sidebarOpen && (
                <div 
                    className="sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <CommandPalette />

            <main className={`admin-main ${sidebarMinimized ? 'minimized' : ''}`}>
                <div className="admin-header">
                    <div className="header-content">
                        <div className="user-info">
                            <div className="avatar">
                                {user.email?.charAt(0).toUpperCase()}
                            </div>
                            <div className="user-details">
                                <span className="user-name">Admin User</span>
                                <span className="user-email">{user.email}</span>
                            </div>
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="logout-button"
                            title="Logout"
                        >
                            <FiLogOut />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>

                <div className="admin-content-wrapper">
                    {children}
                </div>

                <footer className="admin-footer">
                    <p>NEXENGINE ADMIN v2.0 • Secure Session Active</p>
                    <button 
                        onClick={toggleMinimize}
                        className="minimize-toggle"
                        title={sidebarMinimized ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {sidebarMinimized ? <FiChevronRight /> : <FiChevronLeft />}
                    </button>
                </footer>
            </main>

            <style jsx>{`
                .admin-layout {
                    display: flex;
                    min-height: 100vh;
                    background: linear-gradient(135deg, #0a0a0f 0%, #020202 100%);
                    color: #fff;
                    position: relative;
                }
                
                .mobile-toggle {
                    display: none;
                    position: fixed;
                    top: 20px;
                    left: 20px;
                    z-index: 1001;
                    width: 48px;
                    height: 48px;
                    background: rgba(0, 240, 255, 0.1);
                    border: 1px solid rgba(0, 240, 255, 0.2);
                    border-radius: 12px;
                    color: #00f0ff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    backdrop-filter: blur(10px);
                    transition: all 0.2s ease;
                }
                
                .mobile-toggle:hover {
                    background: rgba(0, 240, 255, 0.2);
                    transform: translateY(-2px);
                }
                
                .sidebar-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.7);
                    backdrop-filter: blur(3px);
                    z-index: 99;
                    animation: fadeIn 0.3s ease-out;
                }
                
                .admin-main {
                    flex: 1;
                    margin-left: 280px;
                    padding: 0;
                    transition: margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    min-height: 100dvh;
                    display: flex;
                    flex-direction: column;
                }
                
                .admin-main.minimized {
                    margin-left: 80px;
                }
                
                .admin-header {
                    padding: 24px 40px;
                    background: rgba(255, 255, 255, 0.02);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    animation: slideDown 0.3s ease-out;
                }
                
                .header-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .user-info {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }
                
                .avatar {
                    width: 48px;
                    height: 48px;
                    background: linear-gradient(135deg, #00f0ff 0%, #0080ff 100%);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    font-size: 1.2rem;
                    color: #000;
                    box-shadow: 0 5px 20px rgba(0, 240, 255, 0.2);
                }
                
                .user-details {
                    display: flex;
                    flex-direction: column;
                }
                
                .user-name {
                    font-weight: 700;
                    font-size: 1.1rem;
                }
                
                .user-email {
                    font-size: 0.85rem;
                    color: rgba(255, 255, 255, 0.5);
                }
                
                .logout-button {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 24px;
                    background: rgba(255, 50, 50, 0.1);
                    border: 1px solid rgba(255, 50, 50, 0.2);
                    border-radius: 10px;
                    color: #ff8080;
                    font-weight: 600;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                
                .logout-button:hover {
                    background: rgba(255, 50, 50, 0.2);
                    transform: translateY(-2px);
                    box-shadow: 0 5px 20px rgba(255, 0, 0, 0.2);
                }
                
                .admin-content-wrapper {
                    flex: 1;
                    padding: 40px;
                    max-width: 1200px;
                    margin: 0 auto;
                    width: 100%;
                    animation: fadeIn 0.5s ease-out 0.2s both;
                }
                
                .admin-footer {
                    padding: 20px 40px;
                    background: rgba(255, 255, 255, 0.02);
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .admin-footer p {
                    color: rgba(255, 255, 255, 0.3);
                    font-size: 0.8rem;
                    letter-spacing: 0.5px;
                }
                
                .minimize-toggle {
                    width: 40px;
                    height: 40px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                    color: rgba(255, 255, 255, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                
                .minimize-toggle:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: #00f0ff;
                    transform: translateX(-2px);
                }
                
                .icon {
                    display: inline-block;
                    font-size: 1.2em;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @media (max-width: 1024px) {
                    .admin-main {
                        margin-left: 0 !important;
                        padding-top: 80px;
                        width: 100%;
                        max-width: 100vw;
                        overflow-x: hidden;
                    }
                    
                    .mobile-toggle {
                        display: flex;
                    }
                    
                    .admin-header {
                        padding: 20px;
                    }
                    
                    .admin-content-wrapper {
                        padding: 20px;
                    }
                    
                    .admin-footer {
                        padding: 20px;
                        flex-direction: column;
                        gap: 16px;
                        text-align: center;
                    }
                }
                
                @media (max-width: 480px) {
                    .header-content {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 16px;
                    }
                    
                    .logout-button {
                        align-self: stretch;
                        justify-content: center;
                    }
                }
            `}</style>
            {/* GLOBAL COMMAND PALETTE */}
            <CommandPalette />
            
            {/* THE ORACLE AI AGENT */}
            <AdminAgent />
        </div>
    );
}
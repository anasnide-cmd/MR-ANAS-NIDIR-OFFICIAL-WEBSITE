'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import NotificationCenter from '../../components/NotificationCenter';

export default function BuildLayout({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
            // We don't force redirect here yet, pages will handle their own auth state
        });
        return () => unsub();
    }, []);

    if (loading) return (
        <div className="loading-screen">
            <div className="scanner"></div>
            <p>Scanning Identity...</p>
            <style jsx>{`
                .loading-screen {
                    height: 100vh;
                    background: #020202;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: #00f0ff;
                }
                .scanner {
                    width: 200px;
                    height: 2px;
                    background: #00f0ff;
                    box-shadow: 0 0 20px #00f0ff;
                    animation: scan 2s infinite ease-in-out;
                }
                @keyframes scan {
                    0%, 100% { transform: translateY(-50px); opacity: 0; }
                    50% { transform: translateY(50px); opacity: 1; }
                }
            `}</style>
        </div>
    );

    return (
        <div className="builder-layout">
            <header className="builder-header glass">
                <Link href="/mr-build" className="builder-logo">
                    MR BUILD <sup>PRO</sup>
                </Link>
                <nav className="builder-nav">
                    {user ? (
                        <>
                            <span className="user-email">{user.email}</span>
                            <NotificationCenter />
                            <button onClick={() => auth.signOut()} className="btn-sm btn-outline">Sign Out</button>
                        </>
                    ) : (
                        <Link href="/mr-build/login" className="btn-sm btn-glow">System Access</Link>
                    )}
                </nav>
            </header>
            <main className="builder-main">
                {children}
            </main>

            <style jsx>{`
                .builder-layout {
                    min-height: 100vh;
                    background: #050505;
                    color: #fff;
                    font-family: var(--font-exo2);
                }
                .builder-header {
                    padding: 20px 40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    background: rgba(10, 10, 10, 0.8);
                    border-bottom: 1px solid rgba(0, 240, 255, 0.1);
                }
                .builder-logo {
                    font-family: var(--font-orbitron);
                    font-weight: 900;
                    color: #fff;
                    text-decoration: none;
                    letter-spacing: 2px;
                    font-size: 1.2rem;
                }
                .builder-logo sup { font-size: 0.6rem; color: #00f0ff; }
                .builder-nav { display: flex; align-items: center; gap: 20px; }
                .user-email { font-size: 0.8rem; opacity: 0.6; }
                .btn-sm { padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 0.8rem; font-weight: 700; transition: all 0.3s; }
                .btn-glow { background: #00f0ff; color: #000; border: none; box-shadow: 0 0 15px rgba(0, 240, 255, 0.3); }
                .btn-outline { background: transparent; border: 1px solid rgba(255, 50, 50, 0.3); color: #ff3232; }
                .builder-main { padding: 40px; }
            `}</style>
        </div>
    );
}

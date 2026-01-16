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

    // Non-blocking layout: We render children immediately.
    // Auth state is used for the Header.
    
    return (
        <div className="builder-layout">
            <header className="builder-header glass">
                <Link href={user ? "/mr-build/dashboard" : "/mr-build"} className="builder-logo">
                    MR BUILD <sup>PRO</sup>
                </Link>
                <nav className="builder-nav">
                    {loading ? (
                        <div className="skeleton-auth" style={{width: 100, height: 30, background: 'rgba(255,255,255,0.1)', borderRadius: 8}}></div>
                    ) : user ? (
                        <>
                            <Link href="/mr-build/dashboard" className="user-email">{user.email}</Link>
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

                @media (max-width: 768px) {
                    .builder-header {
                        padding: 15px 20px;
                        flex-direction: column;
                        gap: 15px;
                        align-items: flex-start;
                    }
                    .builder-nav {
                        width: 100%;
                        justify-content: space-between;
                        flex-wrap: wrap;
                        gap: 10px;
                    }
                    .user-email { display: none; }
                    .builder-main { padding: 20px; }
                }

                @media (max-width: 480px) {
                    .builder-header { padding: 12px 15px; }
                    .builder-logo { font-size: 1rem; }
                    .btn-sm { padding: 6px 12px; font-size: 0.75rem; }
                    .builder-main { padding: 15px; }
                }
            `}</style>
        </div>
    );
}

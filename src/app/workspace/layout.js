'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import WorkspaceSidebar from '../../components/WorkspaceSidebar';

export default function WorkspaceLayout({ children }) {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarMinimized, setSidebarMinimized] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            if (u) {
                // Check Role in Firestore
                try {
                    const docRef = doc(db, 'users', u.uid);
                    const snap = await getDoc(docRef);
                    if (snap.exists() && ['admin', 'owner', 'staff'].includes(snap.data().role)) {
                        setRole(snap.data().role);
                        setUser(u);
                    } else {
                        setRole('unauthorized');
                        setUser(u);
                    }
                } catch (err) {
                    console.error("Workspace Auth Error:", err);
                    setRole('error');
                }
            } else {
                setUser(null);
                setRole(null);
            }
            setLoading(false);
        });

        return () => unsub();
    }, []);

    const toggleMinimize = () => setSidebarMinimized(!sidebarMinimized);

    if (loading) return (
        <div className="flex-center">
            <div className="loader"></div>
            <style jsx>{`
                .flex-center { height: 100vh; display: flex; align-items: center; justify-content: center; background: #0a0a0a; color: #fff; }
                .loader { width: 40px; height: 40px; border: 3px solid rgba(255,255,255,0.1); border-top-color: #a0a0ff; border-radius: 50%; animation: spin 1s infinite linear; }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );

    // Access Denied
    if (!user || role === 'unauthorized' || role === 'error') {
        return (
            <div className="denied-screen">
                <div className="denied-box">
                    <h1>RESTRICTED AREA</h1>
                    <p>This workspace is for authorized staff members only.</p>
                    <button onClick={() => router.push('/')} className="btn-back">Return to Base</button>
                    {user && (
                        <button onClick={() => signOut(auth)} className="btn-signout">Sign Out</button>
                    )}
                </div>
                <style jsx>{`
                    .denied-screen { height: 100vh; display: flex; align-items: center; justify-content: center; background: #050505; color: #fff; }
                    .denied-box { text-align: center; max-width: 400px; padding: 40px; border: 1px solid rgba(255, 50, 50, 0.2); background: rgba(255, 50, 50, 0.05); border-radius: 20px; }
                    h1 { color: #ff5050; font-family: var(--font-orbitron); margin-bottom: 20px; }
                    p { opacity: 0.7; margin-bottom: 30px; }
                    button { padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; margin: 5px; }
                    .btn-back { background: #fff; color: #000; border: none; }
                    .btn-signout { background: transparent; color: #ff5050; border: 1px solid rgba(255, 50, 50, 0.3); }
                `}</style>
            </div>
        );
    }

    // Authorized
    return (
        <div className="workspace-layout">
            <button 
                className="mobile-toggle"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                ☰
            </button>

            <WorkspaceSidebar
                isOpen={sidebarOpen}
                close={() => setSidebarOpen(false)}
                isMinimized={sidebarMinimized}
                toggleMinimize={toggleMinimize}
            />

            {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)} />}

            <main className={`workspace-main ${sidebarMinimized ? 'minimized' : ''}`}>
                {children}
            </main>

            <style jsx>{`
                .workspace-layout { min-height: 100vh; background: #0a0a0a; color: #fff; }
                .workspace-main {
                    margin-left: 260px;
                    transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    min-height: 100vh;
                }
                .workspace-main.minimized { margin-left: 80px; }

                .mobile-toggle {
                    display: none;
                    position: fixed; top: 15px; left: 15px; z-index: 1001;
                    background: #2a2b30; color: #fff; border: 1px solid rgba(255,255,255,0.1);
                    width: 40px; height: 40px; border-radius: 8px; cursor: pointer;
                    align-items: center; justify-content: center; font-size: 1.2rem;
                }
                .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 900; backdrop-filter: blur(2px); }

                @media (max-width: 1024px) {
                    .workspace-main { margin-left: 0 !important; }
                    .mobile-toggle { display: flex; }
                }
            `}</style>
        </div>
    );
}

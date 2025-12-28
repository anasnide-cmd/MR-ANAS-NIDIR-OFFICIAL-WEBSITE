'use client';
import { useState, useEffect } from 'react';
import { auth } from '../../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import AdminSidebar from '../../components/AdminSidebar';

const ALLOWED_ADMINS = [
    'anasnide@gmail.com',
    'ceo@anasnidir.com',
];

export default function AdminLayout({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });
        return () => unsub();
    }, []);

    if (loading) return <div className="admin-loading">Loading Dashboard...</div>;

    const isOwner = user && ALLOWED_ADMINS.includes(user.email);

    if (!user) {
        return <>{children}</>;
    }

    if (!isOwner) {
        return (
            <div className="access-denied">
                <h1>⛔ Access Denied</h1>
                <p>You are logged in as <strong>{user.email}</strong></p>
                <button onClick={() => signOut(auth)} className="btn">Logout</button>
            </div>
        );
    }

    return (
        <div className="admin-layout">
            <button className="mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? '✕' : '☰'}
            </button>

            <AdminSidebar isOpen={sidebarOpen} close={() => setSidebarOpen(false)} />

            {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

            <main className="admin-main">
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
                    transition: all 0.3s ease;
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

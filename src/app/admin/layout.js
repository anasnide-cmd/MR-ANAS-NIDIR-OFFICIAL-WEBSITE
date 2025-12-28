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
        return <>{children}</>; // Show login page (which is the default child of /admin)
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
            <AdminSidebar />
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
                    background: #050505;
                    color: #fff;
                }
                .admin-main {
                    flex: 1;
                    margin-left: 260px;
                    padding: 40px;
                }
                .admin-content-wrapper {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .access-denied {
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    gap: 20px;
                }

                @media (max-width: 768px) {
                    .admin-main {
                        margin-left: 70px;
                        padding: 20px;
                    }
                }
            `}</style>
        </div>
    );
}

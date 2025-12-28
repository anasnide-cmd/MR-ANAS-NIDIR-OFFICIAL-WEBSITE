'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

export default function AdminSidebar() {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: '📊' },
        { name: 'Site Settings', path: '/admin/settings', icon: '⚙️' },
        { name: 'New Post', path: '/admin/editor', icon: '✍️' },
    ];

    return (
        <aside className="admin-sidebar">
            <div className="sidebar-header">
                <Link href="/">
                    <span className="logo-text">ANAS NIDIR</span>
                </Link>
                <div className="admin-badge">ADMIN</div>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={`nav-item ${pathname === item.path ? 'active' : ''}`}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-name">{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button onClick={() => signOut(auth)} className="logout-btn">
                    <span>🚪</span> Logout
                </button>
            </div>

            <style jsx>{`
                .admin-sidebar {
                    width: 260px;
                    height: 100vh;
                    background: rgba(10, 10, 10, 0.95);
                    border-right: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    flex-direction: column;
                    position: fixed;
                    left: 0;
                    top: 0;
                    z-index: 100;
                    backdrop-filter: blur(10px);
                }
                .sidebar-header {
                    padding: 30px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }
                .logo-text {
                    font-size: 1.2rem;
                    font-weight: 800;
                    letter-spacing: 2px;
                    color: #fff;
                    text-decoration: none;
                }
                .admin-badge {
                    font-size: 0.7rem;
                    background: #00f0ff;
                    color: #000;
                    padding: 2px 8px;
                    border-radius: 4px;
                    display: inline-block;
                    margin-top: 5px;
                    font-weight: bold;
                }
                .sidebar-nav {
                    flex: 1;
                    padding: 20px 15px;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .nav-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 15px;
                    color: rgba(255, 255, 255, 0.6);
                    text-decoration: none;
                    border-radius: 8px;
                    transition: all 0.3s;
                }
                .nav-item:hover {
                    background: rgba(255, 255, 255, 0.05);
                    color: #fff;
                }
                .nav-item.active {
                    background: rgba(0, 240, 255, 0.1);
                    color: #00f0ff;
                    font-weight: bold;
                }
                .nav-icon {
                    font-size: 1.2rem;
                }
                .sidebar-footer {
                    padding: 20px;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                }
                .logout-btn {
                    width: 100%;
                    padding: 12px;
                    background: rgba(255, 50, 50, 0.1);
                    color: #ff3232;
                    border: 1px solid rgba(255, 50, 50, 0.2);
                    border-radius: 8px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    transition: all 0.3s;
                }
                .logout-btn:hover {
                    background: #ff3232;
                    color: #fff;
                }

                @media (max-width: 768px) {
                    .admin-sidebar {
                        width: 70px;
                    }
                    .nav-name, .logo-text, .admin-badge, .sidebar-footer span {
                        display: none;
                    }
                    .sidebar-header {
                        padding: 20px 10px;
                        text-align: center;
                    }
                    .nav-item {
                        justify-content: center;
                    }
                }
            `}</style>
        </aside>
    );
}

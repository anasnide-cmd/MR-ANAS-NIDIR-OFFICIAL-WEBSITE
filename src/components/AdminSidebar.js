'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

export default function AdminSidebar({ isOpen, close, isMinimized, toggleMinimize }) {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Dashboard', path: '/admin/', icon: '📊' },
        { name: 'Users', path: '/admin/users/', icon: '👥' },
        { name: 'Savoirpedia', path: '/savoirpedia/dashboard/', icon: '📚' },
        { name: 'Sites', path: '/admin/sites/', icon: '🌐' },
        { name: 'Content', path: '/admin/content/', icon: '📝' },
        { name: 'New Post', path: '/admin/editor/', icon: '✍️' },
        { name: 'Messages', path: '/admin/messages/', icon: '📢' },
        { name: 'Applications', path: '/admin/applications/', icon: '📋' },
        { name: 'Monitor', path: '/admin/monitor/', icon: '🛡️' },
        { name: 'Settings', path: '/admin/settings/', icon: '⚙️' },
    ];

    return (
        <aside className={`admin-sidebar ${isOpen ? 'open' : ''} ${isMinimized ? 'minimized' : ''}`}>
            <div className="sidebar-header">
                <Link href="/" className="logo-link">
                    <span className="logo-text">{isMinimized ? 'A' : 'ANAS NIDIR'}</span>
                </Link>
                {!isMinimized && <div className="status-badge">ADMIN ENGINE</div>}

                <button className="minimize-toggle" onClick={toggleMinimize}>
                    {isMinimized ? '➜' : '⬅'}
                </button>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        onClick={close}
                        className={`nav-item ${pathname === item.path ? 'active' : ''}`}
                        title={isMinimized ? item.name : ''}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        {!isMinimized && <span className="nav-name">{item.name}</span>}
                    </Link>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button onClick={() => signOut(auth)} className="logout-btn" title={isMinimized ? 'Logout' : ''}>
                    <span>🚪</span> {!isMinimized && 'Logout Account'}
                </button>
            </div>

            <style jsx>{`
                .admin-sidebar {
                    width: 280px;
                    height: 100vh;
                    background: rgba(15, 23, 42, 0.4);
                    border-right: 1px solid rgba(255, 255, 255, 0.1);
                    display: flex;
                    flex-direction: column;
                    position: fixed;
                    left: 0;
                    top: 0;
                    z-index: 9999;
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .admin-sidebar.minimized {
                    width: 80px;
                }
                .sidebar-header {
                    padding: 32px 20px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    position: relative;
                    text-align: center;
                }
                .logo-link {
                    text-decoration: none;
                }
                .logo-text {
                    font-size: 1.4rem;
                    font-weight: 700;
                    letter-spacing: 0.5px;
                    color: #f8fafc;
                    font-family: 'Inter', 'Roboto', sans-serif;
                    transition: all 0.3s;
                }
                .minimized .logo-text { font-size: 1.8rem; letter-spacing: 0; color: #a855f7; }

                .minimize-toggle {
                    position: absolute;
                    top: 50%;
                    right: -14px;
                    transform: translateY(-50%);
                    width: 28px;
                    height: 28px;
                    background: rgba(30, 41, 59, 0.8);
                    color: #f8fafc;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.8rem;
                    font-weight: 700;
                    z-index: 100;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                    backdrop-filter: blur(10px);
                    transition: all 0.2s ease;
                }
                .minimized .minimize-toggle { 
                    right: -16px;
                }
                .minimize-toggle:hover { 
                    transform: translateY(-50%) scale(1.1);
                    background: #fff;
                }

                .status-badge {
                    font-size: 0.65rem;
                    background: rgba(168, 85, 247, 0.2);
                    color: #d8b4fe;
                    border: 1px solid rgba(168, 85, 247, 0.3);
                    padding: 4px 10px;
                    border-radius: 12px;
                    display: inline-block;
                    margin-top: 4px;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                }
                .sidebar-nav {
                    flex: 1;
                    padding: 20px 12px;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .nav-item {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    padding: 12px 16px;
                    color: #cbd5e1;
                    font-size: 0.95rem;
                    font-weight: 500;
                    text-decoration: none;
                    border-radius: 12px;
                    transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
                }
                .minimized .nav-item { justify-content: center; padding: 12px 0; border-radius: 24px; margin: 0 8px; }
                .nav-item:hover {
                    background: rgba(255, 255, 255, 0.05);
                    color: #f8fafc;
                    transform: translateX(4px);
                }
                .nav-item.active {
                    background: linear-gradient(90deg, rgba(168, 85, 247, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%);
                    color: #ffffff;
                    border-left: 3px solid #a855f7;
                    border-radius: 0 12px 12px 0;
                }
                .minimized .nav-item.active {
                    border-left: none;
                    border-radius: 12px;
                    background: rgba(168, 85, 247, 0.2);
                    border: 1px solid rgba(168, 85, 247, 0.3);
                }
                .nav-icon {
                    font-size: 1.25rem;
                    opacity: 0.8;
                }
                .nav-item.active .nav-icon { opacity: 1; }
                .sidebar-footer {
                    padding: 16px;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
                .logout-btn {
                    width: 100%;
                    padding: 12px;
                    background: rgba(239, 68, 68, 0.1);
                    color: #fca5a5;
                    border: 1px solid rgba(239, 68, 68, 0.2);
                    border-radius: 8px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    transition: all 0.2s ease;
                    font-weight: 500;
                }
                .minimized .logout-btn { padding: 12px 0; border: none; }
                .logout-btn:hover {
                    background: rgba(239, 68, 68, 0.2);
                    color: #ffffff;
                }

                @media (max-width: 1024px) {
                    .admin-sidebar {
                        width: 280px !important;
                        transform: translateX(-100%);
                    }
                    .admin-sidebar.open {
                        transform: translateX(0);
                    }
                    .minimize-toggle { display: none; }
                }
            `}</style>
        </aside>
    );
}

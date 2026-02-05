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
        { name: 'Sites', path: '/admin/sites/', icon: '🌐' },
        { name: 'Content', path: '/admin/content/', icon: '📝' },
        { name: 'New Post', path: '/admin/editor/', icon: '✍️' },
        { name: 'Messages', path: '/admin/messages/', icon: '📢' },
        { name: 'Applications', path: '/admin/applications/', icon: '📋' },
        { name: 'Monitor', path: '/admin/monitor/', icon: '🛡️' },
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
                    background: rgba(5, 5, 5, 0.84);
                    border-right: 1px solid rgba(0, 240, 255, 0.1);
                    display: flex;
                    flex-direction: column;
                    position: fixed;
                    left: 0;
                    top: 0;
                    z-index: 9999;
                    backdrop-filter: blur(30px);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .admin-sidebar.minimized {
                    width: 80px;
                }
                .sidebar-header {
                    padding: 40px 20px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    position: relative;
                    text-align: center;
                }
                .logo-link {
                    text-decoration: none;
                }
                .logo-text {
                    font-size: 1.4rem;
                    font-weight: 900;
                    letter-spacing: 2px;
                    color: #fff;
                    background: linear-gradient(to right, #ffffff, #00f0ff);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    transition: all 0.3s;
                }
                .minimized .logo-text { font-size: 1.8rem; letter-spacing: 0; }

                .minimize-toggle {
                    position: absolute;
                    top: 50%;
                    right: -15px;
                    transform: translateY(-50%);
                    width: 32px;
                    height: 32px;
                    background: #00f0ff;
                    color: #000;
                    border: 2px solid #020202;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.9rem;
                    font-weight: 900;
                    z-index: 100;
                    box-shadow: 0 0 15px rgba(0, 240, 255, 0.4);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .minimized .minimize-toggle { 
                    right: -16px;
                }
                .minimize-toggle:hover { 
                    transform: translateY(-50%) scale(1.1);
                    background: #fff;
                }

                .status-badge {
                    font-size: 0.6rem;
                    background: rgba(0, 240, 255, 0.1);
                    color: #00f0ff;
                    padding: 3px 8px;
                    border-radius: 20px;
                    display: inline-block;
                    margin-top: 8px;
                    font-weight: 800;
                    letter-spacing: 1px;
                }
                .sidebar-nav {
                    flex: 1;
                    padding: 30px 15px;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .nav-item {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding: 14px;
                    color: rgba(255, 255, 255, 0.5);
                    text-decoration: none;
                    border-radius: 12px;
                    transition: all 0.3s;
                }
                .minimized .nav-item { justify-content: center; padding: 14px 0; }
                .nav-item:hover {
                    background: rgba(255, 255, 255, 0.05);
                    color: #fff;
                }
                .nav-item.active {
                    background: rgba(0, 240, 255, 0.1);
                    color: #00f0ff;
                    border: 1px solid rgba(0, 240, 255, 0.2);
                }
                .nav-icon {
                    font-size: 1.4rem;
                }
                .sidebar-footer {
                    padding: 20px 15px;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                }
                .logout-btn {
                    width: 100%;
                    padding: 12px;
                    background: rgba(255, 50, 50, 0.05);
                    color: #ff4d4d;
                    border: 1px solid rgba(255, 77, 77, 0.1);
                    border-radius: 10px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    transition: all 0.3s;
                    font-weight: 600;
                }
                .minimized .logout-btn { padding: 12px 0; }
                .logout-btn:hover {
                    background: #ff4d4d;
                    color: #fff;
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

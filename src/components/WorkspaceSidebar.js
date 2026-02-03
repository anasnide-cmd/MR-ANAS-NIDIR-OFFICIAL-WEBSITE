'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

export default function WorkspaceSidebar({ isOpen, close, isMinimized, toggleMinimize }) {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Mission Control', path: '/workspace/', icon: '🚀' },
        { name: 'Comms', path: '/workspace/chat/', icon: '💬' },
        { name: 'Tasks', path: '/workspace/tasks/', icon: '📋' },
        { name: 'Team', path: '/workspace/team/', icon: '👥' }, // Access control on page level
    ];

    return (
        <aside className={`workspace-sidebar ${isOpen ? 'open' : ''} ${isMinimized ? 'minimized' : ''}`}>
            <div className="sidebar-header">
                <Link href="/" className="logo-link">
                    <span className="logo-text">{isMinimized ? 'W' : 'WORKSPACE'}</span>
                </Link>
                {!isMinimized && <div className="status-badge">STAFF ONLY</div>}

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
                <div className="user-profile">
                     {!isMinimized && <span className="user-role">STAFF MEMBER</span>}
                </div>
                <button onClick={() => signOut(auth)} className="logout-btn" title={isMinimized ? 'Logout' : ''}>
                    <span>🚪</span> {!isMinimized && 'Sign Out'}
                </button>
            </div>

            <style jsx>{`
                .workspace-sidebar {
                    width: 260px;
                    height: 100vh;
                    background: #0f1014;
                    border-right: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    flex-direction: column;
                    position: fixed;
                    left: 0;
                    top: 0;
                    z-index: 1000;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .workspace-sidebar.minimized {
                    width: 80px;
                }
                .sidebar-header {
                    padding: 30px 20px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    position: relative;
                    text-align: center;
                }
                .logo-text {
                    font-family: var(--font-orbitron);
                    font-size: 1.2rem;
                    font-weight: 900;
                    letter-spacing: 2px;
                    color: #fff;
                    background: linear-gradient(to right, #fff, #a0a0ff);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .status-badge {
                    font-size: 0.6rem;
                    background: rgba(100, 100, 255, 0.1);
                    color: #a0a0ff;
                    padding: 3px 8px;
                    border-radius: 4px;
                    display: inline-block;
                    margin-top: 8px;
                    font-weight: 700;
                    letter-spacing: 1px;
                }

                .minimize-toggle {
                    position: absolute;
                    top: 50%;
                    right: -12px;
                    transform: translateY(-50%);
                    width: 24px;
                    height: 24px;
                    background: #2a2b30;
                    color: #fff;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.8rem;
                    z-index: 100;
                    transition: all 0.2s;
                }
                .minimize-toggle:hover { background: #fff; color: #000; }

                .sidebar-nav {
                    flex: 1;
                    padding: 20px 10px;
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }
                .nav-item {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding: 12px 15px;
                    color: rgba(255, 255, 255, 0.6);
                    text-decoration: none;
                    border-radius: 8px;
                    transition: all 0.2s;
                }
                .workspace-sidebar.minimized .nav-item { justify-content: center; padding: 12px 0; }
                .nav-item:hover, .nav-item.active {
                    background: rgba(255, 255, 255, 0.05);
                    color: #fff;
                }
                .nav-item.active {
                    background: rgba(160, 160, 255, 0.1);
                    color: #a0a0ff;
                }
                .nav-icon { font-size: 1.2rem; }
                .nav-name { font-size: 0.9rem; font-weight: 500; }

                .sidebar-footer {
                    padding: 20px;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                }
                .user-role {
                    display: block;
                    font-size: 0.7rem;
                    color: #555;
                    margin-bottom: 10px;
                    text-align: center;
                    letter-spacing: 1px;
                }
                .logout-btn {
                    width: 100%;
                    padding: 10px;
                    background: rgba(255, 50, 50, 0.05);
                    color: #ff5050;
                    border: 1px solid rgba(255, 50, 50, 0.1);
                    border-radius: 8px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    transition: all 0.2s;
                    font-weight: 600;
                    font-size: 0.9rem;
                }
                .logout-btn:hover {
                    background: rgba(255, 50, 50, 0.1);
                }
                
                @media (max-width: 1024px) {
                    .workspace-sidebar {
                        transform: translateX(-100%);
                    }
                    .workspace-sidebar.open {
                        transform: translateX(0);
                    }
                    .minimize-toggle { display: none; }
                }
            `}</style>
        </aside>
    );
}

'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { auth } from '@mr/core/firebase';
import { signOut } from 'firebase/auth';
import { motion } from 'framer-motion';
import { 
    LayoutDashboard, 
    MessageSquare, 
    ListTodo, 
    Users, 
    LogOut,
    ChevronLeft,
    ChevronRight,
    Briefcase
} from 'lucide-react';

export default function WorkspaceSidebar({ isOpen, close, isMinimized, toggleMinimize }) {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Mission Control', path: '/workspace/', icon: <LayoutDashboard size={20} /> },
        { name: 'Comms', path: '/workspace/chat/', icon: <MessageSquare size={20} /> },
        { name: 'Tasks', path: '/workspace/tasks/', icon: <ListTodo size={20} /> },
        { name: 'Team', path: '/workspace/team/', icon: <Users size={20} /> },
    ];

    return (
        <aside className={`workspace-sidebar ${isOpen ? 'open' : ''} ${isMinimized ? 'minimized' : ''}`}>
            <div className="sidebar-header">
                <Link href="/" className="logo-link">
                    <div className="logo-wrapper">
                        <Briefcase size={24} className="logo-icon" />
                        {!isMinimized && <span className="logo-text">MISSION <span className="blue-glow">OS</span></span>}
                    </div>
                </Link>
                {!isMinimized && <div className="status-badge">STAFF NODE v2.4</div>}

                <button className="minimize-toggle" onClick={toggleMinimize}>
                    {isMinimized ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
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
                        {pathname === item.path && <div className="active-indicator" />}
                    </Link>
                ))}
            </nav>

            <div className="sidebar-footer">
                {!isMinimized && (
                    <div className="user-profile">
                         <span className="user-role">STAFF MEMBER</span>
                    </div>
                )}
                <button onClick={() => signOut(auth)} className="logout-btn" title={isMinimized ? 'Logout' : ''}>
                    <LogOut size={18} /> {!isMinimized && 'Terminate Session'}
                </button>
            </div>

            <style jsx>{`
                .workspace-sidebar {
                    width: 260px;
                    height: 100vh;
                    background: #050505;
                    border-right: 1px solid rgba(80, 80, 255, 0.1);
                    display: flex;
                    flex-direction: column;
                    position: fixed;
                    left: 0;
                    top: 0;
                    z-index: 1000;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .workspace-sidebar.minimized {
                    width: 80px;
                }
                .sidebar-header {
                    padding: 30px 20px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
                    position: relative;
                }
                .logo-wrapper { display: flex; align-items: center; gap: 12px; justify-content: center; }
                .logo-icon { color: #5050ff; filter: drop-shadow(0 0 8px rgba(80, 80, 255, 0.6)); }
                
                .logo-text {
                    font-family: var(--font-orbitron);
                    font-size: 1rem;
                    font-weight: 900;
                    letter-spacing: 1px;
                    color: #fff;
                }
                .blue-glow { color: #5050ff; }
                
                .status-badge {
                    font-size: 0.6rem;
                    background: rgba(80, 80, 255, 0.05);
                    color: #5050ff;
                    padding: 3px 8px;
                    border-radius: 4px;
                    display: inline-block;
                    margin: 12px auto 0;
                    font-weight: 800;
                    letter-spacing: 2px;
                    border: 1px solid rgba(80, 80, 255, 0.1);
                }

                .minimize-toggle {
                    position: absolute;
                    top: 50%;
                    right: -12px;
                    transform: translateY(-50%);
                    width: 24px;
                    height: 24px;
                    background: #5050ff;
                    color: #000;
                    border: none;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 100;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 0 15px rgba(80, 80, 255, 0.4);
                }
                .minimize-toggle:hover { transform: translateY(-50%) scale(1.1); box-shadow: 0 0 25px rgba(80, 80, 255, 0.6); }

                .sidebar-nav {
                    flex: 1;
                    padding: 20px 12px;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .nav-item {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding: 14px 18px;
                    color: rgba(255, 255, 255, 0.4);
                    text-decoration: none;
                    border-radius: 12px;
                    transition: all 0.2s;
                    position: relative;
                }
                .workspace-sidebar.minimized .nav-item { justify-content: center; padding: 14px 0; }
                .nav-item:hover {
                    background: rgba(255, 255, 255, 0.03);
                    color: #fff;
                }
                .nav-item.active {
                    background: rgba(80, 80, 255, 0.08);
                    color: #fff;
                    border: 1px solid rgba(80, 80, 255, 0.1);
                }
                .active-indicator {
                    position: absolute; left: 0; top: 10px; bottom: 10px; width: 4px; border-radius: 0 4px 4px 0;
                    background: #5050ff; box-shadow: 0 0 10px #5050ff;
                }
                
                .nav-icon { display: flex; align-items: center; justify-content: center; transition: 0.2s; }
                .nav-item.active .nav-icon { color: #5050ff; filter: drop-shadow(0 0 5px rgba(80, 80, 255, 0.5)); }
                .nav-name { font-size: 0.85rem; font-weight: 600; letter-spacing: 0.5px; }

                .sidebar-footer {
                    padding: 20px 12px;
                    border-top: 1px solid rgba(255, 255, 255, 0.03);
                }
                .user-role {
                    display: block;
                    font-size: 0.65rem;
                    color: #444;
                    margin-bottom: 15px;
                    text-align: center;
                    letter-spacing: 2px;
                    font-weight: 800;
                }
                .logout-btn {
                    width: 100%;
                    padding: 12px;
                    background: rgba(255, 255, 255, 0.02);
                    color: #ff4444;
                    border: 1px solid rgba(255, 68, 68, 0.1);
                    border-radius: 12px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    transition: all 0.2s;
                    font-weight: 700;
                    font-size: 0.8rem;
                    letter-spacing: 1px;
                }
                .logout-btn:hover {
                    background: rgba(255, 68, 68, 0.05);
                    border-color: rgba(255, 68, 68, 0.3);
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

'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

export default function AdminSidebar({ isOpen, close }) {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: '📊' },
        { name: 'Site Settings', path: '/admin/settings', icon: '⚙️' },
        { name: 'New Post', path: '/admin/editor', icon: '✍️' },
    ];

    return (
        <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <Link href="/" className="logo-link">
                    <span className="logo-text">ANAS NIDIR</span>
                </Link>
                <div className="status-badge">ADMIN ENGINE</div>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        onClick={close}
                        className={`nav-item ${pathname === item.path ? 'active' : ''}`}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-name">{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button onClick={() => signOut(auth)} className="logout-btn">
                    <span>🚪</span> Logout Account
                </button>
            </div>

            <style jsx>{`
                .admin-sidebar {
                    width: 280px;
                    height: 100vh;
                    background: rgba(5, 5, 5, 0.8);
                    border-right: 1px solid rgba(255, 255, 255, 0.08);
                    display: flex;
                    flex-direction: column;
                    position: fixed;
                    left: 0;
                    top: 0;
                    z-index: 1000;
                    backdrop-filter: blur(20px);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .sidebar-header {
                    padding: 40px 30px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }
                .logo-link {
                    text-decoration: none;
                }
                .logo-text {
                    font-size: 1.4rem;
                    font-weight: 900;
                    letter-spacing: 3px;
                    color: #fff;
                    background: linear-gradient(to right, #ffffff, #00f0ff);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .status-badge {
                    font-size: 0.65rem;
                    background: rgba(0, 240, 255, 0.1);
                    color: #00f0ff;
                    padding: 4px 10px;
                    border-radius: 20px;
                    display: inline-block;
                    margin-top: 10px;
                    font-weight: 800;
                    letter-spacing: 1px;
                    border: 1px solid rgba(0, 240, 255, 0.2);
                }
                .sidebar-nav {
                    flex: 1;
                    padding: 30px 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .nav-item {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding: 14px 18px;
                    color: rgba(255, 255, 255, 0.5);
                    text-decoration: none;
                    border-radius: 12px;
                    transition: all 0.3s;
                    border: 1px solid transparent;
                }
                .nav-item:hover {
                    background: rgba(255, 255, 255, 0.03);
                    color: #fff;
                    transform: translateX(5px);
                }
                .nav-item.active {
                    background: linear-gradient(135deg, rgba(0, 240, 255, 0.1) 0%, rgba(0, 100, 255, 0.1) 100%);
                    color: #00f0ff;
                    font-weight: bold;
                    border: 1px solid rgba(0, 240, 255, 0.2);
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                }
                .nav-icon {
                    font-size: 1.3rem;
                }
                .sidebar-footer {
                    padding: 30px 20px;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                }
                .logout-btn {
                    width: 100%;
                    padding: 14px;
                    background: rgba(255, 50, 50, 0.05);
                    color: #ff4d4d;
                    border: 1px solid rgba(255, 77, 77, 0.1);
                    border-radius: 12px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    transition: all 0.3s;
                    font-weight: 600;
                }
                .logout-btn:hover {
                    background: #ff4d4d;
                    color: #fff;
                    box-shadow: 0 0 20px rgba(255, 77, 77, 0.3);
                }

                @media (max-width: 1024px) {
                    .admin-sidebar {
                        transform: translateX(-100%);
                        box-shadow: 20px 0 50px rgba(0, 0, 0, 0.5);
                    }
                    .admin-sidebar.open {
                        transform: translateX(0);
                    }
                }
            `}</style>
        </aside>
    );
}

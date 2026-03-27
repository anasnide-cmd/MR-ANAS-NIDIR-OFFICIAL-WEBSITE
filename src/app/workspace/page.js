'use client';
import { useEffect, useState } from 'react';
import { auth, db } from '../../lib/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import Link from 'next/link';
import { onAuthStateChanged } from 'firebase/auth';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function WorkspaceDashboard() {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({ tasks: 0, members: 0 });
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            if (u) {
                setUser(u);
                // Simulate fetching tasks/members or replace with actual Firestore calls if rules allow
                setStats({ tasks: 5, members: 3 }); 
            } else {
                router.push('/login');
            }
            setLoading(false);
        });
        return () => unsub();
    }, [router]);

    if (loading) return <div className="loading">Initializing Mission Control...</div>;

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
    };

    return (
        <motion.div className="dashboard-container" variants={containerVariants} initial="hidden" animate="show">
            <motion.header className="dashboard-header" variants={itemVariants}>
                <h1>MISSION CONTROL</h1>
                <p>Welcome back, Staff Member {user?.email}</p>
            </motion.header>

            <motion.div className="stats-grid" variants={containerVariants}>
                <motion.div className="stat-card" variants={itemVariants}>
                    <h3>Pending Tasks</h3>
                    {loading ? <div className="skeleton-box" /> : <span className="sc-value">{stats.tasks}</span>}
                    <span className="sc-icon">📋</span>
                </motion.div>
                <motion.div className="stat-card" variants={itemVariants}>
                    <h3>Team Online</h3>
                    {loading ? <div className="skeleton-box" /> : <span className="sc-value">{stats.members}</span>}
                    <span className="sc-icon">🟢</span>
                </motion.div>
                <motion.div className="stat-card" variants={itemVariants}>
                    <h3>System Status</h3>
                    <span className="sc-value status-ok">NOMINAL</span>
                    <span className="sc-icon">🛡️</span>
                </motion.div>
            </motion.div>

            <motion.div className="modules-grid" variants={containerVariants}>
                <Link href="/workspace/chat">
                    <motion.div className="module-card chat" variants={itemVariants} whileHover={{ y: -5, boxShadow: '0 10px 40px rgba(80, 80, 255, 0.2)' }}>
                        <h2>COMMUNICATION HUB</h2>
                        <p>Real-time team collaboration and announcements.</p>
                        <span className="module-arrow">ACCESS CHANNEL ➜</span>
                    </motion.div>
                </Link>

                <Link href="/workspace/tasks">
                    <motion.div className="module-card tasks" variants={itemVariants} whileHover={{ y: -5, boxShadow: '0 10px 40px rgba(0, 255, 136, 0.1)' }}>
                        <h2>TASK ENGINE</h2>
                        <p>Manage assignments, track progress, and execute workflows.</p>
                        <span className="module-arrow">VIEW BOARDS ➜</span>
                    </motion.div>
                </Link>
            </motion.div>

            <motion.div className="recent-activity" variants={itemVariants}>
                <h3>Recent Activity Log</h3>
                <ul className="activity-list">
                    <li>
                        <span className="time">10:42 AM</span>
                        <span className="user">Admin</span>
                        <span className="action">deployed new security rules</span>
                    </li>
                    <li>
                        <span className="time">09:15 AM</span>
                        <span className="user">System</span>
                        <span className="action">backup completed successfully</span>
                    </li>
                    <li className="empty">No other recent events.</li>
                </ul>
            </motion.div>

            <style jsx>{`
                .dashboard-container { padding: 40px; }
                .dashboard-header { margin-bottom: 40px; }
                
                h1 { 
                    font-family: var(--font-orbitron); 
                    font-size: 2.5rem; 
                    margin-bottom: 5px;
                    background: linear-gradient(90deg, #fff, #a0a0ff);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                p { color: rgba(255, 255, 255, 0.5); }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 20px;
                    margin-bottom: 40px;
                }
                .stat-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    padding: 24px;
                    border-radius: 16px;
                    position: relative;
                    overflow: hidden;
                }
                .stat-card h3 { font-size: 0.8rem; color: rgba(255, 255, 255, 0.6); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
                .sc-value { font-size: 2.5rem; font-weight: 900; color: #fff; display: block; }
                .sc-value.status-ok { color: #00ff88; font-size: 1.5rem; line-height: 2.5rem; }
                .sc-icon { position: absolute; right: 20px; bottom: 20px; font-size: 2rem; opacity: 0.2; }

                .modules-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 30px;
                    margin-bottom: 40px;
                }
                .module-card {
                    padding: 40px;
                    border-radius: 20px;
                    text-decoration: none;
                    color: #fff;
                    transition: all 0.3s;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    min-height: 200px;
                }
                .module-card:hover { transform: translateY(-5px); }
                .module-card.chat { background: linear-gradient(135deg, rgba(80, 80, 255, 0.1), rgba(0,0,0,0)); border-color: rgba(80, 80, 255, 0.3); }
                .module-card.chat:hover { box-shadow: 0 10px 40px rgba(80, 80, 255, 0.2); }
                
                .module-card.tasks { background: linear-gradient(135deg, rgba(0, 255, 136, 0.05), rgba(0,0,0,0)); border-color: rgba(0, 255, 136, 0.2); }
                .module-card.tasks:hover { box-shadow: 0 10px 40px rgba(0, 255, 136, 0.1); }

                .module-card h2 { font-family: var(--font-orbitron); font-size: 1.5rem; margin-bottom: 15px; }
                .module-card p { opacity: 0.7; margin-bottom: 30px; line-height: 1.5; }
                .module-arrow { font-weight: 800; font-size: 0.9rem; letter-spacing: 1px; text-transform: uppercase; }

                .recent-activity {
                    background: rgba(255, 255, 255, 0.02);
                    padding: 30px;
                    border-radius: 16px;
                }
                .recent-activity h3 { font-size: 1rem; margin-bottom: 20px; color: rgba(255, 255, 255, 0.8); }
                .activity-list { list-style: none; padding: 0; margin: 0; }
                .activity-list li { padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); display: flex; gap: 15px; align-items: center; font-size: 0.9rem; }
                .activity-list li:last-child { border-bottom: none; }
                .time { opacity: 0.4; font-family: monospace; }
                .user { color: #a0a0ff; font-weight: 600; }
                .action { opacity: 0.8; }
                .empty { opacity: 0.3; font-style: italic; }

                .skeleton-box { height: 40px; width: 60px; background: rgba(255,255,255,0.05); border-radius: 8px; animation: pulse 1.5s infinite; }
                @keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 0.2; } 100% { opacity: 0.5; } }

                .loading { padding: 40px; text-align: center; opacity: 0.5; }
                
                @media (max-width: 768px) {
                    .dashboard-container { padding: 20px; }
                    .stats-grid { grid-template-columns: 1fr; }
                    .modules-grid { grid-template-columns: 1fr; }
                    h1 { font-size: 1.8rem; }
                }
            `}</style>
        </motion.div>
    );
}

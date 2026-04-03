'use client';
import { useEffect, useState } from 'react';
import { auth, db } from '../../lib/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import Link from 'next/link';
import { onAuthStateChanged } from 'firebase/auth';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
    Layout, 
    Activity, 
    MessageSquare, 
    CheckCircle, 
    ShieldAlert, 
    Terminal, 
    Clock, 
    Users,
    Zap
} from 'lucide-react';

export default function WorkspaceDashboard() {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({ tasks: 0, members: 0 });
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            if (u) {
                setUser(u);
                setStats({ tasks: 12, members: 4 }); 
            } else {
                router.push('/login');
            }
            setLoading(false);
        });
        return () => unsub();
    }, [router]);

    if (loading) return (
        <div className="loading-nexus">
            <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="nexus-circle"
            />
            <p>SYNCHRONIZING NEURAL NODE...</p>
        </div>
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }
    };

    return (
        <motion.div className="neural-container" variants={containerVariants} initial="hidden" animate="show">
            <div className="ambient-flow" />
            
            <motion.header className="neural-header" variants={itemVariants}>
                <div className="header-badge">MISSION CONTROL v2.4</div>
                <h1>NEURAL <span className="blue-glow">NODE</span></h1>
                <p>Authorized Staff: <span className="user-email">{user?.email}</span></p>
            </motion.header>

            <motion.div className="data-grid" variants={containerVariants}>
                <motion.div className="glass-tile" variants={itemVariants}>
                    <div className="tile-content">
                        <div className="tile-label">PENDING TASKS</div>
                        <div className="tile-value">{stats.tasks}</div>
                        <div className="tile-icon"><Activity size={24} /></div>
                    </div>
                    <div className="tile-progress"><div className="progress-bar" style={{width: '65%'}} /></div>
                </motion.div>
                
                <motion.div className="glass-tile" variants={itemVariants}>
                    <div className="tile-content">
                        <div className="tile-label">OPERATORS ONLINE</div>
                        <div className="tile-value">{stats.members}</div>
                        <div className="tile-icon"><Users size={24} /></div>
                    </div>
                    <div className="status-indicator online">
                        <span className="pulse-dot" /> ENCRYPTED CONNECTION
                    </div>
                </motion.div>

                <motion.div className="glass-tile" variants={itemVariants}>
                    <div className="tile-content">
                        <div className="tile-label">SECURITY STATUS</div>
                        <div className="tile-value nominal">NOMINAL</div>
                        <div className="tile-icon"><ShieldAlert size={24} /></div>
                    </div>
                    <div className="status-indicator safe">
                        <CheckCircle size={14} /> FIREWALLS ACTIVE
                    </div>
                </motion.div>
            </motion.div>

            <motion.div className="modules-grid" variants={containerVariants}>
                <Link href="/workspace/chat">
                    <motion.div className="module-node chat" variants={itemVariants} whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(80, 80, 255, 0.2)' }}>
                        <div className="module-glow" />
                        <MessageSquare className="node-icon" size={32} />
                        <h2>INTERNAL COMS</h2>
                        <p>Real-time neural link for team collaboration.</p>
                        <span className="node-arrow">SYNC CHANNEL <Zap size={14} /></span>
                    </motion.div>
                </Link>

                <Link href="/workspace/tasks">
                    <motion.div className="module-node tasks" variants={itemVariants} whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(0, 255, 136, 0.1)' }}>
                        <div className="module-glow" />
                        <Layout className="node-icon" size={32} />
                        <h2>TASK ENGINE</h2>
                        <p>Manage assignments and execute high-priority workflows.</p>
                        <span className="node-arrow">OPEN BOARDS <Zap size={14} /></span>
                    </motion.div>
                </Link>
            </motion.div>

            <motion.div className="terminal-log" variants={itemVariants}>
                <div className="terminal-header">
                    <Terminal size={14} /> <span>SYSTEM ACTIVITY CLOG</span>
                    <div className="terminal-dots"><span/><span/><span/></div>
                </div>
                <div className="terminal-body">
                    <div className="log-entry"><span className="log-time">10:42:15</span> <span className="log-tag staff">[STAFF]</span> Admin <span className="log-msg">syncing security encryption keys...</span></div>
                    <div className="log-entry"><span className="log-time">09:15:02</span> <span className="log-tag sys">[SYS]</span> Daily backup <span className="log-msg">verified at Node Lambda-4</span></div>
                    <div className="log-entry active"><span className="log-time">JUST NOW</span> <span className="log-tag blue">[AUTH]</span> {user?.email?.split('@')[0]} <span className="log-msg">established remote uplink...</span></div>
                </div>
            </motion.div>

            <style jsx>{`
                .neural-container { 
                    padding: 40px; 
                    min-height: 100vh;
                    position: relative;
                    overflow: hidden;
                    font-family: 'Inter', sans-serif;
                    background: #050505;
                }
                .ambient-flow {
                    position: absolute; inset: 0;
                    background: radial-gradient(circle at 80% 20%, rgba(80, 80, 255, 0.08) 0%, transparent 40%),
                                radial-gradient(circle at 20% 80%, rgba(0, 240, 255, 0.05) 0%, transparent 40%);
                    pointer-events: none;
                }
                
                .neural-header { margin-bottom: 50px; position: relative; z-index: 10; }
                .header-badge { 
                    display: inline-block; padding: 4px 12px; border: 1px solid rgba(80, 80, 255, 0.3);
                    border-radius: 20px; font-size: 0.7rem; color: #5050ff; font-weight: 800;
                    letter-spacing: 2px; margin-bottom: 15px; background: rgba(80, 80, 255, 0.05);
                }
                h1 { 
                    font-family: var(--font-orbitron); font-size: 3rem; margin-bottom: 8px;
                    background: linear-gradient(90deg, #fff, #888); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                }
                .blue-glow { color: #5050ff; text-shadow: 0 0 20px rgba(80, 80, 255, 0.5); }
                .user-email { color: #5050ff; opacity: 1; font-weight: 600; }

                /* Data Grid */
                .data-grid {
                    display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                    gap: 24px; margin-bottom: 40px;
                }
                .glass-tile {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(20px);
                    padding: 30px; border-radius: 24px;
                    position: relative; overflow: hidden;
                }
                .glass-tile::before {
                    content: ''; position: absolute; inset: 0;
                    background: linear-gradient(135deg, transparent, rgba(255,255,255,0.02), transparent);
                    transform: translateX(-100%); transition: 0.5s;
                }
                .glass-tile:hover::before { transform: translateX(100%); }

                .tile-content { display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px; }
                .tile-label { font-size: 0.75rem; color: rgba(255, 255, 255, 0.4); letter-spacing: 2px; font-weight: 700; }
                .tile-value { font-size: 3rem; font-weight: 900; color: #fff; line-height: 1; }
                .tile-value.nominal { font-size: 1.8rem; color: #00ff88; margin-top: 10px; }
                .tile-icon { opacity: 0.2; color: #5050ff; }

                .tile-progress { height: 4px; background: rgba(255,255,255,0.05); border-radius: 2px; }
                .progress-bar { height: 100%; background: #5050ff; border-radius: 2px; box-shadow: 0 0 10px #5050ff; }
                
                .status-indicator { display: flex; align-items: center; gap: 8px; font-size: 0.75rem; font-weight: 700; letter-spacing: 1px; }
                .status-indicator.online { color: #00f0ff; }
                .status-indicator.safe { color: #00ff88; }
                .pulse-dot { width: 8px; height: 8px; background: #00f0ff; border-radius: 50%; display: inline-block; box-shadow: 0 0 10px #00f0ff; animation: pulse 1s infinite; }
                @keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.8); } 100% { opacity: 1; transform: scale(1); } }

                /* Modules */
                .modules-grid {
                    display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
                    gap: 30px; margin-bottom: 50px;
                }
                .module-node {
                    padding: 50px; border-radius: 30px; border: 1px solid rgba(255,255,255,0.05);
                    background: linear-gradient(135deg, rgba(255,255,255,0.01), transparent);
                    position: relative; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                }
                .module-glow { 
                    position: absolute; inset: 0; background: radial-gradient(circle at top left, rgba(80, 80, 255, 0.1), transparent 60%);
                    opacity: 0; transition: 0.4s;
                }
                .module-node:hover .module-glow { opacity: 1; }
                
                .node-icon { color: #5050ff; margin-bottom: 25px; filter: drop-shadow(0 0 10px rgba(80, 80, 255, 0.5)); }
                .module-node h2 { font-family: var(--font-orbitron); font-size: 1.8rem; margin-bottom: 15px; color: #fff; }
                .module-node p { color: rgba(255,255,255,0.5); margin-bottom: 30px; line-height: 1.6; }
                .node-arrow { font-size: 0.8rem; font-weight: 800; letter-spacing: 2px; color: #5050ff; display: flex; align-items: center; gap: 8px; }

                /* Terminal */
                .terminal-log {
                    background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 16px; overflow: hidden; font-family: 'JetBrains Mono', monospace;
                }
                .terminal-header { 
                    padding: 12px 20px; background: rgba(255, 255, 255, 0.03); border-bottom: 1px solid rgba(255,255,255,0.05);
                    display: flex; align-items: center; gap: 10px; font-size: 11px; color: rgba(255,255,255,0.4); letter-spacing: 1px;
                }
                .terminal-dots { margin-left: auto; display: flex; gap: 6px; }
                .terminal-dots span { width: 6px; height: 6px; border-radius: 50%; opacity: 0.3; background: #fff; }

                .terminal-body { padding: 20px; font-size: 13px; line-height: 2; }
                .log-entry { display: flex; gap: 15px; opacity: 0.5; }
                .log-time { color: rgba(255,255,255,0.3); }
                .log-tag { font-weight: 700; width: 60px; }
                .log-tag.staff { color: #5050ff; }
                .log-tag.sys { color: #aaa; }
                .log-tag.blue { color: #00f0ff; }
                .log-msg { color: #fff; }
                .log-entry.active { opacity: 1; animation: blink 1.5s infinite; }
                @keyframes blink { 0%, 100% { background: rgba(80, 80, 255, 0.05); } 50% { background: transparent; } }

                .loading-nexus { height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; color: #5050ff; font-weight: 800; letter-spacing: 2px; }
                .nexus-circle { width: 60px; height: 60px; border: 2px solid #5050ff; border-radius: 50%; box-shadow: 0 0 20px #5050ff; }

                @media (max-width: 768px) {
                    .neural-container { padding: 20px; }
                    .data-grid { grid-template-columns: 1fr; }
                    h1 { font-size: 2.2rem; }
                    .module-node { padding: 30px; }
                }
            `}</style>
        </motion.div>
    );
}

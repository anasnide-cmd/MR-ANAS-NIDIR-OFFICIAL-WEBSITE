'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../../lib/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Shield, AlertTriangle, CheckCircle, Search, RefreshCw, Terminal, Lock } from 'lucide-react';
import Link from 'next/link';

export default function AuditLogsPage() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, u => {
            if (u) {
                setUser(u);
                fetchLogs();
            } else {
                setLoading(false);
            }
        });
        return () => unsub();
    }, []);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            // In a real app, this would be a real collection 'admin_audit_logs'
            // For now, we stimulate "Mock Logs" mixed with real recent internal system events if any
            // or just generate critical security checkpoints
            
            const mockLogs = generateMockLogs();
            setLogs(mockLogs);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const generateMockLogs = () => {
        const actions = ['USER_BAN', 'SITE_DELETE', 'ADMIN_LOGIN', 'CONFIG_UPDATE', 'GOD_MODE_ACCESS', 'SYSTEM_OVERRIDE'];
        const agents = ['admin@cia.gov', 'optic-zero@system.local', 'unknown_actor'];
        const statuses = ['SUCCESS', 'SUCCESS', 'SUCCESS', 'FAILED', 'DENIED'];
        
        return Array.from({ length: 20 }).map((_, i) => ({
            id: `LOG-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            timestamp: new Date(Date.now() - i * 1000 * 60 * (Math.random() * 60)).toISOString(),
            action: actions[Math.floor(Math.random() * actions.length)],
            agent: agents[Math.floor(Math.random() * agents.length)],
            target: `NODE-${Math.floor(Math.random() * 9999)}`,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            ip: `192.168.0.${Math.floor(Math.random() * 255)}`
        }));
    };

    if (loading) return <div className="loading">Initializing Audit Protocol...</div>;
    if (!user) return <div className="denied">ACCESS DENIED</div>;

    return (
        <div className="audit-container">
            <header className="audit-header">
                <div>
                    <h1><Shield className="icon"/> SECURITY AUDIT LOGS</h1>
                    <p>Sub-System: OPTIC-ZERO // Level 5 Clearance</p>
                </div>
                <div className="actions">
                    <button onClick={fetchLogs}><RefreshCw size={16}/> REFRESH</button>
                    <Link href="/admin/god-mode" className="back-link">Return to God Mode</Link>
                </div>
            </header>

            <div className="logs-terminal">
                <div className="terminal-header">
                    <span><Terminal size={14}/> /var/log/sys_security.log</span>
                    <span><Lock size={14}/> ENCRYPTED</span>
                </div>
                <div className="log-list custom-scrollbar">
                    {logs.map(log => (
                        <div key={log.id} className={`log-entry ${log.status.toLowerCase()}`}>
                            <span className="time">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                            <span className="pid">{'<'}{log.id}{'>'}</span>
                            <span className="action">{log.action}</span>
                            <span className="agent">USER:{log.agent}</span>
                            <span className="target">TARGET:{log.target}</span>
                            <span className={`status-badge ${log.status === 'SUCCESS' ? 'success' : 'alert'}`}>
                                {log.status}
                            </span>
                            <span className="ip">@{log.ip}</span>
                        </div>
                    ))}
                    <div className="cursor-line">_</div>
                </div>
            </div>

            <style jsx>{`
                .audit-container {
                    min-height: 100vh; background: #050505; color: #fff;
                    font-family: 'JetBrains Mono', monospace; padding: 20px;
                }
                .audit-header {
                    display: flex; justify-content: space-between; align-items: flex-end;
                    padding-bottom: 20px; border-bottom: 1px solid #333; margin-bottom: 30px;
                }
                h1 { margin: 0; display: flex; align-items: center; gap: 10px; color: #00f0ff; letter-spacing: 2px; }
                p { margin: 5px 0 0; color: #666; font-size: 0.8rem; }
                .icon { color: #00f0ff; }
                
                .actions { display: flex; gap: 15px; }
                button, .back-link {
                    background: #111; color: #fff; border: 1px solid #333; padding: 8px 16px;
                    text-decoration: none; font-size: 0.8rem; cursor: pointer; display: flex; align-items: center; gap: 8px;
                }
                button:hover, .back-link:hover { background: #00f0ff; color: #000; }

                .logs-terminal {
                    background: #000; border: 1px solid #333; border-radius: 4px; overflow: hidden;
                    box-shadow: 0 0 30px rgba(0,0,0,0.5); font-size: 13px;
                }
                .terminal-header {
                    background: #151515; padding: 8px 16px; border-bottom: 1px solid #333;
                    display: flex; justify-content: space-between; color: #666; font-size: 0.75rem;
                }
                .log-list {
                    max-height: 600px; overflow-y: auto; padding: 20px;
                }
                .log-entry {
                    display: flex; gap: 15px; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.03);
                    opacity: 0.8; transition: 0.1s;
                }
                .log-entry:hover { opacity: 1; background: rgba(255,255,255,0.02); }
                .log-entry.failed, .log-entry.denied { color: #ff4444; }
                
                .time { color: #666; min-width: 90px; }
                .pid { color: #444; min-width: 100px; }
                .action { color: #fff; font-weight: bold; min-width: 140px; }
                .agent { color: #00f0ff; min-width: 180px; }
                .target { color: #aaa; min-width: 120px; }
                
                .status-badge { padding: 0 6px; font-size: 11px; border-radius: 2px; }
                .status-badge.success { background: rgba(0,255,128,0.2); color: #00ff80; }
                .status-badge.alert { background: rgba(255,68,68,0.2); color: #ff4444; font-weight: bold; }
                
                .ip { color: #444; margin-left: auto; }

                .cursor-line { color: #00f0ff; animation: blink 1s infinite; margin-top: 10px; }
                @keyframes blink { 50% { opacity: 0; } }

                .loading, .denied { height: 100vh; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; letter-spacing: 3px; color: #ff0055; background: #000; }
            `}</style>
        </div>
    );
}

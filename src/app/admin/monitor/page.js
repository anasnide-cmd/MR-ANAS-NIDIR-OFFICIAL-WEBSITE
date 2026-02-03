'use client';
import { useState, useEffect } from 'react';
import { getSystemLogs, resolveLog } from '../../../lib/logger';
import { auth } from '../../../lib/firebase';

export default function SystemMonitorPage() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        const fetchLogs = async () => {
            setLoading(true);
            try {
                const data = await getSystemLogs(100);
                setLogs(data);
            } catch (error) {
                console.error("Failed to load system logs", error);
            } finally {
                setLoading(false);
            }
        };

        if (auth.currentUser) {
            fetchLogs();
        }
    }, [refreshTrigger]);

    const handleResolve = async (id) => {
        try {
            await resolveLog(id);
            setLogs(prev => prev.map(log => 
                log.id === id ? { ...log, status: 'resolved' } : log
            ));
        } catch (error) {
            alert('Failed to resolve log: ' + error.message);
        }
    };

    const activeLogs = logs.filter(l => l.status !== 'resolved');
    const resolvedLogs = logs.filter(l => l.status === 'resolved');

    return (
        <div className="monitor-container">
            <header className="monitor-header">
                <div>
                    <h1>SYSTEM INTEGRITY MONITOR</h1>
                    <p>Subspace Anomaly Detection & Error Tracking</p>
                </div>
                <button 
                    className="refresh-btn" 
                    onClick={() => setRefreshTrigger(t => t + 1)}
                    disabled={loading}
                >
                    {loading ? 'SCANNING...' : 'REFRESH SCAN'}
                </button>
            </header>

            <div className="stats-grid">
                <div className="stat-card error">
                    <h3>Critical Anomalies</h3>
                    <span className="count">{activeLogs.length}</span>
                </div>
                <div className="stat-card success">
                    <h3>Resolved</h3>
                    <span className="count">{resolvedLogs.length}</span>
                </div>
                <div className="stat-card info">
                    <h3>Total Events</h3>
                    <span className="count">{logs.length}</span>
                </div>
            </div>

            <section className="logs-section">
                <h2>Active Anomalies</h2>
                {activeLogs.length === 0 ? (
                    <div className="empty-state">
                        <span className="icon">✓</span>
                        <p>No active system anomalies detected. Systems nominal.</p>
                    </div>
                ) : (
                    <div className="logs-list">
                        {activeLogs.map(log => (
                            <LogItem key={log.id} log={log} onResolve={handleResolve} />
                        ))}
                    </div>
                )}
            </section>

            <section className="logs-section history">
                <h2>Resolution History</h2>
                <div className="logs-list">
                    {resolvedLogs.map(log => (
                        <LogItem key={log.id} log={log} isResolved />
                    ))}
                </div>
            </section>

            <style jsx>{`
                .monitor-container {
                    padding: 40px;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .monitor-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 40px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    padding-bottom: 20px;
                }
                h1 {
                    font-size: 2rem;
                    font-weight: 900;
                    color: #fff;
                    letter-spacing: 2px;
                    margin-bottom: 5px;
                }
                h2 {
                    font-size: 1.2rem;
                    color: #00f0ff;
                    margin-bottom: 20px;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                }
                p { color: rgba(255, 255, 255, 0.5); }

                .refresh-btn {
                    background: rgba(0, 240, 255, 0.1);
                    color: #00f0ff;
                    border: 1px solid rgba(0, 240, 255, 0.3);
                    padding: 12px 24px;
                    font-family: inherit;
                    font-weight: 800;
                    letter-spacing: 1px;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .refresh-btn:hover {
                    background: #00f0ff;
                    color: #000;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                    margin-bottom: 40px;
                }
                @media (max-width: 768px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                    .monitor-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 20px;
                    }
                    .refresh-btn {
                        width: 100%;
                    }
                }
                .stat-card {
                    background: rgba(255, 255, 255, 0.03);
                    padding: 20px;
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .stat-card.error { border-color: rgba(255, 50, 50, 0.3); }
                .stat-card.success { border-color: rgba(50, 255, 100, 0.3); }
                
                .stat-card h3 { 
                    font-size: 0.8rem; 
                    color: rgba(255, 255, 255, 0.6); 
                    margin-bottom: 10px;
                    text-transform: uppercase;
                }
                .count { font-size: 2.5rem; font-weight: 900; color: #fff; }

                .logs-section { margin-bottom: 40px; }
                .logs-list { display: flex; flex-direction: column; gap: 15px; }

                .empty-state {
                    text-align: center;
                    padding: 60px;
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 12px;
                    color: rgba(255, 255, 255, 0.4);
                }
                .empty-state .icon { display: block; font-size: 3rem; margin-bottom: 15px; color: #00ff88; }
            `}</style>
        </div>
    );
}

function LogItem({ log, onResolve, isResolved }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={`log-item ${log.severity} ${isResolved ? 'resolved' : ''}`}>
            <div className="log-header" onClick={() => setExpanded(!expanded)}>
                <div className="log-summary">
                    <span className="severity-badge">{log.severity || 'ERROR'}</span>
                    <span className="log-context">{log.context}</span>
                    <span className="log-msg">{log.message}</span>
                </div>
                <div className="log-meta">
                    <span className="log-time">
                        {log.timestamp ? new Date(log.timestamp).toLocaleString() : 'Unknown Time'}
                    </span>
                    <span className="expand-icon">{expanded ? '−' : '+'}</span>
                </div>
            </div>

            {expanded && (
                <div className="log-details">
                    <div className="detail-section">
                        <h4>Stack Trace</h4>
                        <pre>{log.stack || 'No stack trace available.'}</pre>
                    </div>
                    
                    {log.metadata && (
                        <div className="detail-section">
                            <h4>Metadata</h4>
                            <pre>{JSON.stringify(log.metadata, null, 2)}</pre>
                        </div>
                    )}
                    
                    <div className="detail-section">
                        <p>User ID: {log.userId}</p>
                        <p>User Email: {log.userEmail}</p>
                    </div>

                    {!isResolved && onResolve && (
                        <button className="resolve-btn" onClick={(e) => {
                            e.stopPropagation();
                            onResolve(log.id);
                        }}>
                            MARK RESOLVED
                        </button>
                    )}
                </div>
            )}

            <style jsx>{`
                .log-item {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 50, 50, 0.3);
                    border-radius: 8px;
                    overflow: hidden;
                    transition: all 0.2s;
                }
                .log-item.resolved {
                    border-color: rgba(0, 255, 136, 0.2);
                    opacity: 0.7;
                }
                .log-header {
                    padding: 15px 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;
                }
                .log-header:hover { background: rgba(255, 255, 255, 0.05); }

                .log-summary { display: flex; align-items: center; gap: 15px; flex: 1; }
                .severity-badge {
                    background: #ff3232;
                    color: #fff;
                    font-size: 0.6rem;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-weight: 800;
                }
                .resolved .severity-badge { background: #00ff88; color: #000; }
                
                .log-context { color: #00f0ff; font-family: monospace; font-size: 0.9rem; }
                .log-msg { color: #fff; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 500px; }
                
                .log-meta { display: flex; align-items: center; gap: 20px; color: rgba(255, 255, 255, 0.4); font-size: 0.8rem; }
                .expand-icon { font-size: 1.2rem; font-weight: bold; width: 20px; text-align: center; }

                .log-details {
                    padding: 20px;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    background: rgba(0, 0, 0, 0.2);
                }
                .detail-section { margin-bottom: 20px; }
                .detail-section h4 { 
                    font-size: 0.7rem; 
                    text-transform: uppercase; 
                    color: rgba(255, 255, 255, 0.5); 
                    margin-bottom: 8px; 
                }
                pre {
                    background: rgba(0, 0, 0, 0.3);
                    padding: 15px;
                    border-radius: 6px;
                    overflow-x: auto;
                    font-family: monospace;
                    font-size: 0.8rem;
                    color: rgba(255, 255, 255, 0.8);
                }

                .resolve-btn {
                    background: #00ff88;
                    color: #000;
                    border: none;
                    padding: 10px 20px;
                    font-weight: 800;
                    border-radius: 6px;
                    cursor: pointer;
                    margin-top: 10px;
                }
                .resolve-btn:hover { background: #fff; }
            `}</style>
        </div>
    );
}

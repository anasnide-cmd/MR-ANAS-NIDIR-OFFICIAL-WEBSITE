'use client';
import { useState, useEffect } from 'react';
import { getSystemLogs, resolveLog } from '../../../lib/logger';
import { auth } from '../../../lib/firebase';
import CommandGrid, { GridItem } from '../../../components/Admin/CommandGrid';
import SystemTerminal from '../../../components/Admin/SystemTerminal';

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
    const resolvedLogs = logs.filter(l => l.status === 'resolved') || []; // Ensure it's an array

    return (
        <main className="cia-dashboard">
            <header className="cia-header">
                <div>
                    <h1 className="cia-title">NEXUS EYE <span className="sub">THREAT MONITOR</span></h1>
                    <div className="status-line">
                        <span className="blink">●</span> SCANNING FOR ANOMALIES...
                    </div>
                </div>
                <div>
                    <button 
                        className="btn-cia" 
                        onClick={() => setRefreshTrigger(t => t + 1)}
                        disabled={loading}
                    >
                        {loading ? 'REFRESHING...' : 'FORCE REFRESH'}
                    </button>
                </div>
            </header>

            <CommandGrid>
                {/* Threat Stats */}
                <GridItem colSpan={4} title="CRITICAL THREATS">
                    <div className="stat-display">
                        <span className="value red">{activeLogs.length}</span>
                        <span className="label">ACTIVE ALERTS</span>
                    </div>
                </GridItem>
                <GridItem colSpan={4} title="SYSTEM HEALTH">
                    <div className="stat-display">
                        <span className="value cyan">{logs.length > 0 ? Math.round((resolvedLogs.length / logs.length) * 100) : 100}%</span>
                        <span className="label">INTEGRITY</span>
                    </div>
                </GridItem>
                <GridItem colSpan={4} title="NEUTRALIZED">
                    <div className="stat-display">
                        <span className="value">{resolvedLogs.length}</span>
                        <span className="label">THREATS RESOLVED</span>
                    </div>
                </GridItem>

                {/* Main Log Feed */}
                <GridItem colSpan={8} rowSpan={4} title="INTERCEPTED SIGNALS" border={true}>
                    <div className="logs-container">
                        {activeLogs.length === 0 ? (
                            <div className="empty-state">
                                <span className="icon">✓</span>
                                <p>SECTOR CLEAR. NO ACTIVE THREATS.</p>
                            </div>
                        ) : (
                            activeLogs.map(log => (
                                <LogEntry key={log.id} log={log} onResolve={handleResolve} />
                            ))
                        )}
                    </div>
                </GridItem>

                {/* Secure Log / History */}
                <GridItem colSpan={4} rowSpan={4} title="RESOLUTION LOG (ENCRYPTED)">
                    <div className="secure-log">
                        {resolvedLogs.slice(0, 10).map(log => (
                            <div key={log.id} className="history-item">
                                <span className="time">{new Date(log.timestamp).toLocaleTimeString()}</span>
                                <span className="msg">THREAT NEUTRALIZED: {log.id.slice(0, 6)}</span>
                            </div>
                        ))}
                    </div>
                </GridItem>
            </CommandGrid>

             <style jsx global>{`
                .cia-dashboard {
                    background-color: var(--cia-bg);
                    min-height: 100vh;
                    color: var(--cia-accent);
                    font-family: 'Share Tech Mono', monospace;
                }
                .cia-header {
                    padding: 20px 30px;
                    border-bottom: 2px solid var(--cia-accent);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: rgba(0, 243, 255, 0.05);
                }
                .cia-title { margin: 0; font-size: 2rem; color: #fff; letter-spacing: 5px; }
                .cia-title .sub { color: var(--cia-accent); font-size: 1rem; }
                .status-line { font-size: 0.8rem; margin-top: 5px; color: var(--cia-warn); }
                .blink { animation: flicker 1s infinite; margin-right: 5px; color: var(--cia-alert); }
                
                .btn-cia {
                    background: transparent;
                    border: 1px solid var(--cia-accent);
                    color: var(--cia-accent);
                    padding: 10px 20px;
                    cursor: pointer;
                    font-weight: bold;
                    letter-spacing: 2px;
                }
                .btn-cia:hover { background: var(--cia-accent); color: #000; }
                
                .stat-display { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; }
                .stat-display .value { font-size: 3rem; font-weight: 900; line-height: 1; color: #fff; }
                .stat-display .value.red { color: var(--cia-alert); text-shadow: 0 0 10px var(--cia-alert); }
                .stat-display .value.cyan { color: var(--cia-accent); text-shadow: 0 0 10px var(--cia-accent); }
                .stat-display .label { font-size: 0.7rem; opacity: 0.7; margin-top: 5px; letter-spacing: 1px; }

                .logs-container { height: 100%; overflow-y: auto; padding-right: 10px; }
                .empty-state { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--cia-success); opacity: 0.5; }
                .secure-log { opacity: 0.6; font-size: 0.8rem; }
                .history-item { padding: 5px 0; border-bottom: 1px solid rgba(255,255,255,0.1); }
                .history-item .time { color: var(--cia-accent); margin-right: 10px; }
            `}</style>
        </main>
    );
}

function LogEntry({ log, onResolve }) {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className={`log-entry ${log.severity || 'info'}`}>
            <div className="log-header" onClick={() => setExpanded(!expanded)}>
                <span className="badge">{log.severity || 'ALERT'}</span>
                <span className="msg">{log.message}</span>
                <span className="time">{new Date(log.timestamp).toLocaleTimeString()}</span>
            </div>
            {expanded && (
                <div className="log-body">
                    <pre>{JSON.stringify(log, null, 2)}</pre>
                    <button className="resolve-btn" onClick={() => onResolve(log.id)}>NEUTRALIZE</button>
                </div>
            )}
            <style jsx>{`
                .log-entry { margin-bottom: 10px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.3); }
                .log-entry.error { border-color: var(--cia-alert); }
                .log-header { padding: 10px; display: flex; align-items: center; gap: 10px; cursor: pointer; }
                .log-header:hover { background: rgba(255,255,255,0.05); }
                .badge { background: #333; color: #fff; padding: 2px 5px; font-size: 0.7rem; font-weight: bold; }
                .log-entry.error .badge { background: var(--cia-alert); color: #000; }
                .msg { flex: 1; font-weight: bold; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .time { opacity: 0.5; font-size: 0.8rem; }
                
                .log-body { padding: 10px; border-top: 1px solid rgba(255,255,255,0.1); background: #000; }
                pre { color: var(--cia-accent); font-family: monospace; font-size: 0.8rem; overflow-x: auto; max-height: 200px; }
                .resolve-btn { margin-top: 10px; background: var(--cia-alert); color: #000; border: none; padding: 5px 10px; font-weight: bold; cursor: pointer; width: 100%; }
                .resolve-btn:hover { background: #fff; }
            `}</style>
        </div>
    );
}

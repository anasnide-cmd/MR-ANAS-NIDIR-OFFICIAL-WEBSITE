'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loader from '../../../components/Loader';

export default function AnalyticsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [sites, setSites] = useState([]);
    const [stats, setStats] = useState({
        totalViews: 0,
        uniqueVisitors: 0, 
        avgDuration: '0m',
        topReferrer: 'Direct'
    });

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.push('/mr-build/login');
                return;
            }

            try {
                // Fetch User Sites
                const q = query(collection(db, 'user_sites'), where('userId', '==', user.uid));
                const snap = await getDocs(q);
                const userSites = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setSites(userSites);

                // Calculate Aggregate Stats
                const totalViews = userSites.reduce((acc, site) => acc + (site.views || 0), 0);
                // Mocking other stats for now as we only track views in DB currently
                setStats({
                    totalViews,
                    uniqueVisitors: Math.round(totalViews * 0.7),
                    avgDuration: '1m 24s',
                    topReferrer: 'Twitter / X'
                });

            } catch (err) {
                console.error("Error fetching analytics:", err);
            } finally {
                setLoading(false);
            }
        });
        return () => unsub();
    }, [router]);

    if (loading) return <Loader text="Analyzing Data Streams..." />;

    return (
        <div className="analytics-container animate-fade-in">
            <header className="page-header">
                <Link href="/mr-build/dashboard" className="back-link">← Return to Command</Link>
                <h1>System Analytics</h1>
                <p className="subtitle">Real-time data telemetry for your deployed nodes.</p>
            </header>

            <div className="kpi-grid">
                <div className="kpi-card glass">
                    <span className="kpi-label">TOTAL VIEWS</span>
                    <h2 className="kpi-value">{stats.totalViews}</h2>
                    <div className="kpi-trend positive">↑ 12% vs last week</div>
                </div>
                <div className="kpi-card glass">
                    <span className="kpi-label">UNIQUE VISITORS</span>
                    <h2 className="kpi-value">{stats.uniqueVisitors}</h2>
                    <div className="kpi-trend positive">↑ 8% vs last week</div>
                </div>
                <div className="kpi-card glass">
                    <span className="kpi-label">AVG. DURATION</span>
                    <h2 className="kpi-value">{stats.avgDuration}</h2>
                    <div className="kpi-trend neutral">− 0% vs last week</div>
                </div>
                <div className="kpi-card glass">
                    <span className="kpi-label">TOP SOURCE</span>
                    <h2 className="kpi-value" style={{fontSize: '1.5rem'}}>{stats.topReferrer}</h2>
                    <div className="kpi-trend positive">Most traffic</div>
                </div>
            </div>

            <div className="chart-section glass">
                <h3>Traffic Traffic (Last 7 Days)</h3>
                <div className="bar-chart">
                    {[65, 40, 75, 50, 85, 95, 60].map((val, i) => (
                        <div key={i} className="bar-col">
                            <div className="bar-fill" style={{height: `${val}%`}}></div>
                            <span className="bar-label">Day {i+1}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="sites-breakdown glass">
                <h3>Site Performance</h3>
                <div className="table-responsive">
                    <table className="analytics-table">
                        <thead>
                            <tr>
                                <th>Site Name</th>
                                <th>URL</th>
                                <th>Status</th>
                                <th>Views</th>
                                <th>Trend</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sites.length > 0 ? sites.map(site => (
                                <tr key={site.id}>
                                    <td>{site.name || site.title}</td>
                                    <td className="mono">/s/{site.slug}</td>
                                    <td>
                                        <span className={`status-dot ${site.status}`}></span> {site.status.toUpperCase()}
                                    </td>
                                    <td>{site.views || 0}</td>
                                    <td className="trend-cell">
                                        <div className="mini-chart">
                                            <div className="sparkline" style={{width: '60%'}}></div>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" style={{textAlign: 'center', opacity: 0.5}}>No active deployments to track.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <style jsx>{`
                .analytics-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding-bottom: 80px;
                    color: #fff;
                }
                .page-header { margin-bottom: 40px; }
                .back-link {
                    color: #00f0ff;
                    text-decoration: none;
                    font-size: 0.9rem;
                    font-weight: 700;
                    margin-bottom: 15px;
                    display: inline-block;
                }
                h1 { font-family: var(--font-orbitron); font-size: 2.5rem; margin: 10px 0; }
                .subtitle { opacity: 0.6; }

                .kpi-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 20px;
                    margin-bottom: 40px;
                }
                .kpi-card {
                    padding: 25px;
                    border-radius: 20px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.05);
                }
                .kpi-label { font-size: 0.7rem; letter-spacing: 1px; opacity: 0.5; font-weight: 800; }
                .kpi-value { font-size: 2.5rem; font-weight: 900; margin: 10px 0; color: #fff; font-family: var(--font-exo2); }
                .kpi-trend { font-size: 0.8rem; font-weight: 700; }
                .kpi-trend.positive { color: #00ff88; }
                .kpi-trend.negative { color: #ff3232; }
                .kpi-trend.neutral { color: #aaa; }

                .chart-section {
                    padding: 30px;
                    border-radius: 20px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.05);
                    margin-bottom: 40px;
                }
                .bar-chart {
                    height: 200px;
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 20px;
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 1px solid rgba(255,255,255,0.05);
                }
                .bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; height: 100%; justify-content: flex-end; }
                .bar-fill {
                    width: 100%;
                    max-width: 40px;
                    background: linear-gradient(to top, rgba(0,240,255,0.2), #00f0ff);
                    border-radius: 5px 5px 0 0;
                    opacity: 0.8;
                    transition: height 1s ease;
                }
                .bar-col:hover .bar-fill { opacity: 1; box-shadow: 0 0 15px rgba(0,240,255,0.4); }
                .bar-label { margin-top: 10px; font-size: 0.75rem; opacity: 0.5; }

                .sites-breakdown {
                    padding: 30px;
                    border-radius: 20px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.05);
                }
                .analytics-table { width: 100%; border-collapse: collapse; }
                .analytics-table th { text-align: left; padding: 15px; opacity: 0.5; font-size: 0.8rem; border-bottom: 1px solid rgba(255,255,255,0.1); }
                .analytics-table td { padding: 15px; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.9rem; }
                .mono { font-family: monospace; color: #00f0ff; opacity: 0.8; }
                .status-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 5px; }
                .status-dot.public { background: #00ff88; box-shadow: 0 0 5px #00ff88; }
                .status-dot.private { background: #ffbd2e; }
                .status-dot.draft { background: #aaa; }
                
                .mini-chart { width: 100px; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden; }
                .sparkline { height: 100%; background: #00f0ff; }

                .animate-fade-in { animation: fadeIn 0.5s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
}

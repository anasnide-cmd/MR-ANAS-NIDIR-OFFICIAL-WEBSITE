'use client';
import { useState, useEffect } from 'react';
import { db, auth } from '../../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Loader from '../../../components/Loader';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { TrendingUp, DollarSign, Eye, ChevronLeft } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function AnalyticsPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ totalViews: 0, estimatedEarnings: 0, totalSites: 0 });
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            if (u) {
                setUser(u);
                
                // Fetch User Sites
                const q = query(collection(db, 'user_sites'), where('userId', '==', u.uid));
                const snap = await getDocs(q);
                
                let totalViews = 0;
                let activeMonetized = 0;

                snap.docs.forEach(doc => {
                    const data = doc.data();
                    totalViews += (data.views || 0);
                    if (data.monetization?.enabled) activeMonetized++;
                });

                // Mock Revenue Calculation (e.g., $0.50 CPM)
                const estimatedEarnings = (totalViews / 1000) * 0.50;

                setStats({
                    totalViews,
                    estimatedEarnings: estimatedEarnings.toFixed(2),
                    totalSites: snap.size,
                    activeMonetized
                });

                // Mock Chart Data (Since we don't have historical data yet)
                // We'll generate a fake 7-day trend based on current total views
                // If totalViews is 0, we'll just show flat line
                const baseViews = totalViews > 0 ? totalViews : 0;
                const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                const dataPoints = labels.map(() => Math.floor(Math.random() * (baseViews / 2))); 
                
                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Daily Views',
                            data: dataPoints,
                            borderColor: '#00f0ff',
                            backgroundColor: 'rgba(0, 240, 255, 0.1)',
                            fill: true,
                            tension: 0.4
                        }
                    ]
                });
            } else {
                router.push('/mr-build/login');
            }
            setLoading(false);
        });
        return () => unsub();
    }, [router]);

    if (loading) return <Loader text="Analyzing Revenue Streams..." />;

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top', labels: { color: '#ccc' } },
            title: { display: false },
        },
        scales: {
            y: {
                grid: { color: 'rgba(255,255,255,0.1)' },
                ticks: { color: '#888' }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#888' }
            }
        }
    };

    return (
        <div className="analytics-container">
            <header className="analytics-header">
                <button onClick={() => router.push('/mr-build/dashboard')} className="btn-back">
                    <ChevronLeft size={20}/> Back
                </button>
                <h1>Monetization Console</h1>
            </header>

            <main className="analytics-main">
                {/* KPI Cards */}
                <div className="kpi-grid">
                    <div className="kpi-card revenue">
                        <div className="icon"><DollarSign size={24}/></div>
                        <div className="value">${stats.estimatedEarnings}</div>
                        <div className="label">Est. Revenue</div>
                    </div>
                    <div className="kpi-card views">
                        <div className="icon"><Eye size={24}/></div>
                        <div className="value">{stats.totalViews.toLocaleString()}</div>
                        <div className="label">Total Impressions</div>
                    </div>
                    <div className="kpi-card growth">
                        <div className="icon"><TrendingUp size={24}/></div>
                        <div className="value">+12.5%</div>
                        <div className="label">Weekly Growth</div>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="chart-section">
                    <h2>Performance Trend</h2>
                    <div className="chart-wrapper">
                        {chartData && <Line options={options} data={chartData} />}
                    </div>
                </div>

                {/* Recent Activity (Placeholder) */}
                <div className="activity-section">
                    <h2>Recent Payouts</h2>
                    <div className="empty-projects">
                        <p>No payouts processed yet. Minimum threshold: $50.00</p>
                    </div>
                </div>
            </main>

            <style jsx>{`
                .analytics-container {
                    min-height: 100vh; background: #050505; color: #fff;
                    font-family: 'Inter', sans-serif;
                }
                .analytics-header {
                    padding: 20px 30px; border-bottom: 1px solid rgba(255,255,255,0.1);
                    display: flex; align-items: center; gap: 20px;
                    background: rgba(10,10,10,0.8); backdrop-filter: blur(10px);
                }
                .btn-back {
                    background: none; border: none; color: #888; cursor: pointer;
                    display: flex; align-items: center; gap: 5px; font-size: 0.9rem;
                }
                .btn-back:hover { color: #fff; }
                h1 { font-family: 'Orbitron', sans-serif; font-size: 1.5rem; color: #fff; letter-spacing: 1px; }

                .analytics-main { max-width: 1000px; margin: 0 auto; padding: 40px 20px; }

                /* KPIs */
                .kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px; }
                @media (max-width: 600px) {
                    .kpi-grid { grid-template-columns: 1fr; }
                    .analytics-header { padding: 15px 20px; flex-wrap: wrap; }
                    .analytics-header h1 { font-size: 1.2rem; }
                    .analytics-main { padding: 20px 15px; }
                    .chart-wrapper { padding: 10px; min-height: 300px; }
                }

                .kpi-card {
                    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
                    padding: 24px; border-radius: 16px; position: relative; overflow: hidden;
                }
                .kpi-card.revenue { border-color: #00ff80; background: linear-gradient(135deg, rgba(0,255,128,0.05), transparent); }
                .kpi-card.views { border-color: #00f0ff; background: linear-gradient(135deg, rgba(0,240,255,0.05), transparent); }
                .kpi-card.growth { border-color: #d000ff; background: linear-gradient(135deg, rgba(208,0,255,0.05), transparent); }

                .kpi-card .icon { margin-bottom: 16px; color: inherit; opacity: 0.8; }
                .revenue .icon { color: #00ff80; }
                .views .icon { color: #00f0ff; }
                .growth .icon { color: #d000ff; }

                .value { font-size: 2rem; font-weight: 700; margin-bottom: 4px; color: #fff;}
                .label { font-size: 0.9rem; color: #888; text-transform: uppercase; letter-spacing: 1px; }

                /* Chart */
                .chart-section { margin-bottom: 40px; }
                .chart-section h2 { margin-bottom: 20px; font-size: 1.2rem; color: #ccc; }
                .chart-wrapper {
                    background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);
                    padding: 24px; border-radius: 16px; min-height: 400px;
                }

                .activity-section { margin-bottom: 40px; }
                .activity-section h2 { margin-bottom: 20px; font-size: 1.2rem; color: #ccc; }
                .empty-projects {
                    padding: 40px; text-align: center; border: 1px dashed rgba(255,255,255,0.1);
                    border-radius: 12px; color: #666;
                }
            `}</style>
        </div>
    );
}

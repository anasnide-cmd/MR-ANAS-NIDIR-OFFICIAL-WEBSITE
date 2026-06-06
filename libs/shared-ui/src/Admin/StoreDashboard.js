'use client';
import { useState } from 'react';
import { products } from '../data/shop-products';
import { GridItem } from './CommandGrid';
import { 
  ShoppingBag, Users, DollarSign, TrendingUp, 
  Package, ExternalLink, Edit3, Trash2, Plus
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

export default function StoreDashboard() {
    const [activeTab, setActiveTab] = useState('products');

    // Mock Stats
    const stats = [
        { label: 'REVENUE', value: '$12,450', icon: <DollarSign size={20} />, color: '#4ade80' },
        { label: 'ORDERS', value: '142', icon: <ShoppingBag size={20} />, color: '#00f0ff' },
        { label: 'CUSTOMERS', value: '89', icon: <Users size={20} />, color: '#a855f7' },
        { label: 'CONVERSION', value: '3.2%', icon: <TrendingUp size={20} />, color: '#fbbf24' },
    ];

    const chartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'SALES',
                data: [1200, 1900, 1500, 2500, 2200, 3000, 4500],
                fill: true,
                backgroundColor: 'rgba(0, 240, 255, 0.1)',
                borderColor: '#00f0ff',
                borderWidth: 2,
                tension: 0.4
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { grid: { display: false }, ticks: { color: '#64748b' } },
            y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b' } }
        }
    };

    return (
        <div className="store-dashboard">
            {/* Stats Grid */}
            <div className="stats-grid">
                {stats.map((stat, i) => (
                    <div key={i} className="stat-card glass">
                        <div className="stat-icon" style={{ color: stat.color, background: `${stat.color}15` }}>
                            {stat.icon}
                        </div>
                        <div className="stat-info">
                            <span className="stat-label">{stat.label}</span>
                            <span className="stat-value">{stat.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="dashboard-content">
                <div className="main-col">
                    <GridItem title="SALES ANALYTICS">
                        <div style={{ height: '300px', width: '100%' }}>
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    </GridItem>

                    <div className="inventory-section">
                        <div className="section-header">
                            <h2>Inventory Management</h2>
                            <button className="btn-add">
                                <Plus size={18} /> Add Product
                            </button>
                        </div>
                        
                        <div className="product-table glass">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.slice(0, 6).map(p => (
                                        <tr key={p.id}>
                                            <td>
                                                <div className="product-cell">
                                                    <div className="product-img" style={{ backgroundImage: `url(${p.image})` }} />
                                                    <span>{p.name}</span>
                                                </div>
                                            </td>
                                            <td><span className="tag">{p.category}</span></td>
                                            <td>${p.price}</td>
                                            <td><span className="status-pill active">In Stock</span></td>
                                            <td>
                                                <div className="actions">
                                                    <button title="Edit"><Edit3 size={16} /></button>
                                                    <button title="Delete" className="delete"><Trash2 size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="side-col">
                    <GridItem title="RECENT ORDERS">
                        <div className="order-list">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="order-item">
                                    <div className="order-info">
                                        <span className="order-id">#ORD-772{i}</span>
                                        <span className="order-customer">Customer Node {i}</span>
                                    </div>
                                    <span className="order-amount">${(Math.random() * 500).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <button className="btn-view-all">View All Orders</button>
                    </GridItem>

                    <GridItem title="STORE STATUS">
                        <div className="status-card">
                            <div className="status-row">
                                <span>Gateway Status</span>
                                <span className="status-ok">ONLINE</span>
                            </div>
                            <div className="status-row">
                                <span>Global Sync</span>
                                <span className="status-ok">100%</span>
                            </div>
                            <div className="status-row">
                                <span>Stock Alerts</span>
                                <span className="status-warn">2 LOW</span>
                            </div>
                        </div>
                    </GridItem>
                </div>
            </div>

            <style jsx>{`
                .store-dashboard { display: flex; flex-direction: column; gap: 24px; padding: 24px; }
                .glass { background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; }
                
                .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
                .stat-card { padding: 20px; display: flex; align-items: center; gap: 16px; }
                .stat-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
                .stat-info { display: flex; flex-direction: column; }
                .stat-label { font-size: 0.75rem; color: #94a3b8; font-weight: 600; letter-spacing: 1px; }
                .stat-value { font-size: 1.5rem; font-weight: 700; color: #fff; }

                .dashboard-content { display: grid; grid-template-columns: 1fr 320px; gap: 24px; }
                @media (max-width: 1024px) { .dashboard-content { grid-template-columns: 1fr; } }

                .main-col { display: flex; flex-direction: column; gap: 24px; }
                .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
                .section-header h2 { font-size: 1.25rem; color: #fff; font-weight: 600; }
                
                .btn-add { background: #00f0ff; color: #000; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.2s; }
                .btn-add:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0, 240, 255, 0.3); }

                .product-table { overflow-x: auto; }
                table { width: 100%; border-collapse: collapse; color: #cbd5e1; }
                th { text-align: left; padding: 16px; font-size: 0.85rem; color: #94a3b8; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
                td { padding: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
                
                .product-cell { display: flex; align-items: center; gap: 12px; }
                .product-img { width: 40px; height: 40px; border-radius: 8px; background-size: cover; background-position: center; border: 1px solid rgba(255, 255, 255, 0.1); }
                
                .tag { background: rgba(59, 130, 246, 0.1); color: #60a5fa; padding: 2px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; }
                .status-pill { padding: 2px 8px; border-radius: 20px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
                .status-pill.active { background: rgba(74, 222, 128, 0.1); color: #4ade80; border: 1px solid rgba(74, 222, 128, 0.2); }
                
                .actions { display: flex; gap: 8px; }
                .actions button { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: #94a3b8; padding: 6px; border-radius: 6px; cursor: pointer; transition: all 0.2s; }
                .actions button:hover { background: rgba(255, 255, 255, 0.1); color: #fff; border-color: #00f0ff; }
                .actions button.delete:hover { border-color: #f87171; color: #f87171; }

                .side-col { display: flex; flex-direction: column; gap: 24px; }
                .order-list { display: flex; flex-direction: column; gap: 12px; }
                .order-item { display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(255, 255, 255, 0.03); border-radius: 12px; }
                .order-id { font-weight: 600; color: #fff; font-size: 0.9rem; display: block; }
                .order-customer { font-size: 0.75rem; color: #94a3b8; }
                .order-amount { font-weight: 700; color: #4ade80; font-size: 0.9rem; }
                
                .btn-view-all { width: 100%; padding: 10px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: #cbd5e1; border-radius: 8px; margin-top: 12px; cursor: pointer; transition: all 0.2s; }
                .btn-view-all:hover { background: rgba(255, 255, 255, 0.1); color: #fff; }

                .status-card { display: flex; flex-direction: column; gap: 12px; }
                .status-row { display: flex; justify-content: space-between; font-size: 0.85rem; }
                .status-ok { color: #4ade80; font-weight: 700; }
                .status-warn { color: #fbbf24; font-weight: 700; }
            `}</style>
        </div>
    );
}

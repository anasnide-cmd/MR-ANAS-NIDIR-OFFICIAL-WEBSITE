'use client';
import StoreDashboard from '../../@mr/ui/Admin/StoreDashboard';

export default function AdminStorePage() {
    return (
        <div className="admin-page">
            <header className="page-header">
                <h1 className="page-title">WEB STORE <span className="sub">COMMAND</span></h1>
                <p className="page-subtitle">Managing global commerce and marketplace assets.</p>
            </header>

            <StoreDashboard />

            <style jsx>{`
                .admin-page { padding: 24px; min-height: 100vh; }
                .page-header { margin-bottom: 32px; padding-left: 24px; }
                .page-title { font-size: 1.8rem; font-weight: 800; color: #fff; letter-spacing: -0.5px; }
                .page-title .sub { color: #00f0ff; opacity: 0.8; font-weight: 400; font-size: 1.2rem; margin-left: 8px; }
                .page-subtitle { color: #94a3b8; font-size: 0.95rem; margin-top: 4px; }
            `}</style>
        </div>
    );
}

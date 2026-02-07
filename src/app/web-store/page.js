'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Grid, Terminal, Shield, Cpu, 
  Zap, Star, MoreVertical, Menu, X, ArrowRight, Sparkles 
} from 'lucide-react';
import styles from './webstore.module.css';

// --- MOCK DATA ---
const CATEGORIES = [
  { id: 'all', label: 'Dashboard', icon: <Grid size={18} /> },
  { id: 'ai', label: 'AI Models', icon: <Cpu size={18} /> },
  { id: 'productivity', label: 'Productivity', icon: <Zap size={18} /> },
  { id: 'dev', label: 'Developer', icon: <Terminal size={18} /> },
  { id: 'security', label: 'Security', icon: <Shield size={18} /> },
];

const APPS = [
  {
    id: 'nex-ai',
    title: 'NEX AI',
    developer: 'Mr Anas Nidir',
    description: 'Advanced AI assistant powered by multi-model intelligence. Capable of coding, writing, and analysis.',
    icon: '🤖',
    rating: 5.0,
    users: '10k+',
    category: 'ai',
    link: '/nex-ai',
    featured: true,
    image: '/assets/bg.jpg',
  },
  {
    id: 'savoirpedia',
    title: 'SavoirPedia',
    developer: 'Knowledge Systems',
    description: 'Holographic knowledge base and wiki engine. Explore the universe of information.',
    icon: '📚',
    rating: 4.8,
    users: '5k+',
    category: 'productivity',
    link: '/savoirpedia',
    featured: true,
    image: '/assets/bg.png',
  },
  {
    id: 'mr-build',
    title: 'Mr Build',
    developer: 'NEXENGINE',
    description: 'Instant website generator. Turn prompts into fully functional deployed sites.',
    icon: '🔨',
    rating: 4.9,
    users: '2k+',
    category: 'dev',
    link: '/mr-build',
    featured: false,
  },
  {
    id: 'mr-games',
    title: 'Mr Games',
    developer: 'Arcade Div',
    description: 'Immersive browser-based gaming experiences with high-fidelity graphics.',
    icon: '🎮',
    rating: 4.7,
    users: '8k+',
    category: 'productivity',
    link: '/mr-games',
    featured: false,
  },
  {
    id: 'workspace',
    title: 'Workspace',
    developer: 'Enterprise Div',
    description: 'Team collaboration suite with chat, tasks, and real-time project management.',
    icon: '💼',
    rating: 4.6,
    users: '1.5k+',
    category: 'productivity',
    link: '/workspace',
    featured: false,
  },
  {
    id: 'system-monitor',
    title: 'System Monitor',
    developer: 'Admin Tools',
    description: 'Real-time server metrics, error logging, and performance analytics.',
    icon: '📊',
    rating: 4.5,
    users: '500+',
    category: 'dev',
    link: '/admin/monitor',
    featured: false,
  }
];

// --- COMPONENTS ---

const NavItem = ({ cat, active, onClick }) => (
    <button
        onClick={onClick}
        className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}
    >
        <div className={styles.navIconBox}>
            {cat.icon}
        </div>
        <span>{cat.label}</span>
    </button>
);

const AppCard = ({ app, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className={styles.card}
  >
      <Link href={app.link} style={{ display: 'flex', flexDirection: 'column', height: '100%', textDecoration: 'none' }}>
        <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
                {app.icon}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {app.rating} <Star size={10} fill="currentColor" />
                </span>
                <span style={{ fontSize: '10px', color: '#6b7280' }}>{app.users}</span>
            </div>
        </div>
        
        <h3 className={styles.cardTitle}>{app.title}</h3>
        <span className={styles.cardDev}>{app.developer}</span>
        <p className={styles.cardDesc}>{app.description}</p>
        
        <div className={styles.cardFooter}>
            <span style={{ fontSize: '12px', color: '#9ca3af' }}>Free</span>
            <div className={styles.actionIcon}>
                <ArrowRight size={14} />
            </div>
        </div>
      </Link>
  </motion.div>
);

const HeroSpotlight = ({ app }) => {
    if (!app) return null;
    return (
        <div className={styles.hero}>
            <Image 
                src={app.image} 
                alt={app.title} 
                fill 
                className={styles.heroImage}
                priority
            />
            <div className={styles.heroOverlay} />
            
            <div className={styles.heroContent}>
                 <div className={styles.tag}>
                    <Sparkles size={12} />
                    <span>Featured App</span>
                 </div>
                 
                 <h1 className={styles.heroTitle}>{app.title}</h1>
                 <p className={styles.heroDesc}>{app.description}</p>
                 
                 <div className={styles.heroActions}>
                    <Link href={app.link} className={styles.btnPrimary}>
                        Launch App
                    </Link>
                 </div>
            </div>
        </div>
    );
};

export default function WebStorePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredApps = activeCategory === 'all' 
    ? APPS 
    : APPS.filter(app => app.category === activeCategory);

  const heroApp = APPS.find(app => app.id === 'nex-ai');

  return (
    <div className={styles.container}>
        
        {/* Animated Background Overlay */}
        <div className={styles.bgOverlay}>
            <div className={`${styles.blobBox} ${styles.blob1}`} />
            <div className={`${styles.blobBox} ${styles.blob2}`} />
        </div>

        {/* Sidebar */}
        <div className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
            <div className={styles.logoArea}>
                <div className={styles.logoIcon}>
                    <Grid size={24} />
                </div>
                <div>
                    <h1 style={{ fontWeight: 'bold', fontSize: '14px', lineHeight: 1.2 }}>MR ANAS NIDIR</h1>
                    <span style={{ fontSize: '10px', color: '#60a5fa', letterSpacing: '1px', textTransform: 'uppercase' }}>MARKETPLACE</span>
                </div>
            </div>

            <div className={styles.searchBox}>
                <Search className={styles.searchIcon} size={16} />
                <input 
                    type="text" 
                    placeholder="Find apps..." 
                    className={styles.searchInput}
                />
            </div>

            <nav className={styles.navList}>
                {CATEGORIES.map(cat => (
                    <NavItem 
                        key={cat.id} 
                        cat={cat} 
                        active={activeCategory === cat.id} 
                        onClick={() => { setActiveCategory(cat.id); setSidebarOpen(false); }}
                    />
                ))}
            </nav>
        </div>

        {/* Mobile Header Button */}
        {!sidebarOpen && (
             <button 
                onClick={() => setSidebarOpen(true)}
                style={{ 
                    position: 'fixed', bottom: '24px', right: '24px', zIndex: 60,
                    width: '56px', height: '56px', borderRadius: '50%',
                    background: '#2563eb', color: 'white', border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(37, 99, 235, 0.4)',
                    cursor: 'pointer'
                }}
                className="lg:hidden" 
             >
                <Menu size={24} />
             </button>
        )}
        
        {/* Backdrop for Mobile Sidebar */}
        {sidebarOpen && (
            <div 
                style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 40 }} 
                onClick={() => setSidebarOpen(false)} 
            />
        )}

        {/* Main Content Area */}
        <main className={styles.main}>
            <div className={styles.mainContent}>
                
                {/* Hero Section */}
                <AnimatePresence mode="wait">
                    {activeCategory === 'all' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <HeroSpotlight app={heroApp} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Grid Header */}
                <div className={styles.sectionHeader}>
                    <div>
                        <h2 className={styles.sectionTitle}>
                            {activeCategory === 'all' ? 'Recommended for you' : CATEGORIES.find(c => c.id === activeCategory)?.label}
                        </h2>
                    </div>
                </div>

                {/* Apps Grid */}
                <div className={styles.grid}>
                    <AnimatePresence mode="popLayout">
                        {filteredApps.map((app, idx) => (
                            <AppCard key={app.id} app={app} index={idx} />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    </div>
  );
}

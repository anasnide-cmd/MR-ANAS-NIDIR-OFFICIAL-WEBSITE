'use client';

import { motion } from 'framer-motion';
import { 
    FlaskRound, 
    Beaker, 
    Cpu, 
    Zap, 
    ShieldCheck, 
    Terminal, 
    Activity, 
    Atom, 
    Box, 
    ChevronRight,
    Search,
    Code2,
    Binary,
    Globe,
    Pointer
} from 'lucide-react';
import Link from 'next/link';
import './LabStyles.css';

const experiments = [
    {
        icon: <Pointer size={24} />,
        title: "Hand Gesture Protocol",
        desc: "Touchless interface system using computer vision for seamless spatial navigation.",
        tag: "EXPERIMENTAL",
        color: "#ff00ff",
        url: "/lab/hand-gesture"
    },
    {
        icon: <Atom size={24} />,
        title: "Quantum Code Optimizer",
        desc: "Advanced LLM-driven refactoring engine for high-performance systems.",
        tag: "SOLO OPS",
        color: "#00f0ff",
        url: "/lab/quantum-code"
    },
    {
        icon: <Cpu size={24} />,
        title: "Neural Fabric Visualizer",
        desc: "Interactive 3D representation of active neural nodes across the ecosystem.",
        tag: "BETA",
        color: "#5050ff",
        url: "/lab/neural-fabric"
    },
    {
        icon: <Box size={24} />,
        title: "Nebula Containerization",
        desc: "Next-gen virtualization for isolated, secure project deployments.",
        tag: "STABLE",
        color: "#00ff88",
        url: "/lab/nebula-containers"
    },
    {
        icon: <Binary size={24} />,
        title: "Hex-Encrypt Delta",
        desc: "Military-grade encryption protocol (AES-256) for private data storage.",
        tag: "ENCRYPTED",
        color: "#ffd700",
        url: "/lab/hex-encrypt"
    }
];

export default function LabPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }
    };

    return (
        <motion.div 
            className="lab-container"
            initial="hidden"
            animate="show"
            variants={containerVariants}
        >
            <div className="ambient-quantum" />
            
            <motion.header className="lab-header" variants={itemVariants}>
                <div className="lab-tag">RESEARCHER LAB v4.0.2</div>
                <h1 className="lab-title">PROJECT <span>NEXUS</span></h1>
                <p style={{ opacity: 0.5, marginTop: '10px' }}>Exploring the boundaries of digital sovereignty and AI integration.</p>
            </motion.header>

            <div className="lab-grid">
                <motion.section className="experiment-section" variants={containerVariants}>
                    <div className="experiment-grid">
                        {experiments.map((exp, idx) => (
                            <Link href={exp.url || '#'} key={idx}>
                                <motion.div 
                                    className="experiment-card"
                                    variants={itemVariants}
                                    whileHover={{ y: -10, borderColor: exp.color }}
                                >
                                    <div className="card-glow" style={{ background: `radial-gradient(circle at top left, ${exp.color}15, transparent 70%)` }} />
                                    <div className="card-icon" style={{ color: exp.color, background: `${exp.color}15` }}>
                                        {exp.icon}
                                    </div>
                                    <div style={{ fontSize: '0.65rem', fontWeight: 900, color: exp.color, marginBottom: '8px', letterSpacing: '1px' }}>{exp.tag}</div>
                                    <h3>{exp.title}</h3>
                                    <p>{exp.desc}</p>
                                    <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: exp.color, fontWeight: 700 }}>
                                        OPEN PROJECT <ChevronRight size={14} />
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>

                    <motion.div className="workbench" variants={itemVariants}>
                        <div className="workbench-bar">
                            <div className="workbench-dots"><span/><span/><span/></div>
                            <span>WORKBENCH_SHELL | TERMINAL LINK 04</span>
                            <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '5px' }}><Activity size={12} /> ANALYZING_SYSTEM...</span>
                        </div>
                        <div className="workbench-content">
                            <div className="code-line">
                                <span className="line-num">01</span>
                                <span className="line-text"><span className="type-blue">const</span> labStatus = <span className="type-green">&apos;ACTIVE&apos;</span>;</span>
                            </div>
                            <div className="code-line">
                                <span className="line-num">02</span>
                                <span className="line-text"><span className="type-blue">async function</span> initializeNexus() {'{'}</span>
                            </div>
                            <div className="code-line">
                                <span className="line-num">03</span>
                                <span className="line-text">&nbsp;&nbsp;<span className="type-blue">await</span> connectToNode(<span className="type-gold">&apos;Lambda-4&apos;</span>);</span>
                            </div>
                            <div className="code-line">
                                <span className="line-num">04</span>
                                <span className="line-text">&nbsp;&nbsp;console.log(<span className="type-green">&apos;SYSTEM_NOMINAL&apos;</span>);</span>
                            </div>
                            <div className="code-line">
                                <span className="line-num">05</span>
                                <span className="line-text">{'}'}</span>
                            </div>
                            <div className="code-line" style={{ marginTop: '10px', color: '#666' }}>
                                <span className="line-num">--</span>
                                <span className="line-text">&gt; [SYS] Establishing neural handshake...</span>
                            </div>
                            <div className="code-line" style={{ color: '#00f0ff' }}>
                                <span className="line-num">--</span>
                                <span className="line-text">&gt; [AUTH] Access Granted: Administrator</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.section>

                <motion.aside className="side-panel" variants={containerVariants}>
                    <motion.div className="status-panel" variants={itemVariants}>
                        <div className="status-title"><Activity size={16} color="#00f0ff" /> NEURAL NODE STATUS</div>
                        <div className="status-row">
                            <span className="label">PRIMARY CORE</span>
                            <span className="value">ONLINE</span>
                        </div>
                        <div className="status-row">
                            <span className="label">UPTIME</span>
                            <span className="value">99.98%</span>
                        </div>
                        <div className="status-row">
                            <span className="label">ACTIVE USERS</span>
                            <span className="value">1.2k+</span>
                        </div>
                        <div className="status-row">
                            <span className="label">FIREWALLS</span>
                            <span className="value" style={{ color: '#00ff88' }}>ACTIVE</span>
                        </div>
                        <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginTop: '20px' }}>
                            <div style={{ height: '100%', width: '85%', background: '#00f0ff', borderRadius: '2px', boxShadow: '0 0 10px #00f0ff' }} />
                        </div>
                        <div style={{ fontSize: '0.65rem', color: '#555', marginTop: '8px', textAlign: 'right' }}>DISK USAGE: 85%</div>
                    </motion.div>

                    <motion.div className="status-panel" style={{ background: 'rgba(0, 240, 255, 0.02)' }} variants={itemVariants}>
                        <div className="status-title"><ShieldCheck size={16} color="#ffd700" /> RECENT DEPLOYMENTS</div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem' }}>
                            <li style={{ marginBottom: '15px', color: '#aaa' }}>
                                <div style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '2px' }}>v5.2 Update</div>
                                <span>2 hours ago | Nexus Core</span>
                            </li>
                            <li style={{ marginBottom: '15px', color: '#aaa' }}>
                                <div style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '2px' }}>Security Patch</div>
                                <span>Yesterday | Auth Layer</span>
                            </li>
                        </ul>
                        <button style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', marginTop: '10px' }}>
                            VIEW FULL HISTORY
                        </button>
                    </motion.div>

                    <motion.div className="status-panel" variants={itemVariants}>
                        <div className="status-title"><Globe size={16} color="#5050ff" /> GLOBAL NETWORK</div>
                        <div style={{ height: '150px', background: 'rgba(0,0,0,0.5)', borderRadius: '12px', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: '20%', left: '30%', width: '10px', height: '10px', background: '#00f0ff', borderRadius: '50%', boxShadow: '0 0 10px #00f0ff' }} />
                            <div style={{ position: 'absolute', top: '60%', left: '70%', width: '10px', height: '10px', background: '#5050ff', borderRadius: '50%', boxShadow: '0 0 10px #5050ff' }} />
                            <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(0, 240, 255, 0.05)', borderStyle: 'dashed', borderRadius: '50%', transform: 'scale(0.8)' }} />
                            <div style={{ position: 'absolute', inset: '20px', display: 'flex', alignItems: 'center', justifyCenter: 'center', opacity: 0.1 }}>
                                <Binary size={100} />
                            </div>
                        </div>
                    </motion.div>
                </motion.aside>
            </div>

            <Link href="/">
                <motion.div 
                    className="back-btn" 
                    variants={itemVariants} 
                    style={{ position: 'fixed', bottom: '40px', left: '40px', padding: '10px 20px', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', border: '1px solid var(--lab-border)', borderRadius: '30px', fontSize: '0.75rem', fontWeight: 800, color: '#00f0ff', cursor: 'pointer', zIndex: 100 }}
                    whileHover={{ scale: 1.05, background: 'rgba(0, 240, 255, 0.1)' }}
                >
                    &larr; RETURN TO COMMAND
                </motion.div>
            </Link>

            <style jsx>{`
                .back-btn { transition: all 0.3s ease; }
            `}</style>
        </motion.div>
    );
}

'use client';
import Link from 'next/link';
import ScrollReveal from '../Effects/ScrollReveal';
import ParallaxLayer from '../Effects/ParallaxLayer';

export default function LandingClient() {
    return (
        <div className="landing-container">
            <section className="hero-section">
                <div className="hero-content">
                    <ScrollReveal direction="down" delay={0.1}>
                        <div className="badge-pill">v2.0 PROTOCOL ONLINE</div>
                    </ScrollReveal>
                    <ScrollReveal direction="up" delay={0.2}>
                        <h1 className="glitch-text" data-text="BUILD THE IMPOSSIBLE">BUILD THE IMPOSSIBLE</h1>
                    </ScrollReveal>
                    <ScrollReveal direction="up" delay={0.3}>
                        <p className="hero-desc">
                            The next-generation site construction protocol. 
                            Deploy reactive, high-performance digital architectures in seconds.
                            No compiling. No waiting. Just efficient code.
                        </p>
                    </ScrollReveal>
                    <ScrollReveal direction="up" delay={0.4}>
                        <div className="hero-actions">
                            <Link href="/mr-build/dashboard" className="btn-primary">
                                INITIALIZE SYSTEM
                            </Link>
                            <Link href="#features" className="btn-secondary">
                                READ DOCS
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
                <div className="hero-visual">
                    <ParallaxLayer offset={-0.1}>
                        <div className="code-block glass">
                            <div className="window-bar">
                                <span className="dot red"></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>
                            </div>
                            <pre>
                                <code>
    <span className="keyword">deploy</span> <span className="string">&quot;my-super-site&quot;</span><br/>
    <span className="comment">{'// Initializing quantum render...'}</span><br/>
    <span className="success">✓ Core Loaded (0.2s)</span><br/>
    <span className="success">✓ Assets Optimized</span><br/>
    <span className="highlight">&gt;&gt; SITE LIVE AT /s/my-super-site</span>
                                </code>
                            </pre>
                        </div>
                    </ParallaxLayer>
                </div>
            </section>

            <section className="features-section" id="features">
                <ScrollReveal direction="up" delay={0.1}>
                    <div className="feature-card glass">
                        <div className="f-icon">⚡</div>
                        <h3>Instant Propagation</h3>
                        <p>Changes go live globally in sub-millisecond time. Powered by our proprietary edge network.</p>
                    </div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.2}>
                    <div className="feature-card glass">
                        <div className="f-icon">🏗️</div>
                        <h3>Visual Architect</h3>
                        <p>Drag, drop, and configure complex components. React-based architecture under the hood.</p>
                    </div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.3}>
                    <div className="feature-card glass">
                        <div className="f-icon">🛡️</div>
                        <h3>Enterprise Security</h3>
                        <p>Built-in firewalls, DDOS protection, and automated SSL certification for every node.</p>
                    </div>
                </ScrollReveal>
            </section>

            <section className="stats-section">
                <div className="stat">
                    <h2>100%</h2>
                    <span>Uptime</span>
                </div>
                <div className="stat">
                    <h2>0.1s</h2>
                    <span>Latency</span>
                </div>
                <div className="stat">
                    <h2>∞</h2>
                    <span>Scale</span>
                </div>
            </section>

            <section className="cta-section">
                <h2>READY TO DEPLOY?</h2>
                <Link href="/mr-build/login" className="btn-glow-large">GRANT ACCESS</Link>
            </section>

            <style jsx>{`
                .landing-container {
                    color: var(--text);
                    background: #000;
                }
                
                /* Hero */
                .hero-section {
                    min-height: 90vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 80px;
                    padding: var(--section-padding) 20px;
                    max-width: 1400px;
                    margin: 0 auto;
                }
                .hero-content { flex: 1; text-align: left; }
                .badge-pill {
                    display: inline-block;
                    background: rgba(0, 240, 255, 0.05);
                    color: var(--primary);
                    padding: 8px 20px;
                    border-radius: 40px;
                    font-size: 0.75rem;
                    font-weight: 900;
                    margin-bottom: 25px;
                    border: 1px solid rgba(0, 240, 255, 0.2);
                    letter-spacing: 2px;
                    font-family: 'Orbitron', sans-serif;
                }
                h1 {
                    font-family: 'Orbitron', sans-serif;
                    font-size: clamp(3rem, 8vw, 5rem);
                    line-height: 1;
                    margin-bottom: 25px;
                    font-weight: 900;
                }
                .hero-desc {
                    font-size: 1.2rem;
                    color: var(--text-dim);
                    line-height: 1.7;
                    margin-bottom: 45px;
                    max-width: 550px;
                }
                .hero-actions { display: flex; gap: 20px; }
                
                /* Visual */
                .hero-visual { flex: 1.2; display: flex; justify-content: center; position: relative; }
                .hero-visual::before {
                    content: '';
                    position: absolute;
                    width: 150%;
                    height: 150%;
                    background: radial-gradient(circle, rgba(0, 240, 255, 0.1), transparent 70%);
                    top: 50%; left: 50%; transform: translate(-50%, -50%);
                    z-index: -1;
                }
                .code-block {
                    background: var(--glass-bg);
                    backdrop-filter: blur(var(--glass-blur));
                    border: 1px solid var(--glass-border);
                    border-radius: 24px;
                    padding: 35px;
                    width: 100%;
                    max-width: 550px;
                    box-shadow: var(--glass-shadow);
                    transform: perspective(1000px) rotateY(-15deg) rotateX(5deg);
                }
                .window-bar { display: flex; gap: 10px; margin-bottom: 25px; }
                .dot { width: 12px; height: 12px; border-radius: 50%; }
                .red { background: #ff5f56; } .yellow { background: #ffbd2e; } .green { background: #27c93f; }
                pre { font-family: 'JetBrains Mono', monospace; font-size: 0.95rem; line-height: 1.6; color: var(--text-dim); }
                .keyword { color: #c678dd; font-weight: bold; } .string { color: #98c379; } .comment { color: #5c6370; font-style: italic; }
                .success { color: var(--primary); } .highlight { color: #e5c07b; }

                /* Features */
                .features-section {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 30px;
                    padding: var(--section-padding) 20px;
                    max-width: 1400px;
                    margin: 0 auto;
                }
                .feature-card {
                    padding: 50px 40px;
                    border-radius: 30px;
                    transition: all 0.4s var(--ease-out-expo);
                }
                .feature-card:hover { 
                    transform: translateY(-15px); 
                    border-color: var(--primary);
                    background: rgba(0, 240, 255, 0.05);
                }
                .f-icon { font-size: 3rem; margin-bottom: 30px; display: block; }
                .feature-card h3 { margin-bottom: 15px; font-family: 'Orbitron', sans-serif; font-size: 1.5rem; font-weight: 900; }
                .feature-card p { color: var(--text-dim); font-size: 1rem; line-height: 1.7; }

                /* Stats */
                .stats-section {
                    display: flex;
                    justify-content: space-around;
                    padding: 100px 20px;
                    border-top: 1px solid var(--glass-border);
                    border-bottom: 1px solid var(--glass-border);
                    background: rgba(255, 255, 255, 0.01);
                }
                .stat { text-align: center; }
                .stat h2 { 
                    font-size: 4rem; 
                    font-weight: 900; 
                    color: var(--primary); 
                    margin: 0; 
                    font-family: 'Orbitron', sans-serif;
                    text-shadow: 0 0 30px rgba(0, 240, 255, 0.3);
                }
                .stat span { color: var(--text-dim); font-size: 0.85rem; letter-spacing: 3px; text-transform: uppercase; font-weight: 950; }

                /* CTA */
                .cta-section {
                    text-align: center;
                    padding: 150px 20px;
                    position: relative;
                    overflow: hidden;
                }
                .cta-section h2 { 
                    font-size: clamp(2.5rem, 6vw, 4rem); 
                    font-family: 'Orbitron', sans-serif; 
                    margin-bottom: 50px; 
                    font-weight: 900;
                }

                @media (max-width: 1024px) {
                    .hero-section { flex-direction: column-reverse; text-align: center; gap: 60px; }
                    .hero-visual { width: 100%; }
                    .hero-actions { justify-content: center; }
                    .features-section { grid-template-columns: 1fr; }
                    .hero-desc { margin-left: auto; margin-right: auto; }
                    .code-block { transform: none; margin: 0 auto; }
                }
            `}</style>
        </div>
    );
}

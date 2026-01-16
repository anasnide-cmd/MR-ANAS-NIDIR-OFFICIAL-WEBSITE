'use client';
import Link from 'next/link';

export default function BuildLandingPage() {
    return (
        <div className="landing-container">
            <section className="hero-section">
                <div className="hero-content">
                    <div className="badge-pill">v2.0 PROTOCOL ONLINE</div>
                    <h1 className="glitch-text" data-text="BUILD THE IMPOSSIBLE">BUILD THE IMPOSSIBLE</h1>
                    <p className="hero-desc">
                        The next-generation site construction protocol. 
                        Deploy reactive, high-performance digital architectures in seconds.
                        No compiling. No waiting. Just efficient code.
                    </p>
                    <div className="hero-actions">
                        <Link href="/mr-build/dashboard" className="btn-primary">
                            INITIALIZE SYSTEM
                        </Link>
                        <Link href="#features" className="btn-secondary">
                            READ DOCS
                        </Link>
                    </div>
                </div>
                <div className="hero-visual">
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
                </div>
            </section>

            <section className="features-section" id="features">
                <div className="feature-card glass">
                    <div className="f-icon">⚡</div>
                    <h3>Instant Propagation</h3>
                    <p>Changes go live globally in sub-millisecond time. Powered by our proprietary edge network.</p>
                </div>
                <div className="feature-card glass">
                    <div className="f-icon">🏗️</div>
                    <h3>Visual Architect</h3>
                    <p>Drag, drop, and configure complex components. React-based architecture under the hood.</p>
                </div>
                <div className="feature-card glass">
                    <div className="f-icon">🛡️</div>
                    <h3>Enterprise Security</h3>
                    <p>Built-in firewalls, DDOS protection, and automated SSL certification for every node.</p>
                </div>
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
                    color: #fff;
                }
                
                /* Hero */
                .hero-section {
                    min-height: 80vh;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 50px;
                    padding: 40px 0;
                }
                .hero-content { flex: 1; }
                .badge-pill {
                    display: inline-block;
                    background: rgba(0, 240, 255, 0.1);
                    color: #00f0ff;
                    padding: 5px 15px;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    margin-bottom: 20px;
                    border: 1px solid rgba(0, 240, 255, 0.2);
                }
                h1 {
                    font-family: var(--font-orbitron);
                    font-size: 3.5rem;
                    line-height: 1.1;
                    margin-bottom: 20px;
                    background: linear-gradient(to right, #fff, #aaa);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .hero-desc {
                    font-size: 1.1rem;
                    opacity: 0.7;
                    line-height: 1.6;
                    margin-bottom: 40px;
                    max-width: 500px;
                }
                .hero-actions { display: flex; gap: 20px; }
                .btn-primary {
                    padding: 15px 30px;
                    background: #00f0ff;
                    color: #000;
                    font-weight: 800;
                    text-decoration: none;
                    border-radius: 10px;
                    box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
                    transition: transform 0.2s;
                }
                .btn-primary:hover { transform: translateY(-2px); }
                .btn-secondary {
                    padding: 15px 30px;
                    background: transparent;
                    color: #fff;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    font-weight: 700;
                    text-decoration: none;
                    border-radius: 10px;
                    transition: all 0.2s;
                }
                .btn-secondary:hover { border-color: #fff; background: rgba(255,255,255,0.05); }

                /* Visual */
                .hero-visual { flex: 1; display: flex; justify-content: center; }
                .code-block {
                    background: rgba(10, 10, 10, 0.8);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 15px;
                    padding: 20px;
                    width: 100%;
                    max-width: 450px;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                    transform: rotateY(-10deg) rotateX(5deg);
                    transform-style: preserve-3d;
                }
                .window-bar { display: flex; gap: 8px; margin-bottom: 20px; }
                .dot { width: 12px; height: 12px; border-radius: 50%; }
                .red { background: #ff5f56; } .yellow { background: #ffbd2e; } .green { background: #27c93f; }
                pre { font-family: monospace; font-size: 0.9rem; line-height: 1.5; color: #ccc; }
                .keyword { color: #c678dd; } .string { color: #98c379; } .comment { color: #5c6370; }
                .success { color: #00f0ff; } .highlight { color: #e5c07b; }

                /* Features */
                .features-section {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 30px;
                    margin: 80px 0;
                }
                .feature-card {
                    padding: 30px;
                    border-radius: 20px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    transition: transform 0.3s;
                }
                .feature-card:hover { transform: translateY(-10px); background: rgba(255, 255, 255, 0.05); }
                .f-icon { font-size: 2.5rem; margin-bottom: 20px; }
                .feature-card h3 { margin-bottom: 10px; font-family: var(--font-orbitron); }
                .feature-card p { opacity: 0.6; font-size: 0.9rem; line-height: 1.6; }

                /* Stats */
                .stats-section {
                    display: flex;
                    justify-content: space-around;
                    padding: 60px 0;
                    border-top: 1px solid rgba(255,255,255,0.05);
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }
                .stat { text-align: center; }
                .stat h2 { font-size: 3rem; font-weight: 900; color: #00f0ff; margin: 0; }
                .stat span { opacity: 0.5; font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase; }

                /* CTA */
                .cta-section {
                    text-align: center;
                    padding: 100px 0;
                }
                .cta-section h2 { font-size: 2.5rem; font-family: var(--font-orbitron); margin-bottom: 40px; }
                .btn-glow-large {
                    padding: 20px 50px;
                    font-size: 1.2rem;
                    background: #00f0ff;
                    color: #000;
                    text-decoration: none;
                    font-weight: 900;
                    border-radius: 50px;
                    box-shadow: 0 0 40px rgba(0, 240, 255, 0.4);
                    transition: all 0.3s;
                }
                .btn-glow-large:hover { box-shadow: 0 0 80px rgba(0, 240, 255, 0.6); transform: scale(1.05); }

                @media (max-width: 1024px) {
                    .hero-section { flex-direction: column-reverse; text-align: center; }
                    .hero-visual { width: 100%; }
                    .hero-actions { justify-content: center; }
                    .features-section { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
}

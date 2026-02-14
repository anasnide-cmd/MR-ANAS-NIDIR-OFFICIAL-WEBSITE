'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import ScrollReveal from '../Effects/ScrollReveal';
import ShinyText from '../ReactBits/ShinyText';
import HyperButton from '../Effects/HyperButton';
import QuantumCore from '../Effects/QuantumCore';
import CustomCursor from '../Effects/CustomCursor';
import LensEffects from '../Effects/LensEffects';

// High-performance Particle Component
const Starfield = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        const particles = [];
        for (let i = 0; i < 150; i++) {
            particles.push({
                x: Math.random() * canvas.width - canvas.width / 2,
                y: Math.random() * canvas.height - canvas.height / 2,
                z: Math.random() * canvas.width,
                size: Math.random() * 2,
                speed: Math.random() * 2 + 1
            });
        }

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(0, 240, 255, 0.4)';

            particles.forEach(p => {
                p.z -= p.speed;
                if (p.z <= 0) p.z = canvas.width;

                const k = 128 / p.z;
                const px = p.x * k + canvas.width / 2;
                const py = p.y * k + canvas.height / 2;

                if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
                    const size = (1 - p.z / canvas.width) * 3;
                    ctx.beginPath();
                    ctx.arc(px, py, size, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

// 3D Motion Card Component
const PortfolioCard = ({ proj, index }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <ScrollReveal direction="up" delay={0.1 * index}>
            <Link href={proj.link} className="no-underline block group">
                <motion.div
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    className="relative bg-white/5 border border-white/10 rounded-sm p-10 transition-colors duration-500 group-hover:bg-primary/5 group-hover:border-primary/50 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                    
                    <div className="flex justify-between items-center mb-10" style={{ transform: "translateZ(30px)" }}>
                        <span className="text-4xl">{proj.icon}</span>
                        <span className="text-[0.6rem] tracking-[3px] opacity-40 font-bold uppercase">{proj.tag}</span>
                    </div>

                    <h3 className="font-orbitron text-4xl font-black mb-10" style={{ transform: "translateZ(50px)" }}>
                        {proj.title}
                    </h3>

                    <div className="flex items-center gap-4 mb-5" style={{ transform: "translateZ(20px)" }}>
                        <div className="flex-1 h-[2px] bg-white/10 relative">
                            <motion.div 
                                className="absolute left-0 h-full shadow-[0_0_10px_var(--color)]"
                                style={{ width: '85%', backgroundColor: proj.color, '--color': proj.color }}
                            />
                        </div>
                        <span className="text-[0.6rem] font-black tracking-widest opacity-50">OPERATIONAL</span>
                    </div>

                    <div className="font-orbitron text-[0.6rem] tracking-[3px] opacity-30 mt-10 font-black" style={{ transform: "translateZ(20px)" }}>
                        OPEN ACCESS // 01
                    </div>
                </motion.div>
            </Link>
        </ScrollReveal>
    );
};

export default function PortfolioClient() {
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => setIsLoaded(true), []);

    const projects = [
        { title: "NEXENGINE", tag: "INFRASTRUCTURE", icon: "⚡", link: "/mr-build", color: "#00f0ff" },
        { title: "NEX AI", tag: "INTELLIGENCE", icon: "🤖", link: "/nex-ai", color: "#a000ff" },
        { title: "MR BUILD", tag: "SAAS ENGINE", icon: "🏗️", link: "/mr-build", color: "#00f0ff" },
        { title: "SAVOIRPEDIA", tag: "ARCHIVES", icon: "📚", link: "/savoirpedia", color: "#ffd700" }
    ];

    return (
        <div className="min-h-screen bg-black text-white font-exo2 relative overflow-x-hidden">
            <LensEffects />
            <CustomCursor />
            <QuantumCore />
            
            {/* Post Processing Overlays */}
            <div className="fixed inset-0 pointer-events-none z-[1000]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay" />
            </div>
            
            <Starfield />

            {/* CINEMATIC HERO */}
            <header className="h-screen flex items-center justify-center relative z-10 overflow-hidden">
                <div className="absolute w-[600px] h-[300px] bg-primary/10 blur-[80px] animate-pulse-slow" />
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="relative z-20 text-center"
                >
                    {/* Opening Lines */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px]">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute -top-32 left-0 h-[1px] bg-primary"
                        />
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute -bottom-32 right-0 h-[1px] bg-primary"
                        />
                    </div>

                    <div className="flex flex-col items-center">
                        <motion.span 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 0.6, y: 0 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="font-orbitron font-black tracking-[5px] text-[0.7rem] text-primary mb-5"
                        >
                            SYSTEM ARCHITECT // v4.0
                        </motion.span>
                        
                        <h1 className="font-orbitron text-[3rem] md:text-[8rem] font-black tracking-tighter leading-[0.9] flex justify-center overflow-hidden mb-5">
                            {["A", "N", "A", "S", " ", "N", "I", "D", "I", "R"].map((char, i) => (
                                <motion.span 
                                    key={i}
                                    initial={{ y: 200, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ 
                                        delay: i * 0.05, 
                                        duration: 0.8, 
                                        ease: [0.16, 1, 0.3, 1] 
                                    }}
                                    className="inline-block"
                                >
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>
                            ))}
                        </h1>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            transition={{ delay: 1.5, duration: 1 }}
                            className="text-base md:text-xl tracking-[12px] uppercase"
                        >
                            REDEFINING DIGITAL SOVEREIGNTY
                        </motion.div>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 1 }}
                        className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-5"
                    >
                        <div className="w-[1px] h-20 bg-gradient-to-b from-primary to-transparent" />
                        <span className="text-[0.6rem] tracking-widest font-bold opacity-50">SCROLL TO INITIALIZE</span>
                    </motion.div>
                </motion.div>
            </header>

            {/* PROJECTS SECTION */}
            <section id="projects" className="py-24 px-10 max-w-[1400px] mx-auto relative z-10">
                <div className="absolute top-0 right-10 text-[10vw] font-orbitron font-black opacity-[0.03] whitespace-nowrap pointer-events-none uppercase">
                    CRAFTING FUTURES // CRAFTING FUTURES
                </div>

                <div className="mb-20">
                    <h2 className="font-orbitron text-2xl tracking-[5px] font-black">CORE PROJECTS</h2>
                    <div className="w-16 h-[2px] bg-primary mt-4" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {projects.map((proj, i) => (
                        <PortfolioCard key={i} proj={proj} index={i} />
                    ))}
                </div>
            </section>

            {/* VISION SECTION */}
            <section className="py-48 relative overflow-hidden">
                <div className="absolute w-[200%] left-[-50%] top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none font-orbitron text-[15vw] font-black uppercase overflow-hidden flex flex-col">
                    <div className="whitespace-nowrap animate-[slide_60s_linear_infinite]">SIMPLICITY IS POWER • SIMPLICITY IS POWER •</div>
                    <div className="whitespace-nowrap animate-[slide_60s_linear_infinite_reverse] text-primary">BUILD THE FUTURE • BUILD THE FUTURE •</div>
                </div>

                <div className="relative z-10 text-center max-w-[900px] mx-auto px-5">
                    <ScrollReveal direction="up">
                        <div className="w-32 h-32 border border-primary/40 rounded-full mx-auto mb-16 animate-ping opacity-20" />
                        <p className="text-3xl md:text-4xl font-light leading-relaxed font-orbitron mb-10">
                            &quot;The destiny of humanity is entwined with the machines we create. We must ensure those machines serve our freedom.&quot;
                        </p>
                        <div className="font-orbitron text-[0.8rem] tracking-[4px] text-primary/80 font-bold uppercase">
                            ANAS NIDIR // FOUNDER
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* TERMINAL CTA */}
            <section className="py-32 px-5 flex justify-center">
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="w-[600px] max-w-full rounded-xl bg-[#0a0a0a]/80 border border-primary/20 shadow-2xl overflow-hidden backdrop-blur-xl"
                >
                    <div className="px-5 py-3 bg-white/5 flex justify-between items-center border-b border-white/5">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                        </div>
                        <span className="text-[0.7rem] font-mono opacity-50">nexus_uplink.sh</span>
                    </div>
                    <div className="p-8 font-mono text-sm leading-relaxed">
                        <div className="mb-2 text-white">
                            <span className="text-primary mr-2">&gt;</span>nidir --status check
                        </div>
                        <div className="mb-6 text-white/50">ALL SYSTEMS NOMINAL. READY FOR EXPANSION.</div>
                        <div className="mb-2 text-white">
                            <span className="text-primary mr-2">&gt;</span>nidir --contact
                        </div>
                        <div>
                            <a href="mailto:ceo@anasnidir.com" className="text-primary font-bold border-b border-primary hover:opacity-70 transition-opacity uppercase tracking-widest">
                                INITIATE UPLINK
                            </a>
                        </div>
                    </div>
                </motion.div>
            </section>

            <style jsx global>{`
                @keyframes slide {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
}

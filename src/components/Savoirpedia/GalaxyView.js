import { useRef, useEffect, useState } from 'react';
import { X, Maximize2, Minimize2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GalaxyView({ articles, onClose }) {
    const canvasRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrame;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        // 1. Initialize Nodes (Articles)
        const nodes = articles.map((art, idx) => ({
            ...art,
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: art.title.length < 10 ? 4 : 6,
            color: '#00f0ff'
        }));

        // 2. Map Connections (based on categories for now)
        const connections = [];
        nodes.forEach((node, i) => {
            nodes.forEach((other, j) => {
                if (i < j && node.category === other.category) {
                    connections.push([i, j]);
                }
            });
        });

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Background Glow
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw Connections
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.1)';
            ctx.lineWidth = 1;
            connections.forEach(([i, j]) => {
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.stroke();
            });

            // Update & Draw Nodes
            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;

                // Wall Bounce
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = node.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = node.color;
                ctx.fill();
                ctx.shadowBlur = 0;

                // Labels
                ctx.fillStyle = 'rgba(255,255,255,0.6)';
                ctx.font = '10px Orbitron';
                ctx.fillText(node.title.toUpperCase(), node.x + 10, node.y + 4);
            });

            animationFrame = requestAnimationFrame(draw);
        };

        draw();

        const handleClick = (e) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            nodes.forEach(node => {
                const dist = Math.sqrt((mouseX - node.x)**2 + (mouseY - node.y)**2);
                if (dist < node.radius + 10) {
                    router.push(`/savoirpedia/post/${node.slug}`);
                    onClose();
                }
            });
        };
        canvas.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrame);
            canvas.removeEventListener('click', handleClick);
        };
    }, [articles, router, onClose]);

    return (
        <div className={`galaxy-overlay ${isFullscreen ? 'fullscreen' : ''}`}>
            <div className="galaxy-controls">
                <button onClick={() => setIsFullscreen(!isFullscreen)}>
                    {isFullscreen ? <Minimize2 size={18}/> : <Maximize2 size={18}/>}
                </button>
                <button onClick={onClose}><X size={18}/></button>
            </div>
            <canvas ref={canvasRef} />
            <style jsx>{`
                .galaxy-overlay {
                    position: fixed; inset: 50px; z-index: 10000;
                    background: #000; border: 1px solid #333; border-radius: 20px;
                    overflow: hidden; box-shadow: 0 0 100px rgba(0, 240, 255, 0.2);
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .galaxy-overlay.fullscreen { inset: 0; border-radius: 0; border: none; }
                .galaxy-controls {
                    position: absolute; top: 20px; right: 20px; z-index: 11;
                    display: flex; gap: 15px;
                }
                .galaxy-controls button {
                    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.1);
                    color: #fff; width: 40px; height: 40px; border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer; backdrop-filter: blur(10px); transition: all 0.2s;
                }
                .galaxy-controls button:hover { background: #00f0ff; color: #000; transform: scale(1.1); }
                canvas { display: block; cursor: crosshair; }
            `}</style>
        </div>
    );
}

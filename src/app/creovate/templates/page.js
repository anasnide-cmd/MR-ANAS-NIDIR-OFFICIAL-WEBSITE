'use client';
import { useRouter } from 'next/navigation';
import { Palette, Sparkles, LayoutPanelTop, PlaySquare, Gamepad2, Layers } from 'lucide-react';
import { TEMPLATES_DATA } from './data';

export default function CreovateTemplatesPage() {
    const router = useRouter();

    const handleSelectTemplate = (id) => {
        router.push(`/creovate?t=${id}`);
    };

    return (
        <main className="templates-page custom-scrollbar">
            <header className="templates-hero">
                <h1>Start Inspired.</h1>
                <p>Choose from our premium, hand-crafted templates to jumpstart your next design on Creovate.</p>
                <div className="hero-glow"></div>
            </header>

            <div className="templates-container">
                {Object.entries(TEMPLATES_DATA).map(([category, items]) => (
                    <section key={category} className="template-section">
                        <div className="section-header">
                            {category === 'Social' && <LayoutPanelTop size={24} color="#00f0ff" />}
                            {category === 'Presentations' && <PlaySquare size={24} color="#ffca28" />}
                            {category === 'Gaming' && <Gamepad2 size={24} color="#ff4444" />}
                            {category === 'Posters' && <Layers size={24} color="#b19cd9" />}
                            <h2>{category}</h2>
                        </div>
                        
                        <div className="horizontal-scroll">
                            {items.map(template => (
                                <div 
                                    key={template.id} 
                                    className="template-card group"
                                    onClick={() => handleSelectTemplate(template.id)}
                                >
                                    <div className="preview-container">
                                        <div 
                                            className="preview-scaler" 
                                            style={{ backgroundColor: template.bg }}
                                        >
                                            {/* We just render the raw elements directly scaled down for a pure CSS preview! */}
                                            {template.elements.map(el => (
                                                <div 
                                                    key={el.id}
                                                    style={{
                                                        position: 'absolute',
                                                        left: el.x, top: el.y,
                                                        width: el.width, height: el.height,
                                                        backgroundColor: el.type === 'shape' ? el.color : 'transparent',
                                                        backgroundImage: el.type === 'image' ? `url(${el.url})` : 'none',
                                                        backgroundSize: 'cover',
                                                        borderRadius: el.shapeType === 'circle' ? '50%' : (el.shapeType === 'rounded' ? '16px' : '0'),
                                                        opacity: el.opacity ?? 1,
                                                        zIndex: el.zIndex || 1,
                                                        clipPath: el.shapeType === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'
                                                    }}
                                                >
                                                    {el.type === 'text' && (
                                                        <div style={{
                                                            color: el.color,
                                                            fontSize: `${el.fontSize}px`,
                                                            fontFamily: el.fontFamily || 'inherit',
                                                            fontWeight: el.fontWeight || 'normal',
                                                            fontStyle: el.fontStyle || 'normal',
                                                            textAlign: el.textAlign || 'left',
                                                            width: '100%', height: '100%',
                                                            padding: '4px'
                                                        }}>
                                                            {el.content}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="card-info">
                                        <h3>{template.name}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            <style jsx>{`
                .templates-page {
                    min-height: 100vh;
                    background: #050505;
                    color: #fff;
                    font-family: var(--font-exo2);
                    padding-bottom: 100px;
                }

                .templates-hero {
                    position: relative;
                    padding: 80px 20px;
                    text-align: center;
                    overflow: hidden;
                    border-bottom: 1px solid rgba(255, 215, 0, 0.1);
                }
                
                .templates-hero h1 {
                    font-size: 4rem;
                    font-family: var(--font-orbitron);
                    background: linear-gradient(135deg, #fff, #ffca28);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 20px;
                }
                
                .templates-hero p {
                    font-size: 1.2rem;
                    color: #888;
                    max-width: 600px;
                    margin: 0 auto;
                }
                
                .hero-glow {
                    position: absolute;
                    top: 50%; left: 50%;
                    transform: translate(-50%, -50%);
                    width: 600px; height: 300px;
                    background: radial-gradient(ellipse at center, rgba(255, 215, 0, 0.15) 0%, transparent 70%);
                    pointer-events: none;
                    z-index: 0;
                }

                .templates-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 40px 20px;
                }

                .template-section {
                    margin-bottom: 60px;
                }

                .section-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 25px;
                }

                .section-header h2 {
                    font-size: 1.8rem;
                    font-weight: 600;
                    letter-spacing: 1px;
                }

                .horizontal-scroll {
                    display: flex;
                    gap: 25px;
                    overflow-x: auto;
                    padding-bottom: 20px;
                    scrollbar-width: thin;
                    scrollbar-color: rgba(255,215,0,0.3) transparent;
                }
                
                .horizontal-scroll::-webkit-scrollbar { height: 6px; }
                .horizontal-scroll::-webkit-scrollbar-thumb { background: rgba(255,215,0,0.3); border-radius: 4px; }

                .template-card {
                    flex: 0 0 300px;
                    background: #111;
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 12px;
                    overflow: hidden;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .template-card:hover {
                    transform: translateY(-5px);
                    border-color: rgba(255, 215, 0, 0.3);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                }

                .preview-container {
                    width: 100%;
                    height: 200px;
                    background: #000;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                /* We scale down the 1080x1080 canvas to fit inside the 300x200 card precisely */
                .preview-scaler {
                    width: 1080px;
                    height: 1080px;
                    transform: scale(0.185); 
                    transform-origin: center center;
                    position: absolute;
                    pointer-events: none;
                }

                .card-info {
                    padding: 15px 20px;
                    background: #151515;
                    border-top: 1px solid rgba(255,255,255,0.02);
                }

                .card-info h3 {
                    margin: 0;
                    font-size: 1.1rem;
                    color: #fff;
                    font-weight: 500;
                }
            `}</style>
        </main>
    );
}

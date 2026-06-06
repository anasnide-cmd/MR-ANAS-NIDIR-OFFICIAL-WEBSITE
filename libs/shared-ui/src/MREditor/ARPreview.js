'use client';
import { Canvas } from '@react-three/fiber';
import { 
    OrbitControls, 
    Html, 
    Environment, 
    ContactShadows, 
    Float, 
    RoundedBox, 
    MeshTransmissionMaterial,
    Grid
} from '@react-three/drei';
import { Suspense } from 'react';

function PhoneModel({ children }) {
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group rotation={[0, 0, 0]}>
                {/* Phone Chassis - Premium Rounded Frame */}
                <RoundedBox args={[3.4, 6.7, 0.4]} radius={0.3} smoothness={4}>
                    <meshPhysicalMaterial 
                        color="#111" 
                        metalness={1} 
                        roughness={0.05} 
                        clearcoat={1} 
                        reflectivity={1}
                        emissive="#00f0ff"
                        emissiveIntensity={0.02}
                    />
                </RoundedBox>
                
                {/* Screen Area (Inset) */}
                <mesh position={[0, 0, 0.2]}>
                    <planeGeometry args={[3.1, 6.4]} />
                    <meshBasicMaterial color="#000" />
                </mesh>

                {/* IFRAME TEXTURE - Razor Sharp scaling (3.4 units / 375px = ~0.009) */}
                <Html
                    transform
                    position={[0, 0, 0.201]}
                    occlude
                    scale={0.009}
                    style={{
                        width: '375px',
                        height: '812px',
                        backgroundColor: 'white',
                        borderRadius: '32px',
                        overflow: 'hidden',
                        boxShadow: '0 0 40px rgba(0, 240, 255, 0.3)',
                        pointerEvents: 'auto'
                    }}
                >
                    <div className="inner-viewport">
                        {children}
                        <div className="hologram-scanline"></div>
                    </div>
                </Html>
                
                {/* Glass Screen Overlay - Premium Reflection */}
                <mesh position={[0, 0, 0.202]}>
                    <planeGeometry args={[3.3, 6.6]} />
                    <meshPhysicalMaterial 
                        transparent 
                        opacity={0.12} 
                        roughness={0} 
                        metalness={0.5} 
                        ior={1.5}
                        color="#fff" 
                    />
                </mesh>
                
                {/* Holographic Rim Glow */}
                <mesh position={[0, 0, -0.1]} scale={1.05}>
                    <RoundedBox args={[3.45, 6.75, 0.4]} radius={0.35} smoothness={4}>
                        <meshBasicMaterial color="#00f0ff" transparent opacity={0.02} side={2} />
                    </RoundedBox>
                </mesh>
            </group>
        </Float>
    );
}

export default function ARPreview({ url, srcDoc }) {
    return (
        <div className="ar-container">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
                <ambientLight intensity={1} />
                <spotLight position={[10, 20, 10]} angle={0.2} penumbra={1} intensity={5} />
                <pointLight position={[-10, -10, -10]} color="#00f0ff" intensity={3} />
                
                <Suspense fallback={null}>
                    <Environment preset="night" />
                    
                    <PhoneModel>
                        <iframe 
                            src={url} 
                            srcDoc={srcDoc}
                            style={{width: '100%', height: '100%', border: 'none'}}
                            title="AR Preview"
                            loading="lazy"
                        />
                    </PhoneModel>

                    {/* Spatial Floor Grid */}
                    <Grid 
                        position={[0, -5, 0]} 
                        args={[40, 40]} 
                        cellColor="#00f0ff" 
                        sectionColor="#ffffff" 
                        fadeDistance={25} 
                        fadeStrength={1}
                        infiniteGrid
                        opacity={0.1}
                    />

                    <ContactShadows 
                        position={[0, -4.9, 0]} 
                        opacity={0.8} 
                        scale={20} 
                        blur={2.5} 
                        far={10} 
                        color="#00f0ff"
                    />

                    <OrbitControls 
                        enableDamping={true}
                        dampingFactor={0.05}
                        minPolarAngle={Math.PI / 6} 
                        maxPolarAngle={Math.PI / 1.5} 
                        enableZoom={true} 
                        enablePan={false}
                        autoRotate={true}
                        autoRotateSpeed={0.8}
                    />
                </Suspense>
            </Canvas>
            
            <div className="ar-overlay">
                <div className="hologram-line"></div>
                <div className="overlay-content">
                    <div className="status-badge">LIVE HOLOGRAPHIC</div>
                    <h3>SPATIAL VIEWPORT</h3>
                    <p>360° INTERACTIVE INSPECTION</p>
                </div>
                <div className="hologram-line bottom"></div>
            </div>

            <style jsx>{`
                .ar-container {
                    width: 100%; height: 100%; position: relative;
                    background: radial-gradient(circle at center, #0a0a0a 0%, #000 100%);
                    overflow: hidden;
                }
                .inner-viewport {
                    width: 100%; height: 100%; position: relative;
                    pointer-events: auto;
                }
                .hologram-scanline {
                    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), 
                                linear-gradient(90deg, rgba(255, 12, 12, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
                    background-size: 100% 2px, 3px 100%;
                    pointer-events: none; z-index: 10;
                    opacity: 0.2;
                }
                .ar-overlay {
                    position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%);
                    width: 250px; pointer-events: none;
                }
                .hologram-line {
                    height: 1px; width: 100%;
                    background: linear-gradient(90deg, transparent, #00f0ff, transparent);
                    box-shadow: 0 0 10px #00f0ff;
                }
                .hologram-line.bottom { margin-top: 10px; }
                .overlay-content {
                    padding: 15px 0; text-align: center;
                    backdrop-filter: blur(10px);
                    background: rgba(0,0,0,0.4);
                }
                .status-badge {
                    display: inline-block; padding: 2px 8px; border-radius: 4px;
                    background: rgba(0, 240, 255, 0.1); color: #00f0ff;
                    font-size: 0.5rem; font-weight: 800; letter-spacing: 1px;
                    margin-bottom: 8px; border: 1px solid rgba(0, 240, 255, 0.2);
                }
                .ar-overlay h3 { 
                    margin: 0; font-family: 'Orbitron', sans-serif; 
                    letter-spacing: 3px; color: #fff; font-size: 0.8rem;
                    text-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
                }
                .ar-overlay p { margin: 5px 0 0; font-size: 0.6rem; color: #666; letter-spacing: 1px; }
            `}</style>
        </div>
    );
}

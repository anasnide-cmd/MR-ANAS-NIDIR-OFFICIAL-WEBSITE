'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, Environment, ContactShadows, Float } from '@react-three/drei';
import { Suspense } from 'react';

function PhoneModel({ children }) {
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group rotation={[0.1, 0, 0]}>
                {/* Phone Body - Metallic Frame */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[3.4, 6.7, 0.4]} />
                    <meshPhysicalMaterial 
                        color="#222" 
                        metalness={1} 
                        roughness={0.1} 
                        clearcoat={1} 
                        reflectivity={1}
                    />
                </mesh>
                
                {/* Screen Area (Inset) - Glossy Black */}
                <mesh position={[0, 0, 0.21]}>
                    <planeGeometry args={[3.2, 6.5]} />
                    <meshBasicMaterial color="#000" />
                </mesh>

                {/* IFRAME TEXTURE */}
                <Html
                    transform
                    position={[0, 0, 0.22]}
                    occlude
                    style={{
                        width: '375px',
                        height: '812px',
                        backgroundColor: 'white',
                        borderRadius: '32px',
                        overflow: 'hidden',
                        boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)'
                    }}
                    scale={0.0085}
                >
                    <div style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}>
                        {children}
                    </div>
                </Html>
                
                {/* Glow Effect around the phone */}
                <mesh position={[0, 0, -0.1]}>
                    <planeGeometry args={[4, 7.5]} />
                    <meshBasicMaterial color="#00f0ff" transparent opacity={0.03} />
                </mesh>
            </group>
        </Float>
    );
}

export default function ARPreview({ url, srcDoc }) {
    return (
        <div className="ar-container">
            <Canvas camera={{ position: [0, 0, 12], fov: 40 }}>
                <ambientLight intensity={0.2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
                <pointLight position={[-10, -10, -10]} color="#00f0ff" intensity={1} />
                
                <Suspense fallback={null}>
                    <Environment preset="night" />
                    <PhoneModel>
                        <iframe 
                            src={url} 
                            srcDoc={srcDoc}
                            style={{width: '100%', height: '100%', border: 'none'}}
                            title="AR Preview"
                        />
                    </PhoneModel>
                    <ContactShadows 
                        position={[0, -4.5, 0]} 
                        opacity={0.6} 
                        scale={15} 
                        blur={2} 
                        far={5} 
                        color="#00f0ff"
                    />
                    <OrbitControls 
                        minPolarAngle={Math.PI / 4} 
                        maxPolarAngle={Math.PI / 1.5} 
                        enableZoom={true} 
                        enablePan={false}
                        autoRotate={true}
                        autoRotateSpeed={0.5}
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

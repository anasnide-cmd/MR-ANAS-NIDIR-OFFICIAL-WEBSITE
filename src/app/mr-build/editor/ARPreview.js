'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';

function PhoneModel({ children }) {
    // We can use a simple box geometry for now if we don't have a GLTF
    // Or try to load a generic one from a CDN if permitted.
    // For reliability, we'll build a procedural "Phone" using BoxGeometry
    
    return (
        <group rotation={[0.1, 0, 0]}>
             {/* Phone Body */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[3.2, 6.5, 0.3]} />
                <meshPhysicalMaterial color="#111" metalness={0.8} roughness={0.2} clearcoat={1} />
            </mesh>
            
            {/* Screen Area (Inset) */}
            <mesh position={[0, 0, 0.16]}>
                <planeGeometry args={[3, 6.3]} />
                <meshBasicMaterial color="#000" />
            </mesh>

            {/* IFRAME TEXTURE */}
            <Html
                transform
                position={[0, 0, 0.17]}
                occlude
                style={{
                    width: '375px',
                    height: '812px',
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    overflow: 'hidden'
                }}
                scale={0.008} // Adjust scale to fit plane
            >
                <div style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
                    {children}
                </div>
            </Html>
        </group>
    );
}

export default function ARPreview({ url }) {
    return (
        <div className="ar-container">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                
                <Suspense fallback={null}>
                    <Environment preset="city" />
                    <PhoneModel>
                        <iframe 
                            src={url} 
                            style={{width: '100%', height: '100%', border: 'none'}}
                            title="AR Preview"
                        />
                    </PhoneModel>
                    <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
                    <OrbitControls minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.5} enableZoom={true} enablePan={false} />
                </Suspense>
            </Canvas>
            <div className="ar-overlay">
                <h3>HOLOGRAPHIC PREVIEW</h3>
                <p>Drag to Rotate • Scroll to Zoom</p>
            </div>
            <style jsx>{`
                .ar-container {
                    width: 100%; height: 100%; position: relative;
                    background: radial-gradient(circle at center, #1a1a1a 0%, #000 100%);
                }
                .ar-overlay {
                    position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
                    text-align: center; pointer-events: none; color: #fff;
                    background: rgba(0,0,0,0.5); padding: 10px 20px; border-radius: 20px;
                    border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(5px);
                }
                .ar-overlay h3 { margin: 0; font-family: 'Orbitron', sans-serif; letter-spacing: 2px; color: #00f0ff; font-size: 0.9rem; }
                .ar-overlay p { margin: 5px 0 0; font-size: 0.7rem; color: #888; }
            `}</style>
        </div>
    );
}

'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function CoreMesh() {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
        // Base rotation
        meshRef.current.rotation.y += delta * 0.2;
        
        // Mouse interaction (look at pointer)
        const { pointer } = state;
        const targetX = pointer.y * 0.5; // Invert axis for natural feel
        const targetY = pointer.x * 0.5;
        
        meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * delta * 2;
        meshRef.current.rotation.z += (targetY - meshRef.current.rotation.z) * delta * 2;

        // Pulsing effect
        const materials = Array.isArray(meshRef.current.material) ? meshRef.current.material : [meshRef.current.material];
        materials.forEach(mat => {
            if (mat.emissiveIntensity !== undefined) {
                mat.emissiveIntensity = 2 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
            }
        });
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.5}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial 
            color="#00f0ff" 
            wireframe 
            emissive="#00f0ff"
            emissiveIntensity={2}
            transparent
            opacity={0.6}
        />
      </mesh>
      {/* Outer Glow Shell */}
      <mesh scale={2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial 
            color="#00f0ff" 
            transparent 
            opacity={0.05} 
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
    const count = 500;
    const [positions, setPositions] = useState(new Float32Array(count * 3));
    const [opacity, setOpacity] = useState(new Float32Array(count));

    useEffect(() => {
        const pos = new Float32Array(count * 3);
        const op = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
            op[i] = Math.random();
        }
        setPositions(pos);
        setOpacity(op);
    }, []);

    const pointsRef = useRef();

    useFrame((state, delta) => {
        if(pointsRef.current) {
            pointsRef.current.rotation.y -= delta * 0.05;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial 
                size={0.05} 
                color="#ffffff" 
                transparent 
                opacity={0.4} 
                sizeAttenuation 
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default function SentientCore() {
  return (
    <div className="sentient-core-container">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
        <color attach="background" args={['#000000']} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />

        <Suspense fallback={null}>
            <CoreMesh />
            <ParticleField />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Suspense>
      </Canvas>
      
      <style jsx>{`
        .sentient-core-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            opacity: 0;
            animation: fadeIn 2s ease-out forwards;
        }
        @keyframes fadeIn {
            to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Fingerprint, 
    Activity, 
    ShieldCheck, 
    Zap, 
    Terminal, 
    ChevronLeft,
    Hand,
    MousePointer2,
    Pointer as PointerIcon,
    Scan
} from 'lucide-react';
import Link from 'next/link';
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import './HandGesture.css';

export default function HandGesturePage() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [handLandmarker, setHandLandmarker] = useState(null);
    const [status, setStatus] = useState('Initializing Vision Core...');
    const [loading, setLoading] = useState(true);
    const [activeGesture, setActiveGesture] = useState('NONE');
    const [confidence, setConfidence] = useState(0);
    const [landmarksVisible, setLandmarksVisible] = useState(true);
    const [error, setError] = useState(null);

    // Initialize MediaPipe HandLandmarker
    useEffect(() => {
        async function setupHandLandmarker() {
            try {
                setStatus('Loading Neural Models...');
                const vision = await FilesetResolver.forVisionTasks(
                    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
                );
                const landmarker = await HandLandmarker.createFromOptions(vision, {
                    baseOptions: {
                        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
                        delegate: "GPU"
                    },
                    runningMode: "VIDEO",
                    numHands: 2
                });
                setHandLandmarker(landmarker);
                setStatus('Neural Models Ready.');
                startWebcam();
            } catch (err) {
                console.error("MP Init Error:", err);
                setError("Failed to initialize Vision Core.");
                setLoading(false);
            }
        }
        setupHandLandmarker();
    }, []);

    const startWebcam = async () => {
        try {
            setStatus('Connecting to Camera...');
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 1280, height: 720, frameRate: { ideal: 30 } }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.addEventListener("loadeddata", () => {
                    setLoading(false);
                    setStatus('Uplink Synchronized.');
                });
            }
        } catch (err) {
            console.error("Webcam Error:", err);
            setError("Camera Access Denied.");
            setLoading(false);
        }
    };

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Main Detection Loop
    useEffect(() => {
        if (!handLandmarker || !videoRef.current) return;

        let lastVideoTime = -1;
        let animationFrameId;

        const renderLoop = () => {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            if (!video || !canvas || video.readyState !== 4) {
                animationFrameId = requestAnimationFrame(renderLoop);
                return;
            }

            const ctx = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            let startTimeMs = performance.now();
            if (lastVideoTime !== video.currentTime) {
                lastVideoTime = video.currentTime;
                const results = handLandmarker.detectForVideo(video, startTimeMs);

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                if (results.landmarks && results.landmarks.length > 0) {
                    setConfidence(results.worldLandmarks?.[0]?.[0]?.visibility || 0.95);
                    
                    results.landmarks.forEach(landmarks => {
                        // Detect Gesture
                        detectGesture(landmarks);

                        // Draw Landmarks
                        if (landmarksVisible) {
                            drawHand(ctx, landmarks);
                        }
                    });
                } else {
                    setActiveGesture('SEARCHING...');
                    setConfidence(0);
                }
            }

            animationFrameId = requestAnimationFrame(renderLoop);
        };

        renderLoop();
        return () => cancelAnimationFrame(animationFrameId);
    }, [handLandmarker, landmarksVisible]);

    const drawHand = (ctx, landmarks) => {
        // Draw Connections
        const connections = HandLandmarker.HAND_CONNECTIONS;
        ctx.strokeStyle = "#ff00ff";
        ctx.lineWidth = 3;
        connections.forEach(conn => {
            const start = landmarks[conn.start];
            const end = landmarks[conn.end];
            ctx.beginPath();
            ctx.moveTo(start.x * ctx.canvas.width, start.y * ctx.canvas.height);
            ctx.lineTo(end.x * ctx.canvas.width, end.y * ctx.canvas.height);
            ctx.stroke();
        });

        // Draw Joints
        ctx.fillStyle = "#fff";
        landmarks.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x * ctx.canvas.width, point.y * ctx.canvas.height, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#ff00ff";
            ctx.stroke();
        });
    };

    const detectGesture = (landmarks) => {
        // Advanced Gesture Logic
        // 0: Wrist, 4: Thumb Tip, 8: Index Tip, 12: Middle Tip, 16: Ring Tip, 20: Pinky Tip
        
        const thumbTip = landmarks[4];
        const indexTip = landmarks[8];
        const middleTip = landmarks[12];
        const ringTip = landmarks[16];
        const pinkyTip = landmarks[20];
        const wrist = landmarks[0];

        // Helper to check if finger is extended
        const isExtended = (tip, base) => tip.y < base.y - 0.1;

        const indexExtended = isExtended(indexTip, landmarks[6]);
        const middleExtended = isExtended(middleTip, landmarks[10]);
        const ringExtended = isExtended(ringTip, landmarks[14]);
        const pinkyExtended = isExtended(pinkyTip, landmarks[18]);

        // Detect PINCH (Thumb and Index near)
        const pinchDist = Math.hypot(thumbTip.x - indexTip.x, thumbTip.y - indexTip.y);
        
        if (pinchDist < 0.05) {
            setActiveGesture('PINCH / SELECT');
        } else if (!indexExtended && !middleExtended && !ringExtended && !pinkyExtended) {
            setActiveGesture('FIST / GRAB');
        } else if (indexExtended && !middleExtended && !ringExtended && !pinkyExtended) {
            setActiveGesture('POINT / NAVIGATE');
        } else if (indexExtended && middleExtended && ringExtended && pinkyExtended) {
            setActiveGesture('OPEN HAND');
        } else {
            setActiveGesture('ANALYZING...');
        }
    };

    return (
        <div className="gesture-container">
            <AnimatePresence>
                {loading && (
                    <motion.div 
                        className="vision-loader"
                        exit={{ opacity: 0 }}
                    >
                        <div className="loader-glow" />
                        <h2>{status}</h2>
                        <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>SYNCHRONIZING NEURAL HANDSHAKE...</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.main 
                className="vision-zone"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <div className="scanner-line" />
                <video 
                    ref={videoRef} 
                    className="video-feed" 
                    autoPlay 
                    playsInline 
                    muted 
                />
                <canvas ref={canvasRef} className="vision-canvas" />

                {error && (
                    <div className="error-overlay" style={{ position: 'absolute', inset: 0, zIndex: 200, background: 'rgba(5, 5, 10, 0.9)', backdropFilter: 'blur(40px)', display: 'flex', alignItems: 'center', justifyCenter: 'center', textAlign: 'center', padding: '40px' }}>
                        <div>
                            <ShieldCheck size={64} color="#ff5050" style={{ filter: 'drop-shadow(0 0 20px rgba(255, 80, 80, 0.4))' }} />
                            <h2 style={{ color: '#ff5050', marginTop: '20px', fontFamily: 'Orbitron', fontSize: '1.8rem' }}>UPLINK BLOCKED</h2>
                            <p style={{ opacity: 0.7, maxWidth: '400px', margin: '15px auto', lineHeight: '1.6' }}>
                                Neural handshake failed. The system was unable to establish a secure connection to your vision sensor.
                            </p>
                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '30px', fontSize: '0.85rem', textAlign: 'left' }}>
                                <strong style={{ color: '#fff' }}>HOW TO FIX:</strong>
                                <ul style={{ marginTop: '10px', color: '#aaa', paddingLeft: '20px' }}>
                                    <li>Click the 🔒 icon in your browser's address bar.</li>
                                    <li>Ensure "Camera" is set to "Allow".</li>
                                    <li>Refresh the page to re-initialize the uplink.</li>
                                </ul>
                            </div>
                            <button onClick={() => window.location.reload()} style={{ padding: '12px 30px', background: '#ff5050', color: '#fff', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 800, letterSpacing: '2px', boxShadow: '0 0 30px rgba(255, 80, 80, 0.3)' }}>
                                RETRY PROTOCOL
                            </button>
                        </div>
                    </div>
                )}

                <div className="vision-labels" style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 50, pointerEvents: 'none' }}>
                    <div className="lab-tag" style={{ background: 'rgba(255,0,255,0.1)', borderColor: '#ff00ff' }}>VISION CORE ACTIVE</div>
                </div>
            </motion.main>

            <aside className="telemetry-aside">
                <Link href="/lab">
                    <motion.div 
                        className="panel" 
                        whileHover={{ background: 'rgba(255,255,255,0.05)' }}
                        style={{ padding: '15px 25px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px', color: '#ff00ff', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem' }}
                    >
                        <ChevronLeft size={16} /> BACK TO LAB
                    </motion.div>
                </Link>

                <motion.div className="panel" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="panel-header"><Fingerprint size={16} /> GESTURE TELEMETRY</div>
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                        <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', fontWeight: 800 }}>ACTIVE PROTOCOL</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 950, color: '#fff', margin: '10px 0', fontFamily: 'Orbitron' }}>{activeGesture}</div>
                        <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', width: '100%' }}>
                            <motion.div 
                                style={{ height: '100%', background: '#ff00ff', borderRadius: '2px', boxShadow: '0 0 10px #ff00ff' }} 
                                animate={{ width: `${confidence * 100}%` }}
                            />
                        </div>
                        <div style={{ fontSize: '0.65rem', color: '#555', marginTop: '8px' }}>CONFIDENCE: {(confidence * 100).toFixed(1)}%</div>
                    </div>
                </motion.div>

                <motion.div className="panel" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="panel-header"><Hand size={16} /> GESTURE LIBRARY</div>
                    <ul className="gesture-list">
                        <li className={`gesture-item ${activeGesture.includes('FIST') ? 'active' : ''}`}>
                            <span className="gesture-name">FIST / GRAB</span>
                            <span className="status-pill">{activeGesture.includes('FIST') ? 'ACTIVE' : 'IDLE'}</span>
                        </li>
                        <li className={`gesture-item ${activeGesture.includes('POINT') ? 'active' : ''}`}>
                            <span className="gesture-name">POINT / NAV</span>
                            <span className="status-pill">{activeGesture.includes('POINT') ? 'ACTIVE' : 'IDLE'}</span>
                        </li>
                        <li className={`gesture-item ${activeGesture.includes('PINCH') ? 'active' : ''}`}>
                            <span className="gesture-name">PINCH / SELECT</span>
                            <span className="status-pill">{activeGesture.includes('PINCH') ? 'ACTIVE' : 'IDLE'}</span>
                        </li>
                        <li className={`gesture-item ${activeGesture.includes('OPEN') ? 'active' : ''}`}>
                            <span className="gesture-name">OPEN HAND</span>
                            <span className="status-pill">{activeGesture.includes('OPEN') ? 'ACTIVE' : 'IDLE'}</span>
                        </li>
                    </ul>
                </motion.div>

                <motion.div className="panel" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="panel-header"><Terminal size={16} /> NEURAL FEED</div>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}>
                        {isMounted && (
                            <>
                                {`[${new Date().toLocaleTimeString()}] HW_ACCEL_ACTIVE\n`}
                                {`[${new Date().toLocaleTimeString()}] HAND_DETECTION_SYNC\n`}
                                {`[${new Date().toLocaleTimeString()}] GESTURE_MAP_LOADED\n`}
                                <span style={{ color: '#ff00ff' }}>{`> Detected: ${activeGesture}\n`}</span>
                            </>
                        )}
                    </div>
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <button 
                            onClick={() => setLandmarksVisible(!landmarksVisible)} 
                            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.65rem', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            {landmarksVisible ? 'HIDE LANDMARKS' : 'SHOW LANDMARKS'}
                        </button>
                        <Activity size={12} color="#555" />
                    </div>
                </motion.div>
            </aside>
        </div>
    );
}

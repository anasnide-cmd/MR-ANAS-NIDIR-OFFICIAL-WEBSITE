'use client';
import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { 
    QrCode, 
    Scan, 
    Download, 
    X, 
    Copy, 
    ExternalLink, 
    Settings2,
    Palette,
    Type,
    Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QRCodeTool({ onClose }) {
    const [mode, setMode] = useState('generator'); // 'generator' | 'scanner'
    const [qrData, setQrData] = useState('https://mr-anas.com');
    const [qrColor, setQrColor] = useState('#00f0ff');
    const [bgColor, setBgColor] = useState('#080808');
    const [qrSize, setQrSize] = useState(300);
    const [qrMargin, setQrMargin] = useState(2);
    const [qrLevel, setQrLevel] = useState('H'); // L, M, Q, H
    const [previewUrl, setPreviewUrl] = useState('');
    const [scannedResult, setScannedResult] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    const canvasRef = useRef(null);
    const scannerRef = useRef(null);

    // Generate QR Code Preview
    useEffect(() => {
        if (mode === 'generator' && qrData) {
            const generateQR = async () => {
                try {
                    const url = await QRCode.toDataURL(qrData, {
                        width: qrSize,
                        margin: qrMargin,
                        color: {
                            dark: qrColor,
                            light: bgColor
                        },
                        errorCorrectionLevel: qrLevel
                    });
                    setPreviewUrl(url);
                } catch (err) {
                    console.error("QR Generation Error:", err);
                }
            };
            generateQR();
        }
    }, [qrData, qrColor, bgColor, qrSize, qrMargin, qrLevel, mode]);

    // Handle Scanner
    useEffect(() => {
        if (mode === 'scanner' && isScanning) {
            const scanner = new Html5QrcodeScanner(
                "qr-reader", 
                { fps: 10, qrbox: { width: 250, height: 250 } },
                false
            );

            scanner.render(onScanSuccess, onScanFailure);
            scannerRef.current = scanner;

            return () => {
                if (scannerRef.current) {
                    scannerRef.current.clear().catch(err => console.error("Scanner Clear Error:", err));
                }
            };
        }
    }, [mode, isScanning]);

    const onScanSuccess = (decodedText, decodedResult) => {
        setScannedResult(decodedText);
        setIsScanning(false);
        if (scannerRef.current) {
            scannerRef.current.clear();
        }
    };

    const onScanFailure = (error) => {
        // Soft error, usually means no QR in frame
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.download = `qrcode-${Date.now()}.png`;
        link.href = previewUrl;
        link.click();
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(scannedResult || qrData);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="qr-tool-container"
        >
            <div className="qr-tool-header">
                <div className="tool-title">
                    <QrCode className="icon-cyan" size={20} />
                    <span>NEBULA QR CORE</span>
                </div>
                <button className="btn-close" onClick={onClose}><X size={18} /></button>
            </div>

            <div className="qr-tool-tabs">
                <button 
                    className={`tab-btn ${mode === 'generator' ? 'active' : ''}`} 
                    onClick={() => { setMode('generator'); setIsScanning(false); }}
                >
                    <Type size={14} /> GENERATOR
                </button>
                <button 
                    className={`tab-btn ${mode === 'scanner' ? 'active' : ''}`} 
                    onClick={() => setMode('scanner')}
                >
                    <Scan size={14} /> SCANNER
                </button>
            </div>

            <div className="qr-tool-body">
                {mode === 'generator' ? (
                    <div className="generator-view">
                        <div className="preview-section">
                            <div className="qr-preview-wrapper" style={{ backgroundColor: bgColor }}>
                                <img src={previewUrl} alt="QR Preview" />
                            </div>
                            <button className="btn-download" onClick={handleDownload}>
                                <Download size={16} /> DOWNLOAD PNG
                            </button>
                        </div>
                        
                        <div className="controls-section">
                            <div className="control-group">
                                <label><Type size={12} /> DATA / URL</label>
                                <input 
                                    className="dark-input" 
                                    value={qrData} 
                                    onChange={(e) => setQrData(e.target.value)}
                                    placeholder="Enter link or text..."
                                />
                            </div>

                            <div className="control-row">
                                <div className="control-group">
                                    <label><Palette size={12} /> QR COLOR</label>
                                    <div className="color-picker-wrapper">
                                        <input type="color" value={qrColor} onChange={(e) => setQrColor(e.target.value)} />
                                        <span>{qrColor}</span>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label><Palette size={12} /> BG COLOR</label>
                                    <div className="color-picker-wrapper">
                                        <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
                                        <span>{bgColor}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="control-row">
                                <div className="control-group">
                                    <label><Settings2 size={12} /> MARGIN ({qrMargin})</label>
                                    <input type="range" min="0" max="10" step="1" value={qrMargin} onChange={(e) => setQrMargin(parseInt(e.target.value))} />
                                </div>
                                <div className="control-group">
                                    <label><Settings2 size={12} /> ERROR CORRECTION</label>
                                    <select className="dark-select" value={qrLevel} onChange={(e) => setQrLevel(e.target.value)}>
                                        <option value="L">Low (7%)</option>
                                        <option value="M">Medium (15%)</option>
                                        <option value="Q">Quartile (25%)</option>
                                        <option value="H">High (30%)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="scanner-view">
                        {!scannedResult && !isScanning ? (
                            <div className="scanner-init">
                                <div className="scanner-placeholder">
                                    <Camera size={48} className="icon-pulse" />
                                    <p>Ready to deconstruct reality?</p>
                                </div>
                                <button className="btn-scan-start" onClick={() => setIsScanning(true)}>
                                    INITIALIZE CAMERA
                                </button>
                            </div>
                        ) : null}

                        {isScanning && (
                            <div className="scanner-active">
                                <div id="qr-reader"></div>
                                <button className="btn-cancel-scan" onClick={() => setIsScanning(false)}>CANCEL</button>
                            </div>
                        )}

                        {scannedResult && (
                            <div className="scan-result-card">
                                <h3>DATA FOUND</h3>
                                <div className="result-text">{scannedResult}</div>
                                <div className="result-actions">
                                    <button onClick={handleCopy}>
                                        <Copy size={16} /> {copySuccess ? 'COPIED!' : 'COPY'}
                                    </button>
                                    {scannedResult.startsWith('http') && (
                                        <a href={scannedResult} target="_blank" rel="noreferrer">
                                            <ExternalLink size={16} /> OPEN
                                        </a>
                                    )}
                                    <button className="btn-reset" onClick={() => { setScannedResult(''); setIsScanning(true); }}>
                                        SCAN AGAIN
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <style jsx>{`
                .qr-tool-container {
                    background: rgba(10, 10, 10, 0.95);
                    border: 1px solid rgba(0, 240, 255, 0.2);
                    border-radius: 12px;
                    width: 600px;
                    max-width: 95vw;
                    backdrop-filter: blur(20px);
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 240, 255, 0.05);
                    display: flex;
                    flex-direction: column;
                    z-index: 9999;
                    font-family: 'Inter', sans-serif;
                    color: #fff;
                    overflow: hidden;
                }

                .qr-tool-header {
                    padding: 16px 20px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .tool-title {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-weight: 800;
                    letter-spacing: 2px;
                    font-size: 0.8rem;
                    color: #00f0ff;
                }

                .icon-cyan { color: #00f0ff; }

                .btn-close {
                    background: none;
                    border: none;
                    color: #666;
                    cursor: pointer;
                    transition: 0.2s;
                }
                .btn-close:hover { color: #fff; transform: rotate(90deg); }

                .qr-tool-tabs {
                    display: flex;
                    background: rgba(0, 0, 0, 0.3);
                    padding: 4px;
                }

                .tab-btn {
                    flex: 1;
                    padding: 10px;
                    background: none;
                    border: none;
                    color: #555;
                    font-size: 0.7rem;
                    font-weight: 700;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    transition: 0.2s;
                    border-radius: 6px;
                }

                .tab-btn.active {
                    color: #00f0ff;
                    background: rgba(0, 240, 255, 0.1);
                }

                .qr-tool-body {
                    padding: 24px;
                    background: radial-gradient(circle at top right, rgba(0, 240, 255, 0.03), transparent);
                }

                .generator-view {
                    display: grid;
                    grid-template-columns: 1fr 1.5fr;
                    gap: 24px;
                }

                @media (max-width: 600px) {
                    .generator-view { grid-template-columns: 1fr; }
                    .qr-tool-container { position: fixed; inset: 10px; width: calc(100vw - 20px); max-height: calc(100vh - 20px); height: min-content; overflow-y: auto; }
                }

                .preview-section {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 16px;
                }

                .qr-preview-wrapper {
                    padding: 12px;
                    border-radius: 8px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }

                .qr-preview-wrapper img {
                    width: 200px;
                    height: 200px;
                    display: block;
                }

                .btn-download {
                    width: 100%;
                    background: #00f0ff;
                    color: #000;
                    border: none;
                    padding: 12px;
                    border-radius: 8px;
                    font-weight: 800;
                    font-size: 0.75rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .btn-download:hover {
                    box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
                    transform: translateY(-2px);
                }

                .controls-section {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .control-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .control-group label {
                    font-size: 0.65rem;
                    color: #666;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    text-transform: uppercase;
                }

                .dark-input, .dark-select {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    padding: 10px 14px;
                    border-radius: 6px;
                    color: #fff;
                    font-size: 0.85rem;
                    outline: none;
                    transition: 0.2s;
                }

                .dark-input:focus, .dark-select:focus {
                    border-color: #00f0ff;
                    background: rgba(0, 240, 255, 0.05);
                }

                .control-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                }

                .color-picker-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: rgba(255, 255, 255, 0.03);
                    padding: 6px 10px;
                    border-radius: 6px;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                }

                .color-picker-wrapper input {
                    width: 24px;
                    height: 24px;
                    border: none;
                    background: none;
                    cursor: pointer;
                }

                .color-picker-wrapper span {
                    font-size: 0.75rem;
                    font-family: monospace;
                    color: #888;
                }

                .scanner-view {
                    min-height: 300px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                .scanner-init {
                    text-align: center;
                }

                .scanner-placeholder {
                    margin-bottom: 30px;
                    color: rgba(255, 255, 255, 0.1);
                }

                .scanner-placeholder p {
                    margin-top: 15px;
                    font-size: 0.9rem;
                    color: #444;
                }

                .btn-scan-start {
                    background: rgba(0, 240, 255, 0.1);
                    color: #00f0ff;
                    border: 1px solid #00f0ff;
                    padding: 14px 28px;
                    border-radius: 50px;
                    font-weight: 800;
                    letter-spacing: 1px;
                    cursor: pointer;
                    transition: 0.3s;
                }

                .btn-scan-start:hover {
                    background: #00f0ff;
                    color: #000;
                    box-shadow: 0 0 30px rgba(0, 240, 255, 0.4);
                }

                .scanner-active {
                    width: 100%;
                    max-width: 400px;
                }

                #qr-reader {
                    border: 1px solid rgba(0, 240, 255, 0.2) !important;
                    border-radius: 12px;
                    overflow: hidden;
                }

                .btn-cancel-scan {
                    margin-top: 15px;
                    background: none;
                    border: 1px solid #333;
                    color: #666;
                    padding: 8px 20px;
                    border-radius: 6px;
                    font-size: 0.7rem;
                    font-weight: 700;
                    cursor: pointer;
                    width: 100%;
                }

                .scan-result-card {
                    width: 100%;
                    padding: 20px;
                    background: rgba(0, 240, 255, 0.05);
                    border: 1px solid rgba(0, 240, 255, 0.2);
                    border-radius: 12px;
                    text-align: center;
                }

                .scan-result-card h3 {
                    margin: 0 0 15px;
                    font-size: 0.7rem;
                    color: #888;
                    letter-spacing: 2px;
                }

                .result-text {
                    background: #000;
                    padding: 15px;
                    border-radius: 8px;
                    font-size: 0.9rem;
                    word-break: break-all;
                    margin-bottom: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }

                .result-actions {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .result-actions button, .result-actions a {
                    background: #222;
                    color: #fff;
                    border: none;
                    padding: 10px 16px;
                    border-radius: 6px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    text-decoration: none;
                    transition: 0.2s;
                }

                .result-actions button:hover, .result-actions a:hover {
                    background: #333;
                }

                .btn-reset { color: #00f0ff !important; }

                @keyframes pulse {
                    0% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.1); }
                    100% { opacity: 0.3; transform: scale(1); }
                }
                .icon-pulse { animation: pulse 2s infinite ease-in-out; }

                input[type="range"] {
                    -webkit-appearance: none;
                    width: 100%;
                    height: 4px;
                    background: #222;
                    border-radius: 2px;
                    outline: none;
                }

                input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 12px;
                    height: 12px;
                    background: #00f0ff;
                    border-radius: 50%;
                    cursor: pointer;
                }
            `}</style>
        </motion.div>
    );
}

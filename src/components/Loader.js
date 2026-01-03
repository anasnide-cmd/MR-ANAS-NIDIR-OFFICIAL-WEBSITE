'use client';

export default function Loader({ text = 'Initializing...' }) {
    return (
        <div className="loader-container">
            <div className="orb-loader">
                <div className="ring"></div>
                <div className="ring"></div>
                <div className="ring"></div>
                <div className="core"></div>
            </div>
            <p className="loader-text">{text}</p>
            <style jsx>{`
                .loader-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    width: 100%;
                    background: #020202;
                    color: #fff;
                    position: absolute;
                    inset: 0;
                    z-index: 9999;
                }
                .orb-loader {
                    position: relative;
                    width: 60px;
                    height: 60px;
                    margin-bottom: 20px;
                }
                .ring {
                    position: absolute;
                    inset: 0;
                    border: 2px solid transparent;
                    border-radius: 50%;
                    border-top-color: #00f0ff;
                    animation: spin 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite;
                }
                .ring:nth-child(2) {
                    border-top-color: #0064e0;
                    animation-delay: -0.5s;
                    border-width: 2px;
                    inset: 5px;
                }
                .ring:nth-child(3) {
                    border-top-color: #7000ff;
                    animation-delay: -1s;
                    border-width: 2px;
                    inset: 10px;
                }
                .core {
                    position: absolute;
                    inset: 20px;
                    background: #fff;
                    border-radius: 50%;
                    box-shadow: 0 0 20px #00f0ff;
                    animation: pulse 1s ease-in-out infinite alternate;
                }
                .loader-text {
                    font-family: var(--font-exo2), sans-serif;
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    color: #00f0ff;
                    animation: blink 2s infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes pulse {
                    0% { opacity: 0.5; transform: scale(0.8); }
                    100% { opacity: 1; transform: scale(1.1); }
                }
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>
        </div>
    );
}

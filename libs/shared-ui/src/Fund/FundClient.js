'use client';

import { useState } from 'react';
import PayPalButton from '../PayPalButton';

export default function FundClient() {
    const [amount, setAmount] = useState(10);
    const [activeTab, setActiveTab] = useState('fiat'); // 'fiat' or 'crypto'

    const copyToClipboard = (text, btnId) => {
        navigator.clipboard.writeText(text);
        const btn = document.getElementById(btnId);
        btn.textContent = '✅ Copied!';
        setTimeout(() => btn.textContent = '📋 Copy', 2000);
    };

    return (
        <div className="fund-container">
            <header className="fund-hero">
                <div className="hero-content">
                    <h1>Fuel the <span className="highlight">Vision</span>.</h1>
                    <p>Your support powers the development of the next generation of web tools.</p>
                </div>
            </header>

            <main className="fund-main">
                <div className="donation-card glass">
                    <div className="tabs">
                        <button 
                            className={`tab-btn ${activeTab === 'fiat' ? 'active' : ''}`}
                            onClick={() => setActiveTab('fiat')}
                        >
                            💳 PayPal / Card
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === 'crypto' ? 'active' : ''}`}
                            onClick={() => setActiveTab('crypto')}
                        >
                            ₿ Crypto
                        </button>
                    </div>

                    <div className="tab-content">
                        {activeTab === 'fiat' && (
                            <div className="fiat-section animate-fade-in">
                                <h3>Select Amount</h3>
                                <div className="amount-grid">
                                    {[5, 10, 25, 50, 100].map(val => (
                                        <button 
                                            key={val}
                                            onClick={() => setAmount(val)}
                                            className={`amount-chip ${amount === val ? 'selected' : ''}`}
                                        >
                                            ${val}
                                        </button>
                                    ))}
                                    <div className="custom-wrapper">
                                        <span>$</span>
                                        <input 
                                            type="number" 
                                            value={amount} 
                                            onChange={e => setAmount(Number(e.target.value))}
                                            className="custom-amount"
                                        />
                                    </div>
                                </div>
                                <div className="paypal-wrapper">
                                     <PayPalButton amount={String(amount)} onSuccess={() => alert('Thank you for your support!')} />
                                </div>
                            </div>
                        )}

                        {activeTab === 'crypto' && (
                            <div className="crypto-section animate-fade-in">
                                <h3>Crypto Wallets</h3>
                                <div className="wallet-row">
                                    <div className="coin-icon btc">₿</div>
                                    <div className="wallet-info">
                                        <h4>Bitcoin (BTC)</h4>
                                        <div className="address">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</div>
                                    </div>
                                    <button 
                                        id="btn-btc"
                                        className="copy-btn"
                                        onClick={() => copyToClipboard('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'btn-btc')}
                                    >
                                        📋 Copy
                                    </button>
                                </div>
                                <div className="wallet-row">
                                    <div className="coin-icon eth">Ξ</div>
                                    <div className="wallet-info">
                                        <h4>Ethereum (ETH)</h4>
                                        <div className="address">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</div>
                                    </div>
                                    <button 
                                        id="btn-eth"
                                        className="copy-btn"
                                        onClick={() => copyToClipboard('0x71C7656EC7ab88b098defB751B7401B5f6d8976F', 'btn-eth')}
                                    >
                                        📋 Copy
                                    </button>
                                </div>
                                <div className="wallet-row">
                                    <div className="coin-icon sol">◎</div>
                                    <div className="wallet-info">
                                        <h4>Solana (SOL)</h4>
                                        <div className="address">H5p7qGqX... (Example) ...J9z</div>
                                    </div>
                                    <button 
                                        id="btn-sol"
                                        className="copy-btn"
                                        onClick={() => copyToClipboard('H5p7qGqX...', 'btn-sol')}
                                    >
                                        📋 Copy
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <style jsx>{`
                .fund-container {
                    min-height: 100vh;
                    background: #000;
                    color: #fff;
                    font-family: 'Inter', sans-serif;
                    padding-bottom: 50px;
                }
                .fund-hero {
                    height: 40vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    background: radial-gradient(circle at center, #1a1a1a 0%, #000 100%);
                }
                .hero-content h1 { font-size: 3.5rem; letter-spacing: -2px; margin-bottom: 10px; }
                .highlight { color: #00f0ff; text-shadow: 0 0 20px rgba(0,240,255,0.5); }
                
                .fund-main { display: flex; justify-content: center; margin-top: -50px; padding: 0 20px; }
                .donation-card {
                    width: 100%;
                    max-width: 600px;
                    min-height: 500px;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                }
                .glass {
                    background: rgba(20, 20, 20, 0.8);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .tabs { display: flex; border-bottom: 1px solid rgba(255,255,255,0.1); }
                .tab-btn {
                    flex: 1; padding: 20px; background: transparent; border: none; color: #888;
                    font-size: 1rem; font-weight: bold; cursor: pointer; transition: all 0.3s;
                }
                .tab-btn:hover { color: #fff; background: rgba(255,255,255,0.05); }
                .tab-btn.active { color: #00f0ff; border-bottom: 2px solid #00f0ff; background: rgba(0,240,255,0.05); }
                
                .tab-content { padding: 40px; }
                h3 { margin-top: 0; margin-bottom: 20px; text-align: center; color: #ccc; }
                
                .amount-grid { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-bottom: 30px; }
                .amount-chip {
                    padding: 10px 20px; border-radius: 30px; border: 1px solid rgba(255,255,255,0.1);
                    background: transparent; color: #fff; cursor: pointer; transition: all 0.2s;
                }
                .amount-chip:hover { border-color: #00f0ff; }
                .amount-chip.selected { background: #00f0ff; color: #000; font-weight: bold; border-color: #00f0ff; }
                .custom-wrapper {
                    display: flex; align-items: center; border-bottom: 1px solid #fff; padding: 0 10px;
                }
                .custom-amount {
                    width: 60px; background: transparent; border: none; color: #fff; font-size: 1rem; outline: none;
                }

                .paypal-wrapper { display: flex; justify-content: center; }

                .wallet-row {
                    display: flex; align-items: center; gap: 15px; background: rgba(255,255,255,0.05);
                    padding: 15px; border-radius: 10px; margin-bottom: 15px;
                }
                .coin-icon {
                    width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
                    font-weight: bold; font-size: 1.2rem;
                }
                .btc { background: #f7931a; color: #fff; }
                .eth { background: #627eea; color: #fff; }
                .sol { background: #14f195; color: #000; }
                
                .wallet-info { flex: 1; overflow: hidden; }
                .wallet-info h4 { margin: 0 0 5px; font-size: 0.9rem; }
                .address { font-family: monospace; font-size: 0.8rem; color: #aaa; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; }
                
                .copy-btn {
                    padding: 8px 15px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2);
                    background: transparent; color: #fff; cursor: pointer; font-size: 0.8rem;
                }
                .copy-btn:hover { background: rgba(255,255,255,0.1); }
            `}</style>
        </div>
    );
}

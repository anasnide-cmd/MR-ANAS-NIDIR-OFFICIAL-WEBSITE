import { useState, useEffect } from 'react';
import { auth } from '../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { motion } from 'framer-motion';
import { X, ShieldCheck, ArrowRight, ShoppingBag as StoreIcon } from 'lucide-react';
import PayPalButton from '../PayPalButton';

export default function BuySiteModal({ site, onClose, onPurchaseSuccess }) {
    const [step, setStep] = useState('confirm'); // 'confirm', 'payment', 'success'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
        return () => unsubscribe();
    }, []);

    const handlePayPalSuccess = async (details) => {
        if (!user) {
            setError('System Error: You must be logged in to acquire constructs.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            // Call fulfillment API
            const response = await fetch('/api/store/fulfill-site', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    siteId: site.id,
                    orderId: details.id,
                    paymentDetails: details,
                    buyerUid: user.uid,
                    buyerEmail: user.email
                })
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Fulfillment failed');
            }

            setStep('success');
            if (onPurchaseSuccess) onPurchaseSuccess();
        } catch (err) {
            console.error("Purchase fulfillment error:", err);
            setError(err.message || 'Payment successful but site transfer failed. Please contact support.');
            setStep('confirm');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="modal-card" 
                onClick={e => e.stopPropagation()}
            >
                <div className="modal-header">
                    <div className="header-title">
                        <StoreIcon size={20} className="text-blue-500" />
                        <h2>Digital Asset Acquisition</h2>
                    </div>
                    <button onClick={onClose} className="close-btn"><X size={20}/></button>
                </div>

                <div className="modal-body">
                    {step === 'confirm' && (
                        <div className="step-content">
                            <div className="asset-preview">
                                <div className="asset-icon">🌐</div>
                                <div className="asset-info">
                                    <h3>{site.title}</h3>
                                    <p>Developer: {site.developer}</p>
                                    <div className="asset-badge">NEX CONSTRUCT</div>
                                </div>
                            </div>

                            <div className="acquisition-details">
                                <div className="detail-row">
                                    <span>Asset Type</span>
                                    <span>Fully Deployed Website</span>
                                </div>
                                <div className="detail-row">
                                    <span>License</span>
                                    <span>Full Ownership Transfer</span>
                                </div>
                                <div className="price-row">
                                    <span>Acquisition Cost</span>
                                    <span className="price">${site.price} USD</span>
                                </div>
                            </div>

                            <div className="security-notice">
                                <ShieldCheck size={16} />
                                <p>Funds are held in escrow until transfer protocol completes.</p>
                            </div>

                            <button className="proceed-btn" onClick={() => setStep('payment')}>
                                INITIATE PAYMENT <ArrowRight size={18} />
                            </button>
                        </div>
                    )}

                    {step === 'payment' && (
                        <div className="step-content">
                            <div className="payment-summary">
                                <h3>Complete Transaction</h3>
                                <p>Paying <strong>${site.price}</strong> for <strong>{site.title}</strong></p>
                            </div>
                            
                            {error && <div className="error-msg">{error}</div>}
                            
                            <div className="paypal-container">
                                <PayPalButton 
                                    amount={site.price.toString()} 
                                    onSuccess={handlePayPalSuccess} 
                                />
                            </div>

                            <button className="back-link" onClick={() => setStep('confirm')}>
                                Back to Details
                            </button>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="step-content success-step">
                            <div className="success-icon">✨</div>
                            <h3>Acquisition Complete</h3>
                            <p>The construct <strong>{site.title}</strong> has been successfully transferred to your MR BUILD dashboard.</p>
                            
                            <div className="success-actions">
                                <button className="view-btn" onClick={() => window.location.href = '/mr-build/dashboard'}>
                                    Go to My Dashboard
                                </button>
                                <button className="done-btn" onClick={onClose}>
                                    Done
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>

            <style jsx>{`
                .modal-backdrop {
                    position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(10px);
                    display: flex; align-items: center; justify-content: center; z-index: 1000;
                    padding: 20px;
                }
                .modal-card {
                    background: #0a0a0a; border: 1px solid rgba(255,255,255,0.1); border-radius: 24px;
                    width: 500px; max-width: 100%; overflow: hidden;
                    box-shadow: 0 25px 50px rgba(0,0,0,0.5), 0 0 20px rgba(59, 130, 246, 0.1);
                    color: white; font-family: 'Inter', sans-serif;
                }
                .modal-header {
                    display: flex; justify-content: space-between; align-items: center; padding: 24px;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }
                .header-title { display: flex; align-items: center; gap: 12px; }
                .header-title h2 { font-family: 'Orbitron'; font-size: 1.1rem; letter-spacing: 1px; margin: 0; }
                .close-btn { background: none; border: none; color: #666; cursor: pointer; transition: 0.2s; }
                .close-btn:hover { color: white; }

                .modal-body { padding: 32px; }
                .step-content { display: flex; flex-direction: column; gap: 24px; }
                
                .asset-preview {
                    display: flex; gap: 20px; align-items: center;
                    padding: 20px; background: rgba(255,255,255,0.03); border-radius: 16px;
                    border: 1px solid rgba(255,255,255,0.05);
                }
                .asset-icon { font-size: 40px; }
                .asset-info h3 { font-size: 1.25rem; margin: 0 0 4px 0; }
                .asset-info p { font-size: 0.9rem; color: #888; margin: 0 0 8px 0; }
                .asset-badge { 
                    display: inline-block; font-size: 10px; font-weight: 800; letter-spacing: 1px;
                    color: #3b82f6; background: rgba(59, 130, 246, 0.1); padding: 2px 8px; border-radius: 4px;
                }

                .acquisition-details { display: flex; flex-direction: column; gap: 12px; }
                .detail-row { display: flex; justify-content: space-between; font-size: 0.9rem; color: #666; }
                .detail-row span:last-child { color: #eee; font-weight: 500; }
                
                .price-row { 
                    display: flex; justify-content: space-between; align-items: center; 
                    margin-top: 8px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.05);
                }
                .price-row .price { font-size: 1.5rem; font-weight: 800; color: #10b981; }

                .security-notice {
                    display: flex; align-items: center; gap: 8px; font-size: 0.75rem; color: #666;
                    background: rgba(255,255,255,0.02); padding: 10px; border-radius: 8px;
                }

                .proceed-btn {
                    background: #3b82f6; color: white; border: none; padding: 16px; border-radius: 12px;
                    font-weight: 700; font-size: 1rem; cursor: pointer; display: flex; align-items: center;
                    justify-content: center; gap: 8px; transition: 0.2s;
                    box-shadow: 0 10px 20px rgba(59, 130, 246, 0.2);
                }
                .proceed-btn:hover { background: #2563eb; transform: translateY(-2px); }

                .payment-summary { text-align: center; }
                .payment-summary h3 { margin-bottom: 8px; }
                .payment-summary p { color: #888; }
                
                .paypal-container { min-height: 200px; display: flex; flex-direction: column; }
                
                .error-msg { 
                    background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2);
                    padding: 12px; border-radius: 8px; font-size: 0.85rem; text-align: center;
                }

                .back-link { background: none; border: none; color: #666; cursor: pointer; font-size: 0.9rem; }
                .back-link:hover { color: #eee; }

                .success-step { text-align: center; }
                .success-icon { font-size: 64px; margin-bottom: 20px; }
                .success-step h3 { font-size: 1.5rem; margin-bottom: 12px; }
                .success-step p { color: #888; line-height: 1.5; margin-bottom: 32px; }
                
                .success-actions { display: flex; flex-direction: column; gap: 12px; }
                .view-btn { 
                    background: #10b981; color: white; border: none; padding: 14px; border-radius: 12px;
                    font-weight: 700; cursor: pointer; transition: 0.2s;
                }
                .view-btn:hover { background: #059669; transform: translateY(-2px); }
                .done-btn { background: transparent; color: #888; border: 1px solid rgba(255,255,255,0.1); padding: 12px; border-radius: 12px; cursor: pointer; }
                .done-btn:hover { color: white; border-color: white; }
            `}</style>
        </div>
    );
}

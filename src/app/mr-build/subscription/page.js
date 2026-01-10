'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import PayPalButton from '../../../components/PayPalButton';
import Loader from '../../../components/Loader';
import Link from 'next/link';

export default function SubscriptionPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState('pro'); // default to pro
    const [paymentProcessing, setPaymentProcessing] = useState(false);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            if (!u) {
                router.push('/mr-build/login');
            } else {
                setUser(u);
            }
            setLoading(false);
        });
        return () => unsub();
    }, [router]);

    const handlePaymentSuccess = async (details) => {
        setPaymentProcessing(true);
        try {
            // Update User Limit
            // WARNING: In production, verify this on the server side (Cloud Functions)
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, {
                siteLimit: 5, // Upgrade to 5 sites
                plan: 'pro',
                subscriptionId: details.id,
                subscriptionDate: new Date().toISOString()
            });

            alert('Upgrade Successful! Deploying additional fleet capacity...');
            router.push('/mr-build');
        } catch (error) {
            console.error("Error updating profile:", error);
            alert('Payment successful but failed to update profile. Please contact support.');
        } finally {
            setPaymentProcessing(false);
        }
    };

    if (loading) return <Loader text="Loading Payment Gateway..." />;
    if (!user) return null;

    return (
        <div className="sub-container animate-reveal">
            <header className="sub-header">
                <Link href="/mr-build" className="btn-back">← BACK TO COMMAND</Link>
                <h1>PROTOCOL UPGRADE</h1>
                <p>Expand your digital dominion. Unlock advanced capabilities.</p>
            </header>

            <div className="plans-grid">
                {/* Free Plan (Current) */}
                <div className="plan-card glass">
                    <div className="plan-header">
                        <h2>TRIAL-X</h2>
                        <div className="price">$0<span>/mo</span></div>
                    </div>
                    <ul className="features-list">
                        <li>✅ 1 Active Deployment</li>
                        <li>✅ Basic Site Editor</li>
                        <li>✅ Manual Deployments</li>
                        <li>❌ Custom Domains</li>
                        <li>❌ Priority Support</li>
                    </ul>
                    <button className="btn-plan current" disabled>CURRENT PROTOCOL</button>
                </div>

                {/* Pro Plan */}
                <div className={`plan-card glass pro highlight ${paymentProcessing ? 'processing' : ''}`}>
                     {paymentProcessing && (
                         <div className="processing-overlay">
                             <div className="spinner"></div>
                             <p>PROCESSING TRANSACTION...</p>
                         </div>
                     )}
                    <div className="plan-header">
                        <span className="badge">RECOMMENDED</span>
                        <h2>PREMIUM-X</h2>
                        <div className="price">$9.99<span>/mo</span></div>
                    </div>
                    <ul className="features-list">
                        <li>✅ <strong>5 Active Deployments</strong></li>
                        <li>✅ <strong>Advanced Components</strong></li>
                        <li>✅ <strong>Instant Updates</strong></li>
                        <li>✅ Analytics Module</li>
                        <li>✅ 24/7 Priority Channel</li>
                    </ul>
                    
                    <div className="payment-area">
                        <p className="pay-label">INITIALIZE UPGRADE:</p>
                        <PayPalButton amount="9.99" onSuccess={handlePaymentSuccess} />
                    </div>
                </div>
            </div>

            <style jsx>{`
                .sub-container {
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 40px 20px 100px;
                    color: #fff;
                }
                .sub-header { text-align: center; margin-bottom: 60px; }
                .btn-back { display: inline-block; margin-bottom: 20px; color: rgba(255,255,255,0.5); text-decoration: none; font-size: 0.8rem; font-weight: 700; transition: color 0.3s; }
                .btn-back:hover { color: #00f0ff; }
                
                .sub-header h1 { font-family: var(--font-orbitron); font-size: 2.5rem; margin-bottom: 10px; color: #fff; }
                .sub-header p { opacity: 0.6; }

                .plans-grid {
                    display: grid;
                    grid-template-columns: 1fr 1.2fr;
                    gap: 30px;
                    align-items: center;
                }

                .plan-card {
                    background: rgba(20, 20, 20, 0.6);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    padding: 40px;
                    position: relative;
                    transition: transform 0.3s, border-color 0.3s;
                }
                
                .plan-card.glass {
                    backdrop-filter: blur(10px);
                }

                .plan-card.pro {
                    background: rgba(0, 240, 255, 0.05);
                    border: 1px solid rgba(0, 240, 255, 0.3);
                    box-shadow: 0 0 30px rgba(0, 240, 255, 0.1);
                    transform: scale(1.05);
                    z-index: 1;
                }

                .plan-header { text-align: center; margin-bottom: 30px; }
                .plan-header h2 { font-family: var(--font-orbitron); font-size: 1.5rem; letter-spacing: 2px; margin-bottom: 10px; }
                .price { font-size: 2.5rem; font-weight: 900; color: #fff; }
                .price span { font-size: 1rem; opacity: 0.5; font-weight: normal; }
                
                .badge {
                    position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
                    background: #00f0ff; color: #000; font-weight: 900; font-size: 0.7rem;
                    padding: 4px 12px; border-radius: 20px; box-shadow: 0 0 15px #00f0ff;
                }

                .features-list { list-style: none; padding: 0; margin-bottom: 30px; }
                .features-list li { margin-bottom: 12px; font-size: 0.95rem; opacity: 0.8; display: flex; align-items: center; gap: 10px; }
                .features-list li strong { color: #fff; font-weight: 700; }

                .btn-plan {
                    width: 100%; padding: 15px; border-radius: 12px; font-weight: 800; cursor: pointer; border: none;
                }
                .btn-plan.current { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.3); cursor: default; }

                .payment-area { margin-top: 20px; }
                .pay-label { text-align: center; font-size: 0.7rem; letter-spacing: 1px; margin-bottom: 15px; opacity: 0.5; }

                .processing-overlay {
                    position: absolute; top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.8);
                    display: flex; flex-direction: column; align-items: center; justify-content: center;
                    z-index: 10; border-radius: 20px;
                }
                .spinner { width: 40px; height: 40px; border: 3px solid rgba(255,255,255,0.1); border-top-color: #00f0ff; border-radius: 50%; animation: spin 1s infinite linear; margin-bottom: 15px; }
                @keyframes spin { to { transform: rotate(360deg); } }

                .animate-reveal { animation: reveal 0.8s ease-out; }
                @keyframes reveal { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

                @media (max-width: 768px) {
                    .plans-grid { grid-template-columns: 1fr; }
                    .plan-card.pro { transform: scale(1); }
                }
            `}</style>
        </div>
    );
}

'use client';

import { useState, useEffect } from 'react';
import { products } from '../../data/shop-products';
import { auth, db } from '../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import PayPalButton from '../PayPalButton';

export default function ShopClient() {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => setUser(u));
        return () => unsub();
    }, []);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
            }
            return [...prev, { ...product, qty: 1 }];
        });
        setIsCartOpen(true);
    };

    const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

    const handlePaymentSuccess = async (details) => {
        setIsProcessing(true);
        try {
            // Check for templates in cart
            const templates = cart.filter(item => item.type === 'TEMPLATE');
            
            if (templates.length > 0) {
                const userRef = doc(db, 'users', user.uid);
                await updateDoc(userRef, {
                    unlockedAssets: arrayUnion(...templates.map(t => t.templateId))
                });
            }

            alert("Purchase successful! Your digital assets have been synchronized with your NEX profile.");
            setCart([]);
            setIsCartOpen(false);
        } catch (err) {
            console.error("Fulfillment error:", err);
            alert("Payment recorded but asset fulfillment failed. Please contact support.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="mr-shop-container">
            {/* Navbar */}
            <nav className="shop-nav glass">
                <div className="brand">
                    <span className="mr">MR</span> SHOP
                </div>
                <button className="cart-btn" onClick={() => setIsCartOpen(!isCartOpen)}>
                    🛒 <span className="badge">{cart.reduce((a, c) => a + c.qty, 0)}</span>
                </button>
            </nav>

            {/* Hero */}
            <header className="shop-hero">
                <div className="hero-content">
                    <h1>Future Commerce</h1>
                    <p>Upgrade your reality with premium gear.</p>
                </div>
            </header>

            {/* Product Grid */}
            <main className="shop-main">
                <h2>Featured Collection</h2>
                <div className="products-grid">
                    {products.map(product => (
                        <div key={product.id} className="product-card glass">
                            <div className="img-container" style={{ backgroundImage: `url(${product.image})` }}></div>
                            <div className="p-details">
                                <span className="category">{product.category}</span>
                                <h3>{product.name}</h3>
                                <p className="desc">{product.desc}</p>
                                <div className="p-footer">
                                    <span className="price">${product.price}</span>
                                    <button className="add-btn" onClick={() => addToCart(product)}>Add +</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Cart Drawer */}
            <div className={`cart-drawer ${isCartOpen ? 'open' : ''} glass`}>
                <div className="cart-header">
                    <h3>Your Cart</h3>
                    <button className="close-btn" onClick={() => setIsCartOpen(false)}>×</button>
                </div>
                <div className="cart-items">
                    {cart.length === 0 ? (
                        <p className="empty-msg">Your cart is empty.</p>
                    ) : cart.map(item => (
                        <div key={item.id} className="cart-item">
                            <div>
                                <h4>{item.name}</h4>
                                <span className="item-price">${item.price} x {item.qty}</span>
                            </div>
                            <div className="item-total">${item.price * item.qty}</div>
                        </div>
                    ))}
                </div>
                <div className="cart-footer">
                    <div className="total-row">
                        <span>Total</span>
                        <span className="total-amount">${cartTotal.toFixed(2)}</span>
                    </div>

                    {!user ? (
                        <p className="auth-notice">Please login to purchase items.</p>
                    ) : cart.length > 0 ? (
                        <div className="payment-wrapper">
                            <PayPalButton amount={cartTotal.toFixed(2)} onSuccess={handlePaymentSuccess} />
                        </div>
                    ) : null}
                </div>
            </div>

            <style jsx>{`
                .mr-shop-container {
                    min-height: 100vh;
                    background: #050505;
                    color: #fff;
                    font-family: 'Inter', sans-serif;
                    position: relative;
                    overflow-x: hidden;
                }
                .glass {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .shop-nav {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px 40px;
                    position: sticky;
                    top: 0;
                    z-index: 100;
                }
                .brand { font-size: 1.5rem; font-weight: 900; letter-spacing: -1px; }
                .mr { color: #00f0ff; }
                .cart-btn {
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: #fff;
                    padding: 10px 20px;
                    border-radius: 30px;
                    cursor: pointer;
                    font-size: 1rem;
                    position: relative;
                }
                .badge {
                    background: #00f0ff;
                    color: #000;
                    font-size: 0.7rem;
                    padding: 2px 6px;
                    border-radius: 10px;
                    font-weight: bold;
                    margin-left: 5px;
                }
                .shop-hero {
                    height: 50vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    background: radial-gradient(circle at center, #1a1a1a 0%, #000 100%);
                }
                .hero-content h1 {
                    font-size: 4rem;
                    margin-bottom: 20px;
                    background: linear-gradient(to right, #fff, #999);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .shop-main { padding: 50px 5%; }
                .products-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 30px;
                    margin-top: 40px;
                }
                .product-card {
                    border-radius: 20px;
                    overflow: hidden;
                    transition: transform 0.3s;
                }
                .product-card:hover { transform: translateY(-10px); border-color: #00f0ff; }
                .img-container { height: 250px; background-size: cover; background-position: center; }
                .p-details { padding: 25px; }
                .category { font-size: 0.8rem; color: #00f0ff; text-transform: uppercase; letter-spacing: 1px; }
                .p-details h3 { margin: 10px 0; font-size: 1.2rem; }
                .desc { opacity: 0.6; font-size: 0.9rem; margin-bottom: 20px; }
                .p-footer { display: flex; justify-content: space-between; align-items: center; }
                .price { font-size: 1.2rem; font-weight: bold; }
                .add-btn {
                    padding: 10px 25px;
                    background: rgba(255,255,255,0.1);
                    border: none;
                    color: #fff;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .add-btn:hover { background: #00f0ff; color: #000; }

                .cart-drawer {
                    position: fixed;
                    top: 0;
                    right: -400px;
                    width: 400px;
                    height: 100vh;
                    background: #0a0a0a;
                    z-index: 200;
                    padding: 30px;
                    display: flex;
                    flex-direction: column;
                    transition: right 0.4s ease;
                }
                .cart-drawer.open { right: 0; }
                .cart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
                .close-btn { background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer; }
                .cart-items { flex: 1; overflow-y: auto; }
                .cart-item { display: flex; justify-content: space-between; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); }
                .cart-footer { margin-top: 20px; }
                .total-row { display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: bold; margin-bottom: 20px; }
                
                .auth-notice { text-align: center; font-size: 0.8rem; color: #ff4d4d; margin-top: 10px; font-weight: 700; }
                .payment-wrapper { margin-top: 10px; }

                .checkout-btn {
                    width: 100%;
                    padding: 15px;
                    background: #00f0ff;
                    color: #000;
                    border: none;
                    border-radius: 10px;
                    font-weight: bold;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
}

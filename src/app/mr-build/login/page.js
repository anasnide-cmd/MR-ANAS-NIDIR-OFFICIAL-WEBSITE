'use client';
import { useState, useEffect } from 'react';
import { auth } from '../../../lib/firebase';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged
} from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function BuildLogin() {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Redirect if already logged in
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push('/mr-build');
            }
        });
        return () => unsub();
    }, [router]);

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isRegister) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            router.push('/mr-build');
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        setLoading(true);
        try {
            await signInWithPopup(auth, new GoogleAuthProvider());
            router.push('/mr-build');
        } catch (err) {
            alert(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card glass">
                <div className="login-header">
                    <div className="shield-icon">🛡️</div>
                    <h1>{isRegister ? 'Create Identity' : 'Secure Access'}</h1>
                    <p>{isRegister ? 'Join the network of digital visionaries.' : 'Verify credentials to access the builder.'}</p>
                </div>

                <form onSubmit={handleAuth} className="auth-form">
                    <input
                        type="email"
                        placeholder="Neural Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Security Key"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Processing...' : (isRegister ? 'Establish Node' : 'Initialize Connection')}
                    </button>
                </form>

                <div className="divider"><span>OR</span></div>

                <button onClick={handleGoogle} className="btn-google">
                    <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="" />
                    Sync Google Identity
                </button>

                <p className="toggle-auth">
                    {isRegister ? 'Already have a node?' : 'New to the platform?'}
                    <button onClick={() => setIsRegister(!isRegister)}>
                        {isRegister ? 'Connect Existing' : 'Initialize New Node'}
                    </button>
                </p>
            </div>

            <style jsx>{`
                .login-wrapper {
                    height: 80vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .login-card {
                    width: 100%;
                    max-width: 400px;
                    padding: 50px;
                    border-radius: 30px;
                    text-align: center;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(0, 240, 255, 0.1);
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
                }
                .shield-icon { font-size: 3rem; margin-bottom: 20px; text-shadow: 0 0 20px rgba(0, 240, 255, 0.5); }
                .login-header h1 { font-family: var(--font-orbitron); font-size: 1.8rem; margin-bottom: 10px; }
                .login-header p { font-size: 0.9rem; opacity: 0.5; margin-bottom: 30px; }

                .auth-form { display: flex; flex-direction: column; gap: 15px; }
                .auth-form input {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 15px;
                    border-radius: 12px;
                    color: #fff;
                    transition: all 0.3s;
                }
                .auth-form input:focus { border-color: #00f0ff; outline: none; background: rgba(0, 240, 255, 0.05); }

                .btn-primary {
                    background: #00f0ff;
                    color: #000;
                    border: none;
                    padding: 15px;
                    border-radius: 12px;
                    font-weight: 800;
                    cursor: pointer;
                    margin-top: 10px;
                    transition: all 0.3s;
                }
                .btn-primary:hover { box-shadow: 0 0 20px rgba(0, 240, 255, 0.4); transform: translateY(-2px); }

                .divider { margin: 25px 0; position: relative; opacity: 0.3; }
                .divider::before { content: ''; position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: #fff; }
                .divider span { position: relative; background: #050505; padding: 0 10px; font-size: 0.8rem; font-weight: 800; }

                .btn-google {
                    width: 100%;
                    background: #fff;
                    color: #000;
                    border: none;
                    padding: 12px;
                    border-radius: 12px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .btn-google:hover { background: #f0f0f0; }
                .btn-google img { width: 18px; }

                .toggle-auth { margin-top: 30px; font-size: 0.85rem; opacity: 0.6; }
                .toggle-auth button { background: none; border: none; color: #00f0ff; font-weight: 800; margin-left: 8px; cursor: pointer; }
            `}</style>
        </div>
    );
}

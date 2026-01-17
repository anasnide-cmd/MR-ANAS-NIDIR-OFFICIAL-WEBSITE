'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { 
    FaFacebook, 
    FaTwitter, 
    FaLinkedin, 
    FaWhatsapp, 
    FaShareAlt, 
    FaCopy, 
    FaTimes 
} from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';

export default function ShareButton({ title }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    // Get the base URL (handling SSR safely)
    const getShareUrl = () => {
        if (typeof window !== 'undefined') {
            return `${window.location.origin}${pathname}`;
        }
        return '';
    };

    const handleShare = async () => {
        const url = getShareUrl();
        
        // Use Native Share API if available
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title || 'Savoirpedia Article',
                    text: `Check out this article: ${title}`,
                    url: url,
                });
                return;
            } catch (err) {
                console.log('Error sharing:', err);
            }
        }
        
        // Fallback to custom modal
        setIsOpen(true);
    };

    const copyToClipboard = async () => {
        const url = getShareUrl();
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy keys', err);
        }
    };

    const shareLinks = [
        {
            name: 'Facebook',
            icon: <FaFacebook size={24} />,
            url: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            color: '#1877F2'
        },
        {
            name: 'X / Twitter',
            icon: <FaTwitter size={24} />,
            url: (url) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check this out: ${title}`)}&url=${encodeURIComponent(url)}`,
            color: '#000000'
        },
        {
            name: 'LinkedIn',
            icon: <FaLinkedin size={24} />,
            url: (url) => `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
            color: '#0077B5'
        },
        {
            name: 'WhatsApp',
            icon: <FaWhatsapp size={24} />,
            url: (url) => `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`,
            color: '#25D366'
        }
    ];

    return (
        <>
            <button 
                onClick={handleShare}
                className="share-btn"
                aria-label="Share article"
            >
                <FaShareAlt /> Share
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="share-modal-overlay"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="share-modal"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="share-header">
                                <h3>Share Article</h3>
                                <button onClick={() => setIsOpen(false)} className="close-btn">
                                    <FaTimes />
                                </button>
                            </div>
                            
                            <div className="share-grid">
                                {shareLinks.map((link) => (
                                    <a 
                                        key={link.name}
                                        href={link.url(getShareUrl())}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="share-item"
                                        style={{ '--hover-color': link.color }}
                                    >
                                        <div className="icon-wrapper" style={{ color: link.color }}>
                                            {link.icon}
                                        </div>
                                        <span>{link.name}</span>
                                    </a>
                                ))}
                                
                                <button 
                                    className="share-item copy-btn"
                                    onClick={copyToClipboard}
                                >
                                    <div className="icon-wrapper" style={{ color: '#888' }}>
                                        <FaCopy size={24} />
                                    </div>
                                    <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                .share-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    background: transparent;
                    color: #00f0ff;
                    border: 1px solid #00f0ff;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: all 0.2s;
                    margin-left: auto; /* Push to right if in flex container */
                }
                .share-btn:hover {
                    background: rgba(0, 240, 255, 0.1);
                }

                .share-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.85);
                    backdrop-filter: blur(5px);
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }

                .share-modal {
                    background: #1a1a1a;
                    border: 1px solid #333;
                    border-radius: 12px;
                    width: 100%;
                    max-width: 400px;
                    padding: 20px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                }

                .share-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    padding-bottom: 15px;
                    border-bottom: 1px solid #333;
                }

                .share-header h3 {
                    margin: 0;
                    color: #fff;
                    font-size: 1.2rem;
                }

                .close-btn {
                    background: none;
                    border: none;
                    color: #888;
                    cursor: pointer;
                    padding: 5px;
                    font-size: 1.2rem;
                    transition: color 0.2s;
                }
                .close-btn:hover { color: #fff; }

                .share-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 15px;
                }

                .share-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    text-decoration: none;
                    background: #252525;
                    padding: 15px 10px;
                    border-radius: 8px;
                    transition: transform 0.2s, background 0.2s;
                    border: 1px solid transparent;
                    cursor: pointer;
                }

                .share-item:hover {
                    transform: translateY(-2px);
                    background: #2a2a2a;
                    border-color: #444;
                }

                .share-item span {
                    color: #ccc;
                    font-size: 0.8rem;
                    font-weight: 500;
                }

                .icon-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    background: rgba(255,255,255,0.05);
                    border-radius: 50%;
                }
                
                .copy-btn {
                    border: none;
                    font-family: inherit;
                }
            `}</style>
        </>
    );
}

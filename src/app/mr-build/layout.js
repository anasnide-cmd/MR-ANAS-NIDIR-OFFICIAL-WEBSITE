'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import NotificationCenter from '../../components/NotificationCenter';

export default function BuildLayout({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
            // We don't force redirect here yet, pages will handle their own auth state
        });
        return () => unsub();
    }, []);

    // Non-blocking layout: We render children immediately.
    // Auth state is used for the Header.
    
    // Passthrough layout - Pages handle their own full-screen layouts
    return (
        <>
            {children}
        </>
    );
}

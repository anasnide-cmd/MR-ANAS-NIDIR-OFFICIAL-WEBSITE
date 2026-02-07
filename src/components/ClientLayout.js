'use client';
import { usePathname } from 'next/navigation';
import CardNav from './ReactBits/CardNav';
import Footer from './Footer';
import PresenceTracker from './PresenceTracker';

export default function ClientLayout({ children, navItems }) {
    const pathname = usePathname();
    const isSearchPage = pathname?.startsWith('/mr-search') || pathname?.startsWith('/nex-ai') || pathname?.startsWith('/web-store');

    // Conditionally render based on '/mr-build' path
    if (pathname?.startsWith('/mr-build')) {
        return (
            <>
                <PresenceTracker />
                <main>{children}</main>
            </>
        );
    }

    // Default rendering for other paths
    return (
        <>
            <PresenceTracker />
            {!isSearchPage && <CardNav items={navItems} />}
            {children}
            {!isSearchPage && <Footer />}
        </>
    );
}

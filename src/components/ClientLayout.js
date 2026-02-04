'use client';
import { usePathname } from 'next/navigation';
import CardNav from './ReactBits/CardNav';
import Footer from './Footer';
import PresenceTracker from './PresenceTracker';

export default function ClientLayout({ children, navItems }) {
    const pathname = usePathname();
    const isSearchPage = pathname?.startsWith('/mr-search');

    return (
        <>
            <PresenceTracker />
            {!isSearchPage && <CardNav items={navItems} />}
            {children}
            {!isSearchPage && <Footer />}
        </>
    );
}

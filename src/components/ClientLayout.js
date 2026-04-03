'use client';
import { usePathname } from 'next/navigation';
import CardNav from './ReactBits/CardNav';
import Footer from './Footer';
import PresenceTracker from './PresenceTracker';

export default function ClientLayout({ children, navItems }) {
    const pathname = usePathname();
    const isSearchPage = pathname?.startsWith('/mr-search') || pathname?.startsWith('/nex-ai') || pathname?.startsWith('/web-store');

    return (
        <>
            <PresenceTracker />
            {/* Contextual Layout Handling */}
            {(() => {
                if (pathname?.startsWith('/mr-build') || pathname?.startsWith('/mr-engine') || pathname?.startsWith('/s/') || pathname?.startsWith('/celco') || pathname?.startsWith('/lab')) {
                    return <main>{children}</main>;
                }
                return (
                    <>
                        {!isSearchPage && <CardNav items={navItems} />}
                        {children}
                        {!isSearchPage && <Footer />}
                    </>
                );
            })()}
        </>
    );
}

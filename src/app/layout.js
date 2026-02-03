import { Orbitron, Exo_2 } from 'next/font/google';
import './globals.css';
import ClientLayout from '../components/ClientLayout';
import GlobalErrorBoundary from '../components/GlobalErrorBoundary';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

const exo2 = Exo_2({
  subsets: ['latin'],
  variable: '--font-exo2',
  display: 'swap',
});

export const metadata = {
  title: {
    template: '%s | MR ANAS NIDIR',
    default: 'MR ANAS NIDIR | Official Site',
  },
  description: 'MR ANAS NIDIR — Entrepreneur | Visionary | Digital Innovator. Building the future with NEXENGINE, NEX AI, and ANAS GPT.',
  keywords: ['Anas Nidir', 'Tech Entrepreneur', 'AI', 'NEXENGINE', 'Savoirpedia', 'Mr Build', 'Web Development', 'Futurist'],
  authors: [{ name: 'Mr Anas Nidir' }],
  creator: 'Mr Anas Nidir',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mr-anas-nidir-official-website.web.app',
    siteName: 'MR ANAS NIDIR Official',
    title: 'MR ANAS NIDIR | Official Site',
    description: 'The official digital universe of Mr Anas Nidir. Explore projects, tools, and the future of tech.',
    images: [
      {
        url: '/assets/logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Mr Anas Nidir Official Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MR ANAS NIDIR | Official Site',
    description: 'Entrepreneur • Visionary • Digital Innovator',
    images: ['/assets/logo.jpg'],
    creator: '@anasnide',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  const navItems = [
    {
      label: 'Main',
      bgColor: '#111',
      textColor: '#fff',
      links: [
        { label: 'Home', href: '/', ariaLabel: 'Go to Home' },
        { label: 'Projects', href: '/#projects', ariaLabel: 'View Projects' },
        { label: 'Products', href: '/#products', ariaLabel: 'View Products' }
      ]
    },
    {
      label: 'Content',
      bgColor: '#161616',
      textColor: '#00f0ff',
      links: [
        { label: 'SavoirPedia', href: '/savoirpedia', ariaLabel: 'Read SavoirPedia' },
        { label: 'Mr Build', href: '/mr-build', ariaLabel: 'Mr Build Dashboard' },
        { label: 'Games', href: '/mr-games', ariaLabel: 'Mr Arcade Games' }
      ]
    },
    {
      label: 'Socials',
      bgColor: '#00f0ff',
      textColor: '#000',
      links: [
        { label: 'Instagram', href: 'https://www.instagram.com/anasnide', ariaLabel: 'Instagram' },
        { label: 'TikTok', href: 'https://tiktok.com/@anasnide', ariaLabel: 'TikTok' }
      ]
    }
  ];

  return (
    <html lang="en" className={`${orbitron.variable} ${exo2.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <GlobalErrorBoundary>
            <ClientLayout navItems={navItems}>
                {children}
            </ClientLayout>
        </GlobalErrorBoundary>
      </body>
    </html>
  );
}

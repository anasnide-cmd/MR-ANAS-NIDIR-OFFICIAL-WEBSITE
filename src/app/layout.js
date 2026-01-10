import { Orbitron, Exo_2 } from 'next/font/google';
import './globals.css';
import CardNav from '../components/ReactBits/CardNav';
import Footer from '../components/Footer';

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
  title: 'MR ANAS NIDIR | Official Site',
  description: 'MR ANAS NIDIR — Entrepreneur | Visionary | Digital Innovator',
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
        { label: 'Blog', href: '/blog', ariaLabel: 'Read Blog' },
        { label: 'Mr Build', href: '/mr-build', ariaLabel: 'Mr Build Dashboard' }
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
        <CardNav items={navItems} />
        {children}
        <Footer />
      </body>
    </html>
  );
}

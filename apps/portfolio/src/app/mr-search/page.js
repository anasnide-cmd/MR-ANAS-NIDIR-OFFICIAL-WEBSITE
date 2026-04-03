import LandingClient from '../../components/MrSearch/LandingClient';

export const metadata = {
  title: 'Mr Search | The Super Engine',
  description: 'The intelligent search engine for the MR ANAS NIDIR digital universe. Find projects, articles, and tools instantly. THE SUPER ENGINE.',
  openGraph: {
    title: 'Mr Search | The Super Engine',
    description: 'The intelligent search engine for the MR ANAS NIDIR digital universe.',
    images: [
      {
        url: '/assets/logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Mr Search Logo',
      },
    ],
  },
};

export default function SearchPage() {
  return <LandingClient />;
}

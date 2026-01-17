import LandingClient from '../../components/MrBuild/LandingClient';

export const metadata = {
  title: 'Mr Build | AI Website Builder',
  description: 'Deploy reactive, high-performance digital architectures in seconds. The next-generation site construction protocol.',
  openGraph: {
    title: 'Mr Build | AI Website Builder',
    description: 'Deploy reactive, high-performance digital architectures in seconds. The next-generation site construction protocol.',
    images: [
      {
        url: '/assets/logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Mr Build Logo',
      },
    ],
  },
};

export default function BuildLandingPage() {
  return <LandingClient />;
}

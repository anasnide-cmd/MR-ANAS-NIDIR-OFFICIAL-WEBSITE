import HubClient from '../../components/Savoirpedia/HubClient';

export const metadata = {
  title: 'Savoirpedia | Knowledge Base',
  description: 'The official knowledge base and documentation hub for MR ANAS NIDIR projects. Explore articles, devlogs, and technical documentation.',
  openGraph: {
    title: 'Savoirpedia | Knowledge Base',
    description: 'The official knowledge base and documentation hub for MR ANAS NIDIR projects.',
    images: [
      {
        url: '/assets/logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Savoirpedia Logo',
      },
    ],
  },
};

export default function SavoirpediaHub() {
  return <HubClient />;
}

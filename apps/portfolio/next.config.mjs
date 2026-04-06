import { composePlugins, withNx } from '@nx/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  trailingSlash: true,
  transpilePackages: ['@monaco-editor/react'],
  async rewrites() {
    return [
      {
        source: '/mr-build',
        destination: `${process.env.NEXT_PUBLIC_IDE_URL || 'http://localhost:4210'}/mr-build`,
      },
      {
        source: '/mr-build/:path*',
        destination: `${process.env.NEXT_PUBLIC_IDE_URL || 'http://localhost:4210'}/mr-build/:path*`,
      },
      {
        source: '/mr-engine/:path*',
        destination: `${process.env.NEXT_PUBLIC_IDE_URL || 'http://localhost:4210'}/mr-engine/:path*`,
      }
    ];
  }
};

const plugins = [withNx];

export default composePlugins(...plugins)(nextConfig);

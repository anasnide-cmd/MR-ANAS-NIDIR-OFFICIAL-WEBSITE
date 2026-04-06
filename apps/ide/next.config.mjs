import { composePlugins, withNx } from '@nx/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  trailingSlash: true,
  transpilePackages: ['@monaco-editor/react'],
};

const plugins = [withNx];

export default composePlugins(...plugins)(nextConfig);

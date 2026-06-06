/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  trailingSlash: true,
  transpilePackages: ['@monaco-editor/react'],
};

export default nextConfig;


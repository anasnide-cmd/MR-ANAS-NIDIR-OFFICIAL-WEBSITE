/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  trailingSlash: true,
  transpilePackages: ['@monaco-editor/react'],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

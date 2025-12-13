/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'cdn.sanity.io'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  typescript: {
    // Skip type checking during the build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Skip ESLint during the build
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

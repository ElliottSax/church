/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['localhost', 'cdn.sanity.io'],
  },
  trailingSlash: true,
  basePath: '/church',
  assetPrefix: '/church/',
};

module.exports = nextConfig;

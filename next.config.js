/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
  // Remove experimental server actions for static export
  // experimental: {
  //   serverActions: {
  //     allowedOrigins: ['localhost:3000'],
  //   },
  // },
  // Add trailing slash for better GitHub Pages compatibility
  trailingSlash: true,
  // Deploying to GitHub Pages with username.github.io/church
  basePath: '/church',
  assetPrefix: '/church/',
};

module.exports = nextConfig;

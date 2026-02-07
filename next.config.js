const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'cdn.sanity.io'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
    // Required for Sentry to work with Next.js instrumentation
    instrumentationHook: true,
  },
  // Exclude Winston from client-side bundle
  serverComponentsExternalPackages: ['winston'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'fs' module on the client to prevent Winston file transport issues
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
  typescript: {
    // Type checking enabled
    ignoreBuildErrors: false,
  },
  eslint: {
    // Skip ESLint during builds (run separately in CI)
    ignoreDuringBuilds: true,
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

// Sentry configuration options
const sentryWebpackPluginOptions = {
  // Suppresses source map uploading logs during build
  silent: true,

  // Upload source maps to Sentry
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Only upload source maps in production
  disableServerWebpackPlugin: process.env.NODE_ENV !== 'production',
  disableClientWebpackPlugin: process.env.NODE_ENV !== 'production',

  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  widenClientFileUpload: true,

  // Transpile SDK to be compatible with IE11
  transpileClientSDK: true,

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },
};

// Make sure adding Sentry options is the last code to run before exporting
module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);

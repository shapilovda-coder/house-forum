import { withSentryConfig } from '@sentry/nextjs'
import type { NextConfig } from 'next'
import withBundleAnalyzer from '@next/bundle-analyzer'

// Bundle analyzer configuration
const bundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  cleanDistDir: true,
  trailingSlash: true,
  
  // Image optimization
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
  },
  
  // ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Compression for static export
  compress: true,
  
  // React Strict Mode for better development
  reactStrictMode: true,
  
  // Remove X-Powered-By header
  poweredByHeader: false,
  
  // Experimental optimizations
  experimental: {
    // Optimize package imports for common libraries
    optimizePackageImports: ['lucide-react'],
  },
  
  // Custom headers for static export (will be applied to _headers in dist)
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

// Apply bundle analyzer first, then Sentry
const configWithBundleAnalyzer = bundleAnalyzerConfig(nextConfig)

export default withSentryConfig(configWithBundleAnalyzer, {
  // Sentry options
  org: 'stroysales',
  project: 'house-forum',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // For static export, do not use tunnelRoute.
  // tunnelRoute is incompatible with output:'export'.
  // tunnelRoute: '/monitoring',

  // Use Next.js deprecation-friendly options
  webpack: {
    treeshake: {
      removeDebugLogging: true,
    },
  },

  // Disable legacy logger option (deprecated in sentry-js)
  // disableLogger: true,

  // automaticVercelMonitors is not needed for static export
  // automaticVercelMonitors: true,
})

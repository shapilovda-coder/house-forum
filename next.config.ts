import { withSentryConfig } from '@sentry/nextjs'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  cleanDistDir: true,
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
}

export default withSentryConfig(nextConfig, {
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

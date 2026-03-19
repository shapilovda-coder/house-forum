/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  cleanDistDir: true,
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // NOTE: Redirects disabled - not compatible with static export
  // Use client-side redirects or middleware instead
}

module.exports = nextConfig

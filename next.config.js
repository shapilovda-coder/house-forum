/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  async redirects() {
    return [
      {
        source: '/zashchitnye-rolstavni/:path*',
        destination: '/zashitnye-rolstavni/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig

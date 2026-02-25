/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  async redirects() {
    return [
      // Canonical slug redirect: zashchitnye -> zashitnye
      {
        source: '/zashchitnye-rolstavni/:path*',
        destination: '/zashitnye-rolstavni/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
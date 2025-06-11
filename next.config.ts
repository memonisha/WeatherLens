import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'openweathermap.org',
        port: '',
        pathname: '/img/wn/**',
      },
    ],
  },
  experimental: {
    allowedDevOrigins: ['http://192.168.1.4:3000', 'http://localhost:3000', 'https://weatherlens.vercel.app/'], // change to your local dev URL
  },
}

export default nextConfig

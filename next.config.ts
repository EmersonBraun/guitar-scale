import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Vercel added HSTS automatically; on Cloudflare Workers the app must send it.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{ key: 'Strict-Transport-Security', value: 'max-age=63072000' }],
      },
    ]
  },
}

export default nextConfig

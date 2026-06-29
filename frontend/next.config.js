/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/socket.io/:path*',
        destination: `${(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001').replace(/\/$/, "")}/socket.io/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*).webp',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

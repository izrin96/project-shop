/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: "/strapi/:path*",
        destination: `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/pages/login",
        destination: "/login",
      },
      {
        source: "/pages/:path*",
        destination: "/:path*",
      },
    ];
  },
};

module.exports = nextConfig;

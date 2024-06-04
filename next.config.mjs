/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
    images: {
      remotePatterns: [{ protocol: "https", hostname: "i.ibb.co" }],
    },
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "i.ibb.co" }],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

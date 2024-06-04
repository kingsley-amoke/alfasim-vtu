/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true,
        images: {
            domains: [
              "i.ibb.co"
            ],
        }
    },
};

export default nextConfig;

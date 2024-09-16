/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'personalimagelist.s3.eu-north-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'blog.cypexsoft.com',
      },
    ],
  },
};

export default nextConfig;

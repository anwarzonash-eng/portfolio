/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@react-pdf/renderer"],
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    IS_SERVICES_ALLOWED: process.env.IS_SERVICES_ALLOWED
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.s3.eu-north-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "**.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "blog.cypexsoft.com",
      },
      {
        protocol: "https",
        hostname: "leewopbookkeeping.com",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;

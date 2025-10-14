// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   env: {
//     API_BASE_URL: process.env.API_BASE_URL,
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "personalimagelist.s3.eu-north-1.amazonaws.com",
//       },
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//       },
//       {
//         protocol: "https",
//         hostname: "blog.cypexsoft.com",
//       },
//       // {
//       //   protocol: 'http',
//       //   hostname: 'blog.cypexsoft.com',
//       // },
//       {
//         protocol: "https",
//         hostname: "leewopbookkeeping.com",
//       },
//     ],
//   },
// };

// export default nextConfig;

// New Config
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
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
      {
      unoptimized: true,
      }
    ],
  },
};

export default nextConfig;

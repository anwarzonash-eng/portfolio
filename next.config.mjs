/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@react-pdf/renderer"],
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    IS_SERVICES_ALLOWED: process.env.IS_SERVICES_ALLOWED
  },
  images: {
    // Tenants attach their own domains on the backend and new image hosts appear
    // without the frontend being told, so a fixed allowlist cannot work here: an
    // unlisted host does not degrade, it returns 400 and renders nothing.
    //
    // The trade-off being accepted is that this makes /_next/image an open image
    // proxy - anyone can pass ?url=<any https url> and have this server fetch and
    // transcode it. That is bounded below (deviceSizes/imageSizes cap the number
    // of distinct transcodes, minimumCacheTTL keeps results cached) but it is NOT
    // eliminated. Rate-limit /_next/image at the reverse proxy, and narrow this
    // pattern the moment the backend can expose the real tenant host list.
    remotePatterns: [{ protocol: "https", hostname: "**" }],

    // Tenant-supplied icons are frequently SVG (the local skill icons this
    // project used to ship all were). With dangerouslyAllowSVG false the
    // optimiser rejects SVG with a 400, which would break those icons and the
    // 49 local <Image src="*.svg"> call sites. The CSP below is the documented
    // mitigation: it stops script execution if an SVG is opened directly.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox;",
    contentDispositionType: "attachment",

    // 2048 and 3840 are dropped: nothing in this layout is rendered that wide,
    // and each extra entry multiplies the transcode matrix on a self-hosted box.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Uploads are timestamped server-side, so a given URL is immutable in
    // practice and can be cached hard.
    minimumCacheTTL: 2592000, // 30 days
  },
};

export default nextConfig;

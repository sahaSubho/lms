/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  // swcMinify: false,
  images: {
    domains: ["fastly.picsum.photos", "cc-home.s3.ap-south-1.amazonaws.com"], // Add the external domain here
  },
  // TODO: need to remove this for prod release
  typescript: {
    // ignoreBuildErrors: true,
  },
  // TODO: need to remove this for prod release
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["fastly.picsum.photos", "cc-home.s3.ap-south-1.amazonaws.com"], // Add the external domain here
  },
};

export default nextConfig;

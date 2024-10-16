/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static export
  images: {
    unoptimized: true, // Disables Next.js image optimization, which is needed for static export
  },
};

export default nextConfig;

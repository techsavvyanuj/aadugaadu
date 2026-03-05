import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compress responses with gzip
  compress: true,

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 192, 256],
  },

  // Reduce JS bundle size
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'three'],
  },

  // Production optimizations
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;

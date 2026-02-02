import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  cleanDistDir: true,
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  trailingSlash: true,
  generateEtags: false,
};

export default nextConfig;

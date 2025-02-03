import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false
  },
  reactStrictMode: true,  
  eslint: {
    ignoreDuringBuilds: true,  
  },
  experimental: {
    serverComponentsExternalPackages: [`require-in-the-middle`],
  },
};

export default nextConfig;

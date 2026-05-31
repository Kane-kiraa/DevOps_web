import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',

  // Use a configurable basePath so local dev can run at / while GitHub Pages
  // deployment can still be served under /DevOps_web.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
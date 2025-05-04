import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // WARNING: this skips _all_ linting errors at build time
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

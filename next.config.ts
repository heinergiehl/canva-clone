import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // WARNING: this skips _all_ linting errors at build time
    ignoreDuringBuilds: true,
  },
}

export default nextConfig

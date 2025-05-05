import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // WARNING: this skips _all_ linting errors at build time
    ignoreDuringBuilds: true,
  },
  ...(process.env.PRODUCTION
    ? { basePath: "/myapps/canva-clone", assetPrefix: "/myapps/canva-clone/" }
    : {}),
}

export default nextConfig

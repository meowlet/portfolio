import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  experimental: {
    // the icon package is a single barrel of ~1,500 named exports
    optimizePackageImports: ["@phosphor-icons/react"],
  },
};

export default nextConfig;

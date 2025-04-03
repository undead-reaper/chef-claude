import type { NextConfig } from "next";
import { webpack } from "next/dist/compiled/webpack/webpack";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    PERPLEXITY_API_KEY: process.env.PERPLEXITY_API_KEY,
  }
};

export default nextConfig;

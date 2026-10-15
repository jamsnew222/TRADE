import type { NextConfig } from "next";

// PAGES_BASE_PATH is set only by the GitHub Pages workflow — the site is
// served at /TRADE/, while the Capacitor build must stay unprefixed.
const pagesBase = process.env.PAGES_BASE_PATH;

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  output: 'export',
  ...(pagesBase ? { basePath: pagesBase } : {}),
};

export default nextConfig;

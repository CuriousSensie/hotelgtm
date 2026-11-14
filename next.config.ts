import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static HTML export → deployed to Cloudflare Pages (no server runtime needed).
  output: 'export',
  poweredByHeader: false,
};

export default nextConfig;

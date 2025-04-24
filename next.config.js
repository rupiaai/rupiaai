/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [],
    domains: [],
  },
  trailingSlash: true, // optional but good for GitHub Pages
};

module.exports = nextConfig;

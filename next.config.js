/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [],
    domains: [],
  },
  trailingSlash: true, // optional but good for GitHub Pages
};

module.exports = nextConfig;

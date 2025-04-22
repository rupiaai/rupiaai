/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/rupiaai" : "",
  images: {
    unoptimized: true,
    remotePatterns: [],
    domains: [],
  },
  assetPrefix: process.env.NODE_ENV === "production" ? "/rupiaai" : "",
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */

const withTM = require("next-transpile-modules")(["gsap"]);

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.pexels.com" , "yt3.ggpht.com"],
  },
};

module.exports = withTM(nextConfig);

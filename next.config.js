/** @type {import('next').NextConfig} */

const withTM = require("next-transpile-modules")(["gsap"]);

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.pexels.com",
      "yt3.ggpht.com",
      "media-exp1.licdn.com",
      "www.helixhelezon-courses.com",
      "pbs.twimg.com",
      "images.pexels.com",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = withTM(nextConfig);

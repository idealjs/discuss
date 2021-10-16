/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = (phase) => ({
  reactStrictMode: true,
  eslint: {
    dirs: ["pages", "components", "lib"],
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  webpack: (config, context) => {
    const { isServer } = context;
    if (phase === PHASE_DEVELOPMENT_SERVER && !isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin());
    }
    return config;
  },
});

const images =
  process.env.NODE_ENV === "production"
    ? {
        loader: "akamai",
        path: "/",
        formats: ["image/avif", "image/webp"],
      }
    : {};

const isStaticExport = process.env.OUTPUT_EXPORT === "1";
const svgrLoader = require.resolve("./scripts/svgr-loader");

const nextConfig = {
  output: isStaticExport ? "export" : undefined,
  distDir: isStaticExport ? "dist" : ".next",
  images,
  turbopack: {
    rules: {
      "*.yml": {
        loaders: ["yaml-loader"],
        as: "*.js",
      },
      "*.svg": {
        loaders: [svgrLoader],
        as: "*.js",
      },
    },
  },
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.yml$/,
        use: "yaml-loader",
      },
      {
        test: /\.svg$/,
        use: svgrLoader,
      },
    );

    return config;
  },
};

const plugins = [];

module.exports = () => plugins.reduce((acc, next) => next(acc), nextConfig);

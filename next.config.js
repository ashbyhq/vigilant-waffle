const images =
  process.env.NODE_ENV === "production"
    ? {
        loader: "akamai",
        path: "/",
        formats: ["image/avif", "image/webp"],
      }
    : {};

const isStaticExport = process.env.OUTPUT_EXPORT === "1";

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
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  webpack: (config) => {
    config.module.rules.push(
      ...[
        {
          test: /\.yml$/,
          use: "yaml-loader",
        },
        {
          test: /\.svg$/,
          use: "@svgr/webpack",
        },
      ],
    );

    return config;
  },
};

const plugins = [];

module.exports = () => plugins.reduce((acc, next) => next(acc), nextConfig);

const webpack = require("webpack");

// config-overrides.js
module.exports = {
  webpack: function (config, env) {
    config.module.rules = config.module.rules.map((rule) => {
      if (rule.oneOf instanceof Array) {
        rule.oneOf[rule.oneOf.length - 1].exclude = [
          /\.(js|mjs|jsx|cjs|ts|tsx)$/,
          /\.html$/,
          /\.json$/,
        ];
      }
      return rule;
    });
    config.resolve.fallback = {
      ...config.resolve.fallback,
      zlib: false,
      http: false,
      crypto: false,
      https: false,
      stream: false,
      vm: false,
      process: require.resolve("process/browser"),
      buffer: require.resolve("buffer/"), // Polyfill for Buffer
    };

    config.plugins.push(
      new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"], // Polyfill Buffer globally
      })
    );

    return config;
  },
};

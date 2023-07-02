const { NODE_ENV } = process.env;

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      if (NODE_ENV === "production") {
        webpackConfig.output.publicPath = "./";
      }
      return webpackConfig;
    },
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:50001",
        changeOrigin: true,
        pathRewrite: {
          // "^/api": "",
        },
      },
    },
  },
};

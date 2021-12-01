const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../public"),
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/api": "/api" },
        logLevel: "debug"
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
            @import "@/assets/scss/main.scss";
            `
      }
    }
  }
};

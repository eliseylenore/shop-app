const path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
module.exports = {
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()]
  },
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
  },
  pluginOptions: {
    compression: {
      brotli: {
        filename: "[file].br[query]",
        algorithm: "brotliCompress",
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        minRatio: 0.8,
      },
      gzip: {
        filename: "[file].gz[query]",
        algorithm: "gzip",
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        minRatio: 0.8,
      }
    }
  },
  // devServer: {
  //   before(app) {
  //     app.use("*.js", (req, res, next) => {
  //       if (req.get("Accept-Encoding")?.includes("br")) {
  //         req.url += ".br"
  //         res.set("Content-Encoding", "br")
  //         res.set("Content-Type", "application/javascript; charset=utf-8")
  //       }
  //       next()
  //     })
  //   }
  // }
};

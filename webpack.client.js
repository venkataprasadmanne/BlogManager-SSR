const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base");

const config = {
  mode: "development",
  // Tell webpack to root file of our server app
  entry: "./src/client/index.js",

  // Tell webpack where to put output file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public")
  },
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: "style-loader"
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: "css-loader"
          }
        ]
      }
    ]
  },

  devtool: "inline-source-map"
};

module.exports = merge(baseConfig, config);

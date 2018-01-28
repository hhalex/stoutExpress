const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CheckerPlugin } = require("awesome-typescript-loader");

module.exports = {
  devServer: {
    inline: true,
    contentBase: "target/scala-2.12/classes/public",
    port: 3000
  },
  devtool: "source-map",
  entry: "./core/src/main/js/index.tsx",
  resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
      rules: [
          // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
          { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

          // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
          { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
      ]
  },
  output: {
    path: path.resolve(__dirname, "target/scala-2.12/classes/public"),
    filename: "dist/bundle.js"
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "core/src/main/html/index.html")
    }),
    new CheckerPlugin()
  ]
};

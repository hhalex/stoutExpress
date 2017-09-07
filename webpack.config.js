var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devServer: {
    inline: true,
    contentBase: "target/scala-2.12/classes/public",
    port: 3000
  },
  devtool: "source-map",
  entry: "./core/src/main/js/index.js",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              babelrc: false,
              presets: ["react", "es2015", "stage-0", "flow"]
            }
          }
        ]
      },
      {
        test: /\.(scss|sass|css)/,
        loader: "style-loader!css-loader!sass-loader"
      }
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
    })
  ]
};

// webpack.config.js
const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    "tasks/shorts": "./src/tasks/shorts.js",
    "tasks/watch": "./src/tasks/watch.js",
    background: "./src/background.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public/manifest.json"),
          to: path.resolve(__dirname, "dist"),
        },
        {
          from: path.resolve(__dirname, "public/icons"),
          to: path.resolve(__dirname, "dist/icons"),
        },
        {
          from: path.resolve(__dirname, "public/comments.json"),
          to: path.resolve(__dirname, "dist/comments.json"),
        },
      ],
    }),
  ],
  resolve: {
    extensions: [".js", ".json"],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false, // Disable LICENSE.txt file generation
      }),
    ],
  },
  devtool: "cheap-source-map",
};

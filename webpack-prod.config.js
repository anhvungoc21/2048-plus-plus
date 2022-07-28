const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    bundle: path.resolve(__dirname, "src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
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
      {
        test: /\.wav$/,
        loader: "file-loader",
        options: {
          name: "[name].wav",
        },
      },
      {
        test: /\.mp3$/,
        loader: "file-loader",
        options: {
          name: "[name].mp3",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "2048++",
      filename: "index.html",
      template: "src/template.html",
      inject: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/assets/favicon.ico" },
        { from: "./src/styles" },
      ],
    }),
    new MiniCssExtractPlugin(),
  ],
};

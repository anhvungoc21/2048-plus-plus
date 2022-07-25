const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const BundleAnalyzerPlugin =
//   require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "development",
  entry: {
    bundle: path.resolve(__dirname, "src/index.js"),
    dark: path.resolve(__dirname, "src/styles/dark.js"),
    light: path.resolve(__dirname, "src/styles/light.js"),
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        darkStyles: {
          type: "css/mini-extract",
          name: "dark-theme",
          chunks: (chunk) => {
            return chunk.name === "dark";
          },
          enforce: true,
        },
        lightStyles: {
          type: "css/mini-extract",
          name: "light-theme",
          chunks: (chunk) => {
            return chunk.name === "light";
          },
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "2048++",
      filename: "index.html",
      template: "src/template.html",
      inject: false,
    }),
    new MiniCssExtractPlugin(),
    new Dotenv(),
    // new BundleAnalyzerPlugin(),
  ],
};

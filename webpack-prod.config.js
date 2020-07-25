const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const addBaseConfig = require("./webpack-base.config");
const CONFIG = require("./webpack-config");

const configs = addBaseConfig({
  mode: "production",
  // devtool: "source-map",
  output: {
    path: path.resolve(__dirname, CONFIG.BUILD_DIR),

    filename: CONFIG.CREATOR + ".[name].min.js",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader", // Run post css actions
            options: {
              plugins: function () {
                // post css plugins, can be exported to postcss.config.js
                return [require("precss"), require("autoprefixer")];
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|gif|jpg|jpeg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: CONFIG.CREATOR + ".[hash:6].[ext]",
              publicPath: "./",
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: CONFIG.CREATOR + ".[name].[ext]",
              outputPath: "fonts",
              publicPath: "./fonts",
            },
          },
        ],
      },
      {
        // HTML LOADER
        test: /\.html$/,
        loader: "html-loader",
        options: {
          minimize: true,
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: CONFIG.CREATOR + ".[hash:6].min.css",
    }),
    new HtmlWebpackPlugin({
      title: CONFIG.TITLE + ` (${CONFIG.CREATOR})`,
      filename: path.join(__dirname, CONFIG.BUILD_DIR + "/index.html"),
      template: "web/index.html",
      inject: "body",
    }),
  ],
  performance: {
    maxEntrypointSize: 550000,
    maxAssetSize: 550000,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: { ecma: 6 },
      }),
    ],
  },
});

module.exports = configs;

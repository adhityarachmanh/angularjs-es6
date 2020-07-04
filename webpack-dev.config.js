const { HotModuleReplacementPlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CONFIG = require("./arh");
const addBaseConfig = require("./webpack-base.config");


const configs = addBaseConfig({
  mode: "development",
  devtool: 'inline-source-map',
  output: {
    filename: `js/${CONFIG.CREATOR}.[hash].js`,
  },
  module: {
    rules: [
      {
        //scsss
        test: /\.scss$/,
        use: ["style-loader", "css-loader",{
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }, "sass-loader"],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: `${CONFIG.CREATOR}.[hash].[ext]`,
              outputPath: "assets",
            },
          },
        ],
      },
      {
        // HTML LOADER
        test: /\.html$/,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: CONFIG.TITLE+` (${CONFIG.CREATOR})`,
      filename: "index.html",
      template: "web/index.html"
    }),
  ],
  devServer: {
    compress: true,
    port: 7000,
    host:"localhost",
    historyApiFallback: true,
    // proxy: {
    //   "/": `http://localhost:${CONFIG.PORT}`,
    // },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
});

module.exports = configs;

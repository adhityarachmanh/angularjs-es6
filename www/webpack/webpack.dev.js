/*
mod : Module Builder
cre : arh 
ver : 0
*/
const {
  HotModuleReplacementPlugin
} = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const addBaseConfig = require("./webpack.base");



module.exports = (env, argv) => {
  let context = argv.project;
  return addBaseConfig(argv, {
    mode: "development",
    devtool: "inline-source-map",
    output: {
      filename: `js/${context}.[hash].js`,
    },
    module: {
      rules: [{
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          //scsss
          test: /\.s[ac]ss$/i,
          use: [
            "style-loader",
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
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [{
              loader: "url-loader",
              options: {
                name: context + ".[hash].[ext]",
                outputPath: "assets/images",
                limit: 10000,
              },
            },
            {
              loader: "img-loader",
              options: {},
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf)$/,
          use: [{
            loader: "file-loader",
            options: {
              name: context + ".[hash].[ext]",
              outputPath: "assets/fonts",
            },
          }, ],
        },
        {
          // HTML LOADER
          test: /\.html$/,
          loader: "html-loader",
        },
      ],
    },
    plugins: [
      // new BrowserSyncPlugin({
      //   port: CONFIG.PORT,
      //   host: CONFIG.HOST,
      //   files: ["web/*"],
      //   server: { baseDir: ['build'] },
      //   ghostMode: {
      //     clicks: false,
      //     location: false,
      //     forms: false,
      //     scroll: false,
      //   },
      //   injectChanges: true,
      //   logFileChanges: true,
      //   logLevel: "debug",
      //   logPrefix: "wepback",
      //   notify: true,
      //   reloadDelay: 0,
      // }),
      new HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        base: {
          href: '/',
        },
        filename: "index.html",
        template: `../index.${context}.htm`,
      }),
    ],
    devServer: {
      compress: true,
      // port: CONFIG.WEB_SERVER.PORT,
      // host: CONFIG.WEB_SERVER.HOST,
      historyApiFallback: true,
      // headers: {
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      //   "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      // },
      // proxy: {
      //   "/": `http://${CONFIG.HOST}:${CONFIG.PORT}`,
      // },
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
      },
    },
  });
};
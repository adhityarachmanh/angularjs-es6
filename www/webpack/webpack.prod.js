/*
mod : Module Builder
cre : arh 
ver : 0
*/
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const addBaseConfig = require("./webpack.base");
const CONFIG = require("./webpack.config");



module.exports = (env, argv) => {
  let context = argv.project;
  return addBaseConfig(argv, {
    mode: "production",
    // devtool: "source-map",
    output: {
      path: path.resolve(__dirname, CONFIG.BUILD_DIR),
      filename: "assets/js/"+context + ".[name].min.js",
    },
    module: {
      rules: [{
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.s[ac]ss$/i,
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
            {
              loader: "sass-loader",
              options: {
                implementation: require("sass"),
                sassOptions: {},
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [{
              loader: "url-loader",
              options: {
                name: context + ".[hash].[ext]",
                outputPath: "assets/images",
                publicPath: "./assets/images",
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
              publicPath: "./assets/fonts",
            },
          }, ],
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
        filename: "assets/css/"+ context + ".min.css",
      }),
      new HtmlWebpackPlugin({
        minify: true,
        base: {
          href: '/',
        },
        favicon: '../assets/favicon.ico',
        filename: path.join(__dirname, CONFIG.BUILD_DIR + `/index.${context}.min.htm`),
        template: `../${context}/index.html`,
        // inject: "body",
      }),
    ],
    performance: {
      maxEntrypointSize: 550000,
      maxAssetSize: 550000,
    },
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
      },
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            ecma: 6
          },
        }),
      ],
    },
  });
};
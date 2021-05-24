/*
mod : Module Builder
cre : arh 
ver : 0
*/
const _ = require("lodash");
const CONFIG = require('./webpack.config');
const sharedConfigs = (argv) => {
  return {
    context: __dirname,
    entry: ["@babel/polyfill", `../${argv.project}/${CONFIG.FILE_MODULE}`],
    module: {
      rules: [{
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],

              plugins: [
                // angular JS ES 6
                "angularjs-annotate",
              ],
            },
          },
        },
        // {
        //   test: require.resolve("webrtc-adapter"),
        //   use: "expose-loader",
        // },
      ],
    },
  };
};

const mergeResolver = (objValue, srcValue) =>
  _.isArray(objValue) ? objValue.concat(srcValue) : undefined;

module.exports = (argv, configs) =>
  _.mergeWith(sharedConfigs(argv), configs, mergeResolver);
const _ = require("lodash");
const CONFIG = require("./webpack-config");

const sharedConfigs = {
  context: __dirname,
  entry: ["@babel/polyfill", `./${CONFIG.BASE_DIR}/app.js`],
  module: {
    rules: [
      {
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
      {
        test: require.resolve("webrtc-adapter"),
        use: "expose-loader",
      },
    ],
  },
};

const mergeResolver = (objValue, srcValue) =>
  _.isArray(objValue) ? objValue.concat(srcValue) : undefined;

module.exports = (configs) =>
  _.mergeWith(sharedConfigs, configs, mergeResolver);

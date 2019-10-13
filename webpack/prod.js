const merge = require("webpack-merge");
const path = require("path");
const base = require("./base");
const TerserPlugin = require("terser-webpack-plugin");

const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = merge(base, {
  mode: "production",
  output: {
    filename: "bundle.min.js"
  },
  devtool: false,
  performance: {
    maxEntrypointSize: 900000,
    maxAssetSize: 900000
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        }
      }),
      new WebpackPwaManifest({
        name: 'Elematch',
        short_name: 'Elematch',
        description: 'Elemettch!',
        background_color: '#01579b',
        theme_color: '#01579b',
        'theme-color': '#01579b',
        start_url: '/',
      }),
    ]
  }
});

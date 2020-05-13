const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

var config = {
  entry: path.resolve(__dirname, './src/app.js'),
  mode: 'development',
  target: 'web',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },
  plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: 'index.html',
        inject: 'body'
    })
  ]
};

module.exports = config;
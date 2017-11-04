const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(`${__dirname}/dist/`),
    filename: 'app.bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2017', 'react', 'stage-0'],
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'WordBook',
      fileName: 'index.html',
      template: path.resolve(`${__dirname}/src/index.html`),
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: 'app.bundle.js.map',
    })
  ]
}
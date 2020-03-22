const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  entry: './speech-train/index.js',
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    port: 8080,
    open: true,
    hot: true
  },
  plugins: [new HtmlWebpackPlugin({
    template: './index.html'
  }), new CleanWebpackPlugin(),
  new webpack.HotModuleReplacementPlugin()]
}
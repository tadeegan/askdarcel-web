var path = require('path');
var webpack = require('webpack');

var outputPath = '/dist';

module.exports = {
  context: __dirname,
  entry: './init.js',
  output: { 
    path: outputPath,
    publicPath: '/dist',
    filename: 'bundle.js' 
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, /typings/],
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      { test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, 
      loader: 'file-loader?name=fonts/[name].[ext]' }
    ]
  },
  devServer: {
    historyApiFallback: true,
    devtool: 'source-map',
    colors: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000',
        rewrite: function(req) {
          req.url = req.url.replace(/^\/api/, '');
        }
      }
    }  
  }
};
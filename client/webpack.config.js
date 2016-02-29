var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const npmEvent = process.env.npm_lifecycle_event;
const nodeEnv = process.env.NODE_ENV || 'development';

module.exports = {
  devtool: 'source-map', //'cheap-module-eval-source-map',
  entry: getEntryPoints(),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].bundle.js',
    publicPath: ''
  },
  plugins: getPlugins(),
  module: {
    loaders: [
      {
        test: /\.scss$|\.css/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        loader: 'file'
      },
      {
        //for font-awesome
        test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file'
      },
      {
        test: /\.jsx?/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      }

    ]
  }

};


function getEntryPoints(){
  const isDevelopmentServer = npmEvent === 'start';

  return isDevelopmentServer ? [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './src/index'
  ] : [
    './src/index'
  ];
}

function getPlugins(){

  const isProductionCode = nodeEnv === 'production';
  const isDevelopmentServer = npmEvent === 'start';

  const plugins = [
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      'Promise': 'bluebird'
    }),
    new HtmlWebpackPlugin({
      template: 'html!./src/index.html',
      inject: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(nodeEnv)
      }
    }),
    isDevelopmentServer ? new webpack.HotModuleReplacementPlugin() : null,
    isProductionCode ? new webpack.optimize.OccurenceOrderPlugin() : null,
    isProductionCode ? new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }) : null
  ];

  return plugins.filter(p => !!p);
}
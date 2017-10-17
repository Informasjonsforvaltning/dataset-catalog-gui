var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context:path.join(__dirname),
  entry: [
    './src/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static'
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    //new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new ExtractTextPlugin("styles.css"),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      warnings: false,
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new CopyWebpackPlugin([
      { from: './src/assets/css/bootstrap*', to: './', flatten: true },
      { from: './src/assets/img/*', to: './img', flatten: true }
    ], {
      copyUnmodified: true
    })
  ],
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react')
    },
    extensions:['.js', '.jsx', '.webpack.js', '.web.js']
  },
  resolveLoader: {
    //root: path.join(__dirname, "node_modules")
    modules: [__dirname, 'node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: { 
          presets: ['es2015', 'react'] 
        }
      },
      {
        test: /\.scss$/,
        //loader: ExtractTextPlugin.extract('css!sass')
        use: ExtractTextPlugin.extract({ 
          fallback: 'style-loader', 
          use: ['css-loader', 'sass-loader'] 
        })
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      {
        test: /\.(png|jpg)$/,
        use: [{
          loader: 'url-loader',
          options: { limit: 10000 } // Convert images < 10k to base64 strings
        }]
      }
    ]
  }
};
